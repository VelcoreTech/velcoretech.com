import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  size?: number;
  title?: string;
  /** Render solid fill (uses currentColor) instead of brand gradient. */
  mono?: boolean;
};

/**
 * VT Shield+Core mark.
 * V forms the notched shield silhouette; T forms the centered core.
 * Brand gradient is constant across themes; wordmark colors are theme-aware.
 */
export function LogoMark({ className, size = 32, title = "Velcore Tech", mono = false }: LogoProps) {
  const gradId = "vt-shield-grad";
  return (
    <svg
      role="img"
      aria-label={title}
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={cn("shrink-0", className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{title}</title>
      {!mono && (
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="hsl(210 100% 58%)" />
            <stop offset="100%" stopColor="hsl(195 100% 50%)" />
          </linearGradient>
        </defs>
      )}
      {/* Shield: V-notched top, rounded apex */}
      <path
        d="M10 10 Q10 6 14 6 L26 6 L32 13 L38 6 L50 6 Q54 6 54 10 L54 30 Q54 46 32 58 Q10 46 10 30 Z"
        fill={mono ? "currentColor" : `url(#${gradId})`}
      />
      {/* T core: white knockout, slightly heavier crossbar */}
      <path
        d="M21 22 H43 V27.5 H35.25 V44 H28.75 V27.5 H21 Z"
        fill={mono ? "hsl(var(--background))" : "#ffffff"}
      />
    </svg>
  );
}

type LockupProps = LogoProps & {
  /** "full" = mark + wordmark; "mark" = mark only. */
  variant?: "full" | "mark";
  wordmarkClassName?: string;
};

export function Logo({
  className,
  size = 32,
  variant = "full",
  wordmarkClassName,
  ...rest
}: LockupProps) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <LogoMark size={size} {...rest} />
      {variant === "full" && (
        <span
          className={cn(
            "text-xl font-bold leading-none tracking-tight text-foreground",
            wordmarkClassName,
          )}
        >
          Velcore<span className="text-gradient">Tech</span>
        </span>
      )}
    </span>
  );
}

export default Logo;
