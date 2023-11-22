import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const cocoaHaulageSchema = new Schema(
  {
    peNumber: {
      type: String, // Change to String type
    },
    date: {
      type: Date,
      required: true,
    },
    truckRegistrationNumber: {
      type: String,
      required: true,
    },
    driverName: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    totalweightCarried: {
      type: Number,
      required: true,
    },
    destinationLocations: {
      type: String,
      required: true,
    },
    recordedBy: {
      type: String,
      required: true,
    },
    // You can add more fields as needed
  },
  {
    timestamps: true, // Add createdAt and updatedAt fields
  }
);

// Function to generate the peNumber
const generatePENumber = async () => {
  const count = await CocoaHaulage.countDocuments({});
  const peNumber = `PE${(count + 1).toString().padStart(3, '0')}`;
  return peNumber;
};

// Middleware to automatically generate peNumber before saving
cocoaHaulageSchema.pre('save', async function (next) {
  if (!this.peNumber) {
    this.peNumber = await generatePENumber();
  }
  next();
});

const CocoaHaulage = model('CocoaHaulage', cocoaHaulageSchema);
export default CocoaHaulage;
