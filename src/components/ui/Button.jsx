import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
    const baseStyles = "px-8 py-3 uppercase tracking-widest text-sm font-semibold transition-colors duration-300";

    const variants = {
        primary: "bg-charcoal text-white hover:bg-accent hover:text-white",
        secondary: "bg-white text-charcoal border border-charcoal hover:bg-charcoal hover:text-white",
        outline: "bg-transparent text-white border border-white hover:bg-white hover:text-charcoal",
        text: "bg-transparent text-charcoal hover:text-accent underline-offset-4 hover:underline p-0 px-0 py-0"
    };

    return (
        <motion.button
            whileTap={{ scale: 0.98 }}
            className={`${baseStyles} ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </motion.button>
    );
};

export default Button;
