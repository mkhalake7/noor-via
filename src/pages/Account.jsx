import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import { User, Mail, Phone, Lock, Save, AlertCircle, CheckCircle } from 'lucide-react';

const Account = () => {
    const { user, updateProfile } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });
    const [status, setStatus] = useState({ type: '', message: '' });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setFormData({
                ...formData,
                name: user.name || '',
                email: user.email || '',
                phone: user.phone || ''
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (status.message) setStatus({ type: '', message: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (formData.password && formData.password !== formData.confirmPassword) {
            return setStatus({ type: 'error', message: 'Passwords do not match' });
        }

        setLoading(true);
        setStatus({ type: '', message: '' });

        try {
            const updateData = {
                name: formData.name,
                email: formData.email,
                phone: formData.phone
            };
            if (formData.password) updateData.password = formData.password;

            await updateProfile(updateData);
            setStatus({ type: 'success', message: 'Profile updated successfully' });
            // Clear password fields
            setFormData(prev => ({ ...prev, password: '', confirmPassword: '' }));
        } catch (err) {
            setStatus({ type: 'error', message: err.message || 'Failed to update profile' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black pt-32 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-4xl font-serif text-white mb-2">My Account</h1>
                    <p className="text-stone-400 font-sans tracking-wide">Manage your personal information and security.</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl"
                >
                    <AnimatePresence mode="wait">
                        {status.message && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className={`mb-8 p-4 rounded-xl flex items-center space-x-3 text-sm ${status.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
                                    }`}
                            >
                                {status.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
                                <span>{status.message}</span>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Name */}
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-[0.2em] text-stone-500 flex items-center space-x-2">
                                    <User size={12} />
                                    <span>Full Name</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-all"
                                    required
                                />
                            </div>

                            {/* Email */}
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-[0.2em] text-stone-500 flex items-center space-x-2">
                                    <Mail size={12} />
                                    <span>Email Address</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-all"
                                    required
                                />
                            </div>

                            {/* Phone */}
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-[10px] uppercase tracking-[0.2em] text-stone-500 flex items-center space-x-2">
                                    <Phone size={12} />
                                    <span>Phone Number</span>
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-all"
                                    required
                                />
                            </div>

                            <div className="md:col-span-2 pt-4">
                                <div className="h-px bg-white/10 w-full mb-8"></div>
                                <h3 className="text-white font-serif text-xl mb-6">Security</h3>
                            </div>

                            {/* Password */}
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-[0.2em] text-stone-500 flex items-center space-x-2">
                                    <Lock size={12} />
                                    <span>New Password</span>
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Leave blank to keep current"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-all placeholder:text-white/20"
                                />
                            </div>

                            {/* Confirm Password */}
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-[0.2em] text-stone-500 flex items-center space-x-2">
                                    <Lock size={12} />
                                    <span>Confirm Password</span>
                                </label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-all"
                                />
                            </div>
                        </div>

                        <div className="pt-8">
                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full py-4 flex items-center justify-center space-x-2 bg-accent text-white hover:bg-white hover:text-accent border border-accent transition-all duration-300"
                            >
                                <Save size={18} />
                                <span>{loading ? 'Saving Changes...' : 'Save Changes'}</span>
                            </Button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default Account;
