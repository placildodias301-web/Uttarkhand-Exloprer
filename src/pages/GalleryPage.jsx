import { useState } from "react";
import { Camera } from "lucide-react";
import SectionHeader from "../components/SectionHeader";
import Gallery from "../components/Gallery";
import ShareTravelPhotoModal from "../components/ShareTravelPhotoModal";

export default function GalleryPage() {
  const [shareOpen, setShareOpen] = useState(false);

  return (
    <div className="max-w-[1440px] mx-auto px-5 sm:px-8 py-16 sm:py-20">
      <SectionHeader
        kicker="Gallery"
        title="Uttarakhand in pictures"
        description="Filter by destination and tap any image for a closer look."
        action={
          <button
            onClick={() => setShareOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-moss-500 text-ink-950 text-sm font-body font-semibold hover:bg-moss-400 transition-colors"
          >
            <Camera size={15} /> Share Your Travel Photo
          </button>
        }
      />
      <Gallery />
      <ShareTravelPhotoModal open={shareOpen} onClose={() => setShareOpen(false)} />
    </div>
  );
}
