const jwt = require('jsonwebtoken');
const User = require('../models/User.js');

const verifyJWT = async (req, res, next) => {
    const authHeader = req.headersauthorization || req.Headersauthorization;

    if (!authHeader?.startsWith('Bearer')) return res.status(401).json({message: "unauthorized"}); //Unauthorized
    const token = authHeader.split(' ')[1]; //Bearer token

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);
        if(!user){
        return res.status(400).json({ message: 'User does not exist' });
    
        }
        req.user = user;
    
    
        // Call the next middleware function
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = verifyJWT;