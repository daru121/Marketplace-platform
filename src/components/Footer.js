import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 shadow-xl text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section - Dipindah ke paling kiri */}
          <div>
            <div className="flex items-center mb-4">
              <span className="text-2xl font-extralight tracking-wider text-white">LUXE</span>
              <span className="text-2xl font-bold tracking-tight text-amber-400">MART</span>
            </div>
            <p className="text-sm text-gray-300">
              Destinasi utama Anda untuk produk teknologi premium. Rasakan pengalaman berbelanja mewah dengan kualitas dan layanan terbaik.
            </p>
          </div>

          {/* Shop Section */}
          <div>
            <h3 className="text-amber-400 font-semibold mb-4">Produk</h3>
            <ul className="space-y-2">
              <li><a href="/new-arrivals" className="hover:text-amber-400 transition-colors">Produk Terbaru</a></li>
              <li><a href="/best-sellers" className="hover:text-amber-400 transition-colors">Produk Terlaris</a></li>
              <li><a href="/special-offers" className="hover:text-amber-400 transition-colors">Penawaran Khusus</a></li>
              <li><a href="/coming-soon" className="hover:text-amber-400 transition-colors">Segera Hadir</a></li>
            </ul>
          </div>

          {/* Support Section */}
          <div>
            <h3 className="text-amber-400 font-semibold mb-4">Bantuan</h3>
            <ul className="space-y-2">
              <li><a href="/contact" className="hover:text-amber-400 transition-colors">Hubungi Kami</a></li>
              <li><a href="/faqs" className="hover:text-amber-400 transition-colors">FAQ</a></li>
              <li><a href="/shipping" className="hover:text-amber-400 transition-colors">Info Pengiriman</a></li>
              <li><a href="/returns" className="hover:text-amber-400 transition-colors">Pengembalian</a></li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-amber-400 font-semibold mb-4">Kontak</h3>
            <ul className="space-y-2">
              <li>Email: support@luxemart.com</li>
              <li>Telepon: +1 (555) 123-4567</li>
              <li>Alamat: Jl. Luxury No. 123, Jakarta Selatan</li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              © 2024 LuxeMart. Hak cipta dilindungi.
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="/privacy" className="text-sm text-gray-400 hover:text-amber-400">Kebijakan Privasi</a>
              <a href="/terms" className="text-sm text-gray-400 hover:text-amber-400">Syarat & Ketentuan</a>
              <a href="/cookies" className="text-sm text-gray-400 hover:text-amber-400">Kebijakan Cookie</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer; 