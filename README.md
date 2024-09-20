# 📂 Human Resource Management System

This is the backend for **Human Resource Management System**. This project is designed to help manage employee records and leave requests with secure JWT-based authentication. Whether you're an admin overseeing the team or an employee checking your profile, this system has got you covered!

## ✨ Features

- 🧑‍💼 **Employee Management**:
  - Admins can effortlessly add, update, retrieve, and delete employee records.
  - Employees can view and manage their profiles with ease.
  
- 🏖️ **Leave Management**:
  - Employees can submit leave requests for approval.
  - Admins have the power to approve or reject these leave requests.

- 🔐 **JWT-based Authentication**:
  - Two roles: **Admin** and **Employee**.
  - Role-based access control ensuring only authorized personnel can manage sensitive data.

## 🚀 Technologies Used

| Backend             | Database     | Testing Tools |
| ------------------- | ------------ | ------------- |
| **Node.js**         | MongoDB      | Jest          |
| **Express.js**      | Mongoose     | Supertest     |
| **JSON Web Tokens** | MongoDB Atlas| Mocha Chai    |

## 🔄 API Routes

A variety of endpoints for both admin and employee functionalities have been used:

### 🔐 Authentication
| Method | Route      | Description                     | Access  |
| ------ | ---------- | ------------------------------- | ------- |
| POST   | `/login`   | User login and token generation | Public  |
| GET    | `/profile` | Get employee profile            | Employee|

### 🧑‍💼 Employee Management
| Method | Route              | Description                    | Access |
| ------ | ------------------ | ------------------------------ | ------ |
| GET    | `/employees`       | Get all employees              | Admin  |
| POST   | `/employees`       | Add a new employee             | Admin  |
| PUT    | `/employees/:id`   | Update employee details        | Admin  |
| DELETE | `/employees/:id`   | Delete employee                | Admin  |

### 🏖️ Leave Management
| Method | Route                      | Description                   | Access   |
| ------ | -------------------------- | ----------------------------- | -------- |
| GET    | `/leaves`                  | View all leave requests       | Admin    |
| POST   | `/leaves`                  | Submit a leave request        | Employee |
| PUT    | `/leaves/:id/approve`      | Approve a leave request       | Admin    |
| PUT    | `/leaves/:id/reject`       | Reject a leave request        | Admin    |

## 🎯 Bonus Features

- 👤 **Role-based access control** ensures that employees and admins only access what they are authorized to see and manage.
- 🛡️ **Security-focused** with JWT tokens to ensure secure access to all endpoints.
