import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignIn';
import CreateAccount from './pages/CreateAccount';

import Home from './pages/Home';
import Header from './components/Header';
import SignOut from './pages/SignOut';

import PrivateRoute from './components/PrivateRoute';
import Dashboard from './pages/DashBoard';
import RegisterVehicle from './pages/RegisterVehicle';
import FleetManagement from './pages/FleetManagement';
import BusinessSettings from './pages/BusinessSettings';
import RegisterDriver from './pages/RegisterDriver';
import IncomeCategory from './pages/IncomeCategory';
import PE from './pages/PE';
import ExpenseCategory from './pages/ExpenseCategory';
import OtherTrips from './pages/OtherTrips';
import RecordPEexpenditure from './pages/PEexpenditure';
import OTExpenditure from './pages/OTExpenditure';
import GeneralExpenditure from './pages/GeneralExpenditure';
import Reports from './pages/Reports';
import PEReport from './pages/PEReport';
import OTReport from './pages/OTReport';
import AllIncomeReport from './pages/AllincomeReport';
import PEIncomeReport from './pages/PEincomeReport';
import OTincomeReport from './pages/OTincomeReport';
import Expenditure from './pages/Expenditure';
import ExpenditureReports from './pages/ExpenditureReports';
import FuelPEReport from './pages/FuelPEReport';
import MaintenanceReport from './pages/MaintenanceReport';
import AllExpenseReport from './pages/AllExpenseReport';
import OTExpenseReport from './pages/OTExpenseReport';
import UpdatePaymentStatus from './pages/UpdatePayment';
import PEIncomeAndExpenditureReport from './pages/PEIncomeAndExpenditure';
import AllPEIncomeAndExpenditureReport from './pages/AllPEIncomeAndExpenditureReport';
import OTIncomeAndExpenditureReport from './pages/OTIncomeAndExpenditureReport';
import AllOTIncomeAndExpenditureReport from './pages/AllOTIncomeAndExpenditureReport';
import UpdateUser from './pages/UpdateUserAccount';
import GeneralExpenditureReport from './pages/GeneralExpenditureReport';
import ExpenseReportDashboard from './pages/ExpenseReportDashboard';
import IncomeReportDashboard from './pages/IncomeReportsDashboard';





export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/create-account' element={<CreateAccount />} />
        <Route path='/sign-out' element={<SignOut />} />
     
        <Route element={<PrivateRoute />}>
        <Route path='/' element={<Home />} />
        <Route path='/update-profile' element={<UpdateUser />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/register-vehicle' element={<RegisterVehicle />} />
        <Route path='/fleet-management' element={<FleetManagement />} />
        <Route path='/business-settings' element={<BusinessSettings />} />
        <Route path='/register-driver' element={<RegisterDriver />} />
        <Route path='/income-category' element={<IncomeCategory />} />
        <Route path='/pe' element={<PE/>} />
        <Route path='/expense-category' element={<ExpenseCategory/>} />
        <Route path='/other-trips' element={<OtherTrips/>} />
        <Route path='/pe-expense' element={<RecordPEexpenditure/>} />
        <Route path='/ot-expense' element={<OTExpenditure/>} />
        <Route path='/general-expense' element={<GeneralExpenditure/>} />
        <Route path='/reports' element={<Reports/>} />
        <Route path='/pe-reports' element={<PEReport/>} />
        <Route path='/ot-reports' element={<OTReport/>} />
        <Route path='/all-income-reports' element={<AllIncomeReport/>} />
        <Route path='/ot-income-reports' element={<OTincomeReport/>} />
        <Route path='/pe-income-reports' element={<PEIncomeReport/>} />
        <Route path='/expenditure' element={<Expenditure/>} />
        <Route path='/expenditure-reports' element={<ExpenditureReports/>} />
        <Route path='/pe-fuel-reports' element={<FuelPEReport/>} />
        <Route path='/maintenance-reports' element={<MaintenanceReport/>} />
        <Route path='/all-expense-reports' element={<AllExpenseReport/>} />
        <Route path='/ot-expense-reports' element={<OTExpenseReport/>} />
        <Route path='/update-payment-status' element={<UpdatePaymentStatus/>} />
        <Route path='/pe-income-expenditure' element={<PEIncomeAndExpenditureReport/>} />
        <Route path='/all-pe-income-expenditure' element={<AllPEIncomeAndExpenditureReport/>} />
        <Route path='/ot-income-expenditure' element={<OTIncomeAndExpenditureReport/>} />
        <Route path='/all-ot-income-expenditure' element={<AllOTIncomeAndExpenditureReport/>} />
        <Route path='/all-general-expenditure' element={<GeneralExpenditureReport/>} />
        <Route path='/all-expenditure-dashboard' element={<ExpenseReportDashboard/>} />
        <Route path='/all-income-dashboard' element={<IncomeReportDashboard/>} />
        
        
       
        
        </Route>
      </Routes>
    </BrowserRouter>
  );
}