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
          return `<a class="deal-card" href="${HSV.href('deal', d.id)}">
            <div class="dc-name">${esc(d.name)}</div>
            <div class="dc-amt">${HSV.money(d.amount)}</div>
            <div class="dc-meta">${UI.icon('calendar')} ${esc(HSV.fmtDate(d.close, false))}
              ${UI.avatar(o.name, o.color, 'av-sm')}</div>
          </a>`;
        }).join('') || `<p class="small muted" style="padding:4px 2px">Nothing here right now.</p>`;
        return `<section class="bcol">
          <div class="bcol-head">
            <div class="t">${esc(s.label)}<span class="n">${list.length}</span></div>
            <div class="amt">${HSV.money(HSV.sum(list))} · ${s.prob}% likely</div>
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
      ${UI.pageHead(esc(t.pipelineName),
        'Every ' + esc(t.deal.toLowerCase()) + ' in one place. Open one and move it along the stages — the totals follow.')}
      <div class="stage-strip">${strip}</div>
      ${toolbar}${body}
    </div>`;
  };

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

    const right = `
      ${c ? UI.assocCard('Contact', [UI.assocItem(HSV.href('contact', c.id),
        `<span class="row" style="gap:8px">${UI.avatar(HSV.cName(c), HSV.owner(c.owner).color, 'av-sm')} ${esc(HSV.cName(c))}</span>`,
        esc(c.title || ''))]) : ''}
      ${co ? UI.assocCard('Company', [UI.assocItem(HSV.href('company', co.id),
        `<span class="row" style="gap:8px">${UI.avatar(co.name, HSV.hueColor(co.name), 'av-sm av-sq')} ${esc(co.name)}</span>`,
        esc(co.industry))]) : ''}`;

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
      ${UI.pageHead('Tasks', 'The team’s to-do list. Tick things off — the dashboard count updates with you.')}
      <div class="chips">${chip('open', 'To do · ' + openN)}${chip('done', 'Done · ' + (all.length - openN))}${chip('all', 'Everything')}</div>
      ${body}
    </div>`;
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
      ${UI.pageHead('Meetings', upcoming.length + ' coming up. Booked through the calendar link, confirmed automatically.')}
      ${body || `<div class="card">${UI.empty('calendar', 'Nothing booked', 'The calendar ahead is clear.')}</div>`}
      ${pastHtml}
    </div>`;
  };
})();
