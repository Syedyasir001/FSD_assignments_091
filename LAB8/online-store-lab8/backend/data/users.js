/**
 * In-memory user store.
 * Passwords are stored as bcrypt hashes (cost factor 10).
 *
 * Demo credentials:
 *   admin@furnishIndia.com  / Admin@123
 *   customer@furnishIndia.com / Customer@123
 *
 * NOTE: In production, use a real database. Never store plain-text passwords.
 */

const users = [
  {
    id: "USR-001",
    name: "Admin User",
    email: "admin@furnishindia.com",
    // bcrypt hash for "Admin@123"  (generated: bcrypt.hash('Admin@123', 10))
    passwordHash:
      "$2a$10$1uCRokNSMEQivgEw2AZR9u2w6lGbBq4HSIJWowGyv9g8dYyk4flLq",
    role: "admin",
    createdAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "USR-002",
    name: "Demo Customer",
    email: "customer@furnishindia.com",
    // bcrypt hash for "Customer@123"  (generated: bcrypt.hash('Customer@123', 10))
    passwordHash:
      "$2a$10$/nipw7w.KtbB3JDb367i.uRRnNEkqK1Qb2ZOFK1Y.x.trV9QIaU1y",
    role: "customer",
    createdAt: "2026-01-15T00:00:00.000Z",
  },
];

module.exports = users;
