import { createStore } from "./createStore";
import { useStore } from "../hooks/useStore";
import { regions } from "../data/regions";

// Which region the visitor is currently browsing. Persisted so the choice
// carries across Home, Destinations and Packages (and survives a refresh).
const store = createStore("uk_selected_region", regions[0].id);

export function setRegion(id) {
  if (regions.some((r) => r.id === id)) store.setState(id);
}

export function useRegion() {
  const id = useStore(store);
  const region = regions.find((r) => r.id === id) || regions[0];
  return { region, regions, setRegion };
}

// Non-React read of the current region id (used by the travel-section sync).
export function getRegionId() {
  return store.getState();
}
