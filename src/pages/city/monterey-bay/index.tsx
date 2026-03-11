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
  Server,
  CheckCircle2,
} from "lucide-react";

import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/common/SectionHeader";
import { getTrackingParams } from "@/components/common/Tracking";

// Standardized styling constants
const CARD_BASE = "rounded-3xl bg-card p-7 flex flex-col h-full";
const GLOW_CARD =
  "border border-border " +
  "transition-[border-color,box-shadow] duration-200 " +
  "hover:border-primary/30 hover:ring-1 hover:ring-primary/20 " +
  "hover:shadow-[0_0_0_1px_hsl(var(--primary)/0.14),0_0_18px_hsl(var(--primary)/0.10)] " +
  "transform-gpu will-change-[box-shadow]";

const ICON_TITLE_PILL =
  "inline-flex items-center gap-3 px-4 py-3 rounded-2xl " +
  "bg-primary/10 text-primary border border-primary/20";

const SCHEDULER_URL = "https://cal.com/velcoreit";
const OG_IMAGE = "https://velcoretech.com/og-image.jpg";

const areas = [
  "Santa Cruz",
  "Watsonville",
  "Salinas",
  "Monterey",
  "Carmel-by-the-Sea",
  "Pacific Grove",
  "Marina",
  "Seaside",
  "Scotts Valley",
  "Capitola",
  "Aptos",
  "Prunedale",
];

const localServices = [
  {
    title: "Managed IT",
    description:
      "Operations, patching, support, and standards for predictable day-to-day IT.",
    to: "/city/monterey-bay/Managed-IT",
    icon: Server,
  },
  {
    title: "Cybersecurity",
    description:
      "Hardening, monitoring strategy, and incident readiness to reduce cyber risk.",
    to: "/city/monterey-bay/cybersecurity",
    icon: Lock,
  },
  {
    title: "Cloud Migration",
    description:
      "Microsoft 365 / cloud transitions with governance, cutover planning, and stability.",
    to: "/city/monterey-bay/cloud-migration",
    icon: Cloud,
  },
  {
    title: "Edge Security",
    description:
      "DNS/WAF/DDoS controls with Cloudflare-focused governance and exposure reduction.",
    to: "/city/monterey-bay/edge-security",
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
        <li className="text-foreground font-medium">Monterey Bay Area</li>
      </ol>
    </nav>
  );
}

export default function MontereyBay() {
  const canonical = "https://velcoretech.com/city/monterey-bay";

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: "Velcore Tech",
      url: canonical,
      telephone: "+18313347943",
      areaServed: areas.map((c) => `${c}, CA`),
      address: {
        "@type": "PostalAddress",
        streetAddress: "123 Main St",
        addressLocality: "Santa Cruz",
        addressRegion: "CA",
        postalCode: "95060",
        addressCountry: "US",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 36.9741,
        longitude: -122.0308,
      },
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
      sameAs: [
        "https://www.linkedin.com/company/velcore-tech",
        "https://twitter.com/velcoretech",
      ],
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
          name: "Monterey Bay Area",
          item: canonical,
        },
      ],
    },
  ];

  return (
    <Layout>
      <Helmet>
        <title>Managed IT & Cybersecurity Monterey Bay | Velcore Tech</title>
        <meta
          name="description"
          content="Velcore Tech provides security-first managed IT and cybersecurity across the Monterey Bay Area including Santa Cruz, Watsonville, Salinas, and Monterey. Identity controls, Microsoft 365 governance, secure networking, recovery readiness, and Cloudflare edge security."
        />
        <link rel="canonical" href={canonical} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Velcore Tech" />
        <meta
          property="og:title"
          content="Managed IT & Cybersecurity Monterey Bay | Velcore Tech"
        />
        <meta
          property="og:description"
          content="Security-first managed IT and cybersecurity across the Monterey Bay Area—built for reliable delivery, measurable controls, and leadership-grade visibility."
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
      <section className="relative overflow-hidden hero-gradient pt-24 pb-12">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-hero-glow opacity-40 pointer-events-none" />
        <div className="container-tight relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Breadcrumbs />

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-primary/10 text-primary border border-primary/20 mb-6">
              <MapPin className="h-4 w-4" />
              <span>Santa Cruz • Watsonville • Salinas • Monterey</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold tracking-tight mb-6">
              Managed IT & Cybersecurity
              <span className="text-gradient block mt-2">Across the Monterey Bay Area</span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We operate security-first IT for Monterey Bay organizations that want{" "}
              <span className="text-foreground font-semibold">reliability</span>,{" "}
              <span className="text-foreground font-semibold">measurable controls</span>, and{" "}
              <span className="text-foreground font-semibold">leadership-grade reporting</span>—not
              reactive support and fragmented tools.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="gradient" size="lg" asChild>
                <Link to={`/assessment${getTrackingParams('monterey-bay', 'hero', 'assessment')}`}>
                  Start Assessment
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>

              <Button variant="outline-glow" size="lg" asChild>
                <a href={`${SCHEDULER_URL}${getTrackingParams('monterey-bay', 'hero', 'schedule')}`} target="_blank" rel="noreferrer">
                  Schedule a Consultation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* LOCAL SERVICES */}
      <section className="py-20 bg-background">
        <div className="container-tight">
          <SectionHeader
            badge="Local Services"
            title="Start With the Service You Need"
            description="Choose a Monterey Bay-specific service page for scope, outcomes, and how we deliver across your environment."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            {localServices.map((s, idx) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.08 }}
                className={[CARD_BASE, GLOW_CARD, "bg-card/70 p-6"].join(" ")}
              >
                <Link to={s.to} className="block h-full">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20">
                      <s.icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">{s.title}</h3>
                  </div>
                  
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    {s.description}
                  </p>

                  <div className="inline-flex items-center text-sm font-medium text-primary group-hover:gap-3 transition-all">
                    Learn more <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AREAS SERVED */}
      <section className="py-20 bg-card">
        <div className="container-tight">
          <SectionHeader
            badge="Coverage Area"
            title="Where We Serve in the Monterey Bay Area"
            description="We support organizations across Santa Cruz County and Monterey County with both on-site and remote-first capability."
          />

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-16">
            {areas.map((a) => (
              <motion.div
                key={a}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.2 }}
                className="px-4 py-3 rounded-xl bg-background/60 border border-border text-sm text-muted-foreground text-center"
              >
                {a}
              </motion.div>
            ))}
          </div>

          <p className="text-sm text-muted-foreground mt-8 text-center">
            Not listed? If you're located along the Central Coast, we can likely support you.
          </p>
        </div>
      </section>

      {/* WHAT WE DELIVER */}
      <section className="py-20 bg-background">
        <div className="container-tight">
          <SectionHeader
            badge="Our Approach"
            title="What You Get With Velcore Tech"
            description="This isn't just ticketing. We run IT as an operating function—defined standards, enforceable controls, and clear reporting that reduces downtime and security exposure."
          />

          <div className="grid md:grid-cols-2 gap-6 mt-16">
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
                text: "Prioritized work plan with clear ownership—what's covered, what's improving, and what risk remains.",
              },
            ].map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.06 }}
                className={[CARD_BASE, GLOW_CARD, "bg-card/70 p-8"].join(" ")}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 bg-card border-t border-border">
        <div className="container-tight">
          <div className="p-8 md:p-10 rounded-3xl bg-background border border-border relative overflow-hidden">
            <div className="absolute inset-0 bg-hero-glow opacity-40 pointer-events-none" />
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="max-w-2xl">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">
                  Ready to Transform Your IT Operations?
                </h2>
                <p className="text-muted-foreground">
                  Start with an assessment—we'll baseline your current posture and deliver a 
                  prioritized roadmap tailored to your Monterey Bay organization.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="gradient" size="lg" asChild>
                  <Link to={`/assessment${getTrackingParams('monterey-bay', 'final_cta', 'assessment')}`}>
                    Start Assessment <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline-glow" size="lg" asChild>
                  <Link to={`/contact${getTrackingParams('monterey-bay', 'final_cta', 'contact')}`}>
                    Contact Us <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BottomBreadcrumbs
        items={[
          { name: "Home", to: "/" },
          { name: "Monterey Bay Area" },
        ]}
      />
    </Layout>
  );
}