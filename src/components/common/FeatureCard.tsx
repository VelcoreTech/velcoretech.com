import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
  delay?: number;
  to: string;
  ctaLabel?: string;
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
  className,
  delay = 0,
  to,
  ctaLabel = "Learn more",
}: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="h-full"
    >
      <Link
        to={to}
        className={cn(
          // Base card
          "feature-card group relative flex h-full flex-col overflow-hidden",
          "transition-all duration-200 hover:-translate-y-1",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
          // Edge-only glow (no fill)
          "after:absolute after:inset-0 after:rounded-3xl after:pointer-events-none",
          "after:ring-1 after:ring-primary/0 after:transition-all after:duration-200",
          "group-hover:after:ring-primary/50",
          "group-hover:after:shadow-[0_0_0_1px_hsl(var(--primary)/0.55),0_0_32px_hsl(var(--primary)/0.25)]",
          className
        )}
        aria-label={`${ctaLabel}: ${title}`}
      >
        {/* Content */}
        <div className="flex-1">
          <div className="grid grid-cols-[32px_1fr] gap-x-4 gap-y-2 items-start">
            {/* Icon - NO background, just the icon */}
            <div className="flex h-8 w-8 items-start justify-center pt-[2px]">
              <Icon className="h-5 w-5 text-primary group-hover:text-primary/80 transition-colors" />
            </div>

            <h3 className="text-xl font-semibold leading-tight group-hover:text-primary transition-colors">
              {title}
            </h3>

            {/* description aligns under the title column (col 2) */}
            <p className="col-start-2 text-muted-foreground leading-relaxed">
              {description}
            </p>
          </div>
        </div>

        {/* CTA pinned bottom-right */}
        <div className="mt-auto pt-5 flex items-center justify-end gap-2 text-sm font-medium text-primary">
          <span className="opacity-90 group-hover:opacity-100 transition-opacity">
            {ctaLabel}
          </span>
          <ArrowRight className="h-4 w-4 translate-x-0 group-hover:translate-x-1 transition-transform" />
        </div>
      </Link>
    </motion.div>
  );
}