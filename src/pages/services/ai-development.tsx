import { useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Bot,
  BrainCircuit,
  Workflow,
  Zap,
  CheckCircle2,
  ArrowRight,
  Shield,
  BarChart3,
  Code2,
  MessageSquare,
  Lock,
  Server,
} from "lucide-react";

import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/common/SectionHeader";
import { BottomBreadcrumbs } from "@/components/common/BottomBreadcrumbs";

const OG_IMAGE = "https://velcoretech.com/og-image.png";

export default function AIDevelopment() {
  const outcomes = useMemo(
    () => [
      "Practical AI deployed in weeks, not quarters — sized for what you actually need",
      "Custom AI assistants that know your business, policies, and tone",
      "Automated workflows that cut repetitive work and free staff for higher-value tasks",
      "Security-aware implementations that don't introduce data exposure or compliance risk",
    ],
    []
  );

  const whatWeCover = useMemo(
    () => [
      {
        title: "AI Strategy & Consultation",
        desc: "Identify where AI creates real value for your business and build a roadmap you can execute.",
        items: [
          "Use-case discovery: operations, support, sales, security",
          "Build vs. buy vs. integrate analysis",
          "ROI framing and prioritized implementation roadmap",
          "Vendor / model selection guidance (Claude, OpenAI, open-source)",
        ],
        icon: BrainCircuit,
      },
      {
        title: "AI Assistant Implementations",
        desc: "Deploy purpose-built AI assistants for your team — internal operations, client-facing support, or both.",
        items: [
          "OpenClaw — internal AI workspace for your team",
          "Hermes — AI messaging and client communication assistant",
          "Custom assistant personas tailored to your brand and workflows",
          "Knowledge base integration and secure context grounding",
        ],
        icon: Bot,
      },
      {
        title: "AI Workflow Automation",
        desc: "Connect AI to the tools you already use and eliminate the manual steps in between.",
        items: [
          "n8n and Zapier-based AI workflow design and deployment",
          "Trigger-based automations: tickets, emails, forms, alerts",
          "AI-enhanced triage, routing, and escalation for IT and support",
          "Scheduled reporting, digests, and status summaries via AI",
        ],
        icon: Workflow,
      },
      {
        title: "Custom AI Development",
        desc: "Need something built from scratch? We design and deploy production-grade AI integrations.",
        items: [
          "Claude API and OpenAI API integrations (chat, function calling, embeddings)",
          "Retrieval-augmented generation (RAG) pipelines for private data",
          "Secure API design with auth, rate limiting, and audit logging",
          "Security-reviewed deployment: no training-data leakage by design",
        ],
        icon: Code2,
      },
    ],
    []
  );

  const howWeOperate = useMemo(
    () => [
      {
        step: "01",
        title: "Discovery",
        desc: "We learn your workflows, pain points, and data environment — then identify the two or three AI use cases with the clearest near-term ROI.",
      },
      {
        step: "02",
        title: "Build",
        desc: "We design, build, and test the solution: assistant configuration, integrations, knowledge grounding, and security controls — scoped tightly to what ships.",
      },
      {
        step: "03",
        title: "Deploy & Operate",
        desc: "We deploy to your environment, train your team, and provide ongoing support — including updates as model capabilities evolve.",
      },
    ],
    []
  );

  const deliverables = useMemo(
    () => [
      "AI use-case assessment with ROI estimates and implementation priority",
      "Configured assistant(s) with knowledge base, prompt scaffolding, and guardrails",
      "Workflow automations with documentation and runbook",
      "Security review: data handling, access controls, and audit trail",
      "Team onboarding session and short reference guide",
    ],
    []
  );

  const related = useMemo(
    () => [
      { title: "Managed IT", to: "/services/managed-it", icon: Server },
      { title: "Cybersecurity", to: "/services/cybersecurity", icon: Shield },
      { title: "Consulting", to: "/services/consulting", icon: BarChart3 },
      { title: "Cloud", to: "/services/cloud", icon: Workflow },
      { title: "Edge Security", to: "/services/edge", icon: Lock },
    ],
    []
  );

  return (
    <Layout>
      <Helmet>
        <title>AI Development & Automation | Velcore Tech</title>
        <meta
          name="description"
          content="AI strategy, custom assistants, workflow automation, and secure AI integrations for SMBs. Practical AI implementations — OpenClaw, Hermes, Claude API — deployed in weeks."
        />
        <link rel="canonical" href="https://velcoretech.com/services/ai-development" />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Velcore Tech" />
        <meta property="og:title" content="AI Development & Automation | Velcore Tech" />
        <meta
          property="og:description"
          content="Purpose-built AI assistants, workflow automation, and custom AI development for small and mid-sized businesses — security-aware and priced for SMBs."
        />
        <meta property="og:url" content="https://velcoretech.com/services/ai-development" />
        <meta property="og:image" content={OG_IMAGE} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AI Development & Automation | Velcore Tech" />
        <meta
          name="twitter:description"
          content="AI assistants, automation, and custom AI development — built for SMBs and deployed with security in mind."
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
              <BrainCircuit className="h-4 w-4" />
              AI Development &amp; Automation
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              AI Built for Your Business
              <br />
              <span className="text-gradient">Not a Pilot. An Implementation.</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl leading-relaxed">
              Practical AI assistants, workflow automation, and secure custom
              integrations — sized for SMBs and deployed in weeks, not quarters.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="gradient" size="lg" asChild>
                <Link to="/contact">
                  Talk to Us
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/assessment">
                  Start Assessment
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>

            <p className="mt-6 text-sm text-muted-foreground">
              CA-based, remote-first nationwide. On-site available where needed.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Deep-link anchor */}
      <div id="ai-development" className="scroll-mt-24" aria-hidden="true" />

      {/* OUTCOMES */}
      <section className="section-padding bg-background">
        <div className="container-tight">
          <SectionHeader
            badge="Outcomes"
            title="AI that actually ships."
            description="No vague pilots or overbuilt platforms. We identify what creates value, build it cleanly, and operate it ongoing."
          />

          <div className="mt-14 rounded-3xl border border-border bg-card p-8 md:p-10">
            <div className="flex items-start gap-4">
              <div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary">
                <Zap className="h-6 w-6" />
              </div>
              <div className="min-w-0">
                <h2 className="text-2xl md:text-3xl font-bold leading-tight">
                  What clients typically get
                </h2>
                <p className="text-muted-foreground mt-2 leading-relaxed">
                  Working AI, not slide decks — with security reviewed from day one.
                </p>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6 mt-8">
              {outcomes.map((x) => (
                <div key={x} className="rounded-2xl border border-border bg-background p-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div className="leading-relaxed">{x}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHAT WE COVER */}
      <section className="section-padding bg-card">
        <div className="container-tight">
          <SectionHeader
            badge="Scope"
            title="What we build and deploy"
            description="From strategy to production — the full stack of AI work for SMBs."
          />

          <div className="grid md:grid-cols-2 gap-6 mt-14">
            {whatWeCover.map((x, i) => (
              <motion.div
                key={x.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.06 }}
                className="rounded-3xl border border-border bg-background p-7"
              >
                <div className="flex items-start gap-4">
                  <div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary">
                    <x.icon className="h-6 w-6" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-lg font-semibold">{x.title}</div>
                    <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{x.desc}</p>
                  </div>
                </div>

                <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
                  {x.items.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* LOW-COST FOR SMBs CALLOUT */}
      <section className="section-padding bg-background">
        <div className="container-tight">
          <div className="rounded-3xl border border-primary/20 bg-primary/5 p-8 md:p-10">
            <div className="flex items-start gap-4 mb-6">
              <div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary">
                <MessageSquare className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-2">Low-cost AI for SMBs</h2>
                <p className="text-muted-foreground leading-relaxed max-w-2xl">
                  Enterprise AI is overkill for most businesses under 200 people. We size
                  implementations to what you actually need — lean assistants, targeted
                  automation, and integrations that pay back in weeks. No six-figure
                  platforms, no year-long deployments.
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              {[
                {
                  name: "OpenClaw",
                  desc: "AI workspace for internal teams — memory, tasks, and context that persists across sessions.",
                  icon: Bot,
                },
                {
                  name: "Hermes",
                  desc: "AI communication assistant — drafts, summaries, and client-facing messaging at your tone.",
                  icon: MessageSquare,
                },
                {
                  name: "Custom Build",
                  desc: "Need something specific? We design and deploy from scratch using Claude, OpenAI, or open-source models.",
                  icon: Code2,
                },
              ].map((p) => (
                <div key={p.name} className="rounded-2xl border border-border bg-background p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <p.icon className="h-4 w-4 text-primary" />
                    <span className="font-semibold text-sm">{p.name}</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HOW WE OPERATE */}
      <section className="section-padding bg-card">
        <div className="container-tight">
          <SectionHeader
            badge="Operating Model"
            title="Discovery → Build → Deploy"
            description="We move fast because we stay focused. Each engagement has a defined scope and a working deliverable at the end."
          />

          <div className="grid md:grid-cols-3 gap-6 mt-14">
            {howWeOperate.map((a, i) => (
              <motion.div
                key={a.step}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.08 }}
                className="feature-card"
              >
                <div className="text-sm text-primary font-semibold mb-3">{a.step}</div>
                <div className="text-lg font-semibold mb-2">{a.title}</div>
                <div className="text-sm text-muted-foreground leading-relaxed">{a.desc}</div>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 rounded-3xl border border-border bg-background p-8">
            <div className="flex items-start gap-4">
              <div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary">
                <BarChart3 className="h-6 w-6" />
              </div>
              <div className="min-w-0">
                <div className="text-lg font-semibold">Deliverables</div>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                  Concrete outputs at the end of every engagement.
                </p>
              </div>
            </div>

            <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
              {deliverables.map((d) => (
                <li key={d}>• {d}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* RELATED */}
      <section className="section-padding bg-background">
        <div className="container-tight">
          <SectionHeader
            badge="Related"
            title="AI pairs well with these pillars"
            description="AI is most effective when the underlying IT and security foundation is in place."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
            {related.map((r) => (
              <Link
                key={r.to}
                to={r.to}
                className="feature-card group block transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                    <r.icon className="h-6 w-6" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-lg group-hover:text-primary transition-colors">
                      {r.title}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      How this pillar integrates with AI delivery.
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-end gap-2 text-sm font-medium text-primary">
                  <span className="opacity-90 group-hover:opacity-100 transition-opacity">Learn more</span>
                  <ArrowRight className="h-4 w-4 translate-x-0 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="section-padding bg-card">
        <div className="container-tight">
          <div className="p-8 rounded-3xl bg-background border border-border relative overflow-hidden">
            <div className="absolute inset-0 bg-hero-glow opacity-40 pointer-events-none" />
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl font-bold mb-2">Ready to put AI to work?</h3>
                <p className="text-muted-foreground">
                  Start with a conversation. We'll tell you where AI makes sense for your business and what it would take to get there.
                </p>
              </div>
              <div className="flex gap-3">
                <Button variant="gradient" size="lg" asChild>
                  <Link to="/contact">
                    Talk to Us <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/assessment">
                    Assessment <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          <BottomBreadcrumbs
            items={[
              { name: "Home", to: "/" },
              { name: "Services", to: "/services" },
              { name: "AI Development" },
            ]}
          />
        </div>
      </section>
    </Layout>
  );
}
