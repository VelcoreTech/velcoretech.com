import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { BottomBreadcrumbs } from "@/components/common/BottomBreadcrumbs";

import {
  // Industry Icons
  Briefcase,
  Building2,
  Scale,
  HeartPulse,
  Hotel,
  Film,
  Heart,
  Landmark,
  Rocket,

  // Misc / UI
  ArrowRight,
  ChevronDown,
  CheckCircle2,

  // Security & Operations
  Shield,
  Clock,
  Globe,
  ClipboardCheck,
  Server,
  Users,
  Lock,
  Cloud,
  Wifi,
  HardDrive,
  ShieldCheck,
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

type Industry = {
  id: string;
  icon: React.ElementType;
  title: string;
  shortDescription: string;
  fullDescription: string;
  areasOfExpertise: string[];
  serviceMapping: {
    icon: React.ElementType;
    label: string;
    href: string;
  }[];
  compliance?: string[];
};

const industries: Industry[] = [
  {
    id: "professional-services",
    icon: Briefcase,
    title: "Professional Services",
    shortDescription: "Reliable IT and audit-ready security for legal, accounting, and architecture firms.",
    fullDescription:
      "Professional services firms are built on client trust — and trust depends on systems that don't go down and don't leak. We deliver predictable IT operations and security-first identity, Microsoft 365, and endpoint controls for legal practices, CPA firms, and design studios. Standards-based, audit-ready, and sized to firms of 10–250 users.",
    areasOfExpertise: [
      "Microsoft 365 governance with Conditional Access and DLP for client-matter data",
      "Endpoint standards with EDR and disk-encryption baselines",
      "Secure remote work for partners, associates, and contractors",
      "Document retention and legal-hold readiness",
      "Cyber-insurance questionnaire support and renewal evidence",
      "ABA / AICPA-aligned controls and incident response planning",
    ],
    serviceMapping: [
      { icon: Server, label: "Managed IT Operations", href: "/services/Managed-IT" },
      { icon: ShieldCheck, label: "Cybersecurity", href: "/services/cybersecurity" },
      { icon: Cloud, label: "Microsoft 365 Security", href: "/services/cloud" },
      { icon: Users, label: "Identity & Access", href: "/services/consulting" },
      { icon: Scale, label: "Compliance Readiness", href: "/services/audit-ready" },
    ],
    compliance: ["ABA Cybersecurity Guidance", "AICPA SOC 2", "ISO 27001-aligned"],
  },
  {
    id: "tech-startups",
    icon: Rocket,
    title: "Tech Startups",
    shortDescription: "Security baselines and operational discipline for SOC 2 aspirants and Series-A diligence.",
    fullDescription:
      "Fast-growing tech companies need security that scales without slowing the team down. We establish identity baselines, endpoint discipline, and Microsoft 365 hardening that hold up to partner-bank reviews, customer security questionnaires, and Series-A due diligence — without a full-time security hire.",
    areasOfExpertise: [
      "Identity baseline: SSO across the SaaS stack, MFA-everywhere, role-based access",
      "Standardized device onboarding/offboarding with EDR and disk encryption",
      "Microsoft 365 hardening: anti-phishing, DKIM/DMARC, audit-log retention",
      "SOC 2 readiness: control mapping, policy stack, evidence framework",
      "Customer security questionnaire support",
      "Series-A diligence preparation",
    ],
    serviceMapping: [
      { icon: ShieldCheck, label: "Cybersecurity", href: "/services/cybersecurity" },
      { icon: Users, label: "Identity & Access", href: "/services/consulting" },
      { icon: Scale, label: "SOC 2 Readiness", href: "/services/soc2" },
      { icon: Server, label: "Managed IT Operations", href: "/services/Managed-IT" },
      { icon: Cloud, label: "Microsoft 365 Security", href: "/services/cloud" },
    ],
    compliance: ["SOC 2 Readiness", "ISO 27001-aligned", "NIST CSF"],
  },
  {
    id: "financial-services",
    icon: Landmark,
    title: "Financial Services",
    shortDescription: "Audit-ready controls for RIAs, CPA firms, and fintech — sized to growing firms, not enterprises.",
    fullDescription:
      "Small and mid-sized financial firms — RIAs, CPA practices, fintech operators — face the same regulator scrutiny as the giants but without enterprise budgets or staffing. We deliver identity governance, endpoint discipline, and audit-ready evidence that satisfies the controls reviewers actually ask about, without overhead built for ten-thousand-person banks.",
    areasOfExpertise: [
      "Identity & access governance with MFA enforcement and privileged access separation",
      "Microsoft 365 hardening with DLP and audit-log retention for client communications",
      "Risk assessments aligned to cyber-insurance and regulator expectations",
      "Vendor risk and third-party security review support",
      "Incident response planning and tabletop exercises",
      "Audit evidence frameworks (SOC 2, AICPA, NIST CSF)",
    ],
    serviceMapping: [
      { icon: Users, label: "Identity & Access Management", href: "/services/consulting" },
      { icon: ShieldCheck, label: "Cybersecurity", href: "/services/cybersecurity" },
      { icon: Scale, label: "Governance & Compliance", href: "/services/audit-ready" },
      { icon: Server, label: "Managed IT Operations", href: "/services/Managed-IT" },
      { icon: ClipboardCheck, label: "Incident Readiness", href: "/services/cybersecurity" },
    ],
    compliance: ["SOC 2", "AICPA Trust Services", "NIST CSF", "PCI DSS", "ISO 27001-aligned"],
  },
  {
    id: "healthcare",
    icon: HeartPulse,
    title: "Healthcare",
    shortDescription: "HIPAA-aligned security and reliable operations for clinics, practices, and health-tech.",
    fullDescription:
      "Small and mid-sized healthcare organizations carry the same HIPAA obligations as the largest hospital systems — with a fraction of the resources. We deliver HIPAA-aligned identity, endpoint, and Microsoft 365 controls for clinics, group practices, and health-tech companies, plus the operational discipline (patching, backups, access reviews) that auditors and cyber-insurance carriers expect.",
    areasOfExpertise: [
      "HIPAA-aligned access controls for ePHI in M365 and EHR/EMR systems",
      "Endpoint security and disk encryption across clinical workstations",
      "Backup and recovery validation with restore testing",
      "Secure patient communication and email protections",
      "Vendor and third-party risk reviews (BAA inventory)",
      "Compliance audits and remediation planning",
    ],
    serviceMapping: [
      { icon: Shield, label: "HIPAA Security", href: "/services/cybersecurity" },
      { icon: Server, label: "Managed IT Operations", href: "/services/Managed-IT" },
      { icon: Cloud, label: "Microsoft 365 Security", href: "/services/cloud" },
      { icon: HardDrive, label: "Backup & Recovery", href: "/services/cloud" },
      { icon: Scale, label: "Compliance Readiness", href: "/services/audit-ready" },
    ],
    compliance: ["HIPAA", "HITRUST-aware", "NIST 800-53", "ISO 27001-aligned"],
  },
  {
    id: "hospitality",
    icon: Hotel,
    title: "Hospitality, Retail & Hotels",
    shortDescription: "Multi-location operations, PCI compliance, and guest-network discipline.",
    fullDescription:
      "Hospitality and retail businesses run on consistency: a guest in Santa Cruz expects the same WiFi and the same booking experience as one in San Francisco. We deliver standardized network architecture, PCI compliance, and segmented guest/corporate networks across multi-location operators of 10–250 staff.",
    areasOfExpertise: [
      "Multi-location network standardization and segmentation",
      "PCI DSS compliance for payment card processing",
      "Guest WiFi security and captive-portal management",
      "Point-of-sale (POS) system security and monitoring",
      "Remote site monitoring and management",
      "Seasonal staffing IT support that scales with the calendar",
    ],
    serviceMapping: [
      { icon: Wifi, label: "Network & Firewall", href: "/services/networking" },
      { icon: ShieldCheck, label: "PCI Compliance", href: "/services/audit-ready" },
      { icon: Server, label: "Managed IT Operations", href: "/services/Managed-IT" },
      { icon: Users, label: "Identity Management", href: "/services/consulting" },
      { icon: Cloud, label: "Cloud Security", href: "/services/cloud" },
    ],
    compliance: ["PCI DSS", "ISO 27001-aligned"],
  },
  {
    id: "nonprofit",
    icon: Heart,
    title: "Non-Profit & Public Sector",
    shortDescription: "Mission-grade security at sustainable rates — for nonprofits and small public-sector teams.",
    fullDescription:
      "Nonprofits and small public-sector teams serve real missions on tight budgets, and they're increasingly attractive ransomware targets. We deliver enterprise-grade identity, Microsoft 365, and endpoint security at nonprofit-aligned rates, with cyber-insurance qualification support built in.",
    areasOfExpertise: [
      "Donor and constituent data protection in M365 and Google Workspace",
      "Public website and portal protection (Cloudflare DNS / WAF)",
      "Remote workforce enablement with MFA and Conditional Access",
      "Volunteer and contractor access lifecycle",
      "Cyber-insurance qualification and renewal evidence",
      "Grant-reporting and compliance support",
    ],
    serviceMapping: [
      { icon: Globe, label: "Edge Security (Cloudflare)", href: "/services/edge" },
      { icon: Server, label: "Managed IT Operations", href: "/services/Managed-IT" },
      { icon: Cloud, label: "Microsoft 365 Security", href: "/services/cloud" },
      { icon: Shield, label: "Cybersecurity", href: "/services/cybersecurity" },
      { icon: Scale, label: "Compliance Readiness", href: "/services/audit-ready" },
    ],
    compliance: ["NIST 800-171", "CMMC-aware", "ISO 27001-aligned"],
  },
  {
    id: "media-entertainment",
    icon: Film,
    title: "Media & Entertainment",
    shortDescription: "Secure creative collaboration and IP protection for studios, post houses, and agencies.",
    fullDescription:
      "Production studios, post-production houses, and creative agencies need IT that stays out of the way of creative work — but holds up when a leak or ransomware attempt would cost a release window. We deliver secure collaboration, contractor access governance, and IP protection sized to creative teams of 10–250.",
    areasOfExpertise: [
      "Secure collaboration and shared-asset workflows for distributed creative teams",
      "Intellectual property protection with access logging and DLP",
      "Contractor and vendor access lifecycle (M365 + SaaS)",
      "High-performance backup for large media assets",
      "Cyber-insurance readiness for production companies",
      "Edge protection (Cloudflare) for client portals and review sites",
    ],
    serviceMapping: [
      { icon: Cloud, label: "Cloud Storage & Backup", href: "/services/cloud" },
      { icon: Users, label: "Identity & Access", href: "/services/consulting" },
      { icon: Shield, label: "Content Security", href: "/services/cybersecurity" },
      { icon: Globe, label: "Edge Security", href: "/services/edge" },
      { icon: Server, label: "Managed IT Operations", href: "/services/Managed-IT" },
    ],
    compliance: ["ISO 27001-aligned", "NIST CSF"],
  },
];

function IndustryCard({ industry, index }: { industry: Industry; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const Icon = industry.icon;

  return (
    <motion.div
      id={industry.id}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.03 }}
      className={[CARD_BASE, GLOW_CARD, "bg-card/70 p-8"].join(" ")}
    >
      {/* Header - Clickable to expand/collapse */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-2xl"
      >
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20">
              <Icon className="h-6 w-6" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">{industry.title}</h2>
          </div>
          <ChevronDown
            className={[
              "h-6 w-6 text-muted-foreground transition-transform duration-300 flex-shrink-0",
              isExpanded ? "rotate-180" : "",
            ].join(" ")}
          />
        </div>

        {/* Short description - always visible */}
        <p className="text-muted-foreground text-lg leading-relaxed">
          {industry.shortDescription}
        </p>

        {/* Compliance badges - visible even when collapsed */}
        {industry.compliance && (
          <div className="flex flex-wrap gap-2 mt-4">
            {industry.compliance.map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-medium bg-primary/10 text-primary/90 border border-primary/20"
              >
                <Shield className="h-2.5 w-2.5" />
                {item}
              </span>
            ))}
          </div>
        )}
      </button>

      {/* Expanded content */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="overflow-hidden"
          >
            <div className="mt-8 pt-6 border-t border-border">
              {/* Full Description */}
              <div className="mb-8">
                <p className="text-muted-foreground leading-relaxed">
                  {industry.fullDescription}
                </p>
              </div>

              {/* Areas of Expertise */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-1">Areas of Expertise</h3>
                <div className="grid md:grid-cols-2 gap-1">
                  {industry.areasOfExpertise.map((item) => (
                    <div key={item} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Service Mapping */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Relevant Services</h3>
                <div className="flex flex-wrap gap-3">
                  {industry.serviceMapping.map((service) => (
                    <Button
                      key={service.label}
                      variant="outline-glow"
                      size="sm"
                      asChild
                      className="gap-2"
                    >
                      <Link
                        to={`${service.href}${getTrackingParams('industries', industry.id, service.label.toLowerCase().replace(/\s+/g, '_'))}`}
                      >
                        <service.icon className="h-4 w-4" />
                        {service.label}
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </Button>
                  ))}
                </div>
              </div>

              {/* CTA within expanded card */}
              <div className="mt-6 p-5 rounded-2xl bg-primary/5 border border-primary/20">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold">Need a custom approach for {industry.title}?</p>
                    <p className="text-sm text-muted-foreground">
                      We'll assess your environment and recommend the right controls.
                    </p>
                  </div>
                  <Button variant="gradient" size="sm" asChild>
                    <Link to={`/assessment${getTrackingParams('industries', industry.id, 'assessment')}`}>
                      Start Assessment <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Industries() {
  return (
    <Layout>
      <Helmet>
        <title>Industries We Serve | Velcore Tech</title>
        <meta
          name="description"
          content="Security-first managed IT and cybersecurity services tailored for Energy, Financial Services, Healthcare, Hospitality, Manufacturing, Media, Non-Profit, and Private Equity."
        />
        <link rel="canonical" href="https://velcoretech.com/industries" />

        <meta property="og:title" content="Industries We Serve | Velcore Tech" />
        <meta
          property="og:description"
          content="Industry-specific IT and security solutions for regulated and growth-focused organizations."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://velcoretech.com/industries" />
        <meta property="og:image" content="https://velcoretech.com/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Industries We Serve | Velcore Tech" />
        <meta name="twitter:description" content="Industry-specific IT and security solutions." />
        <meta name="twitter:image" content="https://velcoretech.com/og-image.png" />
      </Helmet>

      {/* HERO SECTION */}
      <section className="relative overflow-hidden hero-gradient pt-24 pb-12">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-hero-glow opacity-40 pointer-events-none" />
        <div className="container-tight relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-primary/10 text-primary border border-primary/20 mb-4">
              <Building2 className="h-4 w-4" />
              <span>Industries</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold tracking-tight mb-4">
              Security-First IT for
              <span className="text-gradient block mt-2">Industry-Specific Needs</span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We combine technical expertise with industry context—delivering solutions that address 
              the unique regulatory, operational, and security challenges you face.
            </p>
          </div>
        </div>
      </section>

      {/* INDUSTRIES LIST */}
      <section className="py-20 bg-background">
        <div className="container-tight">
          <div className="space-y-8">
            {industries.map((industry, index) => (
              <IndustryCard key={industry.id} industry={industry} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* TRUST INDICATORS */}
      <section className="py-20 bg-card">
        <div className="container-tight">
          <SectionHeader
            badge="Cross-Industry Expertise"
            title="One Operating Model, Many Industries"
            description="Our approach adapts to your regulatory and operational context while maintaining the same disciplined standards."
          />
          
          <div className="grid md:grid-cols-3 gap-6 mt-14">
            {[
              {
                icon: Shield,
                title: "Compliance Expertise",
                description:
                  "HIPAA, NIST, ISO, SOC 2, PCI DSS, and industry-specific frameworks.",
              },
              {
                icon: Clock,
                title: "Operational Reliability",
                description:
                  "24/7 monitoring, patch governance, and recovery readiness for critical operations.",
              },
              {
                icon: ClipboardCheck,
                title: "Audit-Ready Discipline",
                description:
                  "Evidence, baselines, and policies leadership can defend when asked.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.06 }}
                className={[CARD_BASE, GLOW_CARD, "bg-background/60 p-6"].join(" ")}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="py-20 bg-background">
        <div className="container-tight">
          <div className="p-8 md:p-10 rounded-3xl bg-card border border-border relative overflow-hidden">
            <div className="absolute inset-0 bg-hero-glow opacity-40 pointer-events-none" />
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="max-w-2xl">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">
                  Your Industry. Our Operating Model.
                </h2>
                <p className="text-muted-foreground">
                  Start with an assessment—we'll baseline risk across identity, endpoints, cloud, networks, 
                  and edge security, then deliver a prioritized plan tailored to your industry.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="outline-glow" size="lg" asChild>
                  <Link to={`/assessment${getTrackingParams('industries', 'final_cta', 'it_assessment')}`}>
                    Start Assessment <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline-glow" size="lg" asChild>
                  <Link to={`/contact${getTrackingParams('industries', 'final_cta', 'schedule_consultation')}`}>
                    Schedule Consultation <ArrowRight className="ml-2 h-5 w-5" />
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
          { name: "Industries" },
        ]}
      />
    </Layout>
  );
}