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
        text: 'Monday morning. A manufacturing facility somewhere in Europe. The kind of place that has been running for thirty years and feels it.',
      },
      {
        type: 'narrator',
        text: 'Sarah Chen has been the production manager here for eight years. She arrived at 6:45 this morning, as she does every morning. There are already three people waiting outside her office with questions.',
      },
      {
        type: 'sarah',
        text: 'Not now — give me ten minutes. I need to check the night shift numbers first.',
      },
      {
        type: 'narrator',
        text: 'Kenji Tanaka has been brought in by the company as an external Genba coach. He is 58 years old. He has worked in lean leadership for 31 years, beginning at Toyota UK and then independently across 140 organisations in 22 countries. He carries nothing with him except a small notebook and a pen.',
      },
      {
        type: 'narrator',
        text: 'He arrives at 8:00. Sarah is in her office. She has been there since 6:45 and has already answered eleven messages, resolved a supplier delivery issue, and attended one unscheduled stand-up on the floor. She stands up to greet him.',
      },
      {
        type: 'sarah',
        text: 'Mr Tanaka. Good to meet you. I hope you found us without trouble.',
      },
      {
        type: 'kenji',
        text: 'I did. Thank you. Before we sit down — could we walk first?',
      },
      {
        type: 'sarah',
        text: 'Of course. I can show you around and explain how we operate. Give me one moment to print the production summary —',
      },
      {
        type: 'kenji',
        text: 'No need for the summary. I would just like to walk.',
      },
      {
        type: 'narrator',
        text: 'Sarah pauses. She is not used to someone declining information. She puts the document down.',
      },
      {
        type: 'sarah',
        text: 'All right. Follow me.',
      },

      // ── Act 2: The Walk ────────────────────────────────────────────────────
      { type: 'act', label: 'Act 2 — The Walk' },
      {
        type: 'narrator',
        text: 'They walk the production floor together. Kenji moves slowly. He stops frequently. He says almost nothing.',
      },
      {
        type: 'narrator',
        text: 'Sarah fills the silence. She explains the layout, the throughput targets, the shift structure, the current quality challenge on Line 4. Kenji listens. He does not take notes.',
      },
      {
        type: 'narrator',
        text: 'After several minutes, Kenji stops beside a visual management board. It is covered in handwritten notes. Several positions are crossed out. Two sticky notes have fallen and are lying on the floor beneath it.',
      },
      {
        type: 'narrator',
        text: 'He asks himself the following questions: I wonder who is the owner of this board? How often do they meet at the board? Who runs the meetings? Does the person running the meeting know what the process and behavioural goals and tasks are of this very important meeting? By just examining the board, it seems the board maybe just expensive wall paper that is seldom used. There certainly is no 5S at this board.',
      },
      {
        type: 'kenji',
        text: 'Who updates this board?',
      },
      {
        type: 'sarah',
        text: 'I do, mostly. Or my deputy when I am not here. We update it each morning.',
      },
      {
        type: 'narrator',
        text: 'Kenji nods slowly. He does not respond. He continues walking.',
      },
      {
        type: 'narrator',
        text: 'Three minutes later, they pass a quality problem on Line 3. A team member is crouching over a rejected part, examining it alone. Two colleagues are standing nearby, watching. No one is speaking. There seems to be no formalised process in solving this quality issue. At least for Kenji, he sees no methodology such as the PAI boards or the D4 (QRQC) method or 5 why.',
      },
      {
        type: 'narrator',
        text: 'He watches a little longer, and realises, there is no process for solving problems. Then he moves on.',
      },
      {
        type: 'sarah',
        text: 'That is Marek. He is one of our best. He will sort it. He likes to sort out these types of problems. That leaves the other team members to get on with other things.',
      },
      {
        type: 'narrator',
        text: 'Kenji stops again. He watches for a moment. Then he moves on.',
      },
      {
        type: 'narrator',
        text: 'Near the end of the floor, two operators are standing idle beside a machine that has been paused. One of them spots Sarah and raises a hand — a question forming in the gesture. Sarah moves toward them immediately.',
      },
      {
        type: 'sarah',
        text: 'What is it?',
      },
      {
        type: 'narrator',
        text: 'The operator explains a small tooling issue. Sarah listens for 30 seconds, gives a clear answer, to which the operators, perform the task she has set them, and the machine restarts. She rejoins Kenji.',
      },
      {
        type: 'sarah',
        text: 'Sorry about that. These things come up.',
      },
      {
        type: 'kenji',
        text: 'Of course they do.',
      },
      {
        type: 'narrator',
        text: 'His tone is entirely neutral. It is impossible to tell if he approves or disapproves. He simply observes, as he has been doing since they stepped onto the floor.',
      },

      // ── Act 3: The Office ──────────────────────────────────────────────────
      { type: 'act', label: 'Act 3 — The Office' },
      {
        type: 'narrator',
        text: 'They return to Sarah\'s office. She offers coffee. Kenji accepts. She sits across from him at her desk. There are papers, two screens, a whiteboard covered in initials and numbers, and a photo of her team from last year\'s quality certification.',
      },
      {
        type: 'narrator',
        text: 'She waits for his assessment. He is quiet for a moment. He looks at his notebook, which he has not opened. He looks up.',
      },
      {
        type: 'kenji',
        text: 'Thank you for the Genba walk.',
      },
      {
        type: 'sarah',
        text: 'Of course. I hope it was useful. I can pull together a full data pack for you — output figures, quality trends, absenteeism, overtime. It would give you a clearer picture.',
      },
      {
        type: 'kenji',
        text: 'Perhaps later. I have a question first.',
      },
      {
        type: 'sarah',
        text: 'Go ahead.',
      },
      {
        type: 'kenji',
        text: 'When you are not here, Sarah — what happens?',
      },
      {
        type: 'narrator',
        text: 'Sarah answers without hesitation.',
      },
      {
        type: 'sarah',
        text: 'The team manages. They know the processes. I have trained them all myself. There are always small issues but nothing that cannot wait until I am back.',
      },
      {
        type: 'kenji',
        text: 'I see.',
      },
      {
        type: 'narrator',
        text: 'A pause.',
      },
      {
        type: 'kenji',
        text: 'I did not ask what your team does when you are not here. I asked what happens.',
      },
      {
        type: 'narrator',
        text: 'Sarah starts to respond, then stops. She begins again, differently. Then stops again.',
      },
      {
        type: 'narrator',
        text: 'The silence that follows is the longest she has experienced in a work meeting in several years. She finds that she does not have an answer she believes in.',
      },

      // ── Act 4: The Question ────────────────────────────────────────────────
      { type: 'act', label: 'Act 4 — The Question' },
      {
        type: 'kenji',
        text: 'I noticed three things on the floor this morning. The first: two operators stopped working and waited for you to answer a question they almost certainly could have resolved between themselves. They waited because they have learned that is what they should do.',
      },
      {
        type: 'kenji',
        text: 'The second: one of your strongest people was solving a quality problem alone, in a corner, not asking anyone for input or support. He has learned to contain problems, not to surface them.',
      },
      {
        type: 'kenji',
        text: 'The third: your visual board is maintained by you. It speaks your language, not the language of the people who work beside it every day.',
      },
      {
        type: 'narrator',
        text: 'Sarah is quiet. Her instinct is to defend. She is very good at defending. But something in the precision of what he has just said stops her.',
      },
      {
        type: 'sarah',
        text: 'Are you saying I am the problem.',
      },
      {
        type: 'narrator',
        text: 'It is not quite a question.',
      },
      {
        type: 'kenji',
        text: 'I am saying you may also be the solution. But only if you are willing to look honestly at what you have built here.',
      },
      {
        type: 'narrator',
        text: 'He lets that sit for a moment.',
      },
      {
        type: 'kenji',
        text: 'The floor told me something today. It told me that your team is capable. It also told me they have learned not to try without you. Those two things are connected. That is where we begin.',
      },
      {
        type: 'sarah',
        text: 'What do you want me to do?',
      },
      {
        type: 'kenji',
        text: 'For now? Nothing. I want you to think about one question. Not answer it today — just hold it.',
      },
      {
        type: 'sarah',
        text: 'What is the question?',
      },
      {
        type: 'kenji',
        text: 'Why does your team need you to be present for things to work?',
      },
      {
        type: 'narrator',
        text: 'He picks up his notebook. He stands.',
      },
      {
        type: 'kenji',
        text: 'I will come back on Thursday. Same time. We can walk again.',
      },
      {
        type: 'sarah',
        text: 'That\'s it? No report? No recommendations?',
      },
      {
        type: 'kenji',
        text: 'Not yet. I have only been here for one morning. I do not know enough to recommend anything.',
      },
      {
        type: 'narrator',
        text: 'He says this without irony. He means it completely.',
      },
      {
        type: 'kenji',
        text: 'Enjoy the rest of your day, Sarah.',
      },
      {
        type: 'narrator',
        text: 'He leaves. Sarah remains at her desk. The coffee has gone cold. On the floor outside her office, she can hear the familiar sound of someone waiting with a question.',
      },
      {
        type: 'narrator',
        text: 'She does not go out immediately. For the first time in a long time, she sits with a thought that is not yet finished.',
      },
      {
        type: 'narrator',
        text: 'END OF CHAPTER 1',
      },
    ],
    reflectionQuestions: [
      'When you are not present — what actually happens in your team or area of responsibility? Not what you think happens. What actually happens.',
      'In what ways might your team have learned to depend on you rather than develop themselves? What did you do — even with good intentions — that taught them this?',
      'What is one habit of yours that may be preventing the people around you from growing?',
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
      'Describe a recent situation where you solved a problem your team could have solved itself. What stopped you from stepping back? What did it cost them — in capability, in confidence, in trust? Remember, it is fine to be present with your team during problem solving but ensure two things: there is a clearly defined process to solving the problem (PAI, 5W, D4, A3..), and don\'t give all the answers. Make a list of "open questions" you could ask the team. Example: "If I were not here, how would you all go about solving this problem?" "what would happen if you tried a structured, team based approach to solving the issue?"…… The key point is, take a look at yourself, as in a mirror and ask, what could you have done differently or better so that your team become more self-reliant in problem solving in the future, and if I could go back in time, what would I have done differently to avoid this situation today that we have!',
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
