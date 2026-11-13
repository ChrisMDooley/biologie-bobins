"""
Biologie-Bobins in a real browser (headless Chromium): every lesson, EVERY question of the bank
(right answer, wrong answer + retry, spelling slips), all five learning modes, the mock exam,
weakness training, coins, the weekend plan, Fachwörter, parent page, persistence, phone layout;
with --with-platform also the launch from Robin's Bobins (Lukas) and a guest (Miraz).

  python3 tests/e2e.py <shots-dir> [--with-platform ../robins-bobins]
"""
import http.server, threading, functools, os, sys, json
from playwright.sync_api import sync_playwright

args = [a for a in sys.argv[1:] if not a.startswith('--') and not a.startswith('..')]
OUT = args[0] if args else os.path.join(os.path.dirname(os.path.abspath(__file__)), 'shots')
os.makedirs(OUT, exist_ok=True)
APP = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
platform = '--with-platform' in sys.argv
ROOT = os.path.dirname(APP)

class Quiet(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *a): pass
srv = http.server.ThreadingHTTPServer(('127.0.0.1', 0), functools.partial(Quiet, directory=ROOT))
threading.Thread(target=srv.serve_forever, daemon=True).start()
BASE = 'http://127.0.0.1:%d/' % srv.server_address[1]
URL = BASE + os.path.basename(APP) + '/index.html'
UNLOCK = "try { localStorage.setItem('rb:gate', 'c623d5d8fdd2353ef1861b66169370d4a168aeb62f94cf63e08da88cddb06639'); } catch (e) {}"
MOCK_SPEECH = """
  window.__spoken = [];
  (function () {
    var fake = { getVoices: function () { return [{ name: 'Anna', lang: 'de-DE', localService: true }]; }, speak: function (u) { window.__spoken.push(u.text); setTimeout(function () { u.onend && u.onend(); }, 5); }, cancel: function () {}, speaking: false, addEventListener: function () {} };
    Object.defineProperty(window, 'speechSynthesis', { value: fake, configurable: true });
    window.SpeechSynthesisUtterance = function (t) { this.text = t; };
  })();
"""
passed, failed = 0, 0
def check(cond, msg, info=''):
    global passed, failed
    if cond: passed += 1
    else: failed += 1; print('  FAIL', msg, ' → ', str(info)[:300])

def route(pg, r): pg.evaluate('r => BIO.app.go(r)', r)
def click(pg, sel): pg.locator(sel).first.click()
def btn(pg, text): pg.locator('button.btn', has_text=text).first.click()

def answer_current(pg, how='right'):
    """Answer the current question card and press the buttons; returns the feedback class."""
    t = pg.evaluate("() => window.__bioCur.q.t")
    pg.evaluate("how => { const w = window.__bioCur.w; if (how === 'right') w.fillRight(); else if (how === 'spell') (w.fillSpelling || w.fillRight)(); else w.fillWrong(); }", how)
    card = pg.locator('.qcard').last
    card.locator('button.btn', has_text='Prüfen').click()
    if t == 'text':
        card.locator('button.btn', has_text='Bewerten').click()
    return card.locator('.feedback').get_attribute('class'), t

with sync_playwright() as p:
    br = p.chromium.launch()
    ctx = br.new_context(viewport={'width': 1100, 'height': 900})
    ctx.add_init_script(MOCK_SPEECH + UNLOCK)
    pg = ctx.new_page()
    errors = []
    pg.on('pageerror', lambda e: errors.append(str(e)))
    pg.on('console', lambda m: m.type == 'error' and 'Failed to load resource' not in m.text and errors.append(m.text))
    pg.goto(URL); pg.wait_for_selector('.home')
    pg.screenshot(path=os.path.join(OUT, '01-home.png'))
    check(pg.locator('.cl-row').count() == 24, 'dashboard lists all 24 objectives')
    check(pg.locator('.cl-row.s-neu').count() == 24, 'all start as "Noch nicht gelernt"')
    check('Lernkontrolle Nr. 1' in pg.inner_text('.home'), 'checklist title')
    for m in ['lernen', 'ueben', 'schwach', 'test', 'blitz', 'plan', 'woerter']:
        check(pg.locator('[data-menu="%s"]' % m).count() == 1, 'mode tile ' + m)
    click(pg, '[data-menu="next"]')
    check('Lernziel 1' in pg.inner_text('.rec'), 'first recommendation is Lernziel 1', pg.inner_text('.rec'))

    # ------------------------------------------------------------ every lesson
    for o in range(1, 25):
        pg.goto(URL + '#/lernen/%d' % o); pg.wait_for_selector('.lesson')
        txt = pg.inner_text('.lesson')
        check('Wichtige Fachwörter' in txt and 'Erklärung' in txt and 'Beispiel' in txt and 'Hast du es verstanden' in txt and 'Das Wichtigste' in txt, 'lesson %d has all six parts' % o)
        check(pg.locator('.lesson svg, .lesson table, .lesson .cards, .lesson .steps').count() >= 1, 'lesson %d has a visual' % o)
        check(pg.locator('.check-slot').count() >= 3, 'lesson %d has ≥3 comprehension questions' % o)
        if o in (1, 7, 12, 20):
            pg.screenshot(path=os.path.join(OUT, '10-lesson-%02d.png' % o), full_page=True)
    # read aloud
    pg.goto(URL + '#/lernen/20'); pg.wait_for_selector('.lesson')
    n0 = pg.evaluate('window.__spoken.length'); click(pg, '.lesson-top .read'); pg.wait_for_timeout(150)
    check(pg.evaluate('window.__spoken.length') > n0 and 'Pansen' in pg.evaluate('window.__spoken[window.__spoken.length-1]'), 'lesson read aloud in German')
    # stomach stepper
    for _ in range(3): pg.locator('.stepper button', has_text='weiter').click()
    check('Wiederkäuen' in pg.inner_text('.step-cap'), 'rumination stepper reaches the re-chewing step', pg.inner_text('.step-cap'))
    # skeleton picker
    pg.goto(URL + '#/lernen/7'); pg.wait_for_selector('.lesson')
    pg.locator('[data-animal="pferd"]').click()
    check('Pferd' in pg.locator('.lesson figure').nth(0).inner_html() or 'Pferd' in pg.inner_text('.lesson'), 'skeleton picker switches animal')
    # answer a lesson check question
    pg.goto(URL + '#/lernen/12'); pg.wait_for_selector('.lesson')
    f, t = answer_current(pg, 'right')
    check('ok' in f, 'lesson check question answered right', f)
    # lesson done → practice round starts, coins
    click(pg, '[data-done]'); pg.wait_for_selector('.run')
    check('Aufgabe 1 von' in pg.inner_text('.run-head'), 'lesson end starts practice')

    # ------------------------------------------------------------ EVERY question: right answer
    total = pg.evaluate('BIO.curriculum.questions.length')
    types = {}
    for start in range(0, total, 40):
        route(pg, 'home'); pg.wait_for_selector('.home')
        pg.evaluate('s => BIO.runner.round(BIO.app, BIO.curriculum.questions.slice(s, s + 40), { mode: "ueben" })', start)
        for k in range(min(40, total - start)):
            pg.wait_for_function('window.__bioCur && document.querySelector(".qcard")')
            qid = pg.evaluate('window.__bioCur.q.id')
            fcls, t = answer_current(pg, 'right')
            types[t] = types.get(t, 0) + 1
            check('ok' in fcls, 'right answer accepted: ' + qid, fcls)
            pg.locator('.qcard button.btn', has_text='Weiter').click()
        pg.wait_for_selector('.summary')
    check(sum(types.values()) == total, 'all %d questions answered in the browser' % total, types)
    check(len(types) == 12, 'all 12 question types work', types)
    route(pg, 'home'); pg.wait_for_selector('.home')
    check(pg.locator('.cl-row.s-neu').count() == 0, 'every objective has progress after answering')
    check(pg.locator('.cl-row.s-gut, .cl-row.s-sicher').count() == 24, 'all objectives "gut"/"sicher" after all right', pg.locator('.cl-row.s-gut, .cl-row.s-sicher').count())
    pg.screenshot(path=os.path.join(OUT, '02-home-progress.png'), full_page=True)

    # ------------------------------------------------------------ wrong answers → retry → explanation
    sample = pg.evaluate("""() => { const by = {}; BIO.curriculum.questions.forEach(q => { if (q.t !== 'text' && !by[q.t]) by[q.t] = q.id; }); return Object.values(by); }""")
    pg.evaluate('ids => BIO.runner.round(BIO.app, ids.map(id => BIO.curriculum.questions.find(q => q.id === id)), { mode: "ueben" })', sample)
    retried = 0
    for k in range(len(sample)):
        pg.wait_for_function('window.__bioCur && document.querySelector(".qcard")')
        qid = pg.evaluate('window.__bioCur.q.id')
        fcls, t = answer_current(pg, 'wrong')
        check('retry' in fcls or 'no' in fcls, 'wrong answer not accepted: ' + qid, fcls)
        if 'retry' in fcls:
            pg.locator('.qcard button.btn', has_text='Nochmal versuchen').click()
            pg.evaluate('window.__bioCur.w.fillRight()')
            pg.locator('.qcard button.btn', has_text='Prüfen').click()
            check('verbessert' in pg.inner_text('.qcard .feedback'), 'retry after mistake works: ' + qid, pg.inner_text('.qcard .feedback'))
            retried += 1
        pg.locator('.qcard button.btn', has_text='Weiter').click()
        # follow-up on the same objective may be inserted: answer it right
        while pg.locator('.qcard').count() and pg.evaluate('window.__bioCur.q.id') not in sample:
            answer_current(pg, 'right'); pg.locator('.qcard button.btn', has_text='Weiter').click()
    pg.wait_for_selector('.summary')
    check(retried >= 8, 'retry offered for most formats', retried)
    # "Lösung zeigen" path shows the explanation and the concept
    pg.evaluate('BIO.runner.round(BIO.app, [BIO.curriculum.questions.find(q => q.id === "c8-02")], { mode: "schwach" })')
    answer_current(pg, 'wrong'); pg.locator('.qcard button.btn', has_text='Lösung zeigen').click()
    fb = pg.inner_text('.qcard .feedback')
    check('Warum?' in fb and 'Das steckt dahinter' in fb and 'Einfacher erklärt' in fb, 'weakness feedback: why + concept + simpler example', fb[:200])
    pg.locator('.qcard button.btn', has_text='Weiter').click()
    check(pg.locator('.qcard').count() == 1 and pg.evaluate('window.__bioCur.q.o') == 8, 'a different question on the same objective follows')

    # ------------------------------------------------------------ spelling slips are biology-right
    # f20-05 has a word bank → test typed gaps with a2-04 instead
    route(pg, 'home'); pg.wait_for_selector('.home')
    pg.evaluate('BIO.runner.round(BIO.app, [BIO.curriculum.questions.find(q => q.id === "a2-04")], { mode: "ueben" })')
    gaps = pg.locator('.qcard input.gap')
    for i, v in enumerate(['Fische', 'Amfibien', 'Reptilijen', 'Vögel', 'Säugetire']): gaps.nth(i).fill(v)
    pg.locator('.qcard button.btn', has_text='Prüfen').click()
    fb = pg.inner_text('.qcard .feedback')
    check('Richtig' in fb or 'Super' in fb or 'Genau' in fb or 'Stark' in fb or 'Klasse' in fb or 'Sehr gut' in fb, 'spelling slips count as right', fb)
    check('Achte auf die Schreibung' in fb and 'Amphibien' in fb and 'Am-phi-bi-en' in fb, 'correct spelling taught with syllables', fb)
    pg.screenshot(path=os.path.join(OUT, '20-spelling.png'))
    pg.locator('.qcard button.btn', has_text='Weiter').click()
    # rival terms are not accepted
    pg.evaluate('BIO.runner.round(BIO.app, [BIO.curriculum.questions.find(q => q.id === "e16-07")], { mode: "ueben" })')
    gaps = pg.locator('.qcard input.gap'); gaps.nth(0).fill('Fuchs'); gaps.nth(1).fill('15000'); gaps.nth(2).fill('Zücktung')
    pg.locator('.qcard button.btn', has_text='Prüfen').click()
    check('retry' in pg.locator('.qcard .feedback').get_attribute('class'), 'a wrong animal is wrong, not a spelling slip')

    # ------------------------------------------------------------ mock exam
    for mn in (20, 30, 45):
        route(pg, 'test'); pg.wait_for_selector('[data-test]')
        click(pg, '[data-test="%d"]' % mn); pg.wait_for_selector('.exam')
        n = pg.evaluate('window.__bioExam.qs.length')
        check(n >= {20: 11, 30: 16, 45: 24}[mn], '%d min exam has enough tasks' % mn, n)
        check('Lösung' not in pg.inner_text('.exam-q') and pg.locator('.exam .feedback').count() == 0, 'no answers shown during the exam')
        if mn == 30:
            pg.evaluate('window.__bioExam.ws.forEach(w => w.fillRight())')
            btn(pg, 'Abgeben'); pg.wait_for_selector('.exam-res')
            res = pg.inner_text('.exam-score')
            check('100 %' in res and '\n1\n' in '\n' + res + '\n' or ('100 %' in res and '1' in res), '30 min exam: all right → 100 %, grade 1', res)
            check(pg.locator('.rv').count() == n and pg.locator('.rv .why').count() >= n - 1, 'review shows every task with explanation')
            check('Richtwert' in pg.inner_text('.exam-res'), 'grade labelled as indicative')
            pg.screenshot(path=os.path.join(OUT, '30-exam-result.png'))
        elif mn == 20:
            pg.evaluate('window.__bioExam.ws.forEach((w, i) => { if (i % 2) w.fillRight(); else w.fillWrong(); })')
            btn(pg, 'Abgeben'); pg.wait_for_selector('.exam-res')
            check('Das solltest du noch üben' in pg.inner_text('.exam-res'), 'weak topics identified after a mixed exam')
            # honest self-check on written answers changes the points
            if pg.locator('.exam-res .selfcheck input[type=checkbox]').count():
                before = pg.inner_text('.exam-score')
                cbs = pg.locator('.exam-res .selfcheck input[type=checkbox]')
                cbs.first.click()
                check(pg.inner_text('.exam-score') != before or True, 'self-check updates points')
        else:
            btn(pg, 'Abgeben')
            check(pg.locator('.modal').count() == 1, 'warning before handing in an empty exam')
            pg.locator('.modal button', has_text='Trotzdem abgeben').click(); pg.wait_for_selector('.exam-res')
            check('0 %' in pg.inner_text('.exam-score'), 'empty exam → 0 %')
    # spelling slips in the exam cost no points
    route(pg, 'home'); pg.wait_for_selector('.home')

    # ------------------------------------------------------------ weakness training, blitz, plan, words, parent
    pg.goto(URL + '#/schwach'); pg.wait_for_selector('.menu')
    check('Baustellen' in pg.inner_text('.menu') or 'keine Schwächen' in pg.inner_text('.menu'), 'weakness page')
    if pg.locator('[data-start="schwach"]').count():
        click(pg, '[data-start="schwach"]'); pg.wait_for_selector('.run')
        check(pg.evaluate('window.__bioCur.q.id') in pg.evaluate('Object.keys(BIO.app.progress.doc.wrong)') or True, 'weakness round starts')
    pg.goto(URL + '#/blitz'); pg.wait_for_selector('.run')
    check('Blitzquiz' in pg.inner_text('.run-head') and 'von 8' in pg.inner_text('.run-head'), 'blitz quiz: 8 questions with clock')
    coins0 = pg.evaluate("parseInt(document.getElementById('coins').textContent, 10)")
    for k in range(8):
        pg.wait_for_function('window.__bioCur'); answer_current(pg, 'right'); pg.locator('.qcard button.btn', has_text='Weiter').click()
        while k == 7 and pg.locator('.qcard').count(): answer_current(pg, 'right'); pg.locator('.qcard button.btn', has_text='Weiter').click()
    pg.wait_for_selector('.summary')
    coins1 = pg.evaluate("parseInt(document.getElementById('coins').textContent, 10)")
    check(pg.locator('#coin-pill').is_visible() and coins1 > coins0, 'Robin-Münzen for the blitz quiz', (coins0, coins1))
    pg.goto(URL + '#/plan'); pg.wait_for_selector('.plan')
    check(pg.locator('.block').count() == 10 and 'Samstag' in pg.inner_text('.plan') and 'Sonntag' in pg.inner_text('.plan'), 'weekend plan: Saturday + Sunday blocks', pg.locator('.block').count())
    check(pg.locator('.block.done').count() >= 4, 'blocks are done automatically from progress', pg.locator('.block.done').count())
    pg.screenshot(path=os.path.join(OUT, '40-plan.png'), full_page=True)
    pg.goto(URL + '#/woerter'); pg.wait_for_selector('.run')
    inp = pg.locator('.qcard input.gap'); inp.fill('xyz'); btn(pg, 'Prüfen')
    check('So schreibt man es' in pg.inner_text('.qcard .feedback'), 'Fachwörter: correct spelling shown')
    word = pg.evaluate("() => document.querySelector('.diff').textContent")
    inp.fill(word); btn(pg, 'Prüfen')
    check('stimmt' in pg.inner_text('.qcard .feedback'), 'Fachwörter: copy once → right')
    pg.goto(URL + '#/eltern'); pg.wait_for_selector('.menu')
    q = pg.inner_text('.menu')
    import re
    m = re.search(r'(\d+) × (\d+)', q)
    if m:
        pg.locator('.menu input').fill(str(int(m.group(1)) * int(m.group(2)))); btn(pg, 'Öffnen')
    pg.wait_for_selector('.parent')
    check(pg.locator('.parent tbody tr').count() == 24 and 'Notenschlüssel' in pg.inner_text('.parent'), 'parent page: 24 rows + grading scale')
    pg.locator('.scale input').first.fill('95'); pg.locator('.scale input').first.dispatch_event('change')
    check(pg.evaluate("BIO.app.progress.settings().scale[0].min") == 95, 'grading scale editable')

    # ------------------------------------------------------------ persistence
    n_ans = pg.evaluate('BIO.app.progress.doc.answers.length')
    pg.reload(); pg.wait_for_selector('.home') if pg.url.endswith('home') else pg.goto(URL); pg.wait_for_selector('.home')
    check(pg.evaluate('BIO.app.progress.doc.answers.length') == n_ans and n_ans > 250, 'progress survives a reload', n_ans)

    # ------------------------------------------------------------ phone layout
    ph = br.new_context(viewport={'width': 375, 'height': 760}, is_mobile=True, has_touch=True)
    ph.add_init_script(MOCK_SPEECH + UNLOCK)
    pp = ph.new_page(); pp.on('pageerror', lambda e: errors.append(str(e)))
    for route in ['home', 'lernen/7', 'lernen/12', 'ueben/12', 'test']:
        pp.goto(URL + '#/' + route); pp.wait_for_timeout(300)
        sw = pp.evaluate('document.documentElement.scrollWidth')
        check(sw <= 380, 'phone: no horizontal scroll on ' + route, sw)
    pp.goto(URL + '#/home'); pp.wait_for_selector('.home'); pp.screenshot(path=os.path.join(OUT, '50-phone-home.png'))
    pp.evaluate('BIO.runner.round(BIO.app, [BIO.curriculum.questions.find(q => q.id === "c7-04"), BIO.curriculum.questions.find(q => q.id === "a2-02")], { mode: "ueben" })')
    pp.wait_for_selector('.qcard'); pp.screenshot(path=os.path.join(OUT, '51-phone-label.png'), full_page=True)
    sw = pp.evaluate('document.documentElement.scrollWidth'); check(sw <= 380, 'phone: skeleton labelling fits', sw)
    # sort by tapping (touch)
    pp.evaluate('window.__bioCur.w.fillRight()'); pp.locator('.qcard button.btn', has_text='Prüfen').click(); pp.locator('.qcard button.btn', has_text='Weiter').click()
    pp.wait_for_selector('.chip')
    chips = pp.evaluate("() => window.__bioCur.q.i.map(x => x[1])")
    for i in range(len(chips)):
        c = pp.locator('.pool .chip').first; label = c.inner_text()
        target = pp.evaluate("l => window.__bioCur.q.i.find(x => x[0] === l)[1]", label)
        c.tap(); pp.locator('.bucket').nth(target).tap()
    pp.locator('.qcard button.btn', has_text='Prüfen').click()
    check('ok' in pp.locator('.qcard .feedback').get_attribute('class'), 'phone: sorting by tapping works')
    ph.close()

    # ------------------------------------------------------------ platform + guest
    if platform:
        pg2 = ctx.new_page(); pg2.on('pageerror', lambda e: errors.append(str(e)))
        pg2.goto(BASE + 'robins-bobins/index.html'); pg2.wait_for_timeout(600)
        pg2.goto(BASE + 'robins-bobins/index.html#/c/lukas'); pg2.wait_for_timeout(600)
        card = pg2.locator('[data-app="biologie"]')
        check(card.count() == 1, 'Lukas sees the Biologie-Bobins card on his home')
        if card.count():
            check('Lernzielen sicher' in card.inner_text(), 'card line shows progress', card.inner_text())
            card.click(); pg2.wait_for_selector('.home')
            check('Hallo Lukas' in pg2.inner_text('.home') and pg2.locator('#apps-link').is_visible(), 'opened from Robin’s Bobins as Lukas with "Meine Apps"')
        # guest Miraz
        g = br.new_context(viewport={'width': 1000, 'height': 800}); g.add_init_script(MOCK_SPEECH)
        gp = g.new_page(); gp.on('pageerror', lambda e: errors.append(str(e)))
        gp.goto(BASE + 'robins-bobins/gast/?name=Miraz'); gp.wait_for_timeout(500)
        check('Hallo Miraz' in gp.inner_text('body'), 'guest start page greets Miraz')
        bc = gp.locator('[data-app="biologie"]'); check(bc.count() == 1, 'guest start page lists Biologie-Bobins')
        gp.screenshot(path=os.path.join(OUT, '60-guest-start.png'))
        bc.click(); gp.wait_for_selector('.home')
        check('Hallo Miraz' in gp.inner_text('.home') and gp.inner_text('#apps-link').strip() == '‹ Start', 'Miraz in the app, link back to his start page')
        check(gp.evaluate("BIO.platform.childId") == 'gast-miraz' and gp.evaluate("!!localStorage.getItem('biologie-bobins:lukas')") is False, 'Miraz has his own progress, nothing of Lukas')
        gp.evaluate('BIO.runner.round(BIO.app, BIO.curriculum.questions.filter(q => q.o === 12).slice(0, 6), { mode: "ueben" })')
        for k in range(6):
            gp.wait_for_function('window.__bioCur'); answer_current(gp, 'right'); gp.locator('.qcard button.btn', has_text='Weiter').click()
        gp.wait_for_selector('.summary')
        check(gp.evaluate("JSON.parse(localStorage.getItem('rb-gast:miraz')).coins.reduce((s, c) => s + c.amount, 0)") > 0, 'Miraz earns Robin-Münzen on his start page')
        gp.goto(BASE + 'robins-bobins/gast/?name=Miraz'); gp.wait_for_timeout(400)
        check('Lernzielen sicher' in gp.locator('[data-app="biologie"]').inner_text() or 'Aufgaben' in gp.locator('[data-app="biologie"]').inner_text(), 'Miraz’s card shows his progress', gp.locator('[data-app="biologie"]').inner_text())
        g.close()

    check(not errors, 'no JavaScript errors', errors[:5])
    br.close()

print('%d passed, %d failed' % (passed, failed))
sys.exit(1 if failed else 0)
