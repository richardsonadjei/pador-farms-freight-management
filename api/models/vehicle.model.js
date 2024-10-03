import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const vehicleSchema = new Schema(
  {
    registrationNumber: {
      type: String,
      required: true,
    },
    make: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
    },
    owner: {
      type: String,
      
    },
    chassisNumber: {
      type: String,
      unique: true,
      type: Number,
      required: true,
    },
    engineNumber: {
      type: String,
      unique: true,
    },
    insuranceDetails: {
      company: {
        type: String,
      },
      policyNumber: {
        type: String,
      },
      expirationDate: {
        type: Date,
      },
    },
    registrationDate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'decommissioned'],
      default: 'active',
    },
  },
  {
    timestamps: true, // Automatically create createdAt and updatedAt fields
  }
);

const Vehicle = model('Vehicle', vehicleSchema);

export default Vehicle;
