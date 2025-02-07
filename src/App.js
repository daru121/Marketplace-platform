import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/admin/Dashboard";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminProducts from "./pages/admin/Products";
import Overview from "./pages/admin/Overview";
import Users from "./pages/admin/Users";
import Settings from "./pages/admin/Settings";
import AdminRegister from "./pages/admin/AdminRegister";
import Categories from "./pages/admin/Categories";
import CategoryPage from './pages/CategoryPage';
import SearchResults from './pages/SearchResults';
import FlashSale from './pages/admin/FlashSale';
import AboutUs from './pages/AboutUs';
import Products from './pages/Products';
import { CartProvider } from './context/CartContext';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Toaster
            position="top-center"
            reverseOrder={false}
            gutter={8}
            containerClassName="!mt-16"
            toastOptions={{
              duration: 3000,
              className: '!bg-white !shadow-[0_8px_30px_rgb(0,0,0,0.12)] !rounded-xl !p-0',
              style: {
                maxWidth: '380px',
                backgroundColor: 'white',
              }
            }}
          />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/products" element={<Products />} />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/register" element={<AdminRegister />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            >
              <Route index element={<Overview />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="categories" element={<Categories />} />
              <Route path="users" element={<Users />} />
              <Route path="settings" element={<Settings />} />
              <Route path="flash-sale" element={<FlashSale />} />
            </Route>

            <Route path="/category/:id" element={<CategoryPage />} />
            <Route path="/search" element={<SearchResults />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
