import express from 'express';
import {
  createExpenditureCategory,
  getExpenditureCategories,
} from '../controllers/expenditureCategory.controller.js';

const expenseCategoryRouter = express.Router();

// Create a new expenditure category
expenseCategoryRouter.post('/create-expense-category', createExpenditureCategory);

// Get all expenditure categories
expenseCategoryRouter.get('/expenditure-categories', getExpenditureCategories);


export default expenseCategoryRouter;
