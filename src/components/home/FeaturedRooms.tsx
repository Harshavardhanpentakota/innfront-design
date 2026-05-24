import { Link } from "react-router-dom";
import { ArrowRight, Users, Maximize2, Wind } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { roomsApi } from "@/lib/api";
import { roomImages } from "@/lib/rooms";

const ROOM_TYPE_META: Record<string, { image: string; size: string; capacity: number; ac: boolean }> = {
  "Deluxe Non AC": { image: roomImages["standard"], size: "250 sq ft", capacity: 2, ac: false },
  "Deluxe AC":     { image: roomImages["deluxe"],   size: "300 sq ft", capacity: 3, ac: true },
  "Suite":         { image: roomImages["suite"],     size: "500 sq ft", capacity: 4, ac: true },
};

const ROOM_TYPES = ["Deluxe Non AC", "Deluxe AC", "Suite"] as const;

function TypeCard({ roomType }: { roomType: string }) {
  const meta = ROOM_TYPE_META[roomType];
  const { data, isLoading } = useQuery({
    queryKey: ["rooms-type-price", roomType],
    queryFn: () => roomsApi.getAll({ type: roomType, limit: "1" }),
    staleTime: 1000 * 60 * 10,
  });
  const price = data?.data?.[0]?.price;

  return (
    <article className="group hover-lift overflow-hidden rounded-2xl border border-border bg-card shadow-card flex flex-col">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={meta.image}
          alt={roomType}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute left-4 top-4">
          <Badge className="rounded-full border-0 bg-background/95 px-3 py-1 text-xs font-medium text-foreground backdrop-blur">
            {roomType}
          </Badge>
        </div>
        {meta.ac && (
          <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-background/90 px-2.5 py-1 text-[11px] font-semibold backdrop-blur text-primary">
            <Wind className="h-3 w-3" /> AC
          </div>
        )}
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-display text-xl font-semibold">{roomType}</h3>
        <div className="mt-1 flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><Maximize2 className="h-3 w-3" /> {meta.size}</span>
          <span className="flex items-center gap-1"><Users className="h-3 w-3" /> Up to {meta.capacity} guests</span>
        </div>
        <div className="mt-auto flex items-end justify-between border-t border-border pt-4 mt-4">
          <div>
            {isLoading ? (
              <Skeleton className="h-7 w-28" />
            ) : price ? (
              <div className="font-display text-2xl font-semibold">
                ₹{price.toLocaleString("en-IN")}
                <span className="ml-1 text-xs font-normal text-muted-foreground">/ night</span>
              </div>
            ) : null}
          </div>
          <Button asChild size="sm" className="rounded-full bg-foreground text-background hover:bg-foreground/90">
            <Link to={`/rooms/${encodeURIComponent(roomType)}`}>
              View <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}

export const FeaturedRooms = () => {
  return (
    <section className="py-20 md:py-28">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Featured stays
            </span>
            <h2 className="mt-3 max-w-xl font-display text-3xl font-semibold tracking-tight md:text-5xl">
              Rooms designed for stillness
            </h2>
          </div>
          <Button asChild variant="ghost" className="rounded-full">
            <Link to="/rooms">View all rooms <ArrowRight className="ml-1.5 h-4 w-4" /></Link>
          </Button>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ROOM_TYPES.map((type) => (
            <TypeCard key={type} roomType={type} />
          ))}
        </div>
      </div>
    </section>
  );
};

