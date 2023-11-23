import express from 'express';
import {
  createGeneralExpenditure,
  getAllGeneralExpenditures,
} from '../controllers/generalExpenditure.controller.js';

const generalExpenseRouter = express.Router();

// Create a new general expenditure
generalExpenseRouter.post('/general-expenditures', createGeneralExpenditure);

// Get all general expenditures
generalExpenseRouter.get('/all-general-expenditures', getAllGeneralExpenditures);

export default generalExpenseRouter;