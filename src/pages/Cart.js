import React from "react";

function Cart() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Keranjang Belanja</h2>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-500">Keranjang belanja masih kosong</p>
        <button className="mt-8 w-full bg-primary text-white py-3 px-6 rounded-lg hover:bg-primary/90 transition-colors">
          Kembali ke Halaman Utama
        </button>
      </div>
    </div>
  );
}

export default Cart; 