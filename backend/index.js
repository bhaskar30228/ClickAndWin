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

// Middleware
const corsOptions = {
  origin: ['http://localhost:5173', 'https://your-frontend-domain.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(express.json());

dbConnection();

// Routes
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});