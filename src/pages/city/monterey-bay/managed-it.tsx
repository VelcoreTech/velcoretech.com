import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { BottomBreadcrumbs } from "@/components/common/BottomBreadcrumbs";

import {
  Shield,
  ClipboardCheck,
  ArrowRight,
  MapPin,
  Network,
  Lock,
  Users,
  Globe,
  Building2,
  Server,
  CheckCircle2,
  HardDrive,
  Cloud,
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

const OG_IMAGE = "https://velcoretech.com/og-image.jpg";
const SCHEDULER_URL = "https://cal.com/velcoreit";

function Breadcrumbs({ items }: { items: { name: string; to?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 flex justify-center">
      <ol className="flex flex-wrap items-center justify-center gap-2 text-sm text-muted-foreground">
        {items.map((it, i) => (
          <li key={`${it.name}-${i}`} className="flex items-center gap-2">
            {it.to ? (
              <Link to={it.to} className="hover:underline hover:text-foreground">
                {it.name}
              </Link>
            ) : (
              <span className="text-foreground font-medium">{it.name}</span>
            )}
            {i < items.length - 1 && <span className="opacity-60">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default function MontereyBayManagedIT() {
  const canonical = "https://velcoretech.com/city/monterey-bay/Managed-IT";

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

  const jsonLdService = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Velcore Tech - Managed IT Monterey Bay",
    url: canonical,
    telephone: "+18313347943",
    areaServed: { "@type": "City", name: "Monterey Bay Area" },
    serviceType: "Managed IT Services",
  };

  const jsonLdBreadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://velcoretech.com/" },
      { "@type": "ListItem", position: 2, name: "Monterey Bay", item: "https://velcoretech.com/city/monterey-bay" },
      { "@type": "ListItem", position: 3, name: "Managed IT", item: canonical },
    ],
  };

  return (
    <Layout>
      <Helmet>
        <title>Managed IT Services Monterey Bay | Velcore Tech</title>
        <meta
          name="description"
          content="Managed IT services across the Monterey Bay Area. Velcore Tech delivers security-first IT operations, Microsoft 365 governance, identity hardening, network security, and reliable support for growing organizations in Santa Cruz, Watsonville, Salinas, and Monterey."
        />
        <link rel="canonical" href={canonical} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Velcore Tech" />
        <meta property="og:title" content="Managed IT Services Monterey Bay | Velcore Tech" />
        <meta
          property="og:description"
          content="Security-first managed IT across the Monterey Bay Area: predictable operations, governance, and reliable support."
        />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Velcore Tech - Security-First Managed IT & Cybersecurity" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={OG_IMAGE} />

        <script type="application/ld+json">{JSON.stringify(jsonLdService)}</script>
        <script type="application/ld+json">{JSON.stringify(jsonLdBreadcrumbs)}</script>
      </Helmet>

      {/* Hero */}
      <section className="relative overflow-hidden hero-gradient pt-24 pb-12">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-hero-glow opacity-40 pointer-events-none" />
        <div className="container-tight relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Breadcrumbs
              items={[
                { name: "Home", to: "/" },
                { name: "Monterey Bay", to: "/city/monterey-bay" },
                { name: "Managed IT" },
              ]}
            />

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-primary/10 text-primary border border-primary/20 mb-6">
              <MapPin className="h-4 w-4" />
              <span>Monterey Bay Area (on-site + remote)</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold tracking-tight mb-6">
              Managed IT Services
              <span className="text-gradient block mt-2">Across the Monterey Bay Area</span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
              Velcore Tech provides security-first managed IT for Monterey Bay organizations — designed for reliability, governance,
              and measurable outcomes (not chaos and reactive support).
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="gradient" size="lg" asChild>
                <Link to={`/assessment${getTrackingParams('monterey-bay-managed-it', 'hero', 'assessment')}`}>
                  Start Assessment <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>

              <Button variant="outline-glow" size="lg" asChild>
                <Link to={`/services/Managed-IT${getTrackingParams('monterey-bay-managed-it', 'hero', 'overview')}`}>
                  View Managed IT Overview <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Areas served */}
      <section className="py-20 bg-card">
        <div className="container-tight">
          <SectionHeader
            badge="Coverage Area"
            title="Where We Serve"
            description="We support Monterey Bay teams with on-site and remote capability. Engagements commonly include identity & access controls, Microsoft 365 governance, endpoint standards, secure networking, and edge security."
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
            Not listed? If you're in the Monterey Bay Area, we can likely support you.
          </p>
        </div>
      </section>

      {/* What we deliver */}
      <section className="py-20 bg-background">
        <div className="container-tight">
          <SectionHeader
            badge="Our Approach"
            title="What 'Security-First Managed IT' Means"
            description="This isn't just ticketing. We operate your environment with clear standards, defined ownership, and controls that reduce downtime and cyber risk."
          />

          <div className="grid md:grid-cols-2 gap-6 mt-16">
            {[
              {
                icon: Users,
                title: "Identity & Access Management",
                text: "MFA enforcement, admin protections, least privilege, and onboarding/offboarding discipline.",
              },
              {
                icon: Lock,
                title: "Governance & Compliance Readiness",
                text: "Practical baselines, audit-friendly documentation, and measurable controls (as required).",
              },
              {
                icon: Cloud,
                title: "Microsoft 365 & Cloud Operations",
                text: "Tenant hardening, mailbox + data protection, secure collaboration, and operational reliability.",
              },
              {
                icon: Network,
                title: "Network & Firewall",
                text: "Segmentation, secure remote access, firewall rule hygiene, and stability improvements.",
              },
              {
                icon: HardDrive,
                title: "Backup & Recovery",
                text: "Coverage validation, restore testing, ransomware resilience patterns, and recovery playbooks.",
              },
              {
                icon: Globe,
                title: "Edge Security (DNS / Cloudflare)",
                text: "DNS governance, WAF/DDoS protection, TLS hygiene, and exposure reduction for public assets.",
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

          <div className="mt-16 text-center">
            <Button variant="outline-glow" size="lg" asChild>
              <Link to={`/city/bay-area${getTrackingParams('monterey-bay-managed-it', 'footer', 'bay-area')}`}>
                Also serving the Bay Area <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-20 bg-card">
        <div className="container-tight">
          <div className="rounded-3xl border border-border bg-background/60 p-8 md:p-10">
            <SectionHeader
              badge="Related Services"
              title="Strong Managed IT Depends on Integration"
              description="Identity controls, recovery readiness, and edge protection working together across the Monterey Bay Area."
            />

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
              <Link
                to={`/services/Managed-IT${getTrackingParams('monterey-bay-managed-it', 'related', 'overview')}`}
                className="group rounded-2xl border border-border bg-background/60 p-5 hover:bg-background transition-colors"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Server className="h-4 w-4 text-primary" />
                  <div className="font-semibold group-hover:text-primary transition-colors">Managed IT Overview</div>
                </div>
                <div className="text-sm text-muted-foreground">Core operating model, standards, and delivery.</div>
              </Link>

              <Link
                to={`/services/governance#identity-access${getTrackingParams('monterey-bay-managed-it', 'related', 'identity')}`}
                className="group rounded-2xl border border-border bg-background/60 p-5 hover:bg-background transition-colors"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-4 w-4 text-primary" />
                  <div className="font-semibold group-hover:text-primary transition-colors">Identity & Access</div>
                </div>
                <div className="text-sm text-muted-foreground">MFA, Conditional Access, admin governance.</div>
              </Link>

              <Link
                to={`/services/cloud#backup-recovery${getTrackingParams('monterey-bay-managed-it', 'related', 'backup')}`}
                className="group rounded-2xl border border-border bg-background/60 p-5 hover:bg-background transition-colors"
              >
                <div className="flex items-center gap-2 mb-2">
                  <HardDrive className="h-4 w-4 text-primary" />
                  <div className="font-semibold group-hover:text-primary transition-colors">Backup & Recovery</div>
                </div>
                <div className="text-sm text-muted-foreground">Restore readiness, ransomware recovery posture.</div>
              </Link>

              <Link
                to={`/city/monterey-bay/cybersecurity${getTrackingParams('monterey-bay-managed-it', 'related', 'cybersecurity')}`}
                className="group rounded-2xl border border-border bg-background/60 p-5 hover:bg-background transition-colors"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-4 w-4 text-primary" />
                  <div className="font-semibold group-hover:text-primary transition-colors">Monterey Bay Cybersecurity</div>
                </div>
                <div className="text-sm text-muted-foreground">Local hardening and readiness improvements.</div>
              </Link>

              <Link
                to={`/city/monterey-bay/edge-security${getTrackingParams('monterey-bay-managed-it', 'related', 'edge')}`}
                className="group rounded-2xl border border-border bg-background/60 p-5 hover:bg-background transition-colors"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Globe className="h-4 w-4 text-primary" />
                  <div className="font-semibold group-hover:text-primary transition-colors">Monterey Bay Edge Security</div>
                </div>
                <div className="text-sm text-muted-foreground">DNS hardening, WAF, DDoS protections.</div>
              </Link>

              <Link
                to={`/city/monterey-bay${getTrackingParams('monterey-bay-managed-it', 'related', 'hub')}`}
                className="group rounded-2xl border border-border bg-background/60 p-5 hover:bg-background transition-colors"
              >
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <div className="font-semibold group-hover:text-primary transition-colors">Monterey Bay Overview</div>
                </div>
                <div className="text-sm text-muted-foreground">Monterey Bay hub and all local pages.</div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-background">
        <div className="container-tight">
          <div className="p-8 md:p-10 rounded-3xl bg-card border border-border relative overflow-hidden text-center">
            <div className="absolute inset-0 bg-hero-glow opacity-40 pointer-events-none" />
            <div className="relative z-10">
              <div className="inline-flex p-4 rounded-2xl bg-primary/10 text-primary border border-primary/20 mb-6">
                <ClipboardCheck className="h-10 w-10" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Get a Baseline and a Prioritized Plan</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-8 text-lg">
                Start with an IT & Security Assessment. We'll identify the highest impact improvements for stability and risk reduction across your Monterey Bay organization.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="gradient" size="lg" asChild>
                  <Link to={`/assessment${getTrackingParams('monterey-bay-managed-it', 'cta', 'assessment')}`}>
                    Start the Assessment <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline-glow" size="lg" asChild>
                  <a href={`${SCHEDULER_URL}${getTrackingParams('monterey-bay-managed-it', 'cta', 'schedule')}`} target="_blank" rel="noreferrer">
                    Schedule a Consultation <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <BottomBreadcrumbs
        items={[
          { name: "Home", to: "/" },
          { name: "Monterey Bay", to: "/city/monterey-bay" },
          { name: "Managed IT" },
        ]}
      />
    </Layout>
  );
}