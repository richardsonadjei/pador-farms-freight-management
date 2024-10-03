import mongoose from 'mongoose';

// Define the User schema
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
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
  },
  password: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  role: {
    type: [String], // Array of strings for roles
    enum: ['admin', 'manager', 'employee', 'finance', 'human-resource',],
    default: ['employee'] // Default as an array with one element
  },
},
{ timestamps: true }
);

// Create and export the User model
export default mongoose.model('User', userSchema);
