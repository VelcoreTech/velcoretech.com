import { useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Laptop2,
  ShieldCheck,
  Wrench,
  CheckCircle2,
  ArrowRight,
  Lock,
  BarChart3,
  Workflow,
  Globe,
  Wifi,
  KeyRound,
} from "lucide-react";

import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/common/SectionHeader";
import { BottomBreadcrumbs } from "@/components/common/BottomBreadcrumbs";

const OG_IMAGE = "https://velcoretech.com/og-image.png";

export default function Endpoint() {
  const outcomes = useMemo(
    () => [
      "Lower incident volume through baseline hardening and policy consistency",
      "Cleaner EDR posture: less noise, better response, faster containment",
      "Improved patch/vuln rhythm with measurable coverage",
      "Visibility leadership can understand: posture, drift, and top priorities",
    ],
    []
  );

  const whatWeCover = useMemo(
    () => [
      {
        title: "Baseline Hardening",
        desc: "Make endpoints predictable: security settings, controls, and ownership.",
        items: [
          "Windows/macOS baseline standards",
          "Local admin reduction patterns",
          "Secure configuration hygiene and drift controls",
        ],
        icon: ShieldCheck,
      },
      {
        title: "EDR/XDR Operations",
        desc: "Tune tools for signal, not noise—then link alerts to response actions.",
        items: [
          "Noise reduction and alert tuning",
          "High-signal detection baselines",
          "Containment workflows and escalation rules",
        ],
        icon: Lock,
      },
      {
        title: "Patch + Vulnerability Discipline",
        desc: "A real cadence: coverage tracking, maintenance windows, and exceptions you can explain.",
        items: [
          "Patch governance model",
          "Exception handling with documented risk",
          "Vulnerability backlog and remediation tracking",
        ],
        icon: Wrench,
      },
      {
        title: "Operational Reporting",
        desc: "Leadership reporting that shows posture, drift, and where risk is trending.",
        items: [
          "Endpoint posture metrics",
          "Patch/vuln coverage reporting",
          "Top risks + action plan",
        ],
        icon: BarChart3,
      },
    ],
    []
  );

  const howWeOperate = useMemo(
    () => [
      { step: "01", title: "Assess", desc: "Baseline policies, tooling, drift, and response capability." },
      { step: "02", title: "Standardize", desc: "Implement enforceable baselines and operating cadence." },
      { step: "03", title: "Operate", desc: "Tune detections, reduce noise, and report posture and risk trends." },
    ],
    []
  );

  const deliverables = useMemo(
    () => [
      "Endpoint baseline standards (Windows/macOS) and enforcement guidance",
      "EDR/XDR tuning plan (noise reduction + high-signal baselines)",
      "Patch governance cadence (coverage, windows, exceptions)",
      "Vulnerability remediation tracking approach",
      "Leadership reporting template (posture + risk trend + next actions)",
    ],
    []
  );

  const related = useMemo(
    () => [
      { title: "Cybersecurity", to: "/services/cybersecurity", icon: Lock },
      { title: "Governance", to: "/services/consulting", icon: KeyRound },
      { title: "Cloud", to: "/services/cloud", icon: Workflow },
      { title: "Edge Security", to: "/services/edge", icon: Globe },
      { title: "Networking", to: "/services/networking", icon: Wifi },
    ],
    []
  );

  return (
    <Layout>
      <Helmet>
        <title>Endpoint Security | EDR, Hardening, Patch Discipline</title>
        <meta
          name="description"
          content="Endpoint security built on enforceable baselines, EDR/XDR tuning, patch governance, and practical response workflows—with measurable reporting."
        />
        <link rel="canonical" href="https://velcoretech.com/services/endpoint" />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Velcore Tech" />
        <meta property="og:title" content="Endpoint Security | Velcore Tech" />
        <meta
          property="og:description"
          content="Enforceable baselines, EDR/XDR tuning, patch discipline, and measurable reporting."
        />
        <meta property="og:url" content="https://velcoretech.com/services/endpoint" />
        <meta property="og:image" content={OG_IMAGE} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Endpoint Security | Velcore Tech" />
        <meta
          name="twitter:description"
          content="Baseline hardening, EDR/XDR operations, patch governance, and response workflows."
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
              <Laptop2 className="h-4 w-4" />
              Endpoint Management
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Endpoint Security
              <br />
              <span className="text-gradient">Baselines, EDR, Patch Discipline</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl leading-relaxed">
              Endpoint posture isn’t a tool problem — it’s a standards + cadence problem.
              We make endpoints predictable and response-ready.
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

      {/* OUTCOMES */}
      <section className="section-padding bg-background">
        <div className="container-tight">
          <SectionHeader
            badge="Outcomes"
            title="Lower incident volume. Better containment."
            description="This is about reducing exposure and making response consistent."
          />

          <div className="mt-14 rounded-3xl border border-border bg-card p-8 md:p-10">
            <div className="flex items-start gap-4">
              <div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div className="min-w-0">
                <h2 className="text-2xl md:text-3xl font-bold leading-tight">What clients typically get</h2>
                <p className="text-muted-foreground mt-2 leading-relaxed">
                  Fewer surprises, cleaner operations, and measurable posture improvement.
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
            description="Practical scope: standards, enforcement, operations, and reporting."
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
            title="A cadence you can maintain"
            description="We treat endpoint security as an operating system: baseline → enforce → tune → report."
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
            title="Adjacent pillars clients usually pair with Endpoint"
            description="Endpoint is strongest when identity, cloud, edge, and monitoring are aligned."
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
                      How this pillar supports endpoint posture.
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
                <h3 className="text-2xl font-bold mb-2">Want endpoints that stay hardened?</h3>
                <p className="text-muted-foreground">
                  Start with an assessment. You’ll get posture gaps, priorities, and an execution plan.
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
              { name: "Endpoint" },
            ]}
          />
        </div>
      </section>
    </Layout>
  );
}