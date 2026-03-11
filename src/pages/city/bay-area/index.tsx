import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BottomBreadcrumbs } from "@/components/common/BottomBreadcrumbs";

import {
  MapPin,
  ArrowRight,
  ClipboardCheck,
  Shield,
  Lock,
  Globe,
  Cloud,
  Network,
} from "lucide-react";

import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/common/SectionHeader";

const SCHEDULER_URL = "https://cal.com/velcoreit";
const OG_IMAGE = "https://velcoretech.com/og-image.jpg";

const areas = [
  "San Francisco",
  "San Jose",
  "Oakland",
  "Santa Clara",
  "Sunnyvale",
  "Mountain View",
  "Palo Alto",
  "Redwood City",
  "San Mateo",
  "Fremont",
  "Berkeley",
  "Walnut Creek",
];

const localServices = [
  {
    title: "Managed IT",
    description:
      "Operations, patching, support, and standards for predictable day-to-day IT.",
    to: "/city/bay-area/Managed-IT",
    icon: Shield,
  },
  {
    title: "Cybersecurity",
    description:
      "Hardening, monitoring strategy, and incident readiness to reduce cyber risk.",
    to: "/city/bay-area/cybersecurity",
    icon: Lock,
  },
  {
    title: "Cloud Migration",
    description:
      "Microsoft 365 / cloud transitions with governance, cutover planning, and stability.",
    to: "/city/bay-area/cloud-migration",
    icon: Cloud,
  },
  {
    title: "Edge Security",
    description:
      "DNS/WAF/DDoS controls with Cloudflare-focused governance and exposure reduction.",
    to: "/city/bay-area/edge-security",
    icon: Globe,
  },
];

function Breadcrumbs() {
  return (
    <nav aria-label="Breadcrumb" className="mb-4 flex justify-center">
      <ol className="flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
        <li>
          <Link to="/" className="hover:text-foreground hover:underline">
            Home
          </Link>
        </li>
        <li className="opacity-60">/</li>
        <li className="text-foreground font-medium">Bay Area</li>
      </ol>
    </nav>
  );
}

export default function BayArea() {
  const canonical = "https://velcoretech.com/city/bay-area";

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: "Velcore Tech",
      url: canonical,
      telephone: "+18313347943",
      areaServed: areas.map((c) => `${c}, CA`),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://velcoretech.com/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Bay Area",
          item: canonical,
        },
      ],
    },
  ];

  return (
    <Layout>
      <Helmet>
        <title>Managed IT & Cybersecurity Bay Area | Velcore Tech</title>
        <meta
          name="description"
          content="Velcore Tech provides security-first managed IT and cybersecurity across the Bay Area. Identity controls, Microsoft 365 governance, secure networking, recovery readiness, and Cloudflare edge security."
        />
        <link rel="canonical" href={canonical} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Velcore Tech" />
        <meta
          property="og:title"
          content="Managed IT & Cybersecurity Bay Area | Velcore Tech"
        />
        <meta
          property="og:description"
          content="Security-first managed IT and cybersecurity across the Bay Area—built for reliable delivery, measurable controls, and leadership-grade visibility."
        />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:image:alt"
          content="Velcore Tech - Security-First Managed IT & Cybersecurity"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={OG_IMAGE} />

        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* HERO */}
      <header className="section-padding bg-background relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[420px] bg-hero-glow pointer-events-none" />

        <div className="container-tight relative z-10 text-center">
          <Breadcrumbs />

          <div className="inline-flex items-center gap-2 text-sm text-muted-foreground mb-4 justify-center">
            <MapPin className="h-4 w-4 text-primary" />
            <span>San Francisco • Peninsula • South Bay • East Bay</span>
          </div>

          {/* SectionHeader uses an h2 in your system; keep it here but add a real H1 for SEO */}
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Managed IT & Cybersecurity Across the Bay Area
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We operate security-first IT for Bay Area organizations that want{" "}
            <span className="text-foreground">reliability</span>,{" "}
            <span className="text-foreground">measurable controls</span>, and{" "}
            <span className="text-foreground">leadership-grade reporting</span>—not
            ad-hoc support and noisy dashboards.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="gradient" size="xl" asChild>
              <Link to="/assessment">
                Start Assessment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>

            <Button variant="outline" size="xl" asChild>
              <a href={SCHEDULER_URL} target="_blank" rel="noreferrer">
                Schedule a Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>

            <Button variant="outline" size="xl" asChild>
              <Link to="/services">
                View all services
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* BAY AREA SERVICES (HUB LINKS) */}
      <section className="section-padding bg-background">
        <div className="container-tight">
          <SectionHeader
            badge="Bay Area Services"
            title="Start With the Service You Need"
            description="Choose a Bay Area-specific service page for scope, outcomes, and how we deliver across your environment."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
            {localServices.map((s, idx) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.04 }}
              >
                <Link
                  to={s.to}
                  className={[
                    "group block rounded-2xl border border-border bg-card p-5 transition-all duration-200",
                    "hover:border-primary/30 hover:ring-1 hover:ring-primary/20",
                    "hover:shadow-[0_0_0_1px_hsl(var(--primary)/0.14),0_0_18px_hsl(var(--primary)/0.10)]",
                  ].join(" ")}
                >
                  <div className="flex items-start gap-3">
                    <span className="inline-flex p-2 rounded-xl bg-primary/10 text-primary">
                      <s.icon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <div className="font-semibold group-hover:text-primary transition-colors">
                        {s.title}
                      </div>
                      <div className="text-sm text-muted-foreground mt-1 leading-relaxed">
                        {s.description}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 inline-flex items-center text-sm text-muted-foreground group-hover:text-primary transition-colors">
                    View Bay Area page <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Strong internal linking CTA */}
          <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-2xl bg-card border border-border">
            <div className="min-w-0">
              <p className="font-semibold">Need the full services overview?</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Browse all service lines, tiers, and outcomes in one place.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Button variant="outline" asChild className="w-full sm:w-auto">
                <Link to="/services">
                  View all services <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="gradient" asChild className="w-full sm:w-auto">
                <Link to="/contact">
                  Talk to Velcore <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT WE DELIVER */}
      <section className="section-padding bg-background">
        <div className="container-tight">
          <h2 className="text-3xl font-bold mb-4">What You Get With Velcore Tech</h2>
          <p className="text-muted-foreground leading-relaxed mb-10">
            This isn’t just ticketing. We run IT as an operating function—defined standards,
            enforceable controls, and clear reporting that reduces downtime and security exposure.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: Shield,
                title: "Operational Standards",
                text: "Defined baselines for identity, endpoints, and SaaS configuration—so the environment stays consistent and defensible.",
              },
              {
                icon: Network,
                title: "Secure Networking",
                text: "Segmentation, firewall policy hygiene, secure remote access patterns, and multi-site reliability improvements.",
              },
              {
                icon: Lock,
                title: "Controls That Stick",
                text: "Identity-first security (MFA, Conditional Access, admin protections), practical hardening, and monitoring strategy that matures over time.",
              },
              {
                icon: ClipboardCheck,
                title: "Roadmap + Accountability",
                text: "Prioritized work plan with clear ownership—what’s covered, what’s improving, and what risk remains.",
              },
            ].map((item, idx) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.03 }}
                className="p-6 rounded-2xl bg-card border border-border"
              >
                <div className="inline-flex p-3 rounded-xl bg-primary/10 text-primary mb-4">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* AREAS SERVED */}
      <section className="section-padding bg-card">
        <div className="container-tight">
          <h2 className="text-3xl font-bold mb-4">Where We Serve in the Bay Area</h2>
          <p className="text-muted-foreground leading-relaxed mb-8">
            We support Bay Area teams with on-site and remote capability. Engagements commonly include identity controls,
            Microsoft 365 governance, endpoint standards, secure networking, recovery readiness, and edge security.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {areas.map((a) => (
              <div
                key={a}
                className="px-4 py-3 rounded-xl bg-background border border-border text-sm text-muted-foreground"
              >
                {a}
              </div>
            ))}
          </div>

          <p className="text-xs text-muted-foreground mt-6">
            Not listed? If you’re in Northern California, we can likely support you.
          </p>
        </div>
      </section>

      <BottomBreadcrumbs
        items={[
          { name: "Home", to: "/" },
          { name: "Bay Area" },
        ]}
      />
    </Layout>
  );
}