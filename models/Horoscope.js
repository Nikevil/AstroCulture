const mongoose = require('mongoose');

const horoscopeSchema = new mongoose.Schema({
  zodiacSign: {
    type: String,
    required: true,
    enum: ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces']
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  content: {
    type: String,
    required: true,
    minlength: [50, 'Horoscope content must be at least 50 characters long']
  },
  category: {
    type: String,
    enum: ['general', 'love', 'career', 'health', 'finance'],
    default: 'general'
  },
  mood: {
    type: String,
    enum: ['positive', 'neutral', 'challenging'],
    default: 'positive'
  }
}, {
  timestamps: true
});

horoscopeSchema.index({ zodiacSign: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('Horoscope', horoscopeSchema); 