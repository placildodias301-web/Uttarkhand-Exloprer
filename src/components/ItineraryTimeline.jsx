import { Link } from "react-router-dom";
import { Clock, Bed, UtensilsCrossed, Car, ArrowUpRight } from "lucide-react";
import { useDestinations } from "../services/content";

export default function ItineraryTimeline({ days }) {
  const destinations = useDestinations();
  const getDestination = (id) => destinations.find((d) => d.id === id);
  return (
    <div className="relative">
      <div className="absolute left-[19px] top-2 bottom-2 w-px bg-white/10 hidden sm:block" />
      <div className="space-y-8">
        {(days || []).map((day) => {
          const dest = getDestination(day.destinationId);
          return (
            <div key={day.day} className="relative sm:pl-14">
              <div className="hidden sm:flex absolute left-0 top-0 h-10 w-10 rounded-full bg-moss-500 text-ink-950 font-display font-semibold items-center justify-center shadow-glow">
                {day.day}
              </div>

              <div className="rounded-2xl border border-white/5 bg-ink-850 p-6">
                <div className="flex flex-wrap items-center gap-3 mb-1">
                  <span className="sm:hidden h-7 w-7 rounded-full bg-moss-500 text-ink-950 text-xs font-display font-semibold flex items-center justify-center">
                    {day.day}
                  </span>
                  <h4 className="font-display text-lg text-mist-100">
                    Day {day.day} · {day.title}
                  </h4>
                  {dest && (
                    <Link
                      to={`/destinations/${dest.id}`}
                      className="text-xs font-body font-semibold text-moss-400 hover:text-moss-300 flex items-center gap-1"
                    >
                      {dest.name} <ArrowUpRight size={12} />
                    </Link>
                  )}
                </div>

                <ul className="mt-3 space-y-1.5 mb-4">
                  {day.activities.map((a) => (
                    <li key={a} className="text-mist-300 text-sm font-body flex gap-2">
                      <span className="h-1 w-1 rounded-full bg-moss-400 mt-2 shrink-0" />
                      {a}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-x-6 gap-y-2 pt-3 border-t border-white/5 text-xs font-body text-mist-400">
                  <span className="flex items-center gap-1.5"><Clock size={13} className="text-moss-400" /> {day.timing}</span>
                  <span className="flex items-center gap-1.5"><Bed size={13} className="text-moss-400" /> {day.hotel}</span>
                  <span className="flex items-center gap-1.5"><UtensilsCrossed size={13} className="text-moss-400" /> {day.meals}</span>
                  <span className="flex items-center gap-1.5"><Car size={13} className="text-moss-400" /> {day.transport}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
