const express = require('express');
const router = express.Router();

const {
  register,
  login,
  getProfile,
  getAllUsersForAdmin,
  getStudentDashboard
} = require('../controllers/authController');

const authenticateToken = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');

// Public Routes
router.post('/register', register);
router.post('/login', login);

// Protected Route (Requires any valid logged-in user)
router.get('/profile', authenticateToken, getProfile);

// Role-Protected Routes
// 1. Admin-only Route
router.get(
  '/admin/users',
  authenticateToken,
  authorizeRoles('admin'),
  getAllUsersForAdmin
);

// 2. Student Portal Route (accessible to students, plus admins if desired)
router.get(
  '/student/dashboard',
  authenticateToken,
  authorizeRoles('student', 'admin'),
  getStudentDashboard
);

module.exports = router;

