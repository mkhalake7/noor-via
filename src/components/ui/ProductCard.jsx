import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const API_URL = import.meta.env.VITE_API_URL || '';
    const productImage = product.image?.startsWith('http') ? product.image : `${API_URL}${product.image}`;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
            className="group relative"
        >
            <Link to={`/product/${product._id || product.id}`} className="block">
                <div className="aspect-[3/4] overflow-hidden bg-stone-100 relative mb-4">
                    <img
                        src={productImage}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Quick Add Button showing on hover */}
                    <div className="absolute bottom-4 right-4 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                        <button
                            className="bg-white text-charcoal w-10 h-10 flex items-center justify-center rounded-full shadow-md hover:bg-accent hover:text-white transition-colors"
                            onClick={(e) => {
                                e.preventDefault();
                                if (!user) {
                                    navigate('/login', { state: { from: location } });
                                    return;
                                }
                                addToCart(product._id || product.id, 1);
                            }}
                        >
                            <Plus size={20} strokeWidth={1.5} />
                        </button>
                    </div>
                </div>

                <div className="text-center">
                    <p className="text-xs text-text/60 uppercase tracking-widest mb-1">{product.category}</p>
                    <h3 className="font-serif text-lg text-charcoal mb-1 group-hover:text-accent transition-colors">{product.name}</h3>
                    <p className="text-sm font-medium text-text">₹{product.price.toLocaleString()}</p>
                </div>
            </Link>
        </motion.div>
    );
};

export default ProductCard;
