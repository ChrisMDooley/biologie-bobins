/*
 * session.js — which questions come next (no DOM).
 *   BIO.session.pick(progress, { objs, n, mode })   practice / weakness / blitz rounds
 *   BIO.session.exam(progress, minutes)              mock exam (Lernkontrolle simulieren)
 *   BIO.session.next(progress)                       "Was soll ich als Nächstes lernen?"
 *   BIO.session.followUp(progress, q, used)          another question on the same objective (after a mistake)
 */
(function (root) {
  'use strict';
  var BIO = root.BIO, C = BIO.curriculum;
  function Q() { return C.questions; }
  function byObj(o) { return Q().filter(function (q) { return q.o === o; }); }
  function rnd() { return Math.random(); }
  function wpick(list, wf) {
    var tot = 0, ws = list.map(function (x) { var w = Math.max(0.0001, wf(x)); tot += w; return w; }), r = rnd() * tot;
    for (var i = 0; i < list.length; i++) { r -= ws[i]; if (r <= 0) return list[i]; }
    return list[list.length - 1];
  }
  function recentIds(pr, n) { var a = pr.doc.answers, out = {}; for (var i = Math.max(0, a.length - (n || 40)); i < a.length; i++) out[a[i].q] = (out[a[i].q] || 0) + 1; return out; }
  function lastScore(pr) { var m = {}; pr.doc.answers.forEach(function (a) { m[a.q] = a.s; }); return m; }

  function pick(pr, opts) {
    opts = opts || {};
    var n = opts.n || 10, objs = opts.objs || C.objectives.map(function (o) { return o.id; }), mode = opts.mode || 'ueben';
    var recent = recentIds(pr, 40), last = lastScore(pr), wrong = pr.doc.wrong, due = pr.dueWrong();
    var pool = Q().filter(function (q) { return objs.indexOf(q.o) >= 0; });
    if (mode === 'blitz') pool = pool.filter(function (q) { return q.t !== 'text' && q.t !== 'label' && q.t !== 'mark'; });
    var chosen = [], used = {}, typeCount = {}, objCount = {};
    // 1. due mistakes first (weakness mode: up to all; others: up to 3)
    var dueQs = due.map(function (id) { return Q().filter(function (q) { return q.id === id; })[0]; }).filter(function (q) { return q && objs.indexOf(q.o) >= 0 && pool.indexOf(q) >= 0; });
    dueQs.slice(0, mode === 'schwach' ? Math.ceil(n * 0.6) : 3).forEach(add);
    var mast = {}; objs.forEach(function (o) { mast[o] = pr.mastery(o); });
    while (chosen.length < n) {
      var cand = pool.filter(function (q) { return !used[q.id]; });
      if (!cand.length) break;
      var q = wpick(cand, function (q) {
        var w = 1;
        w *= 0.3 + (1 - mast[q.o]) * (mode === 'schwach' || mode === 'blitz' ? 2.5 : 1.2);
        if (recent[q.id]) w *= 0.15;
        if (last[q.id] != null) w *= last[q.id] < 0.6 ? 2.2 : 0.6; else w *= 1.4;   // unseen questions are welcome
        if (wrong[q.id]) w *= 2;
        w /= 1 + (typeCount[q.t] || 0) * 0.7;                                          // vary the formats
        w /= 1 + (objCount[q.o] || 0) * (objs.length > 1 ? 1.2 : 0.1);                 // vary the objectives
        if (opts.level && q.lv > opts.level) w *= 0.4;
        return w;
      });
      add(q);
    }
    function add(q) { if (used[q.id]) return; used[q.id] = 1; chosen.push(q); typeCount[q.t] = (typeCount[q.t] || 0) + 1; objCount[q.o] = (objCount[q.o] || 0) + 1; }
    // easier first, but keep it mixed
    return chosen.sort(function (a, b) { return (a.lv || 2) - (b.lv || 2) + (rnd() - 0.5) * 1.5; });
  }

  function followUp(pr, q, used) {
    var same = byObj(q.o).filter(function (x) { return x.id !== q.id && !used[x.id] && x.t !== q.t; });
    if (!same.length) same = byObj(q.o).filter(function (x) { return x.id !== q.id && !used[x.id]; });
    if (!same.length) return null;
    var easy = same.filter(function (x) { return (x.lv || 2) <= (q.lv || 2); });
    var list = easy.length ? easy : same;
    return list[Math.floor(rnd() * list.length)];
  }

  // ---------------------------------------------------------------- mock exam
  var EXAM = { 20: { objs: 11, text: 1 }, 30: { objs: 16, text: 2 }, 45: { objs: 24, text: 3 } };
  var MUST = [12, 7, 10, 20, 23];                  // dental formula, skeleton, skulls, rumination, data
  function exam(pr, minutes) {
    var cfg = EXAM[minutes] || EXAM[30], all = C.objectives.map(function (o) { return o.id; });
    var objs = MUST.slice(0, cfg.objs);
    var rest = all.filter(function (o) { return objs.indexOf(o) < 0; });
    while (objs.length < cfg.objs && rest.length) {
      var o = wpick(rest, function (o) { return 0.5 + (1 - pr.mastery(o)); });
      objs.push(o); rest.splice(rest.indexOf(o), 1);
    }
    objs.sort(function (a, b) { return a - b; });
    var recent = recentIds(pr, 60), qs = [], tc = {}, texts = 0;
    var forced = { 12: 'formula', 7: 'label' };
    objs.forEach(function (o, i) {
      var cand = byObj(o).filter(function (q) { return q.t !== 'mark' && (!forced[o] || q.t === forced[o]); });
      var wantText = texts < cfg.text && (i % Math.max(1, Math.floor(objs.length / cfg.text)) === 0);
      var q = wpick(cand, function (q) {
        var w = 1;
        if (forced[o]) w *= q.t === forced[o] ? 6 : 0.3;
        if (wantText) w *= q.t === 'text' ? 5 : 0.6; else if (q.t === 'text') w *= texts >= cfg.text ? 0.05 : 0.8;
        w /= 1 + (tc[q.t] || 0) * 0.8;
        if (recent[q.id]) w *= 0.4;
        w *= (q.lv || 2) >= 2 ? 1.3 : 0.8;
        return w;
      });
      if (q.t === 'text') texts++;
      tc[q.t] = (tc[q.t] || 0) + 1; qs.push(q);
    });
    // make sure there are enough written justifications
    for (var guard = 0; texts < cfg.text && guard < 30; guard++) {
      var k2 = Math.floor(rnd() * qs.length), oq = qs[k2];
      if (forced[oq.o] || oq.t === 'text') continue;
      var tq = byObj(oq.o).filter(function (q) { return q.t === 'text'; });
      if (!tq.length) continue;
      qs[k2] = tq[Math.floor(rnd() * tq.length)]; texts++;
    }
    // 45 minutes: a few extra tasks so it really fills the time
    if (minutes === 45) {
      var extra = Q().filter(function (q) { return qs.indexOf(q) < 0 && (q.t === 'text' || q.t === 'label' || q.t === 'formula' || q.t === 'sort') && [7, 12, 14, 19, 22].indexOf(q.o) >= 0; });
      for (var k = 0; k < 3 && extra.length; k++) { var e = extra.splice(Math.floor(rnd() * extra.length), 1)[0]; qs.push(e); }
      qs.sort(function (a, b) { return a.o - b.o; });
    }
    return qs;
  }

  // ---------------------------------------------------------------- recommendation
  function next(pr) {
    var objs = C.objectives, stats = objs.map(function (o) { return pr.stats(o.id); });
    var due = pr.dueWrong();
    if (due.length >= 3) return { kind: 'schwach', text: 'Du hast ' + due.length + ' Fehler, die jetzt wiederholt werden sollten. Trainiere deine Schwächen!', route: 'schwach' };
    // lesson read, but hardly practised
    var thin = stats.filter(function (s) { return s.lesson && s.lesson.done && s.n < 4; })[0];
    if (thin) return { kind: 'ueben', obj: thin.obj, text: 'Du hast „' + C.obj(thin.obj).short + '“ gelernt. Jetzt üben, damit es sitzt!', route: 'ueben/' + thin.obj };
    // weak and already practised
    var weak = stats.filter(function (s) { return s.n >= 4 && s.level < 2; }).sort(function (a, b) { return a.acc - b.acc; })[0];
    if (weak && weak.acc < 0.6 && weak.lesson && weak.lesson.last > weak.last) return { kind: 'schwach', obj: weak.obj, text: 'Du hast „' + C.obj(weak.obj).short + '“ noch einmal gelesen. Jetzt gezielt üben!', route: 'ueben/' + weak.obj };
    if (weak && weak.acc < 0.6) return { kind: 'lernen', obj: weak.obj, text: '„' + C.obj(weak.obj).short + '“ klappt noch nicht gut. Lies die Erklärung noch einmal und übe dann.', route: 'lernen/' + weak.obj };
    // next lesson not done (checklist order)
    var todo = stats.filter(function (s) { return !(s.lesson && s.lesson.done) && s.level < 2; })[0];
    if (todo) return { kind: 'lernen', obj: todo.obj, text: 'Als Nächstes: Lernziel ' + todo.obj + ' – „' + C.obj(todo.obj).short + '“.', route: 'lernen/' + todo.obj };
    if (weak) return { kind: 'ueben', obj: weak.obj, text: 'Übe „' + C.obj(weak.obj).short + '“ – da fehlt noch ein bisschen.', route: 'ueben/' + weak.obj };
    var notSafe = stats.filter(function (s) { return s.level < 3; }).sort(function (a, b) { return a.acc - b.acc; })[0];
    if (!pr.doc.tests.length && stats.filter(function (s) { return s.level >= 2; }).length >= 16) return { kind: 'test', text: 'Du bist gut vorbereitet. Mach eine Probe-Lernkontrolle (30 Minuten)!', route: 'test' };
    if (notSafe) return { kind: 'ueben', obj: notSafe.obj, text: 'Fast geschafft! Mach „' + C.obj(notSafe.obj).short + '“ sicher für die Arbeit.', route: 'ueben/' + notSafe.obj };
    return { kind: 'test', text: 'Alles sicher! Teste dich mit einer ganzen Lernkontrolle (45 Minuten) oder einem Blitzquiz.', route: 'test' };
  }

  BIO.session = { pick: pick, exam: exam, next: next, followUp: followUp, byObj: byObj, EXAM: EXAM };
})(typeof window !== 'undefined' ? window : globalThis);
