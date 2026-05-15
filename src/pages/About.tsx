import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  Shield,
  Target,
  Eye,
  Users,
  ArrowRight,
  CheckCircle2,
  Building2,
  Scale,
  Award,
  Clock,
  Heart,
  ChevronDown,
  ChevronUp,
  Linkedin,
  Twitter,
  Globe,
  Server,
  Lock,
  Cloud,
  Briefcase,
  ShieldCheck,
  Presentation,
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Helmet } from "react-helmet-async";
import { BottomBreadcrumbs } from "@/components/common/BottomBreadcrumbs";
import { getTrackingParams } from "@/components/common/Tracking";

// Team Images
import amrx from "@/assets/team/asorour.jpg";
import sarahImage from "@/assets/team/sarah-rodriguez.jpg";
import davidImage from "@/assets/team/david-okonkwo.jpg";
import SuImage from "@/assets/team/SuHamdy.jpg";

// Color styling constants from Cybersecurity page
const CARD_BASE = "rounded-3xl bg-card p-7 flex flex-col h-full";
const GLOW_CARD =
  "border border-border " +
  "transition-[border-color,box-shadow] duration-200 " +
  "hover:border-primary/30 hover:ring-1 hover:ring-primary/20 " +
  "hover:shadow-[0_0_0_1px_hsl(var(--primary)/0.14),0_0_18px_hsl(var(--primary)/0.10)] " +
  "transform-gpu will-change-[box-shadow]";

const values = [
  {
    icon: Shield,
    title: "Security by Design",
    description:
      "We standardize protection across identity, endpoints, email, network, and cloud—so security is part of daily operations, not a bolt-on product.",
  },
  {
    icon: Target,
    title: "Operational Discipline",
    description:
      "Baselines, patch governance, monitoring, and change control. Fewer incidents, faster resolution, and predictable IT outcomes.",
  },
  {
    icon: Eye,
    title: "Transparent Accountability",
    description:
      "Clear scope, measurable reporting, and single-point ownership. You'll always know what's covered, what's improving, and what risks remain.",
  },
  {
    icon: Users,
    title: "Leadership Partnership",
    description:
      "We align IT to business goals—budgeting, roadmaps, and compliance readiness—so leadership gets confident answers and fewer surprises.",
  },
];

const capabilities = [
  {
    category: "Managed IT",
    icon: Server,
    items: [
      "24/7 infrastructure monitoring and incident response with defined SLAs",
      "Patch governance and scheduled maintenance windows",
      "Help desk support with escalation paths and accountable ownership",
      "Endpoint standards and lifecycle management",
      "Asset inventory and operational health visibility",
      "Executive reporting on risk, reliability, and priority workstreams",
    ],
  },
  {
    category: "Cybersecurity",
    icon: ShieldCheck,
    items: [
      "24/7 security monitoring with vetted managed-detection partners",
      "Identity governance: MFA, Conditional Access, least privilege",
      "Endpoint detection and response (EDR) with threat containment",
      "Vulnerability management with vetted penetration-testing partners",
      "Incident response planning and tabletop exercises",
      "Compliance alignment with HIPAA, NIST, and ISO frameworks",
    ],
  },
  {
    category: "Management Consulting",
    icon: Presentation,
    items: [
      "vCIO strategic advisory and technology roadmap planning",
      "IT budget planning and vendor management oversight",
      "Compliance program development (SOC 2, HIPAA, NIST, ISO)",
      "Quarterly business reviews with leadership team",
      "Board-ready reporting on IT performance and risk posture",
    ],
  },
];

const team = [
  {
    name: "Amr Sorour",
    role: "Founder & Principal Engineer",
    image: amrx,
    bio: "Versatile engineer with 20+ years across systems, networks, identity, and security — operating infrastructure across Africa, Asia, and America. Leads architecture and security at Velcore.",
    social: {
      linkedin: "https://linkedin.com/in/amrsorour",
      stackoverflow: "https://stackoverflow.com/users/amrsorour",
      twitter: "https://twitter.com/amrx",
      website: "https://amrsorour.com",
    },
  },
  {
    name: "Su Hamdy",
    role: "Client Success Lead",
    image: SuImage,
    bio: "Bridges technical delivery with leadership communication—ensuring clarity and accountability.",
    social: {
      linkedin: "https://linkedin.com/in/SuHamdy",
      twitter: "https://twitter.com/SuHamdy22",
      website: null,
    },
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 }
};

const staggerChildren = {
  whileInView: { transition: { staggerChildren: 0.1 } }
};

export default function About() {
  const [showTeam, setShowTeam] = useState(false);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const handleImageError = (name: string) => {
    setImageErrors(prev => ({ ...prev, [name]: true }));
  };

  return (
    <Layout>
      <Helmet>
        <title>About Velcore Tech | Security-First Managed IT & Cybersecurity</title>
        <meta
          name="description"
          content="Velcore Tech delivers security-first managed IT services, identity governance, and operational discipline for growing organizations."
        />
        <link rel="canonical" href="https://velcoretech.com/about" />
      </Helmet>

      {/* Hero Section - UPDATED to match Contact.tsx spacing */}
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
              <Building2 className="h-4 w-4" />
              <span>About Velcore Tech · Est. 2025</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold tracking-tight mb-4">
              Built on Two Decades
              <span className="text-gradient block mt-2">Across Three Continents</span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Velcore Tech was founded in 2025 to bring enterprise-grade IT discipline
              to growing organizations — distilled from twenty years of building, securing,
              and operating infrastructure across Africa, Asia, and America.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story & Mission - MOVED UP (now first) */}
      <section className="pb-20 bg-background">
        <div className="container-tight">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className={[CARD_BASE, GLOW_CARD, "p-8 bg-card/70"].join(" ")}
            >
              <h2 className="text-3xl font-bold mb-6">Why Velcore Exists</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Velcore Tech was founded in 2025 by{" "}
                  <span className="text-foreground font-semibold">Amr Sorour</span>,
                  a versatile engineer with a rare mix of skills across systems, networks,
                  identity, and security — built over twenty-plus years operating
                  infrastructure across Africa, Asia, and America.
                </p>
                <p>
                  The pattern was the same on every continent: organizations had IT that
                  worked most of the time, but couldn't be defended on a bad day. Tools
                  without standards. Tickets without ownership. Security as a product, not
                  a discipline. Velcore exists to deliver the opposite — one operating
                  model with measurable standards, accountable ownership, and executive-level
                  visibility into the systems the business depends on.
                </p>
                <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10 mt-6">
                  <p className="text-sm text-muted-foreground">
                    <span className="text-foreground font-semibold">Best fit:</span>{" "}
                    Organizations with 10–250 users that need proactive security and operational reliability.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className={[CARD_BASE, GLOW_CARD, "p-8 bg-card/70"].join(" ")}
            >
              <h2 className="text-3xl font-bold mb-6">Our Approach</h2>
              <div className="space-y-4">
                {[
                  "One operating model across managed IT, security, and cloud",
                  "Security-first standards baked into daily operations",
                  "Clear reporting and single-point accountability",
                  "Compliance-ready controls and evidence framework",
                  "Proactive patch management and vulnerability remediation",
                  "24/7 infrastructure monitoring with automated alerting",
                  "Vendor management and third-party risk oversight",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-20 bg-card">
        <div className="container-tight">
          <SectionHeader
            badge="Capabilities"
            title="What We Deliver"
            description="Enterprise-grade capabilities delivered with operational discipline."
          />

          <motion.div 
            variants={staggerChildren}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-4 mt-16"
          >
            {capabilities.map((capability) => (
              <motion.div
                key={capability.category}
                variants={fadeInUp}
                className={[CARD_BASE, GLOW_CARD, "p-6 bg-background/60"].join(" ")}
              >
                <div className="flex items-center gap-2 mb-4">
                  <capability.icon className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold">{capability.category}</h3>
                </div>
                <ul className="space-y-2">
                  {capability.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-card">
        <div className="container-tight">
          <SectionHeader
            badge="Values"
            title="How We Operate"
            description="The principles behind our work—built for reliability and long-term partnership."
          />

          <div className="grid md:grid-cols-2 gap-6 mt-16">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={[CARD_BASE, GLOW_CARD, "p-8 bg-background/60"].join(" ")}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <value.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-semibold">{value.title}</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-background">
        <div className="container-tight">
          <div className="text-center mb-8">
            <Button
              variant="outline-glow"
              size="lg"
              onClick={() => setShowTeam(!showTeam)}
              className="inline-flex items-center gap-2"
            >
              <Users className="h-5 w-5" />
              {showTeam ? "Hide Leadership" : "Meet Our Leadership"}
              {showTeam ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </div>

          <AnimatePresence>
            {showTeam && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
                className="overflow-hidden"
              >
                <SectionHeader
                  badge="Leadership"
                  description="The principals behind Velcore — accountable for delivery, strategy, and client outcomes."
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto mt-12">
                  {team.map((member, index) => (
                    <motion.div
                      key={member.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={[CARD_BASE, GLOW_CARD, "w-full max-w-sm p-6 bg-card/70 text-center flex flex-col h-full"].join(" ")}
                    >
                      <div>
                        <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden border-2 border-primary/20">
                          {!imageErrors[member.name] ? (
                            <img 
                              src={member.image} 
                              alt={member.name}
                              className="w-full h-full object-cover"
                              onError={() => handleImageError(member.name)}
                            />
                          ) : (
                            <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                              <Users className="h-8 w-8 text-primary" />
                            </div>
                          )}
                        </div>
                        <h3 className="text-lg font-semibold">{member.name}</h3>
                        <p className="text-sm text-primary mb-3">{member.role}</p>
                        <p className="text-sm text-muted-foreground mb-4">{member.bio}</p>
                      </div>
                      
                      <div className="mt-auto pt-4 border-t border-border/50">
                        <div className="flex items-center justify-center gap-3">
                          {member.social.linkedin && (
                            <a 
                              href={member.social.linkedin} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-muted-foreground hover:text-primary transition-colors"
                            >
                              <Linkedin className="h-4 w-4" />
                            </a>
                          )}
                          {member.social.twitter && (
                            <a 
                              href={member.social.twitter} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-muted-foreground hover:text-primary transition-colors"
                            >
                              <Twitter className="h-4 w-4" />
                            </a>
                          )}
                          {member.social.website && (
                            <a 
                              href={member.social.website} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-muted-foreground hover:text-primary transition-colors"
                            >
                              <Globe className="h-4 w-4" />
                            </a>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-10 text-center">
                  <p className="text-sm text-muted-foreground mb-4">
                    A small, focused team — every engagement is handled at the principal level.
                  </p>
                  <Button variant="outline-glow" asChild>
                    <Link to={`/contact${getTrackingParams('about', 'team_section', 'work_with_us')}`}>
                      Work With Us <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-card border-t border-border">
        <div className="container-tight">
          <div className="p-8 rounded-3xl bg-background border border-border relative overflow-hidden">
            <div className="absolute inset-0 bg-hero-glow opacity-40 pointer-events-none" />
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="max-w-2xl">
                <h3 className="text-2xl font-bold mb-2">Ready to Build a Defensible IT Posture?</h3>
                <p className="text-muted-foreground">
                  Start Assessment to identify gaps and risks—then build a 
                  security-first operating model with clear accountability.
                </p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline-glow" size="lg" asChild>
                  <Link to={`/assessment${getTrackingParams('about', 'final_cta', 'it_assessment')}`}>
                    Start Assessment <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline-glow" size="lg" asChild>
                  <Link to={`/contact${getTrackingParams('about', 'final_cta', 'contact_us')}`}>
                    Contact Us <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BottomBreadcrumbs items={[{ name: "Home", to: "/" }, { name: "About" }]} />
    </Layout>
  );
}