import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter } from 'lucide-react';
import logo from '../../assets/logo.png';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-stone-200 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="space-y-4">
                        <Link to="/" className="inline-block">
                            <div className="w-32 h-32 overflow-hidden flex items-center justify-center ml-0">
                                <img src={logo} alt="NoorVia" className="scale-[3.5] object-contain" />
                            </div>
                        </Link>
                        <p className="text-text/80 text-sm leading-relaxed">
                            Hand-poured luxury candles made with sustainable soy wax and premium fragrances. bringing everyday magic to your space.
                        </p>
                    </div>

                    {/* Shop */}
                    <div className="space-y-4">
                        <h4 className="font-serif text-lg text-charcoal">Shop</h4>
                        <ul className="space-y-2 text-sm text-text/80">
                            <li><Link to="/shop" className="hover:text-accent transition-colors">All Candles</Link></li>
                            <li><Link to="/shop?collection=new" className="hover:text-accent transition-colors">New Arrivals</Link></li>
                            <li><Link to="/shop?collection=bestsellers" className="hover:text-accent transition-colors">Best Sellers</Link></li>
                            <li><Link to="/gift-sets" className="hover:text-accent transition-colors">Gift Sets</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div className="space-y-4">
                        <h4 className="font-serif text-lg text-charcoal">Support</h4>
                        <ul className="space-y-2 text-sm text-text/80">
                            <li><Link to="/contact" className="hover:text-accent transition-colors">Contact Us</Link></li>
                            <li><Link to="/faq" className="hover:text-accent transition-colors">FAQs</Link></li>
                            <li><Link to="/shipping" className="hover:text-accent transition-colors">Shipping & Returns</Link></li>
                            <li><Link to="/terms" className="hover:text-accent transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="space-y-4">
                        <h4 className="font-serif text-lg text-charcoal">Stay Connected</h4>
                        <p className="text-text/80 text-sm">Subscribe to receive updates, access to exclusive deals, and more.</p>
                        <form className="flex flex-col space-y-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="border border-stone-300 px-4 py-2 text-sm focus:outline-none focus:border-accent bg-transparent"
                            />
                            <button
                                type="submit"
                                className="bg-charcoal text-white px-4 py-2 text-sm tracking-widest hover:bg-accent transition-colors uppercase"
                            >
                                Subscribe
                            </button>
                        </form>
                        <div className="flex space-x-4 mt-4 text-text/60">
                            <a href="#" className="hover:text-accent transition-colors"><Instagram size={20} strokeWidth={1.5} /></a>
                            <a href="#" className="hover:text-accent transition-colors"><Facebook size={20} strokeWidth={1.5} /></a>
                            <a href="#" className="hover:text-accent transition-colors"><Twitter size={20} strokeWidth={1.5} /></a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-stone-100 pt-8 text-center text-xs text-text/40 tracking-wider uppercase">
                    &copy; {new Date().getFullYear()} Noor-via Candles. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
