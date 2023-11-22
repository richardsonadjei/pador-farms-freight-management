import mongoose from 'mongoose';

// Define the IncomeCategory Schema
const incomeCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

// Create the IncomeCategory model
const IncomeCategory = mongoose.model('IncomeCategory', incomeCategorySchema);

export default IncomeCategory;
