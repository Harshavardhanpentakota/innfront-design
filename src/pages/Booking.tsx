import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Skeleton } from "@/components/ui/skeleton";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check, Calendar as CalIcon, ArrowRight, ArrowLeft, CheckCircle2, Clock, Loader2, CreditCard, IndianRupee } from "lucide-react";
import { format, differenceInCalendarDays } from "date-fns";
import { cn } from "@/lib/utils";
import { useQuery, useMutation } from "@tanstack/react-query";
import { roomsApi, bookingsApi, paymentsApi, settingsApi, ApiError } from "@/lib/api";
import { roomImages } from "@/lib/rooms";
import { useAuth } from "@/contexts/AuthContext";
import { AuthModal } from "@/components/auth/AuthModal";
import { Day } from "react-day-picker";

declare global {
  interface Window {
    Razorpay: new (options: object) => { open: () => void };
  }
}

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (window.Razorpay) { resolve(true); return; }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

const TYPE_IMAGES: Record<string, string> = {
  "Suite": roomImages["suite"],
  "Deluxe AC": roomImages["deluxe"],
  "Deluxe Non AC": roomImages["standard"],
};

const steps = ["Dates & Guests", "Your Details", "Summary", "Confirmation"];

// ─── DateField helper ─────────────────────────────────────────────
function DateField({
  label,
  value,
  onChange,
  roomType,
  minDate
}: {
  label: string;
  value: Date | undefined;
  onChange: (d: Date | undefined) => void;
  roomType: string;
  minDate?: Date;
}) {
  const [calMonth, setCalMonth] = useState<Date>(() => value || minDate || new Date());

  useEffect(() => {
    if (value) {
      setCalMonth(value);
    }
  }, [value]);

  useEffect(() => {
    if (minDate && !value) {
      setCalMonth(minDate);
    }
  }, [minDate, value]);

  const { data: availabilityData } = useQuery({
    queryKey: ["rooms-availability", roomType, calMonth.getFullYear(), calMonth.getMonth() + 1],
    queryFn: () => roomsApi.getAvailability(roomType, {
      year: String(calMonth.getFullYear()),
      month: String(calMonth.getMonth() + 1)
    }),
    enabled: !!roomType,
    staleTime: 1000 * 60 * 5,
  });

  const fullyBookedSet = new Set<string>(availabilityData?.data?.fullyBookedDates ?? []);
  const limitedSet = new Set<string>(availabilityData?.data?.limitedAvailabilityDates ?? []);

  const isFullyBooked = (d: Date) => {
    const key = format(d, "yyyy-MM-dd");
    return fullyBookedSet.has(key);
  };

  const isLimited = (d: Date) => {
    const key = format(d, "yyyy-MM-dd");
    return limitedSet.has(key);
  };

  const isAvailable = (d: Date) => {
    const key = format(d, "yyyy-MM-dd");
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (d < today) return false;
    return !fullyBookedSet.has(key) && !limitedSet.has(key);
  };

  const isDisabled = (d: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Disable past dates
    if (d < today) return true;

    // Disable dates before minDate (if provided)
    if (minDate) {
      const minDateCompare = new Date(minDate);
      minDateCompare.setHours(0, 0, 0, 0);
      if (d <= minDateCompare) return true;
    }

    // Disable fully booked dates
    return isFullyBooked(d);
  };

  return (
    <div className="flex flex-col gap-1.5">
      <Label className="text-sm font-medium">{label}</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className={cn(
            "h-12 justify-start rounded-xl text-left font-normal",
            !value && "text-muted-foreground"
          )}>
            <CalIcon className="mr-2 h-4 w-4 shrink-0" />
            {value ? format(value, "PPP") : "Pick a date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-4" align="start">
          <Calendar
            mode="single"
            selected={value}
            onSelect={onChange}
            month={calMonth}
            onMonthChange={setCalMonth}
            disabled={isDisabled}
            modifiers={{
              fullyBooked: (d) => isFullyBooked(d),
              limited: (d) => isLimited(d),
              available: (d) => isAvailable(d),
            }}
            modifiersClassNames={{
              fullyBooked: "!bg-destructive/15 !text-destructive line-through hover:!bg-destructive/25 cursor-not-allowed",
              limited: "!bg-amber-500/15 !text-amber-700 hover:!bg-amber-500/25 font-semibold",
              available: "!bg-emerald-500/15 !text-emerald-700 hover:!bg-emerald-500/25",
            }}
            classNames={{
              day_selected: "bg-primary text-primary-foreground hover:bg-primary",
            }}
            components={{
              Day: (props) => {
                const isBooked = isFullyBooked(props.date);
                return (
                  <span title={isBooked ? "Fully Booked" : undefined} className="w-full h-full block">
                    <Day {...props} />
                  </span>
                );
              }
            }}
            initialFocus
          />
          <div className="mt-3 flex gap-4 text-[10px] border-t border-border pt-2 px-1 justify-center">
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-500/30" />
              Available
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-amber-500/30" />
              Limited
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-destructive/30" />
              Fully booked
            </span>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-1.5 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

const Booking = () => {
  const [searchParams] = useSearchParams();
  const roomType = searchParams.get("roomType") ?? "";
  const checkInParam = searchParams.get("checkIn");
  const checkOutParam = searchParams.get("checkOut");
  const navigate = useNavigate();
  const { user } = useAuth();

  const sessionKey = `booking-step-${roomType}`;
  const dataKey   = `booking-data-${roomType}`;

  // Restore persisted form data from a previous session (before reload)
  const persisted = (() => {
    try { return JSON.parse(sessionStorage.getItem(dataKey) ?? "{}"); } catch { return {}; }
  })();

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [step, setStep] = useState(() => {
    const saved = sessionStorage.getItem(sessionKey);
    if (!saved) return 0;
    const s = parseInt(saved, 10);
    // If step > 0 but essential date data is unavailable, restart from step 0
    const hasCheckOut = checkOutParam || persisted.checkOut;
    if (s > 0 && !hasCheckOut) {
      sessionStorage.removeItem(sessionKey);
      return 0;
    }
    return s;
  });

  const setStepPersist = (s: number | ((prev: number) => number)) => {
    setStep((prev) => {
      const next = typeof s === 'function' ? s(prev) : s;
      sessionStorage.setItem(sessionKey, String(next));
      return next;
    });
  };

  const [checkIn, setCheckIn] = useState<Date | undefined>(() => {
    if (checkInParam) return new Date(checkInParam + "T12:00:00");
    if (persisted.checkIn) return new Date(persisted.checkIn);
    return new Date();
  });
  const [checkOut, setCheckOut] = useState<Date | undefined>(() => {
    if (checkOutParam) return new Date(checkOutParam + "T12:00:00");
    if (persisted.checkOut) return new Date(persisted.checkOut);
    return undefined;
  });
  const [guests, setGuests] = useState<string>(persisted.guests ?? "2");
  const [name, setName] = useState(persisted.name ?? "");
  const [email, setEmail] = useState(persisted.email ?? "");
  const [phone, setPhone] = useState(persisted.phone ?? "");
  const [specialRequests, setSpecialRequests] = useState("");
  const [createdBooking, setCreatedBooking] = useState<any>(null);
  const [apiError, setApiError] = useState("");
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "loading" | "success" | "failed">("idle");
  const [advanceAmount, setAdvanceAmount] = useState<number | null>(null);

  // Persist form data so a page reload within the same booking session can recover
  useEffect(() => {
    if (step >= 3) return; // don't keep stale data after booking is created
    const data: Record<string, string> = { guests };
    if (checkIn) data.checkIn = checkIn.toISOString();
    if (checkOut) data.checkOut = checkOut.toISOString();
    if (name) data.name = name;
    if (email) data.email = email;
    if (phone) data.phone = phone;
    sessionStorage.setItem(dataKey, JSON.stringify(data));
  }, [checkIn, checkOut, guests, name, email, phone, step, dataKey]);

  useEffect(() => {
    if (user) {
      setName(user.name ?? "");
      setEmail(user.email ?? "");
      setPhone(user.phone ?? "");
    }
  }, [user]);

  // Fetch representative room to get price for this type
  const { data: roomTypeData, isLoading: priceLoading } = useQuery({
    queryKey: ["rooms-type-price", roomType],
    queryFn: () => roomsApi.getAll({ type: roomType, limit: "1" }),
    enabled: !!roomType,
    staleTime: 1000 * 60 * 10,
  });
  const pricePerNight = roomTypeData?.data?.[0]?.price ?? 0;

  // Fetch advance payment % from public settings
  const { data: settingsData } = useQuery({
    queryKey: ["public-settings"],
    queryFn: () => settingsApi.getPublic(),
    staleTime: 1000 * 60 * 30,
  });
  const advancePercent = (settingsData as any)?.data?.advancePaymentPercent ?? 10;

  const nights = checkIn && checkOut
    ? Math.max(1, differenceInCalendarDays(checkOut, checkIn))
    : 1;
  const subtotal = pricePerNight * nights;
  const gst = Math.round(subtotal * 0.12);
  const total = subtotal + gst;

  // Advance amount shown to user — from actual booking total once created, else from local calc
  const displayAdvanceAmount = Math.round(
    (createdBooking?.totalAmount ?? total) * advancePercent / 100
  );

  const bookingMutation = useMutation({
    mutationFn: () =>
      bookingsApi.create({
        roomType: roomType,
        checkInDate: checkIn!.toISOString(),
        checkOutDate: checkOut!.toISOString(),
        guests: parseInt(guests, 10),
        specialRequests,
      }),
    onSuccess: (res: any) => {
      setCreatedBooking(res.data);
      setStepPersist(3);
      sessionStorage.removeItem(dataKey); // form data no longer needed
      setApiError("");
    },
    onError: (err) => {
      if (err instanceof ApiError) setApiError(err.message);
      else setApiError("Booking failed. Please try again.");
    },
  });

  const next = () => {
    if (step === 2) {
      if (!user) {
        setAuthModalOpen(true);
        return;
      }
      bookingMutation.mutate();
      return;
    }
    setStepPersist((s) => Math.min(s + 1, steps.length - 1));
  };
  const back = () => setStepPersist((s) => Math.max(s - 1, 0));

  const handleRazorpayPayment = async () => {
    if (!createdBooking) return;
    setPaymentStatus("loading");
    const loaded = await loadRazorpayScript();
    if (!loaded) {
      setPaymentStatus("failed");
      return;
    }
    try {
      const orderRes = await paymentsApi.createRazorpayOrder(createdBooking._id) as any;
      const { orderId, amount, currency, keyId, advanceAmount: adv } = orderRes.data;
      if (adv) setAdvanceAmount(adv);

      const rzp = new window.Razorpay({
        key: keyId,
        amount,
        currency,
        name: "Hotel Abhitej Inn",
        description: `Advance payment for ${createdBooking.roomType ?? roomType}`,
        order_id: orderId,
        prefill: { name, email, contact: phone },
        theme: { color: "#0ea5e9" },
        handler: async (response: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) => {
          try {
            await paymentsApi.verifyRazorpayPayment({
              bookingId: createdBooking._id,
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            });
            setPaymentStatus("success");
            sessionStorage.removeItem(sessionKey);
            sessionStorage.removeItem(dataKey);
          } catch {
            setPaymentStatus("failed");
          }
        },
        modal: {
          ondismiss: () => {
            if (paymentStatus !== "success") setPaymentStatus("idle");
          },
        },
      });
      rzp.open();
    } catch {
      setPaymentStatus("failed");
    }
  };

  if (!roomType) {
    return (
      <PageLayout>
        <div className="container-page py-20 text-center text-muted-foreground">
          No room type selected.{" "}
          <Link to="/rooms" className="text-primary underline">Browse room types</Link>
        </div>
      </PageLayout>
    );
  }

  const roomImage = TYPE_IMAGES[roomType] ?? roomImages["standard"];

  return (
    <PageLayout>
      <AuthModal
        open={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        defaultMode="login"
      />

      <section className="border-b border-border bg-muted/40 py-12">
        <div className="container-page">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Reservation</span>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-5xl">
            Complete your booking
          </h1>
        </div>
      </section>

      <section className="container-page py-10 md:py-14">
        {/* Stepper */}
        <ol className="mb-10 flex items-center justify-between gap-2 overflow-x-auto">
          {steps.map((s, i) => (
            <li key={s} className="flex flex-1 items-center gap-3">
              <div className={cn(
                "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-colors",
                i < step && "bg-primary text-primary-foreground",
                i === step && "bg-gradient-sky text-primary-foreground shadow-glow",
                i > step && "bg-muted text-muted-foreground"
              )}>
                {i < step ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              <span className={cn(
                "hidden whitespace-nowrap text-sm font-medium md:inline",
                i <= step ? "text-foreground" : "text-muted-foreground"
              )}>{s}</span>
              {i < steps.length - 1 && (
                <div className={cn("h-px flex-1 transition-colors", i < step ? "bg-primary" : "bg-border")} />
              )}
            </li>
          ))}
        </ol>

        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-card md:p-8">

            {step === 0 && (
              <div className="space-y-6 animate-fade-up">
                <h2 className="font-display text-2xl font-semibold">When are you staying?</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  <DateField
                    label="Check-in"
                    value={checkIn}
                    onChange={(d) => {
                      setCheckIn(d);
                      if (d && checkOut && d >= checkOut) {
                        setCheckOut(undefined);
                      }
                    }}
                    roomType={roomType}
                  />
                  <DateField
                    label="Check-out"
                    value={checkOut}
                    onChange={setCheckOut}
                    roomType={roomType}
                    minDate={checkIn}
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium">Guests</Label>
                  <Select value={guests} onValueChange={setGuests}>
                    <SelectTrigger className="mt-2 h-12 rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[1,2,3,4,5,6].map(n => (
                        <SelectItem key={n} value={String(n)}>{n} guest{n > 1 ? "s" : ""}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-5 animate-fade-up">
                <h2 className="font-display text-2xl font-semibold">Your details</h2>
                {!user && (
                  <div className="rounded-xl border border-primary/30 bg-primary-soft/50 p-4 text-sm text-primary-deep">
                    You'll be asked to sign in before confirming your booking.
                  </div>
                )}
                <div>
                  <Label>Full name</Label>
                  <Input className="mt-1.5 h-12 rounded-xl" value={name} onChange={(e) => setName(e.target.value)} placeholder="Aarav Patel" />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label>Phone</Label>
                    <Input className="mt-1.5 h-12 rounded-xl" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 98765 43210" />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input type="email" className="mt-1.5 h-12 rounded-xl" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" />
                  </div>
                </div>
                <div>
                  <Label>Special requests (optional)</Label>
                  <Input className="mt-1.5 h-12 rounded-xl" value={specialRequests} onChange={(e) => setSpecialRequests(e.target.value)} placeholder="e.g. early check-in, ground floor..." />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-5 animate-fade-up">
                <h2 className="font-display text-2xl font-semibold">Review your booking</h2>
                <div className="rounded-xl border border-border p-5">
                  <SummaryRow label="Guest" value={name || "\u2014"} />
                  <SummaryRow label="Email" value={email || "\u2014"} />
                  <SummaryRow label="Phone" value={phone || "\u2014"} />
                  <SummaryRow label="Room Type" value={roomType} />
                  <SummaryRow label="Check-in" value={checkIn ? format(checkIn, "PPP") : "\u2014"} />
                  <SummaryRow label="Check-out" value={checkOut ? format(checkOut, "PPP") : "\u2014"} />
                  <SummaryRow label="Nights" value={String(nights)} />
                  <SummaryRow label="Guests" value={`${guests} guest${parseInt(guests) > 1 ? "s" : ""}`} />
                  <SummaryRow label="Subtotal" value={`₹${subtotal.toLocaleString("en-IN")}`} />
                  <SummaryRow label="GST (12%)" value={`₹${gst.toLocaleString("en-IN")}`} />
                  <div className="mt-2 flex items-center justify-between border-t border-border pt-3 font-semibold">
                    <span>Total</span>
                    <span>₹{total.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="mt-1.5 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Advance due now ({advancePercent}%)</span>
                    <span className="font-semibold text-primary">₹{Math.round(total * advancePercent / 100).toLocaleString("en-IN")}</span>
                  </div>
                </div>
                <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 text-sm text-primary-deep">
                  A specific room will be assigned by our team upon check-in.
                </div>
                {apiError && (
                  <p className="rounded-lg bg-destructive/10 px-4 py-2.5 text-sm text-destructive">{apiError}</p>
                )}
              </div>
            )}

            {step === 3 && createdBooking && (
              <div className="space-y-5 text-center animate-scale-in">
                {paymentStatus === "success" ? (
                  /* ── Payment success + booking confirmed ── */
                  <>
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                      <CheckCircle2 className="h-10 w-10 text-green-600" strokeWidth={1.5} />
                    </div>
                    <h2 className="font-display text-3xl font-semibold">Booking Confirmed!</h2>
                    <p className="mx-auto max-w-md text-muted-foreground">
                      Your advance payment has been received and your booking is now confirmed. See you at Hotel Abhitej Inn!
                    </p>
                  </>
                ) : (
                  /* ── Payment pending — reservation created, not yet confirmed ── */
                  <>
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-amber-100">
                      <Clock className="h-10 w-10 text-amber-600" strokeWidth={1.5} />
                    </div>
                    <h2 className="font-display text-3xl font-semibold">Reservation Pending</h2>
                    <p className="mx-auto max-w-md text-muted-foreground">
                      Your reservation is created. <strong>Pay the advance now</strong> to confirm your booking.
                    </p>
                  </>
                )}

                <div className="mx-auto max-w-md rounded-xl bg-muted/60 p-5 text-left">
                  <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {paymentStatus === "success" ? "Booking ID" : "Reservation ID (pending)"}
                  </div>
                  <div className="mt-1 font-display text-xl font-semibold">{createdBooking.bookingId}</div>
                  <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <div className="text-muted-foreground">Room Type</div>
                      <div className="font-medium">{createdBooking.roomType ?? roomType}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Total</div>
                      <div className="font-medium">₹{createdBooking.totalAmount?.toLocaleString("en-IN")}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Check-in</div>
                      <div className="font-medium">{format(new Date(createdBooking.checkInDate), "dd MMM yyyy")}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Check-out</div>
                      <div className="font-medium">{format(new Date(createdBooking.checkOutDate), "dd MMM yyyy")}</div>
                    </div>
                  </div>
                  <p className="mt-3 text-xs text-muted-foreground">
                    Room number will be assigned at check-in by our team.
                  </p>
                </div>

                {paymentStatus !== "success" && (
                  <div className="mx-auto max-w-md rounded-xl border border-primary/20 bg-primary/5 p-5 text-left space-y-3">
                    <div className="flex items-center gap-2">
                      <IndianRupee className="h-5 w-5 text-primary" />
                      <span className="font-semibold text-sm">Pay Advance to Confirm</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Pay the advance online via Razorpay to confirm your booking immediately.
                    </p>
                    {paymentStatus === "failed" && (
                      <p className="text-xs text-destructive">Payment failed or was cancelled. Please try again.</p>
                    )}
                    <div className="flex gap-3">
                      <Button
                        onClick={handleRazorpayPayment}
                        disabled={paymentStatus === "loading"}
                        className="w-full rounded-full bg-gradient-sky text-primary-foreground shadow-glow"
                      >
                        {paymentStatus === "loading" ? (
                          <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...</>
                        ) : (
                          <><CreditCard className="mr-2 h-4 w-4" /> Pay ₹{displayAdvanceAmount.toLocaleString("en-IN")} Advance ({advancePercent}%)</>
                        )}
                      </Button>
                    </div>
                  </div>
                )}

                {paymentStatus === "success" && (
                  <Button asChild className="rounded-full bg-gradient-sky text-primary-foreground">
                    <Link to="/my-bookings">View My Bookings <ArrowRight className="ml-1.5 h-4 w-4" /></Link>
                  </Button>
                )}
              </div>
            )}

            {step < 3 && (
              <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
                <Button variant="ghost" disabled={step === 0} onClick={back} className="rounded-full">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <Button
                  onClick={next}
                  disabled={
                    bookingMutation.isPending ||
                    (step === 0 && (!checkIn || !checkOut))
                  }
                  className="rounded-full bg-gradient-sky text-primary-foreground shadow-glow"
                >
                  {bookingMutation.isPending ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Confirming...</>
                  ) : step === 2 ? (
                    !user ? "Sign In & Confirm" : "Confirm Booking"
                  ) : (
                    "Continue"
                  )}
                  {!bookingMutation.isPending && <ArrowRight className="ml-2 h-4 w-4" />}
                </Button>
              </div>
            )}
          </div>

          {/* Room type summary sidebar */}
          <aside className="space-y-4">
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={roomImage} alt={roomType} className="h-full w-full object-cover" />
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg font-semibold">{roomType}</h3>
                {priceLoading ? (
                  <Skeleton className="mt-2 h-6 w-32" />
                ) : pricePerNight > 0 ? (
                  <p className="mt-1 text-2xl font-display font-semibold">
                    ₹{pricePerNight.toLocaleString("en-IN")}
                    <span className="ml-1 text-xs font-normal text-muted-foreground">/ night</span>
                  </p>
                ) : null}
                <p className="mt-2 text-xs text-muted-foreground">
                  Room number assigned by our team at check-in.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </PageLayout>
  );
};

export default Booking;