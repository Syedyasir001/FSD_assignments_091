const mongoose = require('mongoose');

const foundItemSchema = new mongoose.Schema(
  {
    itemName: {
      type: String,
      required: [true, 'Item name is required'],
      trim: true,
      minlength: [2, 'Item name must be at least 2 characters'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: {
        values: [
          'Electronics',
          'Documents & IDs',
          'Accessories',
          'Books & Stationery',
          'Clothing',
          'Keys',
          'Other',
        ],
        message: '{VALUE} is not a valid category',
      },
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    foundLocation: {
      type: String,
      required: [true, 'Found location is required'],
      trim: true,
    },
    dateFound: {
      type: Date,
      required: [true, 'Date found is required'],
      default: Date.now,
    },
    status: {
      type: String,
      enum: {
        values: ['Found', 'Returned'],
        message: '{VALUE} is not a valid status for a found item',
      },
      default: 'Found',
    },
    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: [true, 'Reporting student ID is required'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('FoundItem', foundItemSchema);
