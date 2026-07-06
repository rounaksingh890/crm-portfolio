# Client onboarding portal — sample project

The portal a client gets after signing: one link where their whole project lives.
Shown here for a fictional engagement — agency **NorthBeam Systems** implementing a CRM
for **Juniper Physio & Wellness**.

What's inside:

- **Home** — greeting, live progress ring, "waiting on you" list, next meeting, latest update.
- **The plan** — five phases, seventeen steps, each marked *yours* or *ours*. Steps that need
  something from the client show **"waiting on you"** and complete themselves the moment it's
  provided — approve the pipeline in Approvals and watch the plan step flip to done.
- **Your tasks** — a tickable list; the progress ring recalculates with every tick.
- **Forms & access** — two intake forms that save as you type (finishing one auto-ticks its
  task) and a system-access checklist with a reason for every key.
- **Documents** — shared both directions, with "mark as sent" reactions.
- **Approvals** — pipeline stages, custom fields and message templates, with real
  approve / request-changes buttons.
- **Meetings, Updates (with a working reply box), Team & help, FAQ** — and a built-in
  60-second guided tour.

Every number is computed from `assets/data.js` at render time. All names and details fictional.

## Running it

Static site, no build step:

```
python -m http.server 4183
```

then open http://localhost:4183. Works on GitHub Pages as-is.

## Structure

```
index.html          entry point
assets/styles.css   theme + all components
assets/data.js      the engagement story (edit this, everything follows)
assets/app.js       state, views, router, drawer, tour
```
