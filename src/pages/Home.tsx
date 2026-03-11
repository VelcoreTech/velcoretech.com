import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import type { LucideIcon } from "lucide-react";

import {
  // Hero & badges
  Shield,
  ShieldCheck,
  Activity,
  Scale,
  
  // Service icons - more meaningful
  Server,           // IT Managed Services
  Briefcase,        // Management Consulting
  Shield as SecurityIcon, // Cybersecurity (renamed to avoid conflict)
  
  // UI icons
  ArrowRight,
  
  // Metrics icons - more appropriate
  Handshake,        // Client Retention (partnership)
  Timer,            // Response Time (<15 min)
  Headset,          // Issues Resolved (first call support)
  TrendingDown,     // Cost Reduction (29% savings)
} from "lucide-react";

import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/common/SectionHeader";
import { FeatureCard } from "@/components/common/FeatureCard";
import { getTrackingParams } from "@/components/common/Tracking";

// Optimized hero images
import heroBgTiny from "@/assets/vt-bg-tiny.webp";
import heroBgSmall from "@/assets/vt-bg-small.webp";
import heroBgMedium from "@/assets/vt-bg-medium.webp";
import heroBgLarge from "@/assets/vt-bg-large.webp";

const OG_IMAGE = "https://velcoretech.com/og-image.jpg";
const CANONICAL = "https://velcoretech.com/";

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 }
};

const staggerChildren = {
  whileInView: { transition: { staggerChildren: 0.1 } }
};

// Card styling constants
const CARD_BASE = "rounded-3xl bg-card p-7 flex flex-col h-full";
const GLOW_CARD =
  "border border-border " +
  "transition-[border-color,box-shadow] duration-200 " +
  "hover:border-primary/30 hover:ring-1 hover:ring-primary/20 " +
  "hover:shadow-[0_0_0_1px_hsl(var(--primary)/0.14),0_0_18px_hsl(var(--primary)/0.10)] " +
  "transform-gpu will-change-[box-shadow]";

type ValueProp = {
  icon: LucideIcon;
  title: string;
  description: string;
  to: string;
};

/**
 * Services (3 clickables) - with proper distinct icons
 */
const valueProps: ValueProp[] = [
  {
    icon: Server,
    title: "IT Managed Services",
    description:
      "Stabilized operations with defined scope, documented standards, and accountable ownership.",
    to: "/services/Managed-IT",
  },
  {
    icon: SecurityIcon,
    title: "Cybersecurity",
    description:
      "Device hardening, EDR oversight, patch governance, and operational health visibility.",
    to: "/services/cybersecurity",
  },
    {
    icon: Briefcase,
    title: "Management Consulting",
    description:
      "Working with key stakeholders, we develop strategies and practical approaches to achieving your goals.",
    to: "/services/consulting",
  },
];

export default function Home() {
  const [imageLoaded, setImageLoaded] = useState(false);

  const metrics = [
    { label: "Client Retention", value: "98%", description: "Annual contract renewal rate", icon: Handshake },
    { label: "Response Time", value: "<15 min", description: "For critical incidents", icon: Timer },
    { label: "Issues Resolved", value: "96%", description: "Resolved on first call", icon: Headset },
    { label: "Cost Reduction", value: "29%", description: "Average IT cost reduction", icon: TrendingDown },
  ];

  return (
    <Layout>
      <Helmet>
        <title>Managed IT & Cybersecurity (SOC 2 Ready) | Velcore Tech</title>
        <meta
          name="description"
          content="Security-first Managed IT and Cybersecurity for growing teams—Microsoft 365 governance, identity and endpoint controls, network operations, recovery, and Cloudflare edge protection. SOC 2 readiness available."
        />
        <link rel="canonical" href={CANONICAL} />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Velcore Tech" />
        <meta property="og:title" content="Managed IT Services & Cybersecurity | Velcore Tech" />
        <meta
          property="og:description"
          content="Security-first Managed IT and Cybersecurity—Microsoft 365 governance, identity and endpoint controls, network operations, recovery, and Cloudflare edge protection. SOC 2 readiness available."
        />
        <meta property="og:url" content={CANONICAL} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Velcore Tech - Security-First Managed IT & Cybersecurity" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Managed IT Services & Cybersecurity | Velcore Tech" />
        <meta
          name="twitter:description"
          content="Security-first Managed IT and Cybersecurity—M365 governance, identity and endpoint controls, network operations, recovery, and Cloudflare edge protection."
        />
        <meta name="twitter:image" content={OG_IMAGE} />

        <link rel="preload" as="image" href={heroBgLarge} fetchpriority="high" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "@id": "https://velcoretech.com/#business",
            name: "Velcore Tech LLC",
            url: "https://velcoretech.com/",
            telephone: "+1-831-334-7943",
            image: OG_IMAGE,
            address: {
              "@type": "PostalAddress",
              addressLocality: "Santa Cruz",
              addressRegion: "CA",
              postalCode: "95060",
              addressCountry: "US",
            },
            areaServed: [
              { "@type": "City", name: "Santa Cruz" },
              { "@type": "Area", name: "Bay Area" },
              { "@type": "Country", name: "United States" },
            ],
            sameAs: [
              "https://www.linkedin.com/company/velcoretech",
              "https://www.instagram.com/velcoretech",
              "https://www.facebook.com/velcoretech",
            ],
          })}
        </script>
      </Helmet>

      {/* Hero Section with optimized images */}
      <section className="relative min-h-[90vh] flex items-center hero-gradient overflow-hidden">
        {/* Tiny placeholder - loads instantly */}
        <img
          src={heroBgTiny}
          alt=""
          aria-hidden="true"
          width="1920"
          height="1080"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            imageLoaded ? 'opacity-0' : 'opacity-30'
          }`}
          loading="eager"
          fetchpriority="high"
          decoding="async"
        />
        
        {/* Full quality image with srcset */}
        <img
          src={heroBgLarge}
          srcSet={`
            ${heroBgSmall} 640w,
            ${heroBgMedium} 1280w,
            ${heroBgLarge} 1920w
          `}
          sizes="100vw"
          alt=""
          aria-hidden="true"
          width="1920"
          height="1080"
          onLoad={() => setImageLoaded(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            imageLoaded ? 'opacity-30' : 'opacity-0'
          }`}
          loading="eager"
          fetchpriority="high"
          decoding="async"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/85 to-background" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[92vw] max-w-5xl h-[620px] bg-hero-glow pointer-events-none" />

        <div className="container-tight relative z-10 py-20 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-primary/10 text-primary border border-primary/20 mb-6"
            >
              <Shield className="h-4 w-4" />
              Security-First IT Managed Service
            </motion.span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-6">
              Predictable IT Operations.
              <br />
              <span className="text-gradient">Defensible Security.</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
              We help growing organizations build reliable technology foundations, reduce risk, and achieve measurable operational improvement.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-12 gap-y-4 text-base text-muted-foreground">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <span className="font-medium">Security-first standards</span>
              </div>
              <div className="hidden sm:block h-5 w-px bg-border/60" />
              <div className="flex items-center gap-3">
                <Activity className="h-5 w-5 text-primary" />
                <span className="font-medium">Operational monitoring</span>
              </div>
              <div className="hidden sm:block h-5 w-px bg-border/60" />
              <div className="flex items-center gap-3">
                <Scale className="h-5 w-5 text-primary" />
                <span className="font-medium">SOC 2 readiness guidance</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Metrics Section with Header */}
      <section className="section-padding bg-background">
        <div className="container-tight">
          {/* Header matching the "Services" section style */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
                Results You Can Count On
                <span className="text-gradient block mt-2">Measurable Impact</span>
              </h2>

              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Real metrics from real clients—proof that security-first IT delivers tangible business outcomes.
              </p>
            </motion.div>
          </div>

          <motion.div 
            variants={staggerChildren}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {metrics.map((metric) => (
              <motion.div
                key={metric.label}
                variants={fadeInUp}
                className={[CARD_BASE, GLOW_CARD, "text-center p-6 bg-card/70"].join(" ")}
              >
                <metric.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                <div className="text-3xl md:text-4xl font-bold text-primary mb-1">{metric.value}</div>
                <div className="font-semibold mb-1">{metric.label}</div>
                <div className="text-sm text-muted-foreground">{metric.description}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="section-padding bg-background">
        <div className="container-tight">
          {/* Enhanced header matching the Metrics section style */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
                Managed IT, Secured
                <span className="text-gradient block mt-2">End-to-End</span>
              </h2>

              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                One operating model across identity, endpoints, Microsoft 365, network, recovery, 
                and edge security—built for reliability and audit-ready control.
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {valueProps.map((prop, index) => (
              <FeatureCard
                key={prop.title}
                icon={prop.icon}
                title={prop.title}
                description={prop.description}
                to={`${prop.to}${getTrackingParams('home', 'services_grid', prop.title.toLowerCase().replace(/\s+/g, '_'))}`}
                ctaLabel="Learn more"
                delay={index * 0.1}
              />
            ))}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="outline-glow" size="xl" asChild>
              <Link to={`/services${getTrackingParams('home', 'services_section', 'view_all_services')}`}>
                View all services <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-padding bg-card relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-glow opacity-50" />
        <div className="container-tight relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
              Ready for Predictable IT and
              <br />
              <span className="text-gradient">Defensible Security?</span>
            </h2>

            <p className="text-xl text-muted-foreground mb-10">
              Start with an IT Assessment to identify control gaps and operational risk across identity,
              endpoints, cloud, network, recovery, and edge protection—then receive a prioritized plan with clear ownership.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline-glow" size="xl" asChild>
                <Link to={`/contact${getTrackingParams('home', 'final_cta', 'schedule_consultation')}`}>
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>

            <p className="text-sm text-muted-foreground mt-6">
              If you already know what you need,{" "}
              <Link to={`/pricing${getTrackingParams('home', 'final_cta', 'view_pricing')}`} className="underline underline-offset-4 hover:text-foreground">
                view plans & pricing
              </Link>
              .
            </p>
          </motion.div>
        </div>
      </section>

      {/* Serving */}
      <section className="section-padding bg-card">
        <div className="container-tight">
          <div className="p-8 rounded-3xl bg-background border border-border flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Serving California & Nationwide</h2>
              <p className="text-muted-foreground leading-relaxed">
                Headquartered in{" "}
                <Link
                  to={`/city/santa-cruz${getTrackingParams('home', 'serving_section', 'santa_cruz')}`}
                  className="font-medium text-foreground underline underline-offset-4 decoration-border hover:decoration-primary/60 transition-colors"
                >
                  Santa Cruz
                </Link>
                , serving the{" "}
                <Link
                  to={`/city/bay-area${getTrackingParams('home', 'serving_section', 'bay_area')}`}
                  className="font-medium text-foreground underline underline-offset-4 decoration-border hover:decoration-primary/60 transition-colors"
                >
                  Bay Area
                </Link>{" "}
                and the{" "}
                <Link
                  to={`/city/monterey-bay${getTrackingParams('home', 'serving_section', 'monterey_bay')}`}
                  className="font-medium text-foreground underline underline-offset-4 decoration-border hover:decoration-primary/60 transition-colors"
                >
                  greater Monterey Bay region
                </Link>
                , with secure remote-first services nationwide.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <Button variant="outline" asChild className="w-full sm:w-auto">
                <Link to={`/city/santa-cruz${getTrackingParams('home', 'serving_section_buttons', 'santa_cruz')}`}>Santa Cruz</Link>
              </Button>
              <Button variant="outline" asChild className="w-full sm:w-auto">
                <Link to={`/city/bay-area${getTrackingParams('home', 'serving_section_buttons', 'bay_area')}`}>Bay Area</Link>
              </Button>
              <Button variant="outline" asChild className="w-full sm:w-auto">
                <Link to={`/city/monterey-bay${getTrackingParams('home', 'serving_section_buttons', 'monterey_bay')}`}>Monterey Bay</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}