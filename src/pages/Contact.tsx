import { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Calendar,
  CheckCircle2,
  Shield,
} from "lucide-react";

import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { SectionHeader } from "@/components/common/SectionHeader";
import { useToast } from "@/components/hooks/use-toast";
import { BottomBreadcrumbs } from "@/components/common/BottomBreadcrumbs";
import { 
  getTrackingParams,
  getTrackingInfo, 
  formatTrackingForEmail,
  debugTracking 
} from "@/components/common/Tracking";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Color styling constants from Cybersecurity page
const CARD_BASE = "rounded-3xl bg-card p-7 flex flex-col h-full";
const GLOW_CARD =
  "border border-border " +
  "transition-[border-color,box-shadow] duration-200 " +
  "hover:border-primary/30 hover:ring-1 hover:ring-primary/20 " +
  "hover:shadow-[0_0_0_1px_hsl(var(--primary)/0.14),0_0_18px_hsl(var(--primary)/0.10)] " +
  "transform-gpu will-change-[box-shadow]";

const SCHEDULER_URL = "https://cal.com/velcoreit";

const userCounts = [
  "1-10 users",
  "11-25 users",
  "26-50 users",
  "51-100 users",
  "100+ users",
];

// IMPORTANT: keep each value <= 60 chars (backend schema max(60))
const challenges = [
  "Managed IT Operations",
  "Identity & Access Management",
  "Governance & Compliance",
  "Microsoft 365 & Cloud",
  "Network & Firewall",
  "Backup & Recovery",
  "Edge Security (DNS / Cloudflare)",
  "Penetration Testing (Network/Web/API)",
  "Other",
];

type ContactPayload = {
  name: string;
  company: string;
  email: string;
  phone?: string;
  users: string;
  challenge: string;
  message?: string;
  website?: string; // honeypot
  source?: string; // tracking source
  source_page?: string;
  source_location?: string;
  source_cta?: string;
  source_timestamp?: string;
  tracking_info?: string; // Formatted tracking info for email
};

const s = (v: FormDataEntryValue | null) => (v ? String(v).trim() : "");

/** Format as (831) 334-7943 while typing */
function formatPhoneUS(input: string) {
  const digits = input.replace(/\D/g, "").slice(0, 10);
  const a = digits.slice(0, 3);
  const b = digits.slice(3, 6);
  const c = digits.slice(6, 10);

  if (!digits) return "";
  if (digits.length < 4) return `(${a}`;
  if (digits.length < 7) return `(${a}) ${b}`;
  return `(${a}) ${b}-${c}`;
}

export default function Contact() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [users, setUsers] = useState<string>("");
  const [challenge, setChallenge] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [trackingInfo, setTrackingInfo] = useState<any>(null);

  const canonical = useMemo(() => "https://velcoretech.com/contact", []);

  // Capture tracking info from URL on page load using the improved utility
  useEffect(() => {
    const info = getTrackingInfo();
    if (info) {
      setTrackingInfo(info);
      
      // Log for debugging in development
      if (process.env.NODE_ENV === 'development') {
        console.log("📋 Lead source detected:", {
          page: info.page,
          location: info.location,
          cta: info.cta,
          time: info.formattedTime,
          raw: info.raw
        });
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!users || !challenge) {
      toast({
        title: "Missing required fields",
        description: "Please select your user count and primary IT need.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload: ContactPayload = {
      name: s(formData.get("name")),
      company: s(formData.get("company")),
      email: s(formData.get("email")),
      phone: phone ? phone : s(formData.get("phone")),
      users,
      challenge,
      message: s(formData.get("message")),
      website: s(formData.get("website")), // honeypot
    };

    // Add tracking information if available
    if (trackingInfo?.raw) {
      payload.source = trackingInfo.raw.source || `${trackingInfo.page}_${trackingInfo.raw.location}_${trackingInfo.raw.cta}`;
      payload.source_page = trackingInfo.page;
      payload.source_location = trackingInfo.raw.location;
      payload.source_cta = trackingInfo.raw.cta;
      payload.source_timestamp = trackingInfo.timestamp;
      payload.tracking_info = formatTrackingForEmail();
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.text().catch(() => "");
        let msg = "Unable to send your message. Please try again.";
        try {
          const parsed = JSON.parse(body);
          msg = parsed?.error || parsed?.message || msg;
        } catch {
          if (body) msg = body.slice(0, 200);
        }
        throw new Error(msg);
      }

      setSubmitted(true);
      setUsers("");
      setChallenge("");
      setPhone("");
      form.reset();

      toast({
        title: "Message sent",
        description: "Thanks—our team will respond within 1 business day.",
      });
    } catch (err: any) {
      toast({
        title: "Message not sent",
        description:
          err?.message || "Please try again, or email info@velcoretech.com.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <Helmet>
        <title>Contact Velcore Tech | IT & Cybersecurity Consultation</title>
        <meta
          name="description"
          content="Schedule a consultation with Velcore Tech. Security-first managed IT, Microsoft 365 governance, cloud architecture, backup & recovery, network security, and edge protection for growing teams."
        />
        <link rel="canonical" href={canonical} />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="Contact Velcore Tech | IT & Cybersecurity Consultation"
        />
        <meta
          property="og:description"
          content="Start a conversation about securing and stabilizing your IT environment. Serving Santa Cruz, Bay Area, Monterey Bay and nationwide."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content="https://velcoretech.com/og-image.jpg" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative overflow-hidden hero-gradient pt-24 pb-12">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-hero-glow opacity-40 pointer-events-none" />
        <div className="container-tight relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-primary/10 text-primary border border-primary/20 mb-4">
              <Shield className="h-4 w-4" />
              <span>CONTACT US</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold tracking-tight mb-4">
              Let's Talk About
              <span className="text-gradient block mt-2">Secure, Predictable IT</span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              For consulting or managed services, share a little context and we'll respond within 1 business day. If you want a structured intake, start with the IT & Security Assessment.
            </p>
          </div>

          {/* Tracking Info Debug - Only visible in development */}
          {trackingInfo && process.env.NODE_ENV === 'development' && (
            <div className="mt-4 p-4 bg-primary/5 border border-primary/20 rounded-lg text-xs text-muted-foreground max-w-md mx-auto">
              <p className="font-semibold text-primary mb-2">🔍 Lead Source Detected:</p>
              <div className="space-y-1">
                <p><span className="font-medium">Page:</span> {trackingInfo.page}</p>
                <p><span className="font-medium">Section:</span> {trackingInfo.location}</p>
                <p><span className="font-medium">CTA:</span> {trackingInfo.cta}</p>
                {trackingInfo.formattedTime && (
                  <p><span className="font-medium">Clicked:</span> {trackingInfo.formattedTime}</p>
                )}
              </div>
              <p className="text-[10px] text-muted-foreground/50 mt-2 pt-2 border-t border-border/30">
                This info will be included with your submission
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Content Section */}
      <section className="pb-20 bg-background">
        <div className="container-tight">
          {/* Mobile-only "Get in Touch" heading - appears above form */}
          <div className="lg:hidden mb-6">
            <h2 className="text-xl font-semibold mb-3">Get in Touch</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Share a little context and we'll respond within 1 business
              day. For the fastest path, book directly on our calendar.
            </p>
          </div>

          {/* Grid with order swapping for mobile */}
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Sidebar - on mobile: order-2 (appears second), on desktop: order-1 (left) */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45 }}
              className="order-2 lg:order-1 lg:col-span-1"
            >
              <div className="sticky top-24 space-y-8">
                {/* Desktop heading - hidden on mobile */}
                <div className="hidden lg:block">
                  <h2 className="text-xl font-semibold mb-3">Get in Touch</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Share a little context and we'll respond within 1 business
                    day. For the fastest path, book directly on our calendar.
                  </p>
                </div>

                {/* Contact details and scheduler - always visible, below form on mobile */}
                <div className="space-y-4">
                  <a
                    href="mailto:info@velcoretech.com"
                    className={["flex items-center gap-4 p-4 rounded-xl", GLOW_CARD, "bg-card/70"].join(" ")}
                  >
                    <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Email</p>
                      <p className="font-medium">info@velcoretech.com</p>
                    </div>
                  </a>

                  <a
                    href="tel:+18313347943"
                    className={["flex items-center gap-4 p-4 rounded-xl", GLOW_CARD, "bg-card/70"].join(" ")}
                  >
                    <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Phone</p>
                      <p className="font-medium">(831) 334-7943</p>
                    </div>
                  </a>

                  <div className={["flex items-center gap-4 p-4 rounded-xl", GLOW_CARD, "bg-card/70"].join(" ")}>
                    <div className="p-3 rounded-xl bg-primary/10 text-primary">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Location</p>
                      <p className="font-medium">Santa Cruz, California</p>
                    </div>
                  </div>
                </div>

                {/* Scheduler Card */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-card border border-primary/20">
                  <Calendar className="h-8 w-8 text-primary mb-4" />
                  <h3 className="font-semibold mb-2">
                    Prefer to schedule directly?
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Pick a time that works—we'll confirm fit, scope, and next steps.
                  </p>
                  <p className="text-xs text-muted-foreground/80 mb-4">
                    One-time free 30-45 minute consultation.
                  </p>

                  <Button
                    asChild
                    variant="outline-glow"
                    size="sm"
                    className="w-full"
                  >
                    <a 
                      href={`${SCHEDULER_URL}${trackingInfo?.raw?.source ? `?source=${trackingInfo.raw.source}` : ''}`} 
                      target="_blank" 
                      rel="noreferrer"
                    >
                      Open Scheduler
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Form Column - on mobile: order-1 (appears first), on desktop: order-2 (right) */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="order-1 lg:order-2 lg:col-span-2"
            >
              <div className={["p-8 md:p-10 rounded-3xl", GLOW_CARD, "bg-card/70"].join(" ")}>
                {submitted ? (
                  // Success State
                  <div className="text-center py-16">
                    <div className="inline-flex p-4 rounded-full bg-primary/10 text-primary mb-6">
                      <CheckCircle2 className="h-12 w-12" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">
                      Thanks—message received.
                    </h3>
                    <p className="text-muted-foreground max-w-md mx-auto mb-8">
                      We'll review your request and respond within 1 business
                      day.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <Button
                        variant="outline-glow"
                        onClick={() => setSubmitted(false)}
                      >
                        Submit Another Request
                      </Button>
                      <Button
                        variant="outline-glow"
                        onClick={() => navigate("/assessment")}
                      >
                        Start Assessment
                      </Button>
                    </div>
                  </div>
                ) : (
                  // Form State
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Honeypot - Hidden from users */}
                    <div className="hidden">
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        name="website"
                        autoComplete="off"
                        tabIndex={-1}
                      />
                    </div>

                    {/* Name & Company */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          required
                          className="bg-background"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company">Company Name *</Label>
                        <Input
                          id="company"
                          name="company"
                          required
                          className="bg-background"
                        />
                      </div>
                    </div>

                    {/* Email & Phone */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          className="bg-background"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          inputMode="tel"
                          autoComplete="tel"
                          value={phone}
                          onChange={(e) =>
                            setPhone(formatPhoneUS(e.target.value))
                          }
                          className="bg-background"
                        />
                      </div>
                    </div>

                    {/* User Count & Primary Need */}
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
                        <Label>Primary IT Need *</Label>
                        <Select value={challenge} onValueChange={setChallenge}>
                          <SelectTrigger className="bg-background" tabIndex={0}>
                            <SelectValue placeholder="Select option" />
                          </SelectTrigger>
                          <SelectContent>
                            {challenges.map((c) => (
                              <SelectItem key={c} value={c}>
                                {c}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <p className="text-xs text-muted-foreground">
                          Want a structured baseline instead?{" "}
                          <Link
                            to="/assessment"
                            className="underline underline-offset-4 hover:text-foreground"
                          >
                            Start Assessment
                          </Link>
                          .
                        </p>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                      <Label htmlFor="message">Tell Us More</Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Briefly describe your environment, constraints, and what a successful outcome looks like..."
                        className="min-h-[150px] bg-background resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      variant="outline-glow"
                      size="lg"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="animate-pulse">Sending...</span>
                      ) : (
                        <>
                          Send Message
                          <Send className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>

                    {/* Disclaimer */}
                    <p className="text-xs text-muted-foreground text-center">
                      By submitting this form, you agree that Velcore Tech may
                      contact you regarding your inquiry.
                    </p>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Breadcrumbs */}
      <BottomBreadcrumbs
        items={[{ name: "Home", to: "/" }, { name: "Contact" }]}
      />
    </Layout>
  );
}