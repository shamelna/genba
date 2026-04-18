import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { caseStudies, MODULE_ORDER, MODULE_LABELS } from '../data/caseStudies';
import { habitInsightPrompts, MODULE_1_HABITS } from '../data/habitInsightPrompts';
import {
  saveGenbaMoment,
  saveStopAndThinkReflection,
  saveBaselineEntry,
  saveHabitInsightEntry,
} from '../services/firestoreService';
import Toast from './Toast';

// ── Shared helpers ────────────────────────────────────────────────────────────

function ModalShell({ onClose, children }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center"
      style={{ background: 'rgba(8,18,28,0.85)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="w-full flex flex-col"
        style={{
          maxWidth: '680px',
          maxHeight: '92vh',
          background: '#1C2B3A',
          borderRadius: '20px 20px 0 0',
          boxShadow: '0 -8px 40px rgba(0,0,0,0.6)',
          overflowY: 'auto',
        }}
      >
        {children}
      </div>
    </div>
  );
}

function ModalHeader({ title, subtitle, onBack, onClose }) {
  return (
    <div
      className="flex items-center gap-3 px-5 py-4 flex-shrink-0"
      style={{ borderBottom: '1px solid rgba(46,65,86,0.8)' }}
    >
      {onBack && (
        <button
          onClick={onBack}
          className="text-gi-horizon hover:text-gi-white transition-colors w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gi-slate"
        >
          ←
        </button>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-gi-white font-medium text-sm leading-tight">{title}</p>
        {subtitle && <p className="text-gi-horizon text-xs mt-0.5">{subtitle}</p>}
      </div>
      <button
        onClick={onClose}
        className="text-gi-mist hover:text-gi-white transition-colors w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gi-slate text-lg leading-none"
      >
        ×
      </button>
    </div>
  );
}

function SaveButton({ onClick, disabled, saving, label = 'Save entry' }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || saving}
      className="w-full bg-gi-gold text-gi-deep font-semibold py-4 rounded-gi hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
    >
      {saving ? 'Saving…' : label}
    </button>
  );
}

function SavedState({ label, onDone }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
      <div className="text-4xl mb-4">✓</div>
      <p className="text-gi-white font-medium mb-1">{label}</p>
      <p className="text-gi-horizon text-sm mb-6">Your growth is being documented.</p>
      <button
        onClick={onDone}
        className="border border-gi-gold/40 text-gi-gold px-6 py-2 rounded-gi hover:bg-gi-gold/10 transition-colors text-sm"
      >
        Back to journal
      </button>
    </div>
  );
}

// ── Type Picker ───────────────────────────────────────────────────────────────

const ENTRY_TYPES = [
  {
    id: 'genba-moment',
    icon: '⬤',
    iconColor: '#FFD559',
    label: 'Genba Ikigai Moment',
    description: 'Capture a real moment of leadership that connects to your Ikigai.',
  },
  {
    id: 'habit-insight',
    icon: '💡',
    iconColor: '#4AB3A0',
    label: 'Habit Insight',
    description: 'Reflect deeply on one of the four Leading Self habits with guided prompts.',
  },
  {
    id: 'stop-and-think',
    icon: '◈',
    iconColor: '#8BA0B2',
    label: 'Reflection — Stop and Think',
    description: 'Work through your weekly module prompts from the student workbook.',
  },
  {
    id: 'baseline',
    icon: '◎',
    iconColor: '#A78BFA',
    label: 'Baseline',
    description: 'Rate yourself now and track how far you\'ve come.',
  },
];

function TypePicker({ onSelect, onClose }) {
  return (
    <ModalShell onClose={onClose}>
      <ModalHeader title="New Entry" subtitle="What would you like to capture?" onClose={onClose} />
      <div className="flex flex-col gap-3 p-5 pb-8">
        {ENTRY_TYPES.map(t => (
          <button
            key={t.id}
            onClick={() => onSelect(t.id)}
            className="text-left rounded-gi p-4 transition-all hover:opacity-90"
            style={{
              background: '#253545',
              border: '1px solid rgba(74,100,120,0.5)',
            }}
          >
            <div className="flex items-center gap-3 mb-1">
              <span style={{ color: t.iconColor, fontSize: '18px' }}>{t.icon}</span>
              <span className="text-gi-white font-medium text-sm">{t.label}</span>
            </div>
            <p className="text-gi-horizon text-xs leading-relaxed pl-8">{t.description}</p>
          </button>
        ))}
      </div>
    </ModalShell>
  );
}

// ── Genba Ikigai Moment Form ──────────────────────────────────────────────────

// The four Ikigai circles (individual, not intersections)
const IKIGAI_CIRCLES = [
  { id: 'love',    label: 'What I Love',               color: '#F59E0B' },
  { id: 'good',    label: 'What I am Good At',          color: '#10B981' },
  { id: 'world',   label: 'What the World Needs',       color: '#3B82F6' },
  { id: 'valued',  label: 'What I am Valued For',       color: '#8B5CF6' },
];

function GenbaMomentForm({ onClose, onSaved }) {
  const { currentUser } = useAuth();
  const [form, setForm] = useState({
    situation: '',
    whoInvolved: '',
    meaningful: '',
  });
  const [circles, setCircles] = useState([]);
  const [saving, setSaving] = useState(false);

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));
  const toggleCircle = (id) => setCircles(c => c.includes(id) ? c.filter(x => x !== id) : [...c, id]);

  const canSave = form.situation.trim() || form.meaningful.trim();

  const handleSave = async () => {
    if (!canSave) return;
    setSaving(true);
    try {
      await saveGenbaMoment(currentUser.uid, {
        situation: form.situation.trim(),
        whoInvolved: form.whoInvolved.trim(),
        meaningful: form.meaningful.trim(),
        ikigaiCircles: circles,
      });
      onSaved();
    } catch (err) {
      console.error('Error saving Genba Moment:', err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <ModalShell onClose={onClose}>
      <ModalHeader
        title="Genba Ikigai Moment"
        subtitle="Capture a real leadership moment"
        onClose={onClose}
      />
      <div className="flex flex-col gap-5 p-5 pb-8">

        {/* Situation */}
        <div>
          <label className="block text-gi-gold text-xs uppercase tracking-widest mb-2">
            The moment
          </label>
          <textarea
            value={form.situation}
            onChange={e => set('situation', e.target.value)}
            placeholder="Describe the moment specifically. What was happening around you?"
            rows={3}
            maxLength={600}
            className="w-full bg-gi-deep text-gi-white text-sm rounded-gi px-4 py-3 leading-relaxed resize-none outline-none border border-gi-slate/60 focus:border-gi-gold/50 transition-colors placeholder-gi-mist/40"
          />
        </div>

        {/* Who was involved */}
        <div>
          <label className="block text-gi-horizon text-xs uppercase tracking-widest mb-2">
            Who was involved
          </label>
          <textarea
            value={form.whoInvolved}
            onChange={e => set('whoInvolved', e.target.value)}
            placeholder="What were you doing? Who else was involved?"
            rows={2}
            maxLength={500}
            className="w-full bg-gi-deep text-gi-white text-sm rounded-gi px-4 py-3 leading-relaxed resize-none outline-none border border-gi-slate/60 focus:border-gi-gold/50 transition-colors placeholder-gi-mist/40"
          />
        </div>

        {/* What made it meaningful */}
        <div>
          <label className="block text-gi-gold text-xs uppercase tracking-widest mb-2">
            Why it mattered
          </label>
          <textarea
            value={form.meaningful}
            onChange={e => set('meaningful', e.target.value)}
            placeholder="What made it meaningful to you — not what should have, but what actually did?"
            rows={3}
            maxLength={600}
            className="w-full bg-gi-deep text-gi-white text-sm rounded-gi px-4 py-3 leading-relaxed resize-none outline-none border border-gi-slate/60 focus:border-gi-gold/50 transition-colors placeholder-gi-mist/40"
          />
        </div>

        {/* Ikigai circle tags */}
        <div>
          <label className="block text-gi-horizon text-xs uppercase tracking-widest mb-2">
            Which Ikigai circle does this connect to? <span className="normal-case text-gi-mist">(optional)</span>
          </label>
          <div className="flex flex-col gap-2">
            {IKIGAI_CIRCLES.map(c => (
              <button
                key={c.id}
                type="button"
                onClick={() => toggleCircle(c.id)}
                className="flex items-center gap-3 px-4 py-2.5 rounded-gi text-left text-sm transition-all"
                style={{
                  background: circles.includes(c.id) ? `${c.color}18` : 'transparent',
                  border: `1px solid ${circles.includes(c.id) ? c.color : 'rgba(74,100,120,0.4)'}`,
                  color: circles.includes(c.id) ? c.color : '#8BA0B2',
                }}
              >
                <span
                  className="w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold"
                  style={{
                    background: circles.includes(c.id) ? c.color : 'transparent',
                    border: `2px solid ${c.color}`,
                    color: circles.includes(c.id) ? '#1C2B3A' : c.color,
                  }}
                >
                  {circles.includes(c.id) ? '✓' : ''}
                </span>
                {c.label}
              </button>
            ))}
          </div>
        </div>

        <SaveButton onClick={handleSave} disabled={!canSave} saving={saving} />
      </div>
    </ModalShell>
  );
}

// ── Stop and Think Form ───────────────────────────────────────────────────────

function StopAndThinkForm({ onClose, onSaved, initialModule }) {
  const { currentUser } = useAuth();
  const [moduleId, setModuleId] = useState(initialModule || 'introduction');
  const [activePart, setActivePart] = useState(null); // null = not yet chosen (for object-style)
  const [answers, setAnswers] = useState({});
  const [freeText, setFreeText] = useState('');
  const [saving, setSaving] = useState(false);

  const study = caseStudies[moduleId];
  const rawPrompts = study?.stopAndThinkPrompts;

  // Support both old (array) and new (object with Part keys) formats
  const isParted = rawPrompts && !Array.isArray(rawPrompts) && typeof rawPrompts === 'object';
  const partKeys = isParted ? Object.keys(rawPrompts) : [];
  const currentPart = isParted ? (activePart || partKeys[0]) : null;
  const prompts = isParted
    ? (rawPrompts[currentPart] || [])
    : (Array.isArray(rawPrompts) ? rawPrompts : []);

  const answerKey = (part, i) => isParted ? `${part}__${i}` : String(i);
  const setAnswer = (key, val) => setAnswers(a => ({ ...a, [key]: val }));
  const canSave = Object.values(answers).some(v => v.trim()) || freeText.trim();

  const handleModuleChange = (newId) => {
    setModuleId(newId);
    setActivePart(null);
    setAnswers({});
  };

  const handleSave = async () => {
    if (!canSave) return;
    setSaving(true);
    try {
      // Flatten all answered prompts across all parts
      let promptAnswers = [];
      if (isParted) {
        partKeys.forEach(part => {
          const partPrompts = rawPrompts[part] || [];
          partPrompts.forEach((prompt, i) => {
            const ans = (answers[`${part}__${i}`] || '').trim();
            if (ans) promptAnswers.push({ part, prompt, answer: ans });
          });
        });
      } else {
        promptAnswers = prompts.map((prompt, i) => ({
          prompt,
          answer: (answers[String(i)] || '').trim(),
        })).filter(p => p.answer);
      }

      await saveStopAndThinkReflection(currentUser.uid, {
        moduleId,
        moduleLabel: MODULE_LABELS[moduleId] || moduleId,
        promptAnswers,
        freeText: freeText.trim(),
      });
      onSaved();
    } catch (err) {
      console.error('Error saving Stop and Think:', err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <ModalShell onClose={onClose}>
      <ModalHeader
        title="Reflection — Stop and Think"
        subtitle="Weekly workbook prompts"
        onClose={onClose}
      />
      <div className="flex flex-col gap-5 p-5 pb-8">

        {/* Module selector */}
        <div>
          <label className="block text-gi-gold text-xs uppercase tracking-widest mb-2">
            Which module?
          </label>
          <select
            value={moduleId}
            onChange={e => handleModuleChange(e.target.value)}
            className="w-full bg-gi-deep text-gi-white text-sm rounded-gi px-4 py-3 border border-gi-slate/60 outline-none focus:border-gi-gold/50 transition-colors"
            style={{ appearance: 'none' }}
          >
            {MODULE_ORDER.map(id => (
              <option key={id} value={id}>{MODULE_LABELS[id]}</option>
            ))}
          </select>
        </div>

        {/* Part tabs (only for modules with part-based prompts) */}
        {isParted && (
          <div>
            <label className="block text-gi-gold text-xs uppercase tracking-widest mb-2">
              Which part?
            </label>
            <div className="flex flex-col gap-2">
              {partKeys.map(part => {
                const partAnswered = (rawPrompts[part] || []).some(
                  (_, i) => (answers[`${part}__${i}`] || '').trim()
                );
                const isSelected = (activePart || partKeys[0]) === part;
                return (
                  <button
                    key={part}
                    type="button"
                    onClick={() => setActivePart(part)}
                    className="flex items-center justify-between px-4 py-3 rounded-gi text-left text-sm transition-all"
                    style={{
                      background: isSelected ? 'rgba(74,179,160,0.12)' : 'rgba(37,53,69,0.6)',
                      border: `1px solid ${isSelected ? 'rgba(74,179,160,0.5)' : 'rgba(74,100,120,0.4)'}`,
                      color: isSelected ? '#4AB3A0' : '#8BA0B2',
                    }}
                  >
                    <span>{part}</span>
                    {partAnswered && (
                      <span className="text-xs ml-2" style={{ color: '#4AB3A0' }}>✓</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Prompts */}
        {prompts.length > 0 && (
          <div className="flex flex-col gap-5">
            <div
              className="px-4 py-3 rounded-gi"
              style={{ background: 'rgba(74,179,160,0.08)', border: '1px solid rgba(74,179,160,0.2)' }}
            >
              <p className="text-xs" style={{ color: '#4AB3A0' }}>
                Answer one or more prompts below. You can skip any that don't resonate.
              </p>
            </div>

            {prompts.map((prompt, i) => {
              const key = answerKey(currentPart, i);
              return (
                <div key={key}>
                  <p className="text-gi-white text-sm italic leading-relaxed mb-2">
                    "{prompt}"
                  </p>
                  <textarea
                    value={answers[key] || ''}
                    onChange={e => setAnswer(key, e.target.value)}
                    placeholder="Your reflection…"
                    rows={3}
                    maxLength={600}
                    className="w-full bg-gi-deep text-gi-white text-sm rounded-gi px-4 py-3 leading-relaxed resize-none outline-none border border-gi-slate/60 focus:border-gi-gold/50 transition-colors placeholder-gi-mist/40"
                  />
                  <div className="flex justify-between mt-1">
                    {(answers[key] || '').length > 0 && (
                      <button
                        onClick={() => setAnswer(key, '')}
                        className="text-gi-mist text-xs hover:text-gi-horizon transition-colors"
                      >
                        Clear
                      </button>
                    )}
                    <span className="text-gi-mist text-xs ml-auto">
                      {(answers[key] || '').length}/600
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Free write */}
        <div>
          <label className="block text-gi-horizon text-xs uppercase tracking-widest mb-2">
            Additional thoughts <span className="normal-case text-gi-mist">(optional)</span>
          </label>
          <textarea
            value={freeText}
            onChange={e => setFreeText(e.target.value)}
            placeholder="Anything else on your mind this week…"
            rows={3}
            maxLength={800}
            className="w-full bg-gi-deep text-gi-white text-sm rounded-gi px-4 py-3 leading-relaxed resize-none outline-none border border-gi-slate/60 focus:border-gi-gold/50 transition-colors placeholder-gi-mist/40"
          />
        </div>

        <SaveButton onClick={handleSave} disabled={!canSave} saving={saving} />
      </div>
    </ModalShell>
  );
}

// ── Habit Insight Form ────────────────────────────────────────────────────────

const HABIT_OPTIONS = [
  { id: 'hansei',    label: 'Hansei (Self-Reflection)',            color: '#4AB3A0' },
  { id: 'humility',  label: 'Humility & Gratitude (Stepping Back)', color: '#FFD559' },
  { id: 'integrity', label: 'Integrity (Keeping Commitments)',       color: '#60A5FA' },
  { id: 'respect',   label: 'Respect & Mutual Trust (Seeing People)', color: '#F97316' },
];

function HabitInsightForm({ onClose, onSaved, initialHabit }) {
  const { currentUser } = useAuth();
  const [habitId, setHabitId] = useState(initialHabit || 'hansei');
  const [answers, setAnswers] = useState({});
  const [optionalAnswer, setOptionalAnswer] = useState('');
  const [saving, setSaving] = useState(false);

  const prompts = habitInsightPrompts[habitId];
  const setAnswer = (i, val) => setAnswers(a => ({ ...a, [i]: val }));

  const canSave = Object.values(answers).some(v => (v || '').trim()) || optionalAnswer.trim();

  const handleSave = async () => {
    if (!canSave || saving) return;
    setSaving(true);
    try {
      const promptAnswers = prompts.prompts.map((p, i) => ({
        question: p.question,
        subText: p.subText || '',
        answer: (answers[i] || '').trim(),
      }));
      if (prompts.optionalPrompt && optionalAnswer.trim()) {
        promptAnswers.push({
          question: prompts.optionalPrompt.question,
          subText: '',
          answer: optionalAnswer.trim(),
          optional: true,
        });
      }
      await saveHabitInsightEntry(
        currentUser.uid,
        habitId,
        prompts.habitName,
        prompts.entryTitle,
        promptAnswers
      );
      onSaved();
    } catch (err) {
      console.error('Error saving Habit Insight:', err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <ModalShell onClose={onClose}>
      <ModalHeader
        title="Habit Insight"
        subtitle="Guided reflection on a Leading Self habit"
        onClose={onClose}
      />
      <div className="flex flex-col gap-5 p-5 pb-8">

        {/* Habit selector */}
        <div>
          <label className="block text-gi-gold text-xs uppercase tracking-widest mb-2">
            Which habit?
          </label>
          <div className="flex flex-col gap-2">
            {HABIT_OPTIONS.map(h => (
              <button
                key={h.id}
                type="button"
                onClick={() => { setHabitId(h.id); setAnswers({}); setOptionalAnswer(''); }}
                className="flex items-center gap-3 px-4 py-3 rounded-gi text-left text-sm transition-all"
                style={{
                  background: habitId === h.id ? `${h.color}15` : 'rgba(37,53,69,0.6)',
                  border: `1px solid ${habitId === h.id ? h.color : 'rgba(74,100,120,0.4)'}`,
                  color: habitId === h.id ? h.color : '#8BA0B2',
                }}
              >
                <span
                  className="w-4 h-4 rounded-full flex-shrink-0 border-2 flex items-center justify-center text-xs font-bold"
                  style={{
                    borderColor: h.color,
                    background: habitId === h.id ? h.color : 'transparent',
                    color: habitId === h.id ? '#1C2B3A' : 'transparent',
                  }}
                >
                  {habitId === h.id ? '✓' : ''}
                </span>
                {h.label}
              </button>
            ))}
          </div>
        </div>

        {prompts && (
          <>
            {/* Hint */}
            <div
              className="px-4 py-3 rounded-gi"
              style={{ background: 'rgba(74,179,160,0.08)', border: '1px solid rgba(74,179,160,0.2)' }}
            >
              <p className="text-xs" style={{ color: '#4AB3A0' }}>
                Answer one or more prompts. You can return to add more reflections anytime.
              </p>
            </div>

            {/* Required prompts */}
            {prompts.prompts.map((p, i) => (
              <div key={i}>
                <p className="text-gi-white text-sm font-medium leading-snug mb-0.5">
                  {p.question}
                </p>
                {p.subText && (
                  <p className="text-gi-mist text-xs italic mb-2">{p.subText}</p>
                )}
                <textarea
                  value={answers[i] || ''}
                  onChange={e => setAnswer(i, e.target.value)}
                  placeholder={p.placeholder}
                  rows={3}
                  maxLength={600}
                  className="w-full bg-gi-deep text-gi-white text-sm rounded-gi px-4 py-3 leading-relaxed resize-none outline-none border border-gi-slate/60 focus:border-gi-gold/50 transition-colors placeholder-gi-mist/40"
                />
                <div className="flex justify-end mt-1">
                  <span className="text-gi-mist text-xs">{(answers[i] || '').length}/600</span>
                </div>
              </div>
            ))}

            {/* Optional prompt */}
            {prompts.optionalPrompt && (
              <div>
                <p className="text-gi-mist text-sm italic leading-snug mb-2">
                  {prompts.optionalPrompt.question}{' '}
                  <span className="text-gi-slate text-xs not-italic">(optional)</span>
                </p>
                <textarea
                  value={optionalAnswer}
                  onChange={e => setOptionalAnswer(e.target.value)}
                  placeholder={prompts.optionalPrompt.placeholder}
                  rows={2}
                  maxLength={400}
                  className="w-full bg-gi-deep text-gi-white text-sm rounded-gi px-4 py-3 leading-relaxed resize-none outline-none border border-gi-slate/60 focus:border-gi-gold/50 transition-colors placeholder-gi-mist/40"
                />
              </div>
            )}
          </>
        )}

        <SaveButton
          onClick={handleSave}
          disabled={!canSave}
          saving={saving}
          label="Save Reflection"
        />
      </div>
    </ModalShell>
  );
}

// ── Baseline Form ─────────────────────────────────────────────────────────────

const BASELINE_SLIDERS = [
  {
    key: 'leadershipPurpose',
    label: 'Clarity on my leadership purpose right now',
    description: 'How clear is your sense of why you lead — not the role, but the purpose?',
  },
  {
    key: 'teamAutonomy',
    label: "My team's ability to solve problems without me",
    description: 'How well can your team identify and resolve issues independently?',
  },
  {
    key: 'reflectionHabit',
    label: 'Consistency of my daily self-reflection habit',
    description: 'How regularly do you pause to reflect on your own leadership behaviour?',
  },
  {
    key: 'teamTrust',
    label: 'The level of trust in my team right now',
    description: 'How much do team members trust each other — and trust you?',
  },
];

function BaselineSlider({ slider, value, onChange }) {
  const pct = ((value - 1) / 9) * 100;
  return (
    <div className="mb-6">
      <div className="flex items-start justify-between mb-1">
        <div>
          <p className="text-gi-white text-sm font-medium">{slider.label}</p>
          <p className="text-gi-mist text-xs leading-snug mt-0.5">{slider.description}</p>
        </div>
        <span
          className="text-2xl font-light flex-shrink-0 ml-4 mt-1 w-8 text-right"
          style={{ color: '#FFD559' }}
        >
          {value}
        </span>
      </div>
      <div className="relative mt-3">
        {/* Track */}
        <div className="relative h-1.5 rounded-full" style={{ background: 'rgba(74,100,120,0.4)' }}>
          <div
            className="absolute left-0 top-0 h-full rounded-full transition-all duration-150"
            style={{
              width: `${pct}%`,
              background: 'linear-gradient(90deg, #4A6478, #FFD559)',
            }}
          />
        </div>
        <input
          type="range"
          min="1"
          max="10"
          value={value}
          onChange={e => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full opacity-0 cursor-pointer h-6 -top-2"
          style={{ zIndex: 1 }}
        />
        {/* Thumb dot */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 pointer-events-none"
          style={{
            left: `calc(${pct}% - 8px)`,
            background: '#FFD559',
            borderColor: '#1C2B3A',
            boxShadow: '0 1px 6px rgba(255,213,89,0.5)',
            marginTop: '-3px',
          }}
        />
      </div>
      <div className="flex justify-between mt-2">
        <span className="text-gi-mist text-xs">1 — Not yet</span>
        <span className="text-gi-mist text-xs">10 — Fully</span>
      </div>
    </div>
  );
}

function BaselineForm({ onClose, onSaved }) {
  const { currentUser } = useAuth();
  const [values, setValues] = useState({
    leadershipPurpose: 5,
    teamAutonomy: 5,
    reflectionHabit: 5,
    teamTrust: 5,
  });
  const [note, setNote] = useState('');
  const [saving, setSaving] = useState(false);

  const setValue = (key, val) => setValues(v => ({ ...v, [key]: val }));

  const handleSave = async () => {
    setSaving(true);
    try {
      await saveBaselineEntry(currentUser.uid, {
        label: `Baseline — ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}`,
        scores: values,
        note: note.trim(),
      });
      onSaved();
    } catch (err) {
      console.error('Error saving baseline:', err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <ModalShell onClose={onClose}>
      <ModalHeader
        title="Baseline"
        subtitle="Where are you right now as a leader?"
        onClose={onClose}
      />
      <div className="flex flex-col gap-2 p-5 pb-8">
        <div
          className="px-4 py-3 rounded-gi mb-3"
          style={{ background: 'rgba(167,139,250,0.08)', border: '1px solid rgba(167,139,250,0.2)' }}
        >
          <p className="text-xs leading-relaxed" style={{ color: '#A78BFA' }}>
            Rate yourself honestly — there are no right answers. This snapshot helps you see how much you grow.
          </p>
        </div>

        {BASELINE_SLIDERS.map(s => (
          <BaselineSlider
            key={s.key}
            slider={s}
            value={values[s.key]}
            onChange={val => setValue(s.key, val)}
          />
        ))}

        {/* Optional note */}
        <div className="mt-2">
          <label className="block text-gi-horizon text-xs uppercase tracking-widest mb-2">
            Notes <span className="normal-case text-gi-mist">(optional)</span>
          </label>
          <textarea
            value={note}
            onChange={e => setNote(e.target.value)}
            placeholder="What's on your mind about where you are right now?"
            rows={3}
            maxLength={600}
            className="w-full bg-gi-deep text-gi-white text-sm rounded-gi px-4 py-3 leading-relaxed resize-none outline-none border border-gi-slate/60 focus:border-gi-gold/50 transition-colors placeholder-gi-mist/40"
          />
        </div>

        <SaveButton onClick={handleSave} saving={saving} label="Save baseline" />
      </div>
    </ModalShell>
  );
}

// ── Root NewEntryModal ────────────────────────────────────────────────────────

/**
 * Props:
 *   onClose()          — called when the user closes or finishes
 *   initialType        — 'genba-moment' | 'stop-and-think' | 'baseline' | 'habit-insight' | null
 *   initialModule      — moduleId string (used when type is 'stop-and-think')
 *   initialHabit       — habitId string (used when type is 'habit-insight')
 */
export default function NewEntryModal({ onClose, initialType = null, initialModule = null, initialHabit = null }) {
  const [type, setType] = useState(initialType);
  const [toastMsg, setToastMsg] = useState(null);

  const handleSaved = (label) => {
    setToastMsg(label || 'Entry saved ✓');
    setTimeout(() => { onClose && onClose(); }, 1800);
  };

  const toastEl = toastMsg
    ? <Toast message={toastMsg} duration={1800} onDone={() => setToastMsg(null)} />
    : null;

  if (!type) {
    return (
      <>
        {toastEl}
        <TypePicker onSelect={setType} onClose={onClose} />
      </>
    );
  }

  if (type === 'genba-moment') {
    return (
      <>
        {toastEl}
        <GenbaMomentForm
          onClose={onClose}
          onSaved={() => handleSaved('Genba Ikigai Moment saved ✓')}
        />
      </>
    );
  }

  if (type === 'habit-insight') {
    return (
      <>
        {toastEl}
        <HabitInsightForm
          onClose={onClose}
          onSaved={() => handleSaved('Habit Insight saved ✓')}
          initialHabit={initialHabit}
        />
      </>
    );
  }

  if (type === 'stop-and-think') {
    return (
      <>
        {toastEl}
        <StopAndThinkForm
          onClose={onClose}
          onSaved={() => handleSaved('Reflection saved ✓')}
          initialModule={initialModule}
        />
      </>
    );
  }

  if (type === 'baseline') {
    return (
      <>
        {toastEl}
        <BaselineForm
          onClose={onClose}
          onSaved={() => handleSaved('Baseline snapshot saved ✓')}
        />
      </>
    );
  }

  return null;
}
