import OtherTripIncome from '../models/ot.income.model.js';
import IncomeHauling from '../models/pe.income.model.js';
import PEExpenditure from '../models/pe.expenditure.model.js';

const getIncomeReport = async (req, res) => {
  try {
    const { startDate, endDate } = req.body;

    // Parse startDate and endDate strings into Date objects in UTC format
    const parsedStartDate = new Date(startDate + 'T00:00:00Z');
    const parsedEndDate = new Date(endDate + 'T23:59:59.999Z');

    // Find OtherTripIncome within the date range
    const otherTripIncome = await OtherTripIncome.find({
      date: { $gte: parsedStartDate, $lte: parsedEndDate },
    });

    // Find IncomeHauling within the date range
    const incomeHauling = await IncomeHauling.find({
      date: { $gte: parsedStartDate, $lte: parsedEndDate },
    });

    res.status(200).json({ otherTripIncome, incomeHauling });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export { getIncomeReport };




const viewPEincomeByDateRange = async (req, res) => {
  try {
    const { startDate, endDate } = req.body;

    // Parse startDate and endDate strings into Date objects in UTC format
    const parsedStartDate = new Date(startDate + 'T00:00:00Z');
    const parsedEndDate = new Date(endDate + 'T23:59:59.999Z');

    // Find IncomeHauling within the date range
    const incomeRecords = await IncomeHauling.find({
      date: { $gte: parsedStartDate, $lte: parsedEndDate },
    });

    res.status(200).json({ incomeRecords });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export { viewPEincomeByDateRange };




const getAllOtherTripIncome = async (req, res) => {
  try {
    const { startDate, endDate } = req.body;

    // Parse startDate and endDate strings into Date objects in UTC format
    const parsedStartDate = new Date(startDate + 'T00:00:00Z');
    const parsedEndDate = new Date(endDate + 'T23:59:59.999Z');

    // Find OtherTripIncome within the date range
    const otherTripIncome = await OtherTripIncome.find({
      date: { $gte: parsedStartDate, $lte: parsedEndDate },
    });

    res.status(200).json({ otherTripIncome });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export { getAllOtherTripIncome };




const viewFuelPEExpenditures = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    // Parse startDate and endDate strings into Date objects in UTC format
    const parsedStartDate = new Date(startDate + 'T00:00:00Z'); // Assuming startDate is in YYYY-MM-DD format
    const parsedEndDate = new Date(endDate + 'T23:59:59.999Z'); // Assuming endDate is in YYYY-MM-DD format

    // Query the database for Fuel expenditures within the specified period
    const fuelExpenditures = await PEExpenditure.find({
      category: 'Fuel',
      date: { $gte: parsedStartDate, $lte: parsedEndDate },
    });

    res.status(200).json(fuelExpenditures);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export { viewFuelPEExpenditures };

