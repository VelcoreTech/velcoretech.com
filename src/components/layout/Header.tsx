import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getTrackingParams } from "@/components/common/Tracking";
import { Logo } from "@/components/brand/Logo";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Pricing", href: "/pricing" },
  { name: "Industries", href: "/industries" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <nav className="container-tight flex items-center justify-between py-4">
        <Link to="/" aria-label="Velcore Tech home" className="flex items-center">
          <Logo size={32} />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1">
          {navigation.map((item) => {
            const href = item.name === "Pricing" && item.href === "/pricing"
              ? `/pricing${getTrackingParams('header', 'nav', 'pricing')}`
              : item.href;

            return (
              <Link
                key={item.name}
                to={href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === item.href
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
                aria-current={location.pathname === item.href ? "page" : undefined}
              >
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* CTA + Theme toggle */}
        <div className="hidden lg:flex items-center gap-3">
          <ThemeToggle />
          <Button variant="outline-glow" asChild>
            <Link to={`/assessment${getTrackingParams('header', 'cta', 'it_assessment')}`}>
              Start Assessment
            </Link>
          </Button>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="p-2 text-muted-foreground hover:text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background border-b border-border"
          >
            <div className="container-tight py-4 space-y-2">
              {navigation.map((item) => {
                const href = item.name === "Pricing" && item.href === "/pricing"
                  ? `/pricing${getTrackingParams('header', 'mobile_nav', 'pricing')}`
                  : item.href;

                return (
                  <Link
                    key={item.name}
                    to={href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      location.pathname === item.href
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    }`}
                    aria-current={location.pathname === item.href ? "page" : undefined}
                  >
                    {item.name}
                  </Link>
                );
              })}
              <div className="pt-4 border-t border-border">
                <Button variant="gradient" className="w-full" asChild>
                  <Link
                    to={`/assessment${getTrackingParams('header', 'mobile_cta', 'it_assessment')}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Start Assessment
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
