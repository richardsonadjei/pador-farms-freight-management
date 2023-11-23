import mongoose from 'mongoose';

// Define the IncomeHaulingSchema
const incomeHaulingSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    category: {
        type: String,
      },
      peNumber: {
        type: String, // Change to String type
      },
truckRegistrationNumber: {
    type: String,
      required: true,
    },
    incomeAmountPerBag: {
        type: Number,
        required: true,
    },
    totalIncomeAmount: {
      type: Number,
      required: true,
    },
    taxAmountPerBag: {
        type: Number,
        required: true,
    },
    totalTaxAmount:{
        type: Number,
        required: true,
    },
    netTotalAmountPerbag: {
      type: Number,
      required: true,
    },
    netTotalAmount: {
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

    // You can add more fields as needed
  },
  {
    timestamps: true, // Add createdAt and updatedAt fields
  }
);

// Create the IncomeHauling model
const IncomeHauling = mongoose.model('IncomeHauling', incomeHaulingSchema);

export default IncomeHauling;
