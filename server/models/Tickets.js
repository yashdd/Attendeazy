import mongoose from 'mongoose';

const TicketSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
  quantity: { type: Number, default: 1 },
  attended: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

TicketSchema.index({ userId: 1, eventId: 1 }, { unique: true }); // Prevent duplicate bookings

export default mongoose.model('Ticket', TicketSchema);
