import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/ui/ProductCard';
import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';

const Shop = () => {
    const { products, fetchProducts, loading } = useProducts();
    const [searchParams, setSearchParams] = useSearchParams();
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || 'All';

    useEffect(() => {
        fetchProducts({
            category: category === 'All' ? '' : category,
            search: search
        });
    }, [category, search]);

    const categories = ['All', 'Signature', 'Fresh', 'Floral', 'Woody']; // Static or derived if preferred

    const handleCategoryChange = (newCategory) => {
        setSearchParams({ category: newCategory, search });
    };

    const clearSearch = () => {
        setSearchParams({ category, search: '' });
    };

    return (
        <div className="bg-primary min-h-screen pb-20">
            {/* Header */}
            <div className="bg-secondary/20 pt-32 pb-12 mb-8">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h1 className="font-serif text-4xl md:text-5xl text-charcoal mb-4">
                        {search ? `Results for "${search}"` : 'Shop Candles'}
                    </h1>
                    <p className="text-text/60 italic max-w-xl mx-auto">
                        {search
                            ? `Found ${products.length} products matching your search.`
                            : 'Discover our collection of hand-poured soy candles, designed to elevate your everyday rituals.'
                        }
                    </p>
                    {search && (
                        <button
                            onClick={clearSearch}
                            className="mt-4 inline-flex items-center text-sm text-charcoal/60 hover:text-charcoal transition-colors border-b border-charcoal/20"
                        >
                            <X size={14} className="mr-1" /> Clear Search
                        </button>
                    )}
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Filters */}
                <div className="flex justify-center space-x-8 mb-12 border-b border-stone-200 pb-4 overflow-x-auto">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => handleCategoryChange(cat)}
                            className={`text-sm uppercase tracking-widest pb-4 border-b-2 transition-colors whitespace-nowrap ${category === cat
                                ? 'border-charcoal text-charcoal'
                                : 'border-transparent text-text/50 hover:text-text'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Product Grid */}
                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-charcoal"></div>
                    </div>
                ) : (
                    <>
                        <motion.div
                            layout
                            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 md:gap-x-8 md:gap-y-12"
                        >
                            {products.map((product) => (
                                <ProductCard key={product._id || product.id} product={product} />
                            ))}
                        </motion.div>

                        {products.length === 0 && (
                            <div className="text-center py-20">
                                <Search size={48} className="mx-auto text-stone-200 mb-4" />
                                <h3 className="text-xl font-serif text-charcoal mb-2">No products found</h3>
                                <p className="text-text/60">Try adjusting your search or filters.</p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Shop;
