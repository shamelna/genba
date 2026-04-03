import React, { useEffect, useRef } from 'react';
import SarahAvatar from './avatars/SarahAvatar';
import KenjiAvatar from './avatars/KenjiAvatar';

/**
 * CaseStudyScene renders one conversation beat.
 * Types: 'narrator' | 'sarah' | 'kenji'
 * isNew: triggers scroll-into-view when true
 *
 * The container is always max-w-2xl so bubbles cap at a readable width.
 * Sarah bubbles are right-aligned, Kenji left-aligned.
 */
export default function CaseStudyScene({ scene, isNew = false }) {
  const ref = useRef(null);

  useEffect(() => {
    if (isNew && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [isNew]);

  // ── Act Divider ────────────────────────────────────────────────────────────
  if (scene.type === 'act') {
    return (
      <div
        ref={ref}
        className="px-6 py-5 flex items-center gap-4"
        style={{ animation: isNew ? 'fadeIn 0.4s ease' : undefined }}
      >
        <div className="flex-1 h-px" style={{ background: 'rgba(255,213,89,0.25)' }} />
        <span
          className="text-xs font-medium tracking-widest uppercase flex-shrink-0"
          style={{ color: '#FFD559', letterSpacing: '0.12em' }}
        >
          {scene.label}
        </span>
        <div className="flex-1 h-px" style={{ background: 'rgba(255,213,89,0.25)' }} />
      </div>
    );
  }

  // ── Narrator ───────────────────────────────────────────────────────────────
  if (scene.type === 'narrator') {
    return (
      <div
        ref={ref}
        className="px-6 py-4"
        style={{
          opacity: isNew ? undefined : 1,
          animation: isNew ? 'fadeIn 0.35s ease' : undefined,
        }}
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="flex-1 h-px" style={{ background: 'rgba(74,100,120,0.25)' }} />
          <span className="text-gi-mist text-xs uppercase tracking-widest flex-shrink-0">Scene</span>
          <div className="flex-1 h-px" style={{ background: 'rgba(74,100,120,0.25)' }} />
        </div>
        <p className="text-gi-horizon text-sm italic text-center leading-relaxed">
          {scene.text}
        </p>
      </div>
    );
  }

  // ── Kenji speaks — left-aligned ───────────────────────────────────────────
  if (scene.type === 'kenji') {
    return (
      <div
        ref={ref}
        className="flex items-end gap-3 px-4 py-2"
        style={{ animation: isNew ? 'slideUp 0.3s ease' : undefined }}
      >
        {/* Avatar */}
        <div className="flex flex-col items-center flex-shrink-0 mb-1">
          <KenjiAvatar size={36} />
          <span className="text-gi-mist text-xs mt-1">Kenji</span>
        </div>

        {/* Bubble */}
        <div
          className="text-gi-white text-sm leading-relaxed py-3 px-4"
          style={{
            background: '#2a3d52',
            borderRadius: '4px 16px 16px 4px',
            maxWidth: 'calc(100% - 80px)',
            boxShadow: '0 2px 10px rgba(0,0,0,0.25)',
            borderLeft: '3px solid rgba(15,110,86,0.6)',
          }}
        >
          {scene.text}
        </div>
      </div>
    );
  }

  // ── Sarah speaks — right-aligned ──────────────────────────────────────────
  if (scene.type === 'sarah') {
    return (
      <div
        ref={ref}
        className="flex items-end gap-3 px-4 py-2 flex-row-reverse"
        style={{ animation: isNew ? 'slideUp 0.3s ease' : undefined }}
      >
        {/* Avatar */}
        <div className="flex flex-col items-center flex-shrink-0 mb-1">
          <SarahAvatar size={36} />
          <span className="text-gi-mist text-xs mt-1">Sarah</span>
        </div>

        {/* Bubble */}
        <div
          className="text-gi-white text-sm leading-relaxed py-3 px-4"
          style={{
            background: '#1d2f47',
            borderRadius: '16px 4px 4px 16px',
            maxWidth: 'calc(100% - 80px)',
            boxShadow: '0 2px 10px rgba(0,0,0,0.25)',
            borderRight: '3px solid rgba(245,158,11,0.45)',
          }}
        >
          {scene.text}
        </div>
      </div>
    );
  }

  return null;
}

/*
 * Keyframe animations injected once via a style tag at module level.
 * Vite/React doesn't need an external CSS file for this.
 */
const style = document.createElement('style');
style.textContent = `
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0);    }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
`;
if (!document.head.querySelector('[data-cs-anim]')) {
  style.setAttribute('data-cs-anim', '1');
  document.head.appendChild(style);
}
