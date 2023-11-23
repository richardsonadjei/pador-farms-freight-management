import GeneralExpenditure from '../models/generalExpenditure.model.js';

// Create a new general expenditure
export const createGeneralExpenditure = async (req, res) => {
  try {
    const generalExpenditure = new GeneralExpenditure(req.body);
    await generalExpenditure.save();
    res.status(201).json(generalExpenditure);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create general expenditure' });
  }
};

// Get all general expenditures
export const getAllGeneralExpenditures = async (req, res) => {
  try {
    const generalExpenditures = await GeneralExpenditure.find();
    res.status(200).json(generalExpenditures);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch general expenditures' });
  }
};

