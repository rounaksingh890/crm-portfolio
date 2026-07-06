/* ============================================================================
   CHARTS — small dependency-free SVG renderers. Each returns an HTML string.
   ========================================================================== */
(function () {
  'use strict';
  const HSV = window.HSV;
  const C = HSV.charts = {};
  let uid = 0;

  const nice = function (max) {              // friendly axis ceiling
    if (max <= 0) return 1;
    const pow = Math.pow(10, Math.floor(Math.log10(max)));
    const n = max / pow;
    const step = n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10;
    return step * pow;
  };
  const short = function (n) {
    if (n >= 1000000) return (n / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    if (n >= 1000) return (n / 1000).toFixed(n >= 10000 ? 0 : 1).replace(/\.0$/, '') + 'k';
    return String(Math.round(n));
  };

  HSV.palette = function () {
    const a = HSV.D() ? HSV.D().accent : '#ff7a59';
    const base = [a, '#00bda5', '#f5a623', '#8067dc', '#4f7cd1', '#e8734a', '#5c7186'];
    return base.filter((c, i) => base.indexOf(c) === i);
  };

  /* ---- line / area --------------------------------------------------------- */
  C.line = function (labels, values, opts) {
    opts = opts || {};
    const color = opts.color || (HSV.D() ? HSV.D().accent : '#ff7a59');
    const W = 560, H = 232, L = 52, R = 14, T = 16, B = 30;
    const max = nice(Math.max.apply(null, values) * 1.08);
    const x = (i) => L + i * (W - L - R) / Math.max(values.length - 1, 1);
    const y = (v) => T + (H - T - B) * (1 - v / max);
    const id = 'lg' + (++uid);
    const pre = opts.money ? (HSV.D() ? HSV.D().currency : '$') : '';

    let grid = '';
    for (let g = 0; g <= 4; g++) {
      const vy = T + (H - T - B) * g / 4;
      const val = max * (1 - g / 4);
      grid += `<line x1="${L}" y1="${vy}" x2="${W - R}" y2="${vy}" stroke="#e3e9f0" stroke-width="1"/>` +
        `<text x="${L - 8}" y="${vy + 4}" text-anchor="end" font-size="11" fill="#5c7186">${pre}${short(val)}</text>`;
    }
    const pts = values.map((v, i) => x(i).toFixed(1) + ',' + y(v).toFixed(1));
    const area = `M${L},${H - B} L` + pts.join(' L') + ` L${W - R},${H - B} Z`;
    let dots = '', xlabs = '';
    values.forEach((v, i) => {
      dots += `<circle cx="${x(i).toFixed(1)}" cy="${y(v).toFixed(1)}" r="3.4" fill="#fff" stroke="${color}" stroke-width="2.2"><title>${HSV.esc(labels[i])}: ${pre}${Math.round(v).toLocaleString('en-US')}</title></circle>`;
      xlabs += `<text x="${x(i).toFixed(1)}" y="${H - 9}" text-anchor="middle" font-size="11" fill="#5c7186">${HSV.esc(labels[i])}</text>`;
    });
    return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" font-family="inherit">
      <defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${color}" stop-opacity=".22"/>
        <stop offset="1" stop-color="${color}" stop-opacity="0"/>
      </linearGradient></defs>
      ${grid}
      <path d="${area}" fill="url(#${id})"/>
      <path d="M${pts.join(' L')}" fill="none" stroke="${color}" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"/>
      ${dots}${xlabs}</svg>`;
  };

  /* ---- vertical bars --------------------------------------------------------- */
  C.bars = function (labels, values, opts) {
    opts = opts || {};
    const color = opts.color || (HSV.D() ? HSV.D().accent : '#ff7a59');
    const W = 560, H = 232, L = 44, R = 14, T = 16, B = 30;
    const max = nice(Math.max.apply(null, values) * 1.08);
    const n = values.length;
    const slot = (W - L - R) / n;
    const bw = Math.min(slot * 0.52, 46);
    let grid = '';
    for (let g = 0; g <= 4; g++) {
      const vy = T + (H - T - B) * g / 4;
      grid += `<line x1="${L}" y1="${vy}" x2="${W - R}" y2="${vy}" stroke="#e3e9f0"/>` +
        `<text x="${L - 8}" y="${vy + 4}" text-anchor="end" font-size="11" fill="#5c7186">${short(max * (1 - g / 4))}</text>`;
    }
    let bars = '';
    values.forEach((v, i) => {
      const bx = L + slot * i + (slot - bw) / 2;
      const bh = (H - T - B) * v / max;
      bars += `<rect x="${bx.toFixed(1)}" y="${(H - B - bh).toFixed(1)}" width="${bw.toFixed(1)}" height="${Math.max(bh, 1).toFixed(1)}" rx="4" fill="${color}"><title>${HSV.esc(labels[i])}: ${Math.round(v).toLocaleString('en-US')}</title></rect>` +
        `<text x="${(bx + bw / 2).toFixed(1)}" y="${H - 9}" text-anchor="middle" font-size="11" fill="#5c7186">${HSV.esc(labels[i])}</text>`;
    });
    return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" font-family="inherit">${grid}${bars}</svg>`;
  };

  /* ---- donut + clickable legend ------------------------------------------------ */
  C.donut = function (items, opts) {
    opts = opts || {};
    const colors = HSV.palette();
    const total = items.reduce((a, x) => a + x.value, 0) || 1;
    const R0 = 54, CIRC = 2 * Math.PI * R0;
    let off = 0, segs = '';
    items.forEach((it, i) => {
      const frac = it.value / total;
      segs += `<circle cx="80" cy="80" r="${R0}" fill="none" stroke="${colors[i % colors.length]}"
        stroke-width="26" stroke-dasharray="${(frac * CIRC).toFixed(2)} ${CIRC.toFixed(2)}"
        stroke-dashoffset="${(-off * CIRC).toFixed(2)}" transform="rotate(-90 80 80)">
        <title>${HSV.esc(it.label)}: ${it.value}</title></circle>`;
      off += frac;
    });
    const centre = opts.centre != null ? opts.centre : total;
    const legend = items.map((it, i) => {
      const inner = `<span class="sw" style="background:${colors[i % colors.length]}"></span>
        <span class="clip">${HSV.esc(it.label)}</span><b>${Math.round(100 * it.value / total)}%</b>`;
      return opts.legendHref
        ? `<a class="lg-row" href="${opts.legendHref(it)}">${inner}</a>`
        : `<span class="lg-row" style="cursor:default">${inner}</span>`;
    }).join('');
    return `<div class="donut-flex">
      <svg viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg" role="img">${segs}
        <text x="80" y="76" text-anchor="middle" font-size="24" font-weight="700" fill="#33475b">${HSV.esc(centre)}</text>
        <text x="80" y="95" text-anchor="middle" font-size="10.5" fill="#5c7186">${HSV.esc(opts.centreLabel || 'total')}</text>
      </svg>
      <div class="legend">${legend}</div></div>`;
  };

  /* ---- horizontal bars (funnels, breakdowns) — plain HTML ---------------------- */
  C.hbars = function (items, opts) {
    opts = opts || {};
    const max = Math.max.apply(null, items.map(x => x.value).concat([1]));
    return '<div class="funnel-steps">' + items.map((it, i) => {
      const w = Math.max(3, Math.round(100 * it.value / max));
      const col = it.color || (HSV.D() ? HSV.D().accent : '#ff7a59');
      const val = opts.money ? HSV.money(it.value, true) : it.value;
      const bar = `<span class="lab clip">${HSV.esc(it.label)}</span>
        <span class="bar"><i style="width:${w}%;background:${col}"></i></span>
        <span class="val">${val}</span>`;
      return opts.href
        ? `<a class="fs-row" href="${opts.href(it)}" style="text-decoration:none">${bar}</a>`
        : `<div class="fs-row">${bar}</div>`;
    }).join('') + '</div>';
  };
})();
