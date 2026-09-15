import { Link } from "react-router-dom";
import { ArrowRight, MapPinned, ChevronDown } from "lucide-react";
import Button from "./Button";

export default function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-end overflow-hidden">
      <img
        src="https://commons.wikimedia.org/wiki/Special:FilePath/Himalayan_Range_-_chaukhamba_peak.jpg?width=2000"
        alt="Himalayan peaks over Uttarakhand"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/60 to-ink-950/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink-950/70 via-transparent to-transparent" />

      <div className="relative max-w-[1440px] mx-auto px-5 sm:px-8 pb-20 sm:pb-28 w-full">
        <p className="text-moss-400 font-body font-semibold text-sm mb-5 tracking-wide">
          Garhwal Himalaya · 6 Destinations · Endless Routes
        </p>
        <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl text-mist-100 max-w-3xl leading-[1.05] mb-6">
          Uttarakhand, <span className="italic text-moss-400">mapped</span> the way you'll actually travel it.
        </h1>
        <p className="text-mist-300 font-body text-base sm:text-lg max-w-xl mb-10 leading-relaxed">
          From the Ganga's ghats in Haridwar to the snowline above Auli — explore every
          destination on an interactive map, then build a day-by-day itinerary around it.
        </p>
        <div className="flex flex-wrap gap-4">
          <Button as={Link} to="/destinations" size="lg">
            Explore Destinations <ArrowRight size={17} />
          </Button>
          <Button as={Link} to="/itinerary" variant="dark" size="lg">
            <MapPinned size={17} /> Plan My Trip
          </Button>
        </div>
      </div>

      <div className="absolute bottom-6 right-6 sm:right-10 hidden sm:flex flex-col items-center gap-2 text-mist-400 animate-fadeUp">
        <span className="font-body text-xs [writing-mode:vertical-rl]">Scroll</span>
        <ChevronDown size={16} className="animate-bounce" />
      </div>
    </section>
  );
}
