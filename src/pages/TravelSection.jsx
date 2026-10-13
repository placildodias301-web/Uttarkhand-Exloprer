import { useLayoutEffect } from "react";
import Home from "./Home";
import RegionPage from "./sections/RegionPage";
import ComboPage from "./sections/ComboPage";
import { selectTravelSection } from "../services/travelSection";

// Route element for /all, /uttarakhand, /goa and /combo. Opening a section
// URL (link, bookmark, back/forward) makes it the active travel section, so
// the top navigation and the shared list pages follow it.
export default function TravelSection({ sectionId }) {
  useLayoutEffect(() => {
    selectTravelSection(sectionId);
  }, [sectionId]);

  if (sectionId === "uttarakhand" || sectionId === "goa") return <RegionPage key={sectionId} regionId={sectionId} />;
  if (sectionId === "combo") return <ComboPage />;
  return <Home />;
}
