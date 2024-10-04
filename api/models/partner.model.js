import mongoose from 'mongoose';

// Create the Partner Schema
const partnerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a partner name'],
      trim: true,
    },
   
    phone: {
      type: String,
      required: [true, 'Please provide a phone number'],
      unique: true,
      trim: true,
      match: [/^\d{10,15}$/, 'Please provide a valid phone number with 10 to 15 digits'],
    },
  
    partnershipDate: {
      type: Date,
      required: [true, 'Please provide the partnership start date'],
    },
    contribution: {
      type: Number,
      default: 0,
      min: [0, 'Contribution cannot be less than 0'],
    },
    notes: {
      type: String,
      trim: true,
      default: '',
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Create the Partner Model from the Schema
const Partner = mongoose.model('Partner', partnerSchema);

export default Partner;
