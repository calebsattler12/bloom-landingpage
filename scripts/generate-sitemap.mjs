#!/usr/bin/env node
/**
 * Rebuild sitemap.xml from public HTML pages, and check that every
 * directory index has a permanent (308) redirect onto its trailing-slash URL.
 *
 * Included: HTML pages with a trailing-slash www canonical, not noindex,
 * not disallowed in robots.txt, and not themselves a redirect.
 * lastmod: last git commit date for the file, or today (UTC) if it is dirty.
 *
 * Run: npm run generate:sitemap
 */
import { execSync } from "node:child_process";
import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ORIGIN = "https://www.runbloom.ai";

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (name === "node_modules" || name === ".git" || name.startsWith(".")) continue;
    const full = path.join(dir, name);
    const stat = statSync(full);
    if (stat.isDirectory()) walk(full, out);
    else if (name.endsWith(".html")) out.push(full);
  }
  return out;
}

function relPosix(file) {
  return path.relative(ROOT, file).split(path.sep).join("/");
}

function publicPath(file) {
  const rel = relPosix(file);
  if (rel === "index.html") return "/";
  if (rel.endsWith("/index.html")) return `/${rel.slice(0, -"index.html".length)}`;
  return `/${rel}`;
}

function readRedirects() {
  const config = JSON.parse(readFileSync(path.join(ROOT, "vercel.json"), "utf8"));
  return config.redirects || [];
}

function robotsText() {
  return readFileSync(path.join(ROOT, "robots.txt"), "utf8");
}

function robotsDisallow(text) {
  return text
    .split("\n")
    .map((line) => line.match(/^\s*Disallow:\s*(\S+)/i))
    .filter(Boolean)
    .map((match) => match[1]);
}

function isDisallowed(urlPath, rules) {
  return rules.some((rule) => rule && urlPath.startsWith(rule));
}

function isNoindex(html) {
  return /<meta\s+[^>]*name=["']robots["'][^>]*>/i.test(html) &&
    /noindex/i.test(html.match(/<meta\s+[^>]*name=["']robots["'][^>]*>/i)[0]);
}

function canonicalHref(html) {
  const match = html.match(/<link\s+[^>]*rel=["']canonical["'][^>]*>/i);
  if (!match) return null;
  const href = match[0].match(/href=["']([^"']+)["']/i);
  return href ? href[1] : null;
}

function redirectDestination(redirects, urlPath) {
  const rule = redirects.find((item) => item.source === urlPath);
  return rule ? rule.destination : null;
}

function lastmod(file) {
  const rel = relPosix(file);
  const dirty = execSync(`git status --porcelain -- ${JSON.stringify(rel)}`, {
    cwd: ROOT,
    encoding: "utf8",
  }).trim();
  if (dirty) return new Date().toISOString().slice(0, 10);
  const date = execSync(`git log -1 --format=%cs -- ${JSON.stringify(rel)}`, {
    cwd: ROOT,
    encoding: "utf8",
  }).trim();
  if (!date) throw new Error(`No git history for ${rel}`);
  return date;
}

function assertCanonicalRedirects(redirects) {
  const missing = [];
  for (const file of walk(ROOT)) {
    const rel = relPosix(file);
    if (rel !== "index.html" && !rel.endsWith("/index.html")) continue;
    if (rel === "preview/index.html" || rel.startsWith("preview/")) continue;
    const dir = rel === "index.html" ? "" : rel.slice(0, -"/index.html".length);
    const expected = dir === ""
      ? [{ source: "/index.html", destination: "/" }]
      : [
          { source: `/${dir}`, destination: `/${dir}/` },
          { source: `/${dir}/index.html`, destination: `/${dir}/` },
        ];
    for (const item of expected) {
      const found = redirects.find((rule) => rule.source === item.source);
      if (!found || found.destination !== item.destination || found.permanent !== true) {
        missing.push(`${item.source} → ${item.destination}`);
      }
    }
  }
  if (missing.length) {
    console.error("Missing permanent trailing-slash redirects:");
    for (const line of missing) console.error(`  ${line}`);
    process.exit(1);
  }
}

function collectPages(redirects, disallow) {
  const pages = [];
  for (const file of walk(ROOT)) {
    const html = readFileSync(file, "utf8");
    const urlPath = publicPath(file);
    if (isNoindex(html)) continue;
    if (isDisallowed(urlPath, disallow)) continue;
    const redirected = redirectDestination(redirects, urlPath);
    if (redirected && redirected !== urlPath) continue;
    const canonical = canonicalHref(html);
    const loc = canonical || `${ORIGIN}${urlPath}`;
    let pathname;
    try {
      const url = new URL(loc);
      if (url.origin !== ORIGIN) throw new Error(`canonical origin ${url.origin}`);
      pathname = url.pathname;
    } catch (error) {
      throw new Error(`${relPosix(file)} has an unusable canonical (${loc}): ${error.message}`);
    }
    if (!pathname.endsWith("/")) {
      throw new Error(`${relPosix(file)} canonical is not trailing-slash: ${loc}`);
    }
    pages.push({ file, loc, pathname, lastmod: lastmod(file) });
  }

  const byLoc = new Map();
  for (const page of pages) {
    const current = byLoc.get(page.loc);
    if (!current || page.pathname === publicPath(page.file)) byLoc.set(page.loc, page);
  }
  return [...byLoc.values()].sort((a, b) => {
    if (a.pathname === "/") return -1;
    if (b.pathname === "/") return 1;
    return a.pathname.localeCompare(b.pathname);
  });
}

function render(pages) {
  const urls = pages
    .map(
      (page) => `  <url>
    <loc>${page.loc}</loc>
    <lastmod>${page.lastmod}</lastmod>
  </url>`
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<!-- Generated by scripts/generate-sitemap.mjs. Run npm run generate:sitemap after adding, removing, or editing a public page. -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

const redirects = readRedirects();
const robots = robotsText();
if (!robots.includes("Sitemap: https://www.runbloom.ai/sitemap.xml")) {
  console.error("robots.txt is missing Sitemap: https://www.runbloom.ai/sitemap.xml");
  process.exit(1);
}
assertCanonicalRedirects(redirects);
const pages = collectPages(redirects, robotsDisallow(robots));
const xml = render(pages);
writeFileSync(path.join(ROOT, "sitemap.xml"), xml);
console.log(`Wrote sitemap.xml with ${pages.length} URLs:`);
for (const page of pages) console.log(`  ${page.lastmod}  ${page.loc}`);
