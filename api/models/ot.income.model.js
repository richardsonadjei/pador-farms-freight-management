import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const otherTripIncomeSchema = new Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    tripNumber: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    recordedBy: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    // You can add more fields as needed
  },
  {
    timestamps: true, // Add createdAt and updatedAt fields
  }
);

const OtherTripIncome = model('OtherTripIncome', otherTripIncomeSchema);

export default OtherTripIncome;
