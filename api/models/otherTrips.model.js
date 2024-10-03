import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const otherTripSchema = new Schema(
  {
    vehicle: {
      type: Schema.Types.ObjectId,
      ref: 'Vehicle',
      required: true,
    },
    driver: {
      type: Schema.Types.ObjectId,
      ref: 'Employee',
      required: true,
    },
    purpose: {
      type: String,
      required: true,
    },
    startLocation: {
      type: String,
      
    },
    endLocation: {
      type: String,
      
    },
    dateOfTrip: {
      type: Date,
      required: true,
      default: Date.now,
    },
    recordedBy: {
    type: String,
      required: true,
    },
    notes: {
      type: String,
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

const OtherTrip = model('OtherTrip', otherTripSchema);

export default OtherTrip;
