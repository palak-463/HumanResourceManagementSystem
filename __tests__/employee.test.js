const request = require('supertest');
const app = require('../src/index'); // Adjust path if your index.js file is in a different location
const Employee = require('../models/employeeModel');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const JWT_SECRET = process.env.JWT_SECRET;
let token;

// Generate a token for testing
beforeAll(() => {
  token = jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '1h' }); // Assuming admin role for testing
});

// Clear database before each test
beforeEach(async () => {
  await Employee.deleteMany({});
});

// Test POST /employees
test('POST /employees should create a new employee', async () => {
  const employeeData = [
    { name: 'Palak Pardeshi', email: 'palak.pardeshi@gmail.com', position: 'HR Manager', salary: 80000, department: 'HR' },
    { name: 'Aditi Pharande', email: 'aditi.pharande@gmail.com', position: 'Software Developer', salary: 72000, department: 'Engineering' },
    { name: 'Srushti Shitole', email: 'srushti.shitole@gmail.com', position: 'Product Designer', salary: 75000, department: 'Design' },
    { name: 'Mansi Deokule', email: 'mansi.deokule@gmail.com', position: 'Marketing Specialist', salary: 68000, department: 'Marketing' },
    { name: 'Suhani Shinde', email: 'suhani.shinde@gmail.com', position: 'Sales Executive', salary: 69000, department: 'Sales' },
    { name: 'Vaibhavi Thakare', email: 'vaibhavi.thakare@gmail.com', position: 'Accountant', salary: 72000, department: 'Finance' },
    { name: 'Mallaika Kotangle', email: 'mallaika.kotangle@gmail.com', position: 'Customer Support', salary: 65000, department: 'Support' },
    { name: 'Suvarnalaxmi Lambture', email: 'suvarnalaxmi.lambture@gmail.com', position: 'Data Analyst', salary: 73000, department: 'Analytics' },
  ];

  for (const employee of employeeData) {
    const response = await request(app)
      .post('/employees')
      .send(employee)
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(201);
    expect(response.body.name).toBe(employee.name);
  }
});

// Test GET /employees
test('GET /employees should retrieve all employees', async () => {
  // Insert sample data
  await Employee.insertMany([
    { name: 'Palak Pardeshi', email: 'palak.pardeshi@gmail.com', position: 'HR Manager', salary: 80000, department: 'HR' },
    { name: 'Aditi Pharande', email: 'aditi.pharande@gmail.com', position: 'Software Developer', salary: 72000, department: 'Engineering' },
    // Add other employees if needed
  ]);

  const response = await request(app)
    .get('/employees')
    .set('Authorization', `Bearer ${token}`);

  expect(response.statusCode).toBe(200);
  expect(response.body.length).toBeGreaterThan(0);
});
