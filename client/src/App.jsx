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
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/register-vehicle' element={<RegisterVehicle />} />
        <Route path='/fleet-management' element={<FleetManagement />} />
        <Route path='/business-settings' element={<BusinessSettings />} />
        <Route path='/register-driver' element={<RegisterDriver />} />
        <Route path='/income-category' element={<IncomeCategory />} />
        <Route path='/pe' element={<PE/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}