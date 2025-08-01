const mongoose = require('mongoose');
const { zodiacSigns } = require("../config/index");

const userHistorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  horoscopeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Horoscope',
    required: true
  },
  zodiacSign: {
    type: String,
    required: true,
    enum: zodiacSigns
  },
  viewedAt: {
    type: Date,
    default: Date.now
  },
  date: {
    type: Date,
    required: true
  }
}, {
  timestamps: true
});


userHistorySchema.index({ userId: 1, date: 1 }, { unique: true });

userHistorySchema.index({ userId: 1, viewedAt: -1 });

module.exports = mongoose.model('UserHistory', userHistorySchema); 