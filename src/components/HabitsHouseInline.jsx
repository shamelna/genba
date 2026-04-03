import React, { useState, useCallback, useRef } from 'react';

// ─── Data ─────────────────────────────────────────────────────────────────────

const FOUNDATION = [
  { id: 1, icon: '🪞', label: 'Self-\nReflection', title: 'Habit 1 · Self-Reflection (HANSEI)', desc: 'Honest self-reflection is the foundation of all growth. HANSEI means acknowledging mistakes, understanding root causes, and genuinely committing to do better.', practice: 'End each day: What went well? What could I improve? What will I do differently?' },
  { id: 2, icon: '🙏', label: 'Humility &\nGratitude', title: 'Habit 2 · Humility & Gratitude', desc: 'Humble leaders earn deep trust. Gratitude amplifies positivity and builds genuine human connection. Together they create conditions where people feel genuinely valued.', practice: 'Acknowledge one person each day. Approach every interaction with curiosity rather than certainty.' },
  { id: 3, icon: '🏛️', label: 'Building\nIntegrity', title: 'Habit 3 · Building Your Integrity', desc: 'Integrity is alignment between your words and your actions — especially when no one is watching. When leaders consistently do what they say, trust builds naturally.', practice: 'Keep every commitment, no matter how small. Say what you mean and mean what you say.' },
  { id: 4, icon: '🤲', label: 'Respect &\nMutual Trust', title: 'Habit 4 · Respect & Mutual Trust', desc: 'Respect creates the psychological safety that teams need to speak up, take risks, and innovate. Mutual trust is the most powerful force in any high-performing team.', practice: 'Listen without interrupting. Follow through on every promise. Treat every person with equal dignity.' },
];

const TRIBE = [
  { id: 5, icon: '📊', label: 'Managing\nVisualisation', title: 'Habit 5 · Managing through Visualisation', desc: 'Visual management makes the invisible visible. When work, progress, and problems are displayed in real time, teams can self-manage and spot issues early.', practice: 'Create dashboards any team member can read at a glance. Update them every day.' },
  { id: 6, icon: '👥', label: 'Building\nthe Tribe', title: 'Habit 6 · Building & Leading the Tribe', desc: "Great leaders build teams with a shared identity, purpose, and values. When people feel they truly belong, their discretionary effort and loyalty increase dramatically.", practice: "Define your team's purpose together. Create rituals that reinforce belonging and shared commitment." },
  { id: 7, icon: '❤️', label: 'Caring for\nOthers', title: 'Habit 7 · Caring for Others', desc: 'Genuine care for people is the foundation of sustainable high performance. Leaders who invest in their team create deep psychological safety and true engagement.', practice: 'Check in with your team as people, not just performers. Ask about their challenges and aspirations.' },
  { id: 8, icon: '🎉', label: 'Celebrating', title: 'Habit 8 · Celebrating', desc: 'Celebration acknowledges progress and reinforces the behaviors you want to see more of. It creates energy, momentum, and a culture where wins are genuinely honored.', practice: 'Catch people doing things right. Celebrate improvements, not just outcomes.' },
];

const PROBLEM_SOLVING = [
  { id: 9,  icon: '🌊', label: 'Improving\nFlow', title: 'Habit 9 · Improving Flow (SPQDC)', desc: 'SPQDC — Safety, People, Quality, Delivery, Cost — is the framework for managing flow. Leaders who improve flow eliminate waste and ensure value reaches customers efficiently.', practice: 'Map your value stream. Find the biggest bottleneck. Focus improvement exactly there.' },
  { id: 10, icon: '🧑‍🏫', label: 'Problem-\nSolving Coach', title: 'Habit 10 · Being a Problem-Solving Coach', desc: "The best leaders don't solve problems for their teams — they coach teams to solve problems themselves. This builds lasting capability and a self-sustaining culture of improvement.", practice: "When someone brings you a problem, respond with questions, not answers." },
  { id: 11, icon: '🔢', label: 'Knowing the\nNumbers', title: 'Habit 11 · Knowing the Numbers', desc: 'Data-driven leadership means understanding the metrics that truly matter. Knowing your numbers keeps you anchored in reality and protects against decisions based on assumptions.', practice: 'Identify 3–5 key metrics for success. Review them daily and understand the story they tell.' },
  { id: 12, icon: '🦊', label: 'Facts &\nRoot Causes', title: 'Habit 12 · Focusing on Facts & Root Causes', desc: '"Foxes" are clever, hidden problems that quietly erode performance. Leaders who focus on root causes eliminate problems permanently rather than patching them repeatedly.', practice: 'Use the 5-Why method. Always verify with real data before drawing any conclusion.' },
];

const CULTURE = [
  { id: 13, icon: '⛰️', quadrant: 'topLeft',     label: 'PDCA\nKAIZEN',       title: 'Habit 13 · Climbing the Mountain (PDCA–KAIZEN)', desc: 'PDCA + Kaizen is how organizations climb to new performance levels. Each improvement cycle is a deliberate step — small, disciplined, and compounding into transformational change.', practice: 'Run one structured PDCA cycle per month. Document and share learnings.' },
  { id: 14, icon: '🤝', quadrant: 'topRight',    label: 'Engaging\nOthers',    title: 'Habit 14 · Engaging Others', desc: 'Change happens through people, not to them. Genuinely involving others in decisions means they own the outcome — and sustain it.', practice: "Before any change, ask: 'Who will be affected, and how can I involve them?'" },
  { id: 15, icon: '🔔', quadrant: 'bottomLeft',  label: 'Supporting\nANDON',   title: 'Habit 15 · Supporting Others (ANDON)', desc: 'ANDON makes it safe and easy to signal problems and ask for help immediately. Leaders who respond quickly build a culture where problems are surfaced early — never hidden.', practice: 'Create low-friction ways to signal when help is needed. Respond promptly — every time.' },
  { id: 16, icon: '🌐', quadrant: 'bottomRight', label: 'Best Practices\nYOKOTEN', title: 'Habit 16 · Sharing Best Practices (YOKOTEN)', desc: 'YOKOTEN means spreading successful improvements horizontally across teams. Leaders who practice Yokoten accelerate learning and eliminate reinventing the wheel.', practice: "When an improvement works, ask: 'Where else could this apply?' Then replicate it." },
];

const PILLAR_INFO = {
  roof:           { icon: '🎯', title: 'Meaningful Impact', desc: 'The ultimate purpose of the Genba Ikigai framework — creating meaningful, lasting change in individuals and organizations. All 16 habits work in harmony to make this vision possible.', practice: 'Ask yourself: Is my leadership creating real, lasting change in the people around me?' },
  foundation:     { icon: '🧠', title: 'Leading Self – The Foundation', desc: 'Everything starts with leading yourself. Through deep reflection, humility, integrity, and respect, you build the bedrock on which all other leadership capability stands.', practice: 'Invest in your inner development every day. Your character is the foundation everything is built upon.' },
  tribe:          { icon: '⭐', title: 'Leading the Tribe', desc: 'Leading the Tribe is about creating conditions where teams genuinely thrive — through visualisation, authentic care, joyful celebration, and a strong shared identity.', practice: 'Ask your team: Do you feel seen, valued, and part of something meaningful here?' },
  problemSolving: { icon: '💡', title: 'Leading Through Problem-Solving', desc: 'Problem-solving leadership uses structured thinking, real data, and coaching mastery to build lasting capability. Every challenge becomes a learning opportunity.', practice: 'The next time a problem surfaces, coach your team to find and own the solution.' },
  culture:        { icon: '🌱', title: 'Culture Change', desc: 'Sustainable culture change emerges through PDCA, engaging others, supporting via ANDON, and spreading best practices via Yokoten. These four habits are the engine of transformation.', practice: 'Culture is not what you say — it is what you do every day. Choose your behaviors deliberately.' },
};

// ─── Floating popup ───────────────────────────────────────────────────────────
// Rendered as position:fixed just above the nav. Hoverable so it stays open
// when the mouse moves from a habit tile onto the popup itself.

function HabitPopup({ active, onEnter, onLeave, onClose }) {
  if (!active) return null;
  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        position: 'fixed',
        bottom: 84,
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'calc(100vw - 32px)',
        maxWidth: 440,
        background: '#1C2B3A',
        border: '1px solid rgba(74,100,120,0.7)',
        borderTop: '3px solid #FFD559',
        borderRadius: 12,
        boxShadow: '0 -6px 40px rgba(0,0,0,0.75)',
        padding: '13px 15px 15px',
        zIndex: 9998,
        cursor: 'default',
      }}
    >
      {/* Close tap target for mobile */}
      <button
        onClick={onClose}
        style={{
          position: 'absolute', top: 8, right: 8,
          width: 22, height: 22, borderRadius: '50%',
          background: '#2E4156', border: '1px solid #4A6478',
          color: '#8BA0B2', fontSize: 11, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          lineHeight: 1,
        }}
      >
        ✕
      </button>

      <div style={{ display: 'flex', gap: 11, alignItems: 'flex-start' }}>
        <div style={{
          width: 36, height: 36, flexShrink: 0,
          background: '#253545', border: '1px solid #4A6478',
          borderRadius: '50%', display: 'flex', alignItems: 'center',
          justifyContent: 'center', fontSize: 17,
        }}>
          {active.icon}
        </div>
        <div style={{ flex: 1, minWidth: 0, paddingRight: 16 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: '#FFD559', letterSpacing: '0.04em', marginBottom: 4 }}>
            {active.title}
          </p>
          <p style={{ fontSize: 11, color: '#C8D8E4', lineHeight: 1.6, marginBottom: 8 }}>
            {active.desc}
          </p>
          <div style={{
            background: '#253545', borderLeft: '3px solid #FFD559',
            borderRadius: '0 6px 6px 0', padding: '6px 10px',
            fontSize: 10.5, color: '#7A9BB0', lineHeight: 1.5,
          }}>
            <span style={{ color: '#FFD559', fontWeight: 700 }}>Practice: </span>
            {active.practice}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Habit tile ────────────────────────────────────────────────────────────────

function HabitTile({ habit, isActive, isHighlighted, onEnter, onLeave, onTap }) {
  return (
    <div
      onMouseEnter={() => onEnter(habit)}
      onMouseLeave={onLeave}
      onClick={() => onTap(habit)}
      style={{
        background: isActive ? '#3A5269' : isHighlighted ? 'rgba(255,213,89,0.08)' : '#253545',
        border: `1px solid ${isActive ? '#FFD559' : isHighlighted ? 'rgba(255,213,89,0.4)' : '#3A5269'}`,
        borderRadius: 7,
        padding: '5px 5px',
        cursor: 'pointer',
        transition: 'background 0.12s, border-color 0.12s',
        boxShadow: isActive ? '0 0 8px rgba(255,213,89,0.25)' : isHighlighted ? '0 0 5px rgba(255,213,89,0.1)' : 'none',
        userSelect: 'none',
        textAlign: 'center',
      }}
    >
      <div style={{ fontSize: 13, lineHeight: 1, marginBottom: 2 }}>{habit.icon}</div>
      <div style={{ fontSize: 7.5, color: '#FFD559', fontWeight: 700, letterSpacing: '0.05em', marginBottom: 1 }}>
        #{habit.id}
      </div>
      <div style={{ fontSize: 8, color: '#C8D8E4', lineHeight: 1.3, whiteSpace: 'pre-line' }}>
        {habit.label}
      </div>
    </div>
  );
}

// ─── Pillar header ─────────────────────────────────────────────────────────────

function PillarTile({ icon, label, info, isActive, isHighlighted, onEnter, onLeave, onTap }) {
  return (
    <div
      onMouseEnter={() => onEnter(info)}
      onMouseLeave={onLeave}
      onClick={() => onTap(info)}
      style={{
        background: isActive ? '#3A5269' : isHighlighted ? 'rgba(255,213,89,0.1)' : '#1E3040',
        border: `1px solid ${isActive ? '#FFD559' : isHighlighted ? 'rgba(255,213,89,0.45)' : '#2E4156'}`,
        borderRadius: 7,
        padding: '5px 4px',
        textAlign: 'center',
        cursor: 'pointer',
        transition: 'background 0.12s, border-color 0.12s',
        boxShadow: isActive ? '0 0 8px rgba(255,213,89,0.25)' : isHighlighted ? '0 0 6px rgba(255,213,89,0.15)' : 'none',
        userSelect: 'none',
        marginBottom: 4,
      }}
    >
      <div style={{ fontSize: 11, marginBottom: 2 }}>{icon}</div>
      <div style={{
        fontSize: 7.5, fontWeight: 800, color: isHighlighted ? '#FFD559' : '#E8EFF5',
        letterSpacing: '0.06em', textTransform: 'uppercase',
        lineHeight: 1.3, whiteSpace: 'pre-line',
      }}>
        {label}
      </div>
    </div>
  );
}

// ─── Culture circle ────────────────────────────────────────────────────────────
// At inline widths the overlapping absolute layout becomes unreadable.
// Use a clean 2×2 grid with a faint decorative ring in the background.

function CultureCircle({ habits, onEnter, onLeave, onTap, activeId, isHighlighted }) {
  const order = ['topLeft', 'topRight', 'bottomLeft', 'bottomRight'];
  const byQ = {};
  habits.forEach(h => { byQ[h.quadrant] = h; });

  return (
    <div style={{ position: 'relative' }}>
      {/* Faint decorative ring — purely visual, behind the tiles */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%,-50%)',
        pointerEvents: 'none', zIndex: 0,
      }}>
        <svg width="68" height="68" viewBox="0 0 68 68" style={{ opacity: 0.18 }}>
          <circle cx="34" cy="34" r="32" fill="none" stroke="#4A6478" strokeWidth="1.5" />
          <line x1="34" y1="2"  x2="34" y2="66" stroke="#4A6478" strokeWidth="1" />
          <line x1="2"  y1="34" x2="66" y2="34" stroke="#4A6478" strokeWidth="1" />
        </svg>
      </div>

      {/* 2×2 grid — clearly separated, no overlap */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 3,
        position: 'relative', zIndex: 1,
      }}>
        {order.map(q => {
          const h = byQ[q];
          if (!h) return null;
          return (
            <HabitTile key={h.id} habit={h} isActive={activeId === h.id}
              isHighlighted={isHighlighted}
              onEnter={onEnter} onLeave={onLeave} onTap={onTap} />
          );
        })}
      </div>
    </div>
  );
}

// ─── Module → highlighted section mapping ────────────────────────────────────
// Maps a moduleId to which habits/pillar should show the amber "active" ring
const MODULE_HIGHLIGHT = {
  'introduction':    'foundation',   // habits 1-4
  'leading-self':    'foundation',   // habits 1-4
  'leading-tribe':   'tribe',        // habits 5-8
  'problem-solving': 'problemSolving', // habits 9-12
  'culture-change':  'culture',      // habits 13-16
};

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function HabitsHouseInline({ currentModuleId }) {
  const [active, setActive] = useState(null);
  const timerRef = useRef(null);

  // Which section to auto-highlight based on the student's active module
  const highlightSection = currentModuleId ? MODULE_HIGHLIGHT[currentModuleId] : null;

  // Shared helpers — any enter cancels the pending close, any leave starts it.
  // 280ms delay is long enough to cross between adjacent elements comfortably.
  const enter = useCallback((item) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setActive(item);
  }, []);

  const leave = useCallback(() => {
    timerRef.current = setTimeout(() => setActive(null), 280);
  }, []);

  // Mobile tap: toggle the popup for that item
  const tap = useCallback((item) => {
    setActive(prev => (prev === item ? null : item));
  }, []);

  const close = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setActive(null);
  }, []);

  const activeId = active?.id;

  return (
    <>
      {/* ── Constrained-width house ── */}
      <div style={{ maxWidth: 408, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 7 }}>
          <p style={{ fontSize: 9.5, color: '#7A9BB0', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            16 Leadership Habits
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            {highlightSection && (
              <span style={{
                fontSize: 7.5, color: '#FFD559', fontWeight: 700,
                background: 'rgba(255,213,89,0.12)', border: '1px solid rgba(255,213,89,0.3)',
                borderRadius: 4, padding: '1px 5px', letterSpacing: '0.05em',
              }}>
                YOUR MODULE
              </span>
            )}
            <p style={{ fontSize: 8.5, color: '#4A6478' }}>Tap or hover to explore</p>
          </div>
        </div>

        {/* Roof */}
        <PillarTile
          icon="🎯"
          label="Meaningful Impact"
          info={PILLAR_INFO.roof}
          isActive={active === PILLAR_INFO.roof}
          onEnter={enter}
          onLeave={leave}
          onTap={tap}
        />

        {/* 3-column body */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 4, marginBottom: 4 }}>

          {/* Left — Tribe */}
          <div style={{
            background: '#192838',
            border: `1px solid ${highlightSection === 'tribe' ? 'rgba(255,213,89,0.35)' : '#253545'}`,
            borderRadius: 8, padding: '5px 4px',
            display: 'flex', flexDirection: 'column', gap: 3,
          }}>
            <PillarTile
              icon="⭐" label={'Leading\nTribe'}
              info={PILLAR_INFO.tribe}
              isActive={active === PILLAR_INFO.tribe}
              isHighlighted={highlightSection === 'tribe'}
              onEnter={enter} onLeave={leave} onTap={tap}
            />
            {TRIBE.map(h => (
              <HabitTile key={h.id} habit={h} isActive={activeId === h.id}
                isHighlighted={highlightSection === 'tribe'}
                onEnter={enter} onLeave={leave} onTap={tap} />
            ))}
          </div>

          {/* Centre — Culture Change */}
          <div style={{
            background: '#192838',
            border: `1px solid ${highlightSection === 'culture' ? 'rgba(255,213,89,0.35)' : '#253545'}`,
            borderRadius: 8, padding: '5px 4px',
            display: 'flex', flexDirection: 'column',
          }}>
            <PillarTile
              icon="🌱" label={'Culture\nChange'}
              info={PILLAR_INFO.culture}
              isActive={active === PILLAR_INFO.culture}
              isHighlighted={highlightSection === 'culture'}
              onEnter={enter} onLeave={leave} onTap={tap}
            />
            <CultureCircle
              habits={CULTURE} activeId={activeId}
              isHighlighted={highlightSection === 'culture'}
              onEnter={enter} onLeave={leave} onTap={tap}
            />
          </div>

          {/* Right — Problem Solving */}
          <div style={{
            background: '#192838',
            border: `1px solid ${highlightSection === 'problemSolving' ? 'rgba(255,213,89,0.35)' : '#253545'}`,
            borderRadius: 8, padding: '5px 4px',
            display: 'flex', flexDirection: 'column', gap: 3,
          }}>
            <PillarTile
              icon="💡" label={'Problem\nSolving'}
              info={PILLAR_INFO.problemSolving}
              isActive={active === PILLAR_INFO.problemSolving}
              isHighlighted={highlightSection === 'problemSolving'}
              onEnter={enter} onLeave={leave} onTap={tap}
            />
            {PROBLEM_SOLVING.map(h => (
              <HabitTile key={h.id} habit={h} isActive={activeId === h.id}
                isHighlighted={highlightSection === 'problemSolving'}
                onEnter={enter} onLeave={leave} onTap={tap} />
            ))}
          </div>
        </div>

        {/* Foundation */}
        <div style={{
          background: '#192838',
          border: `1px solid ${highlightSection === 'foundation' ? 'rgba(255,213,89,0.35)' : '#253545'}`,
          borderRadius: 8, padding: '5px 7px',
        }}>
          <PillarTile
            icon="🧠" label="Leading Self — THE FOUNDATION"
            info={PILLAR_INFO.foundation}
            isActive={active === PILLAR_INFO.foundation}
            isHighlighted={highlightSection === 'foundation'}
            onEnter={enter} onLeave={leave} onTap={tap}
          />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 4 }}>
            {FOUNDATION.map(h => (
              <HabitTile key={h.id} habit={h} isActive={activeId === h.id}
                isHighlighted={highlightSection === 'foundation'}
                onEnter={enter} onLeave={leave} onTap={tap} />
            ))}
          </div>
        </div>

      </div>

      {/* ── Floating popup — lives outside the house div so it can be hovered
           independently without interfering with the house layout ── */}
      <HabitPopup
        active={active}
        onEnter={() => { if (timerRef.current) clearTimeout(timerRef.current); }}
        onLeave={leave}
        onClose={close}
      />
    </>
  );
}
