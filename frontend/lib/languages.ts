// Content for the public /learn/<language> pages. Names match LANGUAGES in lib/modes.ts.
export type Phrase = { meaning: string; text: string; roman?: string };
export type LanguagePage = {
  slug: string;
  name: string; // the name used in the Settings list (what the app stores)
  native: string; // the language's own name
  intro: string;
  tricky: string;
  phrases: Phrase[];
};

const std = (hello: Phrase, thanks: Phrase, how: Phrase, please: Phrase): Phrase[] => [hello, thanks, how, please];

export const LANGUAGE_PAGES: LanguagePage[] = [
  {
    slug: "spanish", name: "Spanish", native: "Español",
    intro: "Spanish is spoken across Spain, Latin America and beyond, which makes it one of the most practical languages to learn for travel, work and study.",
    tricky: "Learners usually need time with rolled r sounds, verb conjugation, and the difference between ser and estar.",
    phrases: std(
      { meaning: "Hello", text: "Hola" }, { meaning: "Thank you", text: "Gracias" },
      { meaning: "How are you?", text: "¿Cómo estás?" }, { meaning: "Please", text: "Por favor" }),
  },
  {
    slug: "french", name: "French", native: "Français",
    intro: "French is used in Europe, Africa, Canada and many international organisations, and it opens the door to a large body of literature, film and music.",
    tricky: "The hard parts are nasal vowels, silent letters, and linking sounds between words, all of which are easier when you hear and say them out loud.",
    phrases: std(
      { meaning: "Hello", text: "Bonjour" }, { meaning: "Thank you", text: "Merci" },
      { meaning: "How are you?", text: "Comment ça va ?" }, { meaning: "Please", text: "S'il vous plaît" }),
  },
  {
    slug: "german", name: "German", native: "Deutsch",
    intro: "German is spoken in Germany, Austria and Switzerland and is valuable for study, engineering, research and business.",
    tricky: "Most learners struggle with noun genders, the case system and long compound words, so regular practice with feedback on real sentences helps a lot.",
    phrases: std(
      { meaning: "Hello", text: "Hallo" }, { meaning: "Thank you", text: "Danke" },
      { meaning: "How are you?", text: "Wie geht's?" }, { meaning: "Please", text: "Bitte" }),
  },
  {
    slug: "italian", name: "Italian", native: "Italiano",
    intro: "Italian is the language of Italy, loved by travellers, food lovers and anyone drawn to art, history and music.",
    tricky: "Double consonants, verb forms and the natural rhythm of Italian sentences take practice, and speaking aloud is the fastest way to get them right.",
    phrases: std(
      { meaning: "Hello", text: "Ciao" }, { meaning: "Thank you", text: "Grazie" },
      { meaning: "How are you?", text: "Come stai?" }, { meaning: "Please", text: "Per favore" }),
  },
  {
    slug: "chinese", name: "Chinese", native: "中文",
    intro: "Mandarin Chinese has more native speakers than any other language, and it is increasingly important in business, technology and travel.",
    tricky: "Tones and characters are the main challenge. Tones change the meaning of a syllable, so hearing the language and saying it back matters from day one.",
    phrases: std(
      { meaning: "Hello", text: "你好", roman: "Nǐ hǎo" }, { meaning: "Thank you", text: "谢谢", roman: "Xièxie" },
      { meaning: "How are you?", text: "你好吗？", roman: "Nǐ hǎo ma?" }, { meaning: "Please", text: "请", roman: "Qǐng" }),
  },
  {
    slug: "japanese", name: "Japanese", native: "日本語",
    intro: "Japanese is the language of Japan's culture, technology, anime, games and business, and a rewarding one to study for work or fun.",
    tricky: "Learners deal with three writing systems (hiragana, katakana and kanji), particles, and different levels of politeness.",
    phrases: std(
      { meaning: "Hello", text: "こんにちは", roman: "Konnichiwa" }, { meaning: "Thank you", text: "ありがとう", roman: "Arigatō" },
      { meaning: "How are you?", text: "お元気ですか？", roman: "Ogenki desu ka?" }, { meaning: "Please", text: "お願いします", roman: "Onegai shimasu" }),
  },
  {
    slug: "korean", name: "Korean", native: "한국어",
    intro: "Korean is the language of South Korea and is popular with learners who love Korean music, drama, food and technology.",
    tricky: "Hangul, the Korean alphabet, is logical and quick to learn. The harder parts are honorific speech levels, sentence endings and some sounds that English lacks.",
    phrases: std(
      { meaning: "Hello", text: "안녕하세요", roman: "Annyeonghaseyo" }, { meaning: "Thank you", text: "감사합니다", roman: "Gamsahamnida" },
      { meaning: "How are you?", text: "잘 지내세요?", roman: "Jal jinaeseyo?" }, { meaning: "Please", text: "부탁합니다", roman: "Butakamnida" }),
  },
  {
    slug: "hindi", name: "Hindi", native: "हिन्दी",
    intro: "Hindi is one of the most widely spoken languages in India and is used by communities around the world.",
    tricky: "The Devanagari script, gendered nouns and postpositions are the usual hurdles, and listening to natural speech helps them sink in.",
    phrases: std(
      { meaning: "Hello", text: "नमस्ते", roman: "Namaste" }, { meaning: "Thank you", text: "धन्यवाद", roman: "Dhanyavaad" },
      { meaning: "How are you?", text: "आप कैसे हैं?", roman: "Aap kaise hain?" }, { meaning: "Please", text: "कृपया", roman: "Kripya" }),
  },
  {
    slug: "bengali", name: "Bengali", native: "বাংলা",
    intro: "Bengali is the national language of Bangladesh and is also widely spoken in West Bengal, India, with a rich tradition of poetry and literature.",
    tricky: "Learners work on the Bengali script, aspirated consonants, and verb forms that change with the level of politeness.",
    phrases: std(
      { meaning: "Hello", text: "হ্যালো", roman: "Hyalo" }, { meaning: "Thank you", text: "ধন্যবাদ", roman: "Dhanyabad" },
      { meaning: "How are you?", text: "আপনি কেমন আছেন?", roman: "Apni kemon achhen?" }, { meaning: "Please", text: "দয়া করে", roman: "Doya kore" }),
  },
  {
    slug: "english", name: "English", native: "English",
    intro: "English is used around the world for work, study, travel and the internet, and speaking it with confidence opens many doors.",
    tricky: "Pronunciation, phrasal verbs and irregular verbs are the usual trouble spots, and instant corrections on your own sentences are the quickest way to fix habits.",
    phrases: [
      { meaning: "Introduce yourself", text: "Nice to meet you." },
      { meaning: "Ask someone to repeat", text: "Could you say that again, please?" },
      { meaning: "Order a drink", text: "I'd like a coffee, please." },
      { meaning: "Ask for directions", text: "Where is the nearest station?" },
    ],
  },
  {
    slug: "russian", name: "Russian", native: "Русский",
    intro: "Russian is spoken across Russia and many neighbouring countries and is useful for travel, science, literature and business.",
    tricky: "The Cyrillic alphabet, the case system and word stress take time, but the alphabet itself can be learned in a few days.",
    phrases: std(
      { meaning: "Hello", text: "Здравствуйте", roman: "Zdravstvuyte" }, { meaning: "Thank you", text: "Спасибо", roman: "Spasibo" },
      { meaning: "How are you?", text: "Как дела?", roman: "Kak dela?" }, { meaning: "Please", text: "Пожалуйста", roman: "Pozhaluysta" }),
  },
  {
    slug: "arabic", name: "Arabic", native: "العربية",
    intro: "Arabic is spoken across the Middle East and North Africa and is the language of a huge literary and cultural heritage.",
    tricky: "Learners get used to a right-to-left script, sounds that other languages lack, and the gap between formal Arabic and everyday speech.",
    phrases: std(
      { meaning: "Hello", text: "مرحبا", roman: "Marhaba" }, { meaning: "Thank you", text: "شكرا", roman: "Shukran" },
      { meaning: "How are you?", text: "كيف حالك؟", roman: "Kayfa haluk?" }, { meaning: "Please", text: "من فضلك", roman: "Min fadlak" }),
  },
];

export const languageBySlug = (slug: string) => LANGUAGE_PAGES.find((l) => l.slug === slug);
