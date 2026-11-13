/*
 * screens.js — Start (dashboard), Lernen + lesson, Üben, Schwächen, Lernkontrolle, Blitzquiz,
 * Wochenend-Plan, Fachwörter, Eltern.
 */
(function (root) {
  'use strict';
  var BIO = root.BIO, U = BIO.ui, h = U.h, C = BIO.curriculum, R = BIO.runner, S = BIO.session;
  var STATUS = BIO.STATUS;
  function stLabel(id) { return STATUS.filter(function (s) { return s.id === id; })[0]; }
  function chip(st) { var s = stLabel(st); return h('span', { class: 'st st-' + st, text: s.label }); }
  function btn(label, cls, fn, attrs) { var a = Object.assign({ class: 'btn ' + cls, type: 'button', text: label, onclick: fn }, attrs || {}); return h('button', a); }

  var MODES = [
    { id: 'lernen', icon: '📘', title: 'Lernen', sub: 'Erklärungen, Bilder, Beispiele' },
    { id: 'ueben', icon: '✏️', title: 'Üben', sub: 'Thema wählen oder gemischt' },
    { id: 'schwach', icon: '🎯', title: 'Schwächen trainieren', sub: 'Deine Fehler – jetzt richtig' },
    { id: 'test', icon: '📝', title: 'Lernkontrolle simulieren', sub: '20, 30 oder 45 Minuten' },
    { id: 'blitz', icon: '⚡', title: 'Blitzquiz', sub: '8 schnelle Fragen, gemischt' },
    { id: 'plan', icon: '🗓️', title: 'Wochenend-Plan', sub: 'Samstag und Sonntag' },
    { id: 'woerter', icon: '✎', title: 'Fachwörter schreiben', sub: 'Hören, schreiben, merken' }
  ];

  function daysTo(d) { if (!d) return null; var t = new Date(d + 'T08:00:00'), n = new Date(); return Math.round((Date.UTC(t.getFullYear(), t.getMonth(), t.getDate()) - Date.UTC(n.getFullYear(), n.getMonth(), n.getDate())) / 86400000); }

  // ================================================================ START / DASHBOARD
  function home(app) {
    var pr = app.progress, P = app.platform, st = pr.settings();
    var stats = C.objectives.map(function (o) { return pr.stats(o.id); });
    var counts = { neu: 0, arbeit: 0, gut: 0, sicher: 0 }; stats.forEach(function (s) { counts[s.status]++; });
    var overall = stats.reduce(function (a, s) { return a + pr.mastery(s.obj); }, 0) / stats.length;
    var d = daysTo(st.examDate), due = pr.dueWrong().length;
    var line = counts.sicher === 24 ? 'Alles sicher! Du bist bereit für die Lernkontrolle.' : counts.neu === 24 ? 'Los geht’s! Wir lernen zusammen alle 24 Punkte der Checkliste.' : counts.sicher + ' von 24 Lernzielen sind schon sicher.';
    var rec = S.next(pr);
    var recBox = h('div', { class: 'rec', hidden: true }, [U.robinSays(app.robin('thinking', 64), rec.text), btn('Los!', 'primary', function () { app.go(rec.route); })]);
    var v = h('section', { class: 'home' }, [
      h('div', { class: 'hero' }, [app.robin(counts.sicher > 12 ? 'happy' : 'normal', 92), h('div', {}, [
        h('h1', { text: 'Hallo ' + P.childName + '!' }),
        d != null && d >= 0 ? h('p', { class: 'countdown', text: d > 1 ? '📅 Noch ' + d + ' Tage bis zur Lernkontrolle.' : d === 1 ? '📅 Morgen ist die Lernkontrolle!' : '📅 Heute ist die Lernkontrolle – viel Erfolg!' }) : null,
        h('p', { class: 'hero-line', text: line })])]),
      h('button', { class: 'next-btn', type: 'button', 'data-menu': 'next', onclick: function () { recBox.hidden = !recBox.hidden; } }, [h('span', { class: 'tb-icon', text: '🧭' }), h('span', { class: 'tb-text' }, [h('span', { class: 'tb-title', text: 'Was soll ich als Nächstes lernen?' }), h('span', { class: 'tb-sub', text: 'Robin schaut, was dir am meisten hilft.' })])]),
      recBox,
      due >= 3 ? h('button', { class: 'problem-card', type: 'button', onclick: function () { app.go('schwach'); } }, [h('span', { class: 'pc-icon', text: '🎯' }), h('span', {}, [h('b', { text: 'Schwächen trainieren' }), h('span', { class: 'note', text: ' – ' + due + ' Aufgaben warten auf eine zweite Chance' })])]) : null,
      h('div', { class: 'tiles modes' }, MODES.map(function (m) {
        return h('button', { class: 'tile', type: 'button', 'data-menu': m.id, onclick: function () { app.go(m.id); } }, [h('span', { class: 'tile-icon', text: m.icon }), h('span', { class: 'tile-title', text: m.title }), h('span', { class: 'tile-sub', text: m.sub })]);
      })),
      h('h2', { class: 'group-h' }, [h('span', { text: '✅ Checkliste für die Lernkontrolle Nr. 1' })]),
      h('div', { class: 'overall' }, [U.bar(overall, 'wide'), h('span', { class: 'note', text: Math.round(overall * 100) + ' % geschafft · ' + counts.sicher + ' sicher · ' + counts.gut + ' gut · ' + counts.arbeit + ' in Bearbeitung · ' + counts.neu + ' noch nicht gelernt' })]),
      h('div', { class: 'checklist' }, C.modules.map(function (m) {
        var objs = C.objectives.filter(function (o) { return o.module === m.id; });
        return h('div', { class: 'cl-mod', style: '--c:' + m.color }, [h('h3', { class: 'cl-h' }, [h('span', { text: m.icon + ' ' + m.id + ' · ' + m.title })]),
          h('ul', { class: 'cl-list' }, objs.map(function (o) {
            var s = stats[o.id - 1];
            return h('li', { class: 'cl-row s-' + s.status }, [h('a', { class: 'cl-link', href: '#/lernen/' + o.id, 'data-obj': String(o.id) }, [
              h('span', { class: 'cl-n', text: String(o.id) }),
              h('span', { class: 'cl-text' }, [h('span', { class: 'cl-t', text: 'Ich kann ' + o.text + '.' }),
                h('span', { class: 'cl-meta' }, [chip(s.status), U.bar(pr.mastery(o.id)), h('span', { class: 'note', text: s.n ? Math.round(s.accAll * 100) + ' % richtig · ' + s.n + ' Aufg. · zuletzt ' + U.fmtDate(s.last) : (s.lesson && s.lesson.done ? 'gelesen – jetzt üben' : '') })])])])]);
          }))]);
      }))]);
    app.setView(v);
  }

  // ================================================================ LERNEN: list + lesson
  function lernen(app) {
    var pr = app.progress;
    app.setView(h('section', { class: 'menu' }, [h('h1', { class: 'screen-h', text: '📘 Lernen' }), h('p', { class: 'screen-sub', text: 'Jedes Lernziel: kurze Erklärung, Bild, Fachwörter, Beispiel, Fragen und Zusammenfassung.' })].concat(C.modules.map(function (m) {
      return h('div', { class: 'cl-mod', style: '--c:' + m.color }, [h('h3', { class: 'cl-h', text: m.icon + ' ' + m.id + ' · ' + m.title }),
        h('div', { class: 'list' }, C.objectives.filter(function (o) { return o.module === m.id; }).map(function (o) {
          var s = pr.stats(o.id), l = C.lessons[o.id];
          return h('button', { class: 'list-item', type: 'button', 'data-lesson': String(o.id), onclick: function () { app.go('lernen/' + o.id); } }, [
            h('span', { class: 'li-icon', text: s.lesson && s.lesson.done ? '✅' : '📖' }), h('span', { class: 'li-text' }, [h('b', { text: o.id + '. ' + l.title }), h('span', { class: 'note', text: 'Ich kann ' + o.text + '.' })]), chip(s.status)]);
        }))]);
    }))), { back: true });
  }

  function lesson(app, obj) {
    var l = C.lessons[obj], o = C.obj(obj), m = C.module(o.module), pr = app.progress;
    if (!l) return app.go('lernen');
    pr.lessonOpened(obj);
    var allText = function () { return l.title + '. ' + l.text.join(' '); };
    var parts = [];
    parts.push(h('p', { class: 'kicker', style: 'color:' + m.color, text: m.icon + ' Modul ' + m.id + ' · Lernziel ' + obj }));
    parts.push(h('div', { class: 'lesson-top' }, [h('h1', { class: 'screen-h', text: l.title }), U.readBtn(allText, '🔊 Alles vorlesen')]));
    parts.push(h('p', { class: 'goal', text: '🎯 Ich kann ' + o.text + '.' }));
    // 1 Vokabeln zuerst (difficult words explained BEFORE they are used/tested)
    if (l.vocab) parts.push(section('🔤 Wichtige Fachwörter', h('div', { class: 'vocab' }, l.vocab.map(function (v) {
      return h('div', { class: 'voc' }, [h('div', { class: 'voc-w' }, [h('b', { text: v[0] }), U.readBtn(function () { return v[0]; }, '🔊', 'small'), h('button', { class: 'btn soft small', type: 'button', title: 'langsam in Silben', text: '🐢', onclick: function () { U.speak(v[1].replace(/-/g, ' - '), true); } })]),
        h('span', { class: 'voc-syl', text: v[1] }), h('span', { class: 'voc-m', text: v[2] })]);
    }))));
    // 2 Erklärung
    parts.push(section('📖 Erklärung', h('div', { class: 'explain' }, l.text.map(function (p) { return h('div', { class: 'para' }, [h('p', { rich: p }), U.readBtn(p, '🔊', 'small')]); }))));
    // 3 Bild(er)
    var figs = l.figs || (l.fig ? [l.fig] : []);
    if (l.stepper === 'stomach') parts.push(section('🖼️ Schritt für Schritt', stomachStepper()));
    else if (figs.length && obj !== 1 && obj !== 2) parts.push(section('🖼️ Bild', h('div', { class: 'figs' }, figs.map(function (f) { return U.figure(f.n, f.o); }))));
    if (l.stepper === 'stomach' && figs.length) parts.push(U.figure('stomach', {}));
    if (obj === 1 || obj === 2) parts.push(treeExplorer());
    if (obj === 7) parts.push(skeletonPicker());
    if (l.formulas) parts.push(section('🦷 Die Zahnformeln', formulaTable()));
    if (obj === 10) parts.push(h('div', { class: 'figs' }, [U.figure('jaw', { animal: 'hund' }), U.figure('jaw', { animal: 'eich' })]));
    if (l.table) parts.push(section('📋 Vergleich', U.table(l.table)));
    if (l.cards) parts.push(h('div', { class: 'cards' }, l.cards.map(function (c) { return h('div', { class: 'fcard' }, [h('span', { class: 'fc-i', text: c[0] }), h('span', { text: c[1] })]); })));
    if (l.steps) parts.push(h('div', { class: 'steps' }, l.steps.map(function (s) { return h('div', { class: 'stepcol' }, [h('b', { text: s[0] }), h('ol', {}, s[1].map(function (x) { return h('li', { text: x }); }))]); })));
    if (l.reading) parts.push(section('📄 Übungstext', h('div', { class: 'reading' }, [U.readBtn(l.reading, '🔊 Text vorlesen', 'small')].concat(l.reading.split('\n\n').map(function (p) { return h('p', { text: p }); })))));
    if (l.notes) l.notes.forEach(function (n) { parts.push(h('div', { class: 'note-box nb-' + n.k.toLowerCase().replace(/[^a-z]/g, '') }, [h('b', { text: n.k === 'LEHRKRAFT' ? '👩‍🏫 Hinweis: Wie macht es deine Lehrkraft? ' : (n.k === 'Ausnahme' ? '⚠️ ' : 'ℹ️ ') + n.k + ': ' }), h('span', { rich: n.t })])); });
    // 4 Beispiel
    if (l.example) {
      var ans = h('div', { class: 'ex-a', hidden: true }, [h('p', { rich: l.example.a }), U.readBtn(l.example.a, '🔊', 'small')]);
      parts.push(section('🧩 Beispiel', h('div', { class: 'example' }, [h('p', { class: 'ex-q', rich: l.example.q }), btn('Lösung zeigen', 'soft small', function (e) { ans.hidden = false; e.target.remove(); }), ans])));
    }
    // 5 Verständnisfragen
    var checks = h('div', { class: 'checks' });
    (l.check || []).forEach(function (id, k) {
      var q = C.questions.filter(function (x) { return x.id === id; })[0]; if (!q) return;
      var slot = h('div', { class: 'check-slot' }, [h('p', { class: 'kicker', text: 'Frage ' + (k + 1) + ' von ' + l.check.length })]);
      slot.appendChild(R.askCard(app, q, { mode: 'lernen', compact: true, noSkip: false, lastLabel: 'Fertig ✓' }, function () { slot.classList.add('answered'); var b = slot.querySelector('.q-actions'); if (b) b.innerHTML = '<span class="tag ok">✓ beantwortet</span>'; }));
      checks.appendChild(slot);
    });
    parts.push(section('❓ Hast du es verstanden?', checks));
    // 6 Zusammenfassung
    parts.push(section('⭐ Das Wichtigste', h('div', { class: 'summary-box' }, [h('ul', {}, l.summary.map(function (s) { return h('li', { rich: s }); })), U.readBtn(function () { return l.summary.join(' '); }, '🔊 Vorlesen', 'small')])));
    var prev = obj > 1 ? obj - 1 : null, next = obj < 24 ? obj + 1 : null;
    parts.push(h('div', { class: 'row lesson-end' }, [
      btn('✓ Gelernt – jetzt üben', 'primary', function () {
        var first = pr.lessonDone(obj);
        if (first) app.bonus(3, 'Lernziel ' + obj + ' gelernt');
        BIO.runner.round(app, S.pick(pr, { objs: [obj], n: 6, mode: 'ueben' }), { mode: 'ueben', title: '✏️ ' + o.short, again: function () { app.go('ueben/' + obj); } });
      }, { 'data-done': '1' }),
      prev ? btn('‹ Lernziel ' + prev, 'soft', function () { app.go('lernen/' + prev); }) : null,
      next ? btn('Lernziel ' + next + ' ›', 'soft', function () { app.go('lernen/' + next); }) : null]));
    app.setView(h('article', { class: 'lesson' }, parts), { back: true });
  }
  function section(title, body) { return h('section', { class: 'lsec' }, [h('h2', { class: 'lsec-h', text: title }), body]); }

  function stomachStepper() {
    var steps = BIO.figs.STOMACH_STEPS, k = 0, box = h('div', { class: 'stepper' }), figEl = h('div'), cap = h('p', { class: 'step-cap' });
    var prevB = btn('‹ zurück', 'soft small', function () { if (k > 0) { k--; draw(); } }), nextB = btn('weiter ›', 'primary small', function () { if (k < steps.length - 1) { k++; draw(); } });
    function draw() { var f = BIO.fig('stomach', { step: k }); figEl.innerHTML = f.svg; cap.textContent = f.caption; prevB.disabled = k === 0; nextB.disabled = k === steps.length - 1; }
    draw();
    box.appendChild(figEl); box.appendChild(h('div', { class: 'row' }, [prevB, cap, U.readBtn(function () { return cap.textContent; }, '🔊', 'small'), nextB]));
    return box;
  }
  function treeExplorer() {
    var INFO = { 'Fische': 'Kiemen, Flossen, Schuppen, Laich im Wasser, wechselwarm.', 'Amphibien': 'Nackte feuchte Haut, Larve mit Kiemen → Metamorphose, Laich im Wasser, wechselwarm.', 'Reptilien': 'Hornschuppen, Lunge, Eier mit Schale an Land, wechselwarm.', 'Vögel': 'Federn, Lunge, Eier mit Kalkschale, gleichwarm. Stammen von Dinosauriern ab.', 'Säugetiere': 'Fell, Lunge, meist lebend geboren, Milch, gleichwarm.' };
    var out = h('p', { class: 'tree-info', text: 'Tippe im Stammbaum auf eine Klasse.' });
    var f = h('div', { class: 'figsvg tree-ex', html: BIO.fig('tree', {}).svg });
    f.addEventListener('click', function (e) { var g = e.target.closest('.tip'); if (!g) return; var k = g.getAttribute('data-k'); out.innerHTML = ''; out.appendChild(h('b', { text: k + ': ' })); out.appendChild(document.createTextNode(INFO[k])); U.speak(k + '. ' + INFO[k]); });
    return section('👆 Zum Antippen', h('div', {}, [f, out]));
  }
  function skeletonPicker() {
    var holder = h('div'), cur = 'hund', withNames = true;
    var tabs = h('div', { class: 'tabs' }, ['hund', 'katze', 'rind', 'pferd'].map(function (a) {
      return btn({ hund: 'Hund', katze: 'Katze', rind: 'Rind', pferd: 'Pferd' }[a], 'soft small', function () { cur = a; draw(); }, { 'data-animal': a });
    }));
    var tog = btn('Namen ausblenden (selbst testen)', 'soft small', function () { withNames = !withNames; tog.textContent = withNames ? 'Namen ausblenden (selbst testen)' : 'Namen zeigen'; draw(); });
    function draw() { holder.innerHTML = ''; [].forEach.call(tabs.children, function (b) { b.classList.toggle('on', b.getAttribute('data-animal') === cur); }); holder.appendChild(U.figure('skeleton', { animal: cur, mode: withNames ? 'labels' : 'quiz', colors: true }, withNames ? undefined : false)); }
    draw();
    return section('🦴 Skelette vergleichen', h('div', {}, [tabs, tog, holder]));
  }
  function formulaTable() {
    var F = BIO.figs.FORM, rows = ['hund', 'katze', 'rind', 'eich', 'mensch'].map(function (k) {
      var f = F[k], sum = (f.up.concat(f.lo)).reduce(function (a, b) { return a + b; }, 0) * 2;
      return h('tr', {}, [h('th', { text: f.name }), h('td', {}, [h('span', { class: 'zf' }, [h('span', { class: 'zf-up', text: f.up.join('  ') }), h('span', { class: 'zf-lo', text: f.lo.join('  ') })])]),
        h('td', { text: 'I ' + f.up[0] + '/' + f.lo[0] + ', C ' + f.up[1] + '/' + f.lo[1] + ', P ' + f.up[2] + '/' + f.lo[2] + ', M ' + f.up[3] + '/' + f.lo[3] }), h('td', { class: 'sum', text: '(' + f.up.reduce(function (a, b) { return a + b; }) + ' + ' + f.lo.reduce(function (a, b) { return a + b; }) + ') × 2 = ' + sum })]);
    });
    var tabs = h('div', { class: 'tabs' }), holder = h('div');
    ['hund', 'katze', 'rind', 'eich', 'mensch'].forEach(function (k) { tabs.appendChild(btn(F[k].name, 'soft small', function () { holder.innerHTML = ''; holder.appendChild(U.figure('jaw', { animal: k })); [].forEach.call(tabs.children, function (b) { b.classList.toggle('on', b.textContent === F[k].name); }); })); });
    holder.appendChild(U.figure('jaw', { animal: 'hund' })); tabs.firstChild.classList.add('on');
    return h('div', {}, [h('div', { class: 'tablewrap' }, [h('table', { class: 'bt ztable' }, [h('thead', {}, [h('tr', {}, ['Tier', 'Formel (oben / unten) I C P M', 'kurz', 'Zähne'].map(function (x) { return h('th', { text: x }); }))]), h('tbody', {}, rows)])]),
      h('p', { class: 'note', text: 'Tippe ein Tier an, um sein Gebiss zu sehen – und zähle selbst nach!' }), tabs, holder]);
  }

  // ================================================================ ÜBEN
  function ueben(app, arg) {
    var pr = app.progress;
    if (arg) {
      var objs = /^[A-H]$/.test(arg) ? C.objectives.filter(function (o) { return o.module === arg; }).map(function (o) { return o.id; }) : arg === 'mix' ? null : [parseInt(arg, 10)];
      var title = objs && objs.length === 1 ? '✏️ ' + C.obj(objs[0]).short : /^[A-H]$/.test(arg) ? '✏️ Modul ' + arg : '✏️ Gemischt';
      return R.round(app, S.pick(pr, { objs: objs || undefined, n: 10, mode: 'ueben' }), { mode: 'ueben', title: title, again: function () { ueben(app, arg); } });
    }
    app.setView(h('section', { class: 'menu' }, [h('h1', { class: 'screen-h', text: '✏️ Üben' }), h('p', { class: 'screen-sub', text: '10 Aufgaben in vielen Formaten. Nach einem Fehler kommt eine ähnliche Frage – und später nochmal.' }),
      btn('🔀 Alles gemischt', 'primary', function () { app.go('ueben/mix'); }, { 'data-ueben': 'mix' })].concat(C.modules.map(function (m) {
      return h('div', { class: 'cl-mod', style: '--c:' + m.color }, [h('h3', { class: 'cl-h' }, [h('span', { text: m.icon + ' ' + m.id + ' · ' + m.title }), btn('ganzes Modul', 'soft small', function () { app.go('ueben/' + m.id); })]),
        h('div', { class: 'chips-row' }, C.objectives.filter(function (o) { return o.module === m.id; }).map(function (o) {
          var s = pr.stats(o.id);
          return h('button', { class: 'objbtn s-' + s.status, type: 'button', 'data-ueben': String(o.id), onclick: function () { app.go('ueben/' + o.id); } }, [h('b', { text: o.id + ' ' }), h('span', { text: o.short })]);
        }))]);
    }))), { back: true });
  }

  // ================================================================ SCHWÄCHEN
  function schwach(app) {
    var pr = app.progress, stats = C.objectives.map(function (o) { return pr.stats(o.id); });
    var tried = stats.filter(function (s) { return s.n > 0 && s.level < 3; }).sort(function (a, b) { return (a.acc - b.acc) || (b.wrongOpen - a.wrongOpen); });
    var wrong = pr.wrongIds().length;
    if (!tried.length && !wrong) {
      return app.setView(h('section', { class: 'menu narrow' }, [h('h1', { class: 'screen-h', text: '🎯 Schwächen trainieren' }),
        U.robinSays(app.robin('happy', 72), stats.some(function (s) { return s.n; }) ? 'Gerade gibt es keine Schwächen. Super! Lerne ein neues Thema oder mach ein Blitzquiz.' : 'Hier sammle ich deine Fehler. Fang mit „Lernen“ oder „Üben“ an!'),
        h('div', { class: 'row' }, [btn('Lernen', 'primary', function () { app.go('lernen'); }), btn('Blitzquiz', 'soft', function () { app.go('blitz'); })])]), { back: true });
    }
    var focus = tried.slice(0, 4).map(function (s) { return s.obj; });
    var wrongObjs = {}; pr.wrongIds().forEach(function (id) { wrongObjs[pr.doc.wrong[id].o] = 1; });
    var objs = focus.concat(Object.keys(wrongObjs).map(Number).filter(function (o) { return focus.indexOf(o) < 0; }));
    app.setView(h('section', { class: 'menu narrow' }, [h('h1', { class: 'screen-h', text: '🎯 Schwächen trainieren' }),
      U.robinSays(app.robin('encouraging', 72), 'Wir üben genau das, was noch nicht klappt. Nach einem Fehler erkläre ich es dir einfacher und du bekommst gleich eine neue Frage dazu.'),
      h('h2', { class: 'group-h', text: 'Deine Baustellen' }),
      h('ul', { class: 'weak-objs' }, objs.slice(0, 8).map(function (o) { var s = pr.stats(o); return h('li', {}, [h('span', { text: o + '. ' + C.obj(o).short + ' ' }), chip(s.status), h('span', { class: 'note', text: s.n ? ' ' + Math.round(s.acc * 100) + ' %' + (s.wrongOpen ? ' · ' + s.wrongOpen + ' offene Fehler' : '') : '' })]); })),
      h('div', { class: 'row' }, [btn('Training starten (10 Aufgaben)', 'primary', function () {
        R.round(app, S.pick(pr, { objs: objs, n: 10, mode: 'schwach' }), { mode: 'schwach', again: function () { app.go('schwach'); } });
      }, { 'data-start': 'schwach' })])]), { back: true });
  }

  // ================================================================ LERNKONTROLLE
  function test(app) {
    var pr = app.progress, hist = pr.doc.tests.slice(-5).reverse();
    app.setView(h('section', { class: 'menu narrow' }, [h('h1', { class: 'screen-h', text: '📝 Lernkontrolle simulieren' }),
      h('p', { class: 'screen-sub', text: 'Wie eine echte Arbeit: Wissensfragen, Beschriften, Erklären, Vergleichen, Daten auswerten und Begründen. Die Lösungen kommen erst am Ende. Rechtschreibfehler bei Fachwörtern kosten keine Punkte.' }),
      h('div', { class: 'tiles' }, [20, 30, 45].map(function (mn) {
        return h('button', { class: 'tile', type: 'button', 'data-test': String(mn), onclick: function () { R.exam(app, mn); } }, [h('span', { class: 'tile-icon', text: mn === 20 ? '⏱️' : mn === 30 ? '⏰' : '🕰️' }), h('span', { class: 'tile-title', text: mn + ' Minuten' }),
          h('span', { class: 'tile-sub', text: { 20: 'ca. 11 Aufgaben', 30: 'ca. 16 Aufgaben', 45: 'alle 24 Lernziele' }[mn] })]);
      })),
      hist.length ? h('div', {}, [h('h2', { class: 'group-h', text: 'Deine letzten Versuche' }), h('ul', { class: 'hist' }, hist.map(function (t) { return h('li', { text: U.fmtDate(t.ts) + ' · ' + t.min + ' Min. · ' + String(t.pts).replace('.', ',') + '/' + t.max + ' P. · ' + t.pct + ' % · Note ' + t.grade + ' (Richtwert)' }); }))]) : null,
      h('p', { class: 'note', text: 'Tipp: Leg dir Papier und Stift bereit – wie in der echten Arbeit. Mach vorher eine Pause.' })]), { back: true });
  }

  // ================================================================ BLITZQUIZ
  function blitz(app) {
    R.round(app, S.pick(app.progress, { n: 8, mode: 'blitz' }), { mode: 'blitz', again: function () { blitz(app); } });
  }

  // ================================================================ WOCHENEND-PLAN
  function blockState(pr, b) {
    if (b.pause) return null;
    var manual = pr.doc.plan[b.id];
    if (b.activity === 'test') return { done: manual || pr.doc.tests.some(function (t) { return t.min >= 30; }), frac: pr.doc.tests.length ? 1 : 0 };
    if (b.activity === 'schwach') return { done: !!manual, frac: manual ? 1 : 0 };
    var objs = b.objs || [], f = objs.reduce(function (s, o) { var st = pr.stats(o); return s + (st.lesson && st.lesson.done ? 0.3 : 0) + Math.min(0.7, st.level / 2 * 0.7); }, 0) / Math.max(1, objs.length);
    if (b.activity === 'blitz') return { done: manual || pr.doc.log.some(function (l) { return l.mode === 'blitz'; }), frac: f };
    return { done: !!manual || objs.every(function (o) { return pr.stats(o).level >= 2; }), frac: f };
  }
  function plan(app) {
    var pr = app.progress;
    function startBlock(b) {
      if (b.activity === 'test') return R.exam(app, 45);
      if (b.activity === 'schwach') { pr.doc.plan[b.id] = Date.now(); pr.save(); return app.go('schwach'); }
      if (b.activity === 'blitz') return R.round(app, S.pick(pr, { objs: b.objs, n: 8, mode: 'blitz' }), { mode: 'blitz', again: function () { app.go('plan'); } });
      var open = b.objs.filter(function (o) { var s = pr.stats(o); return !(s.lesson && s.lesson.done); })[0];
      if (open) return app.go('lernen/' + open);
      R.round(app, S.pick(pr, { objs: b.objs, n: 10, mode: 'plan' }), { mode: 'plan', title: '🗓️ ' + b.title, again: function () { app.go('plan'); } });
    }
    app.setView(h('section', { class: 'menu plan' }, [h('h1', { class: 'screen-h', text: '🗓️ Wochenend-Plan' }),
      U.robinSays(app.robin('normal', 64), 'Ein Vorschlag für Samstag und Sonntag. Arbeite in deinem Tempo – kurze Blöcke, echte Pausen. Es ist nicht schlimm, wenn du etwas verschiebst.'),
      h('div', { class: 'days' }, C.plan.map(function (day) {
        return h('div', { class: 'day' }, [h('h2', { class: 'group-h', text: day.day })].concat(day.blocks.map(function (b) {
          if (b.pause) return h('div', { class: 'pause' }, [h('span', { text: '☕ Pause ' + b.pause + ' Min. – trinken, bewegen, frische Luft' })]);
          var s = blockState(pr, b), cb = h('input', { type: 'checkbox', 'aria-label': 'erledigt' }); cb.checked = s.done;
          cb.onchange = function () { if (cb.checked) pr.doc.plan[b.id] = Date.now(); else delete pr.doc.plan[b.id]; pr.save(); };
          return h('div', { class: 'block' + (s.done ? ' done' : ''), 'data-block': b.id }, [h('label', { class: 'blk-cb' }, [cb]),
            h('div', { class: 'blk-text' }, [h('b', { text: b.title }), h('span', { class: 'note', text: '≈ ' + b.min + ' Min.' + (b.objs && !b.activity ? ' · Lernziele ' + b.objs[0] + '–' + b.objs[b.objs.length - 1] : '') }), U.bar(s.frac)]),
            btn(s.done ? 'Nochmal' : 'Start', s.done ? 'soft small' : 'primary small', function () { startBlock(b); })]);
        })));
      })),
      h('p', { class: 'note', text: 'Ein Block ist automatisch erledigt, wenn alle seine Lernziele mindestens „Gut verstanden“ sind. Du kannst ihn auch selbst abhaken.' })]), { back: true });
  }

  // ================================================================ FACHWÖRTER (spelling of technical terms)
  function woerter(app) {
    var pr = app.progress, all = [];
    Object.keys(C.lessons).forEach(function (k) { (C.lessons[k].vocab || []).forEach(function (v) { if (!/ /.test(v[0]) || /und/.test(v[0])) all.push({ w: v[0], syl: v[1], m: v[2], obj: +k }); }); });
    var problem = pr.spellingTerms();
    var list = problem.map(function (t) { var v = R.vocabFor(t); return v ? { w: v[0], syl: v[1], m: v[2] } : { w: t, syl: t, m: '' }; });
    var rest = U.shuffle(all.filter(function (x) { return problem.indexOf(x.w) < 0 && !/[,]/.test(x.w); }));
    list = list.concat(rest).slice(0, 10);
    var i = 0, right = 0;
    function show() {
      if (i >= list.length) {
        var c = app.reward(pr.allowCoins(right, 60) + (list.length >= 8 ? 3 : 0), { mode: 'woerter', n: list.length, right: right, startedAt: Date.now() });
        pr.logRound('woerter', list.length, right);
        return app.setView(h('section', { class: 'summary narrow' }, [U.robinSays(app.robin('celebrating', 80), right + ' von ' + list.length + ' Fachwörtern richtig geschrieben!'), app.coinsOn() ? h('p', { class: 'coins-line' }, [U.coin(20), ' +' + c + ' Robin-Münzen']) : null,
          h('div', { class: 'row' }, [btn('Nochmal', 'primary', function () { woerter(app); }), btn('Zur Übersicht', 'soft', function () { app.go('home'); })])]), { back: true });
      }
      var v = list[i], inp = h('input', { class: 'gap big', type: 'text', autocomplete: 'off', autocapitalize: 'off', spellcheck: 'false', 'aria-label': 'Fachwort schreiben' });
      var fb = h('div', { class: 'feedback' }), tries = 0;
      var check = function () {
        var val = inp.value.trim(); if (!val) return;
        var exact = BIO.check.norm(val) === BIO.check.norm(v.w) && val.replace(/\s/g, '') .toLowerCase() === v.w.replace(/\s/g, '').toLowerCase();
        tries++; fb.innerHTML = '';
        if (exact) {
          if (tries === 1) right++;
          pr.spellingOk(v.w);
          fb.className = 'feedback ok'; fb.appendChild(h('p', { class: 'fb-h', text: tries === 1 ? 'Perfekt geschrieben!' : 'Jetzt stimmt’s!' }));
          if (val !== v.w && val.toLowerCase() === v.w.toLowerCase()) fb.appendChild(h('p', { class: 'why', text: 'Achte auf Groß- und Kleinschreibung: ' + v.w }));
          fb.appendChild(btn('Weiter ›', 'primary', function () { i++; show(); }));
          return;
        }
        fb.className = 'feedback retry';
        fb.appendChild(h('p', { class: 'fb-h', text: 'So schreibt man es:' }));
        fb.appendChild(h('p', { class: 'diff' }, diff(val, v.w)));
        fb.appendChild(h('p', { class: 'sp-syl', text: 'In Silben: ' + v.syl }));
        fb.appendChild(h('p', { class: 'note', text: 'Schreib es jetzt noch einmal ab.' }));
        inp.value = ''; inp.focus();
      };
      inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') check(); });
      app.setView(h('section', { class: 'run narrow' }, [h('div', { class: 'run-head' }, [h('span', { class: 'run-title', text: '✎ Fachwörter schreiben' }), h('span', { class: 'run-count', text: 'Wort ' + (i + 1) + ' von ' + list.length })]),
        h('div', { class: 'qcard' }, [h('p', { class: 'prompt', text: 'Hör zu und schreibe das Fachwort.' }), h('p', { class: 'q-hint', text: 'Bedeutung: ' + v.m }),
          h('div', { class: 'row' }, [btn('🔊 Anhören', 'soft', function () { U.speak(v.w); }), btn('🐢 In Silben', 'soft', function () { U.speak(v.syl.replace(/-/g, ' - '), true); })]),
          h('p', {}, [inp]), h('div', { class: 'row' }, [btn('Prüfen', 'primary', check)]), fb])]), { back: true });
      setTimeout(function () { U.speak(v.w); inp.focus(); }, 250);
    }
    show();
  }
  function diff(a, b) {
    // mark letters of the right word that were missing or different
    var out = [], A = a.toLowerCase(), B = b.toLowerCase(), j = 0;
    for (var i = 0; i < b.length; i++) {
      var ok = A[j] === B[i];
      if (ok) j++; else if (A[j + 1] === B[i]) { j += 2; ok = true; }
      out.push(h('span', { class: ok ? 'd-ok' : 'd-no', text: b[i] }));
    }
    return out;
  }

  // ================================================================ ELTERN
  function parent(app) {
    var pr = app.progress, P = app.platform, st = pr.settings();
    if (!app.parentOk) {
      var a = 6 + Math.floor(Math.random() * 4), b = 6 + Math.floor(Math.random() * 4);
      var pinMode = P.parentHasPin();
      var inp = h('input', { type: 'password', inputmode: 'numeric', class: 'nbox', 'aria-label': pinMode ? 'Eltern-PIN' : 'Ergebnis', maxlength: 8 }), msg = h('p', { class: 'note' });
      var go = function () { var ok = pinMode ? P.parentCheck(inp.value) : parseInt(inp.value, 10) === a * b; if (ok) { app.parentOk = true; parent(app); } else { msg.textContent = 'Das stimmt nicht.'; inp.value = ''; } };
      inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') go(); });
      app.setView(h('section', { class: 'menu narrow' }, [h('h1', { class: 'screen-h', text: '👤 Elternbereich' }), h('p', { text: pinMode ? 'Bitte die Eltern-PIN eingeben.' : 'Für Erwachsene: Wie viel ist ' + a + ' × ' + b + '?' }), h('div', { class: 'row' }, [inp, btn('Öffnen', 'primary', go)]), msg]), { back: true });
      return setTimeout(function () { inp.focus(); }, 30);
    }
    var stats = C.objectives.map(function (o) { return pr.stats(o.id); });
    var tbl = h('div', { class: 'tablewrap' }, [h('table', { class: 'bt' }, [h('thead', {}, [h('tr', {}, ['Nr.', 'Lernziel', 'Status', 'Aufgaben', 'richtig (gewichtet)', 'offene Fehler', 'zuletzt'].map(function (x) { return h('th', { text: x }); }))]),
      h('tbody', {}, stats.map(function (s) { var o = C.obj(s.obj); return h('tr', {}, [h('td', { text: String(o.id) }), h('td', { text: o.short }), h('td', {}, [chip(s.status)]), h('td', { text: String(s.n) }), h('td', { text: s.n ? Math.round(s.acc * 100) + ' %' : '–' }), h('td', { text: String(s.wrongOpen) }), h('td', { text: U.fmtDate(s.last) })]); }))])]);
    // grading scale
    var scale = (st.scale || BIO.DEFAULT_SCALE).map(function (x) { return { grade: x.grade, min: x.min }; });
    var scaleBox = h('div', { class: 'scale' }, scale.map(function (x, k) {
      var inp = h('input', { type: 'number', min: 0, max: 100, value: x.min, class: 'nbox small', 'aria-label': 'Note ' + x.grade + ' ab Prozent' });
      inp.onchange = function () { scale[k].min = Math.max(0, Math.min(100, parseFloat(inp.value) || 0)); pr.setSetting('scale', scale); };
      return h('label', { class: 'sc-row' }, [h('b', { text: 'Note ' + x.grade + ' ab ' }), inp, h('span', { text: ' %' })]);
    }));
    var date = h('input', { type: 'date', value: st.examDate || '', 'aria-label': 'Datum der Lernkontrolle' }); date.onchange = function () { pr.setSetting('examDate', date.value); };
    var font = h('input', { type: 'checkbox' }); font.checked = st.font === 'dyslexic'; font.onchange = function () { pr.setSetting('font', font.checked ? 'dyslexic' : 'standard'); app.applySettings(); };
    var rate = h('select', { 'aria-label': 'Vorlesetempo' }, [['0.7', 'langsam'], ['0.85', 'ruhig'], ['1', 'normal']].map(function (x) { var o = h('option', { value: x[0], text: x[1] }); if (String(st.rate) === x[0]) o.selected = true; return o; }));
    rate.onchange = function () { pr.setSetting('rate', parseFloat(rate.value)); };
    var voice = h('select', { 'aria-label': 'Stimme' }, [h('option', { value: '', text: 'automatisch (beste deutsche Stimme)' })]);
    BIO.speech.onVoices(function (vs) { voice.innerHTML = ''; voice.appendChild(h('option', { value: '', text: 'automatisch (beste deutsche Stimme)' })); vs.forEach(function (v) { var o = h('option', { value: v.name, text: v.name }); if (v.name === st.voice) o.selected = true; voice.appendChild(o); }); });
    voice.onchange = function () { pr.setSetting('voice', voice.value); U.speak('Hallo, ich lese dir die Aufgaben vor.'); };
    var armed = false, reset = btn('Lernstand zurücksetzen', 'soft', function () { if (!armed) { armed = true; reset.textContent = 'Wirklich alles löschen? Nochmal tippen.'; return; } pr.reset(); app.go('home'); });
    var exp = btn('Lernstand exportieren (JSON)', 'soft', function () { var blob = new Blob([JSON.stringify(pr.doc, null, 1)], { type: 'application/json' }); var a2 = document.createElement('a'); a2.href = URL.createObjectURL(blob); a2.download = 'biologie-bobins-' + pr.childId + '.json'; a2.click(); });
    var spell = pr.spellingTerms();
    app.setView(h('section', { class: 'parent menu' }, [h('h1', { class: 'screen-h', text: '👤 Elternbereich – ' + P.childName }),
      h('h2', { class: 'group-h', text: 'Lernstand je Lernziel' }), h('p', { class: 'note', text: 'Der Status entsteht nur aus beantworteten Aufgaben (gewichtete letzte 12 Antworten). „Sicher“: mind. 8 Aufgaben, ≥ 85 %, mind. 2 Aufgabenformate, die letzten 3 überwiegend richtig.' }), tbl,
      spell.length ? h('div', {}, [h('h2', { class: 'group-h', text: 'Fachwörter mit Rechtschreibfehlern' }), h('p', { text: spell.join(' · ') }), h('p', { class: 'note', text: 'Biologisch richtig, nur falsch geschrieben – diese Fehler kosten keine Punkte, kommen aber im Fachwörter-Training dran.' })]) : null,
      pr.doc.tests.length ? h('div', {}, [h('h2', { class: 'group-h', text: 'Probe-Lernkontrollen' }), h('ul', {}, pr.doc.tests.slice().reverse().map(function (t) { return h('li', { text: U.fmtDate(t.ts) + ': ' + t.min + ' Min., ' + t.pct + ' %, Note ' + t.grade + (t.weak && t.weak.length ? ' – schwach: Lernziele ' + t.weak.join(', ') : '') }); }))]) : null,
      h('h2', { class: 'group-h', text: 'Einstellungen' }),
      h('div', { class: 'settings' }, [h('label', {}, [h('span', { text: 'Datum der Lernkontrolle: ' }), date]),
        h('label', {}, [font, h('span', { text: ' Schrift OpenDyslexic (für leichteres Lesen)' })]),
        h('label', {}, [h('span', { text: 'Vorlesetempo: ' }), rate]), h('label', {}, [h('span', { text: 'Stimme: ' }), voice])]),
      h('h2', { class: 'group-h', text: 'Notenschlüssel (nur Richtwert)' }), h('p', { class: 'note', text: 'Beispiel-Schlüssel. Bitte an den Schlüssel der Lehrkraft anpassen, falls bekannt.' }), scaleBox,
      h('h2', { class: 'group-h', text: 'Inhalte anpassen' }), h('p', { class: 'note', text: 'Erklärungen und Aufgaben stehen in data/mod-a.js … mod-h.js im Repository. Stellen, an denen Lehrkräfte oft andere Konventionen haben (Zahnformel-Schreibweise, Eichhörnchen im Winter, 5-Schritt-Lesetechnik, Haustier/Nutztier), sind dort mit „LEHRKRAFT“ markiert.' }),
      h('div', { class: 'row' }, [exp, reset])]), { back: true });
  }

  BIO.screens = { home: home, lernen: lernen, lesson: lesson, ueben: ueben, schwach: schwach, test: test, blitz: blitz, plan: plan, woerter: woerter, parent: parent, MODES: MODES };
})(typeof window !== 'undefined' ? window : globalThis);
