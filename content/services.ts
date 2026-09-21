// Activities are those named in HMH's introduction letter:
// "Import, Exports; cross trading; private labelling", wholesale and distribution.

export type IconName = "import" | "export" | "cross" | "distribution" | "label" | "globe";

export const capabilities: { title: string; body: string; icon: IconName; href: string }[] = [
  { title: "Import", body: "Sourcing into the UAE and the wider Gulf.", icon: "import", href: "/services/import-export" },
  { title: "Export", body: "UAE origin and re-export to international markets.", icon: "export", href: "/services/import-export" },
  { title: "Cross Trading", body: "Origin to destination, without transiting the UAE.", icon: "cross", href: "/services/import-export" },
  { title: "Wholesale & Distribution", body: "Bulk and retail channels across the region.", icon: "distribution", href: "/services/distribution" },
  { title: "Private Label", body: "Own-brand development, concept to carton.", icon: "label", href: "/services/private-label" },
  { title: "Global Sourcing", body: "Supplier discovery, qualification and buying.", icon: "globe", href: "/services" },
];

export const flow = [
  {
    step: "Step 01", title: "Global Sourcing", image: "/images/flow-berth.jpg",
    alt: "Aerial view of a vessel being worked at a container berth",
    body: "Suppliers found, qualified and bought against the specification and the price the destination market will bear.",
  },
  {
    step: "Step 02", title: "Import & Export", image: "/images/flow-bow.jpg",
    alt: "Bow of a loaded container vessel in low sun",
    body: "Documentation, customs and freight handled in both directions, including cross-trades routed origin to destination without transiting the UAE.",
  },
  {
    step: "Step 03", title: "Distribution", image: "/images/flow-fleet.jpg",
    alt: "Fleet of freight trailers seen from above",
    body: "Bulk and retail distribution into modern trade, traditional trade and wholesale channels.",
  },
  {
    step: "Step 04", title: "Private Label", image: "/images/flow-line.jpg",
    alt: "Bottling and packing line inside a food production facility",
    body: "Where sourcing and distribution meet: a product specified, branded, packaged and placed under a name we build.",
  },
  {
    step: "Step 05", title: "International Marketing", image: "/images/flow-fair.jpg",
    alt: "Exhibitors and visitors at booths in a trade fair hall",
    body: "Taking our brands to international food fairs such as Gulfood, ISM, SIAL and the Saudi Food Show, to meet buyers, distributors and suppliers.",
  },
];

export const privateLabelSteps = [
  { title: "Source", body: "Manufacturers identified, audited and matched to the specification and the price the market will carry." },
  { title: "Develop", body: "Recipe, format and pack size agreed. Samples run and signed off before anything is committed." },
  { title: "Package", body: "Brand, artwork and bilingual declarations: ingredients, allergens, barcoding, market compliance." },
  { title: "Ship", body: "Production scheduled, freight booked, documentation cleared, to the Incoterm you trade on." },
  { title: "Market", body: "Placed into channel, or handed over to you ready to sell. Abu Koora went this whole way." },
];

export const reasons = [
  { title: "One counterparty, end to end", body: "Sourcing, freight, customs, distribution and brand all sit inside the same company. Nobody hands your problem to a third party and stops answering." },
  { title: "Food and non-food under one roof", body: "Dairy, commodities, confectionery and canned goods alongside cosmetics, chemicals and industrial supply, consolidated rather than split across vendors." },
  { title: "Brand building, not just brand carrying", body: "Abu Koora and Boon exist because we made them. That capability is available to you under your own name." },
  { title: "Built bilingually from the start", body: "Arabic and English packaging, declarations and documentation are the default here, not a late translation pass." },
  { title: "Positioned where the trade routes cross", body: "A Dubai base puts the GCC, MENA, CIS and Africa within reach by sea, air or road, from one desk." },
];

type Section = { title: string; body: string };
export type ServicePage = {
  slug: "private-label" | "import-export" | "distribution";
  title: string;
  heading: string;
  highlight: string;
  intro: string;
  image: { src: string; alt: string };
  sections: Section[];
};

export const servicePages: ServicePage[] = [
  {
    slug: "private-label",
    title: "Private Label",
    heading: "Bring us a shelf. We'll bring you",
    highlight: "a product to put on it",
    intro:
      "Retailers and distributors come to HMH for product under their own name. We handle the whole route, and we have walked it ourselves, twice, with Abu Koora and Boon.",
    image: { src: "/images/pl-crane.jpg", alt: "Ship-to-shore cranes above stacked containers" },
    sections: [
      { title: "Bilingual packaging", body: "English and Arabic artwork, ingredient declarations, E-numbers, allergen statements and retail barcodes. Both HMH brands are built this way." },
      { title: "Contract manufacturing", body: "Production placed with a qualified manufacturer and made to HMH's specification." },
      { title: "Your brand or ours", body: "Develop a product under your own name, or carry an HMH brand such as Boon or Abu Koora into your market." },
    ],
  },
  {
    slug: "import-export",
    title: "Import & Export",
    heading: "Goods in, goods out, and",
    highlight: "goods that never touch the UAE",
    intro:
      "HMH is an importer and exporter of food and non-food products, and a cross-trader: moving goods from origin to destination for customers in the GCC, MENA, CIS and Africa.",
    image: { src: "/images/flow-bow.jpg", alt: "Bow of a loaded container vessel in low sun" },
    sections: [
      { title: "Import", body: "Sourcing into the UAE and the wider Gulf, against the specification and price the market will bear." },
      { title: "Export", body: "UAE origin and re-export to international markets, with documentation and customs handled." },
      { title: "Cross trading", body: "Shipments routed origin to destination whether or not they transit the UAE. The trade decides the route, not our location." },
      { title: "Incoterms", body: "Quoted to the term you trade on: EXW, FOB, CFR, CIF or DAP." },
    ],
  },
  {
    slug: "distribution",
    title: "Wholesale & Distribution",
    heading: "Bulk and retail,",
    highlight: "food and non-food",
    intro:
      "HMH is a wholesaler and distributor of food and non-food products in the UAE, with bulk and retail distribution across the categories we trade.",
    image: { src: "/images/flow-fleet.jpg", alt: "Fleet of freight trailers seen from above" },
    sections: [
      { title: "Channels", body: "Modern trade, traditional trade and wholesale channels." },
      { title: "Bulk and retail", body: "Container loads for importers and wholesalers; retail-ready packs for trade customers." },
      { title: "Food and non-food", body: "FMCG and branded products in both segments, from dairy and commodities to cosmetics, chemicals and industrial products." },
    ],
  },
];

export const getServicePage = (slug: string) => servicePages.find((s) => s.slug === slug);
