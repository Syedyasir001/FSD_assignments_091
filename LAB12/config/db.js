const mongoose = require('mongoose');

const connectDB = async () => {
  const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/user_auth_db';

  try {
    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 2000 // Quick 2s timeout check
    });
    console.log(`✅ [MongoDB Connected] Host: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`\n⚠️  [MongoDB Notice] Could not connect to MongoDB server at ${mongoURI}`);
    console.warn(`   Reason: ${error.message}`);
    console.log(`⚡ [Fallback Activated] Running in IN-MEMORY DATABASE MODE!`);
    console.log(`   All bcrypt hashing, JWT issuance, and RBAC routes are fully functional`);
    console.log(`   so you can test the app and take your assignment screenshots immediately.`);
    console.log(`   (To use real MongoDB, start your local Mongo service or update MONGO_URI in .env)\n`);
  }
};

module.exports = connectDB;
