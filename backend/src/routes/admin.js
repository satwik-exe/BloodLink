
import express from 'express';
import { protect, authorize } from '../middleware/auth.js';
import { User } from '../models/User.js';
import { Request } from '../models/Request.js';

const router = express.Router();
router.use(protect, authorize('admin'));

router.get('/stats', async (req, res) => {
  const users = await User.countDocuments();
  const donors = await User.countDocuments({ role: 'donor' });
  const hospitals = await User.countDocuments({ role: 'hospital' });
  const requestsOpen = await Request.countDocuments({ status: 'open' });
  res.json({ users, donors, hospitals, requestsOpen });
});

router.get('/users', async (req, res) => {
  const list = await User.find().limit(200).sort({ createdAt: -1 });
  res.json(list);
});

router.put('/users/:id/verify', async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, { verified: true }, { new: true });
  res.json(user);
});

export default router;
