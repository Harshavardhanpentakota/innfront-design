import { Hotel, Instagram, Facebook, Twitter, MapPin, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="mt-24 border-t border-border bg-muted/40">
      <div className="container-page grid gap-10 py-14 md:grid-cols-4">
        <div className="space-y-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-sky shadow-glow">
              <Hotel className="h-5 w-5 text-primary-foreground" />
            </span>
            <span className="font-display text-lg font-semibold">Hotel Abhitej INN</span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Effortless luxury, thoughtful design, and warm hospitality — nestled in the scenic Araku Valley of Andhra Pradesh.
          </p>
          <div className="flex gap-2">
            {[Instagram, Facebook, Twitter].map((Icon, i) => (
              <a key={i} href="#" className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground hover:border-primary">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-4 font-display text-base font-semibold">Explore</h4>
          <ul className="space-y-2.5 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-foreground">Home</Link></li>
            <li><Link to="/rooms" className="hover:text-foreground">Rooms</Link></li>
            <li><Link to="/booking" className="hover:text-foreground">Book a Stay</Link></li>
            <li><Link to="/my-bookings" className="hover:text-foreground">My Bookings</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-display text-base font-semibold">Support</h4>
          <ul className="space-y-2.5 text-sm text-muted-foreground">
            <li><Link to="/contact" className="hover:text-foreground">Contact Us</Link></li>
            <li><Link to="/cancellation-policy" className="hover:text-foreground">Cancellation Policy</Link></li>
            <li><Link to="/privacy-policy" className="hover:text-foreground">Privacy Policy</Link></li>
            <li><Link to="/terms-of-service" className="hover:text-foreground">Terms of Service</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-display text-base font-semibold">Contact</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2.5">
              <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
              <span>Near Jeypore Junction, Araku Village Mandal, Dumbriguda, AP – 531151</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 text-primary" />
              <a href="tel:+918247786920" className="hover:text-foreground">+91 82477 86920</a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 text-primary" />
              <a href="mailto:abhitejinn11@gmail.com" className="hover:text-foreground">abhitejinn11@gmail.com</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-5 text-xs text-muted-foreground sm:flex-row">
          <p>© 2026 Hotel Abhitej INN. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/privacy-policy" className="hover:text-foreground">Privacy</Link>
            <Link to="/terms-of-service" className="hover:text-foreground">Terms</Link>
            <Link to="/cancellation-policy" className="hover:text-foreground">Cancellation</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
