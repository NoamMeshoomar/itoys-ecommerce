const express = require('express');

const router = express();

const auth = require('../middlewares/verifyToken');
const isAdmin = require('../middlewares/verifyAdmin');

const {
    searchBar,
    getSingleProduct,
    getLastestProducts,
    getRandomProducts,
    getCategoryProducts,
    addProduct,
    editProduct
} = require('../controllers/products');

router.post('/search', searchBar);
router.post('/', auth, isAdmin, addProduct);
router.get('/single/:id', getSingleProduct);
router.get('/lastest', getLastestProducts);
router.get('/category/:id', getCategoryProducts);
router.get('/random', getRandomProducts);
router.put("/edit/:productId", auth, isAdmin, editProduct);

module.exports = router;