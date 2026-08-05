import { BUSINESS, SITE_URL, addressLine, mapUrl } from "./content/business";
import { COUNTIES } from "./content/counties";
import type { QA } from "./content/faq";

export interface ServiceMeta {
  name: string;
  description: string;
  type: string;
}

export interface PageMeta {
  /** Alati lõpuga kaldkriips, nt "/kontakt/" */
  path: string;
  title: string;
  description: string;
  /** Nimi navigatsioonis ja breadcrumb'is */
  breadcrumb: string;
  faq?: QA[];
  service?: ServiceMeta;
  ogImage?: string;
  priority?: string;
  changefreq?: string;
  noindex?: boolean;
}

export function absUrl(path: string): string {
  return path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`;
}

function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** JSON-LD ei tohi sisaldada literaalset "</script>". */
function jsonLd(data: unknown): string {
  const json = JSON.stringify(data, null, 2).replace(/</g, "\\u003c");
  return `<script type="application/ld+json">\n${json}\n</script>`;
}

const businessId = `${SITE_URL}/#business`;
const websiteId = `${SITE_URL}/#website`;

function localBusiness() {
  return {
    "@type": ["LocalBusiness", "RealEstateAgent"],
    "@id": businessId,
    name: BUSINESS.name,
    legalName: BUSINESS.legalName,
    description:
      "Fellin Forest OÜ ostab metsakinnistuid, raieõigust ja põllumaad üle Eesti. Tasuta hindamine, pakkumine 24 tunni jooksul, notaritasud meie kanda.",
    url: `${SITE_URL}/`,
    logo: `${SITE_URL}/images/logo3.png`,
    image: [`${SITE_URL}/images/hero.jpg`, `${SITE_URL}/images/mets-1.jpg`],
    telephone: BUSINESS.phone,
    email: BUSINESS.email,
    priceRange: "€€",
    currenciesAccepted: "EUR",
    paymentAccepted: "Pangaülekanne",
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.street,
      postalCode: BUSINESS.postalCode,
      addressLocality: BUSINESS.city,
      addressRegion: BUSINESS.region,
      addressCountry: BUSINESS.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: BUSINESS.geo.lat,
      longitude: BUSINESS.geo.lng,
    },
    hasMap: mapUrl,
    identifier: {
      "@type": "PropertyValue",
      name: "Registrikood",
      value: BUSINESS.regCode,
    },
    vatID: `EE${BUSINESS.regCode}`,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: BUSINESS.openingHours.days,
        opens: BUSINESS.openingHours.opens,
        closes: BUSINESS.openingHours.closes,
      },
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        name: BUSINESS.contactPerson,
        telephone: BUSINESS.phone,
        email: BUSINESS.email,
        areaServed: "EE",
        availableLanguage: ["et", "en"],
      },
    ],
    employee: {
      "@type": "Person",
      name: BUSINESS.contactPerson,
      jobTitle: BUSINESS.contactRole,
      telephone: BUSINESS.phone,
      email: BUSINESS.email,
    },
    areaServed: [
      { "@type": "Country", name: "Eesti" },
      ...COUNTIES.map((county) => ({ "@type": "AdministrativeArea", name: county.name })),
    ],
    knowsAbout: [
      "metsakinnistute ost",
      "raieõiguse ost",
      "põllumaa ost",
      "metsamajandamine",
      "metsa hindamine",
      "metsakinnistu väärtus",
    ],
    makesOffer: [
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Metsakinnistute ost", url: `${SITE_URL}/metsakinnistute-ost/` },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Raieõiguse ost", url: `${SITE_URL}/raieoiguse-ost/` },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Põllumaa ost", url: `${SITE_URL}/pollumaa-ost/` },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Metsamajandamine", url: `${SITE_URL}/metsamajandamine/` },
      },
    ],
  };
}

function website() {
  return {
    "@type": "WebSite",
    "@id": websiteId,
    url: `${SITE_URL}/`,
    name: BUSINESS.name,
    inLanguage: "et-EE",
    publisher: { "@id": businessId },
  };
}

function webPage(meta: PageMeta) {
  const url = absUrl(meta.path);
  return {
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: meta.title,
    description: meta.description,
    inLanguage: "et-EE",
    isPartOf: { "@id": websiteId },
    about: { "@id": businessId },
    breadcrumb: { "@id": `${url}#breadcrumb` },
  };
}

function breadcrumbs(meta: PageMeta) {
  const items = [{ name: "Avaleht", item: `${SITE_URL}/` }];
  if (meta.path !== "/") {
    items.push({ name: meta.breadcrumb, item: absUrl(meta.path) });
  }
  return {
    "@type": "BreadcrumbList",
    "@id": `${absUrl(meta.path)}#breadcrumb`,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.item,
    })),
  };
}

function serviceNode(meta: PageMeta) {
  if (!meta.service) return null;
  return {
    "@type": "Service",
    "@id": `${absUrl(meta.path)}#service`,
    name: meta.service.name,
    serviceType: meta.service.type,
    description: meta.service.description,
    url: absUrl(meta.path),
    provider: { "@id": businessId },
    areaServed: [
      { "@type": "Country", name: "Eesti" },
      ...COUNTIES.map((county) => ({ "@type": "AdministrativeArea", name: county.name })),
    ],
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: absUrl(meta.path),
      servicePhone: BUSINESS.phone,
      serviceLocation: {
        "@type": "Place",
        name: BUSINESS.legalName,
        address: addressLine,
      },
    },
  };
}

function faqNode(meta: PageMeta) {
  if (!meta.faq || meta.faq.length === 0) return null;
  return {
    "@type": "FAQPage",
    "@id": `${absUrl(meta.path)}#faq`,
    mainEntity: meta.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a.join(" ") },
    })),
  };
}

/** Kogu <head> sisu, mis on lehekülje-spetsiifiline. */
export function buildHead(meta: PageMeta): string {
  const url = absUrl(meta.path);
  const image = `${SITE_URL}${meta.ogImage ?? "/images/hero.jpg"}`;
  const graph = [
    localBusiness(),
    website(),
    webPage(meta),
    breadcrumbs(meta),
    serviceNode(meta),
    faqNode(meta),
  ].filter(Boolean);

  const tags = [
    `<title>${esc(meta.title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}">`,
    `<link rel="canonical" href="${url}">`,
    meta.noindex ? `<meta name="robots" content="noindex, follow">` : `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1">`,
    `<meta property="og:type" content="website">`,
    `<meta property="og:site_name" content="${esc(BUSINESS.name)}">`,
    `<meta property="og:title" content="${esc(meta.title)}">`,
    `<meta property="og:description" content="${esc(meta.description)}">`,
    `<meta property="og:url" content="${url}">`,
    `<meta property="og:image" content="${image}">`,
    `<meta property="og:locale" content="et_EE">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${esc(meta.title)}">`,
    `<meta name="twitter:description" content="${esc(meta.description)}">`,
    `<meta name="twitter:image" content="${image}">`,
    `<meta name="geo.region" content="EE-84">`,
    `<meta name="geo.placename" content="${esc(BUSINESS.city)}">`,
    `<meta name="geo.position" content="${BUSINESS.geo.lat};${BUSINESS.geo.lng}">`,
    `<meta name="ICBM" content="${BUSINESS.geo.lat}, ${BUSINESS.geo.lng}">`,
    jsonLd({ "@context": "https://schema.org", "@graph": graph }),
  ];

  return tags.join("\n");
}
