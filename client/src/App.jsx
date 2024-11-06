import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignOut from './pages/SignOut';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Header from './components/Header';
import Profile from './pages/Profile';
import PrivateRoute from './components/PrivateRoute';

import AllEmployeesReport from './pages/HumanResource/EmployeeList';
import AllPayrollsReport from './pages/HumanResource/PayRoll';
import VehicleList from './pages/extras/Vehicle/RegisterVehicle/AllVehicles';
import ReportHome from './pages/AllReports/Home';
import AllIncomeReport from './pages/AllReports/incomeReports/AllIncomeReport';
import IncomeByPeriod from './pages/AllReports/incomeReports/IncomeByPeriod';
import AllExpenseReport from './pages/AllReports/expenseReports/AllExpenseReport';
import ExpenseByPeriod from './pages/AllReports/expenseReports/ExpenseByPeriod';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-out' element={<SignOut />} />
        <Route element={<PrivateRoute />}>
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/' element={<Home />} />
          <Route path='/reports' element={<ReportHome />} />
          <Route path='/all-vehicle-income' element={<AllIncomeReport />} />
          <Route path='/all-vehicle-income-by-period' element={<IncomeByPeriod />} />
          <Route path='/all-vehicle-expense' element={<AllExpenseReport />} />
          <Route path='/all-vehicle-expense-by-period' element={<ExpenseByPeriod />} />
          <Route path='/employee-list' element={<AllEmployeesReport />} />
          <Route path='/payrolls' element={<AllPayrollsReport />} />
          <Route path='/vehicle-list' element={<VehicleList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
