import React, { useState, useEffect } from 'react';
import { contentAPI } from '../services/api';

const Story = () => {
    const [heroContent, setHeroContent] = useState(null);
    const [ingredientsContent, setIngredientsContent] = useState(null);
    const [loading, setLoading] = useState(true);
    const API_URL = import.meta.env.VITE_API_URL || '';

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const [hero, ingredients] = await Promise.all([
                    contentAPI.getBySection('story-page-hero'),
                    contentAPI.getBySection('story-page-ingredients')
                ]);
                setHeroContent(hero);
                setIngredientsContent(ingredients);
            } catch (error) {
                console.error('Failed to fetch story page content:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchContent();
    }, []);

    if (loading) return <div className="min-h-screen bg-primary" />;

    const heroTitle = heroContent?.title || 'Our Story';
    const heroDesc = heroContent?.description1 || 'Crafting moments of peace in a busy world.';
    const heroImage = heroContent?.image ? (heroContent.image.startsWith('http') ? heroContent.image : `${API_URL}${heroContent.image}`) : 'https://images.unsplash.com/photo-1608226487820-22123d242963?q=80&w=1470';

    const ingTitle = ingredientsContent?.title || 'Intentionally Crafted';
    const ingDesc1 = ingredientsContent?.description1 || "We believe that what you bring into your home matters. That's why we use only simple, high-quality ingredients.";
    const ingDesc2 = ingredientsContent?.description2 || 'Our wax is a sustainable soy blend, our wicks are lead-free cotton-core, and our fragrances are free from phthalates and harsh chemicals.';
    const ingImage = ingredientsContent?.image ? (ingredientsContent.image.startsWith('http') ? ingredientsContent.image : `${API_URL}${ingredientsContent.image}`) : 'https://images.unsplash.com/photo-1603530990490-6da49646be7e?q=80&w=1287';

    return (
        <div className="bg-primary min-h-screen">
            {/* Hero for Story */}
            <div className="relative h-[60vh] flex items-center justify-center bg-stone-900 overflow-hidden">
                <img
                    src={heroImage}
                    alt={heroTitle}
                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                />
                <div className="relative z-10 text-center text-white px-4">
                    <h1 className="font-serif text-5xl md:text-7xl mb-4">{heroTitle}</h1>
                    <p className="text-lg md:text-xl font-light tracking-wide">{heroDesc}</p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-20 sm:px-6 lg:px-8 space-y-20">

                <section className="text-center">
                    <h2 className="font-serif text-3xl text-charcoal mb-8">The Beginning</h2>
                    <p className="text-text/80 leading-loose text-lg">
                        It started with a simple desire: to slow down. In a world that constantly demands our attention, we wanted to create something that invites you to pause, breathe, and just be.
                        Our candles are born from this philosophy of "slow living" — taking the time to appreciate the small, quiet moments that make life beautiful.
                    </p>
                </section>

                <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="aspect-auto bg-stone-100">
                        <img src={ingImage} alt={ingTitle} className="w-full h-full object-cover shadow-lg" />
                    </div>
                    <div className="space-y-6">
                        <h3 className="font-serif text-2xl text-charcoal">{ingTitle}</h3>
                        <p className="text-text/80 leading-relaxed">
                            {ingDesc1}
                        </p>
                        <p className="text-text/80 leading-relaxed">
                            {ingDesc2}
                        </p>
                    </div>
                </section>

                <section className="text-center bg-secondary/30 p-12 rounded-sm">
                    <h3 className="font-serif text-2xl text-charcoal mb-4">The "Lagom" Philosophy</h3>
                    <p className="text-text/80 leading-relaxed italic">
                        "Not too little, not too much. Just right."
                    </p>
                    <p className="text-text/80 leading-relaxed mt-4">
                        We draw inspiration from the Swedish concept of Lagom. We strive for balance in everything we do — from the strength of our scents to the simplicity of our design.
                    </p>
                </section>

            </div>
        </div>
    );
};

export default Story;
