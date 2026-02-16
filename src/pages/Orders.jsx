import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { orderAPI } from '../services/api';
import { Package, Truck, CheckCircle, Clock, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);
                const data = await orderAPI.getMine();
                setOrders(data);
                setError(null);
            } catch (err) {
                console.error('Error fetching orders:', err);
                setError('Failed to load orders. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Delivered': return <CheckCircle size={18} className="text-green-400" />;
            case 'Shipped': return <Truck size={18} className="text-blue-400" />;
            case 'Cancelled': return <X size={18} className="text-red-400" />;
            default: return <Clock size={18} className="text-amber-400" />;
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black pt-32 pb-20 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black pt-32 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <h1 className="text-4xl font-serif text-white mb-4">Your Orders</h1>
                    <p className="text-stone-400">Track and manage your NoorVia purchases.</p>
                </motion.div>

                {error ? (
                    <div className="bg-red-900/20 border border-red-500/50 p-6 rounded-xl text-red-200">
                        {error}
                    </div>
                ) : orders.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20 bg-white/5 rounded-2xl border border-white/10 px-6"
                    >
                        <Package size={64} className="mx-auto text-stone-600 mb-6" strokeWidth={1} />
                        <h2 className="text-2xl font-serif text-white mb-4">No orders yet</h2>
                        <p className="text-stone-400 mb-8 max-w-md mx-auto">
                            It looks like you haven't placed any orders with us yet.
                            Our signature candles are waiting for you!
                        </p>
                        <Link
                            to="/shop"
                            className="inline-block bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-stone-200 transition-colors"
                        >
                            Start Shopping
                        </Link>
                    </motion.div>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order, index) => (
                            <motion.div
                                key={order._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all group"
                            >
                                <div className="p-6">
                                    <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
                                        <div>
                                            <p className="text-[10px] uppercase tracking-[0.2em] text-stone-500 mb-1">Order Placed</p>
                                            <p className="text-white font-medium">{formatDate(order.createdAt)}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase tracking-[0.2em] text-stone-500 mb-1">Total Amount</p>
                                            <p className="text-white font-serif text-lg">₹{order.totalPrice.toFixed(2)}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase tracking-[0.2em] text-stone-500 mb-1">Order #</p>
                                            <p className="text-stone-300 text-sm font-mono">{order._id.substring(order._id.length - 8).toUpperCase()}</p>
                                        </div>
                                        <div className="bg-white/10 px-4 py-2 rounded-full flex items-center space-x-2 border border-white/5">
                                            {getStatusIcon(order.status)}
                                            <span className="text-sm font-medium text-white">{order.status}</span>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        {order.items.map((item) => (
                                            <div key={item._id} className="flex items-center space-x-4">
                                                <div className="w-16 h-16 bg-stone-900 rounded-lg overflow-hidden flex-shrink-0">
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div className="flex-grow">
                                                    <h4 className="text-white font-medium">{item.name}</h4>
                                                    <p className="text-stone-500 text-sm">Qty: {item.quantity}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-stone-300">₹{item.price.toFixed(2)}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-8 pt-6 border-t border-white/10 flex justify-between items-center text-sm">
                                        <p className="text-stone-500 italic">
                                            Shipping to: {order.shippingAddress.address}, {order.shippingAddress.city}
                                        </p>
                                        <Link
                                            to={`/orders/${order._id}`}
                                            className="text-white flex items-center space-x-1 hover:text-stone-300 transition-colors"
                                        >
                                            <span>Detailed Receipt</span>
                                            <ChevronRight size={16} />
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Orders;
