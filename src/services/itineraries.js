import { useStore } from "../hooks/useStore";
import { normalizeRegion, matchesRegion } from "../data/regions";
import { packagesStore, destinationsStore, isPublished } from "./content";
import { useItineraryTemplates } from "./itineraryTemplates";

// The project keeps day-by-day itineraries in two places, and both are real
// content:
//   1. Itinerary templates (admin "Itineraries" — src/services/itineraryTemplates.js)
//   2. The `itinerary` array inside every package (src/data/packages.js,
//      goaPackages.js, comboPackages.js) — these hold the complete
//      Uttarakhand and Goa day-by-day plans.
// This service presents both through ONE shape so the public pages can list
// and render them with the same components. It never copies or rewrites the
// underlying data; edits still go through the template or package editors.

const EMPTY = "—";

function clean(value) {
  if (value == null) return "";
  const v = String(value).trim();
  return v === EMPTY ? "" : v;
}

// One day, whichever source it came from.
export function normalizeDay(day, index, destinationsById) {
  const dest = destinationsById[day.destinationId] || null;
  return {
    day: day.day ?? index + 1,
    title: clean(day.title),
    destinationId: dest?.id || day.destinationId || null,
    location: clean(day.location) || dest?.name || "",
    description: clean(day.description),
    activities: (day.activities || []).filter(Boolean),
    image: day.image || null,
    fallbackImage: dest?.image || null,
    stay: clean(day.stay ?? day.hotel),
    food: clean(day.food ?? day.meals),
    notes: clean(day.notes),
    timing: clean(day.timing),
    transport: clean(day.transport),
  };
}

function regionOfTemplate(template, destinationsById) {
  if (template.region) return normalizeRegion(template.region);
  const dest = destinationsById[template.destinationId];
  return dest ? normalizeRegion(dest.region) : null;
}

function fromTemplate(t, destinationsById) {
  const days = (t.days || []).map((d, i) => normalizeDay(d, i, destinationsById));
  return {
    id: t.id,
    kind: "template",
    name: t.name,
    subtitle: t.subname || "",
    description: t.description || t.shortDescription || "",
    region: regionOfTemplate(t, destinationsById),
    cover: t.coverImage || destinationsById[t.destinationId]?.image || null,
    duration: t.duration || (days.length ? `${days.length} Days` : ""),
    status: t.status,
    published: isPublished(t),
    destinationIds: [...new Set([t.destinationId, ...days.map((d) => d.destinationId)].filter(Boolean))],
    packageId: null,
    days,
  };
}

function fromPackage(p, destinationsById) {
  const days = (p.itinerary || []).map((d, i) => normalizeDay(d, i, destinationsById));
  return {
    id: `package-${p.id}`,
    kind: "package",
    name: p.name,
    subtitle: p.subtitle || "",
    description: p.description || "",
    region: normalizeRegion(p.region),
    cover: p.image || null,
    duration: p.days ? `${p.days} Days / ${p.nights} Nights` : `${days.length} Days`,
    status: p.status,
    published: isPublished(p),
    destinationIds: p.destinations || [],
    packageId: p.id,
    priceFrom: p.priceFrom,
    priceUnit: p.priceUnit,
    days,
  };
}

function buildAll(templates) {
  const destinationsById = Object.fromEntries(destinationsStore.getAll().map((d) => [d.id, d]));
  const fromTemplates = templates.map((t) => fromTemplate(t, destinationsById));
  const fromPackages = packagesStore
    .getAll()
    .filter((p) => (p.itinerary || []).length > 0)
    .map((p) => fromPackage(p, destinationsById));
  return [...fromTemplates, ...fromPackages];
}

// API-ready getter used by the hook below.
export function getItineraries(templates, region = "all", { includeHidden = false } = {}) {
  return buildAll(templates).filter((it) => (includeHidden || it.published) && matchesRegion(it.region, region));
}

// Public: published itineraries for a region ("all" | "uttarakhand" | "goa" | "combo").
export function useItineraries(region = "all", options) {
  const { templates } = useItineraryTemplates();
  useStore(packagesStore.store);
  useStore(destinationsStore.store);
  return getItineraries(templates, region, options);
}

export function usePublicItinerary(id) {
  const all = useItineraries("all", { includeHidden: false });
  return all.find((it) => it.id === id) || null;
}
