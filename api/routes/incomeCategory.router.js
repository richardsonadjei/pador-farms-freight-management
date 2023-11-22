import express from 'express';
import {
  createIncomeCategory,
  getAllIncomeCategories,
  getIncomeCategoryById,
  updateIncomeCategoryById,
  deleteIncomeCategoryById,
} from '../controllers/incomeCategory.controller.js';

const incomeCategoryRouter = express.Router();

// Route to create a new income category
incomeCategoryRouter .post('/create-income-category', createIncomeCategory);

// Route to get all income categories
incomeCategoryRouter .get('/income-categories', getAllIncomeCategories);

// Route to get a single income category by ID
incomeCategoryRouter .get('/income-categories/:id', getIncomeCategoryById);

// Route to update an income category by ID
incomeCategoryRouter .put('/income-categories/:id', updateIncomeCategoryById);

// Route to delete an income category by ID
incomeCategoryRouter .delete('/income-categories/:id', deleteIncomeCategoryById);

export default incomeCategoryRouter ;
