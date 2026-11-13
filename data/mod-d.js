/* Modul D — Schädel, Gebisse und Zähne (Lernziele 10–12) — besonders wichtig! */
(function (B) {
  'use strict';
  var L = B.content.lesson, Q = B.content.q;

  // ------------------------------------------------------------------ 11 Zahntypen (first, the basics)
  L({ obj: 11, title: 'Zahntypen und ihre Aufgaben',
    text: [
      '**Schneidezähne** (vorne): flach und scharf wie ein Meißel. Sie **schneiden ab** und **beißen ab**.',
      '**Eckzähne**: lang und spitz. Sie **packen und halten** die Beute fest. Beim Hund heißen sie auch **Fangzähne**.',
      '**Vorbackenzähne**: zwischen Eckzahn und Backenzähnen. Sie **zerkleinern** die Nahrung.',
      '**Backenzähne** (hinten): breit mit Höckern oder Leisten. Sie **zermahlen** und **zerquetschen** die Nahrung.',
      '**Reißzähne** (Hund, Katze): besonders große, scharfe Zähne hinten im Kiefer – oben der letzte Vorbackenzahn, unten der erste Backenzahn. Sie arbeiten wie eine **Schere** und **zerschneiden Fleisch und Sehnen**.',
      '**Nagezähne** (Eichhörnchen, Maus, Biber): sehr große Schneidezähne. Sie **wachsen ein Leben lang nach**. Vorne haben sie harten, orangen Zahnschmelz, hinten weicheres Zahnbein. Beim Nagen schleift sich hinten mehr ab – so bleibt die Kante immer **scharf wie ein Meißel**.',
      '**Zahnlücke (Diastema):** eine Lücke ohne Zähne zwischen den vorderen Zähnen und den Backenzähnen, z. B. bei Rind und Eichhörnchen. Dort kann die Zunge das Futter bewegen.',
      '**Merke:** Die Form der Zähne passt zur **Nahrung**.'
    ],
    figs: [{ n: 'jaw', o: { animal: 'hund' } }, { n: 'jaw', o: { animal: 'eich' } }],
    vocab: [['Schneidezähne', 'Schnei-de-zäh-ne', 'vorne, schneiden ab'], ['Eckzähne', 'Eck-zäh-ne', 'spitz, packen und halten'], ['Vorbackenzähne', 'Vor-ba-cken-zäh-ne', 'zerkleinern'], ['Backenzähne', 'Ba-cken-zäh-ne', 'hinten, zermahlen'],
      ['Reißzähne', 'Reiß-zäh-ne', 'scharfe Scheren-Zähne der Raubtiere'], ['Nagezähne', 'Na-ge-zäh-ne', 'wachsen immer nach'], ['Diastema', 'Di-a-ste-ma', 'Zahnlücke']],
    example: { q: 'Warum braucht eine Katze Reißzähne, ein Rind aber nicht?', a: 'Die Katze frisst Fleisch. Ihre Reißzähne schneiden es wie eine Schere in Stücke. Das Rind frisst Gras. Es braucht breite Backenzähne zum Zermahlen.' },
    summary: ['Schneidezähne: abbeißen · Eckzähne: packen · Vorbacken- und Backenzähne: zerkleinern, zermahlen.', 'Reißzähne (Raubtiere) schneiden wie eine Schere.', 'Nagezähne wachsen nach und bleiben scharf.', 'Zahnform passt zur Nahrung.'],
    simple: 'Stell dir eine Werkzeugkiste vor: Schneidezähne = Schere zum Abschneiden, Eckzähne = Zange zum Festhalten, Backenzähne = Mühle zum Mahlen.',
    check: ['d11-01', 'd11-02', 'd11-04', 'd11-06'] });

  Q({ id: 'd11-01', o: 11, t: 'match', lv: 1, q: 'Welche Aufgabe hat welcher Zahn?', p: [['Schneidezähne', 'abbeißen, abschneiden'], ['Eckzähne', 'Beute packen und festhalten'], ['Backenzähne', 'Nahrung zermahlen'], ['Reißzähne', 'Fleisch wie eine Schere zerschneiden']], why: 'Jeder Zahntyp ist ein anderes Werkzeug.' },
    { id: 'd11-02', o: 11, t: 'mc', lv: 2, q: 'Warum werden die Nagezähne des Eichhörnchens nicht stumpf?', a: 'Vorne ist harter Zahnschmelz, hinten weiches Zahnbein: hinten schleift es sich schneller ab, die Kante bleibt scharf. Außerdem wachsen sie nach.', w: ['Das Eichhörnchen schärft sie an Steinen.', 'Sie fallen jedes Jahr aus.', 'Sie sind aus Knochen.'], why: 'Selbstschärfende Meißel-Kante + Nachwachsen.' },
    { id: 'd11-03', o: 11, t: 'mc', lv: 2, q: 'Welche Zähne sind beim Hund die Reißzähne?', a: 'oben der letzte Vorbackenzahn, unten der erste Backenzahn', w: ['die Eckzähne oben und unten', 'die vordersten Schneidezähne', 'alle Backenzähne'], why: 'Sie liegen hinten im Kiefer, wo die Beißkraft groß ist.' },
    { id: 'd11-04', o: 11, t: 'fill', lv: 2, q: 'Ergänze.', s: 'Die {Eckzähne|Fangzähne|Eckzahn} des Hundes packen die Beute. Die {Backenzähne|Mahlzähne} des Rindes zermahlen das Gras. Die {Nagezähne} des Eichhörnchens wachsen ein Leben lang.', bank: ['Eckzähne', 'Backenzähne', 'Nagezähne', 'Schneidezähne', 'Reißzähne'], why: 'Schreibung: Zahn – Zähne mit „ä“ und „h“.' },
    { id: 'd11-05', o: 11, t: 'mc', lv: 2, q: 'Was ist eine Zahnlücke (Diastema)?', a: 'ein Bereich ohne Zähne zwischen den vorderen Zähnen und den Backenzähnen', w: ['ein Loch in einem Zahn', 'ein ausgefallener Milchzahn', 'der Platz für die Eckzähne'], why: 'Typisch für Pflanzenfresser und Nagetiere.' },
    { id: 'd11-06', o: 11, t: 'text', lv: 3, q: 'Erkläre an einem Beispiel: Die Form der Zähne passt zur Nahrung.',
      k: [{ l: 'Tier + Nahrung genannt', a: ['fleisch', 'gras', 'pflanz', 'nüsse', 'nuesse', 'nuss'] }, { l: 'Zahnform beschrieben', a: ['spitz', 'scharf', 'breit', 'flach', 'schere', 'meißel', 'meissel', 'reißz', 'reissz', 'backenz', 'eckz', 'nagez', 'mahl'] }, { l: 'Funktion erklärt', a: ['zerschneid', 'zermahl', 'pack', 'festhalt', 'zerkleiner', 'nagen', 'öffnen', 'oeffnen', 'kauen'] }],
      m: 'Die Katze frisst Fleisch. Ihre spitzen Eckzähne packen die Beute, die scharfen Reißzähne zerschneiden das Fleisch wie eine Schere. Das Rind frisst Gras. Seine breiten Backenzähne mit Schmelzleisten zermahlen die harten Pflanzen.', why: 'Tier → Nahrung → Zahnform → Funktion.' },
    { id: 'd11-07', o: 11, t: 'tf', lv: 2, q: 'Richtig oder falsch?', s: [['Backenzähne von Pflanzenfressern sind breit und haben Leisten zum Mahlen.', true], ['Nagezähne hören irgendwann auf zu wachsen.', false], ['Eckzähne sind lang und spitz.', true], ['Reißzähne gibt es beim Rind.', false]], why: 'Reißzähne haben nur Raubtiere wie Hund und Katze.' },
    { id: 'd11-08', o: 11, t: 'mc', lv: 3, q: 'Ein Eichhörnchen findet keine harten Nüsse mehr, nur weiches Futter. Was könnte passieren?', a: 'Die Nagezähne werden zu lang, weil sie sich nicht genug abnutzen.', w: ['Die Nagezähne fallen aus.', 'Es bekommt Reißzähne.', 'Nichts – die Zähne wachsen nicht.'], why: 'Nagezähne wachsen ständig – sie müssen durch Nagen abgenutzt werden.' },
    { id: 'd11-09', o: 11, t: 'sort', lv: 2, q: 'Wozu dienen die Zähne vor allem?', b: ['abbeißen / packen', 'zerkleinern / zermahlen'], i: [['Schneidezähne', 0], ['Eckzähne', 0], ['Nagezähne', 0], ['Vorbackenzähne', 1], ['Backenzähne', 1], ['Reißzähne', 1]], why: 'Reißzähne sitzen hinten und zerschneiden Fleisch in Stücke.' },
    { id: 'd11-10', o: 11, t: 'mc', lv: 2, q: 'Welche Farbe hat die Vorderseite der Nagezähne beim Eichhörnchen – und warum?', a: 'orange – dort liegt der harte Zahnschmelz', w: ['weiß – weil sie neu sind', 'schwarz – weil sie schmutzig sind', 'grün – vom Moos'], why: 'Eisen macht den Schmelz der Nagezähne orange und besonders hart.' });

  // ------------------------------------------------------------------ 10 Schädel unterscheiden
  L({ obj: 10, title: 'Säugetierschädel am Gebiss erkennen',
    text: [
      'Am **Gebiss** kann man erkennen, was ein Tier frisst – und welches Tier es ist.',
      '**Fleischfresser-Gebiss (Hund, Katze):** große, spitze **Eckzähne** (Fangzähne), scharfe **Reißzähne**, **keine Zahnlücke**. Der Kiefer bewegt sich nur **auf und zu** wie eine Schere. Hund: lange Schnauze, 42 Zähne. Katze: kurze Schnauze, große Augenhöhlen, nur 30 Zähne.',
      '**Pflanzenfresser-Gebiss (Rind):** **oben vorne keine Zähne**, sondern eine harte **Hornplatte**. Unten Schneidezähne (der untere Eckzahn sieht aus wie ein Schneidezahn). Große **Zahnlücke**. Breite **Backenzähne** mit Schmelzleisten zum Mahlen. Der Kiefer bewegt sich auch **seitwärts** (mahlen).',
      '**Nagetier-Gebiss (Eichhörnchen):** oben und unten je zwei große, gebogene **Nagezähne** (pro Seite einer), **keine Eckzähne**, große **Zahnlücke**, kleine Backenzähne.',
      '**Allesfresser-Gebiss (Mensch):** alle Zahntypen, aber keiner ist besonders groß. Kleine Eckzähne, Backenzähne mit Höckern. Keine Zahnlücke. 32 Zähne.'
    ],
    figs: [{ n: 'jaw', o: { animal: 'katze' } }, { n: 'jaw', o: { animal: 'rind' } }, { n: 'jaw', o: { animal: 'mensch' } }],
    table: { head: ['Merkmal', 'Hund / Katze', 'Rind', 'Eichhörnchen', 'Mensch'], rows: [
      ['Gebissart', 'Fleischfresser', 'Pflanzenfresser (Wiederkäuer)', 'Nagetier', 'Allesfresser'],
      ['Eckzähne', 'groß, spitz', 'oben keine; unten wie Schneidezahn', 'keine', 'klein'],
      ['Besonderheit', 'Reißzähne', 'Hornplatte oben vorn', 'Nagezähne wachsen nach', 'alle Zahntypen'],
      ['Zahnlücke', 'nein', 'ja, groß', 'ja, groß', 'nein'],
      ['Backenzähne', 'spitz, schneidend', 'breit, mahlend', 'klein, mahlend', 'mit Höckern']] },
    vocab: [['Gebiss', 'Ge-biss', 'alle Zähne zusammen'], ['Fleischfresser', 'Fleisch-fres-ser', 'frisst vor allem Fleisch'], ['Pflanzenfresser', 'Pflan-zen-fres-ser', 'frisst Pflanzen'], ['Allesfresser', 'Al-les-fres-ser', 'frisst Pflanzen und Tiere'], ['Hornplatte', 'Horn-plat-te', 'harte Platte statt oberer Schneidezähne (Rind)']],
    example: { q: 'Ein Schädel hat oben vorne keine Zähne, eine große Zahnlücke und breite Backenzähne. Welches Tier?', a: 'Ein Rind (Wiederkäuer). Statt oberer Schneidezähne hat es eine Hornplatte; die breiten Backenzähne zermahlen Gras.' },
    summary: ['Große Eckzähne + Reißzähne, keine Lücke → Fleischfresser (Hund: 42 Zähne, Katze: 30).', 'Oben vorne Hornplatte + Lücke + breite Backenzähne → Rind.', 'Nagezähne + Lücke, keine Eckzähne → Eichhörnchen.', 'Alle Zahntypen, nichts besonders groß → Mensch.'],
    simple: 'Detektiv-Fragen: 1. Gibt es große Eckzähne? → Raubtier. 2. Gibt es eine Lücke? → Pflanzenfresser oder Nagetier. 3. Gibt es riesige gebogene Vorderzähne? → Nagetier.',
    check: ['d10-01', 'd10-03', 'd10-06'] });

  Q({ id: 'd10-01', o: 10, t: 'mc', lv: 2, q: 'Zu welchem Tier gehört dieses Gebiss?', fig: { n: 'jaw', o: { animal: 'rind', plain: true, letter: 'A' } }, a: 'Rind', w: ['Hund', 'Eichhörnchen', 'Mensch'], why: 'Oben vorn keine Zähne (Hornplatte), große Zahnlücke, breite Backenzähne.' },
    { id: 'd10-02', o: 10, t: 'mc', lv: 2, q: 'Zu welchem Tier gehört dieses Gebiss?', fig: { n: 'jaw', o: { animal: 'eich', plain: true, letter: 'B' } }, a: 'Eichhörnchen', w: ['Katze', 'Rind', 'Mensch'], why: 'Große gebogene Nagezähne, keine Eckzähne, Zahnlücke.' },
    { id: 'd10-03', o: 10, t: 'mc', lv: 2, q: 'Zu welchem Tier gehört dieses Gebiss?', fig: { n: 'jaw', o: { animal: 'hund', plain: true, letter: 'C' } }, a: 'Hund', w: ['Rind', 'Eichhörnchen', 'Mensch'], why: 'Lange Reihe, große Eckzähne, Reißzähne, keine Lücke – oben 10, unten 11 Zähne pro Seite.' },
    { id: 'd10-04', o: 10, t: 'mc', lv: 3, q: 'Zu welchem Tier gehört dieses Gebiss?', fig: { n: 'jaw', o: { animal: 'katze', plain: true, letter: 'D' } }, a: 'Katze', w: ['Hund', 'Mensch', 'Eichhörnchen'], why: 'Wenige Zähne (oben 8, unten 7 pro Seite), große Eckzähne, große Reißzähne, kurze Schnauze.' },
    { id: 'd10-05', o: 10, t: 'mc', lv: 2, q: 'Zu welchem Tier gehört dieses Gebiss?', fig: { n: 'jaw', o: { animal: 'mensch', plain: true, letter: 'E' } }, a: 'Mensch', w: ['Hund', 'Rind', 'Eichhörnchen'], why: 'Alle Zahntypen, kleine Eckzähne, keine Lücke, 8 Zähne pro Kieferhälfte.' },
    { id: 'd10-06', o: 10, t: 'match', lv: 2, q: 'Welche Gebissart passt?', p: [['Hund', 'Fleischfresser-Gebiss'], ['Rind', 'Pflanzenfresser-Gebiss'], ['Eichhörnchen', 'Nagetier-Gebiss'], ['Mensch', 'Allesfresser-Gebiss']], why: 'Der Hund wird manchmal auch als Allesfresser bezeichnet – sein Gebiss ist aber ein typisches Raubtiergebiss.' },
    { id: 'd10-07', o: 10, t: 'text', lv: 3, q: 'Du findest einen Schädel mit großen spitzen Eckzähnen, scharfen hinteren Zähnen und ohne Zahnlücke. Was hat das Tier gefressen? Begründe.',
      k: [{ l: 'Fleischfresser / Fleisch', a: ['fleisch', 'raubtier', 'beute', 'jäger', 'jaeger'] }, { l: 'Eckzähne packen die Beute', a: ['eckz', 'fangz', 'pack', 'festhalt'] }, { l: 'Reißzähne / scharfe Zähne zerschneiden', a: ['reißz', 'reissz', 'scharf', 'schneid', 'schere'] }],
      m: 'Das Tier war ein Fleischfresser. Mit den großen Eckzähnen (Fangzähnen) hat es die Beute gepackt. Die scharfen Reißzähne haben das Fleisch wie eine Schere zerschnitten. Eine Zahnlücke brauchte es nicht.', why: 'Merkmal → Funktion → Nahrung.' },
    { id: 'd10-08', o: 10, t: 'tf', lv: 2, q: 'Richtig oder falsch?', s: [['Das Rind hat oben vorne keine Schneidezähne.', true], ['Das Eichhörnchen hat große Eckzähne.', false], ['Hund und Katze haben eine große Zahnlücke.', false], ['Der Kiefer des Rindes kann seitlich mahlen.', true]], why: 'Zahnlücken haben Rind und Nagetiere, nicht die Raubtiere.' },
    { id: 'd10-09', o: 10, t: 'mc', lv: 3, q: 'Wie unterscheidet man einen Hunde- von einem Katzenschädel am Gebiss?', a: 'Der Hund hat mehr Zähne (42) und eine längere Schnauze; die Katze hat nur 30 Zähne und eine kurze Schnauze.', w: ['Nur die Katze hat Eckzähne.', 'Nur der Hund hat Reißzähne.', 'Die Katze hat eine Zahnlücke.'], why: 'Beide sind Fleischfresser – der Unterschied liegt in Zahl und Schnauzenlänge.' },
    { id: 'd10-10', o: 10, t: 'mc', lv: 2, q: 'Was liegt beim Rind oben vorne statt der Schneidezähne?', a: 'eine Hornplatte (Kauplatte)', w: ['eine Zahnlücke ohne alles', 'die Eckzähne', 'die Nagezähne'], why: 'Die unteren Schneidezähne drücken das Gras gegen die Hornplatte.' },
    { id: 'd10-11', o: 10, t: 'sort', lv: 2, q: 'Welches Merkmal gehört zu welchem Gebiss?', b: ['Fleischfresser', 'Pflanzenfresser (Rind)', 'Nagetier'], i: [['Reißzähne', 0], ['große Fangzähne', 0], ['Hornplatte oben vorn', 1], ['breite Mahlzähne', 1], ['Zähne wachsen immer nach', 2], ['keine Eckzähne, ein Schneidezahn pro Kieferhälfte', 2]], why: 'Achte auf die Besonderheiten jedes Gebisses.' });

  // ------------------------------------------------------------------ 12 Zahnformeln
  L({ obj: 12, title: 'Zahnformeln',
    text: [
      'Eine **Zahnformel** zeigt, wie viele Zähne jeder Art ein Tier hat.',
      'Man schreibt sie für **eine Kieferhälfte** (eine Seite des Mundes) – **oben** für den Oberkiefer, **unten** für den Unterkiefer. Die Reihenfolge ist immer von vorne nach hinten: **Schneidezähne (I)** – **Eckzähne (C)** – **Vorbackenzähne (P)** – **Backenzähne (M)**.',
      'Die Buchstaben kommen aus dem Lateinischen: I = Incisivi, C = Canini, P = Prämolaren, M = Molaren.',
      'Weil der Mund zwei gleiche Seiten hat, rechnet man: **(Zähne oben + Zähne unten) × 2 = alle Zähne**.',
      '**Hund:** oben 3 1 4 2, unten 3 1 4 3 → (10 + 11) × 2 = **42 Zähne**.',
      '**Katze:** oben 3 1 3 1, unten 3 1 2 1 → (8 + 7) × 2 = **30 Zähne**.',
      '**Rind:** oben 0 0 3 3, unten 3 1 3 3 → (6 + 10) × 2 = **32 Zähne**. Oben vorne: Hornplatte. Der untere Eckzahn sieht aus wie ein Schneidezahn.',
      '**Eichhörnchen:** oben 1 0 2 3, unten 1 0 1 3 → (6 + 5) × 2 = **22 Zähne**.',
      '**Mensch:** oben 2 1 2 3, unten 2 1 2 3 → (8 + 8) × 2 = **32 Zähne** (Erwachsene, mit Weisheitszähnen).'
    ],
    formulas: true,
    vocab: [['Zahnformel', 'Zahn-for-mel', 'Anzahl der Zahntypen in einer Kieferhälfte'], ['Oberkiefer', 'O-ber-kie-fer', 'oberer Kieferknochen'], ['Unterkiefer', 'Un-ter-kie-fer', 'unterer Kieferknochen'], ['Kieferhälfte', 'Kie-fer-hälf-te', 'eine Seite des Kiefers']],
    example: { q: 'Berechne die Zähne der Katze: oben 3 1 3 1, unten 3 1 2 1.', a: 'Oben: 3 + 1 + 3 + 1 = 8. Unten: 3 + 1 + 2 + 1 = 7. Zusammen 15 pro Seite. 15 × 2 = 30 Zähne.' },
    notes: [{ k: 'LEHRKRAFT', t: 'Manche Bücher schreiben die Formel für den ganzen Kiefer gespiegelt (z. B. Hund oben: 2 4 1 3 | 3 1 4 2). Die Zahlen sind dieselben. Schreib sie so, wie ihr es im Unterricht gelernt habt.' }, { k: 'Merkhilfe', t: 'Hund 42 – Katze 30 – Rind 32 – Eichhörnchen 22 – Mensch 32.' }],
    summary: ['Reihenfolge: I – C – P – M (Schneide-, Eck-, Vorbacken-, Backenzähne).', 'Oben = Oberkiefer, unten = Unterkiefer, je eine Hälfte.', 'Gesamtzahl = (oben + unten) × 2.', 'Hund 42 · Katze 30 · Rind 32 · Eichhörnchen 22 · Mensch 32.'],
    simple: 'Zähle bei dir selbst mit der Zunge: oben rechts vom Mittelpunkt nach hinten: 2 Schneidezähne, 1 Eckzahn, 2 Vorbackenzähne, 3 Backenzähne (wenn alle da sind). Das ist deine Zahnformel für oben.',
    check: ['d12-01', 'd12-06', 'd12-08'] });

  Q({ id: 'd12-01', o: 12, t: 'formula', lv: 2, q: 'Schreibe die Zahnformel des Hundes.', animal: 'hund', why: 'Hund: oben 3 1 4 2, unten 3 1 4 3 → 42 Zähne.' },
    { id: 'd12-02', o: 12, t: 'formula', lv: 2, q: 'Schreibe die Zahnformel der Katze.', animal: 'katze', why: 'Katze: oben 3 1 3 1, unten 3 1 2 1 → 30 Zähne.' },
    { id: 'd12-03', o: 12, t: 'formula', lv: 3, q: 'Schreibe die Zahnformel des Rindes.', animal: 'rind', why: 'Rind: oben 0 0 3 3 (Hornplatte!), unten 3 1 3 3 → 32 Zähne.' },
    { id: 'd12-04', o: 12, t: 'formula', lv: 3, q: 'Schreibe die Zahnformel des Eichhörnchens.', animal: 'eich', why: 'Eichhörnchen: oben 1 0 2 3, unten 1 0 1 3 → 22 Zähne.' },
    { id: 'd12-05', o: 12, t: 'formula', lv: 2, q: 'Schreibe die Zahnformel des Menschen (Erwachsener).', animal: 'mensch', why: 'Mensch: oben 2 1 2 3, unten 2 1 2 3 → 32 Zähne.' },
    { id: 'd12-06', o: 12, t: 'mc', lv: 2, q: 'Warum multipliziert man bei der Zahnformel mit 2?', a: 'Die Formel zeigt nur eine Kieferhälfte; die andere Seite ist gleich.', w: ['Weil es Ober- und Unterkiefer gibt.', 'Weil jeder Zahn zwei Wurzeln hat.', 'Weil Milchzähne mitgezählt werden.'], why: 'Ober- und Unterkiefer stehen schon in der Formel (oben/unten). ×2 für die zweite Seite.' },
    { id: 'd12-07', o: 12, t: 'match', lv: 2, q: 'Wie viele Zähne hat das Tier insgesamt?', p: [['Hund', '42'], ['Katze', '30'], ['Eichhörnchen', '22'], ['Rind', '32 (oben vorne Hornplatte)']], why: 'Mensch und Rind haben beide 32 – aber ganz anders verteilt.' },
    { id: 'd12-08', o: 12, t: 'mc', lv: 3, q: 'Zahnformel: oben 1 0 2 3, unten 1 0 1 3. Welches Tier?', a: 'Eichhörnchen', w: ['Rind', 'Katze', 'Mensch'], why: 'Nur ein Schneidezahn (Nagezahn) pro Hälfte, kein Eckzahn.' },
    { id: 'd12-09', o: 12, t: 'mc', lv: 3, q: 'Zahnformel: oben 0 0 3 3, unten 3 1 3 3. Welches Tier?', a: 'Rind', w: ['Eichhörnchen', 'Hund', 'Pferd'], why: 'Oben keine Schneide- und Eckzähne → Hornplatte des Wiederkäuers.' },
    { id: 'd12-10', o: 12, t: 'num', lv: 2, q: 'Ein Tier hat die Zahnformel oben 3 1 3 1, unten 3 1 2 1. Wie viele Zähne hat es insgesamt?', a: 30, unit: 'Zähne', why: '(8 + 7) × 2 = 30 – die Katze.' },
    { id: 'd12-11', o: 12, t: 'num', lv: 2, q: 'Wie viele Zähne hat der Hund im OBERKIEFER (beide Seiten zusammen)?', a: 20, unit: 'Zähne', why: 'Eine Hälfte oben: 3 + 1 + 4 + 2 = 10. Zwei Hälften: 20.' },
    { id: 'd12-12', o: 12, t: 'order', lv: 1, q: 'In welcher Reihenfolge stehen die Zahntypen in der Zahnformel? (vorne → hinten)', i: ['Schneidezähne (I)', 'Eckzähne (C)', 'Vorbackenzähne (P)', 'Backenzähne (M)'], why: 'Von der Mitte des Mundes nach hinten.' },
    { id: 'd12-13', o: 12, t: 'mc', lv: 3, q: 'Beim Rind steht unten bei C eine 1. Warum sieht man aber unten vorne 8 gleich aussehende Zähne?', a: 'Der untere Eckzahn sieht beim Rind aus wie ein Schneidezahn: 3 Schneidezähne + 1 Eckzahn pro Seite = 4, mal 2 = 8.', w: ['Das Rind hat 8 Eckzähne.', 'Das Rind hat 4 Schneidezähne pro Seite.', 'Es sind Milchzähne.'], why: 'Er sieht aus wie ein Schneidezahn und arbeitet auch so.' },
    { id: 'd12-14', o: 12, t: 'fill', lv: 2, q: 'Ergänze die Zahnformel des Menschen.', s: 'Oberkiefer: I {2} C {1} P {2} M {3} – zusammen {32} Zähne.', why: '(2+1+2+3) × 2 oben und unten = 16 + 16 = 32.' });
})(window.BIO);
