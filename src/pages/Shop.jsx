import React, { useState } from 'react';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/ui/ProductCard';
import { motion } from 'framer-motion';

const Shop = () => {
    const { products } = useProducts();
    const [activeCategory, setActiveCategory] = useState('All');

    const categories = ['All', ...new Set(products.map(p => p.category))];

    const filteredProducts = activeCategory === 'All'
        ? products
        : products.filter(p => p.category === activeCategory);

    return (
        <div className="bg-primary min-h-screen pb-20">
            {/* Header */}
            <div className="bg-secondary/30 py-16 mb-12">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h1 className="font-serif text-4xl md:text-5xl text-charcoal mb-4">Shop Candles</h1>
                    <p className="text-text/60 italic max-w-xl mx-auto">
                        Discover our collection of hand-poured soy candles, designed to elevate your everyday rituals.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Filters */}
                <div className="flex justify-center space-x-8 mb-12 border-b border-stone-200 pb-4 overflow-x-auto">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`text-sm uppercase tracking-widest pb-4 border-b-2 transition-colors whitespace-nowrap ${activeCategory === category
                                ? 'border-charcoal text-charcoal'
                                : 'border-transparent text-text/50 hover:text-text'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Product Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 md:gap-x-8 md:gap-y-12"
                >
                    {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </motion.div>

                {filteredProducts.length === 0 && (
                    <div className="text-center py-20 text-text/60">
                        No products found in this category.
                    </div>
                )}
            </div>
        </div>
    );
};

export default Shop;
