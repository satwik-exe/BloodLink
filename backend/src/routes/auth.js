
import express from 'express';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import { User } from '../models/User.js';

const router = express.Router();

const sign = (user) => jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });

router.post('/register',
  body('role').isIn(['donor','hospital','admin']).withMessage('Invalid role'),
  body('password').isLength({ min: 6 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    try {
      const { name, email, phone, password, role, bloodGroup, age, medicalHistory, location } = req.body;
      const user = await User.create({ name, email, phone, password, role, bloodGroup, age, medicalHistory, location });
      const token = sign(user);
      res.json({ token, user });
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  }
);

router.post('/login',
  body('password').exists(),
  async (req, res) => {
    const { email, phone, password } = req.body;
    const by = email ? { email } : { phone };
    try {
      const user = await User.findOne(by);
      if (!user) return res.status(401).json({ message: 'Invalid credentials' });
      const ok = await user.matchPassword(password);
      if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
      const token = sign(user);
      res.json({ token, user });
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }
);

export default router;
