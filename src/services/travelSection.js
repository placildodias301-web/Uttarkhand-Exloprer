import { useLocation } from "react-router-dom";
import { createStore } from "./createStore";
import { useStore } from "../hooks/useStore";
import { setRegion } from "./region";
import {
  travelSections,
  DEFAULT_SECTION_ID,
  getTravelSection,
  sectionFromPath,
} from "../data/navigation";

// Remembers which travel section (ALL / UTTARAKHAND / GOA / COMBO) the
// visitor last chose, so the top navigation row keeps showing it while they
// browse shared pages like /destinations or /blogs.
const store = createStore("pp_travel_section", DEFAULT_SECTION_ID);

// Opening a section URL directly (e.g. a bookmarked /goa) should be reflected
// before the first render, so the region-aware pages don't flash the
// previously stored region.
if (typeof window !== "undefined") {
  const fromUrl = sectionFromPath(window.location.pathname);
  if (fromUrl) {
    if (store.getState() !== fromUrl.id) store.setState(fromUrl.id);
    if (fromUrl.regionId) setRegion(fromUrl.regionId);
  }
}

// Selecting a section updates the remembered section and, for single-region
// sections, the existing region store that Destinations/Packages read.
export function selectTravelSection(id) {
  const section = getTravelSection(id);
  if (!section) return;
  if (store.getState() !== id) store.setState(id);
  if (section.regionId) setRegion(section.regionId);
}

export function getStoredSectionId() {
  return store.getState();
}

export function useTravelSection() {
  const id = useStore(store);
  const section = getTravelSection(id) || getTravelSection(DEFAULT_SECTION_ID);
  return { section, sections: travelSections, selectTravelSection };
}

// The section the top navigation highlights. On a section page the URL
// decides; on shared pages (/destinations, /blogs …) the last chosen section.
export function useActiveSection() {
  const { pathname } = useLocation();
  const { section } = useTravelSection();
  return sectionFromPath(pathname) || section;
}

// Region key a shared list page should show ("all" | "uttarakhand" | "goa" | "combo").
// Pages without Combo content treat the Combo section as "all".
export function useListRegion({ includeCombo = false } = {}) {
  const active = useActiveSection();
  if (active.id === "combo" && !includeCombo) return "all";
  return active.id;
}
