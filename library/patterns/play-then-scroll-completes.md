# Play, then scroll completes

Open a scroll story with a small free-play interaction, then let scrolling finish the same action.
Seen in five of the scroll-story entries (wipe a surface, expose a print, arrange cuttings, and so on).

## How it works

- At progress 0 the stage is a toy: the pointer changes some state (a mask, a set of positions, an
  exposure level).
- Scroll drives the *same* state variable toward completion, usually with a visible agent (a bar that
  sweeps, a tool that moves) so the takeover reads as intentional.
- If the visitor never played, scrolling still produces the finished state. Nothing downstream depends
  on the play step having happened.

## Why it works

It gives pointer users something to do in the first second without making the story depend on it, and
it gives touch and keyboard users the full result through scroll alone.

## Cautions

- Keep the interaction state cheap to finish from any starting point (a threshold or a sweep, not a
  replay of the user's strokes).
- Offer a control that does the action for the visitor, and expose the result to assistive technology
  as plain text.
- Some references let the visitor export what they made as an image. That is a nice extra, not part of
  the pattern.
