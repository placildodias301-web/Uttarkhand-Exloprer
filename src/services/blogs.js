import { createStore } from "./createStore";
import { useStore } from "../hooks/useStore";
import { pushNotification } from "./notifications";
import { normalizeRegion } from "../data/regions";
import { useDestinations } from "./content";

const SEED = [
  {
    id: "best-time-to-visit-auli",
    title: "Best Time to Visit Auli",
    subtitle: "A season-by-season guide to India's premier ski slopes",
    coverImage: "https://commons.wikimedia.org/wiki/Special:FilePath/Auli,_India.jpg?width=1200",
    category: "Travel Guide",
    destinationId: "auli",
    region: "Uttarakhand",
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
    region: "Uttarakhand",
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
    // Previously used the Auli photo by mistake; now the project's existing
    // Palolem image (also used in src/data/goaDestinations.js).
    coverImage: "https://commons.wikimedia.org/wiki/Special:FilePath/Palolem_Beach,_south_Goa.jpg?width=1200",
    category: "Beach",
    destinationId: null,
    region: "Goa",
    author: "Uttarakhand Explorer Team",
    tags: ["Goa"],
    content: "Goa coverage is on its way — check back soon for a full regional guide.",
    status: "draft",
    publishDate: null,
  },
];

const store = createStore("uk_blogs", SEED);

// One-off fix for browsers that saved the seed earlier: the Goa draft kept
// the Auli cover by mistake. Only that exact old value is replaced.
const WRONG_GOA_COVER = "https://commons.wikimedia.org/wiki/Special:FilePath/Auli,_India.jpg?width=1200";
if (store.getState().some((b) => b.id === "10-places-in-goa" && b.coverImage === WRONG_GOA_COVER)) {
  const fixed = SEED.find((b) => b.id === "10-places-in-goa").coverImage;
  store.setState((list) => list.map((b) => (b.id === "10-places-in-goa" && b.coverImage === WRONG_GOA_COVER ? { ...b, coverImage: fixed } : b)));
}

function uniqueSlug(title) {
  const base = slugify(title);
  const taken = new Set(store.getState().map((b) => b.id));
  let id = base;
  for (let n = 2; taken.has(id); n++) id = `${base}-${n}`;
  return id;
}

function slugify(title) {
  return title.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function addBlog(data) {
  const id = data.id || uniqueSlug(data.title || "untitled");
  const entry = { status: "draft", publishDate: null, tags: [], ...data, id };
  if (entry.status === "published" && !entry.publishDate) {
    entry.publishDate = new Date().toISOString().slice(0, 10);
  }
  store.setState((list) => [entry, ...list]);
  if (entry.status === "published") {
    pushNotification({ type: "blog", title: "Blog published", message: `"${entry.title}"`, link: "/admin/blogs" });
  } else {
    pushNotification({ type: "blog", title: "Blog draft saved", message: `"${entry.title}"`, link: "/admin/blogs" });
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
  const blog = store.getState().find((b) => b.id === id);
  pushNotification({
    type: "blog",
    title: wasJustPublished ? "Blog published" : patch.status === "draft" ? "Blog unpublished" : "Blog updated",
    message: `"${blog?.title}"`,
    link: "/admin/blogs",
  });
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

// ---------------------------------------------------------------------------
// Region for a blog: explicit `region` field, else the region of its linked
// destination, else a tag matching a region name. null = general (ALL only).
// ---------------------------------------------------------------------------
export function getBlogRegion(blog, destinations = []) {
  if (blog?.region) return normalizeRegion(blog.region);
  const dest = destinations.find((d) => d.id === blog?.destinationId);
  if (dest) return normalizeRegion(dest.region);
  const tag = (blog?.tags || []).map(normalizeRegion).find(Boolean);
  return tag || null;
}

// Published posts for the public site, newest first, scoped to a region.
export function getPublicBlogs(region = "all", destinations = []) {
  const want = normalizeRegion(region) || "all";
  return store
    .getState()
    .filter((b) => b.status === "published")
    .filter((b) => want === "all" || getBlogRegion(b, destinations) === want)
    .sort((a, b) => String(b.publishDate || "").localeCompare(String(a.publishDate || "")));
}

export function usePublicBlogs(region = "all") {
  useStore(store);
  const destinations = useDestinations();
  return getPublicBlogs(region, destinations);
}
