import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
    // Warm up frequently used files for faster dev server
    warmup: {
      clientFiles: [
        "./src/components/layout/Layout.tsx",
        "./src/components/layout/Header.tsx",
        "./src/components/layout/Footer.tsx",
        "./src/App.tsx",
        "./src/pages/Home.tsx",
        "./src/pages/services/what-we-do.tsx",
      ],
    },
  },

  plugins: [
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  build: {
    // Source maps only in development
    sourcemap: mode === "development",
    
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 1000,
    
    // Target modern browsers for smaller bundles
    target: "es2020",
    
    // Minify options
    minify: "esbuild",
    
    // Rollup specific options
    rollupOptions: {
      output: {
        // Manual chunk splitting for optimal caching
        manualChunks: {
          // Core React libraries
          "vendor-react": ["react", "react-dom", "react-router-dom", "react-helmet-async"],
          
          // UI and animation
          "vendor-ui": ["framer-motion", "@tanstack/react-query"],
          
          // Icons
          "vendor-icons": ["lucide-react"],
          
          // Shadcn UI components
          "vendor-shadcn": [
            "@radix-ui/react-accordion",
            "@radix-ui/react-alert-dialog",
            "@radix-ui/react-aspect-ratio",
            "@radix-ui/react-avatar",
            "@radix-ui/react-checkbox",
            "@radix-ui/react-collapsible",
            "@radix-ui/react-context-menu",
            "@radix-ui/react-dialog",
            "@radix-ui/react-dropdown-menu",
            "@radix-ui/react-hover-card",
            "@radix-ui/react-label",
            "@radix-ui/react-menubar",
            "@radix-ui/react-navigation-menu",
            "@radix-ui/react-popover",
            "@radix-ui/react-progress",
            "@radix-ui/react-radio-group",
            "@radix-ui/react-scroll-area",
            "@radix-ui/react-select",
            "@radix-ui/react-separator",
            "@radix-ui/react-slider",
            "@radix-ui/react-slot",
            "@radix-ui/react-switch",
            "@radix-ui/react-tabs",
            "@radix-ui/react-toast",
            "@radix-ui/react-toggle",
            "@radix-ui/react-toggle-group",
            "@radix-ui/react-tooltip",
          ],
        },
        
        // Chunk naming for better cache busting
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
        assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
      },
    },
    
    // Enable CSS code splitting
    cssCodeSplit: true,
  },

  // Optimize dependencies
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-router-dom",
      "framer-motion",
      "lucide-react",
      "@tanstack/react-query",
      "react-helmet-async",
    ],
  },
}));