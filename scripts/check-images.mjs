// Checks every external image URL used in the project's data files.
//   npm run check:images
// Needs Node 18+ (built-in fetch) and an internet connection. Read-only:
// it never changes any file, it only reports which URLs fail to load.
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOTS = ["src/data", "src/services"];
const COMMONS = "https://commons.wikimedia.org/wiki/Special:FilePath/";

function files(dir) {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    return statSync(full).isDirectory() ? files(full) : /\.(js|jsx)$/.test(name) ? [full] : [];
  });
}

const found = new Map(); // url -> [file, …]
for (const file of ROOTS.flatMap(files)) {
  const text = readFileSync(file, "utf8").replaceAll("${COMMONS}", COMMONS);
  for (const m of text.matchAll(/https:\/\/[^\s"'`)]+\.(?:jpe?g|png|webp|gif|svg)(?:\?[^\s"'`)]*)?/gi)) {
    const list = found.get(m[0]) || [];
    if (!list.includes(file)) list.push(file);
    found.set(m[0], list);
  }
}

console.log(`Checking ${found.size} image URLs…\n`);
const broken = [];
const queue = [...found.keys()];
async function worker() {
  while (queue.length) {
    const url = queue.shift();
    try {
      const res = await fetch(url, {
        method: "GET",
        redirect: "follow",
        headers: { "User-Agent": "PeakAndPalm-image-check/1.0", Range: "bytes=0-0" },
      });
      const type = res.headers.get("content-type") || "";
      if (!res.ok || !type.startsWith("image/")) broken.push({ url, status: `${res.status} ${type}` });
    } catch (err) {
      broken.push({ url, status: err.message });
    }
  }
}
await Promise.all(Array.from({ length: 6 }, worker));

if (broken.length === 0) {
  console.log("All image URLs loaded.");
} else {
  console.log(`${broken.length} URL(s) failed:\n`);
  for (const b of broken) console.log(`  ${b.status}\n  ${b.url}\n  used in: ${found.get(b.url).join(", ")}\n`);
  process.exitCode = 1;
}
