import express from 'express';
import Event from '../models/Event.js';
import multer from "multer";
import path from "path";
import { verifyHost } from '../middlewares/authMiddleware.js';
import fs from "fs"
import User from '../models/User.js';
import Ticket from '../models/Tickets.js';  
import Review from '../models/Review.js';  


const router = express.Router();
const uploadDir = path.join("assets", "eventImages");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const filename = `${Date.now()}-${file.fieldname}${ext}`;
    cb(null, filename);
  }
});
const upload = multer({ storage });

router.get("/event/:id", async (req, res) => {
    try {
    const id = req.params.id;
    const event = await Event.findById(id);

    if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }
      const relatedEvents = await Event.find({
        _id: { $ne: event._id },
        category: event.category,
      }).limit(4);

      res.json({ event, relatedEvents });
  } catch (error) {
    console.error("Error fetching event:", error);
    res.status(500).json({ message: "Server error" });
  }


}),

router.get("/", async (req, res) => {
    try {
      const highlights = await Event.find({ isHighlight: true }).limit(5);
  
      const allEvents = await Event.find({});
  
      const categoryMap = {};
      allEvents.forEach(event => {
        if (!categoryMap[event.category]) {
          categoryMap[event.category] = [];
        }
        categoryMap[event.category].push(event);
      });
  
      // Transform to desired format
      const categories = Object.entries(categoryMap).map(([name, events]) => ({
        name,
        events,
      }));
  
      res.status(200).json({ highlights, categories });
    } catch (error) {
      console.error("Error fetching events:", error);
      res.status(500).json({ message: "Server error while fetching events" });
    }
  });
  

router.post("/add", upload.single("image"), (req, res) => {
    if (!req.session.isHost || !req.session.hostId) {
        return res.status(401).json({ message: "Only hosts can add events" });
    }
  
    const { title, description, date, time, location, price,category,isHighlight } = req.body;
    const imagePath = req.file ? `/assets/eventImages/${req.file.filename}` : "";
  
    const newEvent = new Event({
      title,
      description,
      date,
      time,
      location,
      price,
      category,
      image: imagePath,
      hostId: req.session.hostId,
      isHighlight
    });
  
    newEvent.save()
      .then(() => res.status(201).json({ message: "Event created successfully" }))
      .catch((err) => {
        console.error("Event creation error:", err);
        res.status(500).json({ message: "Internal server error" });
      });
  });
  
  router.get("/host", verifyHost, async (req, res) => {
    if (!req.session.isHost || !req.session.hostId) {
          return res.status(401).json({ message: "Unauthorized: Host login required" });
    }
    try {
      const hostEvents = await Event.find({ hostId: req.session.hostId }).sort({ date: -1 });
      res.json({ events: hostEvents });
    } catch (err) {
      console.error("Error fetching host events:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  router.patch("/edit/:id", upload.single("image"), async (req, res) => {
    if (!req.session.isHost || !req.session.hostId) {
      return res.status(401).json({ message: "Only hosts can edit events" });
    }
  
    try {
      const event = await Event.findById(req.params.id);
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }
  
      if (event.hostId.toString() !== req.session.hostId) {
        return res.status(403).json({ message: "Unauthorized to edit this event" });
      }
  
      const updates = req.body;
  
      // If a new image is uploaded, update it
      if (req.file) {
        updates.image = `/assets/eventImages/${req.file.filename}`;
      }
  
      // ✅ Merge the updates without touching other fields
      Object.entries(updates).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          event[key] = value;
        }
      });
  
      await event.save();
  
      res.json({ message: "Event updated successfully" });
    } catch (err) {
      console.error("Patch event error:", err);
      res.status(500).json({ message: "Server error" });
    }
  });

  router.delete("/delete/:id", async (req, res) => {
    if (!req.session.isHost || !req.session.hostId) {
      return res.status(401).json({ message: "Only hosts can delete events" });
    }
  
    try {
      const event = await Event.findById(req.params.id);
      const eventId = req.params.id;
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }
  
      if (event.hostId.toString() !== req.session.hostId) {
        return res.status(403).json({ message: "Unauthorized to delete this event" });
      }
  
      await event.deleteOne();

      await User.updateMany(
      {},
      { $pull: { registeredEvents: { eventId } } }
    );

    await Event.updateMany(
      {},
      { $pull: { registeredUsers: { eventId } } }
    );

    await Ticket.deleteMany({ eventId });

    await Review.deleteMany({ eventId });
    console.log("Event deleted successfully and all related data cleaned up.");
      res.json({ message: "Event deleted successfully" });
    } catch (err) {
      console.error("Delete event error:", err);
      res.status(500).json({ message: "Server error" });
    }
  });


  router.get("/stats", verifyHost, async (req, res) => {
    try {
      const hostId = req.session.hostId;

      const events = await Event.find({ hostId });
      const totalEvents = events.length;
  
      const upcomingEvents = events.filter(event => {
        const eventDate = new Date(`${event.date}T${event.time}`);
        return eventDate > new Date();
      }).length;
  
      const totalAttendees = events.reduce((sum, event) => {
        return sum + event.registeredUsers.reduce((acc, user) => acc + (user.quantity || 1), 0);
      }, 0);
  
      res.json({ totalEvents, upcomingEvents, totalAttendees });
    } catch (err) {
      console.error("Error fetching host stats:", err);
      res.status(500).json({ message: "Server error" });
    }
  });
  

export default router;
