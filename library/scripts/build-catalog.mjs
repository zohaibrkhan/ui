#!/usr/bin/env node
// Validates every entry against schema/entry.schema.json and writes catalog.json.
// Usage: node library/scripts/build-catalog.mjs [--check]
import { readFileSync, writeFileSync, existsSync } from "node:fs"
import { join } from "node:path"
import { LIB, VAULT, listEntries, listPatterns, parseEntry, rel } from "./lib.mjs"

const schema = JSON.parse(readFileSync(join(LIB, "schema/entry.schema.json"), "utf8"))
const REQUIRED_SECTIONS = ["## What it is", "## Layout anatomy", "## Visual system", "## Motion and interaction", "## Techniques worth reusing", "## Build brief"]
const errors = []

function validate(data, where) {
  for (const k of schema.required) if (!(k in data)) errors.push(`${where}: missing "${k}"`)
  for (const [k, v] of Object.entries(data)) {
    const p = schema.properties[k]
    if (!p) { errors.push(`${where}: unknown key "${k}"`); continue }
    if (p.enum && !p.enum.includes(v)) errors.push(`${where}: ${k}="${v}" not in ${p.enum.join("|")}`)
    if (p.type === "array" && !(Array.isArray(v) && v.every((x) => typeof x === "string"))) errors.push(`${where}: ${k} must be an array of strings`)
    if (p.type === "string" && typeof v !== "string") errors.push(`${where}: ${k} must be a string`)
    if (p.pattern && typeof v === "string" && !new RegExp(p.pattern).test(v)) errors.push(`${where}: ${k} does not match ${p.pattern}`)
    if (p.maxLength && typeof v === "string" && v.length > p.maxLength) errors.push(`${where}: ${k} longer than ${p.maxLength}`)
  }
}

const patterns = listPatterns()
const patternIds = new Set(patterns.map((p) => p.id))
const entries = []
for (const { source, slug, file } of listEntries()) {
  const where = rel(file)
  let parsed
  try { parsed = parseEntry(file) } catch (e) { errors.push(e.message); continue }
  const { data, body } = parsed
  validate(data, where)
  if (data.id !== `${source}/${slug}`) errors.push(`${where}: id should be "${source}/${slug}"`)
  for (const h of REQUIRED_SECTIONS) if (!body.includes(h)) errors.push(`${where}: missing section "${h}"`)
  entries.push({
    ...data,
    path: where,
    patterns: (data.techniques || []).filter((t) => patternIds.has(t)),
    // True once the original prompt + code has been imported locally (see scripts/import-section.mjs).
    has_original: existsSync(join(VAULT, source, slug)),
  })
}

if (errors.length) {
  console.error(errors.join("\n"))
  console.error(`\n${errors.length} problem(s)`)
  process.exit(1)
}

const catalog = { version: 1, counts: { entries: entries.length, patterns: patterns.length }, patterns, entries }
const out = JSON.stringify(catalog, null, 2) + "\n"
const target = join(LIB, "catalog.json")
if (process.argv.includes("--check")) {
  // has_original depends on the local vault, so compare without it.
  const strip = (s) => s.replace(/\n\s*"has_original": (true|false),?/g, "")
  if (!existsSync(target) || strip(readFileSync(target, "utf8")) !== strip(out)) {
    console.error("catalog.json is stale; run: node library/scripts/build-catalog.mjs")
    process.exit(1)
  }
  console.log(`catalog.json is up to date (${entries.length} entries, ${patterns.length} patterns)`)
} else {
  writeFileSync(target, out)
  console.log(`wrote catalog.json: ${entries.length} entries, ${patterns.length} patterns`)
}
