import React from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=2670&auto=format&fit=crop"
                    alt="Serene candle setting"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20" /> {/* Overlay for readability */}
            </div>

            {/* Content */}
            <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <span className="block text-sm md:text-base tracking-[0.3em] font-light mb-4 uppercase">
                        The Art of Slow Living
                    </span>
                    <h1 className="font-serif text-4xl md:text-7xl lg:text-8xl mb-6 leading-tight">
                        Illuminate Your <br />
                        <span className="italic">Senses</span>
                    </h1>
                    <p className="text-lg md:text-xl font-light mb-10 max-w-2xl mx-auto text-white/90">
                        Hand-poured candles crafted to bring specific moods and memories to life.
                    </p>

                    <Link to="/shop">
                        <Button variant="outline">
                            Shop Collection
                        </Button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
