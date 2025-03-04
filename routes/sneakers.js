const express = require('express');
const router = express.Router();
const Sneaker = require('../models/Sneaker');
const { body, validationResult } = require('express-validator');
const upload = require('../middleware/upload');
const auth = require('../middleware/auth');

// Apply authentication middleware to all sneaker routes
router.use(auth);

// Get all sneakers (Public access)
router.get('/', async (req, res) => {
    try {
        // Build filter object with sanitized inputs
        const filters = {};
        const numericFields = ['minPrice', 'maxPrice'];

        // Sanitize and validate query parameters
        for (const [key, value] of Object.entries(req.query)) {
            if (numericFields.includes(key)) {
                filters[key] = parseFloat(value);
            } else {
                filters[key] = value.toString().trim();
            }
        }

        // Build MongoDB query
        const dbQuery = {};
        if (filters.brand) dbQuery.brand = filters.brand;
        if (filters.minPrice || filters.maxPrice) {
            dbQuery.price = {};
            if (filters.minPrice) dbQuery.price.$gte = filters.minPrice;
            if (filters.maxPrice) dbQuery.price.$lte = filters.maxPrice;
        }

        // Sorting
        const sort = {};
        if (req.query.sortBy) {
            const sanitizedSortBy = req.query.sortBy.toString().trim();
            sort[sanitizedSortBy] = req.query.sortOrder === 'desc' ? -1 : 1;
        }

        // Pagination
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const sneakers = await Sneaker.find(dbQuery)
            .sort(sort)
            .skip(skip)
            .limit(limit);

        res.json(sneakers);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Get sneaker by ID (Public access)
router.get('/:id', async (req, res) => {
    try {
        const sneaker = await Sneaker.findById(req.params.id);
        if (!sneaker) {
            return res.status(404).json({ message: 'Sneaker not found' });
        }
        res.json(sneaker);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Create new sneaker (Admin only)
router.post(
    '/',
    upload.single('image'),
    [
        body('name').trim().escape().notEmpty().withMessage('Name is required'),
        body('price')
            .toFloat()
            .isFloat({ min: 0.01 })
            .withMessage('Price must be at least $0.01'),
        body('brand').trim().escape().notEmpty().withMessage('Brand is required')
    ],
    async (req, res) => {
        // Admin check
        if (!req.user.isAdmin) {
            return res.status(403).json({ error: 'Admin access required' });
        }

        // Validate input
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const sneaker = new Sneaker({
                name: req.body.name,
                price: req.body.price,
                brand: req.body.brand,
                size: req.body.size,
                color: req.body.color,
                releaseDate: req.body.releaseDate,
                image: req.file ? req.file.path : null
            });

            const newSneaker = await sneaker.save();
            res.status(201).json(newSneaker);
        } catch (err) {
            res.status(400).json({ error: 'Validation error' });
        }
    }
);

// Update sneaker (Admin only)
router.patch('/:id', async (req, res) => {
    if (!req.user.isAdmin) {
        return res.status(403).json({ error: 'Admin access required' });
    }

    try {
        const updatedSneaker = await Sneaker.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedSneaker) {
            return res.status(404).json({ error: 'Sneaker not found' });
        }

        res.json(updatedSneaker);
    } catch (err) {
        res.status(400).json({ error: 'Update failed' });
    }
});

// Delete sneaker (Admin only)
router.delete('/:id', async (req, res) => {
    if (!req.user.isAdmin) {
        return res.status(403).json({ error: 'Admin access required' });
    }

    try {
        const deletedSneaker = await Sneaker.findByIdAndDelete(req.params.id);

        if (!deletedSneaker) {
            return res.status(404).json({ error: 'Sneaker not found' });
        }

        res.json({ message: 'Sneaker deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Deletion failed' });
    }
});

module.exports = router;