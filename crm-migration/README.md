# Spreadsheet Rescue — a CRM migration, shown honestly

A sample project: one scrolling page that tells the full story of a CRM migration for a
fictional landscaping company —

1. **The spreadsheet, as found** — 30 rows recreated with all their real-world mess
   (duplicates, five phone formats, "TBD" in the money column, a header row pasted halfway
   down). Issue buttons light up each kind of problem; clicking any row shows what the
   migration did with it.
2. **The cleanup** — every merge and every archived row, traceable in both directions.
3. **The mapping** — spreadsheet column → CRM field, plus the 19-value status column
   mapped to 7 agreed stages.
4. **The CRM it became** — 22 clean contacts you can filter and open; every record keeps
   links to the original rows underneath it.
5. **The results** — pipeline totals and before/after data-quality bars, all **computed
   from the data at load time** (the "before" bars are produced by actually validating the
   messy cells — change one in `assets/data.js` and the numbers move).

All names, numbers and typos are fictional.

## Running it

Static site, no build step:

```
python -m http.server 4182
```

then open http://localhost:4182. Works on GitHub Pages as-is.

## Structure

```
index.html          entry point
assets/styles.css   the two visual worlds: spreadsheet vs CRM
assets/data.js      the messy rows + the clean records (edit these, everything follows)
assets/app.js       renderer, live validators, drawers, filters
```
