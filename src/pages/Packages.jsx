import SectionHeader from "../components/SectionHeader";
import PackageCard from "../components/PackageCard";
import { packages } from "../data/packages";

export default function Packages() {
  return (
    <div className="max-w-[1440px] mx-auto px-5 sm:px-8 py-16 sm:py-20">
      <SectionHeader
        kicker="Tour Packages"
        title="Ready-made routes, fully itemised"
        description="Each package comes with a day-by-day plan — hotel, meals and transport already worked out. Use one as-is, or add its stops to your own itinerary."
      />
      <div className="grid md:grid-cols-3 gap-6">
        {packages.map((p) => (
          <PackageCard key={p.id} pkg={p} />
        ))}
      </div>
    </div>
  );
}
