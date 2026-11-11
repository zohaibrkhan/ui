---
id: "oversight-supply/pricing-studio"
name: "Studio"
source: "oversight-supply"
source_url: "https://supply.madebyoversight.com/sections/pricing-studio"
preview_url: "https://supply.madebyoversight.com/sections?preview=pricing-studio"
kind: "pricing"
origin: "Studio Original"
access: "free-with-account"
theme: "light"
summary: "Service-studio pricing in a bento of three offers with live capacity: a row of spot dots fills when you reserve, flips to a waitlist when full, and can be undone; billing toggle and add-on switch roll the prices."
tags: ["pricing", "light", "agency", "productized-service", "bento", "scarcity", "oversized-type"]
techniques: ["pricing-toggle", "bento-grid", "rolling-number", "availability-indicator", "optimistic-action-with-undo", "oversized-type", "testimonial-cards", "segmented-control", "grain-texture", "gradient-mesh", "live-region-summary"]
stack: ["react", "css", "svg", "web-animations-api"]
complexity: "medium"
---

# Studio

## What it is

A pricing section for a productised service (the demo is a design studio selling a monthly subscription, a larger managed retainer and one-off sprints). Its distinctive idea is that pricing for a service is really about capacity: the main card shows how many client spots remain this month as a row of dots, and the primary button reserves one in place, with confirmation, undo and a waitlist state. It suits agencies, consultancies, coaching, cohort courses and anything sold by limited slots.

## Layout anatomy

- Root is at least viewport height on a warm light-grey field with two large pastel glows (lilac-pink top right, peach bottom left) and grain.
- **Nav** (about 1100px max): logo, three links with the current page darker, a dark pill CTA at the right.
- **Head row:** an enormous two-line title at the left (136px at 1440, first line grey, second line ink) and, bottom-aligned at the right, a two-option billing segmented control with a green discount tag on the second option.
- **Grid** (about 1100px max): two equal columns with a small gap, and a third card spanning both columns beneath, a three-tile bento.
- **Card anatomy:** an outer rounded shell containing a raised inner panel, with secondary content on the shell below it.
  - *Subscription card* (light): name plus a status pill ("n of N spots left in [month]"), a row of five small dots (filled for booked, outlined for free), a two-line statement in large text (one line ink, one grey), then a foot row with price and reserve button on the left and a compact testimonial tile on the right (initials avatar, name, role, one-line quote). On the shell: a two-column list of eight features with small dot bullets.
  - *Retainer card* (dark): same structure without dots, a muted "limited availability" pill, a light "book a call" button, and seven features.
  - *Sprint card* (wide, light): name with a green turnaround pill and a very large two-line statement on the left; on the right a price labelled as a one-time fee, a small switch for fast delivery showing its surcharge, and a dark reserve button.
- A fine-print line sits under the grid.
- **At 960px and below** the grid becomes one column and the wide card's panel stacks its two halves. **At 640px and below** nav links hide, the head row stacks (toggle under the title), each card's foot row stacks (testimonial under the button, full width) and feature lists become one column. The title scales down to 64px at 390px wide, where the page is about 2200px tall.

## Visual system

- **Type:** Schibsted Grotesk (variable). The display title is semibold with very tight tracking and line height under 1; card statements are 30px medium; prices 30px semibold with a smaller currency symbol and a small grey unit; features 14px grey.
- **Colour:** background `#ebebea`; ink `#111111`, secondary `#4d4d4d`, tertiary `#9a9a9a`; white panels on near-white translucent shells. Dark card `#151515` shell with a `#2a2a2a` to `#222` panel. Green `#2d9a5a` (discount, turnaround pill on `#e2f4e8`, switch on, confirmed button); red `#e5484d` on `#fde8e8` for the fully-booked pill.
- **Shape and depth:** about 30px shell and 24px panel radii, full pills for buttons, tags and the toggle; hairline inner outlines; soft long shadows; gradient-filled buttons with a top highlight. Avatars are small gradient circles with initials.

## Motion and interaction

Exercised in the live preview:

- **Billing toggle** (native radios in a `fieldset`): a dark pill slides between the two options with a slight overshoot and label colours invert. Both recurring prices roll to a discounted figure (10% off in the demo) and the unit text swaps to say it is billed quarterly. The one-off sprint price is unaffected.
- **Reserve a spot:** clicking the subscription card's button fills the next dot with a pop, the pill text counts down by one, the button turns green with a self-drawing tick and a "reserved" label for about two seconds, and an "Undo" text button appears beside it and stays. The hidden live region restates the remaining spots.
- **Full:** when the last spot is taken every dot is filled, the pill turns red and names the date the next spots open, and the button's idle label becomes a waitlist invitation. Clicking it then confirms waitlist membership (green, tick) without changing the count.
- **Undo:** each press releases one reserved spot (never below the initial booked count), restoring pill, dots and button wording.
- **Month names** in the pill and buttons are derived from the current date (next month, and the month after for the reopening date), so the scarcity message never goes stale.
- **Fast-delivery switch** (checkbox with `role="switch"`): the knob slides with a small squash on press, the track turns green, the sprint price rolls up by the surcharge and the turnaround pill text changes from two weeks to one.
- **Sprint button:** shows a confirmed state for about two seconds, then resets.
- **Rolling prices:** per-digit vertical slides with a slight stagger; text that changes (pill, unit, button label) re-enters with a short rise.
- **Hover:** arrow icons in buttons nudge right; button shadows deepen.
- **Ambient:** the two background glows drift slowly.
- **Reduced motion:** all transitions and animations are off; states switch instantly.
- Nothing is submitted anywhere; reservation state lives only in the page.

## Techniques worth reusing

- **Capacity as the pricing visual** - a dot-per-slot row plus a sentence makes scarcity concrete and checkable, where a vague "limited" badge is not.
- **In-place optimistic action with undo** - the CTA changes the visible state immediately, confirms briefly, and offers a persistent undo, which lowers the commitment barrier of a "reserve" button.
- **State-dependent CTA wording** - one button whose label follows capacity: reserve, reserved, join waitlist, on the waitlist.
- **Date-relative copy** - compute month names from the clock so availability text is always current.
- **Add-on as a switch inside the card** - a single optional upgrade changes both price and promise (the turnaround pill) together.
- **Proof next to price** - a tiny testimonial tile in the same row as the price and button, where doubt peaks.
- **Bento of unequal offers** - two comparable recurring plans side by side and a structurally different one-off product as a full-width strip, so nobody tries to compare unlike things column by column.
- **Two-tone statements** - one sentence split into an ink half and a grey half for emphasis without extra weight or colour.

## Build brief

```text
Build a pricing section for [BUSINESS], which sells [SERVICE] in limited capacity, as a three-tile bento with live availability.

Header: nav; a very large two-line title; a billing-period segmented control ([PERIOD A] / [PERIOD B with discount tag]) aligned to the title's baseline on wide screens.

Tiles: each is an outer shell with a raised inner panel.
1. Primary recurring offer: name; a status pill "[x] of [N] spots left in [NEXT MONTH]"; a row of N dots (filled = taken); a two-part statement; price with unit; a "reserve" button; a compact testimonial (avatar, name, role, one line). Below the panel, a two-column list of [6-8] inclusions.
2. Premium recurring offer, visually inverted: name, a qualifier pill, statement, price, a "book a call" button, testimonial, [6-8] inclusions.
3. One-off offer spanning the full width: name, a delivery-time pill, a large statement, a one-time price, a switch for [ADD-ON] showing its surcharge, and a reserve button.

Behaviour: the billing control rolls both recurring prices to the discounted rate and updates the unit text; the one-off price is unaffected. Reserving fills the next dot, decrements the pill, shows a brief confirmed state on the button and reveals an Undo action. At zero spots the pill switches to a "fully booked until [DATE]" style and the button becomes a waitlist action with its own confirmation. Undo releases the visitor's own reservations only. The add-on switch rolls the one-off price and updates the delivery pill. Derive month names from the current date. Wire the reserve and waitlist actions to [BOOKING BACKEND]; update optimistically and roll back on failure.

Responsive: below about 960px one column, with the wide tile's halves stacked; below about 640px stack the header, stack price/button above the testimonial and use single-column inclusion lists.

Motion: digit-roll for prices, a pop for a newly filled dot, a drawn tick for confirmation, short rise-in for changed text. Under prefers-reduced-motion switch states instantly.

Accessibility: native radios and a real switch with visible focus; dots are decorative with the count in text; a polite live region announces remaining capacity; animated digits hidden with plain-text prices provided; confirmation is not conveyed by colour alone. Visual style: [PROJECT STYLE].
```

## Adaptation notes

- Only use live scarcity if it is true and backed by real data; invented countdowns damage trust and may breach consumer rules in some markets.
- In the reference the reservation is purely local; a real version needs the booking step (form, calendar or payment) to follow the click, and should say so on the button.
- The confirmed state reverts after a couple of seconds while Undo remains, so the only lasting evidence of a reservation is the dot and pill; consider a persistent "you hold a spot" state.
- The newly filled dot is distinguished only by its brief animation; under reduced motion give the visitor's own spot a distinct colour or outline.
- With more than about eight slots, replace dots with a segmented bar.
- The huge title is the hero; keep it to two short words or lines, or it will crowd the toggle on mid-width screens.
