import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Search, MapPinned, ChevronDown } from "lucide-react";
import SearchBar from "./SearchBar";
import BrandMark from "./BrandMark";
import TravelSectionSwitcher from "./nav/TravelSectionSwitcher";
import { useItinerary } from "../context/ItineraryContext";
import { useActiveSection } from "../services/travelSection";
import { useHeaderOverlayActive } from "../hooks/useOverlayHeader";
import { packageCategories } from "../data/packageCategories";
import { mainNavLinks, planTripLink, sectionFromPath } from "../data/navigation";

function isLinkActive(link, pathname) {
  if (link.id === "home") return pathname === "/" || Boolean(sectionFromPath(pathname));
  return pathname === link.to || pathname.startsWith(`${link.to}/`);
}

export default function Navbar() {
  const { pathname } = useLocation();
  const { days } = useItinerary();
  const activeSection = useActiveSection();
  // Pages with a full-bleed hero ask the header to float over them.
  const overlay = useHeaderOverlayActive();

  const [scrolled, setScrolled] = useState(() => typeof window !== "undefined" && window.scrollY > 12);
  const [searchOpen, setSearchOpen] = useState(false);
  // Menus remember the path they were opened on, so they close on navigation
  // without needing an effect.
  const [mobileMenuPath, setMobileMenuPath] = useState(null);
  const [mobilePackagesOpen, setMobilePackagesOpen] = useState(false);
  const mobileMenuOpen = mobileMenuPath === pathname;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const hrefFor = (link) => (link.id === "home" ? activeSection.path : link.to);
  const closeMobileMenu = () => setMobileMenuPath(null);

  return (
    <>
      <header className={`${overlay ? "fixed inset-x-0" : "sticky"} top-0 z-50`}>
        <div
          className={`backdrop-saturate-150 border-b transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 ${
            scrolled || mobileMenuOpen
              ? "bg-pp-deep/90 backdrop-blur-xl border-white/10 shadow-pp-glass"
              : overlay
                ? "bg-gradient-to-b from-pp-deep/70 to-pp-deep/20 backdrop-blur-[6px] border-white/[0.07]"
                : "bg-pp-deep/80 backdrop-blur-xl border-white/[0.06]"
          }`}
        >
          {/* ---------- Row 1: brand + travel section selector ---------- */}
          <div className="max-w-[1440px] mx-auto px-4 sm:px-8 h-16 md:h-[68px] flex items-center gap-4 md:gap-8">
            <Link
              to={activeSection.path}
              className="shrink-0 min-w-0 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-pp-accent/70"
              aria-label="Peak & Palm home"
            >
              <BrandMark variant="nav" />
            </Link>

            <TravelSectionSwitcher activeId={activeSection.id} className="hidden md:block ml-auto" />

            <div className="ml-auto flex items-center gap-2 md:hidden">
              <IconButton onClick={() => setSearchOpen(true)} label="Search">
                <Search size={17} />
              </IconButton>
              <IconButton
                onClick={() => setMobileMenuPath(mobileMenuOpen ? null : pathname)}
                label={mobileMenuOpen ? "Close menu" : "Open menu"}
                expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X size={19} /> : <Menu size={19} />}
              </IconButton>
            </div>
          </div>

          {/* Mobile: the section selector gets its own scrollable strip. */}
          <div className="md:hidden px-4 pb-3">
            <TravelSectionSwitcher activeId={activeSection.id} />
          </div>

          {/* ---------- Row 2: main site navigation (tablet & desktop) ---------- */}
          <div className={`hidden md:block border-t border-white/[0.07] transition-colors ${overlay && !scrolled ? "bg-white/[0.03]" : "bg-pp-glass/25"}`}>
            <div className="max-w-[1440px] mx-auto px-4 sm:px-8 h-[52px] flex items-center gap-4">
              <nav
                aria-label="Main"
                className="min-w-0 flex-1 no-scrollbar overflow-x-auto [mask-image:linear-gradient(to_right,black_calc(100%-2rem),transparent)] lg:[mask-image:none]"
              >
                <ul className="flex items-center gap-0.5 whitespace-nowrap pr-8 lg:pr-0">
                  {mainNavLinks.map((link) => (
                    <li key={link.id}>
                      {link.menu === "packages" ? (
                        <PackagesMenu active={isLinkActive(link, pathname)} label={link.label} pathname={pathname} />
                      ) : (
                        <DesktopLink to={hrefFor(link)} active={isLinkActive(link, pathname)}>
                          {link.label}
                        </DesktopLink>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setSearchOpen(true)}
                  className="h-9 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-2.5 lg:px-3.5 font-ui text-[13px] text-pp-muted hover:text-pp-text hover:border-white/20 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-pp-accent/70"
                  aria-label="Search"
                >
                  <Search size={15} />
                  <span className="hidden lg:inline">Search</span>
                </button>
                <PlanTripButton days={days} active={pathname === planTripLink.to} />
              </div>
            </div>
          </div>

          {/* ---------- Mobile menu (second navigation level) ---------- */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-white/[0.07] bg-pp-teal/95 max-h-[calc(100dvh-7.5rem)] overflow-y-auto animate-fadeUp">
              <nav aria-label="Main" className="px-4 py-3">
                <ul className="flex flex-col">
                  {mainNavLinks.map((link) =>
                    link.menu === "packages" ? (
                      <li key={link.id}>
                        <button
                          onClick={() => setMobilePackagesOpen((v) => !v)}
                          aria-expanded={mobilePackagesOpen}
                          className={`w-full flex items-center justify-between py-3 px-3 rounded-xl font-ui text-[15px] ${
                            isLinkActive(link, pathname) ? "text-pp-aqua bg-white/[0.05]" : "text-pp-text/90"
                          }`}
                        >
                          {link.label}
                          <ChevronDown size={16} className={`transition-transform ${mobilePackagesOpen ? "rotate-180" : ""}`} />
                        </button>
                        {mobilePackagesOpen && (
                          <ul className="ml-3 pl-3 border-l border-white/10 mb-1">
                            <li>
                              <MobileLink to="/packages" active={pathname === "/packages"} onClick={closeMobileMenu} small>
                                All Packages
                              </MobileLink>
                            </li>
                            {packageCategories.map((c) => (
                              <li key={c.path}>
                                <MobileLink to={c.path} active={pathname === c.path} onClick={closeMobileMenu} small>
                                  {c.label}
                                </MobileLink>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ) : (
                      <li key={link.id}>
                        <MobileLink to={hrefFor(link)} active={isLinkActive(link, pathname)} onClick={closeMobileMenu}>
                          {link.label}
                        </MobileLink>
                      </li>
                    )
                  )}
                </ul>
                <div className="mt-3 pt-3 border-t border-white/[0.07]">
                  <PlanTripButton days={days} active={pathname === planTripLink.to} fullWidth onClick={closeMobileMenu} />
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Rendered outside the blurred header: an ancestor with backdrop-filter
          would otherwise trap this fixed-position modal inside the header box. */}
      <SearchBar open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}

function DesktopLink({ to, active, children }) {
  return (
    <Link
      to={to}
      aria-current={active ? "page" : undefined}
      className={`relative inline-flex items-center h-9 px-2.5 lg:px-3 rounded-full font-ui text-[13.5px] font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-pp-accent/70 ${
        active ? "text-pp-text" : "text-pp-muted hover:text-pp-text"
      }`}
    >
      {children}
      {active && <span className="absolute left-1/2 -translate-x-1/2 bottom-1 h-[2px] w-5 rounded-full bg-pp-accent" />}
    </Link>
  );
}

function MobileLink({ to, active, onClick, small = false, children }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={`block rounded-xl px-3 font-ui ${small ? "py-2.5 text-sm" : "py-3 text-[15px]"} ${
        active ? "text-pp-aqua bg-white/[0.05]" : "text-pp-text/90 hover:bg-white/[0.04]"
      }`}
    >
      {children}
    </Link>
  );
}

function IconButton({ onClick, label, expanded, children }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      aria-expanded={expanded}
      className="h-10 w-10 flex items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-pp-text/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-pp-accent/70"
    >
      {children}
    </button>
  );
}

function PlanTripButton({ days, active, fullWidth = false, onClick }) {
  return (
    <Link
      to={planTripLink.to}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={`relative inline-flex items-center justify-center gap-2 rounded-full bg-pp-accent text-pp-deep font-ui font-semibold text-[13px] px-4 h-9 hover:bg-pp-aqua transition-colors shadow-[0_8px_24px_-12px_rgba(45,226,197,0.7)] focus:outline-none focus-visible:ring-2 focus-visible:ring-pp-aqua focus-visible:ring-offset-2 focus-visible:ring-offset-pp-deep ${
        fullWidth ? "w-full h-11 text-sm" : ""
      }`}
    >
      <MapPinned size={15} /> {planTripLink.label}
      {days > 0 && (
        <span
          className="absolute -top-1.5 -right-1.5 h-5 min-w-5 px-1 rounded-full bg-pp-sand text-pp-deep text-[11px] font-bold flex items-center justify-center"
          aria-label={`${days} stops in your trip`}
        >
          {days}
        </span>
      )}
    </Link>
  );
}

// The existing Packages dropdown (All Packages + category pages). Its panel
// is portalled to <body> so the horizontally-scrollable nav row can't clip it.
function PackagesMenu({ label, active, pathname }) {
  const buttonRef = useRef(null);
  const panelRef = useRef(null);
  const [menu, setMenu] = useState(null); // { left, top, path } while open
  const open = menu !== null && menu.path === pathname;

  const toggle = () => {
    if (open) return setMenu(null);
    const rect = buttonRef.current.getBoundingClientRect();
    const panelWidth = 256;
    setMenu({
      left: Math.max(12, Math.min(rect.left, window.innerWidth - panelWidth - 12)),
      top: rect.bottom + 8,
      path: pathname,
    });
  };

  useEffect(() => {
    if (!open) return;
    const close = () => setMenu(null);
    const onPointerDown = (e) => {
      if (buttonRef.current?.contains(e.target) || panelRef.current?.contains(e.target)) return;
      close();
    };
    const onKey = (e) => e.key === "Escape" && close();
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKey);
    window.addEventListener("scroll", close, true); // page or nav-row scroll
    window.addEventListener("resize", close);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", close, true);
      window.removeEventListener("resize", close);
    };
  }, [open]);

  return (
    <>
      <button
        ref={buttonRef}
        onClick={toggle}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-current={active ? "page" : undefined}
        className={`relative inline-flex items-center gap-1 h-9 px-2.5 lg:px-3 rounded-full font-ui text-[13.5px] font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-pp-accent/70 ${
          active || open ? "text-pp-text" : "text-pp-muted hover:text-pp-text"
        }`}
      >
        {label}
        <ChevronDown size={14} className={`transition-transform ${open ? "rotate-180" : ""}`} />
        {active && <span className="absolute left-1/2 -translate-x-1/2 bottom-1 h-[2px] w-5 rounded-full bg-pp-accent" />}
      </button>

      {open &&
        createPortal(
          <div
            ref={panelRef}
            role="menu"
            style={{ left: menu.left, top: menu.top }}
            className="fixed z-[60] w-64 rounded-2xl border border-white/10 bg-pp-teal/95 backdrop-blur-xl shadow-pp-glass py-2 animate-fadeUp"
          >
            <MenuItem to="/packages" active={pathname === "/packages"} strong>
              All Packages
            </MenuItem>
            <div className="my-1 border-t border-white/[0.07]" />
            {packageCategories.map((c) => (
              <MenuItem key={c.path} to={c.path} active={pathname === c.path}>
                {c.label}
              </MenuItem>
            ))}
          </div>,
          document.body
        )}
    </>
  );
}

function MenuItem({ to, active, strong = false, children }) {
  return (
    <Link
      to={to}
      role="menuitem"
      className={`block px-4 py-2.5 font-ui text-sm transition-colors hover:bg-white/[0.05] ${
        active ? "text-pp-aqua" : strong ? "text-pp-text font-semibold" : "text-pp-muted hover:text-pp-text"
      }`}
    >
      {children}
    </Link>
  );
}
