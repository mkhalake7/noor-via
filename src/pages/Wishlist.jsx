import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ui/ProductCard';
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const Wishlist = () => {
    const { wishlist, loading } = useWishlist();

    if (loading) {
        return (
            <div className="min-h-screen bg-primary flex items-center justify-center">
                <div className="w-12 h-12 border-2 border-charcoal/10 border-t-charcoal rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="bg-primary min-h-screen pt-32 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12 text-center"
                >
                    <h1 className="text-4xl md:text-5xl font-serif text-charcoal mb-4">My Wishlist</h1>
                    <p className="text-text/60 max-w-lg mx-auto uppercase tracking-widest text-xs">
                        {wishlist.products.length} {wishlist.products.length === 1 ? 'Item' : 'Items'} Saved
                    </p>
                </motion.div>

                <AnimatePresence mode="wait">
                    {wishlist.products.length > 0 ? (
                        <motion.div
                            key="grid"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12"
                        >
                            {wishlist.products.map((product) => (
                                <ProductCard key={product._id || product.id} product={product} />
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="empty"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white border border-stone-200 p-12 text-center max-w-lg mx-auto rounded-2xl shadow-sm"
                        >
                            <div className="w-20 h-20 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Heart size={32} className="text-stone-300" strokeWidth={1} />
                            </div>
                            <h2 className="font-serif text-2xl text-charcoal mb-4">Your wishlist is empty</h2>
                            <p className="text-text/60 mb-8 leading-relaxed">
                                Save your favorite artisanal candles to your wishlist and they'll appear here for easy access later.
                            </p>
                            <Link to="/shop">
                                <Button className="w-full flex items-center justify-center space-x-2">
                                    <span>Browse Collection</span>
                                    <ArrowRight size={18} />
                                </Button>
                            </Link>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Wishlist;
