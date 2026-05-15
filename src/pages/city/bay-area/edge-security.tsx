import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BottomBreadcrumbs } from "@/components/common/BottomBreadcrumbs";

import {
  ArrowRight,
  MapPin,
  Globe,
  Shield,
  Lock,
  Radar,
  ClipboardCheck,
  CheckCircle2,
  Workflow,
  Server,
  Cloud,
} from "lucide-react";

import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/common/SectionHeader";

const SCHEDULER_URL = "https://cal.com/velcoreit";
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
        <li className="text-foreground font-medium">Edge Security</li>
      </ol>
    </nav>
  );
}

export default function BayAreaEdgeSecurity() {
  const canonical = "https://velcoretech.com/city/bay-area/edge-security";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        name: "Velcore Tech - Edge Security Bay Area",
        url: canonical,
        telephone: "+18313347943",
        areaServed: "Bay Area, CA",
        serviceType: "Edge Security (DNS/WAF/DDoS)",
      },
      {
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
            item: "https://velcoretech.com/city/bay-area",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Edge Security",
            item: canonical,
          },
        ],
      },
    ],
  };

  return (
    <Layout>
      <Helmet>
        <title>Edge Security Bay Area | DNS, WAF & DDoS Protection | Velcore Tech</title>
        <meta
          name="description"
          content="Edge security services across the Bay Area. Velcore Tech hardens DNS, reduces public exposure, and implements WAF/DDoS protections with clean governance and change control."
        />
        <link rel="canonical" href={canonical} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Velcore Tech" />
        <meta
          property="og:title"
          content="Edge Security Bay Area | DNS, WAF & DDoS Protection | Velcore Tech"
        />
        <meta
          property="og:description"
          content="Bay Area edge security: DNS hardening, WAF/DDoS protections, TLS hygiene, and governance to reduce external risk."
        />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:image:alt"
          content="Velcore Tech - Edge Security Bay Area"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={OG_IMAGE} />

        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* Hero */}
      <section className="section-padding bg-background relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[420px] bg-hero-glow pointer-events-none" />

        <div className="container-tight relative z-10">
          <Breadcrumbs />

          <SectionHeader
            badge="Bay Area Edge Security"
            title="Harden the Internet Edge: DNS, WAF, and DDoS Controls"
            description="We help Bay Area organizations reduce external risk by hardening DNS, protecting origins, tuning WAF rules, and applying DDoS protections—backed by governance and change control."
          />

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
          </div>

          <div className="mt-8 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 text-primary" />
              Bay Area delivery • Domain + app perimeter protection
            </div>
          </div>
        </div>
      </section>

      {/* What edge security includes */}
      <section className="section-padding bg-background">
        <div className="container-tight">
          <h2 className="text-3xl font-bold mb-6">
            What “Edge Security” Covers
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-10">
            The edge is where domains, DNS, TLS, and public-facing apps get
            exposed. Most incidents here are misconfiguration-driven. We reduce
            exposure and make changes safe, reviewable, and predictable.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: Globe,
                title: "DNS Hardening & Governance",
                text: "DNS change control, record hygiene, safer admin access, and reduced misconfiguration risk across domains.",
              },
              {
                icon: Radar,
                title: "WAF Baseline + Tuning",
                text: "Baseline protections and tuning for your app patterns—balancing security and availability with fewer false positives.",
              },
              {
                icon: Shield,
                title: "DDoS + Rate Limiting Controls",
                text: "Practical protections to reduce disruption and keep services available under spikes or abuse patterns.",
              },
              {
                icon: Lock,
                title: "TLS/SSL + Origin Protection",
                text: "TLS hygiene, origin shielding patterns, and access restrictions so the true origin isn’t exposed.",
              },
            ].map((x) => (
              <motion.div
                key={x.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35 }}
                className="rounded-3xl border border-border bg-card p-7"
              >
                <div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary mb-4">
                  <x.icon className="h-6 w-6" />
                </div>
                <div className="font-semibold text-lg">{x.title}</div>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                  {x.text}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 rounded-3xl border border-border bg-card p-7">
            <div className="font-semibold mb-3">Typical targets</div>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                "Public websites and marketing domains",
                "Customer portals and web applications",
                "APIs exposed to the internet",
                "Remote-user DNS posture and filtering strategy",
              ].map((x) => (
                <div key={x} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground leading-relaxed">
                    {x}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Operating model */}
      <section className="section-padding bg-card">
        <div className="container-tight">
          <h2 className="text-3xl font-bold mb-6">
            How We Implement Edge Security in the Bay Area
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-10">
            We treat edge changes like production changes: scope, protect, tune,
            then document. That’s how you avoid downtime while reducing risk.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Workflow,
                title: "Inventory",
                text: "Domains, DNS records, edge config, public endpoints, and ownership. Identify quick wins and high-risk exposure.",
              },
              {
                icon: Shield,
                title: "Baseline",
                text: "Safer admin access, MFA, least privilege, and default protections for DNS/WAF/DDoS that fit your environment.",
              },
              {
                icon: Radar,
                title: "Tune",
                text: "Refine WAF/rate-limit rules using observed traffic patterns—reduce false positives and keep protections effective.",
              },
              {
                icon: ClipboardCheck,
                title: "Govern",
                text: "Change control, documentation, and review rhythm so edge security remains stable and supportable.",
              },
            ].map((x) => (
              <motion.div
                key={x.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35 }}
                className="rounded-3xl border border-border bg-background p-7"
              >
                <div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary mb-4">
                  <x.icon className="h-6 w-6" />
                </div>
                <div className="font-semibold text-lg">{x.title}</div>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                  {x.text}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 rounded-3xl border border-border bg-background p-7">
            <div className="font-semibold mb-3">Common outcomes</div>
            <ul className="space-y-3">
              {[
                "Reduced DNS misconfiguration risk and clearer ownership",
                "Improved availability posture under spikes and abuse patterns",
                "Cleaner TLS posture and reduced origin exposure",
                "Edge changes that are documented, reviewable, and stable",
              ].map((x) => (
                <li key={x} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground leading-relaxed">
                    {x}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Related pages */}
      <section className="pb-20 bg-background">
        <div className="container-tight">
          <div className="rounded-3xl border border-border bg-card p-8">
            <h2 className="text-2xl font-bold mb-3">Related Bay Area Pages</h2>
            <p className="text-muted-foreground mb-6">
              Edge security works best when identity, managed IT operations, and
              cloud governance are aligned.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link
                to="/city/bay-area/Managed-IT"
                className="rounded-2xl border border-border bg-background/60 p-4 hover:bg-background transition-colors"
              >
                <div className="font-semibold">Bay Area Managed IT</div>
                <div className="text-sm text-muted-foreground">
                  Standards + operations that keep systems predictable.
                </div>
              </Link>

              <Link
                to="/city/bay-area/cybersecurity"
                className="rounded-2xl border border-border bg-background/60 p-4 hover:bg-background transition-colors"
              >
                <div className="font-semibold">Bay Area Cybersecurity</div>
                <div className="text-sm text-muted-foreground">
                  Identity-first hardening and incident readiness.
                </div>
              </Link>

              <Link
                to="/city/bay-area/cloud-migration"
                className="rounded-2xl border border-border bg-background/60 p-4 hover:bg-background transition-colors"
              >
                <div className="font-semibold">Bay Area Cloud Migration</div>
                <div className="text-sm text-muted-foreground">
                  Microsoft 365 migrations with governance and stable cutovers.
                </div>
              </Link>

              <Link
                to="/services#edge-security"
                className="rounded-2xl border border-border bg-background/60 p-4 hover:bg-background transition-colors"
              >
                <div className="font-semibold">Edge Security (Global)</div>
                <div className="text-sm text-muted-foreground">
                  Service overview and delivery model.
                </div>
              </Link>

              <Link
                to="/assessment"
                className="rounded-2xl border border-border bg-background/60 p-4 hover:bg-background transition-colors"
              >
                <div className="font-semibold">Start With an Assessment</div>
                <div className="text-sm text-muted-foreground">
                  Baseline + prioritized roadmap.
                </div>
              </Link>

              <Link
                to="/city/bay-area"
                className="rounded-2xl border border-border bg-background/60 p-4 hover:bg-background transition-colors"
              >
                <div className="font-semibold">Bay Area Overview</div>
                <div className="text-sm text-muted-foreground">
                  Hub page for all Bay Area services.
                </div>
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
            <h2 className="text-3xl font-bold mb-4">
              Want to Reduce Edge Risk Without Breaking Production?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Start with an IT &amp; Security Assessment. We’ll identify edge
              exposure, tighten governance, and prioritize changes that reduce
              risk while keeping availability stable.
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
    { name: "Edge Security" },
  ]}
/>
      
    </Layout>
  );
}