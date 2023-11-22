import Driver from '../models/driver.model.js';

// Controller to create a new driver
export const createDriver = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      licenseNumber,
      dateOfBirth,
      contactNumber,
      email,
      town,
      city,
      region,
      ghanaCardId,
      witnessName,
      witnessContact,
      registeredBy,
    } = req.body;

    // Check if the licenseNumber already exists
    const existingDriver = await Driver.findOne({ licenseNumber });
    if (existingDriver) {
      return res.status(400).json({ error: 'Driver with this license number already exists.' });
    }

    // Create a new driver instance
    const newDriver = new Driver({
      firstName,
      lastName,
      licenseNumber,
      dateOfBirth,
      contactNumber,
      email,
      town,
      city,
      region,
      ghanaCardId,
      witnessName,
      witnessContact,
      registeredBy,
    });

    // Save the new driver to the database
    await newDriver.save();

    res.status(201).json({ message: 'Driver created successfully.', driver: newDriver });
  } catch (error) {
    console.error('Error creating driver:', error);
    res.status(500).json({ error: 'Internal Server Error. Please try again later.' });
  }
};

// Controller to get all drivers
export const getAllDrivers = async (req, res) => {
  try {
    const drivers = await Driver.find();
    res.status(200).json({ drivers });
  } catch (error) {
    console.error('Error getting drivers:', error);
    res.status(500).json({ error: 'Internal Server Error. Please try again later.' });
  }
};

// Controller to get a single driver by ID
export const getDriverById = async (req, res) => {
  try {
    const { id } = req.params;
    const driver = await Driver.findById(id);
    if (!driver) {
      return res.status(404).json({ error: 'Driver not found.' });
    }
    res.status(200).json({ driver });
  } catch (error) {
    console.error('Error getting driver:', error);
    res.status(500).json({ error: 'Internal Server Error. Please try again later.' });
  }
};

// Controller to update a driver by ID
export const updateDriverById = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      firstName,
      lastName,
      licenseNumber,
      dateOfBirth,
      contactNumber,
      email,
      town,
      city,
      region,
      ghanaCardId,
      witnessName,
      witnessContact,
      registeredBy,
    } = req.body;

    const updatedDriver = await Driver.findByIdAndUpdate(
      id,
      {
        firstName,
        lastName,
        licenseNumber,
        dateOfBirth,
        contactNumber,
        email,
        town,
        city,
        region,
        ghanaCardId,
        witnessName,
        witnessContact,
        registeredBy,
      },
      { new: true }
    );

    if (!updatedDriver) {
      return res.status(404).json({ error: 'Driver not found.' });
    }

    res.status(200).json({ message: 'Driver updated successfully.', driver: updatedDriver });
  } catch (error) {
    console.error('Error updating driver:', error);
    res.status(500).json({ error: 'Internal Server Error. Please try again later.' });
  }
};

// Controller to delete a driver by ID
export const deleteDriverById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedDriver = await Driver.findByIdAndDelete(id);
    if (!deletedDriver) {
      return res.status(404).json({ error: 'Driver not found.' });
    }
    res.status(200).json({ message: 'Driver deleted successfully.' });
  } catch (error) {
    console.error('Error deleting driver:', error);
    res.status(500).json({ error: 'Internal Server Error. Please try again later.' });
  }
};
