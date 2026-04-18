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
    title: 'Leading Self',
    subtitle: 'Four Weeks. Four Habits. One Transformation.',
    moduleLabel: 'Leading Self',
    moduleId: 'leading-self',
    journalEntryType: 'genba-moment',
    teaser: 'Sarah Chen sees herself clearly for the first time. Four habits. Four weeks. One honest journey.',
    comingSoon: false,

    // ── Per-act reflection questions (shown between acts) ───────────────────
    perActReflections: [
      {
        actNumber: 1,
        actTitle: 'The Mirror',
        habitFocus: 'Hansei (Self-Reflection)',
        questions: [
          {
            question: 'What did you notice about Sarah in this act?',
            subText: 'Describe what stood out to you',
            placeholder: 'Describe what you saw about Sarah...',
          },
          {
            question: "What did Kenji see that she didn't see?",
            subText: "What was his insight?",
            placeholder: 'What did Kenji understand about Sarah?',
          },
          {
            question: 'Where do you see this pattern — not looking, avoiding — in your own leadership?',
            subText: 'Be honest about your blind spot',
            placeholder: 'Where do you avoid looking at yourself?...',
          },
        ],
      },
      {
        actNumber: 2,
        actTitle: 'Stepping Back',
        habitFocus: 'Humility (Stepping Back)',
        questions: [
          {
            question: 'What did you feel watching Sarah step back and let her team try?',
            subText: 'What emotions came up?',
            placeholder: 'What did you feel as you watched this unfold?...',
          },
          {
            question: 'Where do you try to control things your team could solve?',
            subText: 'Be honest about where you hold on',
            placeholder: 'Where are you currently over-solving?...',
          },
          {
            question: 'What would change if you trusted them more?',
            subText: 'What would be different?',
            placeholder: 'What possibilities would open up?...',
          },
        ],
      },
      {
        actNumber: 3,
        actTitle: 'Real Commitments',
        habitFocus: 'Integrity (Keeping Commitments)',
        questions: [
          {
            question: "Which of Sarah's conversations hit home for you? Why?",
            subText: 'Which one resonated most?',
            placeholder: 'Which conversation felt most relevant to you?...',
          },
          {
            question: "What commitment have YOU made to your team that you're not currently keeping?",
            subText: 'Be specific and honest',
            placeholder: "What promise are you not fulfilling?...",
          },
          {
            question: 'What would it look like to keep that commitment for 30 days?',
            subText: 'Describe the action',
            placeholder: 'What specifically would you do differently?...',
          },
        ],
      },
      {
        actNumber: 4,
        actTitle: 'Seeing People',
        habitFocus: 'Respect & Mutual Trust (Seeing People)',
        questions: [
          {
            question: 'Who on your team do you need to SEE better?',
            subText: 'Who deserves more attention?',
            placeholder: 'Who is waiting to be seen?...',
          },
          {
            question: "What capability or potential do they have that you haven't acknowledged?",
            subText: "What do they bring that you've overlooked?",
            placeholder: 'What potential have you missed?...',
          },
          {
            question: 'How will you show them that you see them?',
            subText: "What's one concrete action?",
            placeholder: "What will you do to demonstrate your belief in them?...",
          },
        ],
      },
    ],

    // ── Scene content ────────────────────────────────────────────────────────
    scenes: [
      // ═══════════════════════════════════════════════════════════════════════
      // ACT 1 — THE MIRROR (Hansei)
      // ═══════════════════════════════════════════════════════════════════════
      { type: 'act', label: 'Act 1 — The Mirror', actNumber: 1 },
      {
        type: 'narrator',
        text: 'In the Introduction, you watched Sarah Chen\'s floor through Kenji Tanaka\'s eyes.',
      },
      {
        type: 'narrator',
        text: 'You saw what she could not: a team that had learned not to try without her. Operators waiting for her answers. Marek solving problems alone while his team watched. Her visual board written only in her handwriting.',
      },
      {
        type: 'narrator',
        text: 'When Kenji asked — "Why does your team need you to be present for things to work?" — Sarah had no honest answer. That silence was the beginning.',
      },
      {
        type: 'narrator',
        text: 'That evening. Sarah sits at home with a blank notebook. Kenji\'s question still echoes.',
      },
      {
        type: 'sarah',
        text: '"I saw myself today on that floor. Not the version I tell myself about — the one who trains people well and solves problems. I saw the version that does not let anyone try without me. The version that says yes to everything because I am the only one who can. The version my team has learned to wait for."',
      },
      {
        type: 'sarah',
        text: '"Marek solving that problem alone while his team watched. The operators stopping their work. The board with my handwriting. These are not problems I created because I am strong. They are problems I created because I have made myself indispensable."',
      },
      {
        type: 'sarah',
        text: '"How did this happen? It started well. Eight years ago, I inherited a struggling line. I worked hard. I learned everything. I solved the problems. And it worked. The numbers improved. People noticed. I got promoted."',
      },
      {
        type: 'sarah',
        text: '"But somewhere along the way, I stopped developing people. I started replacing them. When a problem came up, I solved it. Faster, better, than anyone else could. And my team learned: do not try. Wait for Sarah."',
      },
      {
        type: 'sarah',
        text: '"I do not blame them. I taught them this."',
      },
      {
        type: 'narrator',
        text: 'She pauses. She writes something, then crosses it out.',
      },
      {
        type: 'sarah',
        text: '"Kenji did not tell me I was wrong. He just asked me to see it. And I can. So clearly, now, I cannot unsee it."',
      },
      {
        type: 'sarah',
        text: '"This is Hansei. Not guilt. Not shame. Just clear seeing. And the commitment to do better."',
      },
      {
        type: 'sarah',
        text: '"Tomorrow I have to go back to that floor. And I have to do something I have never done. I have to stop. But I do not know how."',
      },
      {
        type: 'narrator',
        text: 'She closes the notebook.',
      },

      // ═══════════════════════════════════════════════════════════════════════
      // ACT 2 — STEPPING BACK (Humility)
      // ═══════════════════════════════════════════════════════════════════════
      { type: 'act', label: 'Act 2 — Stepping Back', actNumber: 2 },
      { type: 'act', label: '— The Return' },
      {
        type: 'narrator',
        text: 'Thursday morning. Kenji arrives at 8:00 AM. Sarah is waiting.',
      },
      { type: 'sarah', text: 'I have been thinking about your question all week.' },
      { type: 'kenji', text: 'And?' },
      { type: 'sarah', text: 'And I think I know why they need me. Because I made them need me.' },
      {
        type: 'narrator',
        text: 'She says this simply. No defensiveness.',
      },
      { type: 'kenji', text: 'Yes. And?' },
      { type: 'sarah', text: 'And I do not know how to stop.' },
      { type: 'kenji', text: 'You do know. You are just afraid.' },
      {
        type: 'narrator',
        text: 'He says this as a fact, not criticism.',
      },
      {
        type: 'kenji',
        text: 'You are afraid that if you step back, things will fail. You are afraid that you will be shown to be less necessary than you believe. You are afraid that your team will blame you for making their jobs harder.',
      },
      { type: 'sarah', text: 'All of those things.' },
      { type: 'kenji', text: 'Good. That is honest. That is Hansei.' },
      {
        type: 'narrator',
        text: 'He opens his notebook for the first time.',
      },
      { type: 'kenji', text: 'I want to give you an assignment. It will be uncomfortable.' },
      { type: 'sarah', text: 'What is it?' },
      {
        type: 'kenji',
        text: 'For the next three days, you will not solve any problems. You will observe them. You will ask questions. But you will not fix anything.',
      },
      { type: 'sarah', text: 'Three days? That\'s —' },
      { type: 'kenji', text: 'Impossible? Yes. That is why you will do it.' },

      { type: 'act', label: '— Day One' },
      {
        type: 'narrator',
        text: '8:30 AM. A quality issue on Line 2. An operator comes to find Sarah. She is in a meeting. He waits.',
      },
      {
        type: 'narrator',
        text: 'When she emerges, he explains the issue. Her reflex is to go look. Diagnose. Solve. She feels the weight of it. The pull toward action. She stops. Breathes.',
      },
      {
        type: 'sarah',
        text: 'Before I look at it, I want to know: if I were not here, how would you solve this?',
      },
      {
        type: 'narrator',
        text: 'The operator blinks. "I... we would... probably ask Marek. Or maybe check the manual."',
      },
      {
        type: 'sarah',
        text: 'Then why don\'t you do that now? Do not solve it for me. Solve it for the line. I am going back to my meeting. I trust you.',
      },
      {
        type: 'narrator',
        text: 'She walks away. She spends the next hour in her meeting feeling physically uncomfortable. Part of her believes the line has stopped. The problem has become a crisis. She has made a terrible mistake.',
      },
      {
        type: 'narrator',
        text: 'At 11:00 AM, she checks. The line is running. The operator and Marek solved it together. It took them longer than it would have taken Sarah. But they solved it.',
      },
      {
        type: 'narrator',
        text: 'Sarah sees something shift: Marek was not just solving a problem. He was leading.',
      },

      { type: 'act', label: '— Day Two' },
      {
        type: 'narrator',
        text: 'A scheduling conflict. Two people are assigned to the same station. Someone brings it to Sarah.',
      },
      {
        type: 'narrator',
        text: 'Her old move: solve it. Reassign someone. Done in ninety seconds. Her new move: ask.',
      },
      {
        type: 'sarah',
        text: 'This is your schedule. This is your station. How do you solve this?',
      },
      {
        type: 'narrator',
        text: 'The two people look at each other. Neither expects to have a voice.',
      },
      {
        type: 'narrator',
        text: 'Worker: "We could... I could move to Line 3 tomorrow if that helps?" The other: "Or I could do the early shift instead of late?"',
      },
      {
        type: 'sarah',
        text: 'Then you have already solved it. Decide between yourselves which one feels right. Then update the board.',
      },
      {
        type: 'narrator',
        text: 'She walks away. They solve it. They talk to each other in a way they have not had to do in years. They make a decision together.',
      },
      {
        type: 'narrator',
        text: 'Sarah notices: they are quieter all afternoon. But not in a bad way. They are walking taller. Someone noticed they could solve something. Someone trusted them.',
      },

      { type: 'act', label: '— Day Three' },
      {
        type: 'narrator',
        text: 'By now, Sarah has not solved a single problem. She has asked dozens of questions.',
      },
      {
        type: 'sarah',
        text: '"How would you approach this?" "What would happen if you tried that?" "Who else should be in this conversation?" "What does the process say?" "What would you do if I were not here?"',
      },
      {
        type: 'narrator',
        text: 'By the afternoon, people stop coming to find her. They start solving things first. Then, if they need her input, they come with a proposal.',
      },
      {
        type: 'narrator',
        text: '"Sarah, we tried this and got here. Do you think we should do this next?" It is completely different. She is no longer the person with all the answers. She is the person asking all the questions.',
      },
      {
        type: 'narrator',
        text: 'By the end of the day, she is exhausted in a new way. Lighter. Less burdened.',
      },

      { type: 'act', label: '— The Debrief' },
      { type: 'narrator', text: 'Kenji arrives at 5:00 PM.' },
      { type: 'sarah', text: 'Three days. I broke it at four hours on day one.' },
      { type: 'kenji', text: 'And?' },
      {
        type: 'sarah',
        text: 'And I did not die. The line did not stop. People solved problems. It was slower than when I do it, but... it happened.',
      },
      { type: 'kenji', text: 'How did it feel?' },
      { type: 'narrator', text: 'Sarah thinks carefully.' },
      {
        type: 'sarah',
        text: 'Terrifying. Then... liberating. I realized I have been carrying something that was not mine to carry.',
      },
      {
        type: 'kenji',
        text: 'That is humility. Not the word. The practice. You stepped back so others could step forward. You accepted that your way is not the only way. You trusted your team.',
      },
      {
        type: 'sarah',
        text: 'But I did not do it perfectly. The solutions were not as elegant as mine would have been.',
      },
      {
        type: 'kenji',
        text: 'No. They were better. Because they were theirs. Because your team solved them, not Sarah.',
      },
      { type: 'narrator', text: 'He stands to leave.' },
      {
        type: 'kenji',
        text: 'Next week, I want you to have a conversation with each person on your floor. Not about work. Ask them: what opportunity have I been taking from you by solving everything myself?',
      },
      { type: 'sarah', text: 'They will not say that directly.' },
      {
        type: 'kenji',
        text: 'No. But they will hear the question. And they will begin to realize that you are giving them back something. Permission. Ownership. Respect.',
      },
      { type: 'sarah', text: 'And then what?' },
      { type: 'kenji', text: 'Then you will listen. Really listen. And you will mean it.' },

      { type: 'act', label: '— Sarah\'s Reflection' },
      {
        type: 'narrator',
        text: 'Sarah sits at her desk. Five names written on a piece of paper. Her five leaders. She realizes she does not really know what they want. She knows what they can do. But not what they want to become.',
      },
      {
        type: 'sarah',
        text: '"Humility is not about being weak or saying yes to everything. It is about stepping back so others can step forward."',
      },
      {
        type: 'sarah',
        text: '"This week I learned that the line does not stop when I stop. It moves. Different than before, but it moves. And my team moves with it."',
      },
      {
        type: 'sarah',
        text: '"I spent three days asking instead of telling. And I discovered: I have been preventing my team from becoming leaders. Not because they are not capable. Because I have taken away the space for them to try."',
      },
      {
        type: 'sarah',
        text: '"Kenji said something that sits with me: \'Your team solved problems. Not Sarah. That is better.\' He is right. I have spent eight years being proud of my solutions. But I should have been proud of my team\'s solutions."',
      },
      {
        type: 'sarah',
        text: '"This is what Humility means. It is inverted. The leader at the bottom, supporting from below. Not the hero at the top. I do not know if I can do this. But I am going to try."',
      },

      // ═══════════════════════════════════════════════════════════════════════
      // ACT 3 — REAL COMMITMENTS (Integrity)
      // ═══════════════════════════════════════════════════════════════════════
      { type: 'act', label: 'Act 3 — Real Commitments', actNumber: 3 },
      { type: 'act', label: '— The First Conversation: Marek' },
      {
        type: 'narrator',
        text: 'Monday afternoon. Sarah sits with Marek in a quiet corner of the floor.',
      },
      { type: 'sarah', text: 'I want to ask you something. And I want you to be honest.' },
      { type: 'narrator', text: 'Marek: "All right."' },
      {
        type: 'sarah',
        text: 'What opportunity have I been taking from you by doing everything myself?',
      },
      {
        type: 'narrator',
        text: 'Marek is careful. He has learned not to critique Sarah. "I... well. I have always wanted to run the quality process. The problem-solving methodology. But you always handled that."',
      },
      { type: 'sarah', text: 'Why do you think that was?' },
      { type: 'narrator', text: '"Because you are good at it."' },
      {
        type: 'sarah',
        text: 'That is one reason. But the real reason is: I did not trust anyone else to do it the way I would do it. And so I took that role from you. I took the chance for you to become the person who could do it.',
      },
      {
        type: 'narrator',
        text: 'She pauses. This is harder than it should be.',
      },
      {
        type: 'sarah',
        text: 'I am sorry. And I want something from you now.',
      },
      { type: 'narrator', text: '"What?" Marek asks.' },
      {
        type: 'sarah',
        text: 'I want you to take that role. Fully. Not under me. Not asking permission. Not with me as a safety net. Real ownership of the quality process.',
      },
      {
        type: 'narrator',
        text: 'Marek\'s face changes. Something shifts in him. "You mean it?"',
      },
      {
        type: 'sarah',
        text: 'I mean it. And I want you to know why: I see you. I see your capability. I believe in you. I have for a long time. I just did not show you that.',
      },
      {
        type: 'narrator',
        text: 'Marek is quiet for a moment. "I have waited eight years for that."',
      },
      { type: 'sarah', text: 'I know. And I am sorry.' },
      { type: 'narrator', text: '"What do you need from me?" Marek asks.' },
      {
        type: 'sarah',
        text: 'Honesty. If I slip back into old habits, tell me. If you need support, ask. If you make mistakes, own them. And teach your team the way you wish I had taught you.',
      },
      { type: 'narrator', text: 'They sit with that for a moment.' },

      { type: 'act', label: '— The Second Conversation: Elena' },
      { type: 'narrator', text: 'Tuesday afternoon. Elena is the training specialist.' },
      {
        type: 'sarah',
        text: 'What opportunity have I been taking from you?',
      },
      {
        type: 'narrator',
        text: '"I want to develop new people. But you always train them. You say it is because I do not have time, but... I think it is because you do not trust me to do it the right way."',
      },
      {
        type: 'sarah',
        text: 'You are right. And I made a commitment that I did not keep. I promised you would have that role. But I kept taking it back.',
      },
      { type: 'narrator', text: 'She looks directly at Elena.' },
      {
        type: 'sarah',
        text: 'Starting Monday, you train all new hires. I will not step in. I trust you. And I believe in you.',
      },
      { type: 'narrator', text: '"Even if I make mistakes?" Elena asks.' },
      {
        type: 'sarah',
        text: 'Even if you make mistakes. Especially if you make mistakes. That is how you learn.',
      },
      {
        type: 'narrator',
        text: 'Elena\'s eyes water. "Thank you."',
      },
      {
        type: 'sarah',
        text: 'Do not thank me. Just keep the commitment I am making to you. Because I am going to try very hard to keep mine.',
      },

      { type: 'act', label: '— The Remaining Conversations' },
      {
        type: 'narrator',
        text: 'Sarah has similar conversations with Thomas (scheduling), Yuki (inventory), and Ahmed (team representation in meetings).',
      },
      {
        type: 'narrator',
        text: 'Each one reveals what she has been taking from them. Each one receives a real commitment and a real acknowledgment of their capability.',
      },
      {
        type: 'narrator',
        text: 'It is exhausting. It is humbling. It is necessary.',
      },

      { type: 'act', label: '— Kenji\'s Visit' },
      { type: 'narrator', text: 'Thursday. Kenji arrives.' },
      { type: 'kenji', text: 'You have done the conversations?' },
      {
        type: 'sarah',
        text: 'Yes. And I made commitments. Marek runs the quality process now. Elena trains the new people. Thomas owns the schedule. Yuki manages inventory. Ahmed represents the team in senior meetings.',
      },
      { type: 'kenji', text: 'And you?' },
      { type: 'sarah', text: 'I check in. I ask questions. I remove obstacles.' },
      { type: 'kenji', text: 'This is good. But I will ask you something difficult.' },
      { type: 'sarah', text: 'All right.' },
      { type: 'kenji', text: 'Can you keep these commitments?' },
      {
        type: 'narrator',
        text: 'Sarah does not answer immediately. She knows what Kenji is asking.',
      },
      {
        type: 'sarah',
        text: 'I do not know. I want to. But I have made promises to my team before. And I have broken them.',
      },
      {
        type: 'kenji',
        text: 'Then you have a choice. You can make new promises you believe in. Or you can make fewer promises and keep them all.',
      },
      { type: 'sarah', text: 'What do you mean?' },
      {
        type: 'kenji',
        text: 'You told your team they own their roles now. But you are still the final approval on everything. You are still the safety net. That is not really ownership. That is permission to try while you watch.',
      },
      { type: 'sarah', text: 'If I give them real authority, there will be mistakes.' },
      { type: 'kenji', text: 'Yes. And you will learn something: mistakes are how people develop.' },
      { type: 'sarah', text: 'What if the mistakes are big?' },
      {
        type: 'kenji',
        text: 'Then you will have learned that your team needed more coaching before more authority. And you will adjust. That is Integrity. Not perfect promises. Real ones.',
      },
      { type: 'narrator', text: 'He stands.' },
      {
        type: 'kenji',
        text: 'Next week, I want you to tell your team something. Not in a meeting. One on one. Tell them that you have made some commitments to them. And ask them: do you believe I will keep them?',
      },
      { type: 'sarah', text: 'What if they say no?' },
      {
        type: 'kenji',
        text: 'Then you will know what you have to rebuild. Trust is not built in big gestures. It is built in small, repeated actions. It is built when you do what you say you will do. Every time. Even when it is hard.',
      },

      { type: 'act', label: '— Sarah\'s Reflection' },
      { type: 'narrator', text: 'Sarah sits at her desk. She has been sitting here for hours.' },
      {
        type: 'sarah',
        text: '"I made commitments this week. Real ones. Not easy promises. Real ones. I told Marek: You own the quality process. I will ask before I act. And I will do that, even when the pressure comes."',
      },
      {
        type: 'sarah',
        text: '"I told Elena: You train the new people now. I will not step in. And I mean it. I told Thomas: Schedule is yours. I trust you."',
      },
      {
        type: 'sarah',
        text: '"And here is what scared me most: I told them all, \'I have broken promises before. I am trying not to. But if I fail, I want you to tell me.\'"',
      },
      {
        type: 'sarah',
        text: '"They did not believe me immediately. I could see it in their faces. Eight years of learning that Sarah solves everything is hard to unlearn in a moment."',
      },
      {
        type: 'sarah',
        text: '"But I realized: Trust is not built in promises. It is built in follow-through. Day after day. Keeping the small commitments so the big ones mean something."',
      },
      {
        type: 'sarah',
        text: '"Kenji asked me: Can you keep these commitments? And I did not say yes. I said: I do not know. But I am going to try. That is more honest than any yes I have ever said."',
      },

      // ═══════════════════════════════════════════════════════════════════════
      // ACT 4 — SEEING PEOPLE (Respect)
      // ═══════════════════════════════════════════════════════════════════════
      { type: 'act', label: 'Act 4 — Seeing People', actNumber: 4 },
      { type: 'act', label: '— Preparing' },
      { type: 'narrator', text: 'Monday morning. Sarah sits with her notebook.' },
      {
        type: 'narrator',
        text: 'Kenji told her: "Have a respect conversation. Tell someone what you see in them. Tell them you believe in their capability."',
      },
      {
        type: 'narrator',
        text: 'It sounds simple. But it terrifies her.',
      },
      {
        type: 'narrator',
        text: 'What if it sounds false? What if she says it wrong? What if it makes things awkward?',
      },
      {
        type: 'narrator',
        text: 'She writes out what she wants to say. Reads it. It sounds stilted. She tears it up. She tries again. Still wrong. Again. Better.',
      },
      {
        type: 'narrator',
        text: 'By Monday afternoon, she has nothing written. Just a feeling: I need to say something true.',
      },

      { type: 'act', label: '— The Conversation with Marek' },
      { type: 'narrator', text: 'Friday afternoon. Sarah sits with Marek in a quiet corner of the floor.' },
      { type: 'sarah', text: 'I want to talk about something different today.' },
      { type: 'narrator', text: '"All right."' },
      {
        type: 'sarah',
        text: 'When I was not solving every problem, I saw something. I saw you step into the quality role. I saw you not just fix things, but teach people how to fix them. I saw you lead without needing a title to do it.',
      },
      { type: 'narrator', text: '"I was just doing my job."' },
      {
        type: 'sarah',
        text: 'No. You were doing more than that. You were doing the job of someone who cares about people learning, not just about problems being solved.',
      },
      {
        type: 'narrator',
        text: 'She pauses. She is not comfortable with vulnerability. But she continues.',
      },
      {
        type: 'sarah',
        text: 'For eight years, I have been preventing you from doing that. Not because I did not see your capability. Because I was too afraid to let anyone else be good at what I thought was my job.',
      },
      { type: 'narrator', text: 'She looks at him directly.' },
      {
        type: 'sarah',
        text: 'I am sorry. And I want you to know: I see you. I see your capability. I believe in you.',
      },
      {
        type: 'narrator',
        text: 'Marek is quiet. His eyes are watery. "I have waited eight years for that."',
      },
      { type: 'sarah', text: 'I know. And I am sorry it took me this long.' },
      { type: 'narrator', text: '"What do you need from me?" Marek asks.' },
      {
        type: 'sarah',
        text: 'Honesty. If I slip back into old habits, tell me. If you need support, ask. And teach your team the way you wish I had taught you.',
      },

      { type: 'act', label: '— The Conversations with Others' },
      {
        type: 'narrator',
        text: 'Sarah has variations of this conversation with each of her five leaders. Not exactly the same words. But the same message.',
      },
      {
        type: 'sarah',
        text: 'I see you. I believe in you. I am creating conditions for you to lead.',
      },
      {
        type: 'narrator',
        text: 'Elena hears it. Thomas hears it. Yuki hears it. Ahmed hears it.',
      },
      {
        type: 'narrator',
        text: 'These are hard conversations. Some people cry. Some are skeptical. They have learned not to trust Sarah\'s words. But by the end of each conversation, something shifts.',
      },
      {
        type: 'narrator',
        text: 'As if they have been carrying something unspoken and now, finally, it has been said out loud.',
      },

      { type: 'act', label: '— Kenji\'s Final Visit' },
      { type: 'narrator', text: 'Thursday. Kenji arrives for the last time.' },
      { type: 'kenji', text: 'Tell me about this week.' },
      {
        type: 'sarah',
        text: 'I had conversations with my team. I told them I saw their capability. I told them I believed in them.',
      },
      { type: 'kenji', text: 'And?' },
      {
        type: 'sarah',
        text: 'And it was the most vulnerable I have been in a very long time. I felt like I was admitting a kind of failure.',
      },
      { type: 'kenji', text: 'What failure?' },
      {
        type: 'sarah',
        text: 'That I have known all along what people are capable of. But I chose not to develop them. I chose to keep them small so I could keep being important.',
      },
      { type: 'kenji', text: 'That is Hansei. Honest self-reflection.' },
      { type: 'sarah', text: 'But I also made a commitment this week. A real one. That I would step back and let them lead.' },
      { type: 'kenji', text: 'That is Integrity.' },
      {
        type: 'sarah',
        text: 'And I told them I believed in them. That I saw something in them worth developing.',
      },
      { type: 'kenji', text: 'That is Respect.' },
      {
        type: 'sarah',
        text: 'And I did all of it by stepping back. By not having the answers. By admitting I needed them.',
      },
      { type: 'kenji', text: 'That is Humility.' },
      {
        type: 'narrator',
        text: 'He smiles. It is the first time Sarah has seen him smile.',
      },
      {
        type: 'kenji',
        text: 'You have learned the four habits. Not perfectly. But really. Do you understand now why we begin with Leading Self?',
      },
      {
        type: 'sarah',
        text: 'Because nothing else works if this does not work first. I cannot ask my team to be vulnerable if I am not. I cannot ask them to lead if I am busy proving I am the strongest. I cannot ask them to be honest if I am pretending everything is fine.',
      },
      {
        type: 'kenji',
        text: 'Yes. This is where transformation begins. Here. Inside you. The change you want to see in your team must first exist in you.',
      },
      { type: 'narrator', text: 'He picks up his notebook. Stands.' },
      { type: 'kenji', text: 'I will not be coming back on Thursdays.' },
      { type: 'sarah', text: 'Why not?' },
      {
        type: 'kenji',
        text: 'Because you do not need me to. You need to practice. You need to discover what happens when you stay committed to these habits. When the pressure comes. When you are tired. When it would be easier to go back to solving everything yourself.',
      },
      { type: 'sarah', text: 'What if I fail?' },
      {
        type: 'kenji',
        text: 'Then you practice Hansei. You look at what happened. You understand it. You commit to trying again.',
      },
      { type: 'sarah', text: 'And what about you?' },
      {
        type: 'kenji',
        text: 'I will watch from a distance. And on Week 8, I will come back. Not to teach you. To see what you have built.',
      },
      { type: 'narrator', text: 'He walks to the door. Then stops.' },
      {
        type: 'kenji',
        text: 'You asked me at the beginning: what do you want me to do? And I said: nothing. Just look honestly at what you have built. You have done that. You have looked. And now you are building something different. That is everything.',
      },
      { type: 'narrator', text: 'He leaves.' },
      {
        type: 'narrator',
        text: 'Sarah stands alone on the empty floor. It is 5:30 PM. Nobody is waiting for her to solve something. They are solving things. Together.',
      },

      { type: 'act', label: '— Sarah\'s Final Reflection' },
      { type: 'narrator', text: 'Sarah writes the final entry of this month.' },
      {
        type: 'sarah',
        text: '"Four weeks ago, I had an answer for everything. I could solve any problem faster than anyone else. My team depended on me completely. I told myself this was strength. This week I realized it was the opposite."',
      },
      {
        type: 'sarah',
        text: '"HANSEI — Looking honestly at what I built. It was not a team. It was a dependency. I created it by solving everything myself. I did not do it to hurt them. I did it because I thought that was what a leader does. But I was wrong."',
      },
      {
        type: 'sarah',
        text: '"HUMILITY — Stepping back. Asking questions instead of giving answers. Letting people fail and learn instead of protecting them from failure. This terrified me. But it also liberated them. And me."',
      },
      {
        type: 'sarah',
        text: '"INTEGRITY — Making real promises and keeping them. I promised my team they would own their roles. And this week, despite the pressure, despite the temptation to slip back, I kept that promise. Every single time."',
      },
      {
        type: 'sarah',
        text: '"RESPECT — Telling people what I see in them. Not as a gesture, but as a real acknowledgment of their capability. I told Marek I believed in him. And I meant it. And I saw something shift in him. Permission. Ownership."',
      },
      {
        type: 'sarah',
        text: '"Four weeks. Four habits. Not perfect practice. Real practice. And now I understand why Kenji said we begin with Leading Self. Because I cannot ask my team to be vulnerable if I am not. I cannot ask them to grow if I am protecting them from failure."',
      },
      {
        type: 'sarah',
        text: '"The change I want to see in my team must first exist in me. I am not there yet. But I am trying. Day by day. Commitment by commitment. And maybe that is enough."',
      },
    ],

    // ── End-of-module reflection questions ──────────────────────────────────
    reflectionQuestions: [
      'Which of the four habits does Sarah struggle with most — Hansei, Humility, Integrity, or Respect? What makes that one the hardest for her? And which one is hardest for YOU?',
      'In Week 1, Sarah could not answer Kenji\'s question: "Why does your team need you?" What would YOUR team say if someone asked the same question about you?',
      'In Week 3, Sarah makes a distinction: "I promised my team these things before, but I broke those promises." What commitments have YOU made to your team that you are struggling to keep? Why?',
      'In Week 4, Sarah tells Marek: "I have been preventing you from doing that. Not because I did not see your capability. Because I was too afraid." What is ONE thing you are afraid to let your team do?',
      'What is the difference between Sarah\'s "strong leadership" at the beginning and her "strong leadership" at the end? Which version is actually stronger?',
    ],

    stopAndThinkPrompts: [
      'When did you last choose comfort over growth?',
      'What does your worst leadership behavior look like — and what triggers it?',
      'What would change if you led more from your values and less from habit?',
      'Where on your floor or in your team are people waiting for permission to try?',
    ],

    journalPrompt: 'Imagine it is Week 1 for you. Someone asks you the same question Kenji asked Sarah: "When you are not present, what actually happens in your area?" Write your honest answer — not the answer you would give in an interview. The real answer. What does your team actually do? What have you taught them to depend on you for? Then ask yourself: what is one small commitment you can make this week that you can actually keep?',
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
