import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Shield,
  Cloud,
  Lock,
  Globe,
  ClipboardCheck,
  ArrowRight,
  MapPin,
  Activity,
} from "lucide-react";

import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/common/SectionHeader";
import { FeatureCard } from "@/components/common/FeatureCard";
import { getTrackingParams } from "@/components/common/Tracking";

const OG_IMAGE = "https://velcoretech.com/og-image.jpg";

const localValueProps = [
  {
    icon: Shield,
    title: "IT Managed Services",
    description:
      "Disciplined IT operations: defined scope, documented standards, and accountable ownership.",
    to: "/services/Managed-IT",
  },
  {
    icon: Lock,
    title: "Cybersecurity",
    description:
      "Control mapping, monitoring maturity, and security programs designed to withstand scrutiny.",
    to: "/services/cybersecurity",
  },
  {
    icon: ClipboardCheck,
    title: "Audit-Ready Discipline",
    description:
      "Operational controls and documentation built for leadership visibility and audit readiness.",
    to: "/services/audit-ready",
  },
];

const faqs = [
  {
    q: "Do you support Santa Cruz organizations onsite or remote?",
    a: "Both. We're headquartered in Santa Cruz and deliver secure remote-first operations nationwide, with onsite support when needed.",
  },
  {
    q: "What types of businesses do you work with?",
    a: "Growing organizations that need enterprise-grade security and reliable IT operations without building a large internal team.",
  },
  {
    q: "Can you help with SOC 2 readiness?",
    a: "Yes. We help map controls, build operational evidence, mature monitoring, and implement enforceable standards across identity, endpoints, cloud, and edge protection.",
  },
  {
    q: "Do you manage Microsoft 365 security and governance?",
    a: "Yes. We enforce MFA/conditional access patterns, lifecycle workflows, admin controls, logging posture, and change discipline.",
  },
];

export default function SantaCruz() {
  return (
    <Layout>
      <Helmet>
        <title>Managed IT & Cybersecurity in Santa Cruz, CA</title>
        <meta
          name="description"
          content="Velcore Tech provides security-first managed IT and cybersecurity in Santa Cruz, CA—Microsoft 365 governance, endpoint hardening, SOC 2 readiness, network reliability, recovery, and Cloudflare edge protection."
        />
        <link rel="canonical" href="https://velcoretech.com/city/santa-cruz" />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Velcore Tech" />
        <meta
          property="og:title"
          content="Managed IT & Cybersecurity in Santa Cruz, CA | Velcore Tech"
        />
        <meta
          property="og:description"
          content="Security-first IT operations in Santa Cruz—identity, endpoints, Microsoft 365 governance, SOC 2 readiness, recovery, and Cloudflare edge protection."
        />
        <meta property="og:url" content="https://velcoretech.com/city/santa-cruz" />
        <meta property="og:image" content={OG_IMAGE} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Managed IT & Cybersecurity in Santa Cruz, CA | Velcore Tech"
        />
        <meta
          name="twitter:description"
          content="Security-first managed IT and cybersecurity in Santa Cruz—M365 governance, endpoint defense, SOC 2 readiness, recovery, and edge protection."
        />
        <meta name="twitter:image" content={OG_IMAGE} />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "Velcore Tech LLC",
            url: "https://velcoretech.com/",
            image: OG_IMAGE,
            address: {
              "@type": "PostalAddress",
              addressLocality: "Santa Cruz",
              addressRegion: "CA",
              postalCode: "95060",
              addressCountry: "US",
            },
            areaServed: [{ "@type": "City", name: "Santa Cruz" }],
          })}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section className="section-padding bg-background">
        <div className="container-tight">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="rounded-3xl border border-border bg-card p-8 md:p-12"
          >
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <MapPin className="h-4 w-4 text-primary" />
              <span>Santa Cruz, California</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
              Managed IT & Cybersecurity in Santa Cruz, CA
            </h1>

            <p className="mt-5 text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed">
              We operate security-first IT for growing organizations—identity,
              endpoints, Microsoft 365 governance, network reliability, recovery,
              and Cloudflare edge protection—run with documented standards and
              leadership-grade reporting.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button variant="outline-glow" size="lg" asChild>
                <Link to={`/assessment${getTrackingParams('santa-cruz', 'hero', 'assessment')}`}>
                  Start Assessment <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>

              <Button variant="outline" size="lg" asChild>
                <Link to={`/contact${getTrackingParams('santa-cruz', 'hero', 'consultation')}`}>
                  Schedule a Consultation <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                <span>Documented operating standards</span>
              </div>

              <div className="hidden sm:block h-4 w-px bg-border" />

              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-primary" />
                <span>Monitoring + disciplined maintenance</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section - Internal linking */}
      <section className="section-padding bg-card">
        <div className="container-tight">
          <SectionHeader
            badge="Services"
            title="What We Deliver in Santa Cruz"
            description="Operational reliability and defensible security—implemented with enforceable standards and maintained with cadence."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
            {localValueProps.map((p, idx) => (
              <FeatureCard
                key={p.title}
                icon={p.icon}
                title={p.title}
                description={p.description}
                to={`${p.to}${getTrackingParams('santa-cruz', 'services_grid', p.title.toLowerCase().replace(/\s+/g, '_'))}`}
                ctaLabel="Learn more"
                delay={idx * 0.06}
              />
            ))}
          </div>

          <p className="mt-10 text-sm text-muted-foreground">
            Also serving the{" "}
            <Link 
              to={`/city/bay-area${getTrackingParams('santa-cruz', 'footer_link', 'bay_area')}`} 
              className="underline underline-offset-4 hover:text-foreground"
            >
              Bay Area
            </Link>{" "}
            and organizations nationwide.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-background">
        <div className="container-tight">
          <SectionHeader
            badge="FAQ"
            title="Santa Cruz Managed IT — Common Questions"
            description="Quick answers on delivery model, scope, and readiness outcomes."
          />

          <div className="mt-16 grid md:grid-cols-2 gap-6">
            {faqs.map((f) => (
              <div
                key={f.q}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <h2 className="font-semibold text-lg">{f.q}</h2>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="section-padding bg-card">
        <div className="container-tight">
          <div className="rounded-3xl border border-border bg-background p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <h2 className="text-2xl md:text-3xl font-bold">
                Ready to stabilize IT and harden security?
              </h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                Start with an assessment. You'll get prioritized findings, ownership,
                and a plan to reduce operational risk—without dashboard noise.
              </p>
            </div>

            <div className="flex gap-3">
              <Button variant="outline-glow" asChild>
                <Link to={`/assessment${getTrackingParams('santa-cruz', 'final_cta', 'assessment')}`}>
                  Start Assessment <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to={`/contact${getTrackingParams('santa-cruz', 'final_cta', 'contact')}`}>
                  Contact <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}