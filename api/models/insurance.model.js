import mongoose from 'mongoose';
import cron from 'node-cron';

const { Schema, model } = mongoose;

// Define the schema for the Insurance model
const insuranceSchema = new Schema(
  {
    vehicle: {
      type: Schema.Types.ObjectId,
      ref: 'Vehicle', // Reference to the Vehicle model
      required: true,
    },
    insuranceCompany: {
      type: String,
      required: true,
      trim: true,
    },
    policyNumber: {
      type: String,
      required: true,
      trim: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    premiumAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    coverageDetails: {
      type: String,
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

// Create a method to check if the insurance is still valid
insuranceSchema.methods.isValid = function () {
  return this.endDate > Date.now();
};

// Schedule cron job to check expired policies every day at midnight (or as required)
cron.schedule('0 0 * * *', async () => {
  try {
    // Get the current date
    const currentDate = new Date();

    // Find all active insurance policies where the endDate has passed
    const expiredPolicies = await model('Insurance').find({
      isActive: true, // Only check active policies
      endDate: { $lt: currentDate }, // Policies where the endDate is before the current date
    });

    // Loop through and deactivate each expired policy
    expiredPolicies.forEach(async (policy) => {
      policy.isActive = false;
      await policy.save(); // Save the updated policy
    });

    if (expiredPolicies.length > 0) {
      console.log(`Deactivated ${expiredPolicies.length} expired insurance policies.`);
    }
  } catch (error) {
    console.error('Error updating insurance policies:', error);
  }
});

// Export the model
export default model('Insurance', insuranceSchema);
