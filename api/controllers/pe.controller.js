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


const updateCocoaHaulage = async (req, res) => {
  try {
    const peNumber = req.params.peNumber; // Assuming peNumber is part of the route parameters

    const {
      date,
      truckRegistrationNumber,
      driverName,
      quantity,
      totalweightCarried,
      destinationLocations,
      recordedBy,
      description,
    } = req.body;

    const incomeAmountPerBag = 9;
    const category = 'PEs Income';

    const totalIncomeAmount = incomeAmountPerBag * quantity;
    const taxAmountPerBag = incomeAmountPerBag * 0.1;
    const totalTaxAmount = taxAmountPerBag * quantity;

    const netTotalAmountPerbag = incomeAmountPerBag - taxAmountPerBag;
    const netTotalAmount = netTotalAmountPerbag * quantity;

    // Find and update the CocoaHaulage instance using peNumber
    const cocoaHaulage = await CocoaHaulage.findOneAndUpdate(
      { peNumber: peNumber },
      {
        date,
        truckRegistrationNumber,
        driverName,
        quantity,
        totalweightCarried,
        destinationLocations,
        recordedBy,
      },
      { new: true }
    );

    

    // Update corresponding IncomeHauling instance using peNumber
    const defaultDescription = `Income from hauling ${quantity} bags of cocoa.`;
    const incomeHauling = await IncomeHauling.findOneAndUpdate(
      { peNumber: peNumber }, // Use peNumber as the condition
      {
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
        recordedBy,
      },
      { new: true }
    );

   

    res.status(200).json({ cocoaHaulage, incomeHauling });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};



const deleteCocoaHaulage = async (req, res) => {
  try {
    const peNumber = req.params.peNumber; // assuming peNumber is part of the route parameters

    // Find CocoaHaulage instance by peNumber to get _id
    const cocoaHaulage = await CocoaHaulage.findOne({ peNumber });

    if (!cocoaHaulage) {
      return res.status(404).json({ message: 'CocoaHaulage not found' });
    }

    const cocoaHaulageId = cocoaHaulage._id;

    // Find and delete CocoaHaulage instance
    await CocoaHaulage.findOneAndDelete({ _id: cocoaHaulageId });

    // Find and delete corresponding IncomeHauling instance using peNumber
    await IncomeHauling.findOneAndDelete({ peNumber });

    res.status(204).end(); // No content
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

    
export { updateCocoaHaulage, deleteCocoaHaulage };
