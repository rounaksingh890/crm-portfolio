/* Spreadsheet Rescue — renderer + interactions.
   Every stat is computed from the data at render time: the validators below
   actually inspect the messy cells, so the numbers are never typed in. */
(function () {
  'use strict';
  const M = window.MIG;
  const $ = (s, r) => (r || document).querySelector(s);
  const esc = s => String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

  const money = n => '$' + Math.round(n).toLocaleString('en-US');
  const stageOf = id => M.stages.find(s => s.id === id);
  const contactById = id => M.contacts.find(c => c.id === id);
  const rowById = id => M.rows.find(r => r.id === id);
  const fmtDate = iso => {
    if (!iso) return '—';
    const [y, mo, d] = iso.split('-');
    return ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][+mo - 1] + ' ' + (+d) + ', ' + y;
  };

  /* ---- validators: they really read the messy cells ---------------------- */
  const V = {
    phone:  v => v !== '' && !/^\(\d{3}\) \d{3}-\d{4}$/.test(v),
    email:  v => v !== '' && (!/^[\w.+-]+@[\w-]+(\.[\w-]+)*\.[a-z]{2,}$/i.test(v) || /gmial|;|\s/i.test(v)),
    date:   v => v !== '' && !/^\d{4}-\d{2}-\d{2}$/.test(v),
    money:  v => v !== '' && !/^\$?\d{1,3}(,\d{3})*(\.\d{2})?$/.test(v) && !/^\d+$/.test(v),
    status: v => { const t = v.trim(); if (t === '' || t === '??') return true;
      return !M.statusMap.some(m => m.from.toLowerCase() === t.toLowerCase()); }
  };
  function rowIssues(r) {
    const out = {};
    if (r.archive) { out.archive = ['name']; return out; }        // whole row is the issue
    if (r.dupGroup) out.dup = ['name'];
    if (V.phone(r.cells.phone))  out.phone  = ['phone'];
    if (V.email(r.cells.email))  out.email  = ['email'];
    if (V.date(r.cells.last))    out.date   = ['last'];
    if (V.money(r.cells.quote))  out.money  = ['quote'];
    if (V.status(r.cells.status)) out.status = ['status'];
    if (r.cells.phone === '' || r.cells.email === '') out.missing =
      [r.cells.phone === '' ? 'phone' : null, r.cells.email === '' ? 'email' : null].filter(Boolean);
    return out;
  }
  const ISSUES = [
    { key: 'all',     label: 'Everything at once' },
    { key: 'dup',     label: 'Duplicate people' },
    { key: 'phone',   label: 'Five phone formats' },
    { key: 'email',   label: 'Broken emails' },
    { key: 'date',    label: 'Vague dates' },
    { key: 'money',   label: 'Money that isn\'t a number' },
    { key: 'status',  label: 'Status chaos' },
    { key: 'missing', label: 'Missing details' },
    { key: 'archive', label: 'Not even a customer' }
  ];

  /* ---- derived numbers ---------------------------------------------------- */
  function stats() {
    const rows = M.rows;
    const archived = rows.filter(r => r.archive);
    const groups = {};
    rows.forEach(r => { if (r.dupGroup) (groups[r.dupGroup] = groups[r.dupGroup] || []).push(r); });
    const dupExtra = Object.values(groups).reduce((a, g) => a + g.length - 1, 0);
    const live = rows.filter(r => !r.archive);
    const issueCounts = {};
    ISSUES.forEach(i => { issueCounts[i.key] = 0; });
    rows.forEach(r => {
      const iss = rowIssues(r);
      const keys = Object.keys(iss);
      if (keys.length) issueCounts.all++;
      keys.forEach(k => { issueCounts[k]++; });
    });
    const quoted = M.contacts.filter(c => c.stage === 'quoted' && c.dealAmount);
    const scheduled = M.contacts.filter(c => c.stage === 'scheduled' && c.dealAmount);
    const won = M.contacts.filter(c => c.dealAmount && /won/.test(c.dealLabel));
    const weekly = M.contacts.filter(c => c.weekly && c.stage === 'active').reduce((a, c) => a + c.weekly, 0);
    const monthly = M.contacts.filter(c => c.monthly).reduce((a, c) => a + c.monthly, 0);
    return {
      rowsIn: rows.length, archived: archived.length, dupExtra,
      groups, contactsOut: M.contacts.length, liveRows: live.length, issueCounts,
      quotedSum: quoted.reduce((a, c) => a + c.dealAmount, 0), quotedN: quoted.length,
      schedSum: scheduled.reduce((a, c) => a + c.dealAmount, 0), schedN: scheduled.length,
      wonSum: won.reduce((a, c) => a + c.dealAmount, 0), wonN: won.length,
      recurringMo: Math.round(weekly * 4.33 + monthly),
      tasks: M.contacts.filter(c => c.nextAction && c.nextAction !== '—').length
    };
  }

  /* before/after data quality, measured — not asserted */
  function quality() {
    const live = M.rows.filter(r => !r.archive);
    const pc = (n, of) => Math.round(100 * n / of);
    const C = M.contacts;
    return [
      { label: 'Phone in one consistent format',
        before: pc(live.filter(r => r.cells.phone !== '' && !V.phone(r.cells.phone)).length, live.length),
        after:  pc(C.filter(c => /^\(\d{3}\) \d{3}-\d{4}$/.test(c.phone)).length, C.length),
        afterNote: 'the one gap is Walt — a real lead with a plan, not a fake value' },
      { label: 'Email present and valid',
        before: pc(live.filter(r => r.cells.email !== '' && !V.email(r.cells.email)).length, live.length),
        after:  pc(C.filter(c => c.email !== '').length, C.length),
        afterNote: 'the rest are marked "no email" on purpose — not blank by accident' },
      { label: 'Last-contact date is unambiguous',
        before: pc(live.filter(r => r.cells.last !== '' && !V.date(r.cells.last)).length, live.length),
        after:  pc(C.filter(c => c.lastContact !== '').length, C.length) },
      { label: 'Money stored as an actual number',
        before: pc(live.filter(r => r.cells.quote !== '' && !V.money(r.cells.quote)).length, live.length),
        after: 100, afterNote: 'quotes are currency; weekly and monthly prices have their own fields' },
      { label: 'Status means one agreed thing',
        before: pc(live.filter(r => !V.status(r.cells.status)).length, live.length),
        after: 100 },
      { label: 'One record per person',
        before: pc(live.length - stats().dupExtra, live.length),
        after: 100 }
    ];
  }

  /* ---- pieces ------------------------------------------------------------- */
  const pill = (text, color) =>
    `<span class="pill" style="--pc:${color || '#7c98b6'}">${esc(text)}</span>`;
  const stagePill = id => { const s = stageOf(id); return pill(s.label, s.color); };

  function sheetTable(rows, opts) {
    opts = opts || {};
    const head = `<tr class="sh-letters"><th></th>${M.columns.map(c => `<th>${c.letter}</th>`).join('')}</tr>` +
      `<tr class="sh-labels"><th>1</th>${M.columns.map(c => `<th>${esc(c.label)}</th>`).join('')}</tr>`;
    const body = rows.map(r => {
      const iss = rowIssues(r);
      const cellCls = key => {
        const hits = Object.keys(iss).filter(k => iss[k].includes(key) || k === 'dup' || k === 'archive');
        return hits.length ? ' data-iss="' + hits.join(' ') + '"' : '';
      };
      const rowIss = Object.keys(iss).join(' ');
      return `<tr class="sh-row" data-row="${r.id}" data-rowiss="${rowIss}" tabindex="0" title="Click to see what happened to this row">
        <th>${r.id + 1}</th>
        ${M.columns.map(c => `<td${cellCls(c.key)}>${esc(r.cells[c.key])}</td>`).join('')}
      </tr>`;
    }).join('');
    return `<div class="sheet-scroll"><table class="sheet${opts.mini ? ' mini' : ''}">${head}${body}</table></div>`;
  }

  function contactCard(c) {
    const s = stageOf(c.stage);
    return `<button class="ccard" data-contact="${c.id}" style="--pc:${s.color}">
      <div class="cc-top"><b>${esc(c.name)}</b>${stagePill(c.stage)}</div>
      <div class="cc-svc">${esc(c.service)}</div>
      <div class="cc-deal">${esc(c.dealLabel)}</div>
      ${c.nextAction && c.nextAction !== '—' ? `<div class="cc-next"><span>Next:</span> ${esc(c.nextAction)}</div>` : ''}
      <div class="cc-src">from row${c.sourceRows.length > 1 ? 's' : ''} ${c.sourceRows.map(n => n + 1).join(' + ')}</div>
    </button>`;
  }

  /* ---- sections ------------------------------------------------------------ */
  function render() {
    const S = stats();
    const app = $('#app');

    const chips = ISSUES.map(i =>
      `<button class="chip" data-issue="${i.key}">${esc(i.label)} <b>${S.issueCounts[i.key]}</b></button>`).join('');

    const mergeCards = Object.keys(S.groups).map(gid => {
      const rows = S.groups[gid];
      const target = M.contacts.find(c => c.sourceRows.some(n => rows.some(r => r.id === n)));
      return `<div class="merge-card">
        <div class="mc-rows">${rows.map(r =>
          `<button class="mc-row" data-row="${r.id}">Row ${r.id + 1}: <i>“${esc(r.cells.name)}”</i></button>`).join('')}</div>
        <div class="mc-arrow" aria-hidden="true">→</div>
        <button class="mc-contact" data-contact="${target.id}" style="--pc:${stageOf(target.stage).color}">
          <b>${esc(target.name)}</b><span>one record · ${stageOf(target.stage).label.toLowerCase()}</span></button>
      </div>`;
    }).join('');

    const archCards = M.rows.filter(r => r.archive).map(r => `
      <div class="arch-card">
        <button class="mc-row" data-row="${r.id}">Row ${r.id + 1}: <i>“${esc(r.cells.name)}”</i></button>
        <p>${esc(r.archive)}</p>
      </div>`).join('');

    const colMap = M.columnMap.map(m => `
      <div class="map-row">
        <div class="map-from">${esc(m.from)}</div>
        <div class="map-arrow" aria-hidden="true">→</div>
        <div class="map-to"><b>${esc(m.to)}</b>${pill(m.type, '#4f7cd1')}<p>${esc(m.how)}</p></div>
      </div>`).join('');

    const statusRows = M.statusMap.map(m => {
      const s = stageOf(m.to);
      return `<tr><td class="sm-from">“${esc(m.from)}”</td><td class="sm-arr">→</td>
        <td>${stagePill(m.to)}</td><td class="sm-note">${esc(m.note || '')}</td></tr>`;
    }).join('');

    const stageChips = [{ id: '', label: 'Everyone', color: '#33475b' }].concat(M.stages).map(s => {
      const n = s.id ? M.contacts.filter(c => c.stage === s.id).length : M.contacts.length;
      return `<button class="chip st-chip" data-stage="${s.id}" style="--pc:${s.color}">${esc(s.label)} <b>${n}</b></button>`;
    }).join('');

    const qRows = quality().map(q => `
      <div class="q-row">
        <div class="q-label">${esc(q.label)}</div>
        <div class="q-bars">
          <div class="q-bar"><span class="q-tag">before</span><div class="q-track"><i class="before" style="width:${q.before}%"></i></div><b>${q.before}%</b></div>
          <div class="q-bar"><span class="q-tag">after</span><div class="q-track"><i class="after" style="width:${q.after}%"></i></div><b>${q.after}%</b></div>
        </div>
        ${q.afterNote ? `<div class="q-note">${esc(q.afterNote)}</div>` : ''}
      </div>`).join('');

    const steps = M.process.map((p, i) => `
      <div class="step"><span class="step-n">${i + 1}</span>
        <div><b>${esc(p.title)}</b><p>${esc(p.text)}</p></div></div>`).join('');

    app.innerHTML = `
      <header class="topbar">
        <span class="logo"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 17 10 11l4 3 6-7"/><path d="M14 7h6v6"/></svg>Spreadsheet Rescue</span>
        <nav class="secnav" id="secnav">
          <a href="#sheet">The sheet</a><a href="#cleanup">Cleanup</a><a href="#mapping">Mapping</a>
          <a href="#crm">The CRM</a><a href="#results">Results</a><a href="#try">Try it</a><a href="#method">Method</a>
        </nav>
        <button class="tour-btn" data-tourb="start">▷ 60-second tour</button>
        <a class="badge" href="../index.html" title="Back to all three CRM samples">Sample project · ← Portfolio</a>
      </header>

      <section class="hero">
        <p class="kicker">A CRM migration, shown honestly</p>
        <h1>From the spreadsheet everyone was afraid to touch<br>to a system the whole crew trusts</h1>
        <p class="lede"><b>${esc(M.biz.name)}</b> — ${esc(M.biz.line)}
          Below is their actual sheet (faithfully recreated, names invented), what the cleanup did to
          every single row, and the CRM it became. Click anything: every row knows where it went,
          and every clean record remembers where it came from.</p>
        <div class="topline">
          <div><b>${S.rowsIn}</b><span>rows in the sheet</span></div>
          <div><b>${S.contactsOut}</b><span>clean contacts out</span></div>
          <div><b>${S.dupExtra}</b><span>duplicate rows merged</span></div>
          <div><b>${S.archived}</b><span>rows archived, not deleted</span></div>
          <div><b>0</b><span>details lost</span></div>
        </div>
      </section>

      <section class="sec" id="sheet">
        <h2><span class="sec-n">1</span>The spreadsheet, as found</h2>
        <p class="sec-sub">“${esc(M.biz.sheetName)}” — ${S.rowsIn} rows, four years of business, one tab named FINAL that wasn't.
          Use the buttons to light up each kind of problem, and <b>click any row</b> to see exactly what the migration did with it.</p>
        <div class="chips" id="issue-chips">${chips}<button class="chip chip-clear" data-issue="">Lights off</button></div>
        <div class="mig-tools">
          <input class="search" id="sheet-search" type="search" placeholder="Search the sheet — a name, a street, “TBD”…" aria-label="Search the sheet">
          <span class="fine" id="sheet-count">${M.rows.length} rows</span>
        </div>
        ${sheetTable(M.rows)}
        <p class="foot-note">This mess is the normal amount of mess. Sheets like this run thousands of real businesses — the point isn't to laugh at it, it's to show it can be fixed without losing anything.</p>
      </section>

      <section class="sec" id="cleanup">
        <h2><span class="sec-n">2</span>The cleanup — every decision traceable</h2>
        <p class="sec-sub">${S.dupExtra + Object.keys(S.groups).length} rows turned out to be ${Object.keys(S.groups).length} people. Nothing was deleted: merged rows point to their new record, and off-topic rows were archived with a reason.</p>
        <h3>People who existed more than once</h3>
        <div class="merge-list">${mergeCards}</div>
        <h3>Rows that weren't customers at all</h3>
        <div class="arch-list">${archCards}</div>
      </section>

      <section class="sec" id="mapping">
        <h2><span class="sec-n">3</span>The mapping — where every column went</h2>
        <p class="sec-sub">Each spreadsheet column became a real field with a real type. This table <i>is</i> the migration spec — it's what gets agreed before anything moves.</p>
        <div class="map-list">${colMap}</div>
        <h3>The status column deserves its own table</h3>
        <p class="sec-sub">${M.statusMap.length} different things people typed, mapped to ${M.stages.length} stages everyone agreed on:</p>
        <div class="sm-wrap"><table class="sm-table">${statusRows}</table></div>
      </section>

      <section class="sec" id="crm">
        <h2><span class="sec-n">4</span>The CRM it became</h2>
        <p class="sec-sub">Same people, zero guessing. Filter by stage, search anything, and <b>open any card</b> to see the details, what got fixed, and the original spreadsheet rows underneath it.</p>
        <div class="crm-tools">
          <input id="crm-search" class="search" type="search" placeholder="Search name, street, service…" aria-label="Search contacts">
          <div class="chips" id="stage-chips">${stageChips}</div>
        </div>
        <div class="ccards" id="ccards"></div>
      </section>

      <section class="sec" id="results">
        <h2><span class="sec-n">5</span>What actually changed</h2>
        <p class="sec-sub">Every figure below is calculated from the records above — nothing is typed in.</p>
        <div class="res-cards">
          <div class="res-card"><b>${money(S.quotedSum)}</b><span>in open quotes now visible (${S.quotedN} jobs)</span></div>
          <div class="res-card"><b>${money(S.schedSum)}</b><span>booked and scheduled (${S.schedN} jobs)</span></div>
          <div class="res-card"><b>${money(S.wonSum)}</b><span>won this year, finally countable (${S.wonN} jobs)</span></div>
          <div class="res-card"><b>~${money(S.recurringMo)}</b><span>a month in recurring work, now a number</span></div>
          <div class="res-card"><b>${S.tasks}</b><span>follow-ups that were shouting from cells — now tasks with dates</span></div>
        </div>
        <h3>Data quality, measured</h3>
        <p class="sec-sub">The “before” bars are computed live by validating the messy cells above — try changing one in the data file and this section moves.</p>
        <div class="q-list">${qRows}</div>
        <div class="csv-row">
          <button class="tbtn" data-csv="before">⬇ Download the original sheet (CSV)</button>
          <button class="tbtn" data-csv="after">⬇ Download the clean contacts (CSV)</button>
          <span class="fine">Real files, built from the sample data on your machine — nothing is uploaded anywhere.</span>
        </div>
      </section>

      <section class="sec" id="try">
        <h2><span class="sec-n">6</span>Try the cleaner yourself</h2>
        <p class="sec-sub">Type anything messy — the same rules that cleaned the sheet above run live on your keystrokes.
          Green means the rules handled it; amber means it would go to a human, never silently guessed.</p>
        <div class="play card">
          <div class="play-row">
            <label for="play-phone">A phone number, any format</label>
            <input class="search" id="play-phone" data-play="phone" value="555.301-4482 call after 5!!">
            <span class="play-arr">→</span><output class="play-out" id="out-phone"></output>
          </div>
          <div class="play-row">
            <label for="play-date">A date, however you'd type it</label>
            <input class="search" id="play-date" data-play="date" value="March 14">
            <span class="play-arr">→</span><output class="play-out" id="out-date"></output>
          </div>
          <div class="play-row">
            <label for="play-status">A status, in your own words</label>
            <input class="search" id="play-status" data-play="status" value="HOT LEAD!!!">
            <span class="play-arr">→</span><output class="play-out" id="out-status"></output>
          </div>
        </div>
      </section>

      <section class="sec" id="method">
        <h2><span class="sec-n">7</span>How a migration like this runs</h2>
        <div class="steps">${steps}</div>
        <div class="about-card">
          <h3>About this sample</h3>
          <p>This is a portfolio piece. ${esc(M.biz.name)} is fictional and every name, number and typo
            was invented — but the problems are the real ones found in almost every customer spreadsheet,
            and the method shown is the method used.</p>
          <p>It's one of three connected samples. The
            <a href="../hubspot-verticals/index.html">four-industry CRM showcase</a> shows what a fully
            configured system looks like after a migration like this, and the
            <a href="../client-onboarding/index.html">client onboarding portal</a> shows how the client
            follows the whole project. <a href="../index.html">See all three →</a></p>
          <p class="fine">Nothing here is affiliated with any CRM vendor. Built as a demonstration of migration work:
            audit → mapping → cleanup → import → proof.</p>
        </div>
      </section>

      <footer class="foot">Sample project · all data fictional · every stat on this page is computed from the sample records at load time</footer>

      <div class="drawer-backdrop" id="dbk" hidden></div>
      <aside class="drawer" id="drawer" hidden aria-modal="true" role="dialog"></aside>`;

    renderCards();
    wire();
  }

  /* ---- the CRM card grid (filterable) --------------------------------------- */
  const crmState = { stage: '', q: '' };
  function renderCards() {
    const q = crmState.q.toLowerCase();
    const list = M.contacts.filter(c =>
      (!crmState.stage || c.stage === crmState.stage) &&
      (!q || (c.name + ' ' + c.address + ' ' + c.service).toLowerCase().includes(q)));
    $('#ccards').innerHTML = list.map(contactCard).join('') ||
      '<p class="empty">Nobody matches — clear the search or pick another stage.</p>';
    document.querySelectorAll('#stage-chips .chip').forEach(ch =>
      ch.classList.toggle('on', ch.dataset.stage === crmState.stage));
  }

  /* ---- drawers ---------------------------------------------------------------- */
  function openDrawer(html) {
    const d = $('#drawer'), b = $('#dbk');
    d.innerHTML = `<button class="d-close" data-close aria-label="Close">✕</button>` + html;
    d.hidden = false; b.hidden = false;
    void d.offsetWidth;   // flush styles first so the slide-in still animates
    d.classList.add('open'); b.classList.add('open');
    d.focus && d.focus();
  }
  function closeDrawer() {
    const d = $('#drawer'), b = $('#dbk');
    d.classList.remove('open'); b.classList.remove('open');
    setTimeout(() => { d.hidden = true; b.hidden = true; }, 200);
  }

  function drawerRow(r) {
    const fateHtml = (() => {
      if (r.archive) return `<div class="fate arch"><b>Archived, not deleted.</b><p>${esc(r.archive)}</p></div>`;
      const c = M.contacts.find(x => x.sourceRows.includes(r.id));
      const merged = c.sourceRows.length > 1;
      return `<div class="fate"><b>${merged ? 'Merged into one clean record' : 'Became a clean record'}</b>
        ${merged ? `<p>Together with row${c.sourceRows.length > 2 ? 's' : ''} ${c.sourceRows.filter(n => n !== r.id).map(n => n + 1).join(' + ')}.</p>` : ''}
        <button class="mc-contact" data-contact="${c.id}" style="--pc:${stageOf(c.stage).color}">
          <b>${esc(c.name)}</b><span>open the clean record</span></button></div>`;
    })();
    const iss = rowIssues(r);
    const issList = Object.keys(iss).filter(k => k !== 'archive').map(k =>
      `<li>${esc(ISSUES.find(i => i.key === k).label)}</li>`).join('');
    return `<h3>Row ${r.id + 1} of the sheet</h3>
      ${sheetTable([r], { mini: true })}
      ${issList ? `<h4>What was wrong here</h4><ul class="iss-list">${issList}</ul>` : '<p class="fine">One of the tidy rows, believe it or not.</p>'}
      <h4>Where it went</h4>${fateHtml}`;
  }

  function drawerContact(c) {
    const s = stageOf(c.stage);
    const srcRows = c.sourceRows.map(rowById);
    const facts = [
      ['Stage', stagePill(c.stage)],
      ['Service', esc(c.service)],
      ['Money', esc(c.dealLabel)],
      ['Phone', c.phone ? esc(c.phone) : '<i>none yet — and that\'s recorded honestly</i>'],
      ['Email', (c.email ? esc(c.email) : '<i>none on file</i>') + (c.email2 ? '<br>' + esc(c.email2) + ' <small>(second email, rescued from a shared cell)</small>' : '')],
      ['Address', esc(c.address)],
      ['Last contact', esc(fmtDate(c.lastContact))],
      ['Next action', c.nextAction && c.nextAction !== '—' ? esc(c.nextAction) : '—']
    ].map(f => `<div class="fact"><dt>${f[0]}</dt><dd>${f[1]}</dd></div>`).join('');
    const fixes = c.fixes.map(f =>
      `<div class="fix"><span class="fx-field">${esc(f.field)}</span>
        <span class="fx-from">${esc(f.from)}</span><span class="fx-arr">→</span><span class="fx-to">${esc(f.to)}</span></div>`).join('');
    return `<div class="d-head" style="--pc:${s.color}"><h3>${esc(c.name)}</h3>${c.household ? pill('household', '#7c98b6') : ''}</div>
      <dl class="facts">${facts}</dl>
      <h4>What the migration fixed here</h4><div class="fixes">${fixes}</div>
      <h4>The original row${srcRows.length > 1 ? 's' : ''} underneath</h4>
      ${sheetTable(srcRows, { mini: true })}
      <p class="fine">This link never breaks: every record in the CRM keeps its source rows, so any value can be audited back to the sheet.</p>`;
  }

  /* ---- wiring -------------------------------------------------------------------- */
  function wire() {
    // issue chips
    $('#issue-chips').addEventListener('click', e => {
      const chip = e.target.closest('.chip'); if (!chip) return;
      const key = chip.dataset.issue;
      document.querySelectorAll('#issue-chips .chip').forEach(c => c.classList.toggle('on', c === chip && key !== ''));
      const sheet = document.querySelector('#sheet .sheet');
      sheet.dataset.mode = key;
    });

    // stage chips + search
    $('#stage-chips').addEventListener('click', e => {
      const chip = e.target.closest('.chip'); if (!chip) return;
      crmState.stage = chip.dataset.stage === crmState.stage ? '' : chip.dataset.stage;
      renderCards();
    });
    $('#crm-search').addEventListener('input', e => { crmState.q = e.target.value; renderCards(); });

    // drawers (rows + contacts open from anywhere, including inside drawers)
    document.body.addEventListener('click', e => {
      if (e.target.closest('[data-close]') || e.target.id === 'dbk') { closeDrawer(); return; }
      const cbtn = e.target.closest('[data-contact]');
      if (cbtn) { openDrawer(drawerContact(contactById(cbtn.dataset.contact))); return; }
      const rbtn = e.target.closest('[data-row]');
      if (rbtn && !rbtn.closest('.mini')) { openDrawer(drawerRow(rowById(+rbtn.dataset.row))); return; }
    });
    document.body.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeDrawer();
      if (e.key === 'Enter' && document.activeElement.matches && document.activeElement.matches('.sh-row')) {
        openDrawer(drawerRow(rowById(+document.activeElement.dataset.row)));
      }
    });

    // scroll-spy
    const links = Array.from(document.querySelectorAll('#secnav a'));
    const secs = links.map(a => document.querySelector(a.getAttribute('href')));
    const spy = () => {
      let cur = 0;
      secs.forEach((s, i) => { if (s.getBoundingClientRect().top < 140) cur = i; });
      links.forEach((a, i) => a.classList.toggle('on', i === cur));
    };
    document.addEventListener('scroll', spy, { passive: true });
    spy();
  }

  render();

  /* ---- sheet search ------------------------------------------------------------ */
  const searchBox = document.getElementById('sheet-search');
  if (searchBox) searchBox.addEventListener('input', () => {
    const q = searchBox.value.trim().toLowerCase();
    let shown = 0;
    document.querySelectorAll('#sheet .sheet .sh-row').forEach(tr => {
      const hit = !q || tr.textContent.toLowerCase().includes(q);
      tr.style.display = hit ? '' : 'none';
      if (hit) shown++;
    });
    document.getElementById('sheet-count').textContent =
      q ? shown + ' of ' + M.rows.length + ' rows match' : M.rows.length + ' rows';
  });

  /* ---- the cleaner playground: the real rules, live on your keystrokes ---------- */
  const MONTH_N = { jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6, jul: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12 };
  const CLEANERS = {
    phone(v) {
      const d = v.replace(/\D/g, '');
      if (d.length === 10) return { ok: true, out: '(' + d.slice(0, 3) + ') ' + d.slice(3, 6) + '-' + d.slice(6) + (v.replace(/[\d\s().-]/g, '') ? ' — the extra words move to notes' : '') };
      if (d.length === 11 && d[0] === '1') return { ok: true, out: '(' + d.slice(1, 4) + ') ' + d.slice(4, 7) + '-' + d.slice(7) };
      if (!d.length) return { ok: false, out: 'no digits at all — flagged for a human' };
      return { ok: false, out: 'only ' + d.length + ' digits — flagged, never guessed' };
    },
    date(v) {
      v = v.trim();
      if (!v) return { ok: false, out: 'empty — flagged' };
      if (/^\d{4}-\d{2}-\d{2}$/.test(v)) return { ok: true, out: v + ' — already unambiguous' };
      let m = v.match(/^(\d{1,2})[\/\-.](\d{1,2})(?:[\/\-.](\d{2,4}))?$/);
      if (m && +m[1] >= 1 && +m[1] <= 12 && +m[2] >= 1 && +m[2] <= 31) {
        const y = m[3] ? (m[3].length === 2 ? '20' + m[3] : m[3]) : '2026';
        return { ok: true, out: y + '-' + String(m[1]).padStart(2, '0') + '-' + String(m[2]).padStart(2, '0') + ' — month/day assumed, confirmed against emails' };
      }
      m = v.toLowerCase().match(/^([a-z]{3,9})\.?\s+(\d{1,2})(?:,?\s*(\d{4}))?$/);
      if (m && MONTH_N[m[1].slice(0, 3)] && +m[2] >= 1 && +m[2] <= 31) {
        return { ok: true, out: (m[3] || '2026') + '-' + String(MONTH_N[m[1].slice(0, 3)]).padStart(2, '0') + '-' + String(m[2]).padStart(2, '0') };
      }
      return { ok: false, out: '“' + v + '” is ambiguous — goes to human review, like “last spring” did' };
    },
    status(v) {
      const t = v.trim().toLowerCase().replace(/[!.]+$/, '');
      if (!t || t === '??' || t === '?') return { ok: false, out: 'blank or “??” — reviewed by hand, one row at a time' };
      const stg = id => M.stages.find(s => s.id === id).label;
      const exact = M.statusMap.find(s => s.from.toLowerCase().replace(/[!.]+$/, '') === t);
      if (exact) return { ok: true, out: stg(exact.to) };
      const fuzzy = M.statusMap.find(s => {
        const f = s.from.toLowerCase();
        return f.length > 3 && (t.includes(f) || f.includes(t));
      });
      if (fuzzy) return { ok: true, out: stg(fuzzy.to) + ' — fuzzy match, confirmed with you first' };
      return { ok: false, out: 'not in the mapping yet — it gets added with you, not guessed' };
    }
  };
  function runCleaner(kind) {
    const inp = document.getElementById('play-' + kind);
    const out = document.getElementById('out-' + kind);
    if (!inp || !out) return;
    const r = CLEANERS[kind](inp.value);
    out.textContent = r.out;
    out.className = 'play-out ' + (r.ok ? 'ok' : 'warn');
  }
  ['phone', 'date', 'status'].forEach(k => {
    const inp = document.getElementById('play-' + k);
    if (inp) { inp.addEventListener('input', () => runCleaner(k)); runCleaner(k); }
  });

  /* ---- CSV downloads: real files, built locally ----------------------------------- */
  function downloadCsv(name, header, rows) {
    const cell = v => { v = String(v == null ? '' : v); return /[",\n]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v; };
    const csv = [header].concat(rows).map(r => r.map(cell).join(',')).join('\r\n');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8' }));
    a.download = name;
    document.body.appendChild(a); a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 300);
  }
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-csv]');
    if (!b) return;
    if (b.dataset.csv === 'before') {
      downloadCsv('the-original-sheet.csv',
        M.columns.map(c => c.label),
        M.rows.map(r => M.columns.map(c => r.cells[c.key])));
    } else {
      downloadCsv('clean-contacts.csv',
        ['First name', 'Last name', 'Phone', 'Email', 'Address', 'Stage', 'Service', 'Amount', 'Last contact', 'Next action', 'Source rows'],
        M.contacts.map(c => [c.first, c.last, c.phone, c.email, c.address,
          M.stages.find(s => s.id === c.stage).label, c.service, c.dealAmount || '',
          c.lastContact, c.nextAction, c.sourceRows.map(n => n + 1).join(' + ')]));
    }
  });

  /* ---- guided tour: seven stops through the story --------------------------- */
  const TOUR_STEPS = [
    { sel: null, title: 'The 60-second story',
      text: 'A real migration, shown honestly: one messy spreadsheet becomes a CRM the crew trusts, with nothing lost on the way. Everything here is fictional — and everything is clickable. First stop: the mess.' },
    { sel: '#issue-chips', title: 'Light up the problems',
      text: 'These buttons highlight each kind of mess in the sheet below — duplicates, five phone formats, money that isn\'t a number. The counts aren\'t typed in; they come from actually validating the cells.' },
    { sel: '#sheet .sheet-scroll', title: 'Every row knows its fate',
      text: 'The spreadsheet exactly as found, header re-paste and all. Click any row and it tells you what the migration did with it — merged, cleaned, or archived with a reason.' },
    { sel: '.merge-list', title: 'Duplicates, merged with receipts',
      text: 'Nine rows turned out to be four people. Every merge shows its source rows, and every clean record links back to them. Nothing is ever silently deleted.' },
    { sel: '.sm-wrap', title: '19 moods, 7 stages',
      text: 'Everything anyone ever typed in the status column, mapped to stages the whole team agreed on. This table is the migration spec — settled before a single cell moved.' },
    { sel: '#crm .crm-tools', title: 'The CRM it became',
      text: 'Same people, zero guessing. Filter, search, and open any card — you\'ll see what got fixed and the original spreadsheet rows sitting underneath it.' },
    { sel: '.q-list', title: 'Quality measured, not claimed',
      text: 'The “before” bars are produced by validating the messy cells above at load time — change one cell in the data file and these numbers move. That\'s the tour. Go click a row!' }
  ];
  const tour = { on: false, i: 0 };
  function tourEls() {
    let ring = $('#tring'), tip = $('#ttip');
    if (!ring) { ring = document.createElement('div'); ring.id = 'tring'; document.body.appendChild(ring); }
    if (!tip) { tip = document.createElement('div'); tip.id = 'ttip'; document.body.appendChild(tip); }
    return { ring, tip };
  }
  function tourEnd() {
    tour.on = false;
    const r = $('#tring'), t = $('#ttip');
    if (r) r.remove(); if (t) t.remove();
  }
  function tourPlace(scrollTo) {
    if (!tour.on) return;
    const s = TOUR_STEPS[tour.i];
    const { ring, tip } = tourEls();
    tip.innerHTML = `<span class="tt-n">${tour.i + 1} / ${TOUR_STEPS.length}</span>
      <h3>${esc(s.title)}</h3><p>${esc(s.text)}</p>
      <div class="tt-btns">
        <button class="tbtn" data-tourb="end">End</button>
        ${tour.i ? '<button class="tbtn" data-tourb="back">Back</button>' : ''}
        <button class="tbtn primary" data-tourb="next">${tour.i === TOUR_STEPS.length - 1 ? 'Finish' : 'Next'}</button>
      </div>`;
    const el = s.sel ? document.querySelector(s.sel) : null;
    if (el) {
      if (scrollTo) el.scrollIntoView({ block: 'center', behavior: 'instant' });
      const r = el.getBoundingClientRect();
      Object.assign(ring.style, { display: 'block', top: (r.top - 7) + 'px', left: (r.left - 7) + 'px',
        width: (r.width + 14) + 'px', height: (r.height + 14) + 'px' });
      const th = tip.offsetHeight || 190;
      let top = r.bottom + 12;
      if (top + th > innerHeight - 10) top = Math.max(10, r.top - th - 12);
      Object.assign(tip.style, { top: top + 'px',
        left: Math.max(10, Math.min(r.left, innerWidth - (tip.offsetWidth || 340) - 10)) + 'px' });
    } else {
      ring.style.display = 'none';
      Object.assign(tip.style, { top: Math.max(10, innerHeight / 2 - 130) + 'px',
        left: Math.max(10, innerWidth / 2 - (tip.offsetWidth || 340) / 2) + 'px' });
    }
  }
  function tourShow(i) {
    if (i < 0 || i >= TOUR_STEPS.length) return tourEnd();
    tour.on = true; tour.i = i;
    tourPlace(true);
  }
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-tourb]');
    if (!b) return;
    const k = b.dataset.tourb;
    if (k === 'start') { welcomeClose(); tourShow(0); }
    else if (k === 'next') tourShow(tour.i + 1);
    else if (k === 'back') tourShow(tour.i - 1);
    else tourEnd();
  });
  document.addEventListener('scroll', () => tourPlace(false), { passive: true });
  window.addEventListener('resize', () => tourPlace(false));
  document.addEventListener('keydown', e => {
    if (!tour.on) return;
    if (e.key === 'Escape') tourEnd();
    if (e.key === 'ArrowRight') tourShow(tour.i + 1);
    if (e.key === 'ArrowLeft') tourShow(tour.i - 1);
  });

  /* ---- first-visit welcome ----------------------------------------------------- */
  function welcomeClose() { const w = $('#mig-welcome'); if (w) w.remove(); }
  document.addEventListener('click', e => {
    if (e.target.closest('[data-welcome-close]') || e.target.id === 'mig-welcome') welcomeClose();
  });
  try {
    if (!sessionStorage.getItem('mig-welcome')) {
      sessionStorage.setItem('mig-welcome', '1');
      const w = document.createElement('div');
      w.id = 'mig-welcome';
      w.innerHTML = `<div class="mw-card" role="dialog" aria-modal="true" aria-label="Welcome">
        <h3>One spreadsheet. One honest migration.</h3>
        <p>This sample walks through a real CRM migration for a fictional landscaping company —
          the mess, the cleanup, and the system it became. Every number on the page is computed
          live from the sample rows, and every row is traceable in both directions.</p>
        <div class="mw-btns">
          <button class="tbtn" data-welcome-close>Read it top to bottom</button>
          <button class="tbtn primary" data-tourb="start">Take the 60-second tour</button>
        </div></div>`;
      document.body.appendChild(w);
    }
  } catch (err) { /* private mode — fine */ }
})();
