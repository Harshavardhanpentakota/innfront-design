import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_URL = "https://abhitejinn.com";
const DIST_DIR = path.join(__dirname, "dist");
const TEMPLATE_PATH = path.join(DIST_DIR, "index.html");

if (!fs.existsSync(TEMPLATE_PATH)) {
  console.error("Build template not found at", TEMPLATE_PATH);
  process.exit(1);
}

const template = fs.readFileSync(TEMPLATE_PATH, "utf-8");

// Page metadata & static HTML shells to inject into '#root'
const routes = [
  {
    path: "",
    title: "Hotel Abhitej INN | Boutique Luxury Stay in Araku Valley",
    description: "Book boutique rooms and suites at Hotel Abhitej INN in Dumbriguda, Araku Valley. Best rate guarantee, modern amenities, and 24/7 reception.",
    schema: {
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
          }
        }
      ]
    },
    htmlContent: `
      <header>
        <nav>
          <a href="/">Home</a>
          <a href="/rooms">Rooms</a>
          <a href="/about">About Us</a>
          <a href="/contact">Contact</a>
        </nav>
      </header>
      <main>
        <section>
          <h1>Stay where every moment feels rare.</h1>
          <p>Hotel Abhitej INN is a calm, contemporary retreat — designed for travelers who notice the details. Cozy boutique stays nestled in the scenic Araku Valley of Andhra Pradesh.</p>
          <div>
            <a href="/rooms">Explore Rooms</a>
            <a href="/booking">Book a Stay</a>
          </div>
        </section>
        <section>
          <h2>Hotel Statistics</h2>
          <ul>
            <li><strong>24/7</strong> Front Desk Reception</li>
            <li><strong>5 Star</strong> Cleanliness Standard</li>
            <li><strong>100%</strong> Guest Security</li>
          </ul>
        </section>
        <section>
          <h2>Boutique Rooms & Luxury Suites</h2>
          <article>
            <h3>Deluxe Non AC Room</h3>
            <p>Comfortable and well-appointed room with all essential amenities. Perfect for guests who value comfort without air conditioning.</p>
          </article>
          <article>
            <h3>Deluxe AC Room</h3>
            <p>Spacious air-conditioned room with modern furnishings. Enjoy a cool, relaxing stay with premium amenities.</p>
          </article>
          <article>
            <h3>Presidential Suite</h3>
            <p>Our finest accommodation with a separate living area, luxury bathtub, and exclusive amenities.</p>
          </article>
        </section>
      </main>
    `
  },
  {
    path: "rooms",
    title: "Luxury Rooms & Suites | Hotel Abhitej INN Araku",
    description: "Book luxury hotel rooms in Araku Valley. Select from Deluxe Non AC, Deluxe AC, or Presidential Suites. 24/7 service, free Wi-Fi, and best rate guaranteed.",
    schema: {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Hotel Abhitej INN Room Types",
      "numberOfItems": 3,
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Deluxe Non AC", "url": "https://abhitejinn.com/rooms/Deluxe%20Non%20AC" },
        { "@type": "ListItem", "position": 2, "name": "Deluxe AC", "url": "https://abhitejinn.com/rooms/Deluxe%20AC" },
        { "@type": "ListItem", "position": 3, "name": "Suite", "url": "https://abhitejinn.com/rooms/Suite" }
      ]
    },
    htmlContent: `
      <main>
        <section>
          <h1>Choose your room type</h1>
          <p>Select from our curated room categories. Our team will assign you the perfect room upon arrival at Dumbriguda, Araku.</p>
        </section>
        <section>
          <h2>Available Categories</h2>
          <article>
            <h3>Deluxe Non AC Room</h3>
            <p>Comfortable room layout, double bed, valley view, high-speed Wi-Fi, 24/7 hot water. Standard tariff: ₹1,500/night.</p>
            <a href="/rooms/Deluxe%20Non%20AC">View Details</a>
          </article>
          <article>
            <h3>Deluxe AC Room</h3>
            <p>Premium air conditioning, king bed, smart TV, hot water, minibar, room service. Standard tariff: ₹2,200/night.</p>
            <a href="/rooms/Deluxe%20AC">View Details</a>
          </article>
          <article>
            <h3>Presidential Suite</h3>
            <p>Separate living lounge, plush double bed, private bathtub, premium toiletries, and free breakfast. Standard tariff: ₹4,000/night.</p>
            <a href="/rooms/Suite">View Details</a>
          </article>
        </section>
      </main>
    `
  },
  {
    path: "rooms/Deluxe Non AC",
    title: "Deluxe Non AC Room | Hotel Abhitej INN Araku Valley",
    description: "Enjoy natural comfort and serene valley breezes in our Deluxe Non AC Room. Features premium bedding, free Wi-Fi, and 24/7 room service.",
    schema: {
      "@context": "https://schema.org",
      "@type": "Accommodation",
      "name": "Deluxe Non AC Room",
      "description": "Comfortable room layout, double bed, valley view, high-speed Wi-Fi, 24/7 hot water.",
      "offers": { "@type": "Offer", "price": "1500", "priceCurrency": "INR" }
    },
    htmlContent: `
      <main>
        <h1>Deluxe Non AC Room</h1>
        <p>Our Deluxe Non AC rooms offer a cosy retreat designed for guests who prefer natural ventilation. Perfect for the cooler months in Araku Valley.</p>
        <h2>Room Features</h2>
        <ul>
          <li>1 Double Bed</li>
          <li>Max Capacity: 2 Guests</li>
          <li>Free High-Speed Wi-Fi</li>
          <li>Cable TV & 24/7 Room Service</li>
        </ul>
        <a href="/booking?roomType=Deluxe%20Non%20AC">Book Now</a>
      </main>
    `
  },
  {
    path: "rooms/Deluxe AC",
    title: "Deluxe AC Room | Boutique Stay at Hotel Abhitej INN",
    description: "Relax in our spacious, air-conditioned Deluxe AC Room. Fully equipped with modern amenities, King bed, minibar, and stylish interiors.",
    schema: {
      "@context": "https://schema.org",
      "@type": "Accommodation",
      "name": "Deluxe AC Room",
      "description": "Premium air conditioning, king bed, smart TV, hot water, minibar, room service.",
      "offers": { "@type": "Offer", "price": "2200", "priceCurrency": "INR" }
    },
    htmlContent: `
      <main>
        <h1>Deluxe AC Room</h1>
        <p>Our Deluxe AC rooms combine modern design with practical comfort. Stay cool in our air-conditioned spaces featuring stylish furnishings.</p>
        <h2>Room Features</h2>
        <ul>
          <li>1 King Bed or 2 Single Beds</li>
          <li>Air Conditioned (AC)</li>
          <li>Mini Bar & Fridge</li>
          <li>Smart TV & Room Service</li>
        </ul>
        <a href="/booking?roomType=Deluxe%20AC">Book Now</a>
      </main>
    `
  },
  {
    path: "rooms/Suite",
    title: "Presidential Suite | Luxury & Elegance at Hotel Abhitej INN",
    description: "Experience ultimate luxury in our Suite room. Enjoy a private living lounge, plush King bed, luxury bathtub, and exclusive welcome amenities.",
    schema: {
      "@context": "https://schema.org",
      "@type": "Accommodation",
      "name": "Presidential Suite",
      "description": "Separate living lounge, plush double bed, private bathtub, premium toiletries, and free breakfast.",
      "offers": { "@type": "Offer", "price": "4000", "priceCurrency": "INR" }
    },
    htmlContent: `
      <main>
        <h1>Presidential Suite</h1>
        <p>Experience the absolute pinnacle of luxury in our Suite. Featuring a separate living lounge, bathtub, and welcome amenities.</p>
        <h2>Room Features</h2>
        <ul>
          <li>1 King Bed + Extra Sofa Bed</li>
          <li>Private Living Lounge</li>
          <li>Luxury Bathtub & Toiletries</li>
          <li>Welcome Drinks & Free Breakfast</li>
        </ul>
        <a href="/booking?roomType=Suite">Book Now</a>
      </main>
    `
  },
  {
    path: "booking",
    title: "Book Your Stay | Hotel Abhitej INN Online Reservation",
    description: "Secure your stay at Hotel Abhitej INN. Easy online booking with instant confirmation, flexible cancellation, and secure payments.",
    htmlContent: `
      <main>
        <h1>Book a stay</h1>
        <p>Select your check-in dates, guest count, and room type to secure your reservation at Hotel Abhitej INN in Araku.</p>
      </main>
    `
  },
  {
    path: "contact",
    title: "Contact Hotel Abhitej INN | Araku Valley Location & Directions",
    description: "Contact our 24/7 desk at Hotel Abhitej INN. Find phone numbers, email, location map, and directions to our boutique hotel in Dumbriguda, Araku.",
    htmlContent: `
      <main>
        <h1>Contact Us</h1>
        <p>We are here to help. Reach out to our front desk team 24 hours a day, 7 days a week.</p>
        <h2>Address</h2>
        <p>Near Jeypore Junction, Araku Village Mandal, Dumbriguda, Andhra Pradesh – 531151</p>
        <h2>Phone</h2>
        <p>+91 82477 86920</p>
        <h2>Email</h2>
        <p>abhitejinn11@gmail.com</p>
      </main>
    `
  },
  {
    path: "about",
    title: "About Us | Hotel Abhitej INN Araku Valley Boutique Stay",
    description: "Discover the story behind Hotel Abhitej INN. Boutique comfort, warm local hospitality, and sustainable tourism practices in Araku Valley, Andhra Pradesh.",
    htmlContent: `
      <main>
        <h1>About Hotel Abhitej INN</h1>
        <p>Founded in 2024, Hotel Abhitej INN is a boutique lodging experience nestled in the Eastern Ghats of Araku Valley, Dumbriguda, Andhra Pradesh.</p>
        <h2>Our Core Commitments</h2>
        <ul>
          <li>Sanitized Linens & Strict Standards</li>
          <li>Genuine Local Hospitality</li>
          <li>Eco-Conscious Tourism</li>
          <li>Best Direct Booking Tariffs</li>
        </ul>
      </main>
    `
  },
  {
    path: "tools/stay-calculator",
    title: "Stay Cost & Room Price Calculator | Hotel Abhitej INN Araku",
    description: "Estimate your stay budget at Hotel Abhitej INN Araku. Calculate room rents, check-in dates, breakfast add-ons, and tax (GST) breakdowns instantly.",
    htmlContent: `
      <main>
        <h1>Stay Cost Estimator</h1>
        <p>Customize your stay dates and choose room types (Deluxe Non AC, Deluxe AC, Suite) to see a complete tax-inclusive invoice breakdown.</p>
      </main>
    `
  },
  {
    path: "tools/room-comparison",
    title: "Room Comparison Tool | Compare Hotel Abhitej INN Room Types",
    description: "Compare room rates, size, bed specs, and premium inclusions at Hotel Abhitej INN Araku. Deluxe Non AC vs Deluxe AC vs Suite details side by side.",
    htmlContent: `
      <main>
        <h1>Compare Room Types</h1>
        <p>Look at room features, base tariffs, AC, and premium inclusions side-by-side to choose the perfect fit for your vacation.</p>
      </main>
    `
  },
  {
    path: "cancellation-policy",
    title: "Cancellation & Refund Policy | Hotel Abhitej INN",
    description: "Read the cancellation and refund terms for Hotel Abhitej INN bookings. Learn about cancellation deadlines and refund eligibility.",
    htmlContent: `
      <main>
        <h1>Cancellation Policy</h1>
        <p>View cancellation percentages, guidelines, and refund schedules prior to booking.</p>
      </main>
    `
  },
  {
    path: "terms-of-service",
    title: "Terms of Service & Stay Guidelines | Hotel Abhitej INN",
    description: "View the Terms of Service for Hotel Abhitej INN. Understand our booking policies, check-in requirements, and guest guidelines.",
    htmlContent: `
      <main>
        <h1>Terms of Service</h1>
        <p>Review the standard terms and guidelines for staying at our boutique resort.</p>
      </main>
    `
  },
  {
    path: "privacy-policy",
    title: "Privacy Policy | Hotel Abhitej INN Guest Data Protection",
    description: "Read how Hotel Abhitej INN protects guest information. Our privacy policy outlines how we collect, store, and secure your personal data.",
    htmlContent: `
      <main>
        <h1>Privacy Policy</h1>
        <p>Your privacy is important to us. Learn how we handle and protect guest data.</p>
      </main>
    `
  }
];

// ── 1. Render Static Route Folders & HTML ──────────────────────────────────────
routes.forEach((route) => {
  let content = template;

  // Insert title
  content = content.replace(/<title>.*?<\/title>/, `<title>${route.title}</title>`);

  // Insert description
  const descTag = `<meta name="description" content="${route.description}" />`;
  if (content.includes('name="description"')) {
    content = content.replace(/<meta name="description" content=".*?" \/>/, descTag);
  } else {
    content = content.replace("</head>", `  ${descTag}\n  </head>`);
  }

  // Insert canonical link
  const cleanPath = route.path === "" ? "" : `/${route.path}`;
  const canonicalUrl = `${SITE_URL}${cleanPath.replace(/ /g, "%20")}`;
  const canonicalTag = `<link rel="canonical" href="${canonicalUrl}" />`;
  if (content.includes('rel="canonical"')) {
    content = content.replace(/<link rel="canonical" href=".*?" \/>/, canonicalTag);
  } else {
    content = content.replace("</head>", `  ${canonicalTag}\n  </head>`);
  }

  // Insert schema
  if (route.schema) {
    const schemaScript = `\n  <script type="application/ld+json">\n  ${JSON.stringify(route.schema, null, 2)}\n  </script>\n  `;
    content = content.replace("</head>", `${schemaScript}</head>`);
  }

  // Inject HTML Shell in #root for non-JS bots
  if (route.htmlContent) {
    const rootHtml = `<div id="root">${route.htmlContent}</div>`;
    content = content.replace('<div id="root"></div>', rootHtml);
  }

  // Determine output directory
  let targetFile;
  if (route.path === "") {
    targetFile = TEMPLATE_PATH; // Update root index.html
  } else {
    const routeFolder = path.join(DIST_DIR, route.path);
    fs.mkdirSync(routeFolder, { recursive: true });
    targetFile = path.join(routeFolder, "index.html");

    // Also support URI-encoded paths for servers that check exact folders
    if (route.path.includes(" ")) {
      const encodedFolder = path.join(DIST_DIR, encodeURIComponent(route.path));
      fs.mkdirSync(encodedFolder, { recursive: true });
      fs.writeFileSync(path.join(encodedFolder, "index.html"), content);
    }
  }

  fs.writeFileSync(targetFile, content);
  console.log(`Pre-rendered route: ${route.path === "" ? "/" : "/" + route.path}`);
});


// ── 2. Generate robots.txt ───────────────────────────────────────────────────
const robotsTxt = `User-agent: *
Allow: /
Disallow: /profile
Disallow: /my-bookings
Disallow: /api/

Sitemap: ${SITE_URL}/sitemap.xml
`;
fs.writeFileSync(path.join(DIST_DIR, "robots.txt"), robotsTxt);
console.log("Generated robots.txt");


// ── 3. Generate XML Sitemaps ──────────────────────────────────────────────────
// Sitemap index
const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${SITE_URL}/sitemap-pages.xml</loc>
  </sitemap>
  <sitemap>
    <loc>${SITE_URL}/sitemap-images.xml</loc>
  </sitemap>
</sitemapindex>
`;
fs.writeFileSync(path.join(DIST_DIR, "sitemap.xml"), sitemapXml);
console.log("Generated sitemap.xml");

// Pages sitemap
const pages = [
  { loc: "", changefreq: "daily", priority: "1.0" },
  { loc: "/rooms", changefreq: "weekly", priority: "0.9" },
  { loc: "/rooms/Deluxe%20Non%20AC", changefreq: "weekly", priority: "0.8" },
  { loc: "/rooms/Deluxe%20AC", changefreq: "weekly", priority: "0.8" },
  { loc: "/rooms/Suite", changefreq: "weekly", priority: "0.8" },
  { loc: "/booking", changefreq: "monthly", priority: "0.7" },
  { loc: "/about", changefreq: "monthly", priority: "0.7" },
  { loc: "/contact", changefreq: "monthly", priority: "0.7" },
  { loc: "/tools/stay-calculator", changefreq: "monthly", priority: "0.6" },
  { loc: "/tools/room-comparison", changefreq: "monthly", priority: "0.6" },
  { loc: "/cancellation-policy", changefreq: "yearly", priority: "0.4" },
  { loc: "/terms-of-service", changefreq: "yearly", priority: "0.4" },
  { loc: "/privacy-policy", changefreq: "yearly", priority: "0.4" }
];

const today = new Date().toISOString().split("T")[0];
let pagesXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

pages.forEach((p) => {
  pagesXml += `
  <url>
    <loc>${SITE_URL}${p.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`;
});
pagesXml += `\n</urlset>`;
fs.writeFileSync(path.join(DIST_DIR, "sitemap-pages.xml"), pagesXml);
console.log("Generated sitemap-pages.xml");

// Images sitemap
const images = [
  { loc: "", image: "/room-images/banner-main.jpeg", title: "Hotel Abhitej INN Exterior at golden hour" },
  { loc: "/rooms/Deluxe%20Non%20AC", image: "/room-images/deluxe-ac-and-non-ac-2.jpg", title: "Deluxe Non AC Bed and Layout" },
  { loc: "/rooms/Deluxe%20AC", image: "/room-images/deluxe-ac-and-non-ac-1.jpg", title: "Deluxe AC Bed and Room Interiors" },
  { loc: "/rooms/Suite", image: "/room-images/suite-room-1.jpg", title: "Presidential Suite Bedroom and Lounge" }
];

let imagesXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">`;

images.forEach((img) => {
  imagesXml += `
  <url>
    <loc>${SITE_URL}${img.loc}</loc>
    <image:image>
      <image:loc>${SITE_URL}${img.image}</image:loc>
      <image:title>${img.title}</image:title>
    </image:image>
  </url>`;
});
imagesXml += `\n</urlset>`;
fs.writeFileSync(path.join(DIST_DIR, "sitemap-images.xml"), imagesXml);
console.log("Generated sitemap-images.xml");
