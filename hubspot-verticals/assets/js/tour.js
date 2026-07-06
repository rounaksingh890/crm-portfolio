/* ============================================================================
   TOUR — a guided walkthrough for people who've never used a CRM.
   Steps can navigate between screens; the spotlight follows.
   ========================================================================== */
(function () {
  'use strict';
  const HSV = window.HSV, UI = HSV.ui, esc = HSV.esc;

  let idx = -1, ring = null, tip = null, active = false;

  function steps() {
    const D = HSV.D(), t = D.terms;
    const firstContact = D.contacts[0];
    return [
      { view: 'dashboard', sel: null,
        title: 'Welcome to ' + D.brand,
        text: 'This is a sample CRM for a fictional ' + D.industryLabel.toLowerCase() +
              ' business — every person and number in it is made up. This short tour shows you around. You can stop it any time.' },
      { view: 'dashboard', sel: '.kpis',
        title: 'Numbers that add up',
        text: 'These aren’t typed in — they’re calculated from the records underneath while you watch. Click any card to see the screen behind the number.' },
      { view: 'dashboard', sel: ['.tn-menu', '.tn-burger'],
        title: 'Everything lives up here',
        text: 'Contacts, the pipeline, the inbox, campaigns, automations, reports — all one click away, grouped the way you’d expect.' },
      { view: 'dashboard', sel: ['.tn-search-btn'],
        title: 'Find anyone, instantly',
        text: 'Search names, companies, tickets, campaigns — anything. On a keyboard, pressing / opens it too.' },
      { view: 'contacts', sel: '.tbl-wrap',
        title: 'Contacts',
        text: 'Every row opens a full record. Try the filters above the table — stage, owner, source — and watch the list follow.' },
      { view: 'contact', id: firstContact.id, sel: '.tl-card',
        title: 'A full history on every person',
        text: 'Calls, emails, meetings and notes in one timeline. The note box at the top really works — type something and save it.' },
      { view: 'deals', sel: '.board',
        title: t.pipelineName,
        text: 'Each column is a stage; each card is a ' + t.deal.toLowerCase() + '. Open one and click a different stage — the totals, the dashboard and the reports all move together.' },
      { view: 'inbox', sel: '.inbox',
        title: 'One inbox for everything',
        text: 'Email, website chat and WhatsApp land in the same place. Open a conversation and send a reply — it appears in the thread.' },
      { view: 'workflows', sel: '.wf-list',
        title: 'Automations in plain language',
        text: 'The follow-up robots. Open one and you can read every step — no hidden logic. The on/off switches work too.' },
      { view: 'reports', sel: '.rep-grid',
        title: 'Reports you can trust',
        text: 'Click any chart to see the table of numbers behind it. Chart and table always agree, because they’re drawn from the same records.' },
      { view: 'reports', sel: ['[data-menu="portal"]', '.tn-burger'],
        title: 'Four industries, one build',
        text: 'This four-squares button switches you to the same CRM configured for a different industry. That’s the end of the tour — the “About this sample” page (under the gear) tells the honest full story.' },
    ];
  }

  function ensureEls() {
    if (!ring) { ring = document.createElement('div'); ring.className = 'tour-ring'; document.body.appendChild(ring); }
    if (!tip) { tip = document.createElement('div'); tip.className = 'tour-tip'; document.body.appendChild(tip); }
  }

  function findEl(sel) {
    if (!sel) return null;
    const list = Array.isArray(sel) ? sel : [sel];
    for (const s of list) {
      const el = document.querySelector(s);
      if (el && el.offsetParent !== null) return el;
      if (el && getComputedStyle(el).position === 'fixed') return el;
    }
    return null;
  }

  function place(step, tries) {
    if (!active) return;
    const el = findEl(step.sel);
    if (!el && step.sel && (tries || 0) < 20) {         // view may still be rendering
      return setTimeout(() => place(step, (tries || 0) + 1), 50);
    }
    ensureEls();
    const all = steps();

    tip.innerHTML = `
      <div class="tt-step">Step ${idx + 1} of ${all.length}</div>
      <h3>${esc(step.title)}</h3>
      <p>${esc(step.text)}</p>
      <div class="tt-btns">
        <button class="btn btn-ghost btn-sm" data-tour="end">End tour</button>
        ${idx > 0 ? '<button class="btn btn-sm" data-tour="back">Back</button>' : ''}
        <button class="btn btn-primary btn-sm" data-tour="next">${idx === all.length - 1 ? 'Finish' : 'Next'}</button>
      </div>`;

    if (el) {
      el.scrollIntoView({ block: 'center', behavior: 'auto' });
      const r = el.getBoundingClientRect();
      const pad = 6;
      ring.style.display = 'block';
      ring.style.top = (r.top - pad) + 'px';
      ring.style.left = (r.left - pad) + 'px';
      ring.style.width = (r.width + pad * 2) + 'px';
      ring.style.height = (r.height + pad * 2) + 'px';
      // put the tip below the target, or above if there's no room
      const th = tip.offsetHeight || 190;
      let top = r.bottom + 14;
      if (top + th > innerHeight - 12) top = Math.max(12, r.top - th - 14);
      let left = Math.min(Math.max(12, r.left), innerWidth - (tip.offsetWidth || 340) - 12);
      tip.style.top = top + 'px';
      tip.style.left = left + 'px';
    } else {
      ring.style.display = 'block';
      ring.style.top = '50%'; ring.style.left = '50%';
      ring.style.width = '0'; ring.style.height = '0';
      tip.style.top = Math.max(12, innerHeight / 2 - (tip.offsetHeight || 200) / 2) + 'px';
      tip.style.left = Math.max(12, innerWidth / 2 - (tip.offsetWidth || 340) / 2) + 'px';
    }
  }

  function show(i) {
    const all = steps();
    if (i < 0 || i >= all.length) return end();
    idx = i;
    const step = all[i];
    const needNav = HSV.state.view !== step.view || (step.id && HSV.state.id !== step.id);
    if (needNav) {
      HSV.go(HSV.href(step.view, step.id || null));
      setTimeout(() => place(step), 90);              // wait for the route to render
    } else {
      place(step);
    }
  }

  const TOUR = HSV.tour = {
    start() {
      if (!HSV.state.portal) return;
      active = true;
      try { localStorage.setItem('hsv-tour-done', '1'); } catch (e) {}
      show(0);
    },
    reposition() { if (active) place(steps()[idx]); },
    isActive: () => active,
  };

  function end() {
    active = false; idx = -1;
    if (ring) { ring.remove(); ring = null; }
    if (tip) { tip.remove(); tip = null; }
  }
  TOUR.end = end;

  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-tour]');
    if (!b) return;
    e.preventDefault();
    if (b.dataset.tour === 'next') show(idx + 1);
    else if (b.dataset.tour === 'back') show(idx - 1);
    else end();
  });
  document.addEventListener('keydown', (e) => {
    if (!active) return;
    if (e.key === 'Escape') end();
    if (e.key === 'ArrowRight') show(idx + 1);
    if (e.key === 'ArrowLeft') show(idx - 1);
  });
  window.addEventListener('resize', () => TOUR.reposition());

  HSV.actions = HSV.actions || {};
  HSV.actions['start-tour'] = () => TOUR.start();

  // keep the spotlight in place after any re-render the tour caused
  HSV.onRender.push(() => { if (active) setTimeout(() => TOUR.reposition(), 60); });
})();
