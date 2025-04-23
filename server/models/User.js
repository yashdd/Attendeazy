// models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  interests: { type: [String], default: [],
    registeredEvents: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Event",
      default: [],  
    },
  },
}, { timestamps: true });

export default mongoose.model('User', userSchema, 'Users');
