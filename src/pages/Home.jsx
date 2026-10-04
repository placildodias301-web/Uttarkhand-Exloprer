import { Link } from "react-router-dom";
import { ArrowRight, Check, Compass, ShieldCheck, Wallet, Route, Star } from "lucide-react";
import Hero from "../components/Hero";
import SectionHeader from "../components/SectionHeader";
import DestinationCard from "../components/DestinationCard";
import PackageCard from "../components/PackageCard";
import Button from "../components/Button";
import WhatsAppContactCard from "../components/WhatsAppContactCard";
import { useDestinations, usePackages } from "../services/content";
import { useRegion } from "../services/region";

// Icons for the "Why travel with us" cards, in order. The wording for each
// region lives in src/data/regions.js.
const whyIcons = [Compass, Route, ShieldCheck, Wallet];

export default function Home() {
  const destinations = useDestinations();
  const packages = usePackages();
  const { region, regions, setRegion } = useRegion();

  // Everything below the region cards belongs to the selected region.
  const regionDestinations = destinations.filter((d) => d.region === region.name);
  const regionPackages = packages.filter((p) => p.region === region.name);
  const featured = regionDestinations.slice(0, 3);
  const attractions = regionDestinations.flatMap((d) =>
    (d.attractions || []).slice(0, 1).map((a) => ({ ...a, dest: d }))
  );

  const chooseRegion = (id) => {
    setRegion(id);
    requestAnimationFrame(() => {
      document.getElementById("region-content")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <div>
      <Hero />

      <section className="max-w-[1440px] mx-auto px-5 sm:px-8 py-20 sm:py-28">
        <SectionHeader
          kicker="Explore Your Journey"
          title="Discover the Beauty of Uttarakhand & Goa"
          description="Pick a region — the destinations, packages and attractions below change to match."
        />
        <div className="grid sm:grid-cols-2 gap-5">
          {regions.map((r) => {
            const active = r.id === region.id;
            const destCount = destinations.filter((d) => d.region === r.name).length;
            const pkgCount = packages.filter((p) => p.region === r.name).length;
            return (
              <button
                key={r.id}
                onClick={() => chooseRegion(r.id)}
                aria-pressed={active}
                className={`group relative rounded-2xl overflow-hidden border shadow-card aspect-[16/10] text-left transition-all duration-300 ${
                  active ? "border-moss-400 ring-2 ring-moss-400/60" : "border-white/10 opacity-80 hover:opacity-100"
                }`}
              >
                <img
                  src={r.image}
                  alt={r.name}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/30 to-transparent" />
                {active && (
                  <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-moss-500 text-ink-950 text-[11px] font-body font-bold px-3 py-1">
                    <Check size={12} /> Viewing
                  </span>
                )}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-display text-2xl text-mist-100 mb-1">{r.name}</h3>
                  <p className="text-mist-300 text-sm font-body mb-1">{r.tagline}</p>
                  <p className="text-mist-400 text-xs font-body mb-4">
                    {destCount} destination{destCount === 1 ? "" : "s"} · {pkgCount} package{pkgCount === 1 ? "" : "s"}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-moss-400 text-sm font-body font-semibold">
                    {active ? `Showing ${r.name} below` : `Explore ${r.name}`} <ArrowRight size={14} />
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* ---------- Everything below is scoped to the selected region ---------- */}
      <div id="region-content" className="scroll-mt-24">
        {regionDestinations.length === 0 ? (
          <section className="max-w-[1440px] mx-auto px-5 sm:px-8 pb-20 sm:pb-28">
            <div className="rounded-2xl border border-dashed border-white/10 bg-ink-850/50 py-16 text-center">
              <p className="text-mist-300 font-body mb-1">{region.name} is coming soon</p>
              <p className="text-mist-400 font-body text-sm">Destinations and packages will appear here once they're added.</p>
            </div>
          </section>
        ) : (
          <>
            <section className="max-w-[1440px] mx-auto px-5 sm:px-8 pb-20 sm:pb-28">
              <SectionHeader
                kicker={`${region.name} · Featured Destinations`}
                title={region.featured.title}
                description={region.featured.description}
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

            {regionPackages.length > 0 && (
              <section className="bg-ink-900 py-20 sm:py-28 border-y border-white/5">
                <div className="max-w-[1440px] mx-auto px-5 sm:px-8">
                  <SectionHeader
                    kicker={`${region.name} · Featured Packages`}
                    title={region.packages.title}
                    description={region.packages.description}
                    action={
                      <Button as={Link} to="/packages" variant="outline" size="sm">
                        View All Packages <ArrowRight size={15} />
                      </Button>
                    }
                  />
                  <div className="grid md:grid-cols-3 gap-6">
                    {regionPackages.map((p) => (
                      <PackageCard key={p.id} pkg={p} />
                    ))}
                  </div>
                </div>
              </section>
            )}
          </>
        )}

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
              <img src={region.image} alt={`${region.name} landscape`} className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-ink-950/25" />
            </div>
          </div>
        </section>

        {attractions.length > 0 && (
          <section className="bg-ink-900 py-20 sm:py-28 border-y border-white/5">
            <div className="max-w-[1440px] mx-auto px-5 sm:px-8">
              <SectionHeader kicker={`${region.name} · Popular Attractions`} title={region.attractions.title} align="left" />
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {attractions.map((a) => (
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
        )}

        <section className="max-w-[1440px] mx-auto px-5 sm:px-8 py-20 sm:py-28">
          <SectionHeader kicker="Why Travel With Us" title={region.why.title} align="left" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {region.why.items.map(({ title, desc }, i) => {
              const Icon = whyIcons[i % whyIcons.length];
              return (
                <div key={title} className="p-6 rounded-2xl border border-white/5 bg-ink-850">
                  <span className="inline-flex h-11 w-11 rounded-xl bg-moss-500/10 items-center justify-center text-moss-400 mb-5">
                    <Icon size={19} />
                  </span>
                  <h4 className="font-display text-lg text-mist-100 mb-2">{title}</h4>
                  <p className="text-mist-400 text-sm font-body leading-relaxed">{desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="relative py-24 sm:py-32 overflow-hidden">
          <img src={region.ctaImage} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-ink-950/80" />
          <div className="relative max-w-3xl mx-auto text-center px-5">
            <div className="flex items-center justify-center gap-1 text-gold-400 mb-5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={16} fill="currentColor" />
              ))}
            </div>
            <h2 className="font-display text-3xl sm:text-4xl text-mist-100 mb-5">{region.cta.title}</h2>
            <p className="text-mist-300 font-body mb-9 max-w-lg mx-auto">{region.cta.description}</p>
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
    </div>
  );
}
