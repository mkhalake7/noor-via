import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import productRoutes from './routes/products.js';
import authRoutes from './routes/auth.js';
import cartRoutes from './routes/cart.js';
import orderRoutes from './routes/orders.js';
import contentRoutes from './routes/content.js';

dotenv.config();

const app = express();

// Security Middleware
app.use(helmet());
app.disable('x-powered-by');
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Custom NoSQL Injection Protection
const sanitize = (obj) => {
    if (obj instanceof Object) {
        for (const key in obj) {
            if (key.startsWith('$') || key.includes('.')) {
                delete obj[key];
            } else {
                sanitize(obj[key]);
            }
        }
    }
};

app.use((req, res, next) => {
    sanitize(req.body);
    sanitize(req.query);
    sanitize(req.params);
    next();
});

app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/content', contentRoutes);

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Noor-via API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('SERVER ERROR:', err);
    res.status(500).json({
        message: 'Internal Server Error',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
});

// Connect to DB and start server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
});
