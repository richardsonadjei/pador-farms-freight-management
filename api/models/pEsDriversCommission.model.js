import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const driverCommissionSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0, // Ensure the amount is non-negative
  },
}, {
  timestamps: true,
});

const PEDriversCommission = model('PEDriversCommission', driverCommissionSchema);

export default PEDriversCommission;
