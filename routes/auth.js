const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const authController = require('../controllers/authController');


router.post('/authenticate', authController.handleLogin);

module.exports = router;