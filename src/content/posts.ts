import type { ComponentType } from "react";
import { lazy } from "react";

export type PostMeta = {
  /** URL slug — must match the route at /resources/{slug}. Lowercase, hyphenated. */
  slug: string;
  title: string;
  /** 1-2 sentence summary for index cards + meta description. ≤ 200 chars. */
  summary: string;
  /** ISO date string for publishedTime + index sort. */
  date: string;
  /** Estimated read time, e.g. "6 min read". */
  readTime: string;
  /** Author display name — currently always "Velcore Tech" or "Amr Sorour". */
  author: string;
  /** Free-form taxonomy. Used as visible chips and for "related" filtering. */
  tags: string[];
  /** Set true to hide from index but keep route navigable for review. */
  draft?: boolean;
  /** Lazy-loaded component that renders the post body inside <article className="prose">. */
  body: ComponentType;
};

/* ----------------------------------------------------------------------------
 * Adding a new post:
 *   1. Create a body component at src/pages/resources/posts/{slug}.tsx
 *   2. Add a PostMeta entry below
 *   3. Add the URL to public/sitemap.xml
 * The route at /resources/:slug is handled by ResourcePost.tsx automatically.
 * -------------------------------------------------------------------------- */

export const posts: PostMeta[] = [
  {
    slug: "soc2-type1-checklist",
    title: "SOC 2 Type I Readiness: A Practical Checklist for 50-Person Firms",
    summary:
      "What Type I actually covers, what auditors request, the four gaps that sink first attempts, and a realistic three-to-six month timeline to get there.",
    date: "2026-05-10",
    readTime: "9 min read",
    author: "Velcore Tech",
    tags: ["SOC 2", "Compliance", "Security Baseline"],
    body: lazy(() => import("@/pages/resources/posts/soc2-type1-checklist")),
  },
  {
    slug: "ai-assistants-for-smb",
    title: "AI Assistants for Small Businesses: What Actually Works",
    summary:
      "The use cases that create real ROI, the ones that don't, how to ground an assistant in your business, and why security matters before you deploy anything.",
    date: "2026-04-28",
    readTime: "8 min read",
    author: "Velcore Tech",
    tags: ["AI", "Automation", "SMB"],
    body: lazy(() => import("@/pages/resources/posts/ai-assistants-for-smb")),
  },
  {
    slug: "m365-conditional-access-smb",
    title: "Microsoft 365 Conditional Access: A Practical Baseline for Growing Teams",
    summary:
      "The minimum-viable Conditional Access policy set we deploy on day one — what it blocks, why each rule exists, and how to roll it out without breaking your team.",
    date: "2026-05-07",
    readTime: "8 min read",
    author: "Velcore Tech",
    tags: ["Microsoft 365", "Identity", "Security Baseline"],
    body: lazy(() => import("@/pages/resources/posts/m365-conditional-access-smb")),
  },
  {
    slug: "rag-vs-finetuning",
    title: "RAG vs. Fine-Tuning: How to Pick the Right AI Approach for Your Data",
    summary:
      "RAG and fine-tuning solve different problems. Here's the honest breakdown of when to use each — plus the cost reality most AI vendors won't tell you.",
    date: "2026-03-15",
    readTime: "7 min read",
    author: "Velcore Tech",
    tags: ["AI", "AI Development", "Technical"],
    body: lazy(() => import("@/pages/resources/posts/rag-vs-finetuning")),
  },
  {
    slug: "ai-workflow-automation-starter",
    title: "5 AI Automations Any SMB Can Deploy This Week",
    summary:
      "Ticket triage, incident summaries, meeting action items, lead qualification, and weekly ops digests — practical automations with real tools and realistic time estimates.",
    date: "2026-02-20",
    readTime: "7 min read",
    author: "Velcore Tech",
    tags: ["AI", "Automation", "Workflow"],
    body: lazy(() => import("@/pages/resources/posts/ai-workflow-automation-starter")),
  },
  {
    slug: "it-offboarding-checklist",
    title: "The IT Offboarding Checklist That Prevents Breaches",
    summary:
      "Orphaned accounts and retained access are among the most common sources of breach exposure. This is the checklist we run on every offboarding — including privileged accounts.",
    date: "2026-01-14",
    readTime: "8 min read",
    author: "Velcore Tech",
    tags: ["Identity", "Security Baseline", "IT Operations"],
    body: lazy(() => import("@/pages/resources/posts/it-offboarding-checklist")),
  },
  {
    slug: "managed-it-vs-internal-it",
    title: "Managed IT vs. Internal IT: How to Know Which Model Fits",
    summary:
      "The comparison most companies get wrong because they ask the wrong question. A clear framework for choosing the model that matches your actual coverage needs.",
    date: "2025-12-09",
    readTime: "6 min read",
    author: "Velcore Tech",
    tags: ["Managed IT", "SMB", "Strategy"],
    body: lazy(() => import("@/pages/resources/posts/managed-it-vs-internal-it")),
  },
  {
    slug: "windows-endpoint-hardening",
    title: "Windows Endpoint Hardening: The Baseline Every SMB Should Have",
    summary:
      "Local admin rights, ASR rules, application control, patch governance, and logging — the controls that stop real attacks, explained without the enterprise complexity.",
    date: "2025-11-03",
    readTime: "10 min read",
    author: "Velcore Tech",
    tags: ["Endpoint Security", "Windows", "Security Baseline"],
    body: lazy(() => import("@/pages/resources/posts/windows-endpoint-hardening")),
  },
];

export function getPost(slug: string): PostMeta | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getPublishedPosts(): PostMeta[] {
  return posts
    .filter((p) => !p.draft)
    .slice()
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}
