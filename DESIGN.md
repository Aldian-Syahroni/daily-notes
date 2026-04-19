# Design Brief

## Direction

Daily Notes — A minimal, light productivity interface for capturing and organizing daily activities with clarity and trust.

## Tone

Cool-toned minimalism. Focused on reducing cognitive load through intentional use of color and spacing, avoiding warm clichés for notes apps (cream + terracotta).

## Differentiation

Alternating card backgrounds (white + subtle muted) create natural rhythm in lists without decoration, making each note feel like a contained moment.

## Color Palette

| Token      | OKLCH           | Role                          |
| ---------- | --------------- | ----------------------------- |
| background | 0.98 0.008 230  | Light cool off-white primary  |
| foreground | 0.18 0.015 230  | Deep text, maximum contrast   |
| card       | 1.0 0.004 230   | Note card background          |
| primary    | 0.42 0.14 240   | Deep ocean blue for CTAs      |
| accent     | 0.6 0.15 170    | Cool teal for secondary focus |
| muted      | 0.94 0.01 230   | List alternation backgrounds  |
| destructive| 0.55 0.22 25    | Red delete actions            |

## Typography

- Display: Space Grotesk — modern, confident headings and titles
- Body: Figtree — friendly, highly readable paragraph and UI text
- Scale: hero `text-3xl font-bold`, section heads `text-xl font-semibold`, body `text-base`

## Elevation & Depth

Subtle shadows on cards (xs, sm) create gentle separation from background. No blur or glow effects—depth via layers and color alone.

## Structural Zones

| Zone    | Background       | Border        | Notes                                  |
| ------- | ---------------- | ------------- | -------------------------------------- |
| Header  | card / primary   | border-b      | Top navigation, title, "+ New" button  |
| Content | background      | —             | List sections (Today/Yesterday/Older)  |
| Note    | card / muted alt | border subtle | Alternating backgrounds per list item  |
| Footer  | muted-foreground | border-t      | Minimal, right-aligned timestamps      |

## Spacing & Rhythm

Gap between sections: `gap-6`. Content padding: `px-6 py-4`. Card internal spacing: `p-4`. Micro-spacing uses `gap-2` for inline elements. Rhythm created through section grouping (Today, Yesterday, This Week).

## Component Patterns

- Buttons: Rounded medium (8px), deep blue primary, white text on hover darkens opacity
- Cards: Rounded 8px, subtle border, xs shadow. Hover adds light shadow lift.
- List items: Full-width, padding `p-4`, truncated preview at 100 chars
- Badges: Small rounded pill (full), muted background for timestamps

## Motion

- Entrance: Fade in on list load (100–150ms)
- Hover: Card shadow lifts, opacity slightly reduces on button
- Auto-save: Silent, no spinners—rely on timestamp update

## Constraints

- No gradients or full-page backgrounds
- No animations beyond hover states and fade-in
- Icons: 20–24px only
- Button text: sentence case, concise

## Signature Detail

Left border accent on note cards (2px, primary color) creates visual hierarchy within the list—immediately signals which note is hovered or focused without loud effects.


