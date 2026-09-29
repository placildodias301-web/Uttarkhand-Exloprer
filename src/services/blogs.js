import { createStore } from "./createStore";
import { useStore } from "../hooks/useStore";
import { pushNotification } from "./notifications";

const SEED = [
  {
    id: "best-time-to-visit-auli",
    title: "Best Time to Visit Auli",
    subtitle: "A season-by-season guide to India's premier ski slopes",
    coverImage: "https://commons.wikimedia.org/wiki/Special:FilePath/Auli,_India.jpg?width=1200",
    category: "Travel Guide",
    destinationId: "auli",
    author: "Uttarakhand Explorer Team",
    tags: ["Auli", "Skiing", "Winter"],
    content:
      "Auli sees its heaviest snowfall between December and February, making that window the best for skiing. If you'd rather see the meadows green and the crowds thinner, April through June is a quieter, greener alternative with the same Nanda Devi views.",
    status: "published",
    publishDate: "2026-08-20",
  },
  {
    id: "rishikesh-travel-guide",
    title: "Rishikesh Travel Guide",
    subtitle: "Rafting, yoga, and everything in between",
    coverImage: "https://commons.wikimedia.org/wiki/Special:FilePath/Rishikesh,_Lakshman_Jhula.jpg?width=1200",
    category: "Travel Guide",
    destinationId: "rishikesh",
    author: "Uttarakhand Explorer Team",
    tags: ["Rishikesh", "Adventure", "Yoga"],
    content:
      "Most first-time visitors split their days between the ghats and the river — a morning rafting run followed by an evening at the Triveni Ghat aarti covers both sides of the town's character in a single day.",
    status: "published",
    publishDate: "2026-08-12",
  },
  {
    id: "10-places-in-goa",
    title: "10 Places in Goa",
    subtitle: "A first look, as we start building out this region",
    coverImage: "https://commons.wikimedia.org/wiki/Special:FilePath/Auli,_India.jpg?width=1200",
    category: "Beach",
    destinationId: null,
    author: "Uttarakhand Explorer Team",
    tags: ["Goa"],
    content: "Goa coverage is on its way — check back soon for a full regional guide.",
    status: "draft",
    publishDate: null,
  },
];

const store = createStore("uk_blogs", SEED);

function slugify(title) {
  return title.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function addBlog(data) {
  const id = data.id || slugify(data.title || "untitled");
  const entry = { status: "draft", publishDate: null, tags: [], ...data, id };
  if (entry.status === "published" && !entry.publishDate) {
    entry.publishDate = new Date().toISOString().slice(0, 10);
  }
  store.setState((list) => [entry, ...list]);
  if (entry.status === "published") {
    pushNotification({ title: "Blog published", message: `"${entry.title}"`, link: "/admin/blogs" });
  }
  return entry;
}

export function updateBlog(id, patch) {
  let wasJustPublished = false;
  store.setState((list) =>
    list.map((b) => {
      if (b.id !== id) return b;
      const next = { ...b, ...patch };
      if (patch.status === "published" && b.status !== "published") {
        wasJustPublished = true;
        next.publishDate = next.publishDate || new Date().toISOString().slice(0, 10);
      }
      return next;
    })
  );
  if (wasJustPublished) {
    const blog = store.getState().find((b) => b.id === id);
    pushNotification({ title: "Blog published", message: `"${blog?.title}"`, link: "/admin/blogs" });
  }
}

export function deleteBlog(id) {
  store.setState((list) => list.filter((b) => b.id !== id));
}

export function useBlogs() {
  const blogs = useStore(store);
  return {
    blogs,
    published: blogs.filter((b) => b.status === "published"),
    drafts: blogs.filter((b) => b.status === "draft"),
    addBlog,
    updateBlog,
    deleteBlog,
  };
}

export function getBlog(id) {
  return store.getState().find((b) => b.id === id) || null;
}
