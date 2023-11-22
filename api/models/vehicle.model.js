import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const vehicleSchema = new Schema({
  registrationNumber: {
    type: String,
    required: true,
    unique: true,
  },
  make: String,
  chasisNumber: String,
  model: String,
  year: Number,
  capacity: String,
  yearPurchased: Number,
  price: Number,
  description: String,
  status: String,
  color: String,
  mileage: Number,
  fuelType: String,
  description: String,
  status: String,
  registeredBy: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Vehicle = model('Vehicle', vehicleSchema);

export default Vehicle;
