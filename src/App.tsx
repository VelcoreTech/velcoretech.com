import React, { Suspense, useEffect, lazy } from "react";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { motion } from "framer-motion";

import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

// Optimize QueryClient with default options
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

/**
 * Lazy pages (core) with prefetch hints
 */
const Home = lazy(() => import(/* webpackPrefetch: true */ "@/pages/Home"));
const Services = lazy(() => import(/* webpackPrefetch: true */ "@/pages/services/what-we-do"));
const Pricing = lazy(() => import(/* webpackPrefetch: true */ "@/pages/Pricing"));
const Industries = lazy(() => import(/* webpackPrefetch: true */ "@/pages/Industries"));
const About = lazy(() => import(/* webpackPrefetch: true */ "@/pages/About"));
const Contact = lazy(() => import(/* webpackPrefetch: true */ "@/pages/Contact"));
const Assessment = lazy(() => import(/* webpackPrefetch: true */ "@/pages/Assessment"));
const CaseStudies = lazy(() => import(/* webpackPrefetch: true */ "@/pages/CaseStudies"));
const Resources = lazy(() => import(/* webpackPrefetch: true */ "@/pages/resources"));
const ResourcePost = lazy(() => import(/* webpackPrefetch: true */ "@/pages/resources/ResourcePost"));
const Status = lazy(() => import(/* webpackPrefetch: true */ "@/pages/Status"));
const NotFound = lazy(() => import(/* webpackPrefetch: true */ "@/pages/NotFound"));

const Privacy = lazy(() => import(/* webpackPrefetch: true */ "@/pages/legal/Privacy"));
const Legal = lazy(() => import(/* webpackPrefetch: true */ "@/pages/legal/Legal"));
const Terms = lazy(() => import(/* webpackPrefetch: true */ "@/pages/legal/Terms"));

/**
 * Service spokes (canonical)
 */
const ManagedIT = lazy(() => import("@/pages/services/managed-it"));
const ManagementConsulting = lazy(() => import("@/pages/services/consulting"));
const Cybersecurity = lazy(() => import("@/pages/services/cybersecurity"));
const Endpoint = lazy(() => import("@/pages/services/endpoint"));
const Networking = lazy(() => import("@/pages/services/networking"));
const CloudService = lazy(() => import("@/pages/services/cloud"));
const Edge = lazy(() => import("@/pages/services/edge"));
const AuditReady = lazy(() => import("@/pages/services/audit-ready"));
const SOC2 = lazy(() => import("@/pages/services/SOC2"));
const AIDevelopment = lazy(() => import("@/pages/services/ai-development"));

/**
 * Local SEO: Santa Cruz
 */
const SantaCruz = lazy(() => import("@/pages/city/santa-cruz"));
const SantaCruzManagedIT = lazy(() => import("@/pages/city/santa-cruz/managed-it"));
const SantaCruzCybersecurity = lazy(() => import("@/pages/city/santa-cruz/cybersecurity"));
const SantaCruzCloudMigration = lazy(() => import("@/pages/city/santa-cruz/cloud-migration"));
const SantaCruzEdgeSecurity = lazy(() => import("@/pages/city/santa-cruz/edge-security"));

/**
 * Local SEO: Bay Area
 */
const BayArea = lazy(() => import("@/pages/city/bay-area"));
const BayAreaManagedIT = lazy(() => import("@/pages/city/bay-area/managed-it"));
const BayAreaCybersecurity = lazy(() => import("@/pages/city/bay-area/cybersecurity"));
const BayAreaCloudMigration = lazy(() => import("@/pages/city/bay-area/cloud-migration"));
const BayAreaEdgeSecurity = lazy(() => import("@/pages/city/bay-area/edge-security"));

/**
 * Local SEO: Monterey Bay
 */
const MontereyBay = lazy(() => import("@/pages/city/monterey-bay"));
const MontereyBayManagedIT = lazy(() => import("@/pages/city/monterey-bay/managed-it"));
const MontereyBayCybersecurity = lazy(() => import("@/pages/city/monterey-bay/cybersecurity"));
const MontereyBayCloudMigration = lazy(() => import("@/pages/city/monterey-bay/cloud-migration"));
const MontereyBayEdgeSecurity = lazy(() => import("@/pages/city/monterey-bay/edge-security"));

/**
 * Handles:
 * - normal route changes => scroll to top
 * - hash routes (/services#Managed-IT) => scroll to element id (with retry)
 */

function RouteFallback() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50">
      <div className="relative w-48 h-48">
        {/* Grid background */}
        <div className="absolute inset-0 grid grid-cols-3 gap-1 opacity-20">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="border border-primary/30" />
          ))}
        </div>
        
        {/* Scanning line */}
        <motion.div
          className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent"
          animate={{
            top: ["0%", "100%", "0%"],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        
        {/* Center VT */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                textShadow: [
                  "0 0 0px rgb(var(--primary))",
                  "0 0 20px rgb(var(--primary))",
                  "0 0 0px rgb(var(--primary))",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="text-4xl font-bold text-primary"
            >
              VT
            </motion.div>
            <div className="text-xs text-muted-foreground mt-2">loading...</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Scroll behavior on route change:
//   - If the URL has a hash, scroll to that element (with retries while it mounts).
//   - Otherwise, scroll to top.
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.slice(1);
      let attempts = 0;
      const tryScroll = () => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "auto", block: "start" });
          return;
        }
        if (attempts++ < 10) {
          // Element may still be mounting (lazy routes / Suspense fallback).
          setTimeout(tryScroll, 60);
        }
      };
      tryScroll();
      return;
    }
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, hash]);

  return null;
}

// Add this CSS to your global styles
// .animate-spin-slow { animation: spin 3s linear infinite; }

function AppShell() {
  return (
    <>
      <Helmet titleTemplate="%s | Velcore Tech" defaultTitle="Velcore Tech">
        <meta
          name="description"
          content="Security-first IT operations, identity governance, cloud management, network architecture, backup & recovery, and edge security for growing organizations. Serving CA & nationwide."
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Velcore Tech" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        
        {/* Preload critical assets */}
        <link rel="preload" as="image" href="/src/assets/VT.png" />
        <link rel="preload" as="image" href="/src/assets/vt-bg.webp" />
      </Helmet>

      <Toaster />
      <Sonner />

        <BrowserRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
          <ScrollToTop />
          <Suspense fallback={<RouteFallback />}>
          <Routes>
            {/* Core */}
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />

            {/* Privacy & Legal */}
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/legal" element={<Legal />} />
            <Route path="/terms" element={<Terms />} />

            {/* Service spokes (canonical) */}
            <Route path="/services/managed-it" element={<ManagedIT />} />
            <Route path="/services/cybersecurity" element={<Cybersecurity />} />
            <Route path="/services/consulting" element={<ManagementConsulting />} />
            <Route path="/services/endpoint" element={<Endpoint />} />
            <Route path="/services/networking" element={<Networking />} />
            <Route path="/services/cloud" element={<CloudService />} />
            <Route path="/services/edge" element={<Edge />} />
            <Route path="/services/audit-ready" element={<AuditReady />} />
            <Route path="/services/soc2" element={<SOC2 />} />
            <Route path="/services/ai-development" element={<AIDevelopment />} />

            {/* Core secondary */}
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/industries" element={<Industries />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/assessment" element={<Assessment />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/resources/:slug" element={<ResourcePost />} />
            <Route path="/status" element={<Status />} />

            {/* Local SEO pages - Santa Cruz */}
            <Route path="/city/santa-cruz">
              <Route index element={<SantaCruz />} />
              <Route path="managed-it" element={<SantaCruzManagedIT />} />
              <Route path="cybersecurity" element={<SantaCruzCybersecurity />} />
              <Route path="cloud-migration" element={<SantaCruzCloudMigration />} />
              <Route path="edge-security" element={<SantaCruzEdgeSecurity />} />
            </Route>

            {/* Local SEO pages - Bay Area */}
            <Route path="/city/bay-area">
              <Route index element={<BayArea />} />
              <Route path="managed-it" element={<BayAreaManagedIT />} />
              <Route path="cybersecurity" element={<BayAreaCybersecurity />} />
              <Route path="cloud-migration" element={<BayAreaCloudMigration />} />
              <Route path="edge-security" element={<BayAreaEdgeSecurity />} />
            </Route>

            {/* Local SEO pages - Monterey Bay */}
            <Route path="/city/monterey-bay">
              <Route index element={<MontereyBay />} />
              <Route path="managed-it" element={<MontereyBayManagedIT />} />
              <Route path="cybersecurity" element={<MontereyBayCybersecurity />} />
              <Route path="cloud-migration" element={<MontereyBayCloudMigration />} />
              <Route path="edge-security" element={<MontereyBayEdgeSecurity />} />
            </Route>
            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <AppShell />
        </TooltipProvider>
        {/* Add React Query Devtools in development only */}
        <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-right" />
      </QueryClientProvider>
    </HelmetProvider>
  );
}