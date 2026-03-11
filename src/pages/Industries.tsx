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
  Factory,
  Film,
  Heart,
  Landmark,
  Zap,
  
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
    id: "energy",
    icon: Zap,
    title: "Energy",
    shortDescription: "Critical infrastructure requiring 24/7 operational reliability and security.",
    fullDescription: "The energy industry is becoming increasingly diverse with the introduction of new regulations, expanding production sources and increasing demands. We help companies solve their operating and strategic issues—from raw material extraction to end user consumption. Whether optimizing fleet operations for a distribution company or managing smart grid implementation at a public utility, we support our clients' needs and keep the lights on.",
    areasOfExpertise: [
      "Develop and implement sourcing strategies for operational technology",
      "Risk assessments for facilities, supply chain, maintenance, and operations",
      "Design and implement energy continuity plans for 24/7 industrial operations",
      "Manage capital projects for heavy industrial operations including oil & gas, metals, mining, and power generation",
      "Integrate alternative energy sources into operations of providers and consumers",
      "Support operations and administration in financial and operational reporting to meet regulatory compliance",
      "Design and implement maintenance and operations strategies along with fleet and supplies management",
    ],
    serviceMapping: [
      { icon: Server, label: "Managed IT Operations", href: "/services/Managed-IT" },
      { icon: Wifi, label: "Network & Firewall Engineering", href: "/services/networking#network-firewall" },
      { icon: HardDrive, label: "Backup & Recovery", href: "/services/cloud#backup-recovery" },
      { icon: Shield, label: "Security Monitoring", href: "/services/cybersecurity#security-operations" },
      { icon: Globe, label: "Edge Security", href: "/services/edge#edge-security" },
    ],
    compliance: ["NERC CIP", "NIST 800-53", "ISO 27001"],
  },
  {
    id: "financial-services",
    icon: Landmark,
    title: "Financial Services",
    shortDescription: "Regulated environments demanding audit-ready controls and ironclad security.",
    fullDescription: "Financial services firms operate in one of the most regulated environments in the world. We help banks, investment firms, and financial technology companies meet compliance requirements while maintaining operational efficiency. From identity governance to transaction security, we build controls that satisfy auditors and protect sensitive financial data.",
    areasOfExpertise: [
      "Implement identity and access governance with least privilege and MFA enforcement",
      "Design secure architectures for transaction processing and client data protection",
      "Conduct risk assessments aligned to financial regulations and cyber insurance requirements",
      "Develop incident response plans with containment and recovery procedures",
      "Support compliance with SOX, GLBA, and SEC regulations",
      "Manage vendor risk and third-party security assessments",
      "Implement privileged access management for financial systems",
    ],
    serviceMapping: [
      { icon: Users, label: "Identity & Access Management", href: "/services/governance#identity-access" },
      { icon: ShieldCheck, label: "Cybersecurity", href: "/services/cybersecurity" },
      { icon: Scale, label: "Governance & Compliance", href: "/services/audit-ready#governance-compliance" },
      { icon: Server, label: "Managed IT Operations", href: "/services/Managed-IT" },
      { icon: ClipboardCheck, label: "Incident Readiness", href: "/services/cybersecurity#incident-readiness" },
    ],
    compliance: ["SOX", "GLBA", "NIST 800-53", "ISO 27001", "PCI DSS"],
  },
  {
    id: "healthcare",
    icon: HeartPulse,
    title: "Healthcare",
    shortDescription: "Balancing care, compliance, and cost with HIPAA-aligned security.",
    fullDescription: "The healthcare industry has seen dramatic changes. As our population grows, demands on the system will only increase, requiring those in the industry to meet increasing regulatory compliance. Managing healthcare is about designing and deploying better and improved processes, integrating people, process and technology to reduce costs and improve quality of care.",
    areasOfExpertise: [
      "Redesigning and optimizing healthcare processes: Admissions to Discharge",
      "HIPAA-aligned security controls for ePHI protection",
      "EHR/EMR system support and integration",
      "Technology integration for operations, monitoring, and patient care",
      "Acquisition and post-merger integration",
      "Market analysis and service/opportunity modeling",
      "Compliance audits and remediation planning",
      "Secure patient communications and email protections",
    ],
    serviceMapping: [
      { icon: Shield, label: "HIPAA Security", href: "/services/cybersecurity" },
      { icon: Server, label: "Managed IT Operations", href: "/services/Managed-IT" },
      { icon: Cloud, label: "Microsoft 365 Security", href: "/services/cloud#m365-cloud" },
      { icon: HardDrive, label: "Backup & Recovery", href: "/services/cloud#backup-recovery" },
      { icon: Scale, label: "Compliance Readiness", href: "/services/audit-ready#governance-compliance" },
    ],
    compliance: ["HIPAA", "HITRUST", "NIST 800-53", "ISO 27001"],
  },
  {
    id: "hospitality",
    icon: Hotel,
    title: "Hospitality, Retail & Hotels",
    shortDescription: "Multi-location operations with PCI compliance and guest experience focus.",
    fullDescription: "Hospitality and retail businesses face unique challenges: multiple locations, seasonal staffing, guest WiFi, and payment card security. We deliver consistent IT operations across sites while maintaining PCI compliance and ensuring guest-facing technology enhances the experience rather than disrupting it.",
    areasOfExpertise: [
      "Multi-location network standardization and segmentation",
      "PCI DSS compliance for payment card processing",
      "Guest WiFi security and captive portal management",
      "Point-of-sale (POS) system security and monitoring",
      "Corporate and guest network separation",
      "Remote site monitoring and management",
      "Employee onboarding/offboarding across locations",
      "Seasonal staffing IT support scalability",
    ],
    serviceMapping: [
      { icon: Wifi, label: "Network & Firewall", href: "/services/networking#network-firewall" },
      { icon: ShieldCheck, label: "PCI Compliance", href: "/services/audit-ready" },
      { icon: Server, label: "Managed IT Operations", href: "/services/Managed-IT" },
      { icon: Users, label: "Identity Management", href: "/services/governance#identity-access" },
      { icon: Cloud, label: "Cloud Security", href: "/services/cloud" },
    ],
    compliance: ["PCI DSS", "GDPR", "ISO 27001"],
  },
  {
    id: "manufacturing",
    icon: Factory,
    title: "Manufacturing",
    shortDescription: "Securing operational technology while maintaining production uptime.",
    fullDescription: "Manufacturing environments blend IT and operational technology (OT), creating unique security and reliability challenges. We help manufacturers protect intellectual property, maintain production uptime, and secure industrial control systems without disrupting operations.",
    areasOfExpertise: [
      "IT/OT network segmentation and security",
      "Industrial control system (ICS) security assessments",
      "Supply chain risk management",
      "Intellectual property protection",
      "Production system backup and recovery planning",
      "Vendor remote access governance",
      "Regulatory compliance for manufacturing environments",
      "Predictive maintenance technology integration",
    ],
    serviceMapping: [
      { icon: Wifi, label: "Network Segmentation", href: "/services/networking#network-firewall" },
      { icon: Shield, label: "OT Security", href: "/services/cybersecurity" },
      { icon: HardDrive, label: "Backup & Recovery", href: "/services/cloud#backup-recovery" },
      { icon: Server, label: "Managed IT Operations", href: "/services/Managed-IT" },
      { icon: Users, label: "Vendor Access Governance", href: "/services/governance#identity-access" },
    ],
    compliance: ["NIST 800-82", "ISO 27001", "NERC CIP"],
  },
  {
    id: "media-entertainment",
    icon: Film,
    title: "Media & Entertainment",
    shortDescription: "Creative collaboration with secure content protection and high-performance workflows.",
    fullDescription: "Media and entertainment companies need high-performance storage, secure collaboration, and protection of valuable intellectual property. We help production studios, post-production houses, and creative agencies balance security with the flexibility required for creative workflows.",
    areasOfExpertise: [
      "High-performance storage and backup for large media files",
      "Secure collaboration for remote creative teams",
      "Intellectual property protection and access controls",
      "Digital rights management and content security",
      "Remote production workflow optimization",
      "Vendor and contractor access management",
      "Cloud-based media asset management",
      "Cyber insurance readiness for production companies",
    ],
    serviceMapping: [
      { icon: Cloud, label: "Cloud Storage & Backup", href: "/services/cloud#backup-recovery" },
      { icon: Users, label: "Identity & Access", href: "/services/governance#identity-access" },
      { icon: Shield, label: "Content Security", href: "/services/cybersecurity" },
      { icon: Globe, label: "Edge Security", href: "/services/edge#edge-security" },
      { icon: Server, label: "Managed IT Operations", href: "/services/Managed-IT" },
    ],
    compliance: ["ISO 27001", "NIST 800-53"],
  },
  {
    id: "nonprofit",
    icon: Heart,
    title: "Non-Profit & Government",
    shortDescription: "Mission-focused organizations requiring enterprise-grade security without enterprise overhead.",
    fullDescription: "Non-profits and government organizations serve critical missions with limited resources. We deliver premium security and IT operations at accessible price points, protecting donor data, constituent information, and public-facing web properties.",
    areasOfExpertise: [
      "Donor and constituent data protection",
      "Grant compliance and reporting support",
      "Public website and portal security",
      "Remote workforce enablement",
      "Volunteer and contractor access management",
      "Budget-conscious IT operations",
      "Cyber insurance qualification support",
      "Cloud security for M365 and Google Workspace",
    ],
    serviceMapping: [
      { icon: Globe, label: "Edge Security (Cloudflare)", href: "/services/edge#edge-security" },
      { icon: Server, label: "Managed IT Operations", href: "/services/Managed-IT" },
      { icon: Cloud, label: "Microsoft 365 Security", href: "/services/cloud#m365-cloud" },
      { icon: Shield, label: "Cybersecurity", href: "/services/cybersecurity" },
      { icon: Scale, label: "Compliance Readiness", href: "/services/audit-ready#governance-compliance" },
    ],
    compliance: ["CMMC", "NIST 800-171", "GDPR", "ISO 27001"],
  },
  {
    id: "private-equity",
    icon: Briefcase,
    title: "Private Equity",
    shortDescription: "Portfolio-wide IT standardization and value creation through technology.",
    fullDescription: "Private equity firms need to assess, standardize, and improve IT across portfolio companies. We help PE firms conduct technical due diligence, implement security baselines, and drive operational efficiency that increases enterprise value.",
    areasOfExpertise: [
      "Technical due diligence for acquisitions",
      "Portfolio company IT standardization",
      "Cybersecurity posture assessments",
      "Value creation through technology optimization",
      "Integration planning for add-on acquisitions",
      "Exit readiness and security hygiene",
      "Portfolio-wide vendor management",
      "Recurring revenue IT metrics and reporting",
    ],
    serviceMapping: [
      { icon: ClipboardCheck, label: "IT Assessments", href: "/assessment" },
      { icon: Shield, label: "Cybersecurity", href: "/services/cybersecurity" },
      { icon: Server, label: "Managed IT Operations", href: "/services/Managed-IT" },
      { icon: Scale, label: "Compliance Readiness", href: "/services/audit-ready#governance-compliance" },
      { icon: Users, label: "vCIO Advisory", href: "/services/consulting#vcio" },
    ],
    compliance: ["SOC 2", "ISO 27001", "NIST 800-53"],
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
            <h2 className="text-2xl md:text-3xl font-bold text-white">{industry.title}</h2>
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
        <meta property="og:image" content="https://velcoretech.com/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Industries We Serve | Velcore Tech" />
        <meta name="twitter:description" content="Industry-specific IT and security solutions." />
        <meta name="twitter:image" content="https://velcoretech.com/og-image.jpg" />
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