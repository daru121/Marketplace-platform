import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDownIcon, FunnelIcon } from '@heroicons/react/24/outline';

function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [selectedCategory, sortBy]);

  const fetchProducts = async () => {
    try {
      let url = 'http://localhost:5000/api/products';
      const params = new URLSearchParams();
      
      if (selectedCategory) params.append('category', selectedCategory);
      if (sortBy) params.append('sort', sortBy);
      if (priceRange.min) params.append('min_price', priceRange.min);
      if (priceRange.max) params.append('max_price', priceRange.max);

      const finalUrl = `${url}?${params.toString()}`;
      const response = await fetch(finalUrl);
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handlePriceFilter = (e) => {
    e.preventDefault();
    fetchProducts();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-20">
      {/* Filter Section */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          {/* Category Filter */}
          <div className="flex-1">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg 
                       focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all"
            >
              <option value="">Semua Kategori</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range Filter */}
          <form onSubmit={handlePriceFilter} className="flex-1 flex gap-2">
            <input
              type="number"
              placeholder="Harga Minimum"
              value={priceRange.min}
              onChange={(e) => setPriceRange({...priceRange, min: e.target.value})}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg 
                       focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all"
            />
            <input
              type="number"
              placeholder="Harga Maksimum"
              value={priceRange.max}
              onChange={(e) => setPriceRange({...priceRange, max: e.target.value})}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg 
                       focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all"
            />
            <button
              type="submit"
              className="px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                       transition-colors duration-300 flex items-center gap-2"
            >
              <FunnelIcon className="w-5 h-5" />
              Filter
            </button>
          </form>

          {/* Sort */}
          <div className="flex-1">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg 
                       focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all"
            >
              <option value="newest">Terbaru</option>
              <option value="price_low">Harga: Rendah ke Tinggi</option>
              <option value="price_high">Harga: Tinggi ke Rendah</option>
              <option value="popular">Paling Populer</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Tidak ada produk ditemukan</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {products.map(product => (
            <Link 
              key={product.id} 
              to={`/product/${product.id}`}
              className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 
                       overflow-hidden flex flex-col h-[320px] border border-gray-100 hover:border-blue-100"
            >
              {/* Image Container */}
              <div className="h-[180px] overflow-hidden bg-gray-50 relative">
                <img
                  src={product.image_url ? `http://localhost:5000${product.image_url}` : 'https://via.placeholder.com/300x300'}
                  alt={product.name}
                  className="w-full h-full object-cover transform transition-all duration-700 
                           group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 via-transparent to-transparent 
                             opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Product Info */}
              <div className="p-4 flex flex-col justify-between flex-grow">
                <div className="h-[48px]">
                  <h3 className="text-sm font-medium text-gray-800 line-clamp-2 leading-snug 
                               group-hover:text-blue-600 transition-colors">
                    {product.name}
                  </h3>
                </div>
                
                <div className="mt-2">
                  <div className="text-lg font-bold text-blue-600">
                    Rp {new Intl.NumberFormat('id-ID').format(product.price)}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Products; 