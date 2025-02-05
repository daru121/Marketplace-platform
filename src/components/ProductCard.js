import React from "react";
import { Link } from "react-router-dom";
import { StarIcon, HeartIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";

function ProductCard({ product, isFlashSale, flashSalePrice }) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(price);
  };

  // Fungsi untuk mendapatkan URL gambar yang benar
  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return 'https://via.placeholder.com/300x300?text=No+Image';
    if (imageUrl.startsWith('http')) return imageUrl;
    return `http://localhost:5000${imageUrl}`;
  };

  return (
    <Link to={`/product/${product.id}`} className="group">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
        <div className="relative">
          <img
            src={product.image_url ? `http://localhost:5000${product.image_url}` : 'https://via.placeholder.com/300'}
            alt={product.name}
            className="w-full h-40 object-cover"
          />
          {isFlashSale && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              Flash Sale
            </div>
          )}
        </div>
        <div className="p-3">
          <h3 className="text-sm font-medium text-gray-900 truncate">
            {product.name}
          </h3>
          <div className="mt-1">
            <span className="text-primary-500 font-semibold">
              {new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR'
              }).format(isFlashSale ? flashSalePrice : product.price)}
            </span>
            {isFlashSale && (
              <span className="ml-1 text-xs text-gray-500 line-through">
                {new Intl.NumberFormat('id-ID', {
                  style: 'currency',
                  currency: 'IDR'
                }).format(product.price)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard; 