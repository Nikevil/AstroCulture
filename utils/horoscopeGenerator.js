const horoscopeTemplates = {
  Aries: {
    general: [
      "Your fiery energy is at its peak today, Aries. The universe is aligning to support your bold initiatives. Trust your instincts and charge forward with confidence.",
      "Today brings exciting opportunities for leadership, Aries. Your natural charisma will draw people to your cause. Don't hesitate to take the lead.",
      "The stars favor your adventurous spirit today, Aries. New experiences await those who dare to step outside their comfort zone."
    ],
    love: [
      "Passion is in the air for you today, Aries. Your magnetic personality will attract romantic attention. Be open to unexpected connections.",
      "Your direct communication style serves you well in matters of the heart today. Honesty will strengthen your relationships."
    ],
    career: [
      "Your competitive nature gives you an edge in professional matters today, Aries. Don't be afraid to showcase your talents.",
      "Leadership opportunities abound in your career today. Your natural confidence will inspire others to follow your vision."
    ],
    health: [
      "Your high energy levels make this an excellent day for physical activity, Aries. Channel your enthusiasm into a challenging workout.",
      "Stress management is key today. Your natural intensity can be channeled into productive outlets like exercise or creative projects."
    ],
    finance: [
      "Your bold approach to financial decisions pays off today, Aries. Trust your instincts when it comes to investments.",
      "New income opportunities may present themselves. Your willingness to take calculated risks could lead to financial gains."
    ]
  },
  Taurus: {
    general: [
      "Your steady and reliable nature brings stability to those around you today, Taurus. Your practical wisdom is highly valued.",
      "The earth element strengthens your connection to nature today. Spending time outdoors will rejuvenate your spirit.",
      "Your patience and determination are your greatest assets today. Slow and steady progress leads to lasting success."
    ],
    love: [
      "Your loyalty and devotion shine in relationships today, Taurus. Your partner will appreciate your steadfast love and support.",
      "Romantic gestures come naturally to you today. Your sensual nature creates deep, meaningful connections."
    ],
    career: [
      "Your methodical approach to work ensures quality results today, Taurus. Colleagues will rely on your attention to detail.",
      "Financial stability is within reach through your consistent efforts. Your practical skills are highly valued in the workplace."
    ],
    health: [
      "Your connection to physical pleasures makes this a great day to indulge in healthy comforts, Taurus. Enjoy nourishing foods and gentle exercise.",
      "Stress relief comes through sensory experiences today. Consider a massage, warm bath, or time in nature."
    ],
    finance: [
      "Your conservative approach to money serves you well today, Taurus. Avoid impulsive purchases and focus on long-term security.",
      "Your natural talent for building wealth through steady investments is highlighted today."
    ]
  },
  Gemini: [
    "Your quick wit and adaptability make you the life of any gathering today, Gemini. Your communication skills open new doors.",
    "Intellectual curiosity drives you to explore new ideas today. Learning something new will satisfy your restless mind.",
    "Your dual nature helps you see multiple perspectives today. This gift of versatility serves you well in all situations."
  ],
  Cancer: [
    "Your intuitive nature is heightened today, Cancer. Trust your gut feelings as they will guide you to the right decisions.",
    "Family and home are your sources of strength today. Nurturing relationships brings you deep satisfaction.",
    "Your emotional intelligence helps you connect with others on a profound level today. Your empathy is a gift to those around you."
  ],
  Leo: [
    "Your natural charisma and leadership qualities shine brightly today, Leo. The spotlight finds you wherever you go.",
    "Creative expression flows naturally today. Your artistic talents and dramatic flair will be appreciated by others.",
    "Your generous spirit and warm heart attract positive energy today. Your confidence inspires others to be their best selves."
  ],
  Virgo: [
    "Your attention to detail and analytical mind serve you well today, Virgo. Your practical solutions help solve complex problems.",
    "Service to others brings you fulfillment today. Your helpful nature and organizational skills are highly valued.",
    "Your quest for perfection drives you to improve everything around you today. Your dedication to excellence is inspiring."
  ],
  Libra: [
    "Your natural sense of balance and harmony guides you today, Libra. Your diplomatic skills help resolve conflicts.",
    "Beauty and aesthetics are important to you today. Surrounding yourself with lovely things uplifts your spirit.",
    "Your fairness and justice-seeking nature make you a trusted mediator today. Your balanced perspective is valuable."
  ],
  Scorpio: [
    "Your deep intuition and penetrating insight reveal hidden truths today, Scorpio. Your investigative nature uncovers what others miss.",
    "Your passionate nature and emotional depth create intense connections today. Your loyalty and commitment are unwavering.",
    "Transformation and renewal are themes for you today. Your ability to reinvent yourself is one of your greatest strengths."
  ],
  Sagittarius: [
    "Your adventurous spirit and love of freedom inspire you to explore new horizons today, Sagittarius. Travel and learning expand your world.",
    "Your optimistic outlook and philosophical nature help you see the bigger picture today. Your wisdom guides others.",
    "Your enthusiasm and sense of humor brighten everyone's day. Your positive energy is contagious and uplifting."
  ],
  Capricorn: [
    "Your ambition and determination drive you toward success today, Capricorn. Your disciplined approach ensures steady progress.",
    "Your practical wisdom and responsible nature make you a reliable leader today. Others trust your judgment and follow your example.",
    "Your patience and persistence pay off today. Long-term goals are within reach through your methodical efforts."
  ],
  Aquarius: [
    "Your innovative thinking and humanitarian spirit inspire positive change today, Aquarius. Your unique perspective offers fresh solutions.",
    "Your independence and originality set you apart today. Your unconventional approach to life attracts interesting people and opportunities.",
    "Your intellectual curiosity and forward-thinking nature help you envision a better future today. Your ideas have the power to transform."
  ],
  Pisces: [
    "Your compassionate nature and spiritual sensitivity are heightened today, Pisces. Your empathy helps heal others.",
    "Your artistic talents and creative imagination flow freely today. Expressing yourself through art or music brings deep satisfaction.",
    "Your intuitive connection to the universe provides guidance today. Trust your dreams and inner wisdom to lead you forward."
  ]
};

const categories = ['general', 'love', 'career', 'health', 'finance'];
const moods = ['positive', 'neutral', 'challenging'];

function generateHoroscope(zodiacSign) {
  const templates = horoscopeTemplates[zodiacSign];
  const category = categories[Math.floor(Math.random() * categories.length)];
  const mood = moods[Math.floor(Math.random() * moods.length)];
  
  let content;
  
  if (zodiacSign === 'Aries' && templates[category]) {
    const categoryTemplates = templates[category];
    content = categoryTemplates[Math.floor(Math.random() * categoryTemplates.length)];
  } else {
    const generalTemplates = Array.isArray(templates) ? templates : templates.general;
    content = generalTemplates[Math.floor(Math.random() * generalTemplates.length)];
  }
  
  if (mood === 'challenging') {
    content += " However, be prepared to face some obstacles with patience and determination.";
  } else if (mood === 'neutral') {
    content += " Maintain balance in all areas of your life today.";
  }
  
  return {
    content,
    category,
    mood
  };
}

module.exports = {
  generateHoroscope
}; 