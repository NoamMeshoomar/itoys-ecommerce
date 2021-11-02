const express = require('express');

const router = express.Router();

const auth = require('../middlewares/verifyToken');

const { 
    getUserCart, 
    getTotalPrice, 
    addToCart, 
    createPayment, 
    executePayment, 
    updateQuantity, 
    removeFromCart 
} = require('../controllers/cart');

router.get('/', auth, getUserCart);
router.get('/total', auth, getTotalPrice);
router.post('/', auth, addToCart);
router.post('/create_payment', auth, createPayment);
router.post('/execute_payment', auth, executePayment);
router.put('/', auth, updateQuantity);
router.delete('/', auth, removeFromCart);

module.exports = router;