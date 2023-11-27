// Import required dependencies
import mongoose from 'mongoose';

// Define the User schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  telephoneNumber: {
    type: String,
    required: true
  },
  ghanaCardNumber: {
    type: String,
    required: true
  },
  bank: {
    type: String,
    required: true
  },
  bankAccountNumber: {
    type: String,
    required: true
  },
  bankBranch: {
    type: String,
    required: true
  },
  nextOfKinName: {
      type: String,
      required: true
    },
  nextOfKinContact: {
      type: String,
      required: true
    },
  nextOfKinGhanaCardNumber: {
      type: String,
      required: true
    },
  witnessname: {
      type: String,
      required: true
    },
  witnessContact: {
      type: String,
      required: true
    },
  role: {
    type: String,
    enum: ['admin', 'employee',],
    default: 'employee'
  },
  category: {
    type: String,
    enum: ['driver', 'labourer', 'all'],
    required: true
  }
},
{ timestamps: true }
);

// Create and export the User model
export default mongoose.model('User', userSchema);