import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignIn';
import CreateAccount from './pages/CreateAccount';
import Profile from './pages/Profile';
import Home from './pages/Home';
import Header from './components/Header';

export default function App() {
  return (
    
    <BrowserRouter>
      <Header/>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/sign-in' element={<SignIn />} />
      <Route path='/create-account' element={<CreateAccount />} />
      <Route path='/profile' element={<Profile />} />
    </Routes>
  </BrowserRouter>
  )
}