import express from 'express';
import Order from '../models/Order.js';
import Cart from '../models/Cart.js';
import { protect, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// POST /api/orders — Create new order
router.post('/', protect, async (req, res) => {
    const { items, shippingAddress, totalPrice } = req.body;

    if (!items || items.length === 0) {
        return res.status(400).json({ message: 'No order items' });
    }

    try {
        const order = new Order({
            user: req.user._id,
            items,
            shippingAddress,
            totalPrice
        });

        const createdOrder = await order.save();

        // Clear cart after order
        await Cart.findOneAndUpdate({ user: req.user._id }, { items: [] });

        res.status(201).json(createdOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// GET /api/orders/myorders — Get logged in user orders
router.get('/myorders', protect, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET /api/orders/:id — Get order by ID
router.get('/:id', protect, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('user', 'name email');

        if (order) {
            // Check if user owns order or is admin
            if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
                return res.status(401).json({ message: 'Not authorized' });
            }
            res.json(order);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET /api/orders — Get all orders (Admin only)
router.get('/', protect, isAdmin, async (req, res) => {
    try {
        const orders = await Order.find({}).populate('user', 'id name').sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PUT /api/orders/:id/status — Update order status (Admin only)
router.put('/:id/status', protect, isAdmin, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (order) {
            order.status = req.body.status || order.status;
            const updatedOrder = await order.save();
            res.json(updatedOrder);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default router;
