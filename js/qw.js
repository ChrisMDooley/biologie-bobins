/*
 * qw.js — one reusable widget per question type.
 *
 *   var w = BIO.qw.make(q, { seed, exam })
 *   w.el            DOM
 *   w.answered()    something entered?
 *   w.grade()       → { score 0..1, ok, spelling:[terms], max (points), pts }
 *   w.show(res, reveal)  mark right/wrong; reveal = also show the right answer
 *   w.reset()       clear for a second try
 *   w.lock()        read-only
 *   w.solution()    the right answer as text (for feedback and exam review)
 *   w.fillRight()   (tests) enter the right answer
 *
 * Types: mc, multi, tf, match, sort, order, fill, text, label, formula, num, mark
 */
(function (root) {
  'use strict';
  var BIO = root.BIO, U = BIO.ui, h = U.h, CK = BIO.check;

  function rng(seed) { var a = seed >>> 0 || 1; return function () { a |= 0; a = a + 0x6D2B79F5 | 0; var t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }

  // points in a mock exam
  function points(q) {
    switch (q.t) {
      case 'mc': case 'num': return 1;
      case 'multi': return 2;
      case 'tf': return Math.ceil(q.s.length / 2);
      case 'match': return Math.ceil(q.p.length / 2);
      case 'sort': return Math.ceil(q.i.length / 3);
      case 'order': return 2;
      case 'fill': return gaps(q.s).length;
      case 'text': return q.need || q.k.length;
      case 'label': return Math.ceil(q.ask.length / 2);
      case 'formula': return 3;
      case 'mark': return 2;
    }
    return 1;
  }
  function gaps(s) { var out = [], re = /\{([^}]+)\}/g, m; while ((m = re.exec(s))) out.push(m[1].split('|')); return out; }

  function media(q) {
    var out = [];
    if (q.read) out.push(h('div', { class: 'reading' }, [U.readBtn(q.read, '🔊 Text vorlesen', 'small')].concat(q.read.split('\n\n').map(function (p) { return h('p', { text: p }); }))));
    if (q.fig && q.t !== 'label') out.push(U.figure(q.fig.n, q.fig.o));
    if (q.tab) out.push(U.table(q.tab));
    return out;
  }

  function make(q, opts) {
    opts = opts || {};
    var r = rng(opts.seed || (Date.now() & 0xffff) + 7), body = h('div', { class: 'qbody' }), w;
    var readText = q.q;
    var maker = TYPES[q.t];
    w = maker(q, body, r);
    var say = function () { return q.q + (w.sayExtra ? '. ' + w.sayExtra() : ''); };
    var hint = { mc: 'Wähle eine Antwort.', multi: 'Wähle ALLE richtigen Antworten.', tf: 'Tippe bei jedem Satz: richtig oder falsch.', match: 'Wähle für jede Zeile die passende Antwort.', sort: 'Tippe ein Kärtchen an und dann die passende Gruppe. (Am Computer kannst du auch ziehen.)',
      order: 'Bring die Kärtchen mit ▲ ▼ (oder Ziehen) in die richtige Reihenfolge.', fill: 'Fülle die Lücken. Kleine Rechtschreibfehler sind okay.', text: 'Schreibe in ganzen Sätzen. Rechtschreibung zählt hier nicht – die Biologie zählt.', label: 'Wähle für jede Nummer den richtigen Namen.',
      formula: 'Trage für eine Kieferhälfte ein: oben Oberkiefer, unten Unterkiefer.', num: 'Gib eine Zahl ein.', mark: 'Tippe die wichtigsten Wörter an.' }[q.t];
    w.el = h('div', { class: 'q q-' + q.t, 'data-q': q.id }, [
      h('div', { class: 'q-top' }, [h('p', { class: 'prompt', rich: q.q }), U.readBtn(say)]),
      hint ? h('p', { class: 'q-hint', text: hint }) : null].concat(media(q)).concat([body]));
    w.max = points(q);
    var g0 = w.grade;
    w.grade = function () { var res = g0(); res.max = w.max; res.pts = Math.round(res.score * w.max * 2) / 2; if (res.ok == null) res.ok = res.score >= 0.999; res.spelling = res.spelling || []; return res; };
    return w;
  }

  function choiceBtn(label, onclick) { return h('button', { class: 'opt', type: 'button', 'aria-pressed': 'false', onclick: onclick }, [h('span', { class: 'opt-mark', 'aria-hidden': 'true' }), h('span', { class: 'opt-t', rich: label })]); }
  function press(b, on) { b.setAttribute('aria-pressed', on ? 'true' : 'false'); b.classList.toggle('on', !!on); }
  function mark(el, ok) { el.classList.remove('is-ok', 'is-no'); if (ok != null) el.classList.add(ok ? 'is-ok' : 'is-no'); }

  var TYPES = {
    // ------------------------------------------------------------ single choice
    mc: function (q, body, r) {
      var opts = U.shuffle([q.a].concat(q.w), r), sel = null, btns = [];
      var list = h('div', { class: 'opts' }, opts.map(function (o) {
        var b = choiceBtn(o, function () { if (list.classList.contains('locked')) return; sel = o; btns.forEach(function (x) { press(x, x === b); }); });
        b._v = o; btns.push(b); return b;
      }));
      body.appendChild(list);
      return {
        answered: function () { return sel != null; },
        grade: function () { return { score: sel === q.a ? 1 : 0 }; },
        show: function (res, reveal) { btns.forEach(function (b) { mark(b, b._v === sel ? b._v === q.a : (reveal && b._v === q.a ? true : null)); }); },
        reset: function () { sel = null; btns.forEach(function (b) { press(b, false); mark(b, null); }); list.classList.remove('locked'); },
        lock: function () { list.classList.add('locked'); },
        solution: function () { return q.a; },
        fillRight: function () { btns.filter(function (b) { return b._v === q.a; })[0].click(); },
        fillWrong: function () { btns.filter(function (b) { return b._v !== q.a; })[0].click(); },
        sayExtra: function () { return 'Antworten: ' + opts.join('. '); }
      };
    },
    // ------------------------------------------------------------ multiple choice
    multi: function (q, body, r) {
      var opts = U.shuffle(q.a.concat(q.w), r), sel = {}, btns = [];
      var list = h('div', { class: 'opts' }, opts.map(function (o) {
        var b = choiceBtn(o, function () { if (list.classList.contains('locked')) return; sel[o] = !sel[o]; press(b, sel[o]); });
        b._v = o; b.classList.add('multi'); btns.push(b); return b;
      }));
      body.appendChild(list);
      function grade() {
        var right = q.a.filter(function (a) { return sel[a]; }).length, wrong = q.w.filter(function (a) { return sel[a]; }).length;
        return { score: Math.max(0, (right - wrong) / q.a.length), ok: right === q.a.length && !wrong };
      }
      return {
        answered: function () { return Object.keys(sel).some(function (k) { return sel[k]; }); }, grade: grade,
        show: function (res, reveal) { btns.forEach(function (b) { var good = q.a.indexOf(b._v) >= 0; mark(b, sel[b._v] ? good : (reveal && good ? true : null)); if (reveal && good && !sel[b._v]) b.classList.add('missed'); }); },
        reset: function () { sel = {}; btns.forEach(function (b) { press(b, false); mark(b, null); b.classList.remove('missed'); }); list.classList.remove('locked'); },
        lock: function () { list.classList.add('locked'); },
        solution: function () { return q.a.join(' · '); },
        fillRight: function () { btns.forEach(function (b) { if (q.a.indexOf(b._v) >= 0) b.click(); }); },
        fillWrong: function () { btns[0].click(); if (q.a.indexOf(btns[0]._v) >= 0) btns.forEach(function (b) { if (q.w.indexOf(b._v) >= 0 && !sel[b._v]) b.click(); }); },
        sayExtra: function () { return 'Antworten: ' + opts.join('. '); }
      };
    },
    // ------------------------------------------------------------ true / false statements
    tf: function (q, body, r) {
      var items = U.shuffle(q.s, r), val = {}, rows = [];
      body.appendChild(h('div', { class: 'tf' }, items.map(function (s, i) {
        var bt = h('button', { class: 'tfb', type: 'button', text: 'richtig' }), bf = h('button', { class: 'tfb', type: 'button', text: 'falsch' });
        var row = h('div', { class: 'tf-row' }, [h('p', { class: 'tf-s', rich: s[0] }), h('div', { class: 'tf-btns' }, [bt, bf])]);
        bt.onclick = function () { if (row.parentNode.classList.contains('locked')) return; val[i] = true; press(bt, true); press(bf, false); };
        bf.onclick = function () { if (row.parentNode.classList.contains('locked')) return; val[i] = false; press(bf, true); press(bt, false); };
        row._s = s; row._i = i; row._b = [bt, bf]; rows.push(row); return row;
      })));
      var box = body.lastChild;
      return {
        answered: function () { return Object.keys(val).length > 0; },
        grade: function () { var n = 0; items.forEach(function (s, i) { if (val[i] === s[1]) n++; }); return { score: n / items.length }; },
        show: function (res, reveal) { rows.forEach(function (row) { var v = val[row._i]; mark(row, v == null ? (reveal ? false : null) : v === row._s[1]); if (reveal) row.setAttribute('data-sol', row._s[1] ? 'richtig' : 'falsch'); }); },
        reset: function () { val = {}; rows.forEach(function (row) { mark(row, null); row.removeAttribute('data-sol'); row._b.forEach(function (b) { press(b, false); }); }); box.classList.remove('locked'); },
        lock: function () { box.classList.add('locked'); },
        solution: function () { return items.map(function (s) { return (s[1] ? '✓ ' : '✗ ') + s[0]; }).join('\n'); },
        fillRight: function () { rows.forEach(function (row) { row._b[row._s[1] ? 0 : 1].click(); }); },
        fillWrong: function () { rows.forEach(function (row) { row._b[row._s[1] ? 1 : 0].click(); }); },
        sayExtra: function () { return items.map(function (s) { return s[0]; }).join('. '); }
      };
    },
    // ------------------------------------------------------------ matching (one select per row)
    match: function (q, body, r) {
      var lefts = U.shuffle(q.p, r), rights = U.shuffle(q.p.map(function (p) { return p[1]; }), r), sels = [];
      body.appendChild(h('div', { class: 'match' }, lefts.map(function (p) {
        var s = h('select', { 'aria-label': p[0] }, [h('option', { value: '', text: '– wählen –' })].concat(rights.map(function (x) { return h('option', { value: x, text: x }); })));
        s._p = p; sels.push(s);
        return h('label', { class: 'm-row' }, [h('span', { class: 'm-left', rich: p[0] }), h('span', { class: 'm-arrow', text: '→' }), s]);
      })));
      return {
        answered: function () { return sels.some(function (s) { return s.value; }); },
        grade: function () { return { score: sels.filter(function (s) { return s.value === s._p[1]; }).length / sels.length }; },
        show: function (res, reveal) { sels.forEach(function (s) { var row = s.parentNode; mark(row, s.value ? s.value === s._p[1] : (reveal ? false : null)); if (reveal && s.value !== s._p[1]) row.setAttribute('data-sol', s._p[1]); }); },
        reset: function () { sels.forEach(function (s) { s.value = ''; s.disabled = false; mark(s.parentNode, null); s.parentNode.removeAttribute('data-sol'); }); },
        lock: function () { sels.forEach(function (s) { s.disabled = true; }); },
        solution: function () { return q.p.map(function (p) { return p[0] + ' → ' + p[1]; }).join('\n'); },
        fillRight: function () { sels.forEach(function (s) { s.value = s._p[1]; }); },
        fillWrong: function () { sels.forEach(function (s, i) { s.value = sels[(i + 1) % sels.length]._p[1]; }); }
      };
    },
    // ------------------------------------------------------------ sort into buckets (tap or drag)
    sort: function (q, body, r) {
      var items = U.shuffle(q.i, r), where = {}, picked = null, chips = [], locked = false;
      var pool = h('div', { class: 'pool', 'data-b': '-1' });
      var buckets = q.b.map(function (name, bi) {
        var zone = h('div', { class: 'bucket-zone', 'data-b': String(bi) });
        var b = h('div', { class: 'bucket', 'data-b': String(bi), role: 'button', tabindex: '0', 'aria-label': 'Gruppe ' + name }, [h('div', { class: 'bucket-h', text: name }), zone]);
        b.onclick = function () { drop(bi); };
        b.onkeydown = function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); drop(bi); } };
        dz(b, bi); b._zone = zone; return b;
      });
      pool.onclick = function (e) { if (!e.target.closest('.chip')) drop(-1); };
      dz(pool, -1);
      items.forEach(function (it, i) {
        var c = h('button', { class: 'chip', type: 'button', draggable: 'true', text: it[0] });
        c._i = i; c._it = it;
        c.onclick = function (e) { e.stopPropagation(); if (locked) return; if (picked && picked !== c && where[c._i] != null) { drop(where[c._i]); return; } if (picked === c) { c.classList.remove('picked'); picked = null; return; } if (picked) picked.classList.remove('picked'); picked = c; c.classList.add('picked'); };
        c.ondragstart = function (e) { if (locked) return e.preventDefault(); picked = c; c.classList.add('picked'); try { e.dataTransfer.setData('text/plain', String(i)); } catch (x) { /* ignore */ } };
        chips.push(c); pool.appendChild(c);
      });
      function dz(el, bi) {
        el.ondragover = function (e) { e.preventDefault(); el.classList.add('over'); };
        el.ondragleave = function () { el.classList.remove('over'); };
        el.ondrop = function (e) { e.preventDefault(); el.classList.remove('over'); drop(bi); };
      }
      function drop(bi) {
        if (!picked || locked) return;
        var c = picked; picked.classList.remove('picked'); picked = null;
        if (bi < 0) { delete where[c._i]; pool.appendChild(c); } else { where[c._i] = bi; buckets[bi]._zone.appendChild(c); }
      }
      body.appendChild(h('div', { class: 'sorter' }, [pool, h('div', { class: 'buckets b' + q.b.length }, buckets)]));
      return {
        answered: function () { return Object.keys(where).length > 0; },
        grade: function () { var n = 0; items.forEach(function (it, i) { if (where[i] === it[1]) n++; }); return { score: n / items.length }; },
        show: function (res, reveal) { chips.forEach(function (c) { var w = where[c._i]; mark(c, w == null ? (reveal ? false : null) : w === c._it[1]); if (reveal && w !== c._it[1]) c.setAttribute('data-sol', '→ ' + q.b[c._it[1]]); }); },
        reset: function () { where = {}; locked = false; chips.forEach(function (c) { mark(c, null); c.removeAttribute('data-sol'); pool.appendChild(c); }); },
        lock: function () { locked = true; },
        solution: function () { return q.b.map(function (b, bi) { return b + ': ' + q.i.filter(function (it) { return it[1] === bi; }).map(function (it) { return it[0]; }).join(', '); }).join('\n'); },
        fillRight: function () { chips.forEach(function (c) { picked = c; drop(c._it[1]); }); },
        fillWrong: function () { chips.forEach(function (c) { picked = c; drop((c._it[1] + 1) % q.b.length); }); }
      };
    },
    // ------------------------------------------------------------ ordering
    order: function (q, body, r) {
      var cur = U.shuffle(q.i, r), locked = false, dragFrom = null;
      if (cur.join('|') === q.i.join('|')) cur = cur.slice(1).concat(cur[0]);
      var list = h('ol', { class: 'order' });
      function draw() {
        list.innerHTML = '';
        cur.forEach(function (it, i) {
          var li = h('li', { class: 'ord', draggable: 'true' }, [h('span', { class: 'ord-n', text: String(i + 1) }), h('span', { class: 'ord-t', text: it }),
            h('span', { class: 'ord-btns' }, [h('button', { class: 'ob', type: 'button', 'aria-label': 'nach oben', text: '▲', disabled: i === 0 || locked ? true : null, onclick: function () { mv(i, -1); } }),
              h('button', { class: 'ob', type: 'button', 'aria-label': 'nach unten', text: '▼', disabled: i === cur.length - 1 || locked ? true : null, onclick: function () { mv(i, 1); } })])]);
          li._t = it; li._i = i;
          li.ondragstart = function () { if (locked) return false; dragFrom = i; };
          li.ondragover = function (e) { e.preventDefault(); };
          li.ondrop = function (e) { e.preventDefault(); if (dragFrom == null || locked) return; var x = cur.splice(dragFrom, 1)[0]; cur.splice(i, 0, x); dragFrom = null; touched = true; draw(); };
          list.appendChild(li);
        });
      }
      var touched = false;
      function mv(i, d) { if (locked) return; var x = cur[i]; cur[i] = cur[i + d]; cur[i + d] = x; touched = true; draw(); }
      draw(); body.appendChild(list);
      return {
        answered: function () { return touched; },
        grade: function () { var n = cur.filter(function (x, i) { return q.i[i] === x; }).length; return { score: n === cur.length ? 1 : n / cur.length * 0.8, ok: n === cur.length }; },
        show: function (res, reveal) { [].forEach.call(list.children, function (li) { mark(li, q.i[li._i] === li._t); if (reveal && q.i[li._i] !== li._t) li.setAttribute('data-sol', 'richtig: ' + (q.i.indexOf(li._t) + 1)); }); },
        reset: function () { locked = false; touched = false; cur = U.shuffle(q.i, r); draw(); },
        lock: function () { locked = true; draw(); },
        solution: function () { return q.i.map(function (x, i) { return (i + 1) + '. ' + x; }).join('\n'); },
        fillRight: function () { cur = q.i.slice(); touched = true; draw(); },
        fillWrong: function () { cur = q.i.slice().reverse(); touched = true; draw(); },
        sayExtra: function () { return cur.join('. '); }
      };
    },
    // ------------------------------------------------------------ fill in the blanks (typed, spelling-tolerant; or word bank)
    fill: function (q, body, r) {
      var G = gaps(q.s), inputs = [], parts = q.s.split(/\{[^}]+\}/), all = [].concat.apply([], G);
      var bank = q.bank ? U.shuffle(q.bank.concat(G.map(function (g) { return g[0]; }).filter(function (x) { return q.bank.indexOf(x) < 0; })), r) : null;
      var line = h('p', { class: 'fill' });
      parts.forEach(function (p, i) {
        line.appendChild(U.rich(p));
        if (i < G.length) {
          var inp = bank ? h('select', { class: 'gap', 'aria-label': 'Lücke ' + (i + 1) }, [h('option', { value: '', text: '……' })].concat(bank.map(function (b) { return h('option', { value: b, text: b }); })))
            : h('input', { class: 'gap', type: 'text', autocomplete: 'off', autocapitalize: 'off', spellcheck: 'false', 'aria-label': 'Lücke ' + (i + 1), size: Math.max(6, G[i][0].length + 1) });
          inp._g = G[i]; inputs.push(inp);
          line.appendChild(h('span', { class: 'gapw' }, [inp]));
        }
      });
      body.appendChild(line);
      var last = null;
      function judgeAll() {
        var used = {}, res = inputs.map(function (inp, i) {
          var acc = inp._g;
          if (q.anyOrder) { var pool = G.filter(function (g, k) { return !used[k]; }); var best = null, bk = -1;
            G.forEach(function (g, k) { if (used[k]) return; var j = CK.judge(inp.value, g, []); if (j.v === 'right' || (j.v === 'spelling' && (!best || best.v !== 'right'))) { if (!best || j.v === 'right') { best = j; bk = k; } } });
            if (best && bk >= 0) { used[bk] = 1; return best; } return { v: inp.value ? 'wrong' : 'empty', target: pool.length ? pool[0][0] : acc[0] }; }
          var others = all.filter(function (x) { return acc.indexOf(x) < 0; });
          return CK.judge(inp.value, acc, others);
        });
        last = res; return res;
      }
      return {
        answered: function () { return inputs.some(function (i) { return i.value.trim(); }); },
        grade: function () { var res = judgeAll(), ok = res.filter(function (x) { return x.v === 'right' || x.v === 'spelling'; }).length;
          return { score: ok / inputs.length, spelling: res.filter(function (x) { return x.v === 'spelling'; }).map(function (x) { return x.target; }) }; },
        show: function (res, reveal) { var j = last || judgeAll(); inputs.forEach(function (inp, i) { var w = inp.parentNode, v = j[i].v; mark(w, v === 'empty' ? (reveal ? false : null) : v !== 'wrong');
          w.classList.toggle('is-sp', v === 'spelling'); w.removeAttribute('data-sol');
          if (v === 'spelling') w.setAttribute('data-sol', '✎ ' + j[i].target); else if (reveal && v !== 'right') w.setAttribute('data-sol', j[i].target); }); },
        reset: function () { inputs.forEach(function (inp) { if (inp.parentNode.classList.contains('is-ok')) return; inp.value = ''; inp.disabled = false; mark(inp.parentNode, null); inp.parentNode.removeAttribute('data-sol'); }); },
        lock: function () { inputs.forEach(function (i) { i.disabled = true; }); },
        solution: function () { var k = 0; return q.s.replace(/\{([^}]+)\}/g, function (m, g) { return '[' + g.split('|')[0] + ']'; }); },
        fillRight: function () { inputs.forEach(function (i) { i.value = i._g[0]; }); },
        fillWrong: function () { inputs.forEach(function (i) { i.value = bank ? bank.filter(function (b) { return i._g.indexOf(b) < 0; })[0] : 'xyzq'; }); },
        fillSpelling: function () { inputs.forEach(function (i) { var t = i._g[0]; i.value = t.length > 5 ? t.slice(0, 2) + t[3] + t[2] + t.slice(4) : t; }); }
      };
    },
    // ------------------------------------------------------------ written answer: key ideas + honest self-check
    text: function (q, body) {
      var ta = h('textarea', { class: 'ta', rows: 4, 'aria-label': 'Deine Antwort', spellcheck: 'false' });
      var check = h('div', { class: 'selfcheck', hidden: true });
      var need = q.need || q.k.length, ticks = null, boxes = [];
      body.appendChild(ta); body.appendChild(check);
      function auto() { return CK.keys(ta.value, q.k); }
      function drawCheck(editable) {
        if (!ticks) ticks = auto();
        check.hidden = false; check.innerHTML = ''; boxes = [];
        check.appendChild(h('p', { class: 'sc-h', text: editable ? 'Vergleiche mit der Musterlösung. Hake ehrlich ab, was in deiner Antwort steht (Robin hat schon vorgeschlagen):' : 'Diese Punkte gehören in eine gute Antwort:' }));
        check.appendChild(h('ul', { class: 'sc-list' }, q.k.map(function (k, i) {
          var cb = h('input', { type: 'checkbox' }); cb.checked = !!ticks[i]; cb.disabled = !editable;
          cb.onchange = function () { ticks[i] = cb.checked; if (onTick) onTick(); }; boxes.push(cb);
          return h('li', {}, [h('label', {}, [cb, h('span', { text: k.l })])]);
        })));
        check.appendChild(h('div', { class: 'model' }, [h('b', { text: 'Musterlösung: ' }), h('span', { text: q.m }), U.readBtn(q.m, '🔊', 'small')]));
        check.appendChild(h('p', { class: 'note', text: 'Für volle Punkte: ' + need + ' von ' + q.k.length + ' Punkten. Rechtschreibung zählt hier nicht.' }));
      }
      var onTick = null;
      return {
        selfCheck: true,
        answered: function () { return ta.value.trim().length > 2; },
        startCheck: function (cb) { onTick = cb; ticks = auto(); ta.disabled = true; drawCheck(true); },
        grade: function () { var t = ticks || auto(); var n = t.filter(Boolean).length; return { score: Math.min(1, n / need), ticks: t.slice(), auto: auto() }; },
        show: function (res, reveal) { drawCheck(!!(res && res.editable)); mark(ta, res ? res.score >= 0.999 : null); },
        reset: function () { ta.disabled = false; check.hidden = true; ticks = null; mark(ta, null); },
        lock: function () { ta.disabled = true; },
        setTicks: function (t) { ticks = t.slice(); },
        solution: function () { return q.m; },
        value: function () { return ta.value; },
        fillRight: function () { ta.value = q.m; },
        fillWrong: function () { ta.value = 'weiß ich nicht'; }
      };
    },
    // ------------------------------------------------------------ diagram labelling
    label: function (q, body, r) {
      var opts = q.fig.o || {}, f, order = null;
      if (q.fig.n === 'skeleton') { order = U.shuffle(BIO.figs.BONES.map(function (b, i) { return i; }), r); opts = Object.assign({}, opts, { order: order }); }
      f = BIO.fig(q.fig.n, opts);
      var legend = f.legend.filter(function (l) { return q.ask.indexOf(l.key) >= 0; });
      var names = U.shuffle(legend.map(function (l) { return l.short || l.label; }), r), sels = [];
      body.appendChild(h('figure', { class: 'figbox' }, [U.zoomable(h('div', { class: 'figsvg', html: f.svg })), h('figcaption', { text: (f.caption || '') + ' Tipp: Bild antippen = größer.' })]));
      body.appendChild(h('div', { class: 'labels' }, legend.map(function (l) {
        var s = h('select', { 'aria-label': 'Nummer ' + l.n }, [h('option', { value: '', text: '– wählen –' })].concat(names.map(function (n) { return h('option', { value: n, text: n }); })));
        s._l = l; sels.push(s);
        return h('label', { class: 'lab-row' }, [h('span', { class: 'num', text: String(l.n) }), s]);
      })));
      function good(s) { return s.value === (s._l.short || s._l.label); }
      return {
        answered: function () { return sels.some(function (s) { return s.value; }); },
        grade: function () { return { score: sels.filter(good).length / sels.length }; },
        show: function (res, reveal) { sels.forEach(function (s) { var row = s.parentNode; mark(row, s.value ? good(s) : (reveal ? false : null)); if (reveal && !good(s)) row.setAttribute('data-sol', s._l.short || s._l.label); }); },
        reset: function () { sels.forEach(function (s) { if (good(s)) return; s.value = ''; s.disabled = false; mark(s.parentNode, null); s.parentNode.removeAttribute('data-sol'); }); },
        lock: function () { sels.forEach(function (s) { s.disabled = true; }); },
        solution: function () { return legend.map(function (l) { return l.n + ' = ' + (l.short || l.label); }).join(' · '); },
        fillRight: function () { sels.forEach(function (s) { s.value = s._l.short || s._l.label; }); },
        fillWrong: function () { sels.forEach(function (s, i) { var o = sels[(i + 1) % sels.length]._l; s.value = o.short || o.label; }); }
      };
    },
    // ------------------------------------------------------------ dental formula
    formula: function (q, body) {
      var f = BIO.figs.FORM[q.animal], cells = { up: [], lo: [] }, total;
      function box(lbl) { return h('input', { class: 'fbox', type: 'text', inputmode: 'numeric', maxlength: 2, autocomplete: 'off', 'aria-label': lbl }); }
      var head = h('tr', {}, [h('th', { text: '' })].concat(['I', 'C', 'P', 'M'].map(function (t, i) { return h('th', {}, [h('b', { text: t }), h('small', { text: ['Schneidez.', 'Eckzahn', 'Vorbackenz.', 'Backenz.'][i] })]); })));
      var rows = ['up', 'lo'].map(function (k) {
        return h('tr', {}, [h('th', { text: k === 'up' ? 'Oberkiefer' : 'Unterkiefer' })].concat([0, 1, 2, 3].map(function (i) { var b = box((k === 'up' ? 'Oberkiefer ' : 'Unterkiefer ') + ['I', 'C', 'P', 'M'][i]); cells[k].push(b); return h('td', {}, [b]); })));
      });
      total = h('input', { class: 'fbox wide', type: 'text', inputmode: 'numeric', maxlength: 3, 'aria-label': 'Zähne insgesamt' });
      body.appendChild(h('div', { class: 'formula' }, [h('table', { class: 'ft' }, [h('thead', {}, [head]), h('tbody', {}, rows)]),
        h('p', { class: 'ftotal' }, [h('span', { text: 'Zähne insgesamt: (oben + unten) × 2 = ' }), total])]));
      function n(b) { var v = parseInt(b.value, 10); return isNaN(v) ? null : v; }
      function rowOk(k) { return cells[k].every(function (b, i) { return n(b) === f[k][i]; }); }
      var sum = (f.up.reduce(function (a, b) { return a + b; }, 0) + f.lo.reduce(function (a, b) { return a + b; }, 0)) * 2;
      return {
        answered: function () { return cells.up.concat(cells.lo, [total]).some(function (b) { return b.value.trim(); }); },
        grade: function () { var s = (rowOk('up') ? 1 : 0) + (rowOk('lo') ? 1 : 0) + (n(total) === sum ? 1 : 0); return { score: s / 3 }; },
        show: function (res, reveal) {
          ['up', 'lo'].forEach(function (k) { cells[k].forEach(function (b, i) { mark(b, n(b) === f[k][i]); if (reveal && n(b) !== f[k][i]) b.parentNode.setAttribute('data-sol', String(f[k][i])); }); });
          mark(total, n(total) === sum); if (reveal && n(total) !== sum) total.parentNode.setAttribute('data-sol', String(sum));
        },
        reset: function () { cells.up.concat(cells.lo, [total]).forEach(function (b) { if (b.classList.contains('is-ok')) return; b.value = ''; b.disabled = false; mark(b, null); b.parentNode.removeAttribute('data-sol'); }); },
        lock: function () { cells.up.concat(cells.lo, [total]).forEach(function (b) { b.disabled = true; }); },
        solution: function () { return 'oben ' + f.up.join(' ') + ' · unten ' + f.lo.join(' ') + ' → ' + sum + ' Zähne'; },
        fillRight: function () { ['up', 'lo'].forEach(function (k) { cells[k].forEach(function (b, i) { b.value = f[k][i]; }); }); total.value = sum; },
        fillWrong: function () { cells.up.forEach(function (b) { b.value = '1'; }); total.value = '10'; }
      };
    },
    // ------------------------------------------------------------ number
    num: function (q, body) {
      var inp = h('input', { class: 'nbox', type: 'text', inputmode: 'decimal', autocomplete: 'off', 'aria-label': 'Zahl' });
      body.appendChild(h('p', { class: 'numrow' }, [inp, q.unit ? h('span', { text: ' ' + q.unit }) : null]));
      function ok() { var v = CK.num(inp.value); return v != null && Math.abs(v - q.a) <= (q.tol || 0); }
      return {
        answered: function () { return inp.value.trim() !== ''; },
        grade: function () { return { score: ok() ? 1 : 0 }; },
        show: function (res, reveal) { mark(inp, ok()); if (reveal && !ok()) inp.parentNode.setAttribute('data-sol', String(q.a) + (q.unit ? ' ' + q.unit : '')); },
        reset: function () { inp.value = ''; inp.disabled = false; mark(inp, null); inp.parentNode.removeAttribute('data-sol'); },
        lock: function () { inp.disabled = true; },
        solution: function () { return q.a + (q.unit ? ' ' + q.unit : ''); },
        fillRight: function () { inp.value = String(q.a); },
        fillWrong: function () { inp.value = String(q.a + 5); }
      };
    },
    // ------------------------------------------------------------ mark key words in a text
    mark: function (q, body) {
      var tokens = [], box = h('p', { class: 'marktext' }), locked = false;
      q.s.replace(/\[([^\]]+)\]|([^\s[\]]+)|(\s+)/g, function (m, key, word, sp) {
        if (sp) { box.appendChild(document.createTextNode(' ')); return m; }
        var raw = key || word, clean = raw.replace(/[.,:;!?–]+$/, ''), tail = raw.slice(clean.length);
        var b = h('button', { class: 'tok', type: 'button', text: clean }); b._key = !!key; b._on = false;
        b.onclick = function () { if (locked) return; b._on = !b._on; b.classList.toggle('on', b._on); };
        tokens.push(b); box.appendChild(b); if (tail) box.appendChild(document.createTextNode(tail));
        return m;
      });
      var counter = h('p', { class: 'note' });
      body.appendChild(box); body.appendChild(counter);
      function stat() { var hit = 0, wrong = 0; tokens.forEach(function (t) { if (t._on) { if (t._key) hit++; else wrong++; } }); return { hit: hit, wrong: wrong }; }
      return {
        answered: function () { return tokens.some(function (t) { return t._on; }); },
        grade: function () { var s = stat(), want = q.min || 4; return { score: Math.max(0, Math.min(1, (Math.min(s.hit, q.max || 6) - 0.5 * s.wrong) / want)), ok: s.hit >= want && s.wrong <= 1 && s.hit + s.wrong <= (q.max || 6) + 1 }; },
        show: function (res, reveal) { tokens.forEach(function (t) { if (t._on) mark(t, t._key); else if (reveal && t._key) t.classList.add('missed'); }); var s = stat(); counter.textContent = s.hit + ' Schlüsselwörter getroffen' + (s.wrong ? ', ' + s.wrong + ' weniger wichtige Wörter markiert' : '') + '.'; },
        reset: function () { locked = false; tokens.forEach(function (t) { t._on = false; t.classList.remove('on', 'missed'); mark(t, null); }); counter.textContent = ''; },
        lock: function () { locked = true; },
        solution: function () { return tokens.filter(function (t) { return t._key; }).map(function (t) { return t.textContent; }).join(', '); },
        fillRight: function () { var n = 0; tokens.forEach(function (t) { if (t._key && n < (q.min || 4)) { t._on = true; t.classList.add('on'); n++; } }); },
        fillWrong: function () { tokens.slice(0, 3).forEach(function (t) { if (!t._key) { t._on = true; t.classList.add('on'); } }); }
      };
    }
  };

  BIO.qw = { make: make, points: points, gaps: gaps, types: Object.keys(TYPES) };
})(typeof window !== 'undefined' ? window : globalThis);
