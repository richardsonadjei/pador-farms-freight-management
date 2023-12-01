import DriverCommission from '../models/driversCommission.model.js';

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

// Controller to update a specific driver's commission by ID
export const updateDriverCommissionById = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedDriverCommission = await DriverCommission.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    if (!updatedDriverCommission) {
      return res.status(404).json({ message: 'Driver commission not found' });
    }

    res.status(200).json({ driverCommission: updatedDriverCommission });
  } catch (error) {
    console.error('Error updating driver commission by ID:', error);
    res.status(500).json({ error: 'Internal Server Error. Please try again later.' });
  }
};

// Controller to delete a specific driver's commission by ID
export const deleteDriverCommissionById = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedDriverCommission = await DriverCommission.findByIdAndDelete(id);

    if (!deletedDriverCommission) {
      return res.status(404).json({ message: 'Driver commission not found' });
    }

    res.status(200).json({ message: 'Driver commission deleted successfully' });
  } catch (error) {
    console.error('Error deleting driver commission by ID:', error);
    res.status(500).json({ error: 'Internal Server Error. Please try again later.' });
  }
};
