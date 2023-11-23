import mongoose from 'mongoose';

// Define the OtherTripExpenditureSchema
const otherTripExpenditureSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    category: {
      type: String,
    },
    vehicleRegistrationNumber: {
      type: String,
      required: true,
    },
    tripNumber: {
        type: String, // Change to String type
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

// Create the OtherTripExpenditure model
const OtherTripExpenditure = mongoose.model('OtherTripExpenditure', otherTripExpenditureSchema);

export default OtherTripExpenditure;
