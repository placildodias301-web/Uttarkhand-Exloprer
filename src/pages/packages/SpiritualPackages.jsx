import SectionHeader from "../../components/SectionHeader";
import ComingSoonBlock from "../../components/ComingSoonBlock";

export default function SpiritualPackages() {
  return (
    <div className="max-w-[1200px] mx-auto px-5 sm:px-8 py-16 sm:py-20 min-h-[55vh]">
      <SectionHeader
        kicker="Packages"
        title="Spiritual Packages"
        description="Char Dham circuits, temple towns, and pilgrimage-focused itineraries."
      />
      <ComingSoonBlock />
    </div>
  );
}