const express = require('express');
const router = express.Router();
const Leave = require('../models/leaveModel');
const { authenticateToken, authorizeRoles } = require('../middleware/authMiddleware');

// POST a new leave request (Employees only)
router.post('/', authenticateToken, async (req, res) => {
  const { leaveType, startDate, endDate } = req.body;

  const newLeave = new Leave({
    employee: req.user.id,
    leaveType,
    startDate,
    endDate,
    status: 'Pending',
  });

  try {
    const savedLeave = await newLeave.save();
    res.status(201).json(savedLeave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET leave requests (Admins only)
router.get('/', authenticateToken, authorizeRoles('Admin'), async (req, res) => {
  try {
    const leaves = await Leave.find().populate('employee');
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PATCH update leave status (Admins only)
router.patch('/:id', authenticateToken, authorizeRoles('Admin'), async (req, res) => {
  try {
    const leave = await Leave.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!leave) return res.status(404).json({ message: 'Leave not found' });
    res.json(leave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
