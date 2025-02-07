import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

function Layout() {
  const { getTotalItems } = useCart();

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex-grow w-full">
        <div className="max-w-[1440px] mx-auto bg-white">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Layout; 