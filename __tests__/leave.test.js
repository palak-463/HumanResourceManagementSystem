const request = require('supertest');
const app = require('../src/index'); // Adjust path if your index.js file is in a different location
const Leave = require('../models/leaveModel');
const Employee = require('../models/employeeModel'); // To reference employee IDs
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;
let token;

// Generate a token for testing
beforeAll(() => {
  token = jwt.sign({ role: 'employee' }, JWT_SECRET, { expiresIn: '1h' });
});

// Clear database before each test
beforeEach(async () => {
  await Leave.deleteMany({});
});

// Test POST /leaves
test('POST /leaves should create a new leave request', async () => {
  // Assume you have employees already in the database with these IDs
  const employee = await Employee.findOne(); // Retrieve any existing employee for testing
  
  const leaveRequest = {
    employee: employee._id, // Use the employee ID retrieved
    leaveType: 'Sick',
    startDate: '2024-09-20',
    endDate: '2024-09-22',
    status: 'Pending'
  };

  const response = await request(app)
    .post('/leaves')
    .send(leaveRequest)
    .set('Authorization', `Bearer ${token}`);

  expect(response.statusCode).toBe(201);
  expect(response.body.leaveType).toBe(leaveRequest.leaveType);
});

// Test GET /leaves
test('GET /leaves should retrieve all leave requests', async () => {
  // Insert sample data
  const employee = await Employee.findOne(); // Retrieve any existing employee for testing

  await Leave.insertMany([
    { employee: employee._id, leaveType: 'Sick', startDate: '2024-09-20', endDate: '2024-09-22', status: 'Pending' },
    // Add other leaves if needed
  ]);

  const response = await request(app)
    .get('/leaves')
    .set('Authorization', `Bearer ${token}`);

  expect(response.statusCode).toBe(200);
  expect(response.body.length).toBeGreaterThan(0);
});
