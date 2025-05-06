import express from "express";
import Review from "../models/Review.js";
import Ticket from "../models/Tickets.js";
import { verifyUser } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", verifyUser, async (req, res) => {
  const { eventId, rating, comment } = req.body;
  const userId = req.session.userId;

  try {
    const ticket = await Ticket.findOne({ userId, eventId });

    if (!ticket || !ticket.attended) {
      return res.status(403).json({ message: "You can only review events you attended." });
    }

    const existing = await Review.findOne({ userId, eventId });
    if (existing) {
      return res.status(400).json({ message: "You've already reviewed this event." });
    }

    const review = await Review.create({ eventId, userId, rating, comment });
    res.status(201).json(review);
  } catch (err) {
    console.error("Review error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
