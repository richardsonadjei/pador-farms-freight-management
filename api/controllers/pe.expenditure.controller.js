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


// Function to update only the status of a PEExpenditure record
const updateExpenditureStatus = async (req, res) => {
  try {
    const { id } = req.params; // Assuming the id is included in the route parameters
    const { status } = req.body; // The updated status value

    // Find the PEExpenditure record by ID
    const peExpenditure = await PEExpenditure.findById(id);

    if (!peExpenditure) {
      return res.status(404).json({ message: 'PEExpenditure record not found' });
    }

    // Update only the status field
    peExpenditure.status = status;

    // Save the updated record
    await peExpenditure.save();

    res.status(200).json(peExpenditure);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export { updateExpenditureStatus };

// Function to read a particular PEExpenditure record by ID
const getExpenditureById = async (req, res) => {
  try {
    const { id } = req.params; // Assuming the id is included in the route parameters

    // Find the PEExpenditure record by ID
    const peExpenditure = await PEExpenditure.findById(id);

    if (!peExpenditure) {
      return res.status(404).json({ message: 'PEExpenditure record not found' });
    }

    res.status(200).json(peExpenditure);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export { getExpenditureById };