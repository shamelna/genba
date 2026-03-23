import React, { useState, useCallback } from 'react';

// ─── 16 Habits Data ────────────────────────────────────────────────────────────

const FOUNDATION = [
  {
    id: 1, icon: '🪞',
    label: 'Self-Reflection\nHANSEI',
    title: 'Habit 1 · Self-Reflection (HANSEI)',
    desc: 'Honest self-reflection is the foundation of all growth. HANSEI — the Japanese practice of deep reflection — means acknowledging mistakes, understanding their root causes, and genuinely committing to do better. Leaders who reflect deeply create a culture where learning never stops.',
    practice: 'End each day with three questions: What went well? What could I improve? What will I do differently tomorrow?'
  },
  {
    id: 2, icon: '🙏',
    label: 'Humility &\nGratitude',
    title: 'Habit 2 · Humility & Gratitude',
    desc: 'Humble leaders earn deep trust and loyalty. Gratitude amplifies positivity and builds genuine human connection. Together, they create the conditions where people feel genuinely valued — and willingly give their best.',
    practice: 'Acknowledge one person each day for their contribution. Approach every interaction with curiosity rather than certainty.'
  },
  {
    id: 3, icon: '🏛️',
    label: 'Building Your\nIntegrity',
    title: 'Habit 3 · Building Your Integrity',
    desc: 'Integrity is alignment between your words and your actions — especially when no one is watching. When leaders consistently do what they say, trust builds naturally and becomes the invisible glue of the entire team.',
    practice: 'Keep every commitment, no matter how small. Say what you mean and mean what you say — every single time.'
  },
  {
    id: 4, icon: '🤲',
    label: 'Respect &\nMutual Trust',
    title: 'Habit 4 · Respect & Mutual Trust',
    desc: 'Respect creates the psychological safety that teams need to speak up, take risks, and innovate. Mutual trust is built through consistent, fair, and transparent behavior over time — and it is the most powerful force in any high-performing team.',
    practice: 'Listen without interrupting. Follow through on every promise. Treat every person at every level with equal dignity.'
  },
];

const TRIBE = [
  {
    id: 5, icon: '📊',
    label: 'Managing through\nVisualisation',
    title: 'Habit 5 · Managing through Visualisation',
    desc: 'Visual management makes the invisible visible. When work, progress, and problems are displayed in real time, teams can self-manage, spot issues early, and respond quickly — without waiting for instructions from a leader.',
    practice: 'Create dashboards and visual boards that any team member can read at a glance. Update them every single day.'
  },
  {
    id: 6, icon: '👥',
    label: 'Building &\nLeading the Tribe',
    title: 'Habit 6 · Building & Leading the Tribe',
    desc: 'Great leaders build teams with a shared identity, purpose, and values — a tribe. When people feel they truly belong to something meaningful, their discretionary effort, creativity, and loyalty increase dramatically.',
    practice: "Define your team's purpose together. Create rituals that reinforce identity, belonging, and shared commitment to excellence."
  },
  {
    id: 7, icon: '❤️',
    label: 'Caring for Others',
    title: 'Habit 7 · Caring for Others',
    desc: 'Genuine care for people is the foundation of sustainable high performance. Leaders who invest in the well-being, growth, and success of their team members create an environment of deep psychological safety and true engagement.',
    practice: 'Check in with your team as people, not just performers. Ask regularly about their challenges, aspirations, and well-being.'
  },
  {
    id: 8, icon: '🎉',
    label: 'Celebrating',
    title: 'Habit 8 · Celebrating',
    desc: 'Celebration acknowledges progress and reinforces the behaviors you want to see more of. It creates energy, momentum, and a culture where effort is noticed and wins — big and small — are genuinely and consistently honored.',
    practice: 'Catch people doing things right. Celebrate improvements, not just outcomes. Make recognition a daily, visible habit.'
  },
];

const PROBLEM_SOLVING = [
  {
    id: 9, icon: '🌊',
    label: 'Improving Flow\nSPQDC',
    title: 'Habit 9 · Improving Flow (SPQDC)',
    desc: "SPQDC — Safety, People, Quality, Delivery, Cost — is the leader's framework for managing flow and performance. Leaders who improve flow eliminate waste, reduce delays, and ensure value reaches customers efficiently and reliably.",
    practice: 'Map your value stream. Identify the biggest bottleneck. Focus your improvement energy exactly where flow is most constrained.'
  },
  {
    id: 10, icon: '🧑‍🏫',
    label: 'Being a\nProblem-Solving Coach',
    title: 'Habit 10 · Being a Problem-Solving Coach',
    desc: "The best leaders don't solve problems for their teams — they coach their teams to solve problems themselves. This builds lasting capability, true ownership, and a self-sustaining culture of continuous improvement.",
    practice: "When someone brings you a problem, respond with questions, not answers. Guide their thinking — don't direct their actions."
  },
  {
    id: 11, icon: '🔢',
    label: 'Knowing the\nNumbers',
    title: 'Habit 11 · Knowing the Numbers',
    desc: 'Data-driven leadership means understanding the metrics that truly matter and using them to make informed decisions. Knowing your numbers keeps you anchored in reality and protects against decisions based on assumptions.',
    practice: 'Identify the 3–5 key metrics that define success in your area. Review them daily and understand the story they tell.'
  },
  {
    id: 12, icon: '🦊',
    label: 'Focusing on Facts\n& Root Causes',
    title: 'Habit 12 · Focusing on Facts & Root Causes',
    desc: '"Foxes" are the clever, hidden problems that quietly erode performance over time. Leaders who focus on facts and root causes — not symptoms or assumptions — can eliminate problems permanently rather than patching them repeatedly.',
    practice: 'Use the 5-Why method to dig beneath surface problems. Always verify with real data before drawing any conclusion.'
  },
];

const CULTURE = [
  {
    id: 13, icon: '⛰️', quadrant: 'topLeft',
    label: 'Climbing the Mountain\n(PDCA – KAIZEN)',
    title: 'Habit 13 · Climbing the Mountain (PDCA – KAIZEN)',
    desc: 'PDCA (Plan-Do-Check-Act) combined with Kaizen is how organizations climb to new levels of performance. Each improvement cycle is a deliberate step up the mountain — small, disciplined, and compounding over time into transformational change.',
    practice: 'Run at least one structured PDCA cycle per month on a meaningful challenge. Document learnings and share them widely.'
  },
  {
    id: 14, icon: '🤝', quadrant: 'topRight',
    label: 'Engaging Others',
    title: 'Habit 14 · Engaging Others',
    desc: 'Change happens through people, not to them. Engaging others means genuinely involving them in decisions, improvement ideas, and problem solving. When people help shape the solution, they own the outcome — and they sustain it.',
    practice: "Before any change, ask: 'Who will be affected, and how can I involve them in designing the solution?'"
  },
  {
    id: 15, icon: '🔔', quadrant: 'bottomLeft',
    label: 'Supporting Others\n(ANDON)',
    title: 'Habit 15 · Supporting Others (ANDON)',
    desc: 'ANDON is the practice of making it safe and easy to signal problems and ask for help — immediately. Leaders who respond quickly to andon calls build a culture of trust where problems are surfaced early and never hidden.',
    practice: 'Create clear, low-friction ways for your team to signal when they need help. Respond visibly and promptly — every single time.'
  },
  {
    id: 16, icon: '🌐', quadrant: 'bottomRight',
    label: 'Sharing Best Practices\n(YOKOTEN)',
    title: 'Habit 16 · Sharing Best Practices (YOKOTEN)',
    desc: 'YOKOTEN means horizontal deployment — spreading successful improvements across teams, departments, and sites. Leaders who practice Yokoten accelerate organizational learning and eliminate the waste of reinventing the wheel.',
    practice: "When an improvement works, ask: 'Where else could this apply?' Then actively help replicate it across the organization."
  },
];

const PILLAR_INFO = {
  roof: {
    icon: '🎯',
    title: 'Meaningful Impact',
    desc: 'The ultimate purpose of the Genba Ikigai leadership framework — creating meaningful, lasting change in individuals and organizations. All 16 habits work in harmony, each reinforcing the others, to make this vision possible.',
    practice: 'Ask yourself regularly: Is my leadership creating real, lasting change in the people around me and in the organization?'
  },
  foundation: {
    icon: '🧠',
    title: 'Leading Self – The Foundation',
    desc: 'Everything starts with leading yourself. Through deep reflection (HANSEI), humility, integrity, and respect, you build the bedrock on which all other leadership capability stands. You cannot lead others sustainably without first mastering the art of leading yourself.',
    practice: 'Invest in your inner development every day. Your character is the foundation everything else is built upon.'
  },
  tribe: {
    icon: '⭐',
    title: 'Leading the Tribe',
    desc: 'Leading the Tribe is about creating the conditions where teams genuinely thrive. Through visualisation, authentic care for people, joyful celebration, and a strong shared identity, leaders build the human foundation for sustained, world-class performance.',
    practice: 'Ask your team: Do you feel seen, valued, and part of something meaningful here? Their answer is your leadership report card.'
  },
  problemSolving: {
    icon: '💡',
    title: 'Leading Through Problem-Solving',
    desc: 'Problem-solving leadership means using structured thinking, real data, and coaching mastery to build lasting organizational capability. Leaders in this pillar turn every challenge into a learning opportunity and every problem into a stepping stone toward excellence.',
    practice: 'The next time a problem surfaces, resist the urge to solve it yourself. Coach your team to find and own the solution.'
  },
  culture: {
    icon: '🌱',
    title: 'Culture Change',
    desc: 'Sustainable culture change emerges from the center — through disciplined PDCA cycles, genuinely engaging others, supporting through ANDON, and spreading best practices via Yokoten. Together, these four habits are the engine of transformation.',
    practice: 'Culture is not what you say it is — it is what you do every day. Choose your daily behaviors deliberately.'
  }
};

// ─── Sub-Components ─────────────────────────────────────────────────────────

function HabitCard({ habit, isActive, onHover, onLeave, size = 'normal' }) {
  if (!habit) return null;
  const compact = size === 'compact';
  return (
    <div
      onMouseEnter={() => onHover(habit)}
      onMouseLeave={onLeave}
      style={{
        background: isActive ? '#3A5269' : '#253545',
        border: `1px solid ${isActive ? '#FFD559' : '#4A6478'}`,
        borderRadius: 8,
        padding: compact ? '6px 8px' : '8px 11px',
        cursor: 'pointer',
        transition: 'all 0.18s ease',
        boxShadow: isActive ? '0 0 12px rgba(255,213,89,0.28)' : 'none',
        userSelect: 'none',
      }}
    >
      <div style={{ fontSize: 9, color: '#FFD559', fontWeight: 700, letterSpacing: '0.06em', marginBottom: 2 }}>
        {habit.icon} &nbsp;#{habit.id}
      </div>
      <div style={{ fontSize: compact ? 9.5 : 10.5, color: '#E8EFF5', lineHeight: 1.35, whiteSpace: 'pre-line' }}>
        {habit.label}
      </div>
    </div>
  );
}

function SectionHeader({ icon, title, subtitle, onHover, onLeave, isActive, accentColor = '#FFD559' }) {
  return (
    <div
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      style={{
        background: isActive ? '#3A5269' : '#253545',
        border: `1px solid ${isActive ? accentColor : '#4A6478'}`,
        borderRadius: 8,
        padding: '9px 12px',
        textAlign: 'center',
        cursor: 'pointer',
        transition: 'all 0.18s ease',
        boxShadow: isActive ? `0 0 14px rgba(255,213,89,0.25)` : 'none',
        marginBottom: 8,
        userSelect: 'none',
      }}
    >
      <div style={{ fontSize: 14, marginBottom: 3 }}>{icon}</div>
      <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.1em', color: '#F4F7FA', textTransform: 'uppercase', lineHeight: 1.3 }}>
        {title}
      </div>
      {subtitle && (
        <div style={{ fontSize: 9, color: '#7A9BB0', marginTop: 2, letterSpacing: '0.04em' }}>
          {subtitle}
        </div>
      )}
    </div>
  );
}

function CultureCircle({ habits, onHover, onLeave, activeId }) {
  const byQ = {};
  habits.forEach(h => { byQ[h.quadrant] = h; });

  return (
    <div style={{ flex: 1, position: 'relative', minHeight: 240 }}>
      {/* Corner habit cards */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '46%' }}>
        <HabitCard habit={byQ.topLeft} isActive={activeId === byQ.topLeft?.id} onHover={onHover} onLeave={onLeave} size="compact" />
      </div>
      <div style={{ position: 'absolute', top: 0, right: 0, width: '46%' }}>
        <HabitCard habit={byQ.topRight} isActive={activeId === byQ.topRight?.id} onHover={onHover} onLeave={onLeave} size="compact" />
      </div>
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: '46%' }}>
        <HabitCard habit={byQ.bottomLeft} isActive={activeId === byQ.bottomLeft?.id} onHover={onHover} onLeave={onLeave} size="compact" />
      </div>
      <div style={{ position: 'absolute', bottom: 0, right: 0, width: '46%' }}>
        <HabitCard habit={byQ.bottomRight} isActive={activeId === byQ.bottomRight?.id} onHover={onHover} onLeave={onLeave} size="compact" />
      </div>

      {/* SVG Circle - centered */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
      }}>
        <svg width="120" height="120" viewBox="0 0 120 120">
          {/* Quadrant fills */}
          <path d="M60,60 L60,4 A56,56 0 0,1 116,60 Z" fill="#3A5269" />
          <path d="M60,60 L116,60 A56,56 0 0,1 60,116 Z" fill="#2E4156" />
          <path d="M60,60 L60,116 A56,56 0 0,1 4,60 Z" fill="#3A5269" />
          <path d="M60,60 L4,60 A56,56 0 0,1 60,4 Z" fill="#253545" />
          {/* Dividers */}
          <line x1="60" y1="4" x2="60" y2="116" stroke="#1C2B3A" strokeWidth="2.5" />
          <line x1="4" y1="60" x2="116" y2="60" stroke="#1C2B3A" strokeWidth="2.5" />
          {/* Outer ring */}
          <circle cx="60" cy="60" r="56" fill="none" stroke="#4A6478" strokeWidth="1.5" />
          {/* Quadrant icons */}
          <text x="32" y="38" fontSize="15" textAnchor="middle">⛰️</text>
          <text x="89" y="38" fontSize="15" textAnchor="middle">🤝</text>
          <text x="32" y="92" fontSize="15" textAnchor="middle">🔔</text>
          <text x="89" y="92" fontSize="15" textAnchor="middle">🌐</text>
          {/* Center hub */}
          <circle cx="60" cy="60" r="24" fill="#1C2B3A" stroke="#4A6478" strokeWidth="1.5" />
          <text x="60" y="54" fontSize="10" textAnchor="middle">🌱</text>
          <text x="60" y="65" fontSize="8" textAnchor="middle" fill="#E8EFF5" fontWeight="700">Culture</text>
          <text x="60" y="75" fontSize="8" textAnchor="middle" fill="#E8EFF5" fontWeight="700">Change</text>
        </svg>
      </div>
    </div>
  );
}

function DetailPanel({ active }) {
  return (
    <div style={{
      borderTop: '1px solid #2E4156',
      background: '#1C2B3A',
      padding: '16px 20px 20px',
      minHeight: 110,
      transition: 'all 0.2s ease',
    }}>
      {active ? (
        <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
          <div style={{
            width: 42, height: 42, flexShrink: 0,
            background: '#2E4156',
            border: '1px solid #4A6478',
            borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 20,
          }}>
            {active.icon}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#FFD559', letterSpacing: '0.06em', marginBottom: 5 }}>
              {active.title}
            </div>
            <div style={{ fontSize: 11.5, color: '#E8EFF5', lineHeight: 1.55, marginBottom: 8 }}>
              {active.desc}
            </div>
            <div style={{
              background: '#253545',
              border: '1px solid #4A6478',
              borderLeft: '3px solid #FFD559',
              borderRadius: 6,
              padding: '7px 10px',
              fontSize: 10.5,
              color: '#7A9BB0',
              lineHeight: 1.5,
            }}>
              <span style={{ color: '#FFD559', fontWeight: 700 }}>Key Practice: </span>
              {active.practice}
            </div>
          </div>
        </div>
      ) : (
        <div style={{ textAlign: 'center', paddingTop: 8 }}>
          <div style={{ fontSize: 11, color: '#4A6478', letterSpacing: '0.06em' }}>
            ↑ &nbsp;Hover over any habit or pillar to explore its meaning &nbsp;↑
          </div>
          <div style={{ fontSize: 10, color: '#3A5269', marginTop: 4 }}>
            16 habits · 3 pillars · 1 foundation · infinite growth
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main Widget ─────────────────────────────────────────────────────────────

export default function GenbIkigaiWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState(null);

  const show = useCallback((item) => setActive(item), []);
  const hide = useCallback(() => setActive(null), []);
  const activeId = active?.id;

  return (
    <>
      {/* ── Floating Trigger ── */}
      <button
        onClick={() => setIsOpen(true)}
        title="Genba Ikigai · 16 Leadership Habits"
        aria-label="Open Genba Ikigai 16 Habits Reference"
        style={{
          position: 'fixed',
          right: 20,
          bottom: 90,
          width: 54,
          height: 54,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #FFD559 0%, #e6a800 100%)',
          border: '2px solid rgba(255,255,255,0.18)',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 22px rgba(255,213,89,0.50), 0 2px 8px rgba(0,0,0,0.4)',
          zIndex: 9999,
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          padding: 0,
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'scale(1.13)';
          e.currentTarget.style.boxShadow = '0 6px 30px rgba(255,213,89,0.70), 0 2px 8px rgba(0,0,0,0.4)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 22px rgba(255,213,89,0.50), 0 2px 8px rgba(0,0,0,0.4)';
        }}
      >
        <span style={{ fontSize: 20, lineHeight: 1 }}>🏠</span>
        <span style={{ fontSize: 7, fontWeight: 800, color: '#1C2B3A', letterSpacing: '0.04em', marginTop: 1 }}>
          16 HABITS
        </span>
      </button>

      {/* ── Modal Overlay ── */}
      {isOpen && (
        <div
          onClick={() => { setIsOpen(false); setActive(null); }}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.80)',
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '12px',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: '#1C2B3A',
              borderRadius: 16,
              width: '100%',
              maxWidth: 900,
              maxHeight: '94vh',
              overflowY: 'auto',
              position: 'relative',
              boxShadow: '0 24px 80px rgba(0,0,0,0.75)',
              border: '1px solid #2E4156',
            }}
          >
            {/* Close button */}
            <button
              onClick={() => { setIsOpen(false); setActive(null); }}
              style={{
                position: 'sticky',
                top: 10,
                float: 'right',
                marginRight: 12,
                marginTop: 10,
                width: 30,
                height: 30,
                borderRadius: '50%',
                background: '#2E4156',
                border: '1px solid #4A6478',
                color: '#E8EFF5',
                fontSize: 14,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1,
                flexShrink: 0,
              }}
            >
              ✕
            </button>

            {/* ── Diagram ── */}
            <div style={{ padding: '24px 18px 0', clear: 'both' }}>

              {/* ROOF */}
              <div style={{ position: 'relative', paddingTop: 16, marginBottom: 2 }}>
                {/* Peak icon */}
                <div style={{
                  position: 'absolute',
                  top: -4,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 40,
                  height: 40,
                  background: '#2E4156',
                  border: '2px solid #4A6478',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 18,
                  zIndex: 1,
                }}>
                  🎯
                </div>
                <SectionHeader
                  icon=""
                  title="Meaningful Impact"
                  subtitle="Creating Change in Individuals & Organizations"
                  onHover={() => show(PILLAR_INFO.roof)}
                  onLeave={hide}
                  isActive={active === PILLAR_INFO.roof}
                />
              </div>

              {/* MAIN BODY — 3 columns */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '200px 1fr 200px',
                gap: 8,
                alignItems: 'stretch',
              }}>

                {/* LEFT: Leading the Tribe */}
                <div style={{
                  background: '#1a2a38',
                  border: '1px solid #2E4156',
                  borderRadius: 10,
                  padding: '10px 10px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 6,
                }}>
                  <SectionHeader
                    icon="⭐"
                    title="Leading the Tribe"
                    onHover={() => show(PILLAR_INFO.tribe)}
                    onLeave={hide}
                    isActive={active === PILLAR_INFO.tribe}
                  />
                  {TRIBE.map(h => (
                    <HabitCard key={h.id} habit={h} isActive={activeId === h.id} onHover={show} onLeave={hide} />
                  ))}
                </div>

                {/* CENTER: Culture Change */}
                <div style={{
                  background: '#1a2a38',
                  border: '1px solid #2E4156',
                  borderRadius: 10,
                  padding: '10px 10px',
                  display: 'flex',
                  flexDirection: 'column',
                }}>
                  <SectionHeader
                    icon="🌱"
                    title="Culture Change"
                    onHover={() => show(PILLAR_INFO.culture)}
                    onLeave={hide}
                    isActive={active === PILLAR_INFO.culture}
                  />
                  <CultureCircle
                    habits={CULTURE}
                    onHover={show}
                    onLeave={hide}
                    activeId={activeId}
                  />
                </div>

                {/* RIGHT: Leading Through Problem-Solving */}
                <div style={{
                  background: '#1a2a38',
                  border: '1px solid #2E4156',
                  borderRadius: 10,
                  padding: '10px 10px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 6,
                }}>
                  <SectionHeader
                    icon="💡"
                    title="Leading Through Problem-Solving"
                    onHover={() => show(PILLAR_INFO.problemSolving)}
                    onLeave={hide}
                    isActive={active === PILLAR_INFO.problemSolving}
                  />
                  {PROBLEM_SOLVING.map(h => (
                    <HabitCard key={h.id} habit={h} isActive={activeId === h.id} onHover={show} onLeave={hide} />
                  ))}
                </div>
              </div>

              {/* FOUNDATION */}
              <div style={{
                background: '#1a2a38',
                border: '1px solid #2E4156',
                borderRadius: 10,
                padding: '10px 12px',
                marginTop: 8,
              }}>
                <SectionHeader
                  icon="🧠"
                  title="Leading Self"
                  subtitle="THE FOUNDATION"
                  onHover={() => show(PILLAR_INFO.foundation)}
                  onLeave={hide}
                  isActive={active === PILLAR_INFO.foundation}
                />
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: 8,
                }}>
                  {FOUNDATION.map(h => (
                    <HabitCard key={h.id} habit={h} isActive={activeId === h.id} onHover={show} onLeave={hide} />
                  ))}
                </div>
              </div>
            </div>

            {/* DETAIL PANEL */}
            <DetailPanel active={active} />
          </div>
        </div>
      )}
    </>
  );
}
