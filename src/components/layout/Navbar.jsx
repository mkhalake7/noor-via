import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShoppingBag, Menu, X, Search, User, ArrowRight, LogOut, Settings, ClipboardList, LayoutDashboard, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useWishlist } from '../../context/WishlistContext';
import logo from '../../assets/logo.png';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const { cartCount } = useCart();
    const { user, logout } = useAuth();
    const { wishlistCount } = useWishlist();

    // Close dropdowns on click outside
    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (isProfileOpen && !event.target.closest('.profile-section')) {
                setIsProfileOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isProfileOpen]);

    const toggleMenu = () => setIsOpen(!isOpen);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
            setIsSearchOpen(false);
            setSearchQuery('');
        }
    };

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Shop', path: '/shop' },
        { name: 'Our Story', path: '/story' },
        { name: 'Contact Us', path: '/contact' },
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
                        <div className="relative flex items-center">
                            <AnimatePresence>
                                {isSearchOpen && (
                                    <motion.form
                                        initial={{ width: 0, opacity: 0 }}
                                        animate={{ width: 240, opacity: 1 }}
                                        exit={{ width: 0, opacity: 0 }}
                                        onSubmit={handleSearch}
                                        className="absolute right-10 flex border-b border-white"
                                    >
                                        <input
                                            type="text"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            placeholder="Search candles..."
                                            className="bg-transparent text-white text-sm py-1 px-2 focus:outline-none w-full"
                                            autoFocus
                                        />
                                        <button type="submit" className="text-white p-1">
                                            <ArrowRight size={16} />
                                        </button>
                                    </motion.form>
                                )}
                            </AnimatePresence>
                            <button
                                onClick={() => setIsSearchOpen(!isSearchOpen)}
                                className="text-white hover:text-stone-300 transition-colors"
                            >
                                <Search size={24} strokeWidth={1.5} />
                            </button>
                        </div>
                        {(!user || user.role !== 'admin') && (
                            <>
                                <Link to="/wishlist" className="text-white hover:text-stone-300 transition-colors relative">
                                    <Heart size={24} strokeWidth={1.5} />
                                    {wishlistCount > 0 && (
                                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                                            {wishlistCount}
                                        </span>
                                    )}
                                </Link>
                                <Link to="/cart" className="text-white hover:text-stone-300 transition-colors relative">
                                    <ShoppingBag size={24} strokeWidth={1.5} />
                                    {cartCount > 0 && (
                                        <span className="absolute -top-1 -right-1 bg-white text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                                            {cartCount}
                                        </span>
                                    )}
                                </Link>
                            </>
                        )}

                        {/* Profile Dropdown */}
                        <div className="relative profile-section">
                            {user ? (
                                <div className="flex items-center space-x-4">
                                    <button
                                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                                        className="flex items-center space-x-2 text-white hover:text-stone-300 transition-colors focus:outline-none"
                                    >
                                        <span className="text-sm font-medium text-stone-200">Hi, {user.name.split(' ')[0]}</span>
                                        <User size={24} strokeWidth={1.5} />
                                    </button>

                                    <AnimatePresence>
                                        {isProfileOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 15, scale: 0.95 }}
                                                transition={{ duration: 0.2, ease: "easeOut" }}
                                                className="absolute right-0 top-full mt-4 w-64 bg-black/90 backdrop-blur-xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-xl overflow-hidden z-[60]"
                                            >
                                                <div className="px-5 py-4 bg-white/5 border-b border-white/10">
                                                    <p className="text-[10px] uppercase tracking-[0.2em] text-stone-500 mb-1">Authenticated Account</p>
                                                    <p className="text-sm font-medium text-white truncate">{user.email}</p>
                                                </div>

                                                <div className="py-2">
                                                    {user.role !== 'admin' && (
                                                        <>
                                                            <Link
                                                                to="/account"
                                                                className="flex items-center space-x-3 px-5 py-3 text-sm text-stone-300 hover:bg-white/10 hover:text-white transition-all duration-200 group"
                                                                onClick={() => setIsProfileOpen(false)}
                                                            >
                                                                <Settings size={18} className="text-stone-500 group-hover:text-white transition-colors" />
                                                                <span>My Account</span>
                                                            </Link>
                                                            <Link
                                                                to="/orders"
                                                                className="flex items-center space-x-3 px-5 py-3 text-sm text-stone-300 hover:bg-white/10 hover:text-white transition-all duration-200 group"
                                                                onClick={() => setIsProfileOpen(false)}
                                                            >
                                                                <ClipboardList size={18} className="text-stone-500 group-hover:text-white transition-colors" />
                                                                <span>Order History</span>
                                                            </Link>
                                                            <Link
                                                                to="/wishlist"
                                                                className="flex items-center space-x-3 px-5 py-3 text-sm text-stone-300 hover:bg-white/10 hover:text-white transition-all duration-200 group"
                                                                onClick={() => setIsProfileOpen(false)}
                                                            >
                                                                <Heart size={18} className="text-stone-500 group-hover:text-white transition-colors" />
                                                                <span>My Wishlist</span>
                                                            </Link>
                                                        </>
                                                    )}
                                                    {user.role === 'admin' && (
                                                        <Link
                                                            to="/admin"
                                                            className="flex items-center space-x-3 px-5 py-3 text-sm text-stone-300 hover:bg-white/10 hover:text-white transition-all duration-200 group"
                                                            onClick={() => setIsProfileOpen(false)}
                                                        >
                                                            <LayoutDashboard size={18} className="text-stone-500 group-hover:text-white transition-colors" />
                                                            <span>Admin Dashboard</span>
                                                        </Link>
                                                    )}
                                                </div>

                                                <button
                                                    onClick={() => { logout(); setIsProfileOpen(false); }}
                                                    className="w-full flex items-center space-x-3 px-5 py-4 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-200 border-t border-white/5"
                                                >
                                                    <LogOut size={18} />
                                                    <span className="font-medium">Sign Out</span>
                                                </button>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ) : (
                                <Link to="/login" className="text-white hover:text-stone-300 transition-colors">
                                    <User size={24} strokeWidth={1.5} />
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={toggleMenu}
                            className="text-white hover:text-stone-300 focus:outline-none p-2"
                            aria-label="Toggle Menu"
                        >
                            {isOpen ? <X size={28} strokeWidth={1} /> : <Menu size={28} strokeWidth={1} />}
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
                            {/* Mobile Search */}
                            <form onSubmit={handleSearch} className="w-full flex border-b border-[#231F20] mb-4">
                                <Search size={20} className="text-stone-400 m-2" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search candles..."
                                    className="bg-transparent text-white py-2 px-1 focus:outline-none w-full"
                                />
                            </form>

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
                                {user?.role === 'admin' ? (
                                    <Link to="/admin/dashboard" onClick={toggleMenu} className="flex items-center space-x-2 text-stone-100">
                                        <LayoutDashboard size={20} strokeWidth={1.5} />
                                        <span>Dashboard</span>
                                    </Link>
                                ) : (
                                    <Link to="/cart" onClick={toggleMenu} className="flex items-center space-x-2 text-stone-100">
                                        <ShoppingBag size={20} strokeWidth={1.5} />
                                        <span>Cart ({cartCount})</span>
                                    </Link>
                                )}
                                {(!user || user.role !== 'admin') && (
                                    <Link to="/wishlist" onClick={toggleMenu} className="flex items-center space-x-2 text-stone-100">
                                        <Heart size={20} strokeWidth={1.5} />
                                        <span>Wishlist ({wishlistCount})</span>
                                    </Link>
                                )}
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
