import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

function SearchResults() {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchQuery = searchParams.get('q');

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/products?search=${encodeURIComponent(searchQuery)}`);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching search results:', error);
      } finally {
        setLoading(false);
      }
    };

    if (searchQuery) {
      fetchSearchResults();
    }
  }, [searchQuery]);

  // Format price helper
  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Get image URL helper
  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return 'https://via.placeholder.com/300x300?text=No+Image';
    if (imageUrl.startsWith('http')) return imageUrl;
    return `http://localhost:5000${imageUrl}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Search Results for "{searchQuery}"
          </h1>
          <span className="px-3 py-1 bg-primary-50 text-primary-600 text-sm rounded-full font-medium">
            {products.length} items
          </span>
        </div>
        
        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <MagnifyingGlassIcon className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No products found
            </h3>
            <p className="text-gray-500 text-center max-w-md mb-6">
              We couldn't find any products matching your search. Try checking for typos or using different keywords.
            </p>
            <Link 
              to="/products"
              className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-2"
            >
              Browse all products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {products.map(product => (
              <Link 
                key={product.id} 
                to={`/product/${product.id}`}
                className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 
                         overflow-hidden flex flex-col h-[320px] border border-gray-100 hover:border-primary-100"
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
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 via-transparent to-transparent 
                               opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Product Info Container */}
                <div className="p-4 flex flex-col justify-between flex-grow bg-gradient-to-b from-white to-gray-50/20">
                  {/* Product Name */}
                  <div className="h-[48px]">
                    <h3 className="text-sm font-medium text-gray-800 line-clamp-2 leading-snug 
                                 group-hover:text-primary-600 transition-colors duration-300">
                      {product.name}
                    </h3>
                  </div>
                  
                  {/* Price */}
                  <div className="mt-2">
                    <div className="text-lg font-bold text-primary-600">
                      Rp {formatPrice(product.price)}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchResults; 