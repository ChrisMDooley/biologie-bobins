/*
 * figs.js — the diagrams, drawn as SVG strings (no images, no DOM needed).
 *
 *   BIO.fig(name, opts) → { svg: '<svg…>', legend: [{ n, key, label, color }] | null, caption: '' }
 *
 * All drawings are SCHEMATIC: correct topology (which bone joins which, which tooth sits where,
 * the order of the stomachs …) and honest labels — not photo-realistic. Numbers that are only
 * approximate are labelled "ungefähr" / "Schema" in the caption.
 */
(function (root) {
  'use strict';
  var C = {
    ink: '#2A2530', soft: '#6A6070', line: '#D9C9B4', bone: '#F3E7D3', boneEdge: '#8C7A63', ground: '#B9A68C',
    blue: '#3E7CC2', green: '#3E9A62', yellow: '#E2B23A', orange: '#E07B39', red: '#C9473A', purple: '#7B5EA7', teal: '#2C9C9A', pink: '#D46A8C', grey: '#9A8F86'
  };
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function svg(w, h, body, label) {
    return '<svg class="fig" viewBox="0 0 ' + w + ' ' + h + '" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="' + esc(label || '') + '">' + body + '</svg>';
  }
  function text(x, y, s, o) {
    o = o || {};
    return '<text x="' + x + '" y="' + y + '" font-size="' + (o.size || 13) + '" fill="' + (o.color || C.ink) + '" text-anchor="' + (o.anchor || 'middle') + '"' +
      (o.bold ? ' font-weight="700"' : '') + (o.italic ? ' font-style="italic"' : '') + ' font-family="Atkinson Hyperlegible, system-ui, sans-serif">' + esc(s) + '</text>';
  }
  function line(a, b, color, w, extra) {
    return '<line x1="' + a[0] + '" y1="' + a[1] + '" x2="' + b[0] + '" y2="' + b[1] + '" stroke="' + color + '" stroke-width="' + w + '" stroke-linecap="round"' + (extra || '') + '/>';
  }
  function poly(pts, fill, stroke, w) {
    return '<polygon points="' + pts.map(function (p) { return p.join(','); }).join(' ') + '" fill="' + fill + '" stroke="' + stroke + '" stroke-width="' + (w || 2) + '" stroke-linejoin="round"/>';
  }
  function pline(pts, color, w, dash) {
    return '<polyline points="' + pts.map(function (p) { return p.join(','); }).join(' ') + '" fill="none" stroke="' + color + '" stroke-width="' + w + '" stroke-linecap="round" stroke-linejoin="round"' + (dash ? ' stroke-dasharray="' + dash + '"' : '') + '/>';
  }
  function circle(c, r, fill, stroke, w) { return '<circle cx="' + c[0] + '" cy="' + c[1] + '" r="' + r + '" fill="' + fill + '"' + (stroke ? ' stroke="' + stroke + '" stroke-width="' + (w || 2) + '"' : '') + '/>'; }
  function mid(a, b) { return [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2]; }
  function center(pts) { var x = 0, y = 0; pts.forEach(function (p) { x += p[0]; y += p[1]; }); return [x / pts.length, y / pts.length]; }
  function arrowDefs(id, color) {
    return '<defs><marker id="' + id + '" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="' + color + '"/></marker></defs>';
  }
  function marker(p, n, color) {
    return '<g class="mk">' + circle(p, 11, '#fff', color || C.ink, 2.5) + text(p[0], p[1] + 4.5, String(n), { size: 13, bold: true, color: color || C.ink }) + '</g>';
  }
  // bone drawn as an outlined thick line
  function bone(a, b, w, color) { return line(a, b, C.boneEdge, w + 3) + line(a, b, color || C.bone, w); }
  function beads(pts, w, color, step) {
    var out = '', i, j;
    for (i = 0; i < pts.length - 1; i++) {
      var a = pts[i], b = pts[i + 1], len = Math.hypot(b[0] - a[0], b[1] - a[1]), k = Math.max(1, Math.round(len / (step || 9)));
      for (j = 0; j < k; j++) {
        var t0 = j / k + 0.08 / k, t1 = (j + 1) / k - 0.08 / k;
        out += bone([a[0] + (b[0] - a[0]) * t0, a[1] + (b[1] - a[1]) * t0], [a[0] + (b[0] - a[0]) * t1, a[1] + (b[1] - a[1]) * t1], w, color);
      }
    }
    return out;
  }

  // ======================================================================== SKELETONS
  // Side view, head left. Coordinates hand-placed per animal on a 420×300 canvas, ground y=286.
  var SK = {
    hund: { name: 'Hund',
      skull: [[22, 112], [30, 100], [60, 90], [88, 78], [108, 80], [118, 94], [108, 108], [86, 114], [52, 118], [26, 120]], jaw: [[28, 122], [70, 124], [100, 120], [110, 106]], orbit: [88, 92, 7],
      neck: [[114, 100], [130, 110], [146, 116], [160, 120]], thor: [[160, 120], [190, 112], [220, 110], [248, 112]], lumb: [[248, 112], [270, 114], [290, 118]],
      sacr: [[290, 118], [310, 124]], tail: [[310, 124], [330, 140], [346, 162], [356, 188], [362, 208]], ribs: [166, 244, 9], stern: [[176, 206], [236, 196]],
      scap: [[160, 112], [182, 106], [180, 122], [170, 160], [160, 160]], S: [164, 162], E: [188, 200], Ca: [182, 248], F: [178, 270], T: [160, 282], foot: 'paw',
      pelv: [[282, 112], [300, 108], [318, 130], [312, 146], [300, 140]], H: [304, 138], K: [282, 188], Hk: [318, 234], heel: [328, 226], M: [310, 270], T2: [292, 282] },
    katze: { name: 'Katze',
      skull: [[34, 110], [40, 98], [58, 84], [82, 78], [104, 84], [112, 98], [102, 112], [78, 116], [46, 118]], jaw: [[38, 120], [70, 122], [98, 118], [106, 106]], orbit: [72, 94, 10],
      neck: [[108, 100], [124, 110], [142, 118]], thor: [[142, 118], [170, 112], [200, 110], [226, 112]], lumb: [[226, 112], [252, 108], [278, 114]],
      sacr: [[278, 114], [296, 122]], tail: [[296, 122], [322, 132], [348, 148], [370, 172], [384, 200], [392, 230]], ribs: [148, 222, 9], stern: [[156, 200], [214, 192]],
      scap: [[142, 110], [162, 106], [160, 120], [152, 156], [142, 156]], S: [146, 158], E: [166, 198], Ca: [160, 248], F: [158, 270], T: [142, 282], foot: 'paw', claws: true,
      pelv: [[268, 110], [288, 106], [304, 128], [298, 142], [286, 136]], H: [290, 134], K: [268, 186], Hk: [306, 236], heel: [316, 228], M: [298, 270], T2: [280, 282] },
    pferd: { name: 'Pferd',
      skull: [[14, 138], [20, 124], [50, 108], [80, 88], [102, 70], [118, 72], [124, 86], [112, 100], [80, 122], [44, 142], [18, 146]], jaw: [[20, 148], [50, 146], [84, 128], [112, 102]], orbit: [104, 82, 7],
      neck: [[122, 80], [138, 76], [154, 80], [170, 90], [186, 102]], thor: [[186, 102], [214, 96], [244, 98], [272, 104]], lumb: [[272, 104], [294, 104], [314, 108]],
      sacr: [[314, 108], [336, 112]], tail: [[336, 112], [350, 124], [358, 142], [362, 160]], ribs: [192, 270, 10], stern: [[200, 178], [262, 170]],
      scap: [[186, 96], [208, 94], [206, 110], [198, 150], [186, 150]], S: [192, 152], E: [206, 180], Ca: [202, 226], F: [202, 262], T: [196, 282], foot: 'hoof',
      pelv: [[300, 102], [322, 98], [344, 122], [338, 136], [326, 132]], H: [328, 130], K: [316, 174], Hk: [346, 220], heel: [356, 212], M: [344, 262], T2: [338, 282], reduced: true },
    rind: { name: 'Rind',
      skull: [[16, 140], [22, 124], [48, 112], [76, 96], [96, 84], [114, 84], [122, 98], [110, 112], [76, 132], [42, 148], [20, 150]], jaw: [[22, 152], [50, 150], [82, 136], [114, 110]], orbit: [100, 98, 7],
      neck: [[118, 98], [134, 100], [150, 104], [168, 108]], thor: [[168, 108], [200, 104], [232, 104], [262, 106]], lumb: [[262, 106], [290, 106], [314, 108]],
      sacr: [[314, 108], [336, 112]], tail: [[336, 112], [346, 130], [350, 160], [352, 190], [352, 220]], ribs: [174, 260, 11], stern: [[182, 200], [250, 192]],
      scap: [[168, 104], [190, 102], [188, 118], [180, 160], [168, 160]], S: [174, 162], E: [190, 198], Ca: [186, 238], F: [186, 266], T: [180, 282], foot: 'cloven',
      pelv: [[300, 104], [322, 100], [344, 124], [338, 138], [326, 134]], H: [330, 132], K: [318, 182], Hk: [346, 226], heel: [356, 218], M: [344, 266], T2: [338, 282], reduced: true }
  };
  var BONES = [
    { key: 'schaedel', label: 'Schädel', color: '#D9A84E', off: [-6, -30] },
    { key: 'wirbelsaeule', label: 'Wirbelsäule', color: '#C46A3D', off: [0, -26] },
    { key: 'rippen', label: 'Rippen', color: '#7FA8D6', off: [0, 0] },
    { key: 'schulterblatt', label: 'Schulterblatt', color: '#8E6CB8', off: [-24, -2] },
    { key: 'oberarm', label: 'Oberarmknochen', color: '#3E7CC2', off: [-24, 4] },
    { key: 'elle_speiche', label: 'Elle und Speiche', color: '#3E9A62', off: [-24, 0] },
    { key: 'hand', label: 'Hand- bzw. Vorderfußknochen (Handwurzel, Mittelhand, Finger)', short: 'Handknochen', color: '#E07B39', off: [-26, 0] },
    { key: 'becken', label: 'Becken', color: '#C9473A', off: [20, -24] },
    { key: 'oberschenkel', label: 'Oberschenkelknochen', color: '#2C9C9A', off: [-24, 0] },
    { key: 'schienbein', label: 'Schienbein und Wadenbein', color: '#5E8F3A', off: [24, -4] },
    { key: 'fuss', label: 'Fußknochen (Fußwurzel, Mittelfuß, Zehen)', short: 'Fußknochen', color: '#D46A8C', off: [26, 0] }
  ];

  function foot(a, F, T, kind, color, claws) {
    var o = bone(a, F, 6, color);
    if (kind === 'paw') { o += bone(F, [T[0] + 6, T[1] - 2], 5, color) + bone([T[0] + 6, T[1] - 2], T, 4, color); o += '<path d="M' + T[0] + ' ' + T[1] + 'q-6 2 -9 -3" stroke="' + C.ink + '" stroke-width="2.5" fill="none"/>'; }
    else if (kind === 'hoof') { o += bone(F, [T[0] + 2, T[1] - 8], 6, color) + poly([[T[0] - 8, T[1] + 3], [T[0] + 10, T[1] + 3], [T[0] + 6, T[1] - 10], [T[0] - 2, T[1] - 10]], '#6B5B4B', C.ink, 1.5); }
    else if (kind === 'cloven') { o += bone(F, [T[0] + 2, T[1] - 8], 6, color) + poly([[T[0] - 9, T[1] + 3], [T[0] + 1, T[1] + 3], [T[0] + 1, T[1] - 9], [T[0] - 4, T[1] - 9]], '#6B5B4B', C.ink, 1.5) + poly([[T[0] + 3, T[1] + 3], [T[0] + 12, T[1] + 3], [T[0] + 7, T[1] - 9], [T[0] + 3, T[1] - 9]], '#6B5B4B', C.ink, 1.5); }
    return o;
  }

  function skeleton(o) {
    var s = SK[o.animal || 'hund'], colored = o.mode !== 'quiz' || o.colors, body = '';
    function col(k) { if (!colored) return C.bone; for (var i = 0; i < BONES.length; i++) if (BONES[i].key === k) return BONES[i].color; }
    function light(k) { var c = col(k); return colored ? c + '55' : C.bone; }
    body += line([0, 288], [420, 288], C.ground, 3);
    // spine
    body += beads(s.neck, 7, col('wirbelsaeule'), 8) + beads(s.thor, 8, col('wirbelsaeule'), 9) + beads(s.lumb, 9, col('wirbelsaeule'), 10) + bone(s.sacr[0], s.sacr[1], 9, col('wirbelsaeule')) + beads(s.tail, 5, col('wirbelsaeule'), 8);
    // ribs
    var rx0 = s.ribs[0], rx1 = s.ribs[1], rn = s.ribs[2], i;
    for (i = 0; i < rn; i++) {
      var t = i / (rn - 1), x = rx0 + (rx1 - rx0) * t;
      var yTop = s.thor[0][1] + (s.thor[s.thor.length - 1][1] - s.thor[0][1]) * t - 4 + 6 * Math.sin(t * Math.PI) * -0.5;
      var sx = s.stern[0][0] + (s.stern[1][0] - s.stern[0][0]) * t, sy = s.stern[0][1] + (s.stern[1][1] - s.stern[0][1]) * t;
      var endY = sy - t * t * 28, endX = sx + 10 * t;
      body += '<path d="M' + x + ' ' + (yTop + 6) + ' Q' + (x + 18) + ' ' + ((yTop + endY) / 2) + ' ' + endX + ' ' + endY + '" fill="none" stroke="' + C.boneEdge + '" stroke-width="5" stroke-linecap="round"/>' +
        '<path d="M' + x + ' ' + (yTop + 6) + ' Q' + (x + 18) + ' ' + ((yTop + endY) / 2) + ' ' + endX + ' ' + endY + '" fill="none" stroke="' + col('rippen') + '" stroke-width="3" stroke-linecap="round"/>';
    }
    body += bone(s.stern[0], s.stern[1], 4, col('rippen'));
    // hind leg (behind) first
    body += poly(s.pelv, light('becken'), colored ? col('becken') : C.boneEdge, 3);
    body += bone(s.H, s.K, 8, col('oberschenkel')) + circle(s.K, 4, C.bone, C.boneEdge, 1.5);
    if (s.reduced) body += bone(s.K, s.Hk, 8, col('schienbein')) + line([s.K[0] + 6, s.K[1] + 4], [s.K[0] + 12, s.K[1] + 24], C.boneEdge, 2.5);
    else body += bone([s.K[0] + 3, s.K[1]], [s.Hk[0] - 2, s.Hk[1]], 7, col('schienbein')) + line([s.K[0] + 8, s.K[1] + 4], [s.Hk[0] + 4, s.Hk[1] - 4], C.boneEdge, 2.5);
    body += bone(s.Hk, s.heel, 6, col('fuss')) + foot(s.Hk, s.M, s.T2, s.foot, col('fuss'));
    // fore leg
    body += poly(s.scap, light('schulterblatt'), colored ? col('schulterblatt') : C.boneEdge, 3);
    body += bone(s.S, s.E, 8, col('oberarm'));
    body += bone([s.E[0] + 2, s.E[1] - 8], [s.E[0] + 2, s.E[1] + 4], 6, col('elle_speiche'));   // olecranon (elbow tip of the Elle)
    if (s.reduced) body += bone(s.E, s.Ca, 8, col('elle_speiche'));
    else body += bone([s.E[0] - 3, s.E[1]], [s.Ca[0] - 3, s.Ca[1]], 5, col('elle_speiche')) + bone([s.E[0] + 3, s.E[1]], [s.Ca[0] + 3, s.Ca[1]], 4, col('elle_speiche'));
    body += circle(s.Ca, 5, colored ? col('hand') : C.bone, C.boneEdge, 1.5) + foot(s.Ca, s.F, s.T, s.foot, col('hand'));
    // skull
    body += poly(s.skull, colored ? col('schaedel') + '66' : C.bone, colored ? col('schaedel') : C.boneEdge, 3) + pline(s.jaw, colored ? col('schaedel') : C.boneEdge, 5) + circle([s.orbit[0], s.orbit[1]], s.orbit[2], '#fff', C.boneEdge, 2);

    var anchors = {
      schaedel: center(s.skull), wirbelsaeule: s.thor[1], rippen: [mid(s.stern[0], s.stern[1])[0], (s.thor[1][1] + s.stern[0][1]) / 2 + 6],
      schulterblatt: center(s.scap), oberarm: mid(s.S, s.E), elle_speiche: mid(s.E, s.Ca), hand: mid(s.Ca, s.F),
      becken: center(s.pelv), oberschenkel: mid(s.H, s.K), schienbein: mid(s.K, s.Hk), fuss: mid(s.Hk, s.M)
    };
    var legend = null;
    if (o.mode !== 'plain') {
      var order = o.order || BONES.map(function (b, i) { return i; });
      legend = [];
      order.forEach(function (bi, k) {
        var b = BONES[bi], a = anchors[b.key], p = [a[0] + b.off[0], a[1] + b.off[1]];
        if (b.off[0] || b.off[1]) body += line(a, p, C.ink, 1.5);
        body += marker(p, k + 1, colored ? b.color : C.ink);
        legend.push({ n: k + 1, key: b.key, label: b.label, short: b.short || b.label, color: b.color });
      });
    }
    return { svg: svg(420, 300, body, 'Skelett ' + s.name + ' (Schema)'), legend: legend, caption: 'Skelett ' + (s.name === 'Rind' ? 'eines Rindes' : s.name === 'Pferd' ? 'eines Pferdes' : s.name === 'Hund' ? 'eines Hundes' : 'einer Katze') + ' – vereinfachtes Schema (Kopf links).' };
  }

  // ======================================================================== FORELIMBS (homology)
  function limbs(o) {
    var body = '', cols = [
      { name: 'Mensch', x: 60, kind: 'mensch' }, { name: 'Katze', x: 170, kind: 'katze' },
      { name: 'Rind', x: 280, kind: 'rind' }, { name: 'Pferd', x: 390, kind: 'pferd' }];
    var B = { o: C.blue, e: C.green, w: C.yellow, m: C.orange, f: C.red };
    cols.forEach(function (c) {
      var x = c.x, y0 = 30, out = '';
      out += bone([x, y0], [x, y0 + 70], 9, B.o);                       // Oberarm
      if (c.kind === 'pferd' || c.kind === 'rind') out += bone([x, y0 + 76], [x, y0 + 140], 9, B.e) + bone([x + 6, y0 + 72], [x + 6, y0 + 96], 4, B.e);
      else out += bone([x - 5, y0 + 76], [x - 5, y0 + 140], 5, B.e) + bone([x + 5, y0 + 76], [x + 5, y0 + 140], 5, B.e);
      out += circle([x - 5, y0 + 150], 5, B.w, C.boneEdge, 1.2) + circle([x + 5, y0 + 150], 5, B.w, C.boneEdge, 1.2);
      if (c.kind === 'mensch') {
        [-12, -6, 0, 6, 12].forEach(function (d, i) { out += bone([x + d * 0.6, y0 + 160], [x + d, y0 + 190], 3, B.m) + bone([x + d, y0 + 194], [x + d * 1.2, y0 + (i === 0 ? 212 : 230)], 3, B.f); });
      } else if (c.kind === 'katze') {
        [-9, -3, 3, 9].forEach(function (d) { out += bone([x + d * 0.5, y0 + 160], [x + d * 0.8, y0 + 200], 3, B.m) + bone([x + d * 0.8, y0 + 204], [x + d * 0.8 - 14, y0 + 218], 3, B.f); });
        out += bone([x - 10, y0 + 160], [x - 12, y0 + 176], 2.5, B.m);   // Daumen (Afterkralle)
      } else if (c.kind === 'rind') {
        out += bone([x, y0 + 160], [x, y0 + 210], 9, B.m);
        out += bone([x - 4, y0 + 214], [x - 6, y0 + 236], 4, B.f) + bone([x + 4, y0 + 214], [x + 6, y0 + 236], 4, B.f);
        out += bone([x - 12, y0 + 204], [x - 14, y0 + 214], 2.5, B.f) + bone([x + 12, y0 + 204], [x + 14, y0 + 214], 2.5, B.f);
      } else {
        out += bone([x, y0 + 160], [x, y0 + 212], 9, B.m) + bone([x - 7, y0 + 160], [x - 7, y0 + 186], 2.5, B.m) + bone([x + 7, y0 + 160], [x + 7, y0 + 186], 2.5, B.m);
        out += bone([x, y0 + 216], [x, y0 + 234], 6, B.f) + poly([[x - 9, y0 + 246], [x + 9, y0 + 246], [x + 6, y0 + 234], [x - 6, y0 + 234]], '#6B5B4B', C.ink, 1.2);
      }
      body += out + text(x, 18, c.name, { bold: true, size: 15 });
    });
    var leg = [['Oberarmknochen', B.o], ['Elle und Speiche', B.e], ['Handwurzelknochen', B.w], ['Mittelhandknochen', B.m], ['Fingerknochen', B.f]];
    return { svg: svg(450, 290, body, 'Vordergliedmaßen im Vergleich'), legend: leg.map(function (l, i) { return { n: i + 1, label: l[0], color: l[1], swatch: true }; }),
      caption: 'Gleiche Farbe = gleicher Knochen. Bei Rind und Pferd sind Elle und Speiche teilweise verwachsen; beim Pferd sind von den Mittelhandknochen 2 und 4 nur noch dünne Griffelbeine übrig (Schema).' };
  }

  // ======================================================================== GAITS
  function gait(o) {
    var body = '', which = o.which || 'all', names = o.names !== false;
    var P = [
      { id: 'sohle', name: 'Sohlengänger', ex: 'z. B. Mensch, Bär, Igel', x: 70,
        pts: { k: [0, 40], a: [0, 150], heel: [-16, 196], m: [22, 196], t: [46, 198] } },
      { id: 'zehe', name: 'Zehengänger', ex: 'z. B. Hund, Katze', x: 225,
        pts: { k: [0, 40], a: [10, 120], heel: [24, 112], m: [-6, 188], t: [-30, 198] } },
      { id: 'spitze', name: 'Zehenspitzengänger', ex: 'z. B. Pferd, Rind, Schwein', x: 385,
        pts: { k: [0, 40], a: [6, 100], heel: [20, 92], m: [6, 176], t: [2, 198] } }];
    var shown = P.filter(function (p) { return which === 'all' || which === p.id; });
    var W = which === 'all' ? 460 : 170, off = which === 'all' ? 0 : -shown[0].x + 80;
    shown.forEach(function (p, i) {
      var x = p.x + off, q = p.pts;
      function A(v) { return [x + v[0], v[1] + 20]; }
      body += line([x - 60, 220], [x + 60, 220], C.ground, 3);
      body += bone(A(q.k), A(q.a), 8, C.grey);
      body += bone(A(q.a), A(q.heel), 7, C.yellow) + circle(A(q.a), 6, C.yellow, C.boneEdge, 1.5);
      body += bone(A(q.a), A(q.m), 6, C.orange);
      if (p.id === 'spitze') body += bone(A(q.m), A(q.t), 6, C.red) + poly([[x - 8, 220], [x + 12, 220], [x + 8, 206], [x - 4, 206]], '#6B5B4B', C.ink, 1.2);
      else body += bone(A(q.m), A(q.t), 5, C.red);
      if (names) { body += text(x, 248, p.name, { bold: true, size: 14 }); body += text(x, 266, p.ex, { size: 12, color: C.soft }); }
      body += text(x + (p.id === 'sohle' ? -30 : 34), A(q.heel)[1] + (p.id === 'sohle' ? 20 : -4), 'Ferse', { size: 11, color: C.soft });
    });
    var leg = [['Schienbein', C.grey], ['Fußwurzel mit Fersenbein', C.yellow], ['Mittelfußknochen', C.orange], ['Zehenknochen', C.red]];
    return { svg: svg(W, 276, body, 'Fußhaltung'), legend: leg.map(function (l, i) { return { n: i + 1, label: l[0], color: l[1], swatch: true }; }),
      caption: 'Hinterbein im Schema. Je weniger vom Fuß den Boden berührt, desto länger wirkt das Bein – gut zum schnellen Laufen.' };
  }

  // ======================================================================== HOOVES (front view, digits numbered 1–5 like fingers)
  function hooves(o) {
    var body = '', which = o.which || 'all', nums = o.nums !== false;
    var P = [
      { id: 'paar', name: 'Paarhufer (Rind)', x: 80, digits: [{ d: 2, dx: -26, len: 30, small: true }, { d: 3, dx: -9, len: 70 }, { d: 4, dx: 9, len: 70 }, { d: 5, dx: 26, len: 30, small: true }], axis: 0 },
      { id: 'unpaar', name: 'Unpaarhufer (Pferd)', x: 230, digits: [{ d: 3, dx: 0, len: 70, wide: true }], splints: true, axis: 0 },
      { id: 'nashorn', name: 'Unpaarhufer (Nashorn)', x: 370, digits: [{ d: 2, dx: -22, len: 58 }, { d: 3, dx: 0, len: 66 }, { d: 4, dx: 22, len: 58 }], axis: 0 }];
    var shown = P.filter(function (p) { return which === 'all' || which === p.id; });
    var W = which === 'all' ? 450 : 170, off = which === 'all' ? 0 : -shown[0].x + 85;
    shown.forEach(function (p) {
      var x = p.x + off, top = 40;
      body += line([x - 60, 200], [x + 60, 200], C.ground, 3);
      if (p.id === 'paar') body += bone([x - 5, top], [x - 5, top + 80], 7, C.orange) + bone([x + 5, top], [x + 5, top + 80], 7, C.orange);
      else if (p.id === 'unpaar') body += bone([x, top], [x, top + 84], 11, C.orange) + bone([x - 10, top], [x - 10, top + 44], 3, C.orange) + bone([x + 10, top], [x + 10, top + 44], 3, C.orange);
      else body += bone([x - 14, top + 10], [x - 18, top + 70], 6, C.orange) + bone([x, top], [x, top + 76], 7, C.orange) + bone([x + 14, top + 10], [x + 18, top + 70], 6, C.orange);
      p.digits.forEach(function (d) {
        var y0 = d.small ? 112 : 128, bx = x + d.dx;
        if (d.small) { body += bone([bx * 0.5 + x * 0.5, top + 76], [bx, y0 + 14], 3, C.red) + poly([[bx - 5, y0 + 24], [bx + 5, y0 + 24], [bx + 3, y0 + 14], [bx - 3, y0 + 14]], '#6B5B4B', C.ink, 1); }
        else {
          var wd = d.wide ? 16 : 9;
          body += bone([bx, y0 - 6], [bx, 184], d.wide ? 7 : 5, C.red) + poly([[bx - wd, 200], [bx + wd, 200], [bx + wd * 0.7, 184], [bx - wd * 0.7, 184]], '#6B5B4B', C.ink, 1.2);
        }
        if (nums) body += text(bx, d.small ? y0 + 40 : 218, String(d.d), { bold: true, size: 13, color: C.purple });
      });
      body += line([x, 26], [x, 206], C.purple, 1.5, ' stroke-dasharray="4 4"');
      if (o.names !== false) body += text(x, 246, p.name, { bold: true, size: 13 });
    });
    return { svg: svg(W, 256, body, 'Hufe von vorn'), legend: null,
      caption: 'Vorderansicht im Schema. Zahlen = Zehe 1 bis 5 (wie Daumen bis kleiner Finger). Die gestrichelte Linie zeigt die Körperachse: Beim Paarhufer läuft sie ZWISCHEN Zehe 3 und 4, beim Unpaarhufer DURCH Zehe 3.' };
  }

  // ======================================================================== JAWS / SKULLS (one side, front left)
  var FORM = { // I C P M  (upper / lower) — one side of the mouth
    hund: { name: 'Hund', up: [3, 1, 4, 2], lo: [3, 1, 4, 3], carn: { up: 'P4', lo: 'M1' } },
    katze: { name: 'Katze', up: [3, 1, 3, 1], lo: [3, 1, 2, 1], carn: { up: 'P3', lo: 'M1' } },
    rind: { name: 'Rind', up: [0, 0, 3, 3], lo: [3, 1, 3, 3], pad: true, gap: 60 },
    eich: { name: 'Eichhörnchen', up: [1, 0, 2, 3], lo: [1, 0, 1, 3], gnaw: true, gap: 50 },
    mensch: { name: 'Mensch', up: [2, 1, 2, 3], lo: [2, 1, 2, 3] }
  };
  var TCOL = { I: C.blue, C: C.red, P: C.yellow, M: C.green, R: C.purple, N: C.blue };
  var TNAME = { I: 'Schneidezähne', C: 'Eckzähne', P: 'Vorbackenzähne', M: 'Backenzähne', R: 'Reißzähne', N: 'Nagezähne', G: 'Zahnlücke (Diastema)', K: 'Hornplatte (Kauplatte)' };

  function tooth(type, x, y, w, up, opts) {
    // y = gum line; teeth grow down (upper) or up (lower)
    var s = up ? 1 : -1, h, d;
    var col = TCOL[opts.carn ? 'R' : type], o = opts.plain ? '#F7F2E8' : col, edge = C.ink;
    if (type === 'I') { h = opts.big ? 22 : 16; d = 'M' + x + ' ' + y + 'h' + w + 'v' + (s * h) + 'h' + (-w) + 'z'; }
    else if (type === 'C') { h = opts.big ? 23 : 21; d = 'M' + x + ' ' + y + 'h' + w + 'L' + (x + w * 0.45) + ' ' + (y + s * h) + 'z'; }
    else if (type === 'P') {
      h = 14; if (opts.carn) h = 20;
      d = 'M' + x + ' ' + y + 'h' + w + 'L' + (x + w * 0.85) + ' ' + (y + s * h * 0.6) + 'L' + (x + w * 0.55) + ' ' + (y + s * h) + 'L' + (x + w * 0.2) + ' ' + (y + s * h * 0.55) + 'z';
    } else if (type === 'M') {
      h = opts.carn ? 20 : 13;
      if (opts.carn) d = 'M' + x + ' ' + y + 'h' + w + 'L' + (x + w * 0.8) + ' ' + (y + s * h * 0.6) + 'L' + (x + w * 0.45) + ' ' + (y + s * h) + 'L' + (x + w * 0.15) + ' ' + (y + s * h * 0.6) + 'z';
      else if (opts.flat) d = 'M' + x + ' ' + y + 'h' + w + 'v' + (s * h) + 'l' + (-w * 0.2) + ' ' + (-s * 3) + 'l' + (-w * 0.2) + ' ' + (s * 3) + 'l' + (-w * 0.2) + ' ' + (-s * 3) + 'l' + (-w * 0.2) + ' ' + (s * 3) + 'l' + (-w * 0.2) + ' ' + (-s * 3) + 'z';
      else d = 'M' + x + ' ' + y + 'h' + w + 'v' + (s * h) + 'q' + (-w * 0.25) + ' ' + (s * 4) + ' ' + (-w * 0.5) + ' 0q' + (-w * 0.25) + ' ' + (s * 4) + ' ' + (-w * 0.5) + ' 0z';
    }
    if (opts.gnaw) {
      // long curved incisor with orange enamel on the front
      var tip = up ? [x - 4, y + 34] : [x - 2, y - 30];
      d = 'M' + (x + w) + ' ' + y + 'Q' + (x + w) + ' ' + ((y + tip[1]) / 2) + ' ' + tip[0] + ' ' + tip[1] + 'Q' + (x - 2) + ' ' + ((y + tip[1]) / 2) + ' ' + x + ' ' + y + 'z';
      return '<path d="' + d + '" fill="' + (opts.plain ? '#F7F2E8' : C.blue) + '" stroke="' + edge + '" stroke-width="1.6"/>' +
        '<path d="M' + x + ' ' + y + 'Q' + (x - 2) + ' ' + ((y + tip[1]) / 2) + ' ' + tip[0] + ' ' + tip[1] + '" stroke="#E07B39" stroke-width="3.5" fill="none"/>';
    }
    return '<path d="' + d + '" fill="' + o + '" stroke="' + edge + '" stroke-width="1.6" stroke-linejoin="round"/>';
  }

  function jaw(o) {
    var f = FORM[o.animal || 'hund'], plain = !!o.plain, body = '';
    var W = { I: 9, C: 11, P: 15, M: 19 };
    if (o.animal === 'mensch') W = { I: 10, C: 11, P: 12, M: 15 };
    if (o.animal === 'eich') W = { I: 10, C: 0, P: 11, M: 12 };
    if (o.animal === 'rind') W = { I: 9, C: 9, P: 17, M: 21 };
    if (o.animal === 'katze') W = { I: 7, C: 12, P: 17, M: 10 };
    var x0 = 70, yU = 118, yL = 164, gap = f.gap || 0, types = ['I', 'C', 'P', 'M'];
    function row(counts, up) {
      var x = x0 - (!up && (o.animal === 'hund' || o.animal === 'katze') ? 9 : 0), out = '', first = true, marks = [];
      types.forEach(function (t, ti) {
        if (t === 'P' && gap) x += gap;
        for (var k = 0; k < counts[ti]; k++) {
          var id = t + (k + 1), carn = f.carn && (up ? f.carn.up : f.carn.lo) === id;
          var w = W[t] * (carn ? 1.35 : 1);
          if (o.animal === 'katze' && t === 'M' && up) w = 7;
          var t2 = (o.animal === 'rind' && !up && t === 'C') ? 'I' : t; // Rind: lower canine shaped like an incisor
          out += tooth(t2, x, up ? yU : yL, w, up, { carn: carn, plain: plain, flat: o.animal === 'rind' || o.animal === 'eich', gnaw: f.gnaw && t === 'I', big: o.animal === 'hund' && t === 'C' });
          if (o.animal === 'rind' && !up && t === 'C' && !plain) out += '<path d="M' + x + ' ' + yL + 'h' + w + 'v-16h' + (-w) + 'z" fill="none" stroke="' + C.red + '" stroke-width="2.5"/>';
          marks.push({ t: carn ? 'R' : t, x: x + w / 2 });
          x += w + 2; first = false;
        }
      });
      return { svg: out, end: x, marks: marks };
    }
    var up = row(f.up, true), lo = row(f.lo, false), end = Math.max(up.end, lo.end);
    // skull outline (schematic)
    var cranR = { hund: 46, katze: 50, rind: 52, eich: 46, mensch: 70 }[o.animal || 'hund'];
    var cx = end + cranR * 0.6, cy = yU - cranR * 0.6;
    if (o.animal === 'mensch') { cx = x0 + 70; cy = yU - 80; }
    body += '<path d="M' + (x0 - 14) + ' ' + (yU + 2) + 'L' + (x0 - 6) + ' ' + (yU - 26) + 'Q' + ((x0 + cx) / 2) + ' ' + (yU - 40 - (o.animal === 'mensch' ? 30 : 0)) + ' ' + (cx - cranR * 0.5) + ' ' + (cy - cranR * 0.75) +
      'A' + cranR + ' ' + cranR * 0.85 + ' 0 1 1 ' + (cx + cranR * 0.6) + ' ' + (cy + cranR * 0.7) + 'L' + (end + 6) + ' ' + (yU + 2) + 'Z" fill="' + C.bone + '" stroke="' + C.boneEdge + '" stroke-width="2.5" stroke-linejoin="round"/>';
    body += circle([Math.min(cx - cranR * 0.2, end + 4), cy + 6], o.animal === 'katze' ? 17 : o.animal === 'eich' ? 15 : 12, '#fff', C.boneEdge, 2);
    // lower jaw (mandible) with ramus up to the jaw joint
    body += '<path d="M' + (x0 - 12) + ' ' + (yL - 2) + 'L' + (end + 4) + ' ' + (yL - 2) + 'L' + (end + 30) + ' ' + (yU + 10) + 'L' + (end + 42) + ' ' + (yU + 6) + 'L' + (end + 40) + ' ' + (yL + 24) + 'Q' + ((x0 + end) / 2) + ' ' + (yL + 30) + ' ' + (x0 - 10) + ' ' + (yL + 16) + 'Z" fill="' + C.bone + '" stroke="' + C.boneEdge + '" stroke-width="2.5" stroke-linejoin="round"/>';
    body += circle([end + 40, yU + 8], 5, '#fff', C.ink, 2);
    if (f.pad) body += '<rect x="' + (x0 - 6) + '" y="' + (yU - 2) + '" width="' + (gap + 4) + '" height="9" rx="4" fill="' + (plain ? '#B8AFA4' : '#8A7F74') + '" stroke="' + C.ink + '" stroke-width="1.2"/>';
    body += up.svg + lo.svg;
    var keysUsed = {};
    up.marks.concat(lo.marks).forEach(function (m) { keysUsed[m.t] = 1; });
    if (f.gnaw) { delete keysUsed.I; keysUsed.N = 1; }
    if (gap) keysUsed.G = 1;
    if (f.pad) keysUsed.K = 1;
    if (!plain && gap) body += text(x0 + (f.pad ? gap / 2 + 18 : gap / 2 + 14), yL + 46, '↔ Zahnlücke', { size: 12, color: C.soft });
    if (!plain && f.pad) body += text(x0 + 20, yU - 8, 'Hornplatte', { size: 11, color: C.soft });
    if (o.title !== false) body += text(16, 22, plain ? 'Gebiss ' + (o.letter || '?') : 'Gebiss: ' + f.name, { anchor: 'start', bold: true, size: 15 });
    var legend = plain ? null : ['N', 'I', 'C', 'P', 'M', 'R', 'G', 'K'].filter(function (k) { return keysUsed[k]; }).map(function (k, i) {
      return { n: i + 1, label: TNAME[k] + (k === 'R' ? ' (besonders große Backen-/Vorbackenzähne)' : ''), color: k === 'G' ? '#FFFFFF' : k === 'K' ? '#8A7F74' : TCOL[k], swatch: true };
    });
    var cap = 'Eine Kieferhälfte von der Seite (Schema): oben Oberkiefer, unten Unterkiefer, vorne = links.';
    if (o.animal === 'rind' && !plain) cap += ' Rot umrandet: der untere Eckzahn sieht beim Rind aus wie ein Schneidezahn.';
    return { svg: svg(Math.max(420, end + 70), 230, body, plain ? 'Gebiss eines unbekannten Tieres' : 'Gebiss ' + f.name), legend: legend, caption: cap };
  }

  // ======================================================================== VERTEBRATE TREE
  function since(k, dflt) { var S = root.BIO && root.BIO.curriculum && root.BIO.curriculum.since; return 'seit ' + ((S && S[k]) || dflt) + ' Mio. J.'; }
  function tree(o) {
    var hide = !!o.hide, body = arrowDefs('ta', C.soft);
    var tips = [
      { k: 'Fische', x: 100, c: C.blue, icon: '🐟', since: since('Fische', 500) },
      { k: 'Amphibien', x: 200, c: C.green, icon: '🐸', since: since('Amphibien', 370) },
      { k: 'Säugetiere', x: 300, c: C.orange, icon: '🐕', since: since('Säugetiere', 220) },
      { k: 'Reptilien', x: 400, c: C.teal, icon: '🦎', since: since('Reptilien', 320) },
      { k: 'Vögel', x: 500, c: C.purple, icon: '🐦', since: since('Vögel', 150) }];
    var yTop = 74, N1 = [160, 330], N2 = [230, 280], N3 = [310, 230], N4 = [450, 180];
    var br = [[[160, 384], N1], [N1, [100, yTop]], [N1, N2], [N2, [200, yTop]], [N2, N3], [N3, [300, yTop]], [N3, N4], [N4, [400, yTop]], [N4, [500, yTop]]];
    br.forEach(function (b) { body += line(b[0], b[1], '#B59B7C', 7); });
    [N1, N2, N3, N4].forEach(function (n) { body += circle(n, 7, '#fff', C.ink, 2.5); });
    var nov = [[[172, 376], 'Wirbelsäule, Schädel', 'start'], [[124, 204], 'Kiemen, Flossen', 'end'], [[200, 322], 'Beine mit Zehen, Lunge', 'start'],
      [[282, 268], 'Ei mit Schale, trockene Haut', 'start'], [[314, 150], 'Fell, Milch', 'start'], [[488, 128], 'Federn', 'start']];
    if (!hide || o.innov) nov.forEach(function (n) { body += text(n[0][0], n[0][1], (n[2] === 'end' ? '' : '▸ ') + n[1] + (n[2] === 'end' ? ' ◂' : ''), { size: 11, anchor: n[2], color: C.soft, italic: true }); });
    tips.forEach(function (t, i) {
      body += '<g class="tip" data-k="' + t.k + '">';
      body += '<rect x="' + (t.x - 47) + '" y="' + (yTop - 62) + '" width="94" height="58" rx="12" fill="#fff" stroke="' + t.c + '" stroke-width="3"/>';
      if (hide) body += text(t.x, yTop - 26, (o.letters ? 'ABCDE'[i] : '?'), { bold: true, size: 22, color: t.c });
      else body += text(t.x, yTop - 42, t.icon, { size: 14 }) + text(t.x, yTop - 25, t.k, { bold: true, size: 13 }) + text(t.x, yTop - 11, t.since, { size: 9.5, color: C.soft });
      body += '</g>';
    });
    body += line([580, 384], [580, 30], C.soft, 2, ' marker-end="url(#ta)"') + text(574, 396, 'früher', { size: 11, color: C.soft, anchor: 'end' }) + text(572, 92, 'heute', { size: 11, color: C.soft, anchor: 'end' });
    body += text(N1[0] + 14, N1[1] + 8, 'gemeinsame Vorfahren', { size: 11, anchor: 'start', color: C.ink });
    return { svg: svg(600, 404, body, 'Stammbaum der Wirbeltiere'), legend: null,
      caption: 'Stammbaum (Schema). Jeder Punkt = gemeinsame Vorfahren, die heute nicht mehr leben. Die heutigen Klassen stehen oben NEBENEINANDER – keine heutige Klasse ist der Vorfahr einer anderen. Zeitangaben: erstes Auftreten (Zahlen aus dem Heft, andere Bücher runden etwas anders).' };
  }

  // ======================================================================== CHARTS
  function chart(o) {
    var W = o.w || 460, H = o.h || 300, L = 60, R = 20, T = (o.title && (o.series.length > 1 || o.legendAlways)) ? 58 : 38, B = 54, pw = W - L - R, ph = H - T - B, body = '';
    var ymin = o.ymin != null ? o.ymin : 0, ymax = o.ymax, step = o.ystep || 10;
    function Y(v) { return T + ph - (v - ymin) / (ymax - ymin) * ph; }
    for (var v = ymin; v <= ymax + 1e-9; v += step) { body += line([L, Y(v)], [L + pw, Y(v)], '#EADFD0', 1) + text(L - 8, Y(v) + 4, String(v), { size: 11, anchor: 'end', color: C.soft }); }
    body += line([L, T], [L, T + ph], C.ink, 2) + line([L, T + ph], [L + pw, T + ph], C.ink, 2);
    var cats = o.cats, n = cats.length;
    if (o.type === 'bar') {
      var groups = o.series.length, bw = pw / n * 0.7 / groups;
      cats.forEach(function (c, i) {
        var cx = L + pw * (i + 0.5) / n;
        o.series.forEach(function (s, j) {
          var val = s.vals[i], x = cx - bw * groups / 2 + j * bw;
          if (val == null) return;
          body += '<rect x="' + x + '" y="' + Y(val) + '" width="' + (bw - 3) + '" height="' + (Y(ymin) - Y(val)) + '" fill="' + (s.color || C.blue) + '" rx="3"/>';
          if (o.values !== false) body += text(x + bw / 2 - 1, Y(val) - 5, String(val).replace('.', ','), { size: 11 });
        });
        body += text(cx, T + ph + 18, c, { size: 12 });
      });
    } else {
      var X = function (i) { return L + (n === 1 ? pw / 2 : pw * i / (n - 1)); };
      cats.forEach(function (c, i) { if (o.every && i % o.every) return; body += text(X(i), T + ph + 18, c, { size: 11 }); });
      o.series.forEach(function (s) {
        var pts = []; s.vals.forEach(function (v, i) { if (v != null) pts.push([X(i), Y(v)]); });
        body += pline(pts, s.color || C.blue, 3, s.dash);
        if (o.dots !== false) pts.forEach(function (p) { body += circle(p, 3.5, s.color || C.blue); });
      });
    }
    if (o.series.length > 1 || o.legendAlways) {
      var lx = L + 8;
      o.series.forEach(function (s) {
        body += line([lx, T - 16], [lx + 18, T - 16], s.color || C.blue, 4, s.dash ? ' stroke-dasharray="' + s.dash + '"' : '') + text(lx + 24, T - 12, s.name, { size: 12, anchor: 'start' });
        lx += 34 + s.name.length * 7;
      });
    }
    body += text(L + pw / 2, H - 12, o.xlabel || '', { size: 12, bold: true });
    body += '<text x="16" y="' + (T + ph / 2) + '" font-size="12" font-weight="700" fill="' + C.ink + '" text-anchor="middle" transform="rotate(-90 16 ' + (T + ph / 2) + ')" font-family="Atkinson Hyperlegible, system-ui, sans-serif">' + esc(o.ylabel || '') + '</text>';
    if (o.title) body = text(W / 2, 18, o.title, { bold: true, size: 14 }) + body;
    return { svg: svg(W, H, body, o.title || 'Diagramm'), legend: null, caption: o.caption || '' };
  }

  function temp() {
    var amb = [0, 5, 10, 15, 20, 25, 30, 35, 40];
    return chart({ type: 'line', title: 'Körpertemperatur bei verschiedenen Außentemperaturen', cats: amb.map(String), xlabel: 'Außentemperatur in °C', ylabel: 'Körpertemperatur in °C', ymin: 0, ymax: 45, ystep: 5,
      series: [{ name: 'Maus', vals: [37, 37, 37, 37, 37, 37, 37, 37, 38], color: C.orange }, { name: 'Eidechse', vals: [1, 6, 11, 16, 21, 26, 31, 35, 39], color: C.teal }],
      caption: 'Schema mit vereinfachten Werten. Die Maus hält ihre Temperatur fast gleich, bei der Eidechse folgt sie der Außentemperatur.' });
  }
  function winter() {
    var m = ['Okt', 'Nov', 'Dez', 'Jan', 'Feb', 'Mär', 'Apr'];
    return chart({ type: 'line', title: 'Körpertemperatur im Winter (Schema)', cats: m, xlabel: 'Monat', ylabel: 'Körpertemperatur in °C', ymin: 0, ymax: 40, ystep: 10, dots: false,
      series: [
        { name: 'Reh', vals: [38.5, 38.5, 38, 38, 38, 38.5, 38.5], color: C.orange },
        { name: 'Dachs', vals: [37, 35, 32, 31, 32, 35, 37], color: C.purple },
        { name: 'Igel', vals: [35, 6, 5, 5, 6, 30, 35], color: C.blue },
        { name: 'Frosch', vals: [10, 6, 3, 2, 3, 6, 10], color: C.green },
        { name: 'Luft', vals: [10, 5, 2, 1, 2, 5, 10], color: C.grey, dash: '5 5' }],
      caption: 'Schema mit vereinfachten Werten. Reh: winteraktiv · Dachs: Winterruhe · Igel: Winterschlaf (kurze Aufwachphasen sind nicht gezeichnet) · Frosch: Winterstarre.' });
  }

  // ======================================================================== FIELD OF VIEW (top view)
  function fov(o) {
    var A = { katze: { name: 'Katze', total: 200, bino: 120 }, hund: { name: 'Hund', total: 250, bino: 60 }, kaninchen: { name: 'Kaninchen', total: 350, bino: 25 } };
    var list = o.animal ? [o.animal] : ['katze', 'hund', 'kaninchen'], body = '', W = list.length * 160;
    function arc(cx, cy, r, a0, a1, fill) {
      function P(a) { var rad = (a - 90) * Math.PI / 180; return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)]; }
      var p0 = P(a0), p1 = P(a1), large = (a1 - a0) > 180 ? 1 : 0;
      return '<path d="M' + cx + ' ' + cy + 'L' + p0[0] + ' ' + p0[1] + 'A' + r + ' ' + r + ' 0 ' + large + ' 1 ' + p1[0] + ' ' + p1[1] + 'Z" fill="' + fill + '"/>';
    }
    list.forEach(function (k, i) {
      var a = A[k], cx = 80 + i * 160, cy = 110, r = 66;
      body += arc(cx, cy, r, -a.total / 2, a.total / 2, '#BFD7F0') + arc(cx, cy, r, -a.bino / 2, a.bino / 2, '#3E7CC2');
      body += '<ellipse cx="' + cx + '" cy="' + (cy + 8) + '" rx="13" ry="18" fill="#C98A5B" stroke="' + C.ink + '" stroke-width="1.5"/>' + circle([cx - 6, cy - 2], 3, C.ink) + circle([cx + 6, cy - 2], 3, C.ink);
      body += text(cx, 200, a.name, { bold: true, size: 14 }) + text(cx, 218, 'gesamt ca. ' + a.total + '°', { size: 11, color: C.soft }) + text(cx, 233, 'räumlich ca. ' + a.bino + '°', { size: 11, color: '#2A5C94' });
    });
    body += text(W / 2, 18, '↑ vorne', { size: 12, color: C.soft });
    return { svg: svg(W, 244, body, 'Gesichtsfeld von oben'), legend: [{ n: 1, label: 'räumliches Sehen (beide Augen sehen dasselbe) – Entfernungen gut schätzen', color: '#3E7CC2', swatch: true }, { n: 2, label: 'nur ein Auge sieht hin – Bewegung bemerken', color: '#BFD7F0', swatch: true }],
      caption: 'Blick von oben, ungefähre Werte. Jäger mit Augen vorn sehen einen großen Bereich räumlich. Beutetiere mit Augen seitlich sehen fast rundherum.' };
  }

  // ======================================================================== RUMINANT STOMACH (stepper)
  var STOM = [
    { k: 'maul', label: 'Maul', x: 40, y: 50, w: 90, h: 46 },
    { k: 'pansen', label: 'Pansen', x: 250, y: 120, w: 160, h: 110 },
    { k: 'netz', label: 'Netzmagen', x: 150, y: 140, w: 90, h: 56 },
    { k: 'blatt', label: 'Blättermagen', x: 150, y: 220, w: 100, h: 50 },
    { k: 'lab', label: 'Labmagen', x: 270, y: 250, w: 110, h: 46 },
    { k: 'darm', label: 'Darm', x: 410, y: 256, w: 60, h: 36 }];
  var STEPS = [
    { on: ['maul'], path: [], t: 'Das Rind rupft Gras mit Zunge und unteren Schneidezähnen ab. Es kaut kaum und schluckt schnell.' },
    { on: ['pansen'], path: ['a1'], t: 'Das Futter rutscht durch die Speiseröhre in den Pansen. Er ist riesig (über 100 Liter). Bakterien und Einzeller zersetzen dort die Zellulose der Pflanzen (Gärung).' },
    { on: ['netz'], path: ['a2'], t: 'Im Netzmagen wird der Brei zu kleinen Ballen geformt.' },
    { on: ['maul'], path: ['a3'], t: 'Wiederkäuen: Die Ballen werden ins Maul hochgewürgt. Das Rind kaut sie in Ruhe lange und gründlich mit den Backenzähnen. Viel Speichel kommt dazu.' },
    { on: ['blatt'], path: ['a4'], t: 'Der fein gekaute Brei wird wieder geschluckt. Fein zerkleinerte Nahrung gelangt in den Blättermagen. Dort wird Wasser entzogen – der Brei wird dicker.' },
    { on: ['lab'], path: ['a5'], t: 'Im Labmagen verdauen Magensäfte die Nahrung – wie in unserem Magen. Er ist der „echte“ Magen.' },
    { on: ['darm'], path: ['a6'], t: 'Im Darm gelangen die Nährstoffe ins Blut.' }];
  function stomach(o) {
    var step = o.step == null ? -1 : o.step, body = arrowDefs('sa', C.ink) + arrowDefs('sb', C.red), st = STEPS[step] || { on: [], path: [] };
    var nums = o.numbers, all = step < 0 && !nums;
    function box(b, i) {
      var on = st.on.indexOf(b.k) >= 0, fill = on ? '#FCE3D6' : '#fff', stroke = on ? C.orange : C.ink;
      var r = b.k === 'pansen' ? 40 : b.k === 'darm' ? 18 : 20;
      var lab = nums ? String(i + 1) : b.label;
      return '<rect x="' + b.x + '" y="' + b.y + '" width="' + b.w + '" height="' + b.h + '" rx="' + r + '" fill="' + fill + '" stroke="' + stroke + '" stroke-width="' + (on ? 4 : 2.5) + '"/>' +
        text(b.x + b.w / 2, b.y + b.h / 2 + 5, lab, { bold: true, size: nums ? 18 : 14 });
    }
    var S = {}; STOM.forEach(function (b) { S[b.k] = b; });
    var arrows = {
      a1: '<path d="M130 70 C 220 70, 300 80, 320 118" />',
      a2: '<path d="M250 170 L 242 170" />',
      a3: '<path d="M170 138 C 150 110, 140 92, 132 84" />',
      a4: '<path d="M110 74 C 90 160, 110 240, 148 244" />',
      a5: '<path d="M250 252 L 268 266" />',
      a6: '<path d="M380 274 L 408 274" />'
    };
    // Speiseröhre
    body += '<path d="M130 66 C 200 60, 300 70, 322 118" fill="none" stroke="#E9DCC8" stroke-width="14" stroke-linecap="round"/>' + text(230, 58, 'Speiseröhre', { size: 11, color: C.soft });
    STOM.forEach(function (b, i) { body += box(b, i); });
    Object.keys(arrows).forEach(function (k) {
      var on = st.path.indexOf(k) >= 0, show = all || on || nums || step >= 0 && STEPS.slice(0, step).some(function (s) { return s.path.indexOf(k) >= 0; });
      if (!show) return;
      var red = k === 'a3';
      body += arrows[k].replace('/>', ' fill="none" stroke="' + (red ? C.red : C.ink) + '" stroke-width="' + (on ? 4 : 2.5) + '" marker-end="url(#' + (red ? 'sb' : 'sa') + ')"' + (on ? '' : ' opacity=".55"') + '/>');
    });
    if (all || step === 3 || step > 3) body += text(118, 120, 'hochwürgen', { size: 11, color: C.red, anchor: 'end' });
    return { svg: svg(480, 300, body, 'Verdauung beim Rind'), legend: nums ? STOM.map(function (b, i) { return { n: i + 1, key: b.k, label: b.label }; }) : null,
      caption: step >= 0 ? (step + 1) + '. ' + STEPS[step].t : 'Schema: Weg der Nahrung beim Rind. Der rote Pfeil zeigt das Hochwürgen zum Wiederkäuen.' };
  }

  // ======================================================================== registry
  var FIGS = { skeleton: skeleton, limbs: limbs, gait: gait, hooves: hooves, jaw: jaw, tree: tree, chart: chart, temp: temp, winter: winter, fov: fov, stomach: stomach };
  function fig(name, opts) {
    var f = FIGS[name];
    if (!f) return { svg: '', legend: null, caption: '' };
    return f(opts || {});
  }
  root.BIO = root.BIO || {};
  root.BIO.fig = fig;
  root.BIO.figs = { names: Object.keys(FIGS), BONES: BONES, FORM: FORM, TNAME: TNAME, STOMACH: STOM, STOMACH_STEPS: STEPS, SKELETONS: Object.keys(SK) };
})(typeof window !== 'undefined' ? window : globalThis);
