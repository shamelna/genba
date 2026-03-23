import React, { useState } from 'react';

const MAX_CHARS = 500;

/**
 * ReflectionPanel — shown at the end of a case study chapter.
 * Presents 3 reflection questions; at least one must be answered.
 * Calls onSave(answers) when the learner taps "Save reflections".
 */
export default function ReflectionPanel({ questions, onSave, onBack }) {
  const [answers, setAnswers] = useState(questions.map(() => ''));
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const setAnswer = (i, val) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[i] = val;
      return next;
    });
    if (error) setError('');
  };

  const skipAnswer = (i) => setAnswer(i, '');

  const handleSave = async () => {
    const answered = answers.filter((a) => a.trim().length > 0);
    if (answered.length === 0) {
      setError('Please answer at least one question before continuing.');
      return;
    }
    setSaving(true);
    const payload = questions.map((q, i) => ({
      question: q,
      answer: answers[i].trim(),
    }));
    await onSave(payload);
    setSaving(false);
  };

  return (
    <div className="min-h-screen bg-gi-deep flex flex-col">
      {/* Header */}
      <div className="px-6 py-6 border-b border-gi-slate">
        <button
          onClick={onBack}
          className="text-gi-horizon text-sm mb-4 flex items-center gap-2 hover:text-gi-white transition-colors"
        >
          ← Back to story
        </button>
        <h2 className="text-2xl font-light text-gi-white tracking-wide">
          Reflect.
        </h2>
        <p className="text-gi-horizon text-sm mt-1">
          Take a moment. There are no right answers here.
        </p>
      </div>

      {/* Questions */}
      <div className="flex-1 px-6 py-6 overflow-y-auto">
        <div className="flex flex-col gap-6">
          {questions.map((question, i) => (
            <div
              key={i}
              className="gi-card p-5"
            >
              <p className="text-gi-white font-medium text-sm leading-relaxed mb-4">
                {question}
              </p>
              <textarea
                value={answers[i]}
                onChange={(e) => setAnswer(i, e.target.value)}
                maxLength={MAX_CHARS}
                placeholder="Write your thoughts here…"
                rows={4}
                className="w-full resize-none text-gi-white text-sm leading-relaxed placeholder:text-gi-mist focus:outline-none focus:ring-1 focus:ring-gi-gold/40 rounded-lg p-3 transition-colors"
                style={{ background: '#334155', border: 'none' }}
              />
              <div className="flex justify-between items-center mt-2">
                <button
                  onClick={() => skipAnswer(i)}
                  className="text-gi-mist text-xs hover:text-gi-horizon transition-colors"
                >
                  {answers[i].trim() ? 'Clear' : 'Skip this one'}
                </button>
                <span className="text-gi-mist text-xs">
                  {answers[i].length}/{MAX_CHARS}
                </span>
              </div>
            </div>
          ))}
        </div>

        {error && (
          <p className="text-gi-ember text-sm text-center mt-4">{error}</p>
        )}
      </div>

      {/* CTA */}
      <div className="px-6 pb-8 pt-4 border-t border-gi-slate">
        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full bg-gi-gold text-gi-deep font-semibold py-4 rounded-gi hover:opacity-90 transition-opacity disabled:opacity-60"
        >
          {saving ? 'Saving…' : 'Save reflections & open journal'}
        </button>
      </div>
    </div>
  );
}
