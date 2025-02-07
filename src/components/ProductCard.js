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
      <div className="diamond-card rounded-lg overflow-hidden bg-[#0a0a0a] border border-[#cb9b51]/20">
        <div className="p-4">
          <h3 className="text-[#cb9b51] font-medium">{product.name}</h3>
          <p className="text-[#cb9b51]/80 text-sm">{product.description}</p>
          <div className="mt-2">
            <span className="text-[#f6e27a] font-bold">{formatPrice(product.price)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard; 