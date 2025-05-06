// models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  interests: {
    type: [String],
    default: [],
  },

  registeredEvents: [
    {
      eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      }
    }
  ],

}, { timestamps: true });

export default mongoose.model('User', userSchema, 'Users');
