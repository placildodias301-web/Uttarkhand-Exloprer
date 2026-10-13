import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SmartImage from "../SmartImage";
import { useGallery } from "../../services/gallery";

// Mosaic preview of the gallery for a region, linking to /gallery.
// For "all", alternates regions so both appear.
export default function GalleryStrip({ region = "all", count = 7 }) {
  const images = useGallery(region);

  let picks = images;
  if (region === "all") {
    const a = images.filter((i) => i.region === "uttarakhand");
    const b = images.filter((i) => i.region === "goa");
    picks = [];
    for (let i = 0; picks.length < count && (i < a.length || i < b.length); i++) {
      if (a[i * 2]) picks.push(a[i * 2]); // every other, so destinations vary
      if (b[i]) picks.push(b[i]);
    }
  }
  picks = picks.slice(0, count);
  if (picks.length === 0) return null;

  return (
    <div>
      <ul className="grid grid-cols-2 md:grid-cols-4 auto-rows-[150px] sm:auto-rows-[190px] lg:auto-rows-[220px] gap-3 sm:gap-4">
        {picks.map((img, i) => (
          <li
            key={img.id}
            className={`relative overflow-hidden rounded-2xl border border-white/[0.08] group ${
              i === 0 ? "col-span-2 row-span-2" : i === 3 ? "md:row-span-2" : ""
            }`}
          >
            <SmartImage src={img.src} alt={`${img.title}${img.place ? ` — ${img.place}` : ""}`} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]" />
            <span className="absolute inset-x-0 bottom-0 p-3 pt-8 bg-gradient-to-t from-ink-950/85 to-transparent font-body text-xs text-mist-100">
              {img.title}
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-6">
        <Link to="/gallery" className="inline-flex items-center gap-2 text-sm font-body font-semibold text-moss-400 hover:text-moss-300">
          Open the full gallery <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
