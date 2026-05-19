"use client";

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from '../components/landingpage';
import Login from '../components/login'; 
import Signup from '../components/signup';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing page shows first */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Login page at /login */}
        <Route path="/login" element={<Login />} />
        
        {/* Signup page at /signup */}
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}