import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  MagnifyingGlassIcon, 
  ShoppingBagIcon, 
  UserCircleIcon,
  Bars3Icon,
  XMarkIcon,
  ChevronRightIcon
} from "@heroicons/react/24/outline";
import CategoryDropdown from './CategoryDropdown';

function Navbar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

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
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-1 group">
              <span className="text-3xl font-extralight tracking-wider text-gray-900 group-hover:text-primary-600 transition-colors duration-300">
                LUXE
              </span>
              <span className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
                MART
              </span>
            </Link>

            {/* Navigation Links - Desktop */}
            <div className="hidden lg:flex items-center space-x-8">
              <CategoryDropdown />
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="text-sm font-medium text-gray-700 hover:text-primary-600 relative group py-2"
                >
                  <span className="relative z-10">{item.name}</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600/20 group-hover:w-full transition-all duration-300"></span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 group-hover:w-full transition-all duration-500 delay-100"></span>
                </Link>
              ))}
            </div>

            {/* Search Bar - Desktop */}
            <div className="hidden md:block flex-1 max-w-md mx-8">
              <form onSubmit={handleSearch} className="relative group">
                <input
                  type="text"
                  placeholder="Search for products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50/50 
                           focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500
                           group-hover:bg-white group-hover:border-primary-300 transition-all duration-300"
                />
                <button 
                  type="submit"
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 
                           hover:text-primary-600 rounded-md hover:bg-primary-50 transition-all duration-300"
                >
                  <MagnifyingGlassIcon className="h-5 w-5" />
                </button>
              </form>
            </div>

            {/* Right Icons */}
            <div className="flex items-center space-x-1 md:space-x-4">
              {/* Cart */}
              <Link 
                to="/cart" 
                className="relative p-2 text-gray-700 hover:text-primary-600 rounded-lg hover:bg-gray-50 transition-all duration-300 group"
              >
                <ShoppingBagIcon className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs font-bold 
                               rounded-full h-5 w-5 flex items-center justify-center border-2 border-white
                               group-hover:scale-110 transition-transform duration-300">
                  0
                </span>
              </Link>

              {/* Account */}
              <Link 
                to="/login"
                className="hidden md:flex items-center space-x-2 px-4 py-2 rounded-lg
                         text-gray-700 hover:text-primary-600 border border-gray-200
                         hover:border-primary-300 hover:bg-primary-50/50 transition-all duration-300"
              >
                <UserCircleIcon className="h-5 w-5" />
                <span className="text-sm font-medium">Account</span>
              </Link>

              {/* Mobile Menu Button */}
              <button 
                onClick={() => setIsOpen(true)}
                className="lg:hidden p-2 text-gray-700 hover:text-primary-600 rounded-lg hover:bg-gray-50 transition-all duration-300"
              >
                <Bars3Icon className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div 
        className={`fixed inset-0 z-50 lg:hidden ${isOpen ? '' : 'pointer-events-none'}`}
      >
        {/* Backdrop with blur effect */}
        <div 
          className={`absolute inset-0 bg-black/20 backdrop-blur-sm transition-all duration-500
                      ${isOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={closeSidebar}
        />

        {/* Sidebar Content */}
        <div
          onClick={(e) => e.stopPropagation()}
          className={`absolute right-0 top-0 h-full w-[300px] bg-white/95 backdrop-blur-sm
                      transform transition-all duration-500 ease-out shadow-[0_0_40px_rgba(0,0,0,0.1)]
                      ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          {/* Sidebar Header with Logo */}
          <div className="flex items-center justify-between p-5 border-b border-gray-100">
            <Link to="/" onClick={closeSidebar} className="flex items-center space-x-1">
              <span className="text-2xl font-extralight tracking-wider text-gray-900">
                LUXE
              </span>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
                MART
              </span>
            </Link>
            <button
              onClick={closeSidebar}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-full 
                       hover:bg-gray-100/80 transition-all duration-300 
                       active:scale-90 hover:rotate-90"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          {/* Search Bar */}
          <div className="p-5">
            <form onSubmit={handleSearch} className="relative group">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 
                         rounded-xl focus:ring-2 focus:ring-primary-500/20 
                         focus:border-primary-500 transition-all duration-300 
                         placeholder:text-gray-400 group-hover:bg-white"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2
                         text-gray-400 hover:text-primary-600 rounded-lg
                         hover:bg-primary-50 transition-all duration-300"
              >
                <MagnifyingGlassIcon className="h-5 w-5" />
              </button>
            </form>
          </div>

          {/* Navigation Menu */}
          <nav className="px-5 py-2">
            {menuItems.map((item, index) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={closeSidebar}
                className="flex items-center justify-between px-4 py-3.5 
                         text-gray-700 rounded-xl group transition-all 
                         duration-300 relative overflow-hidden"
                style={{
                  transform: isOpen ? 'translateX(0)' : 'translateX(50px)',
                  opacity: isOpen ? 1 : 0,
                  transitionDelay: `${index * 100 + 200}ms`
                }}
              >
                <span className="text-sm font-medium relative z-10 
                              group-hover:text-primary-600 transition-colors duration-300">
                  {item.name}
                </span>
                <ChevronRightIcon 
                  className="h-5 w-5 text-gray-400 group-hover:text-primary-600
                           transform group-hover:translate-x-1 transition-all duration-300" 
                />
                <div className="absolute inset-0 bg-gradient-to-r from-primary-50/50 
                              to-transparent opacity-0 group-hover:opacity-100 
                              transition-opacity duration-300" 
                />
              </Link>
            ))}
          </nav>


          {/* Bottom Section */}
          <div className="absolute bottom-0 left-0 right-0 p-5 border-t border-gray-100"
               style={{
                 transform: isOpen ? 'translateY(0)' : 'translateY(50px)',
                 opacity: isOpen ? 1 : 0,
                 transition: 'all 0.5s ease-out',
                 transitionDelay: '500ms'
               }}>
            <Link
              to="/login"
              onClick={closeSidebar}
              className="flex items-center justify-center w-full px-6 py-3.5
                       text-white bg-gradient-to-r from-primary-600 to-primary-500
                       rounded-xl hover:from-primary-700 hover:to-primary-600
                       transform hover:-translate-y-0.5 active:translate-y-0
                       transition-all duration-300 shadow-lg hover:shadow-xl
                       hover:shadow-primary-500/20"
            >
              <UserCircleIcon className="h-5 w-5 mr-2" />
              <span className="text-sm font-medium">Login / Register</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar; 