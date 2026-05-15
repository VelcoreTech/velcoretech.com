import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BottomBreadcrumbs } from "@/components/common/BottomBreadcrumbs";

import {
  ArrowRight,
  MapPin,
  Lock,
  Shield,
  ClipboardCheck,
  Radar,
  Users,
  Network,
  Globe,
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/common/SectionHeader";
import { getTrackingParams } from "@/components/common/Tracking";

const SCHEDULER_URL = "https://cal.com/velcoreit";
const OG_IMAGE = "https://velcoretech.com/og-image.png";

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

export default function SantaCruzCybersecurity() {
  const canonical = "https://velcoretech.com/city/santa-cruz/cybersecurity";

  const jsonLdService = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Velcore Tech - Cybersecurity Santa Cruz",
    url: canonical,
    telephone: "+18313347943",
    areaServed: { "@type": "City", name: "Santa Cruz" },
    serviceType: "Cybersecurity Services",
  };

  const jsonLdBreadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://velcoretech.com/" },
      { "@type": "ListItem", position: 2, name: "Santa Cruz", item: "https://velcoretech.com/city/santa-cruz" },
      { "@type": "ListItem", position: 3, name: "Cybersecurity", item: canonical },
    ],
  };

  return (
    <Layout>
      <Helmet>
        <title>Cybersecurity Services Santa Cruz | Velcore Tech</title>
        <meta
          name="description"
          content="Cybersecurity services in Santa Cruz. Velcore Tech strengthens identity controls, reduces attack paths, improves monitoring strategy, and builds incident readiness for real-world threats."
        />
        <link rel="canonical" href={canonical} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Velcore Tech" />
        <meta property="og:title" content="Cybersecurity Services Santa Cruz | Velcore Tech" />
        <meta
          property="og:description"
          content="Identity-first cybersecurity, hardening, and incident readiness for Santa Cruz organizations."
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
              { name: "Cybersecurity" },
            ]}
          />

          <SectionHeader
            badge="Santa Cruz Cybersecurity"
            title="Cybersecurity That's Built Into How IT Operates"
            description="We reduce real-world cyber risk for Santa Cruz organizations with identity-first controls, hardening, monitoring strategy, and incident readiness—measured and maintained over time."
          />

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="outline-glow" size="xl" asChild>
              <Link to={`/assessment${getTrackingParams('santa-cruz-cybersecurity', 'hero', 'assessment')}`}>
                Start Assessment <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline-glow" size="xl" asChild>
              <a 
                href={`${SCHEDULER_URL}${getTrackingParams('santa-cruz-cybersecurity', 'hero', 'schedule_consultation')}`} 
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

      {/* What this covers section */}
      <section className="section-padding bg-card">
        <div className="container-tight">
          <h2 className="text-3xl font-bold mb-6">
            A Practical Cybersecurity Program — Not Fear, Not Theater
          </h2>

          <p className="text-muted-foreground leading-relaxed mb-6">
            Most security failures come from weak identity controls, unmanaged
            endpoints, poor visibility, and untested recovery. We focus on
            controls that measurably reduce risk — and hold up to customer
            questionnaires, cyber insurance scrutiny, and real-world attacks.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mt-10">
            {[
              {
                icon: Users,
                title: "Identity & Access Management",
                bullets: [
                  "MFA enforcement and admin protections",
                  "Conditional Access policies",
                  "Privileged access review practices",
                  "Secure onboarding/offboarding flows",
                ],
              },
              {
                icon: Lock,
                title: "Endpoint Defense & Standards",
                bullets: [
                  "EDR posture review and hardening",
                  "Patch governance and baseline enforcement",
                  "Device encryption and secure configuration",
                  "Security monitoring alignment",
                ],
              },
              {
                icon: Network,
                title: "Network & Firewall Hardening",
                bullets: [
                  "Segmentation and secure remote access",
                  "Firewall policy review and hygiene",
                  "Multi-site security considerations",
                  "VPN/ZTNA posture improvements",
                ],
              },
              {
                icon: Globe,
                title: "Edge Security (DNS / Cloudflare)",
                bullets: [
                  "DNS governance and change control",
                  "WAF + DDoS protection configuration",
                  "TLS/SSL and origin protection patterns",
                  "Web exposure review for common gaps",
                ],
              },
            ].map((item) => (
              <div
                key={item.title}
                className="p-6 rounded-2xl bg-background border border-border"
              >
                <div className="inline-flex p-3 rounded-xl bg-primary/10 text-primary mb-4">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold mb-3">{item.title}</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {item.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2">
                      <Shield className="h-4 w-4 text-primary mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Related Services Section */}
      <section className="pb-20 bg-background">
        <div className="container-tight">
          <div className="rounded-3xl border border-border bg-card p-8">
            <h2 className="text-2xl font-bold mb-3">Related Services</h2>
            <p className="text-muted-foreground mb-6">
              Cybersecurity outcomes improve when identity, patching, recovery, and edge controls work as one operating model.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link
                to={`/services#governance-compliance${getTrackingParams('santa-cruz-cybersecurity', 'related', 'governance_compliance')}`}
                className="rounded-2xl border border-border bg-background/60 p-4 hover:bg-background transition-colors"
              >
                <div className="font-semibold">Governance & Compliance</div>
                <div className="text-sm text-muted-foreground">Policies, evidence readiness, control baselines.</div>
              </Link>

              <Link
                to={`/services#identity-access${getTrackingParams('santa-cruz-cybersecurity', 'related', 'identity_access')}`}
                className="rounded-2xl border border-border bg-background/60 p-4 hover:bg-background transition-colors"
              >
                <div className="font-semibold">Identity & Access</div>
                <div className="text-sm text-muted-foreground">MFA, Conditional Access, admin governance.</div>
              </Link>

              <Link
                to={`/services#backup-recovery${getTrackingParams('santa-cruz-cybersecurity', 'related', 'backup_recovery')}`}
                className="rounded-2xl border border-border bg-background/60 p-4 hover:bg-background transition-colors"
              >
                <div className="font-semibold">Backup & Recovery</div>
                <div className="text-sm text-muted-foreground">Restore readiness, ransomware recovery posture.</div>
              </Link>

              <Link
                to={`/services#edge-security${getTrackingParams('santa-cruz-cybersecurity', 'related', 'edge_security')}`}
                className="rounded-2xl border border-border bg-background/60 p-4 hover:bg-background transition-colors"
              >
                <div className="font-semibold">Edge Security</div>
                <div className="text-sm text-muted-foreground">DNS hardening, WAF, DDoS protections.</div>
              </Link>

              <Link
                to={`/city/santa-cruz/Managed-IT${getTrackingParams('santa-cruz-cybersecurity', 'related', 'managed_it')}`}
                className="rounded-2xl border border-border bg-background/60 p-4 hover:bg-background transition-colors"
              >
                <div className="font-semibold">Managed IT</div>
                <div className="text-sm text-muted-foreground">Monitoring, patch governance, endpoint standards.</div>
              </Link>

              <Link
                to={`/city/santa-cruz${getTrackingParams('santa-cruz-cybersecurity', 'related', 'santa_cruz_hub')}`}
                className="rounded-2xl border border-border bg-background/60 p-4 hover:bg-background transition-colors"
              >
                <div className="font-semibold">Santa Cruz Hub</div>
                <div className="text-sm text-muted-foreground">All Santa Cruz service pages and local overview.</div>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Continue Exploring Section */}
      <section className="pb-20 bg-background">
        <div className="container-tight">
          <div className="rounded-3xl border border-border bg-card p-8">
            <h2 className="mt-2 text-2xl font-bold">
              Continue exploring Santa Cruz security & IT
            </h2>

            <p className="mt-2 text-muted-foreground">
              Explore adjacent services that strengthen your posture and reduce operational risk.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button variant="outline-glow" asChild>
                <Link to={`/services${getTrackingParams('santa-cruz-cybersecurity', 'explore', 'all_services')}`}>
                  All Services
                </Link>
              </Button>

              <Button variant="outline-glow" asChild>
                <Link to={`/services#governance-compliance${getTrackingParams('santa-cruz-cybersecurity', 'explore', 'governance_compliance')}`}>
                  Governance & Compliance
                </Link>
              </Button>

              <Button variant="outline-glow" asChild>
                <Link to={`/city/santa-cruz/Managed-IT${getTrackingParams('santa-cruz-cybersecurity', 'explore', 'managed_it')}`}>
                  Santa Cruz Managed IT
                </Link>
              </Button>

              <Button variant="outline-glow" asChild>
                <Link to={`/city/santa-cruz/edge-security${getTrackingParams('santa-cruz-cybersecurity', 'explore', 'edge_security')}`}>
                  Santa Cruz Edge Security
                </Link>
              </Button>

              <Button variant="outline" asChild>
                <Link to={`/city/santa-cruz/cloud-migration${getTrackingParams('santa-cruz-cybersecurity', 'explore', 'cloud_migration')}`}>
                  Santa Cruz Cloud Migration
                </Link>
              </Button>

              <Button variant="outline-glow" asChild>
                <Link to={`/city/santa-cruz${getTrackingParams('santa-cruz-cybersecurity', 'explore', 'city_hub')}`}>
                  Santa Cruz City Hub
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-background">
        <div className="container-tight">
          <div className="p-10 rounded-3xl bg-card border border-border text-center">
            <div className="inline-flex p-4 rounded-2xl bg-primary/10 text-primary mb-5">
              <ClipboardCheck className="h-10 w-10" />
            </div>
            <h2 className="text-3xl font-bold mb-4">
              Want a Clear Security Baseline?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Start with an IT & Security Assessment. We'll identify the highest
              priority risk areas, then provide a practical plan you can execute.
            </p>
            <Button variant="outline-glow" size="xl" asChild>
              <Link to={`/assessment${getTrackingParams('santa-cruz-cybersecurity', 'final_cta', 'assessment')}`}>
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
          { name: "Santa Cruz", to: "/city/santa-cruz" },
          { name: "Cybersecurity" },
        ]}
      />
    </Layout>
  );
}