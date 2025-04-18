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
router.post('/login', async (req, res) => {
  try {
    console.log("Reacheds host login route")
    const { email, password } = req.body;

    const foundHost = await Host.findOne({ email });
    if (!foundHost) {
      return res.status(400).json({ message: 'Host not found' });
    }
    console.log("Found host:", foundHost)
    const isMatch = await bcrypt.compare(password, foundHost.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    req.session.isHost = true;
    req.session.isUser = false;
    req.session.email = foundHost.email;
    req.session.hostId = foundHost._id;

    console.log("Host session after login:", req.session);

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

// router.get("/dashboard", (req, res) => {
//   console.log("Session on /dashboard route:", req.session.isHost);

//   if (req.session.isHost) {
//     return res.json({
//       message: "Host dashboard access granted",
//       email: req.session.email,
//       hostId: req.session.userId,
//     });
    
    
//   } else {
//     return res.status(401).json({ message: "Unauthorized: Not a host" });
//   }
// });

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
  });
});

export default router;
