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
    title: 'The Diagnosis',
    subtitle: 'Week 1: The Diagnosis',
    moduleLabel: 'Introduction',
    moduleId: 'introduction',
    journalEntryType: 'genba-moment',
    teaser: 'Sarah meets Kenji for the first time. He asks just one question.',
    scenes: [
      // ── Act 1: The Arrival ─────────────────────────────────────────────────
      { type: 'act', label: 'Act 1 — The Arrival' },
      {
        type: 'narrator',
        text: 'Monday morning. 7:52 a.m. The factory floor hums with the first shift. Sarah Chen has been production manager here for eight years. She has heard of Genba coaches — consultants who walk the floor instead of filling in forms. She is not sure what to expect.',
      },
      {
        type: 'narrator',
        text: 'Kenji Tanaka arrives with no laptop, no clipboard, no slide deck. He carries a small notebook and a cup of tea.',
      },
      {
        type: 'sarah',
        text: 'Welcome. I have set up the conference room — I can walk you through our KPIs, the last three months of output data, and our improvement roadmap.',
      },
      {
        type: 'kenji',
        text: 'Thank you, Sarah. Before we do that — would you take me to the floor?',
      },
      {
        type: 'sarah',
        text: "Of course. Though I should mention — I have a presentation to finalise this afternoon. Can we keep it reasonably brief?",
      },
      {
        type: 'kenji',
        text: "We can walk at your pace. You don't need to explain anything. I just want to see.",
      },

      // ── Act 2: The Walk ────────────────────────────────────────────────────
      { type: 'act', label: 'Act 2 — The Walk' },
      {
        type: 'narrator',
        text: 'They step onto the production floor. Kenji does not rush. He pauses at a workstation where two operators are standing idle, watching a quality alert on a screen. He says nothing. He watches.',
      },
      {
        type: 'narrator',
        text: 'Three minutes pass. One of the operators glances toward the office. Then back at the screen. Then toward the office again.',
      },
      {
        type: 'sarah',
        text: "They're waiting for me to sign off on the deviation. It's faster if I just do it — they know that.",
      },
      {
        type: 'kenji',
        text: 'How long have they known that?',
      },
      {
        type: 'sarah',
        text: "I don't know. A while. It works.",
      },
      {
        type: 'narrator',
        text: 'They continue walking. Kenji stops at the visual management board — a large wall of laminated sheets, handwritten notes, printed targets. He reads it slowly.',
      },
      {
        type: 'kenji',
        text: 'Who updates this board?',
      },
      {
        type: 'sarah',
        text: 'I do. Every morning. The team knows where to look.',
      },
      {
        type: 'kenji',
        text: 'And if you are not here in the morning?',
      },
      {
        type: 'sarah',
        text: "I'm always here in the morning.",
      },
      {
        type: 'narrator',
        text: 'In the far corner of the floor, a young team member is working through a recurring fault on her own — reworking parts by hand, checking each one against a printed specification. She does not call for help. She does not flag it on the board. She just works.',
      },
      {
        type: 'kenji',
        text: "She's been doing that for a while.",
      },
      {
        type: 'sarah',
        text: "Yes. That's Priya. She's conscientious. She just gets on with things.",
      },
      {
        type: 'kenji',
        text: 'Has she ever been asked to document what she found?',
      },
      {
        type: 'sarah',
        text: 'Not formally. I usually catch it in the handover report.',
      },
      {
        type: 'narrator',
        text: 'Kenji makes a small note. They walk on.',
      },

      // ── Act 3: The Office ──────────────────────────────────────────────────
      { type: 'act', label: 'Act 3 — The Office' },
      {
        type: 'narrator',
        text: "Back in Sarah's office. Two chairs. A small table. Through the glass wall, the floor is visible. Kenji sets his notebook down but does not open it. He looks out at the floor for a moment before he speaks.",
      },
      {
        type: 'kenji',
        text: "Your floor is clean. The team is clearly skilled. I can see that Sarah's team runs well — when Sarah is here.",
      },
      {
        type: 'sarah',
        text: "Thank you. We've worked hard on our systems.",
      },
      {
        type: 'kenji',
        text: 'I believe you. That is also what concerns me.',
      },
      {
        type: 'sarah',
        text: 'What do you mean?',
      },
      {
        type: 'kenji',
        text: "The systems work because you are in the middle of them. The board needs you. The deviation sign-off needs you. Priya solved a quality issue this morning — alone, quietly — because she has learned it is easier than bringing it to a system that requires your presence to move.",
      },
      {
        type: 'narrator',
        text: 'Sarah is quiet. She looks through the glass at the floor.',
      },
      {
        type: 'sarah',
        text: 'I built it that way because it worked.',
      },
      {
        type: 'kenji',
        text: 'It worked for output. It also built something else — a team that has learned to wait. A team that has learned not to solve problems without you.',
      },

      // ── Act 4: The Question ────────────────────────────────────────────────
      { type: 'act', label: 'Act 4 — The Question' },
      {
        type: 'kenji',
        text: 'When you are not here, Sarah — what actually happens?',
      },
      {
        type: 'sarah',
        text: "The team manages. They know the processes. I've trained them well. There are always a few issues but nothing that can't wait until I'm back.",
      },
      {
        type: 'kenji',
        text: 'I did not ask what your team does. I asked what happens.',
      },
      {
        type: 'narrator',
        text: 'The silence that followed was the longest Sarah had experienced in a work meeting. She found herself searching for an answer she believed. She could not find one.',
      },
      {
        type: 'kenji',
        text: 'The floor told me something today. Your team is capable. They are also waiting. Those two things should not be true at the same time. That is where we begin.',
      },
      {
        type: 'sarah',
        text: "Are you saying I'm the problem?",
      },
      {
        type: 'kenji',
        text: 'I am saying you may also be the solution. But only if you are willing to look honestly at what you have built — and what you may need to unlearn.',
      },
      {
        type: 'narrator',
        text: "Sarah looked at the floor through the glass. For the first time in years, she wasn't sure what she was looking at.",
      },
      {
        type: 'kenji',
        text: "Before we look at your roadmap — I want you to sit with one question. Just one. Take it with you today. Write it down if that helps.",
      },
      {
        type: 'kenji',
        text: "\"If I disappeared from this floor for a week — what would that reveal about the system I have built?\"",
      },
    ],
    reflectionQuestions: [
      'When you are not present — what actually happens in your team or area of responsibility?',
      'In what ways might your team have learned to depend on you rather than grow themselves?',
      'What is one leadership habit you have that might be preventing others from stepping up?',
    ],
    stopAndThinkPrompts: {
      'Part 1 — Your Ikigai': [
        'What aspects of your leadership role do you genuinely love — not what you think you should love, but what actually energises you?',
        'What are you naturally good at as a leader — the things others notice even when you do not?',
        'What does your team, your organisation, or your community most need from a leader right now?',
        'What does good leadership look like in your context — what behaviours are valued, recognised, and rewarded?',
      ],
      'Part 2 — Leading to Serve': [
        'Think of a leader who had a lasting positive impact on you. What did they do differently?',
        'When have you felt most useful as a leader — not most in control, but most useful?',
        'What would it mean to lead in service of your team\'s growth, rather than the team\'s performance?',
      ],
      'Part 3 — The 16 Habits': [
        'Looking at the 16 habits of a Genba leader — which one feels most natural to you right now?',
        'Which habit feels most challenging — and what makes it difficult in your current context?',
        'What is one small daily action you could take this week to practise your chosen habit?',
      ],
      'Part 4 — Two Paths': [
        'Path A: You continue leading the way you lead now. What does your team look like in 12 months?',
        'Path B: You commit to one significant change in your leadership. What changes — and what does that cost you?',
        'Which path feels more honest? Which path feels more necessary?',
      ],
    },
    journalPrompt:
      'Describe a specific Genba Moment — a real situation on your floor or in your team where you noticed something. What was happening around you? What were you doing? Who else was involved? What made this moment meaningful — not what should have, but what actually did? Which of the four Ikigai circles does this moment connect to for you?',
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
