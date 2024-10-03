import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const generalExpenseSchema = new Schema(
  {
    vehicle: {
      type: Schema.Types.ObjectId,
      ref: 'Vehicle',
      required: true,
    },
    category: {
      type: String,
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
    dateOfExpense: {
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

const GeneralExpense = model('GeneralExpense', generalExpenseSchema);

export default GeneralExpense;
