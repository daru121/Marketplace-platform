import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

function Home() {
  const [flashSaleProducts, setFlashSaleProducts] = useState([]);
  const [regularProducts, setRegularProducts] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [flashSaleEndsIn, setFlashSaleEndsIn] = useState('');
  const [currentBanner, setCurrentBanner] = useState(0);

  const banners = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070",
      title: "Special Discount\nUp To 70%",
      description: "Get amazing deals on all products",
      buttonText: "Shop Now",
      bgColor: "from-black/30 via-black/50 to-black/80",
      position: "items-center justify-start"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=2070",
      title: "New Arrivals\nCollection",
      description: "Check out our latest products",
      buttonText: "Explore",
      bgColor: "from-black/30 via-black/50 to-black/80",
      position: "items-center justify-center"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?q=80&w=2078",
      title: "Flash Sale\nToday",
      description: "Limited time offers on selected items",
      buttonText: "View Deals",
      bgColor: "from-black/30 via-black/50 to-black/80",
      position: "items-center justify-end"
    }
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      // Fetch flash sale products
      const flashSaleRes = await fetch('http://localhost:5000/api/products/flash-sale');
      const flashSaleData = await flashSaleRes.json();
      setFlashSaleProducts(flashSaleData.filter(product => product.status === 'active'));

      // Fetch regular products
      const productsRes = await fetch('http://localhost:5000/api/products?limit=12');
      const productsData = await productsRes.json();
      
      // Filter out products that are already in flash sale
      const flashSaleIds = flashSaleData.map(product => product.id);
      const filteredRegularProducts = productsData.filter(product => 
        product.status === 'active' && !flashSaleIds.includes(product.id)
      );
      setRegularProducts(filteredRegularProducts);

      // Fetch popular products - juga filter yang sudah ada di flash sale
      const popularRes = await fetch('http://localhost:5000/api/products/popular');
      const popularData = await popularRes.json();
      const filteredPopularProducts = popularData.filter(product => 
        product.status === 'active' && !flashSaleIds.includes(product.id)
      );
      setPopularProducts(filteredPopularProducts);

      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  // Update countdown timer
  useEffect(() => {
    if (flashSaleProducts.length > 0) {
      const endTime = new Date(flashSaleProducts[0].flash_sale_end).getTime();
      
      const timer = setInterval(() => {
        const now = new Date().getTime();
        const distance = endTime - now;

        const hours = Math.floor(distance / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setFlashSaleEndsIn(`${hours}:${minutes}:${seconds}`);

        if (distance < 0) {
          clearInterval(timer);
          setFlashSaleEndsIn('EXPIRED');
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [flashSaleProducts]);

  // Auto slide banner
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextBanner = () => {
    setCurrentBanner((prev) => (prev + 1) % banners.length);
  };

  const prevBanner = () => {
    setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);
  };

  // Fungsi untuk format harga
  const formatPrice = (price) => {
    if (!price || isNaN(price)) return '0';
    return new Intl.NumberFormat("id-ID", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Fungsi untuk mendapatkan URL gambar
  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return 'https://via.placeholder.com/300x300?text=No+Image';
    if (imageUrl.startsWith('http')) return imageUrl;
    return `http://localhost:5000${imageUrl}`;
  };

  // Fungsi untuk menghitung persentase diskon
  const calculateDiscount = (originalPrice, salePrice) => {
    if (!originalPrice || !salePrice || originalPrice <= 0 || salePrice <= 0) return 0;
    const discount = ((originalPrice - salePrice) / originalPrice) * 100;
    return Math.round(discount);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen px-4 py-6 space-y-8">
      {/* Hero Banner Carousel */}
      <section className="relative rounded-2xl overflow-hidden shadow-2xl">
        <div className="relative h-[300px] md:h-[500px]">
          {banners.map((banner, index) => (
            <div
              key={banner.id}
              className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                index === currentBanner ? "opacity-100" : "opacity-0"
              }`}
            >
              {/* Banner Image dengan optimasi */}
              <img
                src={banner.image}
                alt={banner.title}
                className="absolute inset-0 w-full h-full object-cover object-center 
                         transform scale-[1.01] transition-transform duration-500"
                loading="eager"
                fetchpriority="high"
              />
              
              {/* Gradient Overlay yang lebih halus */}
              <div 
                className={`absolute inset-0 bg-gradient-to-r ${banner.bgColor} 
                           mix-blend-multiply transition-opacity duration-500`} 
              />
              
              {/* Content Container */}
              <div className="absolute inset-0 flex items-center">
                <div className="container mx-auto px-6 md:px-12">
                  <div className={`flex flex-col ${banner.position} h-full py-20`}>
                    <div className="backdrop-blur-md bg-black/20 p-12 rounded-[2.5rem] 
                                  border border-white/10 shadow-2xl max-w-xl
                                  transform transition-all duration-700 hover:scale-105
                                  hover:bg-black/30 hover:border-white/20
                                  hover:shadow-[0_0_50px_rgba(255,255,255,0.1)]">
                      {/* Title */}
                      <h1 className="text-6xl md:text-7xl font-bold text-white 
                                  tracking-tight leading-none mb-8 whitespace-pre-line
                                  [text-shadow:_0_2px_10px_rgba(0,0,0,0.3)]">
                        {banner.title}
                      </h1>

                      {/* Description */}
                      <p className="text-xl text-white/90 mb-10 leading-relaxed
                                 [text-shadow:_0_1px_5px_rgba(0,0,0,0.2)]">
                        {banner.description}
                      </p>

                      {/* Button */}
                      <button className="px-10 py-4 bg-white/95 text-gray-900 rounded-full 
                                     font-medium transition-all duration-500 
                                     hover:bg-white hover:shadow-2xl hover:shadow-white/20
                                     active:scale-95 text-lg tracking-wide
                                     border border-white/50 backdrop-blur-sm
                                     hover:tracking-wider">
                        {banner.buttonText}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Navigation Buttons */}
          <button
            onClick={prevBanner}
            className="absolute left-6 top-1/2 -translate-y-1/2 p-4 rounded-full 
                     bg-black/20 backdrop-blur-xl hover:bg-black/40 
                     transition-all duration-300 group border border-white/10
                     hover:border-white/20"
          >
            <ChevronLeftIcon className="h-7 w-7 text-white group-hover:scale-110" />
          </button>
          <button
            onClick={nextBanner}
            className="absolute right-6 top-1/2 -translate-y-1/2 p-4 rounded-full 
                     bg-black/20 backdrop-blur-xl hover:bg-black/40 
                     transition-all duration-300 group border border-white/10
                     hover:border-white/20"
          >
            <ChevronRightIcon className="h-7 w-7 text-white group-hover:scale-110" />
          </button>

          {/* Dots Navigation */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex space-x-4">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentBanner(index)}
                className={`transition-all duration-500 rounded-full 
                          ${index === currentBanner 
                            ? "w-16 h-2 bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]" 
                            : "w-2 h-2 bg-white/40 hover:bg-white/60"}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Categories - Dipindah ke sini */}
      <section className="py-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Premium Products */}
          <div className="group relative h-[180px] rounded-2xl overflow-hidden cursor-pointer
                       hover:shadow-2xl hover:shadow-violet-500/20 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500 via-violet-600 to-indigo-800" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent)]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
            
            <div className="relative h-full p-6 flex flex-col justify-between">
              <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm 
                           flex items-center justify-center border border-white/20
                           transform transition-all duration-500 
                           group-hover:scale-110 group-hover:rotate-12">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                </svg>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white mb-2 
                             tracking-wide group-hover:tracking-wider
                             transition-all duration-500">
                  Premium Products
                </h3>
                <p className="text-white/80 text-sm font-medium">
                  Discover our high-end collection
                </p>
              </div>
            </div>
          </div>

          {/* Hot Deals - dengan style yang sama */}
          <div className="group relative h-[180px] rounded-2xl overflow-hidden cursor-pointer
                       hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-400 via-orange-500 to-red-600" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent)]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
            
            <div className="relative h-full p-6 flex flex-col justify-between">
              <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm 
                           flex items-center justify-center border border-white/20
                           transform transition-all duration-500 
                           group-hover:scale-110 group-hover:rotate-12">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                        d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
                </svg>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white mb-2 
                             tracking-wide group-hover:tracking-wider
                             transition-all duration-500">
                  Hot Deals
                </h3>
                <p className="text-white/80 text-sm font-medium">
                  Best offers of the season
                </p>
              </div>
            </div>
          </div>

          {/* Best Sellers - dengan style yang sama */}
          <div className="group relative h-[180px] rounded-2xl overflow-hidden cursor-pointer
                       hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 via-emerald-500 to-teal-600" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent)]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
            
            <div className="relative h-full p-6 flex flex-col justify-between">
              <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm 
                           flex items-center justify-center border border-white/20
                           transform transition-all duration-500 
                           group-hover:scale-110 group-hover:rotate-12">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                        d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" />
                </svg>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white mb-2 
                             tracking-wide group-hover:tracking-wider
                             transition-all duration-500">
                  Best Sellers
                </h3>
                <p className="text-white/80 text-sm font-medium">
                  Most popular choices
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Flash Sale */}
      {flashSaleProducts.length > 0 && (
        <section className="bg-gradient-to-r from-rose-600 to-pink-600 rounded-xl p-4 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span>Flash Sale</span>
              <span className="bg-white/20 text-xs px-2 py-1 rounded-full">
                {flashSaleEndsIn}
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {flashSaleProducts.map((product) => (
              <Link 
                key={product.id} 
                to={`/product/${product.id}`}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-3 hover:bg-white/20 
                         transition-all duration-300 group relative overflow-hidden flex flex-col h-[280px]"
              >
                {/* Diskon Badge */}
                <div className="absolute top-2 left-2 bg-rose-500 text-white px-2 py-0.5 
                             rounded-md text-xs font-medium z-10 shadow-sm">
                  -{calculateDiscount(product.price, product.flash_sale_price)}%
                </div>
                
                {/* Product Image */}
                <div className="aspect-square rounded-lg overflow-hidden bg-black/20 w-full">
                  <img
                    src={getImageUrl(product.image_url)}
                    alt={product.name}
                    className="w-full h-full object-cover transform transition-transform duration-500 
                             group-hover:scale-110"
                  />
                </div>

                {/* Product Info Container */}
                <div className="flex flex-col justify-between h-[88px] mt-3">
                  {/* Nama Produk dengan fixed height */}
                  <div className="h-[20px]">
                    <h3 className="text-sm font-medium text-white line-clamp-1">
                      {product.name}
                    </h3>
                  </div>

                  {/* Price Section */}
                  <div>
                    <div className="text-xs text-white/60 line-through">
                      Rp {formatPrice(product.price)}
                    </div>
                    <div className="text-base font-semibold text-white">
                      Rp {formatPrice(product.flash_sale_price)}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Regular Products Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-blue-600">
              Pilihan Produk
            </h2>
            <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs rounded-full font-medium border border-blue-100">
              Terbaru
            </span>
          </div>
          <Link 
            to="/products" 
            className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1 
                       hover:gap-2 transition-all duration-300"
          >
            Lihat Semua
            <ChevronRightIcon className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {regularProducts.map((product) => (
            <Link 
              key={product.id} 
              to={`/product/${product.id}`}
              className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 
                       overflow-hidden flex flex-col h-[320px] border border-gray-100 hover:border-blue-100"
            >
              {/* Image Container */}
              <div className="h-[180px] overflow-hidden bg-gray-50 relative">
                <img
                  src={getImageUrl(product.image_url)}
                  alt={product.name}
                  className="w-full h-full object-cover transform transition-all duration-700 
                           group-hover:scale-110"
                />
                {/* Elegant Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 via-transparent to-transparent 
                             opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Product Info Container */}
              <div className="p-4 flex flex-col justify-between flex-grow bg-gradient-to-b from-white to-blue-50/20">
                {/* Product Name */}
                <div className="h-[48px]">
                  <h3 className="text-sm font-medium text-gray-800 line-clamp-2 leading-snug 
                               group-hover:text-blue-600 transition-colors duration-300">
                    {product.name}
                  </h3>
                </div>
                
                {/* Price */}
                <div className="mt-2">
                  <div className="text-lg font-bold text-blue-600">
                    Rp {formatPrice(product.price)}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Popular Products Section - Menggunakan warna biru juga */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-blue-600">
              Produk Populer
            </h2>
            <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs rounded-full font-medium border border-blue-100">
              Terlaris
            </span>
          </div>
          <Link 
            to="/products/popular" 
            className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1 
                       hover:gap-2 transition-all duration-300"
          >
            Lihat Semua
            <ChevronRightIcon className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {popularProducts.map((product) => (
            <Link 
              key={product.id} 
              to={`/product/${product.id}`}
              className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 
                       overflow-hidden flex flex-col h-[320px] border border-gray-100 hover:border-blue-100"
            >
              <div className="h-[180px] overflow-hidden bg-gray-50 relative">
                <img
                  src={getImageUrl(product.image_url)}
                  alt={product.name}
                  className="w-full h-full object-cover transform transition-all duration-700 
                           group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 via-transparent to-transparent 
                             opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              <div className="p-4 flex flex-col justify-between flex-grow bg-gradient-to-b from-white to-blue-50/20">
                <div className="h-[48px]">
                  <h3 className="text-sm font-medium text-gray-800 line-clamp-2 leading-snug 
                               group-hover:text-blue-600 transition-colors duration-300">
                    {product.name}
                  </h3>
                </div>
                
                <div className="mt-2">
                  <div className="text-lg font-bold text-blue-600">
                    Rp {formatPrice(product.price)}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home; 