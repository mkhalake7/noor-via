import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { Trash2 } from 'lucide-react';
import { useProducts } from '../context/ProductContext';

const Cart = () => {
    const { products } = useProducts();
    // Mock cart data for UI demonstration
    const cartItems = products.length > 0 ? [
        { ...products[0], quantity: 2 },
        { ...products[2], quantity: 1 }
    ] : [];

    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <div className="bg-primary min-h-screen py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="font-serif text-4xl text-charcoal mb-12 text-center">Your Cart</h1>

                {cartItems.length > 0 ? (
                    <div className="flex flex-col lg:flex-row gap-12">

                        {/* Cart Items */}
                        <div className="flex-grow space-y-8">
                            {cartItems.map((item) => (
                                <div key={item._id || item.id} className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 border-b border-stone-200 pb-6">
                                    <div className="w-full sm:w-24 h-32 bg-stone-100 flex-shrink-0">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    </div>

                                    <div className="flex-grow w-full">
                                        <div className="flex justify-between items-start mb-2">
                                            <Link to={`/product/${item._id || item.id}`} className="font-serif text-xl text-charcoal hover:text-accent transition-colors">{item.name}</Link>
                                            <button className="text-text/40 hover:text-red-500 transition-colors">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                        <p className="text-sm text-text/60 uppercase tracking-widest mb-4">{item.category}</p>
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center border border-charcoal/20 px-2 py-1">
                                                <button className="px-2 text-text/60 hover:text-charcoal">-</button>
                                                <span className="px-2 text-sm text-charcoal">{item.quantity}</span>
                                                <button className="px-2 text-text/60 hover:text-charcoal">+</button>
                                            </div>
                                            <p className="font-medium text-text">₹{(item.price * item.quantity).toFixed(2)}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Summary */}
                        <div className="lg:w-1/3 flex-shrink-0">
                            <div className="bg-white p-8 border border-stone-200 sticky top-24">
                                <h2 className="font-serif text-2xl text-charcoal mb-6">Order Summary</h2>

                                <div className="space-y-4 mb-6 text-sm text-text/80">
                                    <div className="flex justify-between">
                                        <span>Subtotal</span>
                                        <span>₹{subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Shipping</span>
                                        <span>Calculated at checkout</span>
                                    </div>
                                </div>

                                <div className="border-t border-stone-200 pt-4 mb-8">
                                    <div className="flex justify-between font-serif text-lg text-charcoal">
                                        <span>Total</span>
                                        <span>₹{subtotal.toFixed(2)}</span>
                                    </div>
                                </div>

                                <Button className="w-full">Proceed to Checkout</Button>
                                <div className="mt-4 text-center">
                                    <Link to="/shop" className="text-xs text-text/60 underline hover:text-charcoal">Continue Shopping</Link>
                                </div>
                            </div>
                        </div>

                    </div>
                ) : (
                    <div className="text-center py-20 bg-white border border-stone-100">
                        <p className="text-text/60 mb-8">Your cart is currently empty.</p>
                        <Link to="/shop">
                            <Button>Start Shopping</Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
