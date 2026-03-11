import { useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Wifi,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Lock,
  BarChart3,
  Workflow,
  Globe,
  Laptop2,
  KeyRound,
  FileCheck2,
  Cable,
} from "lucide-react";

import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/common/SectionHeader";
import { BottomBreadcrumbs } from "@/components/common/BottomBreadcrumbs";

const OG_IMAGE = "https://velcoretech.com/og-image.jpg";

export default function Networking() {
  const outcomes = useMemo(
    () => [
      "Segmentation that matches business reality (staff/guest/IoT/voice/IT)",
      "Firewall rules with documented intent and cleaner exception handling",
      "More stable connectivity with fewer “mystery outages”",
      "Diagrams and documentation leadership can reference when decisions happen",
    ],
    []
  );

  const whatWeCover = useMemo(
    () => [
      {
        title: "Segmentation & VLAN Design",
        desc: "Blueprint segmentation by role and sensitivity — not random VLAN sprawl.",
        items: [
          "Staff/Guest/IT/IoT/Voice segmentation model",
          "Routing boundaries and access intent",
          "Inter-VLAN rules that match risk tolerance",
        ],
        icon: Cable,
      },
      {
        title: "Firewall Policy Hygiene",
        desc: "Rules with intent, ownership, and review cadence — not copy/paste forever.",
        items: [
          "Deny-by-default patterns for sensitive segments",
          "Exception handling and rule ownership",
          "Review cadence to reduce sprawl",
        ],
        icon: Lock,
      },
      {
        title: "Secure Remote Access",
        desc: "VPN / ZTNA architecture that’s stable and aligned to identity controls.",
        items: [
          "Remote access posture review",
          "Safer defaults and access boundaries",
          "Operational guidance for rollout + maintenance",
        ],
        icon: ShieldCheck,
      },
      {
        title: "Documentation & Reporting",
        desc: "Diagrams, inventory, and reporting that supports operations and audits.",
        items: [
          "Network diagrams and baseline documentation",
          "Critical paths and dependencies identified",
          "Operational reporting and change history",
        ],
        icon: BarChart3,
      },
    ],
    []
  );

  const howWeOperate = useMemo(
    () => [
      { step: "01", title: "Assess", desc: "Baseline current topology, segmentation gaps, and high-risk rule patterns." },
      { step: "02", title: "Engineer", desc: "Implement segmentation, rule hygiene, and access boundaries with clean documentation." },
      { step: "03", title: "Operate", desc: "Run change control, periodic reviews, and reporting so the network stays stable." },
    ],
    []
  );

  const deliverables = useMemo(
    () => [
      "Segmentation blueprint (VLANs, boundaries, and access intent)",
      "Firewall policy hygiene plan (owners, exceptions, review cadence)",
      "Remote access posture recommendations (VPN/identity alignment)",
      "Network diagrams and documentation baseline",
      "Reporting template: stability, risk items, and next priorities",
    ],
    []
  );

  const related = useMemo(
    () => [
      { title: "Edge Security", to: "/services/edge", icon: Globe },
      { title: "Cybersecurity", to: "/services/cybersecurity", icon: Lock },
      { title: "Endpoint Security", to: "/services/endpoint", icon: Laptop2 },
      { title: "Governance", to: "/services/governance", icon: KeyRound },
      { title: "Cloud", to: "/services/cloud", icon: Workflow },
      { title: "Audit-Ready", to: "/services/audit-ready", icon: FileCheck2 },
    ],
    []
  );

  return (
    <Layout>
      <Helmet>
        <title>Networking | Segmentation, Firewall, VPN</title>
        <meta
          name="description"
          content="Network and firewall engineering: VLAN segmentation, firewall policy hygiene, secure remote access, documentation, and operational change discipline."
        />
        <link rel="canonical" href="https://velcoretech.com/services/networking" />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Velcore Tech" />
        <meta property="og:title" content="Networking | Velcore Tech" />
        <meta
          property="og:description"
          content="Segmentation, firewall rules with intent, secure remote access, and documentation—built for predictable operations."
        />
        <meta property="og:url" content="https://velcoretech.com/services/networking" />
        <meta property="og:image" content={OG_IMAGE} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Networking | Velcore Tech" />
        <meta
          name="twitter:description"
          content="Segmentation, firewall hygiene, remote access posture, and documentation."
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
              <Wifi className="h-4 w-4" />
              Service Pillar
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Networking
              <br />
              <span className="text-gradient">Segmentation, Firewall, Remote Access</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl leading-relaxed">
              Networking should be engineered like a system: clear boundaries, rule intent, and documentation.
              That’s how you reduce outages and contain risk.
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
            title="Stable connectivity with defensible boundaries"
            description="This pillar reduces rule sprawl, improves segmentation, and makes the network predictable."
          />

          <div className="mt-14 rounded-3xl border border-border bg-card p-8 md:p-10">
            <div className="flex items-start gap-4">
              <div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div className="min-w-0">
                <h2 className="text-2xl md:text-3xl font-bold leading-tight">What clients typically get</h2>
                <p className="text-muted-foreground mt-2 leading-relaxed">
                  Predictability: who can access what, why, and how it stays that way.
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
            description="Practical scope: segmentation, firewall discipline, remote access, and documentation."
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
            title="Engineering + discipline"
            description="We build it clean, document it, and operate it with change control so it stays stable."
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
            title="Adjacent pillars commonly paired with Networking"
            description="Networking integrates directly with edge protection, identity boundaries, and endpoint posture."
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
                      How this pillar integrates with Networking delivery.
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
                <h3 className="text-2xl font-bold mb-2">Want network boundaries you can defend?</h3>
                <p className="text-muted-foreground">
                  Start with an assessment. You’ll get segmentation gaps, rule hygiene issues, and a clean execution plan.
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
              { name: "Networking" },
            ]}
          />
        </div>
      </section>
    </Layout>
  );
}