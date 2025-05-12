const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) => {
    const {email, password} = req.body;
    if (!email || !password) {
        return res.status(400).json({message: 'Email and password are required'});
    }


    //find the user by email and password
    const user = await User.findOne({email}).exec();
    if (!user) {
        return res.status(401).json({message: 'Invalid email or password'});
    }
    //check if the password is correct
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        return res.status(401).json({message: 'Invalid email or password'});
    }

    //generate a token
    const token = jwt.sign({"email": user.email}, process.env.JWT_SECRET
        , {expiresIn: '1h'}
    );

    console.log(token);
    //send the token to the client
    res.status(200).json({token});
};

module.exports = {
    handleLogin
};