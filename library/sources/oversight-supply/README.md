# Oversight Supply - free sections

- **Site:** https://supply.madebyoversight.com/sections?price=free
- **Operator:** OversightStudio, LLC
- **Reviewed:** 2026-11-11 (41 free sections out of 70 listed)

## What is in this folder

`sections/<slug>.md` - one reference entry per free section: what it is, how it is laid out, the visual
system, the motion, the techniques worth reusing, and an original build brief for making something new
in the same pattern. Everything here was written from studying the **public** pages: the listing, each
section's detail page, and its live interactive preview.

## How much evidence each entry rests on

| Entries | Basis | What that means |
| --- | --- | --- |
| 19 Studio Originals (scroll stories, heroes, portfolio heroes, pricing) | Live public preview, exercised in a headless browser at desktop and phone widths and with reduced motion | Layout, type, colour, motion and interaction were observed. Each entry lists what could not be verified (for example audio, microphone input and form submission) |
| 22 `evergrid-*` template sections | One static public thumbnail each, plus the detail page text | Layout and colour are read from a screenshot, so sizes are estimates. Motion, hover states and mobile layouts are marked "not determined". Their live preview is served from a path the site's robots.txt disallows, so it was not used |

Entries are written at pattern level. They describe what a visitor can observe and the approach behind
it; they leave out implementation constants, and each build brief uses placeholder subject matter
rather than the vendor's concept.

## What is not in this folder, and why

The site's actual deliverable for each section is a "prompt + source code" block. It is free, but it is
released only to a signed-in account, and the site's terms say templates may be used "in your own or a
client project" but may not be redistributed. So:

- The vendor's prompts and source code are **not** committed here.
- Entries describe techniques in our own words. Build briefs are original and use placeholder content.
- No vendor screenshots, artwork, fonts or copy are stored in the repo.

## Adding the originals for your own use

1. Sign in at https://supply.madebyoversight.com/signin (a free account is enough for free sections).
2. Open a section, press **Copy prompt + code**.
3. File it locally:

   ```bash
   pbpaste | node library/scripts/import-section.mjs oversight-supply/<slug>
   ```

That writes `library/vault/oversight-supply/<slug>/prompt.md`. `library/vault/` is gitignored, and the
catalog marks the entry `has_original: true` on the machine where the file exists. Keep the vault out of
any public repository.
