import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const otherTripSchema = new Schema(
  {
    tripNumber: {
      type: String, // Change to String type
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    vehicleRegistrationNumber: {
      type: String,
      required: true,
    },
    driverName: {
      type: String,
      required: true,
    },
    totalAmountCharged: {
      type: Number,
      required: true,
    },
    destinationLocations: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    recordedBy: {
      type: String,
      required: true,
    },
    // Add more fields as needed
  },
  {
    timestamps: true, // Add createdAt and updatedAt fields
  }
);

// Function to generate the tripNumber
const generateTripNumber = async () => {
  const count = await OtherTrip.countDocuments({});
  const tripNumber = `OT${(count + 1).toString().padStart(3, '0')}`;
  return tripNumber;
};

// Middleware to automatically generate tripNumber before saving
otherTripSchema.pre('save', async function (next) {
  if (!this.tripNumber) {
    this.tripNumber = await generateTripNumber();
  }
  next();
});

const OtherTrip = model('OtherTrip', otherTripSchema);
export default OtherTrip;
