const express = require('express');
const router = express.Router();
const { registerUser, loginUser , getAllCustomers } = require('../controller/user.controller');


// User Auth
router.post('/register', registerUser);
router.post('/login', loginUser);

// Admin: Get all users
router.get('/customers', getAllCustomers);

module.exports = router;
