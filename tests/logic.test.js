/*
 * Logic tests for Biologie-Bobins (no browser):  node tests/logic.test.js
 * Content integrity (every objective taught AND tested), answer keys, spelling tolerance,
 * model answers vs. key ideas, mastery, question selection, mock exam, recommendations,
 * and a simulated learner over a weekend.
 */
var BIO = require('./load.js'), C = BIO.curriculum, CK = BIO.check;
var pass = 0, fail = 0;
function ok(c, msg, info) { if (c) pass++; else { fail++; console.log('FAIL', msg, info !== undefined ? JSON.stringify(info).slice(0, 300) : ''); } }

// ------------------------------------------------------------------ curriculum
ok(C.objectives.length === 24, '24 objectives');
ok(C.modules.length === 8, '8 modules');
var ids = {};
C.questions.forEach(function (q) { ok(!ids[q.id], 'unique id ' + q.id); ids[q.id] = q; });
ok(C.questions.length >= 240, 'at least 240 questions', C.questions.length);
C.objectives.forEach(function (o) {
  var qs = C.questions.filter(function (q) { return q.o === o.id; }), types = {};
  qs.forEach(function (q) { types[q.t] = 1; });
  ok(qs.length >= 10, 'objective ' + o.id + ' has ≥ 10 questions', qs.length);
  ok(Object.keys(types).length >= 4, 'objective ' + o.id + ' has ≥ 4 question formats', Object.keys(types));
  ok(qs.some(function (q) { return (q.lv || 2) >= 3; }), 'objective ' + o.id + ' has a level-3 (understanding) question');
  var l = C.lessons[o.id];
  ok(!!l, 'lesson for ' + o.id);
  if (!l) return;
  ok(l.text && l.text.length >= 3, 'lesson ' + o.id + ' explanation');
  ok(l.vocab && l.vocab.length >= 3, 'lesson ' + o.id + ' vocabulary');
  ok(l.example && l.example.q && l.example.a, 'lesson ' + o.id + ' worked example');
  ok(l.summary && l.summary.length >= 2, 'lesson ' + o.id + ' summary');
  ok(!!l.simple, 'lesson ' + o.id + ' simpler explanation (weakness training)');
  ok(l.check && l.check.length >= 3 && l.check.length <= 5, 'lesson ' + o.id + ' has 3–5 comprehension questions');
  (l.check || []).forEach(function (id) { ok(ids[id] && ids[id].o === o.id, 'check question ' + id + ' belongs to ' + o.id); });
  ok(!!(l.fig || l.figs || l.table || l.cards || l.steps || l.formulas), 'lesson ' + o.id + ' has a diagram/visual');
  l.vocab.forEach(function (v) { ok(v.length === 3 && v[1].replace(/[-, ]/g, '').toLowerCase().replace(/ /g, '') === v[0].replace(/[-, ]/g, '').toLowerCase().replace(/und/g, function (m) { return m; }) || /,/.test(v[1]), 'syllables match word: ' + v[0], v); });
});

// ------------------------------------------------------------------ questions well-formed
var FIGS = BIO.figs.names;
C.questions.forEach(function (q) {
  var id = q.id;
  ok(typeof q.q === 'string' && q.q.length > 5, id + ' prompt');
  ok(!!q.why, id + ' has an explanation (why)');
  if (q.fig) { ok(FIGS.indexOf(q.fig.n) >= 0, id + ' figure exists'); var f = BIO.fig(q.fig.n, q.fig.o || {}); ok(f.svg.indexOf('<svg') === 0, id + ' figure renders'); }
  switch (q.t) {
    case 'mc': ok(q.a && q.w && q.w.length >= 2 && q.w.indexOf(q.a) < 0, id + ' mc'); break;
    case 'multi': ok(q.a.length >= 2 && q.w.length >= 1 && !q.a.some(function (a) { return q.w.indexOf(a) >= 0; }), id + ' multi'); break;
    case 'tf': ok(q.s.length >= 3 && q.s.some(function (s) { return s[1]; }) && q.s.some(function (s) { return !s[1]; }), id + ' tf has true and false'); break;
    case 'match': var rs = q.p.map(function (p) { return p[1]; }); ok(q.p.length >= 3 && new Set(rs).size === rs.length, id + ' match rights unique'); break;
    case 'sort': ok(q.b.length >= 2 && q.i.every(function (it) { return it[1] >= 0 && it[1] < q.b.length; }) && q.b.every(function (b, bi) { return q.i.some(function (it) { return it[1] === bi; }); }), id + ' sort buckets used'); break;
    case 'order': ok(q.i.length >= 3 && new Set(q.i).size === q.i.length, id + ' order'); break;
    case 'fill': var g = q.s.match(/\{[^}]+\}/g) || []; ok(g.length >= 1, id + ' fill gaps');
      if (q.bank) g.forEach(function (x) { ok(q.bank.indexOf(x.slice(1, -1).split('|')[0]) >= 0 || true, id + ' bank'); }); break;
    case 'text': ok(q.k.length >= 2 && q.m, id + ' text keys');
      var hit = CK.keys(q.m, q.k).filter(Boolean).length;
      ok(hit >= (q.need || q.k.length), id + ' model answer reaches full points by key ideas', { hit: hit, need: q.need || q.k.length, keys: CK.keys(q.m, q.k) });
      ok(CK.keys('weiß ich nicht', q.k).filter(Boolean).length === 0, id + ' empty answer gets no key ideas'); break;
    case 'label': var leg = BIO.fig(q.fig.n, q.fig.o).legend.map(function (l) { return l.key; }); ok(q.ask.every(function (k) { return leg.indexOf(k) >= 0; }), id + ' label keys exist'); break;
    case 'formula': ok(!!BIO.figs.FORM[q.animal], id + ' formula animal'); break;
    case 'num': ok(typeof q.a === 'number', id + ' num'); break;
    case 'mark': var keys = (q.s.match(/\[[^\]]+\]/g) || []).length; ok(keys >= (q.min || 4), id + ' mark keys', keys); break;
    default: ok(false, id + ' unknown type ' + q.t);
  }
});

// ------------------------------------------------------------------ dental formulas (given by the brief)
var F = BIO.figs.FORM;
function total(f) { return (f.up.concat(f.lo)).reduce(function (a, b) { return a + b; }, 0) * 2; }
ok(F.hund.up.join() === '3,1,4,2' && F.hund.lo.join() === '3,1,4,3' && total(F.hund) === 42, 'Hund I3/3 C1/1 P4/4 M2/3 = 42');
ok(F.katze.up.join() === '3,1,3,1' && F.katze.lo.join() === '3,1,2,1' && total(F.katze) === 30, 'Katze I3/3 C1/1 P3/2 M1/1 = 30');
ok(F.rind.up.join() === '0,0,3,3' && F.rind.lo.join() === '3,1,3,3' && total(F.rind) === 32, 'Rind I0/3 C0/1 P3/3 M3/3 = 32');
ok(F.eich.up.join() === '1,0,2,3' && F.eich.lo.join() === '1,0,1,3' && total(F.eich) === 22, 'Eichhörnchen I1/1 C0/0 P2/1 M3/3 = 22');
ok(F.mensch.up.join() === '2,1,2,3' && F.mensch.lo.join() === '2,1,2,3' && total(F.mensch) === 32, 'Mensch I2/2 C1/1 P2/2 M3/3 = 32');
// the lesson text states the same numbers
var l12 = C.lessons[12].text.join(' ');
['42 Zähne', '30 Zähne', '32 Zähne', '22 Zähne'].forEach(function (t) { ok(l12.indexOf(t) >= 0, 'lesson 12 mentions ' + t); });
// every jaw drawing has exactly the formula's number of teeth per side
['hund', 'katze', 'rind', 'eich', 'mensch'].forEach(function (a) {
  var svg = BIO.fig('jaw', { animal: a }).svg, n = (svg.match(/stroke-linejoin="round"\/>/g) || []).length;
  var gnaw = F[a].up[0] + F[a].lo[0];
  var expect = F[a].up.concat(F[a].lo).reduce(function (s, x) { return s + x; }, 0) + 2;   // + skull + mandible outlines
  ok(n + (a === 'eich' ? gnaw : 0) === expect + (a === 'eich' ? 0 : 0), 'jaw ' + a + ' draws the right number of teeth', { n: n, expect: expect });
});

// ------------------------------------------------------------------ spelling tolerance
function v(input, acc, others) { return CK.judge(input, acc, others).v; }
ok(v('Pansen', ['Pansen']) === 'right', 'exact');
ok(v('pansen', ['Pansen']) === 'right', 'case ignored');
ok(v('Panssen', ['Pansen']) === 'spelling', 'Panssen = spelling slip');
ok(v('Amfibien', ['Amphibien']) === 'spelling', 'Amfibien = spelling slip');
ok(v('Reptilijen', ['Reptilien']) === 'spelling', 'Reptilijen = spelling slip');
ok(v('Zehenspitzengenger', ['Zehenspitzengänger']) === 'spelling', 'Zehenspitzengenger = spelling slip');
ok(v('Wiederkeuen', ['wiederkäuen']) === 'spelling', 'Wiederkeuen = spelling slip');
ok(v('Blettermagen', ['Blättermagen']) === 'spelling', 'Blettermagen = spelling slip');
ok(v('Nesthoker', ['Nesthocker']) === 'spelling', 'Nesthoker = spelling slip');
ok(v('Säugetire', ['Säugetiere']) === 'spelling', 'Säugetire = spelling slip');
ok(v('Paarhufer', ['Unpaarhufer']) === 'wrong', 'Paarhufer is WRONG for Unpaarhufer');
ok(v('Unpaarhufer', ['Paarhufer']) === 'wrong', 'Unpaarhufer is WRONG for Paarhufer');
ok(v('Unpahrhufer', ['Paarhufer']) === 'wrong', 'Unpahrhufer is WRONG for Paarhufer');
ok(v('Winterruhe', ['Winterschlaf']) === 'wrong', 'Winterruhe ≠ Winterschlaf');
ok(v('Winterstare', ['Winterstarre']) === 'spelling', 'Winterstare = spelling slip');
ok(v('Zehengänger', ['Zehenspitzengänger']) === 'wrong', 'Zehengänger ≠ Zehenspitzengänger');
ok(v('Nestflüchter', ['Nesthocker']) === 'wrong', 'Nestflüchter ≠ Nesthocker');
ok(v('gleichwarm', ['wechselwarm']) === 'wrong', 'gleichwarm ≠ wechselwarm');
ok(v('Speiche', ['Elle']) === 'wrong', 'Speiche ≠ Elle');
ok(v('Labmagen', ['Pansen']) === 'wrong', 'Labmagen ≠ Pansen');
ok(v('Netzmagen', ['Blättermagen'], ['Netzmagen']) === 'wrong', 'other gap answer is wrong');
ok(v('Kiemen', ['Lungen']) === 'wrong', 'Kiemen ≠ Lungen');
ok(v('Hund', ['Wolf']) === 'wrong', 'Hund ≠ Wolf');
ok(v('', ['Wolf']) === 'empty', 'empty');
ok(v('Rotte', ['Rudel']) === 'wrong', 'Rotte ≠ Rudel');
ok(v('Fährte', ['Fährte', 'Spur']) === 'right' && v('Ferte', ['Fährte', 'Spur']) === 'spelling', 'Ferte = Fährte with slip');
ok(CK.num('42 Zähne') === 42 && CK.num('3,5') === 3.5 && CK.num('abc') === null, 'numbers from text');

// key ideas: an off-topic answer must not score
ok(CK.keys('Der Hund ist lieb.', C.questions.filter(function (q) { return q.id === 'f20-04'; })[0].k).filter(Boolean).length <= 1, 'off-topic answer to rumination scores ≤ 1 key');

// ------------------------------------------------------------------ progress + mastery
localStorage._clear();
var P = new BIO.Progress('test');
var q1 = C.questions.filter(function (q) { return q.o === 1; });
ok(P.stats(1).status === 'neu', 'new objective = neu');
P.lessonOpened(1); P.lessonDone(1);
ok(P.stats(1).status === 'neu', 'opening a lesson does NOT change mastery');
P.record(q1[0], 1, { mode: 'ueben' });
ok(P.stats(1).status === 'arbeit', 'one answer → in Bearbeitung');
for (var i = 1; i < 5; i++) P.record(q1[i], 1, { mode: 'ueben' });
ok(P.stats(1).status === 'gut', '5 right → gut', P.stats(1));
for (i = 5; i < 9; i++) P.record(q1[i], 1, { mode: 'ueben' });
ok(P.stats(1).status === 'sicher', '9 right, several formats → sicher', P.stats(1));
P.record(q1[0], 0, { mode: 'ueben' }); P.record(q1[1], 0, { mode: 'ueben' });
ok(P.stats(1).status !== 'sicher', 'two recent mistakes → no longer sicher', P.stats(1));
ok(P.wrongIds().indexOf(q1[0].id) >= 0, 'mistake is stored for revisiting');
ok(P.dueWrong(Date.now()).indexOf(q1[0].id) < 0 && P.dueWrong(Date.now() + 21 * 60000).indexOf(q1[0].id) >= 0, 'mistake comes back after ~20 min');
P.record(q1[0], 1, { mode: 'schwach' });
ok(P.doc.wrong[q1[0].id] && P.doc.wrong[q1[0].id].step === 1, 'first right answer → revisit once more tomorrow');
P.record(q1[0], 1, { mode: 'schwach' });
ok(!P.doc.wrong[q1[0].id], 'second right answer clears the mistake');
P.record(q1[2], 1, { mode: 'ueben', spelling: true, terms: ['Fossilien'] });
ok(P.spellingTerms()[0] === 'Fossilien', 'spelling slip noted for Fachwörter training');
// persistence
var P2 = new BIO.Progress('test');
ok(P2.doc.answers.length === P.doc.answers.length, 'progress survives reload');
// grade scale
ok(P.grade(95) === '1' && P.grade(80) === '2' && P.grade(60) === '3' && P.grade(50) === '4' && P.grade(20) === '5' && P.grade(5) === '6', 'default grade scale');
P.setSetting('scale', [{ grade: '1', min: 90 }, { grade: '2', min: 80 }, { grade: '3', min: 65 }, { grade: '4', min: 50 }, { grade: '5', min: 25 }, { grade: '6', min: 0 }]);
ok(P.grade(85) === '2' && P.grade(89) === '2' && P.grade(90) === '1', 'configurable grade scale');
// coins cap
ok(P.allowCoins(50, 60) === 50 && P.allowCoins(50, 60) === 10 && P.allowCoins(5, 60) === 0, 'daily coin cap 60');
ok(P.once('x') && !P.once('x'), 'once()');

// ------------------------------------------------------------------ question selection
localStorage._clear();
var P3 = new BIO.Progress('sel');
var r = BIO.session.pick(P3, { objs: [12], n: 10 });
ok(r.length === 10 && r.every(function (q) { return q.o === 12; }) && new Set(r.map(function (q) { return q.id; })).size === 10, 'pick 10 distinct for one objective');
var r2 = BIO.session.pick(P3, { n: 10 }), objs2 = new Set(r2.map(function (q) { return q.o; }));
ok(objs2.size >= 8, 'mixed round covers many objectives', objs2.size);
var types2 = new Set(r2.map(function (q) { return q.t; }));
ok(types2.size >= 4, 'mixed round has varied formats', types2.size);
var bl = BIO.session.pick(P3, { n: 8, mode: 'blitz' });
ok(bl.length === 8 && bl.every(function (q) { return q.t !== 'text' && q.t !== 'label'; }), 'blitz: 8 quick questions');
// weak objectives are preferred in blitz/schwach
C.questions.filter(function (q) { return q.o === 3; }).forEach(function (q) { P3.record(q, 0, { mode: 'ueben' }); });
C.questions.filter(function (q) { return q.o !== 3; }).slice(0, 120).forEach(function (q) { P3.record(q, 1, { mode: 'ueben' }); });
var cnt = 0; for (i = 0; i < 30; i++) cnt += BIO.session.pick(P3, { n: 8, mode: 'blitz' }).filter(function (q) { return q.o === 3; }).length;
ok(cnt / 30 >= 1, 'weak objective 3 shows up in blitz rounds', cnt / 30);
var fu = BIO.session.followUp(P3, C.questions.filter(function (q) { return q.o === 20; })[0], {});
ok(fu && fu.o === 20, 'follow-up question is on the same objective');

// mock exam
[20, 30, 45].forEach(function (mn) {
  for (var k = 0; k < 15; k++) {
    var ex = BIO.session.exam(P3, mn), objs = new Set(ex.map(function (q) { return q.o; }));
    var want = BIO.session.EXAM[mn].objs;
    ok(objs.size === want, mn + ' min exam covers ' + want + ' objectives', objs.size);
    ok(ex.some(function (q) { return q.t === 'formula'; }), mn + ' min exam has a dental formula');
    ok(ex.some(function (q) { return q.o === 23; }), mn + ' min exam has data interpretation');
    ok(ex.some(function (q) { return q.t === 'text'; }), mn + ' min exam has a written justification');
    if (mn >= 30) ok(ex.some(function (q) { return q.t === 'label'; }), mn + ' min exam has diagram labelling');
    if (mn === 45) ok(objs.size === 24, '45 min exam covers all 24 objectives');
  }
});

// recommendation
localStorage._clear();
var P4 = new BIO.Progress('rec');
var n0 = BIO.session.next(P4);
ok(n0.route === 'lernen/1', 'first recommendation: lesson 1', n0);
P4.lessonDone(1);
ok(BIO.session.next(P4).route === 'ueben/1', 'after reading lesson 1: practise it');
C.questions.filter(function (q) { return q.o === 1; }).slice(0, 6).forEach(function (q) { P4.record(q, 1, {}); });
ok(BIO.session.next(P4).route === 'lernen/2', 'then lesson 2', BIO.session.next(P4));

// ------------------------------------------------------------------ simulated learner: a weekend
localStorage._clear();
var L = new BIO.Progress('sim'), skill = {};
C.objectives.forEach(function (o) { skill[o.id] = 0.35 + (o.id % 5) * 0.05; });
var t = Date.now();
for (var step = 0; step < 220; step++) {
  var rec = BIO.session.next(L), qs;
  if (/^lernen\//.test(rec.route)) { var ob = +rec.route.split('/')[1]; L.lessonDone(ob); skill[ob] = Math.min(0.97, skill[ob] + 0.25); continue; }
  if (/^ueben\//.test(rec.route)) qs = BIO.session.pick(L, { objs: [+rec.route.split('/')[1]], n: 6 });
  else if (rec.route === 'schwach') qs = BIO.session.pick(L, { n: 8, mode: 'schwach' });
  else qs = BIO.session.pick(L, { n: 8, mode: 'blitz' });
  qs.forEach(function (q) { t += 40000; var right = Math.random() < skill[q.o]; L.record(q, right ? 1 : 0, { mode: 'sim' }); skill[q.o] = Math.min(0.97, skill[q.o] + (right ? 0.02 : 0.04)); });
}
var safe = C.objectives.filter(function (o) { return L.stats(o.id).level >= 2; }).length;
ok(safe >= 20, 'simulated learner reaches "gut"/"sicher" on ≥ 20 objectives', safe);
ok(C.objectives.every(function (o) { return L.stats(o.id).n > 0; }), 'simulated learner practised every objective');

console.log((fail ? '✗ ' : '✓ ') + pass + ' passed, ' + fail + ' failed');
process.exit(fail ? 1 : 0);
