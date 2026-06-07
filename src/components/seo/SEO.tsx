import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  robots?: string;
  schema?: object | object[];
}

export const SEO = ({ title, description, canonical, robots = "index, follow", schema }: SEOProps) => {
  useEffect(() => {
    // 1. Update Title
    document.title = title;

    // 2. Update Description Meta
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", description);

    // 3. Update Robots Meta
    let metaRobots = document.querySelector('meta[name="robots"]');
    if (!metaRobots) {
      metaRobots = document.createElement("meta");
      metaRobots.setAttribute("name", "robots");
      document.head.appendChild(metaRobots);
    }
    metaRobots.setAttribute("content", robots);

    // 4. Update Canonical Link
    const siteUrl = import.meta.env.VITE_SITE_URL || "https://abhitejinn.com";
    const currentPath = window.location.pathname;
    const finalCanonical = canonical || `${siteUrl}${currentPath === "/" ? "" : currentPath}`;

    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement("link");
      linkCanonical.setAttribute("rel", "canonical");
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute("href", finalCanonical);

    // 5. Update Open Graph Tags
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement("meta");
      ogTitle.setAttribute("property", "og:title");
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute("content", title);

    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) {
      ogDesc = document.createElement("meta");
      ogDesc.setAttribute("property", "og:description");
      document.head.appendChild(ogDesc);
    }
    ogDesc.setAttribute("content", description);

    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (!ogUrl) {
      ogUrl = document.createElement("meta");
      ogUrl.setAttribute("property", "og:url");
      document.head.appendChild(ogUrl);
    }
    ogUrl.setAttribute("content", finalCanonical);

    // 6. Inject JSON-LD Schema
    let scriptSchema = document.getElementById("seo-schema");
    if (!scriptSchema) {
      scriptSchema = document.createElement("script");
      scriptSchema.setAttribute("id", "seo-schema");
      scriptSchema.setAttribute("type", "application/ld+json");
      document.head.appendChild(scriptSchema);
    }

    if (schema) {
      scriptSchema.textContent = JSON.stringify(schema);
    } else {
      scriptSchema.textContent = "";
    }
  }, [title, description, canonical, robots, schema]);

  return null;
};
export default SEO;
