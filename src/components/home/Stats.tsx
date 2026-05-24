import { Hotel, Star, Users, MapPin } from "lucide-react";

const STATS = [
  { icon: Hotel,  value: "3",    label: "Room Types",        desc: "Deluxe Non-AC, Deluxe AC & Suite" },
  { icon: Star,   value: "4.8",  label: "Average Rating",    desc: "Rated by our happy guests" },
  { icon: Users,  value: "5000+",label: "Happy Guests",      desc: "Served with warmth & care" },
  { icon: MapPin, value: "Araku",label: "Prime Location",    desc: "Near Jeypore Junction, Dumbriguda" },
];

export const Stats = () => (
  <section className="py-16 md:py-20 bg-muted/30">
    <div className="container-page">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map(({ icon: Icon, value, label, desc }) => (
          <div key={label} className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-6 text-center shadow-soft">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-soft text-primary-deep">
              <Icon className="h-6 w-6" strokeWidth={1.6} />
            </div>
            <div>
              <div className="font-display text-3xl font-bold text-foreground">{value}</div>
              <div className="mt-0.5 text-sm font-semibold text-foreground">{label}</div>
              <div className="mt-1 text-xs text-muted-foreground">{desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
