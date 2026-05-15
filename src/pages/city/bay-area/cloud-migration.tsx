import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BottomBreadcrumbs } from "@/components/common/BottomBreadcrumbs";

import {
  ArrowRight,
  MapPin,
  Cloud,
  Shield,
  Users,
  Lock,
  ClipboardCheck,
  Workflow,
  CheckCircle2,
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
        <li className="text-foreground font-medium">Cloud Migration</li>
      </ol>
    </nav>
  );
}


export default function BayAreaCloudMigration() {
  const canonical = "https://velcoretech.com/city/bay-area/cloud-migration";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        name: "Velcore Tech - Cloud Migration Services Bay Area",
        url: canonical,
        telephone: "+18313347943",
        areaServed: "Bay Area, CA",
        serviceType: "Cloud Migration Services",
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
            name: "Cloud Migration",
            item: canonical,
          },
        ],
      },
    ],
  };

  return (
    <Layout>
      <Helmet>
        <title>Cloud Migration Services Bay Area | Velcore Tech</title>
        <meta
          name="description"
          content="Cloud migration services across the Bay Area. Velcore Tech delivers security-first Microsoft 365 migrations, identity hardening, data governance, and cutover planning for reliable outcomes."
        />
        <link rel="canonical" href={canonical} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Velcore Tech" />
        <meta
          property="og:title"
          content="Cloud Migration Services Bay Area | Velcore Tech"
        />
        <meta
          property="og:description"
          content="Security-first Microsoft 365 cloud migrations across the Bay Area—identity, governance, and stable cutovers."
        />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:image:alt"
          content="Velcore Tech - Cloud Migration Services Bay Area"
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
            badge="Bay Area Cloud Migration"
            title="Cloud Migrations That Don’t Break Security or Operations"
            description="We migrate Bay Area organizations to Microsoft 365 and modern cloud platforms with identity-first controls, governance, and a clean cutover plan—so the environment is stable on day one."
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
              Bay Area delivery • On-site + remote
            </div>
          </div>
        </div>
      </section>

      {/* What we deliver */}
      <section className="section-padding bg-background">
        <div className="container-tight">
          <h2 className="text-3xl font-bold mb-6">
            What “Security-First Cloud Migration” Includes
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-10">
            Cloud migrations fail when identity, permissions, and governance are
            treated as “later.” We sequence the cutover so security and
            operations are stable from day one.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: Users,
                title: "Identity & Access Baseline",
                text: "MFA enforcement, admin protections, access model cleanup, and secure onboarding/offboarding patterns.",
              },
              {
                icon: Shield,
                title: "Microsoft 365 Migration Execution",
                text: "Email/data migration planning, cutover sequencing, and validation—minimizing user disruption.",
              },
              {
                icon: Lock,
                title: "Data Governance & Sharing Controls",
                text: "SharePoint/OneDrive sharing posture, external access controls, retention guidance, and audit-friendly structure.",
              },
              {
                icon: ClipboardCheck,
                title: "Cutover + Stabilization",
                text: "Post-migration hardening, telemetry checks, and clear ownership so the environment stays consistent.",
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
        </div>
      </section>

      {/* How we run migrations */}
      <section className="section-padding bg-card">
        <div className="container-tight">
          <h2 className="text-3xl font-bold mb-6">
            How We Run Bay Area Cloud Migrations
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-10">
            A repeatable sequence reduces surprises: baseline identity first,
            plan the cutover, execute with validation, then harden and report.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Workflow,
                title: "Assess",
                text: "Inventory identity, mail flow, data locations, permissions, and risk exposure before migration decisions.",
              },
              {
                icon: Cloud,
                title: "Plan",
                text: "Cutover sequencing, rollback considerations, user impact plan, and governance decisions made upfront.",
              },
              {
                icon: Shield,
                title: "Migrate",
                text: "Execute the move with validation checkpoints for auth, mail, data access, and security controls.",
              },
              {
                icon: ClipboardCheck,
                title: "Stabilize",
                text: "Harden, tune, and document the new baseline so the environment stays secure and supportable.",
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
                "Cleaner admin model and safer authentication controls",
                "Reduced external sharing risk and tighter governance",
                "Stable mail + identity cutovers with fewer user disruptions",
                "Documented baseline that’s supportable and auditable",
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
              Cloud migrations work best when managed IT operations, security
              hardening, and edge controls are aligned.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link
                to="/city/bay-area/Managed-IT"
                className="rounded-2xl border border-border bg-background/60 p-4 hover:bg-background transition-colors"
              >
                <div className="font-semibold">Bay Area Managed IT</div>
                <div className="text-sm text-muted-foreground">
                  Standards + operations that keep the environment stable.
                </div>
              </Link>

              <Link
                to="/city/bay-area/cybersecurity"
                className="rounded-2xl border border-border bg-background/60 p-4 hover:bg-background transition-colors"
              >
                <div className="font-semibold">Bay Area Cybersecurity</div>
                <div className="text-sm text-muted-foreground">
                  Identity-first hardening and readiness planning.
                </div>
              </Link>

              <Link
                to="/city/bay-area/edge-security"
                className="rounded-2xl border border-border bg-background/60 p-4 hover:bg-background transition-colors"
              >
                <div className="font-semibold">Bay Area Edge Security</div>
                <div className="text-sm text-muted-foreground">
                  DNS/WAF/DDoS controls and exposure reduction.
                </div>
              </Link>

              <Link
                to="/services#m365-cloud"
                className="rounded-2xl border border-border bg-background/60 p-4 hover:bg-background transition-colors"
              >
                <div className="font-semibold">Microsoft 365 &amp; Cloud (Global)</div>
                <div className="text-sm text-muted-foreground">
                  Global service overview and delivery model.
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
              Want a Clean Cutover and a Defensible Baseline?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Start with an IT &amp; Security Assessment. We’ll confirm identity
              posture, migration readiness, and deliver a cutover plan that
              doesn’t create new risk.
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
    { name: "Cloud Migration" },
  ]}
/>
      
    </Layout>
  );
}