import React, { useMemo, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import SKUListPage from './pages/SKUListPage';
import StockDetailsPage from './pages/StockDetailsPage';
import ShipmentDetailsPage from './pages/ShipmentDetailsPage';
import { authService } from './services/authService';
import ColorModeContext from './context/ColorModeContext';
import { getAppTheme } from './theme';

const PrivateRoute = ({ children }) => (
  authService.isAuthenticated() ? children : <Navigate to="/login" replace />
);

const App = () => {
  const [mode, setMode] = useState(localStorage.getItem('app-mode') || 'light');

  const colorMode = useMemo(() => ({
    mode,
    toggleColorMode: () => {
      setMode((prev) => {
        const next = prev === 'light' ? 'dark' : 'light';
        localStorage.setItem('app-mode', next);
        return next;
      });
    }
  }), [mode]);

  const theme = useMemo(() => getAppTheme(mode), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/skus" element={<PrivateRoute><SKUListPage /></PrivateRoute>} />
            <Route path="/skus/:sku" element={<PrivateRoute><StockDetailsPage /></PrivateRoute>} />
            <Route path="/shipments" element={<PrivateRoute><ShipmentDetailsPage /></PrivateRoute>} />
            <Route path="/shipments/:shipmentId" element={<PrivateRoute><ShipmentDetailsPage /></PrivateRoute>} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
