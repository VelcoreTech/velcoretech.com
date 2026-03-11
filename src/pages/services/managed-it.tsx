import { useMemo } from "react";
import type { ElementType } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ProcessExpandable } from "@/components/common/ProcessExpandable";
import { ManagedITPillars } from "@/components/common/ManagedITPillars";


// Only import the icons you actually use
import {
  Activity,
  ShieldCheck,
  Shield,
  Server,
  ClipboardCheck,
  HardDrive,
  Wrench,
  RefreshCcw,
  Presentation,
  CheckCircle2,
  ArrowRight,
  Briefcase,
  PieChart,
  Scale,
  AlertCircle,
  FileCheck,
  Award,
  Network,
} from "lucide-react";

import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/common/SectionHeader";
import { BottomBreadcrumbs } from "@/components/common/BottomBreadcrumbs";
import { getTrackingParams } from "@/components/common/Tracking";

const OG_IMAGE = "https://velcoretech.com/og-image.jpg";
const SCHEDULER_URL = "https://cal.com/velcoreit";
const CANONICAL = "https://velcoretech.com/services/Managed-IT";

/**
 * Consistent styling constants
 */
const GLOW_CARD =
  "border border-border bg-card transition-[border-color,box-shadow] duration-200 " +
  "hover:border-primary/30 hover:ring-1 hover:ring-primary/20 " +
  "hover:shadow-[0_0_0_1px_hsl(var(--primary)/0.14),0_0_18px_hsl(var(--primary)/0.10)] " +
  "transform-gpu will-change-[box-shadow]";

const CARD_BASE = "rounded-3xl p-7 h-full flex flex-col bg-background/60 border border-border";

const ICON_BOX = "inline-flex p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20";

const ICON_TITLE_BOX = "inline-flex items-center gap-3 px-4 py-3 rounded-2xl bg-primary/10 text-primary border border-primary/20";

// For the ProcessExpandable component (with step numbers)
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
    shortTitle: "Excute",
    fullTitle: "Operate With Cadence",
    description: "Continuous monitoring and improvement over time.",
    icon: ClipboardCheck,
  },
];

type Pillar = {
  title: string;
  desc: string;
  icon: ElementType;
  bullets: string[];
};

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

export default function ManagedIT() {
  const pillars = useMemo<Pillar[]>(
    () => [
      {
        title: "Operate IT Like a System",
        desc: "We don't 'react to tickets.' We run an operating cadence that reduces entropy, stabilizes performance, and prevents repeat issues.",
        icon: Server,
        bullets: [
          "Monitoring, alert triage discipline, and operational hygiene",
          "Patch governance + maintenance windows",
          "Asset lifecycle governance (procure → onboard → secure → retire)",
        ],
      },
      {
        title: "Security as a Standard",
        desc: "Security embedded into identity, endpoints, cloud, and edge—implemented with policy, logging, and verification.",
        icon: Shield,
        bullets: [
          "Identity controls (MFA, least privilege, access reviews)",
          "Endpoint hardening + EDR oversight + response workflows",
          "Cloud + edge posture (logging, DNS/WAF, change discipline)",
        ],
      },
      {
        title: "Governance + Change Control",
        desc: "When something changes in production, leadership should know what changed, why, and how rollback works.",
        icon: ClipboardCheck,
        bullets: [
          "Documented standards and baselines",
          "Change approvals for high-risk changes",
          "Runbooks, diagrams, and ownership clarity",
        ],
      },
      {
        title: "Resilience You Can Prove",
        desc: "Backups are not a strategy. Recovery is a strategy—tested, measured, and documented.",
        icon: HardDrive,
        bullets: [
          "Backup posture validation and remediation",
          "Recovery testing + restoration procedures",
          "RTO/RPO alignment to business priorities",
        ],
      },
    ],
    []
  );

  const executiveDeliverables = useMemo<Deliverable[]>(
    () => [
      {
        title: "Executive Posture Report",
        desc: "Concise view of risk, operational gaps, and progress against plan.",
        icon: Briefcase,
      },
      {
        title: "Operating Model Dashboard",
        desc: "Monthly metrics: incidents, uptime, patch compliance, identity posture, backup health.",
        icon: PieChart,
      },
      {
        title: "Audit-Ready Evidence",
        desc: "Controls mapped to evidence: standards, tickets, change logs, and verification points.",
        icon: Scale,
      },
      {
        title: "Standardized Runbooks",
        desc: "Repeatable playbooks for onboarding/offboarding, incidents, and recovery.",
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
          "Fixed scope + timeline + defined outcomes",
          "Change control, validation, and structured handoff",
          "Documentation pack: diagrams, runbooks, and next steps",
        ],
        cta: { label: "Request a Quote", to: "/contact", variant: "outline-glow" },
      },
      {
        title: "Contracting",
        desc: "Annual & monthly ongoing operations with consistent reliability and accountable ownership.",
        icon: RefreshCcw,
        bullets: [
          "Operating cadence + standards + continuous improvement",
          "Executive reporting + quarterly risk review",
          "Vendor coordination across your stack",
        ],
        cta: { label: "Talk to Us", to: "/contact", variant: "outline" },
      },
      {
        title: "Assessment First",
        desc: "Fastest path to clarity: baseline, prioritize, and produce an executable plan.",
        icon: ShieldCheck,
        bullets: [
          "Identity / endpoint / cloud / network / recovery baseline",
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
      { icon: ClipboardCheck, title: "Baseline", desc: "Inventory, posture review, and risk mapping across critical systems." },
      { icon: Shield, title: "Standardize", desc: "Define and enforce standards across identity, endpoints, and cloud." },
      { icon: Activity, title: "Operate", desc: "Monitoring, maintenance cadence, reporting, and continuous improvement." },
    ],
    []
  );

  return (
    <Layout>
      <Helmet>
        <title>Managed IT | Project-Based + Contracting | Velcore Tech</title>
        <meta
          name="description"
          content="Enterprise-grade Managed IT with governance, executive reporting, and audit-ready discipline. Project-based or ongoing contracting."
        />
        <link rel="canonical" href={CANONICAL} />
        <meta property="og:title" content="Managed IT | Velcore Tech" />
        <meta property="og:description" content="Predictable IT operations and defensible security with governance and executive reporting." />
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
              <Server className="h-5 w-5" />
              Enterprise-Grade IT Managed Services
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Your Growth
              <br />
              <span className="text-gradient">Our Infrastructure</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl leading-relaxed mx-auto">
              Velcore Tech: Reliable IT solutions, customized for your business—so you can focus on growth, not downtime.
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
                <Award className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">ISO 27001</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/5 border border-primary/10">
                <Network className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">NIST CSF</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

                  {/* SIX PILLARS */}
            <ManagedITPillars showHeader={true} />
      
            {/* PROCESS SECTION */}
      <section className="py-20 bg-card">
        <div className="container-tight">
          <ProcessExpandable steps={processStepsExpandable} showHeader={true} />
        </div>
      </section>

      
      {/* EXECUTIVE DELIVERABLES */}
      <section className="section-padding bg-card">
        <div className="container-tight">
          <SectionHeader
            badge="Executive Visibility"
            title="What Leadership Receives"
            description="Clear, decision-grade visibility—designed for CEOs and boards who need confidence in reliability and risk posture."
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

          <div className="mt-10 p-6 rounded-3xl border border-primary/20 bg-primary/5">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold">Clear Ownership</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We define what Velcore owns, what you own, and what vendors own—so accountability is never ambiguous.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ONBOARDING */}
      <section className="section-padding bg-card">
        <div className="container-tight">


          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="outline-glow" size="lg" asChild>
              <Link to={`/assessment${getTrackingParams('Managed-IT', 'onboarding', 'assessment')}`} className="inline-flex items-center justify-center gap-2">
                Start Assessment <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline-glow" size="lg" asChild>
              <Link to={`/contact${getTrackingParams('Managed-IT', 'onboarding', 'contact')}`} className="inline-flex items-center justify-center gap-2">
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
          { name: "Managed IT" },
        ]}
      />
    </Layout>
  );
}