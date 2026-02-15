import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MessageSquare, Heart } from 'lucide-react';

const Contact = () => {
    return (
        <div className="bg-[#f5f1f1] min-h-screen">
            {/* Hero Image Section */}
            <div className="w-full h-[60vh] relative overflow-hidden">
                <img
                    src="/uploads/layout/contact_hero.jpg"
                    alt="NoorVia Atelier"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20" />
            </div>

            <div className="max-w-4xl mx-auto px-4 py-20 text-center">
                {/* Header */}
                <div className="mb-20">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-serif text-5xl text-charcoal mb-6"
                    >
                        Contact Us
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-text/70 text-lg leading-relaxed max-w-2xl mx-auto"
                    >
                        We are available 24x7 to help you with your order,
                        or just to talk about our scents.
                    </motion.p>
                </div>

                {/* Contact Methods Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-32">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-col items-center group cursor-pointer"
                        onClick={() => window.location.href = 'tel:+919064427294'}
                    >
                        <div className="w-20 h-20 rounded-full bg-charcoal flex items-center justify-center text-white mb-6 group-hover:bg-accent transition-colors">
                            <Phone size={32} strokeWidth={1.5} />
                        </div>
                        <h3 className="font-serif text-xl text-charcoal mb-2">Call</h3>
                        <p className="text-text/60">+91 90644 27294</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-col items-center group cursor-pointer"
                        onClick={() => window.location.href = 'https://wa.me/919064427294'}
                    >
                        <div className="w-20 h-20 rounded-full bg-charcoal flex items-center justify-center text-white mb-6 group-hover:bg-accent transition-colors">
                            <MessageSquare size={32} strokeWidth={1.5} />
                        </div>
                        <h3 className="font-serif text-xl text-charcoal mb-2">WhatsApp</h3>
                        <p className="text-text/60">+91 90644 27294</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-col items-center group cursor-pointer"
                        onClick={() => window.location.href = 'mailto:hello@noorvia.com'}
                    >
                        <div className="w-20 h-20 rounded-full bg-charcoal flex items-center justify-center text-white mb-6 group-hover:bg-accent transition-colors">
                            <Mail size={32} strokeWidth={1.5} />
                        </div>
                        <h3 className="font-serif text-xl text-charcoal mb-2">Email</h3>
                        <p className="text-text/60">hello@noorvia.com</p>
                    </motion.div>
                </div>

                {/* Gifting Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="border-t border-stone-200 pt-32 pb-20 max-w-2xl mx-auto"
                >
                    <h2 className="font-serif text-4xl text-charcoal mb-8">Gifting Made Easy</h2>
                    <p className="text-text/70 leading-relaxed mb-6">
                        For bulk orders and candle gifting, look no further.
                        NoorVia candles are the ultimate treat for a candle-lover,
                        offering a sensory experience like no other.
                    </p>
                    <div className="flex justify-center text-charcoal mt-10">
                        <Heart size={24} fill="currentColor" />
                    </div>
                </motion.div>

                {/* Contact Form Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-white border border-stone-200 rounded-3xl p-12 md:p-16 text-left shadow-sm mt-20"
                >
                    <h3 className="font-serif text-3xl text-charcoal mb-12 text-center">Send Us a Message</h3>
                    <form className="space-y-8 max-w-2xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-widest font-bold text-text/50 ml-1">Full Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    className="w-full bg-transparent border-b border-stone-300 py-3 focus:outline-none focus:border-charcoal transition-colors font-sans text-charcoal"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-widest font-bold text-text/50 ml-1">Email Address</label>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full bg-transparent border-b border-stone-300 py-3 focus:outline-none focus:border-charcoal transition-colors font-sans text-charcoal"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-widest font-bold text-text/50 ml-1">Message</label>
                            <textarea
                                rows="4"
                                placeholder="How can we help you?"
                                className="w-full bg-transparent border-b border-stone-300 py-3 focus:outline-none focus:border-charcoal transition-colors font-sans text-charcoal resize-none"
                            ></textarea>
                        </div>

                        <div className="flex justify-center pt-8">
                            <button
                                type="submit"
                                className="bg-charcoal text-white px-16 py-4 rounded-full font-bold tracking-[0.2em] hover:bg-accent transition-colors uppercase text-xs"
                            >
                                Send Message
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default Contact;
