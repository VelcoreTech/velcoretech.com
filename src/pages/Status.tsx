import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Activity,
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Clock,
  Globe,
  Mail,
  Server,
  Shield,
} from "lucide-react";

import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { BottomBreadcrumbs } from "@/components/common/BottomBreadcrumbs";

type ComponentStatus = "operational" | "degraded" | "down" | "checking";

type StatusComponent = {
  id: string;
  name: string;
  description: string;
  icon: typeof Activity;
  /**
   * If set, the page will fetch this URL and treat 200 as operational, anything
   * else as degraded. Otherwise the component is shown as statically operational.
   */
  healthCheckUrl?: string;
  status: ComponentStatus;
};

const initialComponents: StatusComponent[] = [
  {
    id: "site",
    name: "Public Website",
    description: "velcoretech.com",
    icon: Globe,
    status: "operational",
  },
  {
    id: "api",
    name: "Contact API",
    description: "Form submissions and lead capture",
    icon: Server,
    healthCheckUrl: "/api/health",
    status: "checking",
  },
  {
    id: "mail",
    name: "Mail Pipeline",
    description: "Outbound notifications via Purelymail SMTP",
    icon: Mail,
    status: "operational",
  },
  {
    id: "support",
    name: "Client Support",
    description: "Help-desk response within published SLAs",
    icon: Shield,
    status: "operational",
  },
];

function StatusBadge({ status }: { status: ComponentStatus }) {
  const map: Record<ComponentStatus, { label: string; color: string; Icon: typeof Activity }> = {
    operational: {
      label: "Operational",
      color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
      Icon: CheckCircle2,
    },
    degraded: {
      label: "Degraded",
      color: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30",
      Icon: AlertCircle,
    },
    down: {
      label: "Outage",
      color: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/30",
      Icon: AlertCircle,
    },
    checking: {
      label: "Checking…",
      color: "bg-secondary text-muted-foreground border-border",
      Icon: Clock,
    },
  };
  const { label, color, Icon } = map[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${color}`}>
      <Icon className="h-3.5 w-3.5" />
      {label}
    </span>
  );
}

export default function Status() {
  const [components, setComponents] = useState<StatusComponent[]>(initialComponents);
  const [lastChecked, setLastChecked] = useState<Date | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function check() {
      const updated = await Promise.all(
        components.map(async (c) => {
          if (!c.healthCheckUrl) return c;
          try {
            const res = await fetch(c.healthCheckUrl, {
              method: "GET",
              cache: "no-store",
              signal: AbortSignal.timeout(5000),
            });
            return { ...c, status: (res.ok ? "operational" : "degraded") as ComponentStatus };
          } catch {
            return { ...c, status: "down" as ComponentStatus };
          }
        }),
      );
      if (!cancelled) {
        setComponents(updated);
        setLastChecked(new Date());
      }
    }

    check();
    const interval = setInterval(check, 60_000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const overall: ComponentStatus = components.some((c) => c.status === "down")
    ? "down"
    : components.some((c) => c.status === "degraded")
      ? "degraded"
      : components.every((c) => c.status === "operational")
        ? "operational"
        : "checking";

  const overallCopy: Record<ComponentStatus, string> = {
    operational: "All systems operational",
    degraded: "Some systems are degraded",
    down: "Active outage detected",
    checking: "Checking systems…",
  };

  return (
    <Layout>
      <Helmet>
        <title>Status — System Health | Velcore Tech</title>
        <meta
          name="description"
          content="Live operational status of Velcore Tech services — public site, contact API, mail pipeline, and client support."
        />
        <link rel="canonical" href="https://velcoretech.com/status" />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      {/* Hero / overall status */}
      <section className="relative overflow-hidden hero-gradient pt-24 pb-12">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[400px] bg-hero-glow opacity-30 pointer-events-none" />
        <div className="container-tight relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-primary/10 text-primary border border-primary/20 mb-4">
              <Activity className="h-4 w-4" />
              <span>Status</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              {overallCopy[overall]}
            </h1>

            <div className="inline-flex items-center justify-center">
              <StatusBadge status={overall} />
            </div>

            {lastChecked && (
              <p className="text-sm text-muted-foreground mt-6">
                Last checked {lastChecked.toLocaleTimeString()} · auto-refreshes every 60 seconds
              </p>
            )}
          </motion.div>
        </div>
      </section>

      {/* Components */}
      <section className="py-16 bg-background">
        <div className="container-tight max-w-3xl mx-auto">
          <div className="space-y-3">
            {components.map((c) => {
              const Icon = c.icon;
              return (
                <div
                  key={c.id}
                  className="rounded-2xl border border-border bg-card p-5 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20 shrink-0">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-semibold text-foreground">{c.name}</div>
                      <div className="text-sm text-muted-foreground truncate">{c.description}</div>
                    </div>
                  </div>
                  <StatusBadge status={c.status} />
                </div>
              );
            })}
          </div>

          <p className="text-xs text-muted-foreground mt-8 leading-relaxed">
            This is a simplified status overview. Components without an active health probe are
            shown as operational unless we've published an incident notice. To report an issue or
            request the latest incident history, contact{" "}
            <a
              href="mailto:info@velcoretech.com"
              className="text-primary hover:underline underline-offset-4"
            >
              info@velcoretech.com
            </a>
            .
          </p>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-12 bg-card border-t border-border">
        <div className="container-tight max-w-3xl mx-auto">
          <div className="rounded-3xl bg-background border border-border p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h2 className="text-xl font-bold mb-2">See something broken?</h2>
              <p className="text-muted-foreground text-sm">
                If our services aren't responding for you, please reach out so we can investigate.
              </p>
            </div>
            <Button variant="outline-glow" asChild>
              <Link to="/contact">
                Contact us <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <BottomBreadcrumbs items={[{ name: "Home", to: "/" }, { name: "Status" }]} />
    </Layout>
  );
}
