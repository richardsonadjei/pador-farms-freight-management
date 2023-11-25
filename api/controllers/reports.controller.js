import OtherTripIncome from '../models/ot.income.model.js';
import IncomeHauling from '../models/pe.income.model.js';
import PEExpenditure from '../models/pe.expenditure.model.js';
import GeneralExpenditure from '../models/generalExpenditure.model.js';
import OtherTripExpenditure from '../models/ot.expenditure.model.js';


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





const viewRepairsAndMaintenanceExpenditures = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    // Parse startDate and endDate strings into Date objects in UTC format
    const parsedStartDate = new Date(startDate + 'T00:00:00Z'); // Assuming startDate is in YYYY-MM-DD format
    const parsedEndDate = new Date(endDate + 'T23:59:59.999Z'); // Assuming endDate is in YYYY-MM-DD format



    // Query the database for General Expenditures within the specified period
    const repairsAndMaintenanceExpenditures = await GeneralExpenditure.find({
      category: 'Repairs And Maintenance'.trim(), // Use the correct casing and trim
  date: { $gte: parsedStartDate, $lte: parsedEndDate },
    });

   

    res.status(200).json(repairsAndMaintenanceExpenditures);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export { viewRepairsAndMaintenanceExpenditures };



const getAllExpendituresByDateRange = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    // Parse startDate and endDate strings into Date objects in UTC format
    const parsedStartDate = new Date(startDate + 'T00:00:00Z');
    const parsedEndDate = new Date(endDate + 'T23:59:59.999Z');

    // Find PEExpenditures within the date range
    const peExpenditures = await PEExpenditure.find({
      date: { $gte: parsedStartDate, $lte: parsedEndDate },
    });

    // Find OtherTripExpenditures within the date range
    const otherTripExpenditures = await OtherTripExpenditure.find({
      date: { $gte: parsedStartDate, $lte: parsedEndDate },
    });

    // Find GeneralExpenditures within the date range
    const generalExpenditures = await GeneralExpenditure.find({
      date: { $gte: parsedStartDate, $lte: parsedEndDate },
    });

    res.status(200).json({ peExpenditures, otherTripExpenditures, generalExpenditures });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export { getAllExpendituresByDateRange };




const getAllOtherTripExpendituresByDateRange = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    // Parse startDate and endDate strings into Date objects in UTC format
    const parsedStartDate = new Date(startDate + 'T00:00:00Z');
    const parsedEndDate = new Date(endDate + 'T23:59:59.999Z');

    // Find OtherTripExpenditures within the date range
    const otherTripExpenditures = await OtherTripExpenditure.find({
      date: { $gte: parsedStartDate, $lte: parsedEndDate },
    });

    res.status(200).json({ otherTripExpenditures });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export { getAllOtherTripExpendituresByDateRange };





const updateExpenditureStatus = async (req, res) => {
  const { model, id, status } = req.body;

  try {
    let expenditure;

    switch (model) {
      case 'GeneralExpenditure':
        expenditure = await GeneralExpenditure.findByIdAndUpdate(id, { status }, { new: true });
        break;
      case 'OtherTripExpenditure':
        expenditure = await OtherTripExpenditure.findByIdAndUpdate(id, { status }, { new: true });
        break;
      case 'PEExpenditure':
        expenditure = await PEExpenditure.findByIdAndUpdate(id, { status }, { new: true });
        break;
      default:
        return res.status(400).json({ message: 'Invalid model' });
    }

    if (!expenditure) {
      return res.status(404).json({ message: 'Expenditure not found' });
    }

    return res.json({ message: 'Expenditure status updated successfully', expenditure });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export default updateExpenditureStatus;





export const calculateProfitLoss = async (req, res) => {
  try {
    const { peNumber, startDate, endDate } = req.query;

    // Parse startDate and endDate strings into Date objects in UTC format
    const parsedStartDate = new Date(`${startDate}T00:00:00Z`);
    const parsedEndDate = new Date(`${endDate}T23:59:59.999Z`);

    // Find all income data for the specified peNumber within the date range
    const incomeData = await IncomeHauling.find({
      peNumber,
      date: {
        $gte: parsedStartDate,
        $lte: parsedEndDate,
      },
    });

    // Calculate total income by summing up netTotalAmount for each record
    const totalIncome = incomeData.reduce((sum, record) => sum + record.netTotalAmount, 0);

    // Find all expenditure data for the specified peNumber with status 'paid' within the date range
    const expenditureData = await PEExpenditure.find({
      peNumber,
      status: 'paid',
      date: {
        $gte: parsedStartDate,
        $lte: parsedEndDate,
      },
    });

    // Calculate total expenditure by summing up the expenditureAmount for each record
    const totalExpenditure = expenditureData.reduce((sum, record) => sum + record.expenditureAmount, 0);

    // Calculate profit or loss
    const profitLoss = totalIncome - totalExpenditure;

    // Calculate driver's commission (10% of profit or loss)
    const driversCommission = 0.1 * profitLoss;

    res.status(200).json({
      incomeData,
      totalIncome,
      expenditureData,
      totalExpenditure,
      profitLoss,
      driversCommission,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const calculateAllProfitLoss = async (req, res) => {
  try {
    // Destructuring the query parameters from the request object
    const { startDate, endDate } = req.query;

    // Parsing the startDate and endDate strings into Date objects in UTC format
    const parsedStartDate = new Date(`${startDate}T00:00:00Z`);
    const parsedEndDate = new Date(`${endDate}T23:59:59.999Z`);

    // Finding all income data within the date range
    const incomeData = await IncomeHauling.find({
      date: {
        $gte: parsedStartDate,
        $lte: parsedEndDate,
      },
    });

    // Calculating total income by summing up netTotalAmount for each record
    const totalIncome = incomeData.reduce((sum, record) => sum + record.netTotalAmount, 0);

    // Finding all expenditure data with status 'paid' within the date range
    const expenditureData = await PEExpenditure.find({
      status: 'paid',
      date: {
        $gte: parsedStartDate,
        $lte: parsedEndDate,
      },
    });

    // Calculating total expenditure by summing up the expenditureAmount for each record
    const totalExpenditure = expenditureData.reduce((sum, record) => sum + record.expenditureAmount, 0);

    // Calculating profit or loss
    const profitLoss = totalIncome - totalExpenditure;

    // Calculating driver's commission (10% of profit or loss)
    const driversCommission = 0.1 * profitLoss;

    // Sending a JSON response with calculated data
    res.status(200).json({
      incomeData,
      totalIncome,
      expenditureData,
      totalExpenditure,
      profitLoss,
      driversCommission,
    });
  } catch (error) {
    // Handling errors and sending a 500 Internal Server Error response
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



export const calculateOtherTripsProfitLoss = async (req, res) => {
  try {
    const { tripNumber, startDate, endDate } = req.query;

    // Parse startDate and endDate strings into Date objects
    const parsedStartDate = new Date(startDate);
    const parsedEndDate = new Date(endDate);

    // Find all income data for the specified tripNumber within the date range
    const incomeData = await OtherTripIncome.find({
      tripNumber,
      date: {
        $gte: parsedStartDate,
        $lte: parsedEndDate,
      },
    });

    // Calculate total income by summing up the amount for each income record
    const totalIncome = incomeData.reduce((sum, record) => sum + record.amount, 0);

    // Find all expenditure data for the specified tripNumber with status 'paid' within the date range
    const expenditureData = await OtherTripExpenditure.find({
      tripNumber,
      status: 'paid',
      date: {
        $gte: parsedStartDate,
        $lte: parsedEndDate,
      },
    });

    // Calculate total expenditure by summing up the amount for each expenditure record
    const totalExpenditure = expenditureData.reduce((sum, record) => sum + record.amount, 0);

    // Calculate profit or loss
    const profitLoss = totalIncome - totalExpenditure;

    // Calculate driver's commission (10% of profit or loss)
    const driversCommission = 0.2 * profitLoss;

    

    res.status(200).json({
      incomeData,
      totalIncome,
      expenditureData,
      totalExpenditure,
      profitLoss,
      driversCommission,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const calculateAllOtherTripsProfitLoss = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    // Parse startDate and endDate strings into Date objects
    const parsedStartDate = new Date(startDate);
    const parsedEndDate = new Date(endDate);

    // Find all income data within the date range
    const incomeData = await OtherTripIncome.find({
      date: {
        $gte: parsedStartDate,
        $lte: parsedEndDate,
      },
    });

    // Calculate total income by summing up the amount for each income record
    const totalIncome = incomeData.reduce((sum, record) => sum + record.amount, 0);

    // Find all expenditure data with status 'paid' within the date range
    const expenditureData = await OtherTripExpenditure.find({
      status: 'paid',
      date: {
        $gte: parsedStartDate,
        $lte: parsedEndDate,
      },
    });

    // Calculate total expenditure by summing up the amount for each expenditure record
    const totalExpenditure = expenditureData.reduce((sum, record) => sum + record.amount, 0);

    // Calculate profit or loss
    const profitLoss = totalIncome - totalExpenditure;

    // Calculate driver's commission (10% of profit or loss)
    const driversCommission = 0.2 * profitLoss;

    res.status(200).json({
      incomeData,
      totalIncome,
      expenditureData,
      totalExpenditure,
      profitLoss,
      driversCommission,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
