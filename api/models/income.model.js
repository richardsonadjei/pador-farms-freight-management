import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const incomeSchema = new Schema(
  {
    source: {
      type: String,
      required: true,
    },
    vehicle: {
      type: Schema.Types.ObjectId,
      ref: 'Vehicle', // Adding reference to Vehicle
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    currency: {
      type: String,
      default: 'Ghc', // Default currency is Ghanaian Cedi
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    recordedBy: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

const Income = model('Income', incomeSchema);

export default Income;
