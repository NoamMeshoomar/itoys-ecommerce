const express = require('express');

const router = express.Router();

const auth = require('../middlewares/verifyToken');

const {
    register, 
    login,
    getCurrentUser
} = require('../controllers/users');

router.post('/register', register);
router.post('/login', login);
router.get('/current-user', auth, getCurrentUser);

module.exports = router;