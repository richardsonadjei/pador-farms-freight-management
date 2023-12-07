import DriverCommission from '../models/driversCommission.model.js';
import CocoaHaulage from '../models/pe.model.js'; // Import your CocoaHaulage model
import OtherTripIncome from '../models/ot.income.model.js';
import OtherTripExpenditure from '../models/ot.expenditure.model.js';

export const createPEDriverCommission = async (req, res) => {
  try {
    const {
      date,
      peNumber,
      driverName,
      totalCommissionAmount,
      description,
      recordedBy,
      status,
    } = req.body;

    // Set default category to "Driver's Commission (PE)"
    const category = 'Driver\'s Commission (PE)';

    const newDriverCommission = new DriverCommission({
      date,
      peNumber,
      driverName,
      category,
      totalCommissionAmount,
      description,
      recordedBy,
      status, // Include the status field
    });

    await newDriverCommission.save();

    res.status(201).json({ driverCommission: newDriverCommission });
  } catch (error) {
    console.error('Error creating PE driver commission:', error);
    res.status(500).json({ error: 'Internal Server Error. Please try again later.' });
  }
};

export const createOTDriverCommission = async (req, res) => {
  try {
    const {
      date,
      tripNumber,
      driverName,
      totalCommissionAmount,
      description,
      recordedBy,
      status,
    } = req.body;

    // Set default category to "Driver's Commission (OT)"
    const category = 'Driver\'s Commission (OT)';

    const newDriverCommission = new DriverCommission({
      date,
      tripNumber,
      driverName,
      category,
      totalCommissionAmount,
      description,
      recordedBy,
      status, // Include the status field
    });

    await newDriverCommission.save();

    res.status(201).json({ driverCommission: newDriverCommission });
  } catch (error) {
    console.error('Error creating OT driver commission:', error);
    res.status(500).json({ error: 'Internal Server Error. Please try again later.' });
  }
};




// Controller to get driver's commissions based on firstName and within a period
export const getDriverCommissionsByFirstNameAndPeriod = async (req, res) => {
  try {
    const { firstName, startDate, endDate } = req.query;

    // Parse startDate and endDate strings into Date objects in UTC format
    const parsedStartDate = new Date(startDate + 'T00:00:00Z'); // Assuming startDate is in YYYY-MM-DD format
    const parsedEndDate = new Date(endDate + 'T23:59:59.999Z'); // Assuming endDate is in YYYY-MM-DD format

    // Retrieve driver commissions within the specified period and for the given firstName
    const driverCommissions = await DriverCommission.find({
      driverName: { $regex: new RegExp(firstName, 'i') }, // Case-insensitive regex match for firstName
      date: { $gte: parsedStartDate, $lte: parsedEndDate },
    });

    res.status(200).json({ driverCommissions });
  } catch (error) {
    console.error('Error getting driver commissions by firstName and period:', error);
    res.status(500).json({ error: 'Internal Server Error. Please try again later.' });
  }
};


// Controller to get a specific driver's commission by ID
export const getDriverCommissionById = async (req, res) => {
  const { id } = req.params;

  try {
    const driverCommission = await DriverCommission.findById(id);
    if (!driverCommission) {
      return res.status(404).json({ message: 'Driver commission not found' });
    }

    res.status(200).json({ driverCommission });
  } catch (error) {
    console.error('Error getting driver commission by ID:', error);
    res.status(500).json({ error: 'Internal Server Error. Please try again later.' });
  }
};


export const calculateDriverCommissionForCocoaHaulages = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    // Parse startDate and endDate strings into Date objects in UTC format
    const parsedStartDate = new Date(startDate + 'T00:00:00Z'); // Assuming startDate is in YYYY-MM-DD format
    const parsedEndDate = new Date(endDate + 'T23:59:59.999Z'); // Assuming endDate is in YYYY-MM-DD format

    // Retrieve cocoa haulages within the specified period
    const cocoaHaulages = await CocoaHaulage.find({
      date: { $gte: parsedStartDate, $lte: parsedEndDate },
    });

    // Calculate driver's commission and gather additional information for each cocoa haulage
    const driverCommissions = cocoaHaulages.map((haulage) => {
      const commission = 1 * haulage.quantity; // Assuming the driver's commission is 1 multiplied by the quantity of bags
      return {
        haulageId: haulage._id,
        driverName: haulage.driverName,
        commission,
      };
    });

    // Calculate total quantity of bags
    const totalQuantityOfBags = cocoaHaulages.reduce((total, haulage) => total + haulage.quantity, 0);

    // Get a list of all PE numbers
    const peNumbers = cocoaHaulages.map((haulage) => haulage.peNumber);

    res.status(200).json({
      totalQuantityOfBags,
      peNumbers,
      driverCommissions,
    });
  } catch (error) {
    console.error('Error calculating driver commissions for cocoa haulages:', error);
    res.status(500).json({ error: 'Internal Server Error. Please try again later.' });
  }
};


export const createMonthlyPEDriverCommission = async (req, res) => {
  try {
    const {
      date,
     
      driverName,
      totalCommissionAmount,
      description,
      recordedBy,
      status,
    } = req.body;

    // Set default category to "Driver's Commission (PE)"
    const category = 'Driver\'s Commission (PE)';

    const newDriverCommission = new DriverCommission({
      date,
      driverName,
      category,
      totalCommissionAmount,
      description,
      recordedBy,
      status, // Include the status field
    });

    await newDriverCommission.save();

    res.status(201).json({ driverCommission: newDriverCommission });
  } catch (error) {
    console.error('Error creating PE driver commission:', error);
    res.status(500).json({ error: 'Internal Server Error. Please try again later.' });
  }
};







export const calculateExpectedOtherTripCommission = async (req, res) => {
  try {
    const { tripNumber } = req.query;

    // Fetch income for the specified tripNumber
    const income = await OtherTripIncome.findOne({ tripNumber });

    if (!income) {
      return res.status(404).json({ message: 'Income not found for the specified tripNumber' });
    }

    // Fetch expenditures for the specified tripNumber, considering "Fuel" and "Labourers Renumeration" categories
    const expenditures = await OtherTripExpenditure.find({
      tripNumber,
      category: { $in: ['Fuel', 'Labourers Renumeration'] },
    });

    // Calculate overall expenditure
    const overallExpenditure = expenditures.reduce((total, expenditure) => total + expenditure.amount, 0);

    // Calculate expected driver's commission as 15% of the difference between income and overall expenditure
    const expectedCommission = 0.15 * (income.amount - overallExpenditure);

    res.status(200).json({
      tripNumber,
      income: income.amount,
      overallExpenditure,
      expectedCommission,
    });
  } catch (error) {
    console.error('Error calculating expected driver commission:', error);
    res.status(500).json({ error: 'Internal Server Error. Please try again later.' });
  }
};
