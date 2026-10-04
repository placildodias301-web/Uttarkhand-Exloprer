import { useState } from "react";
import { Link } from "react-router-dom";
import { CalendarDays, ArrowUpRight } from "lucide-react";
import SmartImage from "../SmartImage";
import ItineraryTimeline from "../ItineraryTimeline";

// Shows complete day-by-day itineraries on a section page. Each tab is one
// itinerary (package or template); the selected one is rendered in full.
export default function ItineraryExplorer({ itineraries }) {
  // Fully written itineraries first, so the default tab is a complete plan;
  // partly written ones (e.g. a 6-day template with 3 days filled) follow.
  const isComplete = (it) => !(parseInt(it.duration, 10) > it.days.length);
  const withDays = itineraries.filter((it) => it.days.length > 0);
  const list = [...withDays.filter(isComplete), ...withDays.filter((it) => !isComplete(it))];
  const [activeId, setActiveId] = useState(list[0]?.id);
  const active = list.find((it) => it.id === activeId) || list[0];
  if (!active) return null;

  return (
    <div>
      {list.length > 1 && (
        <div role="tablist" aria-label="Choose an itinerary" className="no-scrollbar overflow-x-auto -mx-5 px-5 sm:mx-0 sm:px-0 mb-8">
          <div className="inline-flex gap-2 whitespace-nowrap">
            {list.map((it) => (
              <button
                key={it.id}
                role="tab"
                aria-selected={it.id === active.id}
                onClick={() => setActiveId(it.id)}
                className={`text-left rounded-2xl border px-4 py-3 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-moss-500/70 ${
                  it.id === active.id
                    ? "border-moss-500/50 bg-moss-500/[0.08]"
                    : "border-white/10 bg-ink-850/60 hover:border-white/25"
                }`}
              >
                <span className={`block font-body text-sm font-semibold ${it.id === active.id ? "text-mist-100" : "text-mist-200"}`}>{it.name}</span>
                <span className="block font-body text-xs text-mist-400 mt-0.5">{it.duration}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <div role="tabpanel" className="grid lg:grid-cols-[320px_1fr] gap-8 lg:gap-12 items-start">
        <aside className="lg:sticky lg:top-36 rounded-2xl overflow-hidden border border-white/[0.08] bg-ink-850/80">
          <div className="relative aspect-[16/10]">
            <SmartImage src={active.cover} alt={active.name} className="absolute inset-0 h-full w-full object-cover" />
          </div>
          <div className="p-5">
            <p className="inline-flex items-center gap-1.5 text-gold-400 text-xs font-body font-semibold mb-2">
              <CalendarDays size={12} aria-hidden="true" /> {active.duration}
            </p>
            <h3 className="font-display text-2xl text-mist-100 leading-snug mb-1">{active.name}</h3>
            {active.subtitle && <p className="text-mist-300 text-sm font-body mb-3">{active.subtitle}</p>}
            {active.description && <p className="text-mist-400 text-sm font-body leading-relaxed mb-4">{active.description}</p>}
            {active.days.length > 0 && active.duration && /\d+/.test(active.duration) && parseInt(active.duration, 10) > active.days.length && (
              <p className="text-mist-400 text-xs font-body mb-4">
                {active.days.length} of {parseInt(active.duration, 10)} days are written out so far.
              </p>
            )}
            <div className="flex flex-wrap gap-2">
              <Link to={`/itinerary/${active.id}`} className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 text-sm font-body font-semibold text-mist-100 hover:border-moss-500/60 hover:text-moss-400">
                Open itinerary <ArrowUpRight size={14} aria-hidden="true" />
              </Link>
              {active.packageId && (
                <Link to={`/packages/${active.packageId}`} className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-body font-semibold text-moss-400 hover:text-moss-300">
                  View package
                </Link>
              )}
            </div>
          </div>
        </aside>
        <ItineraryTimeline days={active.days} />
      </div>
    </div>
  );
}
