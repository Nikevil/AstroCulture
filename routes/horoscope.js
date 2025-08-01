const express = require('express');
const Horoscope = require('../models/Horoscope');
const UserHistory = require('../models/UserHistory');
const auth = require('../middleware/auth');
const { generateHoroscope } = require('../utils/horoscopeGenerator');
const { zodiacSigns } = require("../config/index");

const router = express.Router();

/**
 * @swagger
 * /api/horoscope/today:
 *   get:
 *     summary: Get today's horoscope for the authenticated user
 *     tags: [Horoscope]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Today's horoscope retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 horoscope:
 *                   type: object
 *                   properties:
 *                     zodiacSign:
 *                       type: string
 *                     date:
 *                       type: string
 *                       format: date
 *                     content:
 *                       type: string
 *                     category:
 *                       type: string
 *                     mood:
 *                       type: string
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Horoscope not found
 */
router.get('/today', auth, async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    let horoscope = await Horoscope.findOne({
      zodiacSign: req.user.zodiacSign,
      date: {
        $gte: today,
        $lt: tomorrow
      }
    });

    if (!horoscope) {
      const horoscopeContent = generateHoroscope(req.user.zodiacSign);
      horoscope = new Horoscope({
        zodiacSign: req.user.zodiacSign,
        date: today,
        content: horoscopeContent.content,
        category: horoscopeContent.category,
        mood: horoscopeContent.mood
      });
      await horoscope.save();
    }

    await UserHistory.findOneAndUpdate(
      {
        userId: req.user._id,
        date: today
      },
      {
        userId: req.user._id,
        horoscopeId: horoscope._id,
        zodiacSign: req.user.zodiacSign,
        date: today
      },
      { upsert: true, new: true }
    );

    res.json({ horoscope });
  } catch (error) {
    console.error('Today horoscope error:', error);
    res.status(500).json({ error: 'Failed to get today\'s horoscope' });
  }
});

/**
 * @swagger
 * /api/horoscope/history:
 *   get:
 *     summary: Get horoscope history for the last 7 days
 *     tags: [Horoscope]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Horoscope history retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 history:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       date:
 *                         type: string
 *                         format: date
 *                       horoscope:
 *                         type: object
 *                       viewed:
 *                         type: boolean
 *       401:
 *         description: Unauthorized
 */
router.get('/history', auth, async (req, res) => {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    const userHistory = await UserHistory.find({
      userId: req.user._id,
      date: { $gte: sevenDaysAgo }
    }).populate('horoscopeId');

    const horoscopes = await Horoscope.find({
      zodiacSign: req.user.zodiacSign,
      date: { $gte: sevenDaysAgo }
    }).sort({ date: -1 });

    const viewedDates = new Set();
    userHistory.forEach(history => {
      viewedDates.add(history.date.toISOString().split('T')[0]);
    });

    const history = horoscopes.map(horoscope => {
      const dateStr = horoscope.date.toISOString().split('T')[0];
      return {
        date: dateStr,
        horoscope: horoscope,
        viewed: viewedDates.has(dateStr)
      };
    });

    res.json({ history });
  } catch (error) {
    console.error('History error:', error);
    res.status(500).json({ error: 'Failed to get horoscope history' });
  }
});

/**
 * @swagger
 * /api/horoscope/{zodiacSign}:
 *   get:
 *     summary: Get today's horoscope for a specific zodiac sign
 *     tags: [Horoscope]
 *     parameters:
 *       - in: path
 *         name: zodiacSign
 *         required: true
 *         schema:
 *           type: string
 *           enum: [Aries, Taurus, Gemini, Cancer, Leo, Virgo, Libra, Scorpio, Sagittarius, Capricorn, Aquarius, Pisces]
 *     responses:
 *       200:
 *         description: Horoscope retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 horoscope:
 *                   type: object
 *       404:
 *         description: Horoscope not found
 */
router.get('/:zodiacSign', async (req, res) => {
  try {
    const { zodiacSign } = req.params;
    
    if (!zodiacSigns.includes(zodiacSign)) {
      return res.status(400).json({ error: 'Invalid zodiac sign' });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    let horoscope = await Horoscope.findOne({
      zodiacSign: zodiacSign,
      date: {
        $gte: today,
        $lt: tomorrow
      }
    });

    if (!horoscope) {
      const horoscopeContent = generateHoroscope(zodiacSign);
      horoscope = new Horoscope({
        zodiacSign: zodiacSign,
        date: today,
        content: horoscopeContent.content,
        category: horoscopeContent.category,
        mood: horoscopeContent.mood
      });
      await horoscope.save();
    }

    res.json({ horoscope });
  } catch (error) {
    console.error('Zodiac horoscope error:', error);
    res.status(500).json({ error: 'Failed to get horoscope' });
  }
});

module.exports = router; 