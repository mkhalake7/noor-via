import React, { createContext, useState, useContext, useEffect } from 'react';
import { wishlistAPI } from '../services/api';
import { useAuth } from './AuthContext';

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState({ products: [] });
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        const fetchWishlist = async () => {
            if (user) {
                try {
                    const data = await wishlistAPI.get();
                    setWishlist(data);
                } catch (error) {
                    console.error('Failed to fetch wishlist:', error);
                }
            } else {
                setWishlist({ products: [] });
            }
            setLoading(false);
        };

        fetchWishlist();
    }, [user]);

    const addToWishlist = async (productId) => {
        try {
            const data = await wishlistAPI.add(productId);
            setWishlist(data);
        } catch (error) {
            console.error('Failed to add to wishlist:', error);
            throw error;
        }
    };

    const removeFromWishlist = async (productId) => {
        try {
            const data = await wishlistAPI.remove(productId);
            setWishlist(data);
        } catch (error) {
            console.error('Failed to remove from wishlist:', error);
            throw error;
        }
    };

    const isInWishlist = (productId) => {
        return wishlist.products.some(p => (p._id || p) === productId);
    };

    return (
        <WishlistContext.Provider value={{
            wishlist,
            loading,
            addToWishlist,
            removeFromWishlist,
            isInWishlist,
            wishlistCount: wishlist.products.length
        }}>
            {children}
        </WishlistContext.Provider>
    );
};
