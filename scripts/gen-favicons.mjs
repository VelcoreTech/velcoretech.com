// One-shot favicon generator. Reads public/favicon.svg + public/favicon-maskable.svg,
// emits PNG sizes used by the manifest and HTML.
//
// Usage: node scripts/gen-favicons.mjs
//
// Note: requires `sharp`. Install transiently with `npm i --no-save sharp`.
import sharp from "sharp";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const pub = join(root, "public");

const sourceMain = await readFile(join(pub, "favicon.svg"));
const sourceMask = await readFile(join(pub, "favicon-maskable.svg"));

const outputs = [
  { size: 16, name: "favicon-16x16.png", src: sourceMain },
  { size: 32, name: "favicon-32x32.png", src: sourceMain },
  { size: 180, name: "apple-touch-icon.png", src: sourceMain },
  { size: 192, name: "android-chrome-192x192.png", src: sourceMain },
  { size: 512, name: "android-chrome-512x512.png", src: sourceMain },
  { size: 512, name: "maskable-512.png", src: sourceMask },
  { size: 1200, name: "og-image.png", src: sourceMain, height: 630, fit: "contain", bg: "#0F1E35" },
];

await mkdir(pub, { recursive: true });

for (const o of outputs) {
  const pipeline = sharp(o.src, { density: 384 });
  if (o.height) {
    await pipeline
      .resize(o.size, o.height, { fit: o.fit ?? "contain", background: o.bg ?? "#0F1E35" })
      .png()
      .toFile(join(pub, o.name));
  } else {
    await pipeline.resize(o.size, o.size).png().toFile(join(pub, o.name));
  }
  console.log(`wrote ${o.name} (${o.size}${o.height ? "x" + o.height : ""})`);
}

// Generate ICO from 16/32 PNGs (concat). For broad compatibility we ship a multi-resolution
// .ico containing 16, 32, and 48 sized PNGs.
const sizes = [16, 32, 48];
const buffers = await Promise.all(
  sizes.map((s) => sharp(sourceMain, { density: 384 }).resize(s, s).png().toBuffer()),
);

// ICO file format (PNG-embedded variant — Windows Vista+, all modern browsers).
function buildIco(pngBufs, sizes) {
  const count = pngBufs.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type = icon
  header.writeUInt16LE(count, 4);

  const dirEntries = [];
  let offset = 6 + count * 16;
  for (let i = 0; i < count; i++) {
    const e = Buffer.alloc(16);
    const s = sizes[i];
    e.writeUInt8(s === 256 ? 0 : s, 0); // width
    e.writeUInt8(s === 256 ? 0 : s, 1); // height
    e.writeUInt8(0, 2); // palette
    e.writeUInt8(0, 3); // reserved
    e.writeUInt16LE(1, 4); // planes
    e.writeUInt16LE(32, 6); // bpp
    e.writeUInt32LE(pngBufs[i].length, 8);
    e.writeUInt32LE(offset, 12);
    dirEntries.push(e);
    offset += pngBufs[i].length;
  }

  return Buffer.concat([header, ...dirEntries, ...pngBufs]);
}

await writeFile(join(pub, "favicon.ico"), buildIco(buffers, sizes));
console.log("wrote favicon.ico (16,32,48)");
