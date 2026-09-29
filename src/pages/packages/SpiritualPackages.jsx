import SectionHeader from "../../components/SectionHeader";

const ITINERARIES = [
  {
    title: "Char Dham Yatra",
    desc: "Full Char Dham circuit — Yamunotri, Gangotri, Kedarnath & Badrinath.",
    href: "/itineraries/spiritual/chardham-yatra.html",
    image: "/itineraries/spiritual/images/Kedarnath.jpg",
  },
  {
    title: "Do Dham Yatra",
    desc: "Two sacred dhams in one focused pilgrimage.",
    href: "/itineraries/spiritual/dodham-yatra.html",
    image: "/itineraries/spiritual/images/Badrinath.webp",
  },
  {
    title: "Teen Dham Yatra",
    desc: "Three dhams circuit with temple towns and mountain roads.",
    href: "/itineraries/spiritual/teendham-yatra.html",
    image: "/itineraries/spiritual/images/Yamunotri.jpg",
  },
  {
    title: "Ek Dham Yatra",
    desc: "Single dham pilgrimage — focused and flexible.",
    href: "/itineraries/spiritual/ekdham-yatra.html",
    image: "/itineraries/spiritual/images/Gangotri.jpg",
  },
  {
    title: "Tungnath Yatra",
    desc: "Highest Shiva temple trek from Chopta to Tungnath & Chandrashila.",
    href: "/itineraries/spiritual/tungnath-yatra.html",
    image: "/itineraries/spiritual/images/tugnath.webp",
  },
  {
    title: "Winter Char Dham",
    desc: "Winter-season Char Dham with lower-altitude temples and accessible routes.",
    href: "/itineraries/spiritual/winter-char-dham.html",
    image: "/itineraries/spiritual/images/UkhimathWinter.jpg",
  },
];

export default function SpiritualPackages() {
  return (
    <div className="max-w-[1200px] mx-auto px-5 sm:px-8 py-16 sm:py-20 min-h-[55vh]">
      <SectionHeader
        kicker="Packages"
        title="Spiritual Packages"
        description="Char Dham circuits, temple towns, and pilgrimage-focused itineraries."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
        {ITINERARIES.map((item) => (
          <a
            key={item.href}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-2xl border border-white/10 bg-ink-900/80 overflow-hidden hover:border-emerald-400/40 hover:-translate-y-0.5 transition shadow-lg"
          >
            <div className="h-40 w-full overflow-hidden bg-ink-800">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="p-5">
              <h3 className="font-serif text-lg text-mist-100 mb-2">{item.title}</h3>
              <p className="text-sm text-mist-400 leading-relaxed mb-4">{item.desc}</p>
              <span className="text-emerald-400 text-xs font-bold uppercase tracking-wide">
                Open interactive map →
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}