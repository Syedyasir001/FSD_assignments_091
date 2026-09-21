require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs');

// MongoDB connection – the URI (with any credentials) is loaded from the
// MONGODB_URI environment variable so secrets are never committed.
// Copy nodeserver/.env.example to nodeserver/.env and set MONGODB_URI.
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/furnish_india';

mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('MongoDB connected successfully');
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
    });

app.get('/', (req, res) => {
    res.json({ message: 'Hello World' });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000 at http://localhost:3000/');
});