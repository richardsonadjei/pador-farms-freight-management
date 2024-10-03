import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignOut from './pages/SignOut';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Header from './components/Header';
import Profile from './pages/Profile';
import PrivateRoute from './components/PrivateRoute';
import ReportsDashboard from './pages/reports-new/FinancialReport';
import AllIncome from './pages/reports-new/allreports/AllIncomeReport';
import IncomeByPeriod from './pages/reports-new/allreports/IncomeByPeriod';
import { MotorbikeProvider } from './pages/reports-new/allreports/MotorBikeContext';
import AllExpenseReport from './pages/reports-new/allreports/expenseReports/AllExpenseReport';
import ExpenseByPeriod from './pages/reports-new/allreports/expenseReports/ExpenseByPeriod';
import AllEmployeesReport from './pages/HumanResource/EmployeeList';
import AllPayrollsReport from './pages/HumanResource/PayRoll';
import VehicleList from './pages/extras/Vehicle/RegisterVehicle/AllVehicles';


export default function App() {
  return (
    <BrowserRouter>
      <MotorbikeProvider> {/* Wrap the Routes with the MotorbikeProvider */}
        <Header />
        <Routes>
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-out' element={<SignOut />} />
          <Route element={<PrivateRoute />}>
            <Route path='/sign-up' element={<SignUp />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/' element={<Home />} />
            <Route path='/reports' element={<ReportsDashboard />} />
            <Route path='/all-bike-income' element={<AllIncome />} />
            <Route path='/all-bike-income-by-period' element={<IncomeByPeriod />} />
            <Route path='/all-bike-expense' element={<AllExpenseReport/>} />
            <Route path='/all-bike-expense-by-period' element={<ExpenseByPeriod/>} />
            <Route path='/employee-list' element={<AllEmployeesReport/>} />
            <Route path='/payrolls' element={<AllPayrollsReport/>} />
            <Route path='/vehicle-list' element={<VehicleList/>} />
          </Route>
        </Routes>
      </MotorbikeProvider>
    </BrowserRouter>
  );
}
