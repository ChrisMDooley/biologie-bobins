/*
 * curriculum.js — the teacher's checklist "Checkliste für die Lernkontrolle Nr. 1 (Klasse 6B)".
 * 24 objectives in 8 modules. Lessons and questions live in data/mod-*.js and register here.
 *
 * EDITING CONTENT (no programming needed beyond careful copy & paste):
 *   - Lessons:   data/mod-a.js … data/mod-h.js  →  BIO.content.lesson({ … })
 *   - Questions: same files                     →  BIO.content.q({ … })
 *   - Weekend plan: below (PLAN)
 *   - Conventions that may differ from the teacher's (Zahnformel-Schreibweise, Eichhörnchen im Winter,
 *     5-Schritt-Lesemethode, Haustier/Nutztier) are marked with  // LEHRKRAFT  in the module files.
 */
(function (root) {
  'use strict';
  var MODULES = [
    { id: 'A', title: 'Wirbeltiere und ihre Entwicklung', icon: '🐟', color: '#2F6DB5' },
    { id: 'B', title: 'Merkmale der Säugetiere', icon: '🐄', color: '#E0673B' },
    { id: 'C', title: 'Skelette und Fortbewegung', icon: '🦴', color: '#8C6A3F' },
    { id: 'D', title: 'Schädel, Gebisse und Zähne', icon: '🦷', color: '#7B5EA7' },
    { id: 'E', title: 'Hund und Katze', icon: '🐕', color: '#C9473A' },
    { id: 'F', title: 'Haustiere und Nutztiere', icon: '🐖', color: '#D46A8C' },
    { id: 'G', title: 'Eichhörnchen und Winter', icon: '🐿️', color: '#3E9A62' },
    { id: 'H', title: 'Wissenschaftlich arbeiten', icon: '📊', color: '#2C9C9A' }
  ];
  var OBJ = [
    [1, 'A', 'den Stammbaum der Wirbeltiere erklären', 'Stammbaum'],
    [2, 'A', 'die fünf Klassen der Wirbeltiere benennen', 'Fünf Klassen'],
    [3, 'A', 'wesentliche Merkmale der fünf Wirbeltierklassen beschreiben', 'Merkmale der Klassen'],
    [4, 'A', 'die Begriffe wechselwarm und gleichwarm mit Beispiel erklären', 'wechselwarm / gleichwarm'],
    [5, 'B', 'die Merkmale der Säugetiere beschreiben', 'Merkmale Säugetiere'],
    [6, 'B', 'die Begriffe Nesthocker und Nestflüchter erklären und mit Beispielen belegen', 'Nesthocker / Nestflüchter'],
    [7, 'C', 'die Skelette von Hund, Katze, Rind und Pferd beschriften und Analogien erkennen', 'Skelette beschriften'],
    [8, 'C', 'die Begriffe Paarhufer und Unpaarhufer erklären', 'Paarhufer / Unpaarhufer'],
    [9, 'C', 'die Begriffe Sohlen-, Zehen- und Zehenspitzengänger anhand von Beispielen erklären', 'Sohlen-, Zehen-, Zehenspitzengänger'],
    [10, 'D', 'Säugetierschädel anhand ihrer Gebisse unterscheiden', 'Schädel unterscheiden'],
    [11, 'D', 'die Zahntypen und ihre jeweiligen Funktionen erklären', 'Zahntypen'],
    [12, 'D', 'die Zahnformeln von Hund, Katze, Rind, Eichhörnchen sowie vom Menschen notieren', 'Zahnformeln'],
    [13, 'E', 'das Jagd- und Beutefangverhalten von Hund und Katze beschreiben und mit Fachausdrücken benennen', 'Jagdverhalten'],
    [14, 'E', 'den Zusammenhang zwischen Körperbau und Jagdverhalten erklären', 'Körperbau & Jagd'],
    [15, 'E', 'typische Verhaltensweisen von Hund und Katze beschreiben und erklären', 'Verhalten Hund & Katze'],
    [16, 'E', 'Ähnlichkeiten zwischen Hunden und ihrem Stammvater, dem Wolf, benennen', 'Hund und Wolf'],
    [17, 'F', 'zwischen Haustieren und Nutztieren unterscheiden', 'Haustier / Nutztier'],
    [18, 'F', 'arttypische Verhaltensweisen von Schweinen beschreiben', 'Verhalten Schwein'],
    [19, 'F', 'artgerechte Tierhaltung gegenüber Massentierhaltung kritisch beurteilen', 'Tierhaltung beurteilen'],
    [20, 'F', 'das Prinzip des Wiederkäuens anhand der Verdauung beim Rind beschreiben', 'Wiederkäuen'],
    [21, 'G', 'Angepasstheiten des Eichhörnchens an das Leben auf Bäumen beschreiben', 'Eichhörnchen'],
    [22, 'G', 'Anpassungen von Wildtieren an den Winter beschreiben', 'Tiere im Winter'],
    [23, 'H', 'Tabellen und Diagramme beschreiben und auswerten', 'Tabellen & Diagramme'],
    [24, 'H', 'Texte nach der 5-Schritt-Lesetechnik inhaltlich erschließen', '5-Schritt-Lesetechnik']
  ].map(function (r) { return { id: r[0], module: r[1], text: r[2], short: r[3] }; });

  // Weekend plan (optional). Blocks are short; breaks are suggestions, never penalties.
  var PLAN = [
    { day: 'Samstag', blocks: [
      { id: 'sa1', title: 'Wirbeltierklassen und Säugetiere', objs: [1, 2, 3, 4, 5, 6], min: 40 },
      { id: 'sa-p1', pause: 10 },
      { id: 'sa2', title: 'Skelette und Fortbewegung', objs: [7, 8, 9], min: 35 },
      { id: 'sa-p2', pause: 15 },
      { id: 'sa3', title: 'Zähne und Zahnformeln', objs: [10, 11, 12], min: 40 },
      { id: 'sa-p3', pause: 10 },
      { id: 'sa4', title: 'Kurzes gemischtes Blitzquiz', activity: 'blitz', objs: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], min: 10 }] },
    { day: 'Sonntag', blocks: [
      { id: 'so1', title: 'Hund, Katze und Wolf', objs: [13, 14, 15, 16], min: 35 },
      { id: 'so-p1', pause: 10 },
      { id: 'so2', title: 'Nutztiere und Wiederkäuer', objs: [17, 18, 19, 20], min: 35 },
      { id: 'so-p2', pause: 10 },
      { id: 'so3', title: 'Eichhörnchen und Winter', objs: [21, 22], min: 25 },
      { id: 'so4', title: 'Diagramme und 5-Schritt-Lesetechnik', objs: [23, 24], min: 25 },
      { id: 'so-p3', pause: 20 },
      { id: 'so5', title: 'Ganze Lernkontrolle simulieren (45 Min.)', activity: 'test', min: 45 },
      { id: 'so-p4', pause: 10 },
      { id: 'so6', title: 'Schwächen gezielt trainieren', activity: 'schwach', min: 20 }] }
  ];

  var lessons = {}, questions = [];
  root.BIO = root.BIO || {};
  root.BIO.curriculum = { modules: MODULES, objectives: OBJ, plan: PLAN, lessons: lessons, questions: questions,
    obj: function (id) { return OBJ[id - 1]; }, module: function (id) { return MODULES.filter(function (m) { return m.id === id; })[0]; } };
  root.BIO.content = {
    lesson: function (l) { lessons[l.obj] = l; },
    q: function () { for (var i = 0; i < arguments.length; i++) questions.push(arguments[i]); }
  };
})(typeof window !== 'undefined' ? window : globalThis);
