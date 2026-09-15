import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X, Search, Mountain, MapPinned, ChevronDown } from "lucide-react";
import Button from "./Button";
import SearchBar from "./SearchBar";
import { useItinerary } from "../context/ItineraryContext";
import { packageCategories } from "../data/packageCategories";

const links = [
  { to: "/", label: "Home" },
  { to: "/destinations", label: "Destinations" },
  { to: "/itinerary", label: "Itinerary" },
  { to: "/hotels-food", label: "Hotels & Food" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [packagesOpen, setPackagesOpen] = useState(false);
  const [mobilePackagesOpen, setMobilePackagesOpen] = useState(false);
  const packagesRef = useRef(null);
  const navigate = useNavigate();
  const { days } = useItinerary();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), []);

  useEffect(() => {
    const onClickOutside = (e) => {
      if (packagesRef.current && !packagesRef.current.contains(e.target)) {
        setPackagesOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-ink-950/90 backdrop-blur-md border-b border-white/5" : "bg-gradient-to-b from-ink-950/80 to-transparent"
      }`}
    >
      <nav className="max-w-[1440px] mx-auto flex items-center justify-between gap-4 px-5 sm:px-8 h-[72px]">
        <NavLink to="/" className="flex items-center gap-2 shrink-0">
          <Mountain className="text-moss-400" size={26} strokeWidth={2.2} />
          <span className="font-display text-lg sm:text-xl text-mist-200">
            Uttarakhand <span className="text-moss-400 italic">Explorer</span>
          </span>
        </NavLink>

        <div className="hidden lg:flex items-center gap-7 font-body text-[15px]">
          <NavLink
            to="/destinations"
            className={({ isActive }) =>
              `relative py-2 transition-colors ${isActive ? "text-moss-400" : "text-mist-300 hover:text-mist-200"}`
            }
          >
            Destinations
          </NavLink>

          <div className="relative" ref={packagesRef}>
            <button
              onClick={() => setPackagesOpen((v) => !v)}
              className="relative py-2 flex items-center gap-1 text-mist-300 hover:text-mist-200 transition-colors"
            >
              Packages
              <ChevronDown size={14} className={`transition-transform ${packagesOpen ? "rotate-180" : ""}`} />
            </button>

            {packagesOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 rounded-xl border border-white/10 bg-ink-900 shadow-card overflow-hidden py-2 animate-fadeUp">
                <button
                  onClick={() => {
                    navigate("/packages");
                    setPackagesOpen(false);
                  }}
                  className="w-full text-left px-4 py-2.5 text-sm font-body font-semibold text-mist-100 hover:bg-white/5 border-b border-white/5 mb-1"
                >
                  All Packages
                </button>
                {packageCategories.map((c) => (
                  <button
                    key={c.path}
                    onClick={() => {
                      navigate(c.path);
                      setPackagesOpen(false);
                    }}
                    className="w-full text-left px-4 py-2.5 text-sm font-body text-mist-300 hover:bg-white/5 hover:text-moss-300"
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {links.slice(2).map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `relative py-2 transition-colors ${
                  isActive ? "text-moss-400" : "text-mist-300 hover:text-mist-200"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {l.label}
                  {isActive && (
                    <span className="absolute left-0 right-0 -bottom-[1px] h-[2px] bg-moss-400 rounded-full" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={() => setSearchOpen(true)}
            className="h-10 w-10 flex items-center justify-center rounded-full border border-white/10 text-mist-300 hover:text-moss-400 hover:border-moss-500/40 transition-colors"
            aria-label="Search"
          >
            <Search size={17} />
          </button>
          <Button as={NavLink} to="/itinerary" variant="outline" size="sm" className="relative">
            <MapPinned size={16} /> Plan My Trip
            {days > 0 && (
              <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-moss-500 text-ink-950 text-[11px] font-bold flex items-center justify-center">
                {days}
              </span>
            )}
          </Button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => setSearchOpen(true)}
            className="h-10 w-10 flex items-center justify-center rounded-full border border-white/10 text-mist-300"
            aria-label="Search"
          >
            <Search size={17} />
          </button>
          <button
            onClick={() => setOpen((v) => !v)}
            className="h-10 w-10 flex items-center justify-center rounded-full border border-white/10 text-mist-200"
            aria-label="Menu"
          >
            {open ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="lg:hidden bg-ink-900 border-t border-white/5 px-5 py-4 flex flex-col gap-1 animate-fadeUp">
          <NavLink
            to="/destinations"
            onClick={() => setOpen(false)}
            className={({ isActive }) => `py-2.5 px-2 rounded-lg font-body ${isActive ? "text-moss-400 bg-white/5" : "text-mist-300"}`}
          >
            Destinations
          </NavLink>

          <div>
            <button
              onClick={() => setMobilePackagesOpen((v) => !v)}
              className="w-full flex items-center justify-between py-2.5 px-2 rounded-lg font-body text-mist-300"
            >
              Packages
              <ChevronDown size={15} className={`transition-transform ${mobilePackagesOpen ? "rotate-180" : ""}`} />
            </button>
            {mobilePackagesOpen && (
              <div className="pl-4 flex flex-col gap-0.5 mb-1">
                <NavLink
                  to="/packages"
                  onClick={() => setOpen(false)}
                  className="py-2 px-2 rounded-lg font-body text-sm text-mist-300"
                >
                  All Packages
                </NavLink>
                {packageCategories.map((c) => (
                  <NavLink
                    key={c.path}
                    to={c.path}
                    onClick={() => setOpen(false)}
                    className="py-2 px-2 rounded-lg font-body text-sm text-mist-300"
                  >
                    {c.label}
                  </NavLink>
                ))}
              </div>
            )}
          </div>

          {links.slice(2).map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `py-2.5 px-2 rounded-lg font-body ${
                  isActive ? "text-moss-400 bg-white/5" : "text-mist-300"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <Button as={NavLink} to="/itinerary" onClick={() => setOpen(false)} variant="primary" size="md" className="mt-3 w-full">
            <MapPinned size={16} /> Plan My Trip {days > 0 ? `(${days})` : ""}
          </Button>
        </div>
      )}

      <SearchBar open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}