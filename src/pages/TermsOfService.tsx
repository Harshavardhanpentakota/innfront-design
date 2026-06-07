import { PageLayout } from "@/components/layout/PageLayout";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/seo/SEO";

const TERMS = [
  {
    title: "Check-in / Check-out Times",
    content: "Check-in is at 12:00 PM (noon) and check-out is at 10:00 AM. Early check-in or late check-out is subject to room availability and may incur additional charges.",
  },
  {
    title: "Management Cancellation Rights",
    content: "Management reserves the right to cancel a booking before 24 hours of check-in. In such cases, the full amount paid will be refunded to the guest.",
  },
  {
    title: "Jurisdiction",
    content: "Any dispute arising out of or in connection with a stay at Hotel Abhitej Inn shall be subject to the exclusive jurisdiction of courts in Visakhapatnam, Andhra Pradesh.",
  },
  {
    title: "Illegal Activity – Immediate Termination",
    content: "If any illegal activity is found on the premises, management reserves the right to cancel the room booking and vacate the guest immediately without providing any refund.",
  },
  {
    title: "Legal Action",
    content: "Management may initiate legal proceedings against any guest found to be engaged in illegal activities on the property.",
  },
  {
    title: "Prohibited Activities and Items",
    content: "The following are strictly prohibited on all premises: illegal drugs, gambling, prostitution, firearms, weapons, flammable materials, and commercial goods. Smoking is not permitted inside rooms. Violation may result in immediate eviction without refund.",
  },
  {
    title: "Guest Conduct and Management Rights",
    content: "The management reserves the absolute right to refuse admission or expel guests without refund for violating resort policies, disturbing the peace or safety of other guests, or being heavily intoxicated. Guests must vacate immediately upon request.",
  },
  {
    title: "Damage and Liability",
    content: "Guests are fully liable for any damage caused to property, furnishings, or equipment during their stay. Lost, damaged, or missing linens, towels, or room items will be charged to the guest's account.",
  },
  {
    title: "Professional Photography and Events",
    content: "Professional photography, videography (including pre-wedding shoots and film shoots), music performances, firecrackers, or outdoor events require prior written consent from management and applicable licenses. Unauthorised shoots or events will not be permitted.",
  },
];

const TermsOfService = () => {
  const policySchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://abhitejinn.com/terms-of-service",
        "url": "https://abhitejinn.com/terms-of-service",
        "name": "Terms of Service | Hotel Abhitej INN Araku",
        "description": "Read the guest terms and conditions, check-in requirements, and liability policies for staying at Hotel Abhitej INN Araku.",
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://abhitejinn.com/" },
            { "@type": "ListItem", "position": 2, "name": "Terms of Service", "item": "https://abhitejinn.com/terms-of-service" }
          ]
        }
      }
    ]
  };

  return (
    <PageLayout>
      <SEO
        title="Terms of Service & Stay Guidelines | Hotel Abhitej INN Araku"
        description="Read the terms of service and lodging guidelines for Hotel Abhitej INN. View rules on check-in times, guest conduct, prohibited items, and liability."
        schema={policySchema}
      />
      <section className="border-b border-border bg-muted/40 py-12">
        <div className="container-page">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Home
          </Link>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Legal</span>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight">Terms of Service</h1>
          <p className="mt-3 max-w-xl text-muted-foreground text-sm">
            By making a booking or staying at Hotel Abhitej Inn, you agree to the following terms and conditions.
          </p>
        </div>
      </section>

      <section className="container-page py-12 max-w-3xl">
        <ol className="space-y-5">
          {TERMS.map((term, i) => (
            <li key={i} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <div className="flex items-start gap-4">
                <span className="shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary-soft text-primary-deep font-bold text-sm">
                  {i + 1}
                </span>
                <div>
                  <h2 className="font-display text-base font-semibold">{term.title}</h2>
                  <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{term.content}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>

        <p className="mt-8 text-xs text-muted-foreground text-center">
          Last updated: June 2026 · Verified by Hotel Abhitej INN Legal Department · For queries, contact us at{" "}
          <a href="mailto:abhitejinn11@gmail.com" className="text-primary hover:underline">abhitejinn11@gmail.com</a>
        </p>
      </section>
    </PageLayout>
  );
};

export default TermsOfService;
