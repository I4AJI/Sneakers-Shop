const express = require('express');
const router = express.Router();
const Sneaker = require('../models/Sneaker');

// Get all sneakers
router.get('/', async (req, res) => {
    try {
        // Build filter object
        const filters = {};
        if (req.query.brand) filters.brand = req.query.brand;
        if (req.query.minPrice) filters.price = { $gte: req.query.minPrice };
        if (req.query.maxPrice) filters.price = { ...filters.price, $lte: req.query.maxPrice };

        // Sorting
        const sort = {};
        if (req.query.sortBy) {
            sort[req.query.sortBy] = req.query.sortOrder === 'desc' ? -1 : 1;
        }

        // Pagination
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const sneakers = await Sneaker.find(filters)
            .sort(sort)
            .skip(skip)
            .limit(limit);

        res.json(sneakers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// Get sneaker by ID
router.get('/:id', async (req, res) => {
    try {
        const sneaker = await Sneaker.findById(req.params.id);
        if (!sneaker) {
            return res.status(404).json({ message: 'Sneaker not found' });
        }
        res.json(sneaker);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

const { body, validationResult } = require('express-validator');
router.post(
    '/',
    [
        body('name').notEmpty().withMessage('Name is required'),
        body('price').isFloat({ min: 0 }).withMessage('Price must be positive'),
        body('brand').notEmpty().withMessage('Brand is required')
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Add new sneaker
        router.post('/', async (req, res) => {
            const sneaker = new Sneaker({
                name: req.body.name,
                price: req.body.price,
                brand: req.body.brand,
                size: req.body.size,
                color: req.body.color,
                releaseDate: req.body.releaseDate
            });

            try {
                const newSneaker = await sneaker.save();
                res.status(201).json(newSneaker);
            } catch (err) {
                res.status(400).json({ message: err.message });
            }
        });

    }
);

const upload = require('../middleware/upload');
router.post('/', upload.single('image'), async (req, res) => {
    // Add to sneaker creation:
    if (req.file) {
        sneaker.image = req.file.path;
    }
});

// Update sneaker
router.patch('/:id', async (req, res) => {
    try {
        const updatedSneaker = await Sneaker.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updatedSneaker);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete sneaker
router.delete('/:id', async (req, res) => {
    try {
        await Sneaker.findByIdAndDelete(req.params.id);
        res.json({ message: 'Sneaker deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;