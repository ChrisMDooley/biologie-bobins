/*
 * app.js — routing, header, Robin-Münzen. Loaded last.
 */
(function (root) {
  'use strict';
  var BIO = root.BIO, U = BIO.ui, P = BIO.platform, S = BIO.screens;

  var progress = new BIO.Progress(P.childId);
  var main = document.getElementById('main');
  var backBtn = document.getElementById('back'), appsLink = document.getElementById('apps-link');
  if (P.homeUrl) { appsLink.href = P.homeUrl; if (P.guest) appsLink.textContent = '‹ Start'; } else appsLink.hidden = true;
  U.useSettings(function () { return progress.settings(); });

  var onLeave = null;
  var app = {
    progress: progress, platform: P, parentOk: false,
    robin: function (pose, size) { return P.robin(pose, size); },
    setView: function (node, opts) {
      opts = opts || {};
      if (onLeave) { try { onLeave(); } catch (e) { /* ignore */ } }
      onLeave = opts.onBack || null;
      BIO.speech.stop();
      main.innerHTML = ''; main.appendChild(node);
      backBtn.hidden = !opts.back;
      window.scrollTo(0, 0);
    },
    go: function (route) { if (location.hash !== '#/' + route) location.hash = '#/' + route; else render(); },
    applySettings: applySettings
  };
  BIO.app = app;

  function applySettings() { document.documentElement.classList.toggle('font-dyslexic', progress.settings().font === 'dyslexic'); }
  applySettings();
  backBtn.addEventListener('click', function () { app.go('home'); });

  // ---------------------------------------------------------------- Robin-Münzen
  var pill = document.getElementById('coin-pill'), coinsEl = document.getElementById('coins');
  function showCoins(bump) {
    if (!P.coins.available) return;
    pill.hidden = false; coinsEl.textContent = P.coins.balance();
    if (bump) { pill.classList.remove('bump'); void pill.offsetWidth; pill.classList.add('bump'); }
  }
  showCoins();
  app.coinsOn = function () { return P.coins.available; };
  var REASON = { ueben: 'Biologie geübt', schwach: 'Schwächen trainiert', blitz: 'Blitzquiz', test: 'Probe-Lernkontrolle', plan: 'Wochenend-Plan', woerter: 'Fachwörter geschrieben' };
  // end of a round: one entry on the family balance, one activity (streaks)
  app.reward = function (amount, sum) {
    var n = amount > 0 ? P.coins.add(amount, REASON[sum.mode] || 'Biologie geübt') : 0;
    if (n) progress.logCoins(n, sum.mode);
    if (sum.n) P.recordActivity({ mode: sum.mode, total: sum.n, right: sum.right, startedAt: sum.startedAt, endedAt: Date.now() });
    showCoins(!!n);
    return n;
  };
  app.bonus = function (amount, reason) { var n = P.coins.add(amount, reason); if (n) { progress.logCoins(n, reason); showCoins(true); } return n; };

  // ---------------------------------------------------------------- router
  function render() {
    var r = (location.hash || '').replace(/^#\/?/, ''), m;
    if (!r || r === 'home') return S.home(app);
    if (r === 'lernen') return S.lernen(app);
    if ((m = /^lernen\/(\d+)$/.exec(r))) return S.lesson(app, parseInt(m[1], 10));
    if (r === 'ueben') return S.ueben(app);
    if ((m = /^ueben\/(\w+)$/.exec(r))) return S.ueben(app, m[1]);
    if (r === 'schwach') return S.schwach(app);
    if (r === 'test') return S.test(app);
    if (r === 'blitz') return S.blitz(app);
    if (r === 'plan') return S.plan(app);
    if (r === 'woerter') return S.woerter(app);
    if (r === 'eltern') return S.parent(app);
    S.home(app);
  }
  window.addEventListener('hashchange', render);
  render();

  if ('serviceWorker' in navigator && location.protocol === 'https:') navigator.serviceWorker.register('sw.js').catch(function () { /* offline cache is optional */ });
})(typeof window !== 'undefined' ? window : globalThis);
