import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  ChartBarIcon,
  CubeIcon,
  UserGroupIcon,
  Cog6ToothIcon,
  TagIcon,
  ArrowLeftOnRectangleIcon,
  BoltIcon,
} from "@heroicons/react/24/outline";

function Dashboard() {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  const menuItems = [
    { name: "Overview", icon: ChartBarIcon, path: "/admin" },
    { name: "Products", icon: CubeIcon, path: "/admin/products" },
    { name: "Categories", icon: TagIcon, path: "/admin/categories" },
    { name: "Flash Sale", icon: BoltIcon, path: "/admin/flash-sale" },
    { name: "Users", icon: UserGroupIcon, path: "/admin/users" },
    { name: "Settings", icon: Cog6ToothIcon, path: "/admin/settings" },
  ];

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-20 border-b border-gray-200">
            <Link to="/" className="flex items-center space-x-1">
              <span className="text-2xl font-extralight tracking-wider text-primary-900">
                LUXE
              </span>
              <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
                MART
              </span>
            </Link>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 p-4 space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-primary-50 hover:text-primary-600 transition-colors group"
              >
                <item.icon className="w-5 h-5 mr-3" />
                <span className="text-sm font-medium">{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* Bottom Section */}
          <div className="p-4 border-t border-gray-200">
            <button 
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-3 text-sm font-medium text-gray-700 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              <ArrowLeftOnRectangleIcon className="w-5 h-5 mr-3" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        <Outlet />
      </main>
    </div>
  );
}

export default Dashboard; 