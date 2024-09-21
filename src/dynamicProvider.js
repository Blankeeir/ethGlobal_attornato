// src/DynamicProvider.js
import React from 'react';
import { DynamicContextProvider } from '@dynamic-labs/sdk-react-core';

const DynamicProvider = ({ children }) => {
  return (
    <DynamicContextProvider
      settings={{
        appLogoUrl: 'https://your-app-logo-url.com/logo.png',
        environmentId: 'YOUR_ENVIRONMENT_ID',
      }}
    >
      {children}
    </DynamicContextProvider>
  );
};

export default DynamicProvider;
