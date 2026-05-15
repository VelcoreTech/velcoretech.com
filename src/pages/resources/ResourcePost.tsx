import { Suspense } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Calendar, Clock, Tag } from "lucide-react";

import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { BottomBreadcrumbs } from "@/components/common/BottomBreadcrumbs";
import NotFound from "@/pages/NotFound";
import { getPost, getPublishedPosts } from "@/content/posts";
import { getTrackingParams } from "@/components/common/Tracking";

function formatDate(iso: string) {
  return new Date(iso + "T12:00:00Z").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function ResourcePost() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPost(slug) : undefined;

  if (!post) return <NotFound />;

  const Body = post.body;
  const canonical = `https://velcoretech.com/resources/${post.slug}`;

  // Pull up to 2 related posts (different slug, share at least one tag).
  const related = getPublishedPosts()
    .filter((p) => p.slug !== post.slug && p.tags.some((t) => post.tags.includes(t)))
    .slice(0, 2);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.summary,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Organization", name: post.author },
    publisher: {
      "@type": "Organization",
      name: "Velcore Tech",
      url: "https://velcoretech.com/",
      logo: {
        "@type": "ImageObject",
        url: "https://velcoretech.com/android-chrome-512x512.png",
      },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
    keywords: post.tags.join(", "),
    url: canonical,
  };

  return (
    <Layout>
      <Helmet>
        <title>{post.title} | Velcore Tech</title>
        <meta name="description" content={post.summary} />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.summary} />
        <meta property="og:url" content={canonical} />
        <meta property="article:published_time" content={post.date} />
        {post.tags.map((t) => (
          <meta key={t} property="article:tag" content={t} />
        ))}
        <script type="application/ld+json">{JSON.stringify(articleJsonLd)}</script>
      </Helmet>

      {/* Hero / header */}
      <section className="relative overflow-hidden hero-gradient pt-24 pb-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[500px] bg-hero-glow opacity-30 pointer-events-none" />
        <div className="container-tight relative z-10 max-w-3xl mx-auto">
          <Link
            to="/resources"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            All resources
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-wrap gap-2 mb-5">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wide uppercase bg-primary/10 text-primary border border-primary/20"
                >
                  <Tag className="h-2.5 w-2.5" />
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-5 text-foreground leading-[1.15]">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {formatDate(post.date)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {post.readTime}
              </span>
              <span className="text-muted-foreground/60">·</span>
              <span>By {post.author}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Body */}
      <section className="py-12 bg-background">
        <div className="container-tight max-w-3xl mx-auto">
          <article
            className={[
              "prose prose-lg max-w-none",
              "prose-headings:text-foreground prose-headings:font-bold prose-headings:tracking-tight",
              "prose-h2:scroll-mt-24 prose-h2:mt-12 prose-h2:mb-4",
              "prose-h3:mt-8 prose-h3:mb-3",
              "prose-p:text-muted-foreground prose-p:leading-relaxed",
              "prose-li:text-muted-foreground prose-li:leading-relaxed",
              "prose-strong:text-foreground prose-strong:font-semibold",
              "prose-a:text-primary prose-a:no-underline hover:prose-a:underline",
              "prose-code:text-foreground prose-code:bg-secondary prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none",
              "prose-blockquote:border-primary prose-blockquote:text-foreground",
              "[&_.lead]:text-xl [&_.lead]:text-muted-foreground [&_.lead]:leading-relaxed [&_.lead]:mb-8",
            ].join(" ")}
          >
            <Suspense fallback={<p className="text-muted-foreground">Loading…</p>}>
              <Body />
            </Suspense>
          </article>
        </div>
      </section>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="py-16 bg-card border-t border-border">
          <div className="container-tight max-w-3xl mx-auto">
            <h2 className="text-xs font-semibold tracking-wide uppercase text-muted-foreground mb-6">
              Related reading
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  to={`/resources/${r.slug}`}
                  className="group rounded-2xl bg-background border border-border p-5 hover:border-primary/40 transition-colors"
                >
                  <div className="text-[10px] font-semibold tracking-wide uppercase text-primary mb-2">
                    {r.tags[0]}
                  </div>
                  <div className="font-semibold leading-snug text-foreground group-hover:text-primary transition-colors">
                    {r.title}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 bg-background border-t border-border">
        <div className="container-tight max-w-3xl mx-auto">
          <div className="rounded-3xl bg-card border border-border p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-hero-glow opacity-30 pointer-events-none" />
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <h3 className="text-xl md:text-2xl font-bold mb-2">
                  Want this scoped to your environment?
                </h3>
                <p className="text-muted-foreground">
                  An IT Assessment turns articles like this into a prioritized punch list with
                  ownership, cost ranges, and timing.
                </p>
              </div>
              <div className="flex gap-3 shrink-0">
                <Button variant="outline-glow" asChild>
                  <Link
                    to={`/assessment${getTrackingParams("resource_post", "post_cta", post.slug)}`}
                  >
                    Start Assessment <ArrowRight className="ml-2 h-4 w-4" />
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
          { name: "Resources", to: "/resources" },
          { name: post.title },
        ]}
      />
    </Layout>
  );
}
