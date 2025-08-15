
import mongoose from 'mongoose';

const DonationSchema = new mongoose.Schema({
  donor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  hospital: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital', required: true },
  request: { type: mongoose.Schema.Types.ObjectId, ref: 'Request' },
  scheduledAt: { type: Date, required: true },
  status: { type: String, enum: ['scheduled','completed','cancelled'], default: 'scheduled' },
  notes: String
}, { timestamps: true });

export const Donation = mongoose.model('Donation', DonationSchema);
