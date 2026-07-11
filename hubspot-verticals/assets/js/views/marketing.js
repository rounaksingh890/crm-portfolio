/* ============================================================================
   MARKETING — email campaigns, website forms and plain-language automations.
   ========================================================================== */
(function () {
  'use strict';
  const HSV = window.HSV, UI = HSV.ui, esc = HSV.esc;

  const pct = (a, b) => b ? Math.round(100 * a / b) : 0;
  const statusTone = (s) => s === 'Sent' ? 't-green' : s === 'Running' ? 't-blue' : 't-yellow';

  /* ------------------------------------------------------------- campaigns */
  HSV.views.campaigns = function () {
    const D = HSV.D();
    const sent = D.campaigns.filter(g => g.sent > 0);
    const totSent = sent.reduce((a, g) => a + g.sent, 0);
    const totOpen = sent.reduce((a, g) => a + g.opened, 0);
    const totClick = sent.reduce((a, g) => a + g.clicked, 0);

    const kpis = [
      { label: 'Emails sent', value: totSent.toLocaleString('en-US'), sub: sent.length + ' campaigns so far', href: HSV.href('campaigns') },
      { label: 'Opened', value: pct(totOpen, totSent) + '%', sub: totOpen.toLocaleString('en-US') + ' opens', href: HSV.href('campaigns') },
      { label: 'Clicked', value: pct(totClick, totSent) + '%', sub: totClick.toLocaleString('en-US') + ' clicks', href: HSV.href('campaigns') },
    ].map(UI.kpi).join('');

    const rows = D.campaigns.slice().sort((a, b) => b.date.localeCompare(a.date)).map(g => ({
      href: HSV.href('campaign', g.id),
      cells: [
        `<span class="cell-main"><span>${esc(g.name)}<small>${esc(g.subject)}</small></span></span>`,
        UI.pill(g.type, 't-gray'),
        UI.pill(g.status, statusTone(g.status)),
        esc(g.audience),
        g.sent ? `<b class="num">${g.sent.toLocaleString('en-US')}</b>` : '—',
        g.sent ? pct(g.opened, g.sent) + '%' : '—',
        g.sent ? pct(g.clicked, g.sent) + '%' : '—',
      ],
    }));

    return `<div class="page view-in">
      ${UI.pageHead('Emails & campaigns', 'Newsletters, automated follow-ups and one-off sends — with honest numbers next to each.')}
      <div class="kpis" style="grid-template-columns:repeat(auto-fit,minmax(150px,1fr));max-width:560px">${kpis}</div>
      ${UI.table(['Campaign', 'Type', 'Status', 'Who gets it', 'Sent', 'Opened', 'Clicked'], rows, { emptyIcon: 'send' })}
    </div>`;
  };

  HSV.views.campaign = function () {
    const g = HSV.campaign(HSV.state.id);
    if (!g) return HSV.notFound('campaigns', 'Campaigns', 'That campaign doesn’t exist');

    const funnel = HSV.charts.hbars([
      { label: 'Sent', value: g.sent },
      { label: 'Opened', value: g.opened },
      { label: 'Clicked', value: g.clicked },
      { label: 'Replied', value: g.replied },
    ]);

    const left = `
      <section class="card props-card">
        <h3>Campaign details</h3>
        <dl class="props">
          <div><dt>Type</dt><dd>${esc(g.type)}</dd></div>
          <div><dt>Status</dt><dd>${UI.pill(g.status, statusTone(g.status))}</dd></div>
          <div><dt>${g.status === 'Scheduled' ? 'Goes out' : 'Sent'}</dt><dd>${esc(HSV.fmtDate(g.date))}</dd></div>
          <div><dt>Who gets it</dt><dd>${esc(g.audience)}</dd></div>
        </dl>
      </section>
      <section class="card props-card">
        <h3>How it did</h3>
        <dl class="props">
          <div><dt>Open rate</dt><dd class="b">${g.sent ? pct(g.opened, g.sent) + '%' : 'Not sent yet'}</dd></div>
          <div><dt>Click rate</dt><dd class="b">${g.sent ? pct(g.clicked, g.sent) + '%' : '—'}</dd></div>
          <div><dt>Of those who opened, clicked</dt><dd>${g.opened ? pct(g.clicked, g.opened) + '%' : '—'}</dd></div>
          <div><dt>Replies</dt><dd>${g.replied}</dd></div>
        </dl>
      </section>`;

    const centre = `
      <section class="card tl-card">
        <h3>The email itself</h3>
        <div class="email-mock" style="margin-top:10px">
          <div class="em-head"><span>From: ${esc(HSV.D().brand)} &lt;hello@${esc(HSV.D().brand.toLowerCase().replace(/[^a-z]/g, ''))}.com&gt;</span>
            <b>${esc(g.subject)}</b><span>${esc(g.preview)}</span></div>
          <div class="em-body">${esc(g.preview)} <span class="muted">(…the full email lives in the real campaign builder — this sample shows the numbers that matter.)</span></div>
        </div>
        ${g.sent ? `<h3 style="margin-top:18px">From sent to replied</h3><div style="margin-top:10px">${funnel}</div>` : ''}
      </section>`;

    return `<div class="page view-in">
      ${UI.crumbs(HSV.href('campaigns'), 'Emails & campaigns', g.name)}
      <div class="detail" style="grid-template-columns:320px minmax(0,1fr)">
        <div class="d-col">${left}</div>
        <div class="d-col">${centre}</div>
      </div>
    </div>`;
  };

  /* ------------------------------------------------------------- forms */
  HSV.views.forms = function () {
    const D = HSV.D();
    const cards = D.forms.map(f => {
      const conv = pct(f.submissions, f.views);
      const recent = f.recent.map(cid => {
        const c = HSV.contact(cid);
        return c ? UI.avatar(HSV.cName(c), HSV.owner(c.owner).color, 'av-sm') : '';
      }).join('');
      return `<a class="card wf-card" href="${HSV.href('form', f.id)}" style="text-decoration:none;color:inherit">
        <div class="wf-top"><h3>${esc(f.name)}</h3>${UI.pill('page ' + f.page, 't-blue')}</div>
        <div class="ratebar" title="${conv}% of visitors fill it in"><i style="width:${Math.max(conv, 3)}%"></i></div>
        <div class="rate-legend"><span>${f.views.toLocaleString('en-US')} visits</span>
          <span><b>${f.submissions}</b> filled in</span><span><b>${conv}%</b> conversion</span></div>
        <div class="row" style="margin-top:2px"><span class="small muted">${f.fields.length} questions</span>
          <span class="row" style="gap:4px;margin-left:auto">${recent}</span></div>
      </a>`;
    }).join('');

    return `<div class="page view-in">
      ${UI.pageHead('Forms', 'The forms on the website. Each one creates a contact and kicks off an automation.')}
      <div class="rep-grid">${cards}</div>
    </div>`;
  };

  HSV.views.form = function () {
    const f = HSV.form(HSV.state.id);
    if (!f) return HSV.notFound('forms', 'Forms', 'That form doesn’t exist');
    const conv = pct(f.submissions, f.views);

    const mock = f.fields.map(fl => {
      const long = /\?|summary|question|looking/i.test(fl);
      return `<label>${esc(fl)}${long
        ? `<textarea class="txa" rows="2" placeholder="…"></textarea>`
        : `<input class="inp" placeholder="…">`}</label>`;
    }).join('');

    const recent = f.recent.map(cid => {
      const c = HSV.contact(cid);
      return c ? UI.assocItem(HSV.href('contact', c.id),
        `<span class="row" style="gap:8px">${UI.avatar(HSV.cName(c), HSV.owner(c.owner).color, 'av-sm')} ${esc(HSV.cName(c))}</span>`,
        esc(c.source)) : '';
    });

    const left = `
      <section class="card props-card">
        <h3>Form details</h3>
        <dl class="props">
          <div><dt>Lives on</dt><dd>${esc(f.page)}</dd></div>
          <div><dt>Page visits</dt><dd>${f.views.toLocaleString('en-US')}</dd></div>
          <div><dt>Filled in</dt><dd class="b">${f.submissions}</dd></div>
          <div><dt>Conversion</dt><dd class="b">${conv}%</dd></div>
        </dl>
      </section>
      ${UI.assocCard('Recent people from this form', recent)}`;

    const centre = `
      <section class="card tl-card">
        <h3>What visitors see</h3>
        <p class="small muted" style="margin:4px 0 14px">A live preview of the form’s questions. On the real site, sending it creates the contact automatically.</p>
        <div class="form-mock">${mock}
          <div><button class="btn btn-primary" data-action="fake-submit">Send</button></div>
        </div>
      </section>`;

    return `<div class="page view-in">
      ${UI.crumbs(HSV.href('forms'), 'Forms', f.name)}
      <div class="detail" style="grid-template-columns:320px minmax(0,1fr)">
        <div class="d-col">${left}</div>
        <div class="d-col">${centre}</div>
      </div>
    </div>`;
  };

  HSV.actions = HSV.actions || {};
  HSV.actions['fake-submit'] = function () {
    UI.toast('In the real build this would create a contact and start an automation');
  };

  /* ------------------------------------------------------------- automations */
  const KIND = {
    trigger: { ic: 'bolt',    label: 'When this happens' },
    email:   { ic: 'mail',    label: 'Send an email' },
    delay:   { ic: 'clock',   label: 'Wait' },
    branch:  { ic: 'branch',  label: 'Decision' },
    task:    { ic: 'task',    label: 'Create a task' },
    update:  { ic: 'pencil',  label: 'Update / notify' },
  };

  HSV.views.workflows = function () {
    const D = HSV.D();
    const cards = D.workflows.map(w => {
      const on = HSV.wfOn(w);
      return `<div class="card wf-card" data-href="${HSV.href('workflow', w.id)}" tabindex="0">
        <div class="wf-top">
          <h3>${esc(w.name)}</h3>
          ${w.custom ? UI.pill('built this session', 't-orange') : ''}
          ${UI.pill(on ? 'On' : 'Off', on ? 't-green' : 't-gray')}
          <button class="switch ${on ? 'on' : ''}" data-action="wf-toggle" data-id="${w.id}"
            role="switch" aria-checked="${on}" aria-label="Turn “${esc(w.name)}” ${on ? 'off' : 'on'}"></button>
        </div>
        <p class="wf-trg">Starts when: ${esc(w.trigger.toLowerCase())} · Goal: ${esc(w.goal.toLowerCase())}</p>
        <div class="wf-nums">
          <span><b>${w.enrolled.toLocaleString('en-US')}</b>ever entered</span>
          <span><b>${on ? w.active : 0}</b>in it right now</span>
          <span><b>${w.completed.toLocaleString('en-US')}</b>finished</span>
          <span><b>${w.steps.length}</b>steps</span>
        </div>
      </div>`;
    }).join('');

    return `<div class="page view-in">
      ${UI.pageHead('Automations<span class="ph-count">' + D.workflows.length + ' workflows</span>',
        'The robots that do the follow-up. Each one is written in plain language — open one to see every step, or build your own from blocks.',
        `<a class="btn btn-primary" href="${HSV.href('builder')}">Create workflow</a>`)}
      <div class="wf-list">${cards}</div>
    </div>`;
  };

  HSV.views.workflow = function () {
    const w = HSV.workflow(HSV.state.id);
    if (!w) return HSV.notFound('workflows', 'Automations', 'That automation doesn’t exist');
    const on = HSV.wfOn(w);

    const steps = w.steps.map((s, i) => {
      const k = KIND[s.k] || KIND.update;
      return (i ? '<div class="wf-join"></div>' : '') + `
        <div class="wf-step">
          <span class="ws-ic ws-${esc(s.k)}">${UI.icon(k.ic)}</span>
          <span class="grow"><span class="ws-kind">${esc(k.label)}</span>
          <span class="ws-text" style="display:block">${esc(s.text)}</span></span>
        </div>`;
    }).join('');

    const left = `
      <section class="card props-card">
        <h3>About this automation</h3>
        <dl class="props">
          <div><dt>Switched on?</dt><dd class="row">
            <button class="switch ${on ? 'on' : ''}" data-action="wf-toggle" data-id="${w.id}"
              role="switch" aria-checked="${on}" aria-label="Turn this automation ${on ? 'off' : 'on'}"></button>
            <span>${on ? 'Yes — running' : 'No — paused'}</span></dd></div>
          <div><dt>Starts when</dt><dd>${esc(w.trigger)}</dd></div>
          <div><dt>What it’s for</dt><dd>${esc(w.goal)}</dd></div>
          <div><dt>Ever entered</dt><dd>${w.enrolled.toLocaleString('en-US')} people</dd></div>
          <div><dt>In it right now</dt><dd>${on ? w.active : 0} people</dd></div>
          <div><dt>Finished it</dt><dd>${w.completed.toLocaleString('en-US')} people</dd></div>
        </dl>
      </section>`;

    const centre = `
      <section class="card tl-card">
        <h3>Every step, in order
          <a class="assoc-add" style="margin-left:auto" href="${HSV.href('builder', w.id)}">✎ Edit the steps</a></h3>
        <p class="small muted" style="margin:4px 0 16px">This is the whole automation — no hidden logic, nothing you couldn’t explain to a colleague in a minute. And yes, you can edit it.</p>
        <div class="wf-flow">${steps}</div>
      </section>`;

    return `<div class="page view-in">
      ${UI.crumbs(HSV.href('workflows'), 'Automations', w.name)}
      <div class="detail" style="grid-template-columns:320px minmax(0,1fr)">
        <div class="d-col">${left}</div>
        <div class="d-col">${centre}</div>
      </div>
    </div>`;
  };

  HSV.actions['wf-toggle'] = function (el) {
    const w = HSV.workflow(el.dataset.id);
    HSV.ov().wfOn[w.id] = !HSV.wfOn(w);
    HSV.render();
    UI.toast(HSV.wfOn(w) ? 'Automation switched on' : 'Automation paused');
  };

  /* ==========================================================================
     WORKFLOW BUILDER — drag blocks together (or tap to add), edit every line,
     preview the schedule against a sample contact, then save it for real.
     ========================================================================== */
  const BLOCKS = [
    { k: 'trigger', label: 'When this happens', hint: 'How people enter — every workflow starts with one.', def: 'Someone fills the website form' },
    { k: 'email',   label: 'Send an email',     hint: 'A message in your voice, sent for you.',             def: 'Send a friendly follow-up email' },
    { k: 'delay',   label: 'Wait',              hint: 'Give people room to breathe.',                       def: 'Wait 1 day' },
    { k: 'branch',  label: 'Decision',          hint: 'Do different things depending on what happened.',    def: 'Replied already? If yes, end the workflow' },
    { k: 'task',    label: 'Create a task',     hint: 'Put a human in the loop.',                           def: 'Create a call task for the owner' },
    { k: 'update',  label: 'Update / notify',   hint: 'Change a field or ping the team.',                   def: 'Notify the team channel' }
  ];
  let draft = null, draftFor = undefined, dragSrc = null;

  function initDraft() {
    const id = HSV.state.id || null;
    const key = HSV.state.portal + '|' + (id || 'new');
    if (draftFor === key && draft) return;
    draftFor = key;
    if (id) {
      const w = HSV.workflow(id);
      draft = w ? { id, name: w.name, goal: w.goal, on: HSV.wfOn(w), steps: w.steps.map(s => ({ k: s.k, text: s.text })) } : null;
    }
    if (!id || !draft) {
      draft = { id: null, name: '', goal: '',  on: true,
        steps: [{ k: 'trigger', text: BLOCKS[0].def }, { k: 'email', text: BLOCKS[1].def }] };
    }
  }

  HSV.views.builder = function () {
    initDraft();
    if (!draft) return HSV.notFound('workflows', 'Automations', 'That automation doesn’t exist');
    const editing = !!draft.id;

    const palette = BLOCKS.map(b => `
      <button class="pal-block ws-${b.k}-b" draggable="true" data-pal="${b.k}" data-action="bld-add" data-k="${b.k}"
        title="Click to add, or drag it into place">
        <span class="ws-ic ws-${b.k}">${UI.icon((KIND[b.k] || KIND.update).ic)}</span>
        <span class="grow"><b>${esc(b.label)}</b><small>${esc(b.hint)}</small></span>
        <span class="pal-plus">+</span>
      </button>`).join('');

    const steps = draft.steps.map((s, i) => {
      const k = KIND[s.k] || KIND.update;
      return (i ? '<div class="wf-join"></div>' : '') + `
        <div class="wf-step bld-step" draggable="true" data-bi="${i}">
          <span class="bld-grip" title="Drag to reorder">${UI.icon('drag')}</span>
          <span class="ws-ic ws-${esc(s.k)}">${UI.icon(k.ic)}</span>
          <span class="grow"><span class="ws-kind">${esc(k.label)}</span>
            <input class="bld-text" data-bld-text="${i}" value="${esc(s.text)}" aria-label="${esc(k.label)} — step text"></span>
          <span class="bld-ctl">
            <button class="bld-btn" data-action="bld-up" data-i="${i}" ${i === 0 ? 'disabled' : ''} aria-label="Move up">↑</button>
            <button class="bld-btn" data-action="bld-down" data-i="${i}" ${i === draft.steps.length - 1 ? 'disabled' : ''} aria-label="Move down">↓</button>
            <button class="bld-btn del" data-action="bld-del" data-i="${i}" aria-label="Remove step">✕</button>
          </span>
        </div>`;
    }).join('');

    return `<div class="page view-in">
      ${UI.crumbs(HSV.href('workflows'), 'Automations', editing ? 'Edit: ' + draft.name : 'New workflow')}
      ${UI.pageHead(editing ? 'Edit the steps' : 'Build a workflow',
        'Drag blocks from the left into the flow — or just click them. Every line is editable. Nothing is saved until you say so.',
        `<button class="btn" data-action="bld-preview">▷ Preview a run</button>
         <button class="btn btn-primary" data-action="bld-save">${editing ? 'Save changes' : 'Save workflow'}</button>`)}
      <div class="bld">
        <aside class="bld-pal card">
          <h3>Building blocks</h3>
          ${palette}
        </aside>
        <section class="bld-canvas card">
          <div class="bld-meta">
            <label>Name it<input class="inp" data-bld-name value="${esc(draft.name)}" placeholder="e.g. New enquiry → first reply in minutes"></label>
            <label>What's it for?<input class="inp" data-bld-goal value="${esc(draft.goal)}" placeholder="e.g. Nobody waits more than an hour"></label>
            <label class="bld-on"><span>Start it switched on</span>
              <button class="switch ${draft.on ? 'on' : ''}" data-action="bld-on" role="switch" aria-checked="${draft.on}" aria-label="Start switched on"></button></label>
          </div>
          <div class="wf-flow bld-flow" id="bld-flow">${steps}
            <div class="bld-dropend" data-dropend>Drop a block here — or click one on the left</div>
          </div>
        </section>
      </div>
    </div>`;
  };

  /* ---- builder actions ------------------------------------------------------ */
  function syncTexts() {
    document.querySelectorAll('[data-bld-text]').forEach(inp => {
      const i = +inp.dataset.bldText;
      if (draft.steps[i]) draft.steps[i].text = inp.value;
    });
    const n = document.querySelector('[data-bld-name]');
    const g = document.querySelector('[data-bld-goal]');
    if (n) draft.name = n.value;
    if (g) draft.goal = g.value;
  }
  HSV.actions['bld-add'] = function (el) {
    syncTexts();
    const b = BLOCKS.find(x => x.k === el.dataset.k);
    if (b.k === 'trigger' && draft.steps.some(s => s.k === 'trigger')) {
      UI.toast('One trigger per workflow — edit the one at the top'); return;
    }
    if (b.k === 'trigger') draft.steps.unshift({ k: b.k, text: b.def });
    else draft.steps.push({ k: b.k, text: b.def });
    HSV.render();
  };
  HSV.actions['bld-del'] = function (el) {
    syncTexts();
    draft.steps.splice(+el.dataset.i, 1);
    HSV.render();
  };
  HSV.actions['bld-up'] = function (el) {
    syncTexts();
    const i = +el.dataset.i;
    if (i > 0) { const [s] = draft.steps.splice(i, 1); draft.steps.splice(i - 1, 0, s); HSV.render(); }
  };
  HSV.actions['bld-down'] = function (el) {
    syncTexts();
    const i = +el.dataset.i;
    if (i < draft.steps.length - 1) { const [s] = draft.steps.splice(i, 1); draft.steps.splice(i + 1, 0, s); HSV.render(); }
  };
  HSV.actions['bld-on'] = function () { syncTexts(); draft.on = !draft.on; HSV.render(); };
  HSV.actions['bld-save'] = function () {
    syncTexts();
    const D = HSV.D();
    if (!draft.steps.some(s => s.k === 'trigger')) { UI.toast('Add a trigger — every workflow needs a way in'); return; }
    if (draft.steps.length < 2) { UI.toast('Add at least one step after the trigger'); return; }
    if (!draft.name.trim()) {
      const n = document.querySelector('[data-bld-name]');
      n.focus(); UI.toast('Give it a name first'); return;
    }
    const trigger = draft.steps.find(s => s.k === 'trigger').text;
    if (draft.id) {
      const w = HSV.workflow(draft.id);
      w.name = draft.name.trim(); w.goal = draft.goal.trim() || w.goal;
      w.trigger = trigger; w.steps = draft.steps.map(s => ({ k: s.k, text: s.text }));
      HSV.ov().wfOn[w.id] = draft.on;
      const id = draft.id;
      draft = null; draftFor = undefined;
      HSV.go(HSV.href('workflow', id));
      UI.toast('Saved — the automation now runs your version');
    } else {
      const w = { id: 'w' + Date.now(), name: draft.name.trim(),
        status: draft.on ? 'On' : 'Off', trigger,
        goal: draft.goal.trim() || 'Built during this session',
        enrolled: 0, active: 0, completed: 0, custom: true,
        steps: draft.steps.map(s => ({ k: s.k, text: s.text })) };
      D.workflows.unshift(w);
      draft = null; draftFor = undefined;
      HSV.go(HSV.href('workflow', w.id));
      UI.toast('Workflow created — it\'s live on the Automations list');
    }
  };
  HSV.actions['bld-preview'] = function () {
    syncTexts();
    const D = HSV.D();
    const c = D.contacts[0];
    let day = 0, later = false;
    const rows = draft.steps.map(s => {
      if (s.k === 'delay') {
        const m = s.text.match(/(\d+)\s*(hour|day|week)/i);
        if (m) {
          const n = +m[1], u = m[2].toLowerCase();
          if (u === 'hour') later = true;
          else { day += n * (u === 'week' ? 7 : 1); later = false; }
        } else { day += 1; later = false; }
        return null;
      }
      const kind = (KIND[s.k] || KIND.update).label;
      return `<div class="prev-row"><span class="prev-day">Day ${day}${later ? '+' : ''}</span>
        <span class="ws-ic ws-${esc(s.k)}" style="width:26px;height:26px">${UI.icon((KIND[s.k] || KIND.update).ic)}</span>
        <span class="grow"><b>${esc(kind)}</b><small style="display:block">${esc(s.text)}</small></span></div>`;
    }).filter(Boolean).join('');
    UI.modal('Preview: a run for ' + HSV.cName(c), `
      <p class="small muted">If ${esc(c.first)} entered this workflow today, here's the schedule the steps produce:</p>
      <div class="prev-list">${rows || '<p class="small muted">Add some steps first.</p>'}</div>
      <p class="small muted">Waits move the clock; everything else happens on the day it lands on. In the live build this preview runs against real enrollment rules.</p>`,
      `<button class="btn" data-action="close-modal">Close</button>`);
  };

  /* ---- builder drag & drop (palette → canvas, and reorder) --------------------- */
  document.addEventListener('dragstart', function (e) {
    const pal = e.target.closest && e.target.closest('[data-pal]');
    const step = e.target.closest && e.target.closest('.bld-step[data-bi]');
    if (pal) { dragSrc = { type: 'pal', k: pal.dataset.pal }; e.dataTransfer.effectAllowed = 'copy'; }
    else if (step) { dragSrc = { type: 'step', i: +step.dataset.bi }; step.classList.add('dragging'); e.dataTransfer.effectAllowed = 'move'; }
    else return;
    e.dataTransfer.setData('text/plain', 'bld');
  });
  document.addEventListener('dragend', function () {
    if (!dragSrc) return;
    dragSrc = null;
    document.querySelectorAll('.bld-step.dragging').forEach(el => el.classList.remove('dragging'));
    document.querySelectorAll('.bld-over').forEach(el => el.classList.remove('bld-over'));
  });
  document.addEventListener('dragover', function (e) {
    if (!dragSrc) return;
    const target = e.target.closest && (e.target.closest('.bld-step[data-bi]') || e.target.closest('[data-dropend]'));
    if (!target) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = dragSrc.type === 'pal' ? 'copy' : 'move';
    document.querySelectorAll('.bld-over').forEach(el => { if (el !== target) el.classList.remove('bld-over'); });
    target.classList.add('bld-over');
  });
  document.addEventListener('drop', function (e) {
    if (!dragSrc) return;
    const stepEl = e.target.closest && e.target.closest('.bld-step[data-bi]');
    const endEl = e.target.closest && e.target.closest('[data-dropend]');
    if (!stepEl && !endEl) return;
    e.preventDefault();
    syncTexts();
    let at = stepEl ? +stepEl.dataset.bi : draft.steps.length;
    if (dragSrc.type === 'pal') {
      const b = BLOCKS.find(x => x.k === dragSrc.k);
      if (b.k === 'trigger' && draft.steps.some(s => s.k === 'trigger')) { UI.toast('One trigger per workflow'); }
      else { draft.steps.splice(b.k === 'trigger' ? 0 : at, 0, { k: b.k, text: b.def }); }
    } else {
      const from = dragSrc.i;
      if (at > from) at--;
      const [s] = draft.steps.splice(from, 1);
      draft.steps.splice(Math.min(at, draft.steps.length), 0, s);
    }
    dragSrc = null;
    HSV.render();
  });

  /* keep the draft in sync as people type (no re-render needed) */
  document.addEventListener('input', function (e) {
    if (!draft) return;
    if (e.target.matches && e.target.matches('[data-bld-text], [data-bld-name], [data-bld-goal]')) syncTexts();
  });
})();
