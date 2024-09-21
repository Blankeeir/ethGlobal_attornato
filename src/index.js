// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import DynamicProvider from './dynamicProvider';

ReactDOM.render(
  <React.StrictMode>
    <DynamicProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </DynamicProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
