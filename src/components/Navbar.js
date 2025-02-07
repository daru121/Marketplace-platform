import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  MagnifyingGlassIcon, 
  ShoppingBagIcon, 
  UserCircleIcon,
  Bars3Icon,
  XMarkIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon
} from "@heroicons/react/24/outline";
import { useCart } from "../context/CartContext";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

function Navbar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const { getTotalItems } = useCart();

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    
    if (userStr && token) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userStr));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
    navigate("/");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
      setIsOpen(false);
    }
  };

  const menuItems = [
    { name: 'Produk', path: '/products' },
    { name: 'Tentang Kami', path: '/about' },
  ];

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <div className="fixed w-full top-0 z-50">
      {/* Main Navbar */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 shadow-xl">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-white">LUXE</span>
              <span className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">MART</span>
            </Link>

            {/* Navigation Links - Desktop */}
            <div className="hidden lg:flex items-center space-x-12">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="text-base font-medium text-gray-300 hover:text-amber-400 
                           transition-colors duration-300"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Search Bar - Desktop */}
            <div className="hidden md:block flex-1 max-w-md mx-8">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Cari produk..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-800/50 border border-gray-700 
                           text-gray-200 placeholder-gray-400
                           focus:outline-none focus:ring-2 focus:ring-amber-500/20 
                           focus:border-amber-500/50 transition-all duration-300"
                />
                <button 
                  type="submit"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 
                           hover:text-amber-400 transition-colors duration-300"
                >
                  <MagnifyingGlassIcon className="h-5 w-5" />
                </button>
              </form>
            </div>

            {/* Right Icons */}
            <div className="flex items-center space-x-6">
              {/* Cart */}
              <Link 
                to="/cart" 
                className="relative p-2 text-gray-300 hover:text-amber-400 
                         transition-colors duration-300"
              >
                <ShoppingCartIcon className="h-6 w-6" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-amber-500 text-gray-900 
                                 text-xs font-medium rounded-full h-5 w-5 flex items-center 
                                 justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </Link>

              {/* User Menu - Hidden on Mobile */}
              {isLoggedIn ? (
                <div className="relative hidden md:block">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center space-x-3 px-4 py-2 rounded-xl 
                             bg-gray-800 hover:bg-gray-700 border border-gray-700
                             transition-all duration-300"
                  >
                    <img
                      src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.fullName}`}
                      alt="Profile"
                      className="w-8 h-8 rounded-full border-2 border-amber-400/30"
                    />
                    <div className="text-left">
                      <p className="text-sm font-medium text-gray-200">{user.fullName}</p>
                    </div>
                    <ChevronDownIcon className={`h-5 w-5 text-gray-400 transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Menu */}
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-xl 
                                 shadow-2xl border border-gray-700 py-1 backdrop-blur-lg">
                      {user.role === 'admin' && (
                        <Link
                          to="/admin/dashboard"
                          className="flex items-center space-x-2 px-4 py-2.5 text-sm 
                                   text-gray-300 hover:text-amber-400 hover:bg-gray-700/50"
                        >
                          <UserCircleIcon className="h-5 w-5" />
                          <span>Dashboard Admin</span>
                        </Link>
                      )}
                      <Link
                        to="/profile"
                        className="flex items-center space-x-2 px-4 py-2.5 text-sm 
                                 text-gray-300 hover:text-amber-400 hover:bg-gray-700/50"
                      >
                        <UserCircleIcon className="h-5 w-5" />
                        <span>Profile</span>
                      </Link>
                      <Link
                        to="/settings"
                        className="flex items-center space-x-2 px-4 py-2.5 text-sm 
                                 text-gray-300 hover:text-amber-400 hover:bg-gray-700/50"
                      >
                        <Cog6ToothIcon className="h-5 w-5" />
                        <span>Settings</span>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-2 px-4 py-2.5 text-sm 
                                 text-red-600 hover:text-amber-400 hover:bg-red-700/50 w-full"
                      >
                        <ArrowRightOnRectangleIcon className="h-5 w-5" />
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link 
                  to="/login"
                  className="hidden md:flex items-center space-x-2 px-5 py-2.5 
                           text-gray-900 bg-gradient-to-r from-amber-400 to-yellow-300
                           rounded-xl hover:from-amber-500 hover:to-yellow-400
                           transform hover:-translate-y-0.5 active:translate-y-0
                           transition-all duration-300 shadow-lg hover:shadow-xl
                           hover:shadow-amber-500/20"
                >
                  <UserCircleIcon className="h-5 w-5" />
                  <span className="text-sm font-medium">Account</span>
                </Link>
              )}

              {/* Mobile Menu Button */}
              <button 
                onClick={() => setIsOpen(true)}
                className="lg:hidden p-2 text-gray-300 hover:text-amber-400 
                         transition-colors duration-300"
              >
                <Bars3Icon className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar - Diubah ke kanan */}
      <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden
                   ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={closeSidebar}
      >
        <div 
          className={`fixed inset-y-0 right-0 w-[280px] bg-gray-900 transform transition-transform duration-300 
                     ease-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
          onClick={e => e.stopPropagation()}
        >
          {/* Sidebar Header */}
          <div className="flex items-center justify-between px-4 h-16 border-b border-gray-800">
            <Link to="/" className="flex items-center space-x-2" onClick={closeSidebar}>
              <span className="text-xl font-bold text-white">LUXE</span>
              <span className="text-xl font-bold bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">
                MART
              </span>
            </Link>
            <button onClick={closeSidebar} className="p-2 text-gray-400 hover:text-white">
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          {/* Main Content Area */}
          <div className="flex-grow overflow-y-auto">
            {/* Search Bar */}
            <div className="p-4 border-b border-gray-800">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Cari produk..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl bg-gray-800 border border-gray-700 
                           text-gray-200 placeholder-gray-400 focus:outline-none"
                />
                <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <MagnifyingGlassIcon className="w-5 h-5" />
                </button>
              </form>
            </div>

            {/* User Profile Section */}
            {isLoggedIn && (
              <div className="p-4 border-b border-gray-800">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-400 to-amber-300 
                               flex items-center justify-center shadow-lg">
                    <span className="text-white text-lg font-semibold">
                      {user?.fullName?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-white font-medium">{user?.fullName}</h3>
                    <p className="text-sm text-gray-400">{user?.email}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Menu */}
            <nav className="p-4">
              <div className="space-y-2">
                <Link
                  to="/products"
                  onClick={closeSidebar}
                  className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 
                           rounded-xl group transition-colors"
                >
                  <span className="text-sm font-medium">Produk</span>
                </Link>

                <Link
                  to="/about"
                  onClick={closeSidebar}
                  className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 
                           rounded-xl group transition-colors"
                >
                  <span className="text-sm font-medium">Tentang Kami</span>
                </Link>
              </div>

              {isLoggedIn && (
                <>
                  <div className="mt-6 px-4 py-2">
                    <h4 className="text-xs font-semibold text-gray-400 uppercase">ACCOUNT</h4>
                  </div>
                  <div className="space-y-2">
                    <Link
                      to="/profile"
                      onClick={closeSidebar}
                      className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 
                               rounded-xl transition-colors"
                    >
                      <UserCircleIcon className="w-5 h-5 mr-3" />
                      <span className="text-sm font-medium">Profile</span>
                    </Link>
                    <Link
                      to="/settings"
                      onClick={closeSidebar}
                      className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 
                               rounded-xl transition-colors"
                    >
                      <Cog6ToothIcon className="w-5 h-5 mr-3" />
                      <span className="text-sm font-medium">Settings</span>
                    </Link>
                  </div>
                </>
              )}
            </nav>
          </div>

          {/* Logout Section */}
          {isLoggedIn ? (
            <div className="p-4 border-t border-gray-800 bg-gray-900/95 backdrop-blur-sm">
              <button
                onClick={() => {
                  handleLogout();
                  closeSidebar();
                }}
                className="flex items-center justify-center w-full gap-2 px-4 py-3 
                         bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-xl 
                         transition-colors duration-300"
              >
                <ArrowRightOnRectangleIcon className="w-5 h-5" />
                <span className="text-sm font-medium">Keluar dari Akun</span>
              </button>
            </div>
          ) : (
            <div className="p-4 border-t border-gray-800">
              <Link
                to="/login"
                onClick={closeSidebar}
                className="flex items-center justify-center w-full px-4 py-3 
                         bg-gradient-to-r from-amber-500 to-amber-400 
                         text-white rounded-xl hover:from-amber-600 hover:to-amber-500 
                         transition-colors duration-300"
              >
                <span className="text-sm font-medium">Login / Register</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar; 