import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  CheckCircle2, 
  ChevronDown, 
  X, 
  ArrowRight,
  HeadphonesIcon,
  Shield,
  Network,
  Server,
  Cloud,
  Users,
  FileCheck,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/common/SectionHeader";
import { getTrackingParams } from "@/components/common/Tracking";

type ManagedITPillar = {
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

type ManagedITPillarsProps = {
  showHeader?: boolean;
  className?: string;
};

export function ManagedITPillars({ showHeader = true, className = "" }: ManagedITPillarsProps) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  const pillars: ManagedITPillar[] = useMemo(
    () => [
      {
        step: "01",
        shortTitle: "IT Helpdesk",
        fullTitle: "End-User Support & Help Desk Operations",
        description: "Responsive, tiered support for your team with defined SLAs and escalation paths that keep productivity high and downtime low.",
        icon: HeadphonesIcon,
        compliance: ["HIPAA Security Rule", "ISO 27001"],
        details: {
          whatWeDo: [
            "Multi-tier help desk with 24/7 ticket intake and priority-based routing",
            "User onboarding/offboarding with account provisioning and hardware setup",
            "HIPAA-compliant access management with audit trail documentation",
            "Application troubleshooting and access management with role-based controls",
            "Quarterly user satisfaction surveys with action plan implementation",
            "Security awareness training aligned with HIPAA and NIST requirements",
          ],
          outcomes: [
            "90%+ first-contact resolution rate for common issues",
            "Average response time under 30 minutes for priority tickets",
            "Reduced employee downtime with faster issue resolution",
            "Compliant user access management with complete audit trails",
          ],
          deliverables: [
            "Monthly support metrics dashboard (response times, resolution rates, backlog)",
            "User satisfaction survey results with trend analysis",
            "HIPAA-compliant access review reports and user activity logs",
            "Ticket trend analysis with proactive remediation recommendations",
          ],
          ctaPrimaryTo: "/assessment",
          ctaPrimaryLabel: "Assess Support",
          ctaSecondaryTo: "/contact",
          ctaSecondaryLabel: "See Plans",
        },
      },
      {
        step: "02",
        shortTitle: "MSSP IT",
        fullTitle: "Managed Security Services & Threat Protection",
        description: "Continuous security monitoring, threat detection, and response—protecting your business from evolving cyber threats.",
        icon: Shield,
        compliance: ["HIPAA Security Rule", "NIST 800-53", "ISO 27001"],
        details: {
          whatWeDo: [
            "24/7 security monitoring with SIEM and SOC oversight",
            "Endpoint detection and response (EDR) with automated threat containment",
            "NIST 800-53 control implementation and continuous monitoring",
            "Vulnerability scanning and prioritized remediation tracking",
            "HIPAA Security Rule compliance assessments and gap remediation",
            "Incident response planning and tabletop exercise facilitation",
          ],
          outcomes: [
            "Real-time threat detection with average containment under 15 minutes",
            "NIST 800-53 and HIPAA-compliant security posture",
            "Reduced attack surface with continuous vulnerability management",
            "Audit-ready evidence for ISO 27001 certification and renewal",
          ],
          deliverables: [
            "Monthly security posture report with compliance scorecard",
            "NIST 800-53 control implementation documentation",
            "HIPAA Security Rule compliance assessment and remediation plan",
            "Incident response runbooks and tabletop exercise documentation",
          ],
          ctaPrimaryTo: "/assessment",
          ctaPrimaryLabel: "Assess Security",
          ctaSecondaryTo: "/contact",
          ctaSecondaryLabel: "Get Protected",
        },
      },
      {
        step: "03",
        shortTitle: "Network & Monitoring",
        fullTitle: "Network Infrastructure & Proactive Monitoring",
        description: "24/7 network monitoring, performance optimization, and rapid response to infrastructure issues before they impact users.",
        icon: Network,
        compliance: ["HIPAA Security Rule", "NIST 800-53", "ISO 27001"],
        details: {
          whatWeDo: [
            "24/7 network monitoring with automated alerting and escalation",
            "Firewall and switch configuration management with security hardening per NIST guidelines",
            "WiFi performance optimization and coverage analysis",
            "Bandwidth utilization monitoring and capacity planning",
            "Network segmentation for HIPAA compliance (ePHI isolation)",
            "Quarterly network health assessments with remediation planning",
          ],
          outcomes: [
            "99.9% network uptime with proactive issue detection",
            "30% reduction in network-related incidents through preventive maintenance",
            "HIPAA-compliant network architecture with ePHI traffic isolation",
            "Comprehensive audit trails meeting ISO 27001 requirements",
          ],
          deliverables: [
            "Network topology diagrams with ePHI data flow documentation",
            "Monthly network performance and uptime report",
            "Firewall rule review with NIST compliance mapping",
            "Network security assessment with remediation recommendations",
          ],
          ctaPrimaryTo: "/assessment",
          ctaPrimaryLabel: "Review Network",
          ctaSecondaryTo: "/contact",
          ctaSecondaryLabel: "Get Monitoring",
        },
      },
      {
        step: "04",
        shortTitle: "Server & Cloud",
        fullTitle: "Server Administration & Cloud Infrastructure",
        description: "Comprehensive management of on-premise servers and cloud infrastructure with performance optimization and security hardening.",
        icon: Server,
        compliance: ["HIPAA Security Rule", "NIST 800-53", "ISO 27001"],
        details: {
          whatWeDo: [
            "Server patch management with automated deployment and testing",
            "Cloud infrastructure optimization (AWS/Azure/Google Cloud) with HIPAA-compliant configurations",
            "Database administration with encryption at rest and in transit",
            "Server performance monitoring with proactive capacity planning",
            "NIST 800-53 baseline configuration implementation",
            "Disaster recovery testing and failover validation",
          ],
          outcomes: [
            "Critical servers patched within 7 days of release",
            "30% average cloud cost reduction through right-sizing and reservations",
            "HIPAA-compliant server configurations with full audit trails",
            "Compliant, hardened server configurations meeting ISO 27001 standards",
          ],
          deliverables: [
            "Server inventory with patch compliance dashboard",
            "Cloud cost analysis with optimization recommendations",
            "HIPAA compliance evidence package for server infrastructure",
            "Disaster recovery test results with improvement plan",
          ],
          ctaPrimaryTo: "/assessment",
          ctaPrimaryLabel: "Audit Servers",
          ctaSecondaryTo: "/contact",
          ctaSecondaryLabel: "Optimize Cloud",
        },
      },
      {
        step: "05",
        shortTitle: "Cloud Migration",
        fullTitle: "Cloud Migration & Digital Transformation",
        description: "Strategic migration of workloads to the cloud with minimal disruption, cost optimization, and post-migration governance.",
        icon: Cloud,
        compliance: ["HIPAA Security Rule", "NIST 800-53", "ISO 27001"],
        details: {
          whatWeDo: [
            "Workload assessment and migration readiness evaluation",
            "Lift-and-shift and re-platforming migration strategies",
            "Cloud-native architecture design with HIPAA-compliant controls",
            "Data migration with encryption and validation procedures",
            "NIST 800-53 control implementation in cloud environments",
            "Post-migration optimization and governance framework setup",
          ],
          outcomes: [
            "30-50% reduction in infrastructure costs post-migration",
            "Zero-data-loss migrations with validated rollback capabilities",
            "HIPAA-compliant cloud architecture with ePHI protection",
            "ISO 27001-ready cloud governance framework",
          ],
          deliverables: [
            "Migration readiness assessment with compliance gap analysis",
            "HIPAA-compliant cloud architecture documentation",
            "Post-migration security controls mapping to NIST 800-53",
            "Cloud governance framework with compliance monitoring",
          ],
          ctaPrimaryTo: "/assessment",
          ctaPrimaryLabel: "Plan Migration",
          ctaSecondaryTo: "/contact",
          ctaSecondaryLabel: "Learn More",
        },
      },
      {
        step: "06",
        shortTitle: "IT Strategy & Guidance (vCIO)",
        fullTitle: "Virtual CIO & Strategic IT Guidance",
        description: "Executive-level IT strategy, roadmapping, and governance—aligning technology investments with business objectives and compliance requirements.",
        icon: Users,
        compliance: ["HIPAA", "NIST CSF", "ISO 27001"],
        details: {
          whatWeDo: [
            "IT strategic planning with 3-5 year technology roadmap",
            "Budget planning and vendor management oversight",
            "Technology risk assessment and compliance strategy",
            "Quarterly business reviews with leadership team",
            "Compliance program development (HIPAA, NIST, ISO)",
          ],
          outcomes: [
            "Technology investments aligned with business growth objectives",
            "Reduced IT costs through strategic vendor consolidation",
            "Clear roadmap with prioritized initiatives and ROI projections",
            "Board-ready reporting on compliance posture and risk mitigation",
          ],
          deliverables: [
            "Strategic technology roadmap with compliance milestones",
            "IT budget planning template with cost optimization opportunities",
            "Quarterly business review presentation with compliance dashboard",
            "Compliance roadmap for HIPAA, NIST, and ISO certification",
          ],
          ctaPrimaryTo: "/assessment",
          ctaPrimaryLabel: "Schedule vCIO",
          ctaSecondaryTo: "/contact",
          ctaSecondaryLabel: "Get Strategy",
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
          <SectionHeader
            title="IT Framework For Regulated Industries"
            description="A unified operating model spanning help desk, security, infrastructure, and strategy—designed for organizations requiring HIPAA, NIST, and ISO compliance.."
          />
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
                      <h3 className="text-2xl font-bold leading-tight text-foreground">{pillar.shortTitle}</h3>
                    </div>

                    <span className={[
                      "shrink-0 text-sm font-semibold px-3 py-1.5 rounded-full transition-colors",
                      isActive 
                        ? "bg-primary text-primary-foreground" 
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
  pillar: ManagedITPillar;
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
              <h4 className="text-2xl font-bold text-foreground">{pillar.fullTitle}</h4>
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

          {/* Three-column content for desktop - creative layout */}
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
              <Link to={`${content.ctaSecondaryTo}${getTrackingParams('managed-it-pillars', 'step_' + pillar.step, content.ctaSecondaryLabel.toLowerCase().replace(/\s+/g, '_'))}`}>
                {content.ctaSecondaryLabel}
              </Link>
            </Button>
            <Button variant="gradient" size="lg" asChild>
              <Link to={`${content.ctaPrimaryTo}${getTrackingParams('managed-it-pillars', 'step_' + pillar.step, content.ctaPrimaryLabel.toLowerCase().replace(/\s+/g, '_'))}`} className="inline-flex items-center justify-center gap-2">
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
  pillar: ManagedITPillar;
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
            <h4 className="text-xl font-bold text-foreground mt-1">{pillar.fullTitle}</h4>
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
          <Link to={`${content.ctaPrimaryTo}${getTrackingParams('managed-it-pillars', 'step_' + pillar.step + '_mobile', content.ctaPrimaryLabel.toLowerCase().replace(/\s+/g, '_'))}`} className="inline-flex items-center justify-center gap-2">
            {content.ctaPrimaryLabel}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
        <Button variant="outline" size="lg" asChild className="w-full">
          <Link to={`${content.ctaSecondaryTo}${getTrackingParams('managed-it-pillars', 'step_' + pillar.step + '_mobile', content.ctaSecondaryLabel.toLowerCase().replace(/\s+/g, '_'))}`}>
            {content.ctaSecondaryLabel}
          </Link>
        </Button>
      </div>
    </div>
  );
}