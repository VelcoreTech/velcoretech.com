import { useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Globe,
  Radar,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Lock,
  BarChart3,
  Workflow,
  Laptop2,
  Wifi,
  FileCheck2,
} from "lucide-react";

import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/common/SectionHeader";
import { BottomBreadcrumbs } from "@/components/common/BottomBreadcrumbs";

const OG_IMAGE = "https://velcoretech.com/og-image.png";

export default function Edge() {
  const outcomes = useMemo(
    () => [
      "Reduced external risk from misconfigurations and unmanaged exposure",
      "Stronger domain + DNS posture with controlled change paths",
      "WAF/DDoS posture aligned to your actual traffic and threat model",
      "Clear reporting: what’s blocked, what’s risky, and what gets prioritized next",
    ],
    []
  );

  const whatWeCover = useMemo(
    () => [
      {
        title: "DNS Governance",
        desc: "Reduce takeover and outage risk with guardrails, change control, and hardening.",
        items: [
          "Registrar / DNS access hardening",
          "Change control and ownership for records",
          "Baseline hygiene: SPF/DKIM/DMARC alignment (where applicable)",
        ],
        icon: Globe,
      },
      {
        title: "WAF & Bot Controls",
        desc: "Block the common attack paths without breaking your app.",
        items: [
          "Baseline WAF posture + safe ruleset design",
          "Bot mitigation where it matters",
          "Telemetry-based tuning to reduce false positives",
        ],
        icon: ShieldCheck,
      },
      {
        title: "DDoS Baseline",
        desc: "Protect availability and reduce “panic mitigation” during events.",
        items: [
          "DDoS posture baseline and validation",
          "Origin shielding guidance",
          "Rate limiting patterns for abuse paths",
        ],
        icon: Radar,
      },
      {
        title: "TLS & Edge Hygiene",
        desc: "Make the public surface predictable: TLS posture, headers, and edge policies.",
        items: [
          "TLS posture guidance + cert hygiene",
          "Security headers and edge policies (where applicable)",
          "Documented exceptions and why they exist",
        ],
        icon: Lock,
      },
    ],
    []
  );

  const howWeOperate = useMemo(
    () => [
      {
        step: "01",
        title: "Baseline",
        desc: "We map the external surface area, access paths, and current DNS/WAF posture.",
      },
      {
        step: "02",
        title: "Harden",
        desc: "We implement guardrails, lock down access, and deploy safe baseline rulesets.",
      },
      {
        step: "03",
        title: "Tune + Report",
        desc: "We tune based on telemetry and provide leadership-grade reporting on posture and risk.",
      },
    ],
    []
  );

  const deliverables = useMemo(
    () => [
      "DNS + registrar hardening plan (roles, ownership, break-glass patterns)",
      "WAF baseline with tuned rules and documented exceptions",
      "DDoS posture baseline and origin protection recommendations",
      "Change control model for DNS/edge rules (who/what/when)",
      "Edge posture reporting (blocks, top risks, next priorities)",
    ],
    []
  );

  const related = useMemo(
    () => [
      { title: "Cloud", to: "/services/cloud", icon: Workflow },
      { title: "Governance", to: "/services/consulting", icon: FileCheck2 },
      { title: "Cybersecurity", to: "/services/cybersecurity", icon: Lock },
      { title: "Endpoint Security", to: "/services/endpoint", icon: Laptop2 },
      { title: "Networking", to: "/services/networking", icon: Wifi },
    ],
    []
  );

  return (
    <Layout>
      <Helmet>
        <title>Edge Security | DNS, WAF, DDoS</title>
        <meta
          name="description"
          content="Edge security for public systems: DNS governance, WAF and bot controls, DDoS posture, and origin protection—with disciplined change control and reporting."
        />
        <link rel="canonical" href="https://velcoretech.com/services/edge" />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Velcore Tech" />
        <meta property="og:title" content="Edge Security | Velcore Tech" />
        <meta
          property="og:description"
          content="DNS governance, WAF tuning, DDoS posture, and origin protection—built for predictable operations and defensible security."
        />
        <meta property="og:url" content="https://velcoretech.com/services/edge" />
        <meta property="og:image" content={OG_IMAGE} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Edge Security | Velcore Tech" />
        <meta
          name="twitter:description"
          content="DNS governance, WAF tuning, DDoS posture, and origin protection."
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
              <Globe className="h-4 w-4" />
              DNS / WAF/ Cloudflare
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Edge Security
              <br />
              <span className="text-gradient">DNS, WAF, DDoS, Origin Protection</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl leading-relaxed">
              We harden the public surface area with a disciplined model:
              reduce misconfig risk, control changes, and report posture clearly.
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
      <div id="edge-security" className="scroll-mt-24" aria-hidden="true" />

      {/* OUTCOMES */}
      <section className="section-padding bg-background">
        <div className="container-tight">
          <SectionHeader
            badge="Outcomes"
            title="Less exposure. Fewer surprises."
            description="This pillar exists to protect availability and reduce external risk—without brittle rules."
          />

          <div className="mt-14 rounded-3xl border border-border bg-card p-8 md:p-10">
            <div className="flex items-start gap-4">
              <div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div className="min-w-0">
                <h2 className="text-2xl md:text-3xl font-bold leading-tight">
                  What clients typically get
                </h2>
                <p className="text-muted-foreground mt-2 leading-relaxed">
                  A stable, governed edge posture you can explain and maintain.
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
            description="Practical scope: what we touch, how we control it, and what you can expect."
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
            title="Repeatable hardening, not one-off rules"
            description="Baseline → enforce → tune → report. That’s how edge security stays stable."
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
            title="Adjacent pillars commonly paired with Edge"
            description="Most clients implement Edge alongside Cloud + Governance + Cybersecurity."
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
                      How this pillar integrates with Edge delivery.
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
                <h3 className="text-2xl font-bold mb-2">Want edge security that doesn’t drift?</h3>
                <p className="text-muted-foreground">
                  Start with an assessment. You’ll get gaps, priorities, and a clean execution plan.
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
              { name: "Edge" },
            ]}
          />
        </div>
      </section>
    </Layout>
  );
}