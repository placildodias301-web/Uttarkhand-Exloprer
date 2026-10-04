import { useEffect } from "react";
import { useSiteSettings } from "../services/siteSettings";

// Applies Admin → General Settings to the browser tab: title and favicon.
const DEFAULT_FAVICON = "/peak-palm.svg";

export default function SiteMeta() {
  const { settings } = useSiteSettings();
  const { siteName, tagline, faviconDataUrl } = settings.general;

  useEffect(() => {
    document.title = tagline ? `${siteName} — ${tagline.replace(/\.$/, "")}` : siteName;
  }, [siteName, tagline]);

  useEffect(() => {
    const link = document.getElementById("site-favicon");
    if (!link) return;
    link.href = faviconDataUrl || DEFAULT_FAVICON;
    link.type = faviconDataUrl?.startsWith("data:image/svg") || !faviconDataUrl ? "image/svg+xml" : "image/png";
  }, [faviconDataUrl]);

  return null;
}
