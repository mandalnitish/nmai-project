const express = require('express');
const router = express.Router();
const User = require('../models/User');

// @route   POST /api/newsletter/subscribe
// @desc    Subscribe to newsletter
// @access  Public
router.post('/subscribe', async (req, res) => {
  try {
    const { email, name } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required' });
    }

    // Check if user exists
    let user = await User.findOne({ email: email.toLowerCase() });

    if (user) {
      user.newsletterSubscribed = true;
      await user.save();
    } else {
      // Create minimal user for newsletter
      user = await User.create({
        name: name || 'Newsletter Subscriber',
        email: email.toLowerCase(),
        password: Math.random().toString(36).slice(-8), // Random password
        newsletterSubscribed: true
      });
    }

    res.json({ success: true, message: 'Successfully subscribed to newsletter' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   POST /api/newsletter/unsubscribe
// @desc    Unsubscribe from newsletter
// @access  Public
router.post('/unsubscribe', async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(404).json({ success: false, message: 'Email not found' });
    }

    user.newsletterSubscribed = false;
    await user.save();

    res.json({ success: true, message: 'Successfully unsubscribed from newsletter' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;