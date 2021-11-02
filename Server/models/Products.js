const mongoose = require('mongoose');

const ProductsSchema = mongoose.Schema({
    id: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: mongoose.Types.ObjectId, ref: 'categories', required: true },
    type: { type: Number, default: 1 },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('products', ProductsSchema);