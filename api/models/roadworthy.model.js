import mongoose from 'mongoose';
import cron from 'node-cron';

const { Schema, model } = mongoose;

// Define the schema for the Roadworthy model
const roadworthySchema = new Schema(
  {
    vehicle: {
      type: Schema.Types.ObjectId,
      ref: 'Vehicle', // Reference to the Vehicle model
      required: true,
    },
    certificateNumber: {
      type: String,
      required: true,
      unique: true, // Ensure that each certificate number is unique
      trim: true,
    },
    issueDate: {
      type: Date,
      required: true,
    },
    expiryDate: {
      type: Date,
      required: true,
    },
    renewalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    details: {
      type: String,
    },
    roadworthyCenter: { // New field for recording the roadworthy center
      type: String,
      required: true,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    recordedBy: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Create a method to check if the roadworthy certificate is still valid
roadworthySchema.methods.isValid = function () {
  return this.expiryDate > Date.now();
};

// Schedule cron job to check expired roadworthy certificates every day at midnight (or as required)
cron.schedule('0 0 * * *', async () => {
  try {
    // Get the current date
    const currentDate = new Date();

    // Find all active roadworthy certificates where the expiryDate has passed
    const expiredCertificates = await model('Roadworthy').find({
      isActive: true, // Only check active certificates
      expiryDate: { $lt: currentDate }, // Certificates where the expiryDate is before the current date
    });

    // Loop through and deactivate each expired certificate
    expiredCertificates.forEach(async (certificate) => {
      certificate.isActive = false;
      await certificate.save(); // Save the updated certificate
    });

    if (expiredCertificates.length > 0) {
      console.log(`Deactivated ${expiredCertificates.length} expired roadworthy certificates.`);
    }
  } catch (error) {
    console.error('Error updating roadworthy certificates:', error);
  }
});

// Export the model
export default model('Roadworthy', roadworthySchema);
