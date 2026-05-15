import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { BottomBreadcrumbs } from "@/components/common/BottomBreadcrumbs";
import { ArrowRight, Shield, Lock, Radar, ClipboardCheck, MapPin, UserCheck, Server } from "lucide-react";

const OG_IMAGE = "https://velcoretech.com/og-image.png";

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
        <li>
          <Link to="/city/bay-area" className="hover:text-foreground hover:underline">
            Bay Area
          </Link>
        </li>
        <li className="opacity-60">/</li>
        <li className="text-foreground font-medium">Cybersecurity</li>
      </ol>
    </nav>
  );
}

export default function BayAreaCybersecurity() {
  const canonical = "https://velcoretech.com/city/bay-area/cybersecurity";
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

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: "Velcore Tech - Cybersecurity Bay Area",
      url: canonical,
      telephone: "+18313347943",
      areaServed: areas.map((c) => `${c}, CA`),
      serviceType: [
        "Cybersecurity Services",
        "Identity & Access Management",
        "Microsoft 365 Security",
        "Endpoint Hardening",
        "Incident Readiness",
        "Security Monitoring Strategy",
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://velcoretech.com/" },
        { "@type": "ListItem", position: 2, name: "Bay Area", item: "https://velcoretech.com/city/bay-area" },
        { "@type": "ListItem", position: 3, name: "Cybersecurity", item: canonical },
      ],
    },
  ];

  return (
    <Layout>
      <Helmet>
        <title>Cybersecurity Services Bay Area | Velcore Tech</title>
        <meta
          name="description"
          content="Cybersecurity services across the Bay Area. Identity-first controls, Microsoft 365 hardening, endpoint baselines, incident readiness, and edge protection—built for measurable risk reduction."
        />
        <link rel="canonical" href={canonical} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Velcore Tech" />
        <meta property="og:title" content="Cybersecurity Services Bay Area | Velcore Tech" />
        <meta
          property="og:description"
          content="Cybersecurity for Bay Area organizations—identity-first controls, M365 hardening, endpoint baselines, and incident readiness."
        />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Velcore Tech - Cybersecurity Services Bay Area" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={OG_IMAGE} />

        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* Hero */}
      <section className="section-padding bg-background">
        <div className="container-tight text-center">
          <Breadcrumbs />

          <div className="inline-flex items-center gap-2 text-sm text-muted-foreground mb-4 justify-center">
            <MapPin className="h-4 w-4 text-primary" />
            Bay Area (SF • Peninsula • South Bay • East Bay)
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6">Cybersecurity Services Across the Bay Area</h1>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
            We reduce risk with controls that actually hold up: identity-first access governance, Microsoft 365 hardening,
            endpoint baselines, incident readiness, and edge protection.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="gradient" size="xl" asChild>
              <Link to="/assessment">
                Start Assessment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>

            <Button variant="outline" size="xl" asChild>
              <Link to="/services#security-monitoring">
                View Security Services
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* What we deliver */}
      <section className="section-padding bg-card">
        <div className="container-tight">
          <h2 className="text-3xl font-bold mb-6">What We Secure</h2>
          <p className="text-muted-foreground leading-relaxed mb-10">
            We focus on the highest-leverage controls: identity, endpoints, email, and the public edge—then make them measurable.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: UserCheck, title: "Identity Controls", desc: "MFA, Conditional Access, admin role governance, access reviews." },
              { icon: Server, title: "Endpoint Baselines", desc: "Patch governance, hardening, lifecycle standards, EDR alignment." },
              { icon: Lock, title: "Microsoft 365 Security", desc: "Tenant baseline, email security, sharing controls, audit readiness." },
              { icon: Radar, title: "Edge Exposure Reduction", desc: "DNS/WAF/DDoS patterns, TLS hygiene, origin protection guidance." },
            ].map((x) => (
              <motion.div
                key={x.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35 }}
                className="rounded-2xl border border-border bg-background p-6"
              >
                <div className="inline-flex p-3 rounded-xl bg-primary/10 text-primary mb-4">
                  <x.icon className="h-6 w-6" />
                </div>
                <div className="font-semibold">{x.title}</div>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{x.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="pb-20 bg-background">
        <div className="container-tight">
          <div className="rounded-3xl border border-border bg-card p-8">
            <h2 className="text-2xl font-bold mb-3">Related Services</h2>
            <p className="text-muted-foreground mb-6">Cybersecurity is strongest when identity, recovery, and edge controls reinforce each other.</p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link to="/services#identity-access" className="rounded-2xl border border-border bg-background/60 p-4 hover:bg-background transition-colors">
                <div className="font-semibold">Identity &amp; Access</div>
                <div className="text-sm text-muted-foreground">MFA, Conditional Access, admin governance.</div>
              </Link>
              <Link to="/services#m365-cloud" className="rounded-2xl border border-border bg-background/60 p-4 hover:bg-background transition-colors">
                <div className="font-semibold">Microsoft 365 Security</div>
                <div className="text-sm text-muted-foreground">Tenant baselines, email security, sharing controls.</div>
              </Link>
              <Link to="/city/bay-area/edge-security" className="rounded-2xl border border-border bg-background/60 p-4 hover:bg-background transition-colors">
                <div className="font-semibold">Bay Area Edge Security</div>
                <div className="text-sm text-muted-foreground">DNS/WAF/DDoS governance and exposure reduction.</div>
              </Link>
              <Link to="/services#backup-recovery" className="rounded-2xl border border-border bg-background/60 p-4 hover:bg-background transition-colors">
                <div className="font-semibold">Backup &amp; Recovery</div>
                <div className="text-sm text-muted-foreground">Restore readiness and ransomware recovery posture.</div>
              </Link>
              <Link to="/city/bay-area/Managed-IT" className="rounded-2xl border border-border bg-background/60 p-4 hover:bg-background transition-colors">
                <div className="font-semibold">Bay Area Managed IT</div>
                <div className="text-sm text-muted-foreground">Operations standards + accountable delivery model.</div>
              </Link>
              <Link to="/city/bay-area" className="rounded-2xl border border-border bg-background/60 p-4 hover:bg-background transition-colors">
                <div className="font-semibold">Bay Area Overview</div>
                <div className="text-sm text-muted-foreground">All Bay Area service pages and overview.</div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-card">
        <div className="container-tight">
          <div className="p-10 rounded-3xl bg-background border border-border text-center">
            <div className="inline-flex p-4 rounded-2xl bg-primary/10 text-primary mb-5">
              <ClipboardCheck className="h-10 w-10" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Get a Baseline and a Prioritized Plan</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Start with an IT &amp; Security Assessment. We’ll identify the highest-impact improvements for stability and risk reduction.
            </p>
            <Button variant="gradient" size="xl" asChild>
              <Link to="/assessment">
                Start the Assessment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      <BottomBreadcrumbs
  items={[
    { name: "Home", to: "/" },
    { name: "Bay Area", to: "/city/bay-area" },
    { name: "Cybersecurity" },
  ]}
/>
      
    </Layout>
  );
}