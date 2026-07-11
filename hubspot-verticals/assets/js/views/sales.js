/* ============================================================================
   SALES — the pipeline (board + table + record page), tasks and meetings.
   ========================================================================== */
(function () {
  'use strict';
  const HSV = window.HSV, UI = HSV.ui, esc = HSV.esc;

  /* ------------------------------------------------------------- deals list */
  HSV.views.deals = function () {
    const D = HSV.D(), t = D.terms, q = HSV.state.q;
    const mode = q.mode === 'table' ? 'table' : 'board';
    const deals = D.deals.filter(d => !q.owner || d.owner === q.owner);

    const strip = D.stages.map(s => {
      const list = deals.filter(d => HSV.dealStageId(d) === s.id);
      return `<div class="ss-item"><b>${HSV.money(HSV.sum(list), true)}</b>${esc(s.label)} · ${list.length}</div>`;
    }).join('');

    const ownerSel = `<select class="sel" data-qkey="owner">
      <option value="">Any owner</option>${D.owners.map(o =>
        `<option value="${o.id}" ${q.owner === o.id ? 'selected' : ''}>${esc(o.name)}</option>`).join('')}</select>`;

    const toolbar = `<div class="toolbar">
      <div class="row" style="gap:0">
        <button class="btn btn-sm ${mode === 'board' ? 'btn-primary' : ''}" style="border-radius:4px 0 0 4px" data-action="deal-mode" data-mode="board">Board</button>
        <button class="btn btn-sm ${mode === 'table' ? 'btn-primary' : ''}" style="border-radius:0 4px 4px 0;margin-left:-1px" data-action="deal-mode" data-mode="table">Table</button>
      </div>
      ${ownerSel}
      ${mode === 'board' ? `<span class="dnd-hint">${UI.icon('drag')} Drag cards between stages — every total follows</span>` : ''}
      <span class="count-note">${deals.length} ${esc(t.deals.toLowerCase())} · ${HSV.money(HSV.sum(deals), true)} in total</span>
    </div>`;

    let body;
    if (mode === 'board') {
      body = `<div class="board slim-scroll">` + D.stages.map(s => {
        const list = deals.filter(d => HSV.dealStageId(d) === s.id)
          .sort((a, b) => b.amount - a.amount);
        const cards = list.map(d => {
          const c = d.contactId ? HSV.contact(d.contactId) : null;
          const o = HSV.owner(d.owner);
          return `<a class="deal-card" href="${HSV.href('deal', d.id)}" draggable="true" data-deal="${d.id}">
            <div class="dc-name">${esc(d.name)}</div>
            <div class="dc-amt">${HSV.money(d.amount)}</div>
            <div class="dc-meta">${UI.icon('calendar')} ${esc(HSV.fmtDate(d.close, false))}
              ${UI.avatar(o.name, o.color, 'av-sm')}</div>
          </a>`;
        }).join('') || `<p class="small muted" style="padding:4px 2px">Nothing here right now — drag a card in.</p>`;
        return `<section class="bcol" data-stage="${s.id}">
          <div class="bcol-head">
            <div class="t">${esc(s.label)}<span class="n">${list.length}</span></div>
            <div class="amt">${HSV.money(HSV.sum(list))} total · ${HSV.money(HSV.sum(list) * s.prob / 100, true)} weighted</div>
          </div>
          <div class="bcol-body slim-scroll">${cards}</div>
        </section>`;
      }).join('') + `</div>`;
    } else {
      body = UI.table(
        ['Name', 'Stage', 'Amount', 'Owner', 'Expected close', 'Source'],
        deals.slice().sort((a, b) => b.amount - a.amount).map(d => ({
          href: HSV.href('deal', d.id),
          cells: [
            `<span class="cell-main"><span>${esc(d.name)}<small>${d.contactId ? esc(HSV.cName(HSV.contact(d.contactId))) : (d.companyId ? esc(HSV.company(d.companyId).name) : '')}</small></span></span>`,
            UI.stagePill(HSV.dealStageId(d)),
            `<b class="num">${HSV.money(d.amount)}</b>`,
            UI.ownerChip(d.owner),
            esc(HSV.fmtDate(d.close)),
            esc(d.source),
          ],
        })), { emptyIcon: 'deal' });
    }

    return `<div class="page view-in">
      ${UI.pageHead(esc(t.pipelineName) + '<span class="ph-count">' + deals.length + ' ' + esc(t.deals.toLowerCase()) + '</span>',
        'Every ' + esc(t.deal.toLowerCase()) + ' in one place. Drag a card to a new stage, or open one — the totals follow either way.',
        `<button class="btn" data-action="export-deals">${UI.icon('download')} Export</button>
         <button class="btn btn-primary" data-action="create-deal-open">Create ${esc(t.deal.toLowerCase())}</button>`)}
      <div class="stage-strip">${strip}</div>
      ${toolbar}${body}
    </div>`;
  };

  HSV.actions = HSV.actions || {};
  HSV.actions['export-deals'] = function () {
    const D = HSV.D();
    HSV.downloadCsv(D.key + '-' + D.terms.deals.toLowerCase() + '.csv',
      ['Name', 'Stage', 'Amount', 'Owner', 'Expected close', 'Source'],
      D.deals.map(d => [d.name, HSV.stage(HSV.dealStageId(d)).label, d.amount,
        HSV.owner(d.owner).name, d.close, d.source]));
    UI.toast('Exported as CSV');
  };

  /* ---- create deal: a real record, counted everywhere -------------------------- */
  HSV.actions['create-deal-open'] = function () {
    const D = HSV.D(), t = D.terms;
    const plus30 = new Date(HSV.dt(HSV.TODAY).getTime() + 30 * 864e5).toISOString().slice(0, 10);
    UI.modal('Create ' + t.deal.toLowerCase(), `
      <div class="form-grid">
        <label class="wide">${esc(t.deal)} name<input class="inp" id="nd-name" placeholder="e.g. Acme — spring package"></label>
        <label>Amount<input class="inp" id="nd-amt" type="number" min="0" placeholder="2500"></label>
        <label>Expected close<input class="inp" id="nd-close" type="date" value="${plus30}"></label>
        <label>Stage<select class="sel" id="nd-stage" style="width:100%">${D.stages.filter(s => s.prob > 0 && s.prob < 100).map(s => `<option value="${s.id}">${esc(s.label)}</option>`).join('')}</select></label>
        <label>Owner<select class="sel" id="nd-owner" style="width:100%">${D.owners.map(o => `<option value="${o.id}">${esc(o.name)}</option>`).join('')}</select></label>
        <label class="wide">Contact (optional)<select class="sel" id="nd-contact" style="width:100%"><option value="">No contact</option>${D.contacts.map(c => `<option value="${c.id}">${esc(HSV.cName(c))}</option>`).join('')}</select></label>
      </div>
      <p class="small muted">Creates a real record in the sample — the board, the dashboard and the reports will all count it instantly.</p>`,
      `<button class="btn" data-action="close-modal">Cancel</button>
       <button class="btn btn-primary" data-action="create-deal-save">Create ${esc(t.deal.toLowerCase())}</button>`);
  };
  HSV.actions['create-deal-save'] = function () {
    const D = HSV.D();
    const v = id => (document.getElementById(id) || {}).value || '';
    const name = v('nd-name').trim();
    if (!name) { document.getElementById('nd-name').focus(); return; }
    const d = {
      id: 'd' + Date.now(), name,
      amount: Math.max(0, +v('nd-amt') || 0),
      stage: v('nd-stage') || D.stages[0].id,
      close: v('nd-close') || HSV.TODAY,
      owner: v('nd-owner') || D.owners[0].id,
      contactId: v('nd-contact') || null, companyId: null,
      created: HSV.TODAY, source: D.sources[0]
    };
    D.deals.unshift(d);
    UI.closeModal();
    HSV.go(HSV.href('deal', d.id));
    UI.toast(D.terms.deal + ' created — the pipeline total just moved');
  };

  /* ---- drag & drop between stages ------------------------------------------------ */
  let dragId = null;
  document.addEventListener('dragstart', function (e) {
    const card = e.target.closest && e.target.closest('.deal-card[data-deal]');
    if (!card) return;
    dragId = card.dataset.deal;
    card.classList.add('dragging');
    e.dataTransfer.setData('text/plain', dragId);
    e.dataTransfer.effectAllowed = 'move';
  });
  document.addEventListener('dragend', function () {
    dragId = null;
    document.querySelectorAll('.deal-card.dragging').forEach(el => el.classList.remove('dragging'));
    document.querySelectorAll('.bcol.dragover').forEach(el => el.classList.remove('dragover'));
  });
  document.addEventListener('dragover', function (e) {
    const col = e.target.closest && e.target.closest('.bcol[data-stage]');
    if (!col || !dragId) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    document.querySelectorAll('.bcol.dragover').forEach(el => { if (el !== col) el.classList.remove('dragover'); });
    col.classList.add('dragover');
  });
  document.addEventListener('drop', function (e) {
    const col = e.target.closest && e.target.closest('.bcol[data-stage]');
    if (!col || !dragId) return;
    e.preventDefault();
    const d = HSV.deal(dragId), stage = col.dataset.stage;
    if (d && HSV.dealStageId(d) !== stage) {
      HSV.ov().dealStage[d.id] = stage;
      HSV.render();
      UI.toast('Moved to “' + HSV.stage(stage).label + '” — totals updated');
    }
    dragId = null;
  });

  HSV.actions = HSV.actions || {};
  HSV.actions['deal-mode'] = function (el) {
    HSV.setQuery({ mode: el.dataset.mode === 'table' ? 'table' : '' });
    HSV.render();
  };

  /* ------------------------------------------------------------- deal record */
  HSV.views.deal = function () {
    const d = HSV.deal(HSV.state.id);
    if (!d) return HSV.notFound('deals', HSV.D().terms.deals, 'That record doesn’t exist');
    const D = HSV.D(), t = D.terms;
    const sid = HSV.dealStageId(d);
    const s = HSV.stage(sid);
    const c = d.contactId ? HSV.contact(d.contactId) : null;
    const co = d.companyId ? HSV.company(d.companyId) : null;
    const order = D.stages.map(x => x.id);
    const cur = order.indexOf(sid);

    const stagebar = `<div class="stagebar">` + D.stages.map((x, i) => {
      let cls = 'sb-step';
      if (x.id === sid) cls += x.prob === 0 ? ' cur lost' : ' cur';
      else if (i < cur && sid !== HSV.lostStageId()) cls += ' done';
      return `<button class="${cls}" data-action="set-stage" data-deal="${d.id}" data-stage="${x.id}"
        title="Move to “${esc(x.label)}”">${esc(x.label)}</button>`;
    }).join('') + `</div>`;

    const tasks = HSV.relatedTasks('deal', d.id);
    const taskRows = tasks.map(k => taskRow(k)).join('');

    const left = `
      <section class="card prof-card">
        <h2 style="font-size:15.5px">${esc(d.name)}</h2>
        <p class="sub">${esc(t.deal)} · ${esc(s.label)}</p>
        <div class="kpi-val" style="margin-top:8px">${HSV.money(d.amount)}</div>
        <div class="row-c">${UI.stagePill(sid)}${UI.pill(s.prob + '% likely', 't-gray')}</div>
      </section>
      <section class="card props-card">
        <h3>Details</h3>
        <dl class="props">
          <div><dt>Amount</dt><dd class="b">${HSV.money(d.amount)}</dd></div>
          <div><dt>Likely value (amount × chance)</dt><dd>${HSV.money(d.amount * s.prob / 100)}</dd></div>
          <div><dt>Expected close</dt><dd>${esc(HSV.fmtDate(d.close))} (${esc(HSV.rel(d.close))})</dd></div>
          <div><dt>Started</dt><dd>${esc(HSV.fmtDate(d.created))}</dd></div>
          <div><dt>Source</dt><dd>${esc(d.source)}</dd></div>
          <div><dt>Owner</dt><dd>${UI.ownerChip(d.owner)}</dd></div>
        </dl>
      </section>`;

    const centre = `
      <section class="card tl-card">
        <h3>Where it stands</h3>
        <p class="small muted" style="margin-bottom:10px">Click a stage to move this ${esc(t.deal.toLowerCase())} — the board, the dashboard and the reports all update with it.</p>
        ${stagebar}
      </section>
      <section class="card list-card">
        <h3>${UI.icon('task')} Tasks on this ${esc(t.deal.toLowerCase())} <a href="${HSV.href('tasks')}">All tasks</a></h3>
        ${taskRows || UI.empty('check', 'No tasks attached', 'Nothing to do on this one right now.')}
      </section>`;

    const dq = (D.quotes || []).filter(x => x.dealId === d.id);
    const quoteItems = dq.map(x => UI.assocItem(HSV.href('quote', x.id), esc(x.name),
      x.status, `<b>${HSV.money(x.items.reduce((a, it) => a + D.catalog.find(p => p.id === it.p).price * it.qty, 0) - (x.discount || 0), true)}</b>`));
    const right = `
      ${c ? UI.assocCard('Contact', [UI.assocItem(HSV.href('contact', c.id),
        `<span class="row" style="gap:8px">${UI.avatar(HSV.cName(c), HSV.owner(c.owner).color, 'av-sm')} ${esc(HSV.cName(c))}</span>`,
        esc(c.title || ''))]) : ''}
      ${co ? UI.assocCard('Company', [UI.assocItem(HSV.href('company', co.id),
        `<span class="row" style="gap:8px">${UI.avatar(co.name, HSV.hueColor(co.name), 'av-sm av-sq')} ${esc(co.name)}</span>`,
        esc(co.industry))]) : ''}
      <section class="card assoc-card"><h3>Quotes ${UI.pill(dq.length, 't-gray')}
        <a class="assoc-add" href="${HSV.href('qbuilder', null, { deal: d.id })}">+ New quote</a></h3>
        ${quoteItems.join('') || '<p class="small muted" style="padding:2px 0 4px">None yet — build one in a minute.</p>'}</section>`;

    return `<div class="page view-in">
      ${UI.crumbs(HSV.href('deals'), t.pipelineName, d.name)}
      <div class="detail">
        <div class="d-col">${left}</div>
        <div class="d-col">${centre}</div>
        <div class="d-col">${right || '<div></div>'}</div>
      </div>
    </div>`;
  };

  HSV.actions['set-stage'] = function (el) {
    const d = HSV.deal(el.dataset.deal);
    if (HSV.dealStageId(d) === el.dataset.stage) return;
    HSV.ov().dealStage[d.id] = el.dataset.stage;
    HSV.render();
    UI.toast('Moved to “' + HSV.stage(el.dataset.stage).label + '”');
  };

  /* ------------------------------------------------------------- tasks */
  function relatedLink(k) {
    const r = k.related;
    if (!r) return '';
    if (r.kind === 'contact') { const c = HSV.contact(r.id); return c ? `<a href="${HSV.href('contact', c.id)}">${esc(HSV.cName(c))}</a>` : ''; }
    if (r.kind === 'deal') { const d = HSV.deal(r.id); return d ? `<a href="${HSV.href('deal', d.id)}">${esc(d.name)}</a>` : ''; }
    if (r.kind === 'ticket') { const x = HSV.ticket(r.id); return x ? `<a href="${HSV.href('ticket', x.id)}">${esc(x.subject)}</a>` : ''; }
    return '';
  }

  function taskRow(k) {
    const done = HSV.taskDone(k);
    const late = !done && HSV.daysFromToday(k.due) < 0;
    return `<div class="task-row ${done ? 'done' : ''}">
      <button class="chk ${done ? 'on' : ''}" data-action="toggle-task" data-id="${k.id}"
        aria-label="${done ? 'Mark as not done' : 'Mark as done'}">${UI.icon('check')}</button>
      <span class="grow"><span class="tt">${esc(k.title)}</span>
        <span class="tsub">${esc(k.type)} · for ${relatedLink(k) || 'the team'}</span></span>
      <span class="end">
        <span class="pill ${done ? 't-green' : late ? 't-red' : 't-gray'}">${done ? 'Done' : esc(HSV.rel(k.due))}</span>
        ${UI.ownerChip(k.owner)}
      </span>
    </div>`;
  }

  HSV.views.tasks = function () {
    const D = HSV.D(), q = HSV.state.q;
    const filter = q.show || 'open';
    const all = D.tasks.slice().sort((a, b) => a.due.localeCompare(b.due));
    const shown = all.filter(k => filter === 'all' ? true :
      filter === 'done' ? HSV.taskDone(k) : !HSV.taskDone(k));

    const groups = [
      { name: 'Overdue', cls: 'over', test: k => !HSV.taskDone(k) && HSV.daysFromToday(k.due) < 0 },
      { name: 'Today & tomorrow', test: k => !HSV.taskDone(k) && HSV.daysFromToday(k.due) >= 0 && HSV.daysFromToday(k.due) <= 1 },
      { name: 'Coming up', test: k => !HSV.taskDone(k) && HSV.daysFromToday(k.due) > 1 },
      { name: 'Done', test: k => HSV.taskDone(k) },
    ];
    const body = groups.map(g => {
      const list = shown.filter(g.test);
      if (!list.length) return '';
      return `<div class="task-group"><h3 class="${g.cls || ''}">${g.name} · ${list.length}</h3>
        <div class="card">${list.map(taskRow).join('')}</div></div>`;
    }).join('') || `<div class="card">${UI.empty('check', 'Nothing here', 'Switch the filter above to see other tasks.')}</div>`;

    const chip = (v, label) => `<button class="chip ${filter === v ? 'on' : ''}" data-action="task-filter" data-v="${v}">${label}</button>`;
    const openN = all.filter(k => !HSV.taskDone(k)).length;

    return `<div class="page view-in">
      ${UI.pageHead('Tasks<span class="ph-count">' + openN + ' to do</span>',
        'The team’s to-do list. Tick things off — the dashboard count updates with you.',
        `<button class="btn btn-primary" data-action="create-task-open">Create task</button>`)}
      <div class="chips">${chip('open', 'To do · ' + openN)}${chip('done', 'Done · ' + (all.length - openN))}${chip('all', 'Everything')}</div>
      ${body}
    </div>`;
  };

  HSV.actions['create-task-open'] = function () {
    const D = HSV.D();
    const plus2 = new Date(HSV.dt(HSV.TODAY).getTime() + 2 * 864e5).toISOString().slice(0, 10);
    UI.modal('Create task', `
      <label>What needs doing?<input class="inp" id="nt-title" placeholder="e.g. Send the follow-up quote"></label>
      <div class="form-grid">
        <label>Type<select class="sel" id="nt-type" style="width:100%"><option>To-do</option><option>Call</option><option>Email</option></select></label>
        <label>Due<input class="inp" id="nt-due" type="date" value="${plus2}"></label>
        <label class="wide">Owner<select class="sel" id="nt-owner" style="width:100%">${D.owners.map(o => `<option value="${o.id}">${esc(o.name)}</option>`).join('')}</select></label>
        <label class="wide">About (optional)<select class="sel" id="nt-contact" style="width:100%"><option value="">Nobody in particular</option>${D.contacts.map(c => `<option value="${c.id}">${esc(HSV.cName(c))}</option>`).join('')}</select></label>
      </div>`,
      `<button class="btn" data-action="close-modal">Cancel</button>
       <button class="btn btn-primary" data-action="create-task-save">Create task</button>`);
  };
  HSV.actions['create-task-save'] = function () {
    const v = id => (document.getElementById(id) || {}).value || '';
    const title = v('nt-title').trim();
    if (!title) { document.getElementById('nt-title').focus(); return; }
    const cid = v('nt-contact');
    HSV.D().tasks.unshift({ id: 'k' + Date.now(), title, due: v('nt-due') || HSV.TODAY,
      type: v('nt-type') || 'To-do', owner: v('nt-owner'),
      related: cid ? { kind: 'contact', id: cid } : null, done: false });
    UI.closeModal();
    HSV.render();
    UI.toast('Task created — the dashboard count moved with it');
  };

  HSV.actions['toggle-task'] = function (el) {
    const k = HSV.D().tasks.find(x => x.id === el.dataset.id);
    HSV.ov().taskDone[k.id] = !HSV.taskDone(k);
    HSV.render();
    UI.toast(HSV.taskDone(k) ? 'Nice — task done' : 'Task reopened');
  };
  HSV.actions['task-filter'] = function (el) {
    HSV.setQuery({ show: el.dataset.v === 'open' ? '' : el.dataset.v });
    HSV.render();
  };

  /* ------------------------------------------------------------- meetings */
  HSV.views.meetings = function () {
    const D = HSV.D();
    const sorted = D.meetings.slice().sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
    const upcoming = sorted.filter(m => HSV.daysFromToday(m.date) >= 0);
    const past = sorted.filter(m => HSV.daysFromToday(m.date) < 0).reverse();

    const dayGroups = {};
    upcoming.forEach(m => { (dayGroups[m.date] = dayGroups[m.date] || []).push(m); });

    const row = (m) => {
      const c = HSV.contact(m.contactId);
      return `<div class="meet-row">
        <span class="meet-time">${esc(m.time)}</span>
        <span class="grow"><span class="b">${esc(m.title)}</span>
          <span class="tsub" style="display:block">${c ? `with <a href="${HSV.href('contact', c.id)}">${esc(HSV.cName(c))}</a> · ` : ''}${esc(m.kind)}</span></span>
        <span class="end">${UI.ownerChip(m.owner)}</span>
      </div>`;
    };

    const body = Object.keys(dayGroups).map(date => {
      const d = HSV.daysFromToday(date);
      const chip = d === 0 ? UI.pill('Today', 't-orange') : d === 1 ? UI.pill('Tomorrow', 't-blue') : '';
      return `<div class="day-group">
        <h3>${esc(HSV.dt(date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }))} ${chip}</h3>
        <div class="card">${dayGroups[date].map(row).join('')}</div>
      </div>`;
    }).join('');

    const pastHtml = past.length ? `<div class="day-group"><h3>Earlier</h3>
      <div class="card">${past.map(row).join('')}</div></div>` : '';

    return `<div class="page view-in">
      ${UI.pageHead('Meetings<span class="ph-count">' + upcoming.length + ' coming up</span>',
        'Booked through the calendar link, confirmed automatically.',
        `<button class="btn btn-primary" data-action="book-meeting-open">Book a meeting</button>`)}
      ${body || `<div class="card">${UI.empty('calendar', 'Nothing booked', 'The calendar ahead is clear.')}</div>`}
      ${pastHtml}
    </div>`;
  };

  HSV.actions['book-meeting-open'] = function () {
    const D = HSV.D();
    const plus3 = new Date(HSV.dt(HSV.TODAY).getTime() + 3 * 864e5).toISOString().slice(0, 10);
    UI.modal('Book a meeting', `
      <label>What's it about?<input class="inp" id="nm-title" placeholder="e.g. Quote walkthrough"></label>
      <div class="form-grid">
        <label>With<select class="sel" id="nm-contact" style="width:100%">${D.contacts.map(c => `<option value="${c.id}">${esc(HSV.cName(c))}</option>`).join('')}</select></label>
        <label>Host<select class="sel" id="nm-owner" style="width:100%">${D.owners.map(o => `<option value="${o.id}">${esc(o.name)}</option>`).join('')}</select></label>
        <label>Date<input class="inp" id="nm-date" type="date" value="${plus3}"></label>
        <label>Time<input class="inp" id="nm-time" type="time" value="10:00"></label>
      </div>`,
      `<button class="btn" data-action="close-modal">Cancel</button>
       <button class="btn btn-primary" data-action="book-meeting-save">Book it</button>`);
  };
  HSV.actions['book-meeting-save'] = function () {
    const v = id => (document.getElementById(id) || {}).value || '';
    const title = v('nm-title').trim();
    if (!title) { document.getElementById('nm-title').focus(); return; }
    HSV.D().meetings.push({ id: 'm' + Date.now(), title, date: v('nm-date') || HSV.TODAY,
      time: v('nm-time') || '10:00', contactId: v('nm-contact'), owner: v('nm-owner'), kind: 'Meeting' });
    UI.closeModal();
    HSV.render();
    UI.toast('Booked — it\'s on the schedule and the dashboard');
  };

  /* ==========================================================================
     QUOTES — a price list, a paper-style document you can genuinely print
     to PDF, and a line-item builder wired to deals.
     ========================================================================== */
  const product = id => HSV.D().catalog.find(p => p.id === id);
  const qSubtotal = q => q.items.reduce((a, it) => a + product(it.p).price * it.qty, 0);
  const qTotal = q => qSubtotal(q) - (q.discount || 0);
  const Q_TONE = { Draft: 't-gray', Sent: 't-blue', Accepted: 't-green', Expired: 't-red' };

  HSV.views.quotes = function () {
    const D = HSV.D();
    const qs = D.quotes;
    const acc = qs.filter(q => q.status === 'Accepted');
    const sent = qs.filter(q => q.status === 'Sent');
    const kpis = [
      { label: 'Accepted value', value: HSV.money(acc.reduce((a, q) => a + qTotal(q), 0), true), sub: acc.length + ' accepted', href: HSV.href('quotes') },
      { label: 'Out for signature', value: HSV.money(sent.reduce((a, q) => a + qTotal(q), 0), true), sub: sent.length + ' sent', href: HSV.href('quotes') },
      { label: 'Drafts', value: qs.filter(q => q.status === 'Draft').length, sub: 'not sent yet', href: HSV.href('quotes') },
    ].map(UI.kpi).join('');

    const table = UI.table(
      ['Quote', 'Status', 'Amount', 'For', 'Created', 'Valid until'],
      qs.map(q => {
        const c = HSV.contact(q.contactId);
        return { href: HSV.href('quote', q.id), cells: [
          `<span class="cell-main"><span>${esc(q.name)}${q.custom ? ' ' + UI.pill('built this session', 't-orange') : ''}<small>QUO-${esc(q.id.replace('q', '').padStart ? String(q.id.replace('q', '')).padStart(4, '0') : q.id)}</small></span></span>`,
          UI.pill(q.status, Q_TONE[q.status] || 't-gray'),
          `<b class="num">${HSV.money(qTotal(q))}</b>`,
          c ? esc(HSV.cName(c)) : '—',
          esc(HSV.fmtDate(q.created)),
          esc(HSV.fmtDate(q.expires)),
        ] };
      }), { emptyIcon: 'doc' });

    return `<div class="page view-in">
      ${UI.pageHead('Quotes<span class="ph-count">' + qs.length + ' quotes</span>',
        'Priced from the same catalog every time — open one to see the actual document, or build a new one line by line.',
        `<a class="btn btn-primary" href="${HSV.href('qbuilder')}">Create quote</a>`)}
      <div class="kpis" style="grid-template-columns:repeat(auto-fit,minmax(160px,1fr));max-width:560px">${kpis}</div>
      ${table}
    </div>`;
  };

  HSV.views.quote = function () {
    const q = (HSV.D().quotes || []).find(x => x.id === HSV.state.id);
    if (!q) return HSV.notFound('quotes', 'Quotes', 'That quote doesn’t exist');
    const D = HSV.D(), c = HSV.contact(q.contactId), d = q.dealId ? HSV.deal(q.dealId) : null;
    const owner = c ? HSV.owner(c.owner) : D.owners[0];

    const lines = q.items.map(it => {
      const p = product(it.p);
      return `<tr><td>${esc(p.name)}<small style="display:block;color:var(--muted)">${esc(p.unit)}</small></td>
        <td class="td-num">${it.qty}</td>
        <td class="td-num">${HSV.money(p.price)}</td>
        <td class="td-num"><b>${HSV.money(p.price * it.qty)}</b></td></tr>`;
    }).join('');

    const statusBtns = q.status === 'Draft'
      ? `<button class="btn btn-primary" data-action="quote-status" data-id="${q.id}" data-to="Sent">Mark as sent</button>`
      : q.status === 'Sent'
        ? `<button class="btn btn-primary" data-action="quote-status" data-id="${q.id}" data-to="Accepted">Mark accepted ✓</button>`
        : '';

    const left = `
      <section class="card props-card">
        <h3>Quote details</h3>
        <dl class="props">
          <div><dt>Status</dt><dd>${UI.pill(q.status, Q_TONE[q.status])}${q.accepted ? ' <small class="muted">accepted ' + esc(HSV.fmtDate(q.accepted)) + '</small>' : ''}</dd></div>
          <div><dt>Total</dt><dd class="b" style="font-size:16px">${HSV.money(qTotal(q))}</dd></div>
          <div><dt>Created</dt><dd>${esc(HSV.fmtDate(q.created))}</dd></div>
          <div><dt>Valid until</dt><dd>${esc(HSV.fmtDate(q.expires))} (${esc(HSV.rel(q.expires))})</dd></div>
          <div><dt>Prepared by</dt><dd>${UI.ownerChip(owner.id)}</dd></div>
        </dl>
      </section>
      ${c ? UI.assocCard('Contact', [UI.assocItem(HSV.href('contact', c.id),
        `<span class="row" style="gap:8px">${UI.avatar(HSV.cName(c), HSV.owner(c.owner).color, 'av-sm')} ${esc(HSV.cName(c))}</span>`, esc(c.email))]) : ''}
      ${d ? UI.assocCard(D.terms.deal, [UI.assocItem(HSV.href('deal', d.id), esc(d.name),
        UI.stagePill(HSV.dealStageId(d)), `<b>${HSV.money(d.amount, true)}</b>`)]) : ''}`;

    const paper = `
      <div class="quote-paper" id="quote-paper">
        <div class="qp-head">
          <div class="qp-brand"><span class="qp-mark" style="background:${D.accent}">${esc(D.brand[0])}</span>
            <div><b>${esc(D.brand)}</b><span>${esc(D.industryLabel)}</span></div></div>
          <div class="qp-meta"><b>QUOTE</b><span>QUO-${esc(String(q.id).replace('q', ''))}</span>
            <span>${esc(HSV.fmtDate(q.created))}</span></div>
        </div>
        <div class="qp-parties">
          <div><small>Prepared for</small><b>${c ? esc(HSV.cName(c)) : '—'}</b>${c && c.companyId ? `<span>${esc(HSV.company(c.companyId).name)}</span>` : ''}${c ? `<span>${esc(c.email)}</span>` : ''}</div>
          <div><small>Prepared by</small><b>${esc(owner.name)}</b><span>${esc(owner.role)}</span><span>${esc(D.brand)}</span></div>
        </div>
        <table class="qp-table">
          <thead><tr><th>Item</th><th class="td-num">Qty</th><th class="td-num">Unit</th><th class="td-num">Amount</th></tr></thead>
          <tbody>${lines}</tbody>
        </table>
        <div class="qp-totals">
          <div><span>Subtotal</span><b>${HSV.money(qSubtotal(q))}</b></div>
          ${q.discount ? `<div><span>Discount</span><b>− ${HSV.money(q.discount)}</b></div>` : ''}
          <div class="qp-grand"><span>Total</span><b>${HSV.money(qTotal(q))}</b></div>
        </div>
        ${q.note ? `<p class="qp-note">${esc(q.note)}</p>` : ''}
        <div class="qp-foot">
          <span>Valid until ${esc(HSV.fmtDate(q.expires))} · Sample document, fictional data</span>
          <span class="qp-sign">Signature ______________________</span>
        </div>
      </div>`;

    return `<div class="page view-in">
      ${UI.crumbs(HSV.href('quotes'), 'Quotes', q.name)}
      ${UI.pageHead(esc(q.name), 'This is the document the customer sees — and the print button makes a real PDF of it.',
        `${statusBtns}
         <button class="btn" data-action="quote-print">🖨 Print / save PDF</button>
         <button class="btn" data-action="quote-dup" data-id="${q.id}">Duplicate & edit</button>`)}
      <div class="detail" style="grid-template-columns:300px minmax(0,1fr)">
        <div class="d-col">${left}</div>
        <div class="d-col">${paper}</div>
      </div>
    </div>`;
  };

  HSV.actions['quote-status'] = function (el) {
    const q = HSV.D().quotes.find(x => x.id === el.dataset.id);
    q.status = el.dataset.to;
    if (q.status === 'Accepted') q.accepted = HSV.TODAY;
    HSV.render();
    UI.toast(q.status === 'Accepted' ? 'Accepted 🎉 — the quotes total moved with it' : 'Marked as sent');
  };
  HSV.actions['quote-print'] = function () { window.print(); };
  HSV.actions['quote-dup'] = function (el) {
    const q = HSV.D().quotes.find(x => x.id === el.dataset.id);
    qdraft = { name: q.name + ' (copy)', contactId: q.contactId, dealId: q.dealId || '',
      expires: q.expires, discount: q.discount || 0, items: q.items.map(it => ({ p: it.p, qty: it.qty })) };
    qdraftFor = 'dup';
    HSV.go(HSV.href('qbuilder'));
  };

  /* ---- the quote builder ------------------------------------------------------ */
  let qdraft = null, qdraftFor = undefined;
  function initQ() {
    const key = HSV.state.portal + '|' + (HSV.state.q.deal || 'new');
    if (qdraftFor === 'dup') { qdraftFor = key; return; }
    if (qdraftFor === key && qdraft) return;
    qdraftFor = key;
    const D = HSV.D();
    const dealId = HSV.state.q.deal || '';
    const d = dealId ? HSV.deal(dealId) : null;
    const plus30 = new Date(HSV.dt(HSV.TODAY).getTime() + 30 * 864e5).toISOString().slice(0, 10);
    qdraft = { name: d ? 'Quote — ' + d.name : '', contactId: d && d.contactId ? d.contactId : D.contacts[0].id,
      dealId, expires: plus30, discount: 0, items: [{ p: D.catalog[0].id, qty: 1 }] };
  }
  function qDraftTotals() {
    const D = HSV.D();
    const sub = qdraft.items.reduce((a, it) => a + D.catalog.find(p => p.id === it.p).price * it.qty, 0);
    return { sub, total: sub - (qdraft.discount || 0) };
  }
  function syncQ() {
    document.querySelectorAll('[data-qi-item]').forEach(sel => { qdraft.items[+sel.dataset.qiItem].p = sel.value; });
    document.querySelectorAll('[data-qi-qty]').forEach(inp => { qdraft.items[+inp.dataset.qiQty].qty = Math.max(1, +inp.value || 1); });
    const g = k => document.querySelector('[data-qb-' + k + ']');
    if (g('name')) qdraft.name = g('name').value;
    if (g('contact')) qdraft.contactId = g('contact').value;
    if (g('deal')) qdraft.dealId = g('deal').value;
    if (g('expires')) qdraft.expires = g('expires').value;
    if (g('discount')) qdraft.discount = Math.max(0, +g('discount').value || 0);
  }

  HSV.views.qbuilder = function () {
    initQ();
    const D = HSV.D(), t = qDraftTotals();
    const rows = qdraft.items.map((it, i) => {
      const p = D.catalog.find(x => x.id === it.p);
      return `<div class="qb-row">
        <select class="sel" data-qi-item="${i}" aria-label="Line item">${D.catalog.map(x =>
          `<option value="${x.id}" ${x.id === it.p ? 'selected' : ''}>${esc(x.name)} — ${HSV.money(x.price)} ${esc(x.unit)}</option>`).join('')}</select>
        <input class="inp qb-qty" type="number" min="1" value="${it.qty}" data-qi-qty="${i}" aria-label="Quantity">
        <b class="qb-line num" data-qb-line="${i}">${HSV.money(p.price * it.qty)}</b>
        <button class="bld-btn del" data-action="qb-del" data-i="${i}" aria-label="Remove line">✕</button>
      </div>`;
    }).join('');

    return `<div class="page view-in">
      ${UI.crumbs(HSV.href('quotes'), 'Quotes', 'New quote')}
      ${UI.pageHead('Build a quote', 'Every line comes from the price list, so quotes are consistent no matter who writes them. The totals follow your keystrokes.',
        `<button class="btn btn-primary" data-action="qb-save">Save quote</button>`)}
      <div class="card bld-canvas" style="max-width:820px">
        <div class="bld-meta" style="grid-template-columns:1fr 1fr">
          <label>Quote name<input class="inp" data-qb-name value="${esc(qdraft.name)}" placeholder="e.g. Spring package — Acme"></label>
          <label>For<select class="sel" data-qb-contact style="width:100%">${D.contacts.map(c =>
            `<option value="${c.id}" ${c.id === qdraft.contactId ? 'selected' : ''}>${esc(HSV.cName(c))}</option>`).join('')}</select></label>
          <label>Linked ${esc(D.terms.deal.toLowerCase())} (optional)<select class="sel" data-qb-deal style="width:100%">
            <option value="">None</option>${D.deals.map(d =>
            `<option value="${d.id}" ${d.id === qdraft.dealId ? 'selected' : ''}>${esc(d.name)}</option>`).join('')}</select></label>
          <label>Valid until<input class="inp" type="date" data-qb-expires value="${esc(qdraft.expires)}"></label>
        </div>
        <div class="qb-rows">${rows}</div>
        <button class="btn btn-sm" data-action="qb-add" style="margin-top:10px">${UI.icon('plus')} Add a line</button>
        <div class="qb-totals">
          <label class="qb-disc">Discount $<input class="inp" type="number" min="0" data-qb-discount value="${qdraft.discount || 0}"></label>
          <div class="qb-sums">
            <div><span>Subtotal</span><b data-qb-sub>${HSV.money(t.sub)}</b></div>
            <div class="grand"><span>Total</span><b data-qb-total>${HSV.money(t.total)}</b></div>
          </div>
        </div>
      </div>
    </div>`;
  };

  HSV.actions['qb-add'] = function () { syncQ(); qdraft.items.push({ p: HSV.D().catalog[0].id, qty: 1 }); HSV.render(); };
  HSV.actions['qb-del'] = function (el) {
    syncQ();
    if (qdraft.items.length <= 1) { UI.toast('A quote needs at least one line'); return; }
    qdraft.items.splice(+el.dataset.i, 1);
    HSV.render();
  };
  HSV.actions['qb-save'] = function () {
    syncQ();
    const D = HSV.D();
    if (!qdraft.name.trim()) {
      qdraft.name = 'Quote — ' + HSV.cName(HSV.contact(qdraft.contactId));
    }
    const q = { id: 'q' + Date.now(), name: qdraft.name.trim(), dealId: qdraft.dealId || null,
      contactId: qdraft.contactId, status: 'Draft', created: HSV.TODAY, expires: qdraft.expires,
      discount: qdraft.discount || 0, custom: true,
      note: 'Built during this sample session — refresh the page and the sample resets.',
      items: qdraft.items.map(it => ({ p: it.p, qty: it.qty })) };
    D.quotes.unshift(q);
    qdraft = null; qdraftFor = undefined;
    HSV.go(HSV.href('quote', q.id));
    UI.toast('Quote saved as a draft — there\'s the document');
  };

  /* live totals while typing in the builder */
  document.addEventListener('input', function (e) {
    if (!qdraft || !e.target.matches) return;
    if (e.target.matches('[data-qi-qty], [data-qb-discount]')) {
      syncQ();
      const D = HSV.D(), t = qDraftTotals();
      qdraft.items.forEach((it, i) => {
        const el = document.querySelector('[data-qb-line="' + i + '"]');
        if (el) el.textContent = HSV.money(D.catalog.find(p => p.id === it.p).price * it.qty);
      });
      const sub = document.querySelector('[data-qb-sub]'), tot = document.querySelector('[data-qb-total]');
      if (sub) sub.textContent = HSV.money(t.sub);
      if (tot) tot.textContent = HSV.money(t.total);
    }
  });
  document.addEventListener('change', function (e) {
    if (!qdraft || !e.target.matches || !e.target.matches('[data-qi-item]')) return;
    syncQ();
    HSV.render();
  });
})();
