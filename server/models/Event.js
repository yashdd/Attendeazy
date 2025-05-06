import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: String,
  time: String,
  location: String,
  image: String,
  price: Number,
  category: {
    type: String,
    required: true,
  },
  hostId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Host", 
    required: true,
  },
  registeredUsers: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
      quantity: {
        type: Number,
        required: true,
        default: 1
      }
    }
  ],
  isHighlight: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("Event", eventSchema, "Events");
