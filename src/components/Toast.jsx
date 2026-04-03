import React, { useEffect, useState } from 'react';

/**
 * Toast — lightweight inline success/error notification.
 *
 * Usage:
 *   const [toast, setToast] = useState(null);
 *
 *   // Show:
 *   setToast({ message: 'Entry saved ✓', type: 'success' });
 *
 *   // In JSX:
 *   {toast && <Toast message={toast.message} type={toast.type} onDone={() => setToast(null)} />}
 *
 * Props:
 *   message  — string displayed in the toast
 *   type     — 'success' (default) | 'error'
 *   duration — ms before auto-dismiss (default 2400)
 *   onDone   — called after dismiss (clear parent state)
 */
export default function Toast({ message, type = 'success', duration = 2400, onDone }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const hideTimer = setTimeout(() => setVisible(false), duration - 300);
    const doneTimer = setTimeout(() => { onDone && onDone(); }, duration);
    return () => { clearTimeout(hideTimer); clearTimeout(doneTimer); };
  }, [duration, onDone]);

  const isSuccess = type === 'success';

  // Use a single transform value — no duplicate keys
  const translateY = visible ? 'translateY(0)' : 'translateY(-8px)';

  return (
    <div
      className="fixed z-[9999] flex items-center gap-3 px-5 py-3 rounded-full shadow-lg"
      style={{
        top: '72px',
        left: '50%',
        background: isSuccess ? 'rgba(20,45,35,0.97)' : 'rgba(60,20,20,0.97)',
        border: `1px solid ${isSuccess ? 'rgba(74,179,160,0.6)' : 'rgba(248,113,113,0.6)'}`,
        boxShadow: `0 4px 24px ${isSuccess ? 'rgba(74,179,160,0.2)' : 'rgba(248,113,113,0.2)'}`,
        transition: 'opacity 0.3s ease, transform 0.3s ease',
        opacity: visible ? 1 : 0,
        transform: `translateX(-50%) ${translateY}`,
        pointerEvents: 'none',
        whiteSpace: 'nowrap',
        maxWidth: 'calc(100vw - 40px)',
      }}
    >
      <span style={{ fontSize: '16px' }}>
        {isSuccess ? '✓' : '✕'}
      </span>
      <span
        className="text-sm font-medium"
        style={{ color: isSuccess ? '#4AB3A0' : '#F87171' }}
      >
        {message}
      </span>
    </div>
  );
}
