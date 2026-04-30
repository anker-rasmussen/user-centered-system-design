# CW2 Roadmap — StudyBuddy

Personal working document. Not a deliverable.
Deadline: **Sun 3 May 2026, 17:00**.

## Design direction (locked while brainstorming)

- Syncs with Moodle modules; auto-pulls labsheets, tutorial sheets, slides.
- Synthesises pulled material into revision content.
- MyTimetable sync → knows what's on tomorrow.
- Night-before briefing: recap of past week + prep for tomorrow's lecture/tutorial.
- Worked examples for each tutorial question + a few extras for practice.

**Primary end-to-end journey to wireframe:**
Sunday night → open StudyBuddy → tomorrow's tutorial card → briefing (notes-derived recap + upcoming content + worked examples) → adjust plan → commit → morning-of session kickoff.

**Framing note for Wireframes Intro:** the briefing is what makes this study-session-specific insight, not a generic calendar (brief explicitly excludes that). Lean on NotebookLM as cited prior art (P1 mentioned it) — differentiator is automatic, timetable-aware, pre-loaded synthesis.

---

## Analysis pipeline (defensible, citeable to module)

Methods taught in course material:
- **Lecture 4** — affinity diagramming + simple thematic coding (cites NN/g).
- **Lecture 5** — Point of View statements + user stories for goal/requirement derivation.
- **Tutorial 2** — Goetz & LeCompte observation framework (Who/What/When/Where/Why/How) — for the walkthrough portions of P1/P2.

Sequence to follow:
1. Per-interview summary (one page each, P1–P4).
2. Open coding across all 4 transcripts → short labels + participant tags.
3. Affinity map clusters → 4–7 themes. **Photograph the board** — goes in Appendix F.
4. POV statement(s) + user stories from themes.
5. Design goal(s) + requirements traced to findings.
6. Goetz & LeCompte notes for P1/P2 walkthroughs → Appendix G.

---

## Phase 1 — Analysis (~4–6 hrs)

1. Per-interview summary — P1–P4, one page each. Appendix E.
2. Open coding — short labels on quotes, P1–P4 tagged. Spreadsheet or stickies.
3. Affinity map — cluster codes into 4–7 themes. Photo → Appendix F.
4. Goetz & LeCompte on P1/P2 walkthroughs → Appendix G.
5. Full findings list — one sentence + tag + quote each → Appendix D.

**Marked under:** Methodology 5% + Results 15%. Affinity photo + coded findings = "good practice" signal.

---

## Phase 2 — Synthesis (~3–4 hrs)

6. POV statements — "[User] needs [need] because [insight]."
7. Design goal — target user + context + problem, one sharp sentence.
8. Key requirements — 5–10 bullets, each tagged: `R1: Auto-sync Moodle content [F3, F7; P1, P3]`. Traceability is the distinction-level differentiator.
9. Primary Persona (A4) — photo/illustration, name, age, course, goals, behaviours, frustrations, tech stack, representative quote. Grounded in P1–P4, not invented. 200-word method alongside.
10. Current User Journey Map (A3 landscape) — phases across top (Decide → Gather → Travel → Set up → Study → Wrap up); rows for Actions / Thoughts / Emotions (squiggly line) / Pain Points / Opportunities. Mark decision points.

**Marked under:** Journey 10% + Persona 10%. Top-mark = visually clean + evidence-cited (`[P2]` tags).

---

## Phase 3 — Design (the heavy lift, 40% of mark)

11. Pick the one end-to-end journey (already locked: night-before briefing).
12. Sketch 6 screens on paper first. 30 min. Don't open Figma yet.
13. User Flow Diagram (A4/A3) — boxes for screens, arrows for transitions, decision diamonds. Must match wireframes 1:1. Tool: draw.io / FigJam / TikZ.
14. Wireframes in Figma/Balsamiq (not GenAI). Mid-fi minimum. Grid-aligned, consistent typography, realistic copy (not lorem ipsum), clearly labelled nav. One per A4/A3 page.
15. Annotations on same page as each wireframe — number each UI element; explain interaction behaviour, states (empty/loading/error), source attribution for AI content, accessibility notes. This is a **specification**, not a caption.
16. Wireframes Intro — short written section explaining why these 6 screens, tied to findings/requirements.

**Rough screen allocation:**
1. Home / tomorrow's briefing card (first-use empty → connected state via annotation).
2. Briefing detail — recap + prep sections.
3. Worked-examples view for a specific tutorial question (with source attribution).
4. Session plan / commit screen.
5. In-session screen (timer, current task, distraction handling).
6. Wrap-up / capture outcomes → feeds next briefing.

**Marked under:** **40%.** Markers look for:
- Clear relationship to research findings (cite requirement IDs in annotations where possible).
- HCI principles applied and visible (Nielsen's 10 heuristics, Gestalt, Fitts — cite them).
- Interaction logic coherent across all 6 screens (nav consistent, states handled, errors thought through).
- "Magic box" problem handled on AI-synthesised content: source attribution + override + refresh + empty state.
- Professional presentation — clean, readable, on-grid.

---

## Phase 4 — Evaluation (~2 hrs)

17. Usability Testing Plan (450w):
    - **Aim** — what to learn (usability + UX, tied to design goals).
    - **Participants** — 5–6 students (Nielsen), same profile as research target, recruitment method.
    - **Setup** — City Interaction Lab; equipment (screen recording, eye tracking if relevant, camera for expression); materials (pre-test questionnaire, consent, SUS, post-task probes).
    - **Data captured** — task completion, time, errors, SUS, think-aloud transcripts, observer notes.
    - **3 task scenarios** — exact wording + learning goal + observable success criteria. Tied to wireframed journey.
    - **Procedure** — timed: intro → consent → pre-test → tasks → post-test SUS + interview → debrief. 60–90 min.

**Marked under:** 5%. Easy to lose marks by skipping exact wording or observable criteria.

---

## Phase 5 — Report assembly

18. §1.1 Methodology (250w) — method + rationale + cite Lecture 4/5, NN/g, Braun & Clarke for depth.
19. §1.2 Results (600w) — participants paragraph → themes with quotes → design goals → requirements.
20. §2.1 Wireframes Intro.
21. §1.4.1 Persona method (200w).
22. References in Harvard via Zotero/BibTeX — lecture slides, Nielsen, Braun & Clarke, Norman, Krug, and any HCI source cited in annotations.
23. Populate appendices — final consent form, final PIS, final interview guide, full findings, summaries, affinity photos, Goetz & LeCompte notes.
24. Writing-assistant pass (optional, allowed, must log) — grammar/flow on own prose.

**Marked under:** Report 5%. Clarity, conciseness, structure, referencing accuracy.

---

## Phase 6 — Submission (morning of 3 May — don't leave for 5pm)

25. Upload interview videos to **University OneDrive**; give Module Leader **Edit** access; paste URL on cover page.
26. Collate 4 signed consent forms → **single PDF 2**.
27. Compile `pt2.tex`; verify:
    - Text **searchable/selectable** everywhere (incl. persona/journey/annotations).
    - No real names — **P1–P4 throughout**.
    - Page numbers, ToC lists appendices.
    - All pages A4 or A3, oriented for reading.
    - Margins 2–2.5cm, body 10–12pt, 1.1× spacing.
    - GenAI log complete.
28. Submit both PDFs to Moodle. Confirm OneDrive share is still active.

---

## Common mark-losers to avoid

- Personas/journeys reading like invention — always tag to P1–P4.
- Wireframe annotations describing *what* instead of *how it behaves*.
- Login/registration wireframes eating screen budget (brief deprioritises).
- Task scenarios without exact wording or observable success criteria.
- Non-searchable PDF (Figma exports often raster — OCR before submitting).
- Missing OneDrive URL on cover page.
- Forgotten GenAI log entries (CLAUDE.md rule keeps this safe if followed).

---

## Marking-weight reminder (lever order)

| Weight | Deliverable |
|---|---|
| 40% | Wireframes |
| 15% | User Research Results |
| 10% | Current User Journey Map |
| 10% | Primary Persona |
| 10% | User Flow Diagram |
| 5%  | User Research Methodology |
| 5%  | Usability Testing Plan |
| 5%  | Report (writing/structure/referencing) |
