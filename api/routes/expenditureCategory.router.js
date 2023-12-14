import express from 'express';
import {
  createExpenditureCategory,
  getExpenditureCategories,
  getExpenditureCategoryById,
  updateExpenditureCategory,
  deleteExpenditureCategory,
} from '../controllers/expenditureCategory.controller.js';

const expenseCategoryRouter = express.Router();

// Create a new expenditure category
expenseCategoryRouter.post('/create-expense-category', createExpenditureCategory);

// Get all expenditure categories
expenseCategoryRouter.get('/expenditure-categories', getExpenditureCategories);

// Get a specific expenditure category by ID
expenseCategoryRouter.get('/expenditure-categories/:id', getExpenditureCategoryById);

// Update a specific expenditure category by ID
expenseCategoryRouter.put('/update-expenditure-categories/:id', updateExpenditureCategory);

// Delete a specific expenditure category by ID
expenseCategoryRouter.delete('/expenditure-categories/:id', deleteExpenditureCategory);

export default expenseCategoryRouter;
