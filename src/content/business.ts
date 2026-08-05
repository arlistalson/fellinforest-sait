export const SITE_URL = "https://fellinforest.ee";

export const BUSINESS = {
  name: "Fellin Forest",
  legalName: "Fellin Forest OÜ",
  regCode: "17117278",
  contactPerson: "Enrico Orobko",
  contactRole: "Metsa ost ja pakkumised",
  phone: "+37258065274",
  phoneDisplay: "+372 5806 5274",
  phoneShort: "5806 5274",
  email: "enrico@fellinforest.ee",
  street: "Lossi tn 15",
  postalCode: "71003",
  city: "Viljandi",
  region: "Viljandi maakond",
  country: "EE",
  /**
   * Ligikaudsed koordinaadid (Viljandi vanalinn, Lossi tn piirkond).
   * TODO: asenda täpsete koordinaatidega Google Mapsist / Maa-ameti kaardilt.
   */
  geo: { lat: 58.3634, lng: 25.5936 },
  openingHours: { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "18:00" },
} as const;

export const addressLine = `${BUSINESS.street}, ${BUSINESS.postalCode} ${BUSINESS.city}`;

export const mapUrl =
  `https://www.google.com/maps/search/?api=1&query=${BUSINESS.geo.lat},${BUSINESS.geo.lng}`;
