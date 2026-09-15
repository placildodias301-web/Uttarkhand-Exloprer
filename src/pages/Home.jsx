import { Link } from "react-router-dom";
import { ArrowRight, Compass, ShieldCheck, Wallet, Route, Star } from "lucide-react";
import Hero from "../components/Hero";
import SectionHeader from "../components/SectionHeader";
import DestinationCard from "../components/DestinationCard";
import PackageCard from "../components/PackageCard";
import Button from "../components/Button";
import WhatsAppContactCard from "../components/WhatsAppContactCard";
import { destinations } from "../data/destinations";
import { packages } from "../data/packages";

const whyUs = [
  { icon: Compass, title: "Built around real routes", desc: "Every itinerary follows the actual road route through the Garhwal hills, not a random shuffle of towns." },
  { icon: Route, title: "Built to be interactive", desc: "Browse, compare and reorder stops before you commit to anything — not a static brochure." },
  { icon: ShieldCheck, title: "Practical trip details", desc: "Altitude, temperature and travel time for each stop, so you know what to actually pack and expect." },
  { icon: Wallet, title: "Transparent packages", desc: "Clear day-by-day plans with hotel, meal and transport info included up front." },
];

export default function Home() {
  const featured = destinations.slice(0, 3);

  return (
    <div>
      <Hero />

      <section className="max-w-[1440px] mx-auto px-5 sm:px-8 py-20 sm:py-28">
        <SectionHeader
          kicker="Featured Destinations"
          title="Six stops, one Himalayan arc"
          description="From riverside pilgrimage towns to alpine ski slopes — each destination on the route is built out with its own attractions, food and stays."
          action={
            <Button as={Link} to="/destinations" variant="outline" size="sm">
              View All Destinations <ArrowRight size={15} />
            </Button>
          }
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {featured.map((d) => (
            <DestinationCard key={d.id} destination={d} />
          ))}
        </div>
      </section>

      <section className="bg-ink-900 py-20 sm:py-28 border-y border-white/5">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8">
          <SectionHeader
            kicker="Featured Packages"
            title="Or start from a ready-made plan"
            description="Three curated routes covering the classic circuit, a honeymoon escape and a lake-side adventure break."
            action={
              <Button as={Link} to="/packages" variant="outline" size="sm">
                View All Packages <ArrowRight size={15} />
              </Button>
            }
          />
          <div className="grid md:grid-cols-3 gap-6">
            {packages.map((p) => (
              <PackageCard key={p.id} pkg={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-5 sm:px-8 py-20 sm:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeader
              kicker="Talk To Us"
              title="Not sure where to start? Just ask."
              description="Chat with us on WhatsApp and we'll help you shape a route, suggest stops, or answer anything about a destination or package."
            />
            <WhatsAppContactCard title="Plan your trip with us" />
          </div>
          <div className="relative block rounded-2xl overflow-hidden border border-white/10 shadow-card aspect-[4/3]">
            <img
              src="https://commons.wikimedia.org/wiki/Special:FilePath/Auli,_India.jpg?width=1400"
              alt="Uttarakhand landscape"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-ink-950/25" />
          </div>
        </div>
      </section>

      <section className="bg-ink-900 py-20 sm:py-28 border-y border-white/5">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8">
          <SectionHeader kicker="Popular Attractions" title="What people go there for" align="left" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {destinations.flatMap((d) => d.attractions.slice(0, 1).map((a) => ({ ...a, dest: d }))).map((a) => (
              <Link
                key={a.dest.id}
                to={`/destinations/${a.dest.id}`}
                className="group rounded-2xl border border-white/5 bg-ink-850 overflow-hidden block"
              >
                <div className="relative h-32 overflow-hidden">
                  <img
                    src={a.dest.image}
                    alt={a.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-850 to-transparent" />
                </div>
                <div className="p-4">
                  <p className="text-moss-400 text-[11px] font-body font-semibold mb-1">{a.dest.name}</p>
                  <h4 className="font-display text-base text-mist-100 mb-1 group-hover:text-moss-300 transition-colors">{a.name}</h4>
                  <p className="text-mist-400 text-xs font-body leading-relaxed line-clamp-2">{a.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-5 sm:px-8 py-20 sm:py-28">
        <SectionHeader kicker="Why Travel With Us" title="A trip planner, not a brochure" align="left" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyUs.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="p-6 rounded-2xl border border-white/5 bg-ink-850">
              <span className="inline-flex h-11 w-11 rounded-xl bg-moss-500/10 items-center justify-center text-moss-400 mb-5">
                <Icon size={19} />
              </span>
              <h4 className="font-display text-lg text-mist-100 mb-2">{title}</h4>
              <p className="text-mist-400 text-sm font-body leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative py-24 sm:py-32 overflow-hidden">
        <img
          src="https://commons.wikimedia.org/wiki/Special:FilePath/Rishikesh,_Lakshman_Jhula.jpg?width=1800"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-ink-950/80" />
        <div className="relative max-w-3xl mx-auto text-center px-5">
          <div className="flex items-center justify-center gap-1 text-gold-400 mb-5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={16} fill="currentColor" />
            ))}
          </div>
          <h2 className="font-display text-3xl sm:text-4xl text-mist-100 mb-5">
            Your Himalayan trip is one message away
          </h2>
          <p className="text-mist-300 font-body mb-9 max-w-lg mx-auto">
            Start with a destination, a package, or a blank itinerary — and reach out on WhatsApp anytime.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button as={Link} to="/destinations" size="lg">
              Explore Destinations <ArrowRight size={16} />
            </Button>
            <Button as={Link} to="/itinerary" variant="dark" size="lg">
              Start Planning
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
