
import express from 'express';
import { protect, authorize } from '../middleware/auth.js';
import { Inventory } from '../models/Inventory.js';
import { Hospital } from '../models/Hospital.js';

const router = express.Router();

router.get('/mine', protect, authorize('hospital','admin'), async (req, res) => {
  const hosp = await Hospital.findOne({ user: req.user._id });
  if (!hosp) return res.status(404).json({ message: 'Hospital not found' });
  const inv = await Inventory.findOne({ hospital: hosp._id });
  res.json(inv);
});

router.put('/mine', protect, authorize('hospital','admin'), async (req, res) => {
  const hosp = await Hospital.findOne({ user: req.user._id });
  if (!hosp) return res.status(404).json({ message: 'Hospital not found' });
  const inv = await Inventory.findOneAndUpdate({ hospital: hosp._id }, { $set: req.body }, { new: true, upsert: true });
  res.json(inv);
});

export default router;
