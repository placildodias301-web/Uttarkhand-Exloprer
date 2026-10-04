import { Mountain } from "lucide-react";
import { useSiteSettings } from "../services/siteSettings";

// Small brand glyph: a ridge line over a wave — peaks to palms.
function PeakPalmGlyph({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path
        d="M3 21.5 11 10l4.5 6.2L19 12l10 9.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 26c2.2-1.6 4.4-1.6 6.6 0s4.4 1.6 6.6 0 4.4-1.6 6.6 0 2.9 1.2 4.2.6"
        stroke="#E7C98B"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Renders the site name, with any "&" picked out in the warm accent.
function BrandName({ name }) {
  const parts = name.split("&");
  return parts.map((part, i) => (
    <span key={i}>
      {part}
      {i < parts.length - 1 && <span className="text-pp-sand">&amp;</span>}
    </span>
  ));
}

// variant="default" — original look, used by the Footer.
// variant="nav"     — Peak & Palm brand lockup for the two-row navbar.
export default function BrandMark({ size = 26, variant = "default" }) {
  const { settings } = useSiteSettings();
  const { siteName, tagline, logoDataUrl } = settings.general;

  if (variant === "nav") {
    return (
      <span className="flex items-center gap-3 min-w-0">
        <span className="h-10 w-10 shrink-0 rounded-xl border border-white/10 bg-pp-glass/60 flex items-center justify-center text-pp-accent">
          {logoDataUrl ? (
            <img src={logoDataUrl} alt="" className="h-7 w-7 rounded-md object-cover" />
          ) : (
            <PeakPalmGlyph size={24} />
          )}
        </span>
        <span className="flex flex-col min-w-0 leading-none">
          <span className="font-heading font-semibold text-[17px] sm:text-[19px] tracking-[0.14em] uppercase text-pp-text whitespace-nowrap">
            <BrandName name={siteName} />
          </span>
          {tagline && (
            <span className="hidden sm:block font-ui text-[11px] text-pp-muted/80 mt-1.5 tracking-wide whitespace-nowrap">
              {tagline}
            </span>
          )}
        </span>
      </span>
    );
  }

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
