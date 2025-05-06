import express from 'express';
import Ticket from '../models/Tickets.js'; 
import { verifyUser } from '../middlewares/authMiddleware.js'; 
import mongoose from 'mongoose';
import { verifyHost } from '../middlewares/authMiddleware.js';
import Event from '../models/Event.js'; // Assuming you have a Ticket model

const router = express.Router();

router.get("/my", verifyUser, async (req, res) => {
    try {
      const userId = req.session.userId;
        const tickets = await Ticket.find({ userId }).populate({
            path: "eventId",
            model: "Event"  
          });        
          console.log(userId)
      const response = tickets.map(ticket => ({
        event: ticket.eventId,               
        quantity: ticket.quantity,          
        attended: ticket.attended,
        userId: ticket.userId.toString(),          
      }));
        console.log("Tickets fetched:", response); // Debugging line
      res.json(response);
    } catch (err) {
      console.error("Fetch my tickets error:", err);
      res.status(500).json({ message: "Server error" });
    }
  });
  
  router.post("/mark-attended", verifyHost, async (req, res) => {
    const { userId, eventId } = req.body;
  
    try {
      const ticket = await Ticket.findOne({ userId, eventId });
      if (!ticket) return res.status(404).json({ message: "Ticket not found" });
  
      ticket.attended = true;
      await ticket.save();
  
      res.json({ message: "Marked as attended" });
    } catch (err) {
      console.error("Mark attended error:", err);
      res.status(500).json({ message: "Server error" });
    }
  });
  
  export default router;