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
      ${UI.pageHead('Automations', 'The robots that do the follow-up. Each one is written in plain language — open one to see every step. The switches work.')}
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
        <h3>Every step, in order</h3>
        <p class="small muted" style="margin:4px 0 16px">This is the whole automation — no hidden logic, nothing you couldn’t explain to a colleague in a minute.</p>
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
})();
