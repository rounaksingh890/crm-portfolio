/* ============================================================================
   SERVICE — help desk tickets (with real threads) and the shared inbox.
   ========================================================================== */
(function () {
  'use strict';
  const HSV = window.HSV, UI = HSV.ui, esc = HSV.esc;

  const nowStamp = () => {
    const d = new Date();
    const pad = (n) => String(n).padStart(2, '0');
    return HSV.TODAY + ' ' + pad(d.getHours()) + ':' + pad(d.getMinutes());
  };

  /* ------------------------------------------------------------- tickets list */
  HSV.views.tickets = function () {
    const D = HSV.D(), q = HSV.state.q;
    const statuses = D.ticketStatuses;
    const filter = q.status || '';

    const chips = ['', ...statuses].map(s => {
      const n = s ? D.tickets.filter(t => HSV.ticketStatus(t) === s).length : D.tickets.length;
      return `<button class="chip ${filter === s ? 'on' : ''}" data-action="ticket-filter" data-v="${esc(s)}">${s || 'All'} · ${n}</button>`;
    }).join('');

    const rows = D.tickets
      .filter(t => !filter || HSV.ticketStatus(t) === filter)
      .sort((a, b) => b.created.localeCompare(a.created));

    const table = UI.table(
      ['Ticket', 'Status', 'Priority', 'Contact', 'Owner', 'Opened'],
      rows.map(t => {
        const c = HSV.contact(t.contactId);
        return {
          href: HSV.href('ticket', t.id),
          cells: [
            `<span class="cell-main"><span>${esc(t.subject)}<small>${esc(t.category)}</small></span></span>`,
            UI.pill(HSV.ticketStatus(t), UI.statusTone(HSV.ticketStatus(t))),
            UI.pill(t.priority, UI.priorityTone(t.priority)),
            c ? esc(HSV.cName(c)) : '—',
            UI.ownerChip(t.owner),
            esc(HSV.rel(t.created)),
          ],
        };
      }), { emptyIcon: 'ticket' });

    return `<div class="page view-in">
      ${UI.pageHead('Help desk<span class="ph-count">' + D.tickets.filter(t => HSV.ticketStatus(t) !== 'Closed').length + ' open</span>',
        'Every question and problem, tracked from “new” to “closed”. Open one to read the conversation.',
        `<button class="btn btn-primary" data-action="create-ticket-open">Create ticket</button>`)}
      <div class="chips">${chips}</div>
      ${table}
    </div>`;
  };

  HSV.actions = HSV.actions || {};
  HSV.actions['ticket-filter'] = function (el) {
    HSV.setQuery({ status: el.dataset.v });
    HSV.render();
  };
  HSV.actions['create-ticket-open'] = function () {
    const D = HSV.D();
    const cats = [...new Set(D.tickets.map(t => t.category))];
    UI.modal('Create ticket', `
      <label>Subject<input class="inp" id="nk-subject" placeholder="e.g. Question about last month's invoice"></label>
      <div class="form-grid">
        <label>From<select class="sel" id="nk-contact" style="width:100%">${D.contacts.map(c => `<option value="${c.id}">${esc(HSV.cName(c))}</option>`).join('')}</select></label>
        <label>Priority<select class="sel" id="nk-prio" style="width:100%"><option>Low</option><option selected>Medium</option><option>High</option></select></label>
        <label class="wide">Category<select class="sel" id="nk-cat" style="width:100%">${cats.map(c => `<option>${esc(c)}</option>`).join('')}</select></label>
        <label class="wide">What did they say?<textarea class="txa" id="nk-desc" placeholder="Their message, in their words…"></textarea></label>
      </div>`,
      `<button class="btn" data-action="close-modal">Cancel</button>
       <button class="btn btn-primary" data-action="create-ticket-save">Create ticket</button>`);
  };
  HSV.actions['create-ticket-save'] = function () {
    const D = HSV.D();
    const v = id => (document.getElementById(id) || {}).value || '';
    const subject = v('nk-subject').trim();
    if (!subject) { document.getElementById('nk-subject').focus(); return; }
    const cid = v('nk-contact');
    const t = { id: 't' + Date.now(), subject, status: 'New', priority: v('nk-prio') || 'Medium',
      contactId: cid, owner: HSV.contact(cid).owner, created: HSV.TODAY,
      category: v('nk-cat') || 'General',
      desc: v('nk-desc').trim() || 'Logged by hand during this sample session.',
      thread: v('nk-desc').trim() ? [{ from: 'them', at: HSV.TODAY + ' 09:00', text: v('nk-desc').trim() }] : [] };
    D.tickets.unshift(t);
    UI.closeModal();
    HSV.go(HSV.href('ticket', t.id));
    UI.toast('Ticket created — the help-desk count and the dashboard follow');
  };

  /* ------------------------------------------------------------- ticket record */
  HSV.views.ticket = function () {
    const t = HSV.ticket(HSV.state.id);
    if (!t) return HSV.notFound('tickets', 'Help desk', 'That ticket doesn’t exist');
    const c = HSV.contact(t.contactId);
    const status = HSV.ticketStatus(t);
    const extra = HSV.ov().replies[t.id] || [];
    const thread = t.thread.concat(extra);

    const left = `
      <section class="card props-card">
        <h3>Ticket details</h3>
        <dl class="props">
          <div><dt>Status — change it, everything follows</dt><dd>
            <select class="sel" data-action-change="ticket-status" data-id="${t.id}" style="width:100%">
              ${HSV.D().ticketStatuses.map(s => `<option ${s === status ? 'selected' : ''}>${esc(s)}</option>`).join('')}
            </select></dd></div>
          <div><dt>Priority</dt><dd>${UI.pill(t.priority, UI.priorityTone(t.priority))}</dd></div>
          <div><dt>Category</dt><dd>${esc(t.category)}</dd></div>
          <div><dt>Opened</dt><dd>${esc(HSV.fmtDate(t.created))} (${esc(HSV.rel(t.created))})</dd></div>
          <div><dt>Owner</dt><dd>${UI.ownerChip(t.owner)}</dd></div>
        </dl>
      </section>
      ${c ? UI.assocCard('Contact', [UI.assocItem(HSV.href('contact', c.id),
        `<span class="row" style="gap:8px">${UI.avatar(HSV.cName(c), HSV.owner(c.owner).color, 'av-sm')} ${esc(HSV.cName(c))}</span>`,
        esc(c.email))]) : ''}`;

    const msgs = thread.map(m => `
      <div class="msg ${m.from === 'us' ? 'us' : 'them'}">
        <div class="who">${m.from === 'us' ? 'Our team' : esc(c ? HSV.cName(c) : 'Customer')} · ${esc(HSV.fmtTime(m.at))}</div>
        ${esc(m.text)}
      </div>`).join('');

    const centre = `
      <section class="card tl-card">
        <h3>${esc(t.subject)}</h3>
        <p class="small muted" style="margin:4px 0 12px">${esc(t.desc)}</p>
        <div class="thread">${msgs}</div>
        <div class="composer" style="border:0;padding-bottom:0;margin-top:10px">
          <textarea class="txa" id="reply-input" placeholder="Write a reply… it will drop straight into the thread."></textarea>
          <div class="row"><button class="btn btn-primary btn-sm" data-action="ticket-reply" data-id="${t.id}">${UI.icon('send')} Send reply</button></div>
        </div>
      </section>`;

    const tasks = HSV.relatedTasks('ticket', t.id);
    const right = tasks.length ? UI.assocCard('Tasks on this ticket', tasks.map(k => UI.assocItem(
      HSV.href('tasks'), esc(k.title), 'due ' + esc(HSV.rel(k.due)),
      HSV.taskDone(k) ? UI.pill('Done', 't-green') : UI.pill('To do', 't-yellow')))) : '';

    return `<div class="page view-in">
      ${UI.crumbs(HSV.href('tickets'), 'Help desk', t.subject)}
      <div class="detail">
        <div class="d-col">${left}</div>
        <div class="d-col">${centre}</div>
        <div class="d-col">${right || '<div></div>'}</div>
      </div>
    </div>`;
  };

  HSV.actions['ticket-reply'] = function (el) {
    const ta = document.getElementById('reply-input');
    const text = (ta.value || '').trim();
    if (!text) { ta.focus(); return; }
    const r = HSV.ov().replies;
    (r[el.dataset.id] = r[el.dataset.id] || []).push({ from: 'us', at: nowStamp(), text });
    HSV.render();
    UI.toast('Reply added to the thread');
  };
  HSV.actions['ticket-status'] = function (el) {   // fired on <select> change
    HSV.ov().ticketStatus[el.dataset.id] = el.value;
    HSV.render();
    UI.toast('Status set to “' + el.value + '”');
  };

  /* ------------------------------------------------------------- inbox */
  HSV.views.inbox = function () {
    const D = HSV.D(), q = HSV.state.q;
    const chan = q.channel || '';
    const list = D.conversations.slice().sort((a, b) => b.at.localeCompare(a.at))
      .filter(v => !chan || v.channel === chan);

    const selId = HSV.state.id;
    const sel = selId ? HSV.conv(selId) : null;
    if (sel && HSV.convRead(sel)) HSV.ov().read[sel.id] = true;   // opening marks it read

    const chips = ['', 'Email', 'Chat', 'WhatsApp'].map(ch => {
      const n = ch ? D.conversations.filter(v => v.channel === ch).length : D.conversations.length;
      return `<button class="chip ${chan === ch ? 'on' : ''}" data-action="inbox-filter" data-v="${ch}">${ch || 'All'} · ${n}</button>`;
    }).join('');

    const items = list.map(v => {
      const c = HSV.contact(v.contactId);
      return `<button class="conv-item ${sel && sel.id === v.id ? 'sel' : ''}" data-href="${HSV.href('inbox', v.id, q)}">
        ${UI.chanIc(v.channel)}
        <span class="grow">
          <span class="cv-top"><span class="b clip">${esc(HSV.cName(c))}</span>
            ${HSV.convRead(v) ? '<span class="u-dot"></span>' : ''}
            <time>${esc(HSV.fmtTime(v.at).split(',')[0])}</time></span>
          <span class="cv-sub clip">${esc(v.subject)}</span>
          <span class="cv-prev clip">${esc(v.msgs[v.msgs.length - 1].text)}</span>
        </span>
      </button>`;
    }).join('') || UI.empty('inbox', 'No conversations', 'Try another channel filter.');

    let pane;
    if (sel) {
      const c = HSV.contact(sel.contactId);
      const msgs = HSV.convMsgs(sel).map(m => `
        <div class="msg ${m.from === 'us' ? 'us' : 'them'}">
          <div class="who">${m.from === 'us' ? 'Our team' : esc(HSV.cName(c))} · ${esc(HSV.fmtTime(m.at))}</div>
          ${esc(m.text)}
        </div>`).join('');
      pane = `<section class="card conv-pane">
        <div class="conv-head">
          <button class="btn btn-icon" data-href="${HSV.href('inbox', null, q)}" title="Back to the list" style="display:none" id="conv-back">${UI.icon('back')}</button>
          ${UI.chanIc(sel.channel)}
          <span class="grow"><span class="b">${esc(sel.subject)}</span>
            <span class="small muted" style="display:block">with <a href="${HSV.href('contact', c.id)}">${esc(HSV.cName(c))}</a> · ${esc(sel.channel)}</span></span>
          <a class="btn btn-sm" href="${HSV.href('contact', c.id)}">View contact</a>
        </div>
        <div class="conv-body"><div class="thread">${msgs}</div></div>
        <div class="conv-foot">
          <textarea class="txa" id="conv-reply" placeholder="Reply to ${esc(c.first)}… your message appears in the thread."></textarea>
          <div class="row"><span class="small muted">Replies here are part of the demo — nothing is really sent.</span>
          <button class="btn btn-primary btn-sm" data-action="conv-reply" data-id="${sel.id}">${UI.icon('send')} Reply</button></div>
        </div>
      </section>`;
    } else {
      pane = `<section class="card conv-pane"><div class="conv-body">
        ${UI.empty('chat', 'Pick a conversation', 'Choose one on the left — email, live chat and WhatsApp all land in this one inbox.')}
      </div></section>`;
    }

    // On phones: show the list, or the thread once one is chosen.
    const mList = sel ? 'hide-m' : '';
    const mPane = sel ? '' : 'hide-m';

    return `<div class="page view-in">
      ${UI.pageHead('Inbox', 'One shared inbox for email, website chat and WhatsApp — nothing slips through.')}
      <div class="chips">${chips}</div>
      <div class="inbox">
        <section class="card conv-list ${mList}">${items}</section>
        <div class="${mPane}" style="min-width:0">${pane}</div>
      </div>
    </div>`;
  };

  HSV.actions['inbox-filter'] = function (el) {
    HSV.setQuery({ channel: el.dataset.v });
    HSV.render();
  };
  HSV.actions['conv-reply'] = function (el) {
    const ta = document.getElementById('conv-reply');
    const text = (ta.value || '').trim();
    if (!text) { ta.focus(); return; }
    const r = HSV.ov().replies;
    (r[el.dataset.id] = r[el.dataset.id] || []).push({ from: 'us', at: nowStamp(), text });
    HSV.render();
    UI.toast('Reply added — see it in the thread');
  };

  // show the back button on phones via CSS hook
  HSV.onRender.push(function () {
    const back = document.getElementById('conv-back');
    if (back && window.matchMedia('(max-width: 900px)').matches) back.style.display = '';
  });
})();
