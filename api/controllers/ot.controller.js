import OtherTrip from '../models/ot.model.js';
import OtherTripIncome from '../models/ot.income.model.js';
import DriverCommission from '../models/driversCommission.model.js';

// Function to generate the tripNumber
const generateTripNumber = async () => {
  const count = await OtherTrip.countDocuments({});
  const tripNumber = `OT${(count + 1).toString().padStart(3, '0')}`;
  return tripNumber;
};

// Create a new OtherTrip
const createOtherTrip = async (req, res) => {
  try {
    const {
      date,
      vehicleRegistrationNumber,
      driverName,
      totalAmountCharged,
      destinationLocations,
      description,
      recordedBy,
      category, // Added category field
    } = req.body;

    // Generate tripNumber
    const tripNumber = await generateTripNumber();

    // Create a new OtherTrip instance with tripNumber
    const otherTrip = new OtherTrip({
      tripNumber,
      date,
      vehicleRegistrationNumber,
      driverName,
      totalAmountCharged,
      destinationLocations,
      description,
      recordedBy,
    });

    // Save the OtherTrip instance
    await otherTrip.save();

    // Save OtherTripIncome instance
    const otherTripIncome = new OtherTripIncome({
      date,
      category,
      tripNumber,
      amount: totalAmountCharged,
      description,
      recordedBy,
    });
    await otherTripIncome.save();

    // Calculate totalCommissionAmount (10% of totalAmountCharged)
    const totalCommissionAmount = 0.1 * totalAmountCharged;

    // Save DriverCommission instance
    const driverCommission = new DriverCommission({
      date,
      driverName,
      tripNumber,
      category,
      totalCommissionAmount,
      description: `Commission from other trip ${tripNumber}`,
      recordedBy,
    });
    await driverCommission.save();

    res.status(201).json({ otherTrip, otherTripIncome, driverCommission });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};





// Get all OtherTrips
const getAllOtherTrips = async (req, res) => {
  try {
    const otherTrips = await OtherTrip.find();
    res.status(200).json({ otherTrips });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};


export {
  createOtherTrip,
  getAllOtherTrips,
 
};

// View OtherTrips within a particular period
const viewOtherTripsByDateRange = async (req, res) => {
  try {
    // Destructure startDate and endDate from the request body
    const { startDate, endDate } = req.body;

    // Parse startDate and endDate strings into Date objects in UTC format
    const parsedStartDate = new Date(startDate + 'T00:00:00Z'); // Assuming startDate is in YYYY-MM-DD format
    const parsedEndDate = new Date(endDate + 'T23:59:59.999Z'); // Assuming endDate is in YYYY-MM-DD format

    // Retrieve all OtherTrips records within the specified date range
    const otherTripsWithinDateRange = await OtherTrip.find({
      date: {
        $gte: parsedStartDate,
        $lte: parsedEndDate,
      },
    });

    res.status(200).json({ otherTrips: otherTripsWithinDateRange });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export { viewOtherTripsByDateRange };





const updateOtherTrip = async (req, res) => {
  try {
    const tripNumber = req.params.tripNumber;

    const {
      date,
      vehicleRegistrationNumber,
      driverName,
      totalAmountCharged,
      destinationLocations,
      recordedBy,
      description,
    } = req.body;

    // Find and update the OtherTrip instance using tripNumber
    const otherTrip = await OtherTrip.findOneAndUpdate(
      { tripNumber: tripNumber },
      {
        date,
        vehicleRegistrationNumber,
        driverName,
        totalAmountCharged,
        destinationLocations,
        recordedBy,
        description,
      },
      { new: true }
    );

    // Update corresponding OtherTripIncome instance using tripNumber
    const defaultCategory = 'Other Trip Income';
    const otherTripIncome = await OtherTripIncome.findOneAndUpdate(
      { tripNumber: tripNumber },
      {
        date,
        category: defaultCategory,
        tripNumber,
        amount: totalAmountCharged, // Assuming totalAmountCharged is the relevant amount for income
        recordedBy,
        description: description || `Income from other trip ${tripNumber}.`,
      },
      { new: true }
    );

    res.status(200).json({ otherTrip, otherTripIncome });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export { updateOtherTrip };




const deleteOtherTrip = async (req, res) => {
  try {
    const tripNumber = req.params.tripNumber; // assuming tripNumber is part of the route parameters

    // Find OtherTrip instance by tripNumber to get _id
    const otherTrip = await OtherTrip.findOne({ tripNumber });

    if (!otherTrip) {
      return res.status(404).json({ message: 'OtherTrip not found' });
    }

    const otherTripId = otherTrip._id;

    // Find and delete OtherTrip instance
    await OtherTrip.findOneAndDelete({ _id: otherTripId });

    // Find and delete corresponding OtherTripIncome instance using tripNumber
    await OtherTripIncome.findOneAndDelete({ tripNumber });

    res.status(204).end(); // No content
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export { deleteOtherTrip };
