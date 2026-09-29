import SectionHeader from "../../components/SectionHeader";

const ITINERARIES = [
  {
    title: "Haridwar – Chopta – Tungnath",
    desc: "Pilgrimage + trek: Haridwar to Chopta base and Tungnath temple.",
    href: "/itineraries/uttarakhand-tours/haridwar-chopta-tungnath.html",
    image: "/itineraries/uttarakhand-tours/images/Haridwar.jpg",
  },
  {
    title: "Dehradun – Chakrata",
    desc: "Scenic hill drive from Dehradun to Chakrata viewpoints and forests.",
    href: "/itineraries/uttarakhand-tours/dehradun-chakrata.html",
    image: "/itineraries/uttarakhand-tours/images/Chakrata3.jpg",
  },
  {
    title: "Delhi – Nainital – Kumaon",
    desc: "Classic Kumaon lakes and hill towns from Delhi.",
    href: "/itineraries/uttarakhand-tours/delhi-nainital-kumaon.html",
    image: "/itineraries/uttarakhand-tours/images/Bhimtal.webp",
  },
];

export default function UttarakhandTourPackages() {
  return (
    <div className="max-w-[1200px] mx-auto px-5 sm:px-8 py-16 sm:py-20 min-h-[55vh]">
      <SectionHeader
        kicker="Packages"
        title="Uttarakhand Tours"
        description="Scenic circuits across Garhwal and Kumaon — from Dehradun to the hills."
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