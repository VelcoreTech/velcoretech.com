import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  CheckCircle2, 
  ChevronDown, 
  X, 
  ArrowRight,
  Shield,
  ShieldCheck,
  Bug,
  Radar,
  Scan,
  Eye,
  Terminal,
  Users,
  FileCheck,
  Award,
  MailCheck,
  Monitor,
  Globe,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/common/SectionHeader";
import { getTrackingParams } from "@/components/common/Tracking";

type CybersecurityPillar = {
  step: string;
  shortTitle: string;
  fullTitle: string;
  description: string;
  icon: React.ElementType;
  compliance?: string[];
  details: {
    whatWeDo: string[];
    outcomes: string[];
    deliverables: string[];
    ctaPrimaryTo: string;
    ctaPrimaryLabel: string;
    ctaSecondaryTo: string;
    ctaSecondaryLabel: string;
  };
};

type CybersecurityPillarsProps = {
  showHeader?: boolean;
  className?: string;
};

export function CybersecurityPillars({ showHeader = true, className = "" }: CybersecurityPillarsProps) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  const pillars: CybersecurityPillar[] = useMemo(
    () => [
      {
        step: "01",
        shortTitle: "Vulnerability Assessment",
        fullTitle: "Comprehensive Vulnerability Assessment & Management",
        description: "Systematic identification, classification, and prioritization of security vulnerabilities across your infrastructure.",
        icon: Scan,
        compliance: ["HIPAA", "NIST 800-53", "ISO 27001"],
        details: {
          whatWeDo: [
            "Automated and manual vulnerability scanning across network, applications, and cloud",
            "Risk-based prioritization by exploitability, asset criticality, and business impact",
            "Integration with patch management workflows for streamlined remediation",
            "Continuous monitoring with weekly/daily scan cadence options",
            "Compliance mapping to HIPAA, NIST, and ISO requirements",
            "Validation scanning to confirm remediation effectiveness",
          ],
          outcomes: [
            "Clear visibility into your entire vulnerability landscape",
            "50% faster remediation through risk-based prioritization",
            "Reduced attack surface with continuous identification of weaknesses",
            "Compliance evidence for regulatory audits and assessments",
          ],
          deliverables: [
            "Executive vulnerability risk dashboard with trend analysis",
            "Detailed technical findings with remediation guidance",
            "Quarterly vulnerability management review",
            "Compliance mapping report (HIPAA/NIST/ISO)",
          ],
          ctaPrimaryTo: "/assessment",
          ctaPrimaryLabel: "Schedule Assessment",
          ctaSecondaryTo: "/contact",
          ctaSecondaryLabel: "Learn More",
        },
      },
      {
        step: "02",
        shortTitle: "Penetration Testing",
        fullTitle: "Pentest Web Applications, API's & Networks",
        description: "Authorized, rules-driven ethical hacking to identify exploitable vulnerabilities before attackers do.",
        icon: Bug,
        compliance: ["HIPAA", "NIST 800-53", "ISO 27001", "PCI DSS"],
        details: {
          whatWeDo: [
            "Comprehensive web application testing (OWASP Top 10, business logic flaws)",
            "API security testing (REST, GraphQL, SOAP) with authentication bypass attempts",
            "Network infrastructure testing (internal/external, wireless, cloud)",
            "Social engineering simulations (phishing, vishing, physical)",
            "Mobile application security testing (iOS, Android)",
            "Detailed reporting with proof-of-concept and remediation guidance",
          ],
          outcomes: [
            "Real-world validation of security controls and detection capabilities",
            "Critical vulnerabilities identified before they can be exploited",
            "Compliance with regulatory requirements for annual penetration testing",
            "Actionable roadmap for security improvements",
          ],
          deliverables: [
            "Comprehensive penetration test report with executive summary",
            "Proof-of-concept demonstrations for verified findings",
            "Remediation guidance with prioritized recommendations",
            "Retest validation after fixes are implemented",
          ],
          ctaPrimaryTo: "/assessment",
          ctaPrimaryLabel: "Schedule Pentest",
          ctaSecondaryTo: "/contact",
          ctaSecondaryLabel: "Discuss Scope",
        },
      },
      {
        step: "03",
        shortTitle: "SOC I Operation",
        fullTitle: "Security Information and Event Management (SIEM)",
        description: "24/7 security monitoring, threat detection, and incident response through enterprise-grade SIEM operations.",
        icon: Radar,
        compliance: ["HIPAA", "NIST 800-53", "ISO 27001", "SOC 2"],
        details: {
          whatWeDo: [
            "24/7 security monitoring with enterprise SIEM platform",
            "Custom detection rules tailored to your environment and threat landscape",
            "Threat hunting for advanced persistent threats and indicators of compromise",
            "Incident triage, investigation, and containment support",
            "Integration with EDR, cloud, and identity sources for comprehensive visibility",
            "Continuous rule tuning to reduce false positives and improve signal-to-noise",
          ],
          outcomes: [
            "Real-time threat detection with average containment under 30 minutes",
            "Reduced alert fatigue through signal optimization",
            "Comprehensive audit trail for compliance and investigations",
            "24/7 peace of mind with professional security monitoring",
          ],
          deliverables: [
            "Monthly SOC operations report (alerts, incidents, response times)",
            "Threat hunting findings and recommendations",
            "Incident response summaries with lessons learned",
            "Quarterly SIEM rule tuning and optimization review",
          ],
          ctaPrimaryTo: "/assessment",
          ctaPrimaryLabel: "Assess Monitoring",
          ctaSecondaryTo: "/contact",
          ctaSecondaryLabel: "Get SOC Quote",
        },
      },
      {
        step: "04",
        shortTitle: "Endpoint Detection",
        fullTitle: "Advanced Endpoint Detection & Response",
        description: "Continuous monitoring and response across all endpoints to detect, investigate, and mitigate threats in real-time.",
        icon: Monitor,
        compliance: ["HIPAA", "NIST 800-53", "ISO 27001"],
        details: {
          whatWeDo: [
            "Enterprise-grade EDR deployment and configuration",
            "24/7 monitoring for suspicious process behavior and fileless attacks",
            "Automated threat containment and isolation capabilities",
            "Forensic investigation and root cause analysis",
            "Threat hunting for endpoint-based indicators of compromise",
            "Integration with SIEM and SOAR for coordinated response",
          ],
          outcomes: [
            "Sub-minute detection and response to endpoint threats",
            "Complete visibility into endpoint activity and attacks",
            "Reduced dwell time with automated containment",
            "Forensic-ready data for investigations and compliance",
          ],
          deliverables: [
            "Monthly EDR operations report (threats detected, contained, investigated)",
            "Endpoint health and coverage dashboard",
            "Forensic investigation reports for security incidents",
            "Quarterly threat hunting findings and recommendations",
          ],
          ctaPrimaryTo: "/assessment",
          ctaPrimaryLabel: "Assess EDR",
          ctaSecondaryTo: "/contact",
          ctaSecondaryLabel: "Deploy EDR",
        },
      },
      {
        step: "05",
        shortTitle: "MS-365 Assessments",
        fullTitle: "Comprehensive Microsoft 365 Security Assessment",
        description: "Deep-dive security evaluation of your Microsoft 365 tenant to identify misconfigurations and security gaps.",
        icon: ShieldCheck,
        compliance: ["HIPAA", "NIST 800-53", "ISO 27001"],
        details: {
          whatWeDo: [
            "Identity and access management review (MFA, conditional access, legacy auth)",
            "Exchange Online security assessment (anti-phish, anti-spam, transport rules)",
            "SharePoint and OneDrive data governance and sharing policies",
            "Microsoft Teams security and external collaboration settings",
            "Defender for Office 365 configuration and effectiveness review",
            "Purview compliance and data loss prevention (DLP) assessment",
          ],
          outcomes: [
            "Hardened M365 tenant with 90% reduction in common misconfigurations",
            "Clear roadmap for security improvements aligned to Microsoft best practices",
            "Improved protection against email-based threats and data leaks",
            "Compliance with regulatory requirements for M365 environments",
          ],
          deliverables: [
            "M365 security posture assessment report with scorecard",
            "Detailed findings with remediation steps and priority levels",
            "Conditional access and MFA optimization recommendations",
            "Quarterly M365 security review and trend analysis",
          ],
          ctaPrimaryTo: "/assessment",
          ctaPrimaryLabel: "Assess M365",
          ctaSecondaryTo: "/contact",
          ctaSecondaryLabel: "Secure Tenant",
        },
      },
      {
        step: "06",
        shortTitle: "Security Awareness",
        fullTitle: "Employee Security Awareness & Training Program",
        description: "Comprehensive security awareness training to transform your employees from security risk into your first line of defense.",
        icon: Users,
        compliance: ["HIPAA", "NIST 800-53", "ISO 27001"],
        details: {
          whatWeDo: [
            "Role-based security awareness training curriculum",
            "Automated phishing simulations with varied templates and scenarios",
            "Real-time training for employees who click on simulated phishing",
            "Comprehensive reporting with click rates, trends, and department comparisons",
            "Custom training content aligned to your policies and risks",
            "Quarterly security newsletters and awareness communications",
          ],
          outcomes: [
            "50-70% reduction in phishing click rates within 6 months",
            "Improved security culture with employees as active defenders",
            "Compliance with regulatory training requirements",
            "Measurable reduction in security incidents caused by human error",
          ],
          deliverables: [
            "Monthly phishing simulation results and trend analysis",
            "Employee training completion and performance dashboard",
            "Department-level risk scoring and comparison",
            "Quarterly security awareness program review",
          ],
          ctaPrimaryTo: "/assessment",
          ctaPrimaryLabel: "Start Program",
          ctaSecondaryTo: "/contact",
          ctaSecondaryLabel: "Get Demo",
        },
      },
    ],
    []
  );

  const activePillar = activeIdx !== null ? pillars[activeIdx] : null;
  const activeContent = activePillar?.details;

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
      className={`section-padding bg-background relative overflow-hidden ${className}`}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />
      
      <div className="container-tight relative z-10">
        {showHeader && (
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Operations
              <br />
              <span className="none">For Modern Threats</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
                End-to-end security delivered through six specialized pillars: vulnerability management, penetration testing, 
  SOC operations, EDR, M365 assessments, and security awareness. Compliant with HIPAA, NIST, and ISO by design.
            </p>
          </div>
        )}

        {/* Cards Grid - 3x2 layout */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {/* Map through all pillars */}
          {pillars.map((pillar, idx) => {
            const isActive = activeIdx === idx;
            const Icon = pillar.icon;

            return (
              <Fragment key={pillar.step}>
                {/* Card */}
                <button
                  type="button"
                  onClick={() => setActiveIdx((v) => (v === idx ? null : idx))}
                  aria-expanded={isActive}
                  className={[
                    "text-left w-full h-full",
                    "relative p-8 rounded-2xl border bg-background/80 backdrop-blur-sm",
                    "transition-all duration-300",
                    "hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5",
                    isActive
                      ? "border-primary/40 shadow-xl shadow-primary/10 ring-2 ring-primary/20 scale-[1.02]"
                      : "border-border",
                  ].join(" ")}
                >
                  {/* Header with icon and title */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="shrink-0">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-2xl font-bold leading-tight text-white">{pillar.shortTitle}</h3>
                    </div>

                    <span className={[
                      "shrink-0 text-sm font-semibold px-3 py-1.5 rounded-full transition-colors",
                      isActive 
                        ? "bg-primary text-white" 
                        : "text-primary/70 bg-primary/10 border border-primary/20"
                    ].join(" ")}>
                      {pillar.step.replace(/^0/, "")}
                    </span>
                  </div>

                  <p className="text-muted-foreground leading-relaxed line-clamp-3">{pillar.description}</p>

                  {/* Compliance badges - only in expanded card */}
                  {isActive && pillar.compliance && pillar.compliance.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-border">
                      {pillar.compliance.map((compliance) => (
                        <span 
                          key={compliance}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-primary/10 text-primary/90 border border-primary/20"
                        >
                          <Award className="h-2.5 w-2.5" />
                          {compliance}
                        </span>
                      ))}
                    </div>
                  )}

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

                {/* Mobile expanded content */}
                <AnimatePresence initial={false}>
                  {isActive && activeContent && (
                    <motion.div
                      key={`${pillar.fullTitle}-mobile`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="md:hidden overflow-hidden col-span-1"
                    >
                      <div className="mt-4">
                        <MobileExpandedContent 
                          pillar={pillar} 
                          content={activeContent} 
                          onClose={close} 
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Desktop expanded content for Row 1 (cards 0,1,2) */}
                {idx === 2 && activeIdx !== null && activeIdx <= 2 && activeContent && (
                  <AnimatePresence initial={false}>
                    <motion.div
                      key={`row1-expanded`}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="hidden md:block col-span-3 overflow-hidden"
                    >
                      <div className="mt-2 mb-4">
                        <DesktopExpandedContent
                          pillar={pillars[activeIdx]}
                          content={activeContent}
                          onClose={close}
                        />
                      </div>
                    </motion.div>
                  </AnimatePresence>
                )}

                {/* Desktop expanded content for Row 2 (cards 3,4,5) */}
                {idx === 5 && activeIdx !== null && activeIdx >= 3 && activeIdx <= 5 && activeContent && (
                  <AnimatePresence initial={false}>
                    <motion.div
                      key={`row2-expanded`}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="hidden md:block col-span-3 overflow-hidden"
                    >
                      <div className="mt-2 mb-4">
                        <DesktopExpandedContent
                          pillar={pillars[activeIdx]}
                          content={activeContent}
                          onClose={close}
                        />
                      </div>
                    </motion.div>
                  </AnimatePresence>
                )}
              </Fragment>
            );
          })}
        </div>

        {/* Incident Ownership Section */}
        <div className="mt-10 p-6 rounded-3xl border border-primary/20 bg-primary/5">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold">Clear Incident Ownership</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We define who owns triage, containment, vendor escalation, and communications—so response is disciplined instead of improvised.
              </p>
            </div>
          </div>
        </div>

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
  pillar,
  content,
  onClose,
}: {
  pillar: CybersecurityPillar;
  content: any;
  onClose: () => void;
}) {
  const StepIcon = pillar.icon;

  return (
    <div className="relative">
      {/* Main expanded content */}
      <div className="relative rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-background via-background to-card/90 shadow-2xl shadow-primary/10 overflow-hidden">
        {/* Content */}
        <div className="relative p-8">
          {/* Header row - icon and title side by side */}
          <div className="flex items-start gap-4 mb-8">
            <div className="shrink-0">
              <StepIcon className="h-10 w-10 text-primary" />
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="text-2xl font-bold text-white">{pillar.fullTitle}</h4>
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

          {/* Compliance badges in expanded view */}
          {pillar.compliance && pillar.compliance.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8 pb-6 border-b border-border">
              <span className="text-sm font-medium text-muted-foreground mr-2">Compliance frameworks:</span>
              {pillar.compliance.map((compliance) => (
                <span 
                  key={compliance}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20"
                >
                  <FileCheck className="h-3.5 w-3.5" />
                  {compliance}
                </span>
              ))}
            </div>
          )}

          {/* Three-column content for desktop */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* What We Do */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-6 w-1 bg-primary/40 rounded-full" />
                <h4 className="text-lg font-semibold">What We Do</h4>
              </div>
              
              <div className="bg-primary/5 rounded-xl p-5 border border-primary/10 h-full">
                <ul className="space-y-2">
                  {content.whatWeDo.map((item: string, idx: number) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="flex items-start gap-2 text-sm"
                    >
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
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
              
              <div className="bg-primary/5 rounded-xl p-5 border border-primary/10 h-full relative overflow-hidden">
                {/* Decorative element */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-8 -mt-8" />
                <ul className="space-y-2 relative z-10">
                  {content.outcomes.map((item: string, idx: number) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="flex items-start gap-2 text-sm"
                    >
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span className="text-foreground/80 leading-relaxed">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Deliverables */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-6 w-1 bg-primary/40 rounded-full" />
                <h4 className="text-lg font-semibold">Deliverables</h4>
              </div>
              
              <div className="bg-primary/5 rounded-xl p-5 border border-primary/10 h-full relative overflow-hidden">
                {/* Decorative element */}
                <div className="absolute bottom-0 left-0 w-20 h-20 bg-primary/5 rounded-full -ml-8 -mb-8" />
                <ul className="space-y-2 relative z-10">
                  {content.deliverables.map((item: string, idx: number) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="flex items-start gap-2 text-sm"
                    >
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
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
              <Link to={`${content.ctaSecondaryTo}${getTrackingParams('cybersecurity-pillars', 'step_' + pillar.step, content.ctaSecondaryLabel.toLowerCase().replace(/\s+/g, '_'))}`}>
                {content.ctaSecondaryLabel}
              </Link>
            </Button>
            <Button variant="gradient" size="lg" asChild>
              <Link to={`${content.ctaPrimaryTo}${getTrackingParams('cybersecurity-pillars', 'step_' + pillar.step, content.ctaPrimaryLabel.toLowerCase().replace(/\s+/g, '_'))}`} className="inline-flex items-center justify-center gap-2">
                {content.ctaPrimaryLabel}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileExpandedContent({
  pillar,
  content,
  onClose,
}: {
  pillar: CybersecurityPillar;
  content: any;
  onClose: () => void;
}) {
  const StepIcon = pillar.icon;

  return (
    <div className="rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-background to-card/90 p-6 shadow-xl">
      {/* Header - icon and title side by side */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div className="flex items-center gap-3 flex-1">
          <div className="shrink-0">
            <StepIcon className="h-8 w-8 text-primary" />
          </div>
          <div className="flex-1">
            <h4 className="text-xl font-bold text-white mt-1">{pillar.fullTitle}</h4>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="shrink-0 p-2 hover:bg-background/80 rounded-lg transition-colors"
        >
          <X className="h-5 w-5 text-muted-foreground" />
        </button>
      </div>

      {/* Compliance badges in mobile expanded view */}
      {pillar.compliance && pillar.compliance.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-6 pb-4 border-b border-border">
          <span className="text-xs font-medium text-muted-foreground w-full mb-1">Compliance frameworks:</span>
          {pillar.compliance.map((compliance) => (
            <span 
              key={compliance}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-primary/10 text-primary/90 border border-primary/20"
            >
              <Award className="h-2.5 w-2.5" />
              {compliance}
            </span>
          ))}
        </div>
      )}

      {/* What We Do */}
      <div className="mb-5">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-4 w-1 bg-primary/40 rounded-full" />
          <h5 className="text-sm font-semibold">What We Do</h5>
        </div>
        <ul className="space-y-1.5">
          {content.whatWeDo.map((item: string) => (
            <li key={item} className="flex items-start gap-2 text-sm">
              <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <span className="text-foreground/80 leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Outcomes */}
      <div className="mb-5">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-4 w-1 bg-primary/40 rounded-full" />
          <h5 className="text-sm font-semibold">Outcomes</h5>
        </div>
        <ul className="space-y-1.5">
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
        <div className="flex items-center gap-2 mb-2">
          <div className="h-4 w-1 bg-primary/40 rounded-full" />
          <h5 className="text-sm font-semibold">Deliverables</h5>
        </div>
        <ul className="space-y-1.5">
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
          <Link to={`${content.ctaPrimaryTo}${getTrackingParams('cybersecurity-pillars', 'step_' + pillar.step + '_mobile', content.ctaPrimaryLabel.toLowerCase().replace(/\s+/g, '_'))}`} className="inline-flex items-center justify-center gap-2">
            {content.ctaPrimaryLabel}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
        <Button variant="outline" size="lg" asChild className="w-full">
          <Link to={`${content.ctaSecondaryTo}${getTrackingParams('cybersecurity-pillars', 'step_' + pillar.step + '_mobile', content.ctaSecondaryLabel.toLowerCase().replace(/\s+/g, '_'))}`}>
            {content.ctaSecondaryLabel}
          </Link>
        </Button>
      </div>
    </div>
  );
}