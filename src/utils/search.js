import { destinations } from "../data/destinations";
import { packages } from "../data/packages";

// Builds a flat searchable index once, at module load time.
function buildIndex() {
  const items = [];

  destinations.forEach((d) => {
    items.push({
      type: "Destination",
      id: d.id,
      title: d.name,
      subtitle: d.tagline,
      href: `/destinations/${d.id}`,
      keywords: `${d.name} ${d.tagline} ${d.shortDescription}`,
    });

    d.attractions.forEach((a) => {
      items.push({
        type: "Attraction",
        id: `${d.id}-${a.name}`,
        title: a.name,
        subtitle: `In ${d.name}`,
        href: `/destinations/${d.id}`,
        keywords: `${a.name} ${a.desc} ${d.name}`,
      });
    });

    d.activities.forEach((a) => {
      items.push({
        type: "Activity",
        id: `${d.id}-act-${a}`,
        title: a,
        subtitle: `In ${d.name}`,
        href: `/destinations/${d.id}`,
        keywords: `${a} ${d.name}`,
      });
    });

    d.hotels.forEach((h) => {
      items.push({
        type: "Hotel",
        id: `${d.id}-${h.name}`,
        title: h.name,
        subtitle: `In ${d.name} · ${h.price}`,
        href: `/hotels-food`,
        keywords: `${h.name} ${d.name} hotel stay`,
      });
    });

    d.cuisine.forEach((c) => {
      items.push({
        type: "Cuisine",
        id: `${d.id}-${c.name}`,
        title: c.name,
        subtitle: `Try it in ${d.name}`,
        href: `/hotels-food`,
        keywords: `${c.name} ${c.desc} ${d.name} food dish`,
      });
    });
  });

  packages.forEach((p) => {
    items.push({
      type: "Package",
      id: p.id,
      title: p.name,
      subtitle: p.subtitle,
      href: `/packages/${p.id}`,
      keywords: `${p.name} ${p.subtitle} ${p.destinations.join(" ")}`,
    });
  });

  return items;
}

export const searchIndex = buildIndex();

export function runSearch(query) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return searchIndex
    .filter((item) => item.keywords.toLowerCase().includes(q))
    .slice(0, 24);
}
