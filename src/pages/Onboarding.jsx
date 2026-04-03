import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import SarahAvatar from '../components/avatars/SarahAvatar';
import KenjiAvatar from '../components/avatars/KenjiAvatar';
import { saveOnboardingBaseline } from '../services/firestoreService';

const TOTAL_STEPS = 5;

// ─── Reusable step progress dots ─────────────────────────────────────────────
function StepDots({ current, total }) {
  return (
    <div className="flex justify-center gap-2 mb-8">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`rounded-full transition-all duration-300 ${
            i + 1 === current
              ? 'w-6 h-2 bg-gi-gold'
              : i + 1 < current
              ? 'w-2 h-2 bg-gi-gold opacity-50'
              : 'w-2 h-2 bg-gi-mist opacity-40'
          }`}
        />
      ))}
    </div>
  );
}

// ─── Slider component ─────────────────────────────────────────────────────────
function LabelledSlider({ label, value, onChange }) {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-start mb-3">
        <p className="text-gi-white text-sm leading-relaxed flex-1 pr-4">{label}</p>
        <span className="text-gi-gold font-light text-2xl w-8 text-right flex-shrink-0">{value}</span>
      </div>
      <input
        type="range"
        min={1}
        max={10}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1 appearance-none rounded-full cursor-pointer"
        style={{
          background: `linear-gradient(to right, #FFD559 0%, #FFD559 ${(value - 1) / 9 * 100}%, #4A6478 ${(value - 1) / 9 * 100}%, #4A6478 100%)`,
          outline: 'none',
        }}
      />
      <div className="flex justify-between text-gi-mist text-xs mt-1">
        <span>Not at all</span>
        <span>Completely</span>
      </div>
    </div>
  );
}

// ─── Main Onboarding Component ────────────────────────────────────────────────
export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [saving, setSaving] = useState(false);

  // Step 3 baseline sliders
  const [baseline, setBaseline] = useState({
    purpose: 5,
    teamDependency: 5,
    reflection: 5,
    autonomy: 5,
  });

  const { currentUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();

  // If onboarding is already complete, go home
  useEffect(() => {
    if (currentUser?.onboardingComplete) {
      navigate('/home');
    }
  }, [currentUser, navigate]);

  const handleSaveBaseline = async () => {
    setSaving(true);
    try {
      await saveOnboardingBaseline(currentUser.uid, baseline);
    } catch (err) {
      console.error('Error saving baseline:', err);
    } finally {
      setSaving(false);
      setStep(4);
    }
  };

  const handleFinish = async () => {
    setSaving(true);
    try {
      await updateUserProfile(currentUser.uid, { onboardingComplete: true });
    } catch (err) {
      console.error('Error completing onboarding:', err);
    } finally {
      setSaving(false);
      navigate('/home?firstVisit=true');
    }
  };

  // ── Step 1: Welcome bridge ─────────────────────────────────────────────────
  const renderStep1 = () => (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
      <StepDots current={1} total={TOTAL_STEPS} />

      <div className="mb-8">
        <div className="w-16 h-px bg-gi-gold mx-auto mb-8 opacity-60" />
        <h1 className="text-4xl font-light text-gi-white tracking-wide leading-tight mb-4">
          Welcome to your<br />Genba Ikigai journey.
        </h1>
        <div className="w-16 h-px bg-gi-gold mx-auto mt-8 mb-8 opacity-60" />
        <p className="text-gi-horizon text-lg leading-relaxed max-w-xs mx-auto">
          You've just watched the Introduction.<br />Now we go deeper.
        </p>
      </div>

      <button
        onClick={() => setStep(2)}
        className="bg-gi-gold text-gi-deep font-semibold px-10 py-4 rounded-gi hover:opacity-90 transition-opacity"
      >
        Let's begin
      </button>
    </div>
  );

  // ── Step 2: What this app is ──────────────────────────────────────────────
  const renderStep2 = () => (
    <div className="flex flex-col min-h-screen px-6 py-10">
      <StepDots current={2} total={TOTAL_STEPS} />

      <div className="mb-8">
        <h2 className="text-2xl font-light text-gi-white tracking-wide mb-2">
          Your companion.
        </h2>
        <p className="text-gi-horizon text-sm">Three tools. One purpose.</p>
      </div>

      <div className="flex-1 flex flex-col gap-4">
        {[
          {
            icon: '📖',
            title: 'Case Studies',
            desc: 'Follow Sarah and Kenji across all five modules',
          },
          {
            icon: '📓',
            title: 'Your Journal',
            desc: 'Record your reflections and insights as you learn',
          },
          {
            icon: '📊',
            title: 'Your Progress',
            desc: 'Track your habits and growth over time',
          },
        ].map(({ icon, title, desc }) => (
          <div
            key={title}
            className="gi-card p-6 flex items-center gap-5"
          >
            <span className="text-3xl flex-shrink-0">{icon}</span>
            <div>
              <p className="text-gi-white font-medium mb-0.5">{title}</p>
              <p className="text-gi-horizon text-sm">{desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-8">
        <button
          onClick={() => setStep(3)}
          className="w-full bg-gi-gold text-gi-deep font-semibold py-4 rounded-gi hover:opacity-90 transition-opacity"
        >
          Got it
        </button>
      </div>
    </div>
  );

  // ── Step 3: Baseline sliders ───────────────────────────────────────────────
  const renderStep3 = () => (
    <div className="flex flex-col min-h-screen px-6 py-10">
      <StepDots current={3} total={TOTAL_STEPS} />

      <div className="mb-8">
        <h2 className="text-2xl font-light text-gi-white tracking-wide mb-2">
          Before we start — a quick snapshot.
        </h2>
        <p className="text-gi-horizon text-sm leading-relaxed">
          No right or wrong answers. This is just your starting point.
        </p>
      </div>

      <div className="flex-1">
        <LabelledSlider
          label="How clear are you on your leadership purpose right now?"
          value={baseline.purpose}
          onChange={(v) => setBaseline((b) => ({ ...b, purpose: v }))}
        />
        <LabelledSlider
          label="How much do you feel your team depends on you to solve problems?"
          value={baseline.teamDependency}
          onChange={(v) => setBaseline((b) => ({ ...b, teamDependency: v }))}
        />
        <LabelledSlider
          label="How often do you reflect on your own leadership habits?"
          value={baseline.reflection}
          onChange={(v) => setBaseline((b) => ({ ...b, reflection: v }))}
        />
        <LabelledSlider
          label="How confident are you that your team would improve without you present?"
          value={baseline.autonomy}
          onChange={(v) => setBaseline((b) => ({ ...b, autonomy: v }))}
        />
      </div>

      <div className="pt-4">
        <button
          onClick={handleSaveBaseline}
          disabled={saving}
          className="w-full bg-gi-gold text-gi-deep font-semibold py-4 rounded-gi hover:opacity-90 transition-opacity disabled:opacity-60"
        >
          {saving ? 'Saving…' : 'Save my baseline'}
        </button>
      </div>
    </div>
  );

  // ── Step 4: Meet the characters ────────────────────────────────────────────
  const renderStep4 = () => (
    <div className="flex flex-col min-h-screen px-6 py-10">
      <StepDots current={4} total={TOTAL_STEPS} />

      <div className="mb-8">
        <h2 className="text-2xl font-light text-gi-white tracking-wide mb-2">
          Meet the characters.
        </h2>
        <p className="text-gi-horizon text-sm">
          You'll follow them across all five modules.
        </p>
      </div>

      <div className="flex-1 flex flex-col gap-5">
        {/* Sarah */}
        <div className="gi-card p-6">
          <div className="flex items-center gap-5 mb-4">
            <SarahAvatar size={64} />
            <div>
              <p className="text-gi-white font-semibold text-xl">Sarah Chen</p>
              <p className="text-gi-horizon text-sm italic">Production Manager</p>
            </div>
          </div>
          <p className="text-gi-horizon text-sm leading-relaxed">
            Eight years in production management. Highly competent, deeply trusted, and quietly exhausted.
            She has built a team that depends on her for everything — and she is only now beginning to
            see what that cost.
          </p>
        </div>

        {/* Kenji */}
        <div className="gi-card p-6">
          <div className="flex items-center gap-5 mb-4">
            <KenjiAvatar size={64} />
            <div>
              <p className="text-gi-white font-semibold text-xl">Kenji Tanaka</p>
              <p className="text-gi-horizon text-sm italic">Genba Coach</p>
            </div>
          </div>
          <p className="text-gi-horizon text-sm leading-relaxed">
            An external Genba coach with decades of experience walking production floors.
            He carries no slides and asks more than he answers. His questions have a way of
            surfacing what leaders already know — but haven't yet been willing to see.
          </p>
        </div>
      </div>

      <div className="pt-8">
        <button
          onClick={() => setStep(5)}
          className="w-full bg-gi-gold text-gi-deep font-semibold py-4 rounded-gi hover:opacity-90 transition-opacity"
        >
          Start Chapter 1
        </button>
      </div>
    </div>
  );

  // ── Step 5: Module selector confirmation ──────────────────────────────────
  const MODULES = [
    { id: 'introduction', label: 'Intro' },
    { id: 'leading-self', label: 'Self' },
    { id: 'leading-tribe', label: 'Tribe' },
    { id: 'problem-solving', label: 'Problem' },
    { id: 'culture-change', label: 'Culture' },
  ];

  const renderStep5 = () => (
    <div className="flex flex-col min-h-screen px-6 py-10">
      <StepDots current={5} total={TOTAL_STEPS} />

      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <p className="text-gi-horizon text-sm uppercase tracking-widest mb-6">You're starting with</p>
        <h2 className="text-3xl font-light text-gi-white tracking-wide mb-2">
          The Introduction Module
        </h2>
        <div className="w-12 h-px bg-gi-gold mx-auto my-6 opacity-60" />

        {/* Module progress pills */}
        <div className="flex gap-2 mb-10 flex-wrap justify-center">
          {MODULES.map((m, i) => (
            <div
              key={m.id}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                i === 0
                  ? 'bg-gi-gold text-gi-deep'
                  : 'bg-gi-slate text-gi-mist border border-gi-mist/30'
              }`}
            >
              {i === 0 ? '→ ' : ''}{m.label}
            </div>
          ))}
        </div>

        <p className="text-gi-horizon text-sm leading-relaxed max-w-xs">
          Complete each module to unlock the next chapter. Take your time.
        </p>
      </div>

      <div className="pt-4">
        <button
          onClick={handleFinish}
          disabled={saving}
          className="w-full bg-gi-gold text-gi-deep font-semibold py-4 rounded-gi hover:opacity-90 transition-opacity disabled:opacity-60"
        >
          {saving ? 'Setting up…' : 'Enter the app'}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gi-deep">
      {step === 1 && renderStep1()}
      {step === 2 && renderStep2()}
      {step === 3 && renderStep3()}
      {step === 4 && renderStep4()}
      {step === 5 && renderStep5()}
    </div>
  );
}
