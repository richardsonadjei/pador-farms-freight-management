import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const cocoaPriceSchema = new Schema(
  {
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    pricePerBagBeforeTax: {
      type: Number,
      required: true,
      min: 0,
    },
    pricePerBagAfterTax: {
      type: Number,
      required: true,
      min: 0,
    },
    haulageCompany: {
      type: String,
      default: 'Cargil Cocoa Sourcing',
    },
    currency: {
      type: String,
      default: 'Ghc',
    },
    notes: {
      type: String,
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

const CocoaPricePerBag = model('CocoaPricePerBag', cocoaPriceSchema);

export default CocoaPricePerBag;
