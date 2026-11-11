import { readdirSync, readFileSync, existsSync, statSync } from "node:fs"
import { join, dirname, relative } from "node:path"
import { fileURLToPath } from "node:url"

export const LIB = join(dirname(fileURLToPath(import.meta.url)), "..")
export const SOURCES = join(LIB, "sources")
export const VAULT = join(LIB, "vault")

// Frontmatter is deliberately not YAML: every line is `key: <JSON value>`.
// That keeps the parser dependency-free and the values unambiguous.
export function parseEntry(file) {
  const text = readFileSync(file, "utf8")
  const m = text.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/)
  if (!m) throw new Error(`${file}: missing frontmatter`)
  const data = {}
  for (const line of m[1].split("\n")) {
    if (!line.trim()) continue
    const i = line.indexOf(":")
    if (i < 1) throw new Error(`${file}: bad frontmatter line: ${line}`)
    const key = line.slice(0, i).trim()
    try {
      data[key] = JSON.parse(line.slice(i + 1).trim())
    } catch {
      throw new Error(`${file}: value of "${key}" is not valid JSON`)
    }
  }
  return { data, body: m[2] }
}

export function listEntries() {
  const out = []
  if (!existsSync(SOURCES)) return out
  for (const source of readdirSync(SOURCES).sort()) {
    const dir = join(SOURCES, source, "sections")
    if (!existsSync(dir) || !statSync(dir).isDirectory()) continue
    for (const f of readdirSync(dir).sort()) {
      if (f.endsWith(".md")) out.push({ source, slug: f.slice(0, -3), file: join(dir, f) })
    }
  }
  return out
}

export function listPatterns() {
  const dir = join(LIB, "patterns")
  if (!existsSync(dir)) return []
  return readdirSync(dir)
    .filter((f) => f.endsWith(".md") && f !== "README.md")
    .sort()
    .map((f) => {
      const text = readFileSync(join(dir, f), "utf8")
      const title = (text.match(/^#\s+(.+)$/m) || [])[1] || f
      return { id: f.slice(0, -3), title, path: rel(join(dir, f)) }
    })
}

export const rel = (p) => relative(LIB, p).split("\\").join("/")
