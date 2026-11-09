const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Helper function to generate JWT
const generateToken = (userId, role) => {
  const secret = process.env.JWT_SECRET || 'fallback_secret_key_change_in_production';
  const expiresIn = process.env.JWT_EXPIRES_IN || '24h';

  return jwt.sign({ id: userId, role }, secret, { expiresIn });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Validate inputs
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and password.'
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'A user with this email address already exists.'
      });
    }

    // Create user (password will be hashed by pre-save hook in models/User.js)
    const user = new User({
      name,
      email,
      password,
      role: role || 'student'
    });

    await user.save();

    // Generate JWT token
    const token = generateToken(user._id, user.role);

    res.status(201).json({
      success: true,
      message: 'User registered successfully!',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Registration failed due to a server error.',
      error: error.message
    });
  }
};

// @desc    Login existing user & generate JWT
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input presence
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password.'
      });
    }

    // Find user by email (include password for verification)
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.'
      });
    }

    // Verify password using bcrypt
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.'
      });
    }

    // Generate JWT token
    const token = generateToken(user._id, user.role);

    res.status(200).json({
      success: true,
      message: 'Login successful!',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Login failed due to a server error.',
      error: error.message
    });
  }
};

// @desc    Get current logged in user's profile
// @route   GET /api/auth/profile
// @access  Private (Authenticated users)
exports.getProfile = async (req, res) => {
  try {
    // req.user was populated by authenticateToken middleware
    res.status(200).json({
      success: true,
      message: 'Profile retrieved successfully.',
      user: req.user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve profile.',
      error: error.message
    });
  }
};

// @desc    Admin-only dashboard route to view all users
// @route   GET /api/auth/admin/users
// @access  Private (Admin role only)
exports.getAllUsersForAdmin = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: 'Admin authorization granted: All users retrieved.',
      count: users.length,
      users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch users list.',
      error: error.message
    });
  }
};

// @desc    Student-only dashboard route
// @route   GET /api/auth/student/dashboard
// @access  Private (Student role)
exports.getStudentDashboard = async (req, res) => {
  res.status(200).json({
    success: true,
    message: `Welcome to the Student Portal, ${req.user.name}!`,
    courses: [
      { id: 'CS101', name: 'Web Development with Node & Express' },
      { id: 'CS102', name: 'Database Systems with MongoDB' }
    ],
    studentInfo: {
      id: req.user._id,
      name: req.user.name,
      role: req.user.role
    }
  });
};

