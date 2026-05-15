import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowRight, BookOpen, Calendar, Clock, Tag } from "lucide-react";

import { Layout } from "@/components/layout/Layout";
import { SectionHeader } from "@/components/common/SectionHeader";
import { BottomBreadcrumbs } from "@/components/common/BottomBreadcrumbs";
import { Button } from "@/components/ui/button";
import { getPublishedPosts } from "@/content/posts";
import { getTrackingParams } from "@/components/common/Tracking";

const CARD_BASE = "rounded-3xl bg-card p-7 flex flex-col h-full";
const GLOW_CARD =
  "border border-border " +
  "transition-[border-color,box-shadow] duration-200 " +
  "hover:border-primary/30 hover:ring-1 hover:ring-primary/20 " +
  "hover:shadow-[0_0_0_1px_hsl(var(--primary)/0.14),0_0_18px_hsl(var(--primary)/0.10)] " +
  "transform-gpu will-change-[box-shadow]";

function formatDate(iso: string) {
  return new Date(iso + "T12:00:00Z").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function Resources() {
  const posts = getPublishedPosts();
  const canonical = "https://velcoretech.com/resources";

  // Blog/Series JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": canonical,
    name: "Velcore Tech Resources",
    description:
      "Practical guidance on Microsoft 365 governance, cybersecurity baselines, SOC 2 readiness, and operational discipline for growing organizations.",
    url: canonical,
    publisher: {
      "@type": "Organization",
      name: "Velcore Tech",
      url: "https://velcoretech.com/",
    },
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      datePublished: p.date,
      url: `${canonical}/${p.slug}`,
    })),
  };

  return (
    <Layout>
      <Helmet>
        <title>Resources — Practical IT & Security Guidance | Velcore Tech</title>
        <meta
          name="description"
          content="Practical guidance on Microsoft 365 governance, cybersecurity baselines, SOC 2 readiness, and operational discipline — written by the team for growing organizations."
        />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Resources — Velcore Tech" />
        <meta
          property="og:description"
          content="Practical guidance on Microsoft 365 governance, cybersecurity baselines, SOC 2 readiness, and operational discipline."
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
              <BookOpen className="h-4 w-4" />
              <span>Resources</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold tracking-tight mb-4">
              Practical Guidance.
              <span className="text-gradient block mt-2">Written for Operators.</span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              The same playbooks we apply to client engagements — Microsoft 365 governance,
              cybersecurity baselines, SOC 2 readiness, and the operational discipline that
              keeps growing teams defensible.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Posts grid */}
      <section className="py-20 bg-background">
        <div className="container-tight">
          {posts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground">No posts published yet — check back soon.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post, i) => (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.2) }}
                  className={[CARD_BASE, GLOW_CARD].join(" ")}
                >
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wide uppercase bg-secondary text-secondary-foreground border border-border"
                      >
                        <Tag className="h-2.5 w-2.5" />
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h2 className="text-xl font-bold leading-tight mb-3 text-foreground">
                    <Link
                      to={`/resources/${post.slug}${getTrackingParams(
                        "resources_index",
                        "post_card",
                        post.slug,
                      )}`}
                      className="hover:text-primary transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h2>

                  <p className="text-muted-foreground leading-relaxed mb-6 flex-1">
                    {post.summary}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-muted-foreground border-t border-border pt-4">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      {formatDate(post.date)}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" />
                      {post.readTime}
                    </span>
                  </div>

                  <div className="mt-5">
                    <Link
                      to={`/resources/${post.slug}${getTrackingParams(
                        "resources_index",
                        "post_cta",
                        post.slug,
                      )}`}
                      className="inline-flex items-center text-sm font-medium text-primary hover:gap-3 transition-all"
                    >
                      Read article <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-card border-t border-border">
        <div className="container-tight">
          <SectionHeader
            badge="Need a hand?"
            title="From Reading to Doing"
            description="If a topic above maps to something you're working on, an assessment translates the post into a punch list scoped to your environment."
          />
          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="outline-glow" size="xl" asChild>
              <Link to={`/assessment${getTrackingParams("resources", "final_cta", "assessment")}`}>
                Start Assessment <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline-glow" size="xl" asChild>
              <Link to={`/contact${getTrackingParams("resources", "final_cta", "talk_to_us")}`}>
                Talk to us <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <BottomBreadcrumbs items={[{ name: "Home", to: "/" }, { name: "Resources" }]} />
    </Layout>
  );
}
