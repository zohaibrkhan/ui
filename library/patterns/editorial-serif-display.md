# Editorial serif display

A serif face for headlines against a quiet sans for body and interface text, often with a monospace
for small labels. It is the most common trait in the catalog (32 of the entries so far), across both
the scroll stories and the Evergrid template.

## The recipe as observed

- **Display serif**, regular weight, tight leading and slightly negative tracking, frequently with one
  word or line in italic for emphasis. Faces seen: Instrument Serif, Lora.
- **Neutral sans** for body copy and controls at ordinary sizes. Seen: Inter.
- **Monospace labels** in small uppercase with wide tracking for kickers, counters and button text.
  Seen: IBM Plex Mono.
- Strong scale contrast: very large display against small body, with little in between.
- Warm off-white grounds and dark, slightly tinted inks rather than pure white and black.

## Using it

- Limit the serif to headings. Serif body text at interface sizes changes the character completely.
- Set display leading near 0.9-1.1 and check descenders do not collide on wrapped lines.
- Use the italic sparingly: one phrase per headline.
- Load only the weights used, and reserve space to avoid layout shift when the display face arrives.
- See [evergrid-design-system](evergrid-design-system.md) for a full system built on this pairing.
