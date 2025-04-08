import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // First get cart items
      const { data: cartData, error: cartError } = await supabase
        .from('cart_items')
        .select('*')
        .eq('user_id', user.id);

      if (cartError) throw cartError;

      if (cartData && cartData.length > 0) {
        // Then fetch product details for each cart item
        const productPromises = cartData.map(async (cartItem) => {
          // Fetch product data
          const { data: productData, error: productError } = await supabase
            .from('products')
            .select('*, profiles:user_id(full_name)')
            .eq('id', cartItem.product_id);

          if (productError) throw productError;
          
          // Skip if product not found
          if (!productData || productData.length === 0) return null;
          
          // Get the first product since we know it exists
          const product = productData[0];
          // Extract seller name from profiles
          const seller_name = product.profiles?.full_name || 'Unknown';
          return { 
            ...product, 
            seller_name
          };
        });

        const products = await Promise.all(productPromises);
        // Filter out any null values (products that weren't found)
        setCartItems(products.filter(product => product !== null) || []);
      } else {
        setCartItems([]);
      }
    } catch (error) {
      console.error('Error fetching cart items:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (product) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('Please login to add items to cart');
      }

      // Check if item already exists in cart
      const { data: existingItem, error: checkError } = await supabase
        .from('cart_items')
        .select('*')
        .eq('user_id', user.id)
        .eq('product_id', product.id)
        .single();

      if (checkError && checkError.code !== 'PGRST116') throw checkError;

      if (existingItem) {
        throw new Error('Item already exists in cart');
      } else {
        // Insert new item if it doesn't exist
        const { error: insertError } = await supabase
          .from('cart_items')
          .insert([
            {
              user_id: user.id,
              product_id: product.id
            }
          ]);

        if (insertError) throw insertError;
      }

      // Refresh cart items to get updated data
      await fetchCartItems();
      return true;
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('cart_items')
        .delete()
        .match({ user_id: user.id, product_id: productId });

      if (error) throw error;

      setCartItems(prev => prev.filter(item => item.id !== productId));
    } catch (error) {
      console.error('Error removing from cart:', error);
      alert('Error removing item from cart');
    }
  };

  const clearCart = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', user.id);

      if (error) throw error;

      setCartItems([]);
    } catch (error) {
      console.error('Error clearing cart:', error);
      alert('Error clearing cart');
    }
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + parseFloat(item.price || 0), 0);
  };

  const value = {
    cartItems,
    loading,
    addToCart,
    removeFromCart,
    clearCart,
    getTotalPrice,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}
