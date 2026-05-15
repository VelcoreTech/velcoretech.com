import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  /** When true, shows a wider rocker (used in mobile menu). */
  wide?: boolean;
};

export function ThemeToggle({ className, wide = false }: Props) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid SSR/CSR mismatch by only rendering icons after hydration.
  useEffect(() => setMounted(true), []);

  const isDark = mounted ? resolvedTheme === "dark" : true;
  const next = isDark ? "light" : "dark";
  const label = `Switch to ${next} mode`;

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      aria-label={label}
      title={label}
      className={cn(
        "relative inline-flex items-center justify-center rounded-lg border border-border/60 bg-background/40 text-muted-foreground transition-colors hover:text-foreground hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        wide ? "h-10 w-full gap-2 px-4 text-sm" : "h-9 w-9",
        className,
      )}
    >
      <Sun
        className={cn(
          "h-4 w-4 transition-all",
          isDark ? "scale-0 -rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100",
          !wide && "absolute",
        )}
        aria-hidden="true"
      />
      <Moon
        className={cn(
          "h-4 w-4 transition-all",
          isDark ? "scale-100 rotate-0 opacity-100" : "scale-0 rotate-90 opacity-0",
          !wide && "absolute",
        )}
        aria-hidden="true"
      />
      {wide && <span className="font-medium">{isDark ? "Dark mode" : "Light mode"}</span>}
    </button>
  );
}
