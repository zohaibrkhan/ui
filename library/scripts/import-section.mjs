#!/usr/bin/env node
// Files an original "prompt + code" that YOU copied while signed in to the source site.
// Usage:  pbpaste | node library/scripts/import-section.mjs oversight-supply/prompt-parlor
//         node library/scripts/import-section.mjs oversight-supply/prompt-parlor path/to/copied.txt
// Writes library/vault/<source>/<slug>/prompt.md. The vault is gitignored: these files are
// the vendor's licensed material and must not be redistributed (see sources/*/README.md).
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs"
import { join } from "node:path"
import { SOURCES, VAULT } from "./lib.mjs"

const [id, file] = process.argv.slice(2)
if (!id || !/^[a-z0-9-]+\/[a-z0-9-]+$/.test(id)) {
  console.error("usage: import-section.mjs <source>/<slug> [file]   (reads stdin when no file is given)")
  process.exit(2)
}
const [source, slug] = id.split("/")
if (!existsSync(join(SOURCES, source, "sections", `${slug}.md`))) {
  console.error(`no catalog entry for ${id}; check the slug with: node library/scripts/find.mjs ${slug}`)
  process.exit(1)
}
const text = readFileSync(file || 0, "utf8")
if (text.trim().length < 200) {
  console.error("input looks empty or too short to be a prompt + code export; nothing written")
  process.exit(1)
}
const dir = join(VAULT, source, slug)
mkdirSync(dir, { recursive: true })
const header = `<!-- Imported ${new Date().toISOString().slice(0, 10)} from ${source}. Licensed material: for use in your own or client projects; do not redistribute. -->\n\n`
writeFileSync(join(dir, "prompt.md"), header + text)
console.log(`saved library/vault/${source}/${slug}/prompt.md (${text.length} chars)`)
