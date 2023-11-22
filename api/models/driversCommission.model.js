import mongoose from 'mongoose';

const { Schema, model } = mongoose;

// Define the DriverCommissionSchema
const driverCommissionSchema = new Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    peNumber: {
        type: String,
        required: true,
    },
    driverName: {
      type: String,
      required: true,
    },
    commissionAmountPerBag: {
        type: Number,
        default: 1, // Set default value to 1
        required: true,
      },
    totalCommissionAmount: {
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

// Create the DriverCommission model
const DriverCommission = model('DriverCommission', driverCommissionSchema);

export default DriverCommission;
