// Central navigation config for the public site.
//
// Row 1 — travel sections. Each one is its own page/route, not a filter.
// `regionId` links a section to an entry in src/data/regions.js, so the
// existing region-aware pages (Destinations, Packages) follow the section the
// visitor picked. ALL and COMBO span both regions, so they have none.
export const travelSections = [
  {
    id: "all",
    label: "All",
    path: "/all",
    regionId: null,
  },
  {
    id: "uttarakhand",
    label: "Uttarakhand",
    path: "/uttarakhand",
    regionId: "uttarakhand",
  },
  {
    id: "goa",
    label: "Goa",
    path: "/goa",
    regionId: "goa",
  },
  {
    id: "combo",
    label: "Combo",
    path: "/combo",
    regionId: null,
  },
];

export const DEFAULT_SECTION_ID = "all";

export function getTravelSection(id) {
  return travelSections.find((s) => s.id === id) || null;
}

// Returns the section whose route is the current pathname, or null.
export function sectionFromPath(pathname) {
  return travelSections.find((s) => pathname === s.path || pathname === `${s.path}/`) || null;
}

// Old URLs that should keep working.
export const legacyRedirects = [
  { from: "/hotels-food", to: "/blogs" }, // "Hotels & Food" was replaced by Blogs
];

// Row 2 — main site navigation. `to: null` on Home means "the active
// section's page" (resolved in the Navbar). `menu: "packages"` renders the
// existing Packages dropdown (categories from src/data/packageCategories.js).
export const mainNavLinks = [
  { id: "home", label: "Home", to: null },
  { id: "destinations", label: "Destinations", to: "/destinations" },
  { id: "packages", label: "Packages", to: "/packages", menu: "packages" },
  { id: "itinerary", label: "Itinerary", to: "/itinerary" }, // curated day-by-day itineraries
  { id: "blogs", label: "Blogs", to: "/blogs" },
  { id: "gallery", label: "Gallery", to: "/gallery" },
  { id: "contact", label: "Contact", to: "/contact" },
];

export const planTripLink = { label: "Plan My Trip", to: "/plan-my-trip" };
