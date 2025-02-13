const express = require('express');
const router = express.Router();
const Sneaker = require('../models/Sneaker');

// Get all sneakers
router.get('/', async (req, res) => {
    try {
        const sneakers = await Sneaker.find();
        res.json(sneakers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

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