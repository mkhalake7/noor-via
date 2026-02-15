import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // Redirect to where they were going or to home
    const from = location.state?.from?.pathname || "/";

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await login(email, password);
            navigate(from, { replace: true });
        } catch (err) {
            setError(err.message || 'Invalid credentials');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-vh-80 bg-primary py-20 px-4">
            <div className="bg-white p-8 rounded-lg shadow-sm border border-stone-100 w-full max-w-md">
                <h2 className="text-3xl font-serif text-charcoal mb-2 text-center">Welcome Back</h2>
                <p className="text-text/60 text-sm text-center mb-8">Login to manage your orders and faster checkout.</p>

                {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-sm text-text/60 mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border border-stone-200 p-3 rounded focus:outline-none focus:border-accent"
                            placeholder="your@email.com"
                            required
                        />
                    </div>
                    <div>
                        <div className="flex justify-between items-center mb-1">
                            <label className="block text-sm text-text/60">Password</label>
                        </div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border border-stone-200 p-3 rounded focus:outline-none focus:border-accent"
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    <Button type="submit" className="w-full py-3 mt-2" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </Button>
                </form>

                <div className="mt-8 pt-6 border-t border-stone-100 text-center">
                    <p className="text-sm text-text/60">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-accent font-medium hover:underline" state={{ from: location.state?.from }}>
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
