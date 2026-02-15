import express from 'express';
import Product from '../models/Product.js';
import { protect, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// GET /api/products — List all products
router.get('/', async (req, res) => {
    try {
        const { category } = req.query;
        const filter = category && category !== 'All' ? { category } : {};
        const products = await Product.find(filter).sort({ createdAt: -1 });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET /api/products/:id — Get single product
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST /api/products — Create product (Admin only)
router.post('/', protect, isAdmin, async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE /api/products/:id — Delete product (Admin only)
router.delete('/:id', protect, isAdmin, async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json({ message: 'Product deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
