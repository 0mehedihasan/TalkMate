// Content for the public /learn/<language> pages. Names match LANGUAGES in lib/modes.ts.
export type Phrase = { meaning: string; text: string; roman?: string };
export type LanguagePage = {
  slug: string;
  code: string; // BCP 47 code, so search engines and screen readers know which language a snippet is in
  name: string; // the name used in the Settings list (what the app stores)
  native: string; // the language's own name
  intro: string;
  tricky: string;
  glance: { script: string; direction: string; order: string };
  phrases: Phrase[]; // eight everyday phrases, same order for every language (English page: situations)
  tips: string[]; // three practical tips
};

const p = (meaning: string, text: string, roman?: string): Phrase => ({ meaning, text, roman });

export const LANGUAGE_PAGES: LanguagePage[] = [
  {
    slug: "spanish", code: "es", name: "Spanish", native: "Español",
    intro: "Spanish is spoken across Spain, Latin America and beyond, which makes it one of the most practical languages to learn for travel, work and study.",
    tricky: "Learners usually need time with rolled r sounds, verb conjugation, and the difference between ser and estar.",
    glance: { script: "Latin alphabet, with ñ and accent marks", direction: "Left to right", order: "Subject, verb, object" },
    phrases: [
      p("Hello", "Hola"), p("Goodbye", "Adiós"), p("Please", "Por favor"), p("Thank you", "Gracias"),
      p("How are you?", "¿Cómo estás?"), p("I don't understand", "No entiendo"),
      p("How much is it?", "¿Cuánto cuesta?"), p("Where is the toilet?", "¿Dónde está el baño?"),
    ],
    tips: [
      "Practise the rolled r with words like “perro” and “carro”. Go slowly first, then speed up.",
      "Learn the present tense first, then the past. Most daily conversation needs only these two.",
      "Treat ser and estar as two jobs: ser for identity and lasting traits, estar for states and locations.",
    ],
  },
  {
    slug: "french", code: "fr", name: "French", native: "Français",
    intro: "French is used in Europe, Africa, Canada and many international organisations, and it opens the door to a large body of literature, film and music.",
    tricky: "The hard parts are nasal vowels, silent letters, and linking sounds between words, all of which are easier when you hear and say them out loud.",
    glance: { script: "Latin alphabet, with accents such as é, è and ç", direction: "Left to right", order: "Subject, verb, object" },
    phrases: [
      p("Hello", "Bonjour"), p("Goodbye", "Au revoir"), p("Please", "S'il vous plaît"), p("Thank you", "Merci"),
      p("How are you?", "Comment ça va ?"), p("I don't understand", "Je ne comprends pas"),
      p("How much is it?", "Combien ça coûte ?"), p("Where is the toilet?", "Où sont les toilettes ?"),
    ],
    tips: [
      "Learn each noun with its article (le or la, un or une) so the gender comes with the word.",
      "Listen for liaison: a final consonant that is normally silent is pronounced before a vowel, as in “vous avez”.",
      "Say sentences aloud in chunks. French has many silent letters, so spelling is a poor guide to sound.",
    ],
  },
  {
    slug: "german", code: "de", name: "German", native: "Deutsch",
    intro: "German is spoken in Germany, Austria and Switzerland and is valuable for study, engineering, research and business.",
    tricky: "Most learners struggle with noun genders, the case system and long compound words, so regular practice with feedback on real sentences helps a lot.",
    glance: { script: "Latin alphabet, with ä, ö, ü and ß", direction: "Left to right", order: "Verb in second place in main clauses, at the end in many subordinate clauses" },
    phrases: [
      p("Hello", "Hallo"), p("Goodbye", "Auf Wiedersehen"), p("Please", "Bitte"), p("Thank you", "Danke"),
      p("How are you?", "Wie geht's?"), p("I don't understand", "Ich verstehe nicht"),
      p("How much is it?", "Wie viel kostet das?"), p("Where is the toilet?", "Wo ist die Toilette?"),
    ],
    tips: [
      "Learn every noun with its article (der, die or das) from the start.",
      "In a main clause the verb comes second. After words like “weil” it moves to the end.",
      "Split long compound words into parts: Handschuh is Hand plus Schuh, a glove.",
    ],
  },
  {
    slug: "italian", code: "it", name: "Italian", native: "Italiano",
    intro: "Italian is the language of Italy, loved by travellers, food lovers and anyone drawn to art, history and music.",
    tricky: "Double consonants, verb forms and the natural rhythm of Italian sentences take practice, and speaking aloud is the fastest way to get them right.",
    glance: { script: "Latin alphabet", direction: "Left to right", order: "Subject, verb, object" },
    phrases: [
      p("Hello", "Ciao"), p("Goodbye", "Arrivederci"), p("Please", "Per favore"), p("Thank you", "Grazie"),
      p("How are you?", "Come stai?"), p("I don't understand", "Non capisco"),
      p("How much is it?", "Quanto costa?"), p("Where is the toilet?", "Dov'è il bagno?"),
    ],
    tips: [
      "Double consonants change the word. Say “pala” and “palla” differently, holding the double l a little longer.",
      "Most Italian words are stressed on the second-to-last syllable, a safe default for a new word.",
      "Use the polite Lei with strangers and tu with friends.",
    ],
  },
  {
    slug: "chinese", code: "zh", name: "Chinese", native: "中文",
    intro: "Mandarin Chinese has more native speakers than any other language, and it is increasingly important in business, technology and travel.",
    tricky: "Tones and characters are the main challenge. Tones change the meaning of a syllable, so hearing the language and saying it back matters from day one.",
    glance: { script: "Chinese characters, with Pinyin for pronunciation", direction: "Left to right in modern writing", order: "Subject, verb, object" },
    phrases: [
      p("Hello", "你好", "Nǐ hǎo"), p("Goodbye", "再见", "Zàijiàn"), p("Please", "请", "Qǐng"), p("Thank you", "谢谢", "Xièxie"),
      p("How are you?", "你好吗？", "Nǐ hǎo ma?"), p("I don't understand", "我不明白", "Wǒ bù míngbai"),
      p("How much is it?", "多少钱？", "Duōshao qián?"), p("Where is the toilet?", "洗手间在哪里？", "Xǐshǒujiān zài nǎlǐ?"),
    ],
    tips: [
      "Learn tones together with the syllable, never alone. mā, má, mǎ and mà are four different words.",
      "Start with Pinyin so you can read the pronunciation, then add characters gradually, most common first.",
      "Chinese verbs do not conjugate. Word order, time words and particles such as 了 do that work.",
    ],
  },
  {
    slug: "japanese", code: "ja", name: "Japanese", native: "日本語",
    intro: "Japanese is the language of Japan's culture, technology, anime, games and business, and a rewarding one to study for work or fun.",
    tricky: "Learners deal with three writing systems (hiragana, katakana and kanji), particles, and different levels of politeness.",
    glance: { script: "Hiragana, katakana and kanji", direction: "Left to right (also written top to bottom in print)", order: "Subject, object, verb" },
    phrases: [
      p("Hello", "こんにちは", "Konnichiwa"), p("Goodbye", "さようなら", "Sayōnara"), p("Please", "お願いします", "Onegai shimasu"),
      p("Thank you", "ありがとうございます", "Arigatō gozaimasu"), p("How are you?", "お元気ですか？", "Ogenki desu ka?"),
      p("I don't understand", "わかりません", "Wakarimasen"), p("How much is it?", "いくらですか？", "Ikura desu ka?"),
      p("Where is the toilet?", "トイレはどこですか？", "Toire wa doko desu ka?"),
    ],
    tips: [
      "Learn hiragana first, then katakana. They are small sets of sounds, and kanji get easier once you can read the sounds.",
      "Particles such as は, が and を mark each word's role. Learn them inside whole sentences.",
      "Start with the polite ます and です forms. They are safe in almost every situation.",
    ],
  },
  {
    slug: "korean", code: "ko", name: "Korean", native: "한국어",
    intro: "Korean is the language of South Korea and is popular with learners who love Korean music, drama, food and technology.",
    tricky: "Hangul, the Korean alphabet, is logical and quick to learn. The harder parts are honorific speech levels, sentence endings and some sounds that English lacks.",
    glance: { script: "Hangul", direction: "Left to right", order: "Subject, object, verb" },
    phrases: [
      p("Hello", "안녕하세요", "Annyeonghaseyo"), p("Goodbye", "안녕히 가세요", "Annyeonghi gaseyo"), p("Please", "부탁합니다", "Butakamnida"),
      p("Thank you", "감사합니다", "Gamsahamnida"), p("How are you?", "잘 지내세요?", "Jal jinaeseyo?"),
      p("I don't understand", "이해가 안 돼요", "Ihaega an dwaeyo"), p("How much is it?", "얼마예요?", "Eolmayeyo?"),
      p("Where is the toilet?", "화장실이 어디예요?", "Hwajangsiri eodiyeyo?"),
    ],
    tips: [
      "Learn Hangul first. Its letters follow a clear logic, so you can read aloud quickly.",
      "Start with the polite -요 style. It works in most everyday conversations.",
      "The verb comes last, so listen to the end of a sentence before deciding what was said.",
    ],
  },
  {
    slug: "hindi", code: "hi", name: "Hindi", native: "हिन्दी",
    intro: "Hindi is one of the most widely spoken languages in India and is used by communities around the world.",
    tricky: "The Devanagari script, gendered nouns and postpositions are the usual hurdles, and listening to natural speech helps them sink in.",
    glance: { script: "Devanagari", direction: "Left to right", order: "Subject, object, verb" },
    phrases: [
      p("Hello", "नमस्ते", "Namaste"), p("Goodbye", "अलविदा", "Alvida"), p("Please", "कृपया", "Kripya"), p("Thank you", "धन्यवाद", "Dhanyavaad"),
      p("How are you?", "आप कैसे हैं?", "Aap kaise hain?"), p("I don't understand", "मुझे समझ नहीं आया", "Mujhe samajh nahin aaya"),
      p("How much is it?", "यह कितने का है?", "Yah kitne ka hai?"), p("Where is the toilet?", "शौचालय कहाँ है?", "Shauchalay kahan hai?"),
    ],
    tips: [
      "Learn Devanagari together with the sounds. It is largely phonetic, so reading comes quickly.",
      "Learn each noun with its gender, because adjectives and verbs change to match.",
      "Postpositions come after the noun (घर में, “in the house”), the reverse of English prepositions.",
    ],
  },
  {
    slug: "bengali", code: "bn", name: "Bengali", native: "বাংলা",
    intro: "Bengali is the national language of Bangladesh and is also widely spoken in West Bengal, India, with a rich tradition of poetry and literature.",
    tricky: "Learners work on the Bengali script, aspirated consonants, and verb forms that change with the level of politeness.",
    glance: { script: "Bengali script", direction: "Left to right", order: "Subject, object, verb" },
    phrases: [
      p("Hello", "হ্যালো", "Hyalo"), p("Goodbye", "বিদায়", "Biday"), p("Please", "দয়া করে", "Doya kore"), p("Thank you", "ধন্যবাদ", "Dhanyabad"),
      p("How are you?", "আপনি কেমন আছেন?", "Apni kemon achhen?"), p("I don't understand", "আমি বুঝতে পারছি না", "Ami bujhte parchhi na"),
      p("How much is it?", "এটার দাম কত?", "Etar dam koto?"), p("Where is the toilet?", "টয়লেট কোথায়?", "Toilet kothay?"),
    ],
    tips: [
      "Pick the right “you”: আপনি is polite, তুমি is friendly, and তুই is very informal.",
      "Bengali has no grammatical gender, so you can skip that step that other languages require.",
      "Practise aspirated sounds such as খ and ঘ next to their plain pairs, ক and গ.",
    ],
  },
  {
    slug: "english", code: "en", name: "English", native: "English",
    intro: "English is used around the world for work, study, travel and the internet, and speaking it with confidence opens many doors.",
    tricky: "Pronunciation, phrasal verbs and irregular verbs are the usual trouble spots, and instant corrections on your own sentences are the quickest way to fix habits.",
    glance: { script: "Latin alphabet", direction: "Left to right", order: "Subject, verb, object" },
    phrases: [
      p("Introduce yourself", "Nice to meet you."), p("Ask someone to repeat", "Could you say that again, please?"),
      p("Ask someone to slow down", "Could you speak more slowly, please?"), p("Order a drink", "I'd like a coffee, please."),
      p("Ask for directions", "Where is the nearest station?"), p("Ask a price", "How much does this cost?"),
      p("Ask for help", "Excuse me, could you help me?"), p("Say you are learning", "I'm still learning English."),
    ],
    tips: [
      "Learn phrasal verbs as whole phrases, such as “look up” and “give up”.",
      "Pay attention to word stress. Stressing the wrong syllable makes a word hard to understand.",
      "Read your tutor's correction aloud so the right form becomes a habit.",
    ],
  },
  {
    slug: "russian", code: "ru", name: "Russian", native: "Русский",
    intro: "Russian is spoken across Russia and many neighbouring countries and is useful for travel, science, literature and business.",
    tricky: "The Cyrillic alphabet, the case system and word stress take time, but the alphabet itself can be learned in a few days.",
    glance: { script: "Cyrillic alphabet", direction: "Left to right", order: "Subject, verb, object, with flexible word order" },
    phrases: [
      p("Hello", "Здравствуйте", "Zdravstvuyte"), p("Goodbye", "До свидания", "Do svidaniya"), p("Please", "Пожалуйста", "Pozhaluysta"),
      p("Thank you", "Спасибо", "Spasibo"), p("How are you?", "Как дела?", "Kak dela?"),
      p("I don't understand", "Я не понимаю", "Ya ne ponimayu"), p("How much is it?", "Сколько это стоит?", "Skolko eto stoit?"),
      p("Where is the toilet?", "Где туалет?", "Gde tualet?"),
    ],
    tips: [
      "Learn Cyrillic first. Many letters look familiar, and reading comes quickly.",
      "Learn the case endings in small steps, starting with the nominative and accusative.",
      "Mark the stressed syllable when you learn a new word. Stress changes how the vowels sound.",
    ],
  },
  {
    slug: "arabic", code: "ar", name: "Arabic", native: "العربية",
    intro: "Arabic is spoken across the Middle East and North Africa and is the language of a huge literary and cultural heritage.",
    tricky: "Learners get used to a right-to-left script, sounds that other languages lack, and the gap between formal Arabic and everyday speech.",
    glance: { script: "Arabic script", direction: "Right to left", order: "Both verb–subject–object and subject–verb–object are common" },
    phrases: [
      p("Hello", "مرحبا", "Marhaba"), p("Goodbye", "مع السلامة", "Ma'a as-salama"), p("Please", "من فضلك", "Min fadlak"),
      p("Thank you", "شكرا", "Shukran"), p("How are you?", "كيف حالك؟", "Kayfa haluk?"),
      p("I don't understand", "لا أفهم", "La afham"), p("How much is it?", "بكم هذا؟", "Bikam hadha?"),
      p("Where is the toilet?", "أين الحمّام؟", "Ayna al-hammam?"),
    ],
    tips: [
      "Practise sounds that English lacks, such as ع and ح, by listening and repeating.",
      "Decide early whether you want Modern Standard Arabic (formal and written) or a spoken dialect, and tell your tutor.",
      "Letters change shape depending on their position in a word, so start by reading short words.",
    ],
  },
];

export const languageBySlug = (slug: string) => LANGUAGE_PAGES.find((l) => l.slug === slug);
