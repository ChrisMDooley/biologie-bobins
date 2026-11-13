/* Modul G — Eichhörnchen und Winteranpassungen (Lernziele 21–22) */
(function (B) {
  'use strict';
  var L = B.content.lesson, Q = B.content.q;

  // ------------------------------------------------------------------ 21 Eichhörnchen
  L({ obj: 21, title: 'Das Eichhörnchen – ein Baumbewohner',
    text: [
      'Das Eichhörnchen ist ein **Nagetier**. Sein Körper ist an das Leben auf **Bäumen** angepasst (Angepasstheiten).',
      '**Scharfe, gebogene Krallen:** Sie haken sich in die Rinde. So kann es senkrecht am Stamm hochklettern.',
      '**Drehbare Hinterfüße:** Es kann die Hinterfüße nach hinten drehen und so **kopfüber** den Stamm hinunterlaufen.',
      '**Lange, kräftige Hinterbeine:** zum **Springen** von Ast zu Ast – mehrere Meter weit.',
      '**Buschiger Schwanz:** Er dient als **Steuer** und zum **Gleichgewicht** beim Springen und Balancieren. Er bremst wie ein Fallschirm, wärmt als **Decke** beim Schlafen und dient zur Verständigung.',
      '**Leichter Körper** (ca. 300 g): Auch dünne Äste tragen es.',
      '**Große Augen seitlich am Kopf, Tasthaare:** Es überblickt viel und erkennt Feinde wie den Baummarder oder Greifvögel.',
      '**Nagezähne:** Damit knackt es Nüsse und Zapfen.',
      '**Kobel:** Ein kugeliges **Nest** aus Zweigen, Moos und Blättern hoch im Baum. Hier schläft es und zieht die Jungen auf (Nesthocker).',
      '**Vorräte:** Im Herbst **vergräbt** es Nüsse und Samen an vielen Stellen im Boden. Im Winter findet es viele davon mit der **Nase** und dem Gedächtnis wieder. Vergessene Nüsse keimen – so pflanzt das Eichhörnchen neue Bäume.'
    ],
    cards: [['🪝', 'Krallen: Halt an der Rinde'], ['🔄', 'drehbare Hinterfüße: kopfüber abwärts'], ['🦘', 'lange Hinterbeine: weite Sprünge'], ['🪶', 'buschiger Schwanz: Steuer, Gleichgewicht, Decke'], ['🥜', 'Nagezähne: Nüsse öffnen'], ['🏠', 'Kobel: Nest im Baum']],
    vocab: [['Angepasstheit', 'An-ge-passt-heit', 'Merkmal, das zum Lebensraum passt'], ['Kobel', 'Ko-bel', 'Nest des Eichhörnchens'], ['Vorrat', 'Vor-rat', 'gesammeltes Futter für später'], ['Krallen', 'Kral-len', 'spitze Hornnägel']],
    example: { q: 'Warum fällt das Eichhörnchen beim Springen nicht einfach herunter?', a: 'Die kräftigen Hinterbeine geben Schwung, der buschige Schwanz steuert und hält das Gleichgewicht, und die scharfen Krallen halten sich beim Landen sofort am Ast fest.' },
    summary: ['Krallen (klettern), drehbare Hinterfüße (kopfüber), Hinterbeine (springen), Schwanz (Steuer, Gleichgewicht, Wärme), leichter Körper.', 'Kobel = Nest im Baum.', 'Vorräte im Boden vergraben – vergessene Nüsse werden Bäume.'],
    simple: 'Das Eichhörnchen hat eingebaute Kletterhaken (Krallen), Sprungfedern (Hinterbeine) und ein Steuerruder (Schwanz).',
    check: ['g21-01', 'g21-02', 'g21-04'] });

  Q({ id: 'g21-01', o: 21, t: 'match', lv: 1, q: 'Welche Angepasstheit hilft wobei?', p: [['scharfe, gebogene Krallen', 'Halt an der Rinde beim Klettern'], ['buschiger Schwanz', 'Steuer und Gleichgewicht beim Springen'], ['lange Hinterbeine', 'weite Sprünge von Ast zu Ast'], ['drehbare Hinterfüße', 'kopfüber den Stamm hinunterlaufen']], why: 'Körperbau passt zum Leben im Baum.' },
    { id: 'g21-02', o: 21, t: 'mc', lv: 2, q: 'Welche Aufgaben hat der buschige Schwanz? Wähle die vollständigste Antwort.', a: 'Steuer und Gleichgewicht beim Springen, Wärme beim Schlafen, Verständigung', w: ['nur Schmuck', 'nur zum Festhalten an Ästen', 'nur zum Vorräte tragen'], why: 'Der Schwanz hat mehrere Aufgaben.' },
    { id: 'g21-03', o: 21, t: 'fill', lv: 2, q: 'Ergänze.', s: 'Das Nest des Eichhörnchens heißt {Kobel}. Im Herbst vergräbt es {Vorräte|Nüsse|Vorrat}. Es ist ein {Nagetier}.', bank: ['Kobel', 'Vorräte', 'Nagetier', 'Bau', 'Raubtier'], why: 'Ko-bel – nicht verwechseln mit dem Bau von Dachs oder Fuchs.' },
    { id: 'g21-04', o: 21, t: 'text', lv: 3, q: 'Beschreibe drei Angepasstheiten des Eichhörnchens an das Leben auf Bäumen und erkläre ihren Nutzen.',
      k: [{ l: 'Krallen → Klettern/Halt', a: ['kralle'] }, { l: 'Schwanz → Steuer/Gleichgewicht', a: ['schwanz'] }, { l: 'Hinterbeine → Springen', a: ['hinterbein', 'sprung', 'spring', 'bein'] }, { l: 'Hinterfüße drehbar / leichter Körper / Kobel', a: ['dreh', 'kopfüber', 'kopfueber', 'leicht', 'kobel', 'nest', 'auge'] }],
      need: 3, m: 'Mit seinen scharfen, gebogenen Krallen hält es sich an der Rinde fest und klettert. Mit den langen Hinterbeinen springt es von Ast zu Ast. Der buschige Schwanz dient beim Springen als Steuer und hält das Gleichgewicht.', why: 'Merkmal + Nutzen, dreimal.' },
    { id: 'g21-05', o: 21, t: 'tf', lv: 2, q: 'Richtig oder falsch?', s: [['Eichhörnchen können kopfüber am Stamm hinunterlaufen.', true], ['Eichhörnchen sind Raubtiere.', false], ['Vergessene Nüsse können zu neuen Bäumen wachsen.', true], ['Junge Eichhörnchen sind Nestflüchter.', false]], why: 'Junge Eichhörnchen sind nackt und blind – Nesthocker.' },
    { id: 'g21-06', o: 21, t: 'mc', lv: 2, q: 'Wie findet das Eichhörnchen im Winter seine vergrabenen Vorräte?', a: 'mit seinem guten Geruchssinn und seinem Gedächtnis', w: ['es hat eine Karte', 'gar nicht – es findet keine', 'es sieht sie durch den Schnee'], why: 'Nicht alle werden gefunden – das hilft dem Wald.' },
    { id: 'g21-07', o: 21, t: 'mc', lv: 3, q: 'Warum ist ein leichter Körper (ca. 300 g) für das Eichhörnchen ein Vorteil?', a: 'Auch dünne Äste tragen es, so erreicht es Früchte ganz außen.', w: ['Damit es schneller frieren kann.', 'Damit es besser schwimmen kann.', 'Leicht sein ist kein Vorteil.'], why: 'Ein schweres Tier würde dünne Zweige abbrechen.' },
    { id: 'g21-08', o: 21, t: 'sort', lv: 2, q: 'Zu welcher Aufgabe passt die Angepasstheit?', b: ['Klettern und Springen', 'Nahrung'], i: [['gebogene Krallen', 0], ['lange Hinterbeine', 0], ['buschiger Schwanz', 0], ['Nagezähne', 1], ['Vorräte vergraben', 1], ['gute Nase', 1]], why: 'Manche Merkmale dienen der Bewegung, andere der Ernährung.' },
    { id: 'g21-09', o: 21, t: 'mc', lv: 2, q: 'Welche Zähne nutzt das Eichhörnchen zum Öffnen von Nüssen?', a: 'die Nagezähne', w: ['die Eckzähne', 'die Reißzähne', 'die Fangzähne'], why: 'Eichhörnchen haben gar keine Eckzähne.' },
    { id: 'g21-10', o: 21, t: 'mc', lv: 3, q: 'Ein Baummarder jagt ein Eichhörnchen. Welche Angepasstheit hilft dem Eichhörnchen am meisten bei der Flucht?', a: 'weite Sprünge zu dünnen Ästen, die den schweren Marder nicht tragen', w: ['die Nagezähne', 'die Vorräte im Boden', 'das Fell'], why: 'Leichter Körper + Sprungkraft = Flucht in die dünnen Zweige.' });

  // ------------------------------------------------------------------ 22 Winter
  // LEHRKRAFT: Viele Schulbücher ordnen das Eichhörnchen der Winterruhe zu. Messungen zeigen: Seine
  // Körpertemperatur sinkt kaum, es bleibt winteraktiv. Darum wird es hier in keiner Sortieraufgabe abgefragt.
  L({ obj: 22, title: 'Wie Tiere den Winter überstehen',
    text: [
      'Im Winter ist es **kalt** und es gibt **wenig Nahrung**. Tiere haben verschiedene Strategien.',
      '**Winterschlaf** (gleichwarme Tiere): **Igel, Siebenschläfer, Murmeltier, Fledermaus, Haselmaus**. Die **Körpertemperatur sinkt stark** (Igel: von etwa 35 °C auf etwa 5 °C). **Herzschlag und Atmung** werden sehr langsam. Der **Stoffwechsel** läuft fast nicht mehr. Die Tiere fressen nichts und leben von ihren **Fettreserven**. Sie wachen nur selten kurz auf. Wird es zu kalt, wacht der Körper auf – so erfrieren sie nicht.',
      '**Winterruhe** (gleichwarme Tiere): **Dachs, Braunbär, Waschbär**. Die Körpertemperatur sinkt **nur wenig**. Die Tiere schlafen viel, **wachen aber oft auf**, fressen von **Vorräten** oder suchen Futter.',
      '**Winterstarre** (wechselwarme Tiere): **Frosch, Kröte, Eidechse, Blindschleiche, Ringelnatter**, viele Insekten. Die Körpertemperatur ist so **niedrig wie die Umgebung**. Die Tiere werden **starr** und können **nicht von selbst aufwachen** – erst, wenn es wärmer wird. Sie verstecken sich frostfrei (Erdhöhle, Schlamm, Laub). **Frost kann sie töten.**',
      '**Winteraktiv** (gleichwarme Tiere): **Reh, Fuchs, Wildschwein, Hirsch, Feldhase**, viele Vögel. Sie bekommen ein dichtes **Winterfell** mit **Unterwolle** (Vögel: plustern sich auf), legen **Fettreserven** an, bewegen sich weniger und sparen Energie. Manche wechseln die Farbe (Schneehase, Hermelin werden weiß).',
      '**Wegziehen:** Zugvögel wie Schwalbe und Storch fliegen in den warmen Süden.'
    ],
    figs: [{ n: 'winter' }],
    table: { head: ['', 'Winterschlaf', 'Winterruhe', 'Winterstarre'], rows: [
      ['Tiergruppe', 'gleichwarm', 'gleichwarm', 'wechselwarm'],
      ['Körpertemperatur', 'sinkt stark (Igel ca. 5 °C)', 'sinkt nur wenig', 'so kalt wie die Umgebung'],
      ['Herzschlag, Atmung, Stoffwechsel', 'stark verlangsamt', 'etwas verlangsamt', 'fast stillstehend'],
      ['Nahrung', 'keine – Fettreserven', 'Vorräte, wachen oft auf', 'keine'],
      ['Aufwachen', 'selten, von selbst', 'oft', 'nicht von selbst – erst bei Wärme'],
      ['Beispiele', 'Igel, Siebenschläfer, Fledermaus, Murmeltier', 'Dachs, Braunbär, Waschbär', 'Frosch, Eidechse, Blindschleiche']] },
    vocab: [['Winterschlaf', 'Win-ter-schlaf', 'tiefer Energiesparschlaf gleichwarmer Tiere'], ['Winterruhe', 'Win-ter-ru-he', 'viel Schlaf, oft wach, Temperatur sinkt wenig'], ['Winterstarre', 'Win-ter-star-re', 'starr vor Kälte (wechselwarm)'], ['Stoffwechsel', 'Stoff-wech-sel', 'alle Vorgänge im Körper, die Energie verbrauchen'], ['Fettreserve', 'Fett-re-ser-ve', 'Fettvorrat im Körper']],
    example: { q: 'Man findet im Januar einen Igel unter einem Laubhaufen. Er ist kalt und atmet kaum. Ist er tot?', a: 'Wahrscheinlich nicht – er hält Winterschlaf. Seine Körpertemperatur ist stark gesunken, Herzschlag und Atmung sind sehr langsam. Man sollte ihn nicht wecken, weil Aufwachen viel Fettreserve kostet.' },
    notes: [{ k: 'Eichhörnchen', t: 'In vielen Schulbüchern steht: Das Eichhörnchen hält Winterruhe. Forscher haben gemessen, dass seine Körpertemperatur im Winter kaum sinkt. Es bleibt aktiv, schläft bei Kälte aber länger im Kobel und lebt von Vorräten. Wenn deine Lehrkraft „Winterruhe“ sagt, schreib das in der Arbeit.' }],
    summary: ['Winterschlaf: Temperatur stark runter, Fettreserven, selten wach – Igel, Siebenschläfer, Fledermaus.', 'Winterruhe: Temperatur wenig runter, oft wach, Vorräte – Dachs, Braunbär.', 'Winterstarre: wechselwarm, so kalt wie die Umgebung, kann nicht von selbst aufwachen – Frosch, Eidechse.', 'Winteraktiv: Winterfell, Fett, Energie sparen – Reh, Fuchs.'],
    simple: 'Winterschlaf = Handy im Energiesparmodus, Akku (Fett) reicht bis zum Frühling. Winterruhe = Handy im Ruhemodus, man schaut ab und zu drauf. Winterstarre = Handy ist aus und kann sich nicht selbst einschalten – erst die Wärme schaltet es an.',
    check: ['g22-01', 'g22-02', 'g22-05', 'g22-07'] });

  Q({ id: 'g22-01', o: 22, t: 'sort', lv: 1, q: 'Wie überwintern diese Tiere?', b: ['Winterschlaf', 'Winterruhe', 'Winterstarre', 'winteraktiv'], i: [['Igel', 0], ['Siebenschläfer', 0], ['Fledermaus', 0], ['Dachs', 1], ['Braunbär', 1], ['Grasfrosch', 2], ['Zauneidechse', 2], ['Reh', 3], ['Fuchs', 3]], why: 'Winterstarre gibt es nur bei wechselwarmen Tieren.' },
    { id: 'g22-02', o: 22, t: 'mc', lv: 2, q: 'Was unterscheidet Winterschlaf von Winterruhe?', a: 'Beim Winterschlaf sinkt die Körpertemperatur stark, bei der Winterruhe nur wenig.', w: ['Winterschlaf gibt es nur bei Fröschen.', 'Bei der Winterruhe fressen die Tiere gar nichts.', 'Es gibt keinen Unterschied.'], why: 'Entscheidend ist, wie stark Temperatur und Stoffwechsel sinken.' },
    { id: 'g22-03', o: 22, t: 'mc', lv: 2, q: 'Warum können Tiere in Winterstarre nicht von selbst aufwachen?', a: 'Sie sind wechselwarm – ihr Körper wird erst warm, wenn die Umgebung wärmer wird.', w: ['Sie haben zu viel gefressen.', 'Sie sind gleichwarm.', 'Sie wachen jeden Tag auf.'], why: 'Wechselwarme Tiere können sich nicht selbst aufheizen.' },
    { id: 'g22-04', o: 22, t: 'tf', lv: 2, q: 'Richtig oder falsch?', s: [['Igel fressen sich im Herbst Fettreserven an.', true], ['Während der Winterstarre ist die Körpertemperatur etwa so hoch wie die der Umgebung.', true], ['Der Dachs hält Winterstarre.', false], ['Rehe bekommen ein dichteres Winterfell.', true]], why: 'Der Dachs hält Winterruhe – er ist gleichwarm.' },
    { id: 'g22-05', o: 22, t: 'text', lv: 3, q: 'Vergleiche Winterschlaf und Winterstarre. Nenne je ein Beispiel.',
      k: [{ l: 'Winterschlaf: gleichwarme Tiere, Temperatur sinkt stark (aber geregelt)', a: ['gleichwarm', 'sinkt', 'fett', 'herzschlag', 'atmung', 'stoffwechsel'] }, { l: 'Beispiel Winterschlaf', a: ['igel', 'siebenschläfer', 'siebenschlaefer', 'fledermaus', 'murmeltier', 'haselmaus', 'hamster'] },
        { l: 'Winterstarre: wechselwarme Tiere, Temperatur wie Umgebung, kein Aufwachen von selbst', a: ['wechselwarm', 'umgebung', 'starr', 'nicht aufwachen', 'nicht von selbst', 'außentemperatur', 'aussentemperatur'] }, { l: 'Beispiel Winterstarre', a: ['frosch', 'kröte', 'kroete', 'eidechse', 'blindschleiche', 'schlange', 'natter', 'molch', 'insekt'] }],
      m: 'Winterschlaf halten gleichwarme Tiere wie der Igel. Ihre Körpertemperatur sinkt stark, Herzschlag und Atmung werden langsam, sie leben von Fettreserven. Winterstarre betrifft wechselwarme Tiere wie den Frosch. Ihre Temperatur ist so niedrig wie die Umgebung; sie werden starr und können nicht von selbst aufwachen.', why: 'Vergleichen = beide Seiten mit gleichen Merkmalen.' },
    { id: 'g22-06', o: 22, t: 'mc', lv: 3, q: 'Im Diagramm: Welche Linie zeigt ein Tier in Winterstarre?', fig: { n: 'winter' }, a: 'Frosch – seine Linie folgt fast genau der Lufttemperatur', w: ['Reh', 'Dachs', 'Igel'], why: 'Wechselwarm: Körpertemperatur ≈ Umgebungstemperatur.' },
    { id: 'g22-07', o: 22, t: 'mc', lv: 2, q: 'Warum soll man einen Igel im Winterschlaf nicht wecken?', a: 'Das Aufwachen kostet sehr viel Fettreserve – sie könnte bis zum Frühling nicht mehr reichen.', w: ['Er wird sonst wechselwarm.', 'Er beißt immer.', 'Er wacht sowieso nie auf.'], why: 'Aufheizen von 5 °C auf 35 °C verbraucht viel Energie.' },
    { id: 'g22-08', o: 22, t: 'match', lv: 2, q: 'Ordne zu.', p: [['Winterschlaf', 'Temperatur sinkt stark, lebt von Fett'], ['Winterruhe', 'Temperatur sinkt wenig, wacht oft auf'], ['Winterstarre', 'wechselwarm, starr vor Kälte'], ['winteraktiv', 'Winterfell, sucht weiter Futter']], why: 'Vier Strategien gegen Kälte und Futtermangel.' },
    { id: 'g22-09', o: 22, t: 'fill', lv: 2, q: 'Ergänze.', s: 'Der Igel hält {Winterschlaf}. Der Dachs hält {Winterruhe}. Die Eidechse fällt in {Winterstarre|Kältestarre}.', bank: ['Winterschlaf', 'Winterruhe', 'Winterstarre'], why: 'Achtung: Diese drei Wörter klingen ähnlich – lerne genau, welches wozu gehört.' },
    { id: 'g22-10', o: 22, t: 'multi', lv: 2, q: 'Wie passen sich winteraktive Tiere an? Wähle alle richtigen.', a: ['dichteres Winterfell mit Unterwolle', 'Fettreserven anlegen', 'weniger bewegen, Energie sparen', 'manche werden weiß (Hermelin)'], w: ['Körpertemperatur auf 5 °C senken', 'in Winterstarre fallen'], why: 'Winteraktive Tiere halten ihre Temperatur und bleiben wach.' },
    { id: 'g22-11', o: 22, t: 'mc', lv: 3, q: 'Warum ist Frost für einen Frosch in Winterstarre gefährlich, für einen Igel im Winterschlaf weniger?', a: 'Der Igel ist gleichwarm: Wird es zu kalt, heizt sein Körper auf oder er wacht auf. Der Frosch kann das nicht.', w: ['Der Igel hat Federn.', 'Der Frosch hat zu viel Fett.', 'Beide sind gleich gefährdet.'], why: 'Auch im Winterschlaf regelt der Igel seine Temperatur noch – auf niedrigem Niveau.' },
    { id: 'g22-12', o: 22, t: 'num', lv: 3, q: 'Lies die Tabelle (ungefähre Werte für den Igel). Um wie viel Grad sinkt die Körpertemperatur im Winterschlaf?', tab: { head: ['', 'im Sommer (wach)', 'im Winterschlaf'], rows: [['Körpertemperatur', '35 °C', '5 °C'], ['Herzschläge pro Minute', '190', '10'], ['Atemzüge pro Minute', '45', '4']] }, a: 30, unit: '°C', why: '35 °C − 5 °C = 30 °C.' });
})(window.BIO);
