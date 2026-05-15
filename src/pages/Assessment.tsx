import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { BottomBreadcrumbs } from "@/components/common/BottomBreadcrumbs";

import {
  Shield,
  ShieldCheck,
  FileCheck,
  Lock,
  Globe,
  ClipboardCheck,
  ArrowRight,
  CheckCircle2,
  Send,
  Calendar,
  Users as UsersIcon,
  Laptop,
  Cloud,
  Network,
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SectionHeader } from "@/components/common/SectionHeader";
import { useToast } from "@/components/hooks/use-toast";
import { 
  getTrackingParams,
  getTrackingInfo, 
  formatTrackingForEmail,
  debugTracking 
} from "@/components/common/Tracking";

const SCHEDULER_URL = "https://cal.com/velcoreit";
const OG_IMAGE = "https://velcoretech.com/og-image.png";
const CANONICAL = "https://velcoretech.com/assessment";

/**
 * Client-side security goals:
 * - Reduce XSS/injection risk *downstream* (logs, emails, CRMs, ticket systems)
 * - Reduce abusive payloads / log poisoning / parser edge-cases
 * - Prevent easy tampering of select fields (whitelist values)
 *
 * IMPORTANT: Client-side checks are not security boundaries.
 * Backend (/api/contact) must enforce:
 * - strict validation + sanitization
 * - output escaping (email/CRM)
 * - rate limiting + bot mitigation
 * - CSP headers
 */

// -----------------------
// Security-focused limits
// -----------------------
const MAX_NAME_LEN = 80;
const MAX_COMPANY_LEN = 120;
const MAX_EMAIL_LEN = 254;
const MAX_PHONE_LEN = 20; // formatted phone, optional
const MAX_TIMELINE_LEN = 80;
const MAX_NOTES_LEN = 2000; // textarea freeform
const MAX_HONEYPOT_LEN = 120;

// -----------------------
// Enumerated options (use as const => allows whitelisting)
// -----------------------
const userCounts = [
  "1-10 users",
  "11-25 users",
  "26-50 users",
  "51-100 users",
  "100+ users",
] as const;

const locations = ["1 location", "2-3 locations", "4-10 locations", "10+ locations"] as const;

const itStack = ["Microsoft 365", "Google Workspace", "Hybrid / Both", "Not sure"] as const;

const endpointMgmt = ["Intune", "RMM (other)", "None / ad-hoc", "Not sure"] as const;

const securityTools = ["EDR/XDR deployed", "Basic antivirus only", "Not sure", "None"] as const;

const backups = [
  "Yes (managed & monitored)",
  "Yes (but not sure if tested)",
  "No",
  "Not sure",
] as const;

const complianceNeeds = [
  "None / general security",
  "HIPAA",
  "SOC 2",
  "PCI",
  "Cyber insurance requirements",
  "Customer security questionnaires",
  "Other",
] as const;

const primaryGoals = [
  "Reduce downtime and improve reliability",
  "Improve cybersecurity posture",
  "Microsoft 365 security and governance",
  "Backup / disaster recovery readiness",
  "Compliance readiness (HIPAA/SOC2/PCI)",
  "Prepare for growth (scale, new hires, new sites)",
  "Other",
] as const;

const yesNoUnsure = ["Yes", "No", "Not sure"] as const;

const dnsProviders = [
  "Cloudflare",
  "AWS Route 53",
  "Google Domains / Squarespace",
  "GoDaddy",
  "Namecheap",
  "Other",
  "Not sure",
] as const;

const firewallVendors = [
  "Cisco Meraki",
  "Cisco",
  "Fortinet",
  "Palo Alto",
  "SonicWall",
  "Ubiquiti",
  "pfSense/Netgate",
  "Other",
  "Not sure",
] as const;

// backend-compatible payload (DO NOT change shape)
type ContactCompatiblePayload = {
  name: string;
  company: string;
  email: string;
  phone?: string;
  users: string;
  challenge: string;
  message?: string;
  website?: string; // honeypot
};

const s = (v: FormDataEntryValue | null) => (v ? String(v) : "");

// -----------------------
// Sanitizers / validators
// -----------------------
function stripControlChars(input: string) {
  // Removes null bytes + other ASCII control chars that can break logs/parsers.
  // Keeps \t \n \r (we handle CRLF separately where needed).
  return input.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "");
}

function collapseWhitespace(input: string) {
  return input.replace(/\s+/g, " ").trim();
}

function clamp(input: string, max: number) {
  return input.length > max ? input.slice(0, max) : input;
}

function noCRLF(input: string) {
  // Prevents header injection / log splitting
  return input.replace(/[\r\n]+/g, " ").trim();
}

function safeText(input: string, max: number) {
  // Single-line safe text (names, company, timeline, email)
  return clamp(collapseWhitespace(stripControlChars(noCRLF(input))), max);
}

function safeMultiline(input: string, max: number) {
  // Multi-line allowed but removes control chars + clamps.
  // Notes are included in a message template and may end up in tickets/emails.
  const cleaned = stripControlChars(input).trim();
  return cleaned.length > max ? cleaned.slice(0, max) : cleaned;
}

function isLikelyEmail(email: string) {
  // Simple sanity check. Backend still MUST validate fully.
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(email);
}

function assertOneOf<T extends readonly string[]>(
  value: string,
  allowed: T,
  fallback: T[number]
) {
  // Prevent select tampering (e.g., sending arbitrary strings via DevTools)
  return (allowed as readonly string[]).includes(value) ? (value as T[number]) : fallback;
}

/** Formats as 111-111-1111 while typing */
function formatUSPhone(raw: string) {
  const digits = raw.replace(/\D/g, "").slice(0, 10);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
}

export default function Assessment() {
  const { toast } = useToast();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Controlled input
  const [phone, setPhone] = useState("");

  // Controlled selects
  const [users, setUsers] = useState("");
  const [siteCount, setSiteCount] = useState("");
  const [stack, setStack] = useState("");
  const [mdm, setMdm] = useState("");
  const [secTools, setSecTools] = useState("");
  const [backupState, setBackupState] = useState("");
  const [compliance, setCompliance] = useState("");
  const [goal, setGoal] = useState("");

  // Edge security (optional)
  const [hasWebsite, setHasWebsite] = useState("Not sure");
  const [dnsProvider, setDnsProvider] = useState("Not sure");
  const [usesCloudflare, setUsesCloudflare] = useState("Not sure");
  const [wafDdOS, setWafDdOS] = useState("Not sure");

  // Firewall vendor (optional, only shown if 2+ locations)
  const [firewallVendor, setFirewallVendor] = useState("Not sure");

  const showNetworkFields = !!siteCount && siteCount !== "1 location";
  const showEdgeFields = hasWebsite === "Yes";

  const requiredOk = useMemo(() => {
    // Firewall vendor is intentionally NOT required
    return (
      !!users &&
      !!siteCount &&
      !!stack &&
      !!mdm &&
      !!secTools &&
      !!backupState &&
      !!compliance &&
      !!goal
    );
  }, [users, siteCount, stack, mdm, secTools, backupState, compliance, goal]);

  useEffect(() => {
    // If they don't have a public website/domain, reset edge sub-questions.
    if (hasWebsite !== "Yes") {
      setDnsProvider("Not sure");
      setUsesCloudflare("Not sure");
      setWafDdOS("Not sure");
    }
  }, [hasWebsite]);

  const resetAll = (form?: HTMLFormElement) => {
    setPhone("");

    setUsers("");
    setSiteCount("");
    setStack("");
    setMdm("");
    setSecTools("");
    setBackupState("");
    setCompliance("");
    setGoal("");

    setHasWebsite("Not sure");
    setDnsProvider("Not sure");
    setUsesCloudflare("Not sure");
    setWafDdOS("Not sure");

    setFirewallVendor("Not sure");

    form?.reset();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Prevent double submit (click spam / racing)
    if (isSubmitting) return;

    if (!requiredOk) {
      toast({
        title: "Missing required fields",
        description: "Please complete the required selections so we can tailor the assessment.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    /**
     * Input handling hardening:
     * - normalize whitespace
     * - strip control characters (null bytes, etc.)
     * - strip CRLF from single-line fields (prevents header injection / log splitting)
     * - clamp lengths to reduce abuse / log poisoning
     */
    const name = safeText(s(formData.get("name")), MAX_NAME_LEN);
    const company = safeText(s(formData.get("company")), MAX_COMPANY_LEN);
    const emailRaw = safeText(s(formData.get("email")).toLowerCase(), MAX_EMAIL_LEN);
    const phoneRaw = phone || s(formData.get("phone"));
    const phoneSafe = clamp(stripControlChars(phoneRaw).trim(), MAX_PHONE_LEN);

    const timeline = safeText(s(formData.get("timeline")), MAX_TIMELINE_LEN);
    const notes = safeMultiline(s(formData.get("message")), MAX_NOTES_LEN);

    // Honeypot: clamp and keep (bot trap). Backend should reject if non-empty.
    const honeypot = safeText(s(formData.get("website")), MAX_HONEYPOT_LEN);

    // Basic email sanity check (backend must still enforce)
    if (!isLikelyEmail(emailRaw)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address (e.g., name@company.com).",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    /**
     * Select tamper hardening:
     * Even if someone mutates state via DevTools, only known values are sent.
     */
    const usersSafe = assertOneOf(users, userCounts, userCounts[0]);
    const siteCountSafe = assertOneOf(siteCount, locations, locations[0]);
    const stackSafe = assertOneOf(stack, itStack, "Not sure");
    const mdmSafe = assertOneOf(mdm, endpointMgmt, "Not sure");
    const secToolsSafe = assertOneOf(secTools, securityTools, "Not sure");
    const backupStateSafe = assertOneOf(backupState, backups, "Not sure");
    const complianceSafe = assertOneOf(compliance, complianceNeeds, "None / general security");
    const goalSafe = assertOneOf(goal, primaryGoals, "Other");

    const hasWebsiteSafe = assertOneOf(hasWebsite, yesNoUnsure, "Not sure");
    const dnsProviderSafe = assertOneOf(dnsProvider, dnsProviders, "Not sure");
    const usesCloudflareSafe = assertOneOf(usesCloudflare, yesNoUnsure, "Not sure");
    const wafDdOSSafe = assertOneOf(wafDdOS, yesNoUnsure, "Not sure");

    const firewallVendorSafe = assertOneOf(firewallVendor, firewallVendors, "Not sure");

    /**
     * Payload: same structure, same endpoint, same submission mechanism.
     * NOTE: XSS risk is primarily downstream (emails/CRMs/logs).
     * Backend should escape/sanitize when rendering anywhere.
     */
    const payload: ContactCompatiblePayload = {
      name,
      company,
      email: emailRaw,
      phone: phoneSafe || undefined,

      users: usersSafe,
      challenge: "IT Assessment",

      message: `
Lead Source: IT Assessment

Basics
- Locations: ${siteCountSafe}
- Productivity Stack: ${stackSafe}
- Endpoint Management: ${mdmSafe}
- Endpoint Security: ${secToolsSafe}
- Backups: ${backupStateSafe}
- Compliance Needs: ${complianceSafe}
- Primary Goal: ${goalSafe}

Edge Security (DNS / Web Protection)
- Public Website / Domain: ${hasWebsiteSafe}
- DNS Provider: ${showEdgeFields ? dnsProviderSafe : "N/A"}
- Using Cloudflare: ${showEdgeFields ? usesCloudflareSafe : "N/A"}
- WAF / DDoS Protection: ${showEdgeFields ? wafDdOSSafe : "N/A"}

Network (if multi-site)
- Firewall / Network Vendor: ${showNetworkFields ? firewallVendorSafe : "N/A"}

Timeline: ${timeline || "N/A"}

Notes:
${notes || "N/A"}
`.trim(),

      website: honeypot,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // keeps response parsing predictable; not required but harmless
          Accept: "application/json,text/plain,*/*",
        },
        // Safe fetch hardening (doesn't change behavior/features)
        cache: "no-store",
        referrerPolicy: "same-origin",
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.text().catch(() => "");
        let msg = "Unable to submit your assessment request. Please try again.";

        // Defensive error parsing: prevent huge error bodies or control chars in toast
        try {
          const parsed = JSON.parse(body);
          msg = safeText(String(parsed?.error || parsed?.message || msg), 200);
        } catch {
          if (body) msg = safeText(body, 200);
        }

        throw new Error(msg);
      }

      setSubmitted(true);
      resetAll(form);

      toast({
        title: "Assessment request sent",
        description: "Thanks—our team will respond within 1 business day with next steps.",
      });
    } catch (err: any) {
      toast({
        title: "Request not sent",
        description: safeText(err?.message || "Please try again, or email info@velcoretech.com.", 220),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <Helmet>
        <title>IT & Security Assessment | Velcore Tech</title>
        <meta
          name="description"
          content="Start with an IT, security & edge assessment. We baseline identity, endpoints, Microsoft 365, network controls, backups, and DNS/Cloudflare—then deliver a prioritized remediation roadmap."
        />
        <link rel="canonical" href={CANONICAL} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Velcore Tech" />
        <meta property="og:title" content="IT & Security Assessment | Velcore Tech" />
        <meta
          property="og:description"
          content="Baseline identity, endpoints, M365, network controls, backups, and DNS/Cloudflare edge posture—then get a prioritized plan."
        />
        <meta property="og:url" content={CANONICAL} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:image:alt"
          content="Velcore Tech - Security-First Managed IT & Cybersecurity"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={OG_IMAGE} />
      </Helmet>

      {/* Hero */}
      <section className="section-padding bg-background relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-hero-glow pointer-events-none" />

        <div className="container-tight relative z-10">
          <SectionHeader
            badge="IT Assessment"
            title="Let's evaluate your enviorment"
            description="Baseline your posture across identity, endpoints, cloud, networks, and edge security (DNS/Cloudflare). Get clear findings and a prioritized plan—no bloat, no pressure."
          />

          {/* Compliance frameworks */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/5 border border-primary/10">
              <Shield className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">HIPAA</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/5 border border-primary/10">
              <FileCheck className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">NIST 800-53</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/5 border border-primary/10">
              <Lock className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">ISO 27001</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/5 border border-primary/10">
              <ShieldCheck className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">SOC 2</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/5 border border-primary/10">
              <Globe className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">GDPR</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/5 border border-primary/10">
              <Globe className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">PCI DSS</span>
            </div>
          </div>
        </div>
      </section>

      {/* What you get + Form */}
      <section className="pb-20 bg-background">
        <div className="container-tight">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* left */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                What You’ll Receive
              </h2>

              <p className="text-muted-foreground leading-relaxed mb-8">
                This assessment establishes a defensible baseline. We review
                identity controls, endpoint posture, cloud security, recovery
                readiness, and edge security (DNS/Cloudflare)—then deliver clear
                priorities you can act on.
              </p>

              <ul className="space-y-3">
                {[
                  "Structured intake and documented environment overview",
                  "Identity & Access baseline review (MFA, RBAC)",
                  "Conditional Access and authentication posture evaluation",
                  "Administrative account governance review",
                  "Endpoint management and patching posture analysis",
                  "Device compliance and security configuration review",
                  "Microsoft 365 tenant security baseline evaluation",
                  "Email security (anti-phish, impersonation, external exposure)",
                  "SharePoint / OneDrive external sharing exposure review",
                  "Backup coverage validation and restore-readiness check",
                  "Ransomware recovery posture and gap identification",
                  "Firewall policy and network segmentation review",
                  "VLAN structure and internal isolation assessment",
                  "Remote access (VPN / ZTNA) architecture evaluation",
                  "DNS configuration and domain security posture review",
                  "Cloudflare / edge protection hardening review (if applicable)",
                  "Logging visibility and alerting maturity assessment",
                  "Governance and documentation maturity evaluation",
                  "Cyber insurance control alignment readiness check",
                  "Network, API, and web application penetration testing",
                  "Prioritized remediation roadmap with recommended operating model",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 p-6 rounded-2xl bg-card border border-border">
                <h4 className="font-semibold mb-2">Deliverable Format</h4>
                <p className="text-sm text-muted-foreground">
                  You receive a concise written summary outlining risk posture,
                  reliability gaps, and prioritized recommendations. This can
                  stand alone—or serve as the foundation for a structured
                  managed services engagement.
                </p>
              </div>

              <div className="mt-10 p-6 rounded-2xl bg-card border border-border">
                <h3 className="font-semibold mb-2">Prefer to talk first?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Book a short conversation and we’ll gather the details live.
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button variant="outline-glow" asChild>
                    <a href={SCHEDULER_URL} target="_blank" rel="noreferrer">
                      <Calendar className="mr-2 h-4 w-4" />
                      Schedule a Conversation
                    </a>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/pricing">
                      View Pricing
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* right */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="p-8 md:p-10 rounded-3xl bg-card border border-border">
                {submitted ? (
                  <div className="text-center py-14">
                    <div className="inline-flex p-4 rounded-full bg-primary/10 text-primary mb-6">
                      <CheckCircle2 className="h-12 w-12" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">
                      Assessment request received.
                    </h3>
                    <p className="text-muted-foreground max-w-md mx-auto mb-8">
                      We’ll review your details and respond within 1 business
                      day with next steps.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <Button variant="outline-glow" asChild>
                        <a
                          href={SCHEDULER_URL}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <Calendar className="mr-2 h-4 w-4" />
                          Schedule a Conversation
                        </a>
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setSubmitted(false)}
                      >
                        Submit Another Assessment
                      </Button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Honeypot (bot trap) - backend should reject if non-empty */}
                    <div className="hidden">
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        name="website"
                        autoComplete="off"
                        tabIndex={-1}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          required
                          className="bg-background"
                          // Soft limit (still validated + clamped in JS)
                          maxLength={MAX_NAME_LEN}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company">Company Name *</Label>
                        <Input
                          id="company"
                          name="company"
                          required
                          className="bg-background"
                          maxLength={MAX_COMPANY_LEN}
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          className="bg-background"
                          maxLength={MAX_EMAIL_LEN}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          inputMode="numeric"
                          autoComplete="tel"
                          className="bg-background"
                          value={phone}
                          onChange={(e) => setPhone(formatUSPhone(e.target.value))}
                          maxLength={MAX_PHONE_LEN}
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label>Number of Users *</Label>
                        <Select value={users} onValueChange={setUsers}>
                          <SelectTrigger className="bg-background" tabIndex={0}>
                            <SelectValue placeholder="Select range" />
                          </SelectTrigger>
                          <SelectContent>
                            {userCounts.map((count) => (
                              <SelectItem key={count} value={count}>
                                {count}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Number of Locations *</Label>
                        <Select value={siteCount} onValueChange={setSiteCount}>
                          <SelectTrigger className="bg-background" tabIndex={0}>
                            <SelectValue placeholder="Select range" />
                          </SelectTrigger>
                          <SelectContent>
                            {locations.map((v) => (
                              <SelectItem key={v} value={v}>
                                {v}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Show firewall vendor only if 2+ locations */}
                    {showNetworkFields && (
                      <div className="space-y-2">
                        <Label>Firewall / Network Vendor</Label>
                        <Select
                          value={firewallVendor}
                          onValueChange={setFirewallVendor}
                        >
                          <SelectTrigger className="bg-background" tabIndex={0}>
                            <SelectValue placeholder="Not sure" />
                          </SelectTrigger>
                          <SelectContent>
                            {firewallVendors.map((v) => (
                              <SelectItem key={v} value={v}>
                                {v}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label>Productivity Stack *</Label>
                        <Select value={stack} onValueChange={setStack}>
                          <SelectTrigger className="bg-background" tabIndex={0}>
                            <SelectValue placeholder="Select stack" />
                          </SelectTrigger>
                          <SelectContent>
                            {itStack.map((v) => (
                              <SelectItem key={v} value={v}>
                                {v}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Endpoint Management *</Label>
                        <Select value={mdm} onValueChange={setMdm}>
                          <SelectTrigger className="bg-background" tabIndex={0}>
                            <SelectValue placeholder="Select option" />
                          </SelectTrigger>
                          <SelectContent>
                            {endpointMgmt.map((v) => (
                              <SelectItem key={v} value={v}>
                                {v}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label>Endpoint Security *</Label>
                        <Select value={secTools} onValueChange={setSecTools}>
                          <SelectTrigger className="bg-background" tabIndex={0}>
                            <SelectValue placeholder="Select option" />
                          </SelectTrigger>
                          <SelectContent>
                            {securityTools.map((v) => (
                              <SelectItem key={v} value={v}>
                                {v}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Backups *</Label>
                        <Select
                          value={backupState}
                          onValueChange={setBackupState}
                        >
                          <SelectTrigger className="bg-background" tabIndex={0}>
                            <SelectValue placeholder="Select option" />
                          </SelectTrigger>
                          <SelectContent>
                            {backups.map((v) => (
                              <SelectItem key={v} value={v}>
                                {v}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label>GRC / Security *</Label>
                        <Select
                          value={compliance}
                          onValueChange={setCompliance}
                        >
                          <SelectTrigger className="bg-background" tabIndex={0}>
                            <SelectValue placeholder="Select option" />
                          </SelectTrigger>
                          <SelectContent>
                            {complianceNeeds.map((v) => (
                              <SelectItem key={v} value={v}>
                                {v}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Primary Goal *</Label>
                        <Select value={goal} onValueChange={setGoal}>
                          <SelectTrigger className="bg-background" tabIndex={0}>
                            <SelectValue placeholder="Select goal" />
                          </SelectTrigger>
                          <SelectContent>
                            {primaryGoals.map((v) => (
                              <SelectItem key={v} value={v}>
                                {v}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Edge Security block (optional) */}
                    <div className="mt-2 p-5 rounded-2xl border border-primary/20 bg-primary/5">
                      <div className="flex items-start gap-3 mb-4">
                        <Globe className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-semibold">
                            Edge Security (DNS / Cloudflare)
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Optional—helps us understand how your public website
                            and DNS are protected.
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Public Website / Domain?</Label>
                        <Select
                          value={hasWebsite}
                          onValueChange={setHasWebsite}
                        >
                          <SelectTrigger className="bg-background" tabIndex={0}>
                            <SelectValue placeholder="Select option" />
                          </SelectTrigger>
                          <SelectContent>
                            {yesNoUnsure.map((v) => (
                              <SelectItem key={v} value={v}>
                                {v}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        {!showEdgeFields && (
                          <p className="text-sm text-muted-foreground mt-2">
                            No problem — we’ll focus on internal IT + security
                            posture.
                          </p>
                        )}
                      </div>

                      {showEdgeFields && (
                        <>
                          <div className="grid md:grid-cols-2 gap-6 mt-6">
                            <div className="space-y-2">
                              <Label>DNS Provider</Label>
                              <Select
                                value={dnsProvider}
                                onValueChange={setDnsProvider}
                              >
                                <SelectTrigger className="bg-background" tabIndex={0}>
                                  <SelectValue placeholder="Select provider" />
                                </SelectTrigger>
                                <SelectContent>
                                  {dnsProviders.map((v) => (
                                    <SelectItem key={v} value={v}>
                                      {v}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="space-y-2">
                              <Label>Using Cloudflare?</Label>
                              <Select
                                value={usesCloudflare}
                                onValueChange={setUsesCloudflare}
                              >
                                <SelectTrigger className="bg-background" tabIndex={0}>
                                  <SelectValue placeholder="Select option" />
                                </SelectTrigger>
                                <SelectContent>
                                  {yesNoUnsure.map((v) => (
                                    <SelectItem key={v} value={v}>
                                      {v}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div className="grid md:grid-cols-2 gap-6 mt-6">
                            <div className="space-y-2">
                              <Label>WAF / DDoS Protection?</Label>
                              <Select value={wafDdOS} onValueChange={setWafDdOS}>
                                <SelectTrigger className="bg-background" tabIndex={0}>
                                  <SelectValue placeholder="Select option" />
                                </SelectTrigger>
                                <SelectContent>
                                  {yesNoUnsure.map((v) => (
                                    <SelectItem key={v} value={v}>
                                      {v}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="timeline">Timeline</Label>
                      <Input
                        id="timeline"
                        name="timeline"
                        placeholder="e.g., ASAP, 30 days, next quarter"
                        className="bg-background"
                        maxLength={MAX_TIMELINE_LEN}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">
                        Anything Else We Should Know?
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Briefly describe your environment, current pain points, or constraints we should consider..."
                        className="min-h-[140px] bg-background resize-none"
                        maxLength={MAX_NOTES_LEN}
                      />
                    </div>

                    <Button
                      type="submit"
                      variant="gradient"
                      size="lg"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="animate-pulse">Submitting...</span>
                      ) : (
                        <>
                          Submit
                          <Send className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                      By submitting this form, you agree that Velcore Tech may
                      contact you regarding your assessment request.
                    </p>

                    <div className="pt-2 text-center">
                      <p className="text-xs text-muted-foreground">
                        Prefer to talk first?{" "}
                        <a
                          href={SCHEDULER_URL}
                          target="_blank"
                          rel="noreferrer"
                          className="underline underline-offset-4 hover:text-foreground"
                        >
                          Schedule a conversation
                        </a>
                        .
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Assurance strip */}
      <section className="section-padding bg-card">
        <div className="container-tight">
          <SectionHeader
            badge="What We Review"
            title="The Core Areas We Baseline"
            description="We focus on the controls and operational fundamentals that drive the biggest reduction in downtime and security risk."
          />

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {[
              {
                icon: UsersIcon,
                title: "Identity & Access",
                description:
                  "MFA, Conditional Access, admin roles, least privilege, and access review practices.",
              },
              {
                icon: Laptop,
                title: "Endpoints & Standards",
                description:
                  "Device baselines, patch governance, encryption, EDR posture, onboarding/offboarding controls.",
              },
              {
                icon: Cloud,
                title: "Cloud & Recovery",
                description:
                  "Microsoft 365 controls, logging/alerts, backup coverage, and restore readiness.",
              },
              {
                icon: Network,
                title: "Network Fundamentals",
                description:
                  "Segmentation, firewall posture, secure remote access, and multi-site reliability.",
              },
              {
                icon: Globe,
                title: "Edge Security",
                description:
                  "DNS governance, Cloudflare/WAF posture, DDoS protections, and web exposure review.",
              },
              {
                icon: ClipboardCheck,
                title: "Operations & Documentation",
                description:
                  "Repeatable processes, ownership, reporting, and evidence-ready standards when needed.",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                className="p-6 rounded-2xl bg-background border border-border"
              >
                <div className="inline-flex p-3 rounded-xl bg-primary/10 text-primary mb-4">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button variant="outline" size="xl" asChild>
              <Link to="/services">
                Explore Services
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <BottomBreadcrumbs items={[{ name: "Home", to: "/" }, { name: "Assessment" }]} />
    </Layout>
  );
}