import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const weightPerBagSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
    min: 1, // Ensure weight is at least 1
  },
}, {
  timestamps: true,
});

const WeightPerBag = model('WeightPerBag', weightPerBagSchema);

export default WeightPerBag;
