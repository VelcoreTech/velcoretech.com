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
} from "lucide-react";

import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/common/SectionHeader";
import { getTrackingParams } from "@/components/common/Tracking";

const OG_IMAGE = "https://velcoretech.com/og-image.jpg";

function Breadcrumbs({ items }: { items: { name: string; to?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
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

export default function SantaCruzManagedIT() {
  const canonical = "https://velcoretech.com/city/santa-cruz/Managed-IT";

  const areas = [
    "Santa Cruz",
    "Capitola",
    "Scotts Valley",
    "Soquel",
    "Aptos",
    "Live Oak",
    "Watsonville",
    "Felton",
    "Ben Lomond",
    "Boulder Creek",
  ];

  const jsonLdService = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Velcore Tech - Managed IT Santa Cruz",
    url: canonical,
    telephone: "+18313347943",
    areaServed: { "@type": "City", name: "Santa Cruz" },
    serviceType: "Managed IT Services",
  };

  const jsonLdBreadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://velcoretech.com/" },
      { "@type": "ListItem", position: 2, name: "Santa Cruz", item: "https://velcoretech.com/city/santa-cruz" },
      { "@type": "ListItem", position: 3, name: "Managed IT", item: canonical },
    ],
  };

  return (
    <Layout>
      <Helmet>
        <title>Managed IT Services Santa Cruz | Velcore Tech</title>
        <meta
          name="description"
          content="Managed IT services in Santa Cruz. Velcore Tech delivers security-first IT operations, Microsoft 365 governance, identity hardening, network security, and reliable support for growing organizations."
        />
        <link rel="canonical" href={canonical} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Velcore Tech" />
        <meta property="og:title" content="Managed IT Services Santa Cruz | Velcore Tech" />
        <meta
          property="og:description"
          content="Security-first managed IT in Santa Cruz: predictable operations, governance, and reliable support."
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

      {/* Hero Section */}
      <section className="section-padding bg-background">
        <div className="container-tight text-center">
          <Breadcrumbs
            items={[
              { name: "Home", to: "/" },
              { name: "Santa Cruz", to: "/city/santa-cruz" },
              { name: "Managed IT" },
            ]}
          />

          <div className="inline-flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <MapPin className="h-4 w-4 text-primary" />
            Santa Cruz County (on-site + remote)
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Managed IT Services in Santa Cruz
          </h1>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
            Velcore Tech provides security-first managed IT for Santa Cruz organizations — designed for reliability, governance,
            and measurable outcomes (not chaos and reactive support).
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="outlline-glow" size="xl" asChild>
              <Link to={`/assessment${getTrackingParams('santa-cruz-Managed-IT', 'hero', 'assessment')}`}>
                Start Assessment <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>

            <Button variant="outline-glow" size="xl" asChild>
              <Link to={`/services#Managed-IT${getTrackingParams('santa-cruz-Managed-IT', 'hero', 'view_managed_it')}`}>
                View Managed IT Overview <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Areas served section */}
      <section className="section-padding bg-card">
        <div className="container-tight">
          <h2 className="text-3xl font-bold mb-4">Where We Serve</h2>
          <p className="text-muted-foreground leading-relaxed mb-8">
            We support Santa Cruz teams with on-site and remote capability. Engagements commonly include identity &amp; access controls,
            Microsoft 365 governance, endpoint standards, secure networking, and edge security.
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
            Not listed? If you're in Santa Cruz County, we can likely support you.
          </p>
        </div>
      </section>

      {/* What we deliver section */}
      <section className="section-padding bg-background">
        <div className="container-tight">
          <h2 className="text-3xl font-bold mb-6">What "Security-First Managed IT" Means</h2>

          <p className="text-muted-foreground leading-relaxed mb-10">
            This isn't just ticketing. We operate your environment with clear standards, defined ownership, and controls that reduce
            downtime and cyber risk.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
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
                icon: Building2,
                title: "Microsoft 365 & Cloud Operations",
                text: "Tenant hardening, mailbox + data protection, secure collaboration, and operational reliability.",
              },
              {
                icon: Network,
                title: "Network & Firewall",
                text: "Segmentation, secure remote access, firewall rule hygiene, and stability improvements.",
              },
              {
                icon: Shield,
                title: "Backup & Recovery",
                text: "Coverage validation, restore testing, ransomware resilience patterns, and recovery playbooks.",
              },
              {
                icon: Globe,
                title: "Edge Security (DNS / Cloudflare)",
                text: "DNS governance, WAF/DDoS protection, TLS hygiene, and exposure reduction for public assets.",
              },
            ].map((item) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35 }}
                className="p-6 rounded-2xl bg-card border border-border"
              >
                <div className="inline-flex p-3 rounded-xl bg-primary/10 text-primary mb-4">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button variant="outline-glow" size="xl" asChild>
              <Link to={`/city/bay-area${getTrackingParams('santa-cruz-Managed-IT', 'bay_area_link', 'bay_area')}`}>
                Also serving the Bay Area <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Related Services section */}
      <section className="pb-20 bg-background">
        <div className="container-tight">
          <div className="rounded-3xl border border-border bg-card p-8">
            <h2 className="text-2xl font-bold mb-3">Related Services</h2>
            <p className="text-muted-foreground mb-6">
              Strong managed IT in Santa Cruz depends on identity controls, recovery readiness, and edge protection working together.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link
                to={`/services#Managed-IT${getTrackingParams('santa-cruz-Managed-IT', 'related', 'managed_it_overview')}`}
                className="rounded-2xl border border-border bg-background/60 p-4 hover:bg-background transition-colors"
              >
                <div className="font-semibold">Managed IT Overview</div>
                <div className="text-sm text-muted-foreground">Core operating model, standards, and delivery.</div>
              </Link>

              <Link
                to={`/services#identity-access${getTrackingParams('santa-cruz-Managed-IT', 'related', 'identity_access')}`}
                className="rounded-2xl border border-border bg-background/60 p-4 hover:bg-background transition-colors"
              >
                <div className="font-semibold">Identity &amp; Access</div>
                <div className="text-sm text-muted-foreground">MFA, Conditional Access, admin governance.</div>
              </Link>

              <Link
                to={`/services#backup-recovery${getTrackingParams('santa-cruz-Managed-IT', 'related', 'backup_recovery')}`}
                className="rounded-2xl border border-border bg-background/60 p-4 hover:bg-background transition-colors"
              >
                <div className="font-semibold">Backup &amp; Recovery</div>
                <div className="text-sm text-muted-foreground">Restore readiness, ransomware recovery posture.</div>
              </Link>

              <Link
                to={`/city/santa-cruz/cybersecurity${getTrackingParams('santa-cruz-Managed-IT', 'related', 'santa_cruz_cybersecurity')}`}
                className="rounded-2xl border border-border bg-background/60 p-4 hover:bg-background transition-colors"
              >
                <div className="font-semibold">Santa Cruz Cybersecurity</div>
                <div className="text-sm text-muted-foreground">Local hardening and readiness improvements.</div>
              </Link>

              <Link
                to={`/city/santa-cruz/edge-security${getTrackingParams('santa-cruz-Managed-IT', 'related', 'santa_cruz_edge_security')}`}
                className="rounded-2xl border border-border bg-background/60 p-4 hover:bg-background transition-colors"
              >
                <div className="font-semibold">Santa Cruz Edge Security</div>
                <div className="text-sm text-muted-foreground">DNS hardening, WAF, DDoS protections.</div>
              </Link>

              <Link
                to={`/city/santa-cruz${getTrackingParams('santa-cruz-Managed-IT', 'related', 'santa_cruz_overview')}`}
                className="rounded-2xl border border-border bg-background/60 p-4 hover:bg-background transition-colors"
              >
                <div className="font-semibold">Santa Cruz Overview</div>
                <div className="text-sm text-muted-foreground">Santa Cruz hub and all local pages.</div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-card">
        <div className="container-tight">
          <div className="p-10 rounded-3xl bg-background border border-border text-center">
            <div className="inline-flex p-4 rounded-2xl bg-primary/10 text-primary mb-5">
              <ClipboardCheck className="h-10 w-10" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Get a Baseline and a Prioritized Plan</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Start with an IT &amp; Security Assessment. We'll identify the highest impact improvements for stability and risk reduction.
            </p>
            <Button variant="outline-glow" size="xl" asChild>
              <Link to={`/assessment${getTrackingParams('santa-cruz-Managed-IT', 'final_cta', 'assessment')}`}>
                Start the Assessment <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      <BottomBreadcrumbs
        items={[
          { name: "Home", to: "/" },
          { name: "Santa Cruz", to: "/city/santa-cruz" },
          { name: "Managed IT" },
        ]}
      />
    </Layout>
  );
}