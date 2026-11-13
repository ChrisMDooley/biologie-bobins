/*
 * runner.js — one question card with feedback (askCard), practice rounds (round) and the mock exam (exam).
 */
(function (root) {
  'use strict';
  var BIO = root.BIO, U = BIO.ui, h = U.h, C = BIO.curriculum;

  var PRAISE = ['Richtig!', 'Super!', 'Genau!', 'Stark!', 'Klasse!', 'Sehr gut!'];
  var CHEER = ['Fast! Schau dir die rot markierten Stellen an.', 'Noch nicht ganz – du schaffst das!', 'Knapp daneben. Probier es noch einmal.'];
  function pickOne(a) { return a[Math.floor(Math.random() * a.length)]; }
  function vocabFor(term) {
    var t = BIO.check.norm(term), out = null;
    Object.keys(C.lessons).forEach(function (k) { (C.lessons[k].vocab || []).forEach(function (v) { if (BIO.check.norm(v[0]) === t) out = v; }); });
    return out;
  }
  function syllables(term) { var v = vocabFor(term); return v ? v[1] : null; }

  // "So schreibt man es" — spelling is taught, never punished
  function spellingBox(terms) {
    if (!terms.length) return null;
    return h('div', { class: 'spellbox' }, [h('p', { class: 'sp-h', text: '✎ Biologisch richtig! Achte auf die Schreibung:' })].concat(terms.map(function (t) {
      var syl = syllables(t);
      return h('p', { class: 'sp-row' }, [h('b', { class: 'sp-word', text: t }), syl ? h('span', { class: 'sp-syl', text: ' (' + syl + ')' }) : null, U.readBtn(function () { return t; }, '🔊', 'small')]);
    })));
  }
  function conceptBox(obj, simple) {
    var l = C.lessons[obj]; if (!l) return null;
    return h('div', { class: 'concept' }, [
      h('p', { class: 'c-h', text: '📘 Das steckt dahinter (Lernziel ' + obj + '):' }),
      h('ul', {}, l.summary.map(function (s) { return h('li', { rich: s }); })),
      simple && l.simple ? h('div', { class: 'simple' }, [h('b', { text: '💡 Einfacher erklärt: ' }), h('span', { rich: l.simple }), U.readBtn(l.simple, '🔊', 'small')]) : null,
      h('a', { class: 'link small', href: '#/lernen/' + obj, text: '→ Ganze Erklärung öffnen' })]);
  }

  /*
   * askCard(app, q, ctx, done)
   *   ctx: { mode, weak (show simpler example), noRetry, compact }
   *   done({ score, ok, firstOk, recovered, spelling })
   */
  function askCard(app, q, ctx, done) {
    ctx = ctx || {};
    var w = BIO.qw.make(q, { seed: Math.floor(Math.random() * 1e9) });
    var fb = h('div', { class: 'feedback', 'aria-live': 'polite' }), btns = h('div', { class: 'row q-actions' });
    var card = h('div', { class: 'qcard' + (ctx.compact ? ' compact' : '') }, [w.el, fb, btns]);
    var tries = 0, first = null;

    function button(label, cls, fn) { return h('button', { class: 'btn ' + cls, type: 'button', text: label, onclick: fn }); }
    function setBtns(list) { btns.innerHTML = ''; list.forEach(function (b) { if (b) btns.appendChild(b); }); }

    function checkNow() {
      if (!w.answered()) { fb.className = 'feedback info'; fb.textContent = 'Du hast noch nichts eingegeben. Probier es – Fehler sind zum Lernen da!'; return; }
      if (w.selfCheck && !card._checking) {
        card._checking = true; w.startCheck(function () {});
        fb.className = 'feedback info'; fb.innerHTML = '';
        fb.appendChild(h('p', { text: 'Lies die Musterlösung. Hake ab, was du auch geschrieben hast – sei ehrlich mit dir.' }));
        return setBtns([button('Bewerten ✓', 'primary', evaluate)]);
      }
      evaluate();
    }
    function evaluate() {
      var res = w.grade(); tries++;
      if (tries === 1) {
        first = res;
        app.progress.record(q, res.score, { mode: ctx.mode, spelling: res.spelling.length > 0, terms: res.spelling });
      }
      w.lock();
      fb.innerHTML = '';
      if (res.ok) {
        w.show(res, false);
        fb.className = 'feedback ok';
        fb.appendChild(h('p', { class: 'fb-h', text: (tries > 1 ? 'Gut verbessert! ' : '') + pickOne(PRAISE) }));
        var sp = spellingBox(res.spelling); if (sp) fb.appendChild(sp);
        res.spelling.forEach(function (t) { if (tries > 1) app.progress.spellingOk(t); });
        if (q.why) fb.appendChild(h('p', { class: 'why', rich: q.why }));
        return finish(res);
      }
      w.show(res, false);
      if (tries === 1 && !ctx.noRetry && !w.selfCheck) {
        fb.className = 'feedback retry';
        fb.appendChild(h('p', { class: 'fb-h', text: res.score > 0 ? pickOne(CHEER) : 'Das stimmt leider noch nicht. Überleg noch einmal.' }));
        var sp2 = spellingBox(res.spelling); if (sp2) fb.appendChild(sp2);
        return setBtns([button('Nochmal versuchen', 'primary', function () { w.reset(); fb.innerHTML = ''; fb.className = 'feedback'; setBtns([button('Prüfen', 'primary', checkNow)]); }),
          button('Lösung zeigen', 'soft', function () { reveal(res); })]);
      }
      reveal(res);
    }
    function reveal(res) {
      w.show(res, true); w.lock();
      fb.className = 'feedback no'; fb.innerHTML = '';
      fb.appendChild(h('p', { class: 'fb-h', text: res.score >= 0.5 ? 'Teilweise richtig. So ist es ganz richtig:' : 'So ist es richtig:' }));
      if (!w.selfCheck) fb.appendChild(h('pre', { class: 'solution', text: w.solution() }));
      if (q.why) fb.appendChild(h('p', { class: 'why', rich: '**Warum?** ' + q.why }));
      var cb = conceptBox(q.o, !!ctx.weak); if (cb && (ctx.weak || res.score < 0.5)) fb.appendChild(cb);
      finish(res);
    }
    function finish(res) {
      setBtns([button(ctx.lastLabel || 'Weiter ›', 'primary', function () {
        done({ score: first.score, ok: first.ok, firstOk: first.ok, recovered: !first.ok && res.ok, spelling: first.spelling });
      })]);
      var b = btns.querySelector('button'); if (b && !ctx.compact) setTimeout(function () { b.focus(); }, 30);
    }
    setBtns([button('Prüfen', 'primary', checkNow), ctx.noSkip ? null : button('Weiß ich nicht', 'soft', function () {
      if (tries === 0) { tries = 1; first = { score: 0, ok: false, spelling: [] }; app.progress.record(q, 0, { mode: ctx.mode }); }
      if (w.selfCheck && !card._checking) { card._checking = true; w.startCheck(function () {}); }
      reveal({ score: 0, ok: false });
    })]);
    card._w = w;
    root.__bioCur = { q: q, w: w, card: card };          // test hook (harmless)
    return card;
  }

  // ---------------------------------------------------------------- practice round
  var TITLES = { ueben: '🔁 Üben', schwach: '🎯 Schwächen trainieren', blitz: '⚡ Blitzquiz', plan: '🗓️ Wochenend-Plan' };
  function round(app, qs, opts) {
    opts = opts || {};
    var mode = opts.mode || 'ueben', i = 0, used = {}, results = [], started = Date.now(), followUps = 0;
    qs.forEach(function (q) { used[q.id] = 1; });
    var before = {}; C.objectives.forEach(function (o) { before[o.id] = app.progress.stats(o.id).status; });
    var clock = null, t0 = Date.now();
    function show() {
      if (i >= qs.length) return end();
      var q = qs[i], obj = C.obj(q.o), mod = C.module(obj.module);
      var head = h('div', { class: 'run-head' }, [h('span', { class: 'run-title', text: opts.title || TITLES[mode] || '' }),
        mode === 'blitz' ? (clock = h('span', { class: 'run-clock', text: '' })) : null,
        h('span', { class: 'run-count', text: 'Aufgabe ' + (i + 1) + ' von ' + qs.length })]);
      var prog = h('div', { class: 'run-bar' }, [h('span', { style: 'width:' + Math.round(i / qs.length * 100) + '%' })]);
      var tag = h('p', { class: 'objtag', style: '--c:' + mod.color }, [h('span', { text: mod.icon + ' Lernziel ' + q.o + ': ' }), h('span', { text: obj.short })]);
      var card = askCard(app, q, { mode: mode, weak: mode === 'schwach' }, function (r) {
        results.push({ q: q, r: r });
        // weakness training: a different question on the same objective right away
        if (!r.firstOk && (mode === 'schwach' || mode === 'ueben') && followUps < 4) {
          var f = BIO.session.followUp(app.progress, q, used);
          if (f) { used[f.id] = 1; qs.splice(i + 1, 0, f); followUps++; }
        }
        i++; show();
      });
      app.setView(h('section', { class: 'run' }, [head, prog, tag, card]), { back: true, onBack: stopClock });
      tick();
    }
    function tick() { if (!clock) return; stopClock(); var upd = function () { var s = Math.floor((Date.now() - t0) / 1000); clock.textContent = '⏱ ' + Math.floor(s / 60) + ':' + ('0' + s % 60).slice(-2); }; upd(); clock._t = setInterval(upd, 1000); }
    function stopClock() { if (clock && clock._t) clearInterval(clock._t); }
    function end() {
      stopClock();
      var n = results.length, firstOk = results.filter(function (x) { return x.r.firstOk; }).length, rec = results.filter(function (x) { return x.r.recovered; }).length;
      var pr = app.progress, earned = pr.allowCoins(firstOk + rec, 60);
      var bonus = n >= 6 ? ({ ueben: 3, schwach: 4, blitz: 5, plan: 3 }[mode] || 3) : 0;
      var ups = [];
      C.objectives.forEach(function (o) {
        var s = pr.stats(o.id).status;
        if (s !== before[o.id] && ['neu', 'arbeit', 'gut', 'sicher'].indexOf(s) > ['neu', 'arbeit', 'gut', 'sicher'].indexOf(before[o.id])) {
          ups.push({ obj: o, s: s });
          if (s === 'sicher' && pr.once('sicher-' + o.id)) bonus += 5;
        }
      });
      var total = app.reward(earned + bonus, { mode: mode, n: n, right: firstOk, startedAt: started });
      pr.logRound(mode, n, firstOk);
      var pct = n ? firstOk / n : 0;
      var line = pct >= 0.85 ? 'Wow, fast alles beim ersten Versuch richtig!' : pct >= 0.6 ? 'Gut gemacht! Die Fehler üben wir noch einmal.' : 'Fleißig geübt! Fehler sind zum Lernen da – ich merke sie mir und frage später nochmal.';
      var weakObjs = {}; results.forEach(function (x) { if (!x.r.firstOk) weakObjs[x.q.o] = (weakObjs[x.q.o] || 0) + 1; });
      app.setView(h('section', { class: 'summary narrow' }, [
        U.robinSays(app.robin(pct >= 0.6 ? 'celebrating' : 'encouraging', 84), line),
        h('div', { class: 'sum-stats' }, [h('div', {}, [h('b', { text: firstOk + ' / ' + n }), h('span', { text: 'beim ersten Versuch richtig' })]),
          rec ? h('div', {}, [h('b', { text: String(rec) }), h('span', { text: 'selbst verbessert' })]) : null,
          app.coinsOn() ? h('div', { class: 'coins' }, [h('b', {}, [U.coin(22), ' +' + total]), h('span', { text: 'Robin-Münzen' })]) : null]),
        ups.length ? h('div', { class: 'ups' }, [h('p', { class: 'c-h', text: '⬆ Fortschritt:' }), h('ul', {}, ups.map(function (u) { return h('li', { text: u.obj.short + ': jetzt „' + BIO.STATUS.filter(function (x) { return x.id === u.s; })[0].label + '“' }); }))]) : null,
        Object.keys(weakObjs).length ? h('div', { class: 'weak-list' }, [h('p', { class: 'c-h', text: 'Das schauen wir uns nochmal an:' }), h('ul', {}, Object.keys(weakObjs).map(function (o) { return h('li', {}, [h('a', { href: '#/lernen/' + o, text: 'Lernziel ' + o + ': ' + C.obj(+o).short }) ]); }))]) : null,
        h('div', { class: 'row' }, [h('button', { class: 'btn primary', type: 'button', text: 'Nochmal', onclick: function () { opts.again ? opts.again() : app.go('home'); } }), h('button', { class: 'btn soft', type: 'button', text: 'Zur Übersicht', onclick: function () { app.go('home'); } })])]), { back: true });
    }
    show();
  }

  // ---------------------------------------------------------------- mock exam
  function exam(app, minutes) {
    var qs = BIO.session.exam(app.progress, minutes), ws = qs.map(function (q) { return BIO.qw.make(q, { seed: Math.floor(Math.random() * 1e9) }); });
    var i = 0, endAt = Date.now() + minutes * 60000, timer = null, done = false, started = Date.now();
    var maxPts = ws.reduce(function (s, w) { return s + w.max; }, 0);
    var clock = h('span', { class: 'run-clock' }), nav = h('div', { class: 'exam-nav' });
    var holder = h('div', { class: 'exam-q' });
    function tick() {
      var left = Math.max(0, Math.round((endAt - Date.now()) / 1000));
      clock.textContent = '⏱ ' + Math.floor(left / 60) + ':' + ('0' + left % 60).slice(-2);
      clock.classList.toggle('low', left < 120);
      if (!left && !done) submit(true);
    }
    function draw() {
      holder.innerHTML = '';
      var q = qs[i], w = ws[i];
      holder.appendChild(h('p', { class: 'exam-meta', text: 'Aufgabe ' + (i + 1) + ' von ' + qs.length + ' · ' + w.max + (w.max === 1 ? ' Punkt' : ' Punkte') }));
      holder.appendChild(w.el);
      nav.innerHTML = '';
      qs.forEach(function (x, k) { nav.appendChild(h('button', { class: 'nb' + (k === i ? ' cur' : '') + (ws[k].answered() ? ' done' : ''), type: 'button', text: String(k + 1), 'aria-label': 'Aufgabe ' + (k + 1), onclick: function () { i = k; draw(); } })); });
      window.scrollTo(0, 0);
    }
    var view = h('section', { class: 'exam' }, [
      h('div', { class: 'run-head' }, [h('span', { class: 'run-title', text: '📝 Lernkontrolle (' + minutes + ' Min.)' }), clock, h('span', { class: 'run-count', text: maxPts + ' Punkte' })]),
      h('p', { class: 'note', text: 'Wie in der echten Arbeit: Die Lösungen siehst du erst am Ende. Du kannst zwischen den Aufgaben hin und her springen.' }),
      nav, holder,
      h('div', { class: 'row' }, [h('button', { class: 'btn soft', type: 'button', text: '‹ Zurück', onclick: function () { if (i > 0) { i--; draw(); } } }),
        h('button', { class: 'btn soft', type: 'button', text: 'Weiter ›', onclick: function () { if (i < qs.length - 1) { i++; draw(); } } }),
        h('button', { class: 'btn primary', type: 'button', text: 'Abgeben', onclick: function () {
          var open = ws.filter(function (w) { return !w.answered(); }).length;
          if (!open) return submit(false);
          var close = U.modal('Abgeben?', h('div', {}, [h('p', { text: open + (open === 1 ? ' Aufgabe ist' : ' Aufgaben sind') + ' noch leer.' }),
            h('div', { class: 'row' }, [h('button', { class: 'btn primary', type: 'button', text: 'Trotzdem abgeben', onclick: function () { close(); submit(false); } }),
              h('button', { class: 'btn soft', type: 'button', text: 'Weiterarbeiten', onclick: function () { close(); } })])]));
        } })])]);
    root.__bioExam = { qs: qs, ws: ws };                 // test hook (harmless)
    app.setView(view, { back: true, onBack: function () { clearInterval(timer); } });
    draw(); tick(); timer = setInterval(tick, 1000);
    nav.addEventListener('click', function () {}); holder.addEventListener('change', function () { var b = nav.children[i]; if (b) b.classList.toggle('done', ws[i].answered()); });
    holder.addEventListener('click', function () { setTimeout(function () { var b = nav.children[i]; if (b) b.classList.toggle('done', ws[i].answered()); }, 0); });

    function submit(timeUp) {
      done = true; clearInterval(timer);
      var res = ws.map(function (w) { return w.answered() ? w.grade() : { score: 0, ok: false, spelling: [], max: w.max, pts: 0 }; });
      qs.forEach(function (q, k) { app.progress.record(q, res[k].score, { mode: 'test', spelling: res[k].spelling.length > 0, terms: res[k].spelling }); });
      results(timeUp, res);
    }
    function results(timeUp, res) {
      var pr = app.progress;
      function totals() { var pts = res.reduce(function (s, r) { return s + r.score * r.max; }, 0); pts = Math.round(pts * 2) / 2; var pct = Math.round(pts / maxPts * 100); return { pts: pts, pct: pct, grade: pr.grade(pct) }; }
      var t = totals(), best = pr.bestTest();
      var byObj = {}; qs.forEach(function (q, k) { var b = byObj[q.o] || (byObj[q.o] = { got: 0, max: 0 }); b.got += res[k].score * res[k].max; b.max += res[k].max; });
      var weak = Object.keys(byObj).filter(function (o) { return byObj[o].got / byObj[o].max < 0.6; }).map(Number);
      var spellN = res.reduce(function (s, r) { return s + r.spelling.length; }, 0);
      pr.saveTest({ ts: Date.now(), min: minutes, pts: t.pts, max: maxPts, pct: t.pct, grade: t.grade, weak: weak });
      var bonus = 8 + (best >= 0 && t.pct > best ? 5 : 0);
      var right = res.filter(function (r) { return r.ok; }).length;
      var coins = app.reward(pr.allowCoins(right, 60) + bonus, { mode: 'test', n: qs.length, right: right, startedAt: started });
      var scoreEl = h('div', { class: 'exam-score' });
      function drawScore() {
        var tt = totals(); scoreEl.innerHTML = '';
        scoreEl.appendChild(h('div', { class: 'big' }, [h('b', { text: String(tt.pts).replace('.', ',') + ' / ' + maxPts }), h('span', { text: 'Punkte' })]));
        scoreEl.appendChild(h('div', { class: 'big' }, [h('b', { text: tt.pct + ' %' }), h('span', { text: 'richtig' })]));
        scoreEl.appendChild(h('div', { class: 'big grade' }, [h('b', { text: tt.grade }), h('span', { text: 'Note (nur Richtwert*)' })]));
      }
      drawScore();
      var review = h('div', { class: 'review' });
      qs.forEach(function (q, k) {
        var w = ws[k], r = res[k];
        if (w.selfCheck) { w.setTicks(r.ticks || []); w.startCheck(function () { var g = w.grade(); r.score = g.score; drawScore(); }); }
        else { w.show(r, true); w.lock(); }
        review.appendChild(h('div', { class: 'rv ' + (r.score >= 0.999 ? 'ok' : r.score > 0 ? 'part' : 'no') }, [
          h('p', { class: 'rv-h', text: 'Aufgabe ' + (k + 1) + ' · Lernziel ' + q.o + ' · ' + (Math.round(r.score * r.max * 2) / 2 + '').replace('.', ',') + ' / ' + r.max + ' P.' }),
          w.el, spellingBox(r.spelling),
          w.selfCheck ? h('p', { class: 'note', text: 'Robin hat deine Antwort vorläufig bewertet. Hake ehrlich ab, was in deiner Antwort steht – die Punkte passen sich an.' }) : h('pre', { class: 'solution', text: w.solution() }),
          q.why ? h('p', { class: 'why', rich: '**Warum?** ' + q.why }) : null]));
      });
      app.setView(h('section', { class: 'exam-res' }, [
        U.robinSays(app.robin(t.pct >= 60 ? 'celebrating' : 'encouraging', 84), timeUp ? 'Die Zeit ist um! Hier ist deine Auswertung.' : t.pct >= 75 ? 'Toll! Du bist gut vorbereitet.' : t.pct >= 50 ? 'Ordentlich! Mit den Schwächen unten wird es noch besser.' : 'Gut, dass wir das jetzt wissen – unten steht genau, was du noch üben solltest.'),
        scoreEl,
        h('p', { class: 'note', text: '* Die Note ist nur ein Richtwert nach einem einstellbaren Beispiel-Schlüssel (Elternbereich). Deine Lehrkraft kann anders bewerten.' + (spellN ? ' Rechtschreibfehler bei Fachwörtern haben KEINE Punkte gekostet (' + spellN + '×) – übe sie trotzdem unter „Fachwörter schreiben“.' : '') }),
        app.coinsOn() ? h('p', { class: 'coins-line' }, [U.coin(20), ' +' + coins + ' Robin-Münzen']) : null,
        weak.length ? h('div', { class: 'weak-list' }, [h('h2', { class: 'group-h', text: '🎯 Das solltest du noch üben' }), h('ul', {}, weak.map(function (o) {
          return h('li', {}, [h('a', { href: '#/lernen/' + o, text: 'Lernziel ' + o + ': ' + C.obj(o).short }), ' – ', h('a', { href: '#/ueben/' + o, text: 'üben' })]); })),
          h('button', { class: 'btn primary', type: 'button', text: '🎯 Schwächen jetzt trainieren', onclick: function () { app.go('schwach'); } })]) : h('p', { class: 'good', text: 'Keine schwachen Themen – super!' }),
        h('h2', { class: 'group-h', text: 'Alle Aufgaben mit Lösungen' }), review,
        h('div', { class: 'row' }, [h('button', { class: 'btn soft', type: 'button', text: 'Zur Übersicht', onclick: function () { app.go('home'); } })])]), { back: true });
    }
  }

  BIO.runner = { askCard: askCard, round: round, exam: exam, spellingBox: spellingBox, conceptBox: conceptBox, vocabFor: vocabFor };
})(typeof window !== 'undefined' ? window : globalThis);
