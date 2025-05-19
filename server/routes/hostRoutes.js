import express from 'express';
import bcrypt from 'bcrypt';
import Host from '../models/Host.js';
import Event from '../models/Event.js';
import Review from '../models/Review.js';

const router = express.Router();


router.post('/register', async (req, res) => {
  try {
    const { fullName, email, password, organizationName, interests } = req.body;

    const existingHost = await Host.findOne({ email });
    if (existingHost) {
      return res.status(400).json({ message: 'Host with that email already exists' });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newHost = await Host.create({
      fullName,
      email,
      password: hashedPassword,
      organizationName,
      interests,
    });

    return res.status(201).json({
      message: 'Host registration successful',
      host: {
        _id: newHost._id,
        fullName: newHost.fullName,
        email: newHost.email,
        organizationName: newHost.organizationName,
        interests: newHost.interests,
      },
    });
  } catch (error) {
    console.error('Host registration error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const foundHost = await Host.findOne({ email });
    if (!foundHost) {
      return res.status(400).json({ message: 'Host not found' });
    }

    const isMatch = await bcrypt.compare(password, foundHost.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    req.session.isHost = true;
    req.session.isUser = false;
    req.session.email = foundHost.email;
    req.session.hostId = foundHost._id;


    return res.json({
      message: 'Login successful!',
      session: {
        isHost: true,
        isUser: false,
        email: foundHost.email,
      }
    });

  } catch (error) {
    console.error('Host login error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});


router.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('connect.sid');
    res.json({ message: 'Host logged out' });
  });
});

router.get('/session', (req, res) => {
  res.json({
    isHost: req.session?.isHost || false,
    isUser: req.session?.isUser || false,
    email: req.session?.email || null,
    hostId: req.session?.hostId || null,
  });
});

router.get("/:hostId/average-rating", async (req, res) => {
  const { hostId } = req.params;

  try {
    const hostEvents = await Event.find({ hostId: hostId.toString() }, "_id");
    const eventIds = hostEvents.map(e => e._id);
    if (eventIds.length === 0) {
      return res.json({ averageRating: 0 });
    }

    const result = await Review.aggregate([
      { $match: { eventId: { $in: eventIds } } },
      { $group: { _id: null, avgRating: { $avg: "$rating" } } }
    ]);

    const avg = result[0]?.avgRating || 0;

    res.json({ averageRating: avg.toFixed(1) });
  } catch (err) {
    console.error("Host avg rating error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
