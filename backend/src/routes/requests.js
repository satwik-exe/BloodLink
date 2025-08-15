
import express from 'express';
import { protect, authorize } from '../middleware/auth.js';
import { Request } from '../models/Request.js';
import { Hospital } from '../models/Hospital.js';
import { User } from '../models/User.js';
import { Donation } from '../models/Donation.js';

const router = express.Router();

router.post('/', protect, authorize('hospital','admin'), async (req, res) => {
  const hosp = await Hospital.findOne({ user: req.user._id });
  if (!hosp) return res.status(404).json({ message: 'Hospital not found' });
  const { bloodGroup, units = 1, urgency = 'high', expiresAt } = req.body;
  const request = await Request.create({
    hospital: hosp._id,
    bloodGroup,
    units,
    urgency,
    location: hosp.location,
    expiresAt
  });
  const donors = await User.find({
    role: 'donor',
    eligible: true,
    bloodGroup,
    location: { $near: { $geometry: hosp.location, $maxDistance: 25000 } }
  }).limit(50);
  res.json({ request, suggestedDonors: donors.map(d => ({ id: d._id, name: d.name })) });
});

router.get('/nearby', protect, authorize('donor','admin'), async (req, res) => {
  const { bloodGroup, maxDistance = 20000, urgency } = req.query;
  const q = { status: 'open' };
  if (bloodGroup) q.bloodGroup = bloodGroup;
  if (urgency) q.urgency = urgency;
  if (req.user.location?.coordinates?.length === 2) {
    q.location = { $near: { $geometry: req.user.location, $maxDistance: Number(maxDistance) } };
  }
  const list = await Request.find(q).sort({ createdAt: -1 }).limit(100);
  res.json(list);
});

router.post('/:id/respond', protect, authorize('donor','admin'), async (req, res) => {
  const { status } = req.body;
  const request = await Request.findById(req.params.id);
  if (!request) return res.status(404).json({ message: 'Request not found' });
  const existing = request.responders.find(r => String(r.donor) === String(req.user._id));
  if (existing) existing.status = status;
  else request.responders.push({ donor: req.user._id, status });
  await request.save();
  res.json(request);
});

router.post('/:id/book', protect, authorize('donor','admin'), async (req, res) => {
  const request = await Request.findById(req.params.id);
  if (!request) return res.status(404).json({ message: 'Request not found' });
  const { scheduledAt } = req.body;
  const donation = await Donation.create({
    donor: req.user._id,
    hospital: request.hospital,
    request: request._id,
    scheduledAt
  });
  res.json(donation);
});

export default router;
