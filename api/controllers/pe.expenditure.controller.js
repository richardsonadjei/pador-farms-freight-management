import PEExpenditure from '../models/pe.expenditure.model.js';

const recordExpenditure = async (req, res) => {
  try {
    const {
      date,
      category,
      peNumber,
      truckRegistrationNumber,
      expenditureAmount,
      description,
      recordedBy,
      status, // Added status field
    } = req.body;

    // Create a new PEExpenditure instance
    const peExpenditure = new PEExpenditure({
      date,
      category,
      peNumber,
      truckRegistrationNumber,
      expenditureAmount,
      description,
      recordedBy,
      status, // Include the status field
    });

    // Save the new PEExpenditure instance to the database
    await peExpenditure.save();

    res.status(201).json(peExpenditure);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export { recordExpenditure };
