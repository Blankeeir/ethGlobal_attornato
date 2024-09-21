// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Updated for React Router v6
import LandingPage from './components/LandingPage.js'; // Corrected path
import Dashboard from './components/Dashboard.js';
import Marketplace from './components/MarketPlace.js';
import SellAsset from './components/SellAsset.js';
import AssetDetails from './components/AssetDetails.js'; // If you have this component
// import Attest from './components/Attest'; // If you have this component

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/marketplace" element={<Marketplace />} />
      <Route path="/sell" element={<SellAsset />} />
      <Route path="/asset/:id" element={<AssetDetails />} />
      {/* <Route path="/attest/:id" element={<Attest />} /> */}
    </Routes>
  );
};

export default App;
