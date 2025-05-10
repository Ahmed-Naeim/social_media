const User = require('../models/User.js');

const createNewUser = async (req, res) => {
    if(!req?.body.name || !req?.body.email || !req?.body.password) {
        return res.status(400).json({ 'message': 'User data required.' });
    }
    try{
        const result = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
        console.log(result);
        res.status(201).json(result); //send the user to the client
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ 'message': 'Internal server error.' });
    }
};

const getUser = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId);

        const userData = {
            // id: user._id,
            name: user.name,
            email: user.email,
            posts: user.posts
        };

        console.log(userData);
        res.status(200).json(userData);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error.' });
    }
};




module.exports = {
    createNewUser,
    getUser
};
