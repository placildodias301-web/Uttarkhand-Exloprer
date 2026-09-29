import { Mountain } from "lucide-react";
import { useSiteSettings } from "../services/siteSettings";

export default function BrandMark({ size = 26 }) {
  const { settings } = useSiteSettings();
  const { siteName, logoDataUrl } = settings.general;
  const [firstWord, ...rest] = siteName.split(" ");
  const restText = rest.join(" ");

  return (
    <span className="flex items-center gap-2">
      {logoDataUrl ? (
        <img src={logoDataUrl} alt={siteName} style={{ height: size, width: size }} className="rounded-md object-cover" />
      ) : (
        <Mountain className="text-moss-400" size={size} strokeWidth={2.2} />
      )}
      <span className="font-display text-lg sm:text-xl text-mist-200">
        {firstWord} {restText && <span className="text-moss-400 italic">{restText}</span>}
      </span>
    </span>
  );
}
