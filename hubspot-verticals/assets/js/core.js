/* ============================================================================
   CORE — state, hash router, formatting helpers and every derived number.
   All screens read through these helpers so the numbers always agree.
   ========================================================================== */
(function () {
  'use strict';

  const HSV = window.HSV = {
    TODAY: '2026-07-05',
    verticals: ['medical', 'saas', 'realestate', 'ecommerce'],
    state: { portal: null, view: null, id: null, q: {}, dealMode: 'board' },
    live: {},          // in-session edits, per portal (task ticks, stage moves, replies…)
    views: {},         // view name -> render function (filled by the view files)
    onRender: [],      // callbacks run after each render
  };

  /* ---- data access -------------------------------------------------------- */
  HSV.D = () => window.HSV_DATA[HSV.state.portal];
  HSV.dataOf = (k) => window.HSV_DATA[k];

  // Per-portal overlay for everything the visitor changes during the session.
  HSV.ov = function () {
    const p = HSV.state.portal;
    if (!HSV.live[p]) {
      HSV.live[p] = { taskDone: {}, dealStage: {}, ticketStatus: {}, wfOn: {},
                      intOn: {}, notes: {}, replies: {}, read: {} };
    }
    return HSV.live[p];
  };

  /* ---- tiny helpers -------------------------------------------------------- */
  HSV.esc = (s) => String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

  HSV.money = function (n, compact) {
    const cur = HSV.D() ? HSV.D().currency : '$';
    if (compact && Math.abs(n) >= 1000000) {
      return cur + (n / 1000000).toFixed(n >= 10000000 ? 1 : 2).replace(/0$/, '').replace(/\.$/, '') + 'M';
    }
    if (compact && Math.abs(n) >= 10000) {
      return cur + (n / 1000).toFixed(n >= 100000 ? 0 : 1).replace(/\.0$/, '') + 'k';
    }
    return cur + Math.round(n).toLocaleString('en-US');
  };

  HSV.dt = (iso) => new Date(String(iso).slice(0, 10) + 'T00:00:00');

  HSV.fmtDate = function (iso, withYear) {
    if (!iso || iso === '—') return '—';
    const d = HSV.dt(iso);
    const opt = { month: 'short', day: 'numeric' };
    if (withYear !== false) opt.year = 'numeric';
    return d.toLocaleDateString('en-US', opt);
  };

  HSV.fmtTime = function (iso) {           // '2026-07-02 09:14' -> 'Jul 2, 9:14am'
    const m = String(iso).match(/^(\d{4}-\d{2}-\d{2})[ T](\d{2}):(\d{2})/);
    if (!m) return HSV.fmtDate(iso, false);
    let h = +m[2]; const ap = h >= 12 ? 'pm' : 'am'; h = h % 12 || 12;
    return HSV.fmtDate(m[1], false) + ', ' + h + ':' + m[3] + ap;
  };

  HSV.daysFromToday = function (iso) {
    return Math.round((HSV.dt(iso) - HSV.dt(HSV.TODAY)) / 86400000);
  };

  HSV.rel = function (iso) {
    const d = HSV.daysFromToday(iso);
    if (d === 0) return 'Today';
    if (d === 1) return 'Tomorrow';
    if (d === -1) return 'Yesterday';
    if (d < 0 && d > -30) return (-d) + ' days ago';
    if (d > 0 && d < 30) return 'in ' + d + ' days';
    return HSV.fmtDate(iso, HSV.dt(iso).getFullYear() !== HSV.dt(HSV.TODAY).getFullYear());
  };

  HSV.initials = function (name) {
    return String(name).replace(/^Dr\.\s*/i, '').split(/\s+/)
      .map(w => w[0]).filter(Boolean).slice(0, 2).join('').toUpperCase();
  };

  HSV.hueColor = function (str) {          // stable pastel-strong color for company logos
    let h = 0;
    for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) % 360;
    return 'hsl(' + h + ', 45%, 46%)';
  };

  /* ---- record lookups -------------------------------------------------------- */
  const by = (list, id) => (list || []).find(x => x.id === id) || null;
  HSV.owner    = (id) => by(HSV.D().owners, id);
  HSV.contact  = (id) => by(HSV.D().contacts, id);
  HSV.company  = (id) => by(HSV.D().companies, id);
  HSV.deal     = (id) => by(HSV.D().deals, id);
  HSV.ticket   = (id) => by(HSV.D().tickets, id);
  HSV.campaign = (id) => by(HSV.D().campaigns, id);
  HSV.form     = (id) => by(HSV.D().forms, id);
  HSV.workflow = (id) => by(HSV.D().workflows, id);
  HSV.conv     = (id) => by(HSV.D().conversations, id);
  HSV.stage    = (id) => by(HSV.D().stages, id);

  HSV.cName = (c) => c ? (c.first + ' ' + c.last) : 'Unknown';

  /* ---- live-aware getters ------------------------------------------------------ */
  HSV.dealStageId  = (d) => HSV.ov().dealStage[d.id] || d.stage;
  HSV.ticketStatus = (t) => HSV.ov().ticketStatus[t.id] || t.status;
  HSV.taskDone     = (k) => (HSV.ov().taskDone[k.id] !== undefined ? HSV.ov().taskDone[k.id] : k.done);
  HSV.wfOn         = (w) => (HSV.ov().wfOn[w.id] !== undefined ? HSV.ov().wfOn[w.id] : w.status === 'On');
  HSV.intOn        = (name) => {
    const o = HSV.ov().intOn;
    if (o[name] !== undefined) return o[name];
    const i = HSV.D().integrations.find(x => x.name === name);
    return i ? i.connected : false;
  };
  HSV.convRead = (v) => HSV.ov().read[v.id] ? false : v.unread;
  HSV.convMsgs = (v) => v.msgs.concat(HSV.ov().replies[v.id] || []);
  HSV.contactTimeline = (c) => (HSV.ov().notes[c.id] || []).concat(c.timeline || []);

  /* ---- derived numbers (the single source every screen uses) ------------------- */
  HSV.wonStageId  = () => (HSV.D().stages.find(s => s.prob === 100) || {}).id;
  HSV.lostStageId = () => (HSV.D().stages.find(s => s.prob === 0) || {}).id;

  HSV.dealsOpen = () => HSV.D().deals.filter(d => {
    const s = HSV.dealStageId(d);
    return s !== HSV.wonStageId() && s !== HSV.lostStageId();
  });
  HSV.dealsWon  = () => HSV.D().deals.filter(d => HSV.dealStageId(d) === HSV.wonStageId());
  HSV.dealsLost = () => HSV.D().deals.filter(d => HSV.dealStageId(d) === HSV.lostStageId());

  HSV.sum = (deals) => deals.reduce((a, d) => a + d.amount, 0);
  HSV.pipelineOpen = () => HSV.sum(HSV.dealsOpen());
  HSV.pipelineWon  = () => HSV.sum(HSV.dealsWon());
  HSV.weighted = () => HSV.dealsOpen().reduce((a, d) =>
    a + d.amount * (HSV.stage(HSV.dealStageId(d)).prob / 100), 0);
  HSV.winRate = function () {
    const w = HSV.dealsWon().length, l = HSV.dealsLost().length;
    return (w + l) ? Math.round(100 * w / (w + l)) : 0;
  };

  HSV.openTickets  = () => HSV.D().tickets.filter(t => HSV.ticketStatus(t) !== 'Closed');
  HSV.openTasks    = () => HSV.D().tasks.filter(k => !HSV.taskDone(k));
  HSV.overdueTasks = () => HSV.openTasks().filter(k => HSV.daysFromToday(k.due) < 0);
  HSV.unreadConvs  = () => HSV.D().conversations.filter(v => HSV.convRead(v));
  HSV.upcomingMeetings = () => HSV.D().meetings
    .filter(m => HSV.daysFromToday(m.date) >= 0)
    .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));

  // Funnel: how many deals reached each stage (current stage or further along).
  HSV.funnelCounts = function () {
    const stages = HSV.D().stages.filter(s => s.prob > 0 || s.prob === 100);
    const order = stages.map(s => s.id);
    const pos = (d) => order.indexOf(HSV.dealStageId(d));
    return stages.map((s, i) => ({
      label: s.label,
      value: HSV.D().deals.filter(d => pos(d) >= i).length,
    }));
  };

  HSV.pipelineByOwner = () => HSV.D().owners.map(o => ({
    label: o.name, color: o.color, id: o.id,
    value: HSV.sum(HSV.dealsOpen().filter(d => d.owner === o.id)),
  })).filter(x => x.value > 0).sort((a, b) => b.value - a.value);

  HSV.ticketsByCategory = function () {
    const m = {};
    HSV.D().tickets.forEach(t => { m[t.category] = (m[t.category] || 0) + 1; });
    return Object.keys(m).map(k => ({ label: k, value: m[k] })).sort((a, b) => b.value - a.value);
  };

  HSV.contactDeals    = (cid) => HSV.D().deals.filter(d => d.contactId === cid);
  HSV.contactTickets  = (cid) => HSV.D().tickets.filter(t => t.contactId === cid);
  HSV.contactConvs    = (cid) => HSV.D().conversations.filter(v => v.contactId === cid);
  HSV.contactMeetings = (cid) => HSV.D().meetings.filter(m => m.contactId === cid);
  HSV.companyContacts = (coid) => HSV.D().contacts.filter(c => c.companyId === coid);
  HSV.companyDeals    = (coid) => HSV.D().deals.filter(d => d.companyId === coid);
  HSV.relatedTasks = (kind, id) => HSV.D().tasks.filter(k =>
    k.related && k.related.kind === kind && k.related.id === id);

  /* ---- routing -------------------------------------------------------------------
     #/                          landing
     #/medical                   -> #/medical/dashboard
     #/medical/contacts?q=ann    list view with filters in the query
     #/medical/contact/c1        record view                                        */
  HSV.parseHash = function () {
    const raw = (location.hash || '#/').replace(/^#\/?/, '');
    const qi = raw.indexOf('?');
    const path = (qi >= 0 ? raw.slice(0, qi) : raw).split('/').filter(Boolean);
    const q = {};
    if (qi >= 0) raw.slice(qi + 1).split('&').forEach(p => {
      const [k, v] = p.split('=');
      if (k) q[decodeURIComponent(k)] = decodeURIComponent(v || '');
    });
    if (!path.length || HSV.verticals.indexOf(path[0]) < 0) {
      return { portal: null, view: 'landing', id: null, q };
    }
    return { portal: path[0], view: path[1] || 'dashboard', id: path[2] || null, q };
  };

  HSV.href = function (view, id, q) {
    let h = '#/' + HSV.state.portal + '/' + view + (id ? '/' + id : '');
    const keys = q ? Object.keys(q).filter(k => q[k] !== '' && q[k] != null) : [];
    if (keys.length) h += '?' + keys.map(k => encodeURIComponent(k) + '=' + encodeURIComponent(q[k])).join('&');
    return h;
  };

  HSV.go = (h) => { location.hash = h; };

  // Update the query part of the current route without adding history entries.
  HSV.setQuery = function (patch) {
    const q = Object.assign({}, HSV.state.q, patch);
    Object.keys(q).forEach(k => { if (q[k] === '' || q[k] == null) delete q[k]; });
    const h = HSV.href(HSV.state.view, HSV.state.id, q);
    history.replaceState(null, '', h);
    HSV.state.q = q;
  };

  /* ---- global search ---------------------------------------------------------------- */
  HSV.search = function (query) {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];
    const D = HSV.D();
    const hit = (s) => String(s || '').toLowerCase().indexOf(q) >= 0;
    const groups = [];
    const push = (name, items) => { if (items.length) groups.push({ name, items: items.slice(0, 5) }); };

    push('Contacts', D.contacts.filter(c => hit(HSV.cName(c)) || hit(c.email) || hit(c.title))
      .map(c => ({ label: HSV.cName(c), sub: c.email, end: c.lifecycle, href: HSV.href('contact', c.id), icon: 'user' })));
    push('Companies', D.companies.filter(co => hit(co.name) || hit(co.industry) || hit(co.city))
      .map(co => ({ label: co.name, sub: co.industry, end: co.city, href: HSV.href('company', co.id), icon: 'building' })));
    push(D.terms.deals, D.deals.filter(d => hit(d.name))
      .map(d => ({ label: d.name, sub: HSV.stage(HSV.dealStageId(d)).label, end: HSV.money(d.amount), href: HSV.href('deal', d.id), icon: 'deal' })));
    push('Help desk', D.tickets.filter(t => hit(t.subject) || hit(t.category))
      .map(t => ({ label: t.subject, sub: t.category, end: HSV.ticketStatus(t), href: HSV.href('ticket', t.id), icon: 'ticket' })));
    push('Emails & campaigns', D.campaigns.filter(g => hit(g.name) || hit(g.subject))
      .map(g => ({ label: g.name, sub: g.subject, end: g.status, href: HSV.href('campaign', g.id), icon: 'send' })));
    push('Automations', D.workflows.filter(w => hit(w.name) || hit(w.trigger))
      .map(w => ({ label: w.name, sub: w.trigger, end: HSV.wfOn(w) ? 'On' : 'Off', href: HSV.href('workflow', w.id), icon: 'bolt' })));
    return groups;
  };

  /* ---- CSV export --------------------------------------------------------------------- */
  HSV.downloadCsv = function (filename, header, rows) {
    const cell = (v) => {
      v = String(v == null ? '' : v);
      return /[",\n]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v;
    };
    const csv = [header].concat(rows).map(r => r.map(cell).join(',')).join('\r\n');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8' }));
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 300);
  };
})();
