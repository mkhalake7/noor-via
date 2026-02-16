import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/ui/Button';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { user, loading: authLoading, login } = useAuth();
    const navigate = useNavigate();

    // If already logged in as admin, redirect to dashboard
    useEffect(() => {
        if (!authLoading && user && user.role === 'admin') {
            navigate('/admin/dashboard', { replace: true });
        }
    }, [user, authLoading, navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const loggedInUser = await login(email, password);
            if (loggedInUser.role === 'admin') {
                navigate('/admin/dashboard');
            } else {
                setError('Admin access required.');
            }
        } catch (err) {
            setError(err.message || 'Invalid credentials');
        } finally {
            setLoading(false);
        }
    };

    // Show loading while checking auth state
    if (authLoading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    // If already logged in as admin, don't flash the form
    if (user && user.role === 'admin') {
        return <div className="min-h-screen flex items-center justify-center">Redirecting to dashboard...</div>;
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-primary">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-serif text-charcoal mb-6 text-center">Admin Login</h2>
                {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-sm text-text/60 mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border border-stone-200 p-2 rounded focus:outline-none focus:border-accent"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-text/60 mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border border-stone-200 p-2 rounded focus:outline-none focus:border-accent"
                            required
                        />
                    </div>
                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </Button>
                </form>
                <div className="mt-4 text-center text-xs text-text/40">
                    Use: admin@noorvia.com / admin123
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;

