# CW2 Analysis — Working Document

*Personal working document. Not a submission deliverable.*

This document holds the analysis-stage outputs that feed the CW2 report.
Each section maps to a specific brief deliverable (see the
appendix-mapping table at the end). Quotes are referenced as
`[P#, Interview#.md:line]`. All four participants are anonymised to
P1–P4 throughout (no real names).

---

## 0. Method (→ feeds §1.1 User Research Methodology)

**Recruitment.** Participants were recruited via a five-question
**Qualtrics prescreening survey** (see Appendix — research materials)
with the following inclusion criteria: (i)~current undergraduate or
postgraduate study (Q1, year of study); (ii)~regularly studying or
revising outside contact hours (Q2, yes/no); (iii)~use of third-party
tools to support study, defined to **exclude** Moodle, course textbooks
and OneDrive (Q3, yes/no); (iv)~willingness to participate in a
~20-minute interview (Q4, yes/no); contact details collected via City
email (Q5). Inclusion criterion (iii) deliberately biases the cohort
towards students who already augment the LMS with their own tooling —
i.e. the population StudyBuddy is positioned to compete with or
support — and is reflected in the data (every participant exhibits at
least one personal external-memory artefact; see Theme T5).

**Interview conduct.** Four interviews, ~20–30 min each, semi-structured,
in person, video recorded with participants' faces shown (per ethics
requirement); transcribed via the recording platform's auto-transcript
function and cleaned to markdown (`Interview1.md`–`Interview4.md`),
with obvious transcription errors corrected. Informed consent collected
on signed forms (collated into the supplementary CW2 PDF); a Participant
Information Sheet adapted from the module template was provided. All
participants were anonymised to **P1–P4** at the cleaning stage; no
real names appear in this document or in `pt2.tex`. All four
interviews included a walkthrough/observation segment, in three
forms: live screen-share (P1, P4), physical-artefact demonstration
(P2), and a brief verbal scenario walkthrough (P3 — less in-depth
than the other three; no live setup or artefact).

**Analysis.** Reflexive thematic analysis (Braun & Clarke 2006), applied
to all four interview transcripts. The six phases are:

1. **Familiarisation** — VTT recordings cleaned to markdown, obvious
   transcription errors corrected, transcripts re-read end-to-end. Notes
   captured per interview.
2. **Generating initial codes** — line-level open coding across all four
   transcripts (§3 below). Each code is a short descriptive label
   attached to a single data extract (a turn or part of a turn). Codes
   are kept *atomic* at this stage — the same code label may recur
   across participants and across interviews.
3. **Searching for themes** — codes grouped into candidate themes by
   semantic similarity (affinity-style clustering, §4 below).
4. **Reviewing themes** — candidate themes checked against the data
   extracts they cover, merged where they overlap and split where they
   conflate distinct ideas.
5. **Defining and naming themes** — final theme names + one-sentence
   definitions, with code lists attached (§5).
6. **Writing up** — the §5 themes feed §1.2 of `pt2.tex`; the full
   granular findings list (§6) feeds Appendix~D; per-interview summaries
   (§2) feed Appendix~E; codebook + theme map (§3, §4) feed Appendix~F;
   walkthrough observation notes (§7) feed Appendix~G.

Observation notes from the walkthroughs are kept separate from the
thematic analysis (§7) — they are descriptive records of what the
participants demonstrated, not interpretive findings.

---

## 1. Participants (→ feeds opening of §1.2 Results)

Four undergraduate-level engineering students at the same UK university,
all enrolled on the same semester-2 module set (mechatronics, design
engineering, sensors & instrumentation, data analysis, engineering
society). Recruited via a Qualtrics prescreening survey (see §0 and
Appendix — research materials), with inclusion criteria selecting for
self-directed study outside contact hours and existing use of
third-party tools beyond Moodle / textbooks / OneDrive. None of the
participants is enrolled on IN3065/INM355, per the brief's
recruitment exclusion. All four interviews ~20–30 min, semi-structured,
in person, video recorded with consent and transcribed.

| ID | Walkthrough | Distinguishing characteristic for analysis |
|---|---|---|
| P1 | Yes — screen-share at their actual home setup | NotebookLM + Notion user; 8–11 pm fixed evening block |
| P2 | Yes — physical artefacts to camera (no laptop) | Hand-written notes + corkboard; refuses evening study |
| P3 | Verbal scenario walkthrough only — no laptop / artefact | Bedroom-only; late-night study; minimal tooling |
| P4 | Yes — laptop screen-share walkthrough | Multi-monitor + iPad folders; leaves home for serious work |

---

## 2. Per-interview summaries (→ Appendix E)

### P1 — summary

Studies in a fixed **20:00–23:00 evening block** after commuting home,
eating, and "decluttering my mind" `[P1, Interview1.md:181–185]`. Pre-reads
slides when uploaded the night before; otherwise reviews the day's
content. Prioritises within a day by difficulty
`[P1, Interview1.md:85]`; across exams by exam order
`[P1, Interview1.md:93]`. Bedroom for focus work; living room for
low-stakes content (pneumatic / hydraulic systems); campus silent-study
room between classes `[P1, Interview1.md:161]`. Most distracted by
**movement** rather than sound, mitigated by a single earbud
`[P1, Interview1.md:137, 153]`.

Tools: Moodle as gateway; **Notion** for note storage; **NotebookLM** for
**exam-time quiz generation** ("I don't make flashcards — I plug them
into NotebookLM" `[P1, Interview1.md:291]`). Lecture capture as a
reactive fallback, but its usefulness depends on whether the camera
shows the board `[P1, Interview1.md:347]`. Group study limited to ad-hoc
**pre-exam Discord calls** with screen-shared question solving; attends
few because off-topic chatter and slow pace put them off
`[P1, Interview1.md:201–209]`.

Key pain point: tutorial solutions on Moodle give numerical answers
without working ("560 kg for mass" `[P1, Interview1.md:263]`).

### P2 — summary

Same modules. Studies **post-lunch (14:00–16:00)**; **refuses evening
study** ("after four… I refuse to work" `[P2, Interview2.md:109]`). Sets
mental daily goals of N "sessions" with no formal tracking
`[P2, Interview2.md:277–281]`. Same gaming PC for play and study; treats
this as the dominant focus trap and counters it physically by **moving
the keyboard aside** when studying `[P2, Interview2.md:233]`. Father
permanently in living room → desk is the only available space; campus
not viable due to 40–50 min commute `[P2, Interview2.md:181, 189]`.

**Heavy hand-writing practice** with an explicit colour scheme (blue
body, red highlights, pencil footnotes `[P2, Interview2.md:329]`) and a
**corkboard of formulas** next to their PC, used as an ambient retrieval
cue every time they pass `[P2, Interview2.md:133]`. Two-monitor setup
(lecture | tutorial) with a YouTube tab for music
`[P2, Interview2.md:315]`.

AI used to fill in **procedure** the slides skip, with explicit
**hallucination fear**: "I'm scared of AI getting the calculation totally
wrong — showing you the right result, but not the right way to get
there" `[P2, Interview2.md:169]`. Has not heard of NotebookLM
`[P2, Interview2.md:141]`. Phone-checking is habitual / non-volitional
`[P2, Interview2.md:217]`. Walks with their mum reset focus
`[P2, Interview2.md:347–355]`.

### P3 — summary

Same modules. Day is **mostly unstructured**; only project deadlines or
upcoming exams force structure `[P3, Interview3.md:69]`. Studies
**late-night, ~22:00–24:00**, specifically to dodge family activity
`[P3, Interview3.md:241]`. Bedroom + computer; doesn't study at uni at
all `[P3, Interview3.md:173]`. Quiet + clean + tidy is the precondition
`[P3, Interview3.md:177–189]`.

Tools: Moodle (tutorial sheets + lecture notes), AI for missing worked
examples, YouTube for understanding ("Indian guy who's just got it on"
`[P3, Interview3.md:125]`). Cynical about AI ("AI all the way down"
`[P3, Interview3.md:165]`). No NotebookLM, no Notion, no flashcards
`[P3, Interview3.md:129–133]`.

Strategy: deadline-based exam priority; **mock papers as diagnostic**
(do a mock first, scale revision to gap) `[P3, Interview3.md:97–101]`.
Wants past papers with worked solutions `[P3, Interview3.md:161]`.
Mostly works alone; pre-exam Discord calls when nearer to exams
`[P3, Interview3.md:265]` but distracted by people who "just talk to
me" `[P3, Interview3.md:257]`.

### P4 — summary

Same modules. Ranks mechatronics hardest for **non-content reasons** —
faulty Arduino kits, unhelpful TAs, "running around in circles"
`[P4, Interview4.md:47–55]`. No clock-based daily structure; uses
**timetable gaps** (free Wednesday this term) and reading week as study
days `[P4, Interview4.md:115–119]`. Prioritises by **motivation**
("directly correlated" with effort) `[P4, Interview4.md:123–127]`.
Strategy varies by module type: **coursework** = hands-on project work;
**exam** = past papers + tutorial pass `[P4, Interview4.md:139]`.

**Multi-monitor mandatory** — content open beside questions
`[P4, Interview4.md:189–197]`. Bedroom for exams, but **leaves home for
coursework** because the bedroom is associated with leisure ("removing
myself from that at university" `[P4, Interview4.md:233]`). Smart
tablet (iPad) for notes, with a **subject → exam → topic folder
hierarchy** `[P4, Interview4.md:255]`. **Last-session refresher**
ritual: re-reads previous session's notes on the second monitor before
starting the next session `[P4, Interview4.md:259]`.

**Reads ahead** by topic before lectures, using Google → YouTube to
build prior context `[P4, Interview4.md:91, 107]`. YouTube is for
*topic understanding*, not problem-solving `[P4, Interview4.md:325]`.
AI is **last-resort** when stuck after pattern-matching to a similar
tutorial `[P4, Interview4.md:313]`.

Moodle pain: hates **drip-release** (wants the whole semester upfront
to plan ahead) and **delayed tutorial answers**
`[P4, Interview4.md:103, 159–163]`. Group study is **deadline-driven
panic sessions**, used to **explain topics to others** as a learning
device `[P4, Interview4.md:247]`.

---

## 3. Phase 2 — Initial codes (→ Appendix F: evidence of analysis)

Line-level open codes per transcript. Each row is a single quote /
turn-extract from the transcript with a short descriptive code label.
Codes are kept atomic (no cross-participant consolidation at this stage)
so theme clustering in §4 can be traced back to specific quotes.

### 3.1 Codes from P1 (Interview1.md)

| Line | Quote (excerpt) | Code |
|---|---|---|
| 37 | "Mechatronics… one of the highest — the hardest" | mechatronics ranked hardest |
| 45 | "pneumatic systems, hydraulic systems… we move on to control" | mechatronics content range |
| 57 | "the latest stuff we did was more complicated, like the control systems part" | control systems hardest sub-area |
| 61 | "ordinary differential equations… free and forced vibration… not relevant… electronics focus" | course content drifts off-syllabus |
| 73–77 | "between 8 and 11… in the evening" | fixed evening study block |
| 81 | "I look at those — you would say I pre-read" | pre-reads next-day slides |
| 85 | "I just prioritise the one which is more difficult" | priority by difficulty |
| 93 | "in order of which one's first… then you transfer" | exams: priority by date order |
| 97–101 | "engineering design is just coursework… there's not much revision" | no revision for coursework modules |
| 109 | "easiest to access because most of them are online" | Moodle = primary access |
| 113 | "I also look back at some lecture capture" | lecture capture as gap-fill |
| 117 | "occasionally use AI to summarize the lectures, and to explain things" | AI for summaries / explanations |
| 121 | "exam season. I use NotebookLM… for creating quizzes" | NotebookLM for exam-time quizzes |
| 125 | "majority of the time I'm just using the Moodle slides" | Moodle slides primary content |
| 125 | "if I miss something on the whiteboard… in that sense it is useful" | lecture capture for missed board content |
| 129 | "I use Notion… separate from NotebookLM, which I use just to create the quiz" | tools separated by purpose |
| 137 | "people like my mum… do the house chores… distracts me a bit because of the movement" | movement distraction |
| 141 | "go to the bedroom and work there, where there's minimal movement" | bedroom for focus |
| 153 | "even if I'm not listening, sometimes I just have one headphone on" | one earbud as focus signal |
| 157 | "I normally don't have much" (clutter) | clean desk default |
| 161 | "the silent study space" (between lectures, on campus) | campus silent room between classes |
| 169 | "pneumatic systems, the hydraulic systems… I'll just work in the living room" | low-stakes content in living room |
| 173 | "engineering design projects… I need to be in an assignment space" | serious work needs dedicated space |
| 177 | "she sees me working, she's really quiet. It's kind of unspoken" | family respects unspoken study cue |
| 181 | "I can only do it when I've decluttered my mind" | mental decompression precondition |
| 185 | "I need to be kind of restive… I've commuted from uni, eaten" | post-commute decompression block |
| 193 | "trying to keep up with the current events" | news / current-events drift |
| 197 | "I'm more stressed about a project… I forcefully block it out" | stress = forced focus |
| 201 | "two days before the exam… joining a Discord call… going through reviewing everything together" | pre-exam Discord study |
| 201 | "projects — we just delegate the tasks" | project group: delegate, not collaborate |
| 205 | "if people come in and cause distraction, or someone goes off-topic… disruption" | dislikes off-topic group sessions |
| 209 | "they go at a slower pace than I would want to go" | group pace too slow |
| 217–225 | "If it's not stressful… I prefer not to" (snacks) | snacks only on low-focus content |
| 229 | "two, three days before the exam… 'who wants to join for revision?'" | pre-exam ad-hoc invite |
| 233 | "It's completely random" | spontaneous group coordination |
| 255 | "I'll attempt the question and then right afterwards check the solutions" | tutorial: attempt-then-check |
| 263 | "they give us solutions, but not the worked solution… '560 kg for mass'" | numerical-only solutions |
| 267 | "we have a worked solution after" | worked solutions delayed |
| 271–279 | "Most of the questions I start asking are when they reach exam season" | peer-asking only at exam season |
| 283 | "I do sometimes put the file out saying 'this is a really difficult tutorial, we should try and work on it'" | initiates collab on hard tutorials |
| 291 | "I don't make flashcards — I plug them into NotebookLM, and I just generate quizzes" | NotebookLM substitutes flashcard-making |
| 307 | "I bumped into it by accident… looking for the best alternative to Notion" | NotebookLM discovered accidentally |
| 329 | "I used it for the exams for last semester" | NotebookLM = exam-time tool |
| 347 | "would have been good if some of the lectures would have moved the camera to show the board" | lecture capture: board off-screen |

### 3.2 Codes from P2 (Interview2.md)

| Line | Quote (excerpt) | Code |
|---|---|---|
| 49 | "first week… not very calculus-heavy… then it went way out into calculation — mostly physics" | mechatronics: calculus mid-term turn |
| 53 | "data analysis… then it gets into machine learning, which is way harder" | data analysis: ML half is hard |
| 65 | "fun factor made it feel less hard… no exam at the end" | enjoyment vs exam-driven difficulty |
| 77 | "Which equation to use… in maths, they just give you the formulas… The physics ones, you need to think it through, take the formula and change it completely" | equation selection is the bottleneck |
| 81 | "everything's on Moodle… I'm just rewriting it myself" | Moodle: rewrites notes for personal coding |
| 89 | "I haven't done it this semester yet — laziness" | rewriting cadence slips |
| 93 | "Last semester I was doing week by week. This semester I haven't done it" | week-by-week ideal vs reality |
| 97 | "remember all the formulas and know where to apply" | formula recall is the wall |
| 101 | "my computer is also where I'm relaxing… I often diverge into just not working" | same-machine study/leisure trap |
| 109 | "after four, in the evening, I refuse to work" | refuses evening study |
| 117 | "more time for the most difficult… you need to also do the exercises" | difficulty-proportional time |
| 121 | "spam the exercises until effectively got your walk *(locked it in)*" | spam exercises until locked-in |
| 121 | "next to my computer I have a panel… corkboard" | corkboard formula reference |
| 133 | "every time I pass, I can just read this and keep getting the context back" | corkboard as ambient retrieval cue |
| 137 | "different colours… physics-new… physics… put it together" | colour-coded topic separation |
| 145 | "We have so many clicks" (Moodle) | Moodle: click friction |
| 145 | "the lecturers don't organise it the same way, so you need to adapt each time" | lecturer-by-lecturer Moodle inconsistency |
| 145 | "the whole lecture in one PowerPoint… 300 pages long… you just get intimidated" | monolithic-upload intimidation |
| 149 | "I prefer the paper style… very old school" | paper-first preference |
| 153 | "never thought of using it. I've never been interested in it" | digital study tools not on radar |
| 157 | "the lecturer doesn't give you the procedure to find it" | lecture slides skip procedure |
| 161 | "I had to use AI to explain how to find it" | AI as procedure explainer |
| 169 | "AI getting the calculation totally wrong — showing you the right result, but not the right way to get there" | AI hallucinated-working fear |
| 177 | "since I'm playing all the time on my computer… my brain is just in gaming mode" | gaming-context bleed onto study |
| 181 | "my father is always in the living room" | father blocks alternative space |
| 189 | "40 to 50 minutes to come here, so I'm pretty lazy" | long commute discourages campus study |
| 189 | "my mum… gives me some treats" | family treats |
| 193 | "Writing it down helps me way more — and it has to be done by hand" | handwritten encoding > digital |
| 197 | "My desk gets cleaner and cleaner every time I add something" | desk reorganisation as study prep |
| 205 | "I'll take my keyboard and put it on the side" | keyboard relocation as gaming dis-prime |
| 213–217 | "'hey, check your messages'… two or three times… it's just a habit" | habitual phone-checking |
| 221 | "after lunch, after two, I'm pretty good" | post-lunch productive window |
| 229 | "I still watch the lecture or exercise on the screen" | hybrid digital + paper |
| 233 | "I have to put it [keyboard] off to the side" | physical re-priming reinforced |
| 237–249 | "call on Discord. For example, the other day it was with a friend" | rare 1-on-1 Discord pair-study |
| 253 | "I was group leader, I was just telling people 'can you do this and this'" | delegation-style group leadership |
| 257 | "Not often… maybe, 60% of the time" (ideal sessions) | ~60% ideal-session rate |
| 261 | "If I haven't done it, I will feel guilty" | guilt as motivator |
| 265 | "'hey, you did well, have some chocolate'" | external positive reinforcement |
| 273 | "Brings your mood up and study harder" | snack as mood lift |
| 277 | "I'm just keeping it in my mind" (goals) | mental-only daily goals |
| 281 | "'I'm going to do sessions 1, 2 and 3'" | session-count daily goals |
| 285 | "if it was tough and I worked a lot, I will say 'okay, that's fine for today'" | effort, not output, as success |
| 303 | "lecture 1, then lecture 2… have the exercise next to it, and try to find some link" | lecture-tutorial link-finding |
| 311 | "I'll try to find a solution inside the lecture notes, which never happens" | lecture-doesn't-have-solution gap |
| 315 | "two screens… project the lecture on one screen and the tutorial on the other" | two-monitor split (lecture / tutorial) |
| 315 | "always have one tab open for YouTube for music" | YouTube music tab |
| 319 | "Khan Academy… the Indian guy who explains things" | Khan-Academy-style explainer videos |
| 323 | "the first results and what's helpful" (YouTube) | YouTube top-result satisfice |
| 329 | "blue, the red is just to highlight very important stuff, and pencil are full note notes" | handwritten colour scheme |
| 343 | "watch a YouTube video that's educational… at the end it's really nothing" | YouTube rabbit-hole drift |
| 347 | "she just proposes to me to go out for like half an hour, an hour to go and walk… brings me back down" | walk break resets focus |

### 3.3 Codes from P3 (Interview3.md)

| Line | Quote (excerpt) | Code |
|---|---|---|
| 49 | "I ranked it high because there was stuff that I didn't know" | ranks by knowledge gap |
| 57 | "applying the correct formulas into the context of the diagrams" | equation-to-diagram mapping is hard |
| 69 | "if there's a project, then I would" (structure day) | project triggers daily structure |
| 73–77 | "Yes, it is" (Moodle integral) / "tutorial sheets, lecture notes" | Moodle = tutorial sheets + notes |
| 85 | "deadline-based" | priority by exam deadline |
| 93 | "less time" for easy exams | time scaled by perceived difficulty |
| 97–101 | "I would do a mock — just to see where I'm at. And then if I did good, then I'd do less" | mock paper as diagnostic |
| 109 | "I think, yeah, I do the same way — tutorial sheets" | tutorial sheets primary across modules |
| 113 | "I do use AI — but I would put some work in if they didn't have the answers" | AI for missing worked examples |
| 121 | "you don't get any of the learning — the intermediary steps" | missing intermediate steps = no learning |
| 125 | "always like some Indian guy who's just got it on" | YouTube fallback for understanding |
| 129 | "no, it's just — 'which formula would you use in this scenario?'" | no flashcards |
| 133 | "No" (online quiz tools) | unaware of quiz-generation tools |
| 137 | "I'd get it and then download it" | Moodle: ad-hoc download |
| 141 | "I do have folders for different projects… not for exams" | project-only folder structure |
| 149 | "I don't really see a difference" (lecturer Moodle layouts) | does not perceive lecturer-layout friction |
| 153 | "lectures in one tab, tutorials in one tab, revision in one tab" | tab-based Moodle structure |
| 157 | "I would say it's okay" (revision material) | Moodle revision: "okay" |
| 161 | "Past papers with answers, like worked examples" | wants past papers with workings |
| 165 | "it's AI all the way down" | AI-cynicism |
| 169 | "In my room — at my computer" | bedroom-only study |
| 173 | "No" (uni library) | no campus study |
| 177 | "Clean and tidy" | clean+tidy precondition |
| 189 | "quietness" | quiet precondition |
| 193–197 | family distract | family distract |
| 201 | "If I'm focused… I'll just chunk it away" (snack) | snack ok if already focused |
| 209–213 | computer needed for Moodle access | computer-bound study |
| 217 | "when it's messy, it's sometimes difficult" | mess kills motivation |
| 225 | "Because the exams… are made *(far away)*" | distant deadline = low motivation |
| 229 | "exams… I guess last week" | pressure-driven study |
| 241 | "10 PM to 12 AM. Nobody's doing anything" | late-night study to dodge family |
| 253 | "mostly" (alone) | mostly studies alone |
| 257 | "they don't really provide — they just talk to me" | group sessions devolve to chat |
| 265 | "Sometimes it can be online, when it's nearer to the exams" | pre-exam online groups |
| 269 | "Discord" | Discord = group platform |
| 277 | "one person that doesn't come, so it'll be like three people in total" | ad-hoc group attendance |
| 281 | "Unless they get distracted" | group distraction risk |
| 291 | "open up Moodle, open up tutorials and then what previous people have done" | walkthrough: Moodle → tutorials → past work |
| 295 | "I went to the in-person revision session" | in-person revision sessions |
| 303 | "Focus on the control systems" | gap-targeted re-revision |
| 311–315 | tutorial → AI → YouTube cascade | failure cascade tutorial→AI→YouTube |
| 323 | "The Sunday before" | deadline buffer day |
| 327 | "when you finish all of them and you feel like you got that" | completion + felt-readiness signal |

### 3.4 Codes from P4 (Interview4.md)

| Line | Quote (excerpt) | Code |
|---|---|---|
| 27 | "mechatronics" hardest | mechatronics ranked hardest |
| 31 | "the difficulty is more on like motivation to do it" | difficulty driven by motivation |
| 47–55 | "Arduino kits… faulty from previous groups… not-too-helpful TAs… running around in circles" | lab failure cycle (broken kit + weak TA) |
| 63 | "side projects… that's probably why I know all this stuff" | side projects build prior knowledge |
| 67 | "group projects… aren't enjoyable… relies a lot on the entirety of the group" | dislikes group-dependency |
| 75 | "another group project… It was just rushed" | rushed group timeline |
| 83 | "I study for design. And I did study for mechatronics before I realised that the content was easy" | motivated study targeted to hard-perceived |
| 87 | "look at the topics on the lectures and research those first for the week" | topic research before lectures |
| 91 | "I use Google… search in YouTube, and I find a video on YouTube" | Google → YouTube research path |
| 99 | "some of them will upload the full list of lectures, some of them won't, and only release it week by week" | drip-release vs full-upload variance |
| 103 | "I prefer it all at once, because then you can plan a lot easier" | prefers full-semester upload |
| 107 | "I like to read ahead" | reads ahead |
| 111 | "I don't structure it necessarily by days" | no day-clock structure |
| 115–119 | "Wednesday is usually just the day I'll look at things… reading week" | timetable-gap study |
| 123 | "I prioritise by motivation" | priority by motivation |
| 127 | "directly correlated" (motivation:effort) | motivation:effort tight coupling |
| 135 | "depend on whether it's a coursework module or an exam module" | strategy varies by module type |
| 139 | "coursework modules, it's a lot of hands-on… exam ones are looking at past papers" | hands-on (coursework) vs past-papers (exam) |
| 143 | "exams are very 'this is the answer'… coursework is 'why is this the answer'" | depth via coursework, breadth via exams |
| 147 | "Usually it's just me going to grab the lectures" | Moodle: ad-hoc download |
| 151 | "I don't [organise]… By the end of the term… all of the lectures will have been uploaded" | lecture material accumulates ad-hoc |
| 159 | "they won't upload the tutorial answers until like a week later" | delayed tutorial answers |
| 163 | "requires you to go to those tutorials, and sometimes you're not able to go" | missed tutorial = locked out |
| 175 | "Now I use a smart tablet, so I just write it down" | tablet replaces paper |
| 183 | "I haven't delved into them a lot. I feel like they could help" | AI tools curiosity (untapped) |
| 189–193 | "lots of monitors… for different material" | multi-monitor essential |
| 197 | "content open with the questions at the same time" | side-by-side content + questions |
| 205 | "A quiet place usually helps… being able to have multiple resources open" | quiet + multi-resource visibility |
| 213 | "Most of my family is either at school or at work" | family-out-during-day enables home focus |
| 225 | "if the food is there, I'll snack on it" | ambient snacking |
| 229 | "I do a lot of coursework at university — I'll stay longer" | campus for coursework |
| 233 | "my room is associated with studying — having a bunch of stuff open… removing myself from that at university" | bedroom = leisure trap |
| 247 | "more with others as the deadline gets closer… alone, I try and get the base understanding… then in those subsequent panic sessions, I try and explain the topics to others" | deadline-driven sociality cascade + teach-to-learn |
| 251 | "Yeah, pretty much" (Discord @everyone) | @everyone-style coord |
| 255 | "different folders for each subject… exam bits… topic folders within that" | iPad subject/exam/topic folder hierarchy |
| 259 | "the next session, I'll look at what I did last time as like a refresher" | last-session refresher ritual |
| 283 | "look at the course description and try and glean… they outlined the tasks there" | brief-driven task derivation |
| 287 | "Follow the tasks one by one" | linear task execution |
| 295 | "Jupyter notebook" | Jupyter for data-analysis tasks |
| 301 | "go through the tutorials and do the tutorials, and then attempt the mock paper" | tutorial-then-mock |
| 305 | "depends on the lecturer. I find it helpful when they are worked examples" | lecturer-variable worked-example provision |
| 309 | "It gives you a thought process to follow… 'this is the way you should think of this module'" | worked example as mental model |
| 313 | "Usually only when I can't figure it out" (AI) | AI as last resort |
| 313 | "I usually try and find a tutorial that's as close to the questions as possible" | nearest-tutorial pattern matching |
| 317–319 | past papers usually have worked solutions | past papers as worked-example source |
| 325 | "YouTube video is usually for understanding the topic" | YouTube for topic understanding |
| 329 | "whenever I get to a topic that I struggle with" | struggle-triggered YouTube |
| 335 | "more of 'I'm building my understanding'" | building-up understanding (vs cramming) |
| 341 | "lecture → topic. If I don't understand… YouTube video, and then attempt the tutorial" | cascade lecture→YouTube→tutorial |

---

## 4. Phase 3–5 — Theme map (→ Appendix F: evidence of analysis)

Codes from §3 clustered into candidate theme groups. Group → final
theme mapping appears at the bottom of each group. (This table is the
text-equivalent of the affinity-diagram photograph that will also be
included in Appendix F.)

### Group α — *equation selection & worked examples*

`mechatronics ranked hardest` (P1, P4) · `control systems hardest sub-area` (P1) ·
`mechatronics: calculus mid-term turn` (P2) · `formula recall is the wall` (P2) ·
`equation selection is the bottleneck` (P2) ·
`equation-to-diagram mapping is hard` (P3) · `ranks by knowledge gap` (P3) ·
`tutorial: attempt-then-check` (P1) · `numerical-only solutions` (P1) ·
`worked solutions delayed` (P1) · `wants past papers with workings` (P3) ·
`missing intermediate steps = no learning` (P3) ·
`past papers as worked-example source` (P4) ·
`worked example as mental model` (P4) ·
`lecturer-variable worked-example provision` (P4) ·
`lecture slides skip procedure` (P2) ·
`lecture-doesn't-have-solution gap` (P2) ·
`AI as procedure explainer` (P2) · `AI for summaries / explanations` (P1) ·
`AI for missing worked examples` (P3) · `AI as last resort` (P4) ·
`AI hallucinated-working fear` (P2) · `AI-cynicism` (P3) ·
`AI tools curiosity (untapped)` (P4) ·
`Khan-Academy-style explainer videos` (P2) ·
`YouTube fallback for understanding` (P3) ·
`YouTube for topic understanding` (P4) ·
`struggle-triggered YouTube` (P4) ·
`failure cascade tutorial→AI→YouTube` (P3) ·
`cascade lecture→YouTube→tutorial` (P4) ·
`nearest-tutorial pattern matching` (P4) ·
`tutorial-then-mock` (P4) · `mock paper as diagnostic` (P3, P4) ·
`tutorial sheets primary across modules` (P3) ·
`gap-targeted re-revision` (P3) ·
`peer-asking only at exam season` (P1) ·
`initiates collab on hard tutorials` (P1) ·
`lecture-tutorial link-finding` (P2)

→ feeds **Theme T1 — "Which equation?": worked examples are the
missing artefact, and everything routes around their absence.**

### Group β — *prioritisation & cadence*

`priority by difficulty` (P1) · `exams: priority by date order` (P1) ·
`difficulty-proportional time` (P2) · `time scaled by perceived difficulty` (P3) ·
`priority by exam deadline` (P3) · `priority by motivation` (P4) ·
`motivation:effort tight coupling` (P4) ·
`difficulty driven by motivation` (P4) ·
`strategy varies by module type` (P4) ·
`hands-on (coursework) vs past-papers (exam)` (P4) ·
`depth via coursework, breadth via exams` (P4) ·
`no revision for coursework modules` (P1) ·
`enjoyment vs exam-driven difficulty` (P2) ·
`fixed evening study block` (P1) · `pre-reads next-day slides` (P1) ·
`post-commute decompression block` (P1) ·
`refuses evening study` (P2) · `post-lunch productive window` (P2) ·
`late-night study to dodge family` (P3) ·
`project triggers daily structure` (P3) ·
`distant deadline = low motivation` (P3) ·
`pressure-driven study` (P3) · `deadline buffer day` (P3) ·
`no day-clock structure` (P4) · `timetable-gap study` (P4) ·
`reads ahead` (P4) · `topic research before lectures` (P4) ·
`Google → YouTube research path` (P4) ·
`mental-only daily goals` (P2) · `session-count daily goals` (P2) ·
`effort, not output, as success` (P2) · `guilt as motivator` (P2) ·
`~60% ideal-session rate` (P2) ·
`completion + felt-readiness signal` (P3) ·
`linear task execution` (P4) · `brief-driven task derivation` (P4) ·
`last-session refresher ritual` (P4)

→ feeds **Theme T2 — Prioritisation strategies are personal,
incompatible across the cohort, and rarely tracked.**

### Group γ — *focus environments*

`bedroom for focus` (P1) · `low-stakes content in living room` (P1) ·
`campus silent room between classes` (P1) ·
`serious work needs dedicated space` (P1) ·
`bedroom-only study` (P3) · `no campus study` (P3) ·
`computer-bound study` (P3) · `bedroom = leisure trap` (P4) ·
`campus for coursework` (P4) ·
`family-out-during-day enables home focus` (P4) ·
`father blocks alternative space` (P2) ·
`long commute discourages campus study` (P2) ·
`movement distraction` (P1) · `news / current-events drift` (P1) ·
`family distract` (P3) · `clean+tidy precondition` (P3) ·
`quiet precondition` (P3) · `clean desk default` (P1) ·
`quiet + multi-resource visibility` (P4) ·
`mess kills motivation` (P3) · `family respects unspoken study cue` (P1) ·
`mental decompression precondition` (P1) ·
`stress = forced focus` (P1) ·
`one earbud as focus signal` (P1) · `walk break resets focus` (P2) ·
`gaming-context bleed onto study` (P2) ·
`same-machine study/leisure trap` (P2) ·
`keyboard relocation as gaming dis-prime` (P2) ·
`physical re-priming reinforced` (P2) ·
`desk reorganisation as study prep` (P2) ·
`habitual phone-checking` (P2) · `YouTube rabbit-hole drift` (P2) ·
`YouTube music tab` (P2) ·
`multi-monitor essential` (P2, P4) ·
`two-monitor split (lecture / tutorial)` (P2) ·
`side-by-side content + questions` (P4)

→ feeds **Theme T3 — Focus is engineered through spatial, temporal,
and physical levers — not willed.**

### Group δ — *group study & sociality*

`pre-exam Discord study` (P1) · `pre-exam ad-hoc invite` (P1) ·
`spontaneous group coordination` (P1) ·
`dislikes off-topic group sessions` (P1) · `group pace too slow` (P1) ·
`project group: delegate, not collaborate` (P1) ·
`rare 1-on-1 Discord pair-study` (P2) ·
`delegation-style group leadership` (P1, P2) ·
`pre-exam online groups` (P3) · `Discord = group platform` (P3) ·
`mostly studies alone` (P3) · `ad-hoc group attendance` (P3) ·
`group sessions devolve to chat` (P3) · `group distraction risk` (P3) ·
`in-person revision sessions` (P3) · `@everyone-style coord` (P4) ·
`deadline-driven sociality cascade + teach-to-learn` (P4) ·
`dislikes group-dependency` (P4) · `rushed group timeline` (P4) ·
`peer-asking only at exam season` (P1)

→ feeds **Theme T4 — Group study is exam-shaped, ad-hoc, and brittle.**

### Group ε — *personal external memory*

`Notion for note storage` (P1) · `tools separated by purpose` (P1) ·
`NotebookLM for exam-time quizzes` (P1) ·
`NotebookLM substitutes flashcard-making` (P1) ·
`NotebookLM = exam-time tool` (P1) ·
`NotebookLM discovered accidentally` (P1) ·
`Moodle: rewrites notes for personal coding` (P2) ·
`paper-first preference` (P2) · `corkboard formula reference` (P2) ·
`corkboard as ambient retrieval cue` (P2) ·
`colour-coded topic separation` (P2) ·
`handwritten colour scheme` (P2) ·
`handwritten encoding > digital` (P2) · `hybrid digital + paper` (P2) ·
`tablet replaces paper` (P4) ·
`iPad subject/exam/topic folder hierarchy` (P4) ·
`Moodle: ad-hoc download` (P3, P4) ·
`project-only folder structure` (P3) ·
`lecture material accumulates ad-hoc` (P4) ·
`tab-based Moodle structure` (P3) ·
`Moodle revision: "okay"` (P3) ·
`Moodle = primary access` (P1) ·
`Moodle = tutorial sheets + notes` (P3) ·
`Moodle slides primary content` (P1) ·
`Moodle: click friction` (P2) ·
`lecturer-by-lecturer Moodle inconsistency` (P2) ·
`monolithic-upload intimidation` (P2) ·
`drip-release vs full-upload variance` (P4) ·
`prefers full-semester upload` (P4) ·
`delayed tutorial answers` (P4) ·
`missed tutorial = locked out` (P4) ·
`does not perceive lecturer-layout friction` (P3) ·
`unaware of quiz-generation tools` (P3) ·
`digital study tools not on radar` (P2)

→ feeds **Theme T5 — Moodle is a delivery channel; every student
builds a personal external memory beside it.**

### Codes that did not cluster

(Kept here for transparency; not all data extracts have to feed a theme
in TA, per Braun & Clarke 2006.)

`mechatronics content range` (P1) — descriptive, not analytic ·
`course content drifts off-syllabus` (P1) — module-specific gripe ·
`lab failure cycle` (P4) — relevant to mechatronics-difficulty
*ranking* but not to study-session design ·
`lecture capture for missed board content` (P1) /
`lecture capture: board off-screen` (P1) — relevant to recording quality
not to StudyBuddy ·
`family treats` (P2) / `external positive reinforcement` (P2) /
`snack as mood lift` (P2) / `ambient snacking` (P4) /
`snack ok if already focused` (P3) — snacking patterns; out-of-scope
for the brief.

---

## 5. Phase 6 — Final themes (→ §1.2 Results + Appendix F)

Five themes. Each is one paragraph, with code list and one or two
representative pull-quotes. Designed to feed §1.2's 600-word results
section directly.

### T1 — "Which equation?": worked examples are the missing artefact

Across all four participants, the dominant cognitive bottleneck in
quantitative engineering modules is **selecting which equation to
apply**, not arithmetic. P2 names it directly
`[Interview2.md:77]`; P3 frames the same point as "applying the correct
formulas into the context of the diagrams" `[Interview3.md:57]`; P1's
mechatronics complaint is the *theoretical* control-systems work
`[Interview1.md:57–61]`. The single most-wanted artefact across the
cohort is a **step-by-step worked solution**. Where Moodle provides one
("worked solutions after [the tutorial]" — P1 `[Interview1.md:267]`),
the loop closes; where it does not ("'560 kg for mass'"
`[Interview1.md:263]`; "they won't upload the tutorial answers until
like a week later" — P4 `[Interview4.md:159]`), every participant falls
back through a similar **cascade**: nearest-tutorial pattern-match (P4)
→ AI for procedure → YouTube for understanding → pre-exam Discord for
last-resort peer help. AI use is **trust-bounded**: P2's explicit fear
of "AI getting the calculation totally wrong — showing you the right
result, but not the right way to get there" `[Interview2.md:169]`, P3's
cynical "AI all the way down" `[Interview3.md:165]`, P4's "only when I
can't figure it out" `[Interview4.md:313]`.

> **Pull-quote.** *"It gives you a thought process to follow… 'this is
> the way you should think of this module'."* — P4 on worked examples
> `[Interview4.md:309]`.

### T2 — Prioritisation strategies are personal, incompatible, and rarely tracked

Each participant has a **different** primary prioritisation rule —
P1 by difficulty within a day and exam-order across exams
`[Interview1.md:85, 93]`, P2 by daily session-count goals tracked
mentally `[Interview2.md:277–281]`, P3 by deadline distance
`[Interview3.md:85]`, P4 by motivation/enjoyment "directly correlated"
with effort `[Interview4.md:127]`. Time-of-day strategies are equally
incompatible: 20:00–23:00 (P1), 14:00–16:00 with explicit refusal of
evenings (P2), 22:00–24:00 to dodge family (P3), timetable-gap-only
(P4). All four participants share two structural features, however:
**no participant plans further than ~3 days ahead**, and **no
participant tracks progress with anything beyond mental goals** (P2's
session counts; P4's last-session refresher; P3's "feel like you got
that"; P1 not tracking). This is consistent with effort being treated
as the success metric ("if it was tough and I worked a lot… that's fine
for today" — P2 `[Interview2.md:285]`) rather than output.

> **Pull-quote.** *"I prioritise by motivation. So if I enjoy a module,
> then I tend to work on it a little more… directly correlated."*
> — P4 `[Interview4.md:123–127]`.

### T3 — Focus is engineered through spatial, temporal, and physical levers — not willed

Every participant has built a **personal mechanism** for entering focus
that is not "default willpower". The mechanisms are **spatial** —
P1's bedroom-vs-living-room split tied to the difficulty of the content
`[Interview1.md:141, 169]`; P4 leaves home for serious coursework
because the bedroom is associated with leisure
`[Interview4.md:233]`; P3 is bedroom-only and avoids family by
late-night `[Interview3.md:241]`; P2 has no choice (father in living
room, long commute to campus) so is pinned to one desk
`[Interview2.md:181, 189]`. They are **temporal** — see the time-of-day
incompatibility above. They are **physical** — P2's keyboard-aside
move to break gaming-context bleed `[Interview2.md:233]`, the
corkboard as an ambient retrieval cue `[Interview2.md:133]`, P1's
single earbud as a focus signal `[Interview1.md:153]`, P2 and P4's
multi-monitor side-by-side requirement `[Interview2.md:315;
Interview4.md:189–197]`. The dominant non-noise distractions are
**movement** (P1 `[Interview1.md:137]`), **the same machine** used for
gaming (P2 `[Interview2.md:177]`), and **habitual phone checks** (P2
`[Interview2.md:213–217]`). Default willpower is not the strategy.

> **Pull-quote.** *"My room is associated with studying — having a
> bunch of stuff open. Removing myself from that at university."*
> — P4 `[Interview4.md:233]`.

### T4 — Group study is exam-shaped, ad-hoc, and brittle

All four participants do some group study; all four do it
**only as exams approach** — P1 "two, three days before the exam"
`[Interview1.md:201]`, P3 "nearer to the exams"
`[Interview3.md:265]`, P4 "more with others as the deadline gets
closer" `[Interview4.md:247]`, P2 only in rare 1-on-1 sessions.
Coordination is **spontaneous, low-effort** — "@everyone, who wants to
join?" — and **fragile**: off-topic chatter (P1 `[Interview1.md:205]`;
P3 `[Interview3.md:257]`), pace mismatch ("they go at a slower pace
than I would want to go" — P1 `[Interview1.md:209]`), one-out-of-three
no-shows (P3 `[Interview3.md:277]`). Yet group study has **two real
functions** the participants depend on: **screen-share solving** (a
substitute worked-example, see T1) and **explain-to-learn** ("explain
the topics to others, which I think helps my understanding" — P4
`[Interview4.md:247]`). The brittleness is structural, not
content-related — students don't have a way to bound or focus the
session.

> **Pull-quote.** *"It's completely random."* — P1 on how group revision
> is coordinated `[Interview1.md:233]`.

### T5 — Moodle is a delivery channel; every student builds a personal external memory beside it

All four participants treat Moodle as the **inescapable on-ramp** to
course material `[Interview1.md:109; Interview2.md:81;
Interview3.md:73; Interview4.md:147]`, but each one builds a separate,
personal store of synthesised material on top of it. The **forms differ
radically**: P1 splits Notion (notes) and NotebookLM (exam-time
quizzes) by purpose `[Interview1.md:129, 291]`; P2 hand-rewrites in a
deliberate colour scheme and uses a **corkboard** of formulas as an
ambient retrieval cue `[Interview2.md:133, 329]`; P4 maintains an iPad
folder hierarchy of subject → exam → topic
`[Interview4.md:255]`; P3 downloads ad-hoc and accepts the cost. The
**Moodle frictions** are uneven across the four — P2 perceives the most
(too many clicks, lecturer-by-lecturer inconsistency, intimidating
300-page monolithic uploads `[Interview2.md:145]`), P4 is the most
specific (drip-release prevents look-ahead, delayed tutorial answers
lock out catch-up `[Interview4.md:103, 159]`), P1 calls it "easiest to
access" `[Interview1.md:109]`, P3 says "I don't really see a
difference" `[Interview3.md:149]`. The shared signal across the
participants' divergent reactions is that **Moodle is delivery, not a
study artefact** — the actual revision artefact is built by the student.

> **Pull-quote.** *"Every time I pass, I can just read this and keep
> getting the context back."* — P2 on their corkboard
> `[Interview2.md:133]`.

---

## 6. Full findings list (→ Appendix D)

Granular: one observation per finding. Tagged to participants. Themes
column shows which §5 theme the finding contributes to (some findings
contribute to multiple themes).

| # | Finding | P | Theme |
|---|---|---|---|
| F1  | Mechatronics ranked hardest by 3 of 4 participants; reason given is theoretical/applied content (control systems, ODEs, physics formulas) | P1, P2, P4 | T1 |
| F2  | The cognitive bottleneck is *which* equation to apply, not arithmetic | P1, P2, P3 | T1 |
| F3  | Tutorial sheets are the central revision artefact across all participants | P1, P2, P3, P4 | T1, T2 |
| F4  | Provided Moodle solutions often give a numerical answer with no working | P1 | T1, T5 |
| F5  | Tutorial answers are sometimes uploaded ~1 week after the tutorial, breaking the catch-up loop for missed sessions | P4 | T1, T5 |
| F6  | Past papers / mocks **with worked solutions** are the most-wanted missing resource | P3, P4 | T1, T5 |
| F7  | Worked examples are valued as a *thought-process model*, not just answer-checking | P4 | T1 |
| F8  | Mock papers are used as a diagnostic to guide subsequent revision allocation | P3, P4 | T1, T2 |
| F9  | When stuck, students cascade through nearest-similar-tutorial → AI → YouTube → pre-exam peer help | P3, P4 | T1, T4 |
| F10 | All four participants use AI to fill explanation/procedure gaps; none uses it as a primary workflow | P1, P2, P3, P4 | T1 |
| F11 | AI hallucination of *working* (correct answer, wrong steps) is an explicit fear | P2 | T1 |
| F12 | AI is treated as a last resort by some, with deliberate exhaustion of other sources first | P4 | T1 |
| F13 | NotebookLM (or equivalent dedicated study-AI tool) is known and used by only 1 of 4; the other 3 have not encountered it | P1 (used); P2, P3, P4 (not) | T1, T5 |
| F14 | NotebookLM use is exam-time-only, not term-time | P1 | T1 |
| F15 | NotebookLM was discovered accidentally while looking for a Notion alternative | P1 | T5 |
| F16 | YouTube is used for *topic understanding*, not problem-solving | P2, P3, P4 | T1 |
| F17 | YouTube is also a known rabbit-hole risk ("educational… at the end it's really nothing") | P2 | T3 |
| F18 | Each participant's prioritisation rule differs: difficulty (P1), session-count goal (P2), deadline (P3), motivation (P4) | P1, P2, P3, P4 | T2 |
| F19 | Strategy varies by module *type* (coursework vs exam-based) for P4 | P4 | T2 |
| F20 | Coursework-only modules receive little or no formal revision effort | P1 | T2 |
| F21 | No participant plans more than ~3 days ahead | P1, P2, P3, P4 | T2 |
| F22 | No participant tracks progress with anything beyond mental goals | P2, P3, P4 | T2 |
| F23 | Effort, not output, is the implicit success metric for daily study | P2 | T2 |
| F24 | A **last-session refresher** ritual is used as a session-start re-entry pattern | P4 | T2 |
| F25 | Some participants **read ahead** by topic before lectures, using Google → YouTube | P4 | T2 |
| F26 | Time-of-day preferences are mutually incompatible across the cohort: 20–23h (P1), 14–16h (P2), 22–24h (P3), timetable-gap (P4) | P1, P2, P3, P4 | T2, T3 |
| F27 | A decompression / "studying mindset" ritual is required before serious work begins | P1 | T3 |
| F28 | Movement (people moving in shared rooms) is cited as the dominant non-noise distraction | P1 | T3 |
| F29 | Phone checking is reported as habitual / non-volitional | P2 | T3 |
| F30 | Same-machine gaming/study creates a context-switch trap, mitigated by physical re-priming (moving keyboard) | P2 | T3 |
| F31 | Some students leave home for serious coursework because the bedroom is associated with leisure | P4 | T3 |
| F32 | Multi-monitor / side-by-side material display is a focus enabler for some | P2, P4 | T3 |
| F33 | Single-earbud listening is used as an ambient focus signal | P1 | T3 |
| F34 | Long commute to campus is a deterrent to using campus study spaces | P2 | T3 |
| F35 | Family activity is mitigated through unspoken cues (P1), late-night study (P3), or time-shifting (P4 weekday daytime when family is out) | P1, P3, P4 | T3 |
| F36 | Pre-exam group study via Discord (or in-person) is used by all four participants | P1, P2, P3, P4 | T4 |
| F37 | Coordination of pre-exam group study is spontaneous ("@everyone", "who wants to join?") with no scheduling | P1, P3, P4 | T4 |
| F38 | Group sessions are vulnerable to off-topic chatter and pace mismatch | P1, P3 | T4 |
| F39 | Group sessions also have specific value: screen-shared question solving and explain-to-learn | P4 (explain-to-learn); all four (screen-share) | T4 |
| F40 | Group projects are typically led via task delegation rather than collaborative working | P1, P2 | T4 |
| F41 | All four participants treat Moodle as the inescapable on-ramp to course material | P1, P2, P3, P4 | T5 |
| F42 | Moodle UI friction (clicks, navigation overhead) is explicitly cited | P2 | T5 |
| F43 | Lecturer-by-lecturer inconsistency in Moodle layout forces re-orientation cost per module | P2 | T5 |
| F44 | Monolithic uploads (single 300-page PowerPoint) are intimidating and discourage engagement | P2 | T5 |
| F45 | Drip-release of lecture material prevents look-ahead planning | P4 | T5 |
| F46 | Each participant builds a personal external memory beside Moodle: Notion (P1), handwritten colour-coded notes + corkboard (P2), iPad folder hierarchy (P4); P3 downloads ad-hoc | P1, P2, P3, P4 | T5 |
| F47 | Spatial / ambient cues (the corkboard) act as passive retrieval prompts | P2 | T5 |
| F48 | Lab sessions can be a learning blocker for non-content reasons (faulty hardware, weak TA support) | P4 | (out-of-scope for design) |
| F49 | Lecture capture is only useful when the camera shows the whiteboard | P1 | (out-of-scope for design) |

---

## 7. Walkthrough observation notes (→ Appendix G)

Plain notes — what the participant did and showed during the
walkthrough segment of the interview. Behavioural observations only;
interpretation belongs in §5.

The brief requires walkthrough/observation in **at least 2** interviews;
all four carried one. P1, P2 and P4 are observation-rich (live
screen-share or physical artefacts). P3 gave a brief verbal scenario
walkthrough only — included for completeness in §7.4.

### 7.1 P1 — observed walkthrough

- **Setting.** P1's actual home setup; bedroom desk; they framed it
  explicitly as "my actual setup, which I have at home"
  `[Interview1.md:243]`. Time of demonstration: afternoon (within the
  interview slot), but the demonstrated workflow is the one used in
  the 20:00–23:00 evening block.
- **Sequence (Moodle).** Opened Moodle. Navigated to a tutorial sheet
  in mechatronics. Stated that the typical pattern is to **attempt the
  tutorial question first**, then "as soon as I don't understand
  something, I'll just download the solutions"
  `[Interview1.md:255]`. Showed the solutions file: the answer was a
  **numerical-only** "560 kg for mass" with no working
  `[Interview1.md:263]`. Visible irritation. Noted that worked
  solutions are released *after* the tutorial session
  `[Interview1.md:267]`.
- **Sequence (NotebookLM).** Switched to NotebookLM. Showed an
  **existing** notebook with a "BJT quiz" and pre-loaded source nodes
  `[Interview1.md:295]`. Then re-ran the upload-and-quiz flow live:
  navigated to local files, opened a probability-notes PDF (Bayes'
  theorem content), uploaded it to NotebookLM, generated a quiz, set
  the difficulty `[Interview1.md:303–311]`. Friction: low. The
  difficulty selector was a feature they had recently noticed
  `[Interview1.md:333–337]`.
- **Tools visible on screen.** Moodle (browser), file system (file
  picker), NotebookLM (browser). Notion was referenced but not opened
  on screen.
- **Key moments.**
  - Fast switch from Moodle to NotebookLM — they are kept as separate
    tools by purpose.
  - "I bumped into [NotebookLM] by accident… looking for the best
    alternative to Notion" `[Interview1.md:307]` — the workflow was
    discovered, not designed.
  - "I don't make flashcards — I plug them into NotebookLM, and I just
    generate quizzes" `[Interview1.md:291]`.
  - Confirmed NotebookLM is **exam-season only**
    `[Interview1.md:329]`; Notion is term-time.
- **What was not observed.** No demonstration of the lecture-capture
  fallback (mentioned verbally only). No demonstration of their Notion
  notes (referenced but not opened). No Discord study call (described
  verbally; not occurring during the interview).

### 7.2 P2 — observed walkthrough

- **Setting.** P2 did **not** screen-share — laptop was not present in
  the interview room. Walkthrough was conducted by demonstrating
  **physical artefacts** to the camera, plus verbal reconstruction of
  the typical workflow.
- **Artefact 1 — corkboard.** P2 panned the camera to show the
  inside of their room: globe, PC, and a wall-mounted **corkboard** with
  hand-written formula notes positioned next to the desk
  `[Interview2.md:133]`. They pointed out **colour-coded columns** for
  different topic areas (physics-related items grouped together)
  `[Interview2.md:137]`. They stated the corkboard is used as an **ambient
  retrieval cue**: "every time I pass, I can just read this and keep
  getting the context back" `[Interview2.md:133]`.
- **Artefact 2 — handwritten tutorial sheet on eigenvalues /
  determinants.** They showed an example sheet
  `[Interview2.md:329]`. Colour scheme observed:
  - **Blue** — body text / standard working
  - **Red** — highlighted important content
  - **Pencil** — footnotes / less-important annotations
  They had copied content from a YouTube tutorial onto the sheet by hand.
- **Verbal walkthrough — typical session.**
  - **Two-monitor split.** Lecture slides on one screen, tutorial on
    the other `[Interview2.md:315]`.
  - **Background audio.** YouTube tab open for music
    `[Interview2.md:315]`.
  - **Linkage attempt.** Tries to find the connection between lecture
    content and tutorial questions
    `[Interview2.md:303–311]`.
  - **Gap-fill.** When the lecture notes don't contain the procedure
    (which "never happens" — i.e. the lecture *almost never* has the
    procedure), AI is invoked to explain how to get from formula to
    answer `[Interview2.md:311]`.
  - **YouTube.** Khan-Academy-style tutor videos used for explanation;
    top result from a search is usually accepted
    `[Interview2.md:319–323]`.
- **Physical re-priming behaviour observed/described.** Keyboard moved
  to the side to break gaming-context association
  `[Interview2.md:205, 233]`. Bed behind chair as overflow surface for
  papers `[Interview2.md:197–203]`.
- **Distractions described in situ.** Reflexive phone-check ("two or
  three times, it's just a habit" `[Interview2.md:217]`); not
  notification-driven. Walks with mum used as a focus reset
  `[Interview2.md:347–355]`.
- **What was not observed.** Live screen interaction (no laptop
  present); no Moodle navigation; no AI tool open during the
  interview. Reconstruction was verbal + physical artefacts only.

### 7.3 P4 — observed walkthrough

- **Setting.** P4's own laptop, used in the interview room. Some
  initial fiddling to get screen-sharing into the Teams call before
  the demonstration began `[Interview4.md:267–275]`.
- **Sequence (data-analysis coursework).** Opened the module's Moodle
  page; pointed at a 10-April deadline. Said "we'll do the data
  analysis one" `[Interview4.md:281]`. Read the course description
  in place: "I think this is gas turbines… they mentioned it was an
  AI task. And so that would just be gathering data from — processing
  it. Conveniently, they outlined the tasks there"
  `[Interview4.md:283]`. Demonstrated the **brief-driven task
  derivation** pattern: read the brief, glean the topic, follow the
  tasks linearly one-by-one `[Interview4.md:287]`. Mentioned the work
  was expected in a **Jupyter notebook** `[Interview4.md:295]`.
- **Sequence (electronics — exam module).** Switched modules to an
  electronics past paper. "They had all their tutorials listed, so
  usually I just go through the tutorials and do the tutorials, and
  then attempt the mock paper" `[Interview4.md:301]`. Located the
  mock paper; was unsure whether worked solutions were appended
  `[Interview4.md:301]`. Stated the **solutions-on-second-screen**
  pattern explicitly: "I'd have this up on one screen" — implying
  the question paper on the other monitor.
- **Tools visible / referenced.** Browser (Moodle); implicit
  reference to Jupyter Notebook for the data-analysis task. iPad
  folder hierarchy (subject → exam → topic) was *referenced* but not
  opened on screen `[Interview4.md:255]`.
- **Verbal description of typical session, given mid-walkthrough.**
  - **Worked-example preference.** *"It gives you a thought process
    to follow… 'this is the way you should think of this module'."*
    `[Interview4.md:309]`.
  - **AI is last-resort.** *"Usually only when I can't figure it out.
    They tend to follow the tutorials for the most part. So, I
    usually try and find a tutorial that's as close to the questions
    as possible and follow the reasoning for that."*
    `[Interview4.md:313]` — i.e. **nearest-tutorial pattern matching
    is exhausted before AI**.
  - **Past-paper cascade.** *"They usually do [have worked examples].
    But on the ones where I don't understand, then that's either for
    the group call for people to understand."*
    `[Interview4.md:317]` — confirms tutorial → past-paper → group
    call as a fallback chain.
  - **YouTube use.** *"It's not usually about solving problems. The
    YouTube video is usually for understanding the topic."*
    `[Interview4.md:325]`. Triggered "whenever I get to a topic that
    I struggle with" `[Interview4.md:329]`.
  - **Session-success criterion.** *"It's usually based on whether I
    can do the test I'm trying to understand. So it's going to be
    lecture → topic. If I don't understand the topic in the lecture,
    then YouTube video, and then attempt the tutorial."*
    `[Interview4.md:341]` — explicit articulation of the
    lecture → YouTube → tutorial cascade.
- **Last-session refresher ritual (described, not demonstrated).**
  Referenced the iPad folder structure and the habit of keeping the
  previous session's notes on a different monitor as a refresher
  before the next session `[Interview4.md:255–259]`.
- **What was not observed.** No live opening of the iPad notes; no
  AI tool opened during the demonstration (the AI workflow was
  described, not enacted); no group-call activity (referenced as a
  later-stage fallback only).

### 7.4 P3 — verbal scenario walkthrough

- **Setting.** No computer present; no physical artefact shown.
  Walkthrough was conducted entirely verbally, with the interviewer
  prompting "imagine the exam is in two days, walk me through your
  thought process" `[Interview3.md:284]`. Less in-depth than P1, P2
  or P4 — the interviewer largely led the cascade and P3 confirmed
  steps rather than narrating them at length.
- **Sequence described.** Moodle → tutorials → previous years' work
  → mock paper as diagnostic `[Interview3.md:288–292]`. On a poor
  mock score, focus narrows to the weak topic ("control systems")
  `[Interview3.md:296–304]`; tutorial sheet revisited and fed into
  AI for additional questions `[Interview3.md:308]`; YouTube
  invoked as a third-party recall aid `[Interview3.md:312]`. Cycle
  repeats with a second mock; target ~65 %, push higher if time
  allows `[Interview3.md:316–322]`. Readiness signal: tutorials and
  tools "all done" by the Sunday before the exam
  `[Interview3.md:326–334]`.
- **Tools referenced (not opened).** Moodle, AI, YouTube.
- **What was not observed.** No screen interaction, no artefact, no
  live tool use — entirely a verbal reconstruction.

---

## 8. Appendix mapping

| Working-doc section | Goes to | Brief deliverable |
|---|---|---|
| §0 Method | §1.1 Methodology | "User Research Methodology (max 250w)" |
| §1 Participants | §1.2 Results (opening) | "very brief outline of who took part" |
| §2 Per-interview summaries | Appendix E | "summaries of individual interviews" |
| §3 Initial codes (codebook) | Appendix F | "evidence of analyses" |
| §4 Theme map (affinity-equivalent) | Appendix F | "evidence of analyses, including… images of affinity diagramming" — text-equivalent + planned photo of physical board |
| §5 Final themes | §1.2 Results body | "key themes and insights, with reference to the data" |
| §6 Full findings list | Appendix D | "Full list of findings from the interviews" |
| §7 Walkthrough observation notes | Appendix G | "Observation notes / screenshots" |
| (existing) `Qualtrics.pdf` | Appendix — research materials | "any other relevant materials / outputs produced as part of the user research" — recruitment screener |

§5 is the **drivetrain output**: themes T1–T5 feed §1.2's 600-word
Results section, which is followed (per the brief) by clearly-stated
design goal(s) and key requirements. Those will be derived as the next
analysis step from this thematic output — they are not in this document.

---

## References (for §1.1 Methodology)

Braun, V. and Clarke, V. (2006) 'Using thematic analysis in
psychology', *Qualitative Research in Psychology*, 3(2), pp. 77–101.

(Lecture 4 of the IN3065 module — affinity diagramming and thematic
coding — to be cited alongside Braun & Clarke in §1.1.)
