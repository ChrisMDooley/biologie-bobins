/*
 * rb-card.js — the one line Robin's Bobins shows on Biologie-Bobins' card
 * ("9 von 24 Lernzielen sicher · heute 12 Aufgaben"). Loaded by the Robin's Bobins home page
 * (and the guest start page) from ../biologie-bobins/rb-card.js; reads only this app's own storage.
 */
(function (root) {
  'use strict';
  root.RBBiologie = {
    cardInfo: function (childId) {
      var doc = null;
      try { doc = JSON.parse(localStorage.getItem('biologie-bobins:' + childId) || 'null'); } catch (e) { doc = null; }
      if (!doc || !doc.answers || !doc.answers.length) return 'Wirbeltiere, Gebisse, Wiederkäuer & Co. – Lernkontrolle Nr. 1';
      var today = new Date().toDateString(), n = doc.answers.filter(function (a) { return new Date(a.t).toDateString() === today; }).length;
      var by = {}; doc.answers.forEach(function (a) { (by[a.o] = by[a.o] || []).push(a.s); });
      var safe = 0; Object.keys(by).forEach(function (o) { var l = by[o].slice(-12), acc = l.reduce(function (s, x) { return s + x; }, 0) / l.length; if (by[o].length >= 8 && acc >= 0.85) safe++; });
      var parts = [safe + ' von 24 Lernzielen sicher'];
      if (n) parts.push('heute ' + n + (n === 1 ? ' Aufgabe' : ' Aufgaben'));
      return parts.join(' · ');
    }
  };
})(typeof window !== 'undefined' ? window : globalThis);
