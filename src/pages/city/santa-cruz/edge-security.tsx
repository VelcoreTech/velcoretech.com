import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BottomBreadcrumbs } from "@/components/common/BottomBreadcrumbs";

import { ArrowRight, MapPin, Globe, Shield, Lock, ClipboardCheck, Radar } from "lucide-react";

import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/common/SectionHeader";
import { getTrackingParams } from "@/components/common/Tracking";

const SCHEDULER_URL = "https://cal.com/velcoreit";
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

export default function SantaCruzEdgeSecurity() {
  const canonical = "https://velcoretech.com/city/santa-cruz/edge-security";

  const jsonLdService = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Velcore Tech - Edge Security Santa Cruz",
    url: canonical,
    telephone: "+18313347943",
    areaServed: { "@type": "City", name: "Santa Cruz" },
    serviceType: "Edge Security (DNS/WAF/DDoS)",
  };

  const jsonLdBreadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://velcoretech.com/" },
      { "@type": "ListItem", position: 2, name: "Santa Cruz", item: "https://velcoretech.com/city/santa-cruz" },
      { "@type": "ListItem", position: 3, name: "Edge Security", item: canonical },
    ],
  };

  return (
    <Layout>
      <Helmet>
        <title>Edge Security Santa Cruz | DNS / WAF / DDoS | Velcore Tech</title>
        <meta
          name="description"
          content="Edge security services in Santa Cruz. Velcore Tech hardens DNS, implements WAF/DDoS protections, improves TLS posture, and reduces public exposure with Cloudflare-focused governance."
        />
        <link rel="canonical" href={canonical} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Velcore Tech" />
        <meta property="og:title" content="Edge Security Santa Cruz | Velcore Tech" />
        <meta
          property="og:description"
          content="DNS hardening, WAF/DDoS protections, TLS hygiene, and exposure reduction for Santa Cruz organizations."
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

      {/* HERO SECTION */}
      <section className="section-padding bg-background relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[420px] bg-hero-glow pointer-events-none" />
        <div className="container-tight relative z-10 text-center">
          <Breadcrumbs
            items={[
              { name: "Home", to: "/" },
              { name: "Santa Cruz", to: "/city/santa-cruz" },
              { name: "Edge Security" },
            ]}
          />

          <SectionHeader
            badge="Santa Cruz Edge Security"
            title="Reduce Public Exposure With Strong Edge Controls"
            description="We secure Santa Cruz organizations' internet-facing surface area with DNS governance, WAF/DDoS protections, TLS hygiene, and change control—so misconfig risk drops and resilience improves."
          />

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="outline-glow" size="xl" asChild>
              <Link to={`/assessment${getTrackingParams('santa-cruz-edge-security', 'hero', 'assessment')}`}>
                Start Assessment <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline-glow" size="xl" asChild>
              <a 
                href={`${SCHEDULER_URL}${getTrackingParams('santa-cruz-edge-security', 'hero', 'schedule_consultation')}`} 
                target="_blank" 
                rel="noreferrer"
              >
                Schedule a Consultation <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>

          <div className="mt-8 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 text-primary" />
              Santa Cruz delivery • On-site + remote
            </div>
          </div>
        </div>
      </section>

      {/* WHAT WE DELIVER SECTION */}
      <section className="section-padding bg-card">
        <div className="container-tight">
          <h2 className="text-3xl font-bold mb-4">What Edge Security Includes</h2>
          <p className="text-muted-foreground mb-10 leading-relaxed">
            Edge misconfiguration is a common cause of real incidents. We establish clean DNS governance and
            enforce patterns that reduce risk across domains, apps, and remote users.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: Globe,
                title: "DNS Governance + Protection",
                text: "Domain lock-down patterns, safer change workflows, and reduced risk of hijack or accidental exposure.",
              },
              {
                icon: Radar,
                title: "WAF Baseline + Tuning",
                text: "Practical WAF defaults and tuning based on what you actually run—no random rule sprawl.",
              },
              {
                icon: Shield,
                title: "DDoS + Origin Protection",
                text: "Baseline protections and origin exposure reduction patterns so your real infrastructure stays protected.",
              },
              {
                icon: Lock,
                title: "TLS / SSL Hygiene",
                text: "Certificate posture, modern TLS configuration, and sanity checks that prevent avoidable outages.",
              },
            ].map((item) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35 }}
                className="p-6 rounded-2xl bg-background border border-border"
              >
                <div className="inline-flex p-3 rounded-xl bg-primary/10 text-primary mb-4">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="section-padding bg-background">
        <div className="container-tight">
          <div className="p-10 rounded-3xl bg-card border border-border text-center">
            <div className="inline-flex p-4 rounded-2xl bg-primary/10 text-primary mb-5">
              <ClipboardCheck className="h-10 w-10" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Get a Baseline and a Prioritized Plan</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Start with an IT &amp; Security Assessment. We'll identify the highest-impact improvements for stability and exposure reduction.
            </p>
            <Button variant="outline-glow" size="xl" asChild>
              <Link to={`/assessment${getTrackingParams('santa-cruz-edge-security', 'final_cta', 'assessment')}`}>
                Start the Assessment <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* RELATED LINKS SECTION */}
      <section className="pb-20 bg-background">
        <div className="container-tight">
          <div className="rounded-3xl border border-border bg-card p-8">
            <h2 className="text-2xl font-bold mb-3">Related Pages</h2>
            <p className="text-muted-foreground mb-6">
              Edge security is strongest when identity controls, cloud governance, and incident readiness work together.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link 
                to={`/services#edge-security${getTrackingParams('santa-cruz-edge-security', 'related', 'edge_security_overview')}`} 
                className="rounded-2xl border border-border bg-background/60 p-4 hover:bg-background transition-colors"
              >
                <div className="font-semibold">Edge Security Overview</div>
                <div className="text-sm text-muted-foreground">Global service overview and operating model.</div>
              </Link>

              <Link 
                to={`/city/santa-cruz/cybersecurity${getTrackingParams('santa-cruz-edge-security', 'related', 'santa_cruz_cybersecurity')}`} 
                className="rounded-2xl border border-border bg-background/60 p-4 hover:bg-background transition-colors"
              >
                <div className="font-semibold">Santa Cruz Cybersecurity</div>
                <div className="text-sm text-muted-foreground">Hardening and readiness for local teams.</div>
              </Link>

              <Link 
                to={`/city/santa-cruz/cloud-migration${getTrackingParams('santa-cruz-edge-security', 'related', 'santa_cruz_cloud_migration')}`} 
                className="rounded-2xl border border-border bg-background/60 p-4 hover:bg-background transition-colors"
              >
                <div className="font-semibold">Santa Cruz Cloud Migration</div>
                <div className="text-sm text-muted-foreground">M365 transitions with governance and cutover.</div>
              </Link>

              <Link 
                to={`/city/santa-cruz/Managed-IT${getTrackingParams('santa-cruz-edge-security', 'related', 'santa_cruz_managed_it')}`} 
                className="rounded-2xl border border-border bg-background/60 p-4 hover:bg-background transition-colors"
              >
                <div className="font-semibold">Santa Cruz Managed IT</div>
                <div className="text-sm text-muted-foreground">Local scope and delivery model.</div>
              </Link>

              <Link 
                to={`/city/santa-cruz${getTrackingParams('santa-cruz-edge-security', 'related', 'santa_cruz_overview')}`} 
                className="rounded-2xl border border-border bg-background/60 p-4 hover:bg-background transition-colors"
              >
                <div className="font-semibold">Santa Cruz Overview</div>
                <div className="text-sm text-muted-foreground">Hub and local services.</div>
              </Link>

              <Link 
                to={`/services${getTrackingParams('santa-cruz-edge-security', 'related', 'all_services')}`} 
                className="rounded-2xl border border-border bg-background/60 p-4 hover:bg-background transition-colors"
              >
                <div className="font-semibold">All Services</div>
                <div className="text-sm text-muted-foreground">Full catalog and operating model.</div>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <BottomBreadcrumbs
        items={[
          { name: "Home", to: "/" },
          { name: "Santa Cruz", to: "/city/santa-cruz" },
          { name: "Edge Security" },
        ]}
      />
    </Layout>
  );
}