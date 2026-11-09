# User Authentication & Role-Based Authorization System

An Express + MongoDB backend practical demonstrating secure user authentication and role-based access control (RBAC).

---

## 🎯 Practical Objectives Covered

- ✅ **User Model in MongoDB**: Schema defined with Mongoose including `name`, `email`, `password`, and `role` (`student` or `admin`).
- ✅ **Registration Route**: Creates new accounts with duplicate email validation.
- ✅ **Password Hashing with bcrypt**: Securely generates salts and hashes passwords before saving in MongoDB.
- ✅ **Login & JWT Generation**: Validates credentials with `bcrypt.compare` and signs a JSON Web Token (JWT).
- ✅ **Authentication Middleware**: Verifies JWT from the `Authorization: Bearer <token>` header and attaches `req.user`.
- ✅ **Protected Profile Route**: Allows authenticated users to view their profile details.
- ✅ **Role-Based Access Control (Admin & Student)**: Role checking middleware to restrict endpoints (e.g. Admin user management and Student portal).

---

## 📦 Libraries Used

| Library | Purpose |
|---|---|
| **`express`** | Fast, unopinionated web server and routing framework |
| **`mongoose`** | MongoDB object modeling, schema validation, and lifecycle hooks |
| **`bcrypt`** | Cryptographic password hashing using salt rounds |
| **`jsonwebtoken`** | Creation and verification of signed JSON Web Tokens (JWT) |
| **`dotenv`** | Loads environment variables from `.env` into `process.env` |

---

## 📁 Project Structure

```text
c:/labapp/
├── config/
│   └── db.js                  # MongoDB connection setup
├── controllers/
│   └── authController.js      # Auth & role controller logic (register, login, profile, admin, student)
├── middleware/
│   ├── authMiddleware.js      # JWT authentication verification middleware
│   └── roleMiddleware.js      # Role authorization check middleware
├── models/
│   └── User.js                # Mongoose User model with pre-save bcrypt hook & comparePassword
├── routes/
│   └── authRoutes.js          # Route definitions
├── .env                       # Environment configuration
├── .env.example               # Example template for environment configuration
├── package.json               # Node.js project manifest & scripts
├── server.js                  # Express application entrypoint
└── README.md                  # Complete documentation and API testing guide
```

---

## ⚙️ Installation & Setup

### 1. Prerequisites
Ensure you have:
- **Node.js** (v18 or higher)
- **MongoDB** running locally (`mongodb://127.0.0.1:27017`) or a free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cloud cluster URI.

### 2. Configure Environment Variables
Verify or edit `.env`:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/user_auth_db
JWT_SECRET=super_secret_jwt_key_for_auth_lab_123456
JWT_EXPIRES_IN=24h
```

### 3. Run the Server

```bash
# Production / standard start
npm start

# Development mode (with auto-restart on changes)
npm run dev
```

Server will start on: `http://localhost:5000`

---

## 📡 API Endpoints Reference

### 1. Register a Student (`POST /api/auth/register`)
- **Access**: Public
- **Request Body**:
```json
{
  "name": "Jane Student",
  "email": "jane@example.com",
  "password": "Password123!",
  "role": "student"
}
```
- **Response** (`201 Created`):
```json
{
  "success": true,
  "message": "User registered successfully!",
  "token": "eyJhbGciOi...",
  "user": {
    "id": "67300...",
    "name": "Jane Student",
    "email": "jane@example.com",
    "role": "student"
  }
}
```

---

### 2. Register an Admin (`POST /api/auth/register`)
- **Access**: Public
- **Request Body**:
```json
{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "AdminPassword123!",
  "role": "admin"
}
```

---

### 3. Login (`POST /api/auth/login`)
- **Access**: Public
- **Request Body**:
```json
{
  "email": "jane@example.com",
  "password": "Password123!"
}
```
- **Response** (`200 OK`):
```json
{
  "success": true,
  "message": "Login successful!",
  "token": "eyJhbGciOi...",
  "user": {
    "id": "67300...",
    "name": "Jane Student",
    "email": "jane@example.com",
    "role": "student"
  }
}
```

---

### 4. Get Current User Profile (`GET /api/auth/profile`)
- **Access**: Private (Any valid JWT)
- **Headers**:
  ```http
  Authorization: Bearer <your_jwt_token>
  ```
- **Response** (`200 OK`):
```json
{
  "success": true,
  "message": "Profile retrieved successfully.",
  "user": {
    "_id": "67300...",
    "name": "Jane Student",
    "email": "jane@example.com",
    "role": "student",
    "createdAt": "2026-11-09T...",
    "updatedAt": "2026-11-09T..."
  }
}
```

---

### 5. Student Portal Dashboard (`GET /api/auth/student/dashboard`)
- **Access**: Private (`student` or `admin` role)
- **Headers**:
  ```http
  Authorization: Bearer <student_or_admin_jwt>
  ```

---

### 6. Admin Only - List All Users (`GET /api/auth/admin/users`)
- **Access**: Private (`admin` role only)
- **Headers**:
  ```http
  Authorization: Bearer <admin_jwt>
  ```
- If a user with `student` role attempts this endpoint:
- **Response** (`403 Forbidden`):
```json
{
  "success": false,
  "message": "Forbidden: Access denied. Role 'student' is not authorized to access this resource. Required role: admin."
}
```

---

## 🧪 Testing with cURL

### 1. Register a new student:
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Alex Doe\",\"email\":\"alex@school.edu\",\"password\":\"secret123\",\"role\":\"student\"}"
```

### 2. Login to get a token:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"alex@school.edu\",\"password\":\"secret123\"}"
```

### 3. Access protected profile:
```bash
curl -X GET http://localhost:5000/api/auth/profile \
  -H "Authorization: Bearer <COPIED_TOKEN_HERE>"
```

### 4. Attempt admin route as student (should return 403 Forbidden):
```bash
curl -X GET http://localhost:5000/api/auth/admin/users \
  -H "Authorization: Bearer <STUDENT_TOKEN_HERE>"
```

