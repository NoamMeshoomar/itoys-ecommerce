const express = require('express');

const router = express();

const auth = require('../middlewares/verifyToken');
const isAdmin = require('../middlewares/verifyAdmin');
const upload = require('../middlewares/uploadImage');

const {
    searchBar,
    getSingleProduct,
    getLastestProducts,
    getRandomProducts,
    getCategoryProducts,
    addProduct
} = require('../controllers/products');

router.post('/search', searchBar);
router.get('/single/:id', getSingleProduct);
router.get('/lastest', getLastestProducts);
router.get('/category/:id', getCategoryProducts);
router.get('/random', getRandomProducts);
router.post('/', auth, isAdmin, upload.single('product'), addProduct);

module.exports = router;