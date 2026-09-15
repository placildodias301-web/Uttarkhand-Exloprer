import { useState } from "react";
import SectionHeader from "../components/SectionHeader";
import HotelCard from "../components/HotelCard";
import CuisineCard from "../components/CuisineCard";
import { destinations } from "../data/destinations";

export default function HotelsFood() {
  const [filter, setFilter] = useState("All");
  const options = ["All", ...destinations.map((d) => d.name)];

  const hotels = destinations
    .filter((d) => filter === "All" || d.name === filter)
    .flatMap((d) => d.hotels.map((h) => ({ hotel: h, destination: d })));

  const dishes = destinations
    .filter((d) => filter === "All" || d.name === filter)
    .flatMap((d) => d.cuisine.map((c) => ({ dish: c, destination: d })));

  return (
    <div className="max-w-[1200px] mx-auto px-5 sm:px-8 py-16 sm:py-20">
      <SectionHeader
        kicker="Hotels & Food"
        title="Where to stay, what to eat"
        description="A cross-section of stays and dishes across all six destinations. Filter by destination to narrow it down."
      />

      <div className="flex flex-wrap gap-2 mb-12">
        {options.map((label) => (
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

      <h2 className="font-display text-2xl text-mist-100 mb-6">Hotels & Stays</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
        {hotels.map(({ hotel, destination }) => (
          <HotelCard
            key={`${destination.id}-${hotel.name}`}
            hotel={hotel}
            destinationName={destination.name}
            destinationImage={destination.image}
          />
        ))}
      </div>

      <h2 className="font-display text-2xl text-mist-100 mb-6">Local Cuisine</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        {dishes.map(({ dish, destination }) => (
          <CuisineCard
            key={`${destination.id}-${dish.name}`}
            dish={dish}
            destinationName={destination.name}
            destinationImage={destination.image}
          />
        ))}
      </div>
    </div>
  );
}
