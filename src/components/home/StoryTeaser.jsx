import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import { contentAPI } from '../../services/api';

const StoryTeaser = () => {
    const [content, setContent] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchContent = async () => {
            try {
                const data = await contentAPI.getBySection('story-teaser');
                setContent(data);
            } catch (error) {
                console.error('Failed to fetch story teaser content:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchContent();
    }, []);

    if (loading) return <div className="py-20 bg-secondary/30" />;

    // Fallback if content fetch fails or not seeded yet
    const displayTitle = content?.title || 'Crafted with Intention';
    const description1 = content?.description1 || 'Our candles are more than just wax and wick. They are an invitation to slow down, to breathe, and to reconnect with yourself. Each candle is hand-poured in small batches using sustainable soy blend wax and premium, phthalate-free fragrances.';
    const description2 = content?.description2 || 'Inspired by nature and memory, our scents are designed to transport you to your happy place.';
    const image = content?.image || 'https://images.unsplash.com/photo-1602523961358-f9f03dd557db?q=80&w=2670&auto=format&fit=crop';
    const link = content?.link || '/story';
    const linkText = content?.linkText || 'Read Our Story';
    return (
        <section className="py-20 bg-secondary/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    {/* Image */}
                    <div className="order-2 md:order-1 relative">
                        <div className="aspect-[4/5] md:aspect-square overflow-hidden bg-stone-200 relative z-10">
                            <img
                                src={image}
                                alt={displayTitle}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        {/* Decorative element */}
                        <div className="absolute -bottom-6 -left-6 w-full h-full border border-charcoal/10 z-0 hidden md:block" />
                    </div>

                    {/* Content */}
                    <div className="order-1 md:order-2 md:pl-12 text-center md:text-left">
                        <h2 className="font-serif text-3xl md:text-5xl text-charcoal mb-6 leading-tight">
                            {displayTitle}
                        </h2>
                        <div className="w-16 h-px bg-accent mx-auto md:mx-0 mb-8" />
                        <p className="text-text/80 leading-relaxed mb-6">
                            {description1}
                        </p>
                        {description2 && (
                            <p className="text-text/80 leading-relaxed mb-10">
                                {description2}
                            </p>
                        )}
                        <Link to={link}>
                            <Button variant="secondary">{linkText}</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StoryTeaser;
