/* ============================================================================
   CRM — contacts & companies: filterable lists + full record pages.
   ========================================================================== */
(function () {
  'use strict';
  const HSV = window.HSV, UI = HSV.ui, esc = HSV.esc;

  /* ------------------------------------------------------------- contacts list */
  HSV.views.contacts = function () {
    const D = HSV.D(), q = HSV.state.q;
    const needle = (q.q || '').toLowerCase();

    let rows = D.contacts.filter(c =>
      (!needle || (HSV.cName(c) + ' ' + c.email + ' ' + (c.title || '')).toLowerCase().includes(needle)) &&
      (!q.owner || c.owner === q.owner) &&
      (!q.lc || c.lifecycle === q.lc) &&
      (!q.source || c.source === q.source)
    ).sort((a, b) => b.lastTouch.localeCompare(a.lastTouch));

    const opts = (list, sel, label) =>
      `<option value="">${label}</option>` + list.map(x =>
        `<option value="${esc(x.v)}" ${x.v === sel ? 'selected' : ''}>${esc(x.l)}</option>`).join('');

    const toolbar = `<div class="toolbar">
      <input class="inp" type="search" placeholder="Search name, email…" value="${esc(q.q || '')}" data-qkey="q" aria-label="Search contacts">
      <select class="sel" data-qkey="lc">${opts(D.lifecycles.map(l => ({ v: l, l })), q.lc, 'Any stage')}</select>
      <select class="sel" data-qkey="owner">${opts(D.owners.map(o => ({ v: o.id, l: o.name })), q.owner, 'Any owner')}</select>
      <select class="sel" data-qkey="source">${opts(D.sources.map(s => ({ v: s, l: s })), q.source, 'Any source')}</select>
      <button class="btn" data-action="export-contacts">${UI.icon('download')} Export</button>
      <span class="count-note">${rows.length} of ${D.contacts.length} contacts</span>
    </div>`;

    const table = UI.table(
      ['Name', 'Email', 'Phone', 'Stage', 'Owner', 'Source', 'Last activity'],
      rows.map(c => ({
        href: HSV.href('contact', c.id),
        cells: [
          `<span class="cell-main">${UI.avatar(HSV.cName(c), HSV.owner(c.owner).color)}<span>${esc(HSV.cName(c))}<small>${esc(c.title || '')}</small></span></span>`,
          `<a href="mailto:${esc(c.email)}" onclick="event.stopPropagation()">${esc(c.email)}</a>`,
          esc(c.phone),
          UI.pill(c.lifecycle, UI.lifecycleTone(c.lifecycle)),
          UI.ownerChip(c.owner),
          esc(c.source),
          esc(HSV.rel(c.lastTouch)),
        ],
      })),
      { emptyIcon: 'user' }
    );

    return `<div class="page view-in">
      ${UI.pageHead('Contacts', 'Everyone in the CRM — patients, buyers, partners, the lot. Click a row to open the full record.')}
      ${toolbar}${table}
    </div>`;
  };

  HSV.actions = HSV.actions || {};
  HSV.actions['export-contacts'] = function () {
    const D = HSV.D();
    HSV.downloadCsv(D.key + '-contacts.csv',
      ['Name', 'Email', 'Phone', 'Stage', 'Owner', 'Source', 'City', 'Created'],
      D.contacts.map(c => [HSV.cName(c), c.email, c.phone, c.lifecycle,
        HSV.owner(c.owner).name, c.source, c.city, c.created]));
    UI.toast('Contacts exported as CSV');
  };

  /* ------------------------------------------------------------- contact record */
  const TL_ICON = { call: 'phone', email: 'mail', meeting: 'meeting', note: 'note' };

  HSV.views.contact = function () {
    const c = HSV.contact(HSV.state.id);
    if (!c) return notFound('contacts', 'Contacts', 'That contact doesn’t exist');
    const D = HSV.D();
    const co = c.companyId ? HSV.company(c.companyId) : null;

    const left = `
      <section class="card prof-card">
        ${UI.avatar(HSV.cName(c), HSV.owner(c.owner).color, 'av-lg')}
        <h2>${esc(HSV.cName(c))}</h2>
        <p class="sub">${esc(c.title || '')}${co ? ' · ' + esc(co.name) : ''}</p>
        <div class="row-c">${UI.pill(c.lifecycle, UI.lifecycleTone(c.lifecycle))}${UI.pill(c.source, 't-gray')}</div>
        <div class="prof-acts">
          <button class="prof-act" data-action="log-touch" data-kind="call" data-id="${c.id}"><span class="ic">${UI.icon('phone')}</span>Call</button>
          <button class="prof-act" data-action="log-touch" data-kind="email" data-id="${c.id}"><span class="ic">${UI.icon('mail')}</span>Email</button>
          <button class="prof-act" data-action="log-touch" data-kind="meeting" data-id="${c.id}"><span class="ic">${UI.icon('calendar')}</span>Meet</button>
        </div>
      </section>
      <section class="card props-card">
        <h3>About this contact</h3>
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
          `<div><dt>${esc(k)}</dt><dd>${esc(c.custom[k])}</dd></div>`).join('')}</dl>
      </section>`;

    const timeline = HSV.contactTimeline(c).map(ev => `
      <div class="tl-item">
        <span class="tl-node t-${esc(ev.t)}">${UI.icon(TL_ICON[ev.t] || 'note')}</span>
        <div class="tl-body">
          <div class="when">${esc(HSV.fmtDate(ev.d))}</div>
          <div class="what"><span class="kind">${esc(cap(ev.t))}</span>${esc(ev.text)}</div>
        </div>
      </div>`).join('');

    const centre = `
      <section class="card tl-card">
        <h3>Activity</h3>
        <p class="small muted">The full history with ${esc(c.first)} — and yes, the note box works.</p>
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

    const right = `
      ${co ? `<section class="card assoc-card"><h3>Company</h3>${UI.assocItem(
        HSV.href('company', co.id),
        `<span class="row" style="gap:8px">${UI.avatar(co.name, HSV.hueColor(co.name), 'av-sm av-sq')} ${esc(co.name)}</span>`,
        esc(co.industry))}</section>` : ''}
      ${UI.assocCard(HSV.D().terms.deals, deals)}
      ${UI.assocCard('Tickets', tickets)}
      ${UI.assocCard('Meetings', meets)}
      ${UI.assocCard('Conversations', convs)}`;

    return `<div class="page view-in">
      ${UI.crumbs(HSV.href('contacts'), 'Contacts', HSV.cName(c))}
      <div class="detail">
        <div class="d-col">${left}</div>
        <div class="d-col">${centre}</div>
        <div class="d-col">${right}</div>
      </div>
    </div>`;
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
      ${UI.pageHead('Companies', 'The organisations behind the contacts — partners, employers, referrers.')}
      <div class="toolbar">
        <input class="inp" type="search" placeholder="Search companies…" value="${esc(q.q || '')}" data-qkey="q" aria-label="Search companies">
        <span class="count-note">${rows.length} of ${D.companies.length} companies</span>
      </div>
      ${table}
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
