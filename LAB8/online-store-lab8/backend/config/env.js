/**
 * env.js
 * -------
 * Centralised environment configuration.
 * Values are read from process.env with sensible defaults for development.
 *
 * In production, set these via real environment variables or a .env file
 * loaded by a library such as `dotenv`.
 */

const JWT_SECRET =
  process.env.JWT_SECRET || "furnish_india_super_secret_jwt_key_2026";

const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "2h"; // Token valid for 2 hours

const PORT = process.env.PORT || 5000;

const NODE_ENV = process.env.NODE_ENV || "development";

const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",")
  : [
      "http://localhost:3000",
      "http://127.0.0.1:3000",
      "http://localhost:5173",
      "http://127.0.0.1:5173",
    ];

module.exports = {
  JWT_SECRET,
  JWT_EXPIRES_IN,
  PORT,
  NODE_ENV,
  ALLOWED_ORIGINS,
};
