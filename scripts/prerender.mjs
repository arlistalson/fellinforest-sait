/**
 * Eelrenderdab iga marsruudi staatiliseks HTML-failiks.
 *
 * Käivitatakse pärast seda, kui `vite build` on teinud kliendi bundle'i
 * (dist/) ja `vite build --ssr` serveri bundle'i (.ssr/). Tulemus: iga lehe
 * HTML sisaldab päris teksti, pealkirju ja linke ka siis, kui JS ei tööta.
 */
import { existsSync, readFileSync, statSync } from "node:fs";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import { dirname, join, relative, resolve } from "node:path";
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

/**
 * lastmod tuleb lehe päris sisu git-ajaloost, mitte build'i kuupäevast – muidu
 * väidaks iga deploy, et kõik lehed muutusid, ja Google lakkab lastmod'i usaldamast.
 * Ühist raami (päis, jalus, router) me ei arvesta: see ei muuda lehe sisu.
 */
const CHROME = new Set([
  "src/App.tsx",
  "src/main.tsx",
  "src/router.tsx",
  "src/seo.ts",
  "src/routes.tsx",
  "src/components/sections/Header.tsx",
  "src/components/sections/Footer.tsx",
]);

function resolveImport(spec, fromFile) {
  if (!spec.startsWith(".")) return null;
  const base = resolve(dirname(fromFile), spec);
  for (const candidate of [base, `${base}.tsx`, `${base}.ts`, join(base, "index.tsx"), join(base, "index.ts")]) {
    if (existsSync(candidate) && statSync(candidate).isFile()) return candidate;
  }
  return null;
}

/** Kogub lehe lähtefaili ja kõik selle (kaudsed) kohalikud importid. */
function collectSources(entryRelative) {
  const seen = new Set();
  const stack = [join(root, entryRelative)];
  while (stack.length > 0) {
    const file = stack.pop();
    const rel = relative(root, file);
    if (seen.has(rel) || CHROME.has(rel)) continue;
    seen.add(rel);
    for (const match of readFileSync(file, "utf8").matchAll(/from\s+["']([^"']+)["']/g)) {
      const resolved = resolveImport(match[1], file);
      if (resolved) stack.push(resolved);
    }
  }
  return [...seen];
}

function git(args) {
  return execFileSync("git", args, { cwd: root, encoding: "utf8" }).trim();
}

const buildDate = new Date().toISOString().slice(0, 10);
let gitAvailable = true;
try {
  if (git(["rev-parse", "--is-shallow-repository"]) === "true") {
    console.warn("  ! git-repo on shallow – lastmod jääb build'i kuupäevaks (vaja fetch-depth: 0)");
    gitAvailable = false;
  }
} catch {
  gitAvailable = false;
}

function lastModified(entryRelative) {
  if (!gitAvailable) return buildDate;
  try {
    const date = git(["log", "-1", "--format=%cs", "--", ...collectSources(entryRelative)]);
    return date || buildDate;
  } catch {
    return buildDate;
  }
}

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
        `    <lastmod>${lastModified(page.source)}</lastmod>`,
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

// llms.txt – sama marsruuditabeli põhjal, et see ei jääks lehtedest maha.
const indexable = pages.filter((page) => !page.noindex);
const llms = [
  "# Fellin Forest",
  "",
  "Fellin Forest OÜ ostab metsakinnistuid, raieõigust ja põllumaad üle Eesti.",
  "Tasuta hindamine, konkreetne pakkumine 24 tunni jooksul, notaritasud meie kanda.",
  "Kontor: Lossi tn 15, 71003 Viljandi. Telefon: +372 5806 5274. E-post: enrico@fellinforest.ee",
  "",
  "## Pages",
  "",
  ...indexable.map((page) => `- [${page.title}](${SITE_URL}${page.path}): ${page.description}`),
  "",
].join("\n");
await writeFile(join(distDir, "llms.txt"), llms, "utf8");
console.log(`  ✓ llms.txt (${indexable.length} lehte)`);

await rm(ssrDir, { recursive: true, force: true });
