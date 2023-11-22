import IncomeCategory from '../models/incomeCategory.model.js';

// Controller to create a new income category
export const createIncomeCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    // Check if the category name already exists
    const existingCategory = await IncomeCategory.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ error: 'Category with this name already exists.' });
    }

    // Create a new income category instance
    const newCategory = new IncomeCategory({ name, description });

    // Save the new category to the database
    await newCategory.save();

    res.status(201).json({ message: 'Income category created successfully.', category: newCategory });
  } catch (error) {
    console.error('Error creating income category:', error);
    res.status(500).json({ error: 'Internal Server Error. Please try again later.' });
  }
};

// Controller to get all income categories
export const getAllIncomeCategories = async (req, res) => {
  try {
    const categories = await IncomeCategory.find();
    res.status(200).json({ categories });
  } catch (error) {
    console.error('Error getting income categories:', error);
    res.status(500).json({ error: 'Internal Server Error. Please try again later.' });
  }
};

// Controller to get a single income category by ID
export const getIncomeCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await IncomeCategory.findById(id);
    if (!category) {
      return res.status(404).json({ error: 'Income category not found.' });
    }
    res.status(200).json({ category });
  } catch (error) {
    console.error('Error getting income category:', error);
    res.status(500).json({ error: 'Internal Server Error. Please try again later.' });
  }
};

// Controller to update an income category by ID
export const updateIncomeCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const updatedCategory = await IncomeCategory.findByIdAndUpdate(
      id,
      { name, description },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ error: 'Income category not found.' });
    }

    res.status(200).json({ message: 'Income category updated successfully.', category: updatedCategory });
  } catch (error) {
    console.error('Error updating income category:', error);
    res.status(500).json({ error: 'Internal Server Error. Please try again later.' });
  }
};

// Controller to delete an income category by ID
export const deleteIncomeCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCategory = await IncomeCategory.findByIdAndDelete(id);
    if (!deletedCategory) {
      return res.status(404).json({ error: 'Income category not found.' });
    }
    res.status(200).json({ message: 'Income category deleted successfully.' });
  } catch (error) {
    console.error('Error deleting income category:', error);
    res.status(500).json({ error: 'Internal Server Error. Please try again later.' });
  }
};
