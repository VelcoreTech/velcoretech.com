import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { BottomBreadcrumbs } from "@/components/common/BottomBreadcrumbs";
import { Scale, Shield, FileText, Users, CreditCard, Clock, Globe, AlertCircle } from "lucide-react";

export default function TermsOfService() {
  const currentDate = "February 22, 2026";

  return (
    <Layout>
      <Helmet>
        <title>Terms of Service | Velcore Tech</title>
        <meta 
          name="description" 
          content="Velcore Tech LLC's terms of service for managed IT and cybersecurity services. Information about service agreements, payment terms, data security, and legal disclaimers."
        />
        <link rel="canonical" href="https://velcoretech.com/terms" />
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
              Terms of Service
            </h1>
            <p className="text-xl text-muted-foreground">
              Last updated: {currentDate}
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="pb-8 bg-background">
        <div className="container-tight">
          <div className="max-w-3xl mx-auto">
            <div className="p-6 rounded-2xl bg-card border border-border">
              <h2 className="text-2xl font-bold mb-4">1. Introduction and Acceptance</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                These Terms of Service ("Terms") constitute a legally binding agreement between you ("Client," "you," or "your") and Velcore Tech LLC ("Velcore Tech," "we," "our," or "us"), a limited liability company registered in the State of California with offices Santa Cruz, CA 95060.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                By accessing our website, using our services, or executing a service agreement, quote, or statement of work that references these Terms, you acknowledge that you have read, understood, and agree to be bound by all terms and conditions herein [citation:1]. If you are entering into this agreement on behalf of a company or other legal entity, you represent that you have the authority to bind such entity to these Terms [citation:6].
              </p>
              <div className="mt-4 p-4 rounded-xl bg-primary/5 border border-primary/20">
                <p className="text-sm">
                  <span className="font-semibold">Note:</span> These Terms apply to all services provided by Velcore Tech. Specific service details, pricing, and scope are outlined in separate proposals, quotes, or Statements of Work ("SOW") which are incorporated herein by reference [citation:4][citation:7].
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Provided */}
      <section className="pb-8 bg-background">
        <div className="container-tight">
          <div className="max-w-3xl mx-auto">
            <div className="p-6 rounded-2xl bg-card border border-border">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="h-5 w-5 text-primary" />
                <h2 className="text-2xl font-bold">2. Services Provided</h2>
              </div>
              
              <h3 className="text-lg font-semibold mb-2">2.1 Service Descriptions</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Velcore Tech specializes in Managed IT Services (MSP) and Managed Security Services (MSSP). Our services may include, but are not limited to [citation:1][citation:7]:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                <li>24/7 system monitoring and incident response</li>
                <li>Help desk and end-user support</li>
                <li>Patch management and system maintenance</li>
                <li>Identity and access management (MFA, least privilege)</li>
                <li>Endpoint security and EDR oversight</li>
                <li>Microsoft 365 and cloud governance</li>
                <li>Network security and firewall management</li>
                <li>Backup, disaster recovery, and ransomware readiness</li>
                <li>Security monitoring and incident response</li>
                <li>Vendor management and third-party coordination</li>
              </ul>

              <h3 className="text-lg font-semibold mb-2">2.2 Scope of Services</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The specific services to be provided will be detailed in a separate proposal, quote, or Statement of Work ("Requested Services") [citation:4]. In the event of any conflict between these Terms and a SOW, the terms of the SOW will prevail [citation:7].
              </p>

              <h3 className="text-lg font-semibold mb-2">2.3 System Requirements</h3>
              <p className="text-muted-foreground leading-relaxed">
                Client systems must meet our serviceability requirements. Client shall provide adequate workspace, power, internet access, and remote access as needed for service delivery [citation:4][citation:7].
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing and Payment Terms */}
      <section className="pb-8 bg-background">
        <div className="container-tight">
          <div className="max-w-3xl mx-auto">
            <div className="p-6 rounded-2xl bg-card border border-border">
              <div className="flex items-center gap-2 mb-4">
                <CreditCard className="h-5 w-5 text-primary" />
                <h2 className="text-2xl font-bold">3. Pricing and Payment Terms</h2>
              </div>

              <h3 className="text-lg font-semibold mb-2">3.1 Fees and Invoicing</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Client agrees to pay all fees as outlined in the applicable proposal or SOW. Unless otherwise specified:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                <li>Monthly recurring services are billed in advance [citation:1]</li>
                <li>One-time projects and out-of-scope labor are billed in arrears or as agreed</li>
                <li>Invoices are due upon receipt or as specified in the SOW</li>
              </ul>

              <h3 className="text-lg font-semibold mb-2">3.2 Late Payments</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If payment is not received by the due date, we may assess a late fee of up to 5% of the unpaid balance [citation:1]. Continued non-payment may result in suspension of services until the outstanding balance is paid in full.
              </p>

              <h3 className="text-lg font-semibold mb-2">3.3 Billing Adjustments</h3>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to adjust billing based on verified counts of users, devices, or other billable units. Such adjustments will be reflected in future invoices [citation:1][citation:8].
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Term and Termination */}
      <section className="pb-8 bg-background">
        <div className="container-tight">
          <div className="max-w-3xl mx-auto">
            <div className="p-6 rounded-2xl bg-card border border-border">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="h-5 w-5 text-primary" />
                <h2 className="text-2xl font-bold">4. Term and Termination</h2>
              </div>

              <h3 className="text-lg font-semibold mb-2">4.1 Initial Term and Renewal</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                This agreement shall commence on the start date specified in the SOW and continue for the initial term stated therein [citation:5][citation:8]. Unless either party provides written notice of non-renewal at least 30-90 days prior to the end of the term (as specified in your SOW), this agreement will automatically renew for successive periods of the same duration [citation:1][citation:5].
              </p>

              <h3 className="text-lg font-semibold mb-2">4.2 Termination for Cause</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Either party may terminate this agreement with written notice if the other party materially breaches its obligations and fails to cure such breach within 30 days of receiving written notice [citation:1].
              </p>

              <h3 className="text-lg font-semibold mb-2">4.3 Early Termination</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If Client terminates this agreement without cause prior to the end of the term, Client may be responsible for early termination fees as specified in the SOW, which may include remaining fees for the balance of the term [citation:5].
              </p>

              <h3 className="text-lg font-semibold mb-2">4.4 Offboarding Process</h3>
              <p className="text-muted-foreground leading-relaxed">
                Upon termination, we will reasonably cooperate to transfer your account to you or your new provider, provided your account is fully paid, including any offboarding charges [citation:4][citation:7].
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Third-Party Products and Services */}
      <section className="pb-8 bg-background">
        <div className="container-tight">
          <div className="max-w-3xl mx-auto">
            <div className="p-6 rounded-2xl bg-card border border-border">
              <div className="flex items-center gap-2 mb-4">
                <Globe className="h-5 w-5 text-primary" />
                <h2 className="text-2xl font-bold">5. Third-Party Products and Services</h2>
              </div>

              <h3 className="text-lg font-semibold mb-2">5.1 Third-Party Providers</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We may utilize third-party service providers or product vendors to deliver certain services [citation:4][citation:7]. Client's use of third-party services is subject to the third-party's terms and conditions, which we will make available upon request.
              </p>

              <h3 className="text-lg font-semibold mb-2">5.2 No Warranty for Third-Party Products</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Unless otherwise stated, all hardware, software, or peripherals purchased through us are provided "as is" without any warranty from Velcore Tech [citation:4][citation:7]. We will use reasonable efforts to assign and facilitate manufacturer warranties but have no liability for third-party product quality, functionality, or performance.
              </p>

              <h3 className="text-lg font-semibold mb-2">5.3 Vendor Support</h3>
              <p className="text-muted-foreground leading-relaxed">
                If an issue requires vendor or OEM support, we may contact them on your behalf and pass through any associated fees. We will obtain your permission before incurring expenses over $100, unless exigent circumstances require otherwise [citation:4][citation:7].
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Client Responsibilities */}
      <section className="pb-8 bg-background">
        <div className="container-tight">
          <div className="max-w-3xl mx-auto">
            <div className="p-6 rounded-2xl bg-card border border-border">
              <div className="flex items-center gap-2 mb-4">
                <Users className="h-5 w-5 text-primary" />
                <h2 className="text-2xl font-bold">6. Client Responsibilities</h2>
              </div>

              <h3 className="text-lg font-semibold mb-2">6.1 Authorized Contacts</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Client will designate authorized contacts who have the authority to make decisions and provide instructions. We are entitled to rely on directions from these contacts [citation:4][citation:7].
              </p>

              <h3 className="text-lg font-semibold mb-2">6.2 System Access and Modifications</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Client agrees to refrain from modifying or moving covered systems without our authorization. Unauthorized changes that cause issues will be billed at our standard hourly rate to restore the system [citation:4][citation:7].
              </p>

              <h3 className="text-lg font-semibold mb-2">6.3 Notification of Changes</h3>
              <p className="text-muted-foreground leading-relaxed">
                Client shall promptly notify us of any events or changes that may impact services, including new devices, users, or locations. Adding new covered devices requires mutual written agreement [citation:4][citation:7].
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Data Security and Confidentiality */}
      <section className="pb-8 bg-background">
        <div className="container-tight">
          <div className="max-w-3xl mx-auto">
            <div className="p-6 rounded-2xl bg-card border border-border">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="h-5 w-5 text-primary" />
                <h2 className="text-2xl font-bold">7. Data Security and Confidentiality</h2>
              </div>

              <h3 className="text-lg font-semibold mb-2">7.1 Data Protection</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We implement industry-standard security measures to protect client data, including encryption, access controls, and regular security assessments [citation:9]. Our data handling practices are further detailed in our Privacy Policy.
              </p>

              <h3 className="text-lg font-semibold mb-2">7.2 Confidentiality</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Both parties agree to maintain the confidentiality of any proprietary or sensitive information disclosed during the course of the agreement. This obligation survives termination of this agreement.
              </p>

              <h3 className="text-lg font-semibold mb-2">7.3 No Sensitive Data</h3>
              <p className="text-muted-foreground leading-relaxed">
                Client agrees not to upload or transmit any sensitive data (such as health records, payment card data, or other regulated information) to our systems without prior written agreement on appropriate safeguards [citation:6].
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Limitation of Liability and Indemnification */}
      <section className="pb-8 bg-background">
        <div className="container-tight">
          <div className="max-w-3xl mx-auto">
            <div className="p-6 rounded-2xl bg-card border border-border">
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle className="h-5 w-5 text-primary" />
                <h2 className="text-2xl font-bold">8. Limitation of Liability and Indemnification</h2>
              </div>

              <h3 className="text-lg font-semibold mb-2">8.1 Limitation of Liability</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                To the maximum extent permitted by law, Velcore Tech shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from or related to the use of our services [citation:9]. Our total liability shall not exceed the total fees paid by Client during the twelve months preceding the claim.
              </p>

              <h3 className="text-lg font-semibold mb-2">8.2 Indemnification</h3>
              <p className="text-muted-foreground leading-relaxed">
                Client agrees to indemnify and hold Velcore Tech harmless from any claims, damages, or expenses arising from Client's breach of these Terms or unauthorized use of our services [citation:9].
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* General Provisions */}
      <section className="pb-8 bg-background">
        <div className="container-tight">
          <div className="max-w-3xl mx-auto">
            <div className="p-6 rounded-2xl bg-card border border-border">
              <h2 className="text-2xl font-bold mb-4">9. General Provisions</h2>

              <h3 className="text-lg font-semibold mb-2">9.1 Governing Law</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                These Terms shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law principles [citation:9].
              </p>

              <h3 className="text-lg font-semibold mb-2">9.2 Changes to Terms</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We may modify these Terms at any time. Material changes will be communicated via email at least 30 days before becoming effective [citation:4][citation:7]. Continued use of our services after changes become effective constitutes acceptance of the new terms.
              </p>

              <h3 className="text-lg font-semibold mb-2">9.3 Force Majeure</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Neither party shall be liable for any delay or failure in performance due to causes beyond its reasonable control, including natural disasters, war, terrorism, strikes, or governmental acts [citation:9].
              </p>

              <h3 className="text-lg font-semibold mb-2">9.4 Entire Agreement</h3>
              <p className="text-muted-foreground leading-relaxed">
                These Terms, together with any SOWs, proposals, or quotes, constitute the entire agreement between the parties and supersede all prior agreements and understandings [citation:9].
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="pb-20 bg-background">
        <div className="container-tight">
          <div className="max-w-3xl mx-auto">
            <div className="p-6 rounded-2xl bg-card border border-border">
              <h2 className="text-2xl font-bold mb-4">10. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                <p className="font-medium">Velcore Tech LLC</p>
                <p className="text-sm text-muted-foreground">Santa Cruz, CA 95060</p>
                <p className="text-sm text-muted-foreground mt-2">Email: legal@velcoretech.com</p>
                <p className="text-sm text-muted-foreground">(For general inquiries: info@velcoretech.com)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BottomBreadcrumbs items={[{ name: "Home", to: "/" }, { name: "Terms of Service" }]} />
    </Layout>
  );
}