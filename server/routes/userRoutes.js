import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User.js';
import Event from '../models/Event.js';
import session from 'express-session';
import { verifyUser } from '../middlewares/authMiddleware.js';
import mongoose from 'mongoose';
import Ticket from '../models/Tickets.js'; // Assuming you have a Ticket model


const router = express.Router();
router.post('/register', async (req, res) => {
  try {
    const { fullName, email, password, interests } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with that email already exists' });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword, // store hashed
      interests,
      registeredEvents: { type: [mongoose.Schema.Types.ObjectId], ref: "Event", default: [] },  

    });

    return res.status(201).json({
      message: 'User registration successful',
      user: {
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        interests: newUser.interests,
        registeredEvents: []
      },
    });
  } catch (error) {
    console.error('User registration error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
    try {
        console.log("Reached here")
      const { email, password } = req.body;
  
      const foundUser = await User.findOne({ email });
      if (!foundUser) {
        return res.status(400).json({ message: 'User not found' });
      }
  console.log("Found user:", foundUser)
      const isMatch = await bcrypt.compare(password, foundUser.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      console.log("Password matched")
      console.log(req.session)
      req.session.isUser = true;
      req.session.isHost = false;  
      req.session.email = foundUser.email;
      req.session.userId = foundUser._id;
      console.log("Session after login:", req.session);

      return res.json({
        message: 'Login successful!',
        session: {
          isUser: true,
          isHost: false,
          email: foundUser.email,
        }
      });

    } catch (error) {
      console.error('Login error:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  });


  router.get("/profile", verifyUser, async (req, res) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ message: "Unauthorized. No session." });
      }
      const user = await User.findById(req.session.userId).select("-password"); // Never send password
      console.log("User found:", user);
      if (!user) return res.status(404).json({ message: "User not found" });
  
      res.json(user);
    } catch (err) {
      console.error("Profile fetch error:", err);
      res.status(500).json({ message: "Server error" });
    }
  });
  
  router.patch("/update-profile", verifyUser, async (req, res) => {
    try {
      const updates = req.body;
  
      const user = await User.findById(req.session.userId);
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Only update fields if they exist in body
      if (updates.fullName !== undefined) user.fullName = updates.fullName;
      if (updates.email !== undefined) user.email = updates.email;
      if (typeof updates.password === 'string' && updates.password.trim() !== '') {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(updates.password, saltRounds);
        user.password = hashedPassword;
      }
      if (updates.organizationName !== undefined) user.organizationName = updates.organizationName;
     
      await user.save();
  
      res.json({ message: "Profile updated successfully." });
    } catch (err) {
      console.error("Profile update error:", err);
      res.status(500).json({ message: "Server error" });
    }
  });
 
  router.get("/my-registered-events", verifyUser, async (req, res) => {
    try {
      const userId = req.session.userId;
      const events = await Event.find({
        registeredUsers: { $elemMatch: { userId: userId } }
      });
  
      res.json({ events });
    } catch (err) {
      console.error("Error fetching registered events:", err);
      res.status(500).json({ message: "Server error" });
    }
  });

  
    
  router.post("/register-event", verifyUser, async (req, res) => {
    try {
      const { eventId, quantity } = req.body;
      const userId = req.session.userId;
  
      const qty = parseInt(quantity); // ✅ Ensure it's a number
  
      if (!eventId || !qty || isNaN(qty) || qty <= 0) {
        return res.status(400).json({ message: "Invalid Event ID or Quantity" });
      }
  
      const user = await User.findById(userId);
      const event = await Event.findById(eventId);
  
      if (!user || !event) {
        return res.status(404).json({ message: "User or Event not found" });
      }
  
      // --- Update user.registeredEvents ---
      if (!Array.isArray(user.registeredEvents)) user.registeredEvents = [];
  
      const userEvent = user.registeredEvents.find(e => e.eventId.toString() === eventId);
      if (userEvent) {
        userEvent.quantity += qty;
      } else {
        user.registeredEvents.push({ eventId, quantity: qty }); // ✅ use qty
      }
  
      await user.save();
  
      // --- Update event.registeredUsers ---
      if (!Array.isArray(event.registeredUsers)) event.registeredUsers = [];
  
      const existingUser = event.registeredUsers.find(e => e.userId.toString() === userId);
      if (existingUser) {
        existingUser.quantity += qty;
      } else {
        event.registeredUsers.push({ userId, quantity: qty }); // ✅ use qty
      }
  
      await event.save();
  
      // --- Create or Update Ticket ---
      const existingTicket = await Ticket.findOne({ userId, eventId });
      if (existingTicket) {
        existingTicket.quantity += qty;
        await existingTicket.save();
      } else {
        await Ticket.create({
          userId,
          eventId,
          quantity: qty,
          attended: false,
        });
      }
  
      res.json({ message: "Event registered successfully" });
  
    } catch (err) {
      console.error("Register event error:", err);
      res.status(500).json({ message: "Server error" });
    }
  });
  
  
  
  

  router.post('/logout', (req, res) => {
    req.session.destroy(() => {
      res.clearCookie('connect.sid');
      res.json({ message: 'Logged out' });
    });
  });
  
export default router;
