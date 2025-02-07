import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const CartContext = createContext();

const CART_STORAGE_KEY = 'luxemart_cart';

export function CartProvider({ children }) {
  // Inisialisasi state dengan data dari localStorage jika ada
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Simpan ke localStorage setiap kali cartItems berubah
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity) => {
    setCartItems(currentItems => {
      const existingItem = currentItems.find(item => item.product.id === product.id);
      
      if (existingItem) {
        return currentItems.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      
      return [...currentItems, { product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(currentItems => 
      currentItems.filter(item => item.product.id !== productId)
    );
  };

  const updateQuantity = (productId, newQuantity) => {
    setCartItems(currentItems =>
      currentItems.map(item =>
        item.product.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  // Ubah getTotalItems untuk menghitung jumlah produk unik, bukan total quantity
  const getTotalItems = () => {
    return cartItems.length; // Mengembalikan jumlah produk yang berbeda
  };

  // Tambah fungsi untuk membersihkan keranjang
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem(CART_STORAGE_KEY);
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    getTotalItems,
    clearCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
} 