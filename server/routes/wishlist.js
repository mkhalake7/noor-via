import express from 'express';
import Wishlist from '../models/Wishlist.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// GET /api/wishlist — Get user's wishlist
router.get('/', protect, async (req, res) => {
    try {
        let wishlist = await Wishlist.findOne({ user: req.user._id }).populate('products');

        if (!wishlist) {
            wishlist = await Wishlist.create({ user: req.user._id, products: [] });
        }

        res.json(wishlist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST /api/wishlist/add/:productId — Add product to wishlist
router.post('/add/:productId', protect, async (req, res) => {
    try {
        const { productId } = req.params;
        let wishlist = await Wishlist.findOne({ user: req.user._id });

        if (!wishlist) {
            wishlist = new Wishlist({ user: req.user._id, products: [] });
        }

        if (!wishlist.products.includes(productId)) {
            wishlist.products.push(productId);
            await wishlist.save();
        }

        const updatedWishlist = await Wishlist.findById(wishlist._id).populate('products');
        res.json(updatedWishlist);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE /api/wishlist/remove/:productId — Remove product from wishlist
router.delete('/remove/:productId', protect, async (req, res) => {
    try {
        const { productId } = req.params;
        const wishlist = await Wishlist.findOne({ user: req.user._id });

        if (!wishlist) {
            return res.status(404).json({ message: 'Wishlist not found' });
        }

        wishlist.products = wishlist.products.filter(p => p.toString() !== productId);
        await wishlist.save();

        const updatedWishlist = await Wishlist.findById(wishlist._id).populate('products');
        res.json(updatedWishlist);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default router;
