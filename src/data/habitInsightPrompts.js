// Habit Insight Prompts — Module 1: Leading Self
// Guided reflection prompts for each of the 4 habits.
// Used in the Habit Insight journal entry type.

export const habitInsightPrompts = {
  hansei: {
    habitId: 'hansei',
    habitName: 'Hansei (Self-Reflection)',
    entryTitle: 'Habit Insight: Hansei (Self-Reflection)',
    prompts: [
      {
        question: 'What did you notice about yourself as you learned this habit?',
        subText: '(How did honest self-seeing feel?)',
        placeholder: 'Describe your experience...',
        required: true,
      },
      {
        question: 'Where in your leadership do you see the impact of NOT doing Hansei?',
        subText: '(What are you avoiding looking at?)',
        placeholder: 'Be honest about where you\'re not looking...',
        required: true,
      },
      {
        question: 'One moment this week where you\'ll practice Hansei:',
        subText: '(Pick a specific time/situation)',
        placeholder: 'Describe when and where you\'ll practice...',
        required: true,
      },
    ],
    optionalPrompt: {
      question: "What surprised you most about Sarah's Hansei journey?",
      placeholder: '[Optional]',
    },
  },

  humility: {
    habitId: 'humility',
    habitName: 'Humility & Gratitude (Stepping Back)',
    entryTitle: 'Habit Insight: Humility & Gratitude (Stepping Back)',
    prompts: [
      {
        question: 'What felt true about stepping back and letting others lead?',
        subText: '(What scared you? What excited you?)',
        placeholder: 'Describe your feelings about stepping back...',
        required: true,
      },
      {
        question: 'Where do you currently solve things your team could solve?',
        subText: '(Be honest — what do you take from them by doing it?)',
        placeholder: 'Be specific about where you\'re over-solving...',
        required: true,
      },
      {
        question: 'One decision this week you\'ll ask about instead of solving:',
        subText: '(Pick the specific decision)',
        placeholder: 'What\'s one thing you\'ll delegate or ask about?...',
        required: true,
      },
    ],
    optionalPrompt: {
      question: 'Who on your team showed you humility this week?',
      placeholder: '[Optional]',
    },
  },

  integrity: {
    habitId: 'integrity',
    habitName: 'Integrity (Keeping Commitments)',
    entryTitle: 'Habit Insight: Integrity (Words Match Actions)',
    prompts: [
      {
        question: 'What commitment have you made to your team that you\'re NOT currently keeping?',
        subText: '(Be specific)',
        placeholder: 'Describe one broken or unfulfilled commitment...',
        required: true,
      },
      {
        question: 'What\'s stopping you from keeping it?',
        subText: '(What\'s the real barrier?)',
        placeholder: 'What\'s the real obstacle?...',
        required: true,
      },
      {
        question: 'One commitment you\'ll focus on for the next 30 days:',
        subText: '(What will you actually do differently?)',
        placeholder: 'What will you commit to and keep?...',
        required: true,
      },
    ],
    optionalPrompt: {
      question: 'Who shows you integrity in how they lead?',
      placeholder: '[Optional]',
    },
  },

  respect: {
    habitId: 'respect',
    habitName: 'Respect & Mutual Trust (Seeing People)',
    entryTitle: 'Habit Insight: Respect & Mutual Trust (Seeing People)',
    prompts: [
      {
        question: 'Who on your team do you need to see more clearly?',
        subText: '(Describe them in 2–3 sentences)',
        placeholder: 'Who do you need to understand better?...',
        required: true,
      },
      {
        question: 'What capability do you see in them that you haven\'t fully acknowledged?',
        subText: '(What are they actually capable of?)',
        placeholder: 'What potential have you missed?...',
        required: true,
      },
      {
        question: 'One way you\'ll show them you see them:',
        subText: '(Pick a specific action — tell them, give them authority, ask their opinion)',
        placeholder: 'How will you specifically demonstrate your belief in them?...',
        required: true,
      },
    ],
    optionalPrompt: {
      question: 'Who made you feel truly seen by their leadership?',
      placeholder: '[Optional]',
    },
  },
};

// Ordered list for display purposes
export const MODULE_1_HABITS = ['hansei', 'humility', 'integrity', 'respect'];

// Get prompts by habit ID
export const getHabitInsightPrompts = (habitId) => {
  return habitInsightPrompts[habitId] || null;
};
