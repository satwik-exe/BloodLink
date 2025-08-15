
import express from 'express';
import { protect, authorize } from '../middleware/auth.js';
import { Hospital } from '../models/Hospital.js';
import { Inventory } from '../models/Inventory.js';

const router = express.Router();

router.use(protect, authorize('hospital','admin'));

router.post('/', async (req, res) => {
  const { name, address, contactNumber, location } = req.body;
  const hospital = await Hospital.create({ user: req.user._id, name, address, contactNumber, location });
  const inv = await Inventory.create({ hospital: hospital._id });
  res.json({ hospital, inventory: inv });
});

router.get('/me', async (req, res) => {
  const hospital = await Hospital.findOne({ user: req.user._id });
  res.json(hospital);
});

export default router;
