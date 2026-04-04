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
  const [showChecklist, setShowChecklist] = useState(false);
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
      // Use scrollIntoView for more reliable scrolling
      const scrollToBottom = () => {
        const element = threadRef.current;
        element.scrollTo({
          top: element.scrollHeight,
          left: 0,
          behavior: 'smooth'
        });
      };
      
      // Small delay to ensure content is rendered
      setTimeout(scrollToBottom, 100);
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
    
    // Immediate scroll to bottom on button click
    if (threadRef.current) {
      setTimeout(() => {
        threadRef.current.scrollTo({
          top: threadRef.current.scrollHeight,
          left: 0,
          behavior: 'smooth'
        });
      }, 50);
    }
  };

  const handleReflectionSave = async (answers) => {
    try {
      await saveCaseStudyReflection(currentUser.uid, moduleId, answers);
    } catch (err) {
      console.error('Error saving reflection:', err);
    }
    // Show completion checklist before navigating to journal
    setShowReflection(false);
    setShowChecklist(true);
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

  if (showChecklist) {
    const entryType = study.journalEntryType || 'genba-moment';
    const checklistItems = [
      {
        label: 'Complete onboarding',
        done: true,
      },
      {
        label: `Read ${study.moduleLabel} case study and answer reflection questions`,
        done: true,
      },
      {
        label: 'Record a Genba Ikigai Moment and set your baseline scores',
        done: false,
        cta: 'Record now →',
        ctaAction: () => navigate(`/journal?newEntry=true&type=${entryType}&module=${moduleId}`),
      },
      {
        label: 'Complete the knowledge check quiz',
        done: false,
        cta: 'Open quiz ↗',
        ctaAction: () => window.open('https://genbaacademy.com/quiz', '_blank'),
      },
    ];

    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center px-6"
        style={{ background: '#0e1c28' }}
      >
        <div
          className="w-full flex flex-col"
          style={{ maxWidth: '560px', background: '#1C2B3A', borderRadius: '16px', overflow: 'hidden' }}
        >
          {/* Header */}
          <div className="px-6 pt-8 pb-5" style={{ borderBottom: '1px solid rgba(46,65,86,0.6)' }}>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">🎯</span>
              <h2 className="text-xl font-light text-gi-white tracking-wide">
                Week 1 — Completion Checklist
              </h2>
            </div>
            <p className="text-gi-horizon text-sm leading-relaxed">
              Your workbook has four activities for this module. Here's where you are.
            </p>
          </div>

          {/* Checklist items */}
          <div className="flex flex-col gap-0 px-6 py-5">
            {checklistItems.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-4 py-4"
                style={{ borderBottom: idx < checklistItems.length - 1 ? '1px solid rgba(46,65,86,0.4)' : 'none' }}
              >
                {/* Checkbox */}
                <div
                  className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5"
                  style={{
                    background: item.done ? 'rgba(74,179,160,0.15)' : 'rgba(74,100,120,0.2)',
                    border: `2px solid ${item.done ? '#4AB3A0' : 'rgba(74,100,120,0.5)'}`,
                  }}
                >
                  {item.done && (
                    <span style={{ color: '#4AB3A0', fontSize: '11px', fontWeight: 700 }}>✓</span>
                  )}
                </div>

                {/* Label + CTA */}
                <div className="flex-1 min-w-0">
                  <p
                    className="text-sm leading-snug"
                    style={{ color: item.done ? '#7A9BB0' : '#E8EFF5' }}
                  >
                    {item.label}
                  </p>
                  {!item.done && item.cta && (
                    <button
                      onClick={item.ctaAction}
                      className="mt-2 text-xs font-medium transition-opacity hover:opacity-80"
                      style={{ color: '#FFD559' }}
                    >
                      {item.cta}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="px-6 pb-6 flex flex-col gap-3">
            <button
              onClick={() => navigate(`/journal?newEntry=true&type=${entryType}&module=${moduleId}`)}
              className="w-full bg-gi-gold text-gi-deep font-semibold py-4 rounded-gi hover:opacity-90 transition-opacity"
            >
              Record Genba Moment →
            </button>
            <button
              onClick={() => navigate('/home')}
              className="w-full text-gi-horizon text-sm py-2 hover:text-gi-white transition-colors"
            >
              Back to home
            </button>
          </div>
        </div>
      </div>
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

          {/* PDCA card — appears after the last scene */}
          {isOnLastScene && (
            <div
              className="mx-4 my-5 rounded-gi p-5"
              style={{
                background: 'rgba(255,213,89,0.06)',
                border: '1px solid rgba(255,213,89,0.2)',
                animation: 'fadeIn 0.5s ease',
              }}
            >
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-3"
                style={{ color: '#FFD559', letterSpacing: '0.12em' }}
              >
                PDCA — Your Next Step
              </p>
              <div className="flex flex-col gap-3">
                {[
                  { letter: 'P', label: 'Plan', prompt: 'What one leadership behaviour will you change this week?' },
                  { letter: 'D', label: 'Do', prompt: 'When and where will you practise it?' },
                  { letter: 'C', label: 'Check', prompt: 'How will you know if it worked?' },
                  { letter: 'A', label: 'Act', prompt: 'What will you do differently if it didn\'t work?' },
                ].map(({ letter, label, prompt }) => (
                  <div key={letter} className="flex items-start gap-3">
                    <div
                      className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                      style={{ background: 'rgba(255,213,89,0.15)', color: '#FFD559' }}
                    >
                      {letter}
                    </div>
                    <div>
                      <p className="text-gi-white text-xs font-semibold mb-0.5">{label}</p>
                      <p className="text-gi-horizon text-xs leading-snug">{prompt}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-gi-mist text-xs mt-4 italic">
                You can record your answers as a Genba Moment in your journal.
              </p>
            </div>
          )}

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
