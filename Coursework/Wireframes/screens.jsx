/* StudyBuddy — wireframe screen components.
   Each screen returns the *contents* of a phone-screen (status bar +
   nav + scroll body + tabbar). Pages assemble these inside <Phone>. */

const StatusBar = () =>
<div className="statusbar">
    <span>22:47</span>
    <span className="right">
      <span className="signal"><i /><i /><i /><i /></span>
      <span style={{ fontSize: 10 }}>5G</span>
      <span className="icon"></span>
    </span>
  </div>;


const Brand = () =>
<span className="brand">
    <span className="mark"></span>
    StudyBuddy
  </span>;


const Nav = ({ title, left, right }) =>
<div className="nav">
    {left || <Brand />}
    <div className="right">{right}</div>
  </div>;


const TabBar = ({ active = 'home' }) =>
<div className="tabbar">
    <div className={`tab ${active === 'home' ? 'active' : ''}`}><span className="glyph">H</span>Today</div>
    <div className={`tab ${active === 'plan' ? 'active' : ''}`}><span className="glyph">P</span>Plan</div>
    <div className={`tab ${active === 'notes' ? 'active' : ''}`}><span className="glyph">N</span>Notes</div>
    <div className={`tab ${active === 'me' ? 'active' : ''}`}><span className="glyph">M</span>Me</div>
  </div>;


/* ============ Screen 1: Home / Tomorrow's briefing card ============ */

const ScreenHome = ({ variant = 'connected' }) => {
  if (variant === 'empty') {
    return (
      <>
        <StatusBar />
        <div className="app">
          <Nav right={<span className="icon-btn">?</span>} />
          <div className="scroll">
            <div className="col" style={{ gap: 4 }}>
              <span className="eyebrow">Sun · 22:47</span>
              <h1 className="h-screen-title">Welcome, Sam.</h1>
              <p className="muted" style={{ fontSize: 12, marginTop: 4 }}>
                StudyBuddy turns tomorrow's classes into a 5-minute briefing.
                Connect your university to begin.
              </p>
            </div>

            <div className="connect">
              <span className="eyebrow">Step 1: Connect sources</span>
              <div className="src-line">
                <span className="logo">M</span>
                <span className="name"><b>Moodle</b><span className="sub">Lecture slides, tutorials, labsheets</span></span>
                <span className="btn sm">Connect</span>
              </div>
              <div className="src-line">
                <span className="logo">T</span>
                <span className="name"><b>MyTimetable</b><span className="sub">Knows what you have tomorrow</span></span>
                <span className="btn sm">Connect</span>
              </div>
              <div className="src-line">
                <span className="logo">·</span>
                <span className="name"><b>Notes (optional)</b><span className="sub">Notion · iPad · Drive</span></span>
                <span className="btn-pair">
                  <span className="btn sm">Connect</span>
                  <span className="btn ghost sm">Skip</span>
                </span>
              </div>
            </div>

            <p className="tiny muted">
              StudyBuddy reads, never writes. You can disconnect any source from <u>Settings</u> at any time.
            </p>
          </div>
          <TabBar active="home" />
        </div>
      </>);

  }

  // connected
  return (
    <>
      <StatusBar />
      <div className="app">
        <Nav right={<><span className="icon-btn">⌕</span><span className="icon-btn">·</span></>} />
        <div className="scroll">
          <div className="col greeting" style={{ gap: 2 }}>
            <span className="eyebrow">Sun · 22:47 · synced 9 min ago</span>
            <h1 className="h-screen-title">Tomorrow,<br /><span style={{ color: 'var(--ink-3)' }}>two sessions.</span></h1>
          </div>

          <div className="briefing-card">
            <div className="session-head">
              <div>
                <div className="module">Engineering Mechanics · Tutorial 6</div>
                <div className="when">Mon · 11:00 → 12:30 · DRG12</div>
              </div>
              <span className="chip accent dot">Briefing ready</span>
            </div>
            <div className="ranges">
              <span className="chip">Kinematics</span>
              <span className="chip">SUVAT</span>
              <span className="chip">Vertical motion</span>
            </div>
            <div className="summary">
              Last week closed on the <b>SUVAT equations</b> and sign
              conventions. Tomorrow's tutorial reuses the
              <b> max-height</b> setup from L11.
            </div>
            <div className="row between">
              <span className="tiny muted">Est. prep · 35 min</span>
              <span className="chip">5 sources</span>
            </div>
            <div className="btn accent">Open briefing</div>
          </div>

          <div className="card">
            <div className="row between">
              <div>
                <div style={{ fontSize: 15, fontWeight: 500 }}>Sensors & Instrumentation: Lab 3</div>
                <div className="tiny muted">Mon · 14:00 · Lab B · strain gauges</div>
              </div>
              <span className="chip ok dot">Read-ahead</span>
            </div>
          </div>

          <div className="row between" style={{ marginTop: 2 }}>
            <span className="eyebrow">This week</span>
            <span className="tiny muted">3/5 · <span style={{ display: 'inline-block', width: 60, height: 4, background: 'var(--line)', borderRadius: 2, verticalAlign: 'middle', position: 'relative', overflow: 'hidden' }}><span style={{ position: 'absolute', inset: 0, width: '60%', background: 'var(--accent)' }} /></span></span>
          </div>
        </div>
        <TabBar active="home" />
      </div>
    </>);
};

/* ============ Screen 2: Briefing detail (recap + prep) ============ */

const ScreenBriefing = ({ variant = 'default' }) => {
  const isLoading = variant === 'loading';
  return (
    <>
      <StatusBar />
      <div className="app">
        <Nav
          left={<span className="brand"><span className="icon-btn" style={{ background: 'transparent', border: '1px solid var(--line)' }}>‹</span></span>}
          right={<><span className="icon-btn">↻</span><span className="icon-btn">⋯</span></>} />
        
        <div className="scroll">
          <div className="col" style={{ gap: 2 }}>
            <span className="eyebrow">Briefing · Mechanics T6</span>
            <h1 className="h-screen-title" style={{ fontSize: 20 }}>Vertical motion under gravity</h1>
            <span className="tiny muted">Mon 11:00 · Tutorial 6 · 5 sources</span>
          </div>

          <div className="card">
            <div className="row between">
              <span className="eyebrow">Last week recap</span>
              <span className="tiny muted">3 min read</span>
            </div>
            {isLoading ?
            <>
                <div className="skeleton" />
                <div className="skeleton short" />
                <div className="skeleton tall" />
              </> :

            <div className="recap">
                <div className="topic">
                  <span><b>SUVAT equations</b>: u, v, a, s, t.</span>
                  <span className="src">L11 · s.14</span>
                </div>
                <div className="topic">
                  <span><b>Sign convention</b>: take upward as positive.</span>
                  <span className="src">L11 · s.22</span>
                </div>
              </div>
            }
          </div>

          <div className="card">
            <div className="row between">
              <span className="eyebrow">For tomorrow: prep</span>
              <span className="chip accent">2 of 5</span>
            </div>
            <div className="prep">
              <div className="item done">
                <span className="check"></span>
                <span className="label">Re-read L11 slides 14–22</span>
                <span className="meta">8 min</span>
              </div>
              <div className="item done">
                <span className="check"></span>
                <span className="label">Skim T6 sheet, mark unknowns</span>
                <span className="meta">4 min</span>
              </div>
              <div className="item">
                <span className="check"></span>
                <span className="label">Attempt T6 Q1 (equation picker ready)</span>
                <span className="meta">10 min</span>
              </div>
              <div className="item">
                <span className="check"></span>
                <span className="label">Attempt T6 Q2 (worked example available)</span>
                <span className="meta">10 min</span>
              </div>
              <div className="item">
                <span className="check"></span>
                <span className="label">Compare to last year's exam Q3 (same topic)</span>
                <span className="meta">5 min</span>
              </div>
            </div>
          </div>

          <div className="row" style={{ gap: 8 }}>
            <div className="btn accent">Start prep</div>
            <div className="btn ghost" style={{ flex: '0 0 auto', width: 'auto' }}>Plan</div>
          </div>
        </div>
        <TabBar active="home" />
      </div>
    </>);

};

/* ============ Screen 3: Equation picker ============ */

const ScreenEquationPicker = () =>
<>
    <StatusBar />
    <div className="app">
      <Nav
      left={<span className="brand"><span className="icon-btn" style={{ background: 'transparent', border: '1px solid var(--line)' }}>‹</span></span>}
      right={<span className="icon-btn">?</span>} />
    
      <div className="scroll">
        <div className="col" style={{ gap: 2 }}>
          <span className="eyebrow">T6 · Question 1</span>
          <h1 className="h-screen-title" style={{ fontSize: 18, lineHeight: 1.25 }}>
            A ball is thrown straight up at u = 12 m/s. Find the maximum height reached. (g = 9.81 m/s²)
          </h1>
        </div>

        <div className="placeholder" style={{ height: 70 }}>diagram · ball, arrow up, ground line · from T6 sheet</div>

        <div className="row between">
          <span className="eyebrow">Which equation?</span>
          <span className="tiny muted">tap to select</span>
        </div>

        <div className="eq-list">
          <div className="eq-row selected">
            <div className="head">
              <span className="name">v² = u² + 2as</span>
              <span className="conf">match · 92%</span>
            </div>
            <div className="formula"><span className="v">v</span>² = <span className="v">u</span>² + 2<span className="v">a</span><span className="v">s</span></div>
            <div className="why">No t involved. With v = 0 at the peak, gives s in one step.</div>
          </div>
          <div className="eq-row">
            <div className="head">
              <span className="name">v = u + at</span>
              <span className="conf">support</span>
            </div>
            <div className="formula"><span className="v">v</span> = <span className="v">u</span> + <span className="v">a</span><span className="v">t</span></div>
            <div className="why">Useful for time-to-peak, but not the height directly.</div>
          </div>
          <div className="eq-row">
            <div className="head">
              <span className="name">s = ut + ½at²</span>
              <span className="conf muted">unlikely</span>
            </div>
            <div className="formula" style={{ color: 'var(--ink-3)' }}><span className="v">s</span> = <span className="v">u</span><span className="v">t</span> + ½<span className="v">a</span><span className="v">t</span>²</div>
            <div className="why" style={{ color: 'var(--ink-3)' }}>Needs t first; an extra step for no gain here.</div>
          </div>
        </div>

        <div className="row" style={{ gap: 8 }}>
          <div className="btn accent">Show working</div>
          <div className="btn ghost" style={{ flex: '0 0 auto', width: 'auto' }}>Pick another</div>
        </div>
      </div>
    </div>
  </>;


/* ============ Screen 4: Step-by-step worked solution ============ */

const ScreenStepByStep = ({ variant = 'default' }) => {
  const isError = variant === 'error';
  return (
    <>
      <StatusBar />
      <div className="app">
        <Nav
          left={<span className="brand"><span className="icon-btn" style={{ background: 'transparent', border: '1px solid var(--line)' }}>‹</span></span>}
          right={<><span className="icon-btn">↻</span><span className="icon-btn">⌃</span></>} />
        
        <div className="scroll">
          <div className="col" style={{ gap: 2 }}>
            <span className="eyebrow">T6 Q1 · Worked solution</span>
            <h1 className="h-screen-title" style={{ fontSize: 17, lineHeight: 1.3 }}>Maximum height of a vertical throw</h1>
            <span className="tiny muted">3 steps · drawn from L11 + textbook</span>
          </div>

          {isError &&
          <div className="error-banner">
              <span style={{ fontFamily: 'var(--mono)' }}>!</span>
              <span><b>Couldn't verify step 3 against L11.</b> The procedure
              is shown but not source-attributed. Review carefully or
              switch source.</span>
            </div>
          }

          <div className="steps">
            <div className="step">
              <div className="label">
                <span><span className="k">Step 1</span> &nbsp; <span className="name">Set up</span></span>
                <span className="src">L11 · s.14</span>
              </div>
              <div className="work">Take upward as positive. u = +12 m/s, a = -g = -9.81 m/s², v = 0 at the peak.</div>
              <div className="why">Sign convention fixed before any algebra.</div>
            </div>

            <div className="step">
              <div className="label">
                <span><span className="k">Step 2</span> &nbsp; <span className="name">Apply v² = u² + 2as</span></span>
                <span className="src">L11 · s.16–18</span>
              </div>
              <div className="work">0 = (12)² + 2·(-9.81)·s<br />19.62·s = 144</div>
              <div className="why">v = 0 at the peak removes t from the equation.</div>
            </div>

            <div className="step">
              <div className="label">
                <span><span className="k">Step 3</span> &nbsp; <span className="name">Solve for s</span></span>
                <span className={isError ? 'src' : 'src'} style={isError ? { background: 'var(--warn-tint)', color: 'oklch(0.4 0.1 50)' } : undefined}>
                  {isError ? 'unverified' : 'Textbook · §12.5'}
                </span>
              </div>
              <div className="work">s = 144 / 19.62 = <b>7.34 m</b></div>
              <div className="why">Positive value confirms the upward sign convention.</div>
            </div>
          </div>

          <div className="sources-tray">
            <div className="head">
              <h4><span className="dot" /> Sources for this solution</h4>
              <span className="ref" style={{ fontFamily: 'var(--mono)', fontSize: 10 }}>3 used</span>
            </div>
            <div className="src-item">
              <span className="badge">L11</span>
              <span className="name">Engineering Mechanics, <em>Lecture 11, slides 14–22</em></span>
              <span className="actions">open</span>
            </div>
            <div className="src-item">
              <span className="badge">TXT</span>
              <span className="name">Hibbeler · <em>Engineering Mechanics: Dynamics, §12.5</em></span>
              <span className="actions">open</span>
            </div>
            <div className="src-item">
              <span className="badge">AI</span>
              <span className="name">Procedure synthesis, <em>narration only</em></span>
              <span className="actions">override</span>
            </div>
          </div>

          <div className="row" style={{ gap: 8 }}>
            <div className="btn accent">I've got it</div>
            <div className="btn ghost" style={{ flex: '0 0 auto', width: 'auto' }}>Re-derive</div>
          </div>
        </div>
      </div>
    </>);

};

/* ============ Screen 5: Session plan / commit ============ */

const ScreenPlan = () =>
<>
    <StatusBar />
    <div className="app">
      <Nav right={<span className="icon-btn">⌗</span>} />
      <div className="scroll">
        <div className="col" style={{ gap: 2 }}>
          <span className="eyebrow">Tonight · before tomorrow</span>
          <h1 className="h-screen-title" style={{ fontSize: 20 }}>Plan tonight: 1h 35m</h1>
          <span className="tiny muted">Weighted by your perceived difficulty &amp; deadline.</span>
        </div>

        <div className="plan-bar">
          <div className="seg" style={{ flex: 35, background: 'oklch(0.55 0.13 250)' }}>35m</div>
          <div className="seg" style={{ flex: 25, background: 'oklch(0.62 0.11 250)' }}>25m</div>
          <div className="seg" style={{ flex: 20, background: 'oklch(0.7 0.09 250)' }}>20m</div>
          <div className="seg" style={{ flex: 15, background: 'oklch(0.78 0.07 80)', color: 'var(--ink)' }}>15m</div>
        </div>

        <div className="plan-list">
          <div className="plan-row">
            <div className="swatch" style={{ background: 'oklch(0.55 0.13 250)' }} />
            <div className="name">
              <b>Mech T6: SUVAT setup + Q1 walk-through</b>
              <span className="meta">hardest · ranked 4/5 by you · due 11:00</span>
            </div>
            <div className="time">35m</div>
          </div>
          <div className="plan-row">
            <div className="swatch" style={{ background: 'oklch(0.62 0.11 250)' }} />
            <div className="name">
              <b>Mech T6: Q2, Q3 attempt</b>
              <span className="meta">attempt → check · 2 worked examples staged</span>
            </div>
            <div className="time">25m</div>
          </div>
          <div className="plan-row">
            <div className="swatch" style={{ background: 'oklch(0.7 0.09 250)' }} />
            <div className="name">
              <b>Sensors L4: read-ahead</b>
              <span className="meta">labsheet released 2h ago · 8 pages</span>
            </div>
            <div className="time">20m</div>
          </div>
          <div className="plan-row">
            <div className="swatch" style={{ background: 'oklch(0.78 0.07 80)' }} />
            <div className="name">
              <b>Buffer + last-session refresher</b>
              <span className="meta">opens with what you marked yesterday</span>
            </div>
            <div className="time">15m</div>
          </div>
        </div>

        <div className="row" style={{ gap: 8 }}>
          <div className="btn accent">Commit plan</div>
          <div className="btn ghost" style={{ flex: '0 0 auto', width: 'auto' }}>Adjust</div>
        </div>
        <div className="tiny muted" style={{ textAlign: 'center' }}>Skip planning · go straight in</div>
      </div>
      <TabBar active="plan" />
    </div>
  </>;


/* ============ Screen 6: Wrap-up / felt readiness ============ */

const ScreenWrapUp = () =>
<>
    <StatusBar />
    <div className="app">
      <Nav right={<span className="icon-btn">×</span>} />
      <div className="scroll">
        <div className="col" style={{ gap: 2 }}>
          <span className="eyebrow">Wrap-up · 1h 32m studied</span>
          <h1 className="h-screen-title" style={{ fontSize: 20 }}>How ready do you feel<br />for tomorrow?</h1>
        </div>

        <div className="card">
          <span className="eyebrow">Felt readiness</span>
          <div className="scale">
            <div className="opt">1<small>shaky</small></div>
            <div className="opt">2<small></small></div>
            <div className="opt">3<small></small></div>
            <div className="opt sel">4<small>solid</small></div>
            <div className="opt">5<small>fluent</small></div>
          </div>
          <div className="tiny muted">
            Self-rating only. Feeds tomorrow's briefing; low scores get more recap.
          </div>
        </div>

        <div className="card">
          <span className="eyebrow">What you covered</span>
          <div className="outcome-row">
            <div>
              <b>SUVAT setup · sign convention</b>
              <div className="tiny muted">3 worked examples</div>
            </div>
            <div className="pill-set">
              <span className="pill">?</span>
              <span className="pill">~</span>
              <span className="pill sel ok">✓</span>
            </div>
          </div>
          <div className="outcome-row">
            <div>
              <b>Vertical-throw max height</b>
              <div className="tiny muted">1 worked, 1 attempted</div>
            </div>
            <div className="pill-set">
              <span className="pill">?</span>
              <span className="pill sel warn">~</span>
              <span className="pill">✓</span>
            </div>
          </div>
        </div>

        <div className="row" style={{ gap: 8 }}>
          <div className="btn accent">Save &amp; close</div>
          <div className="btn ghost" style={{ flex: '0 0 auto', width: 'auto' }}>Skip</div>
        </div>
        <div className="tiny muted" style={{ textAlign: 'center' }}>Feeds tomorrow's briefing in 23h.</div>
      </div>
      <TabBar active="home" />
    </div>
  </>;


/* ============ Screen 3: Capture — point camera at paper ============ */

const ScreenCapture = ({ variant = 'detecting' }) =>
<>
    <StatusBar />
    <div className="app">
      <div className="cam">
        <div className="cam-top">
          <span className="pill">‹ Back</span>
          <span className="pill"><span className="dot"></span> T6 · Q1</span>
        </div>
        <div className="vp">
          <div className="corner tl" /><div className="corner tr" />
          <div className="corner bl" /><div className="corner br" />

          <div className="paper">
            <div className="qno">Tutorial 6, Q1</div>
            <div className="handw">A ball is thrown straight up with<br />initial speed u = 12 m/s.</div>
            <div className="handw">Find the maximum height. (g = 9.81 m/s²)</div>
            <div style={{ height: 6 }} />
            <div className="scribble">v² = u² + 2as</div>
            <div className="scribble" style={{ textDecoration: 'line-through', opacity: 0.6 }}>s = ut + ½at²</div>
            <div className="scribble" style={{ color: 'oklch(0.45 0.15 28)' }}>?? stuck</div>
          </div>

          {/* OCR detection bounding boxes — hug the actual paper text + match paper tilt */}
          <div className="detect-box" style={{ top: '18%', left: '7%', width: '64%', height: '15%', transform: 'rotate(-8deg)' }}>
            <span className="lbl">question · 92%</span>
          </div>
          <div className="detect-box" style={{ top: '38%', left: '11%', width: '44%', height: '6%', transform: 'rotate(-8deg)', borderColor: '#8b5cf6', background: 'rgba(139,92,246,0.10)' }}>
            <span className="lbl" style={{ background: '#8b5cf6' }}>your work</span>
          </div>
          <div className="detect-box" style={{ top: '46%', left: '11%', width: '48%', height: '9%', transform: 'rotate(-8deg)', borderColor: '#fca5a5', background: 'rgba(239,68,68,0.10)' }}>
            <span className="lbl" style={{ background: '#dc2626' }}>stuck point</span>
          </div>
        </div>
      </div>

      <div className="cam-bottom">
        <div className="cam-hint">Point at your tutorial question. Hold steady; we'll detect handwriting too.</div>
        <div className="cam-modes">
          <div className="m">Question</div>
          <div className="m sel">Question + my work</div>
          <div className="m">Diagram</div>
        </div>
        <div className="cam-shutter">
          <span className="side">⌗</span>
          <span className="btn-shoot"></span>
          <span className="side">↑</span>
        </div>
      </div>
    </div>
  </>;


Object.assign(window, {
  ScreenHome, ScreenBriefing, ScreenEquationPicker,
  ScreenStepByStep, ScreenPlan, ScreenWrapUp,
  ScreenCapture
});