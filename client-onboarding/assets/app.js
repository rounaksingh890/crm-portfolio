/* Client onboarding portal — state, views, router, tour.
   The rule everywhere: nothing is typed in twice. Steps compute their own
   state from what the client has provided, and every progress number on
   every screen is derived at render time. */
(function () {
  'use strict';
  const D = window.OB;
  const $ = (s, r) => (r || document).querySelector(s);
  const esc = s => String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

  /* ---- in-session changes (the demo's working memory) --------------------- */
  const live = { taskDone: {}, access: {}, docs: {}, approvals: {}, formVals: {}, changeReq: {}, replies: [] };
  const ACCESS_TASK = { a2: 't7' };          // granting website admin also ticks task 7

  /* ---- lookups + live-aware getters ------------------------------------------ */
  const byId = (list, id) => list.find(x => x.id === id);
  const person = id => byId(D.team, id);
  const taskDone   = t => live.taskDone[t.id] !== undefined ? live.taskDone[t.id] : t.done;
  const accessStat = a => live.access[a.id] || a.status;
  const docStat    = d => live.docs[d.id] || d.status;
  const apStat     = a => live.approvals[a.id] || a.status;
  const fieldVal   = f => live.formVals[f.id] !== undefined ? live.formVals[f.id] : f.value;

  const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const fmt = iso => { if (!iso) return '—'; const p = String(iso).slice(0,10).split('-'); return MONTHS[+p[1]-1] + ' ' + (+p[2]); };
  const days = iso => Math.round((new Date(iso + 'T00:00:00') - new Date(D.today + 'T00:00:00')) / 864e5);
  const rel = iso => { const d = days(iso); if (d === 0) return 'today'; if (d === 1) return 'tomorrow';
    if (d === -1) return 'yesterday'; return d < 0 ? (-d) + ' days ago' : 'in ' + d + ' days'; };

  /* a step may declare needs; it is done when they're all met */
  function stepState(s) {
    if (!s.needs) return s.status;
    const n = s.needs;
    const ok =
      (n.tasks || []).every(id => taskDone(byId(D.tasks, id))) &&
      (n.access || []).every(id => ['granted', 'skip'].includes(accessStat(byId(D.access, id)))) &&
      (n.docs || []).every(id => docStat(byId(D.docsNeeded, id)) === 'received') &&
      (n.approvals || []).every(id => apStat(byId(D.approvals, id)) === 'approved');
    return ok ? 'done' : 'waiting';
  }
  const allSteps = () => D.phases.flatMap(p => p.steps);
  const progress = () => {
    const steps = allSteps();
    const done = steps.filter(s => stepState(s) === 'done').length;
    return { done, total: steps.length, pct: Math.round(100 * done / steps.length) };
  };
  const openTasks = () => D.tasks.filter(t => !taskDone(t));
  const waitingAps = () => D.approvals.filter(a => apStat(a) === 'waiting');
  const pendingAccess = () => D.access.filter(a => accessStat(a) === 'pending');
  const waitingDocs = () => D.docsNeeded.filter(d => docStat(d) === 'waiting');
  const formPct = f => Math.round(100 * f.fields.filter(x => fieldVal(x).trim() !== '').length / f.fields.length);

  /* ---- small pieces ------------------------------------------------------------- */
  const initials = n => n.split(/\s+/).map(w => w[0]).slice(0, 2).join('').toUpperCase();
  const av = (p, cls) => `<span class="av ${cls || ''}" style="background:${p.color}" title="${esc(p.name)}">${esc(initials(p.name))}</span>`;
  const STATE_META = {
    done:     { label: 'Done',           cls: 'st-done' },
    active:   { label: 'In progress',    cls: 'st-active' },
    waiting:  { label: 'Waiting on you', cls: 'st-wait' },
    upcoming: { label: 'Coming up',      cls: 'st-up' }
  };
  const statePill = st => { const m = STATE_META[st]; return `<span class="pill ${m.cls}">${m.label}</span>`; };
  const ownerTag = o => `<span class="own own-${o}">${o === 'you' ? 'Yours' : 'Ours'}</span>`;

  function ring(pct, size) {
    const S = size || 132, R = (S - 14) / 2, C = 2 * Math.PI * R;
    return `<svg class="ring" viewBox="0 0 ${S} ${S}" role="img" aria-label="${pct}% complete">
      <circle cx="${S/2}" cy="${S/2}" r="${R}" fill="none" stroke="var(--ring-bg)" stroke-width="11"/>
      <circle cx="${S/2}" cy="${S/2}" r="${R}" fill="none" stroke="var(--brand)" stroke-width="11" stroke-linecap="round"
        stroke-dasharray="${(pct/100*C).toFixed(1)} ${C.toFixed(1)}" transform="rotate(-90 ${S/2} ${S/2})"/>
      <text x="50%" y="47%" text-anchor="middle" class="ring-n">${pct}%</text>
      <text x="50%" y="63%" text-anchor="middle" class="ring-t">complete</text>
    </svg>`;
  }

  function taskRow(t) {
    const done = taskDone(t);
    const late = !done && days(t.due) < 0;
    return `<div class="trow ${done ? 'is-done' : ''}">
      <button class="chk ${done ? 'on' : ''}" data-act="task" data-id="${t.id}" aria-label="${done ? 'Reopen' : 'Mark done'}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m5 13 4.5 4.5L19 7"/></svg></button>
      <div class="t-main"><b>${esc(t.title)}</b><span>${esc(t.note)}</span></div>
      <div class="t-end">
        <span class="due ${late ? 'late' : ''}">${done ? 'done' : 'due ' + rel(t.due)}</span>
        <a class="jump" href="#/${t.view}">open</a>
      </div>
    </div>`;
  }

  /* ---- views ------------------------------------------------------------------------ */
  const views = {};

  views.home = () => {
    const P = progress();
    const nextMeet = D.meetings.find(m => m.status === 'next') || D.meetings.find(m => days(m.date) >= 0);
    const need = openTasks();
    const latest = D.updates[0];
    const from = person(latest.from);
    const phaseChips = D.phases.map(p => {
      const done = p.steps.filter(s => stepState(s) === 'done').length;
      const cls = done === p.steps.length ? 'ph-done' : done > 0 ? 'ph-part' : '';
      return `<a class="ph-chip ${cls}" href="#/plan"><b>${esc(p.title)}</b><span>${done}/${p.steps.length}</span></a>`;
    }).join('');

    return `
      <div class="hero-card card" data-tour="hero">
        <div class="hero-main">
          <p class="hello">Hi ${esc(D.client.contact)} 👋</p>
          <h1>${esc(D.project.name)}</h1>
          <p class="sum">${esc(D.project.summary)}</p>
          <div class="hero-meta">
            <span>Started ${fmt(D.project.started)}</span><i>·</i>
            <span><b>${days(D.project.launch)} days</b> to launch (${fmt(D.project.launch)})</span>
          </div>
          <div class="ph-chips">${phaseChips}</div>
        </div>
        <div class="hero-ring" data-tour="ring">${ring(P.pct)}
          <span class="ring-sub">${P.done} of ${P.total} steps done — this number moves as you tick things below</span></div>
      </div>

      <div class="grid-2">
        <section class="card" data-tour="attention">
          <h2>Waiting on you <span class="count">${need.length}</span></h2>
          <p class="card-sub">${need.length ? 'Everything the project needs from your side, in one list. Tick things off — the progress ring follows.' : 'Nothing! You\'re fully caught up. We\'ll message when that changes.'}</p>
          ${need.slice(0, 5).map(taskRow).join('')}
          ${need.length > 5 ? `<a class="more" href="#/tasks">All ${need.length} tasks →</a>` : `<a class="more" href="#/tasks">Open the full list →</a>`}
        </section>
        <div class="stack">
          ${nextMeet ? `<section class="card meet-next">
            <h2>Next meeting</h2>
            <div class="mrow">
              <div class="mdate"><b>${fmt(nextMeet.date).split(' ')[1]}</b><span>${fmt(nextMeet.date).split(' ')[0]}</span></div>
              <div class="t-main"><b>${esc(nextMeet.title)}</b>
                <span>${esc(nextMeet.time)} · ${esc(nextMeet.length)} · ${rel(nextMeet.date)}</span></div>
              <a class="jump" href="#/meetings">agenda</a>
            </div>
          </section>` : ''}
          <section class="card">
            <h2>Latest from us</h2>
            <div class="upd">
              ${av(from)}
              <div class="u-main"><b>${esc(from.name)}</b> <time>${fmt(latest.at)}</time>
                <p>${esc(latest.text.length > 220 ? latest.text.slice(0, 220) + '…' : latest.text)}</p></div>
            </div>
            <a class="more" href="#/updates">All updates & replies →</a>
          </section>
        </div>
      </div>

      <section class="card team-strip">
        <h2>Who's on it</h2>
        <div class="tgrid">
          ${D.team.map(p => `<div class="tcard"><div class="tc-top">${av(p)}<div><b>${esc(p.name)}</b><span>${esc(p.role)}</span></div></div>
            <span class="side-${p.side}">${p.side === 'agency' ? esc(D.agency.name) : esc(D.client.company)}</span></div>`).join('')}
        </div>
      </section>`;
  };

  views.plan = () => {
    const P = progress();
    return `
      <header class="page-head"><h1>The plan</h1>
        <p>${P.done} of ${P.total} steps done. Steps marked <b>“waiting on you”</b> complete themselves the moment you provide what they list — watch the ring on Home move.</p></header>
      ${D.phases.map(p => {
        const done = p.steps.filter(s => stepState(s) === 'done').length;
        return `<section class="phase card">
          <div class="ph-head">
            <div><h2>${esc(p.title)}</h2><p class="card-sub">${esc(p.blurb)}</p></div>
            <div class="ph-right"><span class="when">${esc(p.when)}</span><span class="frac">${done}/${p.steps.length}</span></div>
          </div>
          <div class="steps">
            ${p.steps.map(s => {
              const st = stepState(s);
              return `<button class="step ${st}" data-step="${s.id}">
                <span class="dot" aria-hidden="true"></span>
                <span class="s-main"><b>${esc(s.title)}</b>
                  <span>${s.date ? fmt(s.date) + ' · ' : ''}${esc(s.desc.split('.')[0])}.</span></span>
                <span class="s-end">${ownerTag(s.owner)}${statePill(st)}</span>
              </button>`;
            }).join('')}
          </div>
        </section>`;
      }).join('')}`;
  };

  views.tasks = () => {
    const open = openTasks().sort((a, b) => a.due.localeCompare(b.due));
    const done = D.tasks.filter(taskDone);
    return `
      <header class="page-head"><h1>Your tasks</h1>
        <p>The complete list of what the project needs from you — about 2–3 hours in total across the whole engagement. Everything else is on us.</p></header>
      <section class="card"><h2>To do <span class="count">${open.length}</span></h2>
        ${open.map(taskRow).join('') || '<p class="empty">Nothing! You\'re completely caught up.</p>'}</section>
      <section class="card"><h2>Done <span class="count">${done.length}</span></h2>
        ${done.map(taskRow).join('')}</section>`;
  };

  views.forms = () => `
    <header class="page-head"><h1>Forms & access</h1>
      <p>Two short forms and a list of system keys. Answers save as you go — half-finished is fine, come back any time.</p></header>
    ${D.forms.map(f => {
      const pct = formPct(f);
      return `<section class="card form-card">
        <div class="ph-head"><div><h2>${esc(f.title)}</h2><p class="card-sub">${esc(f.blurb)}</p></div>
          <span class="frac">${pct}%</span></div>
        <div class="bar"><i style="width:${pct}%"></i></div>
        <div class="fields">
          ${f.fields.map(q => `<label class="field ${fieldVal(q).trim() ? 'filled' : ''}">
            <span>${esc(q.label)}</span>
            ${q.type === 'area'
              ? `<textarea rows="2" data-field="${q.id}" placeholder="${esc(q.hint || 'Type here…')}">${esc(fieldVal(q))}</textarea>`
              : `<input data-field="${q.id}" value="${esc(fieldVal(q))}" placeholder="${esc(q.hint || 'Type here…')}">`}
          </label>`).join('')}
        </div>
        <div class="form-foot"><button class="btn primary" data-act="save-form" data-id="${f.id}">Save answers</button>
          <span class="fine">Saving a complete form ticks its task off your list automatically.</span></div>
      </section>`;
    }).join('')}
    <section class="card" id="access">
      <h2>System access <span class="count">${pendingAccess().length} pending</span></h2>
      <p class="card-sub">Why we need each one, and exactly how to grant it. Nothing here gives us more than the project requires, and you can revoke any of it in one click.</p>
      ${D.access.map(a => {
        const st = accessStat(a);
        return `<div class="arow st-${st}">
          <div class="t-main"><b>${esc(a.system)}</b><span>${esc(a.why)}</span><span class="how">${esc(a.how)}</span></div>
          <div class="t-end">
            ${st === 'granted' ? '<span class="pill st-done">Granted</span>'
              : st === 'skip' ? '<span class="pill st-up">Not needed</span>'
              : `<button class="btn small" data-act="grant" data-id="${a.id}">Mark as granted</button>`}
          </div>
        </div>`;
      }).join('')}
    </section>`;

  views.documents = () => `
    <header class="page-head"><h1>Documents</h1>
      <p>Everything shared in either direction — no more “which email was that attachment in?”.</p></header>
    <section class="card"><h2>From us to you</h2>
      ${D.docsShared.map(d => `<div class="drow">
        <span class="ftype">${esc(d.type)}</span>
        <div class="t-main"><b>${esc(d.name)}</b><span>${esc(d.desc)}</span></div>
        <div class="t-end"><span class="fine">${fmt(d.date)} · ${esc(d.size)}</span>
          <button class="btn small" data-act="download">Download</button></div>
      </div>`).join('')}</section>
    <section class="card"><h2>Needed from you <span class="count">${waitingDocs().length} to go</span></h2>
      ${D.docsNeeded.map(d => {
        const st = docStat(d);
        return `<div class="drow ${st === 'received' ? 'is-done' : ''}">
          <span class="ftype ${st === 'received' ? 'ok' : ''}">${st === 'received' ? '✓' : '…'}</span>
          <div class="t-main"><b>${esc(d.name)}</b><span>${esc(d.why)}</span></div>
          <div class="t-end">${st === 'received'
            ? `<span class="pill st-done">Received ${fmt(d.date)}</span>`
            : `<button class="btn small" data-act="send-doc" data-id="${d.id}">Mark as sent</button>`}</div>
        </div>`;
      }).join('')}
      <p class="fine" style="margin-top:10px">In the live version this is a real upload box; in this sample, “mark as sent” shows how everything reacts.</p>
    </section>`;

  views.approvals = () => `
    <header class="page-head"><h1>Approvals</h1>
      <p>The decisions that are genuinely yours. Approving one un-blocks its step in the plan immediately — and “request changes” is a real button, not a dare.</p></header>
    ${D.approvals.map(a => {
      const st = apStat(a);
      const items = a.items ? `<div class="ap-items">${a.items.map(i =>
        `<div class="ap-item"><b>${esc(i[0])}</b><span>${esc(i[1])}</span></div>`).join('')}</div>` : '';
      const preview = a.preview ? `
        <div class="email-prev">
          <div class="ep-head"><span>Subject</span><b>${esc(a.preview.subject)}</b></div>
          <pre class="ep-body">${esc(a.preview.body)}</pre>
        </div>
        <div class="sms-prev"><span>SMS · 48h reminder</span><p>${esc(a.preview.sms)}</p></div>` : '';
      const foot = st === 'approved'
        ? `<span class="pill st-done">Approved ${a.date ? fmt(live.approvals[a.id] ? D.today : a.date) : fmt(D.today)}</span>`
        : st === 'changes'
        ? `<div class="chg-note"><b>Change request sent:</b> ${esc(live.changeReq[a.id] || '')} <button class="btn small" data-act="approve" data-id="${a.id}">Approve the revision</button></div>`
        : `<div class="ap-actions">
            <button class="btn primary" data-act="approve" data-id="${a.id}">Approve</button>
            <button class="btn" data-act="chg-open" data-id="${a.id}">Request changes</button>
            <div class="chg-box" id="chg-${a.id}" hidden>
              <textarea rows="2" id="chg-txt-${a.id}" placeholder="What should be different? Plain words are perfect."></textarea>
              <button class="btn small" data-act="chg-send" data-id="${a.id}">Send request</button>
            </div>
          </div>`;
      return `<section class="card ap-card ${st}">
        <div class="ph-head"><div><h2>${esc(a.title)}</h2><p class="card-sub">${esc(a.blurb)}</p></div>${statePill(st === 'changes' ? 'active' : st === 'approved' ? 'done' : 'waiting')}</div>
        ${items}${preview}<div class="ap-foot">${foot}</div>
      </section>`;
    }).join('')}`;

  views.meetings = () => `
    <header class="page-head"><h1>Meetings</h1>
      <p>Five across the whole project — short, agenda'd, and never a surprise. Invites come from the calendar; this page is the single place to see them all.</p></header>
    ${D.meetings.map(m => `
      <section class="card meet ${m.status}">
        <div class="mrow">
          <div class="mdate"><b>${fmt(m.date).split(' ')[1]}</b><span>${fmt(m.date).split(' ')[0]}</span></div>
          <div class="t-main"><b>${esc(m.title)}</b>
            <span>${esc(m.time)} · ${esc(m.length)} · ${m.status === 'done' ? 'happened ' + rel(m.date) : rel(m.date)}</span>
            ${m.notes ? `<span class="how">${esc(m.notes)}</span>` : ''}</div>
          <div class="t-end mwho">${m.who.map(id => av(person(id), 'av-s')).join('')}</div>
        </div>
        <div class="agenda"><span>Agenda</span><ul>${m.agenda.map(x => `<li>${esc(x)}</li>`).join('')}</ul></div>
      </section>`).join('')}`;

  views.updates = () => {
    const feed = live.replies.map(r => ({ from: 'p4', at: r.at, text: r.text, mine: true })).concat(D.updates);
    return `
      <header class="page-head"><h1>Updates</h1>
        <p>Progress in plain words, from actual humans. Reply right here — it goes to the whole project team, not into a void.</p></header>
      <section class="card composer">
        <textarea id="reply-box" rows="2" placeholder="Ask anything, ${esc(D.client.contact)} — replies land with the whole team."></textarea>
        <button class="btn primary" data-act="reply">Send</button>
      </section>
      ${feed.map(u => { const p = person(u.from); return `
        <section class="card upd-card ${u.mine ? 'mine' : ''}">
          <div class="upd">${av(p)}
            <div class="u-main"><b>${esc(p.name)}</b> <span class="role">${esc(p.role)}</span> <time>${fmt(u.at)}${u.mine ? ' · just now' : ''}</time>
              <p>${esc(u.text)}</p></div></div>
        </section>`; }).join('')}`;
  };

  views.team = () => `
    <header class="page-head"><h1>Team & help</h1>
      <p>The people, the response times, and honest answers to the questions everyone asks.</p></header>
    <section class="card"><h2>The team</h2>
      <div class="tgrid">
        ${D.team.map(p => `<div class="tcard"><div class="tc-top">${av(p)}<div><b>${esc(p.name)}</b><span>${esc(p.role)}</span></div></div>
          <p class="tnote">${esc(p.note)}</p>
          <span class="side-${p.side}">${p.side === 'agency' ? esc(D.agency.name) : esc(D.client.company)}</span></div>`).join('')}
      </div></section>
    <section class="card"><h2>Questions everyone asks</h2>
      ${D.faq.map(f => `<details class="faq"><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join('')}</section>
    <section class="card about">
      <h2>About this sample</h2>
      <p><b>This is a portfolio piece.</b> ${esc(D.agency.name)} and ${esc(D.client.company)} are both fictional,
        and every task, date and message was invented — but this is exactly the portal a real client gets:
        one link where the plan, their to-dos, the documents and the decisions all live, so nobody ever
        wonders what's happening or what's needed from them.</p>
      <p>Try things: tick a task, approve the pipeline, mark a document as sent — the progress ring on Home
        and the plan recalculate instantly, because every number here is computed from the records, never typed in.</p>
      <p>It pairs with our <a href="../hubspot-verticals/index.html">four-industry CRM showcase</a>
        (the destination) and the <a href="../crm-migration/index.html">Spreadsheet Rescue migration demo</a>
        (the journey). Together they're the whole engagement, shown honestly.
        <a href="../index.html">See all three →</a></p>
    </section>`;

  /* ---- drawer (plan step detail) ------------------------------------------------------ */
  function openStep(id) {
    const s = allSteps().find(x => x.id === id);
    const st = stepState(s);
    let needsHtml = '';
    if (s.needs) {
      const li = [];
      (s.needs.tasks || []).forEach(tid => { const t = byId(D.tasks, tid);
        li.push([taskDone(t), esc(t.title), '#/tasks', taskDone(t) ? 'done' : 'on your task list']); });
      (s.needs.access || []).forEach(aid => { const a = byId(D.access, aid); const ok = ['granted','skip'].includes(accessStat(a));
        li.push([ok, esc(a.system) + ' access', '#/forms', ok ? 'granted' : 'pending']); });
      (s.needs.docs || []).forEach(did => { const d = byId(D.docsNeeded, did); const ok = docStat(d) === 'received';
        li.push([ok, esc(d.name), '#/documents', ok ? 'received' : 'waiting']); });
      (s.needs.approvals || []).forEach(apid => { const a = byId(D.approvals, apid); const ok = apStat(a) === 'approved';
        li.push([ok, esc(a.title), '#/approvals', ok ? 'approved' : 'waiting for your sign-off']); });
      needsHtml = `<h3>This step completes itself when:</h3>
        <div class="need-list">${li.map(x => `
          <a class="need ${x[0] ? 'ok' : ''}" href="${x[2]}">
            <span class="nd">${x[0] ? '✓' : '○'}</span><b>${x[1]}</b><span>${x[3]}</span></a>`).join('')}
        </div>`;
    }
    openDrawer(`
      <div class="d-top">${statePill(st)}${ownerTag(s.owner)}</div>
      <h2>${esc(s.title)}</h2>
      ${s.date ? `<p class="fine">${st === 'done' ? 'Completed' : 'Planned for'} ${fmt(s.date)}</p>` : ''}
      <p class="d-desc">${esc(s.desc)}</p>
      ${needsHtml}
      ${st === 'done' && s.needs ? '<p class="fine">All provided — this step completed itself. That\'s the portal working as designed.</p>' : ''}`);
  }

  function openDrawer(html) {
    const d = $('#drawer'), b = $('#dbk');
    d.innerHTML = `<button class="d-close" data-act="close" aria-label="Close">✕</button>` + html;
    d.hidden = false; b.hidden = false;
    void d.offsetWidth;
    d.classList.add('open'); b.classList.add('open');
  }
  function closeDrawer() {
    const d = $('#drawer'), b = $('#dbk');
    d.classList.remove('open'); b.classList.remove('open');
    setTimeout(() => { d.hidden = true; b.hidden = true; }, 180);
  }

  /* ---- toast ------------------------------------------------------------------------------ */
  let toastT = null;
  function toast(msg) {
    let el = $('#toast');
    if (!el) { el = document.createElement('div'); el.id = 'toast'; document.body.appendChild(el); }
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(toastT);
    toastT = setTimeout(() => el.classList.remove('show'), 2800);
  }

  /* ---- shell + router ------------------------------------------------------------------------ */
  const NAV = [
    ['home', 'Home', 'M4 11.5 12 4l8 7.5M6 10v9h12v-9'],
    ['plan', 'The plan', 'M5 5h6v6H5zM13 7h6M13 11h4M5 15h6M5 19h4M15 15l2 2 4-4'],
    ['tasks', 'Your tasks', 'M5 5h14v14H5zM8.5 12.5l2.5 2.5 4.8-5.3'],
    ['forms', 'Forms & access', 'M6 4h9l3 3v13H6zM9 10h6M9 14h6'],
    ['documents', 'Documents', 'M5 7l3-3h5l3 3h3v12H5zM12 10v6M9 13l3 3 3-3'],
    ['approvals', 'Approvals', 'M12 3l7 4v5c0 4-3 7-7 9-4-2-7-5-7-9V7zM9 12l2 2 4-4'],
    ['meetings', 'Meetings', 'M5 6h14v13H5zM5 10h14M9 4v4M15 4v4'],
    ['updates', 'Updates', 'M4 6h16v10H9l-5 4zM8 10h8M8 13h5'],
    ['team', 'Team & help', 'M9 8a3 3 0 1 0 0 .01M4 19c1-3 3-4.5 5-4.5s4 1.5 5 4.5M15 5a3 3 0 0 1 0 6M17 14c1.6.7 2.6 2 3 4']
  ];
  const ic = d => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="${d}"/></svg>`;

  function shell(view) {
    const badge = { tasks: openTasks().length, approvals: waitingAps().length };
    const links = NAV.map(n => `
      <a class="nv ${view === n[0] ? 'on' : ''}" href="#/${n[0]}">${ic(n[2])}<span>${n[1]}</span>
        ${badge[n[0]] ? `<b class="bdg">${badge[n[0]]}</b>` : ''}</a>`).join('');
    return `
      <aside class="side" id="side">
        <div class="brand">
          <span class="blogo" style="background:hsl(${D.client.logoHue},42%,42%)">${esc(D.client.company[0])}</span>
          <div><b>${esc(D.client.company)}</b><span>with ${esc(D.agency.name)}</span></div>
        </div>
        <nav>${links}</nav>
        <div class="side-foot">
          <button class="btn small wide" data-act="tour">▷ 60-second tour</button>
          <a class="fine" href="#/team">Sample project — fictional data</a>
        </div>
      </aside>
      <div class="sbk" id="sbk" data-act="close-side" hidden></div>
      <div class="main-col">
        <header class="mobbar">
          <button class="mb-btn" data-act="open-side" aria-label="Menu">${ic('M4 7h16M4 12h16M4 17h16')}</button>
          <b>${esc(D.client.company)}</b>
          <button class="mb-btn" data-act="tour" aria-label="Tour">${ic('M12 3a9 9 0 1 0 .01 0M12 16v.01M12 13c0-2 2.5-2 2.5-4A2.5 2.5 0 0 0 12 6.5 2.5 2.5 0 0 0 9.6 8')}</button>
        </header>
        <div class="note">Sample client portal · every name and number is fictional · <a href="#/team">about</a> · <a href="../index.html">↑ all three CRM samples</a></div>
        <main id="view">${views[view]()}</main>
      </div>`;
  }

  function route() {
    const v = (location.hash.replace(/^#\/?/, '') || 'home').split('?')[0];
    return views[v] ? v : 'home';
  }
  function render() {
    const v = route();
    $('#app').innerHTML = shell(v);
    document.title = D.client.company + ' · ' + (NAV.find(n => n[0] === v) || ['', 'Portal'])[1];
    window.scrollTo(0, 0);
    if (TOUR.active) setTimeout(() => TOUR.place(), 60);
  }
  /* re-render but keep scroll (for in-place ticks) */
  function refresh() {
    const y = window.scrollY;
    $('#app').innerHTML = shell(route());
    window.scrollTo(0, y);
  }

  /* ---- actions ------------------------------------------------------------------------------------ */
  const acts = {
    task(el) {
      const t = byId(D.tasks, el.dataset.id);
      live.taskDone[t.id] = !taskDone(t);
      refresh();
      toast(taskDone(t) ? 'Done — the plan and the ring just updated' : 'Reopened');
    },
    grant(el) {
      live.access[el.dataset.id] = 'granted';
      const tid = ACCESS_TASK[el.dataset.id];
      if (tid) live.taskDone[tid] = true;
      refresh();
      toast('Access marked as granted' + (tid ? ' — and its task ticked itself off' : ''));
    },
    'send-doc'(el) {
      const d = byId(D.docsNeeded, el.dataset.id);
      live.docs[d.id] = 'received';
      if (d.taskId) live.taskDone[d.taskId] = true;
      refresh();
      toast('Marked as sent — thank you!' + (d.taskId ? ' Task ticked off too.' : ''));
    },
    approve(el) {
      const a = byId(D.approvals, el.dataset.id);
      live.approvals[a.id] = 'approved';
      if (a.taskId) live.taskDone[a.taskId] = true;
      refresh();
      toast('Approved — the build step just unblocked itself');
    },
    'chg-open'(el) { const box = $('#chg-' + el.dataset.id); box.hidden = !box.hidden; },
    'chg-send'(el) {
      const txt = $('#chg-txt-' + el.dataset.id).value.trim();
      if (!txt) { $('#chg-txt-' + el.dataset.id).focus(); return; }
      live.approvals[el.dataset.id] = 'changes';
      live.changeReq[el.dataset.id] = txt;
      const a = byId(D.approvals, el.dataset.id);
      live.replies.unshift({ at: D.today + ' now', text: 'Change request on “' + a.title + '”: ' + txt });
      refresh();
      toast('Change request sent to the team');
    },
    'save-form'(el) {
      const f = byId(D.forms, el.dataset.id);
      document.querySelectorAll('[data-field]').forEach(inp => { live.formVals[inp.dataset.field] = inp.value; });
      const pct = formPct(f);
      if (pct === 100 && f.taskId && !taskDone(byId(D.tasks, f.taskId))) {
        live.taskDone[f.taskId] = true;
        refresh();
        toast('Form complete — its task ticked itself off your list 🎉');
      } else {
        refresh();
        toast('Saved (' + pct + '% complete) — come back to the rest any time');
      }
    },
    reply() {
      const box = $('#reply-box');
      const txt = box.value.trim();
      if (!txt) { box.focus(); return; }
      live.replies.unshift({ at: D.today + ' now', text: txt });
      refresh();
      toast('Sent to the whole project team');
    },
    download() { toast('In the live portal this downloads the real file — sample only here'); },
    tour() { TOUR.start(); },
    close() { closeDrawer(); },
    'open-side'() { $('#side').classList.add('open'); $('#sbk').hidden = false; },
    'close-side'() { $('#side').classList.remove('open'); $('#sbk').hidden = true; },
    'welcome-close'() { const w = $('#ob-welcome'); if (w) w.remove(); },
    'welcome-tour'() { const w = $('#ob-welcome'); if (w) w.remove(); TOUR.start(); }
  };

  document.addEventListener('click', e => {
    if (e.target.closest('[data-tourbtn]')) return;
    const stepBtn = e.target.closest('[data-step]');
    if (stepBtn) { openStep(stepBtn.dataset.step); return; }
    const el = e.target.closest('[data-act]');
    if (el && acts[el.dataset.act]) { acts[el.dataset.act](el); return; }
    if (e.target.id === 'dbk') closeDrawer();
    const nav = e.target.closest('.nv, .side a');
    if (nav) acts['close-side']();
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeDrawer(); acts['close-side'](); TOUR.end(); } });
  window.addEventListener('hashchange', render);

  /* ---- tour ------------------------------------------------------------------------------------------- */
  const TOUR = { active: false, i: 0 };
  const tourSteps = () => [
    { v: 'home', sel: null, t: 'Welcome to your project portal',
      x: 'One link where your whole project lives — the plan, your to-dos, documents and decisions. This 60-second tour shows you around. (Everything here is a fictional sample.)' },
    { v: 'home', sel: '.hero-ring', t: 'Progress that can\'t lie',
      x: 'The ring counts actual completed steps — it isn\'t typed in. When you tick a task or approve something, it moves. Try it after the tour.' },
    { v: 'home', sel: '[data-tour="attention"]', t: 'Never wonder what\'s needed',
      x: 'Everything waiting on you, in one list, with due dates. If this list is empty, you\'re free — no guilt, no chasing emails.' },
    { v: 'plan', sel: '.phase', t: 'The plan, phase by phase',
      x: 'Every step shows who owns it — yours or ours. Click any step to see exactly what it\'s waiting for, with links straight to the thing.' },
    { v: 'approvals', sel: '.ap-card', t: 'Real decisions, real buttons',
      x: 'The choices that are genuinely yours. Approve, or request changes in plain words — approving instantly unblocks the build step in the plan.' },
    { v: 'forms', sel: '.form-card', t: 'Forms that respect your time',
      x: 'Short, prefilled where we already know the answer, and saved as you go. Finish one and its task ticks itself off your list.' },
    { v: 'documents', sel: '.card', t: 'One home for every file',
      x: 'What we\'ve sent you and what we still need from you — with a reason for each. No more digging through email threads.' },
    { v: 'updates', sel: '.composer', t: 'Humans, not ticket numbers',
      x: 'Progress updates in plain words, and a reply box that reaches the whole team. That\'s the tour — go tick something and watch the ring move!' }
  ];
  TOUR.start = () => { TOUR.active = true; TOUR.i = 0; TOUR.show(); };
  TOUR.end = () => {
    TOUR.active = false;
    const r = $('#tring'), t = $('#ttip');
    if (r) r.remove(); if (t) t.remove();
  };
  TOUR.show = () => {
    const s = tourSteps()[TOUR.i];
    if (!s) return TOUR.end();
    if (route() !== s.v) { location.hash = '#/' + s.v; setTimeout(() => TOUR.place(), 80); }
    else TOUR.place();
  };
  TOUR.place = () => {
    if (!TOUR.active) return;
    const s = tourSteps()[TOUR.i];
    let ring = $('#tring'), tip = $('#ttip');
    if (!ring) { ring = document.createElement('div'); ring.id = 'tring'; document.body.appendChild(ring); }
    if (!tip) { tip = document.createElement('div'); tip.id = 'ttip'; document.body.appendChild(tip); }
    tip.innerHTML = `<span class="tt-n">${TOUR.i + 1} / ${tourSteps().length}</span>
      <h3>${esc(s.t)}</h3><p>${esc(s.x)}</p>
      <div class="tt-btns">
        <button class="btn small" data-tourbtn="end">End</button>
        ${TOUR.i ? '<button class="btn small" data-tourbtn="back">Back</button>' : ''}
        <button class="btn small primary" data-tourbtn="next">${TOUR.i === tourSteps().length - 1 ? 'Finish' : 'Next'}</button>
      </div>`;
    const el = s.sel ? document.querySelector(s.sel) : null;
    if (el) {
      el.scrollIntoView({ block: 'center' });
      const r = el.getBoundingClientRect();
      Object.assign(ring.style, { display: 'block', top: (r.top - 6) + 'px', left: (r.left - 6) + 'px',
        width: (r.width + 12) + 'px', height: (r.height + 12) + 'px' });
      let top = r.bottom + 12;
      const th = tip.offsetHeight || 180;
      if (top + th > innerHeight - 10) top = Math.max(10, r.top - th - 12);
      Object.assign(tip.style, { top: top + 'px', left: Math.max(10, Math.min(r.left, innerWidth - (tip.offsetWidth || 330) - 10)) + 'px' });
    } else {
      ring.style.display = 'none';
      Object.assign(tip.style, { top: Math.max(10, innerHeight / 2 - 120) + 'px', left: Math.max(10, innerWidth / 2 - 165) + 'px' });
    }
  };
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-tourbtn]');
    if (!b) return;
    if (b.dataset.tourbtn === 'next') { TOUR.i++; TOUR.show(); }
    else if (b.dataset.tourbtn === 'back') { TOUR.i--; TOUR.show(); }
    else TOUR.end();
  });
  window.addEventListener('resize', () => TOUR.place());

  /* ---- boot -------------------------------------------------------------------------------------------- */
  render();

  // first visit: a proper hello, with the tour one tap away
  try {
    if (!sessionStorage.getItem('ob-welcome')) {
      sessionStorage.setItem('ob-welcome', '1');
      const w = document.createElement('div');
      w.id = 'ob-welcome';
      w.innerHTML = `<div class="obw-card" role="dialog" aria-modal="true" aria-label="Welcome">
        <h3>Welcome to your project portal, ${esc(D.client.contact)} 👋</h3>
        <p>This one link is where your whole project lives — the plan, your to-dos, documents,
          decisions and updates. (This copy is a sample: every name and number is fictional,
          and it resets when you refresh.)</p>
        <p><b>The trick to try:</b> tick a task or approve something, and watch the progress
          ring recalculate — nothing here is typed in twice.</p>
        <div class="obw-btns">
          <button class="btn" data-act="welcome-close">Explore on my own</button>
          <button class="btn primary" data-act="welcome-tour">Take the 60-second tour</button>
        </div></div>`;
      w.addEventListener('mousedown', e => { if (e.target === w) w.remove(); });
      document.body.appendChild(w);
    }
  } catch (err) { /* private mode — fine */ }
})();
