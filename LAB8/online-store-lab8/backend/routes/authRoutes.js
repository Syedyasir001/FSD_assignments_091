/**
 * authRoutes.js
 * --------------
 * Mounts authentication-related routes under /api/auth.
 *
 *   POST /api/auth/register   – create new user account
 *   POST /api/auth/login      – authenticate and get JWT
 *   GET  /api/auth/profile    – get own profile (protected)
 */

const express = require("express");
const { registerUser, loginUser, getUserProfile } = require("../controllers/authController");
const { authenticate } = require("../middleware/authMiddleware");

const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.get("/profile", authenticate, getUserProfile); // Protected

module.exports = authRouter;
