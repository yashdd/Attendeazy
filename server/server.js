import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import session from 'express-session';
import userRoutes from './routes/userRoutes.js';
import hostRoutes from './routes/hostRoutes.js';
import cors from 'cors';
import eventRoutes from './routes/eventRoutes.js';
import path from 'path';
import checkoutRoutes from "./routes/checkoutRoutes.js";
import { fileURLToPath } from "url";
import { verifyUser, verifyHost, redirectIfLoggedIn, requireLogin } from './middlewares/authMiddleware.js';
import ticketRoutes from './routes/ticketRoutes.js';  
import reviewRoutes from './routes/reviewRoutes.js';


dotenv.config();    
connectDB();        


const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.json()); 

app.use(cors({
    origin: 'http://localhost:5173',  
    credentials: true                
  }));
  
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

  app.get('/', (req, res) => {
  res.send('AttendEazy server running...');
});

app.use(['/login', '/register'], redirectIfLoggedIn);
// app.use('/users', userRoutes);  
// app.use('/hosts', hostRoutes);   
// app.use('/events', eventRoutes);
// app.use("/assets", express.static(path.join(__dirname, "assets")));
// app.use("/checkout", checkoutRoutes);

app.use('/users', userRoutes);

app.use('/hosts', hostRoutes);

app.use('/events/register-event', verifyUser);       
app.use('/events/add', verifyHost);         

app.use('/events', eventRoutes);
app.use('/reviews', verifyUser, reviewRoutes);
app.use('/tickets', ticketRoutes); 
app.use('/checkout', verifyUser, checkoutRoutes);
app.use("/assets", express.static(path.join(__dirname, "assets")));

app.get("/session", (req, res) => {
    res.json({
      userId: req.session.userId, 
      isUser: req.session?.isUser || false,
      isHost: req.session?.isHost || false,
      email: req.session?.email || null,
    });
  });

  
  
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
