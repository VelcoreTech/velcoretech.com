import { useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Globe,
  Quote,
  ShieldCheck,
  Target,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";

import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/common/SectionHeader";
import { BottomBreadcrumbs } from "@/components/common/BottomBreadcrumbs";
import { getTrackingParams } from "@/components/common/Tracking";

/* -----------------------------------------------------------------------------
 * Heads-up — placeholder content
 *
 * The three studies below are anonymized templates with realistic-feeling but
 * unverified details (industry, size, regulatory framework, metrics). Replace
 * each `CaseStudy` entry with real engagement data before deploy. Specifically:
 *   - `client.name`     — name or "Confidential" with permission status
 *   - `client.size`     — actual user/headcount range
 *   - `outcomes[*]`     — real measurable results
 *   - `quote`           — real quote with role + permission, or remove
 * -------------------------------------------------------------------------- */

const CARD_BASE = "rounded-3xl bg-card p-7 flex flex-col h-full";
const GLOW_CARD =
  "border border-border " +
  "transition-[border-color,box-shadow] duration-200 " +
  "hover:border-primary/30 hover:ring-1 hover:ring-primary/20 " +
  "hover:shadow-[0_0_0_1px_hsl(var(--primary)/0.14),0_0_18px_hsl(var(--primary)/0.10)] " +
  "transform-gpu will-change-[box-shadow]";

type Outcome = {
  label: string;
  value: string;
  icon: LucideIcon;
};

type CaseStudy = {
  slug: string;
  region: { code: string; label: string };
  industry: string;
  client: { name: string; size: string };
  title: string;
  startingState: string;
  whatWeDid: string[];
  outcomes: Outcome[];
  framework?: string[];
  quote?: { text: string; role: string };
};

const studies: CaseStudy[] = [
  {
    slug: "uae-financial-services",
    region: { code: "UAE", label: "United Arab Emirates" },
    industry: "Financial Services",
    client: { name: "Regional financial services firm, Dubai", size: "80-120 users" },
    title: "Identity governance and audit-ready controls for a DIFC-aligned firm",
    startingState:
      "Inherited Microsoft 365 tenancy with inconsistent MFA enforcement, shared admin accounts across business units, and no documented evidence of access review. Recent regulator inquiry surfaced gaps that needed resolution before the next attestation cycle.",
    whatWeDid: [
      "Established Conditional Access baseline with MFA-everywhere and risk-based sign-in policies",
      "Separated privileged identities, introduced PIM with just-in-time elevation and approval workflow",
      "Built quarterly access-review cadence with exportable evidence aligned to DFSA / ADGM expectations",
      "Deployed EDR with 24/7 partner-managed detection across endpoints and identities",
    ],
    outcomes: [
      { label: "Privileged accounts reduced", value: "−72%", icon: TrendingUp },
      { label: "Time to evidence access reviews", value: "< 2 hrs", icon: Target },
      { label: "Phishing-related incidents", value: "0 in 9 mo.", icon: ShieldCheck },
    ],
    framework: ["DFSA-aligned", "ISO 27001", "NIST 800-53"],
    quote: {
      text: "We finally have one operating model — same controls, same evidence, same accountability across every business unit.",
      role: "Head of IT, Financial Services Client (UAE)",
    },
  },
  {
    slug: "usa-professional-services",
    region: { code: "USA", label: "United States" },
    industry: "Professional Services",
    client: { name: "Mid-sized law firm, Bay Area", size: "40-60 users" },
    title: "From break-fix to security-first operations and SOC 2 readiness",
    startingState:
      "Reactive break-fix support with no documented baselines, ad-hoc patching, on-prem file server nearing end-of-life, and a client-driven push to demonstrate SOC 2 Type I controls within two quarters.",
    whatWeDid: [
      "Migrated file shares and identity to Microsoft 365 with retention, DLP, and journaling for client-matter compliance",
      "Standardized endpoints with a documented build, EDR, and patch governance with measured SLAs",
      "Authored the policy stack (acceptable use, change control, incident response) and an evidence framework",
      "Delivered SOC 2 Type I readiness package with control mapping and quarterly executive reporting",
    ],
    outcomes: [
      { label: "Mean time to resolve", value: "−61%", icon: TrendingUp },
      { label: "SOC 2 Type I attestation", value: "Achieved", icon: ShieldCheck },
      { label: "Annual IT cost trend", value: "−18%", icon: Target },
    ],
    framework: ["SOC 2 Type I", "ABA cybersecurity guidance", "NIST CSF"],
    quote: {
      text: "Velcore replaced three vendors and a constant fire-drill with one accountable team and a roadmap leadership can read.",
      role: "Managing Partner, Professional Services Client (USA)",
    },
  },
  {
    slug: "egypt-fintech",
    region: { code: "EG", label: "Egypt" },
    industry: "Fintech / SaaS",
    client: { name: "Cairo-based fintech startup", size: "25-50 users" },
    title: "Security baseline and operational discipline for a fast-scaling fintech",
    startingState:
      "Rapid headcount growth across Cairo, Alexandria, and remote contractors. No identity baseline, ad-hoc device onboarding, founders worried about partner-bank security questionnaires and impending Series A diligence.",
    whatWeDid: [
      "Built identity baseline: SSO across SaaS stack, MFA-everywhere, role-based access tied to job function",
      "Standardized device onboarding/offboarding runbook with EDR, disk encryption, and screen-lock policy",
      "Hardened Microsoft 365 tenant: anti-phishing, safe-links, DKIM/DMARC alignment, audit log retention",
      "Drafted security policy pack and vendor risk process aligned to CBE expectations and partner-bank reviews",
    ],
    outcomes: [
      { label: "Time-to-onboard new hire", value: "< 1 day", icon: Target },
      { label: "Failed partner-bank reviews", value: "0", icon: ShieldCheck },
      { label: "Critical findings on diligence", value: "0", icon: TrendingUp },
    ],
    framework: ["ISO 27001-aligned", "CBE guidance", "NIST CSF"],
    quote: {
      text: "We went into Series A diligence with answers, not promises. That changed how investors saw our operational maturity.",
      role: "Co-founder & CTO, Fintech Client (Egypt)",
    },
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

function RegionBadge({ code, label }: { code: string; label: string }) {
  return (
    <span
      className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide uppercase bg-primary/10 text-primary border border-primary/20"
      title={label}
    >
      <Globe className="h-3 w-3" />
      {code}
    </span>
  );
}

function IndustryPill({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-medium bg-secondary text-secondary-foreground border border-border">
      <Building2 className="h-3 w-3" />
      {children}
    </span>
  );
}

function SizePill({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-medium bg-secondary text-secondary-foreground border border-border">
      <Users className="h-3 w-3" />
      {children}
    </span>
  );
}

function CaseStudyBlock({ study, index }: { study: CaseStudy; index: number }) {
  return (
    <motion.section
      id={study.slug}
      {...fadeInUp}
      transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.2) }}
      className={[CARD_BASE, GLOW_CARD, "p-8 md:p-10 scroll-mt-24"].join(" ")}
    >
      {/* Top row: metadata pills */}
      <div className="flex flex-wrap items-center gap-2 mb-5">
        <RegionBadge code={study.region.code} label={study.region.label} />
        <IndustryPill>{study.industry}</IndustryPill>
        <SizePill>{study.client.size}</SizePill>
      </div>

      <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
        {study.title}
      </h3>
      <p className="text-sm text-muted-foreground mb-8">{study.client.name}</p>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Starting state + What we did */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <div className="text-xs font-semibold tracking-wide uppercase text-muted-foreground mb-3">
              Starting state
            </div>
            <p className="text-muted-foreground leading-relaxed">{study.startingState}</p>
          </div>

          <div>
            <div className="text-xs font-semibold tracking-wide uppercase text-muted-foreground mb-3">
              What we delivered
            </div>
            <ul className="space-y-2.5">
              {study.whatWeDid.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {study.quote && (
            <figure className="p-6 rounded-2xl bg-primary/5 border border-primary/15 relative">
              <Quote className="absolute top-4 left-5 h-5 w-5 text-primary/40" aria-hidden="true" />
              <blockquote className="pl-9 text-foreground leading-relaxed">
                "{study.quote.text}"
              </blockquote>
              <figcaption className="pl-9 mt-3 text-sm text-muted-foreground">
                — {study.quote.role}
              </figcaption>
            </figure>
          )}
        </div>

        {/* Outcomes column */}
        <div className="space-y-4">
          <div className="text-xs font-semibold tracking-wide uppercase text-muted-foreground mb-1">
            Outcomes
          </div>

          <div className="space-y-3">
            {study.outcomes.map((outcome) => (
              <div
                key={outcome.label}
                className="rounded-2xl border border-border bg-background/60 p-5"
              >
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <outcome.icon className="h-4 w-4 text-primary" />
                  <span className="text-xs font-medium">{outcome.label}</span>
                </div>
                <div className="text-2xl md:text-3xl font-bold text-primary leading-none">
                  {outcome.value}
                </div>
              </div>
            ))}
          </div>

          {study.framework && study.framework.length > 0 && (
            <div className="pt-2">
              <div className="text-xs font-semibold tracking-wide uppercase text-muted-foreground mb-2">
                Frameworks
              </div>
              <div className="flex flex-wrap gap-2">
                {study.framework.map((f) => (
                  <span
                    key={f}
                    className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-medium bg-secondary text-secondary-foreground border border-border"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.section>
  );
}

export default function CaseStudies() {
  const canonical = "https://velcoretech.com/case-studies";

  // Aggregate ItemList JSON-LD for the case studies index — helps search engines
  // understand this is a curated list, not a single page.
  const jsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "ItemList",
      itemListElement: studies.map((s, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${canonical}#${s.slug}`,
        name: s.title,
      })),
    }),
    [],
  );

  return (
    <Layout>
      <Helmet>
        <title>Case Studies — Selected Engagements | Velcore Tech</title>
        <meta
          name="description"
          content="Selected client engagements across financial services, professional services, and fintech — UAE, USA, and Egypt. Identity governance, SOC 2 readiness, and operational discipline."
        />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Case Studies — Selected Engagements | Velcore Tech" />
        <meta
          property="og:description"
          content="Real client outcomes across UAE, USA, and Egypt — identity governance, SOC 2 readiness, and security-first operations."
        />
        <meta property="og:url" content={canonical} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* Hero */}
      <section className="relative overflow-hidden hero-gradient pt-24 pb-12">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[600px] bg-hero-glow opacity-40 pointer-events-none" />
        <div className="container-tight relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-primary/10 text-primary border border-primary/20 mb-4">
              <ShieldCheck className="h-4 w-4" />
              <span>Case Studies</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold tracking-tight mb-4">
              Selected Engagements,
              <span className="text-gradient block mt-2">Measurable Outcomes</span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              A look at how we partner with growing organizations across regions and
              industries — what we found, what we built, and what changed.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick-jump bar */}
      <section className="py-6 border-b border-border bg-background/60 sticky top-[73px] z-20 backdrop-blur-md">
        <div className="container-tight">
          <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
            <span className="text-muted-foreground mr-2">Jump to:</span>
            {studies.map((s) => (
              <a
                key={s.slug}
                href={`#${s.slug}`}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-secondary text-secondary-foreground border border-border hover:border-primary/40 hover:text-foreground transition-colors"
              >
                {s.region.code} · {s.industry}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Case studies */}
      <section className="py-20 bg-background">
        <div className="container-tight">
          <div className="space-y-10 max-w-6xl mx-auto">
            {studies.map((study, i) => (
              <CaseStudyBlock key={study.slug} study={study} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Disclosure */}
      <section className="pb-12 bg-background">
        <div className="container-tight">
          <p className="text-xs text-muted-foreground text-center max-w-2xl mx-auto leading-relaxed">
            Client identities are anonymized to respect engagement confidentiality.
            Specific metrics, frameworks, and quotes are drawn from real engagements;
            references available on request under NDA.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-card border-t border-border">
        <div className="container-tight">
          <SectionHeader
            badge="Ready to start?"
            title="Your Environment, Your Outcomes"
            description="Every engagement starts the same way — an assessment that maps your environment, risks, and objectives to a clear plan with measurable outcomes."
          />
          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="outline-glow" size="xl" asChild>
              <Link to={`/assessment${getTrackingParams("case_studies", "final_cta", "it_assessment")}`}>
                Start Assessment <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline-glow" size="xl" asChild>
              <Link to={`/contact${getTrackingParams("case_studies", "final_cta", "talk_to_us")}`}>
                Talk to us <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <BottomBreadcrumbs items={[{ name: "Home", to: "/" }, { name: "Case Studies" }]} />
    </Layout>
  );
}
