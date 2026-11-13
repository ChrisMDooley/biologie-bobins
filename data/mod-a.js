/* Modul A — Wirbeltiere und ihre Entwicklung (Lernziele 1–4) */
(function (B) {
  'use strict';
  var L = B.content.lesson, Q = B.content.q;

  // ------------------------------------------------------------------ 1 Stammbaum
  L({ obj: 1, title: 'Der Stammbaum der Wirbeltiere',
    text: [
      'Alle **Wirbeltiere** haben eine **Wirbelsäule** und einen Schädel. Sie stammen von gemeinsamen Vorfahren ab.',
      'Ein **Stammbaum** zeigt, wie Tiergruppen miteinander **verwandt** sind. Unten ist früher, oben ist heute.',
      'Jede Verzweigung ist ein **gemeinsamer Vorfahre**. Diese Vorfahren leben heute nicht mehr. Wir kennen sie aus **Fossilien**.',
      'Zuerst gab es nur **Fische** im Wasser. Aus fischähnlichen Vorfahren entwickelten sich die ersten Landwirbeltiere: Sie hatten Beine und eine Lunge. Von ihnen stammen die **Amphibien** ab.',
      'Später entstand das **Ei mit Schale**. Nun konnten Tiere ganz an Land leben. Aus diesen Vorfahren entstanden zwei Linien: eine führt zu den **Säugetieren**, die andere zu den **Reptilien** und **Vögeln**.',
      'Vögel stammen von **Dinosauriern** ab. Darum sind Vögel mit den Reptilien näher verwandt als mit den Säugetieren.',
      '**Wichtig:** Heutige Tiere sind nicht die Vorfahren anderer heutiger Tiere. Ein Frosch ist nicht der Urgroßvater einer Eidechse. Beide haben aber gemeinsame Vorfahren.'
    ],
    fig: { n: 'tree' },
    vocab: [['Wirbeltier', 'Wir-bel-tier', 'Tier mit Wirbelsäule'], ['Stammbaum', 'Stamm-baum', 'Bild, das die Verwandtschaft zeigt'], ['Vorfahre', 'Vor-fah-re', 'Tier, von dem spätere Tiere abstammen'],
      ['Fossil', 'Fos-sil', 'versteinerter Rest eines Lebewesens'], ['Evolution', 'E-vo-lu-ti-on', 'langsame Veränderung der Lebewesen über viele Generationen']],
    example: { q: 'Sind Vögel enger mit Krokodilen oder mit Hunden verwandt?', a: 'Mit Krokodilen. Im Stammbaum trennen sich Vögel und Reptilien erst spät (Verzweigung weit oben). Die Linie zu den Säugetieren hat sich schon früher abgetrennt.' },
    notes: [{ k: 'Genauer', t: 'Säugetiere stammen nicht von heutigen Reptilien ab, sondern von frühen Landwirbeltieren, die reptilienähnlich aussahen.' }],
    summary: ['Ein Stammbaum zeigt Verwandtschaft: unten früher, oben heute.', 'Verzweigungen = gemeinsame Vorfahren.', 'Reihenfolge des Auftretens: Fische → Amphibien → Reptilien → Säugetiere → Vögel.', 'Vögel und Reptilien sind enger verwandt als Vögel und Säugetiere.'],
    simple: 'Stell dir einen Familienstammbaum vor: Du und dein Cousin habt gemeinsame Großeltern. Du bist aber nicht der Vorfahr deines Cousins. Genauso haben Frosch und Eidechse gemeinsame Vorfahren.',
    check: ['a1-01', 'a1-03', 'a1-05', 'a1-07'] });

  Q({ id: 'a1-01', o: 1, t: 'mc', lv: 1, q: 'Was zeigt ein Stammbaum der Wirbeltiere?', a: 'wie die Tiergruppen miteinander verwandt sind', w: ['welches Tier am größten ist', 'wo die Tiere heute leben', 'was die Tiere fressen'], why: 'Ein Stammbaum zeigt Verwandtschaft und gemeinsame Vorfahren.' },
    { id: 'a1-02', o: 1, t: 'order', lv: 1, q: 'Bringe die Wirbeltierklassen in die Reihenfolge, in der sie zuerst auftraten (zuerst oben).', i: ['Fische', 'Amphibien', 'Reptilien', 'Säugetiere', 'Vögel'], why: 'Fische ca. 500, Amphibien ca. 370, Reptilien ca. 320, Säugetiere ca. 220, Vögel ca. 150 Millionen Jahre.' },
    { id: 'a1-03', o: 1, t: 'mc', lv: 2, q: 'Was bedeutet eine Verzweigung (ein Punkt) im Stammbaum?', a: 'Dort lebte ein gemeinsamer Vorfahre der Gruppen.', w: ['Dort sind die Tiere ausgestorben.', 'Dort hat sich ein Tier in ein anderes verwandelt.', 'Dort leben die Tiere heute.'], why: 'Jede Verzweigung steht für gemeinsame Vorfahren, die es heute nicht mehr gibt.' },
    { id: 'a1-04', o: 1, t: 'match', lv: 2, q: 'Ordne die Buchstaben im Stammbaum den Klassen zu.', fig: { n: 'tree', o: { hide: true, letters: true, innov: true } },
      p: [['A', 'Fische'], ['B', 'Amphibien'], ['C', 'Säugetiere'], ['D', 'Reptilien'], ['E', 'Vögel']], why: 'Fische zweigen zuerst ab, dann Amphibien. Danach trennen sich Säugetiere von der Linie der Reptilien und Vögel.' },
    { id: 'a1-05', o: 1, t: 'tf', lv: 2, q: 'Richtig oder falsch?', s: [['Amphibien sind die Vorfahren der heutigen Reptilien.', false], ['Amphibien und Reptilien haben gemeinsame Vorfahren.', true], ['Vögel stammen von Dinosauriern ab.', true], ['Fische sind die ältesten Wirbeltiere.', true]],
      why: 'Heutige Tiergruppen sind nicht Vorfahren anderer heutiger Gruppen. Sie haben gemeinsame Vorfahren, die ausgestorben sind.' },
    { id: 'a1-06', o: 1, t: 'mc', lv: 3, q: 'Mit welcher Gruppe sind Vögel am nächsten verwandt?', a: 'Reptilien (z. B. Krokodile)', w: ['Säugetiere', 'Amphibien', 'Fische'], why: 'Vögel stammen von Dinosauriern ab. Im Stammbaum trennen sich Vögel und Reptilien als Letzte.' },
    { id: 'a1-07', o: 1, t: 'match', lv: 2, q: 'Welche neue Eigenschaft gehört zu welcher Stelle im Stammbaum?', p: [['erste Landwirbeltiere', 'Beine und Lunge'], ['Weg der Säugetiere', 'Fell und Milch'], ['Weg der Vögel', 'Federn'], ['vor Reptilien, Vögeln und Säugetieren', 'Ei mit Schale']],
      why: 'Neue Merkmale entstehen an einer Stelle und werden an alle Nachfahren weitergegeben.' },
    { id: 'a1-08', o: 1, t: 'text', lv: 3, q: 'Erkläre: Warum ist der Satz „Der Frosch ist der Vorfahre der Eidechse“ falsch?',
      k: [{ l: 'Beide leben heute (heutige Tiere)', a: ['heute', 'leben beide', 'gleichzeitig', 'heutig'] }, { l: 'Sie haben gemeinsame Vorfahren', a: ['gemeinsam', 'vorfahr', 'urahn'] }, { l: 'Die Vorfahren sind ausgestorben', a: ['ausgestorben', 'gibt es nicht mehr', 'fossil', 'nicht mehr'] }],
      m: 'Frosch und Eidechse leben beide heute. Keiner ist der Vorfahre des anderen. Sie haben aber gemeinsame Vorfahren. Diese sind ausgestorben.', why: 'Im Stammbaum stehen alle heutigen Klassen oben nebeneinander.' },
    { id: 'a1-09', o: 1, t: 'fill', lv: 2, q: 'Ergänze.', s: 'Die Verzweigungen im Stammbaum stehen für gemeinsame {Vorfahren|Vorfahre|Ahnen}. Wir kennen sie aus {Fossilien|Fossil|Versteinerungen}.', bank: ['Vorfahren', 'Fossilien', 'Nachkommen', 'Knochen'], why: 'Fossilien sind versteinerte Reste von Lebewesen.' },
    { id: 'a1-10', o: 1, t: 'mc', lv: 3, q: 'Welche Erfindung der Natur machte ein Leben ganz an Land möglich, auch für die Fortpflanzung?', a: 'das Ei mit Schale', w: ['die Kiemen', 'die Flosse', 'der Laich im Wasser'], why: 'Das Ei mit Schale trocknet an Land nicht aus. Amphibien müssen zum Laichen noch ins Wasser.' },
    { id: 'a1-11', o: 1, t: 'mc', lv: 2, q: 'Woran erkennt man im Stammbaum, dass Säugetiere und Reptilien enger verwandt sind als Säugetiere und Fische?', a: 'Ihre Linien trennen sich erst weiter oben (später).', w: ['Sie stehen weiter links.', 'Sie sind größer gezeichnet.', 'Ihre Namen beginnen mit S und R.'], why: 'Je später (höher) sich zwei Linien trennen, desto enger sind sie verwandt.' });

  // ------------------------------------------------------------------ 2 Fünf Klassen
  L({ obj: 2, title: 'Die fünf Klassen der Wirbeltiere',
    text: [
      'Die Wirbeltiere teilt man in **fünf Klassen** ein:',
      '**Fische** 🐟 – z. B. Forelle, Hai, Karpfen.',
      '**Amphibien** (Lurche) 🐸 – z. B. Frosch, Kröte, Molch, Salamander.',
      '**Reptilien** (Kriechtiere) 🦎 – z. B. Eidechse, Schlange, Schildkröte, Krokodil.',
      '**Vögel** 🐦 – z. B. Amsel, Huhn, Pinguin, Strauß.',
      '**Säugetiere** 🐕 – z. B. Hund, Mensch, Wal, Fledermaus.',
      'Manche Tiere sehen anders aus, als ihre Klasse vermuten lässt. Der **Wal** lebt im Wasser, ist aber ein **Säugetier**. Die **Blindschleiche** sieht aus wie eine Schlange, ist aber eine **Eidechse** ohne Beine (Reptil). Der **Pinguin** kann nicht fliegen, ist aber ein **Vogel**.'
    ],
    fig: { n: 'tree' },
    vocab: [['Amphibien', 'Am-phi-bi-en', 'Lurche: leben im Wasser und an Land'], ['Reptilien', 'Rep-ti-li-en', 'Kriechtiere mit Hornschuppen'], ['Säugetiere', 'Säu-ge-tie-re', 'Tiere, die ihre Jungen mit Milch säugen'], ['Klasse', 'Klas-se', 'große Gruppe von verwandten Tieren']],
    example: { q: 'Zu welcher Klasse gehört der Delfin?', a: 'Zu den Säugetieren: Er atmet mit Lungen, bringt lebende Junge zur Welt und säugt sie mit Milch – auch wenn er im Wasser lebt.' },
    notes: [{ k: 'Rechtschreibung', t: 'Amphibien mit „ph“, Reptilien mit „p-t“. Sprich langsam: Am-phi-bi-en, Rep-ti-li-en.' }],
    summary: ['Fische, Amphibien, Reptilien, Vögel, Säugetiere.', 'Die Klasse erkennt man an den Merkmalen, nicht am Lebensraum.', 'Wal und Delfin = Säugetiere · Blindschleiche = Reptil · Pinguin = Vogel.'],
    simple: 'Merksatz für die fünf Klassen: „Fünf Affen Reiten Viele Säue“ → Fische, Amphibien, Reptilien, Vögel, Säugetiere.',
    check: ['a2-01', 'a2-02', 'a2-04'] });

  Q({ id: 'a2-01', o: 2, t: 'multi', lv: 1, q: 'Welche sind Klassen der Wirbeltiere? Wähle alle richtigen.', a: ['Fische', 'Amphibien', 'Reptilien', 'Vögel', 'Säugetiere'], w: ['Insekten', 'Spinnen', 'Würmer'], why: 'Insekten, Spinnen und Würmer haben keine Wirbelsäule – sie sind wirbellose Tiere.' },
    { id: 'a2-02', o: 2, t: 'sort', lv: 1, q: 'Ordne jedes Tier seiner Klasse zu.', b: ['Fische', 'Amphibien', 'Reptilien', 'Vögel', 'Säugetiere'],
      i: [['Forelle', 0], ['Hai', 0], ['Frosch', 1], ['Molch', 1], ['Eidechse', 2], ['Schildkröte', 2], ['Amsel', 3], ['Pinguin', 3], ['Fledermaus', 4], ['Wal', 4]], why: 'Hai = Fisch, Pinguin = Vogel, Fledermaus und Wal = Säugetiere.' },
    { id: 'a2-03', o: 2, t: 'mc', lv: 2, q: 'Der Wal lebt im Meer. Zu welcher Klasse gehört er?', a: 'Säugetiere', w: ['Fische', 'Amphibien', 'Reptilien'], why: 'Wale atmen mit Lungen, gebären lebende Junge und säugen sie mit Milch.' },
    { id: 'a2-04', o: 2, t: 'fill', lv: 2, q: 'Schreibe die fünf Klassen der Wirbeltiere.', s: '1. {Fische} 2. {Amphibien|Lurche} 3. {Reptilien|Kriechtiere} 4. {Vögel} 5. {Säugetiere}', anyOrder: true, why: 'Achte auf die Schreibung: Am-phi-bi-en, Rep-ti-li-en, Säu-ge-tie-re.' },
    { id: 'a2-05', o: 2, t: 'mc', lv: 2, q: 'Die Blindschleiche hat keine Beine. Was ist sie?', a: 'ein Reptil (eine Echse ohne Beine)', w: ['eine Schlange', 'ein Wurm', 'eine Amphibie'], why: 'Sie hat Hornschuppen und Augenlider wie Eidechsen. Sie ist eine beinlose Echse.' },
    { id: 'a2-06', o: 2, t: 'match', lv: 1, q: 'Ordne den deutschen Namen dem Fachbegriff zu.', p: [['Lurche', 'Amphibien'], ['Kriechtiere', 'Reptilien'], ['Tiere, die Milch geben', 'Säugetiere']], why: 'Lurche = Amphibien, Kriechtiere = Reptilien.' },
    { id: 'a2-07', o: 2, t: 'mc', lv: 2, q: 'Welches Tier ist KEIN Säugetier?', a: 'Pinguin', w: ['Delfin', 'Fledermaus', 'Igel'], why: 'Der Pinguin hat Federn und legt Eier – er ist ein Vogel.' },
    { id: 'a2-08', o: 2, t: 'sort', lv: 2, q: 'Amphibie oder Reptil?', b: ['Amphibien', 'Reptilien'], i: [['Erdkröte', 0], ['Feuersalamander', 0], ['Bergmolch', 0], ['Laubfrosch', 0], ['Zauneidechse', 1], ['Ringelnatter', 1], ['Krokodil', 1], ['Blindschleiche', 1]],
      why: 'Amphibien haben eine nackte, feuchte Haut. Reptilien haben trockene Hornschuppen.' },
    { id: 'a2-09', o: 2, t: 'mc', lv: 3, q: 'Ein Tier lebt im Wasser, hat Lungen, ein Fell und säugt seine Jungen. Welche Klasse?', a: 'Säugetiere', w: ['Fische', 'Amphibien', 'Vögel'], why: 'Fell und Milch sind typische Säugetier-Merkmale (z. B. Fischotter, Biber).' },
    { id: 'a2-10', o: 2, t: 'mc', lv: 2, q: 'Wie viele Klassen der Wirbeltiere lernst du?', a: '5', w: ['3', '4', '6'], why: 'Fische, Amphibien, Reptilien, Vögel, Säugetiere.' });

  // ------------------------------------------------------------------ 3 Merkmale der Klassen
  L({ obj: 3, title: 'Merkmale der fünf Klassen',
    text: [
      'Jede Klasse hat typische **Merkmale**. Vergleiche: **Haut**, **Atmung**, **Fortpflanzung**, **Lebensraum** und **Körpertemperatur**.',
      '**Fische:** Schuppen und Schleim · Kiemen · Laich (Eier ohne Schale) im Wasser, meist äußere Befruchtung · Wasser · wechselwarm.',
      '**Amphibien:** nackte, feuchte, drüsenreiche Haut · Larven (Kaulquappen) mit Kiemen, erwachsene Tiere mit Lungen und Hautatmung · Laich im Wasser · Wasser und Land · wechselwarm. Aus der Larve wird ein Landtier: **Metamorphose**.',
      '**Reptilien:** trockene Haut mit **Hornschuppen** · Lungen · innere Befruchtung, Eier mit ledriger oder harter Schale an Land · vor allem Land · wechselwarm.',
      '**Vögel:** **Federn**, Hornschuppen an den Beinen · Lungen (mit Luftsäcken) · innere Befruchtung, Eier mit **Kalkschale**, sie brüten · Land und Luft · gleichwarm.',
      '**Säugetiere:** **Haare/Fell** · Lungen · innere Befruchtung, meist **lebend geboren**, Junge trinken **Milch** · fast überall · gleichwarm.'
    ],
    table: { head: ['', 'Fische', 'Amphibien', 'Reptilien', 'Vögel', 'Säugetiere'], rows: [
      ['Haut', 'Schuppen, Schleim', 'nackt, feucht', 'Hornschuppen', 'Federn', 'Haare / Fell'],
      ['Atmung', 'Kiemen', 'Larve: Kiemen; erwachsen: Lunge + Haut', 'Lunge', 'Lunge (+ Luftsäcke)', 'Lunge'],
      ['Fortpflanzung', 'Laich im Wasser', 'Laich im Wasser, Metamorphose', 'Eier mit weicher/harter Schale an Land', 'Eier mit Kalkschale, Brüten', 'meist lebend geboren, Milch'],
      ['Lebensraum', 'Wasser', 'Wasser und Land', 'meist Land', 'Land, Luft', 'überall'],
      ['Temperatur', 'wechselwarm', 'wechselwarm', 'wechselwarm', 'gleichwarm', 'gleichwarm']] },
    vocab: [['Kiemen', 'Kie-men', 'Atmungsorgan im Wasser'], ['Laich', 'Laich', 'Eier ohne Schale im Wasser'], ['Metamorphose', 'Me-ta-mor-pho-se', 'Umwandlung von der Larve zum erwachsenen Tier'], ['Hornschuppen', 'Horn-schup-pen', 'trockene Schuppen aus Horn'], ['Befruchtung', 'Be-fruch-tung', 'Ei- und Samenzelle verschmelzen']],
    example: { q: 'Ein Tier hat trockene Hornschuppen, atmet mit Lungen und legt Eier mit ledriger Schale an Land. Welche Klasse?', a: 'Reptilien. Hornschuppen + Eier an Land passen nur dazu (Vögel hätten Federn).' },
    notes: [{ k: 'Ausnahme', t: 'Schnabeltier und Ameisenigel sind Säugetiere, legen aber Eier. Auch manche Fische, Amphibien und Reptilien bringen lebende Junge zur Welt (z. B. Feuersalamander, Blindschleiche).' }],
    summary: ['Haut: Schuppen – nackt – Hornschuppen – Federn – Fell.', 'Atmung: nur Fische (und Amphibien-Larven) mit Kiemen.', 'Nur Vögel und Säugetiere sind gleichwarm.', 'Amphibien machen eine Metamorphose.'],
    simple: 'Frage dich bei jedem Tier: Was trägt es auf der Haut? Federn → Vogel. Fell → Säugetier. Trockene Schuppen → Reptil. Nackte, feuchte Haut → Amphibie. Kiemen und Flossen → Fisch.',
    check: ['a3-01', 'a3-02', 'a3-05', 'a3-07'] });

  Q({ id: 'a3-01', o: 3, t: 'match', lv: 1, q: 'Welche Haut gehört zu welcher Klasse?', p: [['Fische', 'Schuppen mit Schleim'], ['Amphibien', 'nackte, feuchte Haut'], ['Reptilien', 'trockene Hornschuppen'], ['Vögel', 'Federn'], ['Säugetiere', 'Haare / Fell']], why: 'Die Körperbedeckung ist das schnellste Erkennungsmerkmal.' },
    { id: 'a3-02', o: 3, t: 'sort', lv: 2, q: 'Wie atmen die erwachsenen Tiere?', b: ['Kiemen', 'Lunge'], i: [['Hai', 0], ['Karpfen', 0], ['Wal', 1], ['Krokodil', 1], ['Taube', 1], ['Frosch (erwachsen)', 1]], why: 'Nur Fische atmen ihr ganzes Leben mit Kiemen. Der Wal kommt zum Atmen an die Oberfläche.' },
    { id: 'a3-03', o: 3, t: 'mc', lv: 2, q: 'Welche Klasse macht eine Metamorphose (Larve → erwachsenes Tier)?', a: 'Amphibien', w: ['Reptilien', 'Vögel', 'Säugetiere'], why: 'Aus der Kaulquappe mit Kiemen wird ein Frosch mit Lungen.' },
    { id: 'a3-04', o: 3, t: 'tf', lv: 2, q: 'Richtig oder falsch?', s: [['Reptilien legen ihre Eier ins Wasser.', false], ['Vogeleier haben eine Kalkschale.', true], ['Amphibien legen Laich ohne feste Schale.', true], ['Alle Säugetiere bringen lebende Junge zur Welt.', false]],
      why: 'Reptilien legen Eier mit Schale an Land. Ausnahme bei Säugetieren: Schnabeltier und Ameisenigel legen Eier.' },
    { id: 'a3-05', o: 3, t: 'mc', lv: 3, q: 'Warum können Reptilien anders als Amphibien weit weg vom Wasser leben?', a: 'Ihre Haut und ihre Eier mit Schale trocknen nicht aus.', w: ['Sie können besser schwimmen.', 'Sie haben Kiemen und Lungen.', 'Sie sind gleichwarm.'], why: 'Hornschuppen schützen vor Austrocknung; das Ei mit Schale braucht kein Wasser.' },
    { id: 'a3-06', o: 3, t: 'text', lv: 3, q: 'Vergleiche Amphibien und Reptilien. Nenne zwei Unterschiede.',
      k: [{ l: 'Haut: nackt/feucht ↔ Hornschuppen/trocken', a: ['horn', 'schuppe', 'nackt', 'feucht', 'trocken'] }, { l: 'Eier: Laich im Wasser ↔ Eier mit Schale an Land', a: ['laich', 'schale', 'eier an land', 'wasser'] }, { l: 'Atmung/Entwicklung: Larve mit Kiemen, Metamorphose ↔ nur Lunge', a: ['kieme', 'larve', 'metamorph', 'kaulquappe'] }],
      need: 2, m: 'Amphibien haben eine nackte, feuchte Haut, Reptilien trockene Hornschuppen. Amphibien legen Laich ins Wasser, Reptilien legen Eier mit Schale an Land. Amphibien-Larven atmen mit Kiemen (Metamorphose), Reptilien atmen immer mit Lungen.', why: 'Nenne bei einem Vergleich immer beide Seiten.' },
    { id: 'a3-07', o: 3, t: 'mc', lv: 2, q: 'Ein Tier hat Federn, atmet mit Lungen und legt Eier mit Kalkschale. Welche Klasse?', a: 'Vögel', w: ['Reptilien', 'Säugetiere', 'Amphibien'], why: 'Federn gibt es nur bei Vögeln.' },
    { id: 'a3-08', o: 3, t: 'fill', lv: 2, q: 'Ergänze.', s: 'Fische atmen mit {Kiemen}. Die Larven der Frösche heißen {Kaulquappen|Kaulquappe|Larven}. Reptilien haben eine trockene Haut mit {Hornschuppen|Schuppen}.', bank: ['Kiemen', 'Kaulquappen', 'Hornschuppen', 'Federn', 'Lungen'], why: 'Kie-men · Kaul-quap-pen · Horn-schup-pen.' },
    { id: 'a3-09', o: 3, t: 'mc', lv: 3, q: 'Welches Merkmal haben ALLE fünf Klassen gemeinsam?', a: 'eine Wirbelsäule', w: ['Lungen', 'Eier mit Schale', 'eine gleichbleibende Körpertemperatur'], why: 'Darum heißen sie Wirbeltiere.' },
    { id: 'a3-10', o: 3, t: 'sort', lv: 2, q: 'Wo legen die Tiere ihre Eier ab?', b: ['im Wasser (Laich)', 'an Land (mit Schale)'], i: [['Forelle', 0], ['Grasfrosch', 0], ['Erdkröte', 0], ['Zauneidechse', 1], ['Meeresschildkröte', 1], ['Amsel', 1]], why: 'Auch Meeresschildkröten kommen zur Eiablage an den Strand.' },
    { id: 'a3-11', o: 3, t: 'mc', lv: 3, q: 'Ein Schüler sagt: „Der Wal ist ein Fisch, weil er im Wasser lebt.“ Was ist das beste Gegenargument?', a: 'Der Wal atmet mit Lungen und säugt seine Jungen – das sind Säugetier-Merkmale.', w: ['Der Wal ist zu groß für einen Fisch.', 'Der Wal hat keine Flossen.', 'Der Wal lebt auch an Land.'], why: 'Die Klasse bestimmt man nach den Merkmalen, nicht nach dem Lebensraum.' });

  // ------------------------------------------------------------------ 4 wechselwarm / gleichwarm
  L({ obj: 4, title: 'Wechselwarm und gleichwarm',
    text: [
      '**Wechselwarme** Tiere haben keine feste Körpertemperatur. Ihre Temperatur **folgt der Umgebung**: Ist es kalt, sind sie kalt und langsam. Ist es warm, sind sie warm und flink.',
      'Beispiele: **Fische, Amphibien, Reptilien** (z. B. Eidechse, Frosch, Forelle). Eine Eidechse sonnt sich am Morgen, um warm zu werden.',
      'Im Winter fallen wechselwarme Tiere in **Kältestarre** (Winterstarre). Sie können sich nicht mehr bewegen.',
      '**Gleichwarme** Tiere halten ihre Körpertemperatur fast **immer gleich** – egal, ob es kalt oder warm ist. Beim Menschen sind es etwa **37 °C**, bei Vögeln etwa **40–42 °C**.',
      'Beispiele: **Vögel und Säugetiere** (z. B. Maus, Hund, Amsel).',
      'Gleichwarm sein kostet viel **Energie**. Gleichwarme Tiere müssen darum viel **fressen**. **Fell und Federn** halten die Wärme im Körper. Bei Hitze kühlen sie sich ab, z. B. durch **Schwitzen** oder **Hecheln**.',
      'Vorteil: Gleichwarme Tiere bleiben auch bei Kälte aktiv. Nachteil: Sie brauchen viel Nahrung.'
    ],
    fig: { n: 'temp' },
    vocab: [['wechselwarm', 'wech-sel-warm', 'Körpertemperatur wechselt mit der Umgebung'], ['gleichwarm', 'gleich-warm', 'Körpertemperatur bleibt gleich'], ['Kältestarre', 'Käl-te-star-re', 'starrer Zustand bei Kälte (wechselwarme Tiere)'], ['Energie', 'E-ner-gie', 'Kraft, die aus der Nahrung kommt']],
    example: { q: 'Warum sieht man im Winter keine Eidechsen, aber Amseln?', a: 'Die Eidechse ist wechselwarm. Bei Kälte wird sie starr und versteckt sich in Winterstarre. Die Amsel ist gleichwarm. Sie hält ihre Temperatur durch Fressen und aufgeplusterte Federn und bleibt aktiv.' },
    notes: [{ k: 'Fachwort', t: 'In Büchern stehen auch „ektotherm“ (wechselwarm) und „endotherm“ (gleichwarm).' }],
    summary: ['Wechselwarm: Temperatur folgt der Umgebung – Fische, Amphibien, Reptilien.', 'Gleichwarm: Temperatur bleibt gleich – Vögel, Säugetiere.', 'Gleichwarm kostet viel Energie (Nahrung); Fell und Federn isolieren.'],
    simple: 'Wechselwarm ist wie ein Stein in der Sonne: warm in der Sonne, kalt im Schatten. Gleichwarm ist wie ein Haus mit Heizung: drinnen bleibt es immer gleich warm.',
    check: ['a4-01', 'a4-02', 'a4-04', 'a4-06'] });

  Q({ id: 'a4-01', o: 4, t: 'sort', lv: 1, q: 'Wechselwarm oder gleichwarm?', b: ['wechselwarm', 'gleichwarm'], i: [['Eidechse', 0], ['Grasfrosch', 0], ['Forelle', 0], ['Ringelnatter', 0], ['Maus', 1], ['Amsel', 1], ['Mensch', 1], ['Wal', 1]], why: 'Vögel und Säugetiere sind gleichwarm, Fische, Amphibien und Reptilien wechselwarm.' },
    { id: 'a4-02', o: 4, t: 'mc', lv: 1, q: 'Was bedeutet „wechselwarm“?', a: 'Die Körpertemperatur ändert sich mit der Umgebungstemperatur.', w: ['Das Tier ist immer warm.', 'Das Tier wechselt im Winter den Wohnort.', 'Das Tier ist im Sommer kalt und im Winter warm.'], why: 'Die Temperatur des Tieres folgt der Umgebung.' },
    { id: 'a4-03', o: 4, t: 'mc', lv: 2, q: 'Schau dir das Diagramm an. Welche Linie gehört zu einem gleichwarmen Tier?', fig: { n: 'temp' }, a: 'die Linie der Maus (bleibt bei etwa 37 °C)', w: ['die Linie der Eidechse', 'beide Linien', 'keine Linie'], why: 'Eine waagerechte Linie zeigt: Die Temperatur bleibt gleich.' },
    { id: 'a4-04', o: 4, t: 'mc', lv: 2, q: 'Warum müssen gleichwarme Tiere viel mehr fressen als wechselwarme Tiere gleicher Größe?', a: 'Sie brauchen viel Energie, um ihre Körpertemperatur zu halten.', w: ['Sie bewegen sich nie.', 'Sie haben einen größeren Magen.', 'Sie wachsen schneller.'], why: 'Das „Heizen“ des Körpers kostet Energie aus der Nahrung.' },
    { id: 'a4-05', o: 4, t: 'tf', lv: 2, q: 'Richtig oder falsch?', s: [['Eine Eidechse ist am Morgen oft langsam, weil sie noch kalt ist.', true], ['Gleichwarme Tiere haben im Winter eine Körpertemperatur von 5 °C.', false], ['Fell und Federn helfen, die Wärme im Körper zu halten.', true], ['Frösche sind gleichwarm.', false]], why: 'Frösche sind Amphibien – wechselwarm.' },
    { id: 'a4-06', o: 4, t: 'text', lv: 3, q: 'Erkläre die Begriffe „wechselwarm“ und „gleichwarm“ mit je einem Beispiel.',
      k: [{ l: 'wechselwarm: Temperatur hängt von der Umgebung ab', a: ['umgebung', 'aussentemperatur', 'außentemperatur', 'aendert', 'ändert', 'folgt', 'wechselt'] }, { l: 'Beispiel wechselwarm (Fisch, Amphibie, Reptil)', a: ['eidechse', 'frosch', 'fisch', 'schlange', 'kroete', 'kröte', 'molch', 'reptil', 'amphib', 'forelle', 'schildkröte'] },
        { l: 'gleichwarm: Temperatur bleibt gleich', a: ['gleich', 'konstant', 'immer', 'bleibt'] }, { l: 'Beispiel gleichwarm (Vogel, Säugetier)', a: ['mensch', 'hund', 'katze', 'maus', 'vogel', 'amsel', 'säugetier', 'saeugetier', 'pferd', 'rind', 'igel'] }],
      m: 'Wechselwarm: Die Körpertemperatur ändert sich mit der Umgebungstemperatur, z. B. bei der Eidechse. Gleichwarm: Die Körpertemperatur bleibt fast immer gleich, z. B. beim Menschen (etwa 37 °C).', why: 'Zu jedem Begriff gehören Erklärung UND Beispiel.' },
    { id: 'a4-07', o: 4, t: 'fill', lv: 2, q: 'Ergänze.', s: 'Vögel und Säugetiere sind {gleichwarm}. Fische, Amphibien und Reptilien sind {wechselwarm}. Bei Kälte fallen wechselwarme Tiere in {Kältestarre|Winterstarre|Starre}.', bank: ['gleichwarm', 'wechselwarm', 'Kältestarre', 'Winterschlaf'], why: 'Kältestarre: Das Tier kann sich nicht mehr bewegen.' },
    { id: 'a4-08', o: 4, t: 'mc', lv: 3, q: 'Es ist ein kühler Morgen (10 °C). Welches Tier kann sofort schnell weglaufen?', a: 'die Maus', w: ['die Zauneidechse', 'die Ringelnatter', 'die Erdkröte'], why: 'Die Maus ist gleichwarm und hat schon ihre Betriebstemperatur. Die anderen sind kalt und langsam.' },
    { id: 'a4-09', o: 4, t: 'mc', lv: 2, q: 'Wie kühlen sich gleichwarme Tiere bei Hitze ab?', a: 'durch Schwitzen oder Hecheln', w: ['durch Aufplustern', 'durch mehr Fressen', 'durch dichteres Fell'], why: 'Beim Schwitzen und Hecheln verdunstet Wasser – das kühlt.' },
    { id: 'a4-10', o: 4, t: 'num', lv: 1, q: 'Wie hoch ist ungefähr die Körpertemperatur des Menschen (in °C)?', a: 37, tol: 1, unit: '°C', why: 'Etwa 37 °C – bei Fieber höher.' },
    { id: 'a4-11', o: 4, t: 'mc', lv: 3, q: 'Was ist ein VORTEIL wechselwarmer Tiere?', a: 'Sie brauchen viel weniger Nahrung.', w: ['Sie sind im Winter sehr aktiv.', 'Sie frieren nie.', 'Sie sind immer schnell.'], why: 'Sie „heizen“ nicht und sparen dadurch viel Energie.' });
})(window.BIO);
