import { Link } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/seo/SEO";
import { Check, X, ShieldAlert, Sparkles, HelpCircle, ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { roomsApi } from "@/lib/api";

const COMPARISON_FEATURES = [
  { name: "Base Price", key: "price", type: "price" },
  { name: "Room Size", key: "size" },
  { name: "Max Capacity", key: "capacity" },
  { name: "Bed Type", key: "beds" },
  { name: "Air Conditioning", key: "ac", type: "boolean" },
  { name: "Free High-Speed Wi-Fi", key: "wifi", type: "boolean" },
  { name: "Cable/Smart TV", key: "tv", type: "boolean" },
  { name: "24/7 Hot Water", key: "hotWater", type: "boolean" },
  { name: "24/7 Room Service", key: "roomService", type: "boolean" },
  { name: "Mini Bar / Fridge", key: "miniBar", type: "boolean" },
  { name: "Separate Living Area", key: "lounge", type: "boolean" },
  { name: "Private Bathtub", key: "bathtub", type: "boolean" },
  { name: "Complimentary Toiletries", key: "toiletries", type: "boolean" },
  { name: "Welcome Amenities", key: "welcome", type: "boolean" },
];

const ROOMS_DATA: Record<string, any> = {
  "Deluxe Non AC": {
    price: 1500,
    size: "250 sq ft",
    capacity: "2 Guests",
    beds: "1 Double Bed",
    ac: false,
    wifi: true,
    tv: true,
    hotWater: true,
    roomService: true,
    miniBar: false,
    lounge: false,
    bathtub: false,
    toiletries: true,
    welcome: false,
    suitability: "Budget couples and solo travelers looking for basic comfort.",
  },
  "Deluxe AC": {
    price: 2200,
    size: "300 sq ft",
    capacity: "3 Guests",
    beds: "1 King Bed or 2 Singles",
    ac: true,
    wifi: true,
    tv: true,
    hotWater: true,
    roomService: true,
    miniBar: true,
    lounge: false,
    bathtub: false,
    toiletries: true,
    welcome: false,
    suitability: "Families or executives looking for cool, spacious, and modern comfort.",
  },
  "Suite": {
    price: 4000,
    size: "500 sq ft",
    capacity: "4 Guests",
    beds: "1 King Bed + Sofa Bed",
    ac: true,
    wifi: true,
    tv: true,
    hotWater: true,
    roomService: true,
    miniBar: true,
    lounge: true,
    bathtub: true,
    toiletries: true,
    welcome: true,
    suitability: "Honeymoon couples and luxury seekers who desire prime space & amenities.",
  },
};

export const RoomComparison = () => {
  const { data: serverRooms } = useQuery({
    queryKey: ["rooms-prices-comparison"],
    queryFn: () => roomsApi.getAll({ limit: "20" }),
    staleTime: 1000 * 60 * 10,
  });

  const getPrice = (type: string, fallback: number) => {
    if (serverRooms?.data) {
      const match = serverRooms.data.find((r) => r.type === type);
      if (match?.price) return match.price;
    }
    return fallback;
  };

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://abhitejinn.com/tools/room-comparison",
        "url": "https://abhitejinn.com/tools/room-comparison",
        "name": "Room Comparison Tool | Hotel Abhitej INN Araku",
        "description": "Compare Deluxe Non AC, Deluxe AC, and luxury Suites at Hotel Abhitej INN Araku. View sizes, prices, and amenities side-by-side.",
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://abhitejinn.com/" },
            { "@type": "ListItem", "position": 2, "name": "Rooms", "item": "https://abhitejinn.com/rooms" },
            { "@type": "ListItem", "position": 3, "name": "Room Comparison", "item": "https://abhitejinn.com/tools/room-comparison" }
          ]
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Which room type at Hotel Abhitej INN has air conditioning?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Our Deluxe AC room and Suite types feature full air conditioning. The Deluxe Non AC room has ceiling fans and relies on the cool, natural mountain breezes of Araku."
            }
          },
          {
            "@type": "Question",
            "name": "What are the sizes of the rooms?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The Deluxe Non AC room is 250 sq ft, the Deluxe AC room is 300 sq ft, and the luxury Suite is 500 sq ft with a separate living area."
            }
          }
        ]
      }
    ]
  };

  return (
    <PageLayout>
      <SEO
        title="Room Comparison Tool | Compare Hotel Abhitej INN Room Types"
        description="Compare room rates, size, bed specs, and premium inclusions at Hotel Abhitej INN Araku. Deluxe Non AC vs Deluxe AC vs Suite details side by side."
        schema={schema}
      />

      <section className="border-b border-border bg-muted/40 py-12 md:py-16">
        <div className="container-page">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Interactive Tools</span>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-5xl">
            Compare Room Types
          </h1>
          <p className="mt-3 max-w-xl text-muted-foreground">
            Make an informed decision. Look at our three main room categories side-by-side and select the ideal choice for your stay in Araku.
          </p>
        </div>
      </section>

      <section className="container-page py-12">
        {/* Table for larger screens */}
        <div className="hidden md:block overflow-x-auto rounded-2xl border border-border shadow-elevated bg-card">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th className="p-5 text-sm font-semibold text-muted-foreground w-1/4">Room Feature</th>
                {Object.keys(ROOMS_DATA).map((type) => (
                  <th key={type} className="p-5 w-1/4">
                    <span className="block text-base font-bold font-display text-foreground">{type}</span>
                    <span className="block text-lg font-extrabold text-primary mt-1">
                      ₹{getPrice(type, ROOMS_DATA[type].price).toLocaleString("en-IN")}
                      <span className="text-xs font-normal text-muted-foreground">/ night</span>
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARISON_FEATURES.map((feature) => (
                <tr key={feature.name} className="border-b border-border hover:bg-muted/20 transition-colors">
                  <td className="p-4 text-sm font-medium text-foreground">{feature.name}</td>
                  {Object.keys(ROOMS_DATA).map((type) => {
                    const val = ROOMS_DATA[type][feature.key];
                    return (
                      <td key={type} className="p-4 text-sm text-muted-foreground">
                        {feature.type === "price" ? (
                          <span className="font-semibold text-foreground">
                            ₹{getPrice(type, val).toLocaleString("en-IN")}
                          </span>
                        ) : feature.type === "boolean" ? (
                          val ? (
                            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-success/10 text-success">
                              <Check className="h-4 w-4" />
                            </span>
                          ) : (
                            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                              <X className="h-4 w-4" />
                            </span>
                          )
                        ) : (
                          val
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
              <tr>
                <td className="p-5 text-sm font-medium text-foreground">Best Suited For</td>
                {Object.keys(ROOMS_DATA).map((type) => (
                  <td key={type} className="p-5 text-xs text-muted-foreground leading-relaxed">
                    {ROOMS_DATA[type].suitability}
                  </td>
                ))}
              </tr>
              <tr className="bg-muted/20">
                <td className="p-5" />
                {Object.keys(ROOMS_DATA).map((type) => (
                  <td key={type} className="p-5">
                    <Button asChild className="w-full rounded-full bg-foreground text-background hover:bg-foreground/90">
                      <Link to={`/rooms/${encodeURIComponent(type)}`}>
                        Book {type} <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                      </Link>
                    </Button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Cards for mobile screens */}
        <div className="grid gap-6 md:hidden">
          {Object.keys(ROOMS_DATA).map((type) => {
            const data = ROOMS_DATA[type];
            return (
              <div key={type} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
                <h3 className="font-display text-xl font-bold text-foreground">{type}</h3>
                <div className="text-2xl font-extrabold text-primary mt-1">
                  ₹{getPrice(type, data.price).toLocaleString("en-IN")}
                  <span className="text-xs font-normal text-muted-foreground">/ night</span>
                </div>

                <ul className="mt-5 space-y-3 border-t border-border pt-4 text-xs">
                  <li className="flex justify-between"><span className="text-muted-foreground">Size:</span><span className="font-semibold">{data.size}</span></li>
                  <li className="flex justify-between"><span className="text-muted-foreground">Capacity:</span><span className="font-semibold">{data.capacity}</span></li>
                  <li className="flex justify-between"><span className="text-muted-foreground">Beds:</span><span className="font-semibold">{data.beds}</span></li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Air Conditioning:</span>
                    <span>{data.ac ? <Check className="h-4 w-4 text-success inline" /> : <X className="h-4 w-4 text-destructive inline" />}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">WiFi & Cable TV:</span>
                    <span className="font-semibold">Included</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Bathtub:</span>
                    <span>{data.bathtub ? <Check className="h-4 w-4 text-success inline" /> : <X className="h-4 w-4 text-destructive inline" />}</span>
                  </li>
                </ul>

                <p className="mt-4 text-[11px] text-muted-foreground leading-relaxed italic bg-muted/40 p-2.5 rounded-lg">
                  {data.suitability}
                </p>

                <Button asChild className="w-full rounded-full bg-foreground text-background hover:bg-foreground/90 mt-5">
                  <Link to={`/rooms/${encodeURIComponent(type)}`}>
                    Choose {type} <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                  </Link>
                </Button>
              </div>
            );
          })}
        </div>

        {/* FAQs */}
        <div className="mt-16 border-t border-border pt-12 max-w-3xl">
          <h3 className="font-display text-2xl font-semibold mb-6 flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-primary" /> Room Comparison FAQs
          </h3>
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-bold text-foreground">Are extra beds available for Deluxe rooms?</h4>
              <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
                Yes, an extra rollaway bed can be provided in Deluxe AC rooms and Suites at an additional cost of ₹500 per night. Extra beds are not supported in Deluxe Non AC rooms due to space layouts.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-bold text-foreground">What check-in/check-out timings apply to these rooms?</h4>
              <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
                Hotel Abhitej INN observes a standard 12:00 PM Check-in and 10:00 AM Check-out schedule. Late check-out requests are subject to availability and desk approval.
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default RoomComparison;
