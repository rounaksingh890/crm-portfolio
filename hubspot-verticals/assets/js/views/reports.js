/* ============================================================================
   REPORTS — the library of charts, each backed by a table of the same numbers.
   ========================================================================== */
(function () {
  'use strict';
  const HSV = window.HSV, UI = HSV.ui, esc = HSV.esc;

  /* Everything about each report in one place: how to draw it, and the
     table of numbers behind it (so the chart is never "just a picture"). */
  function reportSpec(r) {
    const D = HSV.D(), M = D.monthly;
    switch (r.type) {
      case 'line': return {
        chart: () => HSV.charts.line(M.labels, M.revenue, { money: true }),
        head: ['Month', 'Money in'],
        rows: M.labels.map((l, i) => [l, HSV.money(M.revenue[i])]),
        link: HSV.href('deals'), linkLabel: 'See the ' + D.terms.deals.toLowerCase() + ' behind it',
      };
      case 'bar': return {
        chart: () => HSV.charts.bars(M.labels, M.newContacts),
        head: ['Month', 'New contacts'],
        rows: M.labels.map((l, i) => [l, M.newContacts[i]]),
        link: HSV.href('contacts'), linkLabel: 'See the contacts',
      };
      case 'donut': return {
        chart: () => HSV.charts.donut(D.sourceBreakdown, {
          centre: '100%', centreLabel: 'of contacts',
          legendHref: (it) => HSV.href('contacts', null, { source: it.label }),
        }),
        head: ['Source', 'Share'],
        rows: D.sourceBreakdown.map(s => [s.label, s.value + '%']),
        link: HSV.href('contacts'), linkLabel: 'Filter contacts by source',
      };
      case 'funnel': return {
        chart: () => HSV.charts.hbars(HSV.funnelCounts()),
        head: ['Stage', 'Got this far'],
        rows: HSV.funnelCounts().map(f => [f.label, f.value]),
        link: HSV.href('deals'), linkLabel: 'Open the board',
      };
      case 'ownerbar': return {
        chart: () => HSV.charts.hbars(HSV.pipelineByOwner(), { money: true, href: (it) => HSV.href('deals', null, { owner: it.id }) }),
        head: ['Team member', 'Open value'],
        rows: HSV.pipelineByOwner().map(o => [o.label, HSV.money(o.value)]),
        link: HSV.href('deals'), linkLabel: 'Open the board',
      };
      default: return {   // 'catbar'
        chart: () => HSV.charts.hbars(HSV.ticketsByCategory(), { href: () => HSV.href('tickets') }),
        head: ['Category', 'Tickets'],
        rows: HSV.ticketsByCategory().map(c => [c.label, c.value]),
        link: HSV.href('tickets'), linkLabel: 'Open the help desk',
      };
    }
  }

  HSV.views.reports = function () {
    const D = HSV.D(), M = D.monthly;
    const cards = D.reports.map(r => {
      const spec = reportSpec(r);
      return `<div class="card rep-card" data-href="${HSV.href('report', r.id)}" tabindex="0">
        <h3>${esc(r.name)} ${r.custom ? UI.pill('built this session', 't-orange') : ''}</h3>
        <p class="desc">${esc(r.desc)}</p>
        <div class="chart-scroll slim-scroll">${spec.chart()}</div>
      </div>`;
    }).join('');

    const extra = `
      <div class="card chart-card"><div class="cc-head"><h3>Wins per month</h3>
        <a href="${HSV.href('deals', null, { mode: 'table' })}">See them</a></div>
        <div class="chart-scroll slim-scroll">${HSV.charts.bars(M.labels, M.won)}</div></div>
      <div class="card chart-card"><div class="cc-head"><h3>Tickets closed per month</h3>
        <a href="${HSV.href('tickets')}">Open help desk</a></div>
        <div class="chart-scroll slim-scroll">${HSV.charts.bars(M.labels, M.ticketsClosed, { color: '#00bda5' })}</div></div>
      <div class="card chart-card"><div class="cc-head"><h3>Website visitors</h3>
        <a href="${HSV.href('forms')}">See the forms they land on</a></div>
        <div class="chart-scroll slim-scroll">${HSV.charts.line(M.labels, M.visitors, { color: '#4f7cd1' })}</div></div>`;

    return `<div class="page view-in">
      ${UI.pageHead('Reports<span class="ph-count">' + D.reports.length + ' saved</span>',
        'Every chart is drawn from the same records as the rest of the app — click one for the table behind it, or build your own.',
        `<button class="btn btn-primary" data-action="create-report-open">Create report</button>`)}
      <div class="rep-grid">${cards}</div>
      <h2 style="font-size:15px;margin:26px 2px 12px">The month-by-month numbers</h2>
      <div class="grid-3">${extra}</div>
    </div>`;
  };

  /* ---- report builder: pick a question, get a live chart ------------------------ */
  const BUILD_KINDS = [
    ['line',     'Money coming in, by month'],
    ['bar',      'New contacts, by month'],
    ['donut',    'Where contacts come from (share)'],
    ['funnel',   'How far things get (funnel)'],
    ['ownerbar', 'Open value by team member'],
    ['catbar',   'Ticket load by category']
  ];
  HSV.actions['create-report-open'] = function () {
    UI.modal('Create a report', `
      <label>Name it<input class="inp" id="nr-name" placeholder="e.g. Where do our best leads come from?"></label>
      <label>What should it answer?<select class="sel" id="nr-kind" style="width:100%">
        ${BUILD_KINDS.map(k => `<option value="${k[0]}">${esc(k[1])}</option>`).join('')}</select></label>
      <p class="small muted">The chart is drawn live from the sample records the moment you save —
        same data as every other screen, so it can never disagree with them.</p>`,
      `<button class="btn" data-action="close-modal">Cancel</button>
       <button class="btn btn-primary" data-action="create-report-save">Create report</button>`);
  };
  HSV.actions['create-report-save'] = function () {
    const v = id => (document.getElementById(id) || {}).value || '';
    const kind = v('nr-kind') || 'line';
    const name = v('nr-name').trim() || BUILD_KINDS.find(k => k[0] === kind)[1];
    const r = { id: 'r' + Date.now(), name,
      desc: 'Custom report built during this session — refresh and the sample resets.',
      type: kind, custom: true };
    HSV.D().reports.push(r);
    UI.closeModal();
    HSV.go(HSV.href('report', r.id));
    UI.toast('Report created — chart and table, drawn live');
  };

  HSV.views.report = function () {
    const r = (HSV.D().reports || []).find(x => x.id === HSV.state.id);
    if (!r) return HSV.notFound('reports', 'Reports', 'That report doesn’t exist');
    const spec = reportSpec(r);

    const table = `<div class="card tbl-wrap"><table class="tbl">
      <thead><tr>${spec.head.map(h => `<th>${esc(h)}</th>`).join('')}</tr></thead>
      <tbody>${spec.rows.map(row =>
        `<tr>${row.map((c, i) => `<td ${i ? 'class="td-num b"' : ''}>${esc(String(c))}</td>`).join('')}</tr>`).join('')}
      </tbody></table></div>`;

    return `<div class="page view-in">
      ${UI.crumbs(HSV.href('reports'), 'Reports', r.name)}
      ${UI.pageHead(esc(r.name), esc(r.desc),
        `<a class="btn" href="${spec.link}">${esc(spec.linkLabel)}</a>
         <button class="btn" data-action="export-report" data-id="${r.id}">${UI.icon('download')} Export CSV</button>`)}
      <div class="detail" style="grid-template-columns:minmax(0,1.6fr) minmax(0,1fr)">
        <section class="card chart-card"><div class="chart-scroll slim-scroll">${spec.chart()}</div></section>
        <div class="d-col">
          ${table}
          <p class="small muted" style="padding:0 4px">Same numbers as the chart — always. If a client ever asks
          “where does this figure come from?”, the answer is one click away.</p>
        </div>
      </div>
    </div>`;
  };

  HSV.actions = HSV.actions || {};
  HSV.actions['export-report'] = function (el) {
    const r = HSV.D().reports.find(x => x.id === el.dataset.id);
    const spec = reportSpec(r);
    HSV.downloadCsv(HSV.D().key + '-' + r.id + '.csv', spec.head, spec.rows);
    UI.toast('Report exported as CSV');
  };
})();
