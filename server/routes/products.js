import express from 'express';
import Product from '../models/Product.js';
import { protect, isAdmin } from '../middleware/auth.js';
import validateId from '../middleware/validateId.js';
import upload, { processImage } from '../middleware/upload.js';

const router = express.Router();

// POST /api/products/upload — Upload image (Admin only)
router.post('/upload', protect, isAdmin, upload.single('image'), processImage, (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No image uploaded' });
    }
    res.json({ url: req.file.destinationPath });
});

// GET /api/products — List all products
router.get('/', async (req, res) => {
    try {
        const { category, search } = req.query;
        const filter = {};

        if (category && category !== 'All') {
            filter.category = category;
        }

        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { scent: { $regex: search, $options: 'i' } }
            ];
        }

        const products = await Product.find(filter).sort({ createdAt: -1 });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET /api/products/:id — Get single product
router.get('/:id', validateId, async (req, res) => {
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

// PUT /api/products/:id — Update product (Admin only)
router.put('/:id', protect, isAdmin, validateId, async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE /api/products/:id — Delete product (Admin only)
router.delete('/:id', protect, isAdmin, validateId, async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json({ message: 'Product deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
