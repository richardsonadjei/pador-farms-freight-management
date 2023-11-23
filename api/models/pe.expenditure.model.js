import mongoose from 'mongoose';

// Define the PEExpenditureSchema
const peExpenditureSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    category: {
        type: String,
      },
    peNumber: {
      type: String,
      required: true,
    },
    truckRegistrationNumber: {
      type: String,
      required: true,
    },
    expenditureAmount: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    recordedBy: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['paid', 'pending payment'],
      default: 'pending payment', // Default status is set to 'pending payment'
      required: true,
    },

    // You can add more fields as needed
  },
  {
    timestamps: true, // Add createdAt and updatedAt fields
  }
);

// Create the PEExpenditure model
const PEExpenditure = mongoose.model('PEExpenditure', peExpenditureSchema);

export default PEExpenditure;
