#!/usr/bin/env node
/**
 * Emits a body-only copy of index.html for publishing as a hosted page.
 *
 * The hosting environment supplies its own <!doctype>/<head>/<body> skeleton, so
 * this strips the document wrapper and keeps the <title>, <style> and body content.
 *
 * Usage: node tools/build-artifact.mjs [outfile]
 */
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const out = process.argv[2] ?? resolve(root, "dist/artifact.html");

const src = await readFile(resolve(root, "index.html"), "utf8");

const pick = (re, what) => {
  const m = src.match(re);
  if (!m) throw new Error(`build-artifact: could not find ${what} in index.html`);
  return m[1].trim();
};

const title = pick(/<title>([\s\S]*?)<\/title>/i, "<title>");
const style = pick(/<style>([\s\S]*?)<\/style>/i, "<style> block");
const body = pick(/<body[^>]*>([\s\S]*?)<\/body>/i, "<body> content");

const page = `<title>${title}</title>\n<style>\n${style}\n</style>\n${body}\n`;

await mkdir(dirname(out), { recursive: true });
await writeFile(out, page, "utf8");
console.log(`wrote ${out} (${(page.length / 1024).toFixed(1)} kB)`);
