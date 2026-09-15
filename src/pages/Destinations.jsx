import SectionHeader from "../components/SectionHeader";
import DestinationCard from "../components/DestinationCard";
import { destinations } from "../data/destinations";

export default function Destinations() {
  return (
    <div className="max-w-[1440px] mx-auto px-5 sm:px-8 py-16 sm:py-20">
      <SectionHeader
        kicker="All Destinations"
        title="Six stops through the Garhwal Himalaya"
        description="Every destination is built out with attractions, activities, hotels and local food — click through for the full picture, or drop it straight into an itinerary."
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {destinations.map((d) => (
          <DestinationCard key={d.id} destination={d} />
        ))}
      </div>
    </div>
  );
}
