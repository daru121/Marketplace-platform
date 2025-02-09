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
      <div className="min-h-screen pt-16">
        <div className="container mx-auto px-4 py-4 max-w-5xl">
          <div className="bg-white rounded-xl shadow-sm p-6 sm:p-16 text-center">
            <div className="mb-6">
              <div className="w-24 h-24 sm:w-32 sm:h-32 bg-primary-50 rounded-full mx-auto flex items-center justify-center mb-6">
                <ShoppingBagIcon className="w-12 h-12 sm:w-16 sm:h-16 text-primary-500" />
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">Keranjang Anda Kosong</h3>
              <p className="text-gray-500 max-w-md mx-auto text-base">
                Jelajahi koleksi produk kami dan temukan penawaran terbaik untuk Anda
              </p>
            </div>
            <Link to="/products">
              <button className="bg-primary-500 text-white py-3 px-8 rounded-xl hover:bg-primary-600 
                             transition-all duration-300 font-medium text-base inline-flex items-center gap-2">
                <ShoppingBagIcon className="w-5 h-5" />
                Mulai Belanja
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16">
      <div className="container mx-auto px-4 py-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="divide-y divide-gray-100">
                {cartItems.map((item) => (
                  <div key={item.product.id} className="p-4 hover:bg-gray-50/50">
                    <div className="flex gap-3">
                      {/* Product Image */}
                      <img
                        src={`http://localhost:5000${item.product.image_url}`}
                        alt={item.product.name}
                        className="w-20 h-20 object-cover rounded-lg border border-gray-100"
                      />

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start gap-2">
                          <div>
                            <h3 className="text-base font-medium text-gray-900 line-clamp-2">
                              {item.product.name}
                            </h3>
                            <p className="text-sm text-gray-500 mt-0.5">
                              Kategori: {item.product.category_name}
                            </p>
                            {/* Mobile Price */}
                            <p className="mt-1 text-base font-semibold text-primary-500 sm:hidden">
                              Rp {formatPrice(item.product.price * item.quantity)}
                            </p>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-gray-400 hover:text-red-500 p-1"
                          >
                            <TrashIcon className="w-5 h-5" />
                          </button>
                        </div>

                        {/* Quantity Controls */}
                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center bg-gray-50 rounded-lg border border-gray-200">
                              <button
                                onClick={() => handleQuantityChange(item, item.quantity - 1)}
                                className={`px-2 py-1 ${
                                  item.quantity <= 1 
                                    ? 'text-gray-300 cursor-not-allowed' 
                                    : 'text-gray-600'
                                }`}
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
                                className="w-12 text-center bg-transparent py-1 text-sm
                                         [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none 
                                         [&::-webkit-inner-spin-button]:appearance-none"
                              />
                              <button
                                onClick={() => handleQuantityChange(item, item.quantity + 1)}
                                className={`px-2 py-1 ${
                                  item.quantity >= item.product.stock 
                                    ? 'text-gray-300 cursor-not-allowed' 
                                    : 'text-gray-600'
                                }`}
                                disabled={item.quantity >= item.product.stock}
                              >
                                +
                              </button>
                            </div>
                            <span className={`text-xs ${
                              item.product.stock < 5 
                                ? 'text-red-500 bg-red-50 px-2 py-1 rounded-lg' 
                                : 'text-gray-500'
                            }`}>
                              Stok: {item.product.stock}
                            </span>
                          </div>
                          {/* Desktop Price */}
                          <div className="hidden sm:block text-right">
                            <p className="text-lg font-semibold text-primary-500">
                              Rp {formatPrice(item.product.price * item.quantity)}
                            </p>
                            <p className="text-sm text-gray-500">
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
            {/* Desktop Summary */}
            <div className="hidden lg:block bg-white rounded-xl shadow-sm p-4 sticky top-20">
              <h3 className="text-lg font-semibold text-gray-900 pb-4 border-b border-gray-100">
                Ringkasan Belanja
              </h3>
              <div className="mt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Total Item</span>
                  <span className="font-medium">{cartItems.length} item</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Total Harga</span>
                  <span className="font-medium">Rp {formatPrice(calculateTotal())}</span>
                </div>
                <div className="pt-4 mt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-base font-medium text-gray-900">Total Pembayaran</span>
                    <span className="text-xl font-bold text-primary-500">
                      Rp {formatPrice(calculateTotal())}
                    </span>
                  </div>
                  <button className="w-full bg-primary-500 text-white py-3 px-4 rounded-xl 
                                 hover:bg-primary-600 transition-colors text-sm font-medium">
                    Lanjutkan ke Pembayaran
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Floating Summary */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-sm text-gray-500">Total ({cartItems.length} item)</p>
                  <p className="text-lg font-bold text-primary-500">Rp {formatPrice(calculateTotal())}</p>
                </div>
                <button className="bg-primary-500 text-white py-3 px-6 rounded-xl 
                               hover:bg-primary-600 transition-colors text-sm font-medium flex-shrink-0">
                  Lanjutkan ke Pembayaran
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Add padding bottom for mobile to prevent content being hidden behind floating summary */}
        <div className="h-24 lg:hidden"></div>
      </div>
    </div>
  );
}

export default Cart; 