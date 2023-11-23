import ExpenditureCategory from '../models/expenditureCategory.model.js';

const createExpenditureCategory = async (req, res) => {
  try {
    const { name, description, recordedBy } = req.body;
    const expenditureCategory = new ExpenditureCategory({ name, description, recordedBy });
    await expenditureCategory.save();
    res.status(201).json(expenditureCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export { createExpenditureCategory };


const getExpenditureCategories = async (req, res) => {
    try {
      const expenditureCategories = await ExpenditureCategory.find();
      res.status(200).json(expenditureCategories);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  };
  
  export { getExpenditureCategories };