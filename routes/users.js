const express = require('express');
const router = express.Router();
const verifyJWT = require('../middleware/auth.js');
const userController = require('../controllers/usersController.js');

//Create a new user
router.post('/register', userController.createNewUser);
router.get('/user', verifyJWT, userController.getUser);

module.exports = router;
