import express from 'express';
import updateExpenditureStatus, { calculateAllOtherTripsProfitLoss, calculateAllPEProfitLoss,   calculateProfitLoss, getAllExpendituresByDateRange, getAllOtherTripExpendituresByDateRange, getAllOtherTripIncome,  getAllPEExpendituresByDateRange,  getIncomeReport,    viewFuelExpenditures,  viewPEincomeByDateRange, viewPaidDriversCommissions, viewPaidGeneralExpendituresByDateRange, viewPendingPaymentDriversCommissions, viewRepairsAndMaintenanceExpenditures } from '../controllers/reports.controller.js';

const reportsRouter = express.Router();

// Route to get income report within a date range
reportsRouter.post('/all-incomeReport', getIncomeReport);
reportsRouter.post('/all-pe-incomeReport', viewPEincomeByDateRange);
reportsRouter.post('/all-ot-incomeReport', getAllOtherTripIncome);
reportsRouter.get('/all-fuel-expenseReport', viewFuelExpenditures);
reportsRouter.get('/all-maintenance-expenseReport', viewRepairsAndMaintenanceExpenditures);
reportsRouter.get('/all-expense-report', getAllExpendituresByDateRange);
reportsRouter.get('/all-ot-report', getAllOtherTripExpendituresByDateRange );
reportsRouter.get('/all-pe-expense', getAllPEExpendituresByDateRange );
reportsRouter.post('/update-payment-status', updateExpenditureStatus );
reportsRouter.get('/pe-income-expenditure', calculateProfitLoss );
reportsRouter.get('/all-pe-income-expenditure', calculateAllPEProfitLoss );
reportsRouter.get('/ot-income-expenditure', calculateAllOtherTripsProfitLoss );
reportsRouter.get('/all-ot-income-expenditure', calculateAllOtherTripsProfitLoss );
reportsRouter.get('/all-all-general-expenditure', viewPaidGeneralExpendituresByDateRange );
// Route to view all drivers' commissions with status 'paid'
reportsRouter.get('/paid-commissions', viewPaidDriversCommissions);

// Route to view all drivers' commissions with status 'pending payment'
reportsRouter.get('/pending-payment-commissions', viewPendingPaymentDriversCommissions);


export default reportsRouter;
