/* Modul C — Skelette und Fortbewegung (Lernziele 7–9) */
(function (B) {
  'use strict';
  var L = B.content.lesson, Q = B.content.q;

  // ------------------------------------------------------------------ 7 Skelette beschriften, Analogien
  L({ obj: 7, title: 'Skelette von Hund, Katze, Rind und Pferd',
    text: [
      'Alle Säugetiere haben **denselben Grundbauplan** des Skeletts. Die Knochen heißen gleich – sie sind nur unterschiedlich lang oder dick.',
      '**Schädel** schützt das Gehirn. Die **Wirbelsäule** trägt den Körper. Sie besteht aus Halswirbeln, Brustwirbeln, Lendenwirbeln, Kreuzbein und Schwanzwirbeln. Die **Rippen** sitzen an den Brustwirbeln und schützen Herz und Lunge.',
      'Vorderbein: **Schulterblatt** → **Oberarmknochen** → **Elle und Speiche** → **Handknochen** (Handwurzel, Mittelhand, Finger).',
      'Hinterbein: **Becken** → **Oberschenkelknochen** → **Schienbein und Wadenbein** → **Fußknochen** (Fußwurzel mit Ferse, Mittelfuß, Zehen).',
      'Unterschiede: Beim **Pferd** und **Rind** sind die Mittelhand- und Mittelfußknochen sehr lang (das „Röhrbein“). Elle und Speiche sind teilweise **verwachsen**, das Wadenbein ist nur noch ein kleiner Rest. Die Katze hat einen sehr langen Schwanz und eine biegsame Wirbelsäule.',
      '**Homologie:** Knochen mit gleichem Bauplan und gleicher Lage, die von gemeinsamen Vorfahren stammen, heißen **homolog**. Der Oberarmknochen von Mensch, Katze, Rind und Pferd ist homolog – auch wenn die Beine ganz verschieden aussehen.',
      '**Analogie:** Organe mit **gleicher Aufgabe**, aber **anderem Bauplan** heißen **analog**. Beispiel: Der Flügel eines Vogels (Knochen, Federn) und der Flügel einer Biene (dünne Haut, keine Knochen). Beide dienen dem Fliegen.'
    ],
    figs: [{ n: 'skeleton', o: { animal: 'hund' } }, { n: 'limbs' }],
    vocab: [['Schulterblatt', 'Schul-ter-blatt', 'flacher Knochen an der Schulter'], ['Elle und Speiche', 'El-le, Spei-che', 'zwei Knochen im Unterarm'], ['Becken', 'Be-cken', 'trägt die Hinterbeine'], ['Oberschenkelknochen', 'O-ber-schen-kel-kno-chen', 'längster Knochen im Hinterbein'],
      ['Schienbein und Wadenbein', 'Schien-bein, Wa-den-bein', 'zwei Knochen im Unterschenkel'], ['homolog', 'ho-mo-log', 'gleicher Bauplan, gemeinsame Abstammung'], ['analog', 'a-na-log', 'gleiche Aufgabe, anderer Bauplan']],
    example: { q: 'Welcher Knochen beim Pferd entspricht deinem Mittelfinger?', a: 'Der lange Mittelhandknochen mit dem Huf darunter: Das Pferd läuft nur auf der 3. Zehe (= Mittelfinger). Der Huf ist wie ein riesiger Fingernagel.' },
    notes: [{ k: 'LEHRKRAFT', t: 'Im Checklisten-Satz „Analogien erkennen“ ist meist gemeint: die gleichen Knochen in verschiedenen Skeletten wiederfinden. Fachlich heißt das Homologie. Frag nach, welches Wort deine Lehrkraft benutzt.' }],
    summary: ['Vorne: Schulterblatt – Oberarm – Elle/Speiche – Hand.', 'Hinten: Becken – Oberschenkel – Schienbein/Wadenbein – Fuß.', 'Gleiche Knochen, anderes Aussehen = homolog. Gleiche Aufgabe, anderer Bau = analog.'],
    simple: 'Taste deinen Arm ab: oben ein Knochen (Oberarm), unten zwei (Elle und Speiche), dann viele kleine (Hand). Genau so ist das Vorderbein von Hund, Katze, Rind und Pferd gebaut.',
    check: ['c7-01', 'c7-05', 'c7-06', 'c7-12'] });

  var ALL = ['schaedel', 'wirbelsaeule', 'rippen', 'schulterblatt', 'oberarm', 'elle_speiche', 'hand', 'becken', 'oberschenkel', 'schienbein', 'fuss'];
  Q({ id: 'c7-01', o: 7, t: 'label', lv: 2, q: 'Beschrifte das Skelett des Hundes.', fig: { n: 'skeleton', o: { animal: 'hund', mode: 'quiz' } }, ask: ALL, why: 'Vorne: Schulterblatt – Oberarm – Elle/Speiche – Hand. Hinten: Becken – Oberschenkel – Schienbein/Wadenbein – Fuß.' },
    { id: 'c7-02', o: 7, t: 'label', lv: 2, q: 'Beschrifte das Skelett der Katze.', fig: { n: 'skeleton', o: { animal: 'katze', mode: 'quiz' } }, ask: ALL, why: 'Die Katze hat dieselben Knochen wie der Hund.' },
    { id: 'c7-03', o: 7, t: 'label', lv: 3, q: 'Beschrifte das Skelett des Rindes.', fig: { n: 'skeleton', o: { animal: 'rind', mode: 'quiz' } }, ask: ALL, why: 'Beim Rind sind Mittelhand und Mittelfuß lang; Elle und Speiche teilweise verwachsen.' },
    { id: 'c7-04', o: 7, t: 'label', lv: 3, q: 'Beschrifte das Skelett des Pferdes.', fig: { n: 'skeleton', o: { animal: 'pferd', mode: 'quiz' } }, ask: ALL, why: 'Das Pferd steht auf einer Zehe (dem Huf).' },
    { id: 'c7-05', o: 7, t: 'order', lv: 1, q: 'Ordne die Knochen des Vorderbeins von oben (Schulter) nach unten.', i: ['Schulterblatt', 'Oberarmknochen', 'Elle und Speiche', 'Handwurzelknochen', 'Mittelhandknochen', 'Fingerknochen'], why: 'Wie bei deinem Arm.' },
    { id: 'c7-06', o: 7, t: 'mc', lv: 2, q: 'Der Oberarmknochen von Mensch, Katze und Pferd sieht verschieden aus, liegt aber an derselben Stelle. Wie nennt man solche Knochen?', a: 'homolog', w: ['analog', 'wechselwarm', 'verwachsen'], why: 'Homolog = gleicher Grundbauplan, gemeinsame Abstammung.' },
    { id: 'c7-07', o: 7, t: 'mc', lv: 3, q: 'Welches Paar ist ANALOG (gleiche Aufgabe, anderer Bauplan)?', a: 'Flügel der Amsel und Flügel der Biene', w: ['Vorderbein der Katze und Arm des Menschen', 'Vorderbein des Pferdes und Vorderbein des Rindes', 'Oberschenkel des Hundes und Oberschenkel der Katze'], why: 'Vogelflügel haben Knochen, Insektenflügel nicht. Beide dienen aber dem Fliegen.' },
    { id: 'c7-08', o: 7, t: 'order', lv: 1, q: 'Ordne die Knochen des Hinterbeins von oben nach unten.', i: ['Becken', 'Oberschenkelknochen', 'Schienbein und Wadenbein', 'Fußwurzelknochen', 'Mittelfußknochen', 'Zehenknochen'], why: 'Das Becken verbindet die Beine mit der Wirbelsäule.' },
    { id: 'c7-09', o: 7, t: 'match', lv: 2, q: 'Vorderbein und Hinterbein sind ähnlich gebaut. Was entspricht sich?', p: [['Oberarmknochen', 'Oberschenkelknochen'], ['Elle und Speiche', 'Schienbein und Wadenbein'], ['Handwurzelknochen', 'Fußwurzelknochen'], ['Mittelhandknochen', 'Mittelfußknochen']], why: 'Oben ein Knochen, darunter zwei, dann viele kleine.' },
    { id: 'c7-10', o: 7, t: 'fill', lv: 2, q: 'Ergänze die Abschnitte der Wirbelsäule (vom Kopf zum Schwanz).', s: '{Halswirbel} – {Brustwirbel} – {Lendenwirbel} – {Kreuzbein} – {Schwanzwirbel}', bank: ['Halswirbel', 'Brustwirbel', 'Lendenwirbel', 'Kreuzbein', 'Schwanzwirbel'], why: 'An den Brustwirbeln sitzen die Rippen.' },
    { id: 'c7-11', o: 7, t: 'tf', lv: 2, q: 'Richtig oder falsch?', s: [['Hund, Katze, Rind und Pferd haben dieselben Knochenarten.', true], ['Beim Pferd sind die Mittelhandknochen besonders kurz.', false], ['Die Rippen schützen Herz und Lunge.', true], ['Das Schulterblatt gehört zum Hinterbein.', false]], why: 'Beim Pferd sind Mittelhand und Mittelfuß sehr lang (Röhrbein).' },
    { id: 'c7-12', o: 7, t: 'text', lv: 3, q: 'Das Vorderbein eines Pferdes und der Arm eines Menschen sehen sehr verschieden aus. Erkläre, warum man trotzdem von gleichen Knochen spricht.',
      k: [{ l: 'gleiche Knochen in gleicher Reihenfolge / gleicher Bauplan', a: ['gleich', 'bauplan', 'reihenfolge', 'dieselben', 'gleichen knochen'] }, { l: 'Beispiel: Oberarm, Elle/Speiche …', a: ['oberarm', 'elle', 'speiche', 'mittelhand', 'handwurzel'] }, { l: 'gemeinsame Vorfahren / homolog', a: ['vorfahr', 'homolog', 'abstamm', 'verwandt'] }],
      m: 'Beide haben die gleichen Knochen in der gleichen Reihenfolge: Oberarmknochen, Elle und Speiche, Handwurzel, Mittelhand, Finger. Nur Länge und Form sind anders. Das liegt an den gemeinsamen Vorfahren. Solche Knochen heißen homolog.', why: 'Gleicher Bauplan + gemeinsame Abstammung = Homologie.' },
    { id: 'c7-13', o: 7, t: 'mc', lv: 2, q: 'Wozu dient das Becken?', a: 'Es verbindet die Hinterbeine mit der Wirbelsäule.', w: ['Es schützt das Gehirn.', 'Es schützt die Lunge.', 'Es ist ein Knochen im Vorderfuß.'], why: 'Das Becken ist mit dem Kreuzbein fest verbunden.' });

  // ------------------------------------------------------------------ 8 Paarhufer / Unpaarhufer
  L({ obj: 8, title: 'Paarhufer und Unpaarhufer',
    text: [
      'Huftiere laufen auf ihren **Zehenspitzen**. Die Zehenspitzen sind von **Hufen** aus Horn geschützt – wie riesige Fingernägel.',
      'Man zählt die Zehen wie Finger: 1 = Daumen, 3 = Mittelfinger, 5 = kleiner Finger.',
      '**Paarhufer** stehen auf einer **geraden Zahl** von Zehen, meist auf **zwei** (Zehe 3 und 4). Die Körperachse läuft **zwischen** den beiden Zehen. Oft gibt es noch zwei kleine **Afterklauen** (Zehe 2 und 5) weiter oben.',
      'Beispiele: **Rind, Schwein, Schaf, Ziege, Reh, Hirsch, Wildschwein**.',
      '**Unpaarhufer** stehen auf einer **ungeraden Zahl** von Zehen. Die Körperachse läuft **durch die mittlere Zehe** (Zehe 3).',
      'Beispiele: **Pferd, Esel, Zebra** (eine Zehe), **Nashorn** (drei Zehen).',
      'Beim Pferd sind von Zehe 2 und 4 nur dünne **Griffelbeine** übrig geblieben.'
    ],
    figs: [{ n: 'hooves' }],
    vocab: [['Paarhufer', 'Paar-hu-fer', 'gerade Zehenzahl, meist 2'], ['Unpaarhufer', 'Un-paar-hu-fer', 'ungerade Zehenzahl, Achse durch Zehe 3'], ['Huf', 'Huf', 'Hornschuh um die Zehenspitze'], ['Afterklauen', 'Af-ter-klau-en', 'kleine Zehen 2 und 5 beim Paarhufer']],
    example: { q: 'Das Schwein hat vier Zehen. Ist es ein Paarhufer?', a: 'Ja. Vier ist eine gerade Zahl. Es läuft vor allem auf Zehe 3 und 4; Zehe 2 und 5 sind Afterklauen. Die Achse geht zwischen Zehe 3 und 4.' },
    notes: [{ k: 'Tipp', t: 'Nicht nur zählen, sondern auf die ACHSE achten: zwischen zwei Zehen → Paarhufer, durch die Mittelzehe → Unpaarhufer.' }],
    summary: ['Paarhufer: gerade Zehenzahl, Achse zwischen Zehe 3 und 4 – Rind, Schwein, Reh.', 'Unpaarhufer: ungerade Zehenzahl, Achse durch Zehe 3 – Pferd, Zebra, Nashorn.', 'Beide sind Zehenspitzengänger.'],
    simple: 'Rind = „Paar“: Seine Klaue ist in zwei Hälften gespalten – ein Paar. Pferd = „Unpaar“: Es hat nur einen einzigen Huf an jedem Bein.',
    check: ['c8-01', 'c8-02', 'c8-04'] });

  Q({ id: 'c8-01', o: 8, t: 'sort', lv: 1, q: 'Paarhufer oder Unpaarhufer?', b: ['Paarhufer', 'Unpaarhufer'], i: [['Rind', 0], ['Schwein', 0], ['Ziege', 0], ['Reh', 0], ['Pferd', 1], ['Zebra', 1], ['Esel', 1], ['Nashorn', 1]], why: 'Pferd, Esel, Zebra: 1 Zehe; Nashorn: 3 Zehen.' },
    { id: 'c8-02', o: 8, t: 'mc', lv: 2, q: 'Wo verläuft die Körperachse beim Paarhufer?', fig: { n: 'hooves', o: { which: 'paar' } }, a: 'zwischen der 3. und 4. Zehe', w: ['durch die 3. Zehe', 'durch die 1. Zehe', 'zwischen der 1. und 2. Zehe'], why: 'Das Gewicht liegt gleichmäßig auf Zehe 3 und 4.' },
    { id: 'c8-03', o: 8, t: 'mc', lv: 2, q: 'Auf welcher Zehe steht das Pferd?', a: 'auf der 3. Zehe (Mittelzehe)', w: ['auf der 1. Zehe', 'auf der 2. und 4. Zehe', 'auf allen fünf Zehen'], why: 'Zehe 3 entspricht deinem Mittelfinger.' },
    { id: 'c8-04', o: 8, t: 'text', lv: 3, q: 'Erkläre die Begriffe Paarhufer und Unpaarhufer. Nenne je ein Beispiel.',
      k: [{ l: 'Paarhufer: gerade Zahl Zehen / Achse zwischen 2 Zehen', a: ['gerade', 'zwei zehen', '2 zehen', 'zwischen', 'paar'] }, { l: 'Beispiel Paarhufer', a: ['rind', 'kuh', 'schwein', 'ziege', 'schaf', 'reh', 'hirsch'] },
        { l: 'Unpaarhufer: ungerade Zahl / Achse durch mittlere Zehe', a: ['ungerade', 'eine zehe', '1 zehe', 'mittlere', 'durch', 'drei'] }, { l: 'Beispiel Unpaarhufer', a: ['pferd', 'esel', 'zebra', 'nashorn', 'tapir'] }],
      m: 'Paarhufer laufen auf einer geraden Zahl von Zehen, meist auf zwei. Die Achse geht zwischen Zehe 3 und 4, z. B. beim Rind. Unpaarhufer laufen auf einer ungeraden Zahl von Zehen; die Achse geht durch die Mittelzehe, z. B. beim Pferd.', why: 'Begriff + Beispiel für beide.' },
    { id: 'c8-05', o: 8, t: 'fill', lv: 2, q: 'Ergänze.', s: 'Das Rind ist ein {Paarhufer}. Das Pferd ist ein {Unpaarhufer}. Die kleinen Zehen 2 und 5 beim Rind heißen {Afterklauen|Afterklaue}.', bank: ['Paarhufer', 'Unpaarhufer', 'Afterklauen', 'Griffelbeine'], why: 'Un-paar-hu-fer = „nicht paarig“.' },
    { id: 'c8-06', o: 8, t: 'mc', lv: 3, q: 'Das Nashorn steht auf drei Zehen. Was ist es?', a: 'ein Unpaarhufer – die Achse geht durch die mittlere Zehe', w: ['ein Paarhufer, weil es mehr als eine Zehe hat', 'ein Sohlengänger', 'weder noch'], why: 'Drei ist ungerade, die Achse geht durch Zehe 3.' },
    { id: 'c8-07', o: 8, t: 'tf', lv: 2, q: 'Richtig oder falsch?', s: [['Hufe bestehen aus Horn.', true], ['Das Schwein ist ein Unpaarhufer.', false], ['Beim Pferd sind von Zehe 2 und 4 nur Griffelbeine übrig.', true], ['Paarhufer und Unpaarhufer sind Zehenspitzengänger.', true]], why: 'Das Schwein ist ein Paarhufer.' },
    { id: 'c8-08', o: 8, t: 'match', lv: 2, q: 'Ordne zu.', p: [['Rind', 'zwei Hufe pro Bein (gespaltene Klaue)'], ['Pferd', 'ein Huf pro Bein'], ['Nashorn', 'drei Zehen mit Hufen'], ['Hund', 'gar kein Huf – Krallen']], why: 'Der Hund ist kein Huftier.' },
    { id: 'c8-09', o: 8, t: 'mc', lv: 2, q: 'Woraus ist ein Huf entstanden?', a: 'aus dem Nagel der Zehe (Horn)', w: ['aus einem Knochen', 'aus einer Feder', 'aus Fell'], why: 'Hufe und Krallen sind Horngebilde wie unsere Nägel.' },
    { id: 'c8-10', o: 8, t: 'mc', lv: 3, q: 'Was zeigt das Bild?', fig: { n: 'hooves', o: { which: 'unpaar', nums: false, names: false } }, a: 'den Fuß eines Unpaarhufers (z. B. Pferd)', w: ['den Fuß eines Paarhufers (z. B. Rind)', 'den Fuß eines Zehengängers (z. B. Hund)', 'den Fuß eines Sohlengängers (z. B. Bär)'], why: 'Ein einziger Huf, die Achse geht durch die Mittelzehe → Unpaarhufer (Pferd).' });

  // ------------------------------------------------------------------ 9 Gangarten
  L({ obj: 9, title: 'Sohlen-, Zehen- und Zehenspitzengänger',
    text: [
      'Säugetiere setzen ihre Füße verschieden auf den Boden.',
      '**Sohlengänger** setzen die **ganze Fußsohle** mit der **Ferse** auf. Beispiele: **Mensch, Bär, Igel, Dachs**. Vorteil: sicherer Stand, gut zum Klettern und Stehen. Nachteil: nicht so schnell.',
      '**Zehengänger** laufen nur auf den **Zehen**. Die Ferse ist hoch angehoben. Beispiele: **Hund, Katze, Wolf, Fuchs**. Vorteil: schneller und leiser. Weiche **Ballen** federn den Schritt.',
      '**Zehenspitzengänger** berühren den Boden nur mit den **Zehenspitzen**, die in **Hufen** stecken. Beispiele: **Pferd, Rind, Schwein, Reh**. Vorteil: sehr lange Beine – gut für schnelles und ausdauerndes Laufen und Flucht.',
      '**Faustregel:** Je weniger vom Fuß den Boden berührt, desto länger wirkt das Bein und desto schneller kann das Tier laufen.',
      'Die „Knie“, die beim Pferd hinten nach hinten zeigen, sind in Wahrheit die **Fersen** (das Sprunggelenk)!'
    ],
    figs: [{ n: 'gait' }],
    vocab: [['Sohlengänger', 'Soh-len-gän-ger', 'ganze Sohle auf dem Boden'], ['Zehengänger', 'Ze-hen-gän-ger', 'nur Zehen auf dem Boden'], ['Zehenspitzengänger', 'Ze-hen-spit-zen-gän-ger', 'nur Zehenspitzen (Hufe) auf dem Boden'], ['Ferse', 'Fer-se', 'hinterer Teil des Fußes']],
    example: { q: 'Robin ist ein Whippet. Wie läuft er?', a: 'Als Zehengänger: Er läuft auf den Zehen mit weichen Ballen, die Ferse ist hoch. Dadurch hat er lange Beine und kann sehr schnell sprinten.' },
    summary: ['Sohlengänger: ganze Sohle – Mensch, Bär, Igel.', 'Zehengänger: Zehen – Hund, Katze.', 'Zehenspitzengänger: Hufe – Pferd, Rind, Schwein.', 'Weniger Bodenkontakt = längeres Bein = schneller.'],
    simple: 'Probier es aus: Stell dich normal hin (Sohlengänger). Geh auf die Zehen (wie ein Hund). Stell dich auf die Zehenspitzen (wie ein Pferd). Merkst du, wie deine Beine länger werden?',
    check: ['c9-01', 'c9-02', 'c9-05'] });

  Q({ id: 'c9-01', o: 9, t: 'sort', lv: 1, q: 'Ordne die Tiere zu.', b: ['Sohlengänger', 'Zehengänger', 'Zehenspitzengänger'], i: [['Mensch', 0], ['Bär', 0], ['Igel', 0], ['Hund', 1], ['Katze', 1], ['Wolf', 1], ['Pferd', 2], ['Rind', 2], ['Schwein', 2]], why: 'Huftiere sind Zehenspitzengänger.' },
    { id: 'c9-02', o: 9, t: 'mc', lv: 2, q: 'Welche Fußhaltung zeigt das Bild?', fig: { n: 'gait', o: { which: 'zehe', names: false } }, a: 'Zehengänger', w: ['Sohlengänger', 'Zehenspitzengänger', 'Paarhufer'], why: 'Die Ferse ist angehoben, die Zehen liegen flach auf dem Boden.' },
    { id: 'c9-03', o: 9, t: 'mc', lv: 2, q: 'Welche Fußhaltung zeigt das Bild?', fig: { n: 'gait', o: { which: 'sohle', names: false } }, a: 'Sohlengänger', w: ['Zehengänger', 'Zehenspitzengänger', 'Unpaarhufer'], why: 'Die ganze Sohle mit der Ferse liegt auf.' },
    { id: 'c9-04', o: 9, t: 'mc', lv: 2, q: 'Welche Fußhaltung zeigt das Bild?', fig: { n: 'gait', o: { which: 'spitze', names: false } }, a: 'Zehenspitzengänger', w: ['Zehengänger', 'Sohlengänger', 'Paarhufer'], why: 'Nur die Zehenspitze mit dem Huf berührt den Boden.' },
    { id: 'c9-05', o: 9, t: 'text', lv: 3, q: 'Erkläre, warum Zehenspitzengänger wie das Pferd schnell laufen können.',
      k: [{ l: 'nur Zehenspitzen/Hufe berühren den Boden', a: ['zehenspitze', 'huf', 'spitze', 'nur'] }, { l: 'Bein wird dadurch länger', a: ['lang', 'länger', 'laenger'] }, { l: 'lange Schritte / schnelle Flucht', a: ['schritt', 'flucht', 'schnell', 'flieh'] }],
      m: 'Das Pferd berührt den Boden nur mit den Zehenspitzen (Hufen). Die langen Mittelfußknochen machen das Bein länger. Mit langen Beinen macht es lange Schritte und kann schnell fliehen.', why: 'Körperbau → Funktion.' },
    { id: 'c9-06', o: 9, t: 'tf', lv: 2, q: 'Richtig oder falsch?', s: [['Der Mensch ist ein Zehengänger.', false], ['Katzen laufen auf weichen Ballen.', true], ['Beim Pferd zeigt das „Knie“ am Hinterbein nach hinten – es ist eigentlich die Ferse.', true], ['Der Bär ist ein Sohlengänger.', true]], why: 'Der Mensch ist ein Sohlengänger.' },
    { id: 'c9-07', o: 9, t: 'fill', lv: 2, q: 'Ergänze.', s: 'Der Igel ist ein {Sohlengänger}. Der Fuchs ist ein {Zehengänger}. Das Reh ist ein {Zehenspitzengänger}.', bank: ['Sohlengänger', 'Zehengänger', 'Zehenspitzengänger'], why: 'Achte auf „ä“ in -gänger.' },
    { id: 'c9-08', o: 9, t: 'mc', lv: 3, q: 'Welchen Vorteil hat die Katze als Zehengänger beim Jagen?', a: 'Sie kann sich leise anschleichen und schnell lossprinten.', w: ['Sie steht besonders sicher auf zwei Beinen.', 'Sie kann gut graben.', 'Sie braucht keine Krallen.'], why: 'Die weichen Ballen dämpfen die Schritte.' },
    { id: 'c9-09', o: 9, t: 'mc', lv: 2, q: 'Was berührt beim Sohlengänger NICHT den Boden?', a: 'Es berührt alles den Boden: Zehen, Mittelfuß und Ferse.', w: ['die Ferse', 'die Zehen', 'die Ballen'], why: 'Die ganze Sohle mit Ferse liegt auf.' },
    { id: 'c9-10', o: 9, t: 'match', lv: 2, q: 'Ordne zu.', p: [['Sohlengänger', 'sicherer Stand, gut zum Klettern'], ['Zehengänger', 'leise und schnell'], ['Zehenspitzengänger', 'lange Beine für schnelle Flucht']], why: 'Jede Fußhaltung passt zu einer Lebensweise.' });
})(window.BIO);
