---
id: "oversight-supply/pricing-choice"
name: "Choice"
source: "oversight-supply"
source_url: "https://supply.madebyoversight.com/sections/pricing-choice"
preview_url: "https://supply.madebyoversight.com/sections?preview=pricing-choice"
kind: "pricing"
origin: "Studio Original"
access: "free-with-account"
theme: "dark"
summary: "Pricing as a mobile checkout sheet: three radio plan cards where the chosen one unfolds, a monthly/yearly segmented control, a seat stepper, and a 'due today' total whose digits roll like an odometer."
tags: ["pricing", "dark", "mobile-first", "checkout", "aurora", "app-like", "single-column"]
techniques: ["pricing-toggle", "pricing-calculator", "rolling-number", "accordion", "glassmorphism", "gradient-mesh", "grain-texture", "grid-rows-height-animation", "segmented-control", "live-region-summary"]
stack: ["react", "css", "svg", "web-animations-api"]
complexity: "medium"
---

# Choice

## What it is

A pricing section that skips the comparison table and behaves like the last screen of an in-app purchase flow. One narrow glass panel holds the whole decision: pick a plan, pick a billing period, adjust seats if relevant, read one number, press one button. It suits consumer and prosumer products with two to four tiers where the page's job is to get a choice made, and pricing that will mostly be seen on phones.

## Layout anatomy

- Root is at least viewport height, centring its content on a near-black field with four large blurred colour blobs and a film-grain overlay. Two faint corner labels (section name left, brand right) sit at the top corners and disappear under 760px.
- **Panel:** a single column 420px wide (shrinking to fit), with a very large corner radius, a translucent dark fill and background blur. A short rounded bar at the bottom edge imitates a phone's home indicator.
- Inside, top to bottom, with bold group headings:
  1. Title.
  2. **Plans** (a `fieldset`): three stacked cards. Each header row has a glossy gradient icon tile, a small eyebrow line over the plan name, the price with its unit, and a custom radio. Collapsed cards are about 76px tall. The selected card expands (about 240px, or 300px for the per-seat plan) to reveal three feature rows (bold keyword, then a description), an optional seats stepper, and a small "how it works" link.
  3. **Billing** (a `fieldset`): a two-option segmented control with a sliding pill and a green discount tag on the yearly option.
  4. **Due today:** a box with the big total on the left and a two-line explanation on the right (billing cadence, and the saving in green).
  5. A terms line, then a full-width light CTA whose label names the selected plan.
- Because it is already one column there is little to reflow: under 420px the outer padding, panel radius and icon tiles shrink slightly. At 390px wide the panel is 370px.

## Visual system

- **Type:** Mona Sans (variable). Group headings 24px bold; plan names 18px bold; body about 13.5px; meta about 12px. The total is 28px bold with its currency symbol and cents smaller and greyer.
- **Colour:** page `#07070a`; cards `#212125`, selected `#26262b`; text `#f5f5f7` / `#b9b9c1` / `#85858e`; link blue `#6aa8ff`; savings green `#5ee0a0`; focus ring `#8ab4ff`. Icon tiles are two-stop gradients: sky to blue (`#8fdcff`, `#3474ff`), peach to pink (`#ffb18f`, `#ff4f8b`), lilac to violet (`#c7b2ff`, `#6a4dff`). Background blobs in violet, blue, red and lilac.
- **Shape and depth:** generous radii (about 22px cards, 16px boxes, 18px CTA). Borders are faint inset hairlines; the selected card swaps to a bright near-white ring with a drop shadow. Tiles have glossy inner highlights.

## Motion and interaction

Exercised in the live preview:

- **Plan selection** uses native radio inputs covering each card header, so the whole header is the hit area and arrow keys move between plans (confirmed). On change the old card's details collapse and the new one's open with a smooth height animation; its rows fade and slide in one after another; the radio fills white and its tick draws itself; an unselected card dips slightly while pressed.
- **Billing toggle:** the pill slides across with a little overshoot. Every card's price updates (yearly shows the discounted per-month rate), and the explanation line swaps with a small rise.
- **Pricing mechanics:** a free tier, a flat-rate tier and a per-seat tier. Yearly applies a percentage discount (20% in the demo) and is charged up front: the headline total becomes twelve discounted months, with the per-month equivalent and the amount saved shown beside it. Monthly shows one month and "billed monthly". The per-seat tier multiplies by the seat count. The free tier replaces the number with a word and a "no card" note, and the CTA wording changes.
- **Seat stepper** (inside the per-seat card only): minus and plus buttons with a lower and upper limit, disabling at each end; the count persists when switching plans and the total follows every click.
- **Rolling total:** each digit sits in a one-line window and slides vertically to its new value, columns very slightly staggered, edges softly masked. When the number gains or loses digits (for example crossing into thousands, which adds a comma) existing digits keep their place value, newcomers fade up and symbols glide sideways to their new positions.
- **Screen readers:** the animated digits are hidden; a visually hidden live region announces one sentence (plan, seats if any, amount due today, renewal cadence) shortly after changes settle.
- **Ambient:** the background blobs drift and breathe very slowly.
- **Reduced motion:** transitions and animations are switched off; values and layout simply change.

## Techniques worth reusing

- **Radio-card accordion** - native radios supply keyboard and form semantics; a state class or `:has()` styles the card. Selecting is expanding, so details never cost an extra click.
- **Animating to unknown height with grid rows** - transition a wrapper's grid row from zero to one fraction and clip the child. No measuring.
- **Odometer digits anchored from the right** (sketch below) - key columns by place value so units stay units as the number grows; use tabular numerals and locale-aware number formatting.
- **A settled live-region sentence** instead of exposing animated digits.
- **One-number checkout summary** - show what is charged today, with the per-month equivalent and saving beside it instead of inside every card.
- **CTA that names the choice**, confirming the selection at the point of commitment.

```css
/* one digit column; set --d (0-9) from script */
.col   { height: 1em; line-height: 1; overflow: clip; position: relative; }
.strip { position: absolute; inset: 0 0 auto; display: flex; flex-direction: column;
         transform: translateY(calc(var(--d) * -10%));
         transition: transform .5s ease-out; }
.strip > span { height: 1em; }
```

## Build brief

```text
Build a pricing section for [PRODUCT] that behaves like a compact checkout sheet instead of a comparison table.

Canvas: a full-height section with [PROJECT BACKGROUND]. Centre one panel, at most about 420px wide, containing everything; it should look the same on desktop and phone.

Panel content in order: heading; a plan group of [2-4] cards; a billing group with a two-option segmented control ([PERIOD A] / [PERIOD B with discount tag]); a "due today" box; a one-line terms note; one full-width primary button.

Plan cards: a radio group built on native inputs. Each card header shows an icon, a short positioning line, the plan name, the unit price (per month or per seat) and a radio indicator. Only the selected card is expanded, revealing [3] benefit rows (keyword plus one-line description) and, for per-seat plans, a seat stepper with minimum and maximum. Animate the expansion with the grid-rows technique and stagger the rows in.

Pricing logic: read prices from one config object. Amount due today = unit price x seats x number of periods charged up front. When the longer period is selected show the per-month equivalent and the saving versus the shorter period; for a free plan show a word instead of a number and a reassurance line. The button label names the selected plan.

Total display: render each digit as a clipped column over a 0-9 strip and slide to the value, keyed by place value from the right so digits stay put as the number grows; tabular numerals; locale-aware currency formatting.

Accessibility: fieldsets with legends, arrow-key selection, collapsed content inert, visible focus on the whole card, and a polite live region announcing "[Plan], [n] seats: [amount] due today, renews [cadence]" once changes settle. Hide the animated digits from assistive tech.

Reduced motion: no ambient background movement, no rolling digits, no staggered reveals; state changes are instant. Visual style: [PROJECT STYLE].
```

## Adaptation notes

- Best with two to four plans and three headline benefits each. If buyers need a full feature matrix, link to one; do not grow this panel.
- Collapsed cards hide their features, so the one-line positioning text has to carry each plan.
- The reference is honest about annual billing (large up-front total, small per-month figure). Keep that; do not headline the monthly equivalent when the charge is annual.
- Background blur over moving blobs is the main GPU cost; freeze or pre-render the background on low-power devices.
- The CTA is a plain link in the reference; in a real flow it should carry plan, period and seats into checkout.
- Page height changes a little between plans; reserve space if content follows the section.
