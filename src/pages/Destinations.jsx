import PageIntro from "../components/PageIntro";
import DestinationCard from "../components/DestinationCard";
import RegionTabs from "../components/RegionTabs";
import { useListRegion } from "../services/travelSection";
import { usePublicDestinations } from "../services/content";
import { regions } from "../data/regions";

export default function Destinations() {
  const region = useListRegion();
  const destinations = usePublicDestinations("all");
  const groups = regions
    .filter((r) => region === "all" || r.id === region)
    .map((r) => ({ region: r, items: destinations.filter((d) => d.region === r.name) }));

  return (
    <div className="max-w-[1440px] mx-auto px-5 sm:px-8 py-14 sm:py-20">
      <PageIntro
        kicker="Destinations"
        title="Where would you like to go?"
        description="Every destination is built out with attractions, activities, stays and local food — open one for the full picture, or add it straight to your trip."
      >
        <RegionTabs />
      </PageIntro>

      {groups.map(({ region: r, items }) => (
        <section key={r.id} className="mb-16 last:mb-0" aria-labelledby={`dest-${r.id}`}>
          <div className="flex items-baseline justify-between gap-4 mb-6">
            <h2 id={`dest-${r.id}`} className="font-display text-3xl text-mist-100">{r.name}</h2>
            <p className="text-mist-400 text-sm font-body">{items.length} destinations</p>
          </div>
          {items.length === 0 ? (
            <p className="text-mist-400 font-body text-sm">No destinations in {r.name} yet.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
              {items.map((d) => (
                <DestinationCard key={d.id} destination={d} />
              ))}
            </div>
          )}
        </section>
      ))}
    </div>
  );
}
