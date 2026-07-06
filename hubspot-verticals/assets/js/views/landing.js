/* ============================================================================
   LANDING — pick an industry, open its portal. Plus "about this sample".
   ========================================================================== */
(function () {
  'use strict';
  const HSV = window.HSV, UI = HSV.ui, esc = HSV.esc;

  /* distinct cover art per industry — abstract, in the portal's own colors */
  function art(key, accent) {
    const g = 'cg-' + key;
    const defs = `<defs><linearGradient id="${g}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${accent}"/><stop offset="1" stop-color="${accent}" stop-opacity=".65"/>
    </linearGradient></defs>`;
    const base = `<rect width="400" height="150" fill="url(#${g})"/>`;
    let deco = '';
    if (key === 'medical') {
      deco = `<path d="M0 92 h70 l16-34 18 62 16-42 12 14 h268" fill="none" stroke="#fff" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" opacity=".9"/>
        <g opacity=".28" fill="#fff"><path d="M318 28h14v14h14v14h-14v14h-14V56h-14V42h14z"/><circle cx="60" cy="34" r="15" fill="none" stroke="#fff" stroke-width="3"/></g>`;
    } else if (key === 'saas') {
      deco = `<g opacity=".3" stroke="#fff" stroke-width="1">${[40,80,120].map(y=>`<line x1="0" y1="${y}" x2="400" y2="${y}"/>`).join('')}</g>
        <path d="M24 118 L100 96 L168 104 L246 62 L322 44 L384 26" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" opacity=".92"/>
        <g fill="#fff">${[[24,118],[100,96],[168,104],[246,62],[322,44],[384,26]].map(p=>`<circle cx="${p[0]}" cy="${p[1]}" r="5" opacity=".95"/>`).join('')}</g>`;
    } else if (key === 'realestate') {
      deco = `<g fill="#fff" opacity=".85">
        <path d="M40 150V96l30-24 30 24v54h-22v-30h-16v30z"/>
        <path d="M118 150V70l36-28 36 28v80h-26v-38h-20v38z" opacity=".65"/>
        <path d="M208 150V102l26-20 26 20v48h-18v-26h-16v26z" opacity=".45"/>
        <rect x="288" y="52" width="70" height="98" rx="3" opacity=".3"/>
        <g opacity=".9">${[64,80,96,112].map(y=>`<rect x="298" y="${y}" width="10" height="8" rx="1"/><rect x="316" y="${y}" width="10" height="8" rx="1"/><rect x="334" y="${y}" width="10" height="8" rx="1"/>`).join('')}</g></g>`;
    } else {
      deco = `<g stroke="#fff" stroke-width="3" fill="none" opacity=".9" stroke-linejoin="round">
        <path d="M56 58 90 42l34 16v38L90 112 56 96z"/><path d="M56 58l34 16 34-16M90 74v38"/></g>
        <g opacity=".55" stroke="#fff" stroke-width="3" fill="none" stroke-linejoin="round">
        <path d="M170 84h44l22 22-30 30-36-36z"/><circle cx="204" cy="98" r="5"/></g>
        <path d="M280 116c22-30 48-46 88-52" stroke="#fff" stroke-width="3.5" fill="none" opacity=".8" stroke-linecap="round" stroke-dasharray="1 10"/>
        <path d="M356 52l14 8-6 15" stroke="#fff" stroke-width="3.5" fill="none" opacity=".8" stroke-linecap="round" stroke-linejoin="round"/>`;
    }
    return `<svg viewBox="0 0 400 150" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">${defs}${base}${deco}</svg>`;
  }

  function coverStats(d) {
    const lost = (d.stages.find(s => s.prob === 0) || {}).id;
    const won = (d.stages.find(s => s.prob === 100) || {}).id;
    const open = d.deals.filter(x => x.stage !== lost && x.stage !== won)
      .reduce((a, x) => a + x.amount, 0);
    const openK = d.currency + (open >= 1000000 ? (open / 1000000).toFixed(1).replace(/\.0$/, '') + 'M'
      : open >= 10000 ? Math.round(open / 1000) + 'k' : open.toLocaleString('en-US'));
    return [
      { v: d.contacts.length, l: 'contacts' },
      { v: openK, l: 'open ' + d.terms.deals.toLowerCase() },
      { v: d.workflows.length, l: 'automations' },
    ];
  }

  const FEATURES = [
    ['A dashboard that adds up', 'every number on it is calculated live from the records below it.'],
    ['Contacts & companies', 'full records with activity history, custom fields and everything they touch.'],
    ['A drag-of-the-eye deal board', 'the pipeline as columns, plus a table view and per-deal pages.'],
    ['Tasks & meetings', 'a working to-do list (tick things off!) and an upcoming schedule.'],
    ['A help desk', 'support tickets with real back-and-forth message threads.'],
    ['A shared inbox', 'email, chat and WhatsApp in one place — replies you type actually appear.'],
    ['Email campaigns', 'sent, opened, clicked and replied, shown honestly.'],
    ['Forms', 'each website form with its questions and its conversion numbers.'],
    ['Automations', 'every workflow drawn step by step in plain language.'],
    ['Reports', 'six charts per portal, each with the table behind it.'],
    ['Custom fields & integrations', 'the setup screens clients ask about most.'],
    ['A guided tour', 'a built-in walkthrough for anyone seeing a CRM for the first time.'],
  ];

  HSV.views.landing = function () {
    const covers = HSV.verticals.map(k => {
      const d = HSV.dataOf(k);
      const stats = coverStats(d).map(s => `<div><b>${esc(s.v)}</b><span>${esc(s.l)}</span></div>`).join('');
      return `<a class="cover" href="#/${k}/dashboard" style="--cov-accent:${d.accent}">
        <div class="cov-art">${art(k, d.accent)}<span class="cov-tag">${esc(d.industryLabel)}</span></div>
        <div class="cov-body">
          <span class="prod">${esc(d.product)}</span>
          <h2>${esc(d.brand)}</h2>
          <p>${esc(d.tagline)}</p>
          <div class="cov-stats">${stats}</div>
          <span class="cov-cta">Open this portal ${UI.icon('chevr')}</span>
        </div></a>`;
    }).join('');

    const feats = FEATURES.map(f =>
      `<div class="feat-item">${UI.icon('check')}<span><b>${esc(f[0])}</b> — ${esc(f[1])}</span></div>`).join('');

    return `<div class="land">
      <nav class="land-nav">
        <span class="land-logo"><svg viewBox="0 0 24 24" fill="none" stroke="#ff7a59" stroke-width="1.7" stroke-linecap="round"><circle cx="12" cy="12" r="3.2" fill="#ff7a59" stroke="none"/><path d="M12 3v4M18.5 16.5 15 14.6M5.5 16.5 9 14.6" stroke-width="2.6"/><circle cx="12" cy="12" r="8.6"/></svg>CRM Showcase</span>
        <span class="pill t-yellow">Sample project — fictional data</span>
        <a class="plain" href="#about">About this sample</a>
        <a class="plain" href="../index.html">← Portfolio</a>
      </nav>

      <header class="hero">
        <h1>One CRM build, shown four ways — <em>pick your industry</em></h1>
        <p class="sub">This is a working sample of a fully-configured, HubSpot-style CRM.
          The same build is set up four different ways — for a clinic group, a software company,
          a property brokerage and an online store — so you can see it speaking your language.
          Open one and click anything: every name, number and card leads somewhere real.</p>
        <div class="hero-hints">
          <span>${UI.icon('check')} Everything is clickable</span>
          <span>${UI.icon('check')} Every number reconciles</span>
          <span>${UI.icon('check')} Built-in guided tour</span>
          <span>${UI.icon('check')} Works on your phone</span>
        </div>
      </header>

      <section class="covers">${covers}</section>

      <section class="feat">
        <div class="card">
          <h2>What's inside every portal</h2>
          <p class="lede">Each portal is a complete CRM on its own — not a slideshow. The same
            fifteen screens, filled with records that make sense for that industry.</p>
          <div class="feat-list">${feats}</div>
        </div>
      </section>

      <section class="about-sec" id="about">
        <div class="card">
          <h2>About this sample ${UI.pill('the honest bit', 't-orange')}</h2>
          <p>This is a <b>portfolio piece</b>, built to show what a properly configured CRM looks
            like when it's done end-to-end: pipelines shaped to the business, custom fields that
            mean something, automations written in plain words, and reports that answer real questions.</p>
          <p><b>Every person, company and number in here is made up.</b> The data lives in four small,
            readable files — one per industry — and every screen calculates from them on the spot.
            That's why the dashboard, the reports and the record pages always agree with each other.</p>
          <p>If you'd like this set up for your own business — your pipeline, your fields, your
            automations — this is exactly the kind of work we do. The tour inside each portal
            (the question-mark button, top right) is a good place to start looking around.</p>
          <p>This is one of three connected samples. See how the data gets clean in the
            <a href="../crm-migration/index.html">Spreadsheet Rescue migration</a>, and how a client
            follows the project in the <a href="../client-onboarding/index.html">onboarding portal</a>.
            <a href="../index.html">All three →</a></p>
        </div>
      </section>

      <footer class="land-foot">
        <span>Sample project · no real customer data · not affiliated with HubSpot</span>
        <span>Made for demonstration</span>
      </footer>
    </div>`;
  };
})();
