/* ============================================================================
   CRM — contacts & companies with the full HubSpot list-page anatomy:
   view tabs, filters, checkboxes + bulk bar, sortable columns, pagination,
   a Create-contact modal that adds a real record, plus Lists.
   ========================================================================== */
(function () {
  'use strict';
  const HSV = window.HSV, UI = HSV.ui, esc = HSV.esc;

  /* selection state for the bulk bar (per session, cleared on filter change) */
  let sel = new Set();

  /* ------------------------------------------------------------- contacts list */
  HSV.views.contacts = function () {
    const D = HSV.D(), q = HSV.state.q;
    const needle = (q.q || '').toLowerCase();
    const viewTab = q.view || 'all';
    const me = D.owners[0];

    let rows = D.contacts.filter(c =>
      (!needle || (HSV.cName(c) + ' ' + c.email + ' ' + (c.title || '')).toLowerCase().includes(needle)) &&
      (!q.owner || c.owner === q.owner) &&
      (!q.lc || c.lifecycle === q.lc) &&
      (!q.source || c.source === q.source) &&
      (viewTab !== 'my' || c.owner === me.id)
    );

    const sort = q.sort || (viewTab === 'recent' ? '-created' : '-touch');
    const KEYS = { name: c => HSV.cName(c).toLowerCase(), touch: c => c.lastTouch, created: c => c.created };
    const dir = sort.startsWith('-') ? -1 : 1;
    const keyFn = KEYS[sort.replace('-', '')] || KEYS.touch;
    rows.sort((a, b) => (keyFn(a) < keyFn(b) ? -1 : keyFn(a) > keyFn(b) ? 1 : 0) * dir);

    const opts = (list, selv, label) =>
      `<option value="">${label}</option>` + list.map(x =>
        `<option value="${esc(x.v)}" ${x.v === selv ? 'selected' : ''}>${esc(x.l)}</option>`).join('');

    const vtab = (v, label) => `<button class="vtab ${viewTab === v ? 'on' : ''}"
      data-action="contacts-view" data-v="${v}">${label}</button>`;
    const vtabs = `<div class="vtabs">
      ${vtab('all', 'All contacts')}${vtab('my', 'My contacts')}${vtab('recent', 'Recently created')}
      <button class="vtab add" data-action="fake-view">+ Add view</button>
    </div>`;

    const toolbar = `<div class="toolbar">
      <input class="inp" type="search" placeholder="Search name, email…" value="${esc(q.q || '')}" data-qkey="q" aria-label="Search contacts">
      <select class="sel" data-qkey="lc" aria-label="Lifecycle stage">${opts(D.lifecycles.map(l => ({ v: l, l })), q.lc, 'Lifecycle stage')}</select>
      <select class="sel" data-qkey="owner" aria-label="Contact owner">${opts(D.owners.map(o => ({ v: o.id, l: o.name })), q.owner, 'Contact owner')}</select>
      <select class="sel" data-qkey="source" aria-label="Original source">${opts(D.sources.map(s => ({ v: s, l: s })), q.source, 'Original source')}</select>
      <button class="btn btn-sm" data-action="export-contacts">${UI.icon('download')} Export</button>
      <span class="count-note">${rows.length} of ${D.contacts.length} contacts</span>
    </div>`;

    const shown = rows.filter(c => sel.has(c.id));
    const bulkbar = sel.size ? `<div class="bulkbar">
        <span class="n">${sel.size} selected</span>
        <button class="btn btn-ghost btn-sm" data-action="bulk-note">${UI.icon('users')} Assign</button>
        <button class="btn btn-ghost btn-sm" data-action="bulk-note">${UI.icon('list')} Add to list</button>
        <button class="btn btn-ghost btn-sm" data-action="bulk-export">${UI.icon('download')} Export selected</button>
        <button class="btn btn-ghost btn-sm" data-action="bulk-clear">Clear</button>
      </div>` : '';

    const sc = k => sort.replace('-', '') === k ? `<span class="sc">${sort.startsWith('-') ? '▼' : '▲'}</span>` : '<span class="sc">▲</span>';
    const allChecked = rows.length && rows.every(c => sel.has(c.id));
    const table = `<div class="tbl-wrap rsp slim-scroll"><table class="tbl">
      <thead><tr>
        <th class="td-chk"><input type="checkbox" class="row-chk" data-action="row-check-all" ${allChecked ? 'checked' : ''} aria-label="Select all"></th>
        <th class="sortable ${sort.replace('-', '') === 'name' ? 's-on' : ''}" data-action="sort-contacts" data-k="name">Name ${sc('name')}</th>
        <th>Email</th><th>Phone</th><th>Stage</th><th>Owner</th><th>Source</th>
        <th class="sortable ${sort.replace('-', '') === 'touch' ? 's-on' : ''}" data-action="sort-contacts" data-k="touch">Last activity ${sc('touch')}</th>
      </tr></thead><tbody>
      ${rows.map(c => `<tr data-href="${HSV.href('contact', c.id)}" tabindex="0">
        <td class="td-chk"><input type="checkbox" class="row-chk" data-action="row-check" data-id="${c.id}" ${sel.has(c.id) ? 'checked' : ''} aria-label="Select ${esc(HSV.cName(c))}"></td>
        <td class="cell-main-td"><span class="cell-main">${UI.avatar(HSV.cName(c), HSV.owner(c.owner).color)}<span>${esc(HSV.cName(c))}<small>${esc(c.title || '')}</small></span></span></td>
        <td data-th="Email"><a href="mailto:${esc(c.email)}" onclick="event.stopPropagation()">${esc(c.email)}</a></td>
        <td data-th="Phone">${esc(c.phone)}</td>
        <td data-th="Stage">${UI.pill(c.lifecycle, UI.lifecycleTone(c.lifecycle))}</td>
        <td data-th="Owner">${UI.ownerChip(c.owner)}</td>
        <td data-th="Source">${esc(c.source)}</td>
        <td data-th="Last activity">${esc(HSV.rel(c.lastTouch))}</td>
      </tr>`).join('') || `<tr><td colspan="8">${UI.empty('user', 'Nothing matches', 'Try clearing a filter.')}</td></tr>`}
      </tbody></table></div>`;

    return `<div class="page view-in">
      ${UI.pageHead('Contacts<span class="ph-count">' + rows.length + ' records</span>',
        'Everyone in the CRM — click a row for the full record, or create a contact and watch every count follow.',
        `<button class="btn" data-action="import-open">${UI.icon('upload')} Import</button>
         <button class="btn btn-primary" data-action="create-contact-open">Create contact</button>`)}
      ${vtabs}
      <div class="list-shell">${toolbar}${bulkbar}${table}${UI.tblFoot(rows.length, D.contacts.length, 'contacts')}</div>
    </div>`;
  };

  HSV.actions = HSV.actions || {};
  HSV.actions['contacts-view'] = function (el) {
    sel = new Set();
    HSV.setQuery({ view: el.dataset.v === 'all' ? '' : el.dataset.v, sort: '' });
    HSV.render();
  };
  HSV.actions['fake-view'] = () => UI.toast('In the live CRM you\'d save any filter combination as a view');
  HSV.actions['sort-contacts'] = function (el) {
    const k = el.dataset.k, cur = HSV.state.q.sort || '-touch';
    HSV.setQuery({ sort: cur === k ? '-' + k : k });
    HSV.render();
  };
  HSV.actions['row-check'] = function (el) {
    if (sel.has(el.dataset.id)) sel.delete(el.dataset.id); else sel.add(el.dataset.id);
    HSV.render();
  };
  HSV.actions['row-check-all'] = function (el) {
    const D = HSV.D();
    if (el.checked) D.contacts.forEach(c => sel.add(c.id)); else sel = new Set();
    HSV.render();
  };
  HSV.actions['bulk-clear'] = function () { sel = new Set(); HSV.render(); };
  HSV.actions['bulk-note'] = () => UI.toast('Sample action — in the live CRM this applies to every selected row');
  HSV.actions['bulk-export'] = function () {
    const D = HSV.D();
    const list = D.contacts.filter(c => sel.has(c.id));
    HSV.downloadCsv(D.key + '-selected-contacts.csv',
      ['Name', 'Email', 'Phone', 'Stage', 'Owner'],
      list.map(c => [HSV.cName(c), c.email, c.phone, c.lifecycle, HSV.owner(c.owner).name]));
    UI.toast(list.length + ' selected contacts exported');
  };
  HSV.actions['export-contacts'] = function () {
    const D = HSV.D();
    HSV.downloadCsv(D.key + '-contacts.csv',
      ['Name', 'Email', 'Phone', 'Stage', 'Owner', 'Source', 'City', 'Created'],
      D.contacts.map(c => [HSV.cName(c), c.email, c.phone, c.lifecycle,
        HSV.owner(c.owner).name, c.source, c.city, c.created]));
    UI.toast('Contacts exported as CSV');
  };

  /* ---- create contact: a real record every screen will count ------------------ */
  HSV.actions['create-contact-open'] = function () {
    const D = HSV.D();
    UI.modal('Create contact', `
      <div class="form-grid">
        <label>First name<input class="inp" id="nc-first" placeholder="Alex"></label>
        <label>Last name<input class="inp" id="nc-last" placeholder="Rivera"></label>
        <label class="wide">Email<input class="inp" id="nc-email" type="email" placeholder="alex@example.com"></label>
        <label>Phone<input class="inp" id="nc-phone" placeholder="(555) 555-0100"></label>
        <label>Job title / label<input class="inp" id="nc-title" placeholder="e.g. Patient, Buyer…"></label>
        <label>Owner<select class="sel" id="nc-owner" style="width:100%">${D.owners.map(o => `<option value="${o.id}">${esc(o.name)}</option>`).join('')}</select></label>
        <label>Lifecycle stage<select class="sel" id="nc-lc" style="width:100%">${D.lifecycles.map(l => `<option>${esc(l)}</option>`).join('')}</select></label>
        <label class="wide">Original source<select class="sel" id="nc-src" style="width:100%">${D.sources.map(s => `<option>${esc(s)}</option>`).join('')}</select></label>
      </div>
      <p class="small muted">This creates a real record in the sample: the contact count, the dashboard and the reports all update the moment you save.</p>`,
      `<button class="btn" data-action="close-modal">Cancel</button>
       <button class="btn btn-primary" data-action="create-contact-save">Create contact</button>`);
  };
  HSV.actions['create-contact-save'] = function () {
    const D = HSV.D();
    const v = id => (document.getElementById(id) || {}).value || '';
    const first = v('nc-first').trim(), last = v('nc-last').trim();
    if (!first) { document.getElementById('nc-first').focus(); return; }
    const c = {
      id: 'c' + Date.now(),
      first, last: last || '—',
      email: v('nc-email').trim() || 'no-email@sample.demo',
      phone: v('nc-phone').trim() || '—',
      title: v('nc-title').trim(),
      companyId: null,
      lifecycle: v('nc-lc') || D.lifecycles[0],
      owner: v('nc-owner') || D.owners[0].id,
      source: v('nc-src') || D.sources[0],
      created: HSV.TODAY, lastTouch: HSV.TODAY, city: '—',
      custom: {},
      timeline: [{ d: HSV.TODAY, t: 'note', text: 'Created by hand during this sample session — refresh the page and the sample resets.' }]
    };
    D.contacts.unshift(c);
    UI.closeModal();
    HSV.go(HSV.href('contact', c.id));
    UI.toast('Contact created — the whole portal just counted it');
  };
  HSV.actions['import-open'] = function () {
    UI.modal('Import contacts', `
      <div class="empty" style="padding:26px 12px">${UI.icon('upload')}
        <b>Drop a CSV here (in the live CRM)</b>
        Column mapping, duplicate detection and a preview before anything is written.</div>
      <p class="small muted">Curious what a serious import looks like? Our
        <a href="../crm-migration/index.html">Spreadsheet Rescue demo</a> walks through a real
        migration — 30 messy rows to 22 clean records, every step traceable.</p>`,
      `<button class="btn" data-action="close-modal">Close</button>`);
  };

  /* ------------------------------------------------------------- contact record */
  const TL_ICON = { call: 'phone', email: 'mail', meeting: 'meeting', note: 'note' };

  HSV.views.contact = function () {
    const c = HSV.contact(HSV.state.id);
    if (!c) return notFound('contacts', 'Contacts', 'That contact doesn’t exist');
    const D = HSV.D(), q = HSV.state.q;
    const co = c.companyId ? HSV.company(c.companyId) : null;
    const act = q.act || '';

    const left = `
      <section class="card prof-card">
        ${UI.avatar(HSV.cName(c), HSV.owner(c.owner).color, 'av-lg')}
        <h2>${esc(HSV.cName(c))}</h2>
        <p class="sub">${esc(c.title || '')}${co ? ' · ' + esc(co.name) : ''}</p>
        <div class="row-c">${UI.pill(c.lifecycle, UI.lifecycleTone(c.lifecycle))}${UI.pill(c.source, 't-gray')}</div>
        <div class="prof-acts">
          <button class="prof-act" data-action="focus-note"><span class="ic">${UI.icon('note')}</span>Note</button>
          <button class="prof-act" data-action="log-touch" data-kind="email" data-id="${c.id}"><span class="ic">${UI.icon('mail')}</span>Email</button>
          <button class="prof-act" data-action="log-touch" data-kind="call" data-id="${c.id}"><span class="ic">${UI.icon('phone')}</span>Call</button>
          <button class="prof-act" data-action="quick-task" data-id="${c.id}"><span class="ic">${UI.icon('task')}</span>Task</button>
          <button class="prof-act" data-action="log-touch" data-kind="meeting" data-id="${c.id}"><span class="ic">${UI.icon('calendar')}</span>Meet</button>
        </div>
      </section>
      <section class="card props-card">
        <h3>About this contact
          <button class="assoc-add" data-action="edit-contact-open" data-id="${c.id}" style="margin-left:auto">Edit</button>
          <button class="assoc-add" data-action="all-props" data-id="${c.id}" style="margin-left:10px">View all</button></h3>
        <dl class="props">
          <div><dt>Email</dt><dd><a href="mailto:${esc(c.email)}">${esc(c.email)}</a></dd></div>
          <div><dt>Phone</dt><dd>${esc(c.phone)}</dd></div>
          <div><dt>City</dt><dd>${esc(c.city)}</dd></div>
          <div><dt>Owner</dt><dd>${UI.ownerChip(c.owner)}</dd></div>
          <div><dt>First added</dt><dd>${esc(HSV.fmtDate(c.created))}</dd></div>
          <div><dt>Last activity</dt><dd>${esc(HSV.rel(c.lastTouch))}</dd></div>
        </dl>
      </section>
      <section class="card props-card">
        <h3>Custom fields <a href="${HSV.href('properties')}">How these work</a></h3>
        <dl class="props">${Object.keys(c.custom || {}).map(k =>
          `<div><dt>${esc(k)}</dt><dd>${esc(c.custom[k])}</dd></div>`).join('') || '<div><dd class="muted">None filled in yet.</dd></div>'}</dl>
      </section>`;

    const events = HSV.contactTimeline(c).filter(ev => !act || ev.t === act);
    const timeline = events.map(ev => `
      <div class="tl-item">
        <span class="tl-node t-${esc(ev.t)}">${UI.icon(TL_ICON[ev.t] || 'note')}</span>
        <div class="tl-body">
          <div class="when">${esc(HSV.fmtDate(ev.d))}</div>
          <div class="what"><span class="kind">${esc(cap(ev.t))}</span>${esc(ev.text)}</div>
        </div>
      </div>`).join('') || `<p class="small muted" style="padding:14px 2px">No ${esc(act)}s logged with ${esc(c.first)} yet.</p>`;

    const atab = (v, label) => `<button class="act-tab ${act === v ? 'on' : ''}" data-action="act-tab" data-v="${v}">${label}</button>`;
    const centre = `
      <section class="card tl-card">
        <h3>Activity</h3>
        <div class="act-tabs">
          ${atab('', 'All activity')}${atab('note', 'Notes')}${atab('email', 'Emails')}${atab('call', 'Calls')}${atab('meeting', 'Meetings')}
        </div>
        <div class="composer">
          <textarea class="txa" id="note-input" placeholder="Type a note about ${esc(c.first)}… then save it and watch it join the timeline."></textarea>
          <div class="row"><button class="btn btn-primary btn-sm" data-action="add-note" data-id="${c.id}">${UI.icon('note')} Save note</button></div>
        </div>
        <div class="tl">${timeline}</div>
      </section>`;

    const deals = HSV.contactDeals(c.id).map(d => UI.assocItem(
      HSV.href('deal', d.id), esc(d.name), UI.stagePill(HSV.dealStageId(d)), `<b>${HSV.money(d.amount, true)}</b>`));
    const tickets = HSV.contactTickets(c.id).map(t => UI.assocItem(
      HSV.href('ticket', t.id), esc(t.subject), UI.pill(HSV.ticketStatus(t), UI.statusTone(HSV.ticketStatus(t)))));
    const convs = HSV.contactConvs(c.id).map(v => UI.assocItem(
      HSV.href('inbox', v.id), esc(v.subject), esc(v.channel) + ' · ' + esc(HSV.fmtTime(v.at))));
    const meets = HSV.contactMeetings(c.id).map(m => UI.assocItem(
      HSV.href('meetings'), esc(m.title), esc(HSV.fmtDate(m.date)) + ' at ' + esc(m.time)));

    const assoc = (title, items) => `<section class="card assoc-card">
      <h3>${esc(title)} ${UI.pill(items.length, 't-gray')}
        <button class="assoc-add" data-action="assoc-add">+ Add</button></h3>
      ${items.join('') || '<p class="small muted" style="padding:2px 0 4px">None yet.</p>'}</section>`;

    const right = `
      ${co ? `<section class="card assoc-card"><h3>Company</h3>${UI.assocItem(
        HSV.href('company', co.id),
        `<span class="row" style="gap:8px">${UI.avatar(co.name, HSV.hueColor(co.name), 'av-sm av-sq')} ${esc(co.name)}</span>`,
        esc(co.industry))}</section>` : ''}
      ${assoc(HSV.D().terms.deals, deals)}
      ${assoc('Tickets', tickets)}
      ${assoc('Meetings', meets)}
      ${assoc('Conversations', convs)}`;

    return `<div class="page view-in">
      ${UI.crumbs(HSV.href('contacts'), 'Contacts', HSV.cName(c))}
      <div class="detail">
        <div class="d-col">${left}</div>
        <div class="d-col">${centre}</div>
        <div class="d-col">${right}</div>
      </div>
    </div>`;
  };

  HSV.actions['act-tab'] = function (el) {
    HSV.setQuery({ act: el.dataset.v });
    HSV.render();
  };
  HSV.actions['focus-note'] = function () {
    const ta = document.getElementById('note-input');
    if (ta) { ta.scrollIntoView({ block: 'center' }); ta.focus(); }
  };
  HSV.actions['assoc-add'] = () => UI.toast('In the live CRM this associates an existing or new record');
  HSV.actions['quick-task'] = function (el) {
    const D = HSV.D(), c = HSV.contact(el.dataset.id);
    const due = new Date(HSV.dt(HSV.TODAY).getTime() + 3 * 864e5).toISOString().slice(0, 10);
    D.tasks.unshift({ id: 'k' + Date.now(), title: 'Follow up with ' + HSV.cName(c), due,
      type: 'To-do', owner: c.owner, related: { kind: 'contact', id: c.id }, done: false });
    HSV.render();
    UI.toast('Task created, due in 3 days — check the dashboard count');
  };
  HSV.actions['all-props'] = function (el) {
    const c = HSV.contact(el.dataset.id);
    const D = HSV.D();
    const std = [['First name', c.first], ['Last name', c.last], ['Email', c.email], ['Phone', c.phone],
      ['Job title', c.title || '—'], ['City', c.city], ['Lifecycle stage', c.lifecycle],
      ['Original source', c.source], ['Owner', HSV.owner(c.owner).name],
      ['Create date', HSV.fmtDate(c.created)], ['Last activity', HSV.fmtDate(c.lastTouch)]];
    const cust = Object.keys(c.custom || {}).map(k => [k, c.custom[k]]);
    const row = p => `<div style="display:grid;gap:1px;padding:7px 0;border-bottom:1px solid var(--border-soft)">
      <dt style="font-size:11.5px;color:var(--muted)">${esc(p[0])}</dt>
      <dd style="margin:0;font-size:13px">${esc(p[1])}</dd></div>`;
    UI.modal('All properties — ' + HSV.cName(c), `
      <div class="pop-label" style="padding-left:0">Standard properties</div><dl style="margin:0">${std.map(row).join('')}</dl>
      <div class="pop-label" style="padding-left:0">Custom properties (this portal's own fields)</div>
      <dl style="margin:0">${cust.map(row).join('') || '<p class="small muted">None yet.</p>'}</dl>
      <p class="small muted">Custom fields are defined in <a href="${HSV.href('properties')}" data-action="close-modal">Settings → Custom fields</a> — each exists for a stated reason.</p>`,
      `<button class="btn" data-action="close-modal">Close</button>`);
  };

  HSV.actions['add-note'] = function (el) {
    const ta = document.getElementById('note-input');
    const text = (ta.value || '').trim();
    if (!text) { ta.focus(); return; }
    const notes = HSV.ov().notes;
    (notes[el.dataset.id] = notes[el.dataset.id] || []).unshift({ d: HSV.TODAY, t: 'note', text });
    HSV.render();
    UI.toast('Note saved to the timeline');
  };
  HSV.actions['log-touch'] = function (el) {
    const kindText = { call: 'Called — logged a call on the timeline.',
      email: 'Emailed — logged an email on the timeline.',
      meeting: 'Meeting booked — logged on the timeline.' }[el.dataset.kind];
    const notes = HSV.ov().notes;
    (notes[el.dataset.id] = notes[el.dataset.id] || []).unshift(
      { d: HSV.TODAY, t: el.dataset.kind, text: 'Logged from the record page (sample action).' });
    HSV.render();
    UI.toast(kindText);
  };

  /* ------------------------------------------------------------- activity feed */
  HSV.views.activity = function () {
    const D = HSV.D(), q = HSV.state.q;
    const type = q.type || '', ownerF = q.aowner || '';

    let evs = [];
    D.contacts.forEach(c => HSV.contactTimeline(c).forEach(ev => evs.push({ d: ev.d, t: ev.t, text: ev.text, c })));
    const counts = { call: 0, email: 0, meeting: 0, note: 0 };
    evs.forEach(ev => { if (counts[ev.t] !== undefined) counts[ev.t]++; });
    evs = evs.filter(ev => (!type || ev.t === type) && (!ownerF || ev.c.owner === ownerF))
      .sort((a, b) => b.d.localeCompare(a.d));

    const chip = (v, label, n) => `<button class="chip ${type === v ? 'on' : ''}" data-action="act-type" data-v="${v}">${label}${n !== undefined ? ' · ' + n : ''}</button>`;
    const chips = `<div class="chips">
      ${chip('', 'Everything', evs.length && !type ? evs.length : Object.values(counts).reduce((a, b) => a + b, 0))}
      ${chip('call', 'Calls', counts.call)}${chip('email', 'Emails', counts.email)}
      ${chip('meeting', 'Meetings', counts.meeting)}${chip('note', 'Notes', counts.note)}
    </div>`;

    const ownerSel = `<select class="sel" data-qkey="aowner">
      <option value="">Any owner</option>${D.owners.map(o =>
        `<option value="${o.id}" ${ownerF === o.id ? 'selected' : ''}>${esc(o.name)}</option>`).join('')}</select>`;

    const rows = evs.map(ev => `
      <a class="li-row" href="${HSV.href('contact', ev.c.id)}">
        <span class="tl-node t-${esc(ev.t)}" style="width:28px;height:28px">${UI.icon(TL_ICON[ev.t] || 'note')}</span>
        <span class="grow"><span class="b clip">${esc(ev.text)}</span>
        <small>${esc(cap(ev.t))} · with ${esc(HSV.cName(ev.c))} · ${esc(HSV.owner(ev.c.owner).name.split(' ')[0])}</small></span>
        <span class="end"><small>${esc(HSV.fmtDate(ev.d))}</small></span>
      </a>`).join('') || UI.empty('clock', 'Nothing here', 'Try another type or owner.');

    return `<div class="page view-in">
      ${UI.pageHead('Activity feed<span class="ph-count">' + evs.length + ' activities</span>',
        'Every call, email, meeting and note across the whole CRM, newest first. Log something on any record and it appears here instantly.',
        `<button class="btn btn-primary" data-action="log-activity-open">Log activity</button>`)}
      <div class="toolbar">${ownerSel}<span class="count-note">Click any row to open the person behind it</span></div>
      ${chips}
      <div class="card list-card">${rows}</div>
    </div>`;
  };
  HSV.actions['act-type'] = function (el) {
    HSV.setQuery({ type: el.dataset.v });
    HSV.render();
  };
  HSV.actions['log-activity-open'] = function () {
    const D = HSV.D();
    UI.modal('Log an activity', `
      <label>Type<select class="sel" id="la-type" style="width:100%">
        <option value="call">Call</option><option value="email">Email</option>
        <option value="meeting">Meeting</option><option value="note">Note</option></select></label>
      <label>With<select class="sel" id="la-contact" style="width:100%">${D.contacts.map(c =>
        `<option value="${c.id}">${esc(HSV.cName(c))}</option>`).join('')}</select></label>
      <label>What happened?<textarea class="txa" id="la-text" placeholder="e.g. Called about the quote — wants to start next month."></textarea></label>`,
      `<button class="btn" data-action="close-modal">Cancel</button>
       <button class="btn btn-primary" data-action="log-activity-save">Log it</button>`);
  };
  HSV.actions['log-activity-save'] = function () {
    const v = id => (document.getElementById(id) || {}).value || '';
    const text = v('la-text').trim();
    if (!text) { document.getElementById('la-text').focus(); return; }
    const notes = HSV.ov().notes, cid = v('la-contact');
    (notes[cid] = notes[cid] || []).unshift({ d: HSV.TODAY, t: v('la-type') || 'note', text });
    UI.closeModal();
    HSV.render();
    UI.toast('Logged — it\'s on the feed and on ' + HSV.cName(HSV.contact(cid)) + '\'s record');
  };

  /* ---- edit contact properties (real mutation, everything follows) ------------- */
  HSV.actions['edit-contact-open'] = function (el) {
    const c = HSV.contact(el.dataset.id), D = HSV.D();
    UI.modal('Edit ' + HSV.cName(c), `
      <div class="form-grid">
        <label class="wide">Email<input class="inp" id="ec-email" value="${esc(c.email)}"></label>
        <label>Phone<input class="inp" id="ec-phone" value="${esc(c.phone)}"></label>
        <label>City<input class="inp" id="ec-city" value="${esc(c.city)}"></label>
        <label class="wide">Job title / label<input class="inp" id="ec-title" value="${esc(c.title || '')}"></label>
        <label>Lifecycle stage<select class="sel" id="ec-lc" style="width:100%">${D.lifecycles.map(l =>
          `<option ${l === c.lifecycle ? 'selected' : ''}>${esc(l)}</option>`).join('')}</select></label>
        <label>Owner<select class="sel" id="ec-owner" style="width:100%">${D.owners.map(o =>
          `<option value="${o.id}" ${o.id === c.owner ? 'selected' : ''}>${esc(o.name)}</option>`).join('')}</select></label>
      </div>
      <p class="small muted">Edits are real: the lists, the lifecycle counts and the reports all follow. Refresh the page and the sample resets.</p>`,
      `<button class="btn" data-action="close-modal">Cancel</button>
       <button class="btn btn-primary" data-action="edit-contact-save" data-id="${c.id}">Save changes</button>`);
  };
  HSV.actions['edit-contact-save'] = function (el) {
    const c = HSV.contact(el.dataset.id);
    const v = id => (document.getElementById(id) || {}).value || '';
    c.email = v('ec-email').trim(); c.phone = v('ec-phone').trim();
    c.city = v('ec-city').trim(); c.title = v('ec-title').trim();
    c.lifecycle = v('ec-lc'); c.owner = v('ec-owner');
    c.lastTouch = HSV.TODAY;
    UI.closeModal();
    HSV.render();
    UI.toast('Saved — every screen just picked it up');
  };

  /* ------------------------------------------------------------- lists */
  HSV.views.lists = function () {
    const D = HSV.D(), t = D.terms;
    const lists = [];
    D.lifecycles.forEach(l => lists.push({
      name: l, type: 'Active list', href: HSV.href('contacts', null, { lc: l }),
      size: D.contacts.filter(c => c.lifecycle === l).length,
      used: 'Updates itself as contacts change stage — used by the automations.' }));
    D.sources.forEach(s => lists.push({
      name: 'Came from: ' + s, type: 'Active list', href: HSV.href('contacts', null, { source: s }),
      size: D.contacts.filter(c => c.source === s).length,
      used: 'Powers the source report and campaign audiences.' }));
    lists.push({
      name: 'Everyone (master list)', type: 'Static snapshot', href: HSV.href('contacts'),
      size: D.contacts.length, used: 'Frozen copy taken at migration — the audit baseline.' });

    const table = UI.table(
      ['List', 'Size', 'Type', 'What it\'s for'],
      lists.sort((a, b) => b.size - a.size).map(l => ({
        href: l.href,
        cells: [
          `<span class="cell-main"><span>${esc(l.name)}</span></span>`,
          `<b class="num">${l.size}</b>`,
          UI.pill(l.type, l.type === 'Active list' ? 't-blue' : 't-gray'),
          `<span class="small">${esc(l.used)}</span>`,
        ],
      })), { emptyIcon: 'list' });

    return `<div class="page view-in">
      ${UI.pageHead('Lists<span class="ph-count">' + lists.length + ' lists</span>',
        'Active lists update themselves as records change; static lists are snapshots. Every size below is counted live — click one to see exactly those contacts.',
        `<button class="btn btn-primary" data-action="fake-view">Create list</button>`)}
      ${table}
    </div>`;
  };

  /* ------------------------------------------------------------- companies list */
  HSV.views.companies = function () {
    const D = HSV.D(), q = HSV.state.q;
    const needle = (q.q || '').toLowerCase();
    const rows = D.companies.filter(co =>
      !needle || (co.name + ' ' + co.industry + ' ' + co.city).toLowerCase().includes(needle)
    ).sort((a, b) => a.name.localeCompare(b.name));

    const table = UI.table(
      ['Name', 'Type', 'Size', 'City', 'Owner', 'People', 'First added'],
      rows.map(co => ({
        href: HSV.href('company', co.id),
        cells: [
          `<span class="cell-main">${UI.avatar(co.name, HSV.hueColor(co.name), 'av-sq')}<span>${esc(co.name)}<small>${esc(co.domain)}</small></span></span>`,
          esc(co.industry),
          esc(co.size) + ' people',
          esc(co.city),
          UI.ownerChip(co.owner),
          String(HSV.companyContacts(co.id).length),
          esc(HSV.fmtDate(co.created)),
        ],
      })),
      { emptyIcon: 'building' }
    );

    return `<div class="page view-in">
      ${UI.pageHead('Companies<span class="ph-count">' + rows.length + ' records</span>',
        'The organisations behind the contacts — partners, employers, referrers.')}
      <div class="toolbar">
        <input class="inp" type="search" placeholder="Search companies…" value="${esc(q.q || '')}" data-qkey="q" aria-label="Search companies">
        <span class="count-note">${rows.length} of ${D.companies.length} companies</span>
      </div>
      ${table}
      <div class="card" style="border-top:0;border-radius:0 0 var(--r-sm) var(--r-sm)">${UI.tblFoot(rows.length, D.companies.length, 'companies')}</div>
    </div>`;
  };

  /* ------------------------------------------------------------- company record */
  HSV.views.company = function () {
    const co = HSV.company(HSV.state.id);
    if (!co) return notFound('companies', 'Companies', 'That company doesn’t exist');
    const people = HSV.companyContacts(co.id);
    const deals = HSV.companyDeals(co.id);
    const open = deals.filter(d => { const s = HSV.dealStageId(d); return s !== HSV.wonStageId() && s !== HSV.lostStageId(); });

    const left = `
      <section class="card prof-card">
        ${UI.avatar(co.name, HSV.hueColor(co.name), 'av-lg av-sq')}
        <h2>${esc(co.name)}</h2>
        <p class="sub">${esc(co.industry)} · ${esc(co.city)}</p>
        <div class="row-c">${UI.pill(co.size + ' people', 't-gray')}${UI.pill(co.domain, 't-blue')}</div>
      </section>
      <section class="card props-card">
        <h3>Details</h3>
        <dl class="props">
          <div><dt>Website</dt><dd>${esc(co.domain)}</dd></div>
          <div><dt>Type</dt><dd>${esc(co.industry)}</dd></div>
          <div><dt>Owner</dt><dd>${UI.ownerChip(co.owner)}</dd></div>
          <div><dt>First added</dt><dd>${esc(HSV.fmtDate(co.created))}</dd></div>
          <div><dt>Open ${esc(HSV.D().terms.deals.toLowerCase())}</dt><dd class="b">${HSV.money(HSV.sum(open))}</dd></div>
        </dl>
      </section>`;

    const centre = `
      <section class="card tl-card">
        <h3>The story so far</h3>
        <p style="font-size:13.5px;color:var(--ink-2);margin-top:8px">${esc(co.note)}</p>
      </section>
      <section class="card list-card">
        <h3>${UI.icon('users')} People here</h3>
        ${people.map(c => `<a class="li-row" href="${HSV.href('contact', c.id)}">
          ${UI.avatar(HSV.cName(c), HSV.owner(c.owner).color)}
          <span class="grow"><span class="b clip">${esc(HSV.cName(c))}</span><small>${esc(c.title || '')}</small></span>
          <span class="end">${UI.pill(c.lifecycle, UI.lifecycleTone(c.lifecycle))}</span>
        </a>`).join('') || UI.empty('users', 'No people linked', 'No contacts are linked to this company yet.')}
      </section>`;

    const right = UI.assocCard(HSV.D().terms.deals, deals.map(d => UI.assocItem(
      HSV.href('deal', d.id), esc(d.name), UI.stagePill(HSV.dealStageId(d)), `<b>${HSV.money(d.amount, true)}</b>`)));

    return `<div class="page view-in">
      ${UI.crumbs(HSV.href('companies'), 'Companies', co.name)}
      <div class="detail">
        <div class="d-col">${left}</div>
        <div class="d-col">${centre}</div>
        <div class="d-col">${right}</div>
      </div>
    </div>`;
  };

  /* ------------------------------------------------------------- shared */
  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
  function notFound(view, label, msg) {
    return `<div class="page"><div class="card">${UI.empty('search', msg,
      'It may belong to a different portal.')}
      <p style="text-align:center;padding-bottom:24px"><a class="btn" href="${HSV.href(view)}">Back to ${esc(label)}</a></p></div></div>`;
  }
  HSV.notFound = notFound;
})();
