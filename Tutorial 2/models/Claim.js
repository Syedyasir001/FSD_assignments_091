const mongoose = require('mongoose');

const claimSchema = new mongoose.Schema(
  {
    foundItemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'FoundItem',
      required: [true, 'Found item ID is required'],
    },
    claimedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: [true, 'Claimant student ID is required'],
    },
    reason: {
      type: String,
      required: [true, 'Reason for claim is required'],
      trim: true,
      minlength: [5, 'Reason must be at least 5 characters detailing why this item is yours'],
    },
    status: {
      type: String,
      enum: {
        values: ['Pending', 'Approved', 'Rejected'],
        message: '{VALUE} is not a valid claim status',
      },
      default: 'Pending',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index to help query claims for a found item by claimant
claimSchema.index({ foundItemId: 1, claimedBy: 1 });

module.exports = mongoose.model('Claim', claimSchema);
