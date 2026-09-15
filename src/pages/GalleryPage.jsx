import SectionHeader from "../components/SectionHeader";
import Gallery from "../components/Gallery";

export default function GalleryPage() {
  return (
    <div className="max-w-[1440px] mx-auto px-5 sm:px-8 py-16 sm:py-20">
      <SectionHeader
        kicker="Gallery"
        title="Uttarakhand in pictures"
        description="Filter by destination and tap any image for a closer look."
      />
      <Gallery />
    </div>
  );
}
