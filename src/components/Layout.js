import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50/50 via-white to-gray-50/50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100/50 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-50/30 to-transparent"></div>
          <div className="relative p-6">
            <Outlet />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Layout; 