import express from 'express';
import { recordExpenditure } from '../controllers/pe.expenditure.controller.js'; // Replace with the actual file name

const peExpenseRouter = express.Router();

// Define your routes
peExpenseRouter.post('/pe-expenditure', recordExpenditure);

// Export the router
export default peExpenseRouter;
