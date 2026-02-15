import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Button from '../components/ui/Button';

const Checkout = () => {
    const { cart, cartTotal, placeOrder, loading } = useCart();
    const navigate = useNavigate();

    const [shippingAddress, setShippingAddress] = useState({
        address: '',
        city: '',
        postalCode: '',
        country: 'India'
    });

    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e) => {
        setShippingAddress({
            ...shippingAddress,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const order = await placeOrder(shippingAddress);
            if (order) {
                navigate(`/order-success/${order._id}`);
            }
        } catch (error) {
            alert('Failed to place order: ' + error.message);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    if (!cart || cart.items.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center">
                <p className="mb-4">Your cart is empty.</p>
                <Button onClick={() => navigate('/shop')}>Go to Shop</Button>
            </div>
        );
    }

    return (
        <div className="bg-primary min-h-screen py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="font-serif text-4xl text-charcoal mb-12 text-center">Checkout</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Shipping Form */}
                    <div className="bg-white p-8 border border-stone-200">
                        <h2 className="font-serif text-2xl text-charcoal mb-6">Shipping Address</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm text-text/60 mb-1">Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    required
                                    value={shippingAddress.address}
                                    onChange={handleChange}
                                    className="w-full border border-stone-200 p-2 focus:outline-none focus:border-accent"
                                    placeholder="House No, Street, Area"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-text/60 mb-1">City</label>
                                    <input
                                        type="text"
                                        name="city"
                                        required
                                        value={shippingAddress.city}
                                        onChange={handleChange}
                                        className="w-full border border-stone-200 p-2 focus:outline-none focus:border-accent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-text/60 mb-1">Postal Code</label>
                                    <input
                                        type="text"
                                        name="postalCode"
                                        required
                                        value={shippingAddress.postalCode}
                                        onChange={handleChange}
                                        className="w-full border border-stone-200 p-2 focus:outline-none focus:border-accent"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm text-text/60 mb-1">Country</label>
                                <input
                                    type="text"
                                    name="country"
                                    required
                                    value={shippingAddress.country}
                                    onChange={handleChange}
                                    className="w-full border border-stone-200 p-2 focus:outline-none focus:border-accent"
                                />
                            </div>
                            <div className="pt-4">
                                <Button
                                    type="submit"
                                    className="w-full"
                                    disabled={submitting}
                                >
                                    {submitting ? 'Placing Order...' : `Pay ₹${cartTotal.toFixed(2)}`}
                                </Button>
                            </div>
                        </form>
                    </div>

                    {/* Order Summary Snapshot */}
                    <div className="space-y-6">
                        <div className="bg-stone-50 p-6 border border-stone-200">
                            <h2 className="font-serif text-xl text-charcoal mb-4">Order Summary</h2>
                            <div className="max-h-60 overflow-y-auto space-y-4 mb-4">
                                {cart.items.map((item) => (
                                    <div key={item.product._id} className="flex justify-between text-sm">
                                        <span>{item.product.name} x {item.quantity}</span>
                                        <span>₹{(item.product.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="border-t border-stone-200 pt-4 flex justify-between font-bold text-charcoal">
                                <span>Total</span>
                                <span>₹{cartTotal.toFixed(2)}</span>
                            </div>
                        </div>
                        <p className="text-xs text-text/40 italic text-center">
                            Note: This is a demo. No real payment will be processed.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
