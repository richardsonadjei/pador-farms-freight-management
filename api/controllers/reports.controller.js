import OtherTripIncome from '../models/ot.income.model.js';
import IncomeHauling from '../models/pe.income.model.js';
import PEExpenditure from '../models/pe.expenditure.model.js';
import GeneralExpenditure from '../models/generalExpenditure.model.js';
import OtherTripExpenditure from '../models/ot.expenditure.model.js';
import DriverCommission from '../models/driversCommission.model.js';
import Payment from '../models/partnerShares.model.js';


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




const viewFuelExpenditures = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    // Parse startDate and endDate strings into Date objects in UTC format
    const parsedStartDate = new Date(startDate + 'T00:00:00Z');
    const parsedEndDate = new Date(endDate + 'T23:59:59.999Z');

    // Query the PEExpenditure collection for Fuel expenditures
    const peFuelExpenditures = await PEExpenditure.find({
      category: 'Fuel',
      date: { $gte: parsedStartDate, $lte: parsedEndDate },
    });

    // Query the OtherTripExpenditure collection for Fuel expenditures
    const otherTripFuelExpenditures = await OtherTripExpenditure.find({
      category: 'Fuel',
      date: { $gte: parsedStartDate, $lte: parsedEndDate },
    });

    // Combine the results from both collections
    const allFuelExpenditures = peFuelExpenditures.concat(otherTripFuelExpenditures);

    res.status(200).json(allFuelExpenditures);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export { viewFuelExpenditures };






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

    // Find DriverCommissions within the date range
    const driverCommissions = await DriverCommission.find({
      date: { $gte: parsedStartDate, $lte: parsedEndDate },
    });

    res.status(200).json({ peExpenditures, otherTripExpenditures, generalExpenditures, driverCommissions });
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

    // Find DriverCommissions within the date range and with the specified category
    const driverCommissions = await DriverCommission.find({
      date: { $gte: parsedStartDate, $lte: parsedEndDate },
      category: "Driver's Commission (OT)",
    });

    // Combine the results and send the response
    res.status(200).json({ otherTripExpenditures, driverCommissions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export { getAllOtherTripExpendituresByDateRange };


const getAllPEExpendituresByDateRange = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    // Parse startDate and endDate strings into Date objects in UTC format
    const parsedStartDate = new Date(startDate + 'T00:00:00Z');
    const parsedEndDate = new Date(endDate + 'T23:59:59.999Z');

    // Find PEExpenditures within the date range
    const peExpenditures = await PEExpenditure.find({
      date: { $gte: parsedStartDate, $lte: parsedEndDate },
    });

    // Find DriverCommissions (PE) within the date range and with the specified category
    const driverCommissionsPE = await DriverCommission.find({
      date: { $gte: parsedStartDate, $lte: parsedEndDate },
      category: "Driver's Commission (PE)",
    });

    // Combine the results and send the response
    res.status(200).json({ peExpenditures, driverCommissionsPE });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export { getAllPEExpendituresByDateRange };



const updateExpenditureStatus = async (req, res) => {
  const { model, id, status } = req.body;

  try {
    let item;

    switch (model) {
      case 'GeneralExpenditure':
        item = await GeneralExpenditure.findByIdAndUpdate(id, { status }, { new: true });
        break;
      case 'OtherTripExpenditure':
        item = await OtherTripExpenditure.findByIdAndUpdate(id, { status }, { new: true });
        break;
      case 'PEExpenditure':
        item = await PEExpenditure.findByIdAndUpdate(id, { status }, { new: true });
        break;
      case 'DriverCommission':
        item = await DriverCommission.findByIdAndUpdate(id, { status }, { new: true });
        break;
      default:
        return res.status(400).json({ message: 'Invalid model' });
    }

    if (!item) {
      return res.status(404).json({ message: `${model} not found` });
    }

    return res.json({ message: `${model} status updated successfully`, item });
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

export const calculateAllPEProfitLoss = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const parsedStartDate = new Date(`${startDate}T00:00:00Z`);
    const parsedEndDate = new Date(`${endDate}T23:59:59.999Z`);

    // Fetching income data
    const incomeData = await IncomeHauling.find({
      date: {
        $gte: parsedStartDate,
        $lte: parsedEndDate,
      },
    });

    // Calculating total income
    const totalIncome = incomeData.reduce((sum, record) => sum + record.netTotalAmount, 0);

    // Fetching expenditure data (PEExpenditure with status 'paid')
    const expenditureData = await PEExpenditure.find({
      status: 'paid',
      date: {
        $gte: parsedStartDate,
        $lte: parsedEndDate,
      },
    });

    // Calculating total expenditure (excluding driver's commission for now)
    const totalExpenditure = expenditureData.reduce((sum, record) => sum + record.expenditureAmount, 0);

    // Fetching driver's commission data (Driver's Commission (PE) with status 'paid')
    const driverCommissionData = await DriverCommission.find({
      category: "Driver's Commission (PE)",
      status: 'paid',
      date: {
        $gte: parsedStartDate,
        $lte: parsedEndDate,
      },
    });

    // Calculating total driver's commission
    const totalDriverCommission = driverCommissionData.reduce(
      (sum, record) => sum + record.totalCommissionAmount,
      0
    );

    // Adding driver's commission to total expenditure
    const totalExpenditureIncludingDriversCommission = totalExpenditure + totalDriverCommission;

    // Calculating profit or loss
    const profitLoss = totalIncome - totalExpenditureIncludingDriversCommission;

    // Sending a JSON response with calculated data
    res.status(200).json({
      incomeData,
      totalIncome,
      expenditureData,
      totalExpenditure: totalExpenditureIncludingDriversCommission,
      profitLoss,
      totalDriverCommission,
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

    // Fetching driver's commission data (Driver's Commission (OT) with status 'paid')
    const driverCommissionData = await DriverCommission.find({
      category: "Driver's Commission (OT)",
      status: 'paid',
      date: {
        $gte: parsedStartDate,
        $lte: parsedEndDate,
      },
    });

    // Calculate total driver's commission
    const totalDriverCommission = driverCommissionData.reduce(
      (sum, record) => sum + record.totalCommissionAmount,
      0
    );

    

    // Adding driver's commission to total expenditure
    const totalExpenditureIncludingDriversCommission = totalExpenditure + totalDriverCommission;
    // Calculate profit or loss
    const profitLoss = totalIncome - totalExpenditureIncludingDriversCommission;

    res.status(200).json({
      incomeData,
      totalIncome,
      expenditureData,
      totalExpenditure: totalExpenditureIncludingDriversCommission,
      profitLoss,
      totalDriverCommission,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const calculateSpecificTripProfitLoss = async (req, res) => {
  try {
    const { tripNumber } = req.query;

    // Find income data for the specific trip
    const incomeData = await OtherTripIncome.find({
      tripNumber,
    });

    // Calculate total income for the specific trip
    const totalIncome = incomeData.reduce((sum, record) => sum + record.amount, 0);

    // Find expenditure data with status 'paid' for the specific trip
    const expenditureData = await OtherTripExpenditure.find({
      tripNumber,
      status: 'paid',
    });

    // Calculate total expenditure for the specific trip
    const totalExpenditure = expenditureData.reduce((sum, record) => sum + record.amount, 0);

    // Fetch driver's commission data (Driver's Commission (OT) with status 'paid') for the specific trip
    const driverCommissionData = await DriverCommission.find({
      tripNumber,
      category: "Driver's Commission (OT)",
      status: 'paid',
    });

    // Calculate total driver's commission for the specific trip
    const totalDriverCommission = driverCommissionData.reduce(
      (sum, record) => sum + record.totalCommissionAmount,
      0
    );

    // Adding driver's commission to total expenditure
    const totalExpenditureIncludingDriversCommission = totalExpenditure + totalDriverCommission;

    // Calculate profit or loss for the specific trip
    const profitLoss = totalIncome - totalExpenditureIncludingDriversCommission;

    res.status(200).json({
      tripNumber,
      incomeData,
      totalIncome,
      expenditureData,
      totalExpenditure: totalExpenditureIncludingDriversCommission,
      profitLoss,
      totalDriverCommission,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



// controllers/generalExpenditureController.js



const viewPaidGeneralExpendituresByDateRange = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    // Parse startDate and endDate strings into Date objects in UTC format
    const parsedStartDate = new Date(startDate + 'T00:00:00Z');
    const parsedEndDate = new Date(endDate + 'T23:59:59.999Z');

    // Query the database for General Expenditures with status 'paid' within the specified period
    const paidExpenditures = await GeneralExpenditure.find({
      status: 'paid',
      date: { $gte: parsedStartDate, $lte: parsedEndDate },
    });

    res.status(200).json(paidExpenditures);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export { viewPaidGeneralExpendituresByDateRange };


// Controller to view all drivers' commissions with status 'paid'
const viewPaidDriversCommissions = async (req, res) => {
  try {
    // Parse startDate and endDate strings into Date objects in UTC format
    const { startDate, endDate } = req.query;
    const parsedStartDate = new Date(startDate + 'T00:00:00Z');
    const parsedEndDate = new Date(endDate + 'T23:59:59.999Z');

    // Query the database for DriverCommissions with status 'paid' within the specified period
    const paidCommissions = await DriverCommission.find({
      status: 'paid',
      date: { $gte: parsedStartDate, $lte: parsedEndDate },
    });

    res.status(200).json(paidCommissions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Controller to view all drivers' commissions with status 'pending payment'
const viewPendingPaymentDriversCommissions = async (req, res) => {
  try {
    // Parse startDate and endDate strings into Date objects in UTC format
    const { startDate, endDate } = req.query;
    const parsedStartDate = new Date(startDate + 'T00:00:00Z');
    const parsedEndDate = new Date(endDate + 'T23:59:59.999Z');

    // Query the database for DriverCommissions with status 'pending payment' within the specified period
    const pendingPaymentCommissions = await DriverCommission.find({
      status: 'pending payment',
      date: { $gte: parsedStartDate, $lte: parsedEndDate },
    });

    res.status(200).json(pendingPaymentCommissions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export { viewPaidDriversCommissions, viewPendingPaymentDriversCommissions };





export const generateProfitLossReport = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const parsedStartDate = new Date(`${startDate}T00:00:00Z`);
    const parsedEndDate = new Date(`${endDate}T23:59:59.999Z`);

    // Fetching income data from IncomeHauling
    const incomeHaulingData = await IncomeHauling.find({
      date: {
        $gte: parsedStartDate,
        $lte: parsedEndDate,
      },
    });

    // Fetching income data from OtherTripIncome
    const otherTripIncomeData = await OtherTripIncome.find({
      date: {
        $gte: parsedStartDate,
        $lte: parsedEndDate,
      },
    });

    // Calculating total income
    const totalIncomeHauling = incomeHaulingData.reduce((sum, record) => sum + record.netTotalAmount, 0);
    const totalOtherTripIncome = otherTripIncomeData.reduce((sum, record) => sum + record.amount, 0);
    const totalIncome = totalIncomeHauling + totalOtherTripIncome;

    // Fetching PEExpenditure data
    const peExpenditureData = await PEExpenditure.find({
      status: 'paid',
      date: {
        $gte: parsedStartDate,
        $lte: parsedEndDate,
      },
    });

    // Fetching GeneralExpenditure data
    const generalExpenditureData = await GeneralExpenditure.find({
      status: 'paid',
      date: {
        $gte: parsedStartDate,
        $lte: parsedEndDate,
      },
    });

    // Fetching OtherTripExpenditure data
    const otherTripExpenditureData = await OtherTripExpenditure.find({
      status: 'paid',
      date: {
        $gte: parsedStartDate,
        $lte: parsedEndDate,
      },
    });

    // Fetching Payment data
    const paymentData = await Payment.find({
      date: {
        $gte: parsedStartDate,
        $lte: parsedEndDate,
      },
    });

    // Fetching driver's commission data for PE
    const driverCommissionPEData = await DriverCommission.find({
      category: "Driver's Commission (PE)",
      status: 'paid',
      date: {
        $gte: parsedStartDate,
        $lte: parsedEndDate,
      },
    });

    // Fetching driver's commission data for other trips
    const driverCommissionOTData = await DriverCommission.find({
      category: "Driver's Commission (OT)",
      status: 'paid',
      date: {
        $gte: parsedStartDate,
        $lte: parsedEndDate,
      },
    });

    // Calculating total expenditure for each type
    const totalPEExpenditure = peExpenditureData.reduce((sum, record) => sum + record.expenditureAmount, 0);
    const totalGeneralExpenditure = generalExpenditureData.reduce((sum, record) => sum + record.amount, 0);
    const totalOtherTripExpenditure = otherTripExpenditureData.reduce((sum, record) => sum + record.amount, 0);
    const totalPaymentExpenditure = paymentData.reduce((sum, record) => sum + record.amount, 0);

    // Calculating total driver's commission for PE
    const totalDriverCommissionPE = driverCommissionPEData.reduce(
      (sum, record) => sum + record.totalCommissionAmount,
      0
    );

    // Calculating total driver's commission for other trips
    const totalDriverCommissionOT = driverCommissionOTData.reduce(
      (sum, record) => sum + record.totalCommissionAmount,
      0
    );

    // Calculating total driver's commission
    const totalDriverCommission = totalDriverCommissionPE + totalDriverCommissionOT;

    // Adding driver's commission to total expenditure
    const totalExpenditureIncludingDriversCommission =
      totalPEExpenditure + totalGeneralExpenditure + totalOtherTripExpenditure + totalPaymentExpenditure + totalDriverCommission;

    // Calculating profit or loss
    const profitLoss = totalIncome - totalExpenditureIncludingDriversCommission;

    // Sending a JSON response with calculated data
    res.status(200).json({
      incomeHaulingData,
      totalIncomeHauling,
      otherTripIncomeData,
      totalOtherTripIncome,
      totalIncome,
      peExpenditureData,
      totalPEExpenditure,
      generalExpenditureData,
      totalGeneralExpenditure,
      otherTripExpenditureData,
      totalOtherTripExpenditure,
      paymentData,
      totalPaymentExpenditure,
      driverCommissionPEData,
      totalDriverCommissionPE,
      driverCommissionOTData,
      totalDriverCommissionOT,
      totalDriverCommission,
      totalExpenditure: totalExpenditureIncludingDriversCommission,
      profitLoss,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

