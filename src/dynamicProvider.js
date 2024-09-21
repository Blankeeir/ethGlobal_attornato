// src/DynamicProvider.js
import React from 'react';
import { DynamicContextProvider } from '@dynamic-labs/sdk-react-core';

const DynamicProvider = ({ children }) => {
  return (
    <DynamicContextProvider
      settings={{
        appLogoUrl: 'https://your-app-logo-url.com/logo.png', // Replace with your logo URL
        environmentId: 'YOUR_ENVIRONMENT_ID', // Replace with your actual environment ID
      }}
    >
      {children}
    </DynamicContextProvider>
  );
};

export default DynamicProvider;
