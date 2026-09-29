// Builds a flat searchable index from whatever destinations/packages/blogs
// currently exist (including anything added via the admin panel).
export function buildSearchIndex(destinations, packages, blogs = []) {
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

    (d.attractions || []).forEach((a) => {
      items.push({
        type: "Attraction",
        id: `${d.id}-${a.name}`,
        title: a.name,
        subtitle: `In ${d.name}`,
        href: `/destinations/${d.id}`,
        keywords: `${a.name} ${a.desc} ${d.name}`,
      });
    });

    (d.activities || []).forEach((a) => {
      items.push({
        type: "Activity",
        id: `${d.id}-act-${a}`,
        title: a,
        subtitle: `In ${d.name}`,
        href: `/destinations/${d.id}`,
        keywords: `${a} ${d.name}`,
      });
    });

    (d.hotels || []).forEach((h) => {
      items.push({
        type: "Hotel",
        id: `${d.id}-${h.name}`,
        title: h.name,
        subtitle: `In ${d.name} · ${h.price}`,
        href: `/destinations/${d.id}`,
        keywords: `${h.name} ${d.name} hotel stay`,
      });
    });

    (d.cuisine || []).forEach((c) => {
      items.push({
        type: "Cuisine",
        id: `${d.id}-${c.name}`,
        title: c.name,
        subtitle: `Try it in ${d.name}`,
        href: `/destinations/${d.id}`,
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
      keywords: `${p.name} ${p.subtitle} ${(p.destinations || []).join(" ")}`,
    });
  });

  blogs
    .filter((b) => b.status === "published")
    .forEach((b) => {
      items.push({
        type: "Blog",
        id: b.id,
        title: b.title,
        subtitle: b.subtitle,
        href: `/blogs/${b.id}`,
        keywords: `${b.title} ${b.subtitle} ${(b.tags || []).join(" ")}`,
      });
    });

  return items;
}

export function runSearch(query, index) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return index.filter((item) => item.keywords.toLowerCase().includes(q)).slice(0, 24);
}
