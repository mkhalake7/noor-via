import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import Button from '../components/ui/Button';

const OrderSuccess = () => {
    const { id } = useParams();

    return (
        <div className="bg-primary min-h-screen py-24 flex items-center justify-center">
            <div className="max-w-md w-full mx-auto px-4 text-center">
                <div className="flex justify-center mb-8">
                    <CheckCircle size={80} className="text-green-500" strokeWidth={1} />
                </div>
                <h1 className="font-serif text-4xl text-charcoal mb-4">Order Confirmed!</h1>
                <p className="text-text/60 mb-8">
                    Thank you for your purchase. Your order <span className="font-mono text-accent">#{id?.slice(-8).toUpperCase()}</span> has been placed successfully.
                </p>
                <div className="space-y-4">
                    <Link to="/shop">
                        <Button className="w-full">Continue Shopping</Button>
                    </Link>
                    <div className="pt-2">
                        <Link to="/" className="text-sm text-text/60 hover:text-accent underline">
                            Return to Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccess;
