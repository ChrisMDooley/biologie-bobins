/*
 * progress.js — everything Biologie-Bobins remembers (no DOM).
 *
 * One JSON document per learner in localStorage at 'biologie-bobins:<childId>'
 * (the Robin's Bobins backup picks it up by this prefix).
 *
 * Mastery is computed ONLY from answers (never from "lesson opened"):
 *   Noch nicht gelernt  – no answers yet
 *   In Bearbeitung      – answers, but not yet good enough
 *   Gut verstanden      – ≥ 5 answers, weighted recent accuracy ≥ 70 %
 *   Sicher für die Arbeit – ≥ 8 answers, ≥ 85 %, at least 2 question types and the last 3 answers ≥ 2/3 right
 */
(function (root) {
  'use strict';
  var PREFIX = 'biologie-bobins:';
  var DAY = 86400000;
  var STATUS = [
    { id: 'neu', label: 'Noch nicht gelernt', short: 'neu' },
    { id: 'arbeit', label: 'In Bearbeitung', short: 'in Arbeit' },
    { id: 'gut', label: 'Gut verstanden', short: 'gut' },
    { id: 'sicher', label: 'Sicher für die Arbeit', short: 'sicher' }
  ];
  var DEFAULT_SCALE = [ // indicative only — the teacher's key may differ (Elternbereich → Notenschlüssel)
    { grade: '1', min: 87 }, { grade: '2', min: 73 }, { grade: '3', min: 59 },
    { grade: '4', min: 45 }, { grade: '5', min: 18 }, { grade: '6', min: 0 }
  ];

  function now() { return Date.now(); }
  function dayKey(t) { var d = new Date(t); return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2); }
  function mem() { var m = {}; return { getItem: function (k) { return k in m ? m[k] : null; }, setItem: function (k, v) { m[k] = String(v); } }; }
  var ls; try { ls = root.localStorage; ls.setItem('__bio', '1'); } catch (e) { ls = mem(); }

  function fresh() {
    return { v: 1, created: now(), answers: [], lessons: {}, wrong: {}, spelling: {}, tests: [], coins: { days: {}, once: {}, log: [] },
      best: {}, plan: {}, log: [], settings: { font: 'standard', voice: '', rate: 0.85, scale: DEFAULT_SCALE.slice(), examDate: '', speakAuto: false } };
  }

  function Progress(childId, storage) {
    this.childId = childId || 'lukas';
    this.ls = storage || ls;
    this.key = PREFIX + this.childId;
    var doc = null;
    try { doc = JSON.parse(this.ls.getItem(this.key) || 'null'); } catch (e) { doc = null; }
    var f = fresh();
    if (!doc || typeof doc !== 'object') doc = f;
    Object.keys(f).forEach(function (k) { if (doc[k] == null) doc[k] = f[k]; });
    Object.keys(f.settings).forEach(function (k) { if (doc.settings[k] == null) doc.settings[k] = f.settings[k]; });
    ['days', 'once', 'log'].forEach(function (k) { if (!doc.coins[k]) doc.coins[k] = f.coins[k]; });
    this.doc = doc;
  }
  var P = Progress.prototype;
  P.save = function () {
    var d = this.doc;
    if (d.answers.length > 4000) d.answers = d.answers.slice(-4000);
    if (d.log.length > 500) d.log = d.log.slice(-500);
    if (d.coins.log.length > 500) d.coins.log = d.coins.log.slice(-500);
    try { this.ls.setItem(this.key, JSON.stringify(d)); } catch (e) { /* storage full: keep going in memory */ }
  };
  P.settings = function () { return this.doc.settings; };
  P.setSetting = function (k, v) { this.doc.settings[k] = v; this.save(); };

  // ------------------------------------------------------------------ answers
  // score 0..1 (partial credit for written answers, labels, sorting …)
  P.record = function (q, score, opts) {
    opts = opts || {};
    var t = opts.ts || now();
    this.doc.answers.push({ q: q.id, o: q.o, s: Math.round(score * 100) / 100, t: t, m: opts.mode || '', ty: q.t, sp: opts.spelling ? 1 : 0 });
    var w = this.doc.wrong[q.id];
    if (score < 0.6) {
      // revisit: same day after ~20 min, then the next day, then 3 days
      this.doc.wrong[q.id] = { o: q.o, t: t, n: (w ? w.n : 0) + 1, due: t + 20 * 60000, step: 0 };
    } else if (w) {
      if (opts.mode === 'test') { /* exam answers do not clear */ }
      else if (w.step >= 1) delete this.doc.wrong[q.id];
      else { w.step = 1; w.due = t + DAY; }
    }
    (opts.terms || []).forEach(function (term) {
      var s = this.doc.spelling[term] || { n: 0, ok: 0 };
      s.n++; s.t = t; s.ok = 0; this.doc.spelling[term] = s;
    }, this);
    this.save();
  };
  P.spellingOk = function (term) { var s = this.doc.spelling[term]; if (!s) return; s.ok = (s.ok || 0) + 1; if (s.ok >= 2) delete this.doc.spelling[term]; this.save(); };
  P.spellingTerms = function () { var s = this.doc.spelling; return Object.keys(s).sort(function (a, b) { return s[b].n - s[a].n; }); };

  P.answersFor = function (obj) { return this.doc.answers.filter(function (a) { return a.o === obj; }); };

  P.stats = function (obj) {
    var all = this.answersFor(obj), last = all.slice(-12), n = all.length;
    var wsum = 0, ssum = 0;
    last.forEach(function (a, i) { var w = 1 + i / Math.max(1, last.length - 1); wsum += w; ssum += w * a.s; });
    var acc = wsum ? ssum / wsum : 0;
    var types = {}; all.forEach(function (a) { types[a.ty] = 1; });
    var l3 = all.slice(-3), l3ok = l3.filter(function (a) { return a.s >= 0.6; }).length;
    var st = 'neu';
    if (n) st = 'arbeit';
    if (n >= 5 && acc >= 0.7) st = 'gut';
    if (n >= 8 && acc >= 0.85 && Object.keys(types).length >= 2 && l3ok >= 2) st = 'sicher';
    var plain = all.length ? all.reduce(function (s, a) { return s + a.s; }, 0) / all.length : 0;
    var wrongOpen = 0, w = this.doc.wrong; for (var k in w) if (w[k].o === obj) wrongOpen++;
    return { obj: obj, n: n, acc: acc, accAll: plain, status: st, level: ['neu', 'arbeit', 'gut', 'sicher'].indexOf(st),
      last: n ? all[n - 1].t : 0, wrongOpen: wrongOpen, lesson: this.doc.lessons[obj] || null };
  };
  // 0..1 mastery number for bars: shrinks with few answers
  P.mastery = function (obj) { var s = this.stats(obj); return s.n ? s.acc * Math.min(1, s.n / 8) : 0; };

  P.lessonOpened = function (obj) { var l = this.doc.lessons[obj] || (this.doc.lessons[obj] = {}); if (!l.opened) l.opened = now(); this.save(); };
  P.lessonDone = function (obj) { var l = this.doc.lessons[obj] || (this.doc.lessons[obj] = {}); var first = !l.done; l.done = l.done || now(); l.last = now(); this.save(); return first; };

  // wrong answers due for revisiting
  P.dueWrong = function (t) { t = t || now(); var w = this.doc.wrong; return Object.keys(w).filter(function (k) { return w[k].due <= t; }); };
  P.wrongIds = function () { return Object.keys(this.doc.wrong); };

  // ------------------------------------------------------------------ tests (mock exams)
  P.saveTest = function (r) { this.doc.tests.push(r); this.save(); };
  P.bestTest = function () { return this.doc.tests.reduce(function (m, t) { return Math.max(m, t.pct); }, -1); };
  P.grade = function (pct) {
    var sc = (this.doc.settings.scale || DEFAULT_SCALE).slice().sort(function (a, b) { return b.min - a.min; });
    for (var i = 0; i < sc.length; i++) if (pct >= sc[i].min) return sc[i].grade;
    return sc[sc.length - 1].grade;
  };

  // ------------------------------------------------------------------ coins bookkeeping (cap per day)
  P.coinsToday = function () { return this.doc.coins.days[dayKey(now())] || 0; };
  P.allowCoins = function (n, cap) {
    var today = dayKey(now()), used = this.doc.coins.days[today] || 0, ok = Math.max(0, Math.min(n, cap - used));
    this.doc.coins.days[today] = used + ok; this.save(); return ok;
  };
  P.once = function (key) { if (this.doc.coins.once[key]) return false; this.doc.coins.once[key] = now(); this.save(); return true; };
  P.logCoins = function (n, why) { this.doc.coins.log.push({ t: now(), n: n, why: why }); this.save(); };
  P.logRound = function (mode, n, right) { this.doc.log.push({ ts: now(), mode: mode, n: n, right: right }); this.save(); };

  P.reset = function () { var s = this.doc.settings; this.doc = fresh(); this.doc.settings = s; this.save(); };

  root.BIO = root.BIO || {};
  root.BIO.Progress = Progress;
  root.BIO.STATUS = STATUS;
  root.BIO.DEFAULT_SCALE = DEFAULT_SCALE;
  root.BIO.dayKey = dayKey;
})(typeof window !== 'undefined' ? window : globalThis);
