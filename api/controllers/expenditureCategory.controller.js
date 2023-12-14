import ExpenditureCategory from '../models/expenditureCategory.model.js';

const createExpenditureCategory = async (req, res) => {
  try {
    const { name, description, recordedBy } = req.body;
    const expenditureCategory = new ExpenditureCategory({ name, description, recordedBy });
    await expenditureCategory.save();
    res.status(201).json(expenditureCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const getExpenditureCategories = async (req, res) => {
  try {
    const expenditureCategories = await ExpenditureCategory.find();
    res.status(200).json(expenditureCategories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const getExpenditureCategoryById = async (req, res) => {
  try {
    const expenditureCategory = await ExpenditureCategory.findById(req.params.id);
    if (!expenditureCategory) {
      return res.status(404).json({ message: 'Expenditure category not found' });
    }
    res.status(200).json(expenditureCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const updateExpenditureCategory = async (req, res) => {
  try {
    const { name, description, recordedBy } = req.body;
    const expenditureCategory = await ExpenditureCategory.findByIdAndUpdate(
      req.params.id,
      { name, description, recordedBy },
      { new: true }
    );
    if (!expenditureCategory) {
      return res.status(404).json({ message: 'Expenditure category not found' });
    }
    res.status(200).json(expenditureCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const deleteExpenditureCategory = async (req, res) => {
  try {
    const expenditureCategory = await ExpenditureCategory.findByIdAndDelete(req.params.id);
    if (!expenditureCategory) {
      return res.status(404).json({ message: 'Expenditure category not found' });
    }
    res.status(200).json({ message: 'Expenditure category deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export {
  createExpenditureCategory,
  getExpenditureCategories,
  getExpenditureCategoryById,
  updateExpenditureCategory,
  deleteExpenditureCategory,
};
