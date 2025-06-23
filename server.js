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

// server.js

// ... your routes and other middleware

// Error Handling Middleware (MUST be the last app.use)
app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error stack to Vercel logs
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || 'Internal Server Error',
        // In production, you might remove err.stack for security
        // stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
});

// IMPORTANT: This catch-all 404 should be BEFORE your error handler
app.use((req, res) => {
  res.status(404).send('API endpoint not found.');
});

// Your app.listen
app.listen(process.env.PORT, () => {
    console.log(`🚀 Server running on port ${process.env.PORT}`);
});