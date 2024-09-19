// routes/authRoutes.js

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/userModel'); // Adjust path as needed

// Route to login and get JWT token
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Find user by email and check password
  const user = await User.findOne({ email });
  if (!user || user.password !== password) { // Replace with hashed password check
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Generate JWT token
  const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

module.exports = router;
