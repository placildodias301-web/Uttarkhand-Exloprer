// The website now serves two regions. Every destination and package has a
// `region` field that matches one of the `name` values below.
//
// The Uttarakhand copy here is exactly the text the Home page already used;
// Goa gets its own equivalents. Edit the wording here — the pages just read it.
const COMMONS = "https://commons.wikimedia.org/wiki/Special:FilePath/";

export const regions = [
  {
    id: "uttarakhand",
    name: "Uttarakhand",
    tagline: "Mountains · Spirituality · Adventure",
    image: `${COMMONS}Auli,_India.jpg?width=1400`,
    ctaImage: `${COMMONS}Rishikesh,_Lakshman_Jhula.jpg?width=1800`,
    featured: {
      title: "Stops through the Garhwal Himalaya",
      description:
        "From riverside pilgrimage towns to alpine ski slopes — each destination on the route is built out with its own attractions, food and stays.",
    },
    packages: {
      title: "Or start from a ready-made plan",
      description:
        "Three curated routes covering the classic circuit, a honeymoon escape and a lake-side adventure break.",
    },
    attractions: { title: "What people go there for" },
    why: {
      title: "A trip planner, not a brochure",
      items: [
        { title: "Built around real routes", desc: "Every itinerary follows the actual road route through the Garhwal hills, not a random shuffle of towns." },
        { title: "Built to be interactive", desc: "Browse, compare and reorder stops before you commit to anything — not a static brochure." },
        { title: "Practical trip details", desc: "Altitude, temperature and travel time for each stop, so you know what to actually pack and expect." },
        { title: "Transparent packages", desc: "Clear day-by-day plans with hotel, meal and transport info included up front." },
      ],
    },
    cta: {
      title: "Your Himalayan trip is one message away",
      description: "Start with a destination, a package, or a blank itinerary — and reach out on WhatsApp anytime.",
    },
  },
  {
    id: "goa",
    name: "Goa",
    tagline: "Beaches · Heritage · Adventure",
    image: `${COMMONS}Palolem_Beach,_south_Goa.jpg?width=1400`,
    ctaImage: `${COMMONS}Palolem_Beach,_south_Goa.jpg?width=1800`,
    featured: {
      title: "From lively shores to quiet coves",
      description:
        "North Goa's busy beaches, Old Goa's heritage churches and the waterfalls inland — each stop is built out with its own attractions, food and stays.",
    },
    packages: {
      title: "Ready-made Goa plans",
      description: "Curated itineraries covering Goa's beaches, heritage and backcountry, with stays and transport already worked out.",
    },
    attractions: { title: "What people go there for" },
    why: {
      title: "A trip planner, not a brochure",
      items: [
        { title: "Beaches, both ways", desc: "Lively North Goa and quieter South Goa, planned so you're not zigzagging across the state." },
        { title: "Heritage beyond the beach", desc: "Old Goa's churches, spice plantations and waterfalls sit within easy reach of every beach base." },
        { title: "Practical trip details", desc: "Best season, typical temperatures and travel times for each stop, so you know what to pack and expect." },
        { title: "Transparent packages", desc: "Clear day-by-day plans with stay, meal and transport info included up front." },
      ],
    },
    cta: {
      title: "Your Goa trip is one message away",
      description: "Start with a destination, a package, or a blank itinerary — and reach out on WhatsApp anytime.",
    },
  },
];

export const regionNames = regions.map((r) => r.name);
export const DEFAULT_REGION = "Uttarakhand";

// ---------------------------------------------------------------------------
// Region keys shared by every content type.
//
// Stored records keep the human-readable names used since the start of the
// project ("Uttarakhand", "Goa"), plus "Combo" for combined journeys. All
// comparisons go through normalizeRegion() so "Goa", "goa" and " GOA " match.
// ---------------------------------------------------------------------------
export const COMBO_REGION = "Combo";

// Regions a piece of content can belong to (destinations only use the first two).
export const contentRegionNames = [...regionNames, COMBO_REGION];

export function normalizeRegion(value) {
  if (!value) return null;
  const key = String(value).trim().toLowerCase();
  if (key === "uttarakhand" || key === "goa" || key === "combo") return key;
  if (key === "all") return "all";
  return null;
}

export function regionLabel(value) {
  const key = normalizeRegion(value);
  if (key === "combo") return COMBO_REGION;
  return regions.find((r) => r.id === key)?.name || value || "";
}

// True when an item's region matches the requested key. "all" (or no key)
// matches everything; "combo" matches only Combo content.
export function matchesRegion(itemRegion, requested) {
  const want = normalizeRegion(requested);
  if (!want || want === "all") return true;
  return normalizeRegion(itemRegion) === want;
}
