# CRM Portfolio — three interactive samples, one engagement story

Three working, dependency-free sample apps that together walk through a whole CRM engagement:
clean up the data, build the system, and bring the client along. Everything is clickable, every
number is calculated live from the sample data, and **all names and figures are fictional**.

**Live:** open `index.html` (the hub) and pick a piece.

| # | Piece | What it shows | Folder |
|---|-------|---------------|--------|
| 1 | **Spreadsheet Rescue** | A messy customer spreadsheet becoming clean CRM records, every row traceable both ways | [`crm-migration/`](crm-migration/) |
| 2 | **Multi-industry CRM showcase** | One HubSpot-style build configured for four industries (medical, SaaS, real estate, e-commerce), ~20 screens each | [`hubspot-verticals/`](hubspot-verticals/) |
| 3 | **Client onboarding portal** | The single link a client gets after signing: live progress, plan, tasks, forms, approvals | [`client-onboarding/`](client-onboarding/) |

Each folder is self-contained and has its own README.

## Running locally

Any static file server works. From this folder:

```bash
python -m http.server 4184
```

then open <http://localhost:4184>. The hub and all three demos are served together, so the
cross-links between them work exactly as they will in production.

## Deploying to GitHub Pages

This repo is plain static HTML/CSS/JS with no build step. To publish:

1. Push it to a GitHub repository.
2. In the repo: **Settings → Pages → Build and deployment → Deploy from a branch**.
3. Choose the `main` branch and the `/ (root)` folder, then **Save**.
4. After a minute the site is live at `https://<your-username>.github.io/<repo-name>/`.

The `.nojekyll` file tells Pages to serve every file as-is.

## What's inside each demo

- **No dependencies, no build.** Vanilla HTML, CSS and JavaScript. Fonts load from Google Fonts.
- **One data file per demo.** Everything a demo shows is computed from a small, readable data file
  at render time, which is why every screen always agrees with the others.
- **Guided tours.** Each demo has a built-in walkthrough for first-time viewers.
- **Mobile-ready.** All three work on a phone.

## A note on the data

Every person, company, message, date and number across all three demos is invented. Nothing here
is real customer data, and the projects are not affiliated with or endorsed by HubSpot or any other
CRM vendor — they simply follow interface conventions people already know.
