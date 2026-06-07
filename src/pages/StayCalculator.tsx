import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { SEO } from "@/components/seo/SEO";
import { Calendar, Calculator, Sparkles, Check, ArrowRight, Info, HelpCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { roomsApi } from "@/lib/api";
import { differenceInDays, parseISO, format } from "date-fns";

const ROOM_PRICES: Record<string, number> = {
  "Deluxe Non AC": 1500,
  "Deluxe AC": 2200,
  "Suite": 4000,
};

export const StayCalculator = () => {
  const navigate = useNavigate();
  const [roomType, setRoomType] = useState<string>("Deluxe AC");
  const [checkIn, setCheckIn] = useState<string>("");
  const [checkOut, setCheckOut] = useState<string>("");
  const [guests, setGuests] = useState<number>(2);
  const [includeBreakfast, setIncludeBreakfast] = useState<boolean>(false);
  const [extraBed, setExtraBed] = useState<boolean>(false);

  // Fetch live price if available
  const { data: roomsData } = useQuery({
    queryKey: ["rooms-prices-all"],
    queryFn: () => roomsApi.getAll({ limit: "20" }),
    staleTime: 1000 * 60 * 10,
  });

  const getPrice = (type: string): number => {
    if (roomsData?.data) {
      const match = roomsData.data.find((r) => r.type === type);
      if (match?.price) return match.price;
    }
    return ROOM_PRICES[type] || 2000;
  };

  const currentPricePerNight = getPrice(roomType);
  const nights = checkIn && checkOut ? differenceInDays(parseISO(checkOut), parseISO(checkIn)) : 0;

  const roomCost = currentPricePerNight * (nights || 1);
  const breakfastCostPerDay = 250;
  const breakfastCost = includeBreakfast ? breakfastCostPerDay * guests * (nights || 1) : 0;
  const extraBedCostPerNight = 500;
  const extraBedCost = extraBed ? extraBedCostPerNight * (nights || 1) : 0;

  const subtotal = roomCost + breakfastCost + extraBedCost;
  const gstRate = 0.12; // 12% GST
  const gst = subtotal * gstRate;
  const total = subtotal + gst;
  const advancePaymentPercent = 0.50; // 50% advance
  const advance = total * advancePaymentPercent;

  // Set default dates to today and tomorrow on mount
  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    setCheckIn(format(today, "yyyy-MM-dd"));
    setCheckOut(format(tomorrow, "yyyy-MM-dd"));
  }, []);

  const handleBookNow = () => {
    const params = new URLSearchParams({
      roomType,
      checkIn,
      checkOut,
      guests: String(guests),
      breakfast: includeBreakfast ? "true" : "false",
      extraBed: extraBed ? "true" : "false",
    });
    navigate(`/booking?${params.toString()}`);
  };

  // Structured Data (FAQ & Calculator metadata)
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://abhitejinn.com/tools/stay-calculator",
        "url": "https://abhitejinn.com/tools/stay-calculator",
        "name": "Stay Cost & Room Price Calculator | Hotel Abhitej INN Araku",
        "description": "Calculate hotel room prices, taxes (GST), and add-on costs for your stay at Hotel Abhitej INN in Araku Valley.",
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://abhitejinn.com/" },
            { "@type": "ListItem", "position": 2, "name": "Rooms", "item": "https://abhitejinn.com/rooms" },
            { "@type": "ListItem", "position": 3, "name": "Stay Calculator", "item": "https://abhitejinn.com/tools/stay-calculator" }
          ]
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is the GST rate for rooms at Hotel Abhitej INN?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We apply a standard 12% Goods and Services Tax (GST) on room tariffs and lodging services in accordance with Indian government regulations."
            }
          },
          {
            "@type": "Question",
            "name": "Is breakfast included in the room price?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Breakfast can be added to any room booking at a nominal charge of ₹250 per person per day. Guests in our luxury Suite also enjoy complimentary welcome amenities."
            }
          },
          {
            "@type": "Question",
            "name": "Do I need to pay the full amount during booking?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No, you only need to pay a 50% advance to secure your booking. The remaining balance can be settled at the hotel check-in desk via Cash, Card, UPI, or Net Banking."
            }
          }
        ]
      }
    ]
  };

  return (
    <PageLayout>
      <SEO
        title="Stay Cost & Room Price Calculator | Hotel Abhitej INN Araku"
        description="Estimate your stay budget at Hotel Abhitej INN Araku. Calculate room rents, check-in dates, breakfast add-ons, and tax (GST) breakdowns instantly."
        schema={schema}
      />

      <section className="border-b border-border bg-muted/40 py-12 md:py-16">
        <div className="container-page">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Interactive Tools</span>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-5xl">
            Stay Cost Estimator
          </h1>
          <p className="mt-3 max-w-xl text-muted-foreground">
            Plan your budget easily. Adjust room categories, booking dates, and premium add-ons to see a complete tax-inclusive cost breakdown.
          </p>
        </div>
      </section>

      <section className="container-page py-12">
        <div className="grid gap-10 lg:grid-cols-[1fr_400px]">
          {/* Form */}
          <div className="space-y-6">
            <Card className="border-border shadow-soft rounded-2xl">
              <CardHeader>
                <CardTitle className="font-display text-2xl flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-primary" /> Calculator Settings
                </CardTitle>
                <CardDescription>Customize your room stay details below</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Room Type */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                    Room Category
                  </label>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    {Object.keys(ROOM_PRICES).map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setRoomType(type)}
                        className={`flex flex-col items-center justify-center rounded-xl border p-4 text-center transition-all ${roomType === type
                            ? "border-primary bg-primary-soft text-primary-deep ring-2 ring-primary/20"
                            : "border-border bg-card hover:bg-muted/50"
                          }`}
                      >
                        <span className="text-sm font-semibold">{type}</span>
                        <span className="text-xs text-muted-foreground mt-1">
                          ₹{getPrice(type).toLocaleString("en-IN")}/night
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Dates */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                      Check-in Date
                    </label>
                    <input
                      type="date"
                      value={checkIn}
                      min={new Date().toISOString().split("T")[0]}
                      onChange={(e) => {
                        setCheckIn(e.target.value);
                        if (checkOut && e.target.value >= checkOut) {
                          const nextDay = new Date(e.target.value);
                          nextDay.setDate(nextDay.getDate() + 1);
                          setCheckOut(format(nextDay, "yyyy-MM-dd"));
                        }
                      }}
                      className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                      Check-out Date
                    </label>
                    <input
                      type="date"
                      value={checkOut}
                      min={checkIn || new Date().toISOString().split("T")[0]}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>

                {/* Guests */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                    Guests ({guests})
                  </label>
                  <input
                    type="range"
                    min="1"
                    max={roomType === "Suite" ? "4" : roomType === "Deluxe AC" ? "3" : "2"}
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                  <div className="flex justify-between text-[11px] text-muted-foreground mt-1">
                    <span>1 Guest</span>
                    <span>Max {roomType === "Suite" ? "4" : roomType === "Deluxe AC" ? "3" : "2"} Guests for this room</span>
                  </div>
                </div>

                {/* Add-ons */}
                <div className="border-t border-border pt-4">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                    Optional Add-ons
                  </label>
                  <div className="space-y-3">
                    <label className="flex items-center justify-between rounded-xl border border-border bg-card p-3 hover:bg-muted/30 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={includeBreakfast}
                          onChange={(e) => setIncludeBreakfast(e.target.checked)}
                          className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                        />
                        <div>
                          <span className="text-sm font-medium">Daily Breakfast Buffet</span>
                          <p className="text-xs text-muted-foreground">Fresh juices, local specials, hot tea</p>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-primary">₹250 / guest / day</span>
                    </label>

                    <label className={`flex items-center justify-between rounded-xl border border-border bg-card p-3 hover:bg-muted/30 cursor-pointer ${roomType === "Deluxe Non AC" ? "opacity-50 pointer-events-none" : ""}`}>
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={extraBed}
                          disabled={roomType === "Deluxe Non AC"}
                          onChange={(e) => setExtraBed(e.target.checked)}
                          className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                        />
                        <div>
                          <span className="text-sm font-medium">Extra Rollaway Bed</span>
                          <p className="text-xs text-muted-foreground">Suitable for families with children</p>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-primary">₹500 / night</span>
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Facts */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-border bg-card p-4 flex gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary-deep">
                  <Check className="h-5 w-5" />
                </span>
                <div>
                  <h4 className="text-sm font-semibold">Best Price Guarantee</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">Book directly on our website for the absolute lowest tariff.</p>
                </div>
              </div>
              <div className="rounded-2xl border border-border bg-card p-4 flex gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary-deep">
                  <Sparkles className="h-5 w-5" />
                </span>
                <div>
                  <h4 className="text-sm font-semibold">Flexible Cancellation</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">Cancel up to 48 hours prior to check-in for a 100% refund.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Summary */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <Card className="border-primary/20 bg-card shadow-elevated rounded-2xl overflow-hidden">
              <div className="bg-gradient-sky p-6 text-primary-foreground">
                <span className="text-xs font-semibold uppercase tracking-wider opacity-90">Summary of Estimation</span>
                <h3 className="font-display text-2xl font-bold mt-1">₹{total.toLocaleString("en-IN")}</h3>
                <p className="text-xs mt-1 opacity-85">Includes room rent, meals, extra bed & 12% GST</p>
              </div>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2.5 border-b border-border pb-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Room Price ({nights || 1} {nights === 1 ? "night" : "nights"})</span>
                    <span className="font-medium">₹{roomCost.toLocaleString("en-IN")}</span>
                  </div>
                  {includeBreakfast && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Breakfast Buffet ({guests} pax)</span>
                      <span className="font-medium">₹{breakfastCost.toLocaleString("en-IN")}</span>
                    </div>
                  )}
                  {extraBed && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Extra Bed</span>
                      <span className="font-medium">₹{extraBedCost.toLocaleString("en-IN")}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">GST (12%)</span>
                    <span className="font-medium">₹{gst.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="flex justify-between text-base font-bold">
                    <span>Estimated Total</span>
                    <span>₹{total.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between text-xs bg-primary-soft text-primary-deep rounded-xl p-3">
                    <span>50% Advance to Book</span>
                    <span className="font-bold">₹{advance.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                <Button
                  onClick={handleBookNow}
                  className="w-full rounded-full bg-foreground text-background hover:bg-foreground/90 py-6 text-sm font-semibold mt-4"
                >
                  Confirm & Book Stay <ArrowRight className="ml-2 h-4 w-4" />
                </Button>

                <div className="flex gap-2 justify-center text-[10px] text-muted-foreground mt-3">
                  <Info className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />
                  <span>The price calculated is an estimate. Rates may vary during peak tourist seasons in Araku.</span>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>

        {/* FAQs for AEO */}
        <div className="mt-16 border-t border-border pt-12 max-w-3xl">
          <h3 className="font-display text-2xl font-semibold mb-6 flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-primary" /> Stay Pricing FAQs
          </h3>
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-bold text-foreground">How does the 50% advance booking deposit work?</h4>
              <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
                To guarantee your reservation, Hotel Abhitej INN charges a 50% advance deposit at the time of online check-out. You will receive an official invoice confirmation via email. The remaining balance can be settled at check-in.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-bold text-foreground">Are there any hidden service charges added?</h4>
              <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
                No. We maintain absolute transparency in our tariffs. Our estimates include the room base tariff, selected meals, additional beds, and the statutory 12% Goods and Services Tax (GST). There are no additional surprise charges.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-bold text-foreground">Can I upgrade my room category later?</h4>
              <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
                Yes, subject to availability. You can modify your room category from Deluxe Non AC to Deluxe AC or Suite by contacting our reservation desk directly at +91 82477 86920. The differential tariff will be billed accordingly at check-in.
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default StayCalculator;
