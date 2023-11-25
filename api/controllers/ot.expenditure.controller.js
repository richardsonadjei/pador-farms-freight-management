import OtherTripExpenditure from '../models/ot.expenditure.model.js';

const recordOtherTripExpenditure = async (req, res) => {
  try {
    const {
      date,
      category,
      vehicleRegistrationNumber,
      tripNumber,
      amount, // Add the amount field
      description,
      recordedBy,
      status = 'pending payment', // Set default status to 'pending payment'
    } = req.body;

    // Create a new OtherTripExpenditure instance
    const otherTripExpenditure = new OtherTripExpenditure({
      date,
      category,
      vehicleRegistrationNumber,
      tripNumber,
      amount, // Include the amount field
      description,
      recordedBy,
      status,
    });

    // Save the new OtherTripExpenditure instance to the database
    await otherTripExpenditure.save();

    res.status(201).json(otherTripExpenditure);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export { recordOtherTripExpenditure };
