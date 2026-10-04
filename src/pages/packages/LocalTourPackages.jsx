import SectionHeader from "../../components/SectionHeader";

const ITINERARIES = [
  {
    title: "Haridwar – Rishikesh – Dehradun",
    desc: "Classic Doon valley circuit: Ganga aarti, rafting, temples and valley sights.",
    href: "/itineraries/local-tours/haridwar-rishikesh-dehradun.html",
    image: "/itineraries/local-tours/images/HarKiPauriGhatAarti.jpg",
  },
  {
    title: "Mussoorie – Dhanaulti",
    desc: "Hill station loop with viewpoints, eco parks and short treks.",
    href: "/itineraries/local-tours/mussoorie-dhanaulti.html",
    image: "/itineraries/local-tours/images/MussoorieBase.jpg",
  },
];

export default function LocalTourPackages() {
  return (
    <div className="max-w-[1200px] mx-auto px-5 sm:px-8 py-16 sm:py-20 min-h-[55vh]">
      <SectionHeader
        kicker="Packages"
        title="Local Tour Packages"
        description="Short, regional trips within a single area — easy to combine with a longer stay."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-10">
        {ITINERARIES.map((item) => (
        <a
  key={item.href}
  href={item.href}
  className="group rounded-2xl overflow-hidden border border-white/5 ..."
>
            <div className="h-44 w-full overflow-hidden bg-ink-800">
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