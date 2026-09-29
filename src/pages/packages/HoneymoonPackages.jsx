import SectionHeader from "../../components/SectionHeader";

const ITINERARIES = [
  {
    title: "Chopta – Auli",
    desc: "Meadows, Tungnath trek, Chandrashila summit and Auli alpine views.",
    href: "/itineraries/honeymoon/chopta-auli.html",
    image: "/itineraries/honeymoon/images/Chopta.jpg",
  },
  {
    title: "Chopta – Auli (Dark theme)",
    desc: "Same route map in the dark interactive style.",
    href: "/itineraries/honeymoon/chopta-auli-dark.html",
    image: "/itineraries/honeymoon/images/Auli.jpg",
  },
  {
    title: "Nainital Honeymoon",
    desc: "Romantic Nainital and nearby lakes circuit.",
    href: "/itineraries/honeymoon/nainital-honeymoon.html",
    image: "/itineraries/honeymoon/images/BhimtalLake.webp",
  },
  {
    title: "Delhi – Kumaon Honeymoon",
    desc: "Extended Kumaon honeymoon route from Delhi.",
    href: "/itineraries/honeymoon/delhi-kumaon.html",
    image: "/itineraries/honeymoon/images/Kausani.webp",
  },
];

export default function HoneymoonPackages() {
  return (
    <div className="max-w-[1200px] mx-auto px-5 sm:px-8 py-16 sm:py-20 min-h-[55vh]">
      <SectionHeader
        kicker="Packages"
        title="Honeymoon Packages"
        description="Romantic hill stations, meadows and quiet stays across Uttarakhand."
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