import React, { createContext, useState, useContext } from 'react';

// Create Wishlist and Cart Context
export const WishlistContext = createContext();
export const CartContext = createContext();

// Wishlist Provider
export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  // Toggle the item in the wishlist
  const toggleWishlist = (product) => {
    setWishlistItems((prev) =>
      prev.find((p) => p.id === product.id)
        ? prev.filter((p) => p.id !== product.id) // Remove if already in wishlist
        : [...prev, product] // Add if not in wishlist
    );
  };

  // Check if a product is in the wishlist
  const isInWishlist = (productId) => wishlistItems.some((item) => item.id === productId);

  // Remove an item from the wishlist
  const removeFromWishlist = (productId) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== productId));
  };

  // Move an item from wishlist to cart
  const moveToCart = (product) => {
    setCartItems((prev) => [...prev, product]);
    removeFromWishlist(product.id); // Remove from wishlist after moving to cart
  };

  // Add item to cart
  const addToCart = (product) => {
    setCartItems((prev) => [...prev, product]);
  };

  // Remove item from cart
  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  // Update item quantity in cart
  const updateCartQuantity = (productId, quantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        toggleWishlist,
        isInWishlist,
        removeFromWishlist,
        moveToCart,
      }}
    >
      <CartContext.Provider
        value={{
          cartItems,
          addToCart,
          removeFromCart,
          updateCartQuantity,
        }}
      >
        {children}
      </CartContext.Provider>
    </WishlistContext.Provider>
  );
};

// Custom hooks to use Wishlist and Cart contexts
export const useWishlist = () => useContext(WishlistContext);
export const useCart = () => useContext(CartContext);
