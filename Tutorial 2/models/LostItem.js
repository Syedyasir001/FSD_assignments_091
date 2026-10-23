const mongoose = require('mongoose');

const lostItemSchema = new mongoose.Schema(
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
    lastSeenLocation: {
      type: String,
      required: [true, 'Last seen location is required'],
      trim: true,
    },
    dateLost: {
      type: Date,
      required: [true, 'Date lost is required'],
      default: Date.now,
    },
    status: {
      type: String,
      enum: {
        values: ['Lost', 'Found', 'Closed'],
        message: '{VALUE} is not a valid status for a lost item',
      },
      default: 'Lost',
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

module.exports = mongoose.model('LostItem', lostItemSchema);
