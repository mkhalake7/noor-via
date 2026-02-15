import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ShoppingBag, Menu, X, Search, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import logo from '../../assets/logo.png';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { cartCount } = useCart();
    const { user, logout } = useAuth();

    const toggleMenu = () => setIsOpen(!isOpen);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Shop', path: '/shop' },
        { name: 'Our Story', path: '/story' },
    ];

    return (
        <nav className="relative w-full z-50 bg-primary border-b border-stone-100 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-24">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/" className="flex items-center">
                            <div className="w-64 h-20 overflow-hidden flex items-center justify-center">
                                <img src={logo} alt="NoorVia" className="h-10 w-auto scale-[4.5] object-contain" />
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-10 items-center">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.name}
                                to={link.path}
                                className={({ isActive }) =>
                                    `text-[22px] font-normal font-sans transition-colors duration-300 hover:text-accent opacity-90 hover:opacity-100 px-4 ${isActive ? 'text-accent' : 'text-text'
                                    }`
                                }
                            >
                                {link.name}
                            </NavLink>
                        ))}
                    </div>

                    {/* Icons */}
                    <div className="hidden md:flex items-center space-x-8">
                        <button className="text-text hover:text-accent transition-colors">
                            <Search size={28} strokeWidth={1.2} />
                        </button>
                        <Link to="/cart" className="text-text hover:text-accent transition-colors relative">
                            <ShoppingBag size={28} strokeWidth={1.2} />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-accent text-white text-[11px] w-5 h-5 rounded-full flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                        {user ? (
                            <div className="flex items-center space-x-4">
                                <span className="text-sm font-medium text-charcoal">Hi, {user.name.split(' ')[0]}</span>
                                <button onClick={logout} className="text-text hover:text-accent transition-colors">
                                    <User size={28} strokeWidth={1.2} className="text-accent" />
                                </button>
                            </div>
                        ) : (
                            <Link to="/login" className="text-text hover:text-accent transition-colors">
                                <User size={28} strokeWidth={1.2} />
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={toggleMenu}
                            className="text-text hover:text-accent focus:outline-none"
                        >
                            {isOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-primary border-t border-stone-200"
                    >
                        <div className="px-4 pt-4 pb-6 space-y-4 flex flex-col items-center">
                            {navLinks.map((link) => (
                                <NavLink
                                    key={link.name}
                                    to={link.path}
                                    onClick={toggleMenu}
                                    className={({ isActive }) =>
                                        `text-lg tracking-widest uppercase transition-colors duration-300 ${isActive ? 'text-accent' : 'text-text'
                                        }`
                                    }
                                >
                                    {link.name}
                                </NavLink>
                            ))}
                            <div className="flex space-x-6 pt-4 border-t border-stone-200 w-full justify-center">
                                <Link to="/cart" onClick={toggleMenu} className="flex items-center space-x-2 text-text">
                                    <ShoppingBag size={20} strokeWidth={1.5} />
                                    <span>Cart ({cartCount})</span>
                                </Link>
                                {user ? (
                                    <div className="flex flex-col items-center space-y-4">
                                        <span className="text-sm font-medium">Hi, {user.name}</span>
                                        <button
                                            onClick={() => { logout(); toggleMenu(); }}
                                            className="text-accent text-sm underline"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                ) : (
                                    <Link to="/login" onClick={toggleMenu} className="flex items-center space-x-2 text-text">
                                        <User size={20} strokeWidth={1.5} />
                                        <span>Login</span>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
