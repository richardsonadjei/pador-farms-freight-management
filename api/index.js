import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRouter from './routes/auth.route.js';
import vehicleRouter from './routes/vehicle.router.js';
import driverRouter from './routes/driver.router.js';
import incomeCategoryRouter from './routes/incomeCategory.router.js';
import peRouter from './routes/pe.router.js';
import incomeRouter from './routes/pe.income.router.js';
import expenseCategoryRouter from './routes/expenditureCategory.router.js';
import otRouter from './routes/ot.router.js';
import peExpenseRouter from './routes/pe.expenditure.router.js';
import otExpenseRouter from './routes/ot.expenditure.router.js';
import generalExpenseRouter from './routes/generalExpenditure.router.js';
import reportsRouter from './routes/reports.router.js';
import cookieParser from 'cookie-parser';
import path from 'path';
import dcommissionRouter from './routes/drivers.commission.router.js';

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

  const __dirname = path.resolve();

  // Middleware to parse JSON in the request body
app.use(express.json());

app.use(cookieParser());
// Use the auth routes
app.use('/api/auth', authRouter);
app.use('/api/', vehicleRouter);
app.use('/api/', driverRouter);
app.use('/api/', incomeCategoryRouter);
app.use('/api/', peRouter);
app.use('/api', incomeRouter);
app.use('/api', expenseCategoryRouter);
app.use('/api', otRouter);
app.use('/api', peExpenseRouter);
app.use('/api', otExpenseRouter);
app.use('/api', generalExpenseRouter);
app.use('/api', reportsRouter);
app.use('/api', dcommissionRouter);


app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
})


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