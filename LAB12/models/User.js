const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// 1. Mongoose Schema Definition (Required for standard MongoDB practical)
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true,
      maxlength: [50, 'Name cannot exceed 50 characters']
    },
    email: {
      type: String,
      required: [true, 'Please provide an email address'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email address'
      ]
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: [6, 'Password must be at least 6 characters']
    },
    role: {
      type: String,
      enum: {
        values: ['student', 'admin'],
        message: '{VALUE} is not a valid role. Allowed roles are student or admin.'
      },
      default: 'student'
    }
  },
  {
    timestamps: true
  }
);

// Hash password using bcrypt before saving to MongoDB
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Instance method to compare candidate password with hashed password in database
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Exclude password field when converting document to JSON
userSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

const MongooseUserModel = mongoose.model('User', userSchema);

// 2. In-Memory Store & Fallback (Ensures app runs even before MongoDB is installed)
const inMemoryUsers = [];

class MemoryUser {
  constructor({ name, email, password, role }) {
    this._id = new mongoose.Types.ObjectId();
    this.name = name ? name.trim() : '';
    this.email = email ? email.toLowerCase().trim() : '';
    this.password = password;
    this.role = role || 'student';
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  async save() {
    // Hash password with bcrypt exactly like the pre-save hook
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    inMemoryUsers.push(this);
    return this;
  }

  async comparePassword(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
  }

  toObject() {
    return {
      _id: this._id,
      name: this.name,
      email: this.email,
      role: this.role,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }

  toJSON() {
    return this.toObject();
  }
}

// Memory query wrapper supporting .select() and .sort()
const createQuery = (data) => {
  const promise = Promise.resolve(data);
  promise.select = () => promise;
  promise.sort = () => promise;
  return promise;
};

// 3. Smart User Proxy that uses Mongoose when connected, or In-Memory fallback otherwise
const User = function (data) {
  if (mongoose.connection.readyState === 1) {
    return new MongooseUserModel(data);
  }
  return new MemoryUser(data);
};

User.findOne = (query) => {
  if (mongoose.connection.readyState === 1) {
    return MongooseUserModel.findOne(query);
  }
  if (query.email) {
    const user = inMemoryUsers.find((u) => u.email.toLowerCase() === query.email.toLowerCase());
    return createQuery(user || null);
  }
  return createQuery(null);
};

User.findById = (id) => {
  if (mongoose.connection.readyState === 1) {
    return MongooseUserModel.findById(id);
  }
  const user = inMemoryUsers.find((u) => u._id.toString() === id.toString());
  return createQuery(user || null);
};

User.find = (query) => {
  if (mongoose.connection.readyState === 1) {
    return MongooseUserModel.find(query);
  }
  const list = inMemoryUsers.map((u) => u.toObject());
  return createQuery(list);
};

module.exports = User;
