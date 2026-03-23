import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { caseStudies, MODULE_ORDER, MODULE_LABELS } from '../data/caseStudies';
import {
  getCourseProgress,
  markModuleStarted,
  saveCaseStudyReflection,
} from '../services/firestoreService';
import CaseStudyScene from '../components/CaseStudyScene';
import ReflectionPanel from '../components/ReflectionPanel';

// ── Module lock helper ──────────────────────────────────────────────────────
function isModuleAccessible(moduleId, progress) {
  if (moduleId === 'introduction') return true;
  const idx = MODULE_ORDER.indexOf(moduleId);
  if (idx <= 0) return true;
  const prev = MODULE_ORDER[idx - 1];
  return progress?.[prev]?.completed === true;
}

// ── Thin amber progress bar ─────────────────────────────────────────────────
function ProgressBar({ current, total }) {
  const pct = total > 1 ? ((current - 1) / (total - 1)) * 100 : 100;
  return (
    <div className="h-0.5 w-full bg-gi-slate flex-shrink-0">
      <div
        className="h-full bg-gi-gold transition-all duration-500"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

// ── Coming Soon ─────────────────────────────────────────────────────────────
function ComingSoon({ moduleLabel, onBack }) {
  return (
    <div className="min-h-screen bg-gi-deep flex flex-col items-center justify-center px-6 text-center">
      <div className="text-5xl mb-6">🔒</div>
      <h2 className="text-2xl font-light text-gi-white mb-3 tracking-wide">{moduleLabel}</h2>
      <p className="text-gi-horizon text-sm leading-relaxed max-w-xs mb-8">
        This chapter isn't available yet. Complete earlier modules as your course progresses.
      </p>
      <button onClick={onBack} className="bg-gi-gold text-gi-deep font-semibold px-8 py-3 rounded-gi hover:opacity-90 transition-opacity">
        ← Back
      </button>
    </div>
  );
}

// ── Locked Module ──────────────────────────────────────────────────────────
function LockedModule({ moduleLabel, prevLabel, onBack }) {
  return (
    <div className="min-h-screen bg-gi-deep flex flex-col items-center justify-center px-6 text-center">
      <div className="text-5xl mb-6">🔒</div>
      <h2 className="text-2xl font-light text-gi-white mb-3 tracking-wide">{moduleLabel}</h2>
      <p className="text-gi-horizon text-sm leading-relaxed max-w-xs mb-8">
        Complete the <span className="text-gi-gold">{prevLabel}</span> chapter first to unlock this one.
      </p>
      <button onClick={onBack} className="bg-gi-gold text-gi-deep font-semibold px-8 py-3 rounded-gi hover:opacity-90 transition-opacity">
        ← Back to home
      </button>
    </div>
  );
}

// ── Main CaseStudyPage ───────────────────────────────────────────────────────
export default function CaseStudyPage() {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const threadRef = useRef(null);

  const [visibleCount, setVisibleCount] = useState(1);
  const [showReflection, setShowReflection] = useState(false);
  const [progress, setProgress] = useState(null);
  const [loadingProgress, setLoadingProgress] = useState(true);

  const study = caseStudies[moduleId];

  // Load course progress + mark started
  useEffect(() => {
    const load = async () => {
      if (!currentUser) return;
      try {
        const p = await getCourseProgress(currentUser.uid);
        setProgress(p);
        if (study && !study.comingSoon && !p?.[moduleId]?.started) {
          await markModuleStarted(currentUser.uid, moduleId);
        }
      } catch (err) {
        console.error('Error loading progress:', err);
        setProgress({});
      } finally {
        setLoadingProgress(false);
      }
    };
    load();
  }, [currentUser, moduleId]);

  // Scroll to bottom when new scene appears
  useEffect(() => {
    if (threadRef.current) {
      threadRef.current.scrollTop = threadRef.current.scrollHeight;
    }
  }, [visibleCount]);

  if (loadingProgress) {
    return (
      <div className="min-h-screen bg-gi-deep flex items-center justify-center">
        <div className="text-gi-horizon text-sm">Loading…</div>
      </div>
    );
  }

  if (!study) {
    return (
      <div className="min-h-screen bg-gi-deep flex flex-col items-center justify-center px-6 text-center">
        <p className="text-gi-horizon mb-4">Module not found.</p>
        <button onClick={() => navigate('/home')} className="text-gi-gold text-sm">← Back to home</button>
      </div>
    );
  }

  if (!isModuleAccessible(moduleId, progress)) {
    const idx = MODULE_ORDER.indexOf(moduleId);
    const prevLabel = MODULE_LABELS[MODULE_ORDER[idx - 1]] || 'previous';
    return <LockedModule moduleLabel={study.moduleLabel} prevLabel={prevLabel} onBack={() => navigate('/home')} />;
  }

  if (study.comingSoon) {
    return <ComingSoon moduleLabel={study.moduleLabel} onBack={() => navigate('/home')} />;
  }

  const scenes = study.scenes;
  const totalScenes = scenes.length;
  const isOnLastScene = visibleCount >= totalScenes;

  const handleContinue = () => {
    if (isOnLastScene) setShowReflection(true);
    else setVisibleCount(c => Math.min(c + 1, totalScenes));
  };

  const handleReflectionSave = async (answers) => {
    try {
      await saveCaseStudyReflection(currentUser.uid, moduleId, answers);
    } catch (err) {
      console.error('Error saving reflection:', err);
    }
    navigate(`/journal?newEntry=true&module=${moduleId}`);
  };

  if (showReflection) {
    return (
      <ReflectionPanel
        questions={study.reflectionQuestions}
        onSave={handleReflectionSave}
        onBack={() => setShowReflection(false)}
      />
    );
  }

  // ── Reading view — floating chat panel on wide screens ─────────────────────
  return (
    /*
     * Outer: full-screen dark canvas (visible on wide screens as letterbox)
     * Inner: max-w-2xl centered chat "window" — looks like a floating phone on desktop
     */
    <div
      className="min-h-screen flex flex-col items-center"
      style={{ background: '#0e1c28' }}
    >
      {/* Progress bar — full width of the page */}
      <div className="w-full flex-shrink-0">
        <ProgressBar current={visibleCount} total={totalScenes} />
      </div>

      {/* Centered chat window */}
      <div
        className="flex flex-col w-full"
        style={{
          maxWidth: '680px',
          flex: 1,
          minHeight: 0,
          background: '#1C2B3A',
          /* Subtle side shadows to make it "float" on desktop */
          boxShadow: '0 0 80px rgba(0,0,0,0.6)',
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-4 flex-shrink-0"
          style={{ borderBottom: '1px solid rgba(46,65,86,0.8)' }}
        >
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/home')}
              className="text-gi-horizon hover:text-gi-white transition-colors text-lg leading-none w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gi-slate"
              aria-label="Back to home"
            >
              ←
            </button>
            <div>
              <p className="text-gi-white font-medium text-sm leading-tight">{study.title}</p>
              <p className="text-gi-horizon text-xs">{study.moduleLabel}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-gi-mist text-xs">Scene {visibleCount} of {totalScenes}</p>
            {/* Mini progress dots */}
            <div className="flex gap-1 mt-1 justify-end">
              {Array.from({ length: Math.min(totalScenes, 13) }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i < visibleCount ? 6 : 4,
                    height: 4,
                    background: i < visibleCount ? '#FFD559' : '#4A6478',
                    opacity: i < visibleCount ? 1 : 0.4,
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Conversation thread — scrollable */}
        <div
          ref={threadRef}
          className="flex-1 overflow-y-auto"
          style={{ paddingBottom: '8px', paddingTop: '12px' }}
        >
          {scenes.slice(0, visibleCount).map((scene, i) => (
            <CaseStudyScene
              key={i}
              scene={scene}
              isNew={i === visibleCount - 1}
            />
          ))}

          {/* Breathing room so last bubble isn't hidden by sticky button */}
          <div style={{ height: '80px' }} />
        </div>

        {/* Sticky Continue / Reflect button */}
        <div
          className="px-5 pb-6 pt-3 flex-shrink-0"
          style={{
            borderTop: '1px solid rgba(46,65,86,0.6)',
            background: '#1C2B3A',
            position: 'sticky',
            bottom: 0,
          }}
        >
          <button
            onClick={handleContinue}
            className="w-full bg-gi-gold text-gi-deep font-semibold py-4 rounded-gi hover:opacity-90 transition-opacity flex items-center justify-center gap-2 text-base"
          >
            {isOnLastScene ? (
              <>Reflect <span className="text-lg">→</span></>
            ) : (
              <>Continue <span className="text-sm opacity-70">→</span></>
            )}
          </button>
          {isOnLastScene && (
            <p className="text-gi-mist text-xs text-center mt-2">
              You've reached the end of this chapter.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
