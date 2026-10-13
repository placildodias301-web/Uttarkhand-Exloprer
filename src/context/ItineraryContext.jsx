import { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";
import { useDestinations } from "../services/content";

const STORAGE_KEY = "uttarakhand-explorer:itinerary";

// Rough straight-line distances (km) between consecutive default-order destinations,
// used only to give the itinerary builder an approximate total.
const LEG_KM = {
  "haridwar-rishikesh": 24,
  "rishikesh-dehradun": 43,
  "dehradun-tehri": 95,
  "tehri-chopta": 165,
  "chopta-auli": 60,
};

function estimateDistance(ids) {
  let total = 0;
  for (let i = 0; i < ids.length - 1; i++) {
    const key = `${ids[i]}-${ids[i + 1]}`;
    const revKey = `${ids[i + 1]}-${ids[i]}`;
    total += LEG_KM[key] ?? LEG_KM[revKey] ?? 70; // fallback average leg
  }
  return total;
}

const ItineraryContext = createContext(null);

export function ItineraryProvider({ children }) {
  const destinations = useDestinations();
  const getDestination = useCallback(
    (id) => destinations.find((d) => d.id === id),
    [destinations]
  );

  const [ids, setIds] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  }, [ids]);

  const addDestination = useCallback((id) => {
    setIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }, []);

  const removeDestination = useCallback((id) => {
    setIds((prev) => prev.filter((d) => d !== id));
  }, []);

  const moveUp = useCallback((index) => {
    setIds((prev) => {
      if (index <= 0) return prev;
      const next = [...prev];
      [next[index - 1], next[index]] = [next[index], next[index - 1]];
      return next;
    });
  }, []);

  const moveDown = useCallback((index) => {
    setIds((prev) => {
      if (index >= prev.length - 1) return prev;
      const next = [...prev];
      [next[index + 1], next[index]] = [next[index], next[index + 1]];
      return next;
    });
  }, []);

  const reorder = useCallback((fromIndex, toIndex) => {
    setIds((prev) => {
      const next = [...prev];
      const [moved] = next.splice(fromIndex, 1);
      next.splice(toIndex, 0, moved);
      return next;
    });
  }, []);

  const clear = useCallback(() => setIds([]), []);

  const items = useMemo(
    () => ids.map((id) => getDestination(id)).filter(Boolean),
    [ids, getDestination]
  );

  const totalDistanceKm = useMemo(() => estimateDistance(ids), [ids]);

  const value = {
    ids,
    items,
    days: items.length,
    totalDistanceKm,
    allDestinations: destinations,
    addDestination,
    removeDestination,
    moveUp,
    moveDown,
    reorder,
    clear,
    isSaved: ids.length > 0,
  };

  return <ItineraryContext.Provider value={value}>{children}</ItineraryContext.Provider>;
}

export function useItinerary() {
  const ctx = useContext(ItineraryContext);
  if (!ctx) throw new Error("useItinerary must be used inside ItineraryProvider");
  return ctx;
}
