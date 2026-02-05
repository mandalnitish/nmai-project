const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Article = require('../models/Article');
const MCQ = require('../models/MCQ');
const { protect, authorize } = require('../middleware/auth');

// All admin routes require admin role
router.use(protect, authorize('admin'));

// @route   GET /api/admin/dashboard-stats
// @desc    Get dashboard statistics
// @access  Admin only
router.get('/dashboard-stats', async (req, res) => {
  try {
    const [
      totalUsers,
      totalArticles,
      totalMCQs,
      publishedArticles,
      premiumUsers
    ] = await Promise.all([
      User.countDocuments(),
      Article.countDocuments(),
      MCQ.countDocuments(),
      Article.countDocuments({ status: 'published' }),
      User.countDocuments({ 'subscription.isActive': true })
    ]);

    // Get recent users
    const recentUsers = await User.find()
      .sort('-createdAt')
      .limit(5)
      .select('name email createdAt');

    // Get popular articles
    const popularArticles = await Article.find({ status: 'published' })
      .sort('-viewCount')
      .limit(5)
      .select('title viewCount likes');

    res.json({
      success: true,
      data: {
        stats: {
          totalUsers,
          totalArticles,
          totalMCQs,
          publishedArticles,
          premiumUsers
        },
        recentUsers,
        popularArticles
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   GET /api/admin/users
// @desc    Get all users with pagination
// @access  Admin only
router.get('/users', async (req, res) => {
  try {
    const { page = 1, limit = 20, search } = req.query;
    const filter = {};

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    const users = await User.find(filter)
      .select('-password')
      .sort('-createdAt')
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await User.countDocuments(filter);

    res.json({
      success: true,
      data: users,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(count / limit),
        totalItems: count
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   PUT /api/admin/users/:id
// @desc    Update user (admin can change role, status)
// @access  Admin only
router.put('/users/:id', async (req, res) => {
  try {
    const { role, isActive, subscription } = req.body;
    const updates = {};

    if (role) updates.role = role;
    if (isActive !== undefined) updates.isActive = isActive;
    if (subscription) updates.subscription = subscription;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, data: user, message: 'User updated successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// @route   DELETE /api/admin/users/:id
// @desc    Delete user
// @access  Admin only
router.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    await user.remove();
    res.json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;