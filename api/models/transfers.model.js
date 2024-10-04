import mongoose from 'mongoose';

// Create the Transfer Schema
const transferSchema = new mongoose.Schema(
  {
    vehicle: { 
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vehicle', // assuming you have a Motorbike model 
      required: true,
    },
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Partner', // link to the Partners model
      required: [true, 'Please provide a recipient'],
    },
    amount: {
      type: Number,
      required: [true, 'Please provide a transfer amount'],
    },
    paymentMethod: {
      type: String,
      required: [true, 'Please select a payment method'],
    },
    momoNumber: {
      type: String,
      required: function () {
        return this.paymentMethod === 'Momo'; // Required if payment method is Momo
      },
    },
    notes: {
      type: String,
      trim: true, // Remove excess spaces
      default: '',
    },
    recordedBy: {
      type: String,
      required: [true, 'The recordedBy field is required'],
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create the Transfer Model from the Schema
const Transfer = mongoose.model('Transfer', transferSchema);

export default Transfer;
