const Orders = require('../models/Orders');

module.exports = {
    getOrders: (req, res) => {
        Orders.find({ userId: req.user._id })
        .then(orders => res.status(200).json({ orders }))
        .catch(err => res.status(400).json({ err }));
    }
}