import express from 'express';
import bcrypt from 'bcrypt';
import Host from '../models/Host.js';

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

export default router;
