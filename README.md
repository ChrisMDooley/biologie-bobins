# Biologie-Bobins 🌿

Biology revision app for **Klasse 6 (Gymnasium, Hessen)**, part of the **Robin's Bobins** family of learning apps.
It covers all 24 items of the teacher's *Checkliste für die Lernkontrolle Nr. 1 (Klasse 6B)*.

**Live:** https://chrismdooley.github.io/biologie-bobins/
- from Robin's Bobins (Lukas): card "Biologie-Bobins" on his home page
- guest link for a friend: `https://chrismdooley.github.io/robins-bobins/gast/?name=<Name>` (e.g. `?name=Miraz`)
  or straight into the app: `https://chrismdooley.github.io/biologie-bobins/?gast=<Name>`

Plain HTML/CSS/JS like the other Bobins apps — no build step, no backend, no paid APIs. Progress lives in the
browser (`localStorage`, key `biologie-bobins:<child>`), so it is per device.

## What's in it

| | |
|---|---|
| **Start** | the 24 checklist items with status (Noch nicht gelernt · In Bearbeitung · Gut verstanden · Sicher für die Arbeit), progress bar, accuracy, last practised; **"Was soll ich als Nächstes lernen?"** |
| **Lernen** | per objective: key vocabulary *first* (syllables, 🔊, 🐢 slow), short explanation, SVG diagram(s), table/cards, worked example, 3–5 comprehension questions, summary; read-aloud everywhere |
| **Üben** | 258 questions in 12 formats (multiple choice, multi-select, richtig/falsch, matching, drag-and-drop/tap sorting, ordering, fill-in with spelling tolerance, written answers with key-idea check, diagram labelling, dental-formula grid, numbers, key-word marking); retry after a mistake; randomised order |
| **Schwächen trainieren** | mistakes stored per question; after a mistake: why → concept → simpler explanation → a different question on the same objective; revisited after ~20 min and next day |
| **Lernkontrolle simulieren** | 20 / 30 / 45 min, no feedback until handed in, points, %, indicative grade (configurable scale), model answers, weak topics |
| **Blitzquiz** | 8 quick questions, weighted to what is not mastered yet |
| **Wochenend-Plan** | Saturday/Sunday blocks with breaks; blocks tick themselves when the objectives are "gut" |
| **Fachwörter schreiben** | listen → write → see the right spelling → copy once |
| **Eltern** | status table, spelling problem words, mock-exam history, grading scale, exam date, font (OpenDyslexic), voice + speed, export/reset |

**LRS:** a biologically right answer with a spelling slip counts as right (Damerau-Levenshtein + German sound code),
but similar *technical terms* are never accepted for each other (Paarhufer/Unpaarhufer, Winterruhe/Winterschlaf/Winterstarre …).
The right spelling is then shown with syllables and the word goes into the Fachwörter training.

**Mastery** comes only from answers (weighted last 12 per objective). "Sicher" needs ≥ 8 answers, ≥ 85 %, ≥ 2 formats and the last 3 mostly right.

**Robin-Münzen** (one family balance via Robin's Bobins, or the guest's own total): 1 per answer right first time (+1 if corrected),
round bonus (Üben +3, Schwächen +4, Blitz +5, Lernkontrolle +8, +5 for a new best), +3 per lesson finished once,
+5 when an objective first becomes "sicher"; at most 60 answer-coins per day.

## Editing content

Everything the learner sees is data:

- `data/curriculum.js` — the 24 objectives, modules, weekend plan
- `data/mod-a.js … mod-h.js` — lessons (`BIO.content.lesson({...})`) and questions (`BIO.content.q({...})`)

Places where teachers often use other conventions are marked `LEHRKRAFT`:
dental-formula notation, the squirrel in winter (often "Winterruhe" in school books; measurements show it stays active),
the exact names of the 5 reading steps, and "Haustier" vs "Nutztier".

Diagrams are drawn in `js/figs.js` (schematic, labelled; approximate numbers are marked as such).

## Tests

```
node tests/logic.test.js                                # ~1,900 checks: content integrity, answer keys, spelling, mastery, exam, simulated weekend
python3 tests/e2e.py <shots-dir> --with-platform ../robins-bobins   # ~420 checks in Chromium, incl. every question, phone layout, Lukas + guest
```

## Releasing an update

Push to `main` (GitHub Pages serves the root). Bump `VERSION` in `sw.js` so phones pick up the new files.
If `rb-card.js` changes, bump `?v=` in `robins-bobins/index.html`.
