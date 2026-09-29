import SectionHeader from "../components/SectionHeader";
import DestinationCard from "../components/DestinationCard";
import RegionTabs from "../components/RegionTabs";
import { useDestinations } from "../services/content";
import { useRegion } from "../services/region";

export default function Destinations() {
  const destinations = useDestinations();
  const { region } = useRegion();
  const regionDestinations = destinations.filter((d) => d.region === region.name);

  return (
    <div className="max-w-[1440px] mx-auto px-5 sm:px-8 py-16 sm:py-20">
      <SectionHeader
        kicker={`${region.name} Destinations`}
        title={region.featured.title}
        description="Every destination is built out with attractions, activities, hotels and local food — click through for the full picture, or drop it straight into an itinerary."
      />
      <RegionTabs className="mb-8" />
      {regionDestinations.length === 0 ? (
        <p className="text-mist-400 font-body text-sm">No destinations in {region.name} yet — coming soon.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {regionDestinations.map((d) => (
            <DestinationCard key={d.id} destination={d} />
          ))}
        </div>
      )}
    </div>
  );
}
