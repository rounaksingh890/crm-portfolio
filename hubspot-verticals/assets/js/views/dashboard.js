/* ============================================================================
   DASHBOARD — the portal home. Every number is derived at render time.
   ========================================================================== */
(function () {
  'use strict';
  const HSV = window.HSV, UI = HSV.ui, esc = HSV.esc;

  HSV.views.dashboard = function () {
    const D = HSV.D();
    const t = D.terms;
    const today = HSV.dt(HSV.TODAY).toLocaleDateString('en-US',
      { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });

    /* ---- KPI row ---- */
    const overdue = HSV.overdueTasks().length;
    const kpis = [
      { label: 'Open ' + t.deals.toLowerCase(), value: HSV.money(HSV.pipelineOpen(), true),
        sub: HSV.dealsOpen().length + ' in progress', href: HSV.href('deals') },
      { label: 'Won so far', value: HSV.money(HSV.pipelineWon(), true),
        sub: HSV.dealsWon().length + ' ' + t.deals.toLowerCase() + ' · ' + HSV.winRate() + '% win rate', href: HSV.href('deals', null, { mode: 'table' }) },
      { label: 'Contacts', value: D.contacts.length,
        sub: D.companies.length + ' companies', href: HSV.href('contacts') },
      { label: 'Open tickets', value: HSV.openTickets().length,
        sub: 'of ' + D.tickets.length + ' total', href: HSV.href('tickets') },
      { label: 'Tasks to do', value: HSV.openTasks().length,
        sub: overdue ? overdue + ' overdue' : 'none overdue', href: HSV.href('tasks') },
      { label: 'Unread messages', value: HSV.unreadConvs().length,
        sub: D.conversations.length + ' conversations', href: HSV.href('inbox') },
    ].map(UI.kpi).join('');

    /* ---- charts ---- */
    const M = D.monthly;
    const revenue = `<section class="card chart-card">
      <div class="cc-head"><h3>Money coming in</h3><span class="cc-sub">accepted ${esc(t.deals.toLowerCase())}, last 6 months</span>
        <a href="${HSV.href('report', 'r1')}">See report</a></div>
      <div class="chart-scroll slim-scroll">${HSV.charts.line(M.labels, M.revenue, { money: true })}</div>
    </section>`;

    const donut = `<section class="card chart-card">
      <div class="cc-head"><h3>Where people find us</h3><span class="cc-sub">by original source</span>
        <a href="${HSV.href('report', 'r3')}">See report</a></div>
      ${HSV.charts.donut(D.sourceBreakdown, {
        centre: D.sourceBreakdown.reduce((a, x) => a + x.value, 0) + '%',
        centreLabel: 'of contacts',
        legendHref: (it) => HSV.href('contacts', null, { source: it.label }),
      })}
    </section>`;

    const funnel = `<section class="card chart-card">
      <div class="cc-head"><h3>${esc(t.pipelineName)}</h3><span class="cc-sub">how far ${esc(t.deals.toLowerCase())} get</span>
        <a href="${HSV.href('report', 'r4')}">See report</a></div>
      ${HSV.charts.hbars(HSV.funnelCounts(), { href: () => HSV.href('deals') })}
    </section>`;

    const byOwner = `<section class="card chart-card">
      <div class="cc-head"><h3>Open value by team member</h3><span class="cc-sub">who's working what</span>
        <a href="${HSV.href('report', 'r5')}">See report</a></div>
      ${HSV.charts.hbars(HSV.pipelineByOwner(), { money: true, href: (it) => HSV.href('deals', null, { owner: it.id }) })}
    </section>`;

    /* ---- three lists ---- */
    const tasks = HSV.openTasks()
      .sort((a, b) => a.due.localeCompare(b.due)).slice(0, 5)
      .map(k => {
        const late = HSV.daysFromToday(k.due) < 0;
        return `<button class="li-row" data-action="toggle-task" data-id="${k.id}" title="Tick it off">
          <span class="chk" aria-hidden="true">${UI.icon('check')}</span>
          <span class="grow"><span class="b clip">${esc(k.title)}</span>
          <small>${esc(k.type)} · ${HSV.owner(k.owner).name.split(' ')[0]}</small></span>
          <span class="end"><span class="pill ${late ? 't-red' : 't-gray'}">${esc(HSV.rel(k.due))}</span></span>
        </button>`;
      }).join('') || UI.empty('check', 'All caught up', 'Every task is ticked off.');

    const meetings = HSV.upcomingMeetings().slice(0, 5).map(m => {
      const c = HSV.contact(m.contactId);
      return `<a class="li-row" href="${HSV.href('meetings')}">
        <span class="meet-time" style="width:52px;font-size:12px">${esc(m.time)}</span>
        <span class="grow"><span class="b clip">${esc(m.title)}</span>
        <small>${esc(HSV.rel(m.date))}${c ? ' · ' + esc(HSV.cName(c)) : ''}</small></span>
      </a>`;
    }).join('') || UI.empty('calendar', 'Nothing booked', 'The calendar ahead is clear.');

    const convs = D.conversations.slice().sort((a, b) => b.at.localeCompare(a.at)).slice(0, 5)
      .map(v => {
        const c = HSV.contact(v.contactId);
        return `<a class="li-row" href="${HSV.href('inbox', v.id)}">
          ${UI.chanIc(v.channel)}
          <span class="grow"><span class="b clip">${esc(v.subject)}</span>
          <small>${esc(HSV.cName(c))} · ${esc(HSV.fmtTime(v.at))}</small></span>
          ${HSV.convRead(v) ? '<span class="u-dot" style="width:8px;height:8px;border-radius:50%;background:var(--orange);flex:none"></span>' : ''}
        </a>`;
      }).join('');

    return `<div class="page view-in">
      ${UI.pageHead(esc(D.brand) + ' — your day at a glance',
        esc(today) + ' · everything below is calculated live from the sample records',
        `<button class="btn" data-action="start-tour">${UI.icon('help')} Take the tour</button>
         <a class="btn btn-primary" href="${HSV.href('reports')}">${UI.icon('chart')} Reports</a>`)}
      <div class="kpis">${kpis}</div>
      <div class="grid-2">${revenue}${donut}</div>
      <div class="grid-2 mt">${funnel}${byOwner}</div>
      <div class="grid-3 mt">
        <section class="card list-card"><h3>${UI.icon('task')} Tasks due <a href="${HSV.href('tasks')}">All tasks</a></h3>${tasks}</section>
        <section class="card list-card"><h3>${UI.icon('calendar')} Coming up <a href="${HSV.href('meetings')}">All meetings</a></h3>${meetings}</section>
        <section class="card list-card"><h3>${UI.icon('inbox')} Latest messages <a href="${HSV.href('inbox')}">Open inbox</a></h3>${convs}</section>
      </div>
    </div>`;
  };
})();
