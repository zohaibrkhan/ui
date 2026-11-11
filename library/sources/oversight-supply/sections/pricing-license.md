---
id: "oversight-supply/pricing-license"
name: "License"
source: "oversight-supply"
source_url: "https://supply.madebyoversight.com/sections/pricing-license"
preview_url: "https://supply.madebyoversight.com/sections?preview=pricing-license"
kind: "pricing"
origin: "Studio Original"
access: "free-with-account"
theme: "light"
summary: "One-time licence pricing driven by a single 'active users' stepper: three nested cards re-price with rolling digits, mark which tier fits best, and disable tiers the team has outgrown."
tags: ["pricing", "light", "one-time-payment", "licence", "three-tier", "soft-ui", "calculator"]
techniques: ["pricing-calculator", "rolling-number", "best-fit-recommendation", "form-with-validation", "accordion", "grid-rows-height-animation", "pointer-tracking", "grain-texture", "live-region-summary", "animated-gradient-border"]
stack: ["react", "css", "svg", "web-animations-api"]
complexity: "medium"
---

# License

## What it is

A pricing hero for a pay-once product (the demo sells an icon library) where price depends on team size. Instead of a billing toggle there is one question, "how many active users?", and the three tier cards answer it live: each recalculates its price, one is flagged as the best fit, and tiers too small for the team are visibly ruled out. It suits lifetime licences, seat-based one-off purchases, templates, fonts and plugins.

## Layout anatomy

- Root is at least viewport height on a light grey field with a white glow at the top and fine grain.
- **Nav** (about 1120px max): logo mark with name left, a white pill link right.
- **Heading block**, centred: small kicker, a large two-line headline (74px at 1440) whose final phrase is greyed, then a white pill containing the label "Active users" and a stepper (minus button, numeric input, plus button).
- **Stage** (about 1120px max): a soft multi-colour glow behind the middle card, and three equal columns with a small gap, aligned to the top.
- **Card anatomy** (each about 361px wide at 1440): an outer rounded shell holding an inner, slightly smaller rounded panel, a "card within a card". The panel has: tier name with icon and an audience label after a divider; a badge slot on the right; a very large price with a small currency symbol and a "lifetime updates" suffix; one note line (per-user cost, or a warning); the action button or buttons. Below the panel, on the shell: five ticked feature lines, then a divider with a small square plus button in the middle that reveals three more lines.
- The middle card is dark, carries the "most popular" badge and sits a few pixels higher. The third card has two buttons (buy and contact).
- A centred fine-print line closes the section.
- **At 980px and below** the cards stack in one centred column about 520px wide and the best-fit card moves to the top regardless of its position. At 560px and below the stepper pill stacks its label above the control, prices and buttons shrink a little. At 390px the section is about 2300px tall.

## Visual system

- **Type:** Rethink Sans (variable). Bold headline with tight tracking; prices at 72px bold; tier names 17px semibold with a regular-weight grey audience label; features 15px with the key phrase in ink and the qualifier in grey.
- **Colour:** background `#efefef`; ink `#0e0e11`, secondary `#55555c`, tertiary `#8f8f97`; white panels on `#f9f9f9` shells. Dark card: shell `#1b1b1e`, panel a charcoal gradient (`#2e2e33` to `#232327`), text `#f4f4f6`. "Best fit" badge indigo text `#4b3df0` on `#eef0ff`. Warning and error red `#e5484d`. The logo mark and the popular badge use a rainbow sweep (pink, orange, yellow, mint, blue, violet).
- **Shape and depth:** large radii (about 32px shells, 26px panels), full-pill buttons, hairline outlines, very soft long shadows, light top-edge highlights. Buttons are subtle vertical gradients, light or dark.

## Motion and interaction

Exercised in the live preview:

- **Stepper:** plus and minus change the count by one and disable at the limits; the field also accepts typing. Invalid entries leave the last valid prices in place, put a red ring on the control and show a short message beneath it via `role="alert"`: one for empty, one for non-whole numbers, one for below the minimum, and one for above the maximum that points to contacting sales. Leaving the field restores the last valid number.
- **Pricing mechanics observed:** each tier has a base price that covers a number of users, a per-additional-user price, and a ceiling.
  - The smallest tier is single-user only: flat price, never changes.
  - The middle tier's base covers a small team; beyond that each added user raises the price by a fixed step until its ceiling.
  - The largest tier's base covers a bigger team, with a smaller step per extra user up to the overall maximum.
  - The note under each price shows the effective per-user cost, which falls as the team grows on the largest tier.
  - Feature lines restate how many users the licence covers (never fewer than the tier's included amount).
- **Best fit:** the cheapest tier that can hold the entered team gets the highlight: it rises slightly and, on the light cards, a "best fit" badge pops in. With one user it was the smallest tier; from two up to the middle tier's ceiling the middle; above that the largest. The middle card keeps its "most popular" badge regardless.
- **Outgrown tiers:** when the team exceeds a tier's ceiling, that card's note turns red and explains the limit, and its buy button dims and is marked `aria-disabled`. The price shown is that tier's maximum.
- **Rolling prices:** digits slide vertically to new values with a slight per-column stagger; when a price gains a digit the others shift across smoothly.
- **Popular badge:** a rainbow border that rotates continuously around a dark translucent pill.
- **"Everything included" toggle:** the plus button rotates into a cross (`aria-expanded`), and three more lines unfold with a height animation and a short stagger. Each card toggles independently.
- **Pointer:** the coloured glow behind the cards drifts lazily toward the cursor.
- **Screen readers:** a hidden live region announces, after a short pause, the team size, the best-fitting tier and its price; each price also has a hidden plain-text equivalent.
- **Reduced motion:** transitions and animations are off (no rolling, no rotating border) and the glow stays still.

## Techniques worth reusing

- **One input, every card answers** - a single quantity control above the tiers replaces per-card calculators and makes tiers directly comparable.
- **Computed recommendation** - derive "best fit" from the pricing function (cheapest tier that fits) and keep it separate from the marketing "most popular" label, so the page can be honest when they differ.
- **Rule-out states** - show why a tier does not apply and disable its action, instead of hiding it; visitors see the whole ladder.
- **Tier model as data** - base price, included quantity, step price, ceiling. One pure function returns price, covered quantity, per-unit cost and a fit flag for any tier and quantity, and drives cards, notes and announcements alike.
- **Rotating gradient border** - an oversized conic gradient spinning behind a slightly inset pill, clipped by the pill's rounded overflow.
- **Card-in-card shells** - a raised inner panel for the price and action, with secondary detail on the quieter outer shell.
- **Reorder on mobile** - promote the recommended card to first position when stacked.

## Build brief

```text
Build a pricing section for [PRODUCT], sold as [ONE-TIME LICENCE / QUANTITY-BASED PURCHASE], where a single quantity input re-prices every tier.

Header: nav, kicker, headline [HEADLINE], and directly beneath it a prominent stepper labelled [QUANTITY LABEL, e.g. team size] with minus and plus buttons around an editable number field.

Tiers: [3] cards in a row. Each card has a raised inner panel (tier name, audience label, badge slot, large price with suffix [TERM], one note line, primary button, optional secondary button) and, outside the panel, [4-6] feature lines plus an expandable "everything included" list. One tier may be visually inverted and carry a fixed marketing badge.

Pricing model: define each tier as data {base price, quantity included, price per extra unit, maximum quantity}. Write one pure function returning, for a tier and quantity: price, quantity covered, per-unit cost, whether the tier fits, and a reason if not. Use it everywhere.

Behaviour: on every valid change, roll each price to its new value, update the per-unit note and any feature text that mentions quantity, and mark the cheapest fitting tier as "best fit" (subtle lift plus badge). Tiers that cannot cover the quantity show the reason in a warning colour and disable their button without disappearing. Validate typed input (empty, non-integer, below minimum, above maximum with a route to sales), show a specific message next to the field, keep the last valid prices on screen and restore the last valid value on blur.

Responsive: below about 980px stack cards in a single centred column and move the best-fit card to the top; below about 560px stack the stepper label above the control.

Motion: digit-roll for prices, a height animation for the expandable list, a short pop for the badge. Under prefers-reduced-motion switch values instantly.

Accessibility: label the input and tie its error message to it as an alert; expose disabled actions properly; hide animated digits and provide plain-text prices; announce "[n] [units]: [tier] fits best at [price]" in a polite live region after changes settle. Format money with locale-aware formatting. Visual style: [PROJECT STYLE].
```

## Adaptation notes

- Works for any price that is a function of one number: seats, sites, projects, API volume bands, print quantities. With two inputs, add a second control and keep the cards as outputs.
- Decide what happens above the top ceiling; the reference shows an inline message steering to contact, and keeps the last valid state.
- In the reference the disabled buy control is a link with `aria-disabled`; use a real disabled button or remove it from the tab order consistently.
- When the best-fit card jumps to the top on mobile as the number changes, the layout shifts under the user's thumb; consider only reordering on load, or animating the move.
- "Most popular" and "best fit" can land on different cards; decide whether that is a feature or noise for your audience.
- The outgrown tier still displays its maximum price, which can read as a quote; consider greying the price too.
