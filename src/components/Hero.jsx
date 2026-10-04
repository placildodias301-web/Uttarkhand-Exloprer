import { Link } from "react-router-dom";
import SmartImage from "./SmartImage";

// Cinematic hero shared by the section pages (/all, /uttarakhand, /goa,
// /combo). Content comes from src/data/sections.js.
//
// images: one image fills the frame; two images are split on a diagonal
// (mountains | coast). The public header floats over this hero, so the
// content is padded to clear it.
export default function Hero({ eyebrow, title, description, images = [], captions = [], actions = [], compact = false }) {
  const [first, second] = images;

  return (
    <section
      className={`relative isolate flex items-end overflow-hidden ${
        compact ? "min-h-[78vh] md:min-h-[82vh]" : "min-h-[100svh] md:min-h-[92vh]"
      }`}
    >
      <div className="absolute inset-0 -z-10">
        {first && (
          <SmartImage
            src={first.src}
            alt={first.alt}
            position={first.position}
            priority
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
        {second && (
          <div className="absolute inset-y-0 right-0 w-[58%] md:w-[52%] [clip-path:polygon(22%_0,100%_0,100%_100%,0_100%)]">
            <SmartImage
              src={second.src}
              alt={second.alt}
              position={second.position}
              priority
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-ink-950/30 to-transparent" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/45 to-ink-950/35" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950/80 via-ink-950/25 to-transparent" />
      </div>

      {second && captions.length === 2 && (
        <div className="absolute top-[150px] md:top-[160px] inset-x-0 pointer-events-none hidden sm:block">
          <div className="max-w-[1440px] mx-auto px-5 sm:px-8 flex justify-between">
            <span className="font-body text-[11px] font-semibold tracking-[0.2em] uppercase text-mist-100/70">{captions[0]}</span>
            <span className="font-body text-[11px] font-semibold tracking-[0.2em] uppercase text-mist-100/70">{captions[1]}</span>
          </div>
        </div>
      )}

      <div className="relative max-w-[1440px] mx-auto w-full px-5 sm:px-8 pt-[150px] md:pt-[170px] pb-16 sm:pb-24">
        <div className="max-w-3xl animate-fadeUp">
          {eyebrow && (
            <p className="font-body text-[12px] sm:text-[13px] font-semibold tracking-[0.24em] uppercase text-gold-400 mb-5">
              {eyebrow}
            </p>
          )}
          <h1 className="font-display text-[2.6rem] leading-[1.04] sm:text-6xl lg:text-7xl text-mist-100 mb-6 [text-wrap:balance]">
            {title}
          </h1>
          {description && (
            <p className="font-body text-mist-200/90 text-base sm:text-lg leading-relaxed max-w-xl mb-9">{description}</p>
          )}
          {actions.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {actions.map(({ label, to, primary, icon: Icon }) => {
                const isAnchor = to.startsWith("#");
                const Tag = isAnchor ? "a" : Link;
                const linkProps = isAnchor
                  ? {
                      href: to,
                      onClick: (e) => {
                        e.preventDefault();
                        document.getElementById(to.slice(1))?.scrollIntoView({ behavior: "smooth", block: "start" });
                      },
                    }
                  : { to };
                return (
                <Tag
                  key={label}
                  {...linkProps}
                  className={`inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-body text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-moss-500/70 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950 ${
                    primary
                      ? "bg-moss-500 text-ink-950 hover:bg-moss-400"
                      : "bg-ink-700/40 text-mist-100 border border-white/15 backdrop-blur-md hover:bg-ink-700/60 hover:border-white/30"
                  }`}
                >
                  {Icon && <Icon size={16} aria-hidden="true" />} {label}
                </Tag>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
