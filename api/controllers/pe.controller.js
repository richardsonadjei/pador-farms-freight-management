import CocoaHaulage from '../models/pe.model.js';
import IncomeHauling from '../models/pe.income.model.js';

const createCocoaHaulage = async (req, res) => {
  try {
    const {
      date,
      truckRegistrationNumber,
      driverName,
      quantity,
      totalweightCarried,
      destinationLocations,
      recordedBy,
      incomeAmountPerBag,
      category,
      description,
    } = req.body;

    // Calculate totalIncomeAmount and totalTaxAmount
    const totalIncomeAmount = incomeAmountPerBag * quantity;
    const taxAmountPerBag = incomeAmountPerBag * 0.1;
    const totalTaxAmount = taxAmountPerBag * quantity;

    // Calculate netTotalAmountPerbag and netTotalAmount
    const netTotalAmountPerbag = incomeAmountPerBag - taxAmountPerBag;
    const netTotalAmount = netTotalAmountPerbag * quantity;

    // Create new CocoaHaulage instance
    const cocoaHaulage = new CocoaHaulage({
      date,
      truckRegistrationNumber,
      driverName,
      quantity,
      totalweightCarried,
      destinationLocations,
      recordedBy,
    });

    // Save new CocoaHaulage instance
    await cocoaHaulage.save();

    // Create new IncomeHauling instance with default description
    const defaultDescription = `Income from hauling ${quantity} bags of cocoa.`;
    const incomeHauling = new IncomeHauling({
      date,
      category,
      truckRegistrationNumber,
      incomeAmountPerBag,
      totalIncomeAmount,
      taxAmountPerBag,
      totalTaxAmount,
      netTotalAmountPerbag,
      netTotalAmount,
      description: description || defaultDescription,
      peNumber: cocoaHaulage.peNumber, 
      recordedBy,
    });

    // Save new IncomeHauling instance
    await incomeHauling.save();

    res.status(201).json({ cocoaHaulage, incomeHauling });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export { createCocoaHaulage };




const viewAllPEs = async (req, res) => {
  try {
    // Retrieve all CocoaHaulage records
    const allPEs = await CocoaHaulage.find();

    res.status(200).json(allPEs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export { viewAllPEs };

const viewPEsByDateRange = async (req, res) => {
  try {
    // Destructure startDate and endDate from the request body
    const { startDate, endDate } = req.body;

    // Parse startDate and endDate strings into Date objects in UTC format
    const parsedStartDate = new Date(startDate + 'T00:00:00Z'); // Assuming startDate is in YYYY-MM-DD format
    const parsedEndDate = new Date(endDate + 'T23:59:59.999Z'); // Assuming endDate is in YYYY-MM-DD format

    // Retrieve all CocoaHaulage records within the specified date range
    const PEsWithinDateRange = await CocoaHaulage.find({
      date: {
        $gte: parsedStartDate,
        $lte: parsedEndDate,
      },
    });

    res.status(200).json(PEsWithinDateRange);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export { viewPEsByDateRange };
