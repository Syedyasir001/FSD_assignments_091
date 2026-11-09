const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Body parser middleware to handle JSON payloads
app.use(express.json());

// Serve static frontend files from 'public' directory
app.use(express.static('public'));

// API status & documentation endpoint
app.get('/api', (req, res) => {
  res.json({
    message: 'User Authentication System API is running',
    endpoints: {
      public: [
        'POST /api/auth/register',
        'POST /api/auth/login'
      ],
      protected: [
        'GET /api/auth/profile (Requires Bearer token)'
      ],
      roleProtected: [
        'GET /api/auth/admin/users (Requires role: admin)',
        'GET /api/auth/student/dashboard (Requires role: student or admin)'
      ]
    }
  });
});

// Mount Authentication routes
app.use('/api/auth', authRoutes);

// Catch-all route for undefined paths
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Cannot ${req.method} ${req.originalUrl} - Endpoint not found`
  });
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error('[Server Error]', err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

module.exports = { app, server };

