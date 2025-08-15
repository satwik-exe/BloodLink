
import express from 'express';
import { protect, authorize } from '../middleware/auth.js';
import { Event } from '../models/Event.js';
import { Hospital } from '../models/Hospital.js';

const router = express.Router();

router.post('/', protect, authorize('hospital','admin'), async (req, res) => {
  const hosp = await Hospital.findOne({ user: req.user._id });
  if (!hosp) return res.status(404).json({ message: 'Hospital not found' });
  const event = await Event.create({ hospital: hosp._id, ...req.body, location: req.body.location || hosp.location });
  res.json(event);
});

router.get('/', async (req, res) => {
  const now = new Date();
  const list = await Event.find({ endAt: { $gte: now } }).sort({ startAt: 1 }).limit(100);
  res.json(list);
});

export default router;
