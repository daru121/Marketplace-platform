import React from "react";
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { TrashIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';

function Cart() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID").format(price);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity < 1) {
      newQuantity = 1;
    } else if (newQuantity > item.product.stock) {
      toast.error(
        <div className="flex items-center gap-2">
          <span className="text-red-500">⚠️</span>
          <div>
            <p className="font-medium">Jumlah melebihi stok</p>
            <p className="text-sm">Maksimal pembelian {item.product.stock} unit</p>
          </div>
        </div>
      );
      newQuantity = item.product.stock;
    }
    updateQuantity(item.product.id, newQuantity);
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-6 py-16 max-w-5xl">
        <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-16 text-center">
          <div className="mb-8">
            <div className="w-32 h-32 bg-primary-50 rounded-full mx-auto flex items-center justify-center mb-8">
              <ShoppingBagIcon className="w-16 h-16 text-primary-500" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">Keranjang Anda Kosong</h3>
            <p className="text-gray-500 max-w-md mx-auto text-lg">
              Jelajahi koleksi produk kami dan temukan penawaran terbaik untuk Anda
            </p>
          </div>
          <Link to="/products">
            <button className="bg-primary-500 text-white py-4 px-12 rounded-xl hover:bg-primary-600 
                           transition-all duration-300 transform hover:scale-105 hover:shadow-lg 
                           hover:shadow-primary-100/50 font-medium text-lg inline-flex items-center gap-3">
              <ShoppingBagIcon className="w-6 h-6" />
              Mulai Belanja
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-16 max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden">
            <div className="divide-y divide-gray-100">
              {cartItems.map((item) => (
                <div key={item.product.id} className="p-8 hover:bg-gray-50/50 transition-colors">
                  <div className="flex gap-8">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <div className="relative group">
                        <img
                          src={`http://localhost:5000${item.product.image_url}`}
                          alt={item.product.name}
                          className="w-32 h-32 object-cover rounded-xl border border-gray-100 
                                   transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/[0.01] group-hover:bg-black/[0.03] 
                                      rounded-xl transition-colors" />
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-medium text-gray-900 mb-2">
                            {item.product.name}
                          </h3>
                          <p className="text-base text-gray-500">
                            Kategori: {item.product.category_name}
                          </p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-gray-400 hover:text-red-500 transition-all duration-300 
                                   hover:scale-110 p-2"
                        >
                          <TrashIcon className="w-6 h-6" />
                        </button>
                      </div>

                      <div className="mt-6 flex items-center justify-between">
                        <div className="flex items-center gap-6">
                          <div className="flex items-center bg-gray-50 rounded-xl border border-gray-200 
                                        shadow-sm">
                            <button
                              onClick={() => handleQuantityChange(item, item.quantity - 1)}
                              className={`px-4 py-2 ${
                                item.quantity <= 1 
                                  ? 'text-gray-300 cursor-not-allowed' 
                                  : 'text-gray-600 hover:text-primary-500 hover:bg-primary-50'
                              } transition-colors text-lg font-medium`}
                              disabled={item.quantity <= 1}
                            >
                              -
                            </button>
                            <input
                              type="number"
                              min="1"
                              max={item.product.stock}
                              value={item.quantity}
                              onChange={(e) => handleQuantityChange(item, parseInt(e.target.value) || 1)}
                              className="w-20 text-center bg-transparent py-2 text-lg font-medium 
                                       focus:outline-none focus:ring-2 focus:ring-primary-500/20
                                       [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none 
                                       [&::-webkit-inner-spin-button]:appearance-none"
                            />
                            <button
                              onClick={() => handleQuantityChange(item, item.quantity + 1)}
                              className={`px-4 py-2 ${
                                item.quantity >= item.product.stock 
                                  ? 'text-gray-300 cursor-not-allowed' 
                                  : 'text-gray-600 hover:text-primary-500 hover:bg-primary-50'
                              } transition-colors text-lg font-medium`}
                              disabled={item.quantity >= item.product.stock}
                            >
                              +
                            </button>
                          </div>
                          <span className={`text-base ${
                            item.product.stock < 5 
                              ? 'text-red-500 bg-red-50 px-3 py-1.5 rounded-lg' 
                              : 'text-gray-500'
                          }`}>
                            Stok: {item.product.stock}
                          </span>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-semibold text-primary-500">
                            Rp {formatPrice(item.product.price * item.quantity)}
                          </p>
                          <p className="text-base text-gray-500 mt-1">
                            Rp {formatPrice(item.product.price)} / item
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Cart Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-8 sticky top-24">
            <h3 className="text-xl font-semibold text-gray-900 pb-6 border-b border-gray-100">
              Ringkasan Belanja
            </h3>
            <div className="mt-6 space-y-4">
              <div className="flex justify-between text-base">
                <span className="text-gray-500">Total Item</span>
                <span className="font-medium">{cartItems.length} item</span>
              </div>
              <div className="flex justify-between text-base">
                <span className="text-gray-500">Total Harga</span>
                <span className="font-medium">Rp {formatPrice(calculateTotal())}</span>
              </div>
              <div className="pt-6 mt-6 border-t border-gray-100">
                <div className="flex items-center justify-between mb-8">
                  <span className="text-lg font-medium text-gray-900">Total Pembayaran</span>
                  <span className="text-3xl font-bold text-primary-500">
                    Rp {formatPrice(calculateTotal())}
                  </span>
                </div>
                <button className="w-full bg-primary-500 text-white py-5 px-8 rounded-xl hover:bg-primary-600 
                               transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg 
                               hover:shadow-primary-100/50 text-lg font-medium">
                  Lanjutkan ke Pembayaran
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart; 