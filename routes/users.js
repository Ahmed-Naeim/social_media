const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersController.js');
const verifyJWT = require('../middleware/auth.js');

//Create a new user
router.post('/register', userController.createNewUser);
router.get('/user', verifyJWT, userController.getUser);

module.exports = router;
