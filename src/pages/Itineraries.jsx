import { Link } from "react-router-dom";
import { MapPinned } from "lucide-react";
import PageIntro from "../components/PageIntro";
import ItineraryCard from "../components/ItineraryCard";
import RegionTabs from "../components/RegionTabs";
import { useListRegion } from "../services/travelSection";
import { useItineraries } from "../services/itineraries";
import { planTripLink } from "../data/navigation";

// /itinerary — every published day-by-day itinerary (package itineraries and
// admin itinerary templates). The trip builder lives at /plan-my-trip.
export default function Itineraries() {
  const region = useListRegion({ includeCombo: true });
  const itineraries = useItineraries(region);

  return (
    <div className="max-w-[1440px] mx-auto px-5 sm:px-8 py-14 sm:py-20">
      <PageIntro
        kicker="Itineraries"
        title="Follow a plan, day by day"
        description="Complete itineraries with where you'll be each day, what you'll do, where you'll stay and how you'll get there."
      >
        <div className="flex flex-wrap items-center gap-4">
          <RegionTabs includeCombo />
          <Link to={planTripLink.to} className="inline-flex items-center gap-2 text-sm font-body font-semibold text-moss-400 hover:text-moss-300">
            <MapPinned size={15} aria-hidden="true" /> Or build your own trip
          </Link>
        </div>
      </PageIntro>

      {itineraries.length === 0 ? (
        <p className="text-mist-400 font-body text-sm">No itineraries are published for this region yet.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {itineraries.map((it) => (
            <ItineraryCard key={it.id} itinerary={it} />
          ))}
        </div>
      )}
    </div>
  );
}
