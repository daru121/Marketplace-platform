import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Brand Section */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center space-x-1">
              <span className="text-2xl font-extralight tracking-wider text-primary-900">LUXE</span>
              <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
                MART
              </span>
            </Link>
            <p className="mt-4 text-sm text-gray-600 leading-relaxed">
              Your premier destination for premium tech products. Experience luxury shopping with unmatched quality and service.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Shop</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link to="/" className="text-sm text-gray-600 hover:text-primary-500 transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-gray-600 hover:text-primary-500 transition-colors">
                  Best Sellers
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-gray-600 hover:text-primary-500 transition-colors">
                  Special Offers
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-gray-600 hover:text-primary-500 transition-colors">
                  Coming Soon
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Support</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link to="/" className="text-sm text-gray-600 hover:text-primary-500 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-gray-600 hover:text-primary-500 transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-gray-600 hover:text-primary-500 transition-colors">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-gray-600 hover:text-primary-500 transition-colors">
                  Returns
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Contact</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <p className="text-sm text-gray-600">
                  Email: support@luxemart.com
                </p>
              </li>
              <li>
                <p className="text-sm text-gray-600">
                  Phone: +1 (555) 123-4567
                </p>
              </li>
              <li>
                <p className="text-sm text-gray-600">
                  Address: 123 Luxury Lane, Tech City, TC 12345
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-100">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-xs text-gray-500">
              © 2024 LuxeMart. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link to="/" className="text-xs text-gray-500 hover:text-primary-500 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/" className="text-xs text-gray-500 hover:text-primary-500 transition-colors">
                Terms of Service
              </Link>
              <Link to="/" className="text-xs text-gray-500 hover:text-primary-500 transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer; 