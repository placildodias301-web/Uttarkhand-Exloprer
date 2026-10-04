import { useState } from "react";
import { ImageOff } from "lucide-react";

// Image with graceful failure handling, used for every content image.
// - Lazy-loads by default (pass priority for above-the-fold heroes).
// - If `src` fails and `fallbackSrc` is given, tries that once.
// - If nothing loads (or there is no src), renders a quiet gradient panel of
//   the same size instead of the browser's broken-image icon.
// `className` is applied to the image (or the fallback panel), so layout
// classes like "absolute inset-0 h-full w-full object-cover" keep working.
export default function SmartImage({
  src,
  fallbackSrc,
  alt = "",
  className = "",
  position,
  priority = false,
  showLabel = false,
  ...rest
}) {
  const candidates = [src, fallbackSrc].filter(Boolean);
  const key = candidates.join("|");
  const [state, setState] = useState({ key, index: 0, failed: candidates.length === 0, loaded: false });

  // Reset when the source changes (e.g. admin swaps an image).
  const current = state.key === key ? state : { key, index: 0, failed: candidates.length === 0, loaded: false };
  if (current !== state) setState(current);

  if (current.failed) {
    return (
      <div
        role={alt ? "img" : undefined}
        aria-label={alt || undefined}
        className={`${className} flex items-center justify-center bg-gradient-to-br from-ink-700 via-ink-850 to-ink-950`}
      >
        <span className="flex flex-col items-center gap-1.5 text-mist-400/70">
          <ImageOff size={20} strokeWidth={1.6} aria-hidden="true" />
          {showLabel && alt && <span className="font-body text-[11px] px-3 text-center line-clamp-2">{alt}</span>}
        </span>
      </div>
    );
  }

  return (
    <img
      src={candidates[current.index]}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchpriority={priority ? "high" : undefined}
      onLoad={() => setState((s) => (s.key === key ? { ...s, loaded: true } : s))}
      onError={() =>
        setState((s) => {
          if (s.key !== key) return s;
          return s.index + 1 < candidates.length ? { ...s, index: s.index + 1 } : { ...s, failed: true };
        })
      }
      style={position ? { objectPosition: position } : undefined}
      className={`${className} transition-opacity duration-500 ${current.loaded ? "opacity-100" : "opacity-0"} bg-ink-850`}
      {...rest}
    />
  );
}
