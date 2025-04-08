// models/Host.js
import mongoose from 'mongoose';

const hostSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  interests: { type: [String], default: [] },

  organizationName: { type: String, default: '' },
}, { timestamps: true });

export default mongoose.model('Host', hostSchema, 'Hosts');
