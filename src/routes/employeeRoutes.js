const express = require('express');
const router = express.Router();
const Employee = require('../models/employeeModel');
const { authenticateToken } = require('../middleware/authMiddleware');

// GET all employees (Admins and Employees)
router.get('/', authenticateToken, async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST a new employee (Admins only)
router.post('/', authenticateToken, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admins only.' });
  }

  const { name, email, position, salary, department } = req.body;
  const newEmployee = new Employee({ name, email, position, salary, department });

  newEmployee.save()
    .then(savedEmployee => res.status(201).json(savedEmployee))
    .catch(error => res.status(400).json({ message: error.message }));
});

// PUT (update) an employee (Admins only)
router.put('/:id', authenticateToken, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admins only.' });
  }

  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedEmployee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE an employee (Admins only)
router.delete('/:id', authenticateToken, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admins only.' });
  }

  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.json({ message: 'Employee deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
