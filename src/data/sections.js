// Page copy and imagery for the four travel sections (/all, /uttarakhand,
// /goa, /combo). Pages read everything from here — no travel copy lives in
// the JSX. Images reuse URLs that already existed in the project.
import { regions } from "./regions";

const COMMONS = "https://commons.wikimedia.org/wiki/Special:FilePath/";
const region = Object.fromEntries(regions.map((r) => [r.id, r]));

// Existing image URLs, named once so every section uses the same source.
export const sectionImages = {
  himalaya: `${COMMONS}Himalayan_Range_-_chaukhamba_peak.jpg?width=2000`, // former Home hero
  palolem: region.goa.ctaImage, // Palolem_Beach,_south_Goa.jpg?width=1800
  auli: region.uttarakhand.image,
  rishikesh: region.uttarakhand.ctaImage,
};

export const sectionContent = {
  all: {
    hero: {
      eyebrow: "Curated travel itineraries",
      title: "FROM PEAKS TO PALMS.",
      description:
        "Peak & Palm brings together carefully planned journeys across the mountains of Uttarakhand and the beaches of Goa — destinations, experiences and day-by-day itineraries that are simple to discover and easy to follow.",
      images: [
        { src: sectionImages.himalaya, alt: "Chaukhamba peak in the Garhwal Himalaya, Uttarakhand", position: "center 40%" },
        { src: sectionImages.palolem, alt: "Palolem beach in South Goa", position: "center" },
      ],
      captions: ["Uttarakhand", "Goa"],
    },
    journeys: {
      kicker: "Choose your journey",
      title: "Mountains, coast, or both",
      description: "Each journey has its own destinations, packages and day-by-day itineraries.",
    },
    destinations: {
      kicker: "Featured destinations",
      title: "A few places to start with",
      ids: ["rishikesh", "auli", "chopta", "palolem", "old-goa", "dudhsagar"],
    },
    packages: { kicker: "Featured packages", title: "Ready-made routes, fully itemised" },
    itineraries: { kicker: "Featured itineraries", title: "Follow a plan day by day" },
    blogs: { kicker: "Latest from the blog", title: "Notes from the road" },
    gallery: { kicker: "Travel gallery", title: "Both ends of the trip" },
    cta: {
      title: "Tell us where you want to wake up.",
      description:
        "Share your dates and the kind of trip you want — mountains, beaches or both — and we'll help shape the route.",
      image: sectionImages.rishikesh,
    },
  },

  uttarakhand: {
    regionId: "uttarakhand",
    hero: {
      eyebrow: "Discover Uttarakhand",
      title: "Mountains, valleys, rivers and unforgettable journeys.",
      description:
        "From the Ganga's ghats in Haridwar to the snowline above Auli — explore each stop, pick a ready-made route, or follow a full day-by-day plan.",
      images: [{ src: sectionImages.himalaya, alt: "Chaukhamba peak in the Garhwal Himalaya", position: "center 40%" }],
    },
    intro: { kicker: "The Garhwal Himalaya", title: region.uttarakhand.featured.title, description: region.uttarakhand.featured.description },
    // The six core stops are listed first, in route order; the rest follow.
    coreDestinationIds: ["haridwar", "rishikesh", "dehradun", "tehri", "chopta", "auli"],
    cta: { title: region.uttarakhand.cta.title, description: region.uttarakhand.cta.description, image: region.uttarakhand.ctaImage },
  },

  goa: {
    regionId: "goa",
    hero: {
      eyebrow: "Discover Goa",
      title: "Sun, beaches, heritage and unforgettable escapes.",
      description:
        "North Goa's lively shores, Old Goa's churches, quiet South Goa coves and the waterfalls inland — each stop built out with attractions, food and stays.",
      images: [{ src: sectionImages.palolem, alt: "Palolem beach in South Goa", position: "center 60%" }],
    },
    intro: { kicker: "Goa's coast and hinterland", title: region.goa.featured.title, description: region.goa.featured.description },
    coreDestinationIds: ["baga-calangute", "old-goa", "palolem", "dudhsagar"],
    cta: { title: region.goa.cta.title, description: region.goa.cta.description, image: region.goa.ctaImage },
  },

  combo: {
    regionId: "combo",
    hero: {
      eyebrow: "Peaks + Palms",
      title: "The mountains of Uttarakhand and the beaches of Goa, in one journey.",
      description:
        "Start in the Himalayan foothills on the Ganga, then fly south for Goa's heritage towns and beaches — planned as one trip, with every day written out.",
      images: [
        { src: sectionImages.auli, alt: "Auli's slopes in Uttarakhand", position: "center" },
        { src: sectionImages.palolem, alt: "Palolem beach in South Goa", position: "center" },
      ],
      captions: ["Uttarakhand", "Goa"],
    },
    highlights: {
      uttarakhandIds: ["haridwar", "rishikesh", "dehradun"],
      goaIds: ["old-goa", "baga-calangute", "palolem", "dudhsagar"],
    },
    cta: {
      title: "Planning both halves of the trip?",
      description: "Tell us your dates and which side you'd like more time on — we'll balance the route between the hills and the coast.",
      image: sectionImages.rishikesh,
    },
  },
};

// Cards for "Choose your journey". Text describes each section in a line.
export const journeyCards = [
  {
    sectionId: "uttarakhand",
    title: "Uttarakhand",
    description: "Himalayan towns, river ghats, alpine meadows and snow slopes.",
    image: region.uttarakhand.image,
  },
  {
    sectionId: "goa",
    title: "Goa",
    description: "Beaches north and south, Portuguese-era heritage and inland waterfalls.",
    image: region.goa.image,
  },
  {
    sectionId: "combo",
    title: "Combo",
    description: "The hills and the coast in one trip, planned end to end.",
    images: [region.uttarakhand.image, region.goa.image],
  },
];
