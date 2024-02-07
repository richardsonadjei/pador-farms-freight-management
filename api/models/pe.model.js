import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const cocoaHaulageSchema = new Schema(
  {
    peNumber: {
      type: String,
      
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
    timestamps: true,
  }
);

// Function to generate a new peNumber ensuring uniqueness
const generatePENumber = async () => {
  let peNumber;
  let count = await CocoaHaulage.countDocuments({});
  do {
    peNumber = `PE${(count + 1).toString().padStart(3, '0')}`;
    count++;
  } while (await CocoaHaulage.findOne({ peNumber }));
  return peNumber;
};


// Middleware to automatically generate peNumber before saving
cocoaHaulageSchema.pre('save', async function (next) {
  try {
    this.peNumber = await generatePENumber(this);
    next();
  } catch (error) {
    next(error);
  }
});

const CocoaHaulage = model('CocoaHaulage', cocoaHaulageSchema);
export default CocoaHaulage;
