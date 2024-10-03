import mongoose from 'mongoose';

// Define ExpenseCategory schema
const expenseCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  description: {
    type: String,
    trim: true
  }
}, { timestamps: true }); // Add timestamps option here

// Create ExpenseCategory model
const ExpenseCategory = mongoose.model('ExpenseCategory', expenseCategorySchema);

export default ExpenseCategory;
