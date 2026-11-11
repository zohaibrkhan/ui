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
techniques: ["pricing-cards", "grouped-feature-lists", "uppercase-micro-labels", "editorial-serif-display"]
stack: ["webflow", "css"]
complexity: "low"
---

# Evergrid Pricing - Pricing 01

## What it is

A straightforward three-tier pricing block: headline, three plan cards and a "not sure?" strip. It suits products with flat monthly plans. The still shows no billing toggle - prices are per month only - and the strength is the card anatomy, where every tier has identical slots so plans compare line by line. This entry is based on the vendor's static public thumbnail (a 2050px-wide still); the live preview was unavailable to us, so sizes are proportions of that image and colours are sampled from a screenshot.

## Layout anatomy

- **Header:** centred two-line headline (about 50% of panel width) and a two-line paragraph (about 37%).
- **Recommended tag:** a small pill with an accent dot, centred above the middle card in the gap between header and grid.
- **Grid:** three equal cards, each about 29.5% of the panel width, gap about 1.8% (roughly 21px); side margins about 4%. Cards are equal height, ratio about 3:5.
- **Card anatomy, top to bottom** (inner padding about 8% of card width):
  1. Plan name, then a two-line description.
  2. Price row: large figure with a small "per month" caption on its baseline.
  3. Full-width white pill button, about 40px tall.
  4. List group A: tiny uppercase label, hairline rule, three check rows.
  5. List group B: same structure, four check rows.
  Check rows are about 30px apart; groups about 45px apart.
- **Help strip:** a full-grid-width dark bar about 85px tall, about 24px below the cards: three overlapping avatar circles, a bold question with a muted sentence under it, and a white circular arrow button at the far right.
- 390px layout and any toggle behaviour: not determined (live preview unavailable).

## Visual system

- **Type:** headline in a serif (reads as Lora), deep green, about 46-48px equivalent; card content in a neutral sans (family not determined): plan name about 18px medium, description about 13px, price about 40px semi-bold, list labels about 9px uppercase with wide tracking, rows about 12-13px.
- **Colour (sampled from a screenshot):** page cream `#f5f4eb`; cards and strip deep green `#234839`; in-card rule `#345648`; text white with grey-green secondary; button `#ffffff` with dark label; tag pill tan `#e3dfcc` with accent dot `#3ec41e`.
- **Shape and depth:** card radius about 8-10px (tighter than the template's image tiles); buttons fully rounded; thin check glyphs, not badges; no shadows. All three tiers are styled identically - only the tag marks the recommended one.

## Motion and interaction

Not determined (live preview unavailable). The thumbnail is a still, so no load, scroll, hover or focus behaviour was seen. One observed fact: the template is a Webflow build that loads GSAP 3 with ScrollTrigger and SplitText, so scroll-reveal and split-text motion are plausible, but we did not see them run. Reduced-motion handling: not determined.

## Techniques worth reusing

- **Slot-aligned cards** - same list groups and labels in every card so rows line up across tiers without a table.
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

The source differentiates the recommended tier only with a floating tag; add a lighter surface or outline for a stronger nudge. Secondary text on the dark green is very small - use 13px minimum and check contrast. If plans differ in list length, pad with "not included" rows. The billing switch in the brief is optional and is our addition; the still has none.
