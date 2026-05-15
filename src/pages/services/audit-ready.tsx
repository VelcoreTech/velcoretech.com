import { useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  FileCheck2,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Lock,
  BarChart3,
  Workflow,
  Globe,
  Laptop2,
  Wifi,
  KeyRound,
  ClipboardCheck,
} from "lucide-react";

import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/common/SectionHeader";
import { BottomBreadcrumbs } from "@/components/common/BottomBreadcrumbs";

const OG_IMAGE = "https://velcoretech.com/og-image.png";

export default function AuditReady() {
  const outcomes = useMemo(
    () => [
      "Evidence you can defend without scrambling across screenshots and emails",
      "Controls that are operationally real (not a one-time compliance project)",
      "Clear ownership: who maintains what, and how it’s measured",
      "Leadership visibility into risk, posture, and remediation progress",
    ],
    []
  );

  const whatWeCover = useMemo(
    () => [
      {
        title: "Control Mapping (Practical)",
        desc: "Translate requirements into controls that actually fit your environment.",
        items: [
          "Gap identification and prioritization",
          "Control ownership and operational cadence",
          "Evidence approach that reduces busywork",
        ],
        icon: ShieldCheck,
      },
      {
        title: "Policies + Standards (Usable)",
        desc: "Not a binder. Lightweight standards teams can follow under pressure.",
        items: [
          "Policy templates and operating standards",
          "Change control and exception handling",
          "Documented baselines and ownership",
        ],
        icon: ClipboardCheck,
      },
      {
        title: "Evidence & Reporting Structure",
        desc: "Make proof easy: reporting, logs, and artifacts that are repeatable.",
        items: [
          "Evidence folder structure and naming conventions",
          "Reporting cadence: posture and remediation progress",
          "Access reviews and change logs that auditors expect",
        ],
        icon: FileCheck2,
      },
      {
        title: "Remediation Tracking",
        desc: "A clear plan: what is being fixed, by who, and when.",
        items: [
          "Remediation backlog and prioritization model",
          "Executive summaries and progress reporting",
          "Operational follow-through instead of “checkbox done”",
        ],
        icon: BarChart3,
      },
    ],
    []
  );

  const howWeOperate = useMemo(
    () => [
      { step: "01", title: "Baseline", desc: "We assess current controls, evidence maturity, and operational gaps." },
      { step: "02", title: "Build", desc: "We define controls, ownership, cadence, and an evidence model that scales." },
      { step: "03", title: "Operate", desc: "We run it: reviews, reporting, remediation tracking, and continuous improvement." },
    ],
    []
  );

  const deliverables = useMemo(
    () => [
      "Control mapping and gap summary (practical, prioritized)",
      "Evidence-ready reporting structure and templates",
      "Policy and standards baseline (usable, not bloated)",
      "Remediation backlog and tracking model",
      "Leadership reporting: posture + trend + next priorities",
    ],
    []
  );

  const related = useMemo(
    () => [
      { title: "Governance", to: "/services/consulting", icon: KeyRound },
      { title: "Cloud", to: "/services/cloud", icon: Workflow },
      { title: "Cybersecurity", to: "/services/cybersecurity", icon: Lock },
      { title: "Endpoint Security", to: "/services/endpoint", icon: Laptop2 },
      { title: "Networking", to: "/services/networking", icon: Wifi },
      { title: "Edge Security", to: "/services/edge", icon: Globe },
    ],
    []
  );

  return (
    <Layout>
      <Helmet>
        <title>Audit-Ready Discipline | Controls & Evidence</title>
        <meta
          name="description"
          content="Audit-ready discipline with practical controls, usable policies, evidence structure, and remediation tracking—built to reduce busywork and hold up under review."
        />
        <link rel="canonical" href="https://velcoretech.com/services/audit-ready" />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Velcore Tech" />
        <meta property="og:title" content="Audit-Ready Discipline | Velcore Tech" />
        <meta
          property="og:description"
          content="Practical controls, usable standards, evidence templates, and remediation tracking—built for audits without chaos."
        />
        <meta property="og:url" content="https://velcoretech.com/services/audit-ready" />
        <meta property="og:image" content={OG_IMAGE} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Audit-Ready Discipline | Velcore Tech" />
        <meta
          name="twitter:description"
          content="Controls, policies, evidence structure, and remediation tracking without busywork."
        />
        <meta name="twitter:image" content={OG_IMAGE} />
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
              <FileCheck2 className="h-4 w-4" />
              GRC Audit
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Audit-Ready Discipline
              <br />
              <span className="text-gradient">Controls, Evidence, Remediation</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl leading-relaxed">
              Compliance shouldn’t be a one-time scramble. We build operational controls and
              evidence patterns that stay clean over time.
            </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="gradient" size="lg" asChild>
                <Link to="/assessment">
                  Start Assessment
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/contact">
                  Talk to Us
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>

            <p className="mt-6 text-sm text-muted-foreground">
              CA-based, remote-first nationwide. On-site available where needed.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Deep-link anchor for fragments referenced from Pricing/Industries */}
      <div id="governance-compliance" className="scroll-mt-24" aria-hidden="true" />

      {/* OUTCOMES */}
      <section className="section-padding bg-background">
        <div className="container-tight">
          <SectionHeader
            badge="Outcomes"
            title="Evidence without chaos"
            description="This is about controls you can operate and prove—without drowning teams in busywork."
          />

          <div className="mt-14 rounded-3xl border border-border bg-card p-8 md:p-10">
            <div className="flex items-start gap-4">
              <div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div className="min-w-0">
                <h2 className="text-2xl md:text-3xl font-bold leading-tight">What clients typically get</h2>
                <p className="text-muted-foreground mt-2 leading-relaxed">
                  Clear ownership, repeatable evidence, and leadership visibility.
                </p>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6 mt-8">
              {outcomes.map((x) => (
                <div key={x} className="rounded-2xl border border-border bg-background p-6">
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

      {/* WHAT WE COVER */}
      <section className="section-padding bg-card">
        <div className="container-tight">
          <SectionHeader
            badge="Scope"
            title="What we run inside this pillar"
            description="Practical scope: controls, evidence, and remediation cadence."
          />

          <div className="grid md:grid-cols-2 gap-6 mt-14">
            {whatWeCover.map((x, i) => (
              <motion.div
                key={x.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.06 }}
                className="rounded-3xl border border-border bg-background p-7"
              >
                <div className="flex items-start gap-4">
                  <div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary">
                    <x.icon className="h-6 w-6" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-lg font-semibold">{x.title}</div>
                    <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{x.desc}</p>
                  </div>
                </div>

                <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
                  {x.items.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW WE OPERATE */}
      <section className="section-padding bg-background">
        <div className="container-tight">
          <SectionHeader
            badge="Operating Model"
            title="Operational controls that stay clean"
            description="Baseline → build → operate. If it can’t be operated, it won’t survive an audit."
          />

          <div className="grid md:grid-cols-3 gap-6 mt-14">
            {howWeOperate.map((a, i) => (
              <motion.div
                key={a.step}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.08 }}
                className="feature-card"
              >
                <div className="text-sm text-primary font-semibold mb-3">{a.step}</div>
                <div className="text-lg font-semibold mb-2">{a.title}</div>
                <div className="text-sm text-muted-foreground leading-relaxed">{a.desc}</div>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 rounded-3xl border border-border bg-card p-8">
            <div className="flex items-start gap-4">
              <div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary">
                <BarChart3 className="h-6 w-6" />
              </div>
              <div className="min-w-0">
                <div className="text-lg font-semibold">Deliverables</div>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                  Concrete outputs you can hold us to.
                </p>
              </div>
            </div>

            <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
              {deliverables.map((d) => (
                <li key={d}>• {d}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* RELATED */}
      <section className="section-padding bg-card">
        <div className="container-tight">
          <SectionHeader
            badge="Related"
            title="Adjacent pillars clients usually pair with Audit-Ready"
            description="Audit-readiness improves fast when identity, endpoint, and cloud operations are disciplined."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
            {related.map((r) => (
              <Link
                key={r.to}
                to={r.to}
                className="feature-card group block transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                    <r.icon className="h-6 w-6" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-lg group-hover:text-primary transition-colors">
                      {r.title}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      How this pillar integrates with Audit-Ready delivery.
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-end gap-2 text-sm font-medium text-primary">
                  <span className="opacity-90 group-hover:opacity-100 transition-opacity">Learn more</span>
                  <ArrowRight className="h-4 w-4 translate-x-0 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="section-padding bg-background">
        <div className="container-tight">
          <div className="p-8 rounded-3xl bg-card border border-border relative overflow-hidden">
            <div className="absolute inset-0 bg-hero-glow opacity-40 pointer-events-none" />
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl font-bold mb-2">Want audits without scrambling?</h3>
                <p className="text-muted-foreground">
                  Start with an assessment. You’ll get gaps, priorities, and a remediation plan that’s operationally real.
                </p>
              </div>
              <div className="flex gap-3">
                <Button variant="gradient" size="lg" asChild>
                  <Link to="/assessment">
                    Start Assessment <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/contact">
                    Talk to Us <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          <BottomBreadcrumbs
            items={[
              { name: "Home", to: "/" },
              { name: "Services", to: "/services" },
              { name: "Audit-Ready" },
            ]}
          />
        </div>
      </section>
    </Layout>
  );
}