import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path';
import userRouter from './routes/user.routes.js';
import vehicleRouter from './routes/vehicle.routes.js';
import extrasRouter from './routes/extras.routes.js';
import haulingsAndFinanceRouter from './routes/haulingsAndFinance.routes.js';


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
app.use('/api/', userRouter);
app.use('/api/', vehicleRouter);
app.use('/api/', extrasRouter);
app.use('/api/', haulingsAndFinanceRouter);



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