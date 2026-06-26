/* StudyBuddy wireframes — page assembly.
   One <Page> per screen: phone in the centre, numbered pins overlaid
   on the phone, spec-card callouts in flanking columns, full annotation
   panel on the right. Pins resolve to DOM targets at runtime via
   data-sel selectors and SVG leader lines connect them to the callouts. */

const Pin = ({ n, sel, nth = 0, align = 'center', side = 'right' }) => (
  <span
    className="pin"
    data-sel={sel}
    data-nth={nth}
    data-align={align}
    data-pin-n={n}
    data-pin-side={side}
    style={{ top: -9999, left: -9999 }}
  >{n}</span>
);

/* ---- runtime: position pins on their targets, draw leader lines ---- */

function usePinLayout(rootRef) {
  React.useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const layout = () => {
      const phone    = root.querySelector('.phone');
      const phoneScr = root.querySelector('.phone-screen');
      const colL     = root.querySelector('.callouts-l');
      const colR     = root.querySelector('.callouts-r');
      const svg      = root.querySelector('.leaders');
      const a4       = root;
      if (!phone || !phoneScr || !svg) return;

      const a4Rect    = a4.getBoundingClientRect();
      const phoneRect = phone.getBoundingClientRect();
      const scrRect   = phoneScr.getBoundingClientRect();

      // ---- 1. Place each pin ON its target (edge nearest the callout column) ----
      const pins = root.querySelectorAll('.pin');
      const placed = [];
      pins.forEach((pin) => {
        const sel   = pin.getAttribute('data-sel');
        const nth   = parseInt(pin.getAttribute('data-nth') || '0', 10);
        const align = pin.getAttribute('data-align') || 'center';
        const side  = pin.getAttribute('data-pin-side') || 'right';

        let target = null;
        if (sel) {
          const matches = phoneScr.querySelectorAll(sel);
          target = matches[nth] || matches[0] || null;
        }
        if (!target) { pin.style.opacity = '0'; return; }
        pin.style.opacity = '1';

        const tRect = target.getBoundingClientRect();

        // y: where on the target (top / center / bottom)
        let y;
        if      (align === 'top')    y = tRect.top    - phoneRect.top + 12;
        else if (align === 'bottom') y = tRect.bottom - phoneRect.top - 12;
        else                         y = (tRect.top + tRect.bottom) / 2 - phoneRect.top;

        // clamp inside the phone screen
        const yMin = scrRect.top - phoneRect.top + 14;
        const yMax = scrRect.bottom - phoneRect.top - 14;
        y = Math.max(yMin, Math.min(yMax, y));

        // x: on the target's near edge — clamped so pin stays fully on screen
        const xLeftScr  = scrRect.left  - phoneRect.left + 14;
        const xRightScr = scrRect.right - phoneRect.left - 14;
        const targetLeft  = tRect.left  - phoneRect.left;
        const targetRight = tRect.right - phoneRect.left;
        let x = side === 'left' ? targetLeft : targetRight;
        x = Math.max(xLeftScr, Math.min(xRightScr, x));

        pin.style.left = x + 'px';
        pin.style.top  = y + 'px';

        placed.push({
          pin, side, align,
          n: pin.getAttribute('data-pin-n'),
          // a4-local coords for leader-line drawing
          x: phoneRect.left + x - a4Rect.left,
          y: phoneRect.top  + y - a4Rect.top,
        });
      });

      // ---- 2. Distribute callouts along their column to align with pin Y ----
      // Uses pool-adjacent-violators (PAV) to minimise sum (top - desired)^2
      // subject to the non-overlap constraint top[i+1] >= top[i] + h[i] + gap.
      // Greedy push-down alone leaves later callouts stranded below their pins;
      // PAV finds the closed-form optimum, splitting the slack across clusters.
      const reflowColumn = (side, colEl) => {
        if (!colEl) return;
        const colRect = colEl.getBoundingClientRect();
        const colTopInA4 = colRect.top - a4Rect.top;
        const padTop = 28, padBot = 28, gap = 10;
        const colH = colRect.height;
        const bottomLimit = colH - padBot;

        const items = placed
          .filter((p) => p.side === side)
          .map((p) => {
            const callout = root.querySelector(`.callout[data-callout-n="${p.n}"]`);
            return callout ? { ...p, callout } : null;
          })
          .filter(Boolean);
        if (!items.length) return;

        items.forEach(({ callout }) => {
          callout.style.position = 'absolute';
          callout.style.left  = '18px';
          callout.style.right = '18px';
          callout.style.top   = '0px';
        });
        items.forEach((it) => { it.h = it.callout.offsetHeight; });

        items.sort((a, b) => a.y - b.y);

        // Badge centre sits ~21px below the callout top (10px padding + 1px margin
        // + 10px half-height of the 20px badge).
        const badgeOffset = 21;
        items.forEach((it) => { it.desired = (it.y - colTopInA4) - badgeOffset; });

        const n = items.length;
        const cumOffset = new Array(n).fill(0);
        for (let i = 1; i < n; i++) {
          cumOffset[i] = cumOffset[i - 1] + items[i - 1].h + gap;
        }
        const shifted = items.map((it, i) => it.desired - cumOffset[i]);

        // Isotonic regression via PAV: merge any block whose mean falls below
        // its left neighbour, replacing both with their combined mean.
        const blocks = [];
        for (let i = 0; i < n; i++) {
          blocks.push({ start: i, end: i, sum: shifted[i], count: 1, mean: shifted[i] });
          while (blocks.length >= 2 && blocks[blocks.length - 2].mean > blocks[blocks.length - 1].mean) {
            const b2 = blocks.pop();
            const b1 = blocks.pop();
            const sum = b1.sum + b2.sum;
            const count = b1.count + b2.count;
            blocks.push({ start: b1.start, end: b2.end, sum, count, mean: sum / count });
          }
        }
        blocks.forEach((b) => {
          for (let i = b.start; i <= b.end; i++) {
            items[i].top = b.mean + cumOffset[i];
          }
        });

        // Apply box constraints: push down from top, push up from bottom,
        // repeated so a forced shift on one end can ripple back.
        for (let pass = 0; pass < 3; pass++) {
          items[0].top = Math.max(items[0].top, padTop);
          for (let i = 1; i < n; i++) {
            const minTop = items[i - 1].top + items[i - 1].h + gap;
            if (items[i].top < minTop) items[i].top = minTop;
          }
          items[n - 1].top = Math.min(items[n - 1].top, bottomLimit - items[n - 1].h);
          for (let i = n - 2; i >= 0; i--) {
            const maxTop = items[i + 1].top - gap - items[i].h;
            if (items[i].top > maxTop) items[i].top = maxTop;
          }
        }

        items.forEach((it) => { it.callout.style.top = it.top + 'px'; });
      };
      reflowColumn('left',  colL);
      reflowColumn('right', colR);

      // ---- 3. Draw leader lines from each pin to its callout's badge ----
      svg.setAttribute('viewBox', `0 0 ${a4.offsetWidth} ${a4.offsetHeight}`);
      svg.style.width  = a4.offsetWidth + 'px';
      svg.style.height = a4.offsetHeight + 'px';
      while (svg.firstChild) svg.removeChild(svg.firstChild);

      placed.forEach(({ side, n, x, y }) => {
        const callout = root.querySelector(`.callout[data-callout-n="${n}"]`);
        if (!callout) return;
        // Exit from the card's edge facing the phone (not the badge's edge),
        // so the line never crosses the callout body text. Y stays at badge centre.
        const cRect  = callout.getBoundingClientRect();
        const cn     = callout.querySelector('.cn');
        const cnRect = (cn || callout).getBoundingClientRect();
        const cx = (side === 'left' ? cRect.right : cRect.left) - a4Rect.left;
        const cy = (cnRect.top + cnRect.bottom) / 2 - a4Rect.top;

        // Bezier from pin to badge — gentle horizontal pull
        const dx = Math.abs(cx - x) * 0.45;
        const cp1x = side === 'left' ? x - dx : x + dx;
        const cp2x = side === 'left' ? cx + dx : cx - dx;
        const d = `M ${x} ${y} C ${cp1x} ${y}, ${cp2x} ${cy}, ${cx} ${cy}`;

        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', d);
        svg.appendChild(path);

        const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        dot.setAttribute('cx', String(cx));
        dot.setAttribute('cy', String(cy));
        dot.setAttribute('r', '2');
        svg.appendChild(dot);
      });
    };

    layout();
    const ro = ('ResizeObserver' in window) ? new ResizeObserver(layout) : null;
    if (ro) ro.observe(root);
    window.addEventListener('resize', layout);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(layout).catch(() => {});
    }
    const t = setTimeout(layout, 50);
    return () => {
      window.removeEventListener('resize', layout);
      if (ro) ro.disconnect();
      clearTimeout(t);
    };
  }, []);
}

const Page = ({
  index, tag, title, subtitle, intro, children, notes,
  variant, screen, pins, hciNote, evidence, requirements, spec,
}) => {
  const rootRef = React.useRef(null);
  usePinLayout(rootRef);

  // Build callout list: each note gets a side (from matching pin) so we
  // can split the notes into left + right columns.
  const sideForN = {};
  (pins || []).forEach(p => { sideForN[p.n] = p.side || 'right'; });
  const leftNotes  = notes.filter(nt => (sideForN[nt.n] || 'right') === 'left');
  const rightNotes = notes.filter(nt => (sideForN[nt.n] || 'right') === 'right');

  const Callout = ({ n, html }) => (
    <div className="callout" data-callout-n={n}>
      <span className="cn">{n}</span>
      <div className="cbody" dangerouslySetInnerHTML={{__html: html}}/>
    </div>
  );

  return (
    <section ref={rootRef} className="a4" data-screen-label={`${String(index).padStart(2,'0')} ${title}`}>
      <span className="page-tag">{tag}</span>
      <span className="page-no">SB · WF{String(index).padStart(2,'0')} · CW2</span>

      <div className="callouts callouts-l">
        {leftNotes.map((nt, i) => (
          <Callout key={i} n={nt.n} html={nt.html}/>
        ))}
      </div>

      <div className="stage">
        <div className="stage-title">
          <span className="num">Frame {String(index).padStart(2,'0')} / 07</span>
          {title}
        </div>
        <div className="stage-sub">{subtitle}</div>

        <div className="phone">
          <div className="phone-notch"></div>
          <div className="phone-screen">
            {screen}
          </div>
          {pins?.map((p, i) => (
            <Pin key={i} n={p.n} sel={p.sel} nth={p.nth} align={p.align} side={p.side}/>
          ))}
        </div>
      </div>

      <div className="callouts callouts-r">
        {rightNotes.map((nt, i) => (
          <Callout key={i} n={nt.n} html={nt.html}/>
        ))}
      </div>

      {/* SVG leader-line layer — drawn after layout */}
      <svg className="leaders" aria-hidden="true"></svg>

      <div className="annot">
        <div>
          <h2>{title}</h2>
          <div className="intro">{intro}</div>
        </div>

        {hciNote && (<>
          <h3>HCI principle applied</h3>
          <div className="tiny" dangerouslySetInnerHTML={{__html: hciNote}}/>
        </>)}

        {evidence && (<>
          <h3>Evidence: interview anchors</h3>
          <div className="tiny" dangerouslySetInnerHTML={{__html: evidence}}/>
        </>)}

        {requirements && (<>
          <h3>Requirements traced</h3>
          <div className="req-row">
            {requirements.map((r,i)=>(
              <span key={i} className="chip" style={{background:'var(--pin-tint)', color:'var(--pin-ink)', borderColor:'transparent', fontFamily:'var(--mono)'}}>{r}</span>
            ))}
          </div>
        </>)}

        {spec && (<>
          <h3>Interaction spec</h3>
          <div className="spec">{spec}</div>
        </>)}

        {variant && (<>
          <h3>States shown</h3>
          <div className="states">{variant}</div>
        </>)}
      </div>
    </section>
  );
};

/* ============================ Cover page ============================ */

const Cover = () => (
  <section className="cover">
    <div>
      <span className="eyebrow">CW2 · §2 Wireframes · primary journey</span>
      <h1 style={{marginTop:8}}>StudyBuddy Wireframes</h1>
      <p className="lede">
        Seven mid-fi mobile wireframes covering an end-to-end study
        journey: <i>tomorrow's class card → briefing → equation
        picker → sourced worked solution → committed plan → wrap-up</i>,
        with a paper-capture flow alongside. Each screen traces to
        coded findings from the four interviews (P1–P4) and to a
        numbered requirement. State shown is illustrative; the design
        does not assume a fixed study rhythm (see §2.1 for the full
        rationale).
      </p>

      <dl>
        <dt>Author</dt><dd>Anker Rasmussen</dd>
        <dt>Module</dt><dd>IN3065, User-Centred System Design</dd>
        <dt>Deliverable</dt><dd>Coursework Part 2 · §2 Wireframes (40%)</dd>
        <dt>Method</dt><dd>Reflexive thematic analysis (Braun &amp; Clarke 2006) → POV → requirements → wireframes</dd>
        <dt>Format</dt><dd>Mobile · 312 × 720 dp · Inter · single accent (Figma blue)</dd>
      </dl>

      <h3 style={{marginTop:24}}>Primary journey</h3>
      <div className="flow">
        <span className="step">Tomorrow card</span>
        <span className="arr">›</span>
        <span className="step">Briefing</span>
        <span className="arr">›</span>
        <span className="step">Equation?</span>
        <span className="arr">›</span>
        <span className="step">Step-by-step</span>
        <span className="arr">›</span>
        <span className="step">Commit plan</span>
        <span className="arr">›</span>
        <span className="step">Wrap-up</span>
      </div>
    </div>

    <div className="right-col">
      <div>
        <h3>Seven screens</h3>
        <div className="screens">
          <div className="s"><span className="n">01</span>Home: tomorrow's briefing card</div>
          <div className="s"><span className="n">02</span>Briefing detail: recap + prep</div>
          <div className="s"><span className="n">03</span>Equation picker: "which one?"</div>
          <div className="s"><span className="n">04</span>Step-by-step worked solution</div>
          <div className="s"><span className="n">05</span>Session plan / commit</div>
          <div className="s"><span className="n">06</span>Wrap-up · felt readiness</div>
          <div className="s"><span className="n">07</span>Camera capture: paper input</div>
        </div>
      </div>

      <div>
        <h3>Themes hit per screen</h3>
        <div className="themes">
          <div className="t"><code>T1</code><span><b>"Which equation?" and worked examples.</b> Screens 02, 03, 04, 07. <span className="muted">P1, P2, P3, P4</span></span></div>
          <div className="t"><code>T2</code><span><b>Personal prioritisation, rarely tracked.</b> Screens 01, 05, 06. <span className="muted">P1, P2, P3, P4</span></span></div>
          <div className="t"><code>T5</code><span><b>Moodle as channel; external memory beside it.</b> Screens 01, 02, 04. <span className="muted">P1, P2, P3, P4</span></span></div>
          <div className="t"><code>T3</code><span style={{color:'var(--ink-3)'}}><b>Focus engineered.</b> Annotated only; covered through plan and last-session refresher.</span></div>
          <div className="t"><code>T4</code><span style={{color:'var(--ink-3)'}}><b>Group study.</b> Out of scope. The brief permits an individual-only design.</span></div>
        </div>
      </div>

      <div>
        <h3>Reading the wireframes</h3>
        <div className="tiny muted" style={{lineHeight:1.55}}>
          Each frame pairs the rendered screen (centre) with numbered
          spec-card callouts (flanking) and a full annotation panel
          (right). Callouts explain <b>behaviour, states and source
          attribution</b>, not visual description. Citations:
          <span className="ref ev" style={{fontFamily:'var(--mono)', fontSize:10, padding:'1px 5px', borderRadius:4, background:'var(--accent-tint)', color:'var(--accent-ink)', marginLeft:6}}>P2 [I2:77]</span> = participant and transcript line.
          <span className="ref req" style={{fontFamily:'var(--mono)', fontSize:10, padding:'1px 5px', borderRadius:4, background:'var(--pin-tint)', color:'var(--pin-ink)', marginLeft:6}}>R3</span> = requirement ID.
          <span className="ref heur" style={{fontFamily:'var(--mono)', fontSize:10, padding:'1px 5px', borderRadius:4, background:'var(--ok-tint)', color:'var(--ok-ink)', marginLeft:6}}>Norman · 3 models</span> = HCI principle (course).
        </div>
      </div>
    </div>
  </section>
);

/* ============================ Page configs ============================ */

const PAGES = [
  {
    index: 1,
    tag: 'wf-01 / Home',
    title: 'Home: tomorrow\'s briefing card',
    subtitle: 'The "what\'s on tomorrow?" moment.',
    intro: <>Single-card focus on the next study-relevant event, pulled
      from MyTimetable and ranked tomorrow-first. The card is the entry
      point to every other screen.</>,
    notes: [
      { n: 1, html: `<b>Quiet sync indicator.</b> Last-pull timestamp only, no
        settings clutter. Tap opens the source-management sheet.
        <span class="ref req">R5</span>
        <span class="ref ev">P3 [I3:137]</span>
        <span class="ref ev">P4 [I4:147]</span>` },
      { n: 2, html: `<b>Briefing card (the main action).</b> Module, slot
        and room from MyTimetable. Topic chips capped at three to avoid
        the "300 pages" intimidation P2 reported.
        <span class="ref req">R1</span>
        <span class="ref ev">P2 [I2:295]</span>` },
      { n: 3, html: `<b>One-paragraph synthesis.</b> Bolded terms deep-link to
        the relevant slide range. This is what separates StudyBuddy from
        a calendar or a to-do list.
        <span class="ref req">R2</span>
        <span class="ref ev">P2 [I2:303]</span>` },
      { n: 4, html: `<b>Estimated prep time and sources count.</b> Time is the
        only plan-level number here, which supports P2's "60% ideal-session"
        realism.
        <span class="ref heur">Norman · system image</span>
        <span class="ref ev">P2 [I2:257]</span>` },
      { n: 5, html: `<b>Single primary button.</b> Full-width, thumb zone, ≥44 dp.
        Everything else on the screen is quieter.
        <span class="ref heur">Garrett · Skeleton</span>` },
      { n: 6, html: `<b>Secondary card (next class).</b> Lower density. The
        "Read-ahead" chip mirrors P4's pre-lecture habit.
        <span class="ref ev">P4 [I4:107]</span>
        <span class="ref ev">P1 [I1:81]</span>` },
      { n: 7, html: `<b>This-week strip.</b> Cadence signal only: a single bar,
        no streaks, no badges. Avoids the gamification P3 is cynical
        about.
        <span class="ref req">R7</span>` },
      { n: 8, html: `<b>Persistent tab bar.</b> Today / Plan / Notes / Me.
        Persistent destinations let the student recognise where to
        go rather than recall a route.
        <span class="ref heur">Budiu · recognition</span>` },
    ],
    pins: [
      { n: 1, sel: '.col.greeting .eyebrow',     side: 'left',  align: 'center' },
      { n: 2, sel: '.briefing-card .session-head', side: 'right', align: 'top' },
      { n: 3, sel: '.briefing-card .summary',    side: 'left',  align: 'center' },
      { n: 4, sel: '.briefing-card > .row.between', side: 'right', align: 'center' },
      { n: 5, sel: '.briefing-card .btn.accent', side: 'left',  align: 'center' },
      { n: 6, sel: '.scroll > .card',            side: 'right', align: 'center' },
      { n: 7, sel: '.scroll > .row.between',     side: 'left',  align: 'center' },
      { n: 8, sel: '.tabbar',                    side: 'right', align: 'center' },
    ],
    hciNote: `Single primary action per screen. The briefing card
      itself is the primary action; the accent colour appears once, so the eye
      lands there first.
      <b>Cooper · experience goal</b> of control;
      <b>Garrett · Surface</b> for visual hierarchy.`,
    evidence: `Why a single tomorrow-card? P1 pre-reads next-day slides
      at their fixed evening block <span class="ref ev">P1 [I1:81]</span>;
      P4 reads ahead by topic before lectures
      <span class="ref ev">P4 [I4:107]</span>; P3 only structures the
      day when there is a project deadline
      <span class="ref ev">P3 [I3:69]</span>. The pre-class briefing
      formalises a behaviour <b>three of four already do manually</b>,
      and gives P3 the deadline-style scaffold they otherwise lack.`,
    requirements: ['R1', 'R2', 'R5', 'R7'],
    spec: (
      <>
        <div className="item"><b>Touch</b>The whole briefing card is one tap target (≥44 dp). Topic chip row caps at 3 by default; if more topics surface, the row scrolls horizontally with a fade edge.</div>
        <div className="item"><b>Transitions</b>Card tap routes to Screen 02 (push, ~200 ms ease-out). Pull-down on the scroll container forces a Moodle re-pull; success returns a 1 s confirmation strip on the eyebrow timestamp.</div>
        <div className="item"><b>Errors / offline</b>Last good briefing remains readable without network (offline-first). Sync failure shows an inline retry banner above the card; tap retries with exponential back-off (2 s, 8 s, 30 s).</div>
        <div className="item"><b>Accessibility</b>Focus order: greeting → briefing button → secondary card → tab bar. Briefing button SR-label names module + slot ("Open Engineering Mechanics Tutorial 6 briefing"). Eyebrow timestamp uses <code>aria-live="polite"</code> so synced-time updates are announced. Dynamic type up to ×1.5 supported; chip row truncates with ellipsis at the larger sizes.</div>
      </>
    ),
    variant: (
      <>
        <div className="state-card"><div className="label">Connected · default</div><p>Shown opposite. Pulled from Moodle and MyTimetable, last sync ≤ 10 min.</p></div>
        <div className="state-card"><div className="label">First use · empty</div><p>Card replaced by the Connect Sources flow (Moodle, MyTimetable, optional Notes). Explicit "reads, never writes" line.</p></div>
        <div className="state-card"><div className="label">Loading · post-sync</div><p>Three skeletons (head / chips / summary) while the Moodle pull resolves. Tab bar remains usable.</p></div>
        <div className="state-card"><div className="label">Error · sync failed</div><p>Inline retry banner above the card. Last good briefing remains visible (offline-first).</p></div>
      </>
    ),
    variantOverrides: {
      empty: {
        intro: <>The first-run state. Until the student connects at least
          a timetable and a slides source, no briefing can be synthesised,
          so the home screen becomes a single-purpose onboarding surface
          with an explicit data-scope line.</>,
        notes: [
          { n: 1, html: `<b>Welcome header.</b> Named greeting plus a lede
            that states the value proposition in one line ("turns
            tomorrow's classes into a 5-minute briefing"). Sets the
            tone before any permission is requested.` },
          { n: 2, html: `<b>"Step 1: Connect sources".</b> Numbered so the
            student knows this is scaffolded onboarding, not the final
            screen. No skip-all affordance: at least Moodle and a
            timetable are required for the rest of the app to work.
            <span class="ref heur">Norman · system image</span>` },
          { n: 3, html: `<b>Moodle row (required).</b> One sentence describing
            scope: lecture slides, tutorials and labsheets, which are
            the artefacts P1, P3 and P4 already pull from Moodle.
            <span class="ref ev">P1 [I1:81]</span>
            <span class="ref ev">P3 [I3:137]</span>
            <span class="ref ev">P4 [I4:147]</span>` },
          { n: 4, html: `<b>MyTimetable row (required).</b> Sub-line states the
            value: "knows what you have tomorrow". The pre-class
            briefing cannot rank events without it.
            <span class="ref req">R5</span>` },
          { n: 5, html: `<b>Notes row (optional).</b> Notion (P1), iPad (P4)
            and Drive split the participants across tools. Mandating any
            single one would exclude someone, so this row is opt-in.
            <span class="ref ev">P1 [I1:117]</span>
            <span class="ref ev">P4 [I4:175]</span>` },
          { n: 6, html: `<b>Connect or Skip, both visible.</b> The optional
            row exposes both options so the student can opt in
            <i>or</i> opt out in one tap, without going back. Skip is
            "Skip" — not "later" or "remind me" — so the choice is
            final for this run.
            <span class="ref heur">Cooper · experience goal</span>` },
          { n: 7, html: `<b>Privacy line, "reads, never writes".</b> The most
            critical line on the screen. Addresses the data-privacy
            worry that runs under every interview, and gives the
            student a single place (Settings) to revoke. Sets
            expectations before sign-up, not after.
            <span class="ref ev">P3 [I3:165]</span>` },
        ],
        pins: [
          { n: 1, sel: '.col',                     side: 'left',  align: 'top' },
          { n: 2, sel: '.connect > .eyebrow',      side: 'right', align: 'center' },
          { n: 3, sel: '.connect .src-line',       side: 'left',  align: 'center', nth: 0 },
          { n: 4, sel: '.connect .src-line',       side: 'right', align: 'center', nth: 1 },
          { n: 5, sel: '.connect .src-line',       side: 'left',  align: 'center', nth: 2 },
          { n: 6, sel: '.connect .src-line .btn-pair', side: 'right', align: 'center' },
          { n: 7, sel: '.scroll > .tiny.muted',    side: 'left',  align: 'center' },
        ],
        hciNote: `<b>Norman · 3 models:</b> "Step 1" plus the
          explicit read-only line communicate the designer's intent
          ("connect a timetable, then we synthesise") in two lines,
          closing the gap between the designer's model and the
          student's before any credential is shared.
          <b>Cooper · experience goal:</b> optional Notes row has an
          explicit Skip; required rows do not.`,
        evidence: `Why an explicit privacy line, rather than a buried
          T&amp;Cs link? P3's AI-cynicism
          <span class="ref ev">P3 [I3:165]</span> and P2's hallucination
          concern <span class="ref ev">P2 [I2:169]</span> both reduce to
          the same worry: <i>I don't trust where this data goes</i>.
          Surfacing read-only scope on the same screen as the connect
          buttons is the cheapest way to bound that anxiety before any
          credential is shared. The required-versus-optional split also
          mirrors the four participants' actual tool diversity: three of
          four use Moodle, only one uses Notion, only one an iPad.`,
        requirements: ['R5'],
      },
    },
  },
  {
    index: 2,
    tag: 'wf-02 / Briefing detail',
    title: 'Briefing detail: recap and prep',
    subtitle: 'A 5-minute read linking last week to tomorrow.',
    intro: <>Two stacked sections: a <b>recap</b> of last session
      (source-attributed) above <b>prep</b> for tomorrow (numbered,
      time-boxed, leading into the equation picker). Mirrors P4's
      last-session refresher ritual and gives P2 the lecture-to-tutorial
      link they currently have to construct manually.</>,
    notes: [
      { n: 1, html: `<b>Nav: back, refresh, overflow.</b> Refresh re-pulls
        Moodle in case slides have updated since the last sync. The
        overflow hosts <i>open in browser</i> and <i>report wrong
        source</i> for when the recap mis-attributes.
        <span class="ref heur">Cooper · experience goal</span>` },
      { n: 2, html: `<b>Page header: what, when, source breadth.</b> Module
        plus tomorrow's slot from MyTimetable, plus a "5 sources" line
        that shows where the briefing was built from <i>before</i>
        any synthesised text appears.
        <span class="ref req">R3</span>` },
      { n: 3, html: `<b>Recap section: read-time.</b> A soft commitment device
        ("3 min read") rather than a timer. Anchors P2's session-count
        goals without imposing one.
        <span class="ref ev">P2 [I2:281]</span>` },
      { n: 4, html: `<b>Recap rows: source on the row.</b> Each topic links to
        its exact slide range (<code>L11 · s.14</code>). Attribution sits
        on the row, not buried in a footer, which is a direct answer to
        P2's hallucination concern and P3's AI-cynicism.
        <span class="ref req">R3</span>
        <span class="ref ev">P2 [I2:169]</span>
        <span class="ref ev">P3 [I3:165]</span>` },
      { n: 5, html: `<b>Prep section: "n of m" progress chip.</b> Live count
        of completed checklist items, so "ready" has an explicit
        definition the student can see at a glance.` },
      { n: 6, html: `<b>Numbered, time-boxed checklist.</b> Each item carries
        an estimate; items 3 and 4 deep-link into the equation picker
        (Screen 03) and worked solution (Screen 04). Item 5 routes the
        same flow at a past-paper question instead of a tutorial sheet,
        which is P3's go-to diagnostic and P4's exam-prep default.
        This is the entry point into T1.
        <span class="ref req">R4</span>
        <span class="ref ev">P3 [I3:97]</span>
        <span class="ref ev">P4 [I4:301]</span>` },
      { n: 7, html: `<b>Done items, two-tap undo.</b> Tap triggers a 3s undo
        toast. Strikethrough on completion gives the visual reward; the
        undo window prevents accidental progress loss.
        <span class="ref heur">Cooper · experience goal</span>` },
      { n: 8, html: `<b>Two buttons (routing intent).</b> <i>Start prep</i>
        (accent) routes to the next incomplete item, which is the
        default path. <i>Plan</i> (ghost) jumps to Screen 05 to adjust
        block sizing before starting, for nights where the proposed
        weighting feels wrong.` },
    ],
    pins: [
      { n: 1, sel: '.nav',                                          side: 'left',  align: 'center' },
      { n: 2, sel: '.col',                                          side: 'right', align: 'top' },
      { n: 3, sel: '.scroll > .card:nth-child(2) .row.between',     side: 'left',  align: 'center' },
      { n: 4, sel: '.recap',                                        side: 'right', align: 'center' },
      { n: 5, sel: '.scroll > .card:nth-child(3) .chip.accent',     side: 'left',  align: 'center' },
      { n: 6, sel: '.prep',                                         side: 'right', align: 'center' },
      { n: 7, sel: '.prep .item.done',                              side: 'left',  align: 'center' },
      { n: 8, sel: '.btn.accent',                                   side: 'right', align: 'center' },
    ],
    hciNote: `Progressive disclosure: the home card summarised in
      one paragraph; this screen is the drill-down. <b>Budiu ·
      recognition vs recall:</b> every recap claim is a tappable
      source chip. <b>Cooper · experience goal:</b> refresh and undo
      are one tap each.`,
    evidence: `P4's <i>last-session refresher</i> ritual
      <span class="ref ev">P4 [I4:259]</span> shows students naturally
      want continuity from yesterday into today, but none of the four
      reported a tool that shows it automatically. P2's <i>"I'll
      try to find a solution inside the lecture notes, which never
      happens"</i> <span class="ref ev">P2 [I2:311]</span> is the gap
      this screen fills: the recap card converts a 20-minute scroll
      through Moodle into a 3-minute structured read. In exam-prep
      weeks the same screen accepts a past-paper question in place of
      a tutorial sheet, picking up P3's mock-paper diagnostic
      <span class="ref ev">P3 [I3:97]</span> and P4's exam-prep default
      <span class="ref ev">P4 [I4:301]</span> without a separate flow.`,
    requirements: ['R2', 'R3', 'R4'],
    spec: (
      <>
        <div className="item"><b>Touch</b>Source chips on each recap row are pill tap targets (≥40 dp). Prep checklist items accept a tap anywhere on the row to toggle. Refresh icon is debounced 800 ms to prevent rapid-fire pulls.</div>
        <div className="item"><b>Transitions</b>Checklist tap shows a 3 s undo toast before commit (toast dismisses on tap or auto-collapses to a strikethrough). "Start prep" routes to the next incomplete item in order.</div>
        <div className="item"><b>Errors</b>"Source missing" banner falls back to nearest available source and labels the substitution inline. Refresh failure preserves the previous recap and shows a one-line "Retry" link.</div>
        <div className="item"><b>Accessibility</b>Recap rows render as a <code>&lt;dl&gt;</code> with the source chip as <code>&lt;dd&gt;</code>. Checklist uses <code>role="checkbox"</code>; an <code>aria-live="polite"</code> region announces "n of 5 done" after each toggle. Reduce-motion replaces the strikethrough fill with an instant style change.</div>
      </>
    ),
    variant: (
      <>
        <div className="state-card"><div className="label">Connected · default</div><p>Shown opposite. Recap synthesised; checklist 2 of 4 done.</p></div>
        <div className="state-card"><div className="label">Loading · AI synthesis</div><p>Recap rows replaced by three skeletons mirroring the final layout. Header and prep stay interactive. Primary button still routes (recap-dependent items defer).</p></div>
        <div className="state-card"><div className="label">Error · source missing</div><p>Banner above the recap: <i>"L11 not on Moodle yet; recap built from L10 and your notes."</i></p></div>
        <div className="state-card"><div className="label">Empty · first session</div><p>Recap section hidden, only Prep is shown. Header reads "First session in this module".</p></div>
      </>
    ),
    variantOverrides: {
      loading: {
        intro: <>Mid-synthesis state. The header and prep section
          populate immediately from local data. The recap is the only
          part that defers on the AI pipeline, shown here as three
          skeleton rows mirroring the eventual layout. The student is
          never blocked waiting on the model.</>,
        notes: [
          { n: 1, html: `<b>Nav: refresh during load.</b> Refresh re-attempts
            the AI pull in case it stalled. Overflow exposes <i>use
            cached recap from yesterday</i> as the offline fallback.
            <span class="ref heur">Cooper · experience goal</span>` },
          { n: 2, html: `<b>Header populates immediately.</b> Module, slot
            and sources-count come from MyTimetable and the local cache,
            with no AI synthesis required, so it never appears blank.
            The skeleton state begins below this line.
            <span class="ref heur">Norman · system image</span>` },
          { n: 3, html: `<b>Skeleton shape mirrors final content.</b> Three
            rows (full, short, tall) match the eventual recap row
            layout, so the student knows what is coming and where to
            look. No spinner: skeletons and the section header carry
            the progress signal.` },
          { n: 4, html: `<b>Prep stays interactive.</b> Recap is the only
            AI-synthesised section; everything below remains tappable,
            so the student can start checklist items they already
            understand without waiting on the model.` },
          { n: 5, html: `<b>Primary button still routable.</b> "Start prep" jumps to
            the next incomplete item. Checklist items that depend on
            the recap mark themselves <i>"ready when recap loads"</i>
            and show a small notice when their dependency resolves.` },
        ],
        pins: [
          { n: 1, sel: '.nav',          side: 'left',  align: 'center' },
          { n: 2, sel: '.col',          side: 'right', align: 'top' },
          { n: 3, sel: '.skeleton',     side: 'left',  align: 'center', nth: 0 },
          { n: 4, sel: '.prep',         side: 'right', align: 'center' },
          { n: 5, sel: '.btn.accent',   side: 'left',  align: 'center' },
        ],
        hciNote: `Skeleton screens, not spinners: showing the
          eventual shape keeps the student oriented
          (<b>Norman · system image</b>). The section header itself
          carries the progress signal; an extra spinner would widen
          the gulf of evaluation, not narrow it.`,
        evidence: `Why no spinner? P3's AI-cynicism
          <span class="ref ev">P3 [I3:165]</span> and P2's hallucination
          concern <span class="ref ev">P2 [I2:169]</span> both worsen
          with opaque waits. A spinner says "trust me, working" while
          a skeleton says "this is the shape you're getting". P2's
          ~60% ideal-session rate <span class="ref ev">P2 [I2:257]</span>
          means partial synthesis must yield partial value: even a
          half-loaded briefing should let the student start prep, so
          the screen unblocks the prep checklist while the recap is
          still resolving.`,
        requirements: ['R2', 'R3', 'R4'],
      },
    },
  },
  {
    index: 3,
    tag: 'wf-03 / Equation picker',
    title: 'Equation picker: "which one?"',
    subtitle: 'Tackles P2\'s headline finding head-on: equation selection is the bottleneck.',
    intro: <>The screen that <b>refuses to give the answer</b>. For a
      tutorial question, StudyBuddy proposes 2 to 4 candidate equations
      ranked by relevance, with a one-line <i>why</i> and a confidence
      band. The student picks; only then does Screen 04 walk the working.</>,
    notes: [
      { n: 1, html: `<b>Question header (verbatim).</b> No re-phrasing; trust
        requires the student see exactly what was asked. Tappable to
        expand to full PDF context.
        <span class="ref req">R3</span>` },
      { n: 2, html: `<b>Diagram (extracted, not redrawn).</b> Real diagrams
        only. Gives the diagram equal weight with the question text,
        which is what P3 reaches for when picking an equation.
        <span class="ref ev">P3 [I3:57]</span>` },
      { n: 3, html: `<b>Section title with usage hint.</b> Long-press shows
        the derivation of the equation; tap selects. Two-level
        interaction keeps the primary surface clean. The candidate
        list is bounded at 2 to 4 deliberately: each extra option
        adds decision time, so we cap the visible set.
        <span class="ref heur">Yablonski · Hick's Law</span>` },
      { n: 4, html: `<b>Selected: accent border and tint.</b> Numeric
        confidence ("92%") is shown <b>only</b> when high; a label
        otherwise. Avoids spurious precision.
        <span class="ref heur">Norman · system image (calibrated)</span>` },
      { n: 5, html: `<b>Formula plus plain-language "why".</b> The "why" is
        the thing tutorials and slides skip, which is P2's "lecturer
        doesn't give you the procedure".
        <span class="ref ev">P2 [I2:77, 157]</span>` },
      { n: 6, html: `<b>Support equation.</b> Surfaced alongside the
        primary so the alternative path (here: solve for t first, then
        s) is visible before any algebra starts.
        <span class="ref req">R4</span>` },
      { n: 7, html: `<b>Unlikely candidates: greyed but visible.</b>
        Shown, not hidden. Students learn what is wrong by seeing it
        dismissed with reasoning.
        <span class="ref heur">Norman · mental model</span>` },
      { n: 8, html: `<b>Show working / Pick another.</b> Routes into Screen
        04 on accept; "Pick another" keeps the student in control if
        they disagree with the ranking.
        <span class="ref heur">Cooper · experience goal</span>` },
    ],
    pins: [
      { n: 1, sel: '.col',           side: 'left',  align: 'top' },
      { n: 2, sel: '.placeholder',   side: 'right', align: 'center' },
      { n: 3, sel: '.row.between',   side: 'left',  align: 'center' },
      { n: 4, sel: '.eq-row.selected', side: 'right', align: 'top' },
      { n: 5, sel: '.eq-row.selected .formula', side: 'left',  align: 'center' },
      { n: 6, sel: '.eq-row',        side: 'right', align: 'center', nth: 1 },
      { n: 7, sel: '.eq-row',        side: 'left',  align: 'center', nth: 2 },
      { n: 8, sel: '.btn.accent',    side: 'right', align: 'center' },
    ],
    hciNote: `<b>Budiu · recognition vs recall</b> and
      <b>Yablonski · Hick's Law:</b> the student picks from 2–4
      ranked candidates rather than retrieving from memory; capped
      because decision time grows with choice count.
      <b>Cooper · experience goal:</b> "Pick another" at every step.
      Honest uncertainty: numeric confidence shown only when
      calibrated; otherwise a soft label.`,
    evidence: `<b>This screen is the centrepiece of the design.</b> P2's
      <i>"equation selection is the bottleneck"</i>
      <span class="ref ev">P2 [I2:77]</span> is the single largest
      finding across the four interviews. P3's diagram-to-equation
      mapping <span class="ref ev">P3 [I3:57]</span> and P4's "nearest
      tutorial" pattern-matching <span class="ref ev">P4 [I4:313]</span>
      describe the same workaround: manually scanning for a similar
      example because no tool offers candidate equations directly.`,
    requirements: ['R3', 'R4', 'R6'],
    spec: (
      <>
        <div className="item"><b>Touch</b>Whole eq-row is the selection target (≥56 dp tall). Long-press (500 ms) reveals derivation in a half-sheet that dismisses on backdrop tap. "Pick another" clears the current selection without leaving the screen; the previously-selected row remains visible.</div>
        <div className="item"><b>Transitions</b>"Show working" → Screen 04 (push). Re-entering the picker preserves the prior selection and scroll position so the student can compare against the working without losing context.</div>
        <div className="item"><b>Errors</b>"No match" empty state offers a manual "point to the right lecture" picker that re-runs ranking against the chosen module. Loading times above 1.5 s reveal a "scanning L9–L11…" footer.</div>
        <div className="item"><b>Accessibility</b>Eq-rows render as <code>role="radiogroup"</code>; the selected row has <code>aria-checked="true"</code>. Confidence chip is decorative — the row's SR-label reads "high confidence", "support" or "unlikely" rather than a percentage. Dimmed "unlikely" rows remain in tab order and are still selectable; they are not <code>aria-disabled</code>.</div>
      </>
    ),
  },
  {
    index: 4,
    tag: 'wf-04 / Step-by-step',
    title: 'Step-by-step worked solution',
    subtitle: 'Every step is either sourced or flagged unverified, never both.',
    intro: <>Numbered steps, each with a <b>label</b>, <b>working</b>
      (formula, values, result), a one-line <b>why</b>, and a
      <b> source chip</b>. A dedicated <i>Sources for this solution</i>
      tray sits at the bottom, surfacing attribution rather than burying
      it.</>,
    notes: [
      { n: 1, html: `<b>Header: question ref, step count, source breadth.</b>
        "Drawn from L11 and your textbook" names the sources before
        any working appears.
        <span class="ref req">R3</span>` },
      { n: 2, html: `<b>Step block (uniform skeleton).</b> Label, working,
        why, source. The same shape every step gives a quick visual
        scan, and addresses P3's view that missing intermediate steps
        means no learning.
        <span class="ref ev">P3 [I3:121]</span>` },
      { n: 3, html: `<b>Working in monospace.</b> Numbers, units and
        substitution are explicit. Final value bold. Directly addresses
        P1's gripe with Moodle's "560 kg" numerical-only solutions.
        <span class="ref ev">P1 [I1:263]</span>` },
      { n: 4, html: `<b>Source chip per step.</b> Slide range, textbook
        section, or AI narration. Mixed-source steps get the most
        cautious chip ("AI · narration only").
        <span class="ref ev">P2 [I2:169]</span>` },
      { n: 5, html: `<b>"Why" line (one sentence).</b> Plain-language
        rationale. Builds the mental model P4 wants.
        <span class="ref ev">P4 [I4:309]</span>` },
      { n: 6, html: `<b>Sources tray (separate, named, persistent).</b>
        Source attribution lives in its own area rather than as a
        footnote. Lists every source and the role it played.
        <span class="ref req">R3</span>` },
      { n: 7, html: `<b>Override on AI rows.</b> Lets the student replace
        the AI explanation with their own note for next time, which
        returns authorial control.
        <span class="ref ev">P3 [I3:165]</span>
        <span class="ref heur">Cooper · experience goal</span>` },
      { n: 8, html: `<b>"I've got it" / "Re-derive".</b> Felt-readiness is
        captured per question (not just per session), and feeds Screen
        06 and tomorrow's weighting.
        <span class="ref req">R7</span>
        <span class="ref ev">P3 [I3:327]</span>` },
    ],
    pins: [
      { n: 1, sel: '.col',                        side: 'left',  align: 'top' },
      { n: 2, sel: '.steps .step',                side: 'right', align: 'top',    nth: 0 },
      { n: 3, sel: '.steps .step .work',          side: 'left',  align: 'center', nth: 1 },
      { n: 4, sel: '.steps .step .label .src',    side: 'right', align: 'center', nth: 1 },
      { n: 5, sel: '.steps .step .why',           side: 'left',  align: 'center', nth: 1 },
      { n: 6, sel: '.sources-tray',               side: 'right', align: 'top' },
      { n: 7, sel: '.sources-tray .src-item .actions', side: 'left',  align: 'center', nth: 2 },
      { n: 8, sel: '.btn.accent',                 side: 'right', align: 'center' },
    ],
    hciNote: `<b>Norman · mental model:</b> symbols and ordering
      follow textbook convention so the system image matches what
      the student has built across L11 and the textbook.
      <b>Norman · 3 models:</b> the unverified-step state preserves
      the working but flags it, narrowing the gulf of evaluation
      when an AI synthesis cannot be pinned to a source.`,
    evidence: `Combined evidence:
      <span class="ref ev">P1 [I1:263]</span> numerical-only solutions;
      <span class="ref ev">P2 [I2:157, 169]</span> lecture skips
      procedure, AI-hallucination fear;
      <span class="ref ev">P3 [I3:121, 165]</span> intermediate-steps
      requirement, AI cynicism;
      <span class="ref ev">P4 [I4:305, 309]</span> worked example as
      mental model, lecturer-variable provision. <b>This screen alone
      hits all four participants on T1.</b>`,
    requirements: ['R3', 'R4', 'R6', 'R7'],
    spec: (
      <>
        <div className="item"><b>Touch</b>Source chip tap opens the cited slide range in an external PDF reader (deep-linked to the slide number where supported, scroll-to-page otherwise). "I've got it" / "Re-derive" are the only screen-level buttons; in-tray actions (override) live inside the sources tray.</div>
        <div className="item"><b>Transitions</b>Steps stream in sequentially as each resolves (200 ms stagger between cards). Reduce-motion replaces stagger with instant render. "Re-derive" re-requests synthesis, preserving the question and the previously-picked equation.</div>
        <div className="item"><b>Errors</b>Unverified-step amber banner persists with the working still visible — never suppressed. "Switch source" deep-links into Settings → Sources. If all steps fail to verify, the screen falls back to "explain only" mode.</div>
        <div className="item"><b>Accessibility</b>Steps render as an ordered list. Working uses <code>aria-label</code> to expand symbols ("v squared equals u squared plus 2 a s"); the visual monospace formula is unchanged. The unverified-step banner is announced via <code>role="alert"</code> so SR users hear it before the step contents.</div>
      </>
    ),
    defaultFirst: true,
    variantOverrides: {
      error: {
        intro: <>Error state. When the AI synthesis cannot be
          pinned to a slide range or textbook section, that step is
          flagged <i>unverified</i> rather than presented as
          authoritative. The working is preserved (never
          suppressed); the student can switch source, re-derive, or
          accept with reservation. This is the design's answer to
          P2's hallucination concern and P3's AI cynicism.</>,
        notes: [
          { n: 1, html: `<b>Error banner (persistent).</b> Names the
            specific step that failed to verify and tells the student
            what to do next. Sits above the working so it is read
            first; does not dismiss on tap.
            <span class="ref ev">P2 [I2:169]</span>
            <span class="ref heur">Norman · 3 models</span>` },
          { n: 2, html: `<b>Header unchanged.</b> Trust frame ("drawn
            from L11 and your textbook") is preserved so the student
            can see <i>which</i> source set was promised before
            comparing it to what was delivered.
            <span class="ref req">R3</span>` },
          { n: 3, html: `<b>Working preserved, never suppressed.</b>
            P3 is explicit that intermediate steps are where the
            learning lives; hiding them on error would defeat the
            screen's purpose. The student sees the procedure and
            decides whether to trust it.
            <span class="ref ev">P3 [I3:121]</span>` },
          { n: 4, html: `<b>Unverified source chip (Step 3).</b> Warm
            tint, neutral copy ("unverified") rather than alarmist
            ("error" / "wrong"). Communicates uncertainty without
            implying the working is incorrect.
            <span class="ref heur">Norman · system image (calibrated)</span>` },
          { n: 5, html: `<b>Switch source via Sources tray.</b> The
            override path lives in the same tray as the verified
            sources, so recovering from the error doesn't require
            leaving the screen.
            <span class="ref ev">P3 [I3:165]</span>
            <span class="ref heur">Cooper · experience goal</span>` },
          { n: 6, html: `<b>"I've got it" still routes.</b> The
            student can still mark the question complete despite an
            unverified step; their felt-readiness rating
            (Screen~06) is what counts here, not the source tag.
            <span class="ref req">R7</span>` },
        ],
        pins: [
          { n: 1, sel: '.error-banner',                      side: 'right', align: 'center' },
          { n: 2, sel: '.col',                               side: 'left',  align: 'top' },
          { n: 3, sel: '.steps .step .work',                 side: 'right', align: 'center', nth: 0 },
          { n: 4, sel: '.steps .step .label .src',           side: 'left',  align: 'center', nth: 2 },
          { n: 5, sel: '.sources-tray .src-item .actions',   side: 'right', align: 'center', nth: 2 },
          { n: 6, sel: '.btn.accent',                        side: 'left',  align: 'center' },
        ],
        hciNote: `<b>Norman · 3 models:</b> the system image must
          tell the student that its model of the answer is
          <i>incomplete</i>, not pretend otherwise.
          <b>Norman · gulf of evaluation:</b> the amber banner and
          the per-step chip show the uncertainty at the exact point
          it applies, so the student does not have to compare claims
          against sources by hand.`,
        evidence: `This is the design's answer to the
          AI-hallucination concern that recurred across the
          interviews: P2's <i>"AI getting the calculation totally
          wrong --- showing you the right result, but not the right
          way to get there"</i>
          <span class="ref ev">P2 [I2:169]</span> and P3's
          AI cynicism <span class="ref ev">P3 [I3:165]</span> both
          call for an explicit \"don't trust this part\" affordance
          rather than silent omission. Suppressing unverified steps
          would also breach P3's intermediate-steps requirement
          <span class="ref ev">P3 [I3:121]</span>, so the working
          is preserved with the chip flagging it.`,
        requirements: ['R3', 'R4', 'R6'],
      },
    },
  },
  {
    index: 5,
    tag: 'wf-05 / Session plan',
    title: 'Session plan / commit',
    subtitle: 'Difficulty and deadline drive block sizes. Adjustable. Not a timer.',
    intro: <>A weighted plan-bar across four blocks, sized by perceived
      difficulty and deadline proximity. The student adjusts and
      <i> commits</i>, or skips planning entirely. There is deliberately
      no in-session timer (T3 is something the student arranges in
      their environment; the app shouldn't pile pressure on top of
      that).</>,
    notes: [
      { n: 1, html: `<b>Title: tonight, total estimate.</b> Time is the unit
        students already use mentally (P2's session-count goals).
        Deliberately avoids "studied this term" gamification.
        <span class="ref ev">P2 [I2:281]</span>` },
      { n: 2, html: `<b>Plan-bar (proportional, four blocks).</b> Width is
        minutes; colour intensity tracks difficulty. Drag the divider
        between two blocks to reweight on the fly.
        <span class="ref heur">Shneiderman · direct manipulation</span>` },
      { n: 3, html: `<b>Block list (one row per block).</b> Each row names
        <i>what</i>, <i>why this size</i>, and <i>when due</i>. The
        <i>why</i> is the bit students do not currently get from any
        tool.
        <span class="ref req">R8</span>` },
      { n: 4, html: `<b>Last-session refresher block.</b> Built in; opens
        with what the student marked yesterday. Formalises P4's
        existing ritual.
        <span class="ref ev">P4 [I4:259]</span>` },
      { n: 5, html: `<b>Commit / Adjust / Skip.</b> Three options at
        different commitment levels. <i>Commit</i> writes the plan
        into the home card; <i>Adjust</i> opens the inline editor;
        <i>Skip</i> bypasses planning entirely and routes back to
        Screen 02.
        <span class="ref ev">P3 [I3:69]</span>` },
      { n: 6, html: `<b>No countdown, no in-session timer.</b> Deliberate
        omission. Focus is engineered environmentally (T3), not by
        app-imposed pressure.` },
    ],
    pins: [
      { n: 1, sel: '.col',                            side: 'left',  align: 'top' },
      { n: 2, sel: '.plan-bar',                       side: 'right', align: 'center' },
      { n: 3, sel: '.plan-list',                      side: 'left',  align: 'top' },
      { n: 4, sel: '.plan-list .plan-row:last-child', side: 'right', align: 'center' },
      { n: 5, sel: '.btn.accent',                     side: 'left',  align: 'center' },
      { n: 6, sel: '.scroll > .tiny.muted',           side: 'right', align: 'center' },
    ],
    hciNote: `<b>Garrett · Surface:</b> one bar, four rows. No
      streaks, calendars or focus timers.
      <b>Shneiderman · direct manipulation:</b> dragging the divider
      reweights blocks in place, so the effect is visible on the
      surface that caused it.`,
    evidence: `Why difficulty-weighted, rather than time-blocked? P1
      prioritises by difficulty <span class="ref ev">P1 [I1:85]</span>;
      P2 explicitly scales time to perceived difficulty
      <span class="ref ev">P2 [I2:117]</span>; P3 does the same
      <span class="ref ev">P3 [I3:93]</span>; P4 by motivation, which
      correlates with effort <span class="ref ev">P4 [I4:127]</span>.
      All four use difficulty (or its proxies) as the primary
      scheduling signal, not clock time.`,
    requirements: ['R7', 'R8', 'R9'],
    spec: (
      <>
        <div className="item"><b>Touch</b>Plan-bar dividers are draggable handles with a ≥24 dp hit area expanded from a 4 dp visual line. Per-row stepper appears in Adjust mode for ±5 min increments. Total time is pinned at the top while dragging so the student sees the trade-off.</div>
        <div className="item"><b>Transitions</b>Commit collapses the bar into a thin pinned strip on the home card and routes back to Screen 01. Skip routes to Screen 02 unchanged. Snooze hides the plan for 24 h with a "Snoozed" indicator on the home card.</div>
        <div className="item"><b>Errors</b>"No prep needed" empty state replaces the bar with a snooze affordance. If the user drags two blocks to total under 5 min, the commit button disables with a tooltip ("Block too short").</div>
        <div className="item"><b>Accessibility</b>Plan-bar exposes one slider per block (<code>role="slider"</code>, <code>aria-valuemin</code> / <code>max</code> / <code>now</code> in minutes, plus <code>aria-valuetext</code> for human-readable form). Drag is paired with stepper buttons for keyboard / SR users. Difficulty intensity is paired with text labels ("hardest", "medium", "lightest") — never colour-only.</div>
      </>
    ),
  },
  {
    index: 6,
    tag: 'wf-06 / Wrap-up',
    title: 'Wrap-up · felt readiness',
    subtitle: 'The loop. Capture what stuck and what didn\'t; feeds tomorrow.',
    intro: <>Three captures, in order: a 5-point <b>felt readiness</b>
      scale, a per-topic <i>?/~/✓</i> tally, and one optional free-text
      note. This screen is what makes the system more than a one-shot
      tool: it closes the loop into the next briefing.</>,
    notes: [
      { n: 1, html: `<b>Header: minutes studied and the question.</b>
        "How ready do you feel?" is intentional: <i>felt</i>, not
        measured. Self-rating only — captures effort-as-success rather
        than output-as-success.
        <span class="ref ev">P2 [I2:285]</span>` },
      { n: 2, html: `<b>5-point readiness scale.</b> Endpoints labelled
        (<i>shaky</i> to <i>fluent</i>), so anchors are shared between
        sessions. Single tap; no confirm.
        <span class="ref heur">ISO 9241 · efficiency</span>` },
      { n: 3, html: `<b>Soft explainer.</b> "Low scores get more recap" is
        transparent about how the data feeds back. Builds trust for
        P3's cynicism profile.
        <span class="ref ev">P3 [I3:165]</span>` },
      { n: 4, html: `<b>Per-topic tally: ?/~/✓.</b> Three states:
        <i>didn't get to it</i>, <i>got partially</i>, <i>solid</i>.
        Captured per topic, not just per session, so the next briefing
        can be topic-specific.
        <span class="ref req">R7</span>` },
      { n: 5, html: `<b>Coverage micro-copy.</b> "3 worked examples" or
        "read 6/8 pages" are observable, not inferred. Comes from
        logged interactions in Screens 03 and 04, not user input.
        <span class="ref heur">Norman · system image</span>` },
      { n: 6, html: `<b>Save &amp; close vs Skip.</b> Skip is a real
        option: wrap-up is voluntary. Skipped sessions still log time
        and items but do not influence next-briefing weighting.` },
      { n: 7, html: `<b>Time-to-next-briefing footer.</b> "Feeds tomorrow's
        briefing in 23 h" closes the system-status loop the home screen
        opened.` },
    ],
    pins: [
      { n: 1, sel: '.col',                                       side: 'left',  align: 'top' },
      { n: 2, sel: '.scale',                                     side: 'right', align: 'center' },
      { n: 3, sel: '.scroll > .card:nth-child(2) .tiny.muted',   side: 'left',  align: 'center' },
      { n: 4, sel: '.outcome-row',                               side: 'right', align: 'center', nth: 0 },
      { n: 5, sel: '.outcome-row .tiny.muted',                   side: 'left',  align: 'center', nth: 0 },
      { n: 6, sel: '.btn.accent',                                side: 'right', align: 'center' },
      { n: 7, sel: '.scroll > .tiny.muted',                      side: 'left',  align: 'center' },
    ],
    hciNote: `<b>Norman · gulf of evaluation:</b> the student tells
      the system whether the previous step worked, and the system
      <i>shows that input being used</i> on the next briefing.
      Without this loop, Screens 01–05 are unfalsifiable from the
      student's point of view.`,
    evidence: `P3's <i>"completion and felt-readiness signal"</i>
      <span class="ref ev">P3 [I3:327]</span> is the most explicit
      finding for this screen. P2's <i>"if it was tough and I worked a
      lot, I will say 'okay, that's fine for today'"</i>
      <span class="ref ev">P2 [I2:285]</span> shows effort, not output,
      as the success metric. It is captured here as the readiness
      scale, not a productivity score. P4's last-session refresher
      <span class="ref ev">P4 [I4:259]</span> needs <b>this</b> screen
      to populate the "what to refresh" list.`,
    requirements: ['R7', 'R10'],
    spec: (
      <>
        <div className="item"><b>Touch</b>Readiness scale is a single-tap-to-select segmented control (no drag); each segment is ≥44 dp wide. Outcome pills cycle through ?/~/✓ on tap. Both controls give a 30 ms haptic tick on select.</div>
        <div className="item"><b>Transitions</b>Save → 600 ms confirmation strip ("Saved, see you tomorrow") → auto-dismiss to Screen 01. Skip routes home immediately without the confirmation strip.</div>
        <div className="item"><b>Errors</b>Save failure caches locally and retries on next launch; the user is not blocked. If three retries fail, a one-line banner on the home card surfaces "Wrap-up not yet synced".</div>
        <div className="item"><b>Accessibility</b>Scale renders as <code>role="radiogroup"</code> with endpoint labels ("shaky", "fluent") read by SRs regardless of selection. Pill states have text labels ("didn't get to it" / "got partially" / "solid"), so the symbol is decorative. Reduce-motion replaces the auto-dismiss animation with an instant route.</div>
      </>
    ),
  },
  {
    index: 7,
    tag: 'wf-07 / Camera capture',
    title: 'Camera capture: paper to briefing',
    subtitle: 'Alternate entry to the worked-solution flow when the question lives on paper.',
    intro: <>Every participant studied on paper to some degree. This
      screen lets the student point their phone at a paper question
      (with or without their attempt) and routes into the equation
      picker pre-populated. Peer to "open from briefing", not a
      replacement.</>,
    notes: [
      { n: 1, html: `<b>Viewfinder and corner guides.</b> Auto-detects the
        paper edge; corners snap when aligned. No login or permission
        re-prompt mid-flow: capture must be one tap from the prep
        checklist.
        <span class="ref heur">ISO 9241 · efficiency</span>` },
      { n: 2, html: `<b>Printed-question detection (blue).</b> OCR has
        identified the printed question region with high confidence
        (92%). Boxes are live overlays, so the student sees what
        will be captured before the shutter.
        <span class="ref heur">Norman · system image</span>` },
      { n: 3, html: `<b>Handwriting detection (purple).</b> StudyBuddy
        reads the student's <i>own</i> work too, formalising P2's
        hand-written-notes habit and P4's iPad workflow. A separate
        hue from the printed-question box so the student can see at
        a glance which region is the question and which is theirs.
        <span class="ref ev">P2 [I2:149, 193]</span>
        <span class="ref ev">P4 [I4:175]</span>` },
      { n: 4, html: `<b>Stuck-point detection (amber).</b> Where the
        student crossed something out or wrote "stuck", the capture
        flags it and routes the equation picker to start from
        <i> that</i> step. Meets the student where they got lost.
        <span class="ref ev">P3 [I3:121]</span>
        <span class="ref req">R4</span>` },
      { n: 5, html: `<b>Context pill ("T6 · Q1").</b> If launched from the
        prep checklist, the question is already identified, so the
        camera <i>verifies</i> rather than identifies.` },
      { n: 6, html: `<b>Mode segmented control.</b> Three modes:
        <i>Question only</i>, <i>Question + my work</i> (default),
        <i>Diagram</i> (uses the sheet diagram as primary input, which
        addresses P3's diagram-to-equation mapping).
        <span class="ref ev">P3 [I3:57]</span>` },
      { n: 7, html: `<b>Hint: what we'll do.</b> Plain language; the
        capture is not a magic moment. Tells the student that
        handwriting will be read too, so they know what they're
        agreeing to before pressing the shutter — closing the
        <i>gulf of execution</i>.
        <span class="ref heur">Norman · gulf of execution</span>` },
      { n: 8, html: `<b>Shutter and side controls.</b> Left is gallery
        (P4's iPad scans on the camera roll); right is upload from
        files (a Moodle PDF the student already downloaded).
        <span class="ref ev">P4 [I4:175]</span>
        <span class="ref ev">P4 [I4:147]</span>
        <span class="ref req">R6</span>` },
    ],
    pins: [
      { n: 1, sel: '.cam .vp',                  side: 'left',  align: 'center' },
      { n: 2, sel: '.cam .detect-box',          side: 'right', align: 'top',    nth: 0 },
      { n: 3, sel: '.cam .detect-box',          side: 'left',  align: 'center', nth: 1 },
      { n: 4, sel: '.cam .detect-box',          side: 'right', align: 'center', nth: 2 },
      { n: 5, sel: '.cam-top .pill:last-child', side: 'right', align: 'center' },
      { n: 6, sel: '.cam-modes',                side: 'left',  align: 'center' },
      { n: 7, sel: '.cam-hint',                 side: 'left',  align: 'top' },
      { n: 8, sel: '.cam-shutter',              side: 'right', align: 'center' },
    ],
    hciNote: `<b>Norman · mental model:</b> capture preserves the
      paper artefact rather than forcing retype.
      <b>Norman · gulf of execution:</b> the live OCR overlay and
      mode control tell the student what the camera will do
      <i>before</i> the shutter. Detection-box colour categorises
      what was found (blue for the printed question, purple for the
      student's own working, amber for stuck points); the shutter
      only commits what the boxes already show, and routing into
      Screen 03 means the AI never silently "answers" a captured
      question.`,
    evidence: `All four participants use paper or a tablet at some
      point: P1 attempts tutorials on paper before checking
      <span class="ref ev">P1 [I1:255]</span>; P2 prefers paper-style
      and hand-writes everything <span class="ref ev">P2 [I2:149, 193]</span>;
      P3 downloads tutorial PDFs and works at their desk
      <span class="ref ev">P3 [I3:137, 169]</span>; P4 uses an iPad with
      a smart pen <span class="ref ev">P4 [I4:175]</span>. A
      typed-input-only flow ignores the dominant medium.`,
    requirements: ['R3', 'R4', 'R6'],
    spec: (
      <>
        <div className="item"><b>Touch</b>Shutter is a 64 dp circular target. Mode segmented control switches the OCR pipeline live (no shutter press required to preview the new mode). Detection boxes are draggable on review (post-capture) with 8 dp corner handles.</div>
        <div className="item"><b>Transitions</b>Successful capture freezes the frame and reveals review mode (300 ms cross-fade). "Use this" → Screen 03 with the captured question pre-populated. "Retake" returns to live preview without losing the previous mode selection.</div>
        <div className="item"><b>Errors</b>Camera permission rejected: full-screen takeover with a guide to re-enable in OS settings, plus a "Use a photo from gallery" fallback. Low-light or paper-not-detected: shutter dimmed; corner guides pulse; hint replaced with corrective copy ("Too dark — turn on a light?" / "Frame the whole question and your working").</div>
        <div className="item"><b>Accessibility</b>Live OCR detection boxes are visual feedback only and not announced. A parallel <code>aria-live="polite"</code> summary announces the result on capture ("Question detected, your work detected, 1 stuck point detected"). Reduce-motion disables the box pulse and the cross-fade. Mode segmented control is a <code>role="tablist"</code> with text labels.</div>
      </>
    ),
  },
];

window.PAGES = PAGES;
window.Page = Page;
window.Cover = Cover;
