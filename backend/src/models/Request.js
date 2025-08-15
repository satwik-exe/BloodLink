
import mongoose from 'mongoose';

const RequestSchema = new mongoose.Schema({
  hospital: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital', required: true },
  bloodGroup: { type: String, enum: ['A+','A-','B+','B-','AB+','AB-','O+','O-'], required: true },
  units: { type: Number, default: 1 },
  urgency: { type: String, enum: ['low','medium','high','critical'], default: 'high' },
  status: { type: String, enum: ['open','matched','fulfilled','cancelled'], default: 'open' },
  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], required: true } // [lng, lat]
  },
  expiresAt: Date,
  responders: [{
    donor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: ['accepted','rejected','pending'], default: 'pending' }
  }]
}, { timestamps: true });

RequestSchema.index({ location: '2dsphere' });

export const Request = mongoose.model('Request', RequestSchema);
