import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Shield, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

type CookieSettings = {
  essential: boolean;
  functional: boolean;
  marketing: boolean;
};

const defaultSettings: CookieSettings = {
  essential: true,
  functional: false,
  marketing: false,
};

export function CookieConsent() {
  const [isOpen, setIsOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [settings, setSettings] = useState<CookieSettings>(defaultSettings);
  const [hasConsented, setHasConsented] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("cookie-consent");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSettings(parsed);
        setHasConsented(true);
        setIsOpen(false);
      } catch (e) {
        setIsOpen(true);
      }
    } else {
      setIsOpen(true);
    }

    // Prevent scrolling when consent is shown
    if (!hasConsented && isOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [hasConsented, isOpen]);

  const handleAcceptAll = () => {
    const allAccepted: CookieSettings = {
      essential: true,
      functional: true,
      marketing: true,
    };
    setSettings(allAccepted);
    localStorage.setItem("cookie-consent", JSON.stringify(allAccepted));
    setHasConsented(true);
    setIsOpen(false);
    document.body.style.overflow = 'unset';
  };

  const handleDeny = () => {
    const denied: CookieSettings = {
      essential: true,
      functional: false,
      marketing: false,
    };
    setSettings(denied);
    localStorage.setItem("cookie-consent", JSON.stringify(denied));
    setHasConsented(true);
    setIsOpen(false);
    document.body.style.overflow = 'unset';
  };

  const handleSaveSettings = () => {
    localStorage.setItem("cookie-consent", JSON.stringify(settings));
    setHasConsented(true);
    setIsOpen(false);
    document.body.style.overflow = 'unset';
  };

  const toggleSetting = (key: keyof CookieSettings) => {
    if (key === 'essential') return;
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  if (hasConsented) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Semi-transparent overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/40 backdrop-blur-[2px] z-50"
            onClick={(e) => e.stopPropagation()}
            aria-hidden="true"
          />
          
          {/* Bottom-positioned container */}
          <div className="fixed inset-x-0 bottom-0 z-50 flex items-end justify-center pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="w-full max-w-4xl pointer-events-auto mb-4 md:mb-6 px-4"
              role="dialog"
              aria-modal="true"
              aria-label="Cookie consent settings"
            >
              <div className="relative w-full group">
                {/* Background with glow effect */}
                <div className={[
                  "absolute inset-0 rounded-lg bg-background/95 backdrop-blur-sm border border-border/50",
                  "transition-all duration-200",
                  "group-hover:border-primary/30 group-hover:ring-1 group-hover:ring-primary/20",
                  "group-hover:shadow-[0_0_0_1px_hsl(var(--primary)/0.14),0_0_18px_hsl(var(--primary)/0.10)]",
                  "transform-gpu will-change-[box-shadow]"
                ].join(" ")} />
                
                {/* Content */}
                <div className="relative p-4 md:p-5">
                  {/* Header with icon */}
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-1 rounded-lg bg-primary/20 text-primary">
                      <Shield className="h-3.5 w-3.5" aria-hidden="true" />
                    </div>
                    <h3 className="text-sm font-semibold text-foreground/90" id="cookie-consent-title">
                      Privacy Settings
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-[11px] text-muted-foreground/80 leading-relaxed mb-3">
                    We use cookies to enhance your experience. Choose your preferences below.
                  </p>

                  {/* Settings grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-3">
                    {/* Essential */}
                    <div className="p-2 rounded-lg bg-background/50 border border-border/40">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium text-foreground/90">Essential</span>
                        <span className="text-[9px] bg-primary/20 text-primary px-1.5 py-0.5 rounded-full">
                          Always
                        </span>
                      </div>
                      <p className="text-[9px] text-muted-foreground/70">Required for basic function</p>
                    </div>

                    {/* Functional - with accessibility fixes */}
                    <div className="p-2 rounded-lg bg-background/50 border border-border/40">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium text-foreground/90">Functional</span>
                        <button
                          onClick={() => toggleSetting('functional')}
                          className={`relative inline-flex h-3.5 w-7 items-center rounded-full transition-colors ${
                            settings.functional ? 'bg-primary' : 'bg-muted'
                          }`}
                          aria-label={`${settings.functional ? 'Disable' : 'Enable'} functional cookies`}
                          role="switch"
                          aria-checked={settings.functional}
                        >
                          <span
                            className={`inline-block h-2.5 w-2.5 transform rounded-full bg-white transition-transform ${
                              settings.functional ? 'translate-x-4' : 'translate-x-0.5'
                            }`}
                            aria-hidden="true"
                          />
                        </button>
                      </div>
                      <p className="text-[9px] text-muted-foreground/70">Performance & preferences</p>
                    </div>

                    {/* Marketing - with accessibility fixes */}
                    <div className="p-2 rounded-lg bg-background/50 border border-border/40">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium text-foreground/90">Marketing</span>
                        <button
                          onClick={() => toggleSetting('marketing')}
                          className={`relative inline-flex h-3.5 w-7 items-center rounded-full transition-colors ${
                            settings.marketing ? 'bg-primary' : 'bg-muted'
                          }`}
                          aria-label={`${settings.marketing ? 'Disable' : 'Enable'} marketing cookies`}
                          role="switch"
                          aria-checked={settings.marketing}
                        >
                          <span
                            className={`inline-block h-2.5 w-2.5 transform rounded-full bg-white transition-transform ${
                              settings.marketing ? 'translate-x-4' : 'translate-x-0.5'
                            }`}
                            aria-hidden="true"
                          />
                        </button>
                      </div>
                      <p className="text-[9px] text-muted-foreground/70">Analytics & content</p>
                    </div>
                  </div>

                  {/* Links row */}
                  <div className="flex flex-wrap items-center gap-2 text-[10px] text-muted-foreground/70 mb-3">
                    <Link 
                      to="/privacy" 
                      className="hover:text-foreground underline underline-offset-2"
                      aria-label="Privacy Policy"
                    >
                      Privacy
                    </Link>
                    <span className="w-px h-2.5 bg-border/40" aria-hidden="true" />
                    <Link 
                      to="/legal" 
                      className="hover:text-foreground underline underline-offset-2"
                      aria-label="Legal Notice"
                    >
                      Legal
                    </Link>
                    <span className="w-px h-2.5 bg-border/40" aria-hidden="true" />
                    <Link 
                      to="/terms" 
                      className="hover:text-foreground underline underline-offset-2"
                      aria-label="Terms of Service"
                    >
                      Terms
                    </Link>
                    <span className="w-px h-2.5 bg-border/40" aria-hidden="true" />
                    <button
                      onClick={() => setShowDetails(!showDetails)}
                      className="hover:text-foreground inline-flex items-center gap-1"
                      aria-expanded={showDetails}
                      aria-controls="cookie-details-panel"
                      aria-label={showDetails ? "Hide cookie details" : "Show cookie details"}
                    >
                      <span>Details</span>
                      {showDetails ? (
                        <ChevronUp className="h-2.5 w-2.5" aria-hidden="true" />
                      ) : (
                        <ChevronDown className="h-2.5 w-2.5" aria-hidden="true" />
                      )}
                    </button>
                  </div>

                  {/* Details panel */}
                  <AnimatePresence>
                    {showDetails && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden mb-3"
                        id="cookie-details-panel"
                      >
                        <div className="p-2 rounded-lg bg-background/30 border border-border/40 text-[11px] text-muted-foreground/80">
                          <p className="mb-1 font-medium text-foreground/90 text-[11px]">Cookie details:</p>
                          <ul className="list-disc list-inside space-y-0.5 text-[9px]">
                            <li><span className="font-medium">Essential:</span> Security, session management</li>
                            <li><span className="font-medium">Functional:</span> Preferences, performance</li>
                            <li><span className="font-medium">Marketing:</span> Analytics, relevant content</li>
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Action buttons */}
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button 
                      variant="outline-glow" 
                      size="sm" 
                      onClick={handleSaveSettings} 
                      className="flex-1 text-[11px] h-7"
                      aria-label="Save current cookie preferences"
                    >
                      Save
                    </Button>
                    <Button 
                      variant="outline-glow" 
                      size="sm" 
                      onClick={handleDeny} 
                      className="flex-1 text-[11px] h-7"
                      aria-label="Deny all non-essential cookies, accept only essential"
                    >
                      Deny
                    </Button>
                    <Button 
                      variant="gradient" 
                      size="sm" 
                      onClick={handleAcceptAll} 
                      className="flex-1 text-[11px] h-7"
                      aria-label="Accept all cookies including functional and marketing"
                    >
                      Accept All
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}