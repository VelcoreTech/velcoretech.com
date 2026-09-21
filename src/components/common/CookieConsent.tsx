import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Shield } from "lucide-react";
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

const TOGGLES: { key: keyof CookieSettings; label: string; hint: string }[] = [
  { key: "functional", label: "Functional", hint: "Performance & preferences" },
  { key: "marketing", label: "Marketing", hint: "Analytics & content" },
];

export function CookieConsent() {
  const [isOpen, setIsOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState<CookieSettings>(defaultSettings);
  const [hasConsented, setHasConsented] = useState(false);

  // Read the stored choice once, on mount.
  useEffect(() => {
    const saved = localStorage.getItem("cookie-consent");
    if (!saved) {
      setIsOpen(true);
      return;
    }
    try {
      setSettings(JSON.parse(saved));
      setHasConsented(true);
    } catch {
      setIsOpen(true);
    }
  }, []);

  // Lock background scroll only while the dialog is actually up. The panel
  // scrolls internally, so locking the body can never strand the buttons
  // off-screen on a short viewport.
  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  const persist = (choice: CookieSettings) => {
    setSettings(choice);
    localStorage.setItem("cookie-consent", JSON.stringify(choice));
    setHasConsented(true);
    setIsOpen(false);
  };

  const handleAcceptAll = () =>
    persist({ essential: true, functional: true, marketing: true });
  const handleDeny = () =>
    persist({ essential: true, functional: false, marketing: false });
  const handleSaveSettings = () => persist(settings);

  const toggleSetting = (key: keyof CookieSettings) => {
    if (key === "essential") return;
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  if (hasConsented) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/60 backdrop-blur-[2px] z-50"
            aria-hidden="true"
          />

          <div className="fixed inset-x-0 bottom-0 z-50 flex justify-center pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className={[
                "pointer-events-auto w-full max-w-2xl",
                // Side gutters at every width + room for the iOS home indicator.
                "px-3 sm:px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:pb-6",
                // Never taller than the screen; the body inside scrolls instead.
                "max-h-[80dvh] flex",
              ].join(" ")}
              role="dialog"
              aria-modal="true"
              aria-labelledby="cookie-consent-title"
              aria-describedby="cookie-consent-description"
            >
              <div className="relative flex w-full min-h-0 flex-col rounded-xl bg-background border border-border shadow-2xl">
                {/* Scrollable body */}
                <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-4 sm:p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-1.5 rounded-lg bg-primary/20 text-primary">
                      <Shield className="h-4 w-4" aria-hidden="true" />
                    </div>
                    <h3
                      className="text-base font-semibold text-foreground"
                      id="cookie-consent-title"
                    >
                      Privacy Settings
                    </h3>
                  </div>

                  <p
                    className="text-sm text-muted-foreground leading-relaxed mb-4"
                    id="cookie-consent-description"
                  >
                    We use cookies to run this site and to understand how it is used.
                    Essential cookies are always on; everything else is your choice.
                  </p>

                  {showSettings && (
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between gap-3 p-3 rounded-lg bg-muted/30 border border-border/50">
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-foreground">Essential</p>
                        <p className="text-xs text-muted-foreground">
                          Required for basic function
                        </p>
                      </div>
                      <span className="shrink-0 text-xs font-medium bg-primary/20 text-primary px-2 py-1 rounded-full">
                        Always on
                      </span>
                    </div>

                    {TOGGLES.map(({ key, label, hint }) => {
                      const on = settings[key];
                      return (
                        <div
                          key={key}
                          className="flex items-center justify-between gap-3 p-3 rounded-lg bg-muted/30 border border-border/50"
                        >
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-foreground">{label}</p>
                            <p className="text-xs text-muted-foreground">{hint}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => toggleSetting(key)}
                            className={[
                              // 44px tap target via the invisible ::before overlay,
                              // without inflating the visual switch.
                              "relative shrink-0 inline-flex h-6 w-11 items-center rounded-full transition-colors",
                              "before:absolute before:-inset-2.5 before:content-['']",
                              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                              on ? "bg-primary" : "bg-muted-foreground/40",
                            ].join(" ")}
                            role="switch"
                            aria-checked={on}
                            aria-label={`${on ? "Disable" : "Enable"} ${label.toLowerCase()} cookies`}
                          >
                            <span
                              className={[
                                "inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform",
                                on ? "translate-x-[1.375rem]" : "translate-x-0.5",
                              ].join(" ")}
                              aria-hidden="true"
                            />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                  )}

                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                    <Link to="/privacy" className="hover:text-foreground underline underline-offset-2 py-1">
                      Privacy
                    </Link>
                    <Link to="/legal" className="hover:text-foreground underline underline-offset-2 py-1">
                      Legal
                    </Link>
                    <Link to="/terms" className="hover:text-foreground underline underline-offset-2 py-1">
                      Terms
                    </Link>
                    <button
                      type="button"
                      onClick={() => setShowSettings(!showSettings)}
                      className="hover:text-foreground inline-flex items-center gap-1 py-1 font-medium"
                      aria-expanded={showSettings}
                      aria-controls="cookie-details-panel"
                    >
                      <span>{showSettings ? "Hide options" : "Customize"}</span>
                      {showSettings ? (
                        <ChevronUp className="h-3.5 w-3.5" aria-hidden="true" />
                      ) : (
                        <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
                      )}
                    </button>
                  </div>

                  <AnimatePresence>
                    {showSettings && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                        id="cookie-details-panel"
                      >
                        <div className="mt-3 p-3 rounded-lg bg-muted/30 border border-border/50 text-xs text-muted-foreground">
                          <p className="mb-1.5 font-medium text-foreground">Cookie details</p>
                          <ul className="list-disc list-inside space-y-1">
                            <li>
                              <span className="font-medium text-foreground">Essential:</span>{" "}
                              Security, session management
                            </li>
                            <li>
                              <span className="font-medium text-foreground">Functional:</span>{" "}
                              Preferences, performance
                            </li>
                            <li>
                              <span className="font-medium text-foreground">Marketing:</span>{" "}
                              Analytics, relevant content
                            </li>
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Actions — pinned, so they are always reachable */}
                <div className="shrink-0 border-t border-border/60 p-4 sm:p-5 sm:pt-4">
                  <div className="space-y-2">
                    {showSettings && (
                      <Button
                        variant="outline-glow"
                        onClick={handleSaveSettings}
                        className="w-full h-11 sm:h-10 text-sm"
                      >
                        Save preferences
                      </Button>
                    )}
                    {/* Deny and Accept carry equal weight — no nudge toward consent. */}
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant="outline-glow"
                        onClick={handleDeny}
                        className="h-11 sm:h-10 text-sm"
                      >
                        Deny
                      </Button>
                      <Button
                        variant="gradient"
                        onClick={handleAcceptAll}
                        className="h-11 sm:h-10 text-sm"
                      >
                        Accept all
                      </Button>
                    </div>
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
