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
        <nav className="relative w-full z-50 bg-[#000000] border-b border-[#231F20] transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-[84px]">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/" className="flex items-center">
                            <div className="w-20 h-20 bg-white rounded-full overflow-hidden flex items-center justify-center border-2 border-[#231F20] shadow-sm">
                                <img src={logo} alt="NoorVia" className="h-10 w-auto scale-[4.0] object-contain" />
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-8 items-center">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.name}
                                to={link.path}
                                className={({ isActive }) =>
                                    `text-[18px] font-medium font-sans uppercase tracking-[0.1em] transition-colors duration-300 hover:text-stone-300 ${isActive ? 'text-white' : 'text-stone-100'
                                    }`
                                }
                            >
                                {link.name}
                            </NavLink>
                        ))}
                    </div>

                    {/* Icons */}
                    <div className="hidden md:flex items-center space-x-6">
                        <button className="text-white hover:text-stone-300 transition-colors">
                            <Search size={24} strokeWidth={1.5} />
                        </button>
                        <Link to="/cart" className="text-white hover:text-stone-300 transition-colors relative">
                            <ShoppingBag size={24} strokeWidth={1.5} />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-white text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                        {user ? (
                            <div className="flex items-center space-x-4">
                                <span className="text-sm font-medium text-stone-200">Hi, {user.name.split(' ')[0]}</span>
                                <button onClick={logout} className="text-white hover:text-stone-300 transition-colors">
                                    <User size={24} strokeWidth={1.5} />
                                </button>
                            </div>
                        ) : (
                            <Link to="/login" className="text-white hover:text-stone-300 transition-colors">
                                <User size={24} strokeWidth={1.5} />
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
                        className="md:hidden bg-[#000000] border-t border-[#231F20]"
                    >
                        <div className="px-4 pt-4 pb-6 space-y-4 flex flex-col items-center">
                            {navLinks.map((link) => (
                                <NavLink
                                    key={link.name}
                                    to={link.path}
                                    onClick={toggleMenu}
                                    className={({ isActive }) =>
                                        `text-lg tracking-widest uppercase transition-colors duration-300 ${isActive ? 'text-white' : 'text-stone-300'
                                        }`
                                    }
                                >
                                    {link.name}
                                </NavLink>
                            ))}
                            <div className="flex space-x-6 pt-4 border-t border-[#231F20] w-full justify-center">
                                <Link to="/cart" onClick={toggleMenu} className="flex items-center space-x-2 text-stone-100">
                                    <ShoppingBag size={20} strokeWidth={1.5} />
                                    <span>Cart ({cartCount})</span>
                                </Link>
                                {user ? (
                                    <div className="flex flex-col items-center space-y-4">
                                        <span className="text-sm font-medium text-stone-200">Hi, {user.name}</span>
                                        <button
                                            onClick={() => { logout(); toggleMenu(); }}
                                            className="text-white text-sm underline"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                ) : (
                                    <Link to="/login" onClick={toggleMenu} className="flex items-center space-x-2 text-stone-100">
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
