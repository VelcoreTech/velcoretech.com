import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { BottomBreadcrumbs } from "@/components/common/BottomBreadcrumbs";
import { Scale } from "lucide-react";

export default function LegalNotice() {
  return (
    <Layout>
      <Helmet>
        <title>Legal Notice | Velcore Tech</title>
        <meta 
          name="description" 
          content="Legal information, terms of service, and disclaimers for Velcore Tech LLC's managed IT and cybersecurity services."
        />
        <link rel="canonical" href="https://velcoretech.com/legal" />
      </Helmet>

      {/* Hero Section */}
      <section className="section-padding bg-background relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[300px] bg-hero-glow pointer-events-none" />
        <div className="container-tight relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Scale className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary/90">Legal</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Legal Notice
            </h1>
            <p className="text-xl text-muted-foreground">
              Terms of Service, Disclaimers, and Legal Information
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="pb-20 bg-background">
        <div className="container-tight">
          <div className="max-w-3xl mx-auto prose prose-invert">
            <div className="space-y-8">
              {/* Company Information */}
              <div className="p-6 rounded-2xl bg-card border border-border">
                <h2 className="text-2xl font-bold mb-4">Company Information</h2>
                <p className="text-muted-foreground leading-relaxed">
                  <strong>Velcore Tech LLC</strong> is a limited liability company registered in the State of California.
                </p>
                <div className="mt-4 space-y-2">
                  <p><span className="font-medium">Registered Address:</span>Santa Cruz, CA 95060</p>
                  <p><span className="font-medium">Email:</span> <a href="mailto:info@velcoretech.com" className="text-primary hover:underline">info@velcoretech.com</a></p>
                  <p><span className="font-medium">Phone:</span> (831) 334-7943</p>
                </div>
              </div>

              {/* Terms of Service */}
              <div className="p-6 rounded-2xl bg-card border border-border">
                <h2 className="text-2xl font-bold mb-4">Terms of Service</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  By accessing our website or using our services, you agree to be bound by these Terms of Service.
                </p>
                
                <h3 className="text-lg font-semibold mt-4 mb-2">Service Agreements</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Specific services provided by Velcore Tech LLC are governed by separate service agreements 
                  executed between the company and its clients. These Terms do not supersede or replace 
                  the terms of such agreements.
                </p>

                <h3 className="text-lg font-semibold mt-4 mb-2">Intellectual Property</h3>
                <p className="text-muted-foreground leading-relaxed">
                  All content on this website, including text, graphics, logos, and software, is the property 
                  of Velcore Tech LLC and is protected by United States and international copyright laws.
                </p>

                <h3 className="text-lg font-semibold mt-4 mb-2">Limitation of Liability</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To the maximum extent permitted by law, Velcore Tech LLC shall not be liable for any 
                  indirect, incidental, special, consequential, or punitive damages arising from your use 
                  of our website or services.
                </p>
              </div>

              {/* Disclaimers */}
              <div className="p-6 rounded-2xl bg-card border border-border">
                <h2 className="text-2xl font-bold mb-4">Disclaimers</h2>
                
                <h3 className="text-lg font-semibold mb-2">No Warranty</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Our website and services are provided "as is" without any warranties, express or implied. 
                  We do not guarantee that our website will be uninterrupted, secure, or error-free.
                </p>

                <h3 className="text-lg font-semibold mt-4 mb-2">Professional Advice</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Information provided on this website is for general informational purposes only and does 
                  not constitute professional advice. You should consult with qualified professionals for 
                  advice specific to your situation.
                </p>

                <h3 className="text-lg font-semibold mt-4 mb-2">Third-Party Links</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Our website may contain links to third-party websites. We are not responsible for the 
                  content or practices of these websites and provide these links for your convenience only.
                </p>
              </div>

              {/* Cookie Policy */}
              <div className="p-6 rounded-2xl bg-card border border-border">
                <h2 className="text-2xl font-bold mb-4">Cookie Policy</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Our website uses cookies to enhance your browsing experience. By continuing to use our site, 
                  you consent to our use of cookies in accordance with this policy.
                </p>

                <h3 className="text-lg font-semibold mb-2">Types of Cookies We Use</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li><span className="font-medium">Essential:</span> Required for basic website functionality</li>
                  <li><span className="font-medium">Functional:</span> Remember your preferences and settings</li>
                  <li><span className="font-medium">Marketing:</span> Track website usage and improve our content</li>
                </ul>

                <p className="text-muted-foreground leading-relaxed mt-4">
                  You can manage your cookie preferences through our{' '}
                  <Link to="/privacy" className="text-primary hover:underline">cookie consent tool</Link>.
                </p>
              </div>

              {/* Governing Law */}
              <div className="p-6 rounded-2xl bg-card border border-border">
                <h2 className="text-2xl font-bold mb-4">Governing Law</h2>
                <p className="text-muted-foreground leading-relaxed">
                  These legal notices and any disputes arising from them shall be governed by the laws of 
                  the State of California without regard to its conflict of law provisions.
                </p>
              </div>

              {/* Contact for Legal Matters */}
              <div className="p-6 rounded-2xl bg-card border border-border">
                <h2 className="text-2xl font-bold mb-4">Contact for Legal Matters</h2>
                <p className="text-muted-foreground leading-relaxed">
                  For legal inquiries or formal notices, please contact us at:
                </p>
                <div className="mt-4 p-4 rounded-xl bg-primary/5 border border-primary/20">
                  <p className="font-medium">Velcore Tech LLC</p>
                  <p className="text-sm text-muted-foreground">Santa Cruz, CA 95060</p>
                  <p className="text-sm text-muted-foreground mt-2">Email: legal@velcoretech.com</p>
                  <p className="text-sm text-muted-foreground">(For general inquiries, use info@velcoretech.com)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BottomBreadcrumbs items={[{ name: "Home", to: "/" }, { name: "Legal Notice" }]} />
    </Layout>
  );
}