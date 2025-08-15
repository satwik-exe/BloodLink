
import mongoose from 'mongoose';

const HospitalSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  address: String,
  contactNumber: String,
  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], default: [0,0] } // [lng, lat]
  }
}, { timestamps: true });

HospitalSchema.index({ location: '2dsphere' });

export const Hospital = mongoose.model('Hospital', HospitalSchema);
