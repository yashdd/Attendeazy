import express from 'express';
import Event from '../models/Event.js';
import multer from "multer";
import path from "path";
import fs from "fs"

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
    console.log(req.session.isHost, req.session.hostId)
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
  
  router.get("/host", async (req, res) => {
    console.log("Host ID:", req.session.hostId);
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

export default router;
