import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { CheckCircle2, ChevronDown, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/common/SectionHeader";
import { getTrackingParams } from "@/components/common/Tracking";

type ProcessStep = {
  step: string;
  shortTitle: string;  // Short version for closed card
  fullTitle: string;   // Full version for expanded view
  description: string;
  icon: React.ElementType;
};

type ProcessExpandableProps = {
  steps: ProcessStep[];
  showHeader?: boolean;
  className?: string;
};

// Column-aware animation
const getContentVariants = (activeIdx: number) => ({
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.98,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: 15,
    scale: 0.98,
    transition: { duration: 0.2, ease: "easeIn" },
  },
});

export function ProcessExpandable({ steps, showHeader = true, className = "" }: ProcessExpandableProps) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  const detail = useMemo(() => {
    const map: Record<
      string,
      {
        // Completely different content - NOTHING repeats from the card preview
        methodology: string[];
        outcomes: string[];
        deliverables: string[];
        ctaPrimaryTo: string;
        ctaPrimaryLabel: string;
        ctaSecondaryTo: string;
        ctaSecondaryLabel: string;
      }
    > = {
      "Baseline & Risk Mapping": {
        methodology: [
          "We conduct 20+ point controls assessment across 6 security domains",
          "Mapped to industry frameworks (NIST, CIS, MITRE ATT&CK)",
          "Technical validation through automated and manual testing",
          "Risk scoring by business impact and exploitability",
          "Documented evidence and configuration findings",
        ],
        outcomes: [
          "Executive-level risk register with prioritized remediation",
          "Clear understanding of your current vs. target state",
          "Data-driven roadmap with 30-60-90 day quick wins",
        ],
        deliverables: [
          "Comprehensive assessment report with executive summary",
          "Risk heat map and prioritization matrix",
          "Technical findings with step-by-step remediation guidance",
          "30-minute findings walkthrough with your team",
        ],
        ctaPrimaryTo: "/assessment",
        ctaPrimaryLabel: "Schedule Assessment",
        ctaSecondaryTo: "/contact",
        ctaSecondaryLabel: "Talk to an Expert",
      },
      "Standardize Controls": {
        methodology: [
          "Implement enforceable security policies and technical controls",
          "Configure MFA, Conditional Access, and privileged access workflows",
          "Deploy endpoint hardening baselines across your environment",
          "Establish logging, monitoring, and alerting standards",
          "Create change management and approval workflows",
        ],
        outcomes: [
          "Reduced attack surface through consistent control enforcement",
          "Clear separation of duties and privileged access boundaries",
          "Measurable security posture improvement within 90 days",
        ],
        deliverables: [
          "Hardened configuration baselines for all systems",
          "Identity and access management framework",
          "Security policy and procedure documentation",
          "Implementation validation and testing results",
        ],
        ctaPrimaryTo: "/services",
        ctaPrimaryLabel: "Explore Implementation",
        ctaSecondaryTo: "/contact",
        ctaSecondaryLabel: "Get a Plan",
      },
      "Operate With Cadence": {
        methodology: [
          "Continuous monitoring with 24/7 threat detection",
          "Weekly vulnerability scanning and patch management",
          "Monthly security posture reviews and reporting",
          "Quarterly access certification campaigns",
          "Annual tabletop exercises and readiness testing",
        ],
        outcomes: [
          "Predictable security operations with measurable KPIs",
          "Reduced mean-time-to-detect and mean-time-to-respond",
          "Audit-ready evidence and compliance documentation",
        ],
        deliverables: [
          "Monthly executive security dashboard",
          "Quarterly risk and posture assessment",
          "Incident response playbooks and runbooks",
          "Continuous improvement roadmap with backlog",
        ],
        ctaPrimaryTo: "/services/managed-it",
        ctaPrimaryLabel: "View Managed Services",
        ctaSecondaryTo: "/contact",
        ctaSecondaryLabel: "Schedule a Review",
      },
    };

    return map;
  }, []);

  const activeStep = activeIdx === null ? null : steps[activeIdx];
  const activeContent = activeStep ? detail[activeStep.fullTitle] : null;

  const close = () => setActiveIdx(null);

  // Close on click outside
  useEffect(() => {
    if (activeIdx === null) return;

    const onPointerDown = (e: PointerEvent) => {
      const el = sectionRef.current;
      if (!el) return;
      if (!el.contains(e.target as Node)) close();
    };

    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    return () => window.removeEventListener("pointerdown", onPointerDown);
  }, [activeIdx]);

  return (
    <section
      ref={sectionRef}
      className={`section-padding bg-card relative overflow-hidden ${className}`}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />
      
      <div className="container-tight relative z-10">
        {showHeader && (
          <SectionHeader
            badge="Our Process"
            title="Assess. Secure. Operate."
            description="We don't do reactive support. We baseline risk, enforce standards, and run IT with measurable cadence—so leadership gets reliability, clarity, and defensible security."
          />
        )}

        {/* Cards Grid - Using shortTitle */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {steps.map((step, idx) => {
            const isActive = activeIdx === idx;
            const Icon = step.icon;

            return (
              <Fragment key={step.step}>
                {/* Card - shows shortTitle */}
                <button
                  type="button"
                  onClick={() => setActiveIdx((v) => (v === idx ? null : idx))}
                  aria-expanded={isActive}
                  className={[
                    "text-left w-full",
                    "relative p-8 rounded-2xl border bg-background/80 backdrop-blur-sm",
                    "transition-all duration-300",
                    "hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5",
                    isActive
                      ? "border-primary/40 shadow-xl shadow-primary/10 ring-2 ring-primary/20 scale-[1.02]"
                      : "border-border",
                  ].join(" ")}
                >
                  <div className="flex items-start justify-between gap-6 mb-4">
                    <div className="min-w-0">
                      <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide uppercase text-primary/70">
                        <Icon className="h-4 w-4" />
                        Step {step.step.replace(/^0/, "")}
                      </div>
                      <h3 className="text-2xl font-bold leading-tight mt-2">{step.shortTitle}</h3>
                    </div>

                    <span className={[
                      "shrink-0 text-sm font-semibold px-3 py-1.5 rounded-full transition-colors",
                      isActive 
                        ? "bg-primary text-white" 
                        : "text-primary/70 bg-primary/10 border border-primary/20"
                    ].join(" ")}>
                      {step.step.replace(/^0/, "")}
                    </span>
                  </div>

                  {/* Card preview description */}
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>

                  <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium">
                    <span className={isActive ? "text-primary" : "text-primary/70"}>
                      {isActive ? "Hide details" : "View details"}
                    </span>
                    <ChevronDown
                      className={[
                        "h-4 w-4 transition-all duration-300",
                        isActive ? "rotate-180 text-primary" : "text-primary/70",
                      ].join(" ")}
                    />
                  </div>

                  {/* Active indicator line */}
                  {isActive && (
                    <motion.div
                      layoutId="activeCardIndicator"
                      className="absolute bottom-0 left-8 right-8 h-0.5 bg-primary/50 rounded-full"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    />
                  )}
                </button>

                {/* Mobile expanded content - shows fullTitle */}
                <AnimatePresence initial={false}>
                  {isActive && activeContent && (
                    <motion.div
                      key={`${step.fullTitle}-mobile`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="md:hidden overflow-hidden"
                    >
                      <div className="mt-4">
                        <MobileExpandedContent 
                          step={step} 
                          content={activeContent} 
                          onClose={close} 
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Fragment>
            );
          })}
        </div>

        {/* Desktop Expanded View - 2-Column Layout Restored */}
        <AnimatePresence mode="wait">
          {activeStep && activeContent && activeIdx !== null && (
            <motion.div
              key={activeStep.fullTitle}
              variants={getContentVariants(activeIdx)}
              initial="initial"
              animate="animate"
              exit="exit"
              className="mt-8 hidden md:block"
            >
              <DesktopExpandedContent
                step={activeStep}
                content={activeContent}
                activeIdx={activeIdx}
                onClose={close}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hint text when nothing is expanded */}
        {activeIdx === null && (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-sm text-muted-foreground/60 mt-8 hidden md:block"
          >
          </motion.p>
        )}
      </div>
    </section>
  );
}

function DesktopExpandedContent({
  step,
  content,
  activeIdx,
  onClose,
}: {
  step: ProcessStep;
  content: any;
  activeIdx: number;
  onClose: () => void;
}) {
  // Position caret under the active card
  const caretLeftPct = ((activeIdx * 2 + 1) / 6) * 100;
  const StepIcon = step.icon;

  return (
    <div className="relative">
      {/* Connecting caret */}
      <div
        className="absolute -top-3 h-4 w-4 rotate-45 border-l border-t border-primary/30 bg-gradient-to-br from-background to-card"
        style={{ left: `${caretLeftPct}%`, transform: "translateX(-50%) rotate(45deg)" }}
        aria-hidden="true"
      />

      {/* Main expanded content */}
      <div className="relative rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-background via-background to-card/90 shadow-2xl shadow-primary/10 overflow-hidden">
        {/* Decorative header gradient */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
        
        {/* Content */}
        <div className="relative p-8">
          {/* Header row - shows fullTitle */}
          <div className="flex items-start gap-4 mb-8">
            <div className="shrink-0">
              <StepIcon className="h-10 w-10 text-primary" />
            </div>
            
            <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold tracking-wide uppercase text-primary/75 mb-1">
                  Step {step.step.replace(/^0/, "")} • {step.shortTitle} → Deep Dive
                </div>
              <h4 className="text-2xl font-bold mb-3">{step.fullTitle}</h4>
              {/* Card description is NOT repeated here */}
            </div>

            <button
              type="button"
              onClick={onClose}
              className="shrink-0 p-2 hover:bg-background/80 rounded-lg transition-colors group self-start"
              aria-label="Close expanded view"
            >
              <X className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
            </button>
          </div>

          {/* Two-column content - RESTORED TO ORIGINAL LAYOUT */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left column - Methodology + Outcomes */}
            <div className="space-y-8">
              {/* Methodology */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-1 bg-primary/40 rounded-full" />
                  <h4 className="text-lg font-semibold">Our Methodology</h4>
                </div>
                
                <div className="bg-primary/5 rounded-xl p-6 border border-primary/10">
                  <ul className="space-y-4">
                    {content.methodology.map((item: string, idx: number) => (
                      <motion.li
                        key={item}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="flex items-start gap-3 text-sm"
                      >
                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-foreground/80 leading-relaxed">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Outcomes */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-1 bg-primary/40 rounded-full" />
                  <h4 className="text-lg font-semibold">Key Outcomes</h4>
                </div>
                
                <div className="bg-primary/5 rounded-xl p-6 border border-primary/10">
                  <ul className="space-y-4">
                    {content.outcomes.map((item: string, idx: number) => (
                      <motion.li
                        key={item}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="flex items-start gap-3 text-sm"
                      >
                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-foreground/80 leading-relaxed">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Right column - Deliverables */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-6 w-1 bg-primary/40 rounded-full" />
                <h4 className="text-lg font-semibold">Deliverables</h4>
              </div>
              
              <div className="bg-primary/5 rounded-xl p-6 border border-primary/10">
                <ul className="space-y-4">
                  {content.deliverables.map((item: string, idx: number) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="flex items-start gap-3 text-sm"
                    >
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-foreground/80 leading-relaxed">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="mt-8 flex gap-3 justify-end">
            <Button variant="outline-glow" size="lg" asChild>
              <Link to={`${content.ctaSecondaryTo}${getTrackingParams('process', 'step_' + step.step, content.ctaSecondaryLabel.toLowerCase().replace(/\s+/g, '_'))}`}>
                {content.ctaSecondaryLabel}
              </Link>
            </Button>
            <Button variant="gradient" size="lg" asChild>
              <Link to={`${content.ctaPrimaryTo}${getTrackingParams('process', 'step_' + step.step, content.ctaPrimaryLabel.toLowerCase().replace(/\s+/g, '_'))}`} className="inline-flex items-center justify-center gap-2">
                {content.ctaPrimaryLabel}
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>

          {/* Footer hint */}
          <div className="mt-8 pt-4 border-t border-border/50 text-center">
            <p className="text-xs text-muted-foreground/50">
              Click any step above to explore different phases of our methodology
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileExpandedContent({
  step,
  content,
  onClose,
}: {
  step: ProcessStep;
  content: any;
  onClose: () => void;
}) {
  const StepIcon = step.icon;

  return (
    <div className="rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-background to-card/90 p-6 shadow-xl">
      {/* Header - shows fullTitle */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="shrink-0">
            <StepIcon className="h-10 w-10 text-primary" />
          </div>
          <div>
            <div className="text-xs font-semibold tracking-wide uppercase text-primary/60">
                Step {step.step.replace(/^0/, "")} • {step.shortTitle} → Deep Dive
            </div>
            <h4 className="text-xl font-bold mt-1">{step.fullTitle}</h4>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="p-2 hover:bg-background/80 rounded-lg transition-colors"
        >
          <X className="h-5 w-5 text-muted-foreground" />
        </button>
      </div>

      {/* Methodology */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <div className="h-4 w-1 bg-primary/40 rounded-full" />
          <h5 className="text-sm font-semibold">Methodology</h5>
        </div>
        <ul className="space-y-3">
          {content.methodology.map((item: string) => (
            <li key={item} className="flex items-start gap-2 text-sm">
              <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <span className="text-foreground/80 leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Outcomes */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <div className="h-4 w-1 bg-primary/40 rounded-full" />
          <h5 className="text-sm font-semibold">Outcomes</h5>
        </div>
        <ul className="space-y-3">
          {content.outcomes.map((item: string) => (
            <li key={item} className="flex items-start gap-2 text-sm">
              <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <span className="text-foreground/80 leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Deliverables */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <div className="h-4 w-1 bg-primary/40 rounded-full" />
          <h5 className="text-sm font-semibold">Deliverables</h5>
        </div>
        <ul className="space-y-3">
          {content.deliverables.map((item: string) => (
            <li key={item} className="flex items-start gap-2 text-sm">
              <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <span className="text-foreground/80 leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* CTAs */}
      <div className="flex flex-col gap-2">
        <Button variant="gradient" size="lg" asChild className="w-full group">
          <Link to={`${content.ctaPrimaryTo}${getTrackingParams('process', 'step_' + step.step + '_mobile', content.ctaPrimaryLabel.toLowerCase().replace(/\s+/g, '_'))}`} className="inline-flex items-center justify-center gap-2">
            {content.ctaPrimaryLabel}
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
        <Button variant="outline" size="lg" asChild className="w-full">
          <Link to={`${content.ctaSecondaryTo}${getTrackingParams('process', 'step_' + step.step + '_mobile', content.ctaSecondaryLabel.toLowerCase().replace(/\s+/g, '_'))}`}>
            {content.ctaSecondaryLabel}
          </Link>
        </Button>
      </div>
    </div>
  );
}