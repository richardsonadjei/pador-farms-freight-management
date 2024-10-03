// Import necessary modules
import express from 'express';
const userRouter = express.Router();

// Import controllers
import { createEmployee, deleteEmployee, deleteUser, getAllEmployees, getAllUsers, getEmployeeById, signin, signout, signup, updateEmployee, updateUser, updateUsernamePassword } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

// Define routes
userRouter.post('/signup', signup);
userRouter.post('/signin', signin);
userRouter.post('/signout', signout);
userRouter.get('/users', getAllUsers);
// Route to update a specific user
userRouter.put('/users/:id', updateUser);

// Route to delete a specific user
userRouter.delete('/users/:id', deleteUser);
// PUT update username and password (authenticated)
userRouter.put('/update-username-password', verifyToken, updateUsernamePassword);





// CREATE a new employee
userRouter.post('/employee', createEmployee);

// READ all employees
userRouter.get('/employee', getAllEmployees);

// READ a specific employee by ID
userRouter.get('/employee/:id', getEmployeeById);

// UPDATE an employee by ID
userRouter.put('/employee/:id', updateEmployee);

// DELETE an employee by ID
userRouter.delete('/employee/:id', deleteEmployee);




// Export the router
export default userRouter;
