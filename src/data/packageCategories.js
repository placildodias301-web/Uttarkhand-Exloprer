export const packageCategories = [
  { slug: "spiritual", label: "Spiritual Packages" },
  { slug: "local-tours", label: "Local Tour Packages" },
  { slug: "most-popular", label: "Most Popular Package Tours" },
  { slug: "luxury", label: "Luxury Packages" },
  { slug: "budget-friendly", label: "Budget Friendly Packages" },
];

export function getPackageCategory(slug) {
  return packageCategories.find((c) => c.slug === slug);
}
