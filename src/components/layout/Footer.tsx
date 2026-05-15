import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Instagram, Linkedin, Facebook } from "lucide-react";
import { getTrackingParams } from "@/components/common/Tracking";
import { Logo } from "@/components/brand/Logo";

const footerLinks = {
  services: [
    { name: "IT Managed Services", href: "/services/Managed-IT" },
    { name: "Advanced Cybersecurity", href: "/services/cybersecurity" },
    { name: "Management Consulting", href: "/services/consulting" },
    { name: "AI Development", href: "/services/ai-development" },
  ],
  company: [
    { name: "About Velcore Tech", href: "/about" },
    { name: "Industries", href: "/industries" },
    { name: "Services", href: "/services" },
    { name: "Case Studies", href: "/case-studies" },
    { name: "Resources", href: "/resources" },
    { name: "Contact", href: "/contact" },
  ],
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="container-tight py-12">
        {/* Main footer grid - 2 columns on mobile, 4 columns on large screens */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {/* Brand Column */}
          <div className="flex flex-col items-start">
            <Link
              to="/"
              aria-label="Velcore Tech home"
              className="flex items-center gap-2 mb-3 self-start"
            >
              <Logo size={28} wordmarkClassName="text-base lg:text-lg" />
            </Link>

            <div className="space-y-1.5 w-full">
              <a
                href="mailto:info@velcoretech.com"
                className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors break-all lg:text-sm"
              >
                <Mail className="h-3 w-3 text-primary shrink-0 lg:h-3.5 lg:w-3.5" />
                <span>info@velcoretech.com</span>
              </a>

              <a
                href="tel:+18313347943"
                className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors lg:text-sm"
              >
                <Phone className="h-3 w-3 text-primary shrink-0 lg:h-3.5 lg:w-3.5" />
                <span>(831) 334-7943</span>
              </a>

              <div className="flex items-start gap-1.5 text-xs text-muted-foreground lg:text-sm">
                <MapPin className="h-3 w-3 text-primary shrink-0 mt-0.5 lg:h-3.5 lg:w-3.5" />
                <span>280 Harvey West Blvd<br />Santa Cruz, CA 95060</span>
              </div>
            </div>

            {/* Social icons */}
            <div className="mt-3 flex items-center gap-1.5">
              <a
                href="https://www.instagram.com/velcoretech/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Velcore Tech Instagram"
                className="p-1 rounded-lg border border-border hover:bg-card transition-colors lg:p-1.5"
              >
                <Instagram className="h-3.5 w-3.5 text-muted-foreground hover:text-primary transition-colors lg:h-4 lg:w-4" />
              </a>

              <a
                href="https://www.linkedin.com/company/velcoretech/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Velcore Tech LinkedIn"
                className="p-1 rounded-lg border border-border hover:bg-card transition-colors lg:p-1.5"
              >
                <Linkedin className="h-3.5 w-3.5 text-muted-foreground hover:text-primary transition-colors lg:h-4 lg:w-4" />
              </a>

              <a
                href="https://www.facebook.com/VelcoreTech"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Velcore Tech Facebook"
                className="p-1 rounded-lg border border-border hover:bg-card transition-colors lg:p-1.5"
              >
                <Facebook className="h-3.5 w-3.5 text-muted-foreground hover:text-primary transition-colors lg:h-4 lg:w-4" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-2 text-xs tracking-wide uppercase lg:text-sm lg:mb-3">Services</h3>
            <ul className="space-y-1">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    to={`${link.href}${getTrackingParams('footer', 'services', link.name.toLowerCase().replace(/\s+/g, '_'))}`}
                    className="text-xs text-muted-foreground hover:text-primary transition-colors lg:text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-2 text-xs tracking-wide uppercase lg:text-sm lg:mb-3">Company</h3>
            <ul className="space-y-1">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={`${link.href}${getTrackingParams('footer', 'company', link.name.toLowerCase().replace(/\s+/g, '_'))}`} 
                    className="text-xs text-muted-foreground hover:text-primary transition-colors lg:text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get Started */}
          <div>
            <h3 className="font-semibold mb-2 text-xs tracking-wide uppercase lg:text-sm lg:mb-3">Get Started</h3>
            <ul className="space-y-1">
              <li>
                <Link 
                  to={`/assessment${getTrackingParams('footer', 'get_started', 'assessment')}`} 
                  className="text-xs text-muted-foreground hover:text-primary transition-colors lg:text-sm"
                >
                  IT Assessment
                </Link>
              </li>
              <li>
                <Link 
                  to={`/contact${getTrackingParams('footer', 'get_started', 'consultation')}`} 
                  className="text-xs text-muted-foreground hover:text-primary transition-colors lg:text-sm"
                >
                  Contact us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-5 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">© {currentYear} Velcore Tech LLC. All rights reserved.</p>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <Link
              to={`/status${getTrackingParams('footer', 'bottom', 'status')}`}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1.5"
            >
              <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" />
              Status
            </Link>
            <span className="text-muted-foreground/30">•</span>
            <Link
              to={`/privacy${getTrackingParams('footer', 'bottom', 'privacy')}`}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy Policy
            </Link>
            <span className="text-muted-foreground/30">•</span>
            <Link
              to={`/legal${getTrackingParams('footer', 'bottom', 'legal')}`}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Legal Notice
            </Link>
            <span className="text-muted-foreground/30">•</span>
            <Link
              to={`/terms${getTrackingParams('footer', 'bottom', 'terms')}`}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}