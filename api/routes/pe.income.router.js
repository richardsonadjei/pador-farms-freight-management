import express from 'express';
import {
  createIncomeHauling,
  getAllIncomeHauling,
  getIncomeHaulingById,
  updateIncomeHauling,
  deleteIncomeHauling,
} from '../controllers/pe.income.controller.js';

const incomeRouter = express.Router();

// Route to create a new income record
incomeRouter.post('/create-income', createIncomeHauling);

// Route to get all income records
incomeRouter.get('/income', getAllIncomeHauling);

// Route to get a specific income record by ID
incomeRouter.get('/income/:id', getIncomeHaulingById);

// Route to update a specific income record by ID
incomeRouter.put('/income/:id', updateIncomeHauling);

// Route to delete a specific income record by ID
incomeRouter.delete('/income/:id', deleteIncomeHauling);

export default incomeRouter;
