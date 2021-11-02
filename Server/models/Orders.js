const mongoose = require('mongoose');

const OrdersSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    totalPrice: { type: Number },
    shippingAddress: { type: Object },
    status: { type: String, default: 'בטיפול' },
    products: []
}, { timestamps: true });

module.exports = mongoose.model('orders', OrdersSchema);