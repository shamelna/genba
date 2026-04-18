// Daily Micro-Practice System — Module 1: Leading Self
// 18 practices across 2 cycles (9 each), rotating through Hansei, Humility, Integrity, Respect.
// Self-paced: no locked days, no penalties. Students advance when they mark complete.

export const dailyPractices = [
  // ═══════════════════════════════════════════════════
  // CYCLE 1 — Foundational Practices (Practices 1–9)
  // ═══════════════════════════════════════════════════

  {
    id: 'practice-1',
    cycle: 1,
    dayInCycle: 1,
    habitId: 'hansei',
    habitName: 'Hansei (Self-Reflection)',
    type: 'foundation',
    prompt: 'What did I avoid looking at today? Or recently?',
    guidance: "Don't overthink this. Just notice. Write it down if it helps.",
    time: '~5 minutes',
    journalType: 'stop-and-think',
  },
  {
    id: 'practice-2',
    cycle: 1,
    dayInCycle: 2,
    habitId: 'humility',
    habitName: 'Humility (Stepping Back)',
    type: 'foundation',
    prompt: 'Where did I ask instead of tell today?',
    guidance: 'Think of one moment. Who did you ask a question instead of solving for?',
    time: '~5 minutes',
    journalType: 'stop-and-think',
  },
  {
    id: 'practice-3',
    cycle: 1,
    dayInCycle: 3,
    habitId: 'integrity',
    habitName: 'Integrity (Keeping Commitments)',
    type: 'foundation',
    prompt: 'Did I keep one commitment I made? Why or why not?',
    guidance: 'Pick one commitment. Were you true to it today?',
    time: '~2 minutes',
    journalType: 'stop-and-think',
  },
  {
    id: 'practice-4',
    cycle: 1,
    dayInCycle: 4,
    habitId: 'respect',
    habitName: 'Respect (Seeing People)',
    type: 'foundation',
    prompt: 'Who on my team did I see more clearly today?',
    guidance: 'Who caught your attention? What did you notice?',
    time: '~10 minutes',
    journalType: 'stop-and-think',
  },
  {
    id: 'practice-5',
    cycle: 1,
    dayInCycle: 5,
    habitId: 'hansei',
    habitName: 'Hansei (Self-Reflection)',
    type: 'deep',
    prompt: 'What pattern have I been repeating that I haven\'t faced?',
    guidance: 'Look deeper. What keeps happening?',
    time: '~8 minutes',
    journalType: 'stop-and-think',
  },
  {
    id: 'practice-6',
    cycle: 1,
    dayInCycle: 6,
    habitId: 'humility',
    habitName: 'Humility (Stepping Back)',
    type: 'deep',
    prompt: 'One person I need to trust more — what would happen if I did?',
    guidance: 'Name them. Imagine letting go.',
    time: '~10 minutes',
    journalType: 'stop-and-think',
  },
  {
    id: 'practice-7',
    cycle: 1,
    dayInCycle: 7,
    habitId: 'integrity',
    habitName: 'Integrity (Keeping Commitments)',
    type: 'deep',
    prompt: 'One commitment I made that I\'m struggling to keep — why?',
    guidance: 'Be honest. What\'s the barrier?',
    time: '~5 minutes',
    journalType: 'stop-and-think',
  },
  {
    id: 'practice-8',
    cycle: 1,
    dayInCycle: 8,
    habitId: 'respect',
    habitName: 'Respect (Seeing People)',
    type: 'deep',
    prompt: 'One person whose potential I haven\'t fully acknowledged.',
    guidance: 'What can they do that you haven\'t recognized?',
    time: '~8 minutes',
    journalType: 'stop-and-think',
  },
  {
    id: 'practice-9',
    cycle: 1,
    dayInCycle: 9,
    habitId: 'integration',
    habitName: 'All Four Habits',
    type: 'integration',
    prompt: 'What have the past practices shown me about myself?',
    guidance: 'Look back. What\'s the pattern across all your reflections?',
    time: '~15 minutes',
    journalType: 'stop-and-think',
  },

  // ═══════════════════════════════════════════════════
  // CYCLE 2 — New Prompts, Same Habit Focus (Practices 10–18)
  // ═══════════════════════════════════════════════════

  {
    id: 'practice-10',
    cycle: 2,
    dayInCycle: 1,
    habitId: 'hansei',
    habitName: 'Hansei (Self-Reflection)',
    type: 'foundation',
    prompt: 'In what situation do I feel the most defensive about looking at myself?',
    guidance: 'Notice where you resist self-reflection.',
    time: '~5 minutes',
    journalType: 'stop-and-think',
  },
  {
    id: 'practice-11',
    cycle: 2,
    dayInCycle: 2,
    habitId: 'humility',
    habitName: 'Humility (Stepping Back)',
    type: 'foundation',
    prompt: 'What decision did I make alone today that I could have asked about?',
    guidance: 'Who could have helped?',
    time: '~5 minutes',
    journalType: 'stop-and-think',
  },
  {
    id: 'practice-12',
    cycle: 2,
    dayInCycle: 3,
    habitId: 'integrity',
    habitName: 'Integrity (Keeping Commitments)',
    type: 'foundation',
    prompt: 'Which of my daily decisions were aligned with my stated values?',
    guidance: 'Were you living what you say matters?',
    time: '~3 minutes',
    journalType: 'stop-and-think',
  },
  {
    id: 'practice-13',
    cycle: 2,
    dayInCycle: 4,
    habitId: 'respect',
    habitName: 'Respect (Seeing People)',
    type: 'foundation',
    prompt: 'Who did I overlook or not fully hear today?',
    guidance: 'Who needed to be seen?',
    time: '~8 minutes',
    journalType: 'stop-and-think',
  },
  {
    id: 'practice-14',
    cycle: 2,
    dayInCycle: 5,
    habitId: 'hansei',
    habitName: 'Hansei (Self-Reflection)',
    type: 'deep',
    prompt: 'What am I most afraid to see clearly about my leadership?',
    guidance: 'Sit with that fear. What is it protecting?',
    time: '~8 minutes',
    journalType: 'stop-and-think',
  },
  {
    id: 'practice-15',
    cycle: 2,
    dayInCycle: 6,
    habitId: 'humility',
    habitName: 'Humility (Stepping Back)',
    type: 'deep',
    prompt: 'Where is my team waiting for me to step back so they can step forward?',
    guidance: 'Where are you still holding on?',
    time: '~10 minutes',
    journalType: 'stop-and-think',
  },
  {
    id: 'practice-16',
    cycle: 2,
    dayInCycle: 7,
    habitId: 'integrity',
    habitName: 'Integrity (Keeping Commitments)',
    type: 'deep',
    prompt: 'What would my team say if I asked: "Do you believe I keep my commitments?"',
    guidance: 'Be honest. What would their real answer be?',
    time: '~5 minutes',
    journalType: 'stop-and-think',
  },
  {
    id: 'practice-17',
    cycle: 2,
    dayInCycle: 8,
    habitId: 'respect',
    habitName: 'Respect (Seeing People)',
    type: 'deep',
    prompt: 'Who on my team has capability I\'ve been taking from them by over-solving?',
    guidance: 'What are they not getting to do because of you?',
    time: '~8 minutes',
    journalType: 'stop-and-think',
  },
  {
    id: 'practice-18',
    cycle: 2,
    dayInCycle: 9,
    habitId: 'integration',
    habitName: 'All Four Habits',
    type: 'integration',
    prompt: 'After two full cycles: what is the one thing I\'m most committed to changing?',
    guidance: 'Not what you should change. What you\'re actually ready to change.',
    time: '~15 minutes',
    journalType: 'stop-and-think',
  },
];

// Total number of practices in the cycle
export const PRACTICE_CYCLE_LENGTH = dailyPractices.length;

// Get the practice for a given index (wraps around)
export const getPracticeByIndex = (index) => {
  const wrappedIndex = index % dailyPractices.length;
  return dailyPractices[wrappedIndex];
};

// Habit color mapping
export const habitColors = {
  hansei:      '#4AB3A0', // teal
  humility:    '#FFD559', // gold
  integrity:   '#60A5FA', // blue
  respect:     '#F97316', // orange
  integration: '#A78BFA', // purple
};

// Habit icons
export const habitIcons = {
  hansei:      '🪞',
  humility:    '🙏',
  integrity:   '🤝',
  respect:     '👁️',
  integration: '🧩',
};
