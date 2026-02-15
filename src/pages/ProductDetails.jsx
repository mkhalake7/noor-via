import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { productAPI } from '../services/api';
import Button from '../components/ui/Button';
import { ArrowLeft, Star, Truck, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const ProductDetails = () => {
    const { id } = useParams();
    const { products } = useProducts();
    const { addToCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        // Try to find in context first (for speed), then fall back to API
        const found = products.find(p => (p._id || p.id) == id);
        if (found) {
            setProduct(found);
        } else if (id && id.length === 24) { // Basic check for MongoDB ObjectId
            productAPI.getById(id).then(setProduct).catch(console.error);
        }
    }, [id, products]);

    const API_URL = import.meta.env.VITE_API_URL || '';

    if (!product) {
        return <div className="min-h-[50vh] flex items-center justify-center">Loading...</div>;
    }

    const productImage = product.image?.startsWith('http') ? product.image : `${API_URL}${product.image}`;


    const handleAddToCart = () => {
        if (!user) {
            navigate('/login', { state: { from: location } });
            return;
        }
        addToCart(product._id || product.id, quantity);
    };

    return (
        <div className="bg-primary min-h-screen py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link to="/shop" className="inline-flex items-center text-text/60 hover:text-charcoal mb-8 transition-colors">
                    <ArrowLeft size={16} className="mr-2" /> Back to Shop
                </Link>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
                    {/* Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="aspect-square bg-stone-100 overflow-hidden"
                    >
                        <img
                            src={productImage}
                            alt={product.name}
                            className="w-full h-full object-cover"
                        />
                    </motion.div>

                    {/* Details */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex flex-col justify-center"
                    >
                        <span className="text-sm uppercase tracking-widest text-text/60 mb-2">{product.category} Collection</span>
                        <h1 className="font-serif text-4xl md:text-5xl text-charcoal mb-4">{product.name}</h1>
                        <p className="text-2xl font-light text-text mb-6">₹{product.price.toLocaleString()}</p>

                        <div className="border-t border-b border-stone-200 py-6 mb-8 space-y-4">
                            <p className="text-text/80 leading-relaxed">{product.description}</p>
                            <div className="flex items-start space-x-2 text-sm text-text/70">
                                <span className="font-semibold text-charcoal">Scent Notes:</span>
                                <span>{product.scent}</span>
                            </div>
                        </div>

                        {/* Quantity & Add to Cart */}
                        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
                            <div className="flex items-center border border-charcoal/30 w-32 justify-between px-4 py-3">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="text-text hover:text-accent"
                                >
                                    -
                                </button>
                                <span className="text-charcoal font-medium">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="text-text hover:text-accent"
                                >
                                    +
                                </button>
                            </div>
                            <Button onClick={handleAddToCart} className="flex-grow">
                                Add to Cart
                            </Button>
                        </div>

                        {/* Features */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-text/60 uppercase tracking-widest">
                            <div className="flex items-center space-x-2">
                                <Truck size={16} />
                                <span>Free Shipping over $50</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <ShieldCheck size={16} />
                                <span>Quality Guarantee</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Star size={16} />
                                <span>Hand-poured in small batches</span>
                            </div>
                        </div>

                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
