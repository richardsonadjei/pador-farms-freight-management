import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const primaryEvacuationSchema = new Schema(
  {
    cocoaPricePerBag: {
      type: Schema.Types.ObjectId,
      ref: 'CocoaPricePerBag',
      required: true,
    },
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
    numberOfBags: {
      type: Number,
      required: true,
    },
    dateOfEvacuation: {
      type: Date,
      required: true,
      default: Date.now,
    },
    evacuationLocation: {
      type: String,
    },
    notes: {
      type: String,
    },
    recordedBy: {
    type: String,
    required: true,
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

const PrimaryEvacuation = model('PrimaryEvacuation', primaryEvacuationSchema);

export default PrimaryEvacuation;
