import SectionHeader from "../components/SectionHeader";
import PackageCard from "../components/PackageCard";
import RegionTabs from "../components/RegionTabs";
import { usePackages } from "../services/content";
import { useRegion } from "../services/region";

export default function Packages() {
  const packages = usePackages();
  const { region } = useRegion();
  const regionPackages = packages.filter((p) => p.region === region.name);

  return (
    <div className="max-w-[1440px] mx-auto px-5 sm:px-8 py-16 sm:py-20">
      <SectionHeader
        kicker={`${region.name} Packages`}
        title="Ready-made routes, fully itemised"
        description="Each package comes with a day-by-day plan — hotel, meals and transport already worked out. Use one as-is, or add its stops to your own itinerary."
      />
      <RegionTabs className="mb-8" />
      {regionPackages.length === 0 ? (
        <p className="text-mist-400 font-body text-sm">No packages in {region.name} yet — coming soon.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {regionPackages.map((p) => (
            <PackageCard key={p.id} pkg={p} />
          ))}
        </div>
      )}
    </div>
  );
}
