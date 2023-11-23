import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const expenditureCategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
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

const ExpenditureCategory = model('ExpenditureCategory', expenditureCategorySchema);

export default ExpenditureCategory;
