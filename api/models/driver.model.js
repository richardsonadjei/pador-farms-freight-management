import mongoose from 'mongoose';

// Define the Driver Schema
const driverSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    licenseNumber: {
      type: String,
      required: true,
      unique: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/\S+@\S+\.\S+/, 'is invalid'],
    },
    town: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    region: {
      type: String,
      required: true,
    },
    ghanaCardId: {
      type: String,
      required: true,
    },
    witnessName: {
      type: String,
      required: true,
    },
    witnessContact: {
      type: Number,
      required: true,
    },
    registeredBy: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Add createdAt and updatedAt fields
  }
);

// Create the Driver model
const Driver = mongoose.model('Driver', driverSchema);

export default Driver;
