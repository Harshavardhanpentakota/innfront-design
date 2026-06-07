import { PageLayout } from "@/components/layout/PageLayout";
import { SEO } from "@/components/seo/SEO";
import { ShieldCheck, Award, Heart, Leaf, HelpCircle } from "lucide-react";

export const About = () => {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": "https://abhitejinn.com/about",
        "url": "https://abhitejinn.com/about",
        "name": "About Hotel Abhitej INN | Boutique Lodging in Araku Valley",
        "description": "Learn about Hotel Abhitej INN, our history, editorial standards, and why we are the preferred choice for stays in Araku, Andhra Pradesh."
      },
      {
        "@type": "Hotel",
        "name": "Hotel Abhitej INN",
        "image": "https://abhitejinn.com/room-images/banner-main.jpeg",
        "priceRange": "₹1500 - ₹5000",
        "telephone": "+918247786920",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Near Jeypore Junction, Araku Village Mandal, Dumbriguda",
          "addressLocality": "Araku",
          "addressRegion": "Andhra Pradesh",
          "postalCode": "531151",
          "addressCountry": "IN"
        }
      }
    ]
  };

  return (
    <PageLayout>
      <SEO
        title="About Us | Hotel Abhitej INN Araku Valley Boutique Stay"
        description="Discover the story behind Hotel Abhitej INN. Boutique comfort, warm local hospitality, and sustainable tourism practices in Araku Valley, Andhra Pradesh."
        schema={schema}
      />

      <section className="border-b border-border bg-muted/40 py-12 md:py-16">
        <div className="container-page">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Our Story</span>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-5xl">
            About Hotel Abhitej INN
          </h1>
          <p className="mt-3 max-w-xl text-muted-foreground">
            Boutique comfort nestled in the lush, coffee-planted slopes of Araku Valley, Dumbriguda, Andhra Pradesh.
          </p>
        </div>
      </section>

      <section className="container-page py-12 space-y-12">
        {/* Story Intro */}
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="space-y-5">
            <h2 className="font-display text-2xl font-bold">A Serene Sanctuary in the Eastern Ghats</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Founded in 2024, Hotel Abhitej INN was conceived as a boutique lodging experience that reflects the tranquil beauty of Araku Valley. Located near the historic Jeypore Junction in Dumbriguda, we provide our guests with an escape from the busy city lines, surrounding them with misty mountains, waterfalls, and local coffee plantations.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We specialize in offering high-quality hospitality that mixes modern convenience (like seamless high-speed Wi-Fi, modern climate control, and digital payments) with the warm, personalized touch of Andhra hospitality.
            </p>
          </div>
          <div className="relative overflow-hidden rounded-2xl border border-border aspect-[16/10] shadow-card">
            <img
              src="/room-images/banner-main.jpeg"
              alt="Beautiful misty view of Araku Valley coffee plantation"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Brand Values */}
        <div className="border-t border-border pt-12">
          <h2 className="font-display text-2xl font-bold mb-8 text-center">Our Core Commitments</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-border p-5 bg-card hover:shadow-soft transition-shadow">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-primary-deep mb-4">
                <ShieldCheck className="h-5 w-5" />
              </span>
              <h3 className="font-display text-base font-semibold">Strict Standards</h3>
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                Clean rooms, sanitized linens, and rigorous hygiene checks are performed prior to every guest arrival.
              </p>
            </div>

            <div className="rounded-2xl border border-border p-5 bg-card hover:shadow-soft transition-shadow">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-primary-deep mb-4">
                <Heart className="h-5 w-5" />
              </span>
              <h3 className="font-display text-base font-semibold">Genuine Hospitality</h3>
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                Our front desk is staffed 24/7 by locals who understand the valley and can recommend the best sightseeing plans.
              </p>
            </div>

            <div className="rounded-2xl border border-border p-5 bg-card hover:shadow-soft transition-shadow">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-primary-deep mb-4">
                <Leaf className="h-5 w-5" />
              </span>
              <h3 className="font-display text-base font-semibold">Eco-Conscious</h3>
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                We conserve energy, minimize plastic waste, and source fresh ingredients directly from Araku tribal farmers.
              </p>
            </div>

            <div className="rounded-2xl border border-border p-5 bg-card hover:shadow-soft transition-shadow">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-primary-deep mb-4">
                <Award className="h-5 w-5" />
              </span>
              <h3 className="font-display text-base font-semibold">Best Tariff</h3>
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                No third-party booking commissions. Direct bookings secure the absolute best rate on all rooms.
              </p>
            </div>
          </div>
        </div>

        {/* Editorial & Booking Integrity (EEAT) */}
        <div className="border-t border-border pt-12 grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <h3 className="font-display text-lg font-bold mb-3">Editorial Standards & Accountability</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              At Hotel Abhitej INN, our informational guides, reservation policies, and travel content are maintained by our management team under the supervision of our chief editor. We verify every tariff update, attraction guide, and checkout detail. If you find any discrepancy in our booking rates, we commit to honoring the lower pricing as per our customer rate guarantee.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <h3 className="font-display text-lg font-bold mb-3">Safe Travel & Secure Payments</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              We employ industry-standard secure payment protocols (SSL encryption via Razorpay integration) to handle your credit/debit card, net banking, or UPI details. We do not store financial records on our local servers. Check-in guidelines are strictly governed in compliance with local law enforcement guidelines.
            </p>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default About;
