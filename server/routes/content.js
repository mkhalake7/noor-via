import express from 'express';
import StoreContent from '../models/StoreContent.js';
import { protect, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// GET /api/content — Get all content
router.get('/', async (req, res) => {
    try {
        const content = await StoreContent.find({});
        res.json(content);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET /api/content/:section — Get content by section
router.get('/:section', async (req, res) => {
    try {
        const content = await StoreContent.findOne({ section: req.params.section });
        if (content) {
            res.json(content);
        } else {
            res.status(404).json({ message: 'Section not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PUT /api/content/:section — Update content by section (Admin only)
router.put('/:section', protect, isAdmin, async (req, res) => {
    try {
        // Sanitize req.body to avoid accidental unique constraint violations or _id modification
        const { _id, section, createdAt, updatedAt, __v, ...updateData } = req.body;

        const content = await StoreContent.findOneAndUpdate(
            { section: req.params.section },
            updateData,
            { new: true, upsert: true, runValidators: true }
        );
        res.json(content);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default router;
