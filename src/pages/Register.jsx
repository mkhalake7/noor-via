import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            return setError('Passwords do not match');
        }

        if (formData.password.length < 6) {
            return setError('Password must be at least 6 characters');
        }

        setLoading(true);
        try {
            await register(formData.name, formData.email, formData.phone, formData.password);
            navigate(from, { replace: true });
        } catch (err) {
            setError(err.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-vh-80 bg-primary py-20 px-4">
            <div className="bg-white p-8 rounded-lg shadow-sm border border-stone-100 w-full max-w-md">
                <h2 className="text-3xl font-serif text-charcoal mb-2 text-center">Create Account</h2>
                <p className="text-text/60 text-sm text-center mb-8">Join Noor-via for a better experience.</p>

                {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

                <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                        <label className="block text-sm text-text/60 mb-1">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full border border-stone-200 p-3 rounded focus:outline-none focus:border-accent"
                            placeholder="John Doe"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-text/60 mb-1">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full border border-stone-200 p-3 rounded focus:outline-none focus:border-accent"
                            placeholder="john@example.com"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-text/60 mb-1">Phone Number</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full border border-stone-200 p-3 rounded focus:outline-none focus:border-accent"
                            placeholder="+91 9876543210"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-text/60 mb-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full border border-stone-200 p-3 rounded focus:outline-none focus:border-accent"
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-text/60 mb-1">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full border border-stone-200 p-3 rounded focus:outline-none focus:border-accent"
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    <Button type="submit" className="w-full py-3 mt-2" disabled={loading}>
                        {loading ? 'Creating Account...' : 'Register'}
                    </Button>
                </form>

                <div className="mt-8 pt-6 border-t border-stone-100 text-center">
                    <p className="text-sm text-text/60">
                        Already have an account?{' '}
                        <Link to="/login" className="text-accent font-medium hover:underline" state={{ from: location.state?.from }}>
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
