# CRM Showcase — four industries, one HubSpot-style build

A sample project: one link that opens four fully-configured, HubSpot-style CRM portals —

| Portal | Brand | Industry |
|---|---|---|
| Medical | BrightCare Health | Healthcare & clinics |
| SaaS | CloudMetric | B2B software |
| Real estate | Harborline Realty | Coastal brokerage |
| E-commerce | PeakGear Outfitters | Outdoor gear brand |

Each portal has its own dashboard, contacts, companies, deal pipeline (board + table), tasks,
meetings, help desk, shared inbox, email campaigns, forms, automations, reports, custom
properties and integrations — all populated from one fictional dataset per industry
(`assets/data/*.js`), so every number on every screen reconciles.

**Everything is clickable.** Rows open records, records link to their related records, KPI cards
jump to the screen behind the number, and there is a built-in guided tour for first-time viewers.

## Running it

It is a static site — no build step, no dependencies. Serve the folder with anything:

```
python -m http.server 4181
```

then open http://localhost:4181. It also works on GitHub Pages as-is (repo → Settings →
Pages → deploy from branch, root folder).

## Structure

```
index.html              entry point
assets/css/             base tokens · landing page · app shell · mobile rules
assets/js/core.js       state, hash router, helpers, derived metrics
assets/js/charts.js     dependency-free SVG charts
assets/js/ui.js         icons + shared components
assets/js/views/        one file per area of the app
assets/js/tour.js       guided tour
assets/js/app.js        top nav, search, boot
assets/data/            the four industry datasets (edit these to change everything)
```

All data is fictional. No real people, companies, or numbers.
