import { useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  // Core icons
  CheckCircle2,
  ArrowRight,
  
  // Service icons
  Briefcase,        // Hero & Executive Advisory
  Target,           // IT Strategy
  TrendingUp,       // Growth & performance
  Users,            // Team & leadership
  BarChart3,        // Performance Assessments
  Scale,            // Compliance & Governance
  Eye,              // Strategic Services
  Zap,              // Process Optimization
  Truck,            // Supply Chain
  Database,         // Technology Deployment
  GitMerge,         // M&A Support
  Shield,           // Risk Management
  
  // Related service icons
  Building2,
  Workflow,
  
  // Additional (unused but keep if needed)
  // Lightbulb,      // Innovation & ideas
  // Compass,        // Direction & guidance
  // LineChart,      // Financial planning
  // Handshake,      // Partnership & deals
  // Rocket,         // Transformation
  // Puzzle,         // Integration
  // GanttChartSquare, // Planning & roadmaps
  // Sparkles,       // Innovation
  // Award,          // Excellence
} from "lucide-react";

import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/common/SectionHeader";
import { BottomBreadcrumbs } from "@/components/common/BottomBreadcrumbs";

const OG_IMAGE = "https://velcoretech.com/og-image.png";

export default function ManagementConsulting() {
  const outcomes = useMemo(
    () => [
      "Strategic alignment of IT with business objectives and growth plans",
      "Clear roadmaps with measurable milestones and ownership",
      "Optimized technology spend and vendor rationalization",
      "Executive-level visibility into IT performance and risk",
    ],
    []
  );

  const whatWeCover = useMemo(
    () => [
      {
        title: "IT Strategy & Roadmapping",
        desc: "Develop actionable technology strategies aligned with business goals, with clear milestones and accountability.",
        items: [
          "Current state assessment and gap analysis",
          "3-5 year technology roadmap development",
          "Budget planning and resource allocation",
          "Business case development for key initiatives",
        ],
        icon: Target,
      },
      {
        title: "Executive & CFO Advisory",
        desc: "Partner with leadership to structure plans, build business cases, and execute strategic initiatives.",
        items: [
          "Technology investment planning",
          "ROI modeling and business case development",
          "Board-level reporting and presentations",
          "Capital planning and budget optimization",
        ],
        icon: Briefcase,
      },
      {
        title: "Strategic Services",
        desc: "Collaborative development of strategic plans through stakeholder alignment and expert facilitation.",
        items: [
          "Strategic planning workshops",
          "Stakeholder alignment sessions",
          "Goal setting and KPI development",
          "Change management integration",
        ],
        icon: Eye,
      },
      {
        title: "Performance Assessments",
        desc: "Objective, experienced review of operations to identify opportunities and risks.",
        items: [
          "Operational maturity assessments",
          "Benchmarking and competitive analysis",
          "Gap identification and prioritization",
          "Quick-win opportunity identification",
        ],
        icon: BarChart3,
      },
      {
        title: "Process Optimization & Cost Reduction",
        desc: "Redesign processes and manage cost reduction initiatives without compromising quality.",
        items: [
          "Business process reengineering",
          "Cost structure analysis",
          "Efficiency improvement programs",
          "Operational waste elimination",
        ],
        icon: Zap,
      },
      {
        title: "Supply Chain Strategies",
        desc: "Multi-faceted approach to optimize supply chains and mitigate risks.",
        items: [
          "Supply chain risk assessment",
          "Process control and reliability improvements",
          "Inventory optimization",
          "Disruption mitigation planning",
        ],
        icon: Truck,
      },
      {
        title: "Technology Deployment (ERP, CRM)",
        desc: "Manage technology selection and implementation without straining operations.",
        items: [
          "Software selection and RFP management",
          "Implementation project management",
          "Business process alignment",
          "Change management and user adoption",
        ],
        icon: Database,
      },
      {
        title: "Technology Due Diligence",
        desc: "Pre-deal technology assessments for acquirers, with integration partners brought in for execution.",
        items: [
          "Pre-deal technology and security posture assessment",
          "Risk and remediation backlog with cost ranges",
          "Integration planning at the architecture level",
          "Coordination with specialized integration partners for execution",
        ],
        icon: GitMerge,
      },
      {
        title: "Risk Management & Compliance",
        desc: "Comprehensive methodology to analyze and mitigate organizational risks.",
        items: [
          "Enterprise risk assessments",
          "Compliance program development",
          "Internal control reviews",
          "Audit preparation and support",
        ],
        icon: Shield,
      },
    ],
    []
  );

  const howWeOperate = useMemo(
    () => [
      {
        step: "01",
        title: "Discover",
        desc: "Deep dive into your business goals, current state, and organizational dynamics.",
      },
      {
        step: "02",
        title: "Strategize",
        desc: "Develop actionable plans with clear milestones, ownership, and success metrics.",
      },
      {
        step: "03",
        title: "Execute",
        desc: "Partner with your team to implement, measure, and adjust for optimal outcomes.",
      },
    ],
    []
  );

  const deliverables = useMemo(
    () => [
      "Current state assessment and gap analysis",
      "Strategic technology roadmap with phased milestones",
      "Business cases for key initiatives",
      "Vendor evaluation frameworks and negotiation support",
      "Integration playbooks for M&A activities",
      "Executive dashboards and board-ready reporting",
    ],
    []
  );

  const related = useMemo(
    () => [
      { title: "Managed IT", to: "/services/managed-it", icon: Briefcase },
      { title: "Cybersecurity", to: "/services/cybersecurity", icon: Shield },
      { title: "Cloud Services", to: "/services/cloud", icon: Workflow },
      { title: "Compliance", to: "/services/audit-ready", icon: Scale },
      { title: "Governance", to: "/services/consulting", icon: Building2 },
      { title: "Assessment", to: "/assessment", icon: CheckCircle2 },
    ],
    []
  );

  return (
    <Layout>
      <Helmet>
        <title>Management Consulting | IT Strategy & Advisory</title>
        <meta
          name="description"
          content="Strategic IT consulting and advisory services including technology roadmapping, vendor advisory, M&A support, and interim leadership. Align technology with business goals."
        />
        <link rel="canonical" href="https://velcoretech.com/services/management-consulting" />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Velcore Tech" />
        <meta property="og:title" content="Management Consulting | Velcore Tech" />
        <meta
          property="og:description"
          content="Strategic IT consulting: roadmapping, vendor advisory, M&A support, and interim leadership to align technology with business objectives."
        />
        <meta property="og:url" content="https://velcoretech.com/services/management-consulting" />
        <meta property="og:image" content={OG_IMAGE} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Management Consulting | Velcore Tech" />
        <meta
          name="twitter:description"
          content="Strategic IT consulting and advisory services for business-aligned technology outcomes."
        />
        <meta name="twitter:image" content={OG_IMAGE} />
      </Helmet>

      {/* HERO */}
      <section className="relative overflow-hidden hero-gradient">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90vw] max-w-4xl h-[600px] bg-hero-glow pointer-events-none" />
        <div className="container-tight relative z-10 py-20 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-primary/10 text-primary border border-primary/20 mb-6">
              <Briefcase className="h-5 w-5" />
              Management Consulting
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Strategic IT Advisory
              <br />
              <span className="text-gradient">for Business Outcomes</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We help leadership teams align technology with business strategy—through roadmapping,
              vendor advisory, M&A support, and executive guidance.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="gradient" size="lg" asChild>
                <Link to="/contact">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline-glow" size="lg" asChild>
                <Link to="/assessment">
                  Start Assessment
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>

            <p className="mt-6 text-sm text-muted-foreground">
              Nationwide advisory. Remote-first with on-site available.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Deep-link anchors for fragments referenced from Pricing/Industries */}
      <div id="identity-access" className="scroll-mt-24" aria-hidden="true" />
      <div id="vcio" className="scroll-mt-24" aria-hidden="true" />
      <div id="vendor-management" className="scroll-mt-24" aria-hidden="true" />
      <div id="budget-planning" className="scroll-mt-24" aria-hidden="true" />

      {/* WHAT WE COVER */}
      <section className="section-padding bg-card">
        <div className="container-tight">
          <SectionHeader
            badge="Services"
            title="Strategic Advisory Services"
            description="Practical, results-driven consulting that helps you make better technology decisions."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
            {whatWeCover.map((x, i) => (
              <motion.div
                key={x.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.03 }}
                className="rounded-3xl border border-border bg-background p-7 h-full flex flex-col"
              >
                <div className="flex items-start gap-3 mb-4">
                  <div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary shrink-0">
                    <x.icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-lg font-semibold">{x.title}</div>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{x.desc}</p>

                <ul className="mt-auto space-y-2 text-sm text-muted-foreground">
                  {x.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW WE OPERATE */}
      <section className="section-padding bg-background">
        <div className="container-tight">
          <SectionHeader
            badge="Approach"
            title="How We Work With You"
            description="Collaborative, transparent, and focused on measurable outcomes."
          />

          <div className="grid md:grid-cols-3 gap-6 mt-14">
            {howWeOperate.map((a, i) => (
              <motion.div
                key={a.step}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.08 }}
                className="rounded-3xl border border-border bg-card p-7"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm text-primary font-semibold">{a.step}</span>
                  <span className="text-lg font-semibold">{a.title}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{a.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 rounded-3xl border border-border bg-card p-8">
            <div className="flex items-start gap-4">
              <div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <div className="min-w-0">
                <div className="text-lg font-semibold">What to Expect</div>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                  Tangible deliverables designed for executive decision-making.
                </p>
              </div>
            </div>

            <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
              {deliverables.map((d) => (
                <li key={d} className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span className="leading-relaxed">{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* RELATED SERVICES */}
      <section className="section-padding bg-card">
        <div className="container-tight">
          <SectionHeader
            badge="Related"
            title="Services That Complement Strategic Consulting"
            description="Operational excellence and security to execute on your strategy."
          />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-14">
            {related.map((r) => (
              <Link
                key={r.to}
                to={r.to}
                className="rounded-2xl border border-border bg-background p-4 hover:border-primary/30 transition-colors group text-center"
              >
                <div className="inline-flex p-2 rounded-xl bg-primary/10 text-primary mb-2">
                  <r.icon className="h-4 w-4" />
                </div>
                <div className="font-medium text-sm group-hover:text-primary transition-colors">
                  {r.title}
                </div>
                <div className="text-xs text-muted-foreground mt-1 flex items-center justify-center gap-1">
                  <span>Learn more</span>
                  <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="section-padding bg-background">
        <div className="container-tight">
          <div className="p-8 rounded-3xl bg-card border border-border relative overflow-hidden">
            <div className="absolute inset-0 bg-hero-glow opacity-40 pointer-events-none" />
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl font-bold mb-2">Ready to Align IT with Business Goals?</h3>
                <p className="text-muted-foreground">
                  Let's discuss your strategic priorities and how we can help you achieve them.
                </p>
              </div>
              <div className="flex gap-3">
                <Button variant="gradient" size="lg" asChild>
                  <Link to="/contact">
                    Schedule Consultation <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline-glow" size="lg" asChild>
                  <Link to="/assessment">
                    Start Assessment <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          <BottomBreadcrumbs
            items={[
              { name: "Home", to: "/" },
              { name: "Services", to: "/services" },
              { name: "Management Consulting" },
            ]}
          />
        </div>
      </section>
    </Layout>
  );
}