import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User.js';
import session from 'express-session';
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

  router.post('/logout', (req, res) => {
    req.session.destroy(() => {
      res.clearCookie('connect.sid');
      res.json({ message: 'Logged out' });
    });
  });
  
export default router;
