const mongoose = require('mongoose');

const sneakerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    brand: { type: String, required: true },
    size: { type: Number },
    color: { type: String },
    releaseDate: { type: Date },
    inStock: { type: Boolean, default: true }
});

module.exports = mongoose.model('Sneaker', sneakerSchema);