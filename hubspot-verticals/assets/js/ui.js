/* ============================================================================
   UI — inline icon set + the small building blocks every screen shares.
   ========================================================================== */
(function () {
  'use strict';
  const HSV = window.HSV;
  const esc = HSV.esc;

  /* ---- icons (24x24, stroke) -------------------------------------------------- */
  const P = {
    logo:     '<circle cx="12" cy="12" r="3.2" fill="currentColor" stroke="none"/><path d="M12 3v4M18.5 16.5 15 14.6M5.5 16.5 9 14.6" stroke-width="2.6"/><circle cx="12" cy="12" r="8.6"/>',
    search:   '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.8-3.8"/>',
    chev:     '<path d="m6 9 6 6 6-6"/>',
    chevr:    '<path d="m9 6 6 6-6 6"/>',
    menu:     '<path d="M4 6h16M4 12h16M4 18h16"/>',
    x:        '<path d="M6 6l12 12M18 6 6 18"/>',
    user:     '<circle cx="12" cy="8" r="4"/><path d="M4 21c1.4-3.6 4.4-5.5 8-5.5s6.6 1.9 8 5.5"/>',
    users:    '<circle cx="9" cy="8.5" r="3.5"/><path d="M2.5 20c1.2-3 3.7-4.7 6.5-4.7s5.3 1.7 6.5 4.7M16 4.6a3.5 3.5 0 0 1 0 7.2M18.5 15.6c1.6.8 2.7 2.2 3.3 4"/>',
    building: '<rect x="5" y="3.5" width="14" height="17" rx="1.5"/><path d="M9 8h2m2 0h2M9 12h2m2 0h2M9 16h2m2 0h2"/>',
    deal:     '<circle cx="12" cy="12" r="8.6"/><path d="M12 7.2v9.6M14.8 9.2c-.6-1-1.5-1.5-2.8-1.5-1.6 0-2.7.8-2.7 2s1 1.7 2.7 2c1.9.3 3 .9 3 2.3 0 1.3-1.3 2.1-3 2.1-1.5 0-2.6-.6-3.1-1.7"/>',
    check:    '<path d="m4.5 12.5 5 5L19.5 7"/>',
    task:     '<rect x="4" y="4" width="16" height="16" rx="3"/><path d="m8.5 12.5 2.6 2.6 4.9-5.4"/>',
    calendar: '<rect x="4" y="5.5" width="16" height="15" rx="2"/><path d="M4 10h16M8.5 3.5v4M15.5 3.5v4"/>',
    clock:    '<circle cx="12" cy="12" r="8.6"/><path d="M12 7.5V12l3.2 2.2"/>',
    mail:     '<rect x="3.5" y="5.5" width="17" height="13" rx="2"/><path d="m4.5 7.5 7.5 5.6 7.5-5.6"/>',
    phone:    '<path d="M7.6 4.2c.7-.7 1.9-.6 2.5.2l1.3 1.8c.5.7.5 1.6-.1 2.2l-1 1.1c.5 1.5 2.3 3.3 3.8 3.8l1.1-1c.6-.6 1.5-.6 2.2-.1l1.8 1.3c.8.6.9 1.8.2 2.5l-1.2 1.2c-.7.7-1.7 1-2.6.7-5-1.5-8.5-5-10-10-.3-.9 0-1.9.7-2.6z"/>',
    note:     '<path d="M5 4.5h14v10.5l-4.5 4.5H5z"/><path d="M14.5 19.5V15H19M8.5 9h7M8.5 12.5H12"/>',
    meeting:  '<rect x="3.5" y="6" width="12.5" height="12" rx="2"/><path d="m16 11 4.5-3v8L16 13"/>',
    chat:     '<path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v8a2.5 2.5 0 0 1-2.5 2.5H9l-5 4z"/>',
    ticket:   '<circle cx="12" cy="12" r="8.6"/><circle cx="12" cy="12" r="3.6"/><path d="m5.9 5.9 3.5 3.5m5.2 5.2 3.5 3.5m0-12.2-3.5 3.5m-5.2 5.2-3.5 3.5"/>',
    bolt:     '<path d="M13 3 5 13.5h5.5L11 21l8-10.5h-5.5z"/>',
    branch:   '<circle cx="7" cy="6" r="2.6"/><circle cx="7" cy="18" r="2.6"/><circle cx="17" cy="12" r="2.6"/><path d="M9.4 7.2c3 1.4 3 8.2 0 9.6M9.6 6.4h4.8M9.6 17.6h4.8" stroke-width="1.8"/>',
    pencil:   '<path d="m14.5 5.5 4 4L8 20l-4.6.6L4 16z"/><path d="m12.5 7.5 4 4"/>',
    send:     '<path d="M20.5 3.5 3.5 10l6.5 2.5L12.5 19z"/><path d="M20.5 3.5 10 12.5"/>',
    chart:    '<path d="M4 20V4"/><path d="M4 20h16"/><rect x="7.5" y="11" width="3.4" height="6" rx="1"/><rect x="12.6" y="7" width="3.4" height="10" rx="1"/><rect x="17.7" y="13" width="3.4" height="4" rx="1" transform="translate(-10.5 -2.4)"/>',
    gear:     '<circle cx="12" cy="12" r="3.4"/><path d="M12 2.8 13.5 5a7.6 7.6 0 0 1 2.4 1l2.6-.6.9 1.5-1.7 2a7.6 7.6 0 0 1 0 2.7l1.7 2-.9 1.5-2.6-.6a7.6 7.6 0 0 1-2.4 1L12 21.2 10.5 19a7.6 7.6 0 0 1-2.4-1l-2.6.6-.9-1.5 1.7-2a7.6 7.6 0 0 1 0-2.7l-1.7-2 .9-1.5 2.6.6a7.6 7.6 0 0 1 2.4-1z"/>',
    grid:     '<rect x="4" y="4" width="6.6" height="6.6" rx="1.6"/><rect x="13.4" y="4" width="6.6" height="6.6" rx="1.6"/><rect x="4" y="13.4" width="6.6" height="6.6" rx="1.6"/><rect x="13.4" y="13.4" width="6.6" height="6.6" rx="1.6"/>',
    help:     '<circle cx="12" cy="12" r="8.6"/><path d="M9.6 9.2c.3-1.3 1.3-2 2.5-2 1.4 0 2.5.9 2.5 2.2 0 1.9-2.4 2-2.4 3.6"/><circle cx="12.1" cy="16.6" r=".4" fill="currentColor"/>',
    back:     '<path d="M10.5 19 3.8 12l6.7-7M4.5 12H20"/>',
    download: '<path d="M12 4v10.5m0 0 4-4m-4 4-4-4"/><path d="M4.5 17v2A1.5 1.5 0 0 0 6 20.5h12a1.5 1.5 0 0 0 1.5-1.5v-2"/>',
    plus:     '<path d="M12 5v14M5 12h14"/>',
    home:     '<path d="m4 11 8-7.5L20 11v8.5A1.5 1.5 0 0 1 18.5 21h-13A1.5 1.5 0 0 1 4 19.5z"/><path d="M9.5 21v-6h5v6"/>',
    inbox:    '<path d="M4 13.5 6.2 5.8A1.6 1.6 0 0 1 7.7 4.6h8.6a1.6 1.6 0 0 1 1.5 1.2L20 13.5V18a1.6 1.6 0 0 1-1.6 1.6H5.6A1.6 1.6 0 0 1 4 18z"/><path d="M4 13.5h4.6a3.4 3.4 0 0 0 6.8 0H20"/>',
    doc:      '<path d="M6 3.5h8.5L19 8v12.5H6z"/><path d="M14 3.5V8h4.5"/>',
    star:     '<path d="m12 4 2.4 4.9 5.4.8-3.9 3.8.9 5.4L12 16.3l-4.8 2.6.9-5.4L4.2 9.7l5.4-.8z"/>',
    eye:      '<path d="M3 12c2.2-4.4 5.2-6.5 9-6.5s6.8 2.1 9 6.5c-2.2 4.4-5.2 6.5-9 6.5S5.2 16.4 3 12z"/><circle cx="12" cy="12" r="2.8"/>',
  };
  const UI = HSV.ui = {};
  UI.icon = (name, cls) =>
    `<svg class="${cls || ''}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[name] || P.doc}</svg>`;

  /* ---- little pieces ------------------------------------------------------------ */
  UI.avatar = (name, color, cls) =>
    `<span class="av ${cls || ''}" style="background:${color || HSV.hueColor(name)}">${esc(HSV.initials(name))}</span>`;

  UI.ownerChip = function (id) {
    const o = HSV.owner(id);
    if (!o) return '<span class="muted">—</span>';
    return `<a class="row" style="gap:7px;color:inherit" href="${HSV.href('contacts', null, { owner: o.id })}"
      title="See everyone ${esc(o.name)} looks after">${UI.avatar(o.name, o.color, 'av-sm')}<span class="clip">${esc(o.name)}</span></a>`;
  };

  UI.pill = (text, tone) => `<span class="pill ${tone || 't-gray'}">${esc(text)}</span>`;

  UI.lifecycleTone = function (lc) {
    const i = HSV.D().lifecycles.indexOf(lc);
    return ['t-blue', 't-yellow', 't-purple', 't-green', 't-gray'][i] || 't-gray';
  };
  UI.statusTone = function (st) {
    if (st === 'Closed') return 't-green';
    if (st === 'New') return 't-blue';
    if (/waiting on us/i.test(st)) return 't-yellow';
    return 't-purple';
  };
  UI.priorityTone = (p) => p === 'High' ? 't-red' : p === 'Medium' ? 't-yellow' : 't-gray';
  UI.stagePill = function (stageId) {
    const s = HSV.stage(stageId);
    const tone = s.prob === 100 ? 't-green' : s.prob === 0 ? 't-red' : 't-blue';
    return UI.pill(s.label, tone);
  };

  UI.chanIc = function (channel) {
    const ic = channel === 'Email' ? 'mail' : channel === 'WhatsApp' ? 'phone' : 'chat';
    return `<span class="chan-ic chan-${esc(channel)}" title="${esc(channel)}">${UI.icon(ic)}</span>`;
  };

  /* ---- page furniture --------------------------------------------------------------- */
  UI.pageHead = (title, sub, actions) => `
    <header class="page-head">
      <div><h1>${title}</h1>${sub ? `<p class="ph-sub">${sub}</p>` : ''}</div>
      ${actions ? `<div class="ph-actions">${actions}</div>` : ''}
    </header>`;

  UI.crumbs = (href, label, current) => `
    <nav class="crumbs"><a href="${href}">${esc(label)}</a>${UI.icon('chevr')}<span>${esc(current)}</span></nav>`;

  UI.kpi = (o) => `
    <a class="kpi" href="${o.href}" title="Open ${esc(o.label)}">
      <div class="kpi-label">${esc(o.label)}</div>
      <div class="kpi-val">${o.value}</div>
      ${o.sub ? `<div class="kpi-sub">${o.sub}</div>` : ''}
    </a>`;

  /* Generic table. headers: ['Name','Email',...]; rows: {href, cells:[html,...]}.
     First cell is treated as the main cell on phones. */
  UI.table = function (headers, rows, opts) {
    opts = opts || {};
    if (!rows.length) return `<div class="card">${UI.empty(opts.emptyIcon || 'search', 'Nothing matches', 'Try clearing a filter or searching for something else.')}</div>`;
    const ths = headers.map(h => `<th>${esc(h)}</th>`).join('');
    const trs = rows.map(r => {
      const tds = r.cells.map((c, i) => {
        if (i === 0) return `<td class="cell-main-td">${c}</td>`;
        return `<td data-th="${esc(headers[i])}" ${opts.numCols && opts.numCols.indexOf(i) >= 0 ? 'class="td-num"' : ''}>${c}</td>`;
      }).join('');
      return `<tr ${r.href ? `data-href="${r.href}" tabindex="0"` : ''}>${tds}</tr>`;
    }).join('');
    return `<div class="card tbl-wrap rsp slim-scroll"><table class="tbl">
      <thead><tr>${ths}</tr></thead><tbody>${trs}</tbody></table></div>`;
  };

  UI.empty = (icon, title, text) => `
    <div class="empty">${UI.icon(icon)}<b>${esc(title)}</b>${esc(text)}</div>`;

  UI.assocCard = function (title, items, moreHref) {
    const inner = items.length
      ? items.join('')
      : `<p class="small muted" style="padding:2px 0 4px">None yet.</p>`;
    return `<section class="card assoc-card">
      <h3>${esc(title)} ${UI.pill(items.length, 't-gray')}</h3>${inner}
      ${moreHref ? `<a class="small" href="${moreHref}">See all</a>` : ''}
    </section>`;
  };
  UI.assocItem = (href, main, sub, end) => `
    <a class="assoc-item" href="${href}"><span class="grow"><span class="b clip">${main}</span><small>${sub || ''}</small></span>${end ? `<span class="end">${end}</span>` : ''}</a>`;

  /* ---- toast ---------------------------------------------------------------------------- */
  let toastTimer = null;
  UI.toast = function (msg) {
    let el = document.querySelector('.toast');
    if (!el) { el = document.createElement('div'); el.className = 'toast'; document.body.appendChild(el); }
    el.innerHTML = UI.icon('check') + '<span>' + esc(msg) + '</span>';
    requestAnimationFrame(() => el.classList.add('show'));
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('show'), 2600);
  };
})();
