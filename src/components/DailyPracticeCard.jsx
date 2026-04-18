import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  getPracticeByIndex,
  habitColors,
  habitIcons,
} from '../data/dailyPractices';
import {
  getPracticeSummary,
  markPracticeComplete,
  saveDailyPracticeEntry,
} from '../services/firestoreService';

// ── Textarea for journal reflection ─────────────────────────────────────────
function PracticeTextarea({ value, onChange, placeholder }) {
  return (
    <textarea
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      rows={4}
      className="w-full bg-gi-deep text-gi-white text-sm rounded-gi px-4 py-3 leading-relaxed resize-none outline-none border border-gi-slate/60 focus:border-gi-gold/50 transition-colors placeholder-gi-mist/40 mt-3"
    />
  );
}

export default function DailyPracticeCard() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [practice, setPractice] = useState(null);
  const [practiceIndex, setPracticeIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [completedToday, setCompletedToday] = useState(false);
  const [journaledToday, setJournaledToday] = useState(false);
  const [showJournalInput, setShowJournalInput] = useState(false);
  const [reflectionText, setReflectionText] = useState('');
  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (!currentUser) return;
      try {
        const summary = await getPracticeSummary(currentUser.uid);
        const idx = summary.currentPracticeIndex || 0;
        setPracticeIndex(idx);
        setPractice({ ...getPracticeByIndex(idx), _index: idx });

        const today = new Date().toISOString().split('T')[0];
        setCompletedToday(summary.lastCompletedDate === today);
      } catch (err) {
        console.error('Error loading practice:', err);
        setPractice({ ...getPracticeByIndex(0), _index: 0 });
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [currentUser]);

  const showSuccess = (msg) => {
    setSavedMsg(msg);
    setTimeout(() => setSavedMsg(null), 3000);
  };

  const handleMarkComplete = async () => {
    if (!currentUser || saving) return;
    setSaving(true);
    try {
      await markPracticeComplete(currentUser.uid, practice);
      setCompletedToday(true);
      const nextIdx = practiceIndex + 1;
      setPracticeIndex(nextIdx);
      const nextPractice = getPracticeByIndex(nextIdx);
      showSuccess('✓ Practice logged');
      // Show next practice after a moment
      setTimeout(() => {
        setPractice({ ...nextPractice, _index: nextIdx });
        setCompletedToday(false);
        setExpanded(false);
        setSavedMsg(null);
      }, 2500);
    } catch (err) {
      console.error('Error marking practice complete:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleSaveJournal = async () => {
    if (!currentUser || !reflectionText.trim() || saving) return;
    setSaving(true);
    try {
      const entryId = await saveDailyPracticeEntry(currentUser.uid, practice, reflectionText);
      await markPracticeComplete(currentUser.uid, practice, entryId);
      setJournaledToday(true);
      setCompletedToday(true);
      setShowJournalInput(false);
      showSuccess('✓ Reflection saved to journal');
    } catch (err) {
      console.error('Error saving journal entry:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleSkip = () => {
    setExpanded(false);
    showSuccess('Skipped for today');
  };

  if (loading || !practice) return null;

  const habitColor = habitColors[practice.habitId] || '#FFD559';
  const habitIcon = habitIcons[practice.habitId] || '✦';
  const cycleLabel = practice.cycle <= 1 ? 'Foundation' : `Cycle ${practice.cycle}`;

  // ── Completed State ─────────────────────────────────────────────────────
  if (completedToday && !savedMsg) {
    return (
      <div
        className="rounded-gi p-4 mb-4"
        style={{
          background: 'rgba(74,179,160,0.08)',
          border: '1px solid rgba(74,179,160,0.25)',
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-lg" style={{ color: '#4AB3A0' }}>✓</span>
            <div>
              <p className="text-gi-white text-sm font-medium">Practice complete</p>
              <p className="text-gi-mist text-xs">{practice.habitName}</p>
            </div>
          </div>
          <button
            onClick={() => { setCompletedToday(false); setExpanded(true); }}
            className="text-xs text-gi-horizon hover:text-gi-white transition-colors"
          >
            Repeat →
          </button>
        </div>
      </div>
    );
  }

  // ── Success message ─────────────────────────────────────────────────────
  if (savedMsg) {
    return (
      <div
        className="rounded-gi p-4 mb-4 flex items-center gap-3"
        style={{
          background: 'rgba(74,179,160,0.08)',
          border: '1px solid rgba(74,179,160,0.25)',
        }}
      >
        <span className="text-lg" style={{ color: '#4AB3A0' }}>✓</span>
        <p className="text-gi-white text-sm">{savedMsg}</p>
      </div>
    );
  }

  // ── Collapsed View ──────────────────────────────────────────────────────
  if (!expanded) {
    return (
      <div
        className="rounded-gi mb-4 overflow-hidden"
        style={{
          background: '#1C2B3A',
          border: `1px solid ${habitColor}22`,
          borderLeft: `3px solid ${habitColor}`,
        }}
      >
        <div className="px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-base">{habitIcon}</span>
              <p
                className="text-xs uppercase tracking-widest font-medium"
                style={{ color: habitColor }}
              >
                Today's Practice
              </p>
            </div>
            <span
              className="text-xs px-2 py-0.5 rounded-full"
              style={{
                background: `${habitColor}15`,
                color: habitColor,
                border: `1px solid ${habitColor}30`,
              }}
            >
              {cycleLabel}
            </span>
          </div>
          <p className="text-gi-white text-sm font-medium mb-1">{practice.habitName}</p>
          <p className="text-gi-horizon text-sm italic leading-snug mb-3">
            "{practice.prompt}"
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setExpanded(true)}
              className="flex-1 text-xs py-2 rounded-gi font-medium transition-all hover:opacity-80"
              style={{
                background: `${habitColor}18`,
                color: habitColor,
                border: `1px solid ${habitColor}35`,
              }}
            >
              Expand
            </button>
            <button
              onClick={handleMarkComplete}
              disabled={saving}
              className="flex-1 text-xs py-2 rounded-gi font-medium transition-all hover:opacity-80 disabled:opacity-40"
              style={{
                background: habitColor,
                color: '#0e1c28',
              }}
            >
              {saving ? 'Saving…' : 'Mark Complete'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Expanded View ───────────────────────────────────────────────────────
  return (
    <div
      className="rounded-gi mb-4 overflow-hidden"
      style={{
        background: '#1C2B3A',
        border: `1px solid ${habitColor}22`,
        borderLeft: `3px solid ${habitColor}`,
      }}
    >
      {/* Header */}
      <div
        className="px-4 pt-4 pb-3"
        style={{ borderBottom: '1px solid rgba(46,65,86,0.5)' }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg">{habitIcon}</span>
            <p
              className="text-xs uppercase tracking-widest font-medium"
              style={{ color: habitColor }}
            >
              Today's Practice
            </p>
          </div>
          <button
            onClick={() => setExpanded(false)}
            className="text-gi-mist hover:text-gi-white transition-colors text-lg leading-none w-7 h-7 flex items-center justify-center"
          >
            ×
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="px-4 py-4">
        {/* Habit + meta */}
        <div className="flex items-center gap-2 mb-3">
          <span
            className="text-xs px-2 py-0.5 rounded-full"
            style={{
              background: `${habitColor}15`,
              color: habitColor,
              border: `1px solid ${habitColor}30`,
            }}
          >
            {practice.habitName}
          </span>
          <span className="text-gi-mist text-xs">{practice.time}</span>
        </div>

        {/* Prompt */}
        <div
          className="rounded-gi p-4 mb-3"
          style={{
            background: 'rgba(14,28,40,0.6)',
            border: '1px solid rgba(74,100,120,0.3)',
          }}
        >
          <p className="text-gi-horizon text-xs uppercase tracking-widest mb-2">Practice Prompt</p>
          <p className="text-gi-white text-base italic leading-relaxed">
            "{practice.prompt}"
          </p>
        </div>

        {/* Guidance */}
        <div className="mb-4">
          <p className="text-gi-horizon text-xs uppercase tracking-widest mb-1">Guidance</p>
          <p className="text-gi-mist text-sm leading-relaxed">{practice.guidance}</p>
        </div>

        {/* Journal input (shown when "Add to Journal" clicked) */}
        {showJournalInput && (
          <div className="mb-4">
            <p className="text-gi-horizon text-xs uppercase tracking-widest mb-1">Your Reflection</p>
            <PracticeTextarea
              value={reflectionText}
              onChange={setReflectionText}
              placeholder="Write your reflection on today's practice…"
            />
            <div className="flex gap-2 mt-2">
              <button
                onClick={handleSaveJournal}
                disabled={!reflectionText.trim() || saving}
                className="flex-1 text-xs py-2.5 rounded-gi font-semibold transition-all disabled:opacity-40"
                style={{ background: '#FFD559', color: '#0e1c28' }}
              >
                {saving ? 'Saving…' : 'Save to Journal'}
              </button>
              <button
                onClick={() => setShowJournalInput(false)}
                className="text-xs px-4 py-2.5 rounded-gi text-gi-horizon hover:text-gi-white transition-colors"
                style={{ border: '1px solid rgba(74,100,120,0.4)' }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Action buttons */}
        {!showJournalInput && (
          <div className="flex flex-col gap-2">
            <button
              onClick={() => setShowJournalInput(true)}
              className="w-full text-sm py-3 rounded-gi font-medium transition-all hover:opacity-80"
              style={{
                background: `${habitColor}18`,
                color: habitColor,
                border: `1px solid ${habitColor}35`,
              }}
            >
              Add to Journal
            </button>
            <button
              onClick={handleMarkComplete}
              disabled={saving}
              className="w-full text-sm py-3 rounded-gi font-semibold transition-all hover:opacity-80 disabled:opacity-40"
              style={{ background: habitColor, color: '#0e1c28' }}
            >
              {saving ? 'Saving…' : 'Mark Complete'}
            </button>
            <button
              onClick={handleSkip}
              className="w-full text-xs py-2 text-gi-mist hover:text-gi-horizon transition-colors"
            >
              Skip for Today
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
