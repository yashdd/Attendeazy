import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import session from 'express-session';
import userRoutes from './routes/userRoutes.js';
import hostRoutes from './routes/hostRoutes.js';
import cors from 'cors';


dotenv.config();    
connectDB();        


const app = express();
app.use(cors({
    origin: 'http://localhost:5173',  
    credentials: true                
  }));
app.use(express.json()); 

app.use(cors({
    origin: 'http://localhost:5173',  
    credentials: true                
  }));
  
  app.get('/', (req, res) => {
  res.send('AttendEazy server running...');
});
app.use(session({
    name: 'connect.sid',
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,  
        sameSite: 'lax'  
      }
  }));
// Use routes
app.use('/users', userRoutes);  
app.use('/hosts', hostRoutes);   
app.get("/session", (req, res) => {
    res.json({
      isUser: req.session?.isUser || false,
      isHost: req.session?.isHost || false,
      email: req.session?.email || null,
    });
  });
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
