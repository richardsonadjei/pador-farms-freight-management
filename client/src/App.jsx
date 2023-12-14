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
import AllUsers from './pages/AllUsers';
import HumanResourceDashboard from './pages/HumanResourceDashboard';
import AllDrivers from './pages/ViewAllDrivers';
import PEDriversCommission from './pages/PEDriversCommission';
import OTDriversCommission from './pages/OTDriversCommission';
import FuelReport from './pages/FuelReport';
import PaidDriverCommissionReport from './pages/PaidDriverCommission';
import PendingPaymentDriverCommission from './pages/PendingPaymentDriverCommission';
import PEExpenseReport from './pages/PEExpenseReport';
import AllVehiclesReport from './pages/AllVehicles';
import DriversCommission from './pages/DriversCommission';
import CreatePartnerShares from './pages/CreatePartnerShares';
import PartnerShares from './pages/PartnerShares';
import SharesPaymentReportWithinAPeriod from './pages/SharesPaymentReportWithinAPeriod';
import PartnerPaymentReport from './pages/PartnerPayment';
import AllProfitReport from './pages/AllProfitReport';
import PrimaryEvacuation from './pages/PrimaryEvacuation';
import ExpectedPECommissionReport from './pages/ExpectedPECommission';
import MonthlyPECommission from './pages/MonthlyPECommission';
import ViewAllPEReport from './pages/ViewAllPEReport';
import OtherTripMain from './pages/OtherTripsMain';
import ExpectedOTCommissionReport from './pages/ExpectedOTCommission';
import AllOtherTripsWithinPeriodReport from './pages/AllOTWithinAPeriod';
import EachOTIncomeExpenseReport from './pages/EachOtherTripIncomeExpense';
import UpdateDriver from './pages/UpdateDriver';
import AllExpenseCategories from './pages/AllExpenseCategories';





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
        <Route path='/all-fuel-reports' element={<FuelReport/>} />
        <Route path='/maintenance-reports' element={<MaintenanceReport/>} />
        <Route path='/all-expense-reports' element={<AllExpenseReport/>} />
        <Route path='/ot-expense-reports' element={<OTExpenseReport/>} />
        <Route path='/pe-expense-reports' element={<PEExpenseReport/>} />
        <Route path='/update-payment-status' element={<UpdatePaymentStatus/>} />
        <Route path='/pe-income-expenditure' element={<PEIncomeAndExpenditureReport/>} />
        <Route path='/all-pe-income-expenditure' element={<AllPEIncomeAndExpenditureReport/>} />
        <Route path='/ot-income-expenditure' element={<OTIncomeAndExpenditureReport/>} />
        <Route path='/all-ot-income-expenditure' element={<AllOTIncomeAndExpenditureReport/>} />
        <Route path='/all-general-expenditure' element={<GeneralExpenditureReport/>} />
        <Route path='/all-expenditure-dashboard' element={<ExpenseReportDashboard/>} />
        <Route path='/all-income-dashboard' element={<IncomeReportDashboard/>} />
        <Route path='/all-users' element={<AllUsers/>} />
        <Route path='/human-resource' element={<HumanResourceDashboard/>} />
        <Route path='/all-drivers' element={<AllDrivers/>} />
        <Route path='/pe-drivers-commission' element={<PEDriversCommission/>} />
        <Route path='/ot-drivers-commission' element={<OTDriversCommission/>} />
        <Route path='/paid-drivers-commission' element={<PaidDriverCommissionReport/>} />
        <Route path='/pending-payment-drivers-commission' element={<PendingPaymentDriverCommission/>} />
        <Route path='/all-vehicles' element={<AllVehiclesReport/>} />
        <Route path='/drivers-commission' element={<DriversCommission/>} />
        <Route path='/partner-shares' element={<PartnerShares/>} />
        <Route path='/create-partner-shares' element={<CreatePartnerShares/>} />
        <Route path='/shares-payment-report-within-a-period' element={<SharesPaymentReportWithinAPeriod/>} />
        <Route path='/partner-payments' element={<PartnerPaymentReport/>} />
        <Route path='/all-profit' element={<AllProfitReport/>} />
        <Route path='/primary-evacuations' element={<PrimaryEvacuation/>} />
        <Route path='/expected-pe-commission' element={<ExpectedPECommissionReport/>} />
        <Route path='/monthly-pe-commission' element={<MonthlyPECommission/>} />
        <Route path='/all-pe-report' element={<ViewAllPEReport/>} />
        <Route path='/other-trip-main' element={<OtherTripMain/>} />
        <Route path='/expected other-trip-commission' element={<ExpectedOTCommissionReport/>} />
        <Route path='/all-other-trips' element={<AllOtherTripsWithinPeriodReport/>} />
        <Route path='/each-other-trips-income-expense' element={<EachOTIncomeExpenseReport/>} />
        <Route path='/update-driver/:id' element={<UpdateDriver />} />
        <Route path='/all-expense-categories' element={<AllExpenseCategories />} />
        
        
        
       
        
        </Route>
      </Routes>
    </BrowserRouter>
  );
}