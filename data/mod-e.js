/* Modul E — Hund und Katze (Lernziele 13–16) */
(function (B) {
  'use strict';
  var L = B.content.lesson, Q = B.content.q;

  // ------------------------------------------------------------------ 13 Jagdverhalten
  L({ obj: 13, title: 'So jagen Hund und Katze',
    text: [
      'Hund und Katze sind beide **Raubtiere** (Beutegreifer). Sie jagen aber ganz verschieden.',
      '**Der Hund (Wolf) ist ein Hetzjäger.** Wölfe jagen im **Rudel**. Sie nehmen die **Witterung** auf (riechen die Beute) und folgen der **Fährte** (Spur). Dann **hetzen** sie die Beute über lange Strecken, bis sie müde ist. Sie **packen** sie mit den Fangzähnen und **töten** sie, z. B. durch Bisse oder Schütteln.',
      'Ablauf beim Hund: **Witterung aufnehmen → Fährte verfolgen → Hetzen → Packen → Töten**.',
      '**Die Katze ist ein Schleich- und Lauerjäger** (Ansitzjäger). Sie jagt **allein**. Sie **schleicht** sich lautlos an oder **lauert** lange still vor einem Mauseloch. Wenn die Beute nah ist, macht sie einen schnellen **Sprung**. Sie **packt** die Beute mit den ausgefahrenen **Krallen** und tötet sie mit dem **Nackenbiss** (Tötungsbiss).',
      'Ablauf bei der Katze: **Anschleichen → Lauern → Anspringen → Packen (mit Krallen) → Nackenbiss**.',
      'Robin ist ein **Whippet**, ein Windhund. Windhunde jagen auf **Sicht** und sind **Sprinter**: Sie hetzen Hasen über kurze Strecken sehr schnell. Wölfe sind eher **Ausdauerläufer**. Beide sind Hetzjäger.'
    ],
    steps: [['Hund (Hetzjäger)', ['👃 Witterung aufnehmen', '🐾 Fährte verfolgen', '🏃 Hetzen', '🦷 Packen', '✖ Töten']], ['Katze (Schleich- und Lauerjäger)', ['🐈 Anschleichen', '👀 Lauern', '🦘 Anspringen', '🐾 Packen mit Krallen', '🦷 Nackenbiss']]],
    vocab: [['Hetzjäger', 'Hetz-jä-ger', 'verfolgt die Beute bis zur Erschöpfung'], ['Schleichjäger', 'Schleich-jä-ger', 'schleicht sich lautlos an'], ['Lauerjäger', 'Lau-er-jä-ger', 'wartet still auf die Beute'], ['Witterung', 'Wit-te-rung', 'Geruch der Beute'], ['Fährte', 'Fähr-te', 'Spur am Boden'], ['Nackenbiss', 'Na-cken-biss', 'tödlicher Biss in den Nacken']],
    example: { q: 'Eine Katze sitzt 20 Minuten ganz still vor einem Mauseloch. Wie heißt das?', a: 'Lauern. Die Katze ist ein Lauerjäger (Ansitzjäger). Sie wartet, bis die Maus herauskommt, und springt dann.' },
    summary: ['Hund/Wolf: Hetzjäger im Rudel – Witterung, Fährte, Hetzen, Packen, Töten.', 'Katze: Schleich- und Lauerjäger, allein – Anschleichen, Lauern, Sprung, Packen, Nackenbiss.'],
    simple: 'Hund = Marathonläufer im Team: Er rennt so lange hinterher, bis die Beute nicht mehr kann. Katze = Versteckspieler: Sie wartet leise und überrascht die Beute mit einem Sprung.',
    check: ['e13-01', 'e13-02', 'e13-04'] });

  Q({ id: 'e13-01', o: 13, t: 'order', lv: 1, q: 'Bringe das Beutefangverhalten der KATZE in die richtige Reihenfolge.', i: ['Anschleichen', 'Lauern', 'Anspringen', 'Packen mit den Krallen', 'Nackenbiss'], why: 'Schleichen und Lauern kommen vor dem Sprung.' },
    { id: 'e13-02', o: 13, t: 'order', lv: 1, q: 'Bringe das Jagdverhalten des WOLFES/HUNDES in die richtige Reihenfolge.', i: ['Witterung aufnehmen', 'Fährte verfolgen', 'Beute hetzen', 'Beute packen', 'Beute töten'], why: 'Erst riechen, dann folgen, dann hetzen.' },
    { id: 'e13-03', o: 13, t: 'sort', lv: 2, q: 'Hund oder Katze?', b: ['Hund (Hetzjäger)', 'Katze (Schleich- und Lauerjäger)'], i: [['jagt im Rudel', 0], ['verfolgt die Beute lange', 0], ['folgt der Fährte mit der Nase', 0], ['jagt allein', 1], ['wartet still vor dem Mauseloch', 1], ['tötet mit dem Nackenbiss', 1]], why: 'Ausdauer im Team ↔ Überraschung allein.' },
    { id: 'e13-04', o: 13, t: 'fill', lv: 2, q: 'Ergänze die Fachausdrücke.', s: 'Der Wolf ist ein {Hetzjäger}. Er nimmt die {Witterung} auf und folgt der {Fährte|Spur}. Die Katze ist ein Schleich- und {Lauerjäger|Ansitzjäger}.', bank: ['Hetzjäger', 'Witterung', 'Fährte', 'Lauerjäger', 'Nackenbiss'], why: 'Fähr-te mit „äh“, Wit-te-rung mit „tt“.' },
    { id: 'e13-05', o: 13, t: 'mc', lv: 2, q: 'Wie tötet die Katze ihre Beute meistens?', a: 'mit einem Biss in den Nacken (Nackenbiss)', w: ['durch langes Hetzen', 'durch Schütteln im Rudel', 'durch Erdrücken'], why: 'Die langen Eckzähne treffen das Genick.' },
    { id: 'e13-06', o: 13, t: 'text', lv: 3, q: 'Beschreibe das Beutefangverhalten der Katze mit Fachausdrücken.',
      k: [{ l: 'Anschleichen', a: ['schleich'] }, { l: 'Lauern', a: ['lauer'] }, { l: 'Sprung / Anspringen', a: ['sprung', 'spring'] }, { l: 'Packen mit Krallen', a: ['kralle', 'pack'] }, { l: 'Nackenbiss / Tötungsbiss', a: ['nacken', 'tötungsbiss', 'toetungsbiss', 'biss'] }],
      need: 4, m: 'Die Katze schleicht sich lautlos an die Beute heran. Dann lauert sie still. Wenn die Beute nah ist, springt sie sie an, packt sie mit den Krallen und tötet sie mit dem Nackenbiss.', why: 'Fachausdrücke in der richtigen Reihenfolge.' },
    { id: 'e13-07', o: 13, t: 'tf', lv: 2, q: 'Richtig oder falsch?', s: [['Wölfe jagen meist allein.', false], ['Hetzjäger ermüden ihre Beute.', true], ['Katzen jagen vor allem mit Ausdauer.', false], ['Lauern bedeutet: still warten.', true]], why: 'Wölfe jagen im Rudel; Katzen setzen auf Überraschung.' },
    { id: 'e13-08', o: 13, t: 'mc', lv: 2, q: 'Was bedeutet „die Witterung aufnehmen“?', a: 'den Geruch der Beute wahrnehmen', w: ['auf das Wetter achten', 'die Beute anspringen', 'sich verstecken'], why: 'Jägersprache: Witterung = Geruch.' },
    { id: 'e13-09', o: 13, t: 'mc', lv: 3, q: 'Robin ist ein Whippet (Windhund). Wie jagt ein Windhund?', a: 'Er sieht die Beute und hetzt sie über eine kurze Strecke sehr schnell (Sicht-Hetzjäger, Sprinter).', w: ['Er lauert wie eine Katze.', 'Er gräbt die Beute aus.', 'Er jagt nur mit der Nase über viele Kilometer.'], why: 'Windhunde jagen auf Sicht. Sie sind trotzdem Hetzjäger.' },
    { id: 'e13-10', o: 13, t: 'match', lv: 2, q: 'Ordne den Fachausdruck zu.', p: [['Fährte', 'Spur am Boden'], ['Lauern', 'still auf die Beute warten'], ['Hetzen', 'Beute lange verfolgen'], ['Anschleichen', 'sich lautlos nähern']], why: 'Diese Wörter solltest du in der Arbeit benutzen.' });

  // ------------------------------------------------------------------ 14 Körperbau und Jagd
  L({ obj: 14, title: 'Körperbau passt zur Jagd',
    text: [
      '**Katze (Schleich- und Lauerjäger):**',
      '**Einziehbare Krallen:** Beim Laufen sind sie eingezogen – sie bleiben **scharf** und machen **kein Geräusch**. Zum Packen fährt die Katze sie aus.',
      '**Weiche Ballen:** Die Katze ist **Zehengänger** und läuft **lautlos**.',
      '**Augen vorne:** Beide Augen sehen nach vorne. So kann sie **Entfernungen gut schätzen** – wichtig für den Sprung. Ihre Augen sind auch in der **Dämmerung** gut (Tapetum: die Augen leuchten im Licht).',
      '**Sehr gutes Gehör:** Bewegliche Ohren hören das Rascheln und Piepsen von Mäusen. **Tasthaare** helfen im Dunkeln.',
      '**Biegsame Wirbelsäule und kräftige Hinterbeine:** für den schnellen **Sprung**.',
      '**Hund/Wolf (Hetzjäger):**',
      '**Lange Beine, tiefer Brustkorb** (große Lunge und großes Herz): für **ausdauerndes Laufen**. Er ist **Zehengänger**.',
      '**Krallen nicht einziehbar:** Sie geben **Halt** beim schnellen Laufen wie Spikes. Sie werden dabei stumpf.',
      '**Sehr gute Nase:** Der Hund riecht viel besser als der Mensch – ideal, um der **Fährte** zu folgen.',
      '**Lange Schnauze mit großen Fangzähnen:** zum **Packen** der Beute im Lauf.'
    ],
    figs: [{ n: 'fov' }],
    vocab: [['einziehbar', 'ein-zieh-bar', 'kann hineingezogen werden'], ['Tasthaare', 'Tast-haa-re', 'lange Haare zum Fühlen'], ['Ballen', 'Bal-len', 'weiche Polster unter den Pfoten'], ['räumlich sehen', 'räum-lich se-hen', 'Entfernungen schätzen können']],
    example: { q: 'Warum hat die Katze Augen vorn, ein Kaninchen aber seitlich?', a: 'Die Katze muss den Abstand zur Beute genau schätzen, um richtig zu springen – dafür braucht sie Augen vorn. Das Kaninchen ist Beute: Mit seitlichen Augen sieht es fast rundherum und bemerkt Feinde früh.' },
    notes: [{ k: 'Robin', t: 'Windhunde wie Robin haben einen besonders tiefen Brustkorb, eine biegsame Wirbelsäule und lange Beine. Beim schnellen Galopp fliegen sie zweimal pro Sprung durch die Luft.' }],
    summary: ['Katze: einziehbare Krallen, Ballen, Augen vorn, gutes Gehör, Tasthaare, Sprungkraft → Schleichen, Lauern, Springen.', 'Hund: lange Beine, große Lunge, nicht einziehbare Krallen, super Nase, lange Schnauze → Hetzen.', 'Immer so begründen: Merkmal → Nutzen bei der Jagd.'],
    simple: 'Katze = leise Turnschuhe mit versteckten Messern (Krallen). Hund = Laufschuhe mit Spikes und eine Super-Nase.',
    check: ['e14-01', 'e14-02', 'e14-04'] });

  Q({ id: 'e14-01', o: 14, t: 'match', lv: 2, q: 'Welcher Körperbau hilft der Katze wobei?', p: [['einziehbare Krallen', 'bleiben scharf, leises Laufen'], ['Augen vorn', 'Entfernung zur Beute schätzen'], ['weiche Ballen', 'lautloses Anschleichen'], ['kräftige Hinterbeine', 'schneller Sprung']], why: 'Merkmal → Nutzen bei der Jagd.' },
    { id: 'e14-02', o: 14, t: 'mc', lv: 2, q: 'Warum sind die Krallen des Hundes NICHT einziehbar?', a: 'Sie geben beim schnellen, langen Laufen Halt wie Spikes.', w: ['Damit er lautlos schleichen kann.', 'Damit sie scharf bleiben.', 'Damit er auf Bäume klettern kann.'], why: 'Für einen Hetzjäger ist guter Halt wichtiger als scharfe Krallen.' },
    { id: 'e14-03', o: 14, t: 'sort', lv: 2, q: 'Welches Merkmal gehört zu welchem Jäger?', b: ['Katze', 'Hund / Wolf'], i: [['einziehbare Krallen', 0], ['Tasthaare zum Fühlen im Dunkeln', 0], ['biegsame Wirbelsäule für den Sprung', 0], ['tiefer Brustkorb mit großer Lunge', 1], ['Krallen geben Halt beim Rennen', 1], ['folgt der Fährte mit der Nase', 1]], why: 'Ausdauer ↔ Sprung aus dem Hinterhalt.' },
    { id: 'e14-04', o: 14, t: 'text', lv: 3, q: 'Erkläre an zwei Beispielen, wie der Körperbau der Katze zu ihrer Jagdweise passt.',
      k: [{ l: 'Krallen einziehbar → scharf / leise', a: ['kralle'] }, { l: 'Ballen / Zehengänger → lautlos', a: ['ballen', 'lautlos', 'leise', 'zehengänger', 'zehengaenger'] }, { l: 'Augen vorn → Entfernung schätzen / räumlich', a: ['auge', 'räumlich', 'raeumlich', 'entfernung'] }, { l: 'Gehör / Tasthaare / Sprungkraft', a: ['ohr', 'hör', 'hoer', 'tasthaar', 'spring', 'sprung', 'hinterbein'] }],
      need: 2, m: 'Die Katze hat einziehbare Krallen. Sie bleiben scharf und machen beim Anschleichen kein Geräusch. Ihre Augen liegen vorn, so kann sie die Entfernung zur Beute gut schätzen und genau springen.', why: 'Immer: Merkmal + wozu es bei der Jagd nützt.' },
    { id: 'e14-05', o: 14, t: 'mc', lv: 2, q: 'Schau dir das Gesichtsfeld an. Welches Tier ist am ehesten ein Beutetier?', fig: { n: 'fov' }, a: 'das Kaninchen – es sieht fast rundherum', w: ['die Katze – sie sieht nach vorn', 'der Hund', 'alle drei gleich'], why: 'Seitliche Augen = großes Gesichtsfeld, Feinde früh bemerken.' },
    { id: 'e14-06', o: 14, t: 'tf', lv: 2, q: 'Richtig oder falsch?', s: [['Katzen sehen in der Dämmerung gut.', true], ['Der Hund riecht schlechter als der Mensch.', false], ['Der tiefe Brustkorb des Hundes bietet Platz für eine große Lunge.', true], ['Die Krallen der Katze sind beim Laufen immer ausgefahren.', false]], why: 'Hunde riechen viel besser als Menschen.' },
    { id: 'e14-07', o: 14, t: 'mc', lv: 3, q: 'Ein Tier hat einziehbare Krallen, Augen vorn und lange Tasthaare. Welche Jagdweise passt am besten?', a: 'Schleichen und Lauern, dann Sprung', w: ['Beute im Rudel über Kilometer hetzen', 'Pflanzen abweiden', 'Beute im Wasser filtern'], why: 'Alles Merkmale für leises Anschleichen und genauen Sprung.' },
    { id: 'e14-08', o: 14, t: 'fill', lv: 2, q: 'Ergänze.', s: 'Die Katze hat {einziehbare|einziehbaren} Krallen. Mit den {Tasthaaren|Schnurrhaaren|Tasthaare} fühlt sie im Dunkeln. Der Hund hat eine sehr gute {Nase|Geruchssinn}.', why: 'Tast-haa-re mit „aa“.' },
    { id: 'e14-09', o: 14, t: 'mc', lv: 3, q: 'Robin der Whippet kann sehr schnell sprinten. Welches Körpermerkmal hilft ihm dabei NICHT?', a: 'einziehbare Krallen', w: ['lange Beine', 'tiefer Brustkorb mit großer Lunge', 'biegsame Wirbelsäule'], why: 'Hunde haben keine einziehbaren Krallen – ihre festen Krallen geben Halt.' },
    { id: 'e14-10', o: 14, t: 'text', lv: 3, q: 'Erkläre, warum der Körperbau des Wolfes zur Jagd als Hetzjäger passt. Nenne zwei Merkmale.',
      k: [{ l: 'lange Beine / Zehengänger → schnell und ausdauernd', a: ['bein', 'zehengänger', 'zehengaenger'] }, { l: 'großer Brustkorb, Lunge, Herz → Ausdauer', a: ['lunge', 'brust', 'herz', 'ausdauer'] }, { l: 'gute Nase → Fährte', a: ['nase', 'riech', 'geruch', 'fährte', 'faehrte'] }, { l: 'Krallen geben Halt / Fangzähne packen', a: ['kralle', 'halt', 'fangz', 'eckz', 'zähne', 'zaehne'] }],
      need: 2, m: 'Der Wolf hat lange Beine und läuft als Zehengänger – damit kann er weite Strecken rennen. Sein tiefer Brustkorb hat Platz für eine große Lunge und ein großes Herz: Das gibt Ausdauer. Mit der guten Nase folgt er der Fährte.', why: 'Merkmal + Nutzen.' });

  // ------------------------------------------------------------------ 15 Verhalten
  L({ obj: 15, title: 'Typisches Verhalten von Hund und Katze',
    text: [
      '**Hund – ein Rudeltier:** Der Hund lebt gern in einer Gruppe. Seine Menschenfamilie ist sein **Rudel**. Im Rudel gibt es eine **Rangordnung**.',
      '**Körpersprache des Hundes:** **Schwanzwedeln** = Aufregung, oft Freude. **Eingeklemmter Schwanz**, angelegte Ohren = Angst oder Unterwerfung. **Zähne fletschen, Knurren, gesträubte Nackenhaare** = Drohen. **Vorderkörper tief, Hinterteil hoch** = Spielaufforderung. **Auf den Rücken legen** = Unterwerfung (Demutshaltung).',
      '**Laute:** Bellen, Knurren, Winseln, Heulen.',
      '**Revier:** Hunde **markieren** mit Urin (Bein heben). Sie bewachen ihr Revier und bellen Fremde an.',
      '**Katze – ein Einzelgänger:** Katzen jagen allein und brauchen kein Rudel. Hauskatzen können aber freundlich mit Menschen und anderen Katzen zusammenleben.',
      '**Körpersprache der Katze:** **Schwanz senkrecht hoch** = freundliche Begrüßung. **Schnurren** = meist Wohlbefinden. **Buckel, gesträubtes Fell, Fauchen** = Angst und Abwehr (sie macht sich groß). **Angelegte Ohren** = Angst oder Ärger. **Peitschender Schwanz** = Aufregung, Ärger.',
      '**Revier der Katze:** Sie markiert mit **Duftdrüsen** an Wangen (Köpfchen geben), Pfoten (**Kratzen**) und mit Urin.',
      '**Weitere Verhaltensweisen der Katze:** viel schlafen, sich gründlich **putzen**, vor allem in der **Dämmerung** aktiv sein.'
    ],
    table: { head: ['Signal', 'Hund', 'Katze'], rows: [['Schwanz', 'Wedeln: Aufregung/Freude · eingeklemmt: Angst', 'senkrecht hoch: Begrüßung · peitschend: Ärger'], ['Drohen', 'Zähne fletschen, Knurren, Nackenhaare sträuben', 'Buckel, Fell sträuben, Fauchen'], ['Freundlich', 'Spielaufforderung, Schnauze lecken', 'Köpfchen geben, Schnurren'], ['Zusammenleben', 'Rudeltier, Rangordnung', 'Einzelgänger'], ['Revier markieren', 'Urin', 'Urin, Kratzen, Duftdrüsen an der Wange']] },
    vocab: [['Rudel', 'Ru-del', 'Gruppe von Wölfen/Hunden'], ['Rangordnung', 'Rang-ord-nung', 'wer in der Gruppe bestimmt'], ['Revier', 'Re-vier', 'Gebiet, das ein Tier verteidigt'], ['markieren', 'mar-kie-ren', 'mit Duft das Revier kennzeichnen'], ['Einzelgänger', 'Ein-zel-gän-ger', 'lebt und jagt allein']],
    example: { q: 'Ein Hund klemmt den Schwanz ein und legt die Ohren an. Was bedeutet das?', a: 'Er hat Angst oder zeigt Unterwerfung. Man sollte ihn in Ruhe lassen und nicht bedrängen.' },
    notes: [{ k: 'Achtung', t: 'Schwanzwedeln heißt nicht immer Freude – es zeigt vor allem Aufregung. Man muss den ganzen Hund ansehen.' }],
    summary: ['Hund: Rudeltier, Rangordnung, markiert mit Urin, Körpersprache über Schwanz, Ohren, Zähne.', 'Katze: Einzelgänger, Buckel/Fauchen = Abwehr, Schwanz hoch = Begrüßung, markiert mit Duftdrüsen und Kratzen.'],
    simple: 'Hunde sind Team-Spieler und reden viel mit dem Schwanz. Katzen sind Einzelkämpfer und machen sich groß (Buckel), wenn sie Angst haben.',
    check: ['e15-01', 'e15-02', 'e15-05'] });

  Q({ id: 'e15-01', o: 15, t: 'match', lv: 1, q: 'Was bedeutet die Körpersprache des Hundes?', p: [['Zähne fletschen und knurren', 'Drohen'], ['Schwanz eingeklemmt', 'Angst'], ['Vorderkörper tief, Hinterteil hoch', 'Spielaufforderung'], ['auf den Rücken legen', 'Unterwerfung']], why: 'Hunde zeigen ihre Stimmung mit dem ganzen Körper.' },
    { id: 'e15-02', o: 15, t: 'match', lv: 1, q: 'Was bedeutet die Körpersprache der Katze?', p: [['Schwanz senkrecht hoch', 'freundliche Begrüßung'], ['Buckel und Fauchen', 'Angst und Abwehr'], ['Schnurren', 'meist Wohlbefinden'], ['peitschender Schwanz', 'Aufregung, Ärger']], why: 'Mit dem Buckel macht sich die Katze größer.' },
    { id: 'e15-03', o: 15, t: 'sort', lv: 2, q: 'Hund oder Katze?', b: ['Hund', 'Katze'], i: [['Rudeltier', 0], ['hebt das Bein zum Markieren', 0], ['heult', 0], ['Einzelgänger', 1], ['gibt Köpfchen (Duft an der Wange)', 1], ['schärft und markiert durch Kratzen', 1]], why: 'Rudel ↔ Einzelgänger.' },
    { id: 'e15-04', o: 15, t: 'mc', lv: 2, q: 'Warum kratzt eine Katze an Bäumen oder am Kratzbaum?', a: 'Sie pflegt die Krallen und markiert ihr Revier mit Duft aus den Pfoten.', w: ['Sie will den Baum fällen.', 'Sie sucht Futter.', 'Sie hat Langeweile – sonst nichts.'], why: 'An den Pfoten sitzen Duftdrüsen.' },
    { id: 'e15-05', o: 15, t: 'text', lv: 3, q: 'Beschreibe zwei typische Verhaltensweisen des Hundes und erkläre sie.',
      k: [{ l: 'Verhalten genannt (z. B. Schwanzwedeln, Markieren, Bellen, Rudel)', a: ['wedel', 'markier', 'bell', 'knurr', 'rudel', 'bein heben', 'fletsch', 'unterw', 'spiel'] }, { l: 'Erklärung/Bedeutung', a: ['freude', 'aufreg', 'angst', 'droh', 'revier', 'warn', 'rang', 'gruppe', 'familie'] }, { l: 'zweites Verhalten mit Bedeutung', a: ['weil', 'damit', 'bedeutet', 'zeigt'] }],
      m: 'Der Hund hebt das Bein und markiert mit Urin. So zeigt er anderen Hunden sein Revier. Wenn er die Zähne fletscht und knurrt, droht er. Er will, dass der andere weggeht.', why: 'Beschreiben (was er tut) + erklären (warum).' },
    { id: 'e15-06', o: 15, t: 'tf', lv: 2, q: 'Richtig oder falsch?', s: [['Schwanzwedeln bedeutet immer Freude.', false], ['Für einen Hund ist seine Familie das Rudel.', true], ['Katzen sind Rudeltiere.', false], ['Katzen markieren mit Duftdrüsen an der Wange.', true]], why: 'Wedeln zeigt vor allem Aufregung – auch bei Unsicherheit.' },
    { id: 'e15-07', o: 15, t: 'mc', lv: 2, q: 'Was macht eine Katze, wenn sie Angst vor einem Hund hat?', a: 'Sie macht einen Buckel, sträubt das Fell und faucht.', w: ['Sie wedelt mit dem Schwanz.', 'Sie legt sich auf den Rücken und schnurrt.', 'Sie hebt den Schwanz senkrecht hoch.'], why: 'So wirkt sie größer und gefährlicher.' },
    { id: 'e15-08', o: 15, t: 'fill', lv: 2, q: 'Ergänze.', s: 'Hunde leben im {Rudel}. Darin gibt es eine {Rangordnung}. Katzen sind {Einzelgänger}. Beide verteidigen ihr {Revier}.', bank: ['Rudel', 'Rangordnung', 'Einzelgänger', 'Revier', 'Herde'], why: 'Re-vier mit „v“.' },
    { id: 'e15-09', o: 15, t: 'mc', lv: 3, q: 'Dein Freund will eine fremde Katze streicheln. Sie legt die Ohren an und ihr Schwanz peitscht hin und her. Was ist die beste Entscheidung?', a: 'Nicht streicheln – die Katze ist aufgeregt oder verärgert.', w: ['Sofort streicheln – sie freut sich.', 'Sie hochheben, damit sie sich beruhigt.', 'Mit ihr toben.'], why: 'Angelegte Ohren + peitschender Schwanz = Warnung.' },
    { id: 'e15-10', o: 15, t: 'mc', lv: 2, q: 'Wann sind Katzen besonders aktiv?', a: 'in der Dämmerung (morgens und abends)', w: ['nur mittags', 'nur im Winter', 'nie – sie schlafen nur'], why: 'Dann sind auch Mäuse unterwegs.' });

  // ------------------------------------------------------------------ 16 Hund und Wolf
  L({ obj: 16, title: 'Der Wolf – Stammvater des Hundes',
    text: [
      'Alle Hunde – vom Chihuahua bis zur Dogge, auch Robin der Whippet – stammen vom **Wolf** ab.',
      'Vor mindestens **15 000 Jahren** begannen Menschen, Wölfe zu **zähmen**. Über viele Generationen wählten sie Tiere mit gewünschten Eigenschaften aus und vermehrten sie (**Züchtung**). So entstanden die **Haustiere** Hunde und später die vielen **Rassen**.',
      '**Gemeinsamkeiten von Wolf und Hund:**',
      'gleiches **Gebiss** (42 Zähne, Fangzähne, Reißzähne) · **Zehengänger** mit nicht einziehbaren Krallen · sehr gute **Nase** und gutes Gehör · leben in einer Gruppe (**Rudel**) mit **Rangordnung** · gleiche **Körpersprache** (Schwanz, Ohren, Zähne fletschen, Unterwerfung) · **markieren** das Revier mit Urin · **Hetzjäger** · Junge sind **Nesthocker** · Hunde können sich mit Wölfen fortpflanzen.',
      'Auch kleine Gewohnheiten stammen vom Wolf: Hunde **vergraben** Knochen (Vorrat) und **drehen sich** vor dem Hinlegen im Kreis (Schlafplatz vorbereiten).',
      '**Unterschiede:** Hunde **bellen** viel, Wölfe kaum (sie heulen). Hunde sind an Menschen gewöhnt. Es gibt sehr verschiedene Größen, Fellfarben und Formen.'
    ],
    table: { head: ['', 'Wolf', 'Haushund'], rows: [['Gebiss', '42 Zähne, Fang- und Reißzähne', 'gleich'], ['Fußhaltung', 'Zehengänger', 'gleich'], ['Zusammenleben', 'Rudel mit Rangordnung', 'Familie als Rudel, Rangordnung'], ['Körpersprache', 'Schwanz, Ohren, Zähne fletschen, Unterwerfung', 'gleich'], ['Revier', 'markiert mit Urin', 'gleich'], ['Laute', 'heult, bellt kaum', 'bellt viel'], ['Aussehen', 'ähnlich bei allen Wölfen', 'sehr verschieden (Rassen)']] },
    vocab: [['Stammvater', 'Stamm-va-ter', 'Tier, von dem eine Art abstammt'], ['zähmen', 'zäh-men', 'an den Menschen gewöhnen'], ['Züchtung', 'Züch-tung', 'gezielte Auswahl der Eltern-Tiere'], ['Rasse', 'Ras-se', 'Gruppe von Tieren mit ähnlichem Aussehen']],
    example: { q: 'Warum dreht sich ein Hund im Körbchen im Kreis, bevor er sich hinlegt?', a: 'Das ist ein altes Verhalten vom Wolf: In der Natur drückt der Wolf so Gras platt und macht sich einen Liegeplatz.' },
    summary: ['Der Wolf ist der Stammvater aller Hunde (Zähmung vor mindestens 15 000 Jahren, dann Züchtung).', 'Gleich: Gebiss, Zehengänger, Nase, Rudel, Rangordnung, Körpersprache, Markieren, Hetzjagd.', 'Anders: Bellen, Aussehen, Gewöhnung an Menschen.'],
    simple: 'Ein Hund ist wie ein Wolf, der bei Menschen aufgewachsen ist – seit vielen tausend Jahren. Innen drin ist noch viel Wolf.',
    check: ['e16-01', 'e16-02', 'e16-04'] });

  Q({ id: 'e16-01', o: 16, t: 'multi', lv: 1, q: 'Welche Gemeinsamkeiten haben Hund und Wolf? Wähle alle richtigen.', a: ['gleiches Gebiss mit 42 Zähnen', 'leben in einer Rangordnung', 'markieren das Revier mit Urin', 'Zehengänger'], w: ['einziehbare Krallen', 'Einzelgänger', 'Pflanzenfresser-Gebiss'], why: 'Einziehbare Krallen und Einzelgänger passen zur Katze.' },
    { id: 'e16-02', o: 16, t: 'mc', lv: 1, q: 'Wer ist der Stammvater des Haushundes?', a: 'der Wolf', w: ['der Fuchs', 'der Schakal', 'die Wildkatze'], why: 'Alle Hunderassen stammen vom Wolf ab.' },
    { id: 'e16-03', o: 16, t: 'mc', lv: 2, q: 'Wie sind aus Wölfen die vielen Hunderassen entstanden?', a: 'Menschen haben über viele Generationen Tiere mit gewünschten Eigenschaften ausgewählt und vermehrt (Züchtung).', w: ['Wölfe haben sich selbst in Hunde verwandelt.', 'Durch Kreuzung mit Katzen.', 'Jede Rasse stammt von einem anderen Wildtier ab.'], why: 'Zähmung und Züchtung.' },
    { id: 'e16-04', o: 16, t: 'text', lv: 3, q: 'Nenne drei Ähnlichkeiten zwischen Hund und Wolf.',
      k: [{ l: 'Rudel / Rangordnung', a: ['rudel', 'rang', 'gruppe'] }, { l: 'Gebiss / Zähne', a: ['gebiss', 'zahn', 'zähne', 'zaehne', '42'] }, { l: 'Körpersprache', a: ['körpersprache', 'koerpersprache', 'schwanz', 'ohren', 'fletsch', 'unterw'] }, { l: 'Markieren / Revier', a: ['markier', 'revier', 'urin'] }, { l: 'Zehengänger / Hetzjäger / Nase', a: ['zehengänger', 'zehengaenger', 'hetz', 'nase', 'riech', 'jagd', 'jäger'] }],
      need: 3, m: 'Hund und Wolf leben in einem Rudel mit Rangordnung. Sie haben das gleiche Gebiss mit 42 Zähnen. Sie benutzen die gleiche Körpersprache und markieren ihr Revier mit Urin.', why: 'Drei verschiedene Gemeinsamkeiten.' },
    { id: 'e16-05', o: 16, t: 'tf', lv: 2, q: 'Richtig oder falsch?', s: [['Hunde und Wölfe haben dieselbe Zahnformel.', true], ['Wölfe bellen genauso viel wie Hunde.', false], ['Das Vergraben von Knochen ist ein altes Wolfsverhalten.', true], ['Hunde stammen vom Fuchs ab.', false]], why: 'Wölfe heulen eher – Bellen ist typisch Hund.' },
    { id: 'e16-06', o: 16, t: 'mc', lv: 2, q: 'Warum vergräbt ein Hund manchmal einen Knochen?', a: 'Das ist altes Wolfsverhalten: Vorrat für später verstecken.', w: ['Er mag den Knochen nicht.', 'Er will Bäume pflanzen.', 'Er markiert damit das Revier.'], why: 'Wölfe verstecken Futterreste als Vorrat.' },
    { id: 'e16-07', o: 16, t: 'fill', lv: 2, q: 'Ergänze.', s: 'Der {Wolf} ist der Stammvater des Hundes. Menschen haben ihn vor mindestens {15000|15.000|15 000} Jahren gezähmt. Durch {Züchtung|Zucht} entstanden viele Rassen.', why: 'Züch-tung mit „ü“.' },
    { id: 'e16-08', o: 16, t: 'sort', lv: 2, q: 'Gemeinsamkeit oder Unterschied von Hund und Wolf?', b: ['gemeinsam', 'unterschiedlich'], i: [['42 Zähne', 0], ['Rangordnung im Rudel', 0], ['dreht sich vor dem Hinlegen', 0], ['viele Größen und Fellfarben', 1], ['bellt oft', 1], ['an Menschen gewöhnt', 1]], why: 'Die Unterschiede sind durch die Züchtung entstanden.' },
    { id: 'e16-09', o: 16, t: 'mc', lv: 3, q: 'Welche Beobachtung zeigt am besten, dass ein Hund seine Familie wie ein Rudel behandelt?', a: 'Er folgt einem Familienmitglied, das „bestimmt“, und ordnet sich unter.', w: ['Er frisst gern Fleisch.', 'Er hat 42 Zähne.', 'Er läuft auf den Zehen.'], why: 'Rangordnung ist Sozialverhalten – Zähne und Zehen sind Körperbau.' },
    { id: 'e16-10', o: 16, t: 'mc', lv: 2, q: 'Hunde und Wölfe sind beide …', a: 'Hetzjäger und Zehengänger', w: ['Lauerjäger und Sohlengänger', 'Pflanzenfresser und Paarhufer', 'Einzelgänger und Nestflüchter'], why: 'Körperbau und Jagdweise sind gleich geblieben.' });
})(window.BIO);
