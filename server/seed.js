import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';
import User from './models/User.js';
import StoreContent from './models/StoreContent.js';

dotenv.config();

const products = [
    {
        name: "Midnight Amber",
        price: 2999,
        category: "Signature",
        image: "/uploads/products/midnight_amber.jpg",
        scent: "Amber, Sandalwood, Vanilla",
        description: "A warm and inviting scent perfect for cozy evenings."
    },
    {
        name: "Coastal Breeze",
        price: 2799,
        category: "Fresh",
        image: "/uploads/products/coastal_breeze.jpg",
        scent: "Sea Salt, Driftwood, Lavender",
        description: "Bring the freshness of the ocean into your home."
    },
    {
        name: "Golden Hour",
        price: 3299,
        category: "Floral",
        image: "/uploads/products/golden_hour.jpg",
        scent: "Bergamot, Jasmine, Musk",
        description: "Capturing the magical light of sunset in a jar."
    },
    {
        name: "Fireside Tales",
        price: 3099,
        category: "Woody",
        image: "/uploads/products/fireside_tales.jpg",
        scent: "Cedar, Clove, Smoke",
        description: "Reminiscent of stories told around a crackling fire."
    },
    {
        name: "Rose Garden",
        price: 2899,
        category: "Floral",
        image: "/uploads/products/rose_garden.jpg",
        scent: "Rose Petals, Peony, Green Leaves",
        description: "A walk through a blooming English garden."
    },
    {
        name: "Morning Dew",
        price: 2599,
        category: "Fresh",
        image: "/uploads/products/morning_dew.jpg",
        scent: "Rain, Grass, Melon",
        description: "Clean, crisp, and refreshing start to the day."
    }
];

const seed = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Clear existing data
        await Product.deleteMany({});
        await User.deleteMany({});
        await StoreContent.deleteMany({});
        console.log('Cleared existing data');

        // Seed products
        await Product.insertMany(products);
        console.log(`✅ Seeded ${products.length} products`);

        // Seed initial store content
        const content = [
            {
                section: 'hero',
                title: 'Illuminate Your Senses',
                subtitle: 'The Art of Slow Living',
                description1: 'Hand-poured candles crafted to bring specific moods and memories to life.',
                image: '/uploads/layout/hero_bg.jpg',
                link: '/shop',
                linkText: 'Shop Collection'
            },
            {
                section: 'story-teaser',
                title: 'Crafted with Intention',
                description1: 'Our candles are more than just wax and wick. They are an invitation to slow down, to breathe, and to reconnect with yourself. Each candle is hand-poured in small batches using sustainable soy blend wax and premium, phthalate-free fragrances.',
                description2: 'Inspired by nature and memory, our scents are designed to transport you to your happy place.',
                image: '/uploads/layout/story_teaser.jpg',
                link: '/story',
                linkText: 'Read Our Story'
            },
            {
                section: 'story-page-hero',
                title: 'Our Story',
                description1: 'Crafting moments of peace in a busy world.',
                image: '/uploads/layout/story_hero.jpg'
            },
            {
                section: 'story-page-ingredients',
                title: 'Intentionally Crafted',
                description1: "We believe that what you bring into your home matters. That's why we use only simple, high-quality ingredients.",
                description2: 'Our wax is a sustainable soy blend, our wicks are lead-free cotton-core, and our fragrances are free from phthalates and harsh chemicals.',
                image: '/uploads/layout/story_ingredients.jpg'
            }
        ];

        for (const item of content) {
            await StoreContent.create(item);
        }
        console.log(`✅ Seeded ${content.length} store content sections`);

        // Seed admin user
        await User.create({
            name: 'Admin',
            email: 'admin@noorvia.com',
            phone: '+919064427294',
            password: 'admin123',
            role: 'admin'
        });
        console.log('✅ Created admin user (admin@noorvia.com / admin123)');

        process.exit(0);
    } catch (error) {
        console.error('❌ Seed error:', error.message);
        process.exit(1);
    }
};

seed();
