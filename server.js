import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import userRoutes from './routes/userRoutes.js';
import feedbackRoutes from './routes/feedbackRoutes.js';
import metricRoutes from './routes/metricRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB error:', err));

// server.js (add this line)
// ...
// Routes
app.use('/api/users', userRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/metrics', metricRoutes);

// Add a simple root route for health checks or basic confirmation
app.get('/', (req, res) => {
    res.status(200).send('Connectify Backend is alive!');
});

// IMPORTANT: Add a catch-all for 404s (optional but good practice)
app.use((req, res) => {
  res.status(404).send('API endpoint not found.');
});

// Server start
app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on port ${process.env.PORT}`); // Removed local IP
});