/**
 * Eelrenderdab iga marsruudi staatiliseks HTML-failiks.
 *
 * Käivitatakse pärast seda, kui `vite build` on teinud kliendi bundle'i
 * (dist/) ja `vite build --ssr` serveri bundle'i (.ssr/). Tulemus: iga lehe
 * HTML sisaldab päris teksti, pealkirju ja linke ka siis, kui JS ei tööta.
 */
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const distDir = join(root, "dist");
const ssrDir = join(root, ".ssr");
const SITE_URL = "https://fellinforest.ee";

const entry = pathToFileURL(join(ssrDir, "entry-server.js")).href;
const { render, renderNotFound, pages } = await import(entry);

const template = await readFile(join(distDir, "index.html"), "utf8");

if (!template.includes("<!--app-html-->") || !template.includes("<!--app-head-->")) {
  throw new Error("index.html ei sisalda <!--app-head--> / <!--app-html--> kohatäiteid");
}

function fill(template, { head, html }) {
  return template.replace("<!--app-head-->", head).replace("<!--app-html-->", html);
}

async function writePage(routePath, contents) {
  const outFile =
    routePath === "/" ? join(distDir, "index.html") : join(distDir, routePath, "index.html");
  await mkdir(dirname(outFile), { recursive: true });
  await writeFile(outFile, contents, "utf8");
  return outFile;
}

const today = new Date().toISOString().slice(0, 10);
const sitemapEntries = [];

for (const page of pages) {
  const result = render(page.path);
  const outFile = await writePage(page.path, fill(template, result));
  console.log(`  ✓ ${page.path.padEnd(24)} → ${outFile.replace(`${root}/`, "")}`);

  if (!page.noindex) {
    sitemapEntries.push(
      [
        "  <url>",
        `    <loc>${SITE_URL}${page.path}</loc>`,
        `    <lastmod>${today}</lastmod>`,
        `    <changefreq>${page.changefreq}</changefreq>`,
        `    <priority>${page.priority}</priority>`,
        "  </url>",
      ].join("\n"),
    );
  }
}

// GitHub Pages serveerib 404.html tundmatute teede korral.
await writeFile(join(distDir, "404.html"), fill(template, renderNotFound()), "utf8");
console.log("  ✓ 404.html");

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...sitemapEntries,
  "</urlset>",
  "",
].join("\n");
await writeFile(join(distDir, "sitemap.xml"), sitemap, "utf8");
console.log(`  ✓ sitemap.xml (${sitemapEntries.length} URL-i)`);

await rm(ssrDir, { recursive: true, force: true });
