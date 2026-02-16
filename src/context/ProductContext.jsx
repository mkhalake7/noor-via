import React, { createContext, useState, useEffect, useContext } from 'react';
import { productAPI } from '../services/api';

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch products from API
    const fetchProducts = async (filters = {}) => {
        try {
            setLoading(true);
            const data = await productAPI.getAll(filters);
            setProducts(data);
        } catch (error) {
            console.error('Failed to fetch products:', error);
            // Fallback to local data if API is unavailable
            const { products: localProducts } = await import('../data/products');
            setProducts(localProducts);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const addProduct = async (product) => {
        try {
            const newProduct = await productAPI.create(product);
            setProducts(prev => [newProduct, ...prev]);
            return newProduct;
        } catch (error) {
            console.error('Failed to add product:', error);
            throw error;
        }
    };

    const updateProduct = async (id, productData) => {
        try {
            const updatedProduct = await productAPI.update(id, productData);
            setProducts(prev => prev.map(p => (p._id || p.id) === id ? updatedProduct : p));
            return updatedProduct;
        } catch (error) {
            console.error('Failed to update product:', error);
            throw error;
        }
    };

    const deleteProduct = async (id) => {
        try {
            await productAPI.delete(id);
            setProducts(prev => prev.filter(p => (p._id || p.id) !== id));
        } catch (error) {
            console.error('Failed to delete product:', error);
            throw error;
        }
    };

    return (
        <ProductContext.Provider value={{ products, loading, addProduct, updateProduct, deleteProduct, fetchProducts }}>
            {children}
        </ProductContext.Provider>
    );
};
