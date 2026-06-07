import { PageLayout } from "@/components/layout/PageLayout";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/seo/SEO";

const PrivacyPolicy = () => {
  const policySchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://abhitejinn.com/privacy-policy",
        "url": "https://abhitejinn.com/privacy-policy",
        "name": "Privacy Policy | Hotel Abhitej INN Araku",
        "description": "Read the Privacy Policy of Hotel Abhitej INN Araku. Learn how we collect, store, and secure guest data and transaction security details.",
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://abhitejinn.com/" },
            { "@type": "ListItem", "position": 2, "name": "Privacy Policy", "item": "https://abhitejinn.com/privacy-policy" }
          ]
        }
      }
    ]
  };

  return (
    <PageLayout>
      <SEO
        title="Privacy Policy | Hotel Abhitej INN Araku Guest Data Protection"
        description="Learn how Hotel Abhitej INN collects, processes, and protects your personal and booking transaction data. 100% secure payment gateway compliance."
        schema={policySchema}
      />
      <section className="border-b border-border bg-muted/40 py-12">
        <div className="container-page">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Home
          </Link>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Legal</span>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight">Privacy Policy</h1>
          <p className="mt-3 max-w-xl text-muted-foreground text-sm">
            Hotel Abhitej Inn is committed to protecting your personal information.
          </p>
        </div>
      </section>

      <section className="container-page py-12 max-w-3xl space-y-6">
        {[
          {
            title: "Information We Collect",
            content: "We collect information you provide when making a booking, including your full name, phone number, email address (optional), and payment details. We also collect technical data such as IP address and browser type for security and analytics purposes.",
          },
          {
            title: "How We Use Your Information",
            content: "Your information is used to process bookings, send booking confirmations, provide customer support, process payments securely via Razorpay, and improve our services. We do not sell or share your personal data with third parties except as required by law or to process payments.",
          },
          {
            title: "Payment Security",
            content: "All payment transactions are processed through Razorpay, a PCI-DSS compliant payment gateway. We do not store full card details on our servers. Your financial data is encrypted and handled securely.",
          },
          {
            title: "Data Retention",
            content: "We retain your booking information for a period of 3 years for accounting, legal, and customer service purposes. You may request deletion of your personal data at any time by contacting us.",
          },
          {
            title: "Your Rights",
            content: "You have the right to access, correct, or delete the personal information we hold about you. To exercise these rights, please contact us at abhitejinn11@gmail.com or +91 82477 86920.",
          },
          {
            title: "Cookies",
            content: "Our website uses cookies to enhance your browsing experience and remember your preferences. You can disable cookies in your browser settings, though some features may not function correctly.",
          },
          {
            title: "Contact for Privacy Concerns",
            content: "If you have any questions about this Privacy Policy or how we handle your data, please contact us at abhitejinn11@gmail.com.",
          },
        ].map(({ title, content }) => (
          <div key={title} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <h2 className="font-display text-lg font-semibold mb-2">{title}</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{content}</p>
          </div>
        ))}

        <p className="text-xs text-muted-foreground text-center pt-2">
          Last updated: June 2026 · Verified by Hotel Abhitej INN Legal Department
        </p>
      </section>
    </PageLayout>
  );
};

export default PrivacyPolicy;
