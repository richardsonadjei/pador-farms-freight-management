import IncomeHauling from '../models/pe.income.model.js';

const createIncomeHauling = async (req, res) => {
    try {
      const {
        date,
        category,
        truckRegistrationNumber,
        incomeAmountPerBag,
        totalIncomeAmount,
        taxAmountPerBag,
        totalTaxAmount,
        netTotalAmountPerbag,
        netTotalAmount,
        description,
        recordedBy,
      } = req.body;
  
      // Create new IncomeHauling instance
      const income = new IncomeHauling({
        date,
        category,
        truckRegistrationNumber,
        incomeAmountPerBag,
        totalIncomeAmount,
        taxAmountPerBag,
        totalTaxAmount,
        netTotalAmountPerbag,
        netTotalAmount,
        description,
        recordedBy,
      });
  
      // Save the new IncomeHauling instance
      await income.save();
  
      
      res.status(201).json({ income });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  };

// Controller to get all income records
const getAllIncomeHauling = async (req, res) => {
  try {
    const incomeRecords = await IncomeHauling.find();
    res.status(200).json(incomeRecords);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Controller to get a specific income record by ID
const getIncomeHaulingById = async (req, res) => {
  try {
    const { id } = req.params;
    const incomeRecord = await IncomeHauling.findById(id);
    
    if (!incomeRecord) {
      return res.status(404).json({ message: 'Income record not found' });
    }

    res.status(200).json(incomeRecord);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Controller to update a specific income record by ID
const updateIncomeHauling = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedIncome = await IncomeHauling.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!updatedIncome) {
      return res.status(404).json({ message: 'Income record not found' });
    }

    res.status(200).json(updatedIncome);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Controller to delete a specific income record by ID
const deleteIncomeHauling = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedIncome = await IncomeHauling.findByIdAndDelete(id);

    if (!deletedIncome) {
      return res.status(404).json({ message: 'Income record not found' });
    }

    res.status(200).json({ message: 'Income record deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export {
  createIncomeHauling,
  getAllIncomeHauling,
  getIncomeHaulingById,
  updateIncomeHauling,
  deleteIncomeHauling,
};
