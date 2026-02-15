import React from 'react';
import Hero from '../components/home/Hero';
import FeaturedCollections from '../components/home/FeaturedCollections';
import StoryTeaser from '../components/home/StoryTeaser';
import { motion } from 'framer-motion';

const Home = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Hero />
            <FeaturedCollections />
            <StoryTeaser />
            {/* Newsletter Section could go here if separate from Footer, but Footer covers it */}
        </motion.div>
    );
};

export default Home;
