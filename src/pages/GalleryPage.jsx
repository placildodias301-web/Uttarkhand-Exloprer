import { useState } from "react";
import { Camera } from "lucide-react";
import PageIntro from "../components/PageIntro";
import Gallery from "../components/Gallery";
import ShareTravelPhotoModal from "../components/ShareTravelPhotoModal";
import { useListRegion } from "../services/travelSection";

export default function GalleryPage() {
  const [shareOpen, setShareOpen] = useState(false);
  const region = useListRegion();

  return (
    <div className="max-w-[1440px] mx-auto px-5 sm:px-8 py-14 sm:py-20">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-2">
        <PageIntro
          kicker="Gallery"
          title="Uttarakhand and Goa in pictures"
          description="Destination photos and pictures shared by travellers. Filter by region and tap any photo to see it larger."
        />
        <button
          onClick={() => setShareOpen(true)}
          className="self-start sm:self-auto sm:mb-12 shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-full bg-moss-500 text-ink-950 text-sm font-body font-semibold hover:bg-moss-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-moss-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
        >
          <Camera size={16} aria-hidden="true" /> Share your travel photo
        </button>
      </div>
      <Gallery initialRegion={region} />
      <ShareTravelPhotoModal open={shareOpen} onClose={() => setShareOpen(false)} />
    </div>
  );
}
