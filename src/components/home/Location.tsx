import { MapPin, Phone, Mail, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Location = () => (
  <section className="py-20 md:py-28">
    <div className="container-page">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        {/* Text */}
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Find Us
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-5xl">
            Nestled in the heart of Araku Valley
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Hotel Abhitej Inn is situated near Jeypore Junction in the scenic Araku Village Mandal, Dumbriguda — surrounded by lush forests, tribal culture, and the cool mountain air of the Eastern Ghats.
          </p>

          <ul className="mt-8 space-y-4">
            <li className="flex items-start gap-3 text-sm">
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary-deep">
                <MapPin className="h-4 w-4" />
              </span>
              <div>
                <div className="font-semibold text-foreground">Address</div>
                <div className="text-muted-foreground">Near Jeypore Junction, Araku Village Mandal,<br />Dumbriguda, Andhra Pradesh – 531151</div>
              </div>
            </li>
            <li className="flex items-center gap-3 text-sm">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary-deep">
                <Phone className="h-4 w-4" />
              </span>
              <div>
                <div className="font-semibold text-foreground">Phone</div>
                <a href="tel:+918247786920" className="text-muted-foreground hover:text-primary">+91 82477 86920</a>
              </div>
            </li>
            <li className="flex items-center gap-3 text-sm">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary-deep">
                <Mail className="h-4 w-4" />
              </span>
              <div>
                <div className="font-semibold text-foreground">Email</div>
                <a href="mailto:abhitejinn11@gmail.com" className="text-muted-foreground hover:text-primary">abhitejinn11@gmail.com</a>
              </div>
            </li>
          </ul>

          <Button asChild className="mt-8 rounded-full" variant="outline">
            <a href="https://maps.google.com/?q=Araku+Village+Mandal+Dumbriguda+Andhra+Pradesh" target="_blank" rel="noopener noreferrer">
              <Navigation className="mr-2 h-4 w-4" /> Get Directions
            </a>
          </Button>
        </div>

        {/* Map embed */}
        <div className="overflow-hidden rounded-2xl border border-border shadow-card aspect-[4/3] bg-muted">
          <iframe
            title="Hotel Abhitej Inn Location"
            src="https://maps.google.com/maps?q=Araku+Village+Mandal,+Dumbriguda,+Andhra+Pradesh+531151&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0, minHeight: 320 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  </section>
);
