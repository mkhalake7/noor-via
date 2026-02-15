import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useProducts } from '../../context/ProductContext';

const FeaturedCollections = () => {
    const { products } = useProducts();
    const API_URL = import.meta.env.VITE_API_URL || '';

    // Get up to 3 featured products
    const featuredProducts = products
        .filter(p => p.isFeatured)
        .slice(0, 3);

    // If no featured products, show nothing or placeholder? 
    // User wants it to be configurable, so if none are marked, we can show a message or just the first few products.
    // Let's fallback to first 3 products if none are featured yet to keep the UI from being empty.
    const displayProducts = featuredProducts.length > 0 ? featuredProducts : products.slice(0, 3);

    return (
        <section className="py-20 bg-primary">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-4">Curated Collections</h2>
                    <p className="text-text/60 italic font-serif">Find the perfect scent for every moment.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {displayProducts.map((product) => {
                        const productImage = product.image?.startsWith('http') ? product.image : `${API_URL}${product.image}`;
                        return (
                            <Link
                                to={`/product/${product._id || product.id}`}
                                key={product._id || product.id}
                                className="group block relative overflow-hidden h-[500px]"
                            >
                                <div className="absolute inset-0 overflow-hidden bg-stone-100">
                                    <img
                                        src={productImage}
                                        alt={product.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
                                <div className="absolute bottom-8 left-0 right-0 text-center text-white p-4">
                                    <span className="text-[10px] tracking-[0.2em] uppercase mb-2 block opacity-80">{product.category}</span>
                                    <h3 className="font-serif text-2xl md:text-3xl tracking-wide mb-4">{product.name}</h3>
                                    <span className="text-xs tracking-widest uppercase border-b border-white/50 pb-1 group-hover:border-white transition-colors">
                                        Explore Collection
                                    </span>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default FeaturedCollections;
