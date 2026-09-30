require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));

mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true }
});
const User = mongoose.model('User', userSchema);

const childSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String },
  parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});
const Child = mongoose.model('Child', childSchema);

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// 1. POST /users
app.post('/users', async (req, res) => {
  try {
    const { firstName, lastName, email, phone } = req.body;
    if (!firstName || !lastName || !email || !phone) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const user = new User({ firstName, lastName, email, phone });
    await user.save();
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    res.status(500).json({ error: 'Database/server error' });
  }
});

// BONUS: GET /users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.render('users', { users });
  } catch (error) {
    res.status(500).send('Database/server error');
  }
});

// BONUS: GET /users/search/:name
app.get('/users/search/:name', async (req, res) => {
  try {
    const users = await User.find({ firstName: new RegExp(req.params.name, 'i') });
    res.json({ message: 'Search results', users });
  } catch (error) {
    res.status(500).json({ error: 'Database/server error' });
  }
});

// 2. GET /users/:id
app.get('/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    if (!isValidObjectId(userId)) {
      return res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
    }
    const children = await Child.find({ parentId: userId });
    res.render('profile', { user, children });
  } catch (error) {
    res.status(500).send('Database/server error');
  }
});

// Helper for UI: GET /users/:id/add-child
app.get('/users/:id/add-child', async (req, res) => {
  try {
    const userId = req.params.id;
    if (!isValidObjectId(userId) || !(await User.findById(userId))) {
      return res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
    }
    const user = await User.findById(userId);
    res.render('add-child', { user });
  } catch (error) {
    res.status(500).send('Database/server error');
  }
});

// 3. POST /users/:id/children
app.post('/users/:id/children', async (req, res) => {
  try {
    const userId = req.params.id;
    if (!isValidObjectId(userId)) return res.status(400).json({ error: 'Invalid User ID' });
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User does not exist' });
    
    const { firstName, lastName, age, email } = req.body;
    if (!firstName || !lastName || age === undefined || age === '') {
      return res.status(400).json({ error: 'Required fields must not be empty' });
    }
    
    const child = new Child({ firstName, lastName, age, email, parentId: userId });
    await child.save();
    res.status(201).json({ message: 'Child created successfully', child });
  } catch (error) {
    res.status(500).json({ error: 'Database/server error' });
  }
});

// 4. GET /users/:id/children
app.get('/users/:id/children', async (req, res) => {
  try {
    const userId = req.params.id;
    if (!isValidObjectId(userId)) return res.status(400).json({ error: 'Invalid User ID' });
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User does not exist' });
    
    const children = await Child.find({ parentId: userId });
    if (children.length === 0) return res.status(404).json({ message: 'No children found for this user.' });
    
    res.json({ children });
  } catch (error) {
    res.status(500).json({ error: 'Database/server error' });
  }
});

// BONUS: GET /users/:id/children/count
app.get('/users/:id/children/count', async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) return res.status(400).json({ error: 'Invalid User ID' });
    const count = await Child.countDocuments({ parentId: req.params.id });
    res.json({ message: 'Count successful', count });
  } catch (error) {
    res.status(500).json({ error: 'Database/server error' });
  }
});

// Main Challenge: GET /users/:id/children/:childId
app.get('/users/:id/children/:childId', async (req, res) => {
  try {
    const { id: userId, childId } = req.params;
    if (!isValidObjectId(userId) || !isValidObjectId(childId)) {
      return res.status(400).json({ error: 'Invalid IDs' });
    }
    const child = await Child.findOne({ _id: childId, parentId: userId });
    if (!child) {
      const existingChild = await Child.findById(childId);
      if (existingChild) {
        return res.status(403).json({ error: 'Child does not belong to the requested user' });
      }
      return res.status(404).json({ error: 'Child Not Found' });
    }
    res.render('child', { child });
  } catch (error) {
    res.status(500).json({ error: 'Database/server error' });
  }
});

// 5. PATCH /children/:id
app.patch('/children/:id', async (req, res) => {
  try {
    const childId = req.params.id;
    if (!isValidObjectId(childId)) return res.status(400).json({ error: 'Invalid Child ID' });
    
    const updateData = {};
    const { firstName, lastName, age, email } = req.body;
    if (firstName) updateData.firstName = firstName;
    if (lastName) updateData.lastName = lastName;
    if (age !== undefined && age !== '') updateData.age = age;
    if (email !== undefined) updateData.email = email;
    
    const child = await Child.findByIdAndUpdate(childId, updateData, { new: true, runValidators: true });
    if (!child) return res.status(404).json({ error: 'Child Not Found' });
    
    res.json({ message: 'Child updated successfully', child });
  } catch (error) {
    res.status(500).json({ error: 'Database/server error' });
  }
});

// 6. DELETE /children/:id
app.delete('/children/:id', async (req, res) => {
  try {
    const childId = req.params.id;
    if (!isValidObjectId(childId)) return res.status(400).json({ error: 'Invalid Child ID' });
    
    const child = await Child.findByIdAndDelete(childId);
    if (!child) return res.status(404).json({ error: 'Child Not Found' });
    
    res.json({ message: 'Child deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Database/server error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
