// Written guides for the public /guides pages. Plain text only: each paragraph is one string.
export type GuideSection = { heading: string; paragraphs: string[] };
export type Guide = {
  slug: string;
  title: string;
  description: string;
  published: string; // ISO date
  updated: string; // ISO date
  intro: string;
  sections: GuideSection[];
};

export const GUIDES: Guide[] = [
  {
    slug: "practise-speaking-a-language-alone",
    title: "How to practise speaking a language when you have no one to talk to",
    description: "Seven ways to get real speaking practice on your own: talking aloud, shadowing, recording yourself and using an AI tutor that answers back.",
    published: "2026-11-24", updated: "2026-11-24",
    intro: "Most people who study a language can read and understand far more than they can say. The gap is speaking, and the usual reason is simple: there is nobody around to talk to. You can close most of that gap alone, with a few habits that cost nothing.",
    sections: [
      {
        heading: "Talk out loud every day, even to yourself",
        paragraphs: [
          "Describe what you are doing in your target language while you cook, walk or tidy up. “I am making tea. The water is hot.” The sentences can be very simple. What matters is that your mouth practises forming the words, and that you notice the moment you do not know a word, because that is the word to learn next.",
        ],
      },
      {
        heading: "Shadow short recordings",
        paragraphs: [
          "Shadowing means playing a short clip of a native speaker and repeating it right after them, copying the rhythm and the melody as well as the words. Use clips of five to ten seconds. Play one, repeat it, then play it again until your version sounds close to theirs.",
        ],
      },
      {
        heading: "Record yourself and compare",
        paragraphs: [
          "Record yourself reading a sentence, then listen to a native recording of the same sentence. You will hear differences that you cannot feel while speaking. Pick one difference to fix, such as a vowel or the stress on a word, and record again.",
        ],
      },
      {
        heading: "Use a tutor that answers back",
        paragraphs: [
          "Talking to yourself has one weakness: nobody replies and nobody corrects you. An AI tutor fills that gap. You can hold a conversation at your own level, at any hour, and see a correction and a short explanation for each message. The corrections are the valuable part, because they show the mistakes you keep repeating without noticing.",
          "AI tutors can make mistakes, so treat a correction you do not understand as a question to check with a teacher, a dictionary or a native speaker.",
        ],
      },
      {
        heading: "Keep sessions short and regular",
        paragraphs: [
          "Ten to fifteen minutes a day beats one long session a week. Speaking is a physical skill, and short daily repetitions help it stick. Attach the habit to something you already do, such as your morning coffee.",
        ],
      },
      {
        heading: "Practise real situations",
        paragraphs: [
          "Rehearse the conversations you will actually have: introducing yourself, ordering food, asking for directions, talking about your work. Roleplays are good for this, because they let you try the same situation several times until the phrases feel natural.",
        ],
      },
    ],
  },
  {
    slug: "improve-your-pronunciation-in-a-new-language",
    title: "How to improve your pronunciation in a new language",
    description: "A practical routine for clearer pronunciation: listen first, practise sound pairs, shadow native speakers and get specific feedback on what to change.",
    published: "2026-11-24", updated: "2026-11-24",
    intro: "Good pronunciation is not about losing your accent. It is about being easy to understand. A few focused habits will do more for that than hours of vague repetition.",
    sections: [
      {
        heading: "Listen before you speak",
        paragraphs: [
          "You cannot reliably produce a sound you cannot hear. Before you practise a new word, listen to it several times from a native speaker. Pay attention to the vowels, where the stress falls and how the sentence rises and falls.",
        ],
      },
      {
        heading: "Practise sounds that your own language lacks",
        paragraphs: [
          "Every language pair has a few troublesome sounds: the rolled r for English speakers learning Spanish, tones for learners of Chinese, or aspirated consonants for learners of Bengali and Hindi. Find out which ones apply to you and give them a few minutes each day.",
          "Practise them in pairs of similar words, such as “pero” and “perro” in Spanish. Hearing and producing the difference between the two is the fastest way to tune your ear and your mouth.",
        ],
      },
      {
        heading: "Learn stress and rhythm, not just letters",
        paragraphs: [
          "Wrong stress can make a correct word hard to understand. When you learn a new word, learn where the stress falls and say the whole phrase with its natural rhythm instead of pronouncing each syllable evenly.",
        ],
      },
      {
        heading: "Shadow, then slow down",
        paragraphs: [
          "Repeat short native recordings right after you hear them. When a phrase is difficult, slow it down, say it in chunks, then join the chunks and speed up again.",
        ],
      },
      {
        heading: "Get feedback you can act on",
        paragraphs: [
          "The hardest part of pronunciation practice alone is knowing what is wrong. Read-aloud exercises with a score and a tip, such as TalkMate's Sentence and Word modes, show which words need work. A teacher or a native-speaking friend is even better when you can find one. Fix one thing at a time, then try again.",
        ],
      },
    ],
  },
  {
    slug: "30-day-speaking-plan-for-beginners",
    title: "A simple 30-day speaking plan for beginners",
    description: "A four-week plan to go from your first words to short conversations, with a few minutes of speaking practice each day.",
    published: "2026-11-24", updated: "2026-11-24",
    intro: "Beginners often wait until they feel ready to speak. A better approach is to speak from the first day, with very small goals. This plan uses about fifteen minutes a day and works for any language.",
    sections: [
      {
        heading: "Before you start",
        paragraphs: [
          "Pick one language and the Beginner level, and stay with them for the whole month. Decide on a fixed time each day. If you miss a day, simply continue the next day.",
        ],
      },
      {
        heading: "Week 1: greetings and yourself",
        paragraphs: [
          "Learn to say hello and goodbye, to ask how someone is, to say your name, where you are from and what you do. Read each phrase aloud several times and record yourself once. By the end of the week you should be able to introduce yourself without looking at notes.",
        ],
      },
      {
        heading: "Week 2: everyday questions",
        paragraphs: [
          "Learn to ask simple questions: what, where, how much and when. Practise ordering a drink, asking a price and asking where something is. Have a short chat with a tutor every day and read the corrections carefully.",
        ],
      },
      {
        heading: "Week 3: talk about your day",
        paragraphs: [
          "Add the past and the future in their simplest forms. Describe what you did yesterday and what you will do tomorrow, in short sentences. Roleplays such as a restaurant or a hotel check-in help you use the same phrases in a realistic setting.",
        ],
      },
      {
        heading: "Week 4: longer conversations",
        paragraphs: [
          "Aim for a conversation of five minutes on a familiar topic such as family, work or food. If you can, try a voice call with a tutor so you also practise listening in real time. Look back at the corrections from earlier weeks and check that old mistakes have gone.",
        ],
      },
      {
        heading: "After day 30",
        paragraphs: [
          "Keep the daily habit and raise the difficulty. Move to the Intermediate level when the conversations feel comfortable, and start adding topics that you care about, so that practising stays interesting.",
        ],
      },
    ],
  },
];

export const guideBySlug = (slug: string) => GUIDES.find((g) => g.slug === slug);
