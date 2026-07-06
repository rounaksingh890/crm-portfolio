/* ============================================================================
   SETTINGS — custom fields, connected apps, and the honest "about" page.
   ========================================================================== */
(function () {
  'use strict';
  const HSV = window.HSV, UI = HSV.ui, esc = HSV.esc;

  /* ------------------------------------------------------------- custom fields */
  HSV.views.properties = function () {
    const D = HSV.D();
    const groups = {};
    D.customProps.forEach(p => { (groups[p.object] = groups[p.object] || []).push(p); });

    const objLabel = { Contact: 'On every contact', Deal: 'On every ' + D.terms.deal.toLowerCase(),
      Company: 'On every company', Ticket: 'On every ticket' };

    const sections = Object.keys(groups).map(obj => {
      const rows = groups[obj].map(p => ({
        cells: [
          `<span class="cell-main"><span>${esc(p.label)}<small>saved as <code style="font-size:11px">${esc(p.internal)}</code></small></span></span>`,
          UI.pill(p.type, 't-blue'),
          esc(p.options),
          esc(p.used),
        ],
      }));
      return `<div class="day-group"><h3>${esc(objLabel[obj] || obj)} · ${rows.length} custom field${rows.length > 1 ? 's' : ''}</h3>
        ${UI.table(['Field', 'Type', 'Choices', 'Why it exists'], rows)}</div>`;
    }).join('');

    return `<div class="page view-in">
      ${UI.pageHead('Custom fields',
        'The fields we added on top of the standard ones — each with a reason to exist. This is usually where a CRM setup succeeds or fails.')}
      ${sections}
      <p class="small muted" style="max-width:70ch">You can see these fields in action on any
        <a href="${HSV.href('contacts')}">contact record</a> — the “Custom fields” box on the left
        is built from exactly this list.</p>
    </div>`;
  };

  /* ------------------------------------------------------------- integrations */
  HSV.views.integrations = function () {
    const D = HSV.D();
    const cards = D.integrations.map(it => {
      const on = HSV.intOn(it.name);
      return `<div class="card int-card">
        <div class="row">
          <span class="int-logo" style="background:${HSV.hueColor(it.name)}">${esc(it.name.slice(0, 2).toUpperCase())}</span>
          <span class="grow"><span class="b">${esc(it.name)}</span></span>
          ${UI.pill(it.cat, 't-gray')}
        </div>
        <p>${esc(it.desc)}</p>
        <div class="foot">
          ${UI.pill(on ? 'Connected' : 'Not connected', on ? 't-green' : 't-gray')}
          <button class="switch ${on ? 'on' : ''}" data-action="int-toggle" data-name="${esc(it.name)}"
            role="switch" aria-checked="${on}" aria-label="${on ? 'Disconnect' : 'Connect'} ${esc(it.name)}"></button>
        </div>
      </div>`;
    }).join('');

    const n = D.integrations.filter(it => HSV.intOn(it.name)).length;

    return `<div class="page view-in">
      ${UI.pageHead('Connected apps',
        n + ' of ' + D.integrations.length + ' connected. Each one has a one-line answer to “what does it actually do for us?” — if there isn’t one, it doesn’t get connected.')}
      <div class="int-grid">${cards}</div>
    </div>`;
  };

  HSV.actions = HSV.actions || {};
  HSV.actions['int-toggle'] = function (el) {
    const name = el.dataset.name;
    HSV.ov().intOn[name] = !HSV.intOn(name);
    HSV.render();
    HSV.ui.toast(HSV.intOn(name) ? name + ' connected' : name + ' disconnected');
  };

  /* ------------------------------------------------------------- about */
  HSV.views.about = function () {
    const D = HSV.D();
    return `<div class="page view-in about-page">
      ${UI.pageHead('About this sample', 'The honest page.')}
      <div class="card">
        <h2>What you’re looking at</h2>
        <p>This portal — <b>${esc(D.brand)}</b>, a fictional ${esc(D.industryLabel.toLowerCase())} business —
          is one of four industries in this sample. It shows what a CRM looks like when it’s properly
          configured end-to-end: a pipeline shaped to the business, custom fields with a purpose,
          automations anyone can read, and reports that agree with the records underneath them.</p>

        <h2>Everything here is made up</h2>
        <p>Every person, company, message and number is fictional. The data for this whole portal lives
          in one small, readable file, and every screen calculates from it while you watch. Tick off a
          task and the dashboard count drops. Move a ${esc(D.terms.deal.toLowerCase())} along the pipeline
          and the totals, the board and the reports all move together. That’s the point of the sample.</p>

        <h2>Things worth trying</h2>
        <ul>
          <li>Take the <b>guided tour</b> — the question-mark button at the top right.</li>
          <li>Open a <a href="${HSV.href('contacts')}">contact</a> and save a note — it joins the timeline.</li>
          <li>Drag your eye down the <a href="${HSV.href('deals')}">${esc(D.terms.pipelineName.toLowerCase())}</a>, open a card, and click a different stage.</li>
          <li>Reply to a message in the <a href="${HSV.href('inbox')}">inbox</a> or a <a href="${HSV.href('tickets')}">ticket</a>.</li>
          <li>Open an <a href="${HSV.href('workflows')}">automation</a> and read it step by step.</li>
          <li>Use the <b>portal switcher</b> (the four-squares button, top right) to see this same build
            speaking a different industry’s language.</li>
        </ul>

        <h2>Why it exists</h2>
        <p>It’s a portfolio piece. If you’d like a CRM configured like this for your own business —
          your pipeline, your fields, your automations, your reports — this is exactly the kind of
          work we do, and this sample doubles as the specification we’d start from.</p>

        <p class="small" style="margin-top:18px;color:var(--muted)">Built as an independent demonstration.
          Not affiliated with or endorsed by HubSpot — it just follows the interface conventions people
          already know. <a href="#/">Back to all four industries</a>.</p>
      </div>
    </div>`;
  };
})();
