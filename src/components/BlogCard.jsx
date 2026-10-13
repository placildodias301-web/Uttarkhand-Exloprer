import { Link } from "react-router-dom";
import { CalendarDays } from "lucide-react";
import SmartImage from "./SmartImage";
import RegionBadge from "./RegionBadge";

export default function BlogCard({ blog, region }) {
  const b = blog;
  return (
    <Link
      to={`/blogs/${b.id}`}
      className="group flex flex-col rounded-2xl overflow-hidden border border-white/[0.08] bg-ink-850/80 hover:border-white/15 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-moss-500/70"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <SmartImage
          src={b.coverImage}
          alt={b.title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
        />
        {region && (
          <div className="absolute top-3 left-3">
            <RegionBadge region={region} onImage />
          </div>
        )}
      </div>
      <div className="p-5 flex flex-col flex-1">
        <p className="text-gold-400 text-xs font-body font-semibold mb-2">{b.category}</p>
        <h3 className="font-display text-xl text-mist-100 mb-2 leading-snug group-hover:text-moss-400 transition-colors">{b.title}</h3>
        {b.subtitle && <p className="text-mist-300 text-sm font-body leading-relaxed mb-4 line-clamp-2">{b.subtitle}</p>}
        <p className="mt-auto flex items-center gap-3 text-mist-400 text-xs font-body">
          <span>{b.author}</span>
          {b.publishDate && (
            <span className="flex items-center gap-1">
              <CalendarDays size={11} aria-hidden="true" />
              {new Date(b.publishDate).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" })}
            </span>
          )}
        </p>
      </div>
    </Link>
  );
}
