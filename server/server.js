import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

import userRoutes from './routes/userRoutes.js';
import hostRoutes from './routes/hostRoutes.js';
import cors from 'cors';


dotenv.config();    
connectDB();        

const app = express();
app.use(express.json()); 

app.use(cors());       // Enable CORS for all routes
app.get('/', (req, res) => {
  res.send('AttendEazy server running...');
});

// Use routes
app.use('/users', userRoutes);    // => /api/users/register
app.use('/hosts', hostRoutes);    // => /api/hosts/register

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
