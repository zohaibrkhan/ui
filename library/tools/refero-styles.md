# Refero Styles

- **URL:** https://styles.refero.design/?sort=popular
- **Kind:** external reference tool (not mirrored here)
- **Reviewed:** 2026-11-11, listing page only
- **Status on the site:** Beta, "new styles added every week"

## What it is

A gallery of design systems extracted from real product websites. The site describes itself as
"2,000+ AI-readable design systems from leading product websites"; each style page offers colours,
typography, spacing, components and a `DESIGN.md` intended for use in Cursor, Claude Code, Codex, v0 or
Lovable. The listing can be sorted by Trending, Popular and Newest, and each style carries a short
mood line (for example "midnight precision instrument" for Linear, "warm paper notebook" for Notion).

Other areas linked from the listing:

- DESIGN.md examples: https://styles.refero.design/ai-agents/design-md-examples
- Design prompts: https://styles.refero.design/ai-agents/design-prompts
- AI design resources: https://styles.refero.design/ai-agents/design-resources
- Refero MCP ("Connect to your AI"): https://refero.design/mcp

## When to reach for it

- At project kickoff, to pick a visual direction by reference ("like Linear", "like Mercury") and get it
  as a written system an agent can follow, instead of describing a look from memory.
- To see how a good `DESIGN.md` is organised before writing one for your own brand.
- Alongside this library: entries under `sources/` give section structures and motion techniques;
  a Refero style gives the tokens and component rules to skin them with.

## Why it is not copied into this repo

The site's `robots.txt` disallows AI agents by name, including `anthropic-ai`, `ClaudeBot` and
`Claude-Web`, while allowing ordinary visitors. An agent bulk-downloading the style pages would go
against that, so nothing beyond this description is stored. The individual style pages were not opened
during review; licence terms for the `DESIGN.md` files were not determined.

## How to use it

1. Browse the site yourself and open the style you want.
2. Copy that style's `DESIGN.md` into the project you are starting (as `DESIGN.md` at the repo root, or
   wherever your agent looks for design guidance). Check the site's terms before committing it to a
   public repository.
3. For agent access, use the vendor's own MCP connection (https://refero.design/mcp) rather than
   scraping. Setup details were not reviewed here.

Styles you want to keep for repeated use can be noted below.

## Shortlist

| Style | Why | Link |
| --- | --- | --- |
| _add as you find them_ | | |
