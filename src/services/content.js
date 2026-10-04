import { createStore } from "./createStore";
import { useStore } from "../hooks/useStore";
import { destinations as uttarakhandDestinations } from "../data/destinations";
import { packages as uttarakhandPackages } from "../data/packages";
import { goaDestinations } from "../data/goaDestinations";
import { goaPackages } from "../data/goaPackages";
import { comboPackages } from "../data/comboPackages";
import { DEFAULT_REGION, matchesRegion, normalizeRegion } from "../data/regions";
import { pushNotification } from "./notifications";

// All regions live in the same store. Items without a `region` field (all
// of the original Uttarakhand data) are treated as Uttarakhand. Combo
// packages come from their own seed file and are never mixed into the
// Uttarakhand/Goa files.
const baseDestinations = [...uttarakhandDestinations, ...goaDestinations];
const basePackages = [...uttarakhandPackages, ...goaPackages, ...comboPackages];
const withRegion = (item) => ({ region: DEFAULT_REGION, ...item });

// ---------------------------------------------------------------------------
// Status
//
// Destinations and packages use "Published" | "Draft" | "Disabled". Seed
// items have no status and count as published. Blogs and itinerary
// templates historically used lowercase values — isPublished() accepts both.
// ---------------------------------------------------------------------------
export const CONTENT_STATUSES = ["Published", "Draft", "Disabled"];

export function isPublished(item) {
  const status = String(item?.status || "published").toLowerCase();
  return status === "published";
}

// Admin edits are stored as a small "delta" on top of the existing seed data
// files (src/data/*.js) rather than copying the whole dataset into
// localStorage. This keeps your original content as the source of truth,
// while letting the admin panel add/edit/remove items on top of it — the
// same pattern a real CMS-over-static-content setup uses.
function makeContentStore(baseItems, storageKey, kindLabel, notifyType) {
  const store = createStore(storageKey, { overrides: {}, additions: [], deletedIds: [] });

  function getAll() {
    const { overrides, additions, deletedIds } = store.getState();
    const fromBase = baseItems
      .filter((item) => !deletedIds.includes(item.id))
      .map((item) => (overrides[item.id] ? { ...item, ...overrides[item.id] } : item));
    return [...fromBase, ...additions].map(withRegion);
  }

  function getById(id) {
    return getAll().find((item) => item.id === id) || null;
  }

  function slugify(name) {
    return (name || "untitled").toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }

  function uniqueId(base) {
    const taken = new Set(getAll().map((i) => i.id));
    let id = base;
    let n = 2;
    while (taken.has(id)) id = `${base}-${n++}`;
    return id;
  }

  function add(item) {
    const id = item.id || uniqueId(slugify(item.name));
    const region = item.region || DEFAULT_REGION;
    // Numbering restarts for each region (Goa #1, #2 … / Uttarakhand #1, #2 …)
    const order = getAll().filter((i) => normalizeRegion(i.region) === normalizeRegion(region)).length + 1;
    const entry = { order, status: "Draft", ...item, region, id };
    store.setState((s) => ({ ...s, additions: [...s.additions, entry] }));
    pushNotification({ type: notifyType, title: `${kindLabel} added`, message: entry.name || id, link: `/admin/${notifyType}s` });
    return entry;
  }

  function update(id, patch, { silent = false } = {}) {
    store.setState((s) => {
      const isAddition = s.additions.some((a) => a.id === id);
      if (isAddition) {
        return { ...s, additions: s.additions.map((a) => (a.id === id ? { ...a, ...patch } : a)) };
      }
      return { ...s, overrides: { ...s.overrides, [id]: { ...s.overrides[id], ...patch } } };
    });
    if (!silent) {
      const name = patch.name || getById(id)?.name || id;
      pushNotification({ type: notifyType, title: `${kindLabel} updated`, message: name, link: `/admin/${notifyType}s` });
    }
  }

  function setStatus(id, status) {
    update(id, { status });
  }

  function remove(id) {
    store.setState((s) => {
      const isAddition = s.additions.some((a) => a.id === id);
      if (isAddition) {
        return { ...s, additions: s.additions.filter((a) => a.id !== id) };
      }
      return { ...s, deletedIds: [...s.deletedIds, id] };
    });
  }

  return { store, getAll, getById, add, update, setStatus, remove };
}

export const destinationsStore = makeContentStore(baseDestinations, "uk_destinations_delta", "Destination", "destination");
export const packagesStore = makeContentStore(basePackages, "uk_packages_delta", "Package", "package");

// ---------------------------------------------------------------------------
// API-ready getters. Region: "all" | "uttarakhand" | "goa" | "combo".
// Swap these bodies for fetch() calls when a backend exists.
// ---------------------------------------------------------------------------
export function getDestinations(region = "all", { includeHidden = false } = {}) {
  return destinationsStore
    .getAll()
    .filter((d) => (includeHidden || isPublished(d)) && matchesRegion(d.region, region));
}

export function getPackages(region = "all", { includeHidden = false } = {}) {
  return packagesStore
    .getAll()
    .filter((p) => (includeHidden || isPublished(p)) && matchesRegion(p.region, region));
}

// Every destination/package (including Draft/Disabled) — admin screens and
// lookups by id. Reactive to admin changes.
export function useDestinations() {
  useStore(destinationsStore.store); // re-render this component on change
  return destinationsStore.getAll();
}

export function usePackages() {
  useStore(packagesStore.store);
  return packagesStore.getAll();
}

// Public site: only published items, optionally scoped to a region.
export function usePublicDestinations(region = "all") {
  useStore(destinationsStore.store);
  return getDestinations(region);
}

export function usePublicPackages(region = "all") {
  useStore(packagesStore.store);
  return getPackages(region);
}

// Highlights shown on cards/detail pages: admin-entered highlights first,
// otherwise the destination's own attraction names.
export function getDestinationHighlights(destination, limit = 4) {
  if (destination?.highlights?.length) return destination.highlights.slice(0, limit);
  return (destination?.attractions || []).map((a) => a.name).slice(0, limit);
}
