import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import { Link } from 'react-router-dom';
import { contentAPI } from '../../services/api';

const Hero = () => {
    const [content, setContent] = useState(null);
    const [loading, setLoading] = useState(true);
    const API_URL = import.meta.env.VITE_API_URL || '';

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const data = await contentAPI.getBySection('hero');
                setContent(data);
            } catch (error) {
                console.error('Failed to fetch hero content:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchContent();
    }, []);

    if (loading) return <section className="h-[90vh] bg-stone-900" />;

    const title = content?.title || 'Illuminate Your Senses';
    const subtitle = content?.subtitle || 'The Art of Slow Living';
    const description = content?.description1 || 'Hand-poured candles crafted to bring specific moods and memories to life.';
    const image = content?.image ? (content.image.startsWith('http') ? content.image : `${API_URL}${content.image}`) : 'https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=2670';
    const linkText = content?.linkText || 'Shop Collection';
    const linkPath = content?.link || '/shop';

    return (
        <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src={image}
                    alt={title}
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
                        {subtitle}
                    </span>
                    <h1 className="font-serif text-4xl md:text-7xl lg:text-8xl mb-6 leading-tight">
                        {title.includes('Senses') ? (
                            <>
                                {title.split('Senses')[0]}
                                <span className="italic">Senses</span>
                                {title.split('Senses')[1]}
                            </>
                        ) : title}
                    </h1>
                    <p className="text-lg md:text-xl font-light mb-10 max-w-2xl mx-auto text-white/90">
                        {description}
                    </p>

                    <Link to={linkPath}>
                        <Button variant="outline">
                            {linkText}
                        </Button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
