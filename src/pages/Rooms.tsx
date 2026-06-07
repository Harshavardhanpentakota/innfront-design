import { useState } from "react";
import { Link } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { roomsApi } from "@/lib/api";
import { ROOM_TYPES } from "@/lib/constants";
import { roomImages } from "@/lib/roomImagesPublic";
import { Users, Maximize2, Wind, ArrowRight } from "lucide-react";
import { SEO } from "@/components/seo/SEO";

const TYPE_META: Record<string, {
  images: string[];
  description: string;
  amenities: string[];
  capacity: number;
  size: string;
}> = {
  "Deluxe Non AC": {
    images: roomImages["Deluxe Non AC"],
    description: "Comfortable and well-appointed room with all essential amenities. Perfect for guests who value comfort without air conditioning.",
    amenities: ["WiFi", "TV", "Hot Water", "Room Service"],
    capacity: 2,
    size: "250 sq ft",
  },
  "Deluxe AC": {
    images: roomImages["Deluxe AC"],
    description: "Spacious air-conditioned room with modern furnishings. Enjoy a cool, relaxing stay with premium amenities and stylish interiors.",
    amenities: ["WiFi", "AC", "TV", "Hot Water", "Room Service", "Mini Bar"],
    capacity: 3,
    size: "300 sq ft",
  },
  Suite: {
    images: roomImages["Suite"],
    description: "Our finest accommodation with a separate living area, luxury amenities, and stunning views. An unparalleled experience of elegance.",
    amenities: ["WiFi", "AC", "TV", "Hot Water", "Room Service", "Mini Bar", "Bathtub", "Lounge"],
    capacity: 4,
    size: "500 sq ft",
  },
};

function RoomTypeCard({ roomType, checkIn, checkOut }: { roomType: string; checkIn: string; checkOut: string }) {
  const meta = TYPE_META[roomType];
  const { data, isLoading } = useQuery({
    queryKey: ["rooms-type-price", roomType],
    queryFn: () => roomsApi.getAll({ type: roomType, limit: "1" }),
    staleTime: 1000 * 60 * 10,
  });
  const price = data?.data?.[0]?.price;
  const bookingParams = new URLSearchParams({ roomType });
  if (checkIn) bookingParams.set("checkIn", checkIn);
  if (checkOut) bookingParams.set("checkOut", checkOut);

  const mainImage = meta.images[0];

  return (
    <article className="group hover-lift overflow-hidden rounded-2xl border border-border bg-card shadow-card flex flex-col">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={mainImage}
          alt={roomType}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute left-4 top-4">
          <Badge className="rounded-full border-0 bg-background/95 px-3 py-1 text-xs font-medium text-foreground backdrop-blur">
            {roomType}
          </Badge>
        </div>
        {(roomType === "Deluxe AC" || roomType === "Suite") && (
          <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-background/90 px-2.5 py-1 text-[11px] font-semibold backdrop-blur text-primary">
            <Wind className="h-3 w-3" /> AC
          </div>
        )}
      </div>
      <div className="p-5 flex flex-col flex-1">
        <div>
          <h3 className="font-display text-xl font-semibold leading-tight text-foreground">{roomType}</h3>
          <div className="mt-1 flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><Maximize2 className="h-3 w-3" /> {meta.size}</span>
            <span className="flex items-center gap-1"><Users className="h-3 w-3" /> Up to {meta.capacity} guests</span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{meta.description}</p>
        </div>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {meta.amenities.slice(0, 4).map((f) => (
            <span key={f} className="rounded-full bg-primary-soft px-2.5 py-1 text-[11px] font-medium text-primary-deep">{f}</span>
          ))}
          {meta.amenities.length > 4 && (
            <span className="rounded-full bg-muted px-2.5 py-1 text-[11px] font-medium text-muted-foreground">+{meta.amenities.length - 4} more</span>
          )}
        </div>
        <div className="mt-5 flex items-end justify-between border-t border-border pt-4">
          <div>
            {isLoading ? (
              <Skeleton className="h-7 w-28" />
            ) : price ? (
              <>
                <div className="font-display text-2xl font-semibold text-foreground">
                  ₹{price.toLocaleString("en-IN")}
                  <span className="ml-1 text-xs font-normal text-muted-foreground">/ night</span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">+ 12% GST</p>
              </>
            ) : (
              <span className="text-sm text-muted-foreground">Price on request</span>
            )}
          </div>
          <Button asChild size="sm" className="rounded-full bg-foreground text-background hover:bg-foreground/90">
            <Link to={`/rooms/${encodeURIComponent(roomType)}`}>
              View Details <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}

const roomsSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://abhitejinn.com/rooms",
      "url": "https://abhitejinn.com/rooms",
      "name": "Luxury Rooms & Suites | Hotel Abhitej INN Araku",
      "description": "Explore premium accommodations at Hotel Abhitej INN. Choose from Deluxe Non AC, Deluxe AC, and luxury Suites tailored for your perfect Araku escape.",
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://abhitejinn.com/" },
          { "@type": "ListItem", "position": 2, "name": "Rooms", "item": "https://abhitejinn.com/rooms" }
        ]
      }
    },
    {
      "@type": "ItemList",
      "name": "Hotel Abhitej INN Room Types",
      "numberOfItems": 3,
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "item": {
            "@type": "Accommodation",
            "name": "Deluxe Non AC Room",
            "description": "Comfortable and well-appointed room with all essential amenities.",
            "url": "https://abhitejinn.com/rooms/Deluxe%20Non%20AC"
          }
        },
        {
          "@type": "ListItem",
          "position": 2,
          "item": {
            "@type": "Accommodation",
            "name": "Deluxe AC Room",
            "description": "Spacious air-conditioned room with modern furnishings and premium amenities.",
            "url": "https://abhitejinn.com/rooms/Deluxe%20AC"
          }
        },
        {
          "@type": "ListItem",
          "position": 3,
          "item": {
            "@type": "Accommodation",
            "name": "Presidential Suite",
            "description": "Our finest accommodation with a separate living area and luxury amenities.",
            "url": "https://abhitejinn.com/rooms/Suite"
          }
        }
      ]
    }
  ]
};

const Rooms = () => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  return (
    <PageLayout>
      <SEO
        title="Luxury Rooms & Suites | Hotel Abhitej INN Araku"
        description="Book luxury hotel rooms in Araku Valley. Select from Deluxe Non AC, Deluxe AC, or Presidential Suites. 24/7 service, free Wi-Fi, and best rate guaranteed."
        schema={roomsSchema}
      />
      <section className="border-b border-border bg-muted/40 py-12 md:py-16">
        <div className="container-page">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Our Rooms</span>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-5xl">
            Choose your room type
          </h1>
          <p className="mt-3 max-w-xl text-muted-foreground">
            Select from our curated room categories. Our team will assign you the perfect room upon arrival.
          </p>
        </div>
      </section>

      <section className="container-page py-10 md:py-14">
        <div className="mb-8 flex flex-wrap items-end gap-4 rounded-2xl border border-border bg-card p-5 shadow-card">
          <div className="flex-1 min-w-[140px]">
            <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">Check-in</label>
            <input
              type="date"
              value={checkIn}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => { setCheckIn(e.target.value); if (checkOut && e.target.value >= checkOut) setCheckOut(""); }}
              className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div className="flex-1 min-w-[140px]">
            <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">Check-out</label>
            <input
              type="date"
              value={checkOut}
              min={checkIn || new Date().toISOString().split("T")[0]}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          {checkIn && checkOut && (
            <p className="text-xs text-primary font-medium self-end pb-2">
              Dates selected. Click View Details on your preferred room type.
            </p>
          )}
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {ROOM_TYPES.map((type) => (
            <RoomTypeCard key={type} roomType={type} checkIn={checkIn} checkOut={checkOut} />
          ))}
        </div>
      </section>

      {/* Related planning tools */}
      <section className="container-page pb-16 pt-4 border-t border-border">
        <div className="rounded-2xl bg-muted/50 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl">
            <h2 className="font-display text-2xl font-bold">Unsure which room suits you best?</h2>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
              Use our interactive comparison tables and pricing calculators to estimate your stay budget and view specific room amenities.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Button asChild variant="outline" className="rounded-full bg-background">
              <Link to="/tools/room-comparison">Compare Rooms Side-by-Side</Link>
            </Button>
            <Button asChild className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
              <Link to="/tools/stay-calculator">Calculate Stay Budget</Link>
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Rooms;