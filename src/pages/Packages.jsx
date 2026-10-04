import PageIntro from "../components/PageIntro";
import PackageCard from "../components/PackageCard";
import RegionTabs from "../components/RegionTabs";
import { useListRegion } from "../services/travelSection";
import { usePublicPackages } from "../services/content";
import { contentRegionNames, normalizeRegion } from "../data/regions";

export default function Packages() {
  const region = useListRegion({ includeCombo: true });
  const packages = usePublicPackages("all");
  const groups = contentRegionNames
    .filter((name) => region === "all" || normalizeRegion(name) === region)
    .map((name) => ({ name, items: packages.filter((p) => normalizeRegion(p.region) === normalizeRegion(name)) }))
    .filter((g) => g.items.length > 0 || region !== "all");

  return (
    <div className="max-w-[1440px] mx-auto px-5 sm:px-8 py-14 sm:py-20">
      <PageIntro
        kicker="Packages"
        title="Ready-made routes, fully itemised"
        description="Each package comes with a day-by-day plan — stays, meals and transport already worked out. Use one as-is, or add its stops to your own trip."
      >
        <RegionTabs includeCombo />
      </PageIntro>

      {groups.map(({ name, items }) => (
        <section key={name} className="mb-16 last:mb-0" aria-labelledby={`pkg-${name}`}>
          <h2 id={`pkg-${name}`} className="font-display text-3xl text-mist-100 mb-6">
            {name === "Combo" ? "Uttarakhand + Goa" : name}
          </h2>
          {items.length === 0 ? (
            <p className="text-mist-400 font-body text-sm">No {name} packages are published right now.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {items.map((p) => (
                <PackageCard key={p.id} pkg={p} />
              ))}
            </div>
          )}
        </section>
      ))}
    </div>
  );
}
