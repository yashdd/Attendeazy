import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User.js';

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
    });

    return res.status(201).json({
      message: 'User registration successful',
      user: {
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        interests: newUser.interests,
      },
    });
  } catch (error) {
    console.error('User registration error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

export default router;
