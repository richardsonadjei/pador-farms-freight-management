import bcryptjs from 'bcryptjs';

import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import { errorHandler } from '../utils/error.js';

// Function to handle user registration
export const registerUser = async (req, res, next) => {
  try {
    // Destructure user details from the request body
    const {
      name,
      userName,
      email,
      password,
      telephoneNumber,
      ghanaCardNumber,
      bank,
      bankAccountNumber,
      bankBranch,
      nextOfKinName,
      nextOfKinContact,
      nextOfKinGhanaCardNumber,
      witnessName,
      witnessContact,
      role,
      category
    } = req.body;

    // Hash the password using bcrypt
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Create a new user instance with hashed password
    const newUser = new User({
      name,
      userName,
      email,
      password: hashedPassword,
      telephoneNumber,
      ghanaCardNumber,
      bank,
      bankAccountNumber,
      bankBranch,
      nextOfKinName,
      nextOfKinContact,
      nextOfKinGhanaCardNumber,
      witnessName,
      witnessContact,
      role,
      category
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    // Return a success response
    return res.status(201).json({ success: true, user: savedUser });
  } catch (error) {
    next(error);
  }
};


export const signin = async (req, res, next) => {
  const { userNameOrEmail, password } = req.body;
  try {
    // Find user by userName or email
    const validUser = await User.findOne({
      $or: [{ userName: userNameOrEmail }, { email: userNameOrEmail }],
    });

    if (!validUser) return next(errorHandler(404, 'User not found!'));

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, 'Wrong credentials!'));

    // Include userName and category in the token payload
    const tokenPayload = {
      id: validUser._id,
      userName: validUser.userName,
      email: validUser.email,
      role: validUser.role,
      category: validUser.category, // Include category in the token payload
    };

    // Sign the token with the updated payload
    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Set the token as a cookie and include userName and category in the response
    res
      .cookie('access_token', token, { httpOnly: true })
      .status(200)
      .json({
        id: validUser._id,
        userName: validUser.userName,
        email: validUser.email,
        role: validUser.role,
        category: validUser.category, // Include category in the response
      });
  } catch (error) {
    next(error);
  }
};

export const signout = (req, res) => {
  // Clear the token cookie to sign the user out
  res.clearCookie('access_token');

  // Return a success response
  return res.status(200).json({ success: true, message: 'User signed out successfully' });
};


export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userName, password } = req.body;

    // Hash the new password if provided
    const hashedPassword = password ? await bcryptjs.hash(password, 10) : undefined;

    // Update the user's username and/or password
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        ...(userName && { userName }), // Update username if provided
        ...(hashedPassword && { password: hashedPassword }), // Update password if provided
      },
      { new: true } // Return the updated user
    );

    if (!updatedUser) {
      return next(errorHandler(404, 'User not found or could not be updated.'));
    }

    return res.status(200).json({ success: true, user: updatedUser });
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    // Fetch all users from the database
    const users = await User.find();

    // Return the list of users in the response
    return res.status(200).json({ success: true, users });
  } catch (error) {
    next(error);
  }
};