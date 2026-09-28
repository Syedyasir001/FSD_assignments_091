require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Item = require('./models/Item');

const run = async () => {
  await connectDB();
  await Item.deleteMany({});
  await Item.create([
    { name: 'First item', description: 'Seeded sample record' },
    { name: 'Second item', description: 'Seeded sample record', completed: true },
  ]);
  console.log('Seeded 2 items');
  await mongoose.disconnect();
};

run().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
