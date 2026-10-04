
import SectionHeader from "../components/SectionHeader";
import { Link } from "react-router-dom";

const ALL_PACKAGES = [
  // Spiritual
  {
    category: "Spiritual",
    categoryPath: "/packages/spiritual",
    title: "Char Dham Yatra",
    desc: "Full Char Dham circuit — Yamunotri, Gangotri, Kedarnath & Badrinath.",
    href: "/itineraries/spiritual/chardham-yatra.html",
    image: "/itineraries/spiritual/images/Kedarnath.jpg",
  },
  {
    category: "Spiritual",
    categoryPath: "/packages/spiritual",
    title: "Do Dham Yatra",
    desc: "Two sacred dhams in one focused pilgrimage.",
    href: "/itineraries/spiritual/dodham-yatra.html",
    image: "/itineraries/spiritual/images/Badrinath.webp",
  },
  {
    category: "Spiritual",
    categoryPath: "/packages/spiritual",
    title: "Teen Dham Yatra",
    desc: "Three dhams circuit with temple towns and mountain roads.",
    href: "/itineraries/spiritual/teendham-yatra.html",
    image: "/itineraries/spiritual/images/Yamunotri.jpg",
  },
  {
    category: "Spiritual",
    categoryPath: "/packages/spiritual",
    title: "Ek Dham Yatra",
    desc: "Single dham pilgrimage — focused and flexible.",
    href: "/itineraries/spiritual/ekdham-yatra.html",
    image: "/itineraries/spiritual/images/Gangotri.jpg",
  },
  {
    category: "Spiritual",
    categoryPath: "/packages/spiritual",
    title: "Tungnath Yatra",
    desc: "Highest Shiva temple trek from Chopta to Tungnath & Chandrashila.",
    href: "/itineraries/spiritual/tungnath-yatra.html",
    image: "/itineraries/spiritual/images/tugnath.webp",
  },
  {
    category: "Spiritual",
    categoryPath: "/packages/spiritual",
    title: "Winter Char Dham",
    desc: "Winter-season Char Dham with lower-altitude temples.",
    href: "/itineraries/spiritual/winter-char-dham.html",
    image: "/itineraries/spiritual/images/UkhimathWinter.jpg",
  },
  // Local tours
  {
    category: "Local Tours",
    categoryPath: "/packages/local-tours",
    title: "Haridwar – Rishikesh – Dehradun",
    desc: "Classic Doon valley circuit: Ganga aarti, rafting, temples.",
    href: "/itineraries/local-tours/haridwar-rishikesh-dehradun.html",
    image: "/itineraries/local-tours/images/HarKiPauriGhatAarti.jpg",
  },
  {
    category: "Local Tours",
    categoryPath: "/packages/local-tours",
    title: "Mussoorie – Dhanaulti",
    desc: "Hill station loop with viewpoints, eco parks and short treks.",
    href: "/itineraries/local-tours/mussoorie-dhanaulti.html",
    image: "/itineraries/local-tours/images/MussoorieBase.jpg",
  },
  // Honeymoon
  {
    category: "Honeymoon",
    categoryPath: "/packages/honeymoon",
    title: "Chopta – Auli",
    desc: "Meadows, Tungnath trek, Chandrashila summit and Auli views.",
    href: "/itineraries/honeymoon/chopta-auli.html",
    image: "/itineraries/honeymoon/images/Chopta.jpg",
  },
  {
    category: "Honeymoon",
    categoryPath: "/packages/honeymoon",
    title: "Chopta – Auli (Dark)",
    desc: "Same route map in the dark interactive style.",
    href: "/itineraries/honeymoon/chopta-auli-dark.html",
    image: "/itineraries/honeymoon/images/Auli.jpg",
  },
  {
    category: "Honeymoon",
    categoryPath: "/packages/honeymoon",
    title: "Nainital Honeymoon",
    desc: "Romantic Nainital and nearby lakes circuit.",
    href: "/itineraries/honeymoon/nainital-honeymoon.html",
    image: "/itineraries/honeymoon/images/BhimtalLake.webp",
  },
  {
    category: "Honeymoon",
    categoryPath: "/packages/honeymoon",
    title: "Delhi – Kumaon Honeymoon",
    desc: "Extended Kumaon honeymoon route from Delhi.",
    href: "/itineraries/honeymoon/delhi-kumaon.html",
    image: "/itineraries/honeymoon/images/Kausani.webp",
  },
  {
    category: "Honeymoon",
    categoryPath: "/packages/honeymoon",
    title: "Tehri Lake Honeymoon",
    desc: "Lakeside stay at New Tehri, Tehri Dam, Surkanda Devi and quiet Dhanaulti in 3 days.",
    href: "/itineraries/honeymoon/tehri-honeymoon.html",
    image: "/itineraries/honeymoon/images/TehriDam.webp",
  },
  // Uttarakhand tours
  {
    category: "Uttarakhand Tours",
    categoryPath: "/packages/uttarakhand-tours",
    title: "Haridwar – Chopta – Tungnath",
    desc: "Pilgrimage + trek: Haridwar to Chopta and Tungnath temple.",
    href: "/itineraries/uttarakhand-tours/haridwar-chopta-tungnath.html",
    image: "/itineraries/uttarakhand-tours/images/Haridwar.jpg",
  },
  {
    category: "Uttarakhand Tours",
    categoryPath: "/packages/uttarakhand-tours",
    title: "Dehradun – Chakrata",
    desc: "Scenic hill drive from Dehradun to Chakrata viewpoints.",
    href: "/itineraries/uttarakhand-tours/dehradun-chakrata.html",
    image: "/itineraries/uttarakhand-tours/images/Chakrata3.jpg",
  },
  {
    category: "Uttarakhand Tours",
    categoryPath: "/packages/uttarakhand-tours",
    title: "Delhi – Nainital – Kumaon",
    desc: "Classic Kumaon lakes and hill towns from Delhi.",
    href: "/itineraries/uttarakhand-tours/delhi-nainital-kumaon.html",
    image: "/itineraries/uttarakhand-tours/images/Bhimtal.webp",
  },
  {
    category: "Uttarakhand Tours",
    categoryPath: "/packages/uttarakhand-tours",
    title: "Valley of Flowers Trek",
    desc: "3-day trek from Govindghat to Ghangaria and a full day in the alpine flower meadows.",
    href: "/itineraries/uttarakhand-tours/valley-of-flowers.html",
    image: "/itineraries/uttarakhand-tours/images/PushpawatiRiverTrail.jpg",
  },
];

export default function Packages() {
  return (
    <div className="max-w-[1440px] mx-auto px-5 sm:px-8 py-16 sm:py-20">
      <SectionHeader
        kicker="Tour Packages"
        title="Ready-made routes, fully itemised"
        description="Each package comes with an interactive route map and day-by-day plan. Open any card to explore the full itinerary."
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {ALL_PACKAGES.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="group flex flex-col rounded-2xl overflow-hidden border border-white/5 bg-ink-850 shadow-card hover:border-emerald-400/30 hover:-translate-y-1 transition duration-300"
          >
            <div className="relative h-52 overflow-hidden bg-ink-800">
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-850 to-transparent" />
              <span className="absolute top-4 left-4 bg-ink-950/70 backdrop-blur px-3 py-1 rounded-full text-emerald-300 text-xs font-semibold">
                {item.category}
              </span>
            </div>

            <div className="p-5 flex flex-col flex-1">
              <h3 className="font-serif text-xl text-mist-100 mb-1">{item.title}</h3>
              <p className="text-mist-400 text-sm mb-4 flex-1">{item.desc}</p>
              <div className="flex items-center justify-between gap-3">
                <span className="text-emerald-400 text-xs font-bold uppercase tracking-wide">
                  Open interactive map →
                </span>
                <Link
                  to={item.categoryPath}
                  onClick={(e) => e.stopPropagation()}
                  className="text-mist-400 text-xs hover:text-mist-100"
                >
                  View category
                </Link>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}