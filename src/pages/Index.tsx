import { PageLayout } from "@/components/layout/PageLayout";
import { Hero } from "@/components/home/Hero";
import { Stats } from "@/components/home/Stats";
import { FeaturedRooms } from "@/components/home/FeaturedRooms";
import { Amenities } from "@/components/home/Amenities";
import { Testimonials } from "@/components/home/Testimonials";
import { Location } from "@/components/home/Location";
import { CTA } from "@/components/home/CTA";
import { SEO } from "@/components/seo/SEO";

const homeSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Hotel",
      "@id": "https://abhitejinn.com/#hotel",
      "name": "Hotel Abhitej INN",
      "url": "https://abhitejinn.com/",
      "image": "https://abhitejinn.com/room-images/banner-main.jpeg",
      "telephone": "+918247786920",
      "priceRange": "₹1500 - ₹5000",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Near Jeypore Junction, Araku Village Mandal, Dumbriguda",
        "addressLocality": "Araku",
        "addressRegion": "Andhra Pradesh",
        "postalCode": "531151",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 18.3283,
        "longitude": 82.8596
      },
      "starRating": {
        "@type": "Rating",
        "ratingValue": "3.5"
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://abhitejinn.com/#website",
      "url": "https://abhitejinn.com/",
      "name": "Hotel Abhitej INN",
      "description": "Boutique stays and luxury lodging in Araku Valley, Dumbriguda, AP.",
      "publisher": {
        "@id": "https://abhitejinn.com/#hotel"
      }
    }
  ]
};

const Index = () => (
  <PageLayout>
    <SEO
      title="Hotel Abhitej INN | Boutique Luxury Stay in Araku Valley"
      description="Book boutique rooms and suites at Hotel Abhitej INN in Dumbriguda, Araku Valley. Best rate guarantee, modern amenities, and 24/7 reception."
      schema={homeSchema}
    />
    <Hero />
    <Stats />
    <FeaturedRooms />
    <Amenities />
    <Testimonials />
    <Location />
    <CTA />
  </PageLayout>
);

export default Index;

