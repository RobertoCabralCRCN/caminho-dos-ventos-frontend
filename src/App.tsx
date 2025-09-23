import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { NotificationProvider } from "./contexts/NotificationContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./pages/Home";
import ProductsPage from "./pages/Products";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import CreateOrderPage from "./pages/CreateOrder";
import TrackOrdersPage from "./pages/TrackOrders";
import AdminDashboardPage from "./pages/AdminDashboard";
import AdminProductsPage from "./pages/AdminProducts";
import AdminOrdersPage from "./pages/AdminOrders";
import AdminStockPage from "./pages/AdminStock";

function App() {
  // Registrar Service Worker para PWA
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration);
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });
    }
  }, []);

  return (
    <ThemeProvider>
      <AuthProvider>
        <NotificationProvider>
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/create-order" element={<CreateOrderPage />} />
              <Route path="/track-orders" element={<TrackOrdersPage />} />
              
              {/* Rotas Administrativas */}
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminDashboardPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/products" 
                element={
                  <ProtectedRoute requiredRole="super_admin">
                    <AdminProductsPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/orders" 
                element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminOrdersPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/stock" 
                element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminStockPage />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </Router>
        </NotificationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
