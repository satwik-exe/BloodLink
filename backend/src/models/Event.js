
import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
  hospital: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital', required: true },
  title: { type: String, required: true },
  description: String,
  startAt: { type: Date, required: true },
  endAt: { type: Date, required: true },
  address: String,
  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], default: [0,0] } // [lng, lat]
  }
}, { timestamps: true });

EventSchema.index({ location: '2dsphere' });

export const Event = mongoose.model('Event', EventSchema);
