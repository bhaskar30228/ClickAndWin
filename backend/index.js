// server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import  initializeDatabase  from './utils/initializeDB.js'; // Assuming this function initializes the database with default users
import userRoutes from './routes/userRoutes.js'; // Assuming you have a userRoutes file for handling user-related routes
import { dbConnection } from './config/Db.js';
const app = express();

const allowedOrigins = ['https://click-and-win.vercel.app/', 'http://localhost:5173'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
// Apply CORS middleware
app.use(cors(corsOptions));
app.use(express.json());

dbConnection();

// Routes
app.get("/",(req,res)=>{
    res.send("Hello")
})
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});