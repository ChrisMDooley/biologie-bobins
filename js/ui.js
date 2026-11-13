/*
 * ui.js — small DOM helpers shared by all screens.
 */
(function (root) {
  'use strict';
  var BIO = root.BIO;

  // **bold** → <b>, newlines → paragraphs handled by caller
  function rich(s) {
    var frag = document.createDocumentFragment(), parts = String(s == null ? '' : s).split(/(\*\*[^*]+\*\*)/);
    parts.forEach(function (p) {
      if (/^\*\*[^*]+\*\*$/.test(p)) { var b = document.createElement('b'); b.textContent = p.slice(2, -2); frag.appendChild(b); }
      else if (p) frag.appendChild(document.createTextNode(p));
    });
    return frag;
  }
  // text for speech: no markdown, no emoji, nicer abbreviations
  function say(s) {
    return String(s || '').replace(/\*\*/g, '').replace(/[\u{1F300}-\u{1FAFF}☀-➿️]/gu, '')
      .replace(/z\. B\./g, 'zum Beispiel').replace(/ca\./g, 'circa').replace(/°C/g, ' Grad').replace(/km\/h/g, 'Kilometer pro Stunde')
      .replace(/→/g, ', dann ').replace(/↔/g, ' gegenüber ').replace(/\s+/g, ' ').trim();
  }

  function h(tag, attrs, kids) {
    var e = document.createElement(tag);
    attrs = attrs || {};
    for (var k in attrs) {
      var v = attrs[k];
      if (v == null || v === false) continue;
      if (k === 'class') e.className = v;
      else if (k === 'text') e.textContent = v;
      else if (k === 'rich') e.appendChild(rich(v));
      else if (k === 'html') e.innerHTML = v;
      else if (k.indexOf('on') === 0 && typeof v === 'function') e.addEventListener(k.slice(2), v);
      else e.setAttribute(k, v === true ? '' : v);
    }
    (kids || []).forEach(function (c) { if (c != null && c !== false) e.appendChild(typeof c === 'string' ? document.createTextNode(c) : c); });
    return e;
  }

  var settingsRef = null;
  function speak(text, slow) {
    var st = settingsRef ? settingsRef() : {};
    return BIO.speech.speak(say(text), { rate: slow ? 0.6 : (st.rate || 0.85), voiceName: st.voice || '' });
  }
  function readBtn(getText, label, cls) {
    if (!BIO.speech.supported) return null;
    return h('button', { class: 'btn soft read ' + (cls || ''), type: 'button', title: 'Vorlesen', 'aria-label': 'Vorlesen', onclick: function (e) { e.stopPropagation(); speak(typeof getText === 'function' ? getText() : getText); } }, [label || '🔊']);
  }
  function robinSays(robinEl, text, cls) { return h('div', { class: 'robin-says ' + (cls || '') }, [robinEl, h('p', { class: 'bubble', rich: text })]); }
  function coin(size) { var c = h('span', { class: 'bio-coin', 'aria-hidden': 'true' }); if (size) c.style.width = c.style.height = size + 'px'; return c; }
  function bar(v, cls) { var pct = Math.round(Math.max(0, Math.min(1, v || 0)) * 100); return h('span', { class: 'mbar ' + (cls || '') }, [h('span', { class: 'mbar-fill', style: 'width:' + pct + '%' })]); }
  function modal(title, body, opts) {
    opts = opts || {};
    var close, box = h('div', { class: 'modal', role: 'dialog', 'aria-modal': 'true', 'aria-label': title }, [
      h('div', { class: 'modal-head' }, [h('h2', { text: title }), h('button', { class: 'link modal-x', type: 'button', 'aria-label': 'Schließen', text: '✕', onclick: function () { close(); } })]), body]);
    var back = h('div', { class: 'modal-back', onclick: function (e) { if (e.target === back) close(); } }, [box]);
    function esc(e) { if (e.key === 'Escape') close(); }
    close = function () { back.remove(); document.removeEventListener('keydown', esc); if (opts.onClose) opts.onClose(); };
    document.addEventListener('keydown', esc);
    document.body.appendChild(back);
    return close;
  }
  // a figure with legend and caption
  function figure(name, opts, legendOverride) {
    var f = BIO.fig(name, opts);
    var leg = legendOverride === false ? null : f.legend;
    return h('figure', { class: 'figbox' }, [
      zoomable(h('div', { class: 'figsvg', html: f.svg })),
      leg ? h('ol', { class: 'legend' + (leg[0] && leg[0].swatch ? ' swatches' : '') }, leg.map(function (l) {
        return h('li', {}, [l.swatch ? h('span', { class: 'sw', style: 'background:' + l.color }) : h('span', { class: 'num', style: 'border-color:' + (l.color || '#2A2530'), text: String(l.n) }), h('span', { text: l.label })]);
      })) : null,
      f.caption ? h('figcaption', { text: f.caption }) : null]);
  }
  // tap a diagram to see it bigger (phones)
  function zoomable(el) { el.title = 'Antippen zum Vergrößern'; el.addEventListener('click', function (e) { if (e.target.closest('.tip')) return; el.classList.toggle('zoom'); }); return el; }
  function table(t) {
    return h('div', { class: 'tablewrap' }, [h('table', { class: 'bt' }, [
      h('thead', {}, [h('tr', {}, t.head.map(function (c) { return h('th', { text: c }); }))]),
      h('tbody', {}, t.rows.map(function (r) { return h('tr', {}, r.map(function (c, i) { return h(i === 0 ? 'th' : 'td', { text: c }); })); }))])]);
  }
  function fmtDate(t) { if (!t) return '–'; var d = new Date(t); return ('0' + d.getDate()).slice(-2) + '.' + ('0' + (d.getMonth() + 1)).slice(-2) + '.'; }
  function shuffle(a, rnd) { a = a.slice(); rnd = rnd || Math.random; for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

  BIO.ui = { h: h, rich: rich, say: say, speak: speak, readBtn: readBtn, robinSays: robinSays, coin: coin, bar: bar, modal: modal, figure: figure, zoomable: zoomable, table: table, fmtDate: fmtDate, shuffle: shuffle,
    useSettings: function (fn) { settingsRef = fn; } };
})(typeof window !== 'undefined' ? window : globalThis);
