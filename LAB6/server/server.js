// ====================================================================
// Express Server — User Data Routes (Part 1 Assignment)
// Provides REST API endpoints to serve user data filtered by even and odd IDs
// ====================================================================

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable Cross-Origin Resource Sharing (CORS) so React on port 3000 can communicate with this API
app.use(cors());

// Parse incoming JSON request bodies
app.use(express.json());

// --------------------------------------------------------------------
// Local In-Memory Dataset: Array of User Objects
// Each object contains id, name, and email (with role for rich UI display)
// --------------------------------------------------------------------
let users = [
  { id: 1, name: "Syed Yasir", email: "syedyasirbca24@rvu.edu.in", role: "Full Stack Developer" },
  { id: 2, name: "Alice Johnson", email: "alice.johnson@example.com", role: "Frontend Engineer" },
  { id: 3, name: "Bob Smith", email: "bob.smith@example.com", role: "UI/UX Designer" },
  { id: 4, name: "Charlie Brown", email: "charlie.brown@example.com", role: "DevOps Engineer" },
  { id: 5, name: "Diana Prince", email: "diana.prince@example.com", role: "Cloud Architect" },
  { id: 6, name: "Evan Wright", email: "evan.wright@example.com", role: "QA Engineer" },
  { id: 7, name: "Fiona Gallagher", email: "fiona.gallagher@example.com", role: "Product Manager" },
  { id: 8, name: "George Clark", email: "george.clark@example.com", role: "Backend Developer" },
  { id: 9, name: "Hannah Abbott", email: "hannah.abbott@example.com", role: "Data Scientist" },
  { id: 10, name: "Ian Malcolm", email: "ian.malcolm@example.com", role: "Cybersecurity Analyst" }
];

// --------------------------------------------------------------------
// Root Route: Server Health & API Documentation
// --------------------------------------------------------------------
app.get('/', (req, res) => {
  res.json({
    status: "success",
    message: "Node.js + Express User Data API is running smoothly!",
    endpoints: {
      evenUsers: "GET /users/even (Returns users with even IDs)",
      oddUsers: "GET /users/odd (Returns users with odd IDs)",
      allUsers: "GET /users (Returns all users)",
      addUser: "POST /users (Create a new user: { name, email, role? })"
    },
    totalUsersCount: users.length
  });
});

// --------------------------------------------------------------------
// Assignment Route 1: GET /users/even
// Filters and returns all users with even IDs (id % 2 === 0)
// --------------------------------------------------------------------
app.get('/users/even', (req, res) => {
  const evenUsers = users.filter(user => user.id % 2 === 0);
  res.status(200).json({
    filter: "even",
    count: evenUsers.length,
    users: evenUsers
  });
});

// --------------------------------------------------------------------
// Assignment Route 2: GET /users/odd
// Filters and returns all users with odd IDs (id % 2 !== 0)
// --------------------------------------------------------------------
app.get('/users/odd', (req, res) => {
  const oddUsers = users.filter(user => user.id % 2 !== 0);
  res.status(200).json({
    filter: "odd",
    count: oddUsers.length,
    users: oddUsers
  });
});

// --------------------------------------------------------------------
// Utility Route: GET /users
// Returns the full list of users
// --------------------------------------------------------------------
app.get('/users', (req, res) => {
  res.status(200).json({
    filter: "all",
    count: users.length,
    users: users
  });
});

// --------------------------------------------------------------------
// Utility Route: GET /users/:id
// Returns a single user by ID
// --------------------------------------------------------------------
app.get('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const user = users.find(u => u.id === userId);

  if (!user) {
    return res.status(404).json({ error: `User with ID ${userId} not found` });
  }

  res.status(200).json(user);
});

// --------------------------------------------------------------------
// Utility Route: POST /users
// Appends a new user to the local in-memory array (used by the AddUser form)
// --------------------------------------------------------------------
app.post('/users', (req, res) => {
  const { name, email, role } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Both 'name' and 'email' fields are required." });
  }

  // Generate next incremental ID
  const nextId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
  const newUser = {
    id: nextId,
    name: name.trim(),
    email: email.trim(),
    role: role && role.trim() ? role.trim() : "Member"
  };

  users.push(newUser);

  res.status(201).json({
    message: "User created successfully",
    user: newUser
  });
});

// --------------------------------------------------------------------
// Start Express Server
// --------------------------------------------------------------------
app.listen(PORT, () => {
  console.log(`===================================================`);
  console.log(`🚀 Express Server is running on http://localhost:${PORT}`);
  console.log(`👉 Even IDs Route: http://localhost:${PORT}/users/even`);
  console.log(`👉 Odd IDs Route:  http://localhost:${PORT}/users/odd`);
  console.log(`👉 All Users:      http://localhost:${PORT}/users`);
  console.log(`===================================================`);
});
