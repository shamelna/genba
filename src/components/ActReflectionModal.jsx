import React, { useState } from 'react';

/**
 * ActReflectionModal
 *
 * Appears between case study acts. Shows 3 guided reflection questions.
 * Props:
 *   actReflection  — { actNumber, actTitle, habitFocus, questions: [{ question, subText, placeholder }] }
 *   onSave(answers) — called with array of { question, answer } objects
 *   onSkip()        — called when user skips without answering
 */
export default function ActReflectionModal({ actReflection, onSave, onSkip }) {
  const [answers, setAnswers] = useState(
    actReflection.questions.map(q => ({ question: q.question, answer: '' }))
  );
  const [saving, setSaving] = useState(false);

  const setAnswer = (index, value) => {
    setAnswers(prev => prev.map((a, i) => i === index ? { ...a, answer: value } : a));
  };

  const hasAnyAnswer = answers.some(a => a.answer.trim().length > 0);

  const handleSave = async () => {
    if (saving) return;
    setSaving(true);
    try {
      await onSave(answers);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center"
      style={{ background: 'rgba(8,18,28,0.90)' }}
    >
      <div
        className="w-full flex flex-col overflow-y-auto"
        style={{
          maxWidth: '680px',
          maxHeight: '92vh',
          background: '#1C2B3A',
          borderRadius: '20px 20px 0 0',
          boxShadow: '0 -8px 40px rgba(0,0,0,0.7)',
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-4 flex-shrink-0"
          style={{ borderBottom: '1px solid rgba(46,65,86,0.8)' }}
        >
          <div className="flex-1 min-w-0">
            <p className="text-gi-white font-medium text-sm leading-tight">
              Your Reflection — Act {actReflection.actNumber}
            </p>
            <p className="text-gi-horizon text-xs mt-0.5">
              {actReflection.actTitle} · {actReflection.habitFocus}
            </p>
          </div>
          <button
            onClick={onSkip}
            className="text-gi-mist hover:text-gi-white transition-colors w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gi-slate text-lg leading-none ml-3"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {/* Hint */}
        <div
          className="mx-5 mt-4 px-4 py-3 rounded-gi flex-shrink-0"
          style={{
            background: 'rgba(255,213,89,0.06)',
            border: '1px solid rgba(255,213,89,0.15)',
          }}
        >
          <p className="text-gi-gold text-xs">
            Answer one, some, or all. There's no wrong way. You can also skip — and come back anytime.
          </p>
        </div>

        {/* Questions */}
        <div className="flex flex-col gap-6 px-5 pt-5 pb-2">
          {actReflection.questions.map((q, i) => (
            <div key={i}>
              <p className="text-gi-white text-sm font-medium leading-snug mb-0.5">
                {q.question}
              </p>
              {q.subText && (
                <p className="text-gi-mist text-xs italic mb-2">{q.subText}</p>
              )}
              <textarea
                value={answers[i].answer}
                onChange={e => setAnswer(i, e.target.value)}
                placeholder={q.placeholder || 'Your reflection…'}
                rows={3}
                className="w-full bg-gi-deep text-gi-white text-sm rounded-gi px-4 py-3 leading-relaxed resize-none outline-none border border-gi-slate/60 focus:border-gi-gold/50 transition-colors placeholder-gi-mist/40"
              />
              <div className="flex justify-end mt-1">
                <span className="text-gi-mist text-xs">
                  {answers[i].answer.length > 0 && `${answers[i].answer.length} chars`}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer buttons */}
        <div className="flex flex-col gap-2 px-5 pb-8 pt-4">
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full bg-gi-gold text-gi-deep font-semibold py-4 rounded-gi hover:opacity-90 transition-opacity disabled:opacity-40"
          >
            {saving ? 'Saving…' : hasAnyAnswer ? 'Save Reflection & Continue' : 'Save & Continue →'}
          </button>
          <button
            onClick={onSkip}
            className="w-full text-gi-horizon text-sm py-2 hover:text-gi-white transition-colors"
          >
            Continue Without Reflecting
          </button>
        </div>
      </div>
    </div>
  );
}
