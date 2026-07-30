import { useMemo } from "react";
import type { ElementType } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ProcessExpandable } from "@/components/common/ProcessExpandable";
import { CybersecurityPillars } from "@/components/common/CybersecurityPillars";

import {
  // Core security icons
  Shield,
  ShieldCheck,
  Lock,
  KeyRound,
  Fingerprint,
  Eye,
  EyeOff,
  AlertTriangle,
  Bug,
  Radar,
  Scan,
  Network,
  Globe,
  Cloud,
  Database,
  FileCheck,
  FileSearch,
  Siren,
  Sword,
  ShieldAlert,
  ShieldOff,
  LockKeyhole,
  
  // Additional required icons
  ClipboardCheck,
  Terminal,
  MailCheck,
  PieChart,
  Activity,
  Bell,
  RefreshCcw,
  Briefcase,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  Monitor,
  Scale,
  Wrench,
  Users,
  Server,
  HardDrive,
  Presentation,
} from "lucide-react";

import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/common/SectionHeader";
import { BottomBreadcrumbs } from "@/components/common/BottomBreadcrumbs";
import { getTrackingParams } from "@/components/common/Tracking";

const OG_IMAGE = "https://velcoretech.com/og-image.png";
const SCHEDULER_URL = "https://cal.com/velcoreit";
const CANONICAL = "https://velcoretech.com/services/cybersecurity";

// Shared styling (match Managed-IT)
const CARD_BASE = "rounded-3xl p-7 h-full flex flex-col bg-background/60 border border-border";
const ICON_BOX = "inline-flex p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20";
const ICON_TITLE_BOX = "inline-flex items-center gap-3 px-4 py-3 rounded-2xl bg-primary/10 text-primary border border-primary/20";

const GLOW_CARD =
  "border border-border bg-card transition-[border-color,box-shadow] duration-200 " +
  "hover:border-primary/30 hover:ring-1 hover:ring-primary/20 " +
  "hover:shadow-[0_0_0_1px_hsl(var(--primary)/0.14),0_0_18px_hsl(var(--primary)/0.10)] " +
  "transform-gpu will-change-[box-shadow]";

// For the ProcessExpandable component
const processStepsExpandable = [
  {
    step: "01",
    shortTitle: "Assess",
    fullTitle: "Baseline & Risk Mapping",
    description: "Quick, non-intrusive assessment of your current security posture.",
    icon: Activity,
  },
  {
    step: "02",
    shortTitle: "Secure",
    fullTitle: "Standardize Controls",
    description: "Implement enforceable security standards that reduce risk.",
    icon: ShieldCheck,
  },
  {
    step: "03",
    shortTitle: "Operate",
    fullTitle: "Operate with cadence",
    description: "Ongoing detection, response, and improvement.",
    icon: Radar,
  },
];

type Deliverable = {
  title: string;
  desc: string;
  icon: ElementType;
};

type Engagement = {
  title: string;
  desc: string;
  icon: ElementType;
  bullets: string[];
  cta: { label: string; to: string; variant: "gradient" | "outline" | "outline-glow" };
};

export default function Cybersecurity() {
  const execOutcomes = useMemo(
    () => [
      {
        icon: Radar,
        label: "Higher-signal detection",
        note: "Alerts mapped to action—not noise.",
      },
      {
        icon: ShieldCheck,
        label: "Faster containment",
        note: "Clear playbooks, escalation paths, and ownership.",
      },
      {
        icon: Lock,
        label: "Defensible posture",
        note: "Controls you can explain in an audit or board meeting.",
      },
      {
        icon: PieChart,
        label: "Leadership-grade reporting",
        note: "Risk trend, priorities, and progress visibility.",
      },
    ],
    []
  );
  
  

  const executiveDeliverables = useMemo<Deliverable[]>(
    () => [
      {
        title: "Executive Risk Report",
        desc: "Concise view of vulnerabilities, threats, and progress against security roadmap.",
        icon: Briefcase,
      },
      {
        title: "Security Operations Dashboard",
        desc: "Monthly metrics: detections, response times, patch compliance, incident trends.",
        icon: PieChart,
      },
      {
        title: "Audit-Ready Evidence",
        desc: "Controls mapped to evidence: policies, runbooks, change logs, and verification points.",
        icon: Scale,
      },
      {
        title: "Incident Response Runbooks",
        desc: "Repeatable playbooks for common scenarios: phishing, ransomware, account takeover.",
        icon: Presentation,
      },
    ],
    []
  );

  const engagementModels = useMemo<Engagement[]>(
    () => [
      {
        title: "Project-Based",
        desc: "Fixed scope, timeline, and outcomes—delivered with governance and documentation.",
        icon: Wrench,
        bullets: [
          "Fixed scope + timeline + defined outcomes (pen test, assessment, implementation)",
          "Change control, validation, and structured handoff",
          "Documentation pack: findings, runbooks, and next steps",
        ],
        cta: { label: "Request a Quote", to: "/contact", variant: "outline-glow" },
      },
      {
        title: "Contracting",
        desc: "Annual & monthly ongoing security operations with continuous monitoring and improvement.",
        icon: RefreshCcw,
        bullets: [
          "Operating cadence + standards + continuous improvement",
          "Executive reporting + quarterly risk review",
          "24/7 monitoring and incident response",
        ],
        cta: { label: "Talk to Us", to: "/contact", variant: "outline" },
      },
      {
        title: "Assessment First",
        desc: "Fastest path to clarity: baseline, prioritize, and produce an executable plan.",
        icon: ShieldCheck,
        bullets: [
          "Vulnerability / penetration / posture baseline",
          "Prioritized remediation plan mapped to business risk",
          "Recommended engagement model",
        ],
        cta: { label: "Start Assessment", to: "/assessment", variant: "gradient" },
      },
    ],
    []
  );

  const onboardingSteps = useMemo(
    () => [
      { icon: ClipboardCheck, title: "Baseline", desc: "Asset inventory, vulnerability scan, and security posture review." },
      { icon: Shield, title: "Standardize", desc: "Define and enforce security controls across identity, endpoints, and cloud." },
      { icon: Radar, title: "Monitor", desc: "Continuous monitoring, threat detection, and incident response readiness." },
    ],
    []
  );

  return (
    <Layout>
      <Helmet>
        <title>Cybersecurity | Velcore Tech</title>
        <meta
          name="description"
          content="Enterprise-grade cybersecurity services: vulnerability assessment, penetration testing, SOC operations, EDR, M365 assessments, and security awareness training."
        />
        <link rel="canonical" href={CANONICAL} />
        <meta property="og:title" content="Cybersecurity | Velcore Tech" />
        <meta property="og:description" content="Comprehensive security services with continuous monitoring, testing, and compliance expertise." />
        <meta property="og:url" content={CANONICAL} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      {/* HERO */}
      <section className="relative overflow-hidden hero-gradient">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90vw] max-w-4xl h-[600px] bg-hero-glow pointer-events-none" />
        <div className="container-tight relative z-10 py-20 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-primary/10 text-primary border border-primary/20 mb-6">
              <Shield className="h-5 w-5" />
              Enterprise-Grade Cybersecurity
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Your Security
              <br />
              <span className="text-gradient">Our Expertise</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl leading-relaxed mx-auto">
                We monitor, detect, and respond to threats around the clock—so your business stays resilient in the face of evolving cyber risks.
            </p>

            {/* Compliance frameworks */}
            <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/5 border border-primary/10">
                <Shield className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">HIPAA</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/5 border border-primary/10">
                <FileCheck className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">NIST 800-53</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/5 border border-primary/10">
                <Lock className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">ISO 27001</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/5 border border-primary/10">
                <ShieldCheck className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">SOC 2</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/5 border border-primary/10">
                <Globe className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">GDPR</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/5 border border-primary/10">
                <Globe className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">PCI DSS</span>
              </div>
            </div>

    {/* Executive outcomes */}
    <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
      {execOutcomes.map((o) => (
        <div key={o.label} className={`rounded-2xl p-5 ${GLOW_CARD}`}>
          <div className="flex items-center gap-2 mb-3">
            <o.icon className="h-5 w-5 text-primary" />
            <div className="font-semibold">{o.label}</div>
          </div>
          <div className="text-sm text-muted-foreground leading-relaxed">{o.note}</div>
        </div>
      ))}
    </div>
                        <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed mx-auto mt-4">
              With our Security Services, you can focus on your core operations while we safeguard your data, reduce risks, and ensure compliance with industry standards.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Deep-link anchors for fragments referenced from Pricing/Industries */}
      <div id="email-security" className="scroll-mt-24" aria-hidden="true" />
      <div id="incident-readiness" className="scroll-mt-24" aria-hidden="true" />
      <div id="penetration-testing" className="scroll-mt-24" aria-hidden="true" />
      <div id="security-operations" className="scroll-mt-24" aria-hidden="true" />

      {/* PILLARS - Using the new CybersecurityPillars component */}
      <CybersecurityPillars showHeader={true} />
      
      {/* PROCESS SECTION */}
      <section className="py-20 bg-card">
        <div className="container-tight">
          <ProcessExpandable steps={processStepsExpandable} showHeader={true} />
        </div>
      </section>
      
      {/* Bottom EXECUTIVE DELIVERABLES */}
      {/* Bottom EXECUTIVE DELIVERABLES */}
      <section className="section-padding bg-card">
        <div className="container-tight">
          <SectionHeader
            badge="Executive Visibility"
            title="What Leadership Receives"
            description="Clear, decision-grade visibility—designed for CEOs and boards who need confidence in security posture and risk management."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
            {executiveDeliverables.map((d, i) => (
              <motion.div
                key={d.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.08 }}
                className={`rounded-3xl p-7 bg-background/60 ${GLOW_CARD}`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <d.icon className="h-6 w-6 text-primary" />
                  <div className="font-semibold text-lg">{d.title}</div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{d.desc}</p>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline-glow" size="lg" asChild>
              <Link to={`/assessment${getTrackingParams('cybersecurity', 'hero', 'assessment')}`} className="inline-flex items-center justify-center gap-2">
                Start Assessment <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline-glow" size="lg" asChild>
              <Link to={`/contact${getTrackingParams('cybersecurity', 'hero', 'contact')}`} className="inline-flex items-center justify-center gap-2">
                Talk to Us <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      {/* Breadcrumbs */}
      <BottomBreadcrumbs
        items={[
          { name: "Home", to: "/" },
          { name: "Services", to: "/services" },
          { name: "Cybersecurity" },
        ]}
      />
    </Layout>
  );
}