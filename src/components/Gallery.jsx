import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Users } from "lucide-react";
import { useDestinations } from "../services/content";
import { useGallerySubmissions } from "../services/gallerySubmissions";
import Modal from "./Modal";

export default function Gallery() {
  const destinations = useDestinations();
  const { approved } = useGallerySubmissions();
  const [filter, setFilter] = useState("All");
  const [activeIndex, setActiveIndex] = useState(null);

  const allImages = useMemo(() => {
    const fromDestinations = destinations.flatMap((d) =>
      d.gallery.map((src, i) => ({ src, destination: d.name, id: `${d.id}-${i}` }))
    );
    // Visitor-submitted photos the admin has approved show up alongside the
    // official destination galleries, tagged by whichever place the visitor named.
    const fromCommunity = approved.map((sub) => ({
      src: sub.image,
      destination: sub.place || "Community",
      id: sub.id,
      isCommunity: true,
      caption: sub.caption,
    }));
    return [...fromDestinations, ...fromCommunity];
  }, [destinations, approved]);

  const filterOptions = useMemo(
    () => ["All", ...destinations.map((d) => d.name), ...(approved.length ? ["Community"] : [])],
    [destinations, approved]
  );

  const filtered = useMemo(() => {
    if (filter === "All") return allImages;
    if (filter === "Community") return allImages.filter((img) => img.isCommunity);
    return allImages.filter((img) => img.destination === filter);
  }, [filter, allImages]);

  const openAt = (i) => setActiveIndex(i);
  const close = () => setActiveIndex(null);
  const next = () => setActiveIndex((i) => (i + 1) % filtered.length);
  const prev = () => setActiveIndex((i) => (i - 1 + filtered.length) % filtered.length);

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-8">
        {filterOptions.map((label) => (
          <button
            key={label}
            onClick={() => setFilter(label)}
            className={`px-4 py-2 rounded-full text-sm font-body font-semibold border transition-colors ${
              filter === label
                ? "bg-moss-500 text-ink-950 border-moss-500"
                : "border-white/10 text-mist-300 hover:border-moss-500/40 hover:text-moss-300"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 [&>*]:mb-4">
        {filtered.map((img, i) => (
          <button
            key={img.id}
            onClick={() => openAt(i)}
            className="block w-full rounded-xl overflow-hidden border border-white/5 group relative"
          >
            <img
              src={img.src}
              alt={img.destination}
              loading="lazy"
              className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute bottom-0 left-0 right-0 p-2.5 bg-gradient-to-t from-ink-950/90 to-transparent text-mist-100 text-xs font-body font-semibold text-left opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
              {img.isCommunity && <Users size={11} />} {img.destination}
            </span>
          </button>
        ))}
        {filtered.length === 0 && (
          <p className="text-mist-400 font-body text-sm col-span-full">No images in this category yet.</p>
        )}
      </div>

      <Modal open={activeIndex !== null} onClose={close} className="sm:max-w-4xl bg-ink-950">
        {activeIndex !== null && (
          <div className="relative">
            <img src={filtered[activeIndex].src} alt="" className="w-full max-h-[80vh] object-contain" />
            <div className="p-4 flex items-center justify-between">
              <span className="font-body text-mist-200 text-sm font-semibold">
                {filtered[activeIndex].destination}
                {filtered[activeIndex].caption && (
                  <span className="block text-mist-400 text-xs font-normal mt-0.5">{filtered[activeIndex].caption}</span>
                )}
              </span>
              <div className="flex gap-2">
                <button onClick={prev} className="h-9 w-9 rounded-full border border-white/10 flex items-center justify-center text-mist-200 hover:text-moss-400">
                  <ChevronLeft size={16} />
                </button>
                <button onClick={next} className="h-9 w-9 rounded-full border border-white/10 flex items-center justify-center text-mist-200 hover:text-moss-400">
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
