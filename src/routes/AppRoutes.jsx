import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import ProductsPage from '../pages/ProductsPage';
import InventoryPage from '../pages/InventoryPage';
import PageLayout from '../components/PageLayout';

function LayoutWrapper({ children }) {
  return <PageLayout>{children}</PageLayout>;
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/dashboard"
          element={
            <LayoutWrapper>
              <DashboardPage />
            </LayoutWrapper>
          }
        />

        <Route
          path="/products"
          element={
            <LayoutWrapper>
              <ProductsPage />
            </LayoutWrapper>
          }
        />

        <Route
          path="/inventory"
          element={
            <LayoutWrapper>
              <InventoryPage />
            </LayoutWrapper>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
