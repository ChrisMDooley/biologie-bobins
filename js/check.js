/*
 * check.js — spelling-tolerant checking for typed answers (no DOM).
 *
 * Lukas has LRS. A biologically right answer with a spelling slip is NOT wrong:
 *   judge('Panssen', ['Pansen'])           → { v: 'spelling', target: 'Pansen' }
 * But a different technical term is wrong, even when it looks similar:
 *   judge('Paarhufer', ['Unpaarhufer'])     → { v: 'wrong' }   (Paarhufer is a rival term)
 *
 * Verdicts: 'right' (exact, ignoring case/umlaut spelling), 'spelling' (counts as right, the
 * correct spelling is shown and the term goes into the Fachwörter training), 'wrong'.
 */
(function (root) {
  'use strict';

  // Terms that must never be accepted for each other, however close the spelling.
  var RIVALS = [
    ['Paarhufer', 'Unpaarhufer'], ['Winterruhe', 'Winterschlaf', 'Winterstarre'], ['wechselwarm', 'gleichwarm'],
    ['Nesthocker', 'Nestflüchter'], ['Zehengänger', 'Zehenspitzengänger', 'Sohlengänger'], ['Elle', 'Speiche'],
    ['Schienbein', 'Wadenbein'], ['Oberarmknochen', 'Oberschenkelknochen'], ['Handwurzelknochen', 'Fußwurzelknochen'],
    ['Mittelhandknochen', 'Mittelfußknochen'], ['Fingerknochen', 'Zehenknochen'],
    ['Schneidezahn', 'Eckzahn', 'Backenzahn', 'Vorbackenzahn', 'Reißzahn', 'Nagezahn'],
    ['Schneidezähne', 'Eckzähne', 'Backenzähne', 'Vorbackenzähne', 'Reißzähne', 'Nagezähne'],
    ['Pansen', 'Netzmagen', 'Blättermagen', 'Labmagen'], ['Haustier', 'Nutztier', 'Heimtier'],
    ['Haustiere', 'Nutztiere', 'Heimtiere'], ['Amphibien', 'Reptilien'], ['Kiemen', 'Lungen'],
    ['Hetzjäger', 'Lauerjäger', 'Schleichjäger'], ['Schulterblatt', 'Becken'], ['Halswirbel', 'Brustwirbel', 'Lendenwirbel', 'Schwanzwirbel'],
    ['homolog', 'analog'], ['Homologie', 'Analogie'], ['Fische', 'Vögel'], ['Säugetiere', 'Vögel']
  ];

  function norm(s) {
    return String(s == null ? '' : s).toLowerCase()
      .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
      .replace(/[^a-z0-9]+/g, '');
  }

  // Damerau-Levenshtein (optimal string alignment)
  function dl(a, b) {
    var n = a.length, m = b.length, d = [], i, j;
    if (!n) return m; if (!m) return n;
    for (i = 0; i <= n; i++) { d[i] = [i]; }
    for (j = 0; j <= m; j++) d[0][j] = j;
    for (i = 1; i <= n; i++) for (j = 1; j <= m; j++) {
      var c = a[i - 1] === b[j - 1] ? 0 : 1;
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + c);
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
    }
    return d[n][m];
  }

  // "Kölner Phonetik" — German sound code: Pfote/Fote, Reh/Re, Wirbel/Wierbel sound alike.
  function phon(s) {
    s = String(s || '').toLowerCase().replace(/ä/g, 'a').replace(/ö/g, 'o').replace(/ü/g, 'u').replace(/ß/g, 's').replace(/ph/g, 'f').replace(/[^a-z]/g, '');
    var out = '', prev = '';
    for (var i = 0; i < s.length; i++) {
      var c = s[i], p = s[i - 1] || '', nx = s[i + 1] || '', code;
      if ('aeijouy'.indexOf(c) >= 0) code = '0';
      else if (c === 'h') code = '-';
      else if (c === 'b') code = '1';
      else if (c === 'p') code = nx === 'h' ? '3' : '1';
      else if (c === 'd' || c === 't') code = 'csz'.indexOf(nx) >= 0 ? '8' : '2';
      else if ('fvw'.indexOf(c) >= 0) code = '3';
      else if ('gkq'.indexOf(c) >= 0) code = '4';
      else if (c === 'c') code = (i === 0 ? 'ahkloqrux' : 'ahkoqux').indexOf(nx) >= 0 && 'sz'.indexOf(p) < 0 ? '4' : '8';
      else if (c === 'x') code = 'ckq'.indexOf(p) >= 0 ? '8' : '48';
      else if (c === 'l') code = '5';
      else if (c === 'm' || c === 'n') code = '6';
      else if (c === 'r') code = '7';
      else if (c === 's' || c === 'z') code = '8';
      else code = '';
      if (code === '-') continue;
      if (code !== prev) out += code;
      prev = code;
    }
    return out.charAt(0) + out.slice(1).replace(/0/g, '');
  }

  function tol(len) { return len <= 3 ? 0 : len <= 5 ? 1 : len <= 9 ? 2 : 3; }

  function rivalsOf(word) {
    var w = norm(word), out = [];
    RIVALS.forEach(function (g) {
      var hit = g.some(function (x) { return norm(x) === w; });
      if (hit) g.forEach(function (x) { if (norm(x) !== w) out.push(x); });
    });
    return out;
  }

  /*
   * judge(input, accepted, extraRivals)
   *   accepted: list of right answers (first one = the spelling we teach)
   *   extraRivals: other answers in the same task (wrong here) — never accepted
   */
  function judge(input, accepted, extraRivals) {
    var x = norm(input);
    if (!x) return { v: 'empty', target: accepted[0] };
    var acc = accepted.map(norm), i;
    for (i = 0; i < acc.length; i++) if (acc[i] === x) return { v: 'right', target: accepted[i] };
    var rivals = [];
    accepted.forEach(function (a) { rivals = rivals.concat(rivalsOf(a)); });
    rivals = rivals.concat(extraRivals || []).map(norm).filter(function (r) { return acc.indexOf(r) < 0; });
    if (rivals.indexOf(x) >= 0) return { v: 'wrong', target: accepted[0], rival: true };
    var best = Infinity, bi = 0;
    for (i = 0; i < acc.length; i++) { var dd = dl(x, acc[i]); if (dd < best) { best = dd; bi = i; } }
    var rbest = rivals.reduce(function (m, r) { return Math.min(m, dl(x, r)); }, Infinity);
    var ok = best <= tol(acc[bi].length) || (phon(input) === phon(accepted[bi]) && best <= tol(acc[bi].length) + 1);
    if (ok && best < rbest) return { v: 'spelling', target: accepted[bi] };
    return { v: 'wrong', target: accepted[0] };
  }

  // Key ideas in a written answer. key = { label, any: ['stem', 'other stem', 'two words'] }
  function words(s) { return String(s || '').toLowerCase().split(/[^a-zäöüß0-9-]+/).map(norm).filter(Boolean); }
  function hasStem(ws, stem) {
    var parts = stem.split(/\s+/).map(norm).filter(Boolean);
    return parts.every(function (p) {
      return ws.some(function (w) {
        if (w.indexOf(p) === 0) return true;
        if (p.length >= 5 && w.indexOf(p) > 0) return true;        // compound words: "Fettreserve" contains "reserve"
        if (p.length < 5) return false;
        var t = p.length >= 8 ? 2 : 1;
        return dl(w.slice(0, p.length), p) <= t || dl(w, p) <= t;
      });
    });
  }
  function keys(input, keyList) {
    var ws = words(input);
    return keyList.map(function (k) { return (k.a || k.any).some(function (s) { return hasStem(ws, s); }); });
  }

  // Number in a typed answer ("42", "42 Zähne")
  function num(input) { var m = /-?\d+([.,]\d+)?/.exec(String(input || '')); return m ? parseFloat(m[0].replace(',', '.')) : null; }

  root.BIO = root.BIO || {};
  root.BIO.check = { norm: norm, dl: dl, phon: phon, judge: judge, keys: keys, num: num, rivalsOf: rivalsOf };
})(typeof window !== 'undefined' ? window : globalThis);
