const express = require('express');

const router = express();

const auth = require('../middlewares/verifyToken');

const {
    getOrders
} = require('../controllers/orders');

router.get('/', auth, getOrders);

module.exports = router;