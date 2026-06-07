import { PageLayout } from "@/components/layout/PageLayout";
import { MapPin, Phone, Mail, Clock, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/seo/SEO";

export const Contact = () => {
  const contactSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://abhitejinn.com/contact",
        "url": "https://abhitejinn.com/contact",
        "name": "Contact Hotel Abhitej INN | Araku Valley Hotel Location",
        "description": "Reach out to Hotel Abhitej INN in Dumbriguda, Araku Valley. Contact phone numbers, email address, map directions, and customer support details.",
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://abhitejinn.com/" },
            { "@type": "ListItem", "position": 2, "name": "Contact Us", "item": "https://abhitejinn.com/contact" }
          ]
        }
      },
      {
        "@type": "Hotel",
        "name": "Hotel Abhitej INN",
        "telephone": "+918247786920",
        "email": "abhitejinn11@gmail.com",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Near Jeypore Junction, Araku Village Mandal, Dumbriguda",
          "addressLocality": "Araku",
          "addressRegion": "Andhra Pradesh",
          "postalCode": "531151",
          "addressCountry": "IN"
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+918247786920",
          "contactType": "customer service",
          "areaServed": "IN",
          "availableLanguage": ["en", "telugu", "hindi"]
        }
      }
    ]
  };

  return (
    <PageLayout>
      <SEO
        title="Contact Hotel Abhitej INN | Araku Valley Location & Directions"
        description="Contact the reception desk at Hotel Abhitej INN Araku. Call +91 82477 86920 or email abhitejinn11@gmail.com. Map location and driving directions included."
        schema={contactSchema}
      />
      <section className="border-b border-border bg-muted/40 py-12">
        <div className="container-page">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Get in Touch</span>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight">Contact Us</h1>
          <p className="mt-3 max-w-xl text-muted-foreground text-sm">
            We'd love to hear from you. Reach out for bookings, enquiries, or feedback.
          </p>
        </div>
      </section>

      <section className="container-page py-12">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          {/* Contact Details */}
          <div className="space-y-5">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <h2 className="font-display text-xl font-semibold mb-5">Contact Information</h2>
              <ul className="space-y-5">
                <li className="flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary-deep">
                    <MapPin className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="font-semibold text-sm">Address</div>
                    <div className="text-sm text-muted-foreground mt-0.5 leading-relaxed">
                      Near Jeypore Junction, Araku Village Mandal,<br />
                      Dumbriguda, Andhra Pradesh – 531151
                    </div>
                    <Button asChild size="sm" variant="outline" className="mt-2 rounded-full text-xs h-8">
                      <a href="https://maps.google.com/?q=Araku+Village+Mandal+Dumbriguda+Andhra+Pradesh" target="_blank" rel="noopener noreferrer">
                        <Navigation className="mr-1.5 h-3 w-3" /> Get Directions
                      </a>
                    </Button>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary-deep">
                    <Phone className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="font-semibold text-sm">Phone</div>
                    <a href="tel:+918247786920" className="text-sm text-muted-foreground hover:text-primary mt-0.5 block">
                      +91 82477 86920
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary-deep">
                    <Mail className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="font-semibold text-sm">Email</div>
                    <a href="mailto:abhitejinn11@gmail.com" className="text-sm text-muted-foreground hover:text-primary mt-0.5 block">
                      abhitejinn11@gmail.com
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary-deep">
                    <Clock className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="font-semibold text-sm">Reception Hours</div>
                    <div className="text-sm text-muted-foreground mt-0.5">24 hours, 7 days a week</div>
                    <div className="text-xs text-muted-foreground mt-0.5">Check-in: 12:00 PM · Check-out: 10:00 AM</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Map */}
          <div className="overflow-hidden rounded-2xl border border-border shadow-card aspect-[4/3] bg-muted">
            <iframe
              title="Hotel Abhitej Inn Location"
              src="https://maps.google.com/maps?q=Araku+Village+Mandal,+Dumbriguda,+Andhra+Pradesh+531151&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 360 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Contact;
