---
id: "oversight-supply/evergrid-pricing-pricing-01"
name: "Evergrid Pricing - Pricing 01"
source: "oversight-supply"
source_url: "https://supply.madebyoversight.com/sections/evergrid-pricing-pricing-01"
preview_url: "https://supply.madebyoversight.com/sections?preview=evergrid-pricing-pricing-01"
kind: "pricing"
origin: "Evergrid template"
access: "free-with-account"
theme: "mixed"
summary: "Three equal dark-green plan cards on cream under a centred serif headline: name, blurb, big price, white pill CTA and two labelled check-lists, with a recommended tag and a full-width help strip below."
tags: ["saas", "pricing", "three-tier", "plan-cards", "dark-cards"]
techniques: ["pricing-cards", "grouped-feature-lists", "mono-label-accents", "text-swap-button", "load-in-sequence", "editorial-serif-display"]
stack: ["webflow", "css"]
complexity: "low"
---

# Evergrid Pricing - Pricing 01

> **Evidence note.** This section is a Webflow export. Its stylesheet, scripts, fonts and images load from a CDN our sandbox could not reach, so the live preview rendered unstyled. This entry is based on the public preview's DOM (structure, class roles, inline initial animation states) and the vendor's public thumbnail (a 2050px-wide still, colours sampled from it). Hover/click states and the 390px layout were not rendered; anything marked *inferred* follows from markup only.

## What it is

A straightforward three-tier pricing page top: headline, three plan cards, and a "not sure?" strip. It suits products with flat monthly plans. There is **no billing toggle** in this section - prices are fixed per month - and its strength is the card anatomy, where every tier has identical slots so plans compare line by line.

## Layout anatomy

- **Header:** centred `h1` on two lines and a two-line paragraph, constrained to roughly half the container.
- **Recommended tag:** a small pill with an accent dot, centred above the middle card and sitting in the gap between header and grid.
- **Grid:** three equal columns, gap about 2% of grid width (roughly 20-24px). Cards are equal height.
- **Card anatomy, top to bottom** (padding about 8% of card width):
  1. Plan name, then a one- or two-line description.
  2. Price row: large figure with a small "per month" caption baseline-aligned to its right.
  3. Full-width white pill button.
  4. List group A: small uppercase label, hairline rule, three check rows.
  5. List group B: same structure, four check rows.
  Row spacing in lists is about 2x the text size; the gap between groups is about 3x.
- **Help strip:** a full-grid-width dark bar beneath the cards with overlapping avatar circles on the left, a bold question and a muted sentence, and a circular arrow button at the far right.
- 390px layout not observed; the grid is a standard Webflow grid and is expected to drop to one column.

## Visual system

- **Type:** headline in Lora serif, deep green, about 48px equivalent; everything in the cards is a neutral sans (family not determined): plan name about 18px medium, description about 13px, price about 40px semi-bold, list labels about 9-10px uppercase with wide tracking, list rows about 12-13px.
- **Colour:** page cream `#f5f4eb`; cards and strip deep green `#234839`; in-card rule `#345648`; card text white, secondary text a grey-green tint; button white `#ffffff` with dark label; tag pill tan `#e3dfcc` with accent dot `#3ec41e`.
- **Shape and depth:** card radius about 8-10px (tighter than the template's image tiles); pill buttons fully rounded; thin check glyphs rather than badges; no shadows.

## Motion and interaction

- Header and each card are wrapped for a load-in reveal (cards appear in sequence after the heading; timing not determined).
- CTA hover: duplicated label for a vertical text swap plus an expanding overlay behind the arrow holders (this is the template's "fancy button" in its white variant).
- All three tiers are styled identically; the recommended plan is signalled only by the tag. Reduced-motion handling: not determined.

## Techniques worth reusing

- **Slot-aligned cards** - same number of list groups and the same labels in every card so rows line up across tiers without a table.
- **Uppercase micro-labels over a hairline** - gives long feature lists structure at very small cost. See `../../../patterns/evergrid-design-system.md`.
- **Help strip under the grid** - catches undecided visitors with a human route instead of a fourth "enterprise" card.

## Build brief

```text
Build a three-tier pricing section with dark cards on a light page.

Header: centred, max-width 640px. h1/h2 [PRICING HEADLINE] in a serif display face,
clamp(34px, 3.6vw, 52px), line-height 1.1; paragraph [SUPPORTING LINE] 17px/1.5. 56px gap to the grid.

Grid: 3 equal columns, gap 24px, align-items stretch, max-width 1120px. Above the featured column place a
small pill tag [RECOMMENDED LABEL] with an 8px accent dot (position it inside that column's cell so it
follows the card when stacked).

Card (<article>): background [BRAND_DARK], white text, radius 10px, padding 28px, flex column, gap 28px.
1) h3 [PLAN NAME] 18px/500 and [PLAN BLURB] 14px at 75% opacity, max two lines (reserve two lines' height).
2) Price: [PRICE] 44px/600 with [PERIOD] 12px at 60% opacity, baseline-aligned.
3) Button: full width, 44px high, pill, white surface, dark label [CTA LABEL].
4) Two list groups, each: label [GROUP LABEL] 10px uppercase, tracking 0.12em, 60% opacity; 1px rule at 12%
white; <ul> of [3-4 ITEMS] with a 14px check icon, 13px text, row gap 14px.

Optional billing switch: if [HAS ANNUAL PRICING], add a two-option segmented control above the grid
(role="radiogroup") that swaps price and period text and announces the change via aria-live.

Help strip: full grid width, same dark surface, radius 10px, padding 20px 24px, three overlapping 40px
avatars, [QUESTION] 15px/600, [ANSWER LINE] 14px muted, and a 48px circular arrow link at the right.

Motion: on load, reveal header then cards with 100ms stagger (opacity and 30px rise, 500ms). Button hover:
label rolls up and is replaced by a duplicate (aria-hidden).

Responsive: <=991px cards stack in one column at max-width 520px, featured plan first; <=480px padding 20px,
help strip stacks with the arrow below the text.

Reduced motion: no reveal or roll. Accessibility: prices are text, check icons aria-hidden, lists are real
lists, 4.5:1 contrast for muted text on the dark surface. Performance: no images required; CSS only.
```

## Adaptation notes

The source differentiates the recommended tier only with a floating tag; add a lighter surface or an outline if you need a stronger nudge. Muted text on the dark green is small - raise it to 13px minimum. If plans differ in list length, pad with "not included" rows instead of letting cards end at different heights. Add the billing switch only when annual pricing really exists.
