
import express from 'express';

const router = express.Router();

const donorFaq = [
  { q: 'Who can donate blood?', a: 'Generally healthy individuals 18-65 years old, minimum weight as per local regulation.' },
  { q: 'How often can I donate?', a: 'Every 56 days for whole blood donations.' }
];
const hospitalFaq = [
  { q: 'How to post a request?', a: 'Create an account as hospital and use the Emergency Alerts endpoint.' }
];

router.get('/', (req, res) => {
  res.json({ donor: donorFaq, hospital: hospitalFaq });
});

export default router;
