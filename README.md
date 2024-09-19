# 🎉 HumanResourceManagementSystem

Welcome to the **HumanResourceManagementSystem**! This project is designed to manage employee records and leave requests with robust JWT-based authentication. Below you'll find detailed setup instructions, API routes, and sample test cases. Feel free to reach out if you have any questions or need further assistance!

## ✨ Features

- 🧑‍💼 **Employee Management**: 
  - Admins can add, update, retrieve, and delete employee records.
  - Employees can view their profiles.
  
- 🏖️ **Leave Management**:
  - Employees can submit leave requests.
  - Admins can approve or reject leave requests.
  
- 🔐 **JWT-based Authentication**:
  - Two roles: **Admin** and **Employee**.
  - Role-based access control for managing employee records and leaves.
  
## 🚀 Technologies Used

| Backend (API)        | Database     | Testing  |
| ---------------------| ------------ | -------- |
| Node.js              | MongoDB      | Jest     |
| Express.js           | Mongoose     | Supertest|
| JSON Web Tokens (JWT)| MongoDB Atlas|          |

## 🛠️ Setup Instructions

Let’s get you up and running with this system!

### 1. Install Node.js & MongoDB
- First, make sure you have **Node.js** and **MongoDB** installed on your machine.
  - [Download Node.js](https://nodejs.org/)
  - [Download MongoDB](https://www.mongodb.com/try/download/community)

### 2. Clone the Repo
git clone <repo-url>
cd HRMSbackend

### 3. Install Dependencies
Once you’re in the project folder, run the following to install all required packages:
npm install

### 4. Environment Variables
Create a `.env` file in the root directory with the following content:

Contents for .env:
PORT=5000
MONGO_URI=mongodb://localhost:27017/hrms
JWT_SECRET=your_jwt_secret_key_here

You can replace `JWT_SECRET` with any strong secret key you'd like.

### 5. Run the Application
Once everything is set up, run the server using:
npm run dev

The API will be up and running at `http://localhost:5000`.

### 6. Testing the API with Postman
- Use Postman to test the routes. Make sure you generate a **JWT token** first (using the login route) and include it in the `Authorization` header when making requests.
  
### 7. Running Unit Tests
We’ve included tests for the employee and leave management APIs. To run the tests:
npm test
This will execute all the tests using **Jest** and **Supertest**.


### ## 🔄 API Routes

### 🔐 Authentication

| Method | Route          | Description                    | Access       |
| ------ | -------------- | ------------------------------ | ------------ |
| POST   | /login         | User login and token generation | Public       |
| GET    | /profile       | Get employee profile            | Employee     |

### 🧑‍💼 Employee Management

| Method | Route          | Description                    | Access       |
| ------ | -------------- | ------------------------------ | ------------ |
| GET    | /employees     | Get all employees               | Admin        |
| POST   | /employees     | Add a new employee              | Admin        |
| PUT    | /employees/:id | Update employee details         | Admin        |
| DELETE | /employees/:id | Delete employee                 | Admin        |

### 🏖️ Leave Management

| Method | Route                 | Description                       | Access       |
| ------ | --------------------- | --------------------------------- | ------------ |
| GET    | /leaves               | View all leave requests            | Admin        |
| POST   | /leaves               | Submit a leave request             | Employee     |
| PUT    | /leaves/:id/approve   | Approve a leave request            | Admin        |
| PUT    | /leaves/:id/reject    | Reject a leave request             | Admin        |

## 🧪 Sample Test Cases

### Employee Management Tests
- **Test Case 1**: Retrieve all employees as an admin.
- **Test Case 2**: Add a new employee (Admin Only).
- **Test Case 3**: Fail to add employee without authorization.

### Leave Management Tests
- **Test Case 1**: Employee submits a leave request.
- **Test Case 2**: Admin approves or rejects the leave request.
- **Test Case 3**: Unauthorized user attempts to approve a leave request.
