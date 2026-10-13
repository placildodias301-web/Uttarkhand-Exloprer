// Takes items round-robin from several groups: interleave([[a1,a2],[b1]]) → [a1,b1,a2].
// Used to give both regions space in mixed "featured" rows.
export function interleave(groups, limit = Infinity) {
  const out = [];
  const max = Math.max(0, ...groups.map((g) => g.length));
  for (let i = 0; i < max && out.length < limit; i++) {
    for (const g of groups) {
      if (g[i] !== undefined && out.length < limit) out.push(g[i]);
    }
  }
  return out;
}

// Keeps the order given by `ids`, dropping ids that don't exist.
export function pickByIds(items, ids) {
  return ids.map((id) => items.find((i) => i.id === id)).filter(Boolean);
}
