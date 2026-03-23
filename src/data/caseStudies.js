// Case Study content for all 5 modules.
// moduleId values: introduction | leading-self | leading-tribe | problem-solving | culture-change
//
// stopAndThinkPrompts — these are the workbook prompts shown in the
// "Reflection — Stop and Think" journal entry flow. They are different
// from the end-of-chapter reflectionQuestions (which appear after the story).

export const MODULE_ORDER = [
  'introduction',
  'leading-self',
  'leading-tribe',
  'problem-solving',
  'culture-change',
];

export const MODULE_LABELS = {
  'introduction':    'Introduction',
  'leading-self':    'Leading Self',
  'leading-tribe':   'Leading the Tribe',
  'problem-solving': 'Problem-Solving',
  'culture-change':  'Culture Change',
};

export const caseStudies = {
  introduction: {
    title: 'Week 1: The Diagnosis',
    moduleLabel: 'Introduction',
    moduleId: 'introduction',
    teaser: 'Sarah meets Kenji for the first time. He asks just one question.',
    scenes: [
      {
        type: 'narrator',
        text: 'Monday morning. Sarah has been a production manager for eight years. Kenji has just arrived as an external Genba coach. She expected a meeting room. He asked to walk the floor first.',
      },
      {
        type: 'sarah',
        text: "I hope you don't mind — I have a presentation to prepare this afternoon. Can we make this quick?",
      },
      {
        type: 'kenji',
        text: "Of course. Let's just walk. You don't need to explain anything yet.",
      },
      {
        type: 'narrator',
        text: 'They walk for twenty minutes. Kenji says almost nothing. He stops occasionally. He watches. He notices three operators waiting for Sarah to answer a question before they can continue. He sees a visual board covered in notes only Sarah can read. He watches a team member solve a quality problem alone in a corner, not asking anyone.',
      },
      { type: 'kenji', text: 'Thank you. Shall we sit?' },
      {
        type: 'narrator',
        text: "Back in Sarah's office. She waits for his assessment. He is quiet for a moment.",
      },
      { type: 'kenji', text: 'When you are not here, Sarah — what happens?' },
      {
        type: 'sarah',
        text: "The team manages. They know the processes. I've trained them well. There are always a few issues but nothing that can't wait until I'm back.",
      },
      { type: 'kenji', text: 'I did not ask what your team does. I asked what happens.' },
      {
        type: 'narrator',
        text: 'The silence that followed was the longest Sarah had experienced in a meeting. She found she did not have an answer she believed in.',
      },
      {
        type: 'kenji',
        text: 'The floor told me something today. It told me that your team is capable. It also told me that they have learned not to try without you. Those two things are connected. That is where we begin.',
      },
      { type: 'sarah', text: "Are you saying I'm the problem?" },
      {
        type: 'kenji',
        text: 'I am saying you may also be the solution. But only if you are willing to look honestly at what you have built.',
      },
    ],
    reflectionQuestions: [
      'When you are not present — what actually happens in your team or area of responsibility?',
      'In what ways might your team have learned to depend on you rather than develop themselves?',
      'What is one habit you have that might be preventing others from growing?',
    ],
    stopAndThinkPrompts: [
      'What is something you discovered about yourself as a leader this week?',
      'When did you hold back from delegating — and why?',
      'What would your team say about your leadership if they were completely honest?',
    ],
    journalPrompt:
      'Describe a recent situation where you solved a problem your team could have solved themselves. What stopped you from stepping back?',
  },

  'leading-self': {
    title: 'Week 2: The Mirror',
    moduleLabel: 'Leading Self',
    moduleId: 'leading-self',
    teaser: 'Before you can lead others, you must be honest about yourself.',
    scenes: [
      {
        type: 'narrator',
        text: "Coming soon. This chapter will be available after you complete the Introduction module's materials.",
      },
    ],
    reflectionQuestions: [],
    stopAndThinkPrompts: [
      'When did you last choose comfort over growth?',
      'What does your worst leadership behavior look like — and what triggers it?',
      'What would change if you led more from your values and less from habit?',
    ],
    journalPrompt: '',
    comingSoon: true,
  },

  'leading-tribe': {
    title: 'Week 3: The Team',
    moduleLabel: 'Leading the Tribe',
    moduleId: 'leading-tribe',
    teaser: 'What does your team really need from you?',
    scenes: [
      {
        type: 'narrator',
        text: 'Coming soon. This chapter will be available after you complete the Leading Self module.',
      },
    ],
    reflectionQuestions: [],
    stopAndThinkPrompts: [
      'How does your team feel when they are around you — honestly?',
      'Who in your team needs more space to grow, and what is stopping you from giving it?',
      'What would it mean to truly serve your team this week, rather than manage them?',
    ],
    journalPrompt: '',
    comingSoon: true,
  },

  'problem-solving': {
    title: 'Week 4: The Root',
    moduleLabel: 'Problem-Solving',
    moduleId: 'problem-solving',
    teaser: 'Most problems are symptoms. Kenji never stops at the first answer.',
    scenes: [
      {
        type: 'narrator',
        text: 'Coming soon. This chapter will be available after you complete the Leading the Tribe module.',
      },
    ],
    reflectionQuestions: [],
    stopAndThinkPrompts: [
      'What problem keeps coming back because you never found the real root cause?',
      'How often do you jump to a solution before fully understanding the problem?',
      'What conversation have you been avoiding that would actually solve a persistent issue?',
    ],
    journalPrompt: '',
    comingSoon: true,
  },

  'culture-change': {
    title: 'Week 5: The Shift',
    moduleLabel: 'Culture Change',
    moduleId: 'culture-change',
    teaser: 'Culture is not what you say. It is what you do when no one is watching.',
    scenes: [
      {
        type: 'narrator',
        text: 'Coming soon. This chapter will be available after you complete the Problem-Solving module.',
      },
    ],
    reflectionQuestions: [],
    stopAndThinkPrompts: [
      'What three behaviors, if you changed them tomorrow, would most shift the culture of your team?',
      'What are you tolerating in your team right now that you know you need to address?',
      'If someone watched you work for a full day, what would they conclude about the culture you are building?',
    ],
    journalPrompt: '',
    comingSoon: true,
  },
};
