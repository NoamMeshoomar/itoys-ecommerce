const express = require('express');

const router = express.Router();

const auth = require('../middlewares/verifyToken');
const isAdmin = require('../middlewares/verifyAdmin');

const {
	getCategories,
	createCategory
} = require('../controllers/categories');

router.get('/', getCategories);
router.post('/', auth, isAdmin, createCategory);

module.exports = router;