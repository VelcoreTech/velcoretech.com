import React, { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { BottomBreadcrumbs } from "@/components/common/BottomBreadcrumbs";
import { motion, AnimatePresence } from "framer-motion";

import {
  Activity,
  ArrowRight,
  Briefcase,
  CheckCircle2,
  ChevronDown,
  Clock,
  HardDrive,
  Headset,
  LifeBuoy,
  MailCheck,
  Minus,
  Presentation,
  Radar,
  Scale,
  Server,
  Shield,
  ShieldCheck,
  Users,
  Wifi,
  Cloud,
  Search,
  ClipboardCheck,
  Zap,
  Lock,
  Monitor,
  Globe,
  FileCheck2,
  KeyRound,
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

type Feature = {
  name: string;
  included: boolean;
  icon: React.ElementType;
};

type Plan = {
  name: string;
  price: string;
  description: string;
  features: Feature[];
  popular?: boolean;
  bestFor: string;
};

const plans: Plan[] = [
  {
    name: "Essential",
    price: "125",
    description:
      "Reliable operations and baseline security to stabilize day-to-day IT.",
    bestFor: "Organizations that need predictable IT operations with core security controls.",
    features: [
      { name: "Help desk support + escalation path", included: true, icon: Headset },
      { name: "Microsoft 365 baseline security", included: true, icon: Server },
      { name: "Patch governance (OS + key applications)", included: true, icon: Clock },
      { name: "Standard endpoint protection (EDR)", included: true, icon: ShieldCheck },
      { name: "24/7 operational monitoring (uptime/health)", included: true, icon: Activity },
      { name: "Monthly operational reporting", included: true, icon: Briefcase },

      { name: "Identity & access governance (MFA/CA/admin roles)", included: false, icon: Users },
      { name: "Network & firewall engineering (segmentation/VPN)", included: false, icon: Wifi },
      { name: "Email threat protection", included: false, icon: MailCheck },
      { name: "Edge security (DNS/WAF/DDoS)", included: false, icon: Radar },
      { name: "Backup & recovery validation (restore testing)", included: false, icon: HardDrive },
      { name: "Governance & compliance readiness support", included: false, icon: Scale },
      { name: "Penetration testing (network/web/API)", included: false, icon: Shield },
      { name: "Incident response planning + tabletop", included: false, icon: LifeBuoy },
    ],
  },
  {
    name: "Secure",
    price: "175",
    description:
      "Hardened identity, email, and detection foundations for risk-sensitive teams.",
    bestFor: "Organizations that require stronger security posture and proactive threat detection.",
    features: [
      { name: "Everything in Essential", included: true, icon: Server },
      { name: "Identity & access governance (MFA/CA/admin separation)", included: true, icon: Users },
      { name: "Advanced endpoint security workflows", included: true, icon: ShieldCheck },
      { name: "Email threat protection", included: true, icon: MailCheck },
      { name: "Monitoring + detection tuning (high-signal alerts)", included: true, icon: Radar },
      { name: "Quarterly security review", included: true, icon: ShieldCheck },
      { name: "Security policy standards (baseline)", included: true, icon: Scale },
      { name: "Security awareness / phishing training", included: true, icon: Users },
      { name: "Edge security (DNS hardening + WAF baseline)", included: true, icon: Radar },

      { name: "Network & firewall engineering (segmentation/VPN)", included: false, icon: Wifi },
      { name: "Backup & recovery validation (restore testing)", included: false, icon: HardDrive },
      { name: "Compliance readiness support", included: false, icon: Scale },
      { name: "vCIO strategic advisory", included: false, icon: Presentation },
      { name: "Penetration testing (network/web/API)", included: false, icon: Shield },
      { name: "Incident response planning + tabletop", included: false, icon: LifeBuoy },
      { name: "Priority SLA response", included: false, icon: Zap },
    ],
    popular: true,
  },
  {
    name: "Complete",
    price: "250",
    description:
      "Full IT partnership: governance, resilience, edge, and executive-grade accountability.",
    bestFor: "Organizations seeking comprehensive IT management with strategic guidance and compliance readiness.",
    features: [
      { name: "Everything in Secure", included: true, icon: Server },
      { name: "Governance & compliance readiness support", included: true, icon: Scale },
      { name: "SOC 2 readiness support (Type I/II)", included: true, icon: ShieldCheck },
      { name: "Backup & recovery validation (restore testing)", included: true, icon: HardDrive },
      { name: "vCIO strategic advisory", included: true, icon: Presentation },
      { name: "Vendor management support", included: true, icon: Users },
      { name: "Priority SLA response", included: true, icon: Zap },
      { name: "Edge security (DNS/WAF/DDoS + ZTNA patterns)", included: true, icon: Radar },
      { name: "Custom integrations / advanced workflows", included: true, icon: Wifi },
      { name: "Budget planning assistance", included: true, icon: Briefcase },

      { name: "Penetration testing (network/web/API)", included: false, icon: Shield },
      { name: "Incident response planning + tabletop", included: false, icon: LifeBuoy },
    ],
  },
];

type CompareValue =
  | { type: "check" }
  | { type: "dash" }
  | { type: "addon"; value?: string };

type CompareRow = {
  id: string;
  label: string;
  icon: React.ElementType;
  essential: CompareValue;
  secure: CompareValue;
  complete: CompareValue;
  href?: string;
};

const compareRows: CompareRow[] = [
  // === CORE IT OPERATIONS ===
  { id: "Managed-IT", label: "Managed IT Operations", icon: Server, essential: { type: "check" }, secure: { type: "check" }, complete: { type: "check" }, href: "/services/Managed-IT" },
  { id: "endpoint", label: "Endpoint Management & Security", icon: Monitor, essential: { type: "check" }, secure: { type: "check" }, complete: { type: "check" }, href: "/services/endpoint" },
  { id: "backup-recovery", label: "Backup, Recovery & Ransomware Readiness", icon: HardDrive, essential: { type: "addon" }, secure: { type: "addon" }, complete: { type: "check" }, href: "/services/cloud#backup-recovery" },

  // === IDENTITY & ACCESS ===
  { id: "identity-access", label: "Identity & Access Management", icon: KeyRound, essential: { type: "addon" }, secure: { type: "check" }, complete: { type: "check" }, href: "/services/consulting#identity-access" },

  // === CLOUD & PRODUCTIVITY ===
  { id: "m365-cloud", label: "Microsoft 365 & Cloud Security", icon: Cloud, essential: { type: "check" }, secure: { type: "check" }, complete: { type: "check" }, href: "/services/cloud#m365-cloud" },

  // === NETWORK INFRASTRUCTURE ===
  { id: "network-firewall", label: "Network & Firewall Engineering", icon: Wifi, essential: { type: "addon" }, secure: { type: "addon" }, complete: { type: "check" }, href: "/services/networking#network-firewall" },

  // === SECURITY SERVICES - Add-on for Essential/Secure, included in Secure/Complete ===
  { id: "governance-compliance", label: "Governance & Compliance Readiness", icon: FileCheck2, essential: { type: "addon" }, secure: { type: "addon" }, complete: { type: "check" }, href: "/services/audit-ready#governance-compliance" },
  { id: "edge-security", label: "Edge Security (DNS/WAF/DDoS)", icon: Globe, essential: { type: "addon" }, secure: { type: "check" }, complete: { type: "check" }, href: "/services/edge#edge-security" },
  { id: "security-monitoring", label: "Security Monitoring & Detection (SOC I/II)", icon: Search, essential: { type: "addon" }, secure: { type: "check" }, complete: { type: "check" }, href: "/services/cybersecurity#security-operations" },
  { id: "incident-readiness", label: "Incident Readiness & Response Planning", icon: ClipboardCheck, essential: { type: "addon" }, secure: { type: "check" }, complete: { type: "check" }, href: "/services/cybersecurity#incident-readiness" },
  { id: "email-security", label: "Email Threat Protection", icon: MailCheck, essential: { type: "addon" }, secure: { type: "check" }, complete: { type: "check" }, href: "/services/cybersecurity#email-security" },

  // === CONSULTING & STRATEGY - Add-on for Essential/Secure, included in Complete ===
  { id: "vcio", label: "vCIO Strategic Advisory", icon: Presentation, essential: { type: "addon" }, secure: { type: "addon" }, complete: { type: "check" }, href: "/services/consulting#vcio" },
  { id: "vendor-management", label: "Vendor Management Support", icon: Users, essential: { type: "addon" }, secure: { type: "addon" }, complete: { type: "check" }, href: "/services/consulting#vendor-management" },
  { id: "budget-planning", label: "Budget & Capacity Planning", icon: Briefcase, essential: { type: "addon" }, secure: { type: "addon" }, complete: { type: "check" }, href: "/services/consulting#budget-planning" },

  // === PROFESSIONAL SERVICES - Add-on for all plans ===
  { id: "penetration-testing", label: "Penetration Testing (Networks/Web Apps/APIs)", icon: ShieldCheck, essential: { type: "addon" }, secure: { type: "addon" }, complete: { type: "addon" }, href: "/services/cybersecurity#penetration-testing" },
  { id: "incident-response-project", label: "Incident Response Planning + Tabletop", icon: LifeBuoy, essential: { type: "addon" }, secure: { type: "addon" }, complete: { type: "addon" }, href: "/services/cybersecurity#incident-readiness" },
];

function CompareCell({ value }: { value: CompareValue }) {
  if (value.type === "check") {
    return (
      <div className="flex justify-center">
        <CheckCircle2 className="h-5 w-5 text-primary" />
      </div>
    );
  }
  
  if (value.type === "dash") {
    return (
      <div className="flex justify-center">
        <Minus className="h-5 w-5 text-muted-foreground" />
      </div>
    );
  }
  
  return (
    <div className="flex flex-col items-center justify-center gap-1">
      <span className="inline-flex rounded-md border border-primary/20 bg-primary/5 px-2.5 py-1 text-[11px] font-semibold text-primary">
        Add-on
      </span>
      {value.value && (
        <span className="text-[10px] text-muted-foreground">{value.value}</span>
      )}
    </div>
  );
}

const additionalInfo = [
  "Projects and hardware billed separately",
  "Month-to-month and annual options available",
  "Nonprofit pricing available (premium service, mission-aligned rates)",
  "All plans include remote-first delivery; on-site available as needed",
];

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);

    onChange();

    if (typeof mql.addEventListener === "function") {
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    }

    mql.addListener(onChange);
    return () => mql.removeListener(onChange);
  }, [query]);

  return matches;
}

function FeatureRow({
  included,
  label,
  icon: Icon,
}: {
  included: boolean;
  label: string;
  icon: React.ElementType;
}) {
  return (
    <li
      className={[
        "flex items-start gap-3 rounded-lg px-3 py-2",
        "transition-colors duration-200",
        "hover:bg-primary/5",
        included ? "" : "opacity-80",
      ].join(" ")}
    >
      <span className="mt-0.5 flex-shrink-0">
        {included ? (
          <CheckCircle2 className="h-4 w-4 text-primary" />
        ) : (
          <span className="text-muted-foreground">—</span>
        )}
      </span>

      <div className="flex items-start gap-2 min-w-0">
        <Icon className="h-4 w-4 text-primary/70 shrink-0 mt-0.5" />
        <span className={included ? "leading-relaxed text-sm" : "leading-relaxed text-sm text-muted-foreground"}>
          {label}
        </span>
      </div>
    </li>
  );
}

function PlanCard({ plan, index }: { plan: Plan; index: number }) {
  const included = useMemo(
    () => plan.features.filter((f) => f.included),
    [plan.features]
  );
  const addOns = useMemo(
    () => plan.features.filter((f) => !f.included),
    [plan.features]
  );

  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [addonsOpen, setAddonsOpen] = useState(false);

  useEffect(() => {
    setAddonsOpen(isDesktop);
  }, [isDesktop]);

  const panelId = `addons-${plan.name.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      className={[
        "relative rounded-3xl p-8 flex h-full flex-col",
        GLOW_CARD,
        plan.popular
          ? "bg-gradient-to-b from-primary/10 to-card border-primary/30 shadow-xl shadow-primary/5"
          : "bg-card/70",
      ].join(" ")}
    >
      {plan.popular && (
        <span className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-xs font-semibold bg-primary text-primary-foreground shadow-lg">
          Most Popular
        </span>
      )}

      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
        <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{plan.description}</p>

        <div className="flex items-baseline justify-center gap-2">
          <span className="text-5xl font-bold text-primary">${plan.price}</span>
          <span className="text-muted-foreground text-sm">/user/mo</span>
        </div>
        <div className="mt-1 text-xs text-muted-foreground">Starting at</div>
        
        <div className="mt-4 p-3 rounded-xl bg-primary/5 border border-primary/10">
          <p className="text-xs text-muted-foreground">
            <span className="font-semibold text-foreground">Best fit: </span>
            {plan.bestFor}
          </p>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <div>
          <div className="text-xs font-semibold tracking-wide uppercase text-muted-foreground mb-3 flex items-center gap-2">
            <Lock className="h-3 w-3" />
            Included
          </div>

          <ul className="space-y-1">
            {included.map((f) => (
              <FeatureRow key={f.name} included label={f.name} icon={f.icon} />
            ))}
          </ul>
        </div>

        {addOns.length > 0 && (
          <div className="mt-6 rounded-2xl border border-border bg-background/60 overflow-hidden">
            <button
              type="button"
              onClick={() => setAddonsOpen((v) => !v)}
              aria-expanded={addonsOpen}
              aria-controls={panelId}
              className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left hover:bg-primary/5 transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span
                  className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-border bg-card/70 text-foreground shrink-0"
                  aria-hidden="true"
                >
                  {addonsOpen ? "−" : "+"}
                </span>

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <div className="text-xs font-semibold tracking-wide uppercase text-muted-foreground">
                      Optional add-ons
                    </div>
                    <span className="text-xs text-muted-foreground">({addOns.length})</span>
                  </div>
                  <div className="text-xs text-muted-foreground/80 mt-1">
                    Scoped separately after assessment
                  </div>
                </div>
              </div>

              <ChevronDown
                className={[
                  "h-5 w-5 text-muted-foreground transition-transform shrink-0",
                  addonsOpen ? "rotate-180" : "",
                ].join(" ")}
                aria-hidden="true"
              />
            </button>

            <AnimatePresence initial={false}>
              {addonsOpen && (
                <motion.div
                  id={panelId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="overflow-hidden"
                >
                  <div className="px-3 pb-3">
                    <div className="text-xs text-muted-foreground mb-3 px-2 italic">
                      We recommend only what matches your environment and risk profile
                    </div>

                    <ul className="space-y-0.5">
                      {addOns.map((f) => (
                        <FeatureRow key={f.name} included={false} label={f.name} icon={f.icon} />
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      <div className="mt-7">
        <Button
          variant={plan.popular ? "gradient" : "outline-glow"}
          className="w-full"
          size="lg"
          asChild
        >
          <Link to={`/contact${getTrackingParams('pricing', 'plan_card', plan.name.toLowerCase() + '_quote')}`} className="inline-flex w-full items-center justify-center gap-2">
            Get a Custom Quote
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </motion.div>
  );
}

export default function Pricing() {
  return (
    <Layout>
      <Helmet>
        <title>Pricing | Velcore Tech</title>
        <meta
          name="description"
          content="Transparent managed IT and security pricing. Compare Essential, Secure, and Complete plans—built for predictable IT operations, stronger identity, and measurable security."
        />
        <link rel="canonical" href="https://velcoretech.com/pricing" />
        <meta property="og:title" content="Pricing | Velcore Tech" />
        <meta
          property="og:description"
          content="Compare managed IT and security plans: Essential, Secure, and Complete—clear scope, predictable outcomes, no hidden fees."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://velcoretech.com/pricing" />
        <meta property="og:image" content="https://velcoretech.com/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Pricing | Velcore Tech" />
        <meta name="twitter:description" content="Transparent pricing for managed IT and security services." />
        <meta name="twitter:image" content="https://velcoretech.com/og-image.png" />
      </Helmet>

      {/* HERO SECTION */}
      <section className="relative overflow-hidden hero-gradient pt-24 pb-12">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-hero-glow opacity-40 pointer-events-none" />
        <div className="container-tight relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-primary/10 text-primary border border-primary/20 mb-4">
              <Scale className="h-4 w-4" />
              <span>Pricing</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold tracking-tight mb-4">
              Transparent Pricing.
              <span className="text-gradient block mt-2">Predictable Outcomes.</span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Choose the plan that matches your risk profile and operating needs. 
              No hidden fees—just clear scope, accountability, and measurable results.
            </p>
          </div>
        </div>
      </section>

      {/* PRICING CARDS */}
      <section className="py-20 bg-background">
        <div className="container-tight">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <PlanCard key={plan.name} plan={plan} index={index} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-14 text-center"
          >
            <div className="inline-flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
              {additionalInfo.map((info) => (
                <span key={info} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  {info}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="py-20 bg-card">
        <div className="container-tight">
          <SectionHeader
            badge="Plan Comparison"
            title="Side-by-Side Feature Comparison"
            description="See exactly what's included in each plan. Secure is the recommended starting point for most teams. Move to Complete when governance, compliance, or priority response becomes a requirement."
          />

          {/* MOBILE VIEW - swipeable table */}
          <div className="mt-10 md:hidden">
            <div className="mb-3 flex items-center justify-between text-sm text-muted-foreground">
              <span>Swipe to compare plans</span>
              <span className="inline-flex items-center gap-2">
                Swipe <ArrowRight className="h-4 w-4" />
              </span>
            </div>

            <div
              className={[
                "rounded-3xl border border-border bg-background/60",
                "overflow-x-auto overflow-y-hidden",
                "[-webkit-overflow-scrolling:touch]",
              ].join(" ")}
            >
              <table className="min-w-[780px] w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-4 px-5 font-semibold">Capability</th>
                    <th className="text-center py-4 px-5 font-semibold">Essential</th>
                    <th className="text-center py-4 px-5 font-semibold">
                      <div className="inline-flex flex-col items-center justify-center leading-none">
                        <span className="text-primary">Secure</span>
                        <span className="mt-1 rounded-full bg-primary text-primary-foreground text-[11px] font-semibold px-3 py-1">
                          Recommended
                        </span>
                      </div>
                    </th>
                    <th className="text-center py-4 px-5 font-semibold">Complete</th>
                  </tr>
                </thead>

                <tbody className="text-sm">
                  {compareRows.map((row, idx) => (
                    <tr
                      key={row.id}
                      className={[
                        "border-b border-border/60",
                        idx % 2 === 1 ? "bg-card/30" : "",
                      ].join(" ")}
                    >
                      <td className="py-3 px-5">
                        <div className="flex items-start gap-3">
                          <row.icon className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                          {row.href ? (
                            <Link
                              to={`${row.href}${getTrackingParams('pricing', 'compare_table', row.id)}`}
                              className="inline-flex items-center gap-2 hover:underline underline-offset-4"
                            >
                              <span className="font-medium">{row.label}</span>
                              <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
                            </Link>
                          ) : (
                            <span className="font-medium">{row.label}</span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-5">
                        <CompareCell value={row.essential} />
                      </td>
                      <td className="py-3 px-5 bg-primary/5">
                        <CompareCell value={row.secure} />
                      </td>
                      <td className="py-3 px-5">
                        <CompareCell value={row.complete} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Final coverage is confirmed during assessment to match your environment and risk profile.
            </p>
          </div>

          {/* DESKTOP VIEW */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-10 hidden md:block"
          >
            <div className="overflow-hidden rounded-3xl border border-border bg-background/60">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-4 px-6 font-semibold">Capability</th>
                    <th className="text-center py-4 px-6 font-semibold">Essential</th>
                    <th className="text-center py-4 px-6 font-semibold">
                      <div className="inline-flex flex-col items-center justify-center leading-none">
                        <span className="text-primary font-semibold">Secure</span>
                        <span className="mt-1 rounded-full bg-primary text-primary-foreground text-[10px] font-semibold px-2.5 py-0.5">
                          Recommended
                        </span>
                      </div>
                    </th>
                    <th className="text-center py-4 px-6 font-semibold">Complete</th>
                  </tr>
                </thead>

                <tbody className="text-sm">
                  {compareRows.map((row, idx) => (
                    <tr
                      key={row.id}
                      className={[
                        "border-b border-border/60",
                        "transition-colors",
                        "hover:bg-primary/5",
                        idx % 2 === 1 ? "bg-card/30" : "",
                      ].join(" ")}
                    >
                      <td className="py-3.5 px-6">
                        <div className="flex items-start gap-3">
                          <row.icon className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                          <div className="min-w-0">
                            {row.href ? (
                              <Link
                                to={`${row.href}${getTrackingParams('pricing', 'compare_table', row.id)}`}
                                className="inline-flex items-center gap-2 hover:underline underline-offset-4"
                              >
                                <span className="font-medium">{row.label}</span>
                                <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
                              </Link>
                            ) : (
                              <div className="font-medium">{row.label}</div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-6">
                        <CompareCell value={row.essential} />
                      </td>
                      <td className="py-3.5 px-6 bg-primary/5">
                        <CompareCell value={row.secure} />
                      </td>
                      <td className="py-3.5 px-6">
                        <CompareCell value={row.complete} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <p className="text-sm text-muted-foreground">
                Need help choosing? We'll map your environment to the right tier during an assessment.
              </p>
            </div>
          </motion.div>
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
                  Not Sure Which Plan Fits Your Business?
                </h2>
                <p className="text-muted-foreground">
                  Start with an assessment—we'll validate your current posture and recommend the right plan based on your environment and risk profile.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="outline-glow" size="lg" asChild>
                  <Link to={`/assessment${getTrackingParams('pricing', 'final_cta', 'it_assessment')}`}>
                    Start Assessment <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline-glow" size="lg" asChild>
                  <Link to={`/contact${getTrackingParams('pricing', 'final_cta', 'schedule_consultation')}`}>
                    Talk to us <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BottomBreadcrumbs items={[{ name: "Home", to: "/" }, { name: "Pricing" }]} />
    </Layout>
  );
}