const mongoose = require('mongoose');
const Horoscope = require('../models/Horoscope');
const { generateHoroscope } = require('../utils/horoscopeGenerator');

const zodiacSigns = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/horoscope-api');
    console.log('Connected to MongoDB');

    await Horoscope.deleteMany({});
    console.log('Cleared existing horoscopes');

    const today = new Date();
    const horoscopes = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);

      for (const zodiacSign of zodiacSigns) {
        const horoscopeContent = generateHoroscope(zodiacSign);
        
        horoscopes.push({
          zodiacSign,
          date,
          content: horoscopeContent.content,
          category: horoscopeContent.category,
          mood: horoscopeContent.mood
        });
      }
    }

    await Horoscope.insertMany(horoscopes);
    console.log(`Seeded ${horoscopes.length} horoscopes`);

    console.log('Database seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
}

seedDatabase(); 