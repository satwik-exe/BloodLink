
import express from 'express';
import { protect, authorize } from '../middleware/auth.js';
import { Donation } from '../models/Donation.js';
import { isEligibleToDonate } from '../utils/eligibility.js';

const router = express.Router();

router.use(protect, authorize('donor', 'admin'));

router.get('/me', async (req, res) => {
  res.json(req.user);
});

router.put('/profile', async (req, res) => {
  const updatable = ['name','bloodGroup','age','medicalHistory','location','lastDonationDate'];
  updatable.forEach(k => req.user[k] = req.body[k] ?? req.user[k]);
  const { ok, reason } = isEligibleToDonate({ age: req.user.age, lastDonationDate: req.user.lastDonationDate, medicalHistory: req.user.medicalHistory });
  req.user.eligible = ok;
  await req.user.save();
  res.json({ user: req.user, eligibility: { ok, reason: reason || null } });
});

router.get('/eligibility', async (req, res) => {
  const { ok, reason } = isEligibleToDonate({ age: req.user.age, lastDonationDate: req.user.lastDonationDate, medicalHistory: req.user.medicalHistory });
  res.json({ ok, reason: reason || null });
});

router.get('/donations', async (req, res) => {
  const list = await Donation.find({ donor: req.user._id }).sort({ createdAt: -1 });
  res.json(list);
});

export default router;
