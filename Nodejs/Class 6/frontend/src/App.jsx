import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { InventoryProvider } from './context/InventoryContext';
import AppRoutes from './routes/AppRoutes';
import './App.css';

function App() {
  return (
    <InventoryProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </InventoryProvider>
  );
}

export default App;
