import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Users, Maximize2, Wind, Check, ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, CalendarDays } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { roomsApi } from "@/lib/api";
import { roomImages } from "@/lib/rooms";
import { format, addMonths, subMonths } from "date-fns";
import { ROOM_TYPES } from "@/lib/constants";

const TYPE_META: Record<string, {
  image: string;
  description: string;
  longDescription: string;
  amenities: string[];
  capacity: number;
  size: string;
  beds: string;
}> = {
  "Deluxe Non AC": {
    image: roomImages["standard"],
    description: "Comfortable and well-appointed room with all essential amenities.",
    longDescription: "Our Deluxe Non AC rooms offer a cosy retreat designed for guests who prefer natural ventilation. Each room features quality furnishings, a comfortable bed, and all the essentials for a pleasant stay. Ideal for the cooler months.",
    amenities: ["WiFi", "TV", "Hot Water", "Room Service", "Daily Housekeeping", "Toiletries"],
    capacity: 2,
    size: "250 sq ft",
    beds: "1 Double Bed",
  },
  "Deluxe AC": {
    image: roomImages["deluxe"],
    description: "Spacious air-conditioned room with modern furnishings and premium amenities.",
    longDescription: "Our Deluxe AC rooms combine modern design with practical comfort. Stay cool in our air-conditioned rooms featuring contemporary interiors, a plush bed, and a range of premium amenities to make your stay truly relaxing.",
    amenities: ["WiFi", "AC", "TV", "Hot Water", "Room Service", "Mini Bar", "Daily Housekeeping", "Toiletries"],
    capacity: 3,
    size: "300 sq ft",
    beds: "1 King Bed or 2 Single Beds",
  },
  Suite: {
    image: roomImages["suite"],
    description: "Our finest accommodation with a separate living area and luxury amenities.",
    longDescription: "Experience the pinnacle of luxury in our Suite. Featuring a separate living area, premium furnishings, a well-appointed bathroom with bathtub, and an array of exclusive amenities. Perfect for special occasions and discerning travellers who expect the very best.",
    amenities: ["WiFi", "AC", "TV", "Hot Water", "Room Service", "Mini Bar", "Bathtub", "Lounge", "Daily Housekeeping", "Premium Toiletries", "Welcome Amenities"],
    capacity: 4,
    size: "500 sq ft",
    beds: "1 King Bed + Sofa Bed",
  },
};

const RoomDetails = () => {
  const { type: rawType } = useParams<{ type: string }>();
  const navigate = useNavigate();
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [calMonth, setCalMonth] = useState(new Date());

  const roomType = rawType ? decodeURIComponent(rawType) : "";
  const meta = TYPE_META[roomType];

  const { data, isLoading } = useQuery({
    queryKey: ["rooms-type-price", roomType],
    queryFn: () => roomsApi.getAll({ type: roomType, limit: "1" }),
    enabled: !!roomType && !!meta,
    staleTime: 1000 * 60 * 10,
  });
  const price = data?.data?.[0]?.price;

  // Fetch unavailable dates for current calendar month
  const { data: unavailData } = useQuery({
    queryKey: ["type-unavailable-dates", roomType, calMonth.getFullYear(), calMonth.getMonth() + 1],
    queryFn: () => roomsApi.getTypeUnavailableDates(roomType, calMonth.getFullYear(), calMonth.getMonth() + 1),
    enabled: !!roomType && !!meta,
    staleTime: 1000 * 60 * 5,
  });
  const unavailableSet = new Set<string>(unavailData?.data?.dates ?? []);

  const isUnavailable = (d: Date) => {
    const key = format(d, "yyyy-MM-dd");
    return unavailableSet.has(key);
  };

  if (!meta) {
    return (
      <PageLayout>
        <div className="container-page py-20 text-center text-muted-foreground">
          Room type not found.{" "}
          <button onClick={() => navigate("/rooms")} className="text-primary underline">
            Browse all room types
          </button>
        </div>
      </PageLayout>
    );
  }

  const bookingParams = new URLSearchParams({ roomType });
  if (checkIn) bookingParams.set("checkIn", checkIn);
  if (checkOut) bookingParams.set("checkOut", checkOut);

  return (
    <PageLayout>
      <div className="container-page py-8 md:py-12">
        <Button variant="ghost" className="mb-4 -ml-2 rounded-full" onClick={() => navigate("/rooms")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> All room types
        </Button>

        <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
          {/* Left: image + info */}
          <div>
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-muted shadow-card">
              <img src={meta.image} alt={roomType} className="h-full w-full object-cover" />
              <div className="absolute left-5 top-5">
                <Badge className="rounded-full border-0 bg-background/95 px-3 py-1 text-sm font-medium text-foreground backdrop-blur">
                  {roomType}
                </Badge>
              </div>
              {(roomType === "Deluxe AC" || roomType === "Suite") && (
                <div className="absolute right-5 top-5 flex items-center gap-1 rounded-full bg-background/90 px-3 py-1.5 text-xs font-semibold backdrop-blur text-primary">
                  <Wind className="h-3 w-3" /> Air Conditioned
                </div>
              )}
            </div>

            <div className="mt-8">
              <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">{roomType}</h1>
              <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5"><Maximize2 className="h-4 w-4" /> {meta.size}</span>
                <span className="flex items-center gap-1.5"><Users className="h-4 w-4" /> Up to {meta.capacity} guests</span>
                <span>{meta.beds}</span>
              </div>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground">{meta.longDescription}</p>

              <div className="mt-8">
                <h3 className="font-display text-xl font-semibold">What this room offers</h3>
                <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {meta.amenities.map((f) => (
                    <li key={f} className="flex items-center gap-3 rounded-xl border border-border bg-card p-3.5">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-soft text-primary-deep">
                        <Check className="h-4 w-4" />
                      </span>
                      <span className="text-sm font-medium">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* ── Availability Calendar ── */}
              <div className="mt-10">
                <div className="flex items-center gap-2 mb-4">
                  <CalendarDays className="h-5 w-5 text-primary" />
                  <h3 className="font-display text-xl font-semibold">Availability Calendar</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Dates shown in red are fully booked. Green dates are available to book.
                </p>

                {/* Month navigation */}
                <div className="flex items-center gap-3 mb-4">
                  <button
                    onClick={() => setCalMonth((m) => subMonths(m, 1))}
                    disabled={calMonth <= new Date()}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground hover:bg-muted disabled:opacity-40"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <span className="font-semibold text-base min-w-[120px] text-center">
                    {format(calMonth, "MMMM yyyy")}
                  </span>
                  <button
                    onClick={() => setCalMonth((m) => addMonths(m, 1))}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground hover:bg-muted"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>

                <div className="rounded-2xl border border-border bg-card p-4 shadow-soft overflow-x-auto">
                  <Calendar
                    mode="single"
                    month={calMonth}
                    onMonthChange={setCalMonth}
                    disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))}
                    modifiers={{ unavailable: (d) => isUnavailable(d) }}
                    modifiersClassNames={{
                      unavailable: "!bg-destructive/15 !text-destructive line-through hover:!bg-destructive/25",
                    }}
                    classNames={{
                      day_selected: "bg-primary text-primary-foreground hover:bg-primary",
                    }}
                  />
                </div>

                <div className="mt-3 flex gap-4 text-xs">
                  <span className="flex items-center gap-1.5">
                    <span className="inline-block h-3 w-3 rounded-full bg-destructive/30" />
                    Fully booked
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="inline-block h-3 w-3 rounded-full bg-primary/30" />
                    Available
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: booking card */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-elevated">
              {isLoading ? (
                <Skeleton className="h-9 w-40" />
              ) : price ? (
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="font-display text-3xl font-semibold">₹{price.toLocaleString("en-IN")}</span>
                    <span className="text-sm text-muted-foreground">/ night</span>
                  </div>
                  <p className="text-xs text-muted-foreground">+ 12% GST</p>
                </div>
              ) : null}

              <div className="mt-5 space-y-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">Check-in</label>
                  <input type="date" value={checkIn} min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => { setCheckIn(e.target.value); if (checkOut && e.target.value >= checkOut) setCheckOut(""); }}
                    className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">Check-out</label>
                  <input type="date" value={checkOut} min={checkIn || new Date().toISOString().split("T")[0]}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
                </div>
              </div>

              <div className="mt-4 space-y-2 rounded-xl border border-border p-3 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Size</span><span>{meta.size}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Capacity</span><span>Up to {meta.capacity} guests</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Beds</span><span>{meta.beds}</span></div>
              </div>

              <Button
                onClick={() => navigate(`/booking?${bookingParams.toString()}`)}
                className="mt-5 w-full rounded-full bg-gradient-sky py-6 text-base text-primary-foreground shadow-glow"
              >
                Book Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <p className="mt-3 text-center text-xs text-muted-foreground">
                Room number will be assigned by our team at check-in.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </PageLayout>
  );
};

export default RoomDetails;