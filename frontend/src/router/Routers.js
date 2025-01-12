import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Home from '../pages/Home';
import Tours from '../pages/Tours';
import TourDetails from '../pages/TourDetails';
import Login from '../pages/Login';
import Register from '../pages/Register';
import SearchResultList from '../pages/SearchResultList';
import ThankYou from '../pages/ThankYou';
import adminPanel from '../pages/adminPanel';
import { AuthContext } from '../context/AuthContext';
import AdminDashboard from '../pages/adminPanel';
import TourForm from '../pages/updateCreateTour';
const Routers = () => {
  const { user } = useContext(AuthContext); // Access user context

  return (
    <Routes>
      {/* Default redirect to home */}
      <Route path="/" element={<Navigate to="/home" />} />

      {/* Public Routes */}
      <Route path="/home" element={<Home />} />
      <Route path="/tours" element={<Tours />} />
      <Route path="/tours/:id" element={<TourDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/thank-you" element={<ThankYou />} />
      <Route path="/tours/search" element={<SearchResultList />} />
<Route path="/adminPanel" element={<AdminDashboard />} />
<Route path="/admin/tours/create" element={<TourForm />} />  
<Route path="/admin/tours/:id" element={<TourForm />} /> 
    </Routes>
  );
};

export default Routers;
