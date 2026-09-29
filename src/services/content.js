import { createStore } from "./createStore";
import { useStore } from "../hooks/useStore";
import { destinations as uttarakhandDestinations } from "../data/destinations";
import { packages as uttarakhandPackages } from "../data/packages";
import { goaDestinations } from "../data/goaDestinations";
import { goaPackages } from "../data/goaPackages";
import { DEFAULT_REGION } from "../data/regions";
import { pushNotification } from "./notifications";

// Both regions live in the same store. Items without a `region` field (all
// of the original Uttarakhand data) are treated as Uttarakhand.
const baseDestinations = [...uttarakhandDestinations, ...goaDestinations];
const basePackages = [...uttarakhandPackages, ...goaPackages];
const withRegion = (item) => ({ region: DEFAULT_REGION, ...item });

// Admin edits are stored as a small "delta" on top of the existing seed data
// files (src/data/destinations.js, src/data/packages.js) rather than copying
// the whole dataset into localStorage. This keeps your original content as
// the source of truth, while letting the admin panel add/edit/remove items
// on top of it — the same pattern a real CMS-over-static-content setup uses.
function makeContentStore(baseItems, storageKey, kindLabel) {
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

  function add(item) {
    const id = item.id || slugify(item.name);
    const region = item.region || DEFAULT_REGION;
    // Numbering restarts for each region (Goa #1, #2 … / Uttarakhand #1, #2 …)
    const order = getAll().filter((i) => i.region === region).length + 1;
    const entry = { order, status: "Draft", ...item, region, id };
    store.setState((s) => ({ ...s, additions: [...s.additions, entry] }));
    pushNotification({ title: `${kindLabel} added`, message: entry.name || id });
    return entry;
  }

  function update(id, patch) {
    store.setState((s) => {
      const isAddition = s.additions.some((a) => a.id === id);
      if (isAddition) {
        return { ...s, additions: s.additions.map((a) => (a.id === id ? { ...a, ...patch } : a)) };
      }
      return { ...s, overrides: { ...s.overrides, [id]: { ...s.overrides[id], ...patch } } };
    });
    pushNotification({ title: `${kindLabel} updated`, message: patch.name || id });
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

  return { store, getAll, getById, add, update, remove };
}

export const destinationsStore = makeContentStore(baseDestinations, "uk_destinations_delta", "Destination");
export const packagesStore = makeContentStore(basePackages, "uk_packages_delta", "Package");

// Drop-in-ish replacements for the old `import { destinations } from
// "../data/destinations"` pattern, but reactive to admin changes.
export function useDestinations() {
  useStore(destinationsStore.store); // re-render this component on change
  return destinationsStore.getAll();
}

export function usePackages() {
  useStore(packagesStore.store);
  return packagesStore.getAll();
}
