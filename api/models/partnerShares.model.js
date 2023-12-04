// Import necessary modules
import mongoose from 'mongoose';

// Define the Payment Schema
const paymentSchema = new mongoose.Schema({
  partnerName: {
    type: String,
    required: true,
  },
  reasonForPayment: {
    type: String,
    required: true,
  },
  paymentType: {
    type: String,
    required: true,
    enum: ['cash', 'momo'], // Enumerate the allowed values
  },
  amount: {
    type: Number,
    required: true,
  },
  momoNumberTransferedTo: {
    type: String,
   
},
  recordedBy: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Define the Payment model
const Payment = mongoose.model('Payment', paymentSchema);

// Export the Payment model
export default Payment;
