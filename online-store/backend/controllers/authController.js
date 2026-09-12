/**
 * authController.js
 * ------------------
 * Handles user registration and login.
 * Authentication uses JSON Web Tokens (JWT).
 *
 * Endpoints consumed by authRoutes.js:
 *   POST /api/auth/register  – create a new user account
 *   POST /api/auth/login     – authenticate and receive a JWT
 *   GET  /api/auth/profile   – get the logged-in user's profile (protected)
 */

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: generateUUID } = require("uuid");

const users = require("../data/users");
const { JWT_SECRET, JWT_EXPIRES_IN } = require("../config/env");

// ─── Helper ────────────────────────────────────────────────────────────────────

/**
 * Creates a signed JWT for the given user.
 * @param {Object} user - The user object from the in-memory store.
 * @returns {string} Signed JWT string.
 */
function createAccessToken(user) {
  const payload = {
    userId: user.id,
    email: user.email,
    role: user.role,
  };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

// ─── Controllers ───────────────────────────────────────────────────────────────

/**
 * POST /api/auth/register
 * Registers a new customer account.
 * Body: { name, email, password }
 */
async function registerUser(req, res, next) {
  try {
    const { name, email, password } = req.body;

    // ── Validation ──────────────────────────────────────────────────────────
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required: name, email, password.",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address.",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long.",
      });
    }

    // ── Duplicate check ─────────────────────────────────────────────────────
    const normalizedEmail = email.toLowerCase().trim();
    const existingUser = users.find((u) => u.email === normalizedEmail);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "An account with this email address already exists.",
      });
    }

    // ── Hash password ───────────────────────────────────────────────────────
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // ── Create and store user ───────────────────────────────────────────────
    const newUser = {
      id: `USR-${generateUUID().slice(0, 8).toUpperCase()}`,
      name: name.trim(),
      email: normalizedEmail,
      passwordHash,
      role: "customer", // All registrations default to 'customer'
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);

    const accessToken = createAccessToken(newUser);

    return res.status(201).json({
      success: true,
      message: "Account created successfully. Welcome to Furnish India!",
      data: {
        token: accessToken,
        expiresIn: JWT_EXPIRES_IN,
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
        },
      },
    });
  } catch (error) {
    next(error);
  }
}

/**
 * POST /api/auth/login
 * Authenticates an existing user.
 * Body: { email, password }
 */
async function loginUser(req, res, next) {
  try {
    const { email, password } = req.body;

    // ── Validation ──────────────────────────────────────────────────────────
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Both email and password are required.",
      });
    }

    // ── Look up user ────────────────────────────────────────────────────────
    const normalizedEmail = email.toLowerCase().trim();
    const existingUser = users.find((u) => u.email === normalizedEmail);

    if (!existingUser) {
      // Return a generic message to avoid revealing which field is wrong
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // ── Verify password ─────────────────────────────────────────────────────
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.passwordHash
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // ── Issue token ─────────────────────────────────────────────────────────
    const accessToken = createAccessToken(existingUser);

    return res.status(200).json({
      success: true,
      message: `Welcome back, ${existingUser.name}!`,
      data: {
        token: accessToken,
        expiresIn: JWT_EXPIRES_IN,
        user: {
          id: existingUser.id,
          name: existingUser.name,
          email: existingUser.email,
          role: existingUser.role,
        },
      },
    });
  } catch (error) {
    next(error);
  }
}

/**
 * GET /api/auth/profile
 * Returns the authenticated user's profile. Protected route.
 */
function getUserProfile(req, res) {
  // req.user is set by the authenticate middleware
  const { userId, email, role } = req.user;
  const userRecord = users.find((u) => u.id === userId);

  if (!userRecord) {
    return res.status(404).json({
      success: false,
      message: "User account no longer exists.",
    });
  }

  return res.status(200).json({
    success: true,
    data: {
      id: userRecord.id,
      name: userRecord.name,
      email: userRecord.email,
      role: userRecord.role,
      createdAt: userRecord.createdAt,
    },
  });
}

module.exports = { registerUser, loginUser, getUserProfile };
