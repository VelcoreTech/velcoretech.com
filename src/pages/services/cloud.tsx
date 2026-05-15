import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Cloud,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Wrench,
  BarChart3,
  Lock,
  Workflow,
  Globe,
  Laptop2,
  Wifi,
} from "lucide-react";

import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/common/SectionHeader";
import { BottomBreadcrumbs } from "@/components/common/BottomBreadcrumbs";
import { getTrackingParams } from "@/components/common/Tracking";

const OG_IMAGE = "https://velcoretech.com/og-image.png";

/**
 * GLOW_CARD - Consistent hover effect without transforms
 */
const GLOW_CARD =
  "border border-border bg-card transition-[border-color,box-shadow] duration-200 " +
  "hover:border-primary/30 hover:ring-1 hover:ring-primary/20 " +
  "hover:shadow-[0_0_0_1px_hsl(var(--primary)/0.14),0_0_18px_hsl(var(--primary)/0.10)] " +
  "transform-gpu will-change-[box-shadow]";

/**
 * CARD_BASE - Base styling for all cards
 */
const CARD_BASE = "rounded-3xl p-7 bg-background border border-border";

/**
 * ICON_BOX - Consistent icon container styling
 */
const ICON_BOX = "inline-flex p-3 rounded-2xl bg-primary/10 text-primary";

export default function CloudServices() {
  // Outcomes list - what clients typically achieve
  const outcomes = useMemo(
    () => [
      "A defensible baseline (identity, policies, logging) you can explain to leadership or auditors",
      "Reduced drift and fewer surprise outages from ad-hoc config changes",
      "Cleaner cloud operations: change discipline, ownership, and rollback-ready execution",
      "Visibility that's actionable—risk, posture, and what gets prioritized next",
    ],
    []
  );

  // What We Cover - Main service categories
  const whatWeCover = useMemo(
    () => [
      {
        title: "Cloud Migration",
        desc: "Move workloads without chaos—planning, cutover discipline, rollback safety, and validation.",
        items: [
          "Migration planning + sequencing",
          "Cutover + rollback plan",
          "Post-migration validation + stabilization",
        ],
        icon: Workflow,
      },
      {
        title: "Cloud Governance",
        desc: "Guardrails that don't slow teams down—standards, enforcement, and drift control.",
        items: [
          "Naming/tagging standards",
          "Policy guardrails + exception handling",
          "Drift detection + remediation cadence",
        ],
        icon: ShieldCheck,
      },
      {
        title: "Operational Maintenance",
        desc: "Keep it stable—monitoring posture, change control, and lifecycle hygiene.",
        items: [
          "Change control + approvals",
          "Maintenance windows + patch governance",
          "Operational runbooks + ownership",
        ],
        icon: Wrench,
      },
      {
        title: "Security Baselines",
        desc: "Identity-first security, clear admin boundaries, and logging you can trust.",
        items: [
          "Least privilege admin model",
          "Conditional Access alignment (where applicable)",
          "Logging posture guidance (retain what matters)",
        ],
        icon: Lock,
      },
    ],
    []
  );

  // How We Operate - Three-step process
  const howWeOperate = useMemo(
    () => [
      {
        step: "01",
        title: "Assess",
        desc: "Baseline current state, risk, and operational gaps. Define what 'good' looks like for your org.",
      },
      {
        step: "02",
        title: "Standardize",
        desc: "Implement enforceable baselines: identity, policies, logging posture, guardrails, and change discipline.",
      },
      {
        step: "03",
        title: "Operate",
        desc: "Run it with cadence: drift control, monitoring, reporting, and continuous improvement without noise.",
      },
    ],
    []
  );

  // Deliverables - Concrete outputs clients receive
  const deliverables = useMemo(
    () => [
      "Baseline standards: naming, tagging, guardrails, and policy posture",
      "Identity review: admin roles, least privilege separation, authentication control alignment",
      "Change control workflow + rollback-ready deployment approach",
      "Drift detection approach + remediation cadence",
      "Logging posture guidance (what to keep, what to ignore, what enables response)",
      "Leadership reporting: posture, risk trend, and next priorities",
    ],
    []
  );

  // Related services - Common pairings with Cloud
  const related = useMemo(
    () => [
      { title: "Governance", to: "/services/consulting", icon: ShieldCheck },
      { title: "Audit-Ready", to: "/services/audit-ready", icon: CheckCircle2 },
      { title: "Edge Security", to: "/services/edge", icon: Globe },
      { title: "Endpoint Security", to: "/services/endpoint", icon: Laptop2 },
      { title: "Networking", to: "/services/networking", icon: Wifi },
      { title: "Cybersecurity", to: "/services/cybersecurity", icon: Lock },
    ],
    []
  );

  return (
    <Layout>
      <Helmet>
        <title>Cloud Services | Migration, Governance, and Operations | Velcore Tech</title>
        <meta
          name="description"
          content="Cloud migration, governance, and operations with defensible baselines, drift control, and audit-ready change discipline—built for predictable IT and security outcomes."
        />
        <link rel="canonical" href="https://velcoretech.com/services/cloud" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Velcore Tech" />
        <meta
          property="og:title"
          content="Cloud Services | Migration, Governance, and Operations | Velcore Tech"
        />
        <meta
          property="og:description"
          content="Cloud services designed for predictable operations: migration discipline, governance guardrails, drift control, and leadership reporting."
        />
        <meta property="og:url" content="https://velcoretech.com/services/cloud" />
        <meta property="og:image" content={OG_IMAGE} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Cloud Services | Velcore Tech" />
        <meta
          name="twitter:description"
          content="Migration + governance + operations with defensible baselines and drift control."
        />
        <meta name="twitter:image" content={OG_IMAGE} />
      </Helmet>

      {/* HERO SECTION - Static, no animations */}
      <section className="relative overflow-hidden hero-gradient">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90vw] max-w-4xl h-[600px] bg-hero-glow pointer-events-none" />
        <div className="container-tight relative z-10 py-20 md:py-28">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-primary/10 text-primary border border-primary/20 mb-6">
              <Cloud className="h-4 w-4" />
              Cloud Services
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Cloud Services
              <br />
              <span className="text-gradient">Migration, Governance, Operations</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl leading-relaxed mx-auto">
              Cloud work only matters if it's stable, secure, and maintainable.
              We build a baseline you can defend—and keep it from drifting.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="gradient" size="lg" asChild>
                <Link to={`/assessment${getTrackingParams('cloud', 'hero', 'assessment')}`}>
                  Start Assessment
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to={`/contact${getTrackingParams('cloud', 'hero', 'contact')}`}>
                  Talk to Us
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>

            <p className="mt-6 text-sm text-muted-foreground">
              CA-based, remote-first nationwide. On-site available where needed.
            </p>
          </div>
        </div>
      </section>

      {/* Deep-link anchors for fragments referenced from Pricing/Industries */}
      <div id="backup-recovery" className="scroll-mt-24" aria-hidden="true" />
      <div id="m365-cloud" className="scroll-mt-24" aria-hidden="true" />

      {/* OUTCOMES SECTION */}
      <section className="section-padding bg-background">
        <div className="container-tight">
          <SectionHeader
            badge="Outcomes"
            title="Predictable operations with defensible security"
            description="Not 'cloud for cloud's sake.' This is about reducing risk, stabilizing operations, and making posture measurable."
          />

          <div className="mt-14 rounded-3xl border border-border bg-card p-8 md:p-10">
            <div className="flex items-start gap-4">
              <div className={ICON_BOX}>
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div className="min-w-0">
                <h2 className="text-2xl md:text-3xl font-bold leading-tight">
                  What clients typically get
                </h2>
                <p className="text-muted-foreground mt-2 leading-relaxed">
                  Clarity, discipline, and fewer surprises—without heavyweight bureaucracy.
                </p>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6 mt-8">
              {outcomes.map((x) => (
                <div key={x} className={`rounded-2xl p-6 ${GLOW_CARD}`}>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div className="leading-relaxed">{x}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHAT WE COVER SECTION */}
      <section className="section-padding bg-card">
        <div className="container-tight">
          <SectionHeader
            badge="Scope"
            title="What we run inside this pillar"
            description="This is built to convey practical scope: what we touch, how we control it, and what you can expect."
          />

          <div className="grid md:grid-cols-2 gap-6 mt-14">
            {whatWeCover.map((x) => (
              <div key={x.title} className={`${CARD_BASE} ${GLOW_CARD}`}>
                <div className="flex items-start gap-4">
                  <div className={ICON_BOX}>
                    <x.icon className="h-6 w-6" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-lg font-semibold">{x.title}</div>
                    <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                      {x.desc}
                    </p>
                  </div>
                </div>

                <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
                  {x.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW WE OPERATE SECTION */}
      <section className="section-padding bg-background">
        <div className="container-tight">
          <SectionHeader
            badge="Operating Model"
            title="A repeatable approach that scales"
            description="We keep it consistent and auditable—so it works even when teams and priorities change."
          />

          <div className="grid md:grid-cols-3 gap-6 mt-14">
            {howWeOperate.map((a) => (
              <div key={a.step} className={`${CARD_BASE} ${GLOW_CARD}`}>
                <div className="text-sm text-primary font-semibold mb-3">{a.step}</div>
                <div className="text-lg font-semibold mb-2">{a.title}</div>
                <div className="text-sm text-muted-foreground leading-relaxed">{a.desc}</div>
              </div>
            ))}
          </div>

          <div className={`mt-10 rounded-3xl p-8 ${GLOW_CARD}`}>
            <div className="flex items-start gap-4">
              <div className={ICON_BOX}>
                <BarChart3 className="h-6 w-6" />
              </div>
              <div className="min-w-0">
                <div className="text-lg font-semibold">Deliverables (what you can hold us to)</div>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                  We prefer concrete outputs over vague "we'll improve things" promises.
                </p>
              </div>
            </div>

            <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
              {deliverables.map((d) => (
                <li key={d} className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* RELATED SERVICES SECTION */}
      <section className="section-padding bg-card">
        <div className="container-tight">
          <SectionHeader
            badge="Related"
            title="Adjacent pillars clients usually pair with Cloud"
            description="These are commonly implemented together when building a defensible operating baseline."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
            {related.map((r) => (
              <Link
                key={r.to}
                to={`${r.to}${getTrackingParams('cloud', 'related', r.title.toLowerCase().replace(/\s+/g, '_'))}`}
                className={`${CARD_BASE} ${GLOW_CARD} block transition-[border-color,box-shadow] duration-200 group`}
              >
                <div className="flex items-start gap-4">
                  <div className={ICON_BOX}>
                    <r.icon className="h-6 w-6" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-lg">{r.title}</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      Learn how this pillar integrates with Cloud delivery.
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-end gap-2 text-sm font-medium text-primary">
                  <span className="opacity-90 group-hover:opacity-100 transition-opacity">
                    Learn more
                  </span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="section-padding bg-background">
        <div className="container-tight">
          <div className="p-8 md:p-10 rounded-3xl bg-card border border-border relative overflow-hidden">
            <div className="absolute inset-0 bg-hero-glow opacity-40 pointer-events-none" />
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="max-w-2xl">
                <h3 className="text-2xl md:text-3xl font-bold mb-2">
                  Want cloud that stays stable after the "project" ends?
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Start with an assessment. You'll get gaps, priorities, and an execution plan that's operationally real.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="gradient" size="lg" asChild>
                  <Link to={`/assessment${getTrackingParams('cloud', 'final_cta', 'assessment')}`}>
                    Start Assessment <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to={`/contact${getTrackingParams('cloud', 'final_cta', 'contact')}`}>
                    Talk to Us <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BREADCRUMBS */}
      <BottomBreadcrumbs
        items={[
          { name: "Home", to: "/" },
          { name: "Services", to: "/services" },
          { name: "Cloud" },
        ]}
      />
    </Layout>
  );
}