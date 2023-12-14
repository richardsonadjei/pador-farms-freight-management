import express from 'express';
import { recordExpenditure, updateExpenditureStatus, getExpenditureById } from '../controllers/pe.expenditure.controller.js';

const peExpenseRouter = express.Router();

// Define your routes
peExpenseRouter.post('/pe-expenditure', recordExpenditure);
peExpenseRouter.patch('/pe-expenditure/:id/status', updateExpenditureStatus);
peExpenseRouter.get('/pe-expenditure/:id', getExpenditureById);

// Export the router
export default peExpenseRouter;
