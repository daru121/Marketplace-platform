import React from "react";
import { useParams } from "react-router-dom";
import { StarIcon } from "@heroicons/react/20/solid";

function ProductDetail() {
  const { id } = useParams();

  // Contoh data produk (nanti bisa diganti dengan data dari API)
  const product = {
    id: id,
    name: "Smartphone XYZ",
    price: 2999000,
    image: "https://via.placeholder.com/600",
    rating: 4.5,
    sold: 150,
    description: "Deskripsi produk akan ditampilkan di sini...",
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(price);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img
            src={product.image}
            alt={product.name}
            className="w-full rounded-lg"
          />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{product.name}</h1>
          <div className="flex items-center mt-2">
            <StarIcon className="h-5 w-5 text-yellow-400" />
            <span className="ml-1 text-gray-600">{product.rating}</span>
            <span className="mx-2 text-gray-400">|</span>
            <span className="text-gray-600">Terjual {product.sold}</span>
          </div>
          <div className="mt-4">
            <p className="text-3xl font-bold text-primary">
              {formatPrice(product.price)}
            </p>
          </div>
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Deskripsi Produk</h2>
            <p className="text-gray-600">{product.description}</p>
          </div>
          <button className="mt-8 w-full bg-primary text-white py-3 px-6 rounded-lg hover:bg-primary/90 transition-colors">
            Tambah ke Keranjang
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail; 