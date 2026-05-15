import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { BottomBreadcrumbs } from "@/components/common/BottomBreadcrumbs";
import { Shield } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <Layout>
      <Helmet>
        <title>Privacy Policy | Velcore Tech</title>
        <meta 
          name="description" 
          content="Velcore Tech LLC's privacy policy explains how we collect, use, and protect your personal information when you use our managed IT and cybersecurity services."
        />
        <link rel="canonical" href="https://velcoretech.com/privacy" />
      </Helmet>

      {/* Hero Section */}
      <section className="section-padding bg-background relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[300px] bg-hero-glow pointer-events-none" />
        <div className="container-tight relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Shield className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary/90">Legal</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-muted-foreground">
              Last updated: May 10, 2026
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="pb-20 bg-background">
        <div className="container-tight">
          <div className="max-w-3xl mx-auto prose prose-invert">
            <div className="space-y-8">
              {/* Introduction */}
              <div className="p-6 rounded-2xl bg-card border border-border">
                <h2 className="text-2xl font-bold mb-4">Introduction</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Velcore Tech LLC ("we," "our," or "us") is committed to protecting your privacy. 
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your 
                  information when you visit our website or use our managed IT and cybersecurity services.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  If you have questions about this policy, you can contact us at:{' '}
                  <a href="mailto:info@velcoretech.com" className="text-primary hover:underline">
                    info@velcoretech.com
                  </a>
                </p>
              </div>

              {/* Information We Collect */}
              <div className="p-6 rounded-2xl bg-card border border-border">
                <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Personal Information</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We may collect personal information such as:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2">
                    <li>Name and contact information (email, phone number, business address)</li>
                    <li>Company name and job title</li>
                    <li>Billing and payment information</li>
                    <li>Account credentials for services we manage (with your authorization)</li>
                  </ul>

                  <h3 className="text-lg font-semibold mt-4">Technical Information</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    When you use our website or services, we may automatically collect:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2">
                    <li>IP address and browser type</li>
                    <li>Device information and operating system</li>
                    <li>Usage data and interactions with our website</li>
                    <li>Cookies and similar tracking technologies</li>
                  </ul>
                </div>
              </div>

              {/* How We Use Your Information */}
              <div className="p-6 rounded-2xl bg-card border border-border">
                <h2 className="text-2xl font-bold mb-4">How We Use Your Information</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We use the information we collect to:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Provide, operate, and maintain our managed IT and cybersecurity services</li>
                  <li>Process transactions and send related information</li>
                  <li>Communicate with you about services, updates, and security alerts</li>
                  <li>Improve and personalize your experience</li>
                  <li>Comply with legal obligations and enforce our agreements</li>
                  <li>Detect and prevent fraud or security incidents</li>
                </ul>
              </div>

              {/* Data Security */}
              <div className="p-6 rounded-2xl bg-card border border-border">
                <h2 className="text-2xl font-bold mb-4">Data Security</h2>
                <p className="text-muted-foreground leading-relaxed">
                  As a security-first IT company, we implement appropriate technical and organizational 
                  measures to protect your personal information. This includes encryption, access controls, 
                  and regular security assessments. However, no method of transmission over the Internet 
                  is 100% secure, and we cannot guarantee absolute security.
                </p>
              </div>

              {/* Cookies */}
              <div className="p-6 rounded-2xl bg-card border border-border">
                <h2 className="text-2xl font-bold mb-4">Cookies and Tracking Technologies</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We use cookies and similar technologies to enhance your experience on our website. 
                  You can control cookies through your browser settings and our cookie consent tool.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  For more information about how we use cookies, please see our{' '}
                  <Link to="/legal" className="text-primary hover:underline">Cookie Policy</Link>.
                </p>
              </div>

              {/* Third-Party Disclosure */}
              <div className="p-6 rounded-2xl bg-card border border-border">
                <h2 className="text-2xl font-bold mb-4">Third-Party Disclosure</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We do not sell, trade, or otherwise transfer your personal information to third parties 
                  without your consent, except as described in this policy or required by law. We may share 
                  information with trusted service providers who assist us in operating our business, subject 
                  to confidentiality agreements.
                </p>
              </div>

              {/* Your Rights */}
              <div className="p-6 rounded-2xl bg-card border border-border">
                <h2 className="text-2xl font-bold mb-4">Your Rights</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Depending on your location, you may have the right to:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Access the personal information we hold about you</li>
                  <li>Correct inaccurate or incomplete information</li>
                  <li>Request deletion of your personal information</li>
                  <li>Opt out of marketing communications</li>
                  <li>Withdraw consent at any time</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  To exercise these rights, please contact us at{' '}
                  <a href="mailto:info@velcoretech.com" className="text-primary hover:underline">
                    info@velcoretech.com
                  </a>.
                </p>
              </div>

              {/* Changes to Policy */}
              <div className="p-6 rounded-2xl bg-card border border-border">
                <h2 className="text-2xl font-bold mb-4">Changes to This Policy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may update this Privacy Policy from time to time. We will notify you of any changes 
                  by posting the new policy on this page and updating the "Last updated" date. We encourage 
                  you to review this policy periodically.
                </p>
              </div>

              {/* Contact Us */}
              <div className="p-6 rounded-2xl bg-card border border-border">
                <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have questions or concerns about this Privacy Policy or our data practices, 
                  please contact us at:
                </p>
                <div className="mt-4 p-4 rounded-xl bg-primary/5 border border-primary/20">
                  <p className="font-medium">Velcore Tech LLC</p>
                  <p className="text-sm text-muted-foreground">280 Harvey West Blvd</p>
                  <p className="text-sm text-muted-foreground">Santa Cruz, CA 95060</p>
                  <p className="text-sm text-muted-foreground mt-2">Email: info@velcoretech.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BottomBreadcrumbs items={[{ name: "Home", to: "/" }, { name: "Privacy Policy" }]} />
    </Layout>
  );
}