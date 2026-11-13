/* Modul B — Merkmale der Säugetiere (Lernziele 5–6) */
(function (B) {
  'use strict';
  var L = B.content.lesson, Q = B.content.q;

  // ------------------------------------------------------------------ 5 Merkmale der Säugetiere
  L({ obj: 5, title: 'Merkmale der Säugetiere',
    text: [
      '**Haare / Fell:** Säugetiere haben Haare. Das Fell hält warm. Wale und Delfine haben nur noch wenige Haare (als Junge an der Schnauze) – eine dicke **Fettschicht** hält sie warm.',
      '**Milchdrüsen:** Die Mütter **säugen** ihre Jungen mit **Milch** aus den Milchdrüsen (Zitzen). Daher kommt der Name „Säugetiere“.',
      '**Lebend geboren:** Die Jungen entwickeln sich im Bauch der Mutter (Gebärmutter) und werden lebend geboren. **Ausnahme:** Schnabeltier und Ameisenigel legen Eier – sie säugen ihre Jungen aber trotzdem.',
      '**Lungenatmung:** Alle Säugetiere atmen mit **Lungen** – auch Wale. Ein Muskel, das **Zwerchfell**, hilft beim Atmen.',
      '**Gleichwarm:** Säugetiere halten ihre Körpertemperatur gleich (meist 36–39 °C).',
      '**Verschiedene Zähne:** Säugetiere haben meist unterschiedliche Zahntypen (Schneide-, Eck-, Backenzähne). Mehr dazu in Modul D.',
      '**Innere Befruchtung:** Die Eizelle wird im Körper der Mutter befruchtet.'
    ],
    cards: [['🧥', 'Haare / Fell'], ['🍼', 'Milch, säugen'], ['👶', 'meist lebend geboren'], ['🫁', 'Lungen, Zwerchfell'], ['🌡️', 'gleichwarm'], ['🦷', 'verschiedene Zahntypen']],
    vocab: [['säugen', 'säu-gen', 'Junge mit Milch füttern'], ['Milchdrüsen', 'Milch-drü-sen', 'bilden die Milch'], ['Zwerchfell', 'Zwerch-fell', 'Atemmuskel unter der Lunge'], ['Gebärmutter', 'Ge-bär-mut-ter', 'Ort, wo das Junge im Bauch wächst']],
    example: { q: 'Ist die Fledermaus ein Vogel?', a: 'Nein. Sie hat Fell statt Federn, bringt lebende Junge zur Welt und säugt sie mit Milch. Sie ist ein Säugetier, das fliegen kann.' },
    notes: [{ k: 'Ausnahme', t: 'Kloakentiere (Schnabeltier, Ameisenigel) legen Eier. Das wichtigste Merkmal haben aber ALLE Säugetiere: Sie säugen ihre Jungen mit Milch.' }],
    summary: ['Fell/Haare · Milch · meist lebend geboren · Lungen · gleichwarm · verschiedene Zähne.', 'Das Merkmal, das ALLE Säugetiere haben: Milch für die Jungen.', 'Wal, Delfin, Fledermaus sind Säugetiere.'],
    simple: 'Denk an eine Kuh: Sie hat Fell, ihr Kalb wird geboren und trinkt Milch. Genau das machen alle Säugetiere – auch der Wal im Meer.',
    check: ['b5-01', 'b5-02', 'b5-04'] });

  Q({ id: 'b5-01', o: 5, t: 'multi', lv: 1, q: 'Welche Merkmale haben Säugetiere? Wähle alle richtigen.', a: ['Haare oder Fell', 'Junge trinken Milch', 'Lungenatmung', 'gleichwarm'], w: ['Federn', 'Kiemen', 'wechselwarm'], why: 'Federn gibt es nur bei Vögeln, Kiemen bei Fischen.' },
    { id: 'b5-02', o: 5, t: 'mc', lv: 2, q: 'Welches Merkmal haben WIRKLICH ALLE Säugetiere?', a: 'Sie säugen ihre Jungen mit Milch.', w: ['Sie bringen lebende Junge zur Welt.', 'Sie haben ein dichtes Fell.', 'Sie leben an Land.'], why: 'Schnabeltiere legen Eier, Wale haben kaum Haare – aber alle säugen ihre Jungen.' },
    { id: 'b5-03', o: 5, t: 'tf', lv: 2, q: 'Richtig oder falsch?', s: [['Das Schnabeltier legt Eier und ist trotzdem ein Säugetier.', true], ['Wale atmen mit Kiemen.', false], ['Fledermäuse sind Vögel.', false], ['Das Zwerchfell hilft beim Atmen.', true]], why: 'Wale atmen mit Lungen; Fledermäuse sind Säugetiere.' },
    { id: 'b5-04', o: 5, t: 'text', lv: 2, q: 'Nenne vier Merkmale der Säugetiere.',
      k: [{ l: 'Fell / Haare', a: ['fell', 'haar'] }, { l: 'Milch / säugen', a: ['milch', 'säug', 'saeug', 'zitze'] }, { l: 'lebend geboren', a: ['lebend', 'gebär', 'geboren', 'lebendgeb'] }, { l: 'Lungenatmung', a: ['lunge'] }, { l: 'gleichwarm', a: ['gleichwarm', 'gleich warm'] }, { l: 'verschiedene Zähne / Zwerchfell', a: ['zahn', 'zähne', 'zaehne', 'zwerchfell', 'gebiss'] }],
      need: 4, m: 'Säugetiere haben Haare/Fell, säugen ihre Jungen mit Milch, bringen meist lebende Junge zur Welt, atmen mit Lungen und sind gleichwarm. Sie haben verschiedene Zahntypen und ein Zwerchfell.', why: 'Vier verschiedene Merkmale reichen für volle Punkte.' },
    { id: 'b5-05', o: 5, t: 'mc', lv: 2, q: 'Wie hält sich ein Wal im kalten Meer warm, obwohl er kaum Haare hat?', a: 'mit einer dicken Fettschicht unter der Haut', w: ['mit Federn', 'er ist wechselwarm', 'mit Kiemen'], why: 'Die Fettschicht (Blubber) isoliert wie ein Fell.' },
    { id: 'b5-06', o: 5, t: 'fill', lv: 2, q: 'Ergänze.', s: 'Die Jungen trinken Milch aus den {Milchdrüsen|Zitzen|Milchdrüse}. Diese Tiere heißen deshalb {Säugetiere}. Beim Atmen hilft ein Muskel, das {Zwerchfell}.', bank: ['Milchdrüsen', 'Säugetiere', 'Zwerchfell', 'Kiemen', 'Federn'], why: 'Zwerch-fell mit „rch“.' },
    { id: 'b5-07', o: 5, t: 'mc', lv: 3, q: 'Ein Tier hat Fell, legt Eier und säugt die geschlüpften Jungen. Was ist es?', a: 'ein Säugetier (z. B. Schnabeltier)', w: ['ein Vogel', 'ein Reptil', 'das gibt es nicht'], why: 'Die Kloakentiere sind die Ausnahme unter den Säugetieren.' },
    { id: 'b5-08', o: 5, t: 'sort', lv: 2, q: 'Säugetier oder nicht?', b: ['Säugetier', 'kein Säugetier'], i: [['Delfin', 0], ['Fledermaus', 0], ['Igel', 0], ['Schnabeltier', 0], ['Pinguin', 1], ['Hai', 1], ['Krokodil', 1], ['Strauß', 1]], why: 'Pinguin und Strauß sind Vögel, Hai ein Fisch, Krokodil ein Reptil.' },
    { id: 'b5-09', o: 5, t: 'mc', lv: 2, q: 'Wo entwickelt sich das Junge eines Hundes vor der Geburt?', a: 'in der Gebärmutter der Mutter', w: ['in einem Ei im Nest', 'im Wasser als Larve', 'im Beutel'], why: 'Säugetierjunge wachsen meist in der Gebärmutter heran.' },
    { id: 'b5-10', o: 5, t: 'mc', lv: 3, q: 'Was ist der Unterschied zwischen dem Fell der Säugetiere und den Federn der Vögel?', a: 'Beides hält warm, aber Federn gibt es nur bei Vögeln und Haare nur bei Säugetieren.', w: ['Fell hält nicht warm.', 'Federn sind bei allen Wirbeltieren zu finden.', 'Es gibt keinen Unterschied.'], why: 'Körperbedeckung: Haare = Säugetiere, Federn = Vögel.' });

  // ------------------------------------------------------------------ 6 Nesthocker / Nestflüchter
  L({ obj: 6, title: 'Nesthocker und Nestflüchter',
    text: [
      '**Nesthocker** kommen hilflos zur Welt: meist **nackt** oder mit wenig Fell, die **Augen** (und oft die Ohren) sind **geschlossen**. Sie können noch nicht laufen. Sie bleiben lange im **Nest** und werden gewärmt und gefüttert.',
      'Beispiele: **Maus, Kaninchen, Eichhörnchen, Katze, Hund**. Bei Vögeln: **Amsel, Meise, Taube**.',
      '**Nestflüchter** sind bei der Geburt schon weit entwickelt: Sie haben ein **Fell**, die **Augen sind offen**, und sie können nach kurzer Zeit **stehen und laufen**. Sie folgen der Mutter.',
      'Beispiele: **Pferd (Fohlen), Rind (Kalb), Schaf, Ziege, Reh, Feldhase, Meerschweinchen**. Bei Vögeln: **Huhn, Ente**.',
      '**Warum?** Viele Nestflüchter leben im offenen Gelände und werden von Raubtieren gejagt. Ein Fohlen muss schnell mit der Herde fliehen können. Nesthocker wachsen gut versteckt in einer Höhle oder einem Nest auf.',
      'Nestflüchter sind meist **lange** im Bauch der Mutter (Pferd: ca. 11 Monate). Nesthocker sind dort oft nur **kurz** (Maus: ca. 3 Wochen).',
      '**Achtung, Falle:** Der **Feldhase** ist ein Nestflüchter, das **Kaninchen** ein Nesthocker!'
    ],
    cards: [['🐭', 'Nesthocker: nackt, Augen zu, hilflos, bleibt im Nest'], ['🐴', 'Nestflüchter: Fell, Augen offen, läuft bald']],
    vocab: [['Nesthocker', 'Nest-ho-cker', 'Junges bleibt hilflos im Nest'], ['Nestflüchter', 'Nest-flüch-ter', 'Junges kann bald laufen und folgt der Mutter'], ['Tragzeit', 'Trag-zeit', 'Zeit, die das Junge im Bauch der Mutter ist']],
    example: { q: 'Ein Kälbchen steht eine Stunde nach der Geburt auf. Nesthocker oder Nestflüchter?', a: 'Nestflüchter: Es hat Fell, die Augen sind offen und es kann bald laufen.' },
    notes: [{ k: 'Sonderfall', t: 'Der Mensch passt in keine Gruppe richtig: Babys haben offene Augen, können aber lange nicht laufen. Man nennt ihn manchmal „Tragling“. In der Arbeit besser Tiere als Beispiele nehmen.' }],
    summary: ['Nesthocker: nackt, blind, hilflos, lange im Nest – Maus, Kaninchen, Katze, Hund, Amsel.', 'Nestflüchter: Fell, Augen offen, laufen bald – Pferd, Rind, Reh, Feldhase, Huhn.', 'Feldhase = Nestflüchter, Kaninchen = Nesthocker.'],
    simple: 'Nest-HOCKER „hocken“ im Nest, weil sie noch nichts können. Nest-FLÜCHTER können bald aus dem Nest „flüchten“ – sie laufen mit der Mutter mit.',
    check: ['b6-01', 'b6-02', 'b6-05'] });

  Q({ id: 'b6-01', o: 6, t: 'sort', lv: 1, q: 'Nesthocker oder Nestflüchter?', b: ['Nesthocker', 'Nestflüchter'], i: [['Maus', 0], ['Kaninchen', 0], ['Katze', 0], ['Amsel', 0], ['Pferd', 1], ['Rind', 1], ['Feldhase', 1], ['Huhn', 1]], why: 'Achtung: Feldhase = Nestflüchter, Kaninchen = Nesthocker.' },
    { id: 'b6-02', o: 6, t: 'multi', lv: 1, q: 'Welche Merkmale passen zu NESTHOCKERN?', a: ['Augen geschlossen', 'nackt oder wenig Fell', 'werden im Nest gefüttert und gewärmt'], w: ['laufen kurz nach der Geburt', 'folgen sofort der Mutter', 'dichtes Fell bei der Geburt'], why: 'Nesthocker sind bei der Geburt hilflos.' },
    { id: 'b6-03', o: 6, t: 'mc', lv: 2, q: 'Warum ist es für ein Fohlen wichtig, ein Nestflüchter zu sein?', a: 'Es lebt in einer Herde im offenen Gelände und muss bei Gefahr mitfliehen können.', w: ['Es hat ein warmes Nest in einer Höhle.', 'Pferde sind Raubtiere.', 'Es kann sich sonst nicht ernähren.'], why: 'Im offenen Gelände gibt es kein Versteck – schnelles Laufen schützt.' },
    { id: 'b6-04', o: 6, t: 'mc', lv: 2, q: 'Welches Paar ist richtig?', a: 'Feldhase: Nestflüchter – Kaninchen: Nesthocker', w: ['Feldhase: Nesthocker – Kaninchen: Nestflüchter', 'beide sind Nesthocker', 'beide sind Nestflüchter'], why: 'Junge Feldhasen liegen mit Fell und offenen Augen in einer Mulde; junge Kaninchen sind nackt und blind im Bau.' },
    { id: 'b6-05', o: 6, t: 'text', lv: 3, q: 'Erkläre den Unterschied zwischen Nesthockern und Nestflüchtern. Nenne je ein Beispiel.',
      k: [{ l: 'Nesthocker: hilflos, nackt/blind, bleiben im Nest', a: ['hilflos', 'nackt', 'blind', 'augen geschlossen', 'augen zu', 'im nest', 'gefüttert'] }, { l: 'Beispiel Nesthocker', a: ['maus', 'kaninchen', 'katze', 'hund', 'amsel', 'meise', 'eichhörnchen', 'eichhoernchen', 'ratte', 'hamster'] },
        { l: 'Nestflüchter: Fell, Augen offen, laufen bald', a: ['laufen', 'augen offen', 'offen', 'fell', 'folgen', 'stehen', 'flieh'] }, { l: 'Beispiel Nestflüchter', a: ['pferd', 'fohlen', 'rind', 'kalb', 'reh', 'feldhase', 'huhn', 'küken', 'ente', 'schaf', 'ziege', 'meerschwein'] }],
      m: 'Nesthocker kommen nackt und mit geschlossenen Augen zur Welt. Sie sind hilflos und bleiben im Nest, z. B. die Maus. Nestflüchter haben bei der Geburt Fell und offene Augen und können bald laufen, z. B. das Pferd.', why: 'Erklärung und Beispiel für beide Begriffe.' },
    { id: 'b6-06', o: 6, t: 'fill', lv: 2, q: 'Ergänze.', s: 'Junge Katzen sind {Nesthocker}. Kälber sind {Nestflüchter}.', bank: ['Nesthocker', 'Nestflüchter'], why: 'Kätzchen öffnen die Augen erst nach etwa 1–2 Wochen.' },
    { id: 'b6-07', o: 6, t: 'mc', lv: 3, q: 'Ein Tier ist ca. 11 Monate trächtig. Das Junge hat bei der Geburt Fell und offene Augen. Was gilt am wahrscheinlichsten?', a: 'Es ist ein Nestflüchter.', w: ['Es ist ein Nesthocker.', 'Es ist ein Vogel.', 'Man kann es nicht sagen, weil es keine Merkmale gibt.'], why: 'Lange Tragzeit, Fell und offene Augen passen zum Nestflüchter (z. B. Pferd).' },
    { id: 'b6-08', o: 6, t: 'sort', lv: 2, q: 'Auch Vögel kann man so einteilen. Ordne zu.', b: ['Nesthocker', 'Nestflüchter'], i: [['Amsel', 0], ['Blaumeise', 0], ['Taube', 0], ['Haushuhn', 1], ['Stockente', 1], ['Wachtel', 1]], why: 'Küken von Huhn und Ente haben Daunen und laufen bald hinter der Mutter her.' },
    { id: 'b6-09', o: 6, t: 'tf', lv: 2, q: 'Richtig oder falsch?', s: [['Nesthocker sind oft nur kurz im Bauch der Mutter.', true], ['Nestflüchter haben bei der Geburt geschlossene Augen.', false], ['Junge Hunde sind Nesthocker.', true], ['Ein Reh-Kitz ist ein Nestflüchter.', true]], why: 'Welpen öffnen die Augen erst nach etwa 2 Wochen.' },
    { id: 'b6-10', o: 6, t: 'match', lv: 2, q: 'Ordne zu.', p: [['Maus', 'nackt und blind im Nest'], ['Fohlen', 'steht nach kurzer Zeit auf'], ['Küken des Huhns', 'pickt bald selbst Körner'], ['junge Amsel', 'sperrt den Schnabel im Nest auf']], why: 'Huhnküken sind Nestflüchter, junge Amseln Nesthocker.' });
})(window.BIO);
