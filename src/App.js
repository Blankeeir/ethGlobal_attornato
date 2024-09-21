// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Updated for React Router v6
import LandingPage from 'components/LandingPage'; // Corrected path
import Dashboard from 'components/Dashboard';
import Marketplace from 'components/Marketplace';
import SellAsset from 'components/SellAsset';
import AssetDetails from 'components/AssetDetails'; // If you have this component
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
