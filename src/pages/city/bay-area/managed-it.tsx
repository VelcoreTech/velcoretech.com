import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Shield, ClipboardCheck, ArrowRight, MapPin, Network, Lock, Users, Globe, Building2 } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { BottomBreadcrumbs } from "@/components/common/BottomBreadcrumbs";

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
        <li className="text-foreground font-medium">Managed IT</li>
      </ol>
    </nav>
  );
}

export default function BayAreaManagedIT() {
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

  const canonical = "https://velcoretech.com/city/bay-area/Managed-IT";

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: "Velcore Tech - Managed IT Services Bay Area",
      url: canonical,
      telephone: "+18313347943",
      areaServed: areas.map((c) => `${c}, CA`),
      serviceType: ["Managed IT Services", "IT Operations", "Microsoft 365 Governance", "Network & Firewall", "Backup & Recovery"],
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://velcoretech.com/" },
        { "@type": "ListItem", position: 2, name: "Bay Area", item: "https://velcoretech.com/city/bay-area" },
        { "@type": "ListItem", position: 3, name: "Managed IT", item: canonical },
      ],
    },
  ];

  return (
    <Layout>
      <Helmet>
        <title>Managed IT Services Bay Area | Velcore Tech</title>
        <meta
          name="description"
          content="Managed IT services across the Bay Area. Security-first IT operations, Microsoft 365 governance, network hardening, and recovery readiness—built for reliability and measurable outcomes."
        />
        <link rel="canonical" href={canonical} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Velcore Tech" />
        <meta property="og:title" content="Managed IT Services Bay Area | Velcore Tech" />
        <meta
          property="og:description"
          content="Security-first managed IT services across the Bay Area—predictable operations, governance, and accountable delivery."
        />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Velcore Tech - Managed IT Services Bay Area" />

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

          <h1 className="text-4xl md:text-5xl font-bold mb-6">Managed IT Services Across the Bay Area</h1>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
            Velcore Tech provides security-first managed IT, cybersecurity, and cloud operations for growing organizations
            across the Bay Area — designed for reliability, governance, and measurable outcomes.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="gradient" size="xl" asChild>
              <Link to="/assessment">
                Start Assessment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>

            <Button variant="outline" size="xl" asChild>
              <Link to="/services#Managed-IT">
                View Managed IT Overview
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Areas served */}
      <section className="section-padding bg-card">
        <div className="container-tight">
          <h2 className="text-3xl font-bold mb-4">Where We Serve</h2>
          <p className="text-muted-foreground leading-relaxed mb-8">
            We support Bay Area teams with on-site and remote capability. Engagements commonly include identity &amp; access controls,
            Microsoft 365 governance, endpoint standards, secure networking, and edge security.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {areas.map((a) => (
              <div key={a} className="px-4 py-3 rounded-xl bg-background border border-border text-sm text-muted-foreground">
                {a}
              </div>
            ))}
          </div>

          <p className="text-xs text-muted-foreground mt-6">Not listed? If you’re in Northern California, we can likely support you.</p>
        </div>
      </section>

      {/* What we deliver */}
      <section className="section-padding bg-background">
        <div className="container-tight">
          <h2 className="text-3xl font-bold mb-6">What “Security-First Managed IT” Means</h2>

          <p className="text-muted-foreground leading-relaxed mb-10">
            This isn’t just ticketing. We operate your environment with clear standards, defined ownership, and controls that reduce downtime and cyber risk.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              { icon: Users, title: "Identity & Access Management", text: "MFA, Conditional Access, admin protections, access reviews, and onboarding/offboarding discipline." },
              { icon: Lock, title: "Governance & Compliance", text: "Security baselines, policies, audit-ready documentation, and practical alignment to requirements when needed." },
              { icon: Building2, title: "Microsoft 365 & Cloud Operations", text: "Tenant hardening, mailbox and data protection, secure collaboration, logging, and operational reliability." },
              { icon: Network, title: "Network & Firewall", text: "Segmentation, secure remote access, firewall policy hygiene, and multi-site stability improvements." },
              { icon: Shield, title: "Backup & Recovery", text: "Coverage validation, restore testing, ransomware resilience patterns, and clear recovery playbooks." },
              { icon: Globe, title: "Edge Security (DNS / Cloudflare)", text: "DNS governance, WAF/DDoS protection, TLS/SSL best practices, and exposure reduction for public-facing assets." },
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
              Start with an IT &amp; Security Assessment. We’ll identify the highest impact improvements for stability and risk reduction.
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

      {/* Related Services */}
      <section className="pb-20 bg-background">
        <div className="container-tight">
          <div className="rounded-3xl border border-border bg-card p-8">
            <h2 className="text-2xl font-bold mb-3">Related Services</h2>
            <p className="text-muted-foreground mb-6">
              Strong managed IT in the Bay Area depends on identity controls, recovery readiness, and edge protection working together.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link to="/services#Managed-IT" className="rounded-2xl border border-border bg-background/60 p-4 hover:bg-background transition-colors">
                <div className="font-semibold">Managed IT Operations</div>
                <div className="text-sm text-muted-foreground">Core operating model, standards, and delivery.</div>
              </Link>

              <Link to="/city/bay-area/cybersecurity" className="rounded-2xl border border-border bg-background/60 p-4 hover:bg-background transition-colors">
                <div className="font-semibold">Bay Area Cybersecurity</div>
                <div className="text-sm text-muted-foreground">Hardening, controls, and readiness programs.</div>
              </Link>

              <Link to="/city/bay-area/edge-security" className="rounded-2xl border border-border bg-background/60 p-4 hover:bg-background transition-colors">
                <div className="font-semibold">Bay Area Edge Security</div>
                <div className="text-sm text-muted-foreground">DNS hardening, WAF, DDoS protections.</div>
              </Link>

              <Link to="/city/bay-area/cloud-migration" className="rounded-2xl border border-border bg-background/60 p-4 hover:bg-background transition-colors">
                <div className="font-semibold">Bay Area Cloud Migration</div>
                <div className="text-sm text-muted-foreground">Cutover planning, tenant governance, stability.</div>
              </Link>

              <Link to="/services#backup-recovery" className="rounded-2xl border border-border bg-background/60 p-4 hover:bg-background transition-colors">
                <div className="font-semibold">Backup &amp; Recovery</div>
                <div className="text-sm text-muted-foreground">Restore readiness, ransomware recovery posture.</div>
              </Link>

              <Link to="/city/bay-area" className="rounded-2xl border border-border bg-background/60 p-4 hover:bg-background transition-colors">
                <div className="font-semibold">Bay Area Overview</div>
                <div className="text-sm text-muted-foreground">All Bay Area service pages and overview.</div>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
            <BottomBreadcrumbs
        items={[
          { name: "Home", to: "/" },
          { name: "Bay Area", to: "/city/bay-area" },
          { name: "Managed IT" },
        ]}
      />
      
    </Layout>
  );
}