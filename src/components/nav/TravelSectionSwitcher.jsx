import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { travelSections } from "../../data/navigation";
import { selectTravelSection } from "../../services/travelSection";

// Row 1 of the navbar: ALL | UTTARAKHAND | GOA | COMBO.
// Each item is a route (/all, /uttarakhand, /goa, /combo), not a filter.
export default function TravelSectionSwitcher({ activeId, className = "" }) {
  const scrollerRef = useRef(null);
  const activeRef = useRef(null);

  // On narrow screens the row scrolls — keep the active section in view.
  useEffect(() => {
    const scroller = scrollerRef.current;
    const active = activeRef.current;
    if (!scroller || !active || scroller.scrollWidth <= scroller.clientWidth) return;
    const left = active.offsetLeft - (scroller.clientWidth - active.offsetWidth) / 2;
    scroller.scrollTo({ left, behavior: "smooth" });
  }, [activeId]);

  return (
    <nav aria-label="Travel sections" className={`min-w-0 ${className}`}>
      <div ref={scrollerRef} className="no-scrollbar overflow-x-auto">
        <ul className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-pp-deep/50 p-1 whitespace-nowrap">
          {travelSections.map((s) => {
            const active = s.id === activeId;
            return (
              <li key={s.id} ref={active ? activeRef : undefined}>
                <Link
                  to={s.path}
                  onClick={() => selectTravelSection(s.id)}
                  aria-current={active ? "page" : undefined}
                  className={`block rounded-full px-3.5 sm:px-4 py-2 font-ui text-[11.5px] sm:text-[12px] font-semibold uppercase tracking-[0.14em] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-pp-accent/70 ${
                    active
                      ? "bg-pp-accent/[0.12] text-pp-aqua shadow-pp-active"
                      : "text-pp-muted hover:text-pp-text hover:bg-white/[0.06]"
                  }`}
                >
                  {s.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
