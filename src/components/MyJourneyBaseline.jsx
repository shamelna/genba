import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getBaselineHistory } from '../services/firestoreService';

const DIMENSIONS = [
  { key: 'leadershipPurpose', label: 'Leadership Purpose',     color: '#FFD559' },
  { key: 'teamAutonomy',      label: 'Team Autonomy',          color: '#4AB3A0' },
  { key: 'reflectionHabit',   label: 'Self-Reflection Habit',  color: '#60A5FA' },
  { key: 'teamTrust',         label: 'Team Trust',             color: '#A78BFA' },
];

// ── Helper: format a Firestore Timestamp or ISO string ────────────────────────
function formatDate(ts) {
  if (!ts) return '—';
  let d;
  if (ts?.toDate) {
    d = ts.toDate();
  } else if (typeof ts === 'string') {
    d = new Date(ts);
  } else {
    return '—';
  }
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

// ── Single bar row ─────────────────────────────────────────────────────────────
function ScoreBar({ label, value, prevValue, color }) {
  const pct = ((value - 1) / 9) * 100;
  const prevPct = prevValue != null ? ((prevValue - 1) / 9) * 100 : null;
  const delta = prevValue != null ? value - prevValue : null;

  return (
    <div className="mb-5">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-gi-white text-sm">{label}</span>
        <div className="flex items-center gap-2">
          {delta != null && delta !== 0 && (
            <span
              className="text-xs font-medium"
              style={{ color: delta > 0 ? '#4AB3A0' : '#F87171' }}
            >
              {delta > 0 ? `+${delta}` : delta}
            </span>
          )}
          <span className="text-sm font-medium" style={{ color }}>{value}/10</span>
        </div>
      </div>

      {/* Track */}
      <div className="relative h-2 rounded-full" style={{ background: 'rgba(74,100,120,0.3)' }}>
        {/* Previous score ghost bar */}
        {prevPct != null && (
          <div
            className="absolute left-0 top-0 h-full rounded-full opacity-30"
            style={{ width: `${prevPct}%`, background: color }}
          />
        )}
        {/* Current score bar */}
        <div
          className="absolute left-0 top-0 h-full rounded-full transition-all duration-700"
          style={{ width: `${pct}%`, background: color }}
        />
        {/* Thumb dot */}
        <div
          className="absolute top-1/2 w-3.5 h-3.5 rounded-full border-2 -translate-y-1/2"
          style={{
            left: `calc(${pct}% - 7px)`,
            background: color,
            borderColor: '#1C2B3A',
            boxShadow: `0 1px 6px ${color}55`,
          }}
        />
      </div>
    </div>
  );
}

// ── Snapshot card ─────────────────────────────────────────────────────────────
function SnapshotCard({ snapshot, prevSnapshot, isLatest }) {
  const scores = snapshot.scores || {};
  const prevScores = prevSnapshot?.scores || null;

  return (
    <div
      className="rounded-gi p-5 mb-4"
      style={{
        background: isLatest
          ? 'linear-gradient(135deg, rgba(255,213,89,0.06), rgba(74,179,160,0.04))'
          : 'rgba(37,53,69,0.6)',
        border: isLatest
          ? '1px solid rgba(255,213,89,0.25)'
          : '1px solid rgba(46,65,86,0.6)',
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-gi-white text-sm font-medium">
            {snapshot.label || (snapshot.isOnboarding ? 'Onboarding Baseline' : 'Baseline')}
          </p>
          <p className="text-gi-mist text-xs mt-0.5">{formatDate(snapshot.createdAt)}</p>
        </div>
        {isLatest && (
          <span
            className="text-xs px-2 py-1 rounded"
            style={{ background: 'rgba(255,213,89,0.12)', color: '#FFD559' }}
          >
            Current
          </span>
        )}
        {snapshot.isOnboarding && !isLatest && (
          <span
            className="text-xs px-2 py-1 rounded"
            style={{ background: 'rgba(74,179,160,0.12)', color: '#4AB3A0' }}
          >
            Starting point
          </span>
        )}
      </div>

      {DIMENSIONS.map(d => {
        const val = scores[d.key];
        const prev = prevScores?.[d.key];
        if (val == null) return null;
        return (
          <ScoreBar
            key={d.key}
            label={d.label}
            value={val}
            prevValue={isLatest && prev != null ? prev : null}
            color={d.color}
          />
        );
      })}

      {snapshot.note && (
        <p className="text-gi-horizon text-xs italic mt-3 leading-relaxed border-t border-gi-slate/40 pt-3">
          "{snapshot.note}"
        </p>
      )}
    </div>
  );
}

// ── Growth summary ─────────────────────────────────────────────────────────────
function GrowthSummary({ first, latest }) {
  const gains = DIMENSIONS.map(d => ({
    ...d,
    from: first.scores?.[d.key] ?? 5,
    to: latest.scores?.[d.key] ?? 5,
    delta: (latest.scores?.[d.key] ?? 5) - (first.scores?.[d.key] ?? 5),
  }));

  const totalDelta = gains.reduce((sum, g) => sum + g.delta, 0);
  const totalPossible = gains.length * 9;
  const growthPct = Math.round((totalDelta / totalPossible) * 100);

  return (
    <div
      className="rounded-gi p-5 mb-6"
      style={{
        background: 'linear-gradient(135deg, #1a2a38, #1e3040)',
        border: '1px solid rgba(74,179,160,0.2)',
      }}
    >
      <p className="text-xs uppercase tracking-widest mb-3" style={{ color: '#4AB3A0' }}>
        Overall growth
      </p>

      <div className="grid grid-cols-2 gap-3 mb-4">
        {gains.map(g => (
          <div key={g.key} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: g.color }} />
            <span className="text-gi-horizon text-xs flex-1 truncate">{g.label}</span>
            <span
              className="text-xs font-medium flex-shrink-0"
              style={{ color: g.delta > 0 ? '#4AB3A0' : g.delta < 0 ? '#F87171' : '#8BA0B2' }}
            >
              {g.delta > 0 ? `+${g.delta}` : g.delta === 0 ? '→' : g.delta}
            </span>
          </div>
        ))}
      </div>

      {totalDelta > 0 ? (
        <p className="text-gi-white text-sm leading-relaxed">
          You've grown{' '}
          <span style={{ color: '#FFD559' }}>{totalDelta} point{totalDelta !== 1 ? 's' : ''}</span>
          {' '}across all dimensions since you started.
          {growthPct > 0 && (
            <span className="text-gi-mist"> That's meaningful progress.</span>
          )}
        </p>
      ) : totalDelta === 0 ? (
        <p className="text-gi-horizon text-sm">Scores unchanged since your starting point. Keep going.</p>
      ) : (
        <p className="text-gi-horizon text-sm">
          Some scores have shifted. Honest self-assessment is itself a sign of growth.
        </p>
      )}
    </div>
  );
}

// ── Empty state ───────────────────────────────────────────────────────────────
function EmptyBaseline({ onNewBaseline }) {
  return (
    <div className="flex flex-col items-center text-center py-10 px-4">
      <div className="text-4xl mb-4">◎</div>
      <p className="text-gi-white font-medium mb-2">No baseline yet</p>
      <p className="text-gi-horizon text-sm leading-relaxed mb-6 max-w-xs">
        Complete onboarding or add a baseline entry to start tracking your leadership growth.
      </p>
      <button
        onClick={onNewBaseline}
        className="border border-gi-gold/40 text-gi-gold px-6 py-2 rounded-gi hover:bg-gi-gold/10 transition-colors text-sm"
      >
        + Add baseline
      </button>
    </div>
  );
}

// ── Root component ─────────────────────────────────────────────────────────────
export default function MyJourneyBaseline({ onNewBaseline }) {
  const { currentUser } = useAuth();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser?.uid) return;
    (async () => {
      try {
        const data = await getBaselineHistory(currentUser.uid);
        setHistory(data);
      } catch (err) {
        console.error('Error loading baseline history:', err);
      } finally {
        setLoading(false);
      }
    })();
  }, [currentUser]);

  if (loading) {
    return (
      <div className="py-12 text-center text-gi-horizon text-sm">Loading your journey…</div>
    );
  }

  if (history.length === 0) {
    return <EmptyBaseline onNewBaseline={onNewBaseline} />;
  }

  // Sorted oldest → newest (getBaselineHistory returns asc)
  const oldest = history[0];
  const latest = history[history.length - 1];
  const showGrowth = history.length >= 2;

  return (
    <div>
      {/* Growth summary when 2+ snapshots */}
      {showGrowth && <GrowthSummary first={oldest} latest={latest} />}

      {/* Snapshots — latest first */}
      {[...history].reverse().map((snap, idx) => {
        const reversedIdx = history.length - 1 - idx;
        const prevSnap = reversedIdx > 0 ? history[reversedIdx - 1] : null;
        const isLatest = idx === 0;
        return (
          <SnapshotCard
            key={snap.id}
            snapshot={snap}
            prevSnapshot={prevSnap}
            isLatest={isLatest}
          />
        );
      })}

      {/* Add another baseline CTA */}
      <button
        onClick={onNewBaseline}
        className="w-full mt-2 py-3 rounded-gi text-sm transition-colors"
        style={{
          border: '1px dashed rgba(255,213,89,0.25)',
          color: '#FFD559',
          background: 'transparent',
        }}
      >
        + Take a new baseline snapshot
      </button>
    </div>
  );
}
