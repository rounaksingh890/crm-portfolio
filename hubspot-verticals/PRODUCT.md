# Product

## Register

product

## Users

Prospective agency clients (small-business owners, marketing managers, ops leads) who receive one link
and browse it on their phone or laptop to judge whether the agency can build and configure a CRM for
their industry. Secondary user: the agency owner demoing it live on Upwork calls.

## Product Purpose

A portfolio piece: four fully-configured, HubSpot-style CRM portals (medical clinic, B2B SaaS,
real estate brokerage, e-commerce brand) behind one landing page. Every screen is populated from one
consistent fictional dataset per industry, every number reconciles, and everything is clickable.
Success = a visitor picks their industry, clicks around for five minutes without hitting a dead end,
and thinks "they could build this for us."

## Brand Personality

Familiar, trustworthy, effortless. It should feel like HubSpot itself — light theme, calm chrome,
orange primary — not like a designer's reinterpretation of HubSpot. Copy is plain natural language
("Where enquiries come from", "Help desk"), never CRM jargon.

## Anti-references

- Dark "command-center" dashboards (the sibling sales-dashboards project already covers that).
- Lorem-ipsum demos with dead buttons, `#` links, or placeholder rows.
- Enterprise-software word salad: no "omnichannel", "synergy", "leverage", "360° views".
- Over-designed portfolio flash (parallax, gradient text, scroll hijacking) — this must read as a
  working tool, not a landing page.

## Design Principles

1. **Nothing is a dead end.** Every name, number, card, and row navigates somewhere real inside the app.
2. **Numbers agree everywhere.** KPIs, charts, and tables all derive from the same records at render time.
3. **Earned familiarity.** Standard affordances only — HubSpot users should feel at home in seconds.
4. **Plain words.** Labels a non-technical clinic receptionist would understand.
5. **Honest sample.** The demo says clearly that it is a sample with fictional data — on the landing
   page and in its own About section.

## Accessibility & Inclusion

- Body text ≥ 4.5:1 contrast on all surfaces; light theme only.
- Fully usable on a ~375px phone: structural responsive changes (tables become cards, board scrolls,
  bottom nav), not shrunken desktop.
- Keyboard: Esc closes overlays, visible focus rings, guided tour operable by buttons.
- `prefers-reduced-motion` disables all non-essential animation.
