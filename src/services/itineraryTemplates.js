import { createStore } from "./createStore";
import { useStore } from "../hooks/useStore";
import { pushNotification } from "./notifications";

const SEED = [
  {
    id: "himalayan-explorer",
    coverImage: "https://commons.wikimedia.org/wiki/Special:FilePath/Auli,_India.jpg?width=1200",
    name: "Himalayan Explorer",
    subname: "A 6-Day Journey Through Uttarakhand",
    destinationId: "auli",
    duration: "6 Days",
    shortDescription: "Haridwar to Auli, covering the classic Garhwal circuit.",
    status: "published",
    days: [
      { day: 1, title: "Haridwar → Rishikesh", description: "Arrival, Ganga Aarti at Har Ki Pauri." },
      { day: 2, title: "Rishikesh", description: "River rafting, Laxman Jhula." },
      { day: 3, title: "Rishikesh → Dehradun", description: "Robber's Cave, Sahastradhara." },
    ],
  },
  {
    id: "char-dham-yatra",
    coverImage: "https://commons.wikimedia.org/wiki/Special:FilePath/Badrinath_Temple.JPG?width=1200",
    name: "Char Dham Yatra",
    subname: "A Spiritual Journey",
    destinationId: "badrinath",
    duration: "8 Days",
    shortDescription: "Yamunotri, Gangotri, Kedarnath and Badrinath in one circuit.",
    status: "published",
    days: [
      { day: 1, title: "Haridwar", description: "Arrival and preparation." },
      { day: 2, title: "Yamunotri", description: "Trek and darshan." },
    ],
  },
  {
    id: "rishikesh-adventure",
    coverImage: "https://commons.wikimedia.org/wiki/Special:FilePath/Rishikesh,_Lakshman_Jhula.jpg?width=1200",
    name: "Rishikesh Adventure",
    subname: "Rafting & Camping",
    destinationId: "rishikesh",
    duration: "3 Days",
    shortDescription: "A short adventure-focused break centred on the river.",
    status: "draft",
    days: [],
  },
];

const store = createStore("uk_itinerary_templates", SEED);

function slugify(name) {
  return name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function addItineraryTemplate(data) {
  const id = data.id || slugify(data.name || "itinerary");
  const entry = { status: "draft", days: [], ...data, id };
  store.setState((list) => [entry, ...list]);
  pushNotification({ title: "New itinerary added", message: `"${entry.name}"`, link: "/admin/itineraries" });
  return entry;
}

export function updateItineraryTemplate(id, patch) {
  store.setState((list) => list.map((it) => (it.id === id ? { ...it, ...patch } : it)));
}

export function deleteItineraryTemplate(id) {
  store.setState((list) => list.filter((it) => it.id !== id));
}

export function useItineraryTemplates() {
  const templates = useStore(store);
  return { templates, addItineraryTemplate, updateItineraryTemplate, deleteItineraryTemplate };
}

export function getItineraryTemplate(id) {
  return store.getState().find((it) => it.id === id) || null;
}
