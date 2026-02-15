import React, { createContext, useContext, useState, useEffect } from 'react';
import { cartAPI, orderAPI } from '../services/api';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const { user } = useAuth();
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(false);

    // Fetch cart on mount or when user changes
    useEffect(() => {
        if (user) {
            fetchCart();
        } else {
            setCart(null);
        }
    }, [user]);

    const fetchCart = async () => {
        setLoading(true);
        try {
            const data = await cartAPI.get();
            setCart(data);
        } catch (error) {
            console.error('Failed to fetch cart:', error);
        } finally {
            setLoading(false);
        }
    };

    const addToCart = async (productId, quantity = 1) => {
        if (!user) {
            return;
        }
        try {
            const data = await cartAPI.addItem(productId, quantity);
            setCart(data);
        } catch (error) {
            console.error('Failed to add to cart:', error);
        }
    };

    const updateQuantity = async (productId, quantity) => {
        try {
            const data = await cartAPI.updateItem(productId, quantity);
            setCart(data);
        } catch (error) {
            console.error('Failed to update quantity:', error);
        }
    };

    const removeFromCart = async (productId) => {
        try {
            const data = await cartAPI.deleteItem(productId);
            setCart(data);
        } catch (error) {
            console.error('Failed to remove from cart:', error);
        }
    };

    const clearCart = async () => {
        try {
            await cartAPI.clear();
            setCart({ items: [] });
        } catch (error) {
            console.error('Failed to clear cart:', error);
        }
    };

    const placeOrder = async (shippingAddress) => {
        if (!cart || cart.items.length === 0) return null;

        try {
            const orderData = {
                items: cart.items.map(item => ({
                    product: item.product._id || item.product.id,
                    name: item.product.name,
                    price: item.product.price,
                    quantity: item.quantity,
                    image: item.product.image
                })),
                shippingAddress,
                totalPrice: cartTotal
            };

            const data = await orderAPI.create(orderData);
            setCart({ items: [] }); // Clear local cart state after order
            return data;
        } catch (error) {
            console.error('Failed to place order:', error);
            throw error;
        }
    };

    const cartCount = cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0;
    const cartTotal = cart?.items?.reduce((acc, item) => acc + (item.product.price * item.quantity), 0) || 0;

    return (
        <CartContext.Provider value={{
            cart,
            loading,
            addToCart,
            updateQuantity,
            removeFromCart,
            clearCart,
            placeOrder,
            cartCount,
            cartTotal,
            fetchCart
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
