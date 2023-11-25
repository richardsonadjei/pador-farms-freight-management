// models/generalExpenditure.js

import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const generalExpenditureSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  // other fields...
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
}, { timestamps: true });

const GeneralExpenditure = model('GeneralExpenditure', generalExpenditureSchema);

export default GeneralExpenditure;
