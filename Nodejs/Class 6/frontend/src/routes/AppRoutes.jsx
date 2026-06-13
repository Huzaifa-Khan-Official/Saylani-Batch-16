import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import Login from '../pages/auth/Login';
import Dashboard from '../pages/dashboard/Dashboard';
import ProductList from '../pages/products/ProductList';
import ProductFormPage from '../pages/products/ProductFormPage';
import ProductDetails from '../pages/products/ProductDetails';
import Categories from '../pages/categories/Categories';
import Suppliers from '../pages/suppliers/Suppliers';
import SupplierDetails from '../pages/suppliers/SupplierDetails';
import Purchases from '../pages/purchases/Purchases';
import CreatePurchase from '../pages/purchases/CreatePurchase';
import Sales from '../pages/sales/Sales';
import CreateSale from '../pages/sales/CreateSale';
import InventoryOverview from '../pages/inventory/InventoryOverview';
import UserManagement from '../pages/users/UserManagement';
import Profile from '../pages/profile/Profile';
import { useInventory } from '../context/InventoryContext';

const AppRoutes = () => {
  const { currentUser } = useInventory();

  return (
    <Routes>
      {/* Auth Route */}
      <Route path="/login" element={<Login />} />

      {/* Main Dashboard Router Wrapper */}
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        
        {/* Products */}
        <Route path="products" element={<ProductList />} />
        <Route path="products/add" element={<ProductFormPage />} />
        <Route path="products/edit/:id" element={<ProductFormPage />} />
        <Route path="products/:id" element={<ProductDetails />} />

        {/* Categories */}
        <Route path="categories" element={<Categories />} />

        {/* Suppliers */}
        <Route path="suppliers" element={<Suppliers />} />
        <Route path="suppliers/:id" element={<SupplierDetails />} />

        {/* Purchases */}
        <Route path="purchases" element={<Purchases />} />
        <Route path="purchases/create" element={<CreatePurchase />} />

        {/* Sales */}
        <Route path="sales" element={<Sales />} />
        <Route path="sales/create" element={<CreateSale />} />

        {/* Inventory */}
        <Route path="inventory" element={<InventoryOverview />} />

        {/* Admin only users management */}
        <Route path="users" element={<UserManagement />} />

        {/* User Profile */}
        <Route path="profile" element={<Profile />} />
      </Route>

      {/* Fallback Catch-all redirection */}
      <Route 
        path="*" 
        element={
          currentUser 
            ? <Navigate to="/dashboard" replace /> 
            : <Navigate to="/login" replace />
        } 
      />
    </Routes>
  );
};

export default AppRoutes;
