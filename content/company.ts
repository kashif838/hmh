// Every fact here is taken from HMH's company introduction letter or the Abu Koora carton.
export const company = {
  legalName: "HMH General Trading LLC",
  shortName: "HMH",
  city: "Dubai",
  country: "United Arab Emirates",
  phone: "+971 55 771 6733",
  phoneHref: "tel:+971557716733",
  email: "business@hmhdubai.com",
  url: "https://www.hmhdubai.com",
  vision:
    "To emerge as a strong global company with professional evaluation of business requirements and serving the clientele with quality products & services.",
  mission: "Building our company brands across the continents and increasing the brand visibility.",
  description:
    "HMH General Trading LLC imports, exports and distributes food and non-food products from Dubai to the GCC, MENA, CIS and Africa, and develops private-label brands for the markets it serves.",
  saabify: "https://www.saabify.com",
} as const;

export const markets = [
  { name: "GCC", body: "The home market and the first ring of distribution." },
  { name: "MENA", body: "North Africa and the Levant, served by sea and land." },
  { name: "CIS", body: "Central Asia and the former Soviet trade corridor." },
  { name: "Africa", body: "East, West and Southern African markets." },
] as const;
