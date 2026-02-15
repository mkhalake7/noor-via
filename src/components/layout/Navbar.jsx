import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ShoppingBag, Menu, X, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Shop', path: '/shop' },
        { name: 'Our Story', path: '/story' },
    ];

    return (
        <nav className="fixed w-full z-50 bg-primary/90 backdrop-blur-md border-b border-stone-200 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/" className="font-serif text-2xl tracking-widest text-charcoal font-bold">
                            NOOR-VIA
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-12 items-center">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.name}
                                to={link.path}
                                className={({ isActive }) =>
                                    `text-sm tracking-widest uppercase transition-colors duration-300 hover:text-accent ${isActive ? 'text-accent border-b border-accent pb-1' : 'text-text'
                                    }`
                                }
                            >
                                {link.name}
                            </NavLink>
                        ))}
                    </div>

                    {/* Icons */}
                    <div className="hidden md:flex items-center space-x-6">
                        <button className="text-text hover:text-accent transition-colors">
                            <Search size={20} strokeWidth={1.5} />
                        </button>
                        <Link to="/cart" className="text-text hover:text-accent transition-colors relative">
                            <ShoppingBag size={20} strokeWidth={1.5} />
                            <span className="absolute -top-1 -right-1 bg-accent text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                                0
                            </span>
                        </Link>
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
                                    <span>Cart (0)</span>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
