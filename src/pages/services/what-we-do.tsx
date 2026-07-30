import { useEffect, useMemo, useState } from "react";
import type { ElementType } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { BottomBreadcrumbs } from "@/components/common/BottomBreadcrumbs";
import { ProcessExpandable } from "@/components/common/ProcessExpandable";

import {
  Server,
  Users,
  Cloud,
  Wifi,
  HardDrive,
  FileCheck2,
  Activity,
  Radar,
  Search,
  ClipboardCheck,
  Wrench,
  BarChart3,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ShieldCheck,
  Lock,
  MailCheck,
  Workflow,
  AlertTriangle,
  KeyRound,
  Shield,
  BrainCircuit,
} from "lucide-react";

import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Helmet } from "react-helmet-async";
import { getTrackingParams } from "@/components/common/Tracking";

// Standardized styling constants
const CARD_BASE = "rounded-3xl bg-card p-7 flex flex-col h-full";
const GLOW_CARD =
  "border border-border " +
  "transition-[border-color,box-shadow] duration-200 " +
  "hover:border-primary/30 hover:ring-1 hover:ring-primary/20 " +
  "hover:shadow-[0_0_0_1px_hsl(var(--primary)/0.14),0_0_18px_hsl(var(--primary)/0.10)] " +
  "transform-gpu will-change-[box-shadow]";

const ICON_TITLE_PILL =
  "inline-flex items-center gap-3 px-4 py-3 rounded-2xl " +
  "bg-primary/10 text-primary border border-primary/20";

const OG_IMAGE = "https://velcoretech.com/og-image.png";
const CANONICAL = "https://velcoretech.com/services";
const SCHEDULER_URL = "https://cal.com/velcoreit";

type ServiceId =
  | "Managed-IT"
  | "identity-access"
  | "m365-cloud"
  | "network-firewall"
  | "backup-recovery"
  | "governance-compliance"
  | "edge-security"
  | "security-monitoring"
  | "incident-readiness"
  | "penetration-testing"
  | "ai-development";

type Service = {
  id: ServiceId;
  icon: ElementType;
  title: string;
  subtitle: string;
  bestFor: string;
  whatYouGet: string[];
  howWeOperate: string[];
};

// For the ProcessExpandable component (with step numbers)
const processStepsExpandable = [
  {
    step: "01",
    title: "Baseline & Risk Mapping",
    description:
      "We baseline identity, endpoints, cloud, network, recovery, and edge. Then we prioritize gaps by business impact and risk.",
    icon: Activity,
  },
  {
    step: "02",
    title: "Standardize Controls",
    description:
      "We enforce least privilege, endpoint hardening, M365 governance, logging posture, DNS/WAF protections, and change control.",
    icon: ShieldCheck,
  },
  {
    step: "03",
    title: "Operate With Cadence",
    description:
      "We run IT with monitoring, maintenance windows, reporting, lifecycle governance, and continuous improvement.",
    icon: ClipboardCheck,
  },
];

// For the Operating Model section (without step numbers)
const operatingModelSteps = [
  {
    icon: Workflow,
    title: "Baseline",
    description:
      "We establish documented standards across identity, endpoints, email, network, and recovery—so the environment becomes predictable.",
  },
  {
    icon: Wrench,
    title: "Operate",
    description:
      "Monitoring, patch governance, support workflows, and change control—run consistently with clear ownership.",
  },
  {
    icon: AlertTriangle,
    title: "Harden",
    description:
      "We close gaps and reduce exposure through least privilege, segmentation, email defense, backup validation, and edge controls.",
  },
  {
    icon: BarChart3,
    title: "Report",
    description:
      "Leadership-grade reporting: posture, trends, and prioritized next actions—without dashboards full of noise.",
  },
];

function useScrollToHash() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;

    const id = decodeURIComponent(hash.replace("#", "")).trim();
    if (!id) return;

    let cancelled = false;
    let tries = 0;
    const maxTries = 25;

    const tryFind = () => {
      if (cancelled) return;
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      tries += 1;
      if (tries < maxTries) window.setTimeout(tryFind, 50);
    };

    requestAnimationFrame(tryFind);
    return () => {
      cancelled = true;
    };
  }, [hash]);
}

const SERVICE_PILLAR_ROUTE: Partial<Record<ServiceId, string>> = {
  "Managed-IT": "/services/managed-it",
  "identity-access": "/services/consulting#identity-access",
  "m365-cloud": "/services/cloud#m365-cloud",
  "network-firewall": "/services/networking#network-firewall",
  "backup-recovery": "/services/cloud#backup-recovery",
  "governance-compliance": "/services/audit-ready#governance-compliance",
  "edge-security": "/services/edge#edge-security",
  "security-monitoring": "/services/cybersecurity#security-operations",
  "incident-readiness": "/services/cybersecurity#incident-readiness",
  "penetration-testing": "/services/cybersecurity#penetration-testing",
  "ai-development": "/services/ai-development",
};

const services: Service[] = [
  {
    id: "Managed-IT",
    icon: Server,
    title: "Managed IT Operations",
    subtitle:
      "Day-to-day IT operations with defined standards, discipline, and executive visibility.",
    bestFor:
      "Organizations that require reliable operations, clear ownership, and predictable service delivery.",
    whatYouGet: [
      "24/7 monitoring and incident response with defined SLAs",
      "Patch and update governance with scheduled maintenance windows",
      "Help desk support with escalation paths and accountable ownership",
      "Endpoint standards (Windows/macOS) and lifecycle management",
      "Asset inventory and operational health visibility",
      "Executive reporting on risk, reliability, and priority workstreams",
    ],
    howWeOperate: [
      "Baseline → standardize → operate with cadence",
      "Change control for production-impacting work",
      "Documentation designed for continuity and auditability",
    ],
  },
  {
    id: "identity-access",
    icon: KeyRound,
    title: "Identity & Access Management",
    subtitle:
      "Identity controls that reduce compromise risk: least privilege, privileged separation, and lifecycle governance.",
    bestFor:
      "Microsoft 365 / Entra ID and Google Workspace environments requiring defensible access controls.",
    whatYouGet: [
      "MFA enforcement and authentication policy baselines",
      "Conditional Access baselines (where applicable) with exception governance",
      "Privileged role governance and administrative separation",
      "Onboarding/offboarding workflows to prevent orphan access",
      "Access review cadence for sensitive roles and groups",
      "Account compromise response playbooks for rapid containment",
    ],
    howWeOperate: [
      "Privileged access first; reduce blast radius",
      "Quarterly access hygiene and control validation",
      "Documented changes to support evidence and continuity",
    ],
  },
  {
    id: "m365-cloud",
    icon: Cloud,
    title: "Microsoft 365 & Cloud Security",
    subtitle:
      "Tenant governance and security baselines: email defense, data exposure controls, and auditable configuration practices.",
    bestFor:
      "Organizations operating on Microsoft 365 that need disciplined governance without building internal overhead.",
    whatYouGet: [
      "Tenant baseline assessment with prioritized hardening roadmap",
      "Email security controls (phishing/impersonation defenses and hygiene)",
      "SharePoint/OneDrive exposure review and sharing governance",
      "Retention and logging guidance aligned to risk and business requirements",
      "License and configuration rationalization",
      "Secure administrative practices and operating procedures",
    ],
    howWeOperate: [
      "Baseline → enforce → monitor → report",
      "Least-privilege administration with clean separation",
      "Governed change processes for configuration and exposure controls",
    ],
  },
  {
    id: "network-firewall",
    icon: Wifi,
    title: "Network & Firewall Engineering",
    subtitle:
      "Segmentation, secure access, and firewall governance to improve resilience and reduce operational and security risk.",
    bestFor:
      "Office and multi-site environments requiring segmentation, secure remote access, and stable connectivity.",
    whatYouGet: [
      "Segmentation blueprint (staff/guest/IT/IoT/voice) with implementation guidance",
      "Firewall policy design, rule hygiene, and exception governance",
      "VPN / ZTNA architecture review and hardening",
      "Wi-Fi security tuning (coverage, access control, posture)",
      "Site-to-site reliability improvements",
      "Network diagrams and baseline documentation",
    ],
    howWeOperate: [
      "Deny-by-default posture for sensitive segments",
      "Formal change control for firewall and segmentation changes",
      "Periodic review of rule growth and exposure exceptions",
    ],
  },
  {
    id: "backup-recovery",
    icon: HardDrive,
    title: "Backup, Recovery & Ransomware Readiness",
    subtitle:
      "Recovery capability designed for execution: validated restores, clear RPO/RTO expectations, and ransomware recovery planning.",
    bestFor:
      "Organizations that require dependable restoration capability and reduced downtime risk.",
    whatYouGet: [
      "Backup coverage validation (protected vs. unprotected systems)",
      "Restore readiness assessment with a test plan and ownership",
      "Ransomware recovery gap analysis with remediation guidance",
      "3-2-1 alignment and immutability patterns where supported",
      "Restore runbooks for critical workflows",
      "Business continuity alignment and leadership reporting (RPO/RTO clarity)",
    ],
    howWeOperate: [
      "Restore testing as a standard, not an exception",
      "Immutable patterns where supported and appropriate",
      "Routine restore validation cadence based on plan",
    ],
  },
  {
    id: "governance-compliance",
    icon: FileCheck2,
    title: "Governance & Compliance Readiness",
    subtitle:
      "Audit-ready controls and evidence built into operations—without unnecessary overhead.",
    bestFor:
      "SOC 2, HIPAA-aligned controls, cyber insurance requirements, and vendor security expectations.",
    whatYouGet: [
      "Control mapping and practical gap identification",
      "Evidence-ready documentation structure and reporting cadence",
      "Policy standards templates designed for adoption",
      "Vendor questionnaires support and security posture narratives",
      "Access reviews and security hygiene cadence aligned to risk",
      "Remediation tracking with executive summaries",
    ],
    howWeOperate: [
      "Operational discipline over one-time compliance projects",
      "Measurable, repeatable controls and evidence generation",
      "Low-friction reporting designed for ongoing governance",
    ],
  },
  {
    id: "edge-security",
    icon: Radar,
    title: "Edge Security (DNS/WAF/DDoS)",
    subtitle:
      "Govern and protect the external surface area: DNS hardening, WAF governance, and DDoS resilience.",
    bestFor:
      "Organizations with public websites, web applications, domains, and externally exposed services.",
    whatYouGet: [
      "DNS hardening and domain protection patterns",
      "WAF baselines and tuning aligned to exposure and traffic",
      "DDoS protections with safe default posture",
      "Origin protection guidance and TLS/SSL hygiene",
      "Security header guidance where applicable",
      "Change control around DNS and edge rule modifications",
    ],
    howWeOperate: [
      "Govern edge controls to reduce misconfiguration risk",
      "Baseline first, tune based on telemetry and business exposure",
      "Document exceptions with rationale and ownership",
    ],
  },
  {
    id: "security-monitoring",
    icon: Search,
    title: "Security Monitoring & Detection (SOC I/II)",
    subtitle:
      "Actionable monitoring across identity, endpoints, email, and edge—focused on high-signal detection and response.",
    bestFor:
      "Organizations seeking detection maturity without building and staffing a full SOC function.",
    whatYouGet: [
      "Logging posture assessment (coverage and blind spots)",
      "High-signal alert baselines aligned to organizational risk",
      "Detection tuning to reduce false positives and operational load",
      "Priority signals across identity, endpoint, and email",
      "Response workflow for suspicious activity with clear ownership",
      "Monthly reporting on trends, notable events, and risk areas",
    ],
    howWeOperate: [
      "High-signal detection philosophy and continuous tuning",
      "Environment-specific detections over generic templates",
      "Alerts mapped to response actions and closure evidence",
    ],
  },
  {
    id: "incident-readiness",
    icon: ClipboardCheck,
    title: "Incident Readiness & Response Planning",
    subtitle:
      "Prepare leadership and technical teams with clear roles, escalation paths, containment playbooks, and recovery alignment.",
    bestFor:
      "Organizations that need a clear, executable incident response framework before an event occurs.",
    whatYouGet: [
      "Playbooks for common scenarios (phishing/BEC, ransomware, device loss)",
      "Roles, responsibilities, and escalation paths (RACI-style clarity)",
      "Containment checklists and decision trees",
      "Optional tabletop exercise to validate decision-making and execution",
      "Recovery alignment (backups, restores, communications) integrated into IR",
      "Post-incident review framework and continuous improvement loop",
    ],
    howWeOperate: [
      "Simple, executable playbooks designed for real incidents",
      "Reduced time-to-contain and time-to-restore",
      "Executive-grade structure with ownership and accountability",
    ],
  },
  {
    id: "penetration-testing",
    icon: ShieldCheck,
    title: "Penetration Testing (Networks, Web Apps, APIs)",
    subtitle:
      "Controlled security testing with clear findings, prioritized remediation guidance, and optional retesting.",
    bestFor:
      "Organizations that require validation for risk management, audits, launches, or third-party assurance.",
    whatYouGet: [
      "Scoping and rules of engagement",
      "Network penetration testing (internal/external as applicable)",
      "Web application testing (OWASP-aligned)",
      "API security testing (auth, access control, input validation)",
      "Findings report with severity, context, and remediation guidance",
      "Optional retest to validate remediation and closure",
    ],
    howWeOperate: [
      "Authorized, scoped, and safe testing only",
      "Findings tailored to your environment and threat profile",
      "Prioritized remediation based on impact and exploitability",
    ],
  },
  {
    id: "ai-development",
    icon: BrainCircuit,
    title: "AI Development & Automation",
    subtitle:
      "Purpose-built AI assistants, workflow automation, and custom AI integrations — deployed in weeks, security-reviewed, and sized for SMBs.",
    bestFor:
      "Organizations that want to put AI to work without enterprise overhead — from AI assistants to custom integrations.",
    whatYouGet: [
      "AI use-case assessment with ROI estimates and implementation priority",
      "Custom AI assistants (OpenClaw, Hermes, or bespoke) with knowledge grounding",
      "n8n or Zapier-based workflow automations connected to your existing tools",
      "Claude API / OpenAI API integrations with auth, rate limiting, and audit logging",
      "RAG pipelines for private knowledge bases and internal documentation",
      "Security-reviewed deployment: data handling, access controls, and audit trail",
    ],
    howWeOperate: [
      "Discovery → build → deploy: defined scope, working deliverable",
      "Security-aware from day one — no training-data leakage by design",
      "Ongoing support as model capabilities evolve",
    ],
  },
];

const faqs = [
  {
    q: "Do you only work in California ?",
    a: "No. Velcore Tech is CA-based and supports organizations nationwide. For some clients we do hybrid (remote + onsite), depending on needs.",
  },
  {
    q: "What size organizations are a good fit?",
    a: "Typically 10–250 users. Many clients are Microsoft 365-based and want clean security controls with measurable IT operations.",
  },
  {
    q: "Do you replace internal IT?",
    a: "Sometimes. We can be the full IT function or augment internal IT leadership and staff (co-managed model).",
  },
  {
    q: "How do we start?",
    a: "Start with an IT & Security Assessment. It establishes a baseline, identifies gaps, and produces a prioritized roadmap with clear next steps.",
  },
];

function ExpandableFAQ({
  q,
  a,
  open,
  onToggle,
}: {
  q: string;
  a: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={[
        "w-full text-left p-5 rounded-2xl bg-background",
        GLOW_CARD,
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
      ].join(" ")}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="font-semibold">{q}</div>
        <ChevronDown
          className={`h-5 w-5 text-muted-foreground transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="pt-3 text-sm text-muted-foreground leading-relaxed">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}

function ServiceBlock({ service }: { service: Service }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const Icon = service.icon;

  return (
    <motion.div
      id={service.id}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="scroll-mt-24"
    >
      <div className={[CARD_BASE, GLOW_CARD, "bg-card/70 p-8"].join(" ")}>
        {/* Header with icon and title side by side - Clickable to expand/collapse */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-2xl"
        >
          <div className="flex items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20">
                <Icon className="h-6 w-6" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">{service.title}</h2>
            </div>
            <ChevronDown
              className={`h-6 w-6 text-muted-foreground transition-transform duration-300 flex-shrink-0 ${
                isExpanded ? "rotate-180" : ""
              }`}
            />
          </div>

          <p className="text-muted-foreground mb-6 leading-relaxed">
            {service.subtitle}
          </p>
        </button>

        {/* Expanded content */}
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="overflow-hidden"
            >
              {/* Two columns */}
              <div className="grid lg:grid-cols-2 gap-8 mt-4">
                <div className="rounded-2xl border border-border bg-background/60 p-6">
                  <div className="text-sm font-semibold tracking-wide uppercase text-muted-foreground mb-3">
                    What you get
                  </div>
                  <ul className="space-y-3">
                    {service.whatYouGet.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl border border-border bg-background/60 p-6">
                  <div className="text-sm font-semibold tracking-wide uppercase text-muted-foreground mb-3">
                    How we operate
                  </div>
                  <ul className="space-y-3">
                    {service.howWeOperate.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <Lock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 p-4 rounded-2xl bg-card/70 border border-border">
                    <div className="text-sm text-muted-foreground">
                      <span className="text-foreground font-semibold">Best fit: </span>
                      {service.bestFor}
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA row */}
              {SERVICE_PILLAR_ROUTE[service.id] && (
                <div className="mt-6 flex justify-center">
                  <Button variant="outline-glow" asChild>
                    <Link 
                      to={`${SERVICE_PILLAR_ROUTE[service.id]}${getTrackingParams('services', 'service_block', service.id.replace(/-/g, '_'))}`}
                    >
                      Learn more <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function Services() {
  useScrollToHash();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const quickJump = useMemo(
    () => [
      { id: "Managed-IT" as const, label: "Managed IT", icon: Server },
      { id: "identity-access" as const, label: "Identity", icon: Users },
      { id: "m365-cloud" as const, label: "Microsoft 365", icon: Cloud },
      { id: "network-firewall" as const, label: "Network", icon: Wifi },
      { id: "backup-recovery" as const, label: "Recovery", icon: HardDrive },
      { id: "governance-compliance" as const, label: "Compliance", icon: FileCheck2 },
      { id: "edge-security" as const, label: "Edge", icon: Radar },
      { id: "security-monitoring" as const, label: "SOC I/II", icon: Search },
      { id: "incident-readiness" as const, label: "Incident Response", icon: AlertTriangle },
    ],
    []
  );

  // Reordered services for the Service Areas section
  const reorderedServices = useMemo(() => {
    // Start with Managed IT
    const managedIT = services.find(s => s.id === "Managed-IT");
    // Then Cybersecurity services
    const cybersecurityServices = services.filter(s => 
      ["security-monitoring", "incident-readiness", "penetration-testing", "edge-security"].includes(s.id)
    );
    // Then Consulting services (everything else)
    const consultingServices = services.filter(s => 
      !["Managed-IT", "security-monitoring", "incident-readiness", "penetration-testing", "edge-security"].includes(s.id)
    );

    return [
      ...(managedIT ? [managedIT] : []),
      ...cybersecurityServices,
      ...consultingServices
    ];
  }, []);

  return (
    <Layout>
      <Helmet>
        <title>Services | Velcore Tech</title>
        <meta
          name="description"
          content="Security-first managed IT services, cybersecurity, Microsoft 365 governance, network & firewall engineering, backup & recovery, compliance readiness, edge security, monitoring, and incident readiness. Serving CA & nationwide."
        />
        <link rel="canonical" href={CANONICAL} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Velcore Tech" />
        <meta property="og:title" content="Services | Velcore Tech" />
        <meta
          property="og:description"
          content="Security-first managed IT services, cybersecurity, Microsoft 365 governance, network & firewall, backup & recovery, compliance readiness, edge security, monitoring, and incident readiness."
        />
        <meta property="og:url" content={CANONICAL} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:image:alt"
          content="Velcore Tech - Security-First Managed IT & Cybersecurity"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Services | Velcore Tech" />
        <meta
          name="twitter:description"
          content="Security-first managed IT services, cybersecurity, Microsoft 365 governance, network & firewall, backup & recovery, compliance readiness, edge security, monitoring, and incident readiness."
        />
        <meta name="twitter:image" content={OG_IMAGE} />

        {/* FAQ structured data */}
        {faqs.length > 0 && (
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqs.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: f.a,
                },
              })),
            })}
          </script>
        )}
      </Helmet>

      {/* HERO SECTION */}
      <section className="relative overflow-hidden hero-gradient pt-24 pb-12">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[420px] bg-hero-glow opacity-40 pointer-events-none" />
        <div className="container-tight relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-primary/10 text-primary border border-primary/20 mb-4">
              <Server className="h-4 w-4" />
              <span>What we do</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold tracking-tight mb-4">
              IT Operations
              <span className="text-gradient block mt-2">Leadership Can Trust</span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Velcore Tech standardizes and operates IT + security as one accountable system—so 
              downtime drops, risk reduces, and your environment becomes defensible.
            </p>

          </div>
        </div>
      </section>

      {/* Quick Jump */}
      <section className="pb-12 bg-background">
        <div className="container-tight">
          <div className="flex flex-wrap gap-2 justify-center">
            {quickJump.map((x) => (
              <Button key={x.id} variant="outline-glow" size="sm" asChild>
                <Link 
                  to={`/services#${x.id}`} 
                  className="inline-flex items-center gap-2"
                >
                  <x.icon className="h-4 w-4" />
                  {x.label}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS SECTION - Operating Model */}
      <section className="py-20 bg-card">
        <div className="container-tight">
          <SectionHeader
            badge="Operating Model"
            title="How We Deliver Predictable Outcomes"
            description="We don't 'react to tickets.' We run a disciplined cycle that makes IT stable and security defensible."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
            {operatingModelSteps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.08 }}
                className={[CARD_BASE, GLOW_CARD, "bg-background/60"].join(" ")}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <step.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES LIST SECTION - Reordered and Collapsible */}
      <section className="py-20 bg-background">
        <div className="container-tight">
          <SectionHeader
            badge="Service Areas"
            title="What We Run, Harden, and Maintain"
            description="Each service below includes what you get and how we operate it—so scope is clear and outcomes are measurable."
          />

          <div className="space-y-8 mt-14">
            {reorderedServices.map((s) => (
              <ServiceBlock key={s.id} service={s} />
            ))}
          </div>
        </div>
      </section>
      
      {/* EXPANDABLE PROCESS SECTION - Detailed methodology */}
      <ProcessExpandable steps={processStepsExpandable} showHeader={true} />

      {/* OUTCOMES SECTION */}
      <section className="py-20 bg-card">
        <div className="container-tight">
          <SectionHeader
            badge="Outcomes"
            title="What Clients Typically Experience"
            description="This is what 'security-first operations' looks like in practice."
          />

          <div className="grid lg:grid-cols-3 gap-6 mt-14">
            {[
              {
                icon: ShieldCheck,
                title: "Lower Risk, Fewer Surprises",
                desc: "Identity and endpoint standards reduce common attack paths and misconfigurations.",
              },
              {
                icon: Search,
                title: "Visibility Into What Matters",
                desc: "Clear reporting: where risk is trending, what's improving, and what needs priority next.",
              },
              {
                icon: HardDrive,
                title: "Better Recovery Readiness",
                desc: "Backups + restore practice reduce downtime when things go wrong.",
              },
              {
                icon: MailCheck,
                title: "Cleaner Email Posture",
                desc: "Reduced phishing exposure through baseline controls and hygiene discipline.",
              },
              {
                icon: Wifi,
                title: "Access Control",
                desc: "Better separation of staff/guest/IoT and clearer rule ownership.",
              },
              {
                icon: BarChart3,
                title: "Executive Clarity",
                desc: "Leadership can understand security and IT posture without noise or fluff.",
              },
            ].map((x, i) => (
              <motion.div
                key={x.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.06 }}
                className={[CARD_BASE, GLOW_CARD, "bg-background/60"].join(" ")}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <x.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold">{x.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {x.desc}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="outline-glow" size="lg" asChild>
              <Link to={`/pricing${getTrackingParams('services', 'outcomes', 'view_pricing')}`}>
                View Pricing <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline-glow" size="lg" asChild>
              <Link to={`/assessment${getTrackingParams('services', 'outcomes', 'start_assessment')}`}>
                Start Assessment <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="py-20 bg-background">
        <div className="container-tight">
          <div className="p-8 md:p-10 rounded-3xl bg-card border border-border relative overflow-hidden">
            <div className="absolute inset-0 bg-hero-glow opacity-40 pointer-events-none" />
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="max-w-2xl">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">
                  Want a Clear Roadmap and a Defensible Baseline?
                </h2>
                <p className="text-muted-foreground">
                  Start with an IT &amp; Security Assessment. We'll map posture across identity, endpoints, Microsoft 365,
                  network, recovery, and edge—then deliver a prioritized plan.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="outline-glow" size="lg" asChild>
                  <Link to={`/assessment${getTrackingParams('services', 'final_cta', 'assessment')}`}>
                    Start Assessment <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline-glow" size="lg" asChild>
                  <Link to={`/contact${getTrackingParams('services', 'final_cta', 'contact')}`}>
                    Contact Us <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-20 bg-card">
        <div className="container-tight">
          <SectionHeader
            badge="FAQ"
            title="Common Questions"
            description="Short answers—clear expectations."
          />

          <div className="grid lg:grid-cols-2 gap-6 mt-14">
            {faqs.map((f, idx) => (
              <ExpandableFAQ
                key={f.q}
                q={f.q}
                a={f.a}
                open={openFaq === idx}
                onToggle={() => setOpenFaq(openFaq === idx ? null : idx)}
              />
            ))}
          </div>
        </div>
      </section>
      
      <BottomBreadcrumbs
        items={[
          { name: "Home", to: "/" },
          { name: "Services" },
        ]}
      />
    </Layout>
  );
}