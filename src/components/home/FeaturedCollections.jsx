import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const collections = [
    {
        id: 1,
        name: 'The Monthly Edit',
        image: 'https://images.unsplash.com/photo-1608226487820-22123d242963?q=80&w=1287&auto=format&fit=crop',
        link: '/shop?collection=monthly'
    },
    {
        id: 2,
        name: 'Best Sellers',
        image: 'https://images.unsplash.com/photo-1603006905393-c7da48b1bc01?q=80&w=1331&auto=format&fit=crop',
        link: '/shop?collection=bestsellers'
    },
    {
        id: 3,
        name: 'Gift Sets',
        image: 'https://images.unsplash.com/photo-1596436067786-22d7a26f343a?q=80&w=1331&auto=format&fit=crop',
        link: '/shop?collection=gifts'
    }
];

const FeaturedCollections = () => {
    return (
        <section className="py-20 bg-primary">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-4">Curated Collections</h2>
                    <p className="text-text/60 italic font-serif">Find the perfect scent for every moment.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {collections.map((collection, index) => (
                        <Link to={collection.link} key={collection.id} className="group block relative overflow-hidden">
                            <div className="aspect-[3/4] overflow-hidden bg-stone-100">
                                <img
                                    src={collection.image}
                                    alt={collection.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300" />
                            <div className="absolute bottom-8 left-0 right-0 text-center text-white">
                                <h3 className="font-serif text-xl md:text-2xl tracking-wide mb-2">{collection.name}</h3>
                                <span className="text-xs tracking-widest uppercase border-b border-white/50 pb-1 group-hover:border-white transition-colors">
                                    Explore
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedCollections;
