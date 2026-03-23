import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getCourseProgress } from '../services/firestoreService';
import { caseStudies, MODULE_ORDER, MODULE_LABELS } from '../data/caseStudies';

const STATUS = {
  complete: { icon: '✓', pill: 'bg-green-700/30 text-green-400 border-green-700/50' },
  current:  { icon: '→', pill: 'bg-gi-gold/20 text-gi-gold border-gi-gold/60' },
  locked:   { icon: '🔒', pill: 'bg-gi-deep text-gi-mist border-gi-mist/20' },
};

function getModuleStatus(moduleId, progress, currentModuleId) {
  if (progress?.[moduleId]?.completed) return 'complete';
  if (moduleId === currentModuleId) return 'current';
  return 'locked';
}

function getCurrentModule(progress) {
  for (const id of MODULE_ORDER) {
    if (!progress?.[id]?.completed) return id;
  }
  return MODULE_ORDER[MODULE_ORDER.length - 1];
}

// ── Not-onboarded prompt ─────────────────────────────────────────────────────
function StartPrompt({ hero }) {
  const navigate = useNavigate();
  return (
    <div
      className="rounded-gi mb-6 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #1a2a38 0%, #253545 100%)',
        border: '1px solid rgba(255,213,89,0.2)',
      }}
    >
      <div className="p-6">
        <p className="text-gi-gold text-xs uppercase tracking-widest mb-3">Your Course Journey</p>
        <h2 className="text-gi-white font-light text-2xl mb-2 tracking-wide leading-snug">
          Follow Sarah & Kenji.
        </h2>
        <p className="text-gi-horizon text-sm leading-relaxed mb-6">
          Five modules. Real conversations. Genuine transformation.
        </p>
        <button
          onClick={() => navigate('/onboarding')}
          className="w-full bg-gi-gold text-gi-deep font-semibold py-4 rounded-gi hover:opacity-90 transition-opacity text-base"
        >
          Start your journey →
        </button>
      </div>
    </div>
  );
}

// ── Main card ────────────────────────────────────────────────────────────────
export default function CourseJourneyCard({ onboardingComplete, hero = false }) {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (!currentUser) return;
      try {
        const p = await getCourseProgress(currentUser.uid);
        setProgress(p);
      } catch (err) {
        setProgress({});
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [currentUser]);

  if (!onboardingComplete) return <StartPrompt hero={hero} />;

  if (loading) {
    return (
      <div className="gi-card p-5 mb-6">
        <div className="text-gi-mist text-sm">Loading your progress…</div>
      </div>
    );
  }

  const currentModuleId = getCurrentModule(progress || {});
  const currentStudy = caseStudies[currentModuleId];
  const allComplete = MODULE_ORDER.every((id) => progress?.[id]?.completed);
  const completedCount = MODULE_ORDER.filter((id) => progress?.[id]?.completed).length;

  return (
    <div
      className="rounded-gi mb-6 overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #1a2a38 0%, #1e3040 60%, #253545 100%)',
        border: '1px solid rgba(255,213,89,0.18)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
      }}
    >
      {/* ── Header ── */}
      <div className="px-5 pt-5 pb-4 border-b border-white/5">
        <div className="flex items-center justify-between mb-1">
          <p className="text-gi-gold text-xs uppercase tracking-widest">
            Your Course Journey
          </p>
          <p className="text-gi-mist text-xs">
            {completedCount}/{MODULE_ORDER.length} complete
          </p>
        </div>

        {/* Module progress pills — scrollable on mobile */}
        <div className="flex gap-2 overflow-x-auto pb-1 mt-3 scrollbar-hide">
          {MODULE_ORDER.map((id) => {
            const status = getModuleStatus(id, progress, currentModuleId);
            const s = STATUS[status];
            return (
              <button
                key={id}
                onClick={() => navigate(`/case-study/${id}`)}
                className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all hover:opacity-80 ${s.pill}`}
              >
                <span className="text-xs">{s.icon}</span>
                <span>{MODULE_LABELS[id]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Current chapter preview (hero mode — larger) ── */}
      {!allComplete && currentStudy && (
        <div className="px-5 py-5">
          <p className="text-gi-mist text-xs uppercase tracking-widest mb-3">Up next</p>

          <div className="mb-5">
            <h3 className="text-gi-white font-medium text-lg leading-tight mb-1">
              {currentStudy.title}
            </h3>
            <p className="text-gi-horizon text-sm leading-relaxed">
              {currentStudy.teaser}
            </p>
          </div>

          {/* Characters hint */}
          <div className="flex items-center gap-2 mb-5">
            <div className="flex -space-x-2">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 border-gi-deep"
                style={{ background: '#F59E0B', color: '#1C2B3A' }}
              >
                S
              </div>
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 border-gi-deep"
                style={{ background: '#0F6E56', color: '#FFD559' }}
              >
                K
              </div>
            </div>
            <p className="text-gi-mist text-xs">Sarah & Kenji</p>
          </div>

          <button
            onClick={() => navigate(`/case-study/${currentModuleId}`)}
            className="w-full bg-gi-gold text-gi-deep font-semibold py-4 rounded-gi hover:opacity-90 transition-opacity flex items-center justify-center gap-2 text-base"
          >
            <span>Continue: {currentStudy.moduleLabel}</span>
            <span className="text-lg">→</span>
          </button>
        </div>
      )}

      {/* ── All complete state ── */}
      {allComplete && (
        <div className="px-5 py-5 text-center">
          <div className="text-3xl mb-3">🎉</div>
          <p className="text-gi-white font-medium mb-1">All modules complete.</p>
          <p className="text-gi-horizon text-sm mb-4">The journey continues in how you lead.</p>
          <button
            onClick={() => navigate('/case-study/introduction')}
            className="border border-gi-gold/40 text-gi-gold px-6 py-2 rounded-gi hover:bg-gi-gold/10 transition-colors text-sm"
          >
            Revisit any chapter
          </button>
        </div>
      )}
    </div>
  );
}
