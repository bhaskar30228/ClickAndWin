// routes/userRoutes.js
import express from 'express';
const router = express.Router();
import { User } from '../model/User.js'; 

// Get all users with ranking
router.get('/', async (req, res) => {
  try {
    const users = await User.find().sort({ points: -1 });
    const usersWithRank = users.map((user, index) => ({
      ...user.toObject(),
      rank: index + 1
    }));
    res.json(usersWithRank);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add new user
router.post('/', async (req, res) => {
  try {
    const { name,points } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const existingUser = await User.findOne({ name });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const user = new User({ name,points: points });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Claim points for a user
router.post('/:userId/claim', async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Generate random points between 1-10
    const points = Math.floor(Math.random() * 10) + 1;

    // Update user points
    user.points += points;
    await user.save();

    // Create points history record
    const history = new PointsHistory({
      userId: user._id,
      points
    });
    await history.save();

    // Get updated rankings
    const users = await User.find().sort({ points: -1 });
    const usersWithRank = users.map((u, index) => ({
      ...u.toObject(),
      rank: index + 1
    }));

    res.json({
      user: {
        ...user.toObject(),
        rank: usersWithRank.find(u => u._id.toString() === userId).rank
      },
      leaderboard: usersWithRank,
      awardedPoints: points
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get points history for a user
router.get('/:userId/history', async (req, res) => {
  try {
    const { userId } = req.params;
    const history = await PointsHistory.find({ userId })
      .sort({ createdAt: -1 })
      .populate('userId', 'name');
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;