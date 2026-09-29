import fs from "node:fs";
import path from "node:path";

const root = "public/itineraries";
const walk = (d) =>
  fs.readdirSync(d, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]
  );

for (const file of walk(root).filter((f) => f.endsWith(".html"))) {
  let html = fs.readFileSync(file, "utf8");
  if (html.includes('href="/packages"')) {
    console.log("already has link:", file);
    continue;
  }
  const next = html.replace(
    /(<div class(?:Name)?="navlinks">)/,
    '$1\n<a href="/packages">← Packages</a>'
  );
  if (next !== html) {
    fs.writeFileSync(file, next);
    console.log("patched:", file);
  } else {
    console.log("NO navlinks found, add by hand:", file);
  }
}