const express = require('express');
const router = express.Router();

// Import employee and leave routes
const employeeRoutes = require('./employeeRoutes');
const leaveRoutes = require('./leaveRoutes');

// Home route (optional)
router.get('/', (req, res) => {
  res.send('Welcome to the HRMS System');
});

// Employee routes
router.use('/employees', employeeRoutes);

// Leave routes
router.use('/leaves', leaveRoutes);

module.exports = router;
const authRoutes = require('./authRoutes');

// Existing routes
router.use('/employees', employeeRoutes);
router.use('/leaves', leaveRoutes);

// Authentication route
router.use('/auth', authRoutes);
