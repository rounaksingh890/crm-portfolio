/* ============================================================================
   APP — top nav, menus, global search, mobile navigation, render loop, boot.
   ========================================================================== */
(function () {
  'use strict';
  const HSV = window.HSV, UI = HSV.ui, esc = HSV.esc;
  const root = document.getElementById('root');

  /* ------------------------------------------------------------- nav model */
  function menus() {
    const t = HSV.D().terms;
    return {
      crm: { label: 'CRM', items: [
        { icon: 'user', label: 'Contacts', view: 'contacts' },
        { icon: 'building', label: 'Companies', view: 'companies' },
        { icon: 'deal', label: t.deals, view: 'deals' },
        { icon: 'list', label: 'Lists', view: 'lists' },
        { icon: 'clock', label: 'Activity feed', view: 'activity' },
        { icon: 'task', label: 'Tasks', view: 'tasks', sub: HSV.openTasks().length + ' to do' },
        { icon: 'calendar', label: 'Meetings', view: 'meetings' },
      ] },
      conv: { label: 'Conversations', items: [
        { icon: 'inbox', label: 'Inbox', view: 'inbox', sub: HSV.unreadConvs().length + ' unread' },
        { icon: 'ticket', label: 'Help desk', view: 'tickets', sub: HSV.openTickets().length + ' open' },
      ] },
      mkt: { label: 'Marketing', items: [
        { icon: 'send', label: 'Emails & campaigns', view: 'campaigns' },
        { icon: 'doc', label: 'Forms', view: 'forms' },
        { icon: 'bolt', label: 'Automations', view: 'workflows' },
      ] },
      settings: { label: 'Settings', items: [
        { icon: 'pencil', label: 'Custom fields', view: 'properties' },
        { icon: 'deal', label: 'Pipeline & stages', view: 'pipeline' },
        { icon: 'grid', label: 'Connected apps', view: 'integrations' },
        { icon: 'users', label: 'Users & teams', view: 'users' },
        { icon: 'help', label: 'About this sample', view: 'about' },
      ] },
    };
  }

  const GROUP_OF = {
    contacts: 'crm', contact: 'crm', companies: 'crm', company: 'crm',
    deals: 'crm', deal: 'crm', tasks: 'crm', meetings: 'crm', lists: 'crm', activity: 'crm',
    inbox: 'conv', tickets: 'conv', ticket: 'conv',
    campaigns: 'mkt', campaign: 'mkt', forms: 'mkt', form: 'mkt',
    workflows: 'mkt', workflow: 'mkt', builder: 'mkt',
    reports: 'reports', report: 'reports',
    properties: 'settings', integrations: 'settings', users: 'settings', pipeline: 'settings', about: 'settings',
  };

  /* ------------------------------------------------------------- shell HTML */
  function topnav() {
    const D = HSV.D(), m = menus();
    const g = GROUP_OF[HSV.state.view] || 'dashboard';
    const item = (key) => `<button class="tn-item ${g === key ? 'active' : ''}"
      data-menu="${key}" aria-expanded="false" aria-haspopup="true">${esc(m[key].label)} ${UI.icon('chev', 'chev')}</button>`;

    return `<nav class="topnav">
      <button class="tn-ib tn-burger" data-action="open-sheet" aria-label="Menu">${UI.icon('menu')}</button>
      <a class="tn-logo" href="#/" title="Back to all four industries">${UI.icon('logo')}<span>${esc(D.brand)}</span></a>
      <div class="tn-menu">
        <a class="tn-item ${g === 'dashboard' ? 'active' : ''}" href="${HSV.href('dashboard')}">Dashboard</a>
        ${item('crm')}${item('conv')}${item('mkt')}
        <a class="tn-item ${g === 'reports' ? 'active' : ''}" href="${HSV.href('reports')}">Reports</a>
      </div>
      <div class="tn-right">
        <button class="tn-search-btn" data-action="open-search">${UI.icon('search')}<span>Search ${esc(D.brand)}…</span><kbd>/</kbd></button>
        <button class="tn-ib" data-action="start-tour" title="Take the guided tour" aria-label="Take the guided tour">${UI.icon('help')}</button>
        <button class="tn-ib" data-menu="notifs" title="Notifications" aria-label="Notifications">${UI.icon('bell')}
          ${notifItems().length && !HSV.ov().notifRead ? `<span class="tn-badge">${notifItems().length}</span>` : ''}</button>
        <button class="tn-ib ${g === 'settings' ? 'active' : ''}" data-menu="settings" title="Settings" aria-label="Settings">${UI.icon('gear')}</button>
        <button class="tn-ib" data-menu="portal" title="Switch industry" aria-label="Switch industry">${UI.icon('grid')}</button>
        <button class="tn-me" data-menu="me" aria-label="Account menu">${UI.avatar(HSV.D().owners[0].name, HSV.D().owners[0].color, 'av-sm')}<span class="tn-me-name">${esc(HSV.D().owners[0].name.split(' ')[0])}</span>${UI.icon('chev', 'chev')}</button>
      </div>
    </nav>
    ${(function () { try { if (sessionStorage.getItem('hsv-note')) return ''; } catch (e) {}
      return `<div class="sample-note">${UI.icon('help')} Sample portal with fictional data —
        <a href="${HSV.href('about')}">about this demo</a>
        · <a href="../index.html">↑ all three CRM samples</a>
        <button class="sn-x" data-action="note-dismiss" aria-label="Hide this note" title="Hide">${UI.icon('x')}</button></div>`; })()}`;
  }

  /* floating help beacon, HubSpot-style, on every portal screen */
  function beacon() {
    return `<button class="beacon" data-action="help-open" aria-label="Help and tour" title="Help & tour">?</button>`;
  }

  function bottomnav() {
    const t = HSV.D().terms, v = HSV.state.view;
    const on = (views) => views.indexOf(v) >= 0 ? 'on' : '';
    return `<nav class="bottomnav">
      <button class="bn-item ${on(['dashboard'])}" data-href="${HSV.href('dashboard')}">${UI.icon('home')}Home</button>
      <button class="bn-item ${on(['contacts', 'contact'])}" data-href="${HSV.href('contacts')}">${UI.icon('users')}Contacts</button>
      <button class="bn-item ${on(['deals', 'deal'])}" data-href="${HSV.href('deals')}">${UI.icon('deal')}${esc(t.deals)}</button>
      <button class="bn-item ${on(['inbox'])}" data-href="${HSV.href('inbox')}">${UI.icon('inbox')}Inbox</button>
      <button class="bn-item" data-action="open-sheet">${UI.icon('menu')}More</button>
    </nav>`;
  }

  /* ------------------------------------------------------------- notifications
     Derived live from the records, so they're always true: unread messages,
     tickets waiting on us, overdue tasks, and deals closing this week. */
  function notifItems() {
    const D = HSV.D(), t = D.terms;
    const items = [];
    HSV.unreadConvs().forEach(v => items.push({
      icon: 'chat', tone: 'blue', href: HSV.href('inbox', v.id),
      main: 'New message from ' + HSV.cName(HSV.contact(v.contactId)), sub: v.subject }));
    D.tickets.filter(x => HSV.ticketStatus(x) === 'Waiting on us' && x.priority === 'High').forEach(x =>
      items.push({ icon: 'ticket', tone: 'red', href: HSV.href('ticket', x.id),
        main: 'High-priority ticket needs a reply', sub: x.subject }));
    HSV.overdueTasks().forEach(k => items.push({
      icon: 'task', tone: 'yellow', href: HSV.href('tasks'),
      main: 'Task overdue: ' + k.title, sub: 'was due ' + HSV.rel(k.due) }));
    HSV.dealsOpen().filter(d => { const n = HSV.daysFromToday(d.close); return n >= 0 && n <= 7; })
      .forEach(d => items.push({ icon: 'deal', tone: 'green', href: HSV.href('deal', d.id),
        main: t.deal + ' closes ' + HSV.rel(d.close), sub: d.name }));
    return items;
  }
  const NI_TONE = { blue: 'chan-Chat', red: 'chan-Email', yellow: 'ws-delay', green: 'chan-WhatsApp' };
  function notifPanel() {
    const items = notifItems();
    const list = items.map(n => `<a class="notif-item" href="${n.href}">
      <span class="ni-ic ${NI_TONE[n.tone]}">${UI.icon(n.icon)}</span>
      <span class="grow"><span class="b">${esc(n.main)}</span><small>${esc(n.sub)}</small></span></a>`).join('');
    return `<div class="notif-head">${UI.icon('bell')}<span class="b">Notifications</span>
        <button class="btn btn-ghost btn-sm" data-action="notifs-read">Mark all read</button></div>
      <div class="notif-list slim-scroll">${list ||
        '<div class="notif-empty">All clear — nothing needs you right now.</div>'}</div>`;
  }

  /* ------------------------------------------------------------- dropdown menus */
  let openPop = null;
  function closeMenus() {
    if (openPop) { openPop.remove(); openPop = null; }
    document.querySelectorAll('.tn-item[aria-expanded="true"]').forEach(b => b.setAttribute('aria-expanded', 'false'));
  }

  function popItemsFor(key) {
    if (key === 'notifs') return notifPanel();
    if (key === 'me') {
      const me = HSV.D().owners[0];
      return `<div class="pop-label">${esc(HSV.D().brand)} · sample account</div>
        <a class="pop-item" href="${HSV.href('contacts', null, { owner: me.id })}">
          ${UI.avatar(me.name, me.color, 'av-sm')}<span class="grow">${esc(me.name)}<span class="small muted" style="display:block">${esc(me.role)}</span></span></a>
        <div class="pop-sep"></div>
        <a class="pop-item" href="${HSV.href('users')}">${UI.icon('users')} Users &amp; teams</a>
        <a class="pop-item" href="${HSV.href('about')}">${UI.icon('help')} About this sample</a>
        <div class="pop-sep"></div>
        <a class="pop-item" href="#/">${UI.icon('grid')} All four industries</a>
        <a class="pop-item" href="../index.html">${UI.icon('back')} Portfolio hub</a>`;
    }
    if (key === 'portal') {
      const cur = HSV.state.portal;
      return `<div class="pop-label">Switch industry</div>` +
        HSV.verticals.map(k => {
          const d = HSV.dataOf(k);
          return `<a class="pop-item ${k === cur ? 'on' : ''}" href="#/${k}/dashboard">
            <span class="av av-sm" style="background:${d.accent}">${esc(d.brand[0])}</span>
            <span class="grow">${esc(d.brand)}<span class="small muted" style="display:block">${esc(d.industryLabel)}</span></span>
            ${k === cur ? UI.icon('check') : ''}</a>`;
        }).join('') +
        `<div class="pop-sep"></div>
         <a class="pop-item" href="#/">${UI.icon('grid')} All four industries</a>`;
    }
    const m = menus()[key];
    return m.items.map(it => `<a class="pop-item" href="${HSV.href(it.view)}">
      ${UI.icon(it.icon)}<span class="grow">${esc(it.label)}</span>${it.sub ? `<small>${esc(it.sub)}</small>` : ''}</a>`).join('');
  }

  function toggleMenu(btn) {
    const key = btn.dataset.menu;
    const wasOpen = openPop && openPop.dataset.key === key;
    closeMenus();
    if (wasOpen) return;
    const pop = document.createElement('div');
    pop.className = 'pop' + (key === 'notifs' ? ' notif-pop' : '');
    pop.dataset.key = key;
    pop.style.position = 'fixed';
    pop.style.top = '50px';
    pop.innerHTML = popItemsFor(key);
    document.body.appendChild(pop);
    const r = btn.getBoundingClientRect();
    const w = pop.offsetWidth;
    pop.style.left = Math.max(8, Math.min(r.left, innerWidth - w - 8)) + 'px';
    btn.setAttribute('aria-expanded', 'true');
    openPop = pop;
  }

  /* ------------------------------------------------------------- mobile sheet */
  let sheetEl = null;
  function closeSheet() {
    if (sheetEl) { sheetEl.backdrop.remove(); sheetEl.panel.remove(); sheetEl = null; }
  }
  function openSheet() {
    closeSheet();
    const D = HSV.D(), m = menus();
    const link = (it) => `<a class="pop-item" href="${HSV.href(it.view)}">
      ${UI.icon(it.icon)}<span class="grow">${esc(it.label)}</span>${it.sub ? `<small>${esc(it.sub)}</small>` : ''}</a>`;

    const backdrop = document.createElement('div');
    backdrop.className = 'sheet-backdrop';
    backdrop.dataset.action = 'close-sheet';
    const panel = document.createElement('div');
    panel.className = 'sheet slim-scroll';
    panel.innerHTML = `
      <div class="sh-head">${UI.icon('logo')}<span class="b">${esc(D.brand)}</span>
        <button class="tn-ib" data-action="close-sheet" aria-label="Close menu">${UI.icon('x')}</button></div>
      <a class="pop-item" href="${HSV.href('dashboard')}">${UI.icon('home')}<span class="grow">Dashboard</span></a>
      <div class="pop-label">CRM</div>${m.crm.items.map(link).join('')}
      <div class="pop-label">Conversations</div>${m.conv.items.map(link).join('')}
      <div class="pop-label">Marketing</div>${m.mkt.items.map(link).join('')}
      <div class="pop-label">Reports</div>
      <a class="pop-item" href="${HSV.href('reports')}">${UI.icon('chart')}<span class="grow">Reports</span></a>
      <div class="pop-label">Settings</div>${m.settings.items.map(link).join('')}
      <div class="pop-sep"></div>
      <button class="pop-item" data-action="start-tour">${UI.icon('help')}<span class="grow">Take the guided tour</span></button>
      <div class="pop-label">Switch industry</div>
      ${HSV.verticals.map(k => { const d = HSV.dataOf(k); return `
        <a class="pop-item" href="#/${k}/dashboard">
          <span class="av av-sm" style="background:${d.accent}">${esc(d.brand[0])}</span>
          <span class="grow">${esc(d.brand)}</span>${k === HSV.state.portal ? UI.icon('check') : ''}</a>`; }).join('')}
      <a class="pop-item" href="#/">${UI.icon('grid')}<span class="grow">All four industries</span></a>`;
    document.body.appendChild(backdrop);
    document.body.appendChild(panel);
    sheetEl = { backdrop, panel };
  }

  /* ------------------------------------------------------------- global search */
  let searchEl = null;
  function closeSearch() {
    if (searchEl) { searchEl.remove(); searchEl = null; }
  }
  function openSearch() {
    if (!HSV.state.portal) return;
    closeSearch();
    const ov = document.createElement('div');
    ov.className = 'overlay';
    ov.innerHTML = `<div class="so-panel">
      <div class="so-input-row">${UI.icon('search')}
        <input class="so-input" placeholder="Search people, companies, ${esc(HSV.D().terms.deals.toLowerCase())}, tickets…" aria-label="Search">
        <button class="tn-ib" data-action="close-search" style="color:var(--ink-2)" aria-label="Close search">${UI.icon('x')}</button></div>
      <div class="so-results slim-scroll"></div>
      <div class="so-hint"><span><kbd>Enter</kbd> opens the top result</span><span><kbd>Esc</kbd> closes</span></div>
    </div>`;
    ov.addEventListener('mousedown', (e) => { if (e.target === ov) closeSearch(); });
    document.body.appendChild(ov);
    searchEl = ov;
    const input = ov.querySelector('.so-input');
    input.focus();
    renderSearchResults('');
    input.addEventListener('input', () => renderSearchResults(input.value));
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const first = ov.querySelector('.so-item');
        if (first) { HSV.go(first.dataset.href); closeSearch(); }
      }
    });
  }
  function renderSearchResults(q) {
    if (!searchEl) return;
    const box = searchEl.querySelector('.so-results');
    const groups = HSV.search(q);
    if (!q.trim() || q.trim().length < 2) {
      box.innerHTML = `<div class="empty" style="padding:26px">${UI.icon('search')}
        <b>Search the whole portal</b>Names, emails, companies, tickets, campaigns, automations…</div>`;
      return;
    }
    if (!groups.length) {
      box.innerHTML = UI.empty('search', 'No matches for “' + esc(q) + '”', 'Try a name like “' + esc(HSV.D().contacts[0].first) + '”.');
      return;
    }
    box.innerHTML = groups.map(g => `<div class="so-group">${esc(g.name)}</div>` +
      g.items.map(it => `<button class="so-item" data-href="${it.href}">
        ${UI.icon(it.icon)}<span class="grow"><span class="b clip">${esc(it.label)}</span>
        <small class="clip" style="display:block">${esc(it.sub || '')}</small></span>
        <span class="end">${esc(it.end || '')}</span></button>`).join('')).join('');
  }

  /* ------------------------------------------------------------- render loop */
  let lastKey = null;
  HSV.render = function () {
    const r = HSV.parseHash();
    const key = [r.portal, r.view, r.id].join('|');
    const sameDoc = key === lastKey;
    const scrollY = window.scrollY;

    // remember what the user was typing in (list filters re-render on input)
    const ae = document.activeElement;
    const qkey = ae && ae.dataset ? ae.dataset.qkey : null;

    closeMenus(); if (!sameDoc) { closeSearch(); closeSheet(); }
    Object.assign(HSV.state, { portal: r.portal, view: r.view, id: r.id, q: r.q });

    if (!r.portal) {
      document.documentElement.style.setProperty('--accent', '#ff7a59');
      document.title = 'CRM Showcase — four industries, one HubSpot-style build';
      root.innerHTML = HSV.views.landing();
    } else {
      const D = HSV.D();
      document.documentElement.style.setProperty('--accent', D.accent);
      const fn = HSV.views[r.view] || HSV.views.dashboard;
      document.title = D.brand + ' · ' + (r.view.charAt(0).toUpperCase() + r.view.slice(1));
      root.innerHTML = topnav() + '<main id="view">' + fn() + '</main>' + bottomnav() + beacon();
    }

    if (sameDoc) window.scrollTo(0, scrollY);
    else window.scrollTo(0, 0);

    if (qkey) {
      const el = root.querySelector('[data-qkey="' + qkey + '"]');
      if (el) { el.focus(); if (el.setSelectionRange && /text|search/.test(el.type)) el.setSelectionRange(el.value.length, el.value.length); }
    }
    lastKey = key;
    HSV.onRender.forEach(fn => { try { fn(); } catch (e) { /* keep rendering */ } });
  };

  /* ------------------------------------------------------------- shell actions */
  HSV.actions = HSV.actions || {};
  HSV.actions['open-search'] = openSearch;
  HSV.actions['close-search'] = closeSearch;
  HSV.actions['open-sheet'] = openSheet;
  HSV.actions['close-sheet'] = closeSheet;
  HSV.actions['close-modal'] = () => UI.closeModal();
  HSV.actions['notifs-read'] = function () {
    HSV.ov().notifRead = true;
    closeMenus();
    HSV.render();
    UI.toast('Notifications marked as read');
  };
  HSV.actions['note-dismiss'] = function () {
    try { sessionStorage.setItem('hsv-note', '1'); } catch (e) {}
    const n = document.querySelector('.sample-note');
    if (n) n.remove();
  };
  HSV.actions['welcome-tour'] = function () { UI.closeModal(); HSV.tour.start(); };
  HSV.actions['help-go'] = function (el) { UI.closeModal(); HSV.go(el.dataset.href); };
  HSV.actions['help-open'] = function () {
    const D = HSV.D(), t = D.terms;
    UI.modal('Need a hand?', `
      <button class="help-row" data-action="welcome-tour">
        <span class="ni-ic chan-Email">${UI.icon('help')}</span>
        <span class="grow"><b>Take the 60-second tour</b><small>The fastest way to see how everything fits together.</small></span></button>
      <button class="help-row" data-action="help-go" data-href="${HSV.href('about')}">
        <span class="ni-ic chan-Chat">${UI.icon('doc')}</span>
        <span class="grow"><b>About this sample</b><small>What's real, what's fictional, and why it exists.</small></span></button>
      <div class="pop-label" style="padding-left:0">Things people love to try</div>
      <ul class="help-tips">
        <li>Drag a card on the <b>${esc(t.deals)}</b> board to a new stage — every total follows.</li>
        <li>Hit <b>Create contact</b> on Contacts — the dashboard counts it instantly.</li>
        <li>Open the <b>bell</b> up top — those notifications are computed from the records.</li>
        <li>Reply inside a <b>ticket</b> or the <b>inbox</b> — your message joins the thread.</li>
        <li>Press <kbd>/</kbd> anywhere to search the whole portal.</li>
      </ul>`,
      `<button class="btn" data-action="close-modal">Close</button>`);
  };

  /* ------------------------------------------------------------- event wiring */
  document.addEventListener('click', function (e) {
    if (e.target.closest('[data-tour]')) return;           // the tour handles its own buttons
    const a = e.target.closest('a[href]');
    if (a) {                                               // let normal links work; close chrome
      if (openPop && openPop.contains(a)) closeMenus();
      if (sheetEl && sheetEl.panel.contains(a)) closeSheet();
      if (searchEl && searchEl.contains(a)) closeSearch();
      return;
    }
    const act = e.target.closest('[data-action]');
    if (act) {
      const fn = HSV.actions[act.dataset.action];
      if (fn) { e.preventDefault(); fn(act, e); }
      return;
    }
    const men = e.target.closest('[data-menu]');
    if (men) { toggleMenu(men); return; }
    const go = e.target.closest('[data-href]');
    if (go) {
      const h = go.dataset.href;
      if (searchEl && searchEl.contains(go)) closeSearch();
      if (sheetEl && sheetEl.panel.contains(go)) closeSheet();
      HSV.go(h);
      return;
    }
    if (openPop && !e.target.closest('.pop')) closeMenus();
  });

  document.addEventListener('change', function (e) {
    const el = e.target;
    if (el.matches('select[data-qkey]')) {
      const patch = {}; patch[el.dataset.qkey] = el.value;
      HSV.setQuery(patch); HSV.render();
    } else if (el.matches('[data-action-change]')) {
      const fn = HSV.actions[el.dataset.actionChange];
      if (fn) fn(el, e);
    }
  });

  document.addEventListener('input', function (e) {
    const el = e.target;
    if (el.matches('input[data-qkey]')) {
      const patch = {}; patch[el.dataset.qkey] = el.value;
      HSV.setQuery(patch); HSV.render();
    }
  });

  document.addEventListener('keydown', function (e) {
    const typing = /INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName);
    if (e.key === 'Escape') { closeSearch(); closeSheet(); closeMenus(); return; }
    if (!typing && (e.key === '/' || (e.key.toLowerCase() === 'k' && (e.ctrlKey || e.metaKey)))) {
      e.preventDefault(); openSearch(); return;
    }
    if ((e.key === 'Enter' || e.key === ' ') && document.activeElement.matches && document.activeElement.matches('[data-href][tabindex]')) {
      e.preventDefault(); HSV.go(document.activeElement.dataset.href);
    }
  });

  window.addEventListener('hashchange', HSV.render);

  /* ------------------------------------------------------------- boot */
  HSV.render();

  // first visit to a portal: a proper welcome with the tour one click away
  function welcome() {
    const D = HSV.D();
    UI.modal('Welcome to ' + D.brand, `
      <p style="font-size:13.5px;color:var(--ink-2);line-height:1.6">You're looking at a
        <b style="color:var(--ink)">fully configured sample CRM</b> for a fictional
        ${esc(D.industryLabel.toLowerCase())} business. Every person and number is made up —
        and every screen is real and clickable.</p>
      <ul class="help-tips">
        <li><b>Everything reconciles.</b> Create a contact or drag a ${esc(D.terms.deal.toLowerCase())} — every count follows.</li>
        <li><b>Nothing breaks.</b> It resets when you refresh, so click with abandon.</li>
        <li><b>Lost?</b> The orange <b>?</b> bubble (bottom right) is always there.</li>
      </ul>`,
      `<button class="btn" data-action="close-modal">Explore on my own</button>
       <button class="btn btn-primary" data-action="welcome-tour">Take the 60-second tour</button>`);
  }
  try {
    if (HSV.state.portal && !sessionStorage.getItem('hsv-welcome')) {
      sessionStorage.setItem('hsv-welcome', '1');
      setTimeout(() => { if (!HSV.tour.isActive()) welcome(); }, 700);
    }
  } catch (err) { /* private mode — fine */ }
})();
