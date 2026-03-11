import { useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import {
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  FileCheck2,
  ClipboardCheck,
  BarChart3,
  Scale,
  Lock,
  Users,
  Radar,
} from "lucide-react";

import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/common/SectionHeader";
import { BottomBreadcrumbs } from "@/components/common/BottomBreadcrumbs";

const OG_IMAGE = "https://velcoretech.com/og-image.jpg";

export default function SOC2() {
  const outcomes = useMemo(
    () => [
      "Clear control ownership across identity, endpoints, cloud, and change management",
      "Evidence generation that doesn’t rely on last-minute scrambling",
      "Operational cadence aligned to SOC 2 Trust Services Criteria",
      "Reduced friction with auditors and vendor security reviews",
    ],
    []
  );

  const scope = useMemo(
    () => [
      {
        title: "Readiness Assessment",
        desc: "Understand exactly where you stand before engaging auditors.",
        items: [
          "Gap analysis vs SOC 2 Trust Services Criteria",
          "Control maturity evaluation",
          "Risk identification + remediation roadmap",
        ],
        icon: Radar,
      },
      {
        title: "Control Mapping & Ownership",
        desc: "Translate operational reality into structured control coverage.",
        items: [
          "Control matrix creation",
          "Owner assignment + accountability model",
          "Policy alignment to actual workflows",
        ],
        icon: ClipboardCheck,
      },
      {
        title: "Evidence Discipline",
        desc: "Make evidence collection predictable and low-friction.",
        items: [
          "Monthly / quarterly evidence cadence",
          "Artifact tracking structure",
          "Retention + audit-ready organization",
        ],
        icon: FileCheck2,
      },
      {
        title: "Audit Coordination",
        desc: "Support your engagement without taking over your business.",
        items: [
          "Auditor Q&A support",
          "Control clarification + narrative alignment",
          "Remediation tracking",
        ],
        icon: Users,
      },
    ],
    []
  );

  const deliverables = useMemo(
    () => [
      "SOC 2 readiness report (executive + technical view)",
      "Control matrix with mapped ownership",
      "Evidence collection workflow + cadence",
      "Policy templates (lightweight + operationally aligned)",
      "Remediation roadmap with priority tiers",
      "Optional support for tools (Drata, Vanta, etc.)",
    ],
    []
  );

  const related = useMemo(
    () => [
      { title: "Governance", to: "/services/governance", icon: Scale },
      { title: "Cloud Services", to: "/services/cloud", icon: Lock },
      { title: "Cybersecurity", to: "/services/cybersecurity", icon: ShieldCheck },
      { title: "Managed IT", to: "/services/Managed-IT", icon: ShieldCheck },
    ],
    []
  );

  return (
    <Layout>
      <Helmet>
        <title>SOC 2 Readiness & Audit Support | Velcore Tech</title>
        <meta
          name="description"
          content="SOC 2 readiness and audit preparation with control mapping, evidence cadence, and operational discipline—built for sustainable compliance."
        />
        <link rel="canonical" href="https://velcoretech.com/services/soc2" />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Velcore Tech" />
        <meta property="og:title" content="SOC 2 Readiness | Velcore Tech" />
        <meta
          property="og:description"
          content="SOC 2 readiness built around real operational discipline—not last-minute audit scrambling."
        />
        <meta property="og:url" content="https://velcoretech.com/services/soc2" />
        <meta property="og:image" content={OG_IMAGE} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="SOC 2 Readiness | Velcore Tech" />
        <meta
          name="twitter:description"
          content="Control mapping, evidence cadence, and audit preparation with sustainable operational discipline."
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
              <ShieldCheck className="h-4 w-4" />
              Service Pillar
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              SOC 2 Readiness
              <br />
              <span className="text-gradient">Controls, Evidence, Discipline</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl leading-relaxed">
              SOC 2 isn’t a document. It’s operational discipline.
              We align identity, cloud, endpoints, and reporting into a defensible control structure.
            </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="gradient" size="lg" asChild>
                <Link to="/assessment">
                  Start with Readiness Assessment <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/contact">
                  Talk to Us <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* OUTCOMES */}
      <section className="section-padding bg-background">
        <div className="container-tight">
          <SectionHeader
            badge="Outcomes"
            title="Audit-ready without operational chaos"
            description="Compliance should strengthen operations—not distract from them."
          />

          <div className="grid lg:grid-cols-2 gap-6 mt-14">
            {outcomes.map((o) => (
              <div key={o} className="rounded-2xl border border-border bg-card p-6">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div className="leading-relaxed">{o}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SCOPE */}
      <section className="section-padding bg-card">
        <div className="container-tight">
          <SectionHeader
            badge="Scope"
            title="What we actually do"
            description="Clear ownership. Clear controls. Measurable execution."
          />

          <div className="grid md:grid-cols-2 gap-6 mt-14">
            {scope.map((s) => (
              <div key={s.title} className="rounded-3xl border border-border bg-background p-7">
                <div className="flex items-start gap-4">
                  <div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary">
                    <s.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-lg font-semibold">{s.title}</div>
                    <p className="text-sm text-muted-foreground mt-1">{s.desc}</p>
                  </div>
                </div>

                <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
                  {s.items.map((i) => (
                    <li key={i}>• {i}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DELIVERABLES */}
      <section className="section-padding bg-background">
        <div className="container-tight">
          <SectionHeader
            badge="Deliverables"
            title="Concrete outputs you can hold us to"
            description="No vague promises—structured, auditable outcomes."
          />

          <div className="rounded-3xl border border-border bg-card p-8 mt-14">
            <ul className="space-y-3 text-sm text-muted-foreground">
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
            title="Often paired with"
            description="SOC 2 works best when identity, cloud, and security operations are aligned."
          />

          <div className="grid sm:grid-cols-2 gap-6 mt-14">
            {related.map((r) => (
              <Link
                key={r.to}
                to={r.to}
                className="feature-card group block transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                    <r.icon className="h-6 w-6" />
                  </div>
                  <div className="font-semibold text-lg group-hover:text-primary transition-colors">
                    {r.title}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-background">
        <div className="container-tight text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to move toward SOC 2 without chaos?
          </h2>
          <Button variant="gradient" size="xl" asChild>
            <Link to="/assessment">
              Start Readiness Assessment <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>

          <BottomBreadcrumbs
            items={[
              { name: "Home", to: "/" },
              { name: "Services", to: "/services" },
              { name: "SOC 2" },
            ]}
          />
        </div>
      </section>
    </Layout>
  );
}