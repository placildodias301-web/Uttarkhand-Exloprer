import { useMemo } from "react";
import { matchesRegion, normalizeRegion } from "../data/regions";
import { usePublicDestinations } from "./content";
import { useGallerySubmissions } from "./gallerySubmissions";

// Public gallery = each published destination's own `gallery` images plus
// visitor photos the admin has APPROVED. Pending and rejected submissions
// never appear here.
//
// Item shape: { id, src, title, place, region, kind, caption?, visitorName?, destinationId? }

function regionForPlace(place, destinations) {
  const p = String(place || "").trim().toLowerCase();
  if (!p) return null;
  const match = destinations.find((d) => d.name.toLowerCase() === p || p.includes(d.name.toLowerCase()));
  return match ? normalizeRegion(match.region) : null;
}

export function buildGallery(destinations, approvedSubmissions) {
  const fromDestinations = destinations.flatMap((d) =>
    (d.gallery?.length ? d.gallery : d.image ? [d.image] : []).map((src, i) => ({
      id: `${d.id}-${i}`,
      src,
      title: d.name,
      place: d.tagline || d.name,
      region: normalizeRegion(d.region),
      kind: "destination",
      destinationId: d.id,
    }))
  );
  const fromVisitors = approvedSubmissions.map((s) => ({
    id: s.id,
    src: s.image,
    title: s.title || s.place || "Visitor photo",
    place: s.place || "",
    region: normalizeRegion(s.region) || regionForPlace(s.place, destinations),
    kind: "visitor",
    caption: s.caption,
    visitorName: s.visitorName,
  }));
  return [...fromDestinations, ...fromVisitors];
}

export function useGallery(region = "all") {
  const destinations = usePublicDestinations("all");
  const { approved } = useGallerySubmissions();
  return useMemo(
    () => buildGallery(destinations, approved).filter((img) => matchesRegion(img.region, region)),
    [destinations, approved, region]
  );
}
