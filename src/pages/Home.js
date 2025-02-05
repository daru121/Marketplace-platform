import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";

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
      image: "/banners/banner1.jpg", // Pastikan file ada di public/banners/
      title: "Special Discount Up To 70%",
      description: "Get amazing deals on all products",
      buttonText: "Shop Now",
      bgColor: "from-blue-600 to-blue-400"
    },
    {
      id: 2,
      image: "/banners/banner2.jpg",
      title: "New Arrivals Collection",
      description: "Check out our latest products",
      buttonText: "Explore",
      bgColor: "from-purple-600 to-purple-400"
    },
    {
      id: 3,
      image: "/banners/banner3.jpg",
      title: "Flash Sale Today",
      description: "Limited time offers on selected items",
      buttonText: "View Deals",
      bgColor: "from-red-600 to-red-400"
    }
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      // Fetch flash sale products - hanya yang active
      const flashSaleRes = await fetch('http://localhost:5000/api/products/flash-sale');
      const flashSaleData = await flashSaleRes.json();
      setFlashSaleProducts(flashSaleData.filter(product => product.status === 'active'));

      // Fetch regular products - hanya yang active
      const productsRes = await fetch('http://localhost:5000/api/products?limit=12');
      const productsData = await productsRes.json();
      setRegularProducts(productsData.filter(product => product.status === 'active'));

      // Fetch popular products - hanya yang active
      const popularRes = await fetch('http://localhost:5000/api/products/popular');
      const popularData = await popularRes.json();
      setPopularProducts(popularData.filter(product => product.status === 'active'));

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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Hero Banner Carousel */}
      <section className="relative rounded-xl overflow-hidden">
        <div className="relative h-[300px] md:h-[500px]">
          {banners.map((banner, index) => (
            <div
              key={banner.id}
              className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                index === currentBanner ? "opacity-100" : "opacity-0"
              }`}
            >
              {/* Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-r ${banner.bgColor} mix-blend-multiply opacity-90`} />
              
              {/* Banner Image */}
              <img
                src={banner.image}
                alt={banner.title}
                className="w-full h-full object-cover"
              />
              
              {/* Content - Diubah ke tengah */}
              <div className="absolute inset-0 flex items-center justify-center text-center">
                <div className="container mx-auto px-6">
                  <div className="max-w-2xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 animate-fade-in">
                      {banner.title}
                    </h1>
                    <p className="text-lg md:text-xl text-white/90 mb-8 animate-fade-in-delay">
                      {banner.description}
                    </p>
                    <button className="px-8 py-3 bg-white text-gray-900 rounded-full font-medium hover:bg-gray-100 transition-colors animate-fade-in-delay-2">
                      {banner.buttonText}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Navigation Buttons */}
          <button
            onClick={prevBanner}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/30 backdrop-blur-sm hover:bg-white/40 transition-all"
          >
            <ChevronLeftIcon className="h-6 w-6 text-white" />
          </button>
          <button
            onClick={nextBanner}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/30 backdrop-blur-sm hover:bg-white/40 transition-all"
          >
            <ChevronRightIcon className="h-6 w-6 text-white" />
          </button>

          {/* Dots Navigation */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentBanner(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentBanner 
                    ? "bg-white w-6" 
                    : "bg-white/50 hover:bg-white/75"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Flash Sale */}
      {flashSaleProducts.length > 0 && (
        <section className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-4 md:p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <div className="flex items-center gap-2 md:gap-3">
              <h2 className="text-base md:text-lg font-semibold text-white">Flash Sale</h2>
              <div className="px-2 md:px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-xs md:text-sm font-medium">
                {flashSaleEndsIn}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
            {flashSaleProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                isFlashSale 
                flashSalePrice={product.flash_sale_price}
              />
            ))}
          </div>
        </section>
      )}

      {/* Regular Products */}
      <section className="bg-white rounded-xl p-4 md:p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <h2 className="text-base md:text-lg font-semibold text-gray-900">Pilihan Produk</h2>
          <button className="text-primary-500 text-sm font-medium flex items-center hover:text-primary-600">
            View All <ChevronRightIcon className="h-4 w-4 ml-1" />
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
          {regularProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product}
            />
          ))}
        </div>
      </section>

      {/* Popular Products */}
      <section className="bg-white rounded-xl p-4 md:p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <h2 className="text-base md:text-lg font-semibold text-gray-900">Produk Populer</h2>
          <button className="text-primary-500 text-sm font-medium flex items-center hover:text-primary-600">
            View All <ChevronRightIcon className="h-4 w-4 ml-1" />
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
          {popularProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product}
              totalSold={product.total_sold}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home; 