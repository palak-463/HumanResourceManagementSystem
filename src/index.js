const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // For parsing application/json

// Connect to MongoDB using the URI from .env
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Import employee routes
const employeeRoutes = require('./routes/employeeRoutes');

// Use employee routes
app.use('/employees', employeeRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
const authRoutes = require('./routes/authRoutes');
app.use('/auth', authRoutes);
