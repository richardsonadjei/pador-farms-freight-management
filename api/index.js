import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRouter from './routes/auth.route.js';
import vehicleRouter from './routes/vehicle.router.js';
import driverRouter from './routes/driver.router.js';
import incomeCategoryRouter from './routes/incomeCategory.router.js';
import peRouter from './routes/pe.router.js';
import incomeRouter from './routes/income.router.js';
dotenv.config()
const app = express();


mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch((err) => {
    console.log(err);
  });

  // Middleware to parse JSON in the request body
app.use(express.json());


// Use the auth routes
app.use('/api/auth', authRouter);
app.use('/api/', vehicleRouter);
app.use('/api/', driverRouter);
app.use('/api/', incomeCategoryRouter);
app.use('/api/', peRouter);
app.use('/api', incomeRouter);


app.use((err, req, res, next) => {
  
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000!');
    }
)