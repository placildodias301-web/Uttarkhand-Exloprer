import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Clock, BedDouble, UtensilsCrossed, Car, MapPin, StickyNote } from "lucide-react";
import SmartImage from "./SmartImage";
import { useDestinations, isPublished } from "../services/content";
import { normalizeDay } from "../services/itineraries";

// Reusable day-by-day renderer. Accepts days from any source — package
// itineraries (hotel/meals/transport/activities) or itinerary templates
// (title/description + optional location, activities, image, stay, food,
// notes) — and shows whatever each day actually contains.
export default function ItineraryTimeline({ days, showImages = true }) {
  const destinations = useDestinations();
  // Only link a day's location to a destination page that is live.
  const live = useMemo(() => new Set(destinations.filter(isPublished).map((d) => d.id)), [destinations]);
  const normalized = useMemo(() => {
    const byId = Object.fromEntries(destinations.map((d) => [d.id, d]));
    return (days || []).map((d, i) => normalizeDay(d, i, byId));
  }, [days, destinations]);

  if (normalized.length === 0) {
    return <p className="text-mist-400 font-body text-sm">The day-by-day plan for this itinerary hasn't been added yet.</p>;
  }

  return (
    <ol className="relative space-y-6">
      <span className="absolute left-[19px] top-3 bottom-3 w-px bg-gradient-to-b from-moss-500/50 via-white/10 to-transparent hidden sm:block" aria-hidden="true" />
      {normalized.map((day) => {
        const image = showImages ? day.image || day.fallbackImage : null;
        const facts = [
          { icon: Clock, label: "Timing", value: day.timing },
          { icon: BedDouble, label: "Stay", value: day.stay },
          { icon: UtensilsCrossed, label: "Food", value: day.food },
          { icon: Car, label: "Transport", value: day.transport },
        ].filter((f) => f.value);

        return (
          <li key={day.day} className="relative sm:pl-14">
            <span className="hidden sm:flex absolute left-0 top-1 h-10 w-10 rounded-full bg-ink-850 border border-moss-500/50 text-moss-400 font-display text-base items-center justify-center">
              {day.day}
            </span>

            <article className="rounded-2xl border border-white/[0.08] bg-ink-850/70 overflow-hidden md:flex">
              {image && (
                <div className="relative md:w-56 lg:w-64 shrink-0 aspect-[16/9] md:aspect-auto">
                  <SmartImage
                    src={day.image}
                    fallbackSrc={day.fallbackImage}
                    alt={day.location ? `${day.location} — day ${day.day}` : `Day ${day.day}`}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
              )}

              <div className="p-5 sm:p-6 flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-2">
                  <span className="sm:hidden h-7 w-7 rounded-full border border-moss-500/50 text-moss-400 text-xs font-display flex items-center justify-center">
                    {day.day}
                  </span>
                  <span className="text-gold-400 text-xs font-body font-semibold">Day {day.day}</span>
                  {day.location &&
                    (day.destinationId && live.has(day.destinationId) ? (
                      <Link
                        to={`/destinations/${day.destinationId}`}
                        className="inline-flex items-center gap-1 text-xs font-body text-mist-300 hover:text-moss-400"
                      >
                        <MapPin size={12} aria-hidden="true" /> {day.location}
                      </Link>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-body text-mist-300">
                        <MapPin size={12} aria-hidden="true" /> {day.location}
                      </span>
                    ))}
                </div>

                {day.title && <h4 className="font-display text-xl text-mist-100 leading-snug mb-2">{day.title}</h4>}
                {day.description && <p className="text-mist-300 text-sm font-body leading-relaxed mb-3">{day.description}</p>}

                {day.activities.length > 0 && (
                  <ul className="grid sm:grid-cols-2 gap-x-5 gap-y-1.5 mb-4">
                    {day.activities.map((a) => (
                      <li key={a} className="text-mist-200 text-sm font-body flex gap-2">
                        <span className="h-1 w-1 rounded-full bg-moss-500 mt-2 shrink-0" aria-hidden="true" />
                        {a}
                      </li>
                    ))}
                  </ul>
                )}

                {facts.length > 0 && (
                  <dl className="grid sm:grid-cols-2 gap-x-6 gap-y-2 pt-4 border-t border-white/[0.07] text-xs font-body">
                    {facts.map(({ icon: Icon, label, value }) => (
                      <div key={label} className="flex items-start gap-2 min-w-0">
                        <Icon size={13} className="text-moss-500 mt-0.5 shrink-0" aria-hidden="true" />
                        <dt className="sr-only">{label}</dt>
                        <dd className="text-mist-300 break-words">{value}</dd>
                      </div>
                    ))}
                  </dl>
                )}

                {day.notes && (
                  <p className="mt-4 flex gap-2 rounded-xl bg-gold-400/[0.08] border border-gold-400/20 px-3 py-2.5 text-xs font-body text-gold-300">
                    <StickyNote size={13} className="shrink-0 mt-0.5" aria-hidden="true" /> {day.notes}
                  </p>
                )}
              </div>
            </article>
          </li>
        );
      })}
    </ol>
  );
}
