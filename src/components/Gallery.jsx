import { useCallback, useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Users } from "lucide-react";
import Modal from "./Modal";
import SmartImage from "./SmartImage";
import RegionBadge from "./RegionBadge";
import { useGallery } from "../services/gallery";
import { matchesRegion } from "../data/regions";

const FILTERS = [
  { id: "all", label: "All" },
  { id: "uttarakhand", label: "Uttarakhand" },
  { id: "goa", label: "Goa" },
];

// Public gallery: destination photos + approved visitor photos, filterable
// by region, in a masonry layout with a lightbox.
export default function Gallery({ initialRegion = "all" }) {
  const startFilter = FILTERS.some((f) => f.id === initialRegion) ? initialRegion : "all";
  const [filter, setFilter] = useState(startFilter);
  const [activeIndex, setActiveIndex] = useState(null);
  const allImages = useGallery("all");

  const filtered = useMemo(() => allImages.filter((img) => matchesRegion(img.region, filter)), [allImages, filter]);
  const counts = useMemo(
    () => Object.fromEntries(FILTERS.map((f) => [f.id, allImages.filter((img) => matchesRegion(img.region, f.id)).length])),
    [allImages]
  );

  const close = () => setActiveIndex(null);
  const next = useCallback(() => setActiveIndex((i) => (i + 1) % filtered.length), [filtered.length]);
  const prev = useCallback(() => setActiveIndex((i) => (i - 1 + filtered.length) % filtered.length), [filtered.length]);

  useEffect(() => {
    if (activeIndex === null) return;
    const onKey = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [activeIndex, next, prev]);

  const active = activeIndex !== null ? filtered[activeIndex] : null;

  return (
    <div>
      <div role="tablist" aria-label="Filter gallery by region" className="flex flex-wrap gap-2 mb-8">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            role="tab"
            aria-selected={filter === f.id}
            onClick={() => setFilter(f.id)}
            className={`px-4 py-2 rounded-full text-sm font-body font-semibold border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-moss-500/70 ${
              filter === f.id
                ? "bg-moss-500/[0.14] text-moss-400 border-moss-500/40"
                : "border-white/10 text-mist-300 hover:border-white/25 hover:text-mist-100"
            }`}
          >
            {f.label} <span className="text-mist-400 font-normal">({counts[f.id]})</span>
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-mist-400 font-body text-sm">No photos here yet.</p>
      ) : (
        <ul className="columns-2 md:columns-3 xl:columns-4 gap-3 sm:gap-4 [&>li]:mb-3 sm:[&>li]:mb-4">
          {filtered.map((img, i) => (
            <li key={img.id} className="break-inside-avoid">
              <button
                onClick={() => setActiveIndex(i)}
                className="group relative block w-full overflow-hidden rounded-xl border border-white/[0.08] focus:outline-none focus-visible:ring-2 focus-visible:ring-moss-500/70"
                aria-label={`Open photo: ${img.title}${img.place ? `, ${img.place}` : ""}`}
              >
                <SmartImage
                  src={img.src}
                  alt={img.title}
                  className={`w-full object-cover transition-transform duration-700 group-hover:scale-[1.04] ${
                    i % 3 === 0 ? "aspect-[3/4]" : i % 3 === 1 ? "aspect-[4/3]" : "aspect-square"
                  }`}
                />
                <span className="absolute inset-x-0 bottom-0 p-3 pt-10 bg-gradient-to-t from-ink-950/90 to-transparent text-left opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                  <span className="block font-display text-sm sm:text-base text-mist-100 leading-tight">{img.title}</span>
                  <span className="flex items-center gap-1 text-mist-300 text-[11px] font-body mt-0.5">
                    {img.kind === "visitor" && <Users size={11} aria-hidden="true" />}
                    {img.kind === "visitor" ? `Shared by ${img.visitorName || "a visitor"}` : img.place}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}

      <Modal open={Boolean(active)} onClose={close} className="sm:max-w-5xl bg-ink-950" label={active?.title}>
        {active && (
          <figure>
            <div className="bg-black/40 flex items-center justify-center">
              <SmartImage src={active.src} alt={active.title} className="w-full max-h-[72vh] object-contain" showLabel />
            </div>
            <figcaption className="p-4 sm:p-5 flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <p className="font-display text-lg text-mist-100">{active.title}</p>
                  <RegionBadge region={active.region} />
                </div>
                <p className="text-mist-300 text-sm font-body">
                  {active.kind === "visitor" ? `${active.place ? `${active.place} — ` : ""}shared by ${active.visitorName || "a visitor"}` : active.place}
                </p>
                {active.caption && <p className="text-mist-400 text-sm font-body mt-1.5">{active.caption}</p>}
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={prev} aria-label="Previous photo" className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center text-mist-200 hover:text-moss-400">
                  <ChevronLeft size={17} />
                </button>
                <button onClick={next} aria-label="Next photo" className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center text-mist-200 hover:text-moss-400">
                  <ChevronRight size={17} />
                </button>
              </div>
            </figcaption>
          </figure>
        )}
      </Modal>
    </div>
  );
}
