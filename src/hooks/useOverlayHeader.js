import { useLayoutEffect, useSyncExternalStore } from "react";

// Lets a page with a full-bleed hero ask the public header to float over it
// (transparent glass) instead of sitting above it. In-memory only.
let count = 0;
const listeners = new Set();
const emit = () => listeners.forEach((l) => l());

function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useHeaderOverlayActive() {
  return useSyncExternalStore(subscribe, () => count > 0, () => false);
}

// Call in a page component: the header overlays the page while it's mounted.
export function useOverlayHeader() {
  useLayoutEffect(() => {
    count += 1;
    emit();
    return () => {
      count -= 1;
      emit();
    };
  }, []);
}
