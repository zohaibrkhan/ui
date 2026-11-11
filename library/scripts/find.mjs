#!/usr/bin/env node
// Query the catalog. Usage:
//   node library/scripts/find.mjs [text...] [--kind hero] [--tag dark] [--technique scroll-pinning] [--json]
// This is the same lookup an MCP `search` tool would expose later.
import { readFileSync } from "node:fs"
import { join } from "node:path"
import { LIB } from "./lib.mjs"

const args = process.argv.slice(2)
const opt = {}, words = []
for (let i = 0; i < args.length; i++) {
  if (args[i] === "--json") opt.json = true
  else if (args[i].startsWith("--")) opt[args[i].slice(2)] = (args[++i] || "").toLowerCase()
  else words.push(args[i].toLowerCase())
}
const { entries } = JSON.parse(readFileSync(join(LIB, "catalog.json"), "utf8"))
const has = (list, v) => (list || []).some((x) => x.toLowerCase().includes(v))
const hits = entries.filter((e) => {
  if (opt.kind && e.kind !== opt.kind) return false
  if (opt.tag && !has(e.tags, opt.tag)) return false
  if (opt.technique && !has(e.techniques, opt.technique)) return false
  if (opt.source && e.source !== opt.source) return false
  const hay = [e.id, e.name, e.summary, e.kind, ...(e.tags || []), ...(e.techniques || []), ...(e.stack || [])].join(" ").toLowerCase()
  return words.every((w) => hay.includes(w))
})
if (opt.json) console.log(JSON.stringify(hits, null, 2))
else {
  for (const e of hits) console.log(`${e.id.padEnd(52)} ${e.kind.padEnd(17)} ${e.complexity.padEnd(7)} ${e.summary}\n  -> library/${e.path}`)
  console.log(`\n${hits.length} of ${entries.length} entries`)
}
