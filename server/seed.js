import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';
import User from './models/User.js';

dotenv.config();

const products = [
    {
        name: "Midnight Amber",
        price: 2999,
        category: "Signature",
        image: "https://images.unsplash.com/photo-1608226487820-22123d242963?q=80&w=1470&auto=format&fit=crop",
        scent: "Amber, Sandalwood, Vanilla",
        description: "A warm and inviting scent perfect for cozy evenings."
    },
    {
        name: "Coastal Breeze",
        price: 2799,
        category: "Fresh",
        image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=1287&auto=format&fit=crop",
        scent: "Sea Salt, Driftwood, Lavender",
        description: "Bring the freshness of the ocean into your home."
    },
    {
        name: "Golden Hour",
        price: 3299,
        category: "Floral",
        image: "https://images.unsplash.com/photo-1610484557760-2646ba433b9b?q=80&w=1287&auto=format&fit=crop",
        scent: "Bergamot, Jasmine, Musk",
        description: "Capturing the magical light of sunset in a jar."
    },
    {
        name: "Fireside Tales",
        price: 3099,
        category: "Woody",
        image: "https://images.unsplash.com/photo-1570823343811-949236fcc65d?q=80&w=1331&auto=format&fit=crop",
        scent: "Cedar, Clove, Smoke",
        description: "Reminiscent of stories told around a crackling fire."
    },
    {
        name: "Rose Garden",
        price: 2899,
        category: "Floral",
        image: "https://images.unsplash.com/photo-1608508644127-513d4b854726?q=80&w=1287&auto=format&fit=crop",
        scent: "Rose Petals, Peony, Green Leaves",
        description: "A walk through a blooming English garden."
    },
    {
        name: "Morning Dew",
        price: 2599,
        category: "Fresh",
        image: "https://images.unsplash.com/photo-1595246140625-573b715d11dc?q=80&w=1471&auto=format&fit=crop",
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
        console.log('Cleared existing data');

        // Seed products
        await Product.insertMany(products);
        console.log(`✅ Seeded ${products.length} products`);

        // Seed admin user
        await User.create({
            name: 'Admin',
            email: 'admin@noorvia.com',
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
