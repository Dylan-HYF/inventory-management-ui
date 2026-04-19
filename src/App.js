import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from "./pages/LoginPage";
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import { authService } from './services/authService';
import SKUListPage from './pages/SKUListPage';
import StockDetailsPage from './pages/StockDetailsPage';
import ShipmentDetailsPage from './pages/ShipmentDetailsPage';

const PrivateRoute = ({ children }) => {
  return authService.isAuthenticated() ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/skus" element={<SKUListPage />} />
        <Route path="/skus/:sku" element={<StockDetailsPage />} />
        <Route path="/shipments" element={<ShipmentDetailsPage />} />
        <Route path="/shipments/:shipmentId" element={<ShipmentDetailsPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
