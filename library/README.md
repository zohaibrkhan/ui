# Design library

A personal reference library of design components, patterns, techniques and tools to pull from at the
start of a project. It lives beside the shadcn/ui source in this repo: shadcn supplies the component
primitives, this folder supplies the *ideas* - section structures, visual systems, motion techniques
and ready-to-use build briefs.

## Layout

```
library/
  catalog.json            Generated index of every entry and pattern. The machine-readable entry point.
  schema/
    entry.schema.json     Frontmatter contract for entries
    entry.template.md     Copy this to start a new entry
  sources/<source>/
    README.md             Provenance, licence notes, how to obtain originals
    sections/<slug>.md    One reference entry per section
  patterns/<slug>.md      Cross-cutting techniques that several entries share
  tools/<slug>.md         External tools and references worth reaching for (pointers, not mirrors)
  scripts/                build-catalog, find, import-section (plain Node, no dependencies)
  vault/                  Licensed originals (vendor prompt + code). Committed because this repo is private
```

## Using it

```bash
# search: free text plus filters
node library/scripts/find.mjs pricing
node library/scripts/find.mjs --kind scroll-story --technique webgl
node library/scripts/find.mjs dark --tag editorial --json

# after adding or editing entries
node library/scripts/build-catalog.mjs          # validate + regenerate catalog.json
node library/scripts/build-catalog.mjs --check  # validate only; fails if catalog.json is stale
```

Starting a project, the usual flow is: search the catalog for the section type you need, read two or
three entries, read the patterns they link to, then hand the entry's **Build brief** to your coding
agent with your own content and brand tokens.

## What an entry contains

Each entry is Markdown with a small frontmatter block (every line is `key: <JSON value>`, so it parses
without a YAML library) and a fixed set of sections:

| Section | Purpose |
| --- | --- |
| What it is | The job the section does and the idea that carries it |
| Layout anatomy | Structure, grid, pinning, responsive behaviour |
| Visual system | Type, colour roles, shape and depth, with observed values |
| Motion and interaction | What moves, what triggers it, reduced-motion behaviour |
| Techniques worth reusing | Named techniques, linked to `patterns/` where shared |
| Build brief | An original prompt for building a new section in this pattern |
| Adaptation notes | Fit, first changes to make, accessibility and performance cautions |

## Adding a source

1. Create `sources/<source>/README.md` recording where it came from, when it was reviewed, and what its
   licence allows.
2. Add entries under `sources/<source>/sections/` from `schema/entry.template.md`.
3. Promote anything that shows up in two or more entries to `patterns/`.
4. Run `node library/scripts/build-catalog.mjs`.

## Ground rules for what gets committed

- Entries are our own analysis and our own briefs. Third-party code, prompts, copy, images and fonts are
  committed only when their licence clearly allows redistribution, and the source README says so.
- Licensed-but-not-redistributable originals go in `vault/` via `scripts/import-section.mjs`. They are
  committed because this repository is private. Before making the repository public, or exposing it
  through a server other people can reach, remove `vault/` from the repo and its history.

## Toward an MCP server

The folder is already shaped like one. `catalog.json` is the resource index; the natural tool surface is
`search(query, kind?, tag?, technique?)` (what `scripts/find.mjs` does), `get_entry(id)`,
`get_pattern(id)` and `get_brief(id)` (the fenced block under "Build brief"). `scripts/lib.mjs` holds the
parsing those tools would share.

## Sources

| Source | Entries | Notes |
| --- | --- | --- |
| [oversight-supply](sources/oversight-supply/README.md) | 41 | Free sections from Oversight Supply. Analysis and original briefs, plus vendor originals for the 25 worth keeping in `vault/` |

## Tools

| Tool | Use it for |
| --- | --- |
| [Refero Styles](tools/refero-styles.md) | Picking a visual direction by reference and getting it as a DESIGN.md |
| [Subframe Motion](tools/subframe-motion.md) | Working React motion examples and motion-design guidance, queried through its MCP server |
