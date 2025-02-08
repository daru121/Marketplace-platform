import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ShieldCheckIcon, TruckIcon, ArrowPathIcon, HeartIcon, ShareIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isWishlist, setIsWishlist] = useState(false);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProductDetail();
  }, [id]);

  const fetchProductDetail = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/api/products/${id}`);
      if (!response.ok) {
        throw new Error('Product not found');
      }
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    if (!price || isNaN(price)) return '0';
    return new Intl.NumberFormat("id-ID").format(price);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.custom((t) => (
      <div className={`${
        t.visible ? 'animate-enter' : 'animate-leave'
      } w-full max-w-md bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-xl pointer-events-auto flex overflow-hidden`}>
        <div className="flex-1 p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 pt-0.5">
              <img
                className="h-14 w-14 rounded-lg object-cover border border-gray-100"
                src={`http://localhost:5000${product.image_url}`}
                alt={product.name}
              />
            </div>
            <div className="ml-4 flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    Berhasil ditambahkan ke keranjang
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 line-clamp-1">
                    {product.name}
                  </p>
                </div>
                <div className="ml-4 flex flex-shrink-0">
                  <button
                    onClick={() => toast.dismiss(t.id)}
                    className="inline-flex text-gray-400 hover:text-gray-500"
                  >
                    <span className="sr-only">Close</span>
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <p className="text-sm font-medium text-primary-500">
                  {quantity} item • Rp {formatPrice(product.price * quantity)}
                </p>
                <button
                  onClick={() => {
                    toast.dismiss(t.id);
                    navigate('/cart');
                  }}
                  className="text-sm font-medium text-primary-600 hover:text-primary-500 flex items-center gap-1"
                >
                  Lihat Keranjang
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    ), { duration: 4000 });
  };

  const showStockWarning = () => {
    toast.custom((t) => (
      <div className={`${
        t.visible ? 'animate-enter' : 'animate-leave'
      } w-full max-w-md bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-xl pointer-events-auto overflow-hidden`}>
        <div className="p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
                <svg className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
            </div>
            <div className="ml-4 flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    Jumlah melebihi stok
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Maksimal pembelian {product.stock} unit
                  </p>
                </div>
                <div className="ml-4 flex flex-shrink-0">
                  <button
                    onClick={() => toast.dismiss(t.id)}
                    className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none"
                  >
                    <span className="sr-only">Close</span>
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="mt-3">
                <button
                  onClick={() => toast.dismiss(t.id)}
                  className="w-full inline-flex justify-center items-center px-3 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none transition-colors"
                >
                  Mengerti
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    ), { duration: 5000 });
  };

  const handleQuantityChange = (e) => {
    const val = parseInt(e.target.value);
    if (!isNaN(val)) {
      if (val < 1) {
        setQuantity(1);
      } else if (val > product.stock) {
        setQuantity(product.stock);
        showStockWarning();
      } else {
        setQuantity(val);
      }
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Produk tidak ditemukan</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 sm:px-4 py-4 sm:py-8">
        {/* Breadcrumb */}
        <div className="mb-4 sm:mb-6 flex items-center text-sm text-gray-500 overflow-x-auto whitespace-nowrap">
          <span className="hover:text-primary-500 cursor-pointer">Home</span>
          <span className="mx-2">•</span>
          <span className="hover:text-primary-500 cursor-pointer">{product.category_name}</span>
          <span className="mx-2">•</span>
          <span className="text-gray-900 truncate">{product.name}</span>
        </div>

        <div className="bg-white rounded-2xl shadow-lg shadow-gray-100/50 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 p-4 sm:p-8">
            {/* Image Section */}
            <div className="space-y-4 sm:space-y-6">
              <div className="aspect-square rounded-xl sm:rounded-2xl overflow-hidden border border-gray-100 bg-gray-50 group">
                <img
                  src={`http://localhost:5000${product.image_url}`}
                  alt={product.name}
                  className="w-full h-full object-contain p-2 sm:p-4 transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>

            {/* Product Info Section */}
            <div className="space-y-4 sm:space-y-6">
              <div className="pb-4 sm:pb-6 border-b border-gray-100">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
                <p className="text-sm text-gray-500">Kategori: {product.category_name}</p>
              </div>

              {/* Price Section */}
              <div className="space-y-3 sm:space-y-4">
                {product.flash_sale ? (
                  <>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <span className="text-3xl sm:text-4xl font-bold text-primary-500">
                        Rp {formatPrice(product.price)}
                      </span>
                      <div className="px-2 sm:px-3 py-1 bg-red-100 text-red-600 rounded-full text-xs sm:text-sm font-semibold">
                        -{product.discount_percentage}%
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-gray-400 line-through">
                        Rp {formatPrice(product.original_price)}
                      </span>
                      <div className="px-3 py-1.5 bg-red-50 rounded-lg flex items-center gap-2">
                        <span className="text-red-600 font-medium">Flash Sale</span>
                        <div className="w-1 h-1 bg-red-300 rounded-full"></div>
                        <span className="text-sm text-red-500">Berakhir dalam 2 hari</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-3xl sm:text-4xl font-bold text-primary-500">
                    Rp {formatPrice(product.price)}
                  </div>
                )}
              </div>

              {/* Features Cards */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-4 sm:mt-6">
                <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-3 px-2 sm:px-4 py-2 sm:py-3 bg-gray-50 rounded-xl hover:bg-green-50 transition-colors duration-300 group">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:bg-green-100 transition-colors duration-300">
                    <ShieldCheckIcon className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-gray-600 group-hover:text-green-600 text-center sm:text-left">Garansi Resmi</span>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-3 px-2 sm:px-4 py-2 sm:py-3 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors duration-300 group">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:bg-blue-100 transition-colors duration-300">
                    <TruckIcon className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-gray-600 group-hover:text-blue-600 text-center sm:text-left">Pengiriman Cepat</span>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-3 px-2 sm:px-4 py-2 sm:py-3 bg-gray-50 rounded-xl hover:bg-orange-50 transition-colors duration-300 group">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:bg-orange-100 transition-colors duration-300">
                    <ArrowPathIcon className="h-4 w-4 sm:h-5 sm:w-5 text-orange-500" />
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-gray-600 group-hover:text-orange-600 text-center sm:text-left">30 Hari Return</span>
                </div>
              </div>

              {/* Share & Wishlist Buttons */}
              <div className="flex gap-2 sm:gap-4 mt-4 sm:mt-6">
                <button 
                  onClick={() => setIsWishlist(!isWishlist)}
                  className={`flex-1 py-2.5 sm:py-3.5 px-3 sm:px-4 rounded-xl border ${
                    isWishlist 
                      ? 'border-red-200 bg-red-50 text-red-500' 
                      : 'border-gray-200 hover:border-red-200 hover:bg-red-50 hover:text-red-500'
                  } transition-all duration-300 flex items-center justify-center gap-1 sm:gap-2 hover:shadow-sm`}
                >
                  {isWishlist ? <HeartIconSolid className="h-4 w-4 sm:h-5 sm:w-5" /> : <HeartIcon className="h-4 w-4 sm:h-5 sm:w-5" />}
                  <span className="text-sm sm:text-base font-medium">Wishlist</span>
                </button>
                <button className="flex-1 py-2.5 sm:py-3.5 px-3 sm:px-4 rounded-xl border border-gray-200 hover:border-primary-200 hover:bg-primary-50 hover:text-primary-500 transition-all duration-300 flex items-center justify-center gap-1 sm:gap-2 hover:shadow-sm">
                  <ShareIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="text-sm sm:text-base font-medium">Bagikan</span>
                </button>
              </div>

              {/* Quantity Section */}
              <div className="py-4 sm:py-6 border-y border-gray-100">
                <div className="flex items-center justify-between">
                  <span className="text-sm sm:text-base text-gray-700 font-medium">Jumlah</span>
                  <div className="flex items-center gap-2 sm:gap-4">
                    <div className="flex items-center bg-gray-50 rounded-lg border border-gray-200">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setQuantity(Math.max(1, quantity - 1));
                        }}
                        className={`px-4 py-2 ${
                          quantity <= 1 
                            ? 'text-gray-300 cursor-not-allowed' 
                            : 'text-gray-600 hover:text-primary-500'
                        } transition-colors`}
                        disabled={quantity <= 1}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min="1"
                        max={product.stock}
                        value={quantity}
                        onChange={handleQuantityChange}
                        className="w-16 text-center bg-transparent py-2 focus:outline-none [appearance:textfield] 
                                 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          if (quantity < product.stock) {
                            setQuantity(quantity + 1);
                          } else {
                            showStockWarning();
                          }
                        }}
                        className={`px-4 py-2 ${
                          quantity >= product.stock 
                            ? 'text-gray-300 cursor-not-allowed' 
                            : 'text-gray-600 hover:text-primary-500'
                        } transition-colors`}
                        disabled={quantity >= product.stock}
                      >
                        +
                      </button>
                    </div>
                    <span className={`text-xs sm:text-sm ${product.stock < 5 ? 'text-red-500' : 'text-gray-500'}`}>
                      Stok: {product.stock}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 sm:gap-4">
                <button 
                  onClick={() => {
                    addToCart(product, quantity);
                    navigate('/cart');
                  }}
                  className="flex-1 bg-primary-500 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-xl hover:bg-primary-600 
                            transition-all duration-300 transform hover:shadow-lg hover:shadow-primary-100 font-semibold text-sm sm:text-base">
                  Beli Sekarang
                </button>
                <button 
                  onClick={handleAddToCart}
                  className="flex-1 bg-primary-50 text-primary-500 py-3 sm:py-4 px-4 sm:px-6 rounded-xl hover:bg-primary-100 
                            transition-all duration-300 font-semibold hover:shadow-md text-sm sm:text-base flex items-center justify-center gap-2"
                >
                  <ShoppingCartIcon className="h-5 w-5" />
                  <span>Keranjang</span>
                </button>
              </div>

              {/* Description */}
              <div className="pt-4 sm:pt-6">
                <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-4">Deskripsi Produk</h2>
                <div className="prose prose-gray max-w-none">
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    {product.description || 'Tidak ada deskripsi produk'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail; 