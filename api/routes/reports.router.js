import express from 'express';
import updateExpenditureStatus, { calculateAllOtherTripsProfitLoss, calculateAllProfitLoss, calculateOtherTripsProfitLoss, calculateProfitLoss, getAllExpendituresByDateRange, getAllOtherTripExpendituresByDateRange, getAllOtherTripIncome,  getIncomeReport,    viewFuelPEExpenditures, viewPEincomeByDateRange, viewRepairsAndMaintenanceExpenditures } from '../controllers/reports.controller.js';

const reportsRouter = express.Router();

// Route to get income report within a date range
reportsRouter.post('/all-incomeReport', getIncomeReport);
reportsRouter.post('/all-pe-incomeReport', viewPEincomeByDateRange);
reportsRouter.post('/all-ot-incomeReport', getAllOtherTripIncome);
reportsRouter.get('/all-fuelPE-expenseReport', viewFuelPEExpenditures);
reportsRouter.get('/all-maintenance-expenseReport', viewRepairsAndMaintenanceExpenditures);
reportsRouter.get('/all-expense-report', getAllExpendituresByDateRange);
reportsRouter.get('/all-ot-report', getAllOtherTripExpendituresByDateRange );
reportsRouter.post('/update-payment-status', updateExpenditureStatus );
reportsRouter.get('/pe-income-expenditure', calculateProfitLoss );
reportsRouter.get('/all-pe-income-expenditure', calculateAllProfitLoss );
reportsRouter.get('/ot-income-expenditure', calculateOtherTripsProfitLoss );
reportsRouter.get('/all-ot-income-expenditure', calculateAllOtherTripsProfitLoss );


export default reportsRouter;
