const User = require('../models/User');
const bcrypt = require('bcrypt');

const createNewUser = async (req, res) => {
    const {name, email, pwd} = req.body;
    if(!name || !email || !pwd) {
        return res.status(400).json({ 'message': 'User data required.' });
    }

    //check for duplicates usernames
    const duplicate = await User.findOne({username: name}).exec();
    if (duplicate) return res.sendStatus(409); //Conflict
    try{
        const hashedPwd = await bcrypt.hash(pwd, 10);
        const result = await User.create({
            name: name,
            email: email,
            password: pwd
        });
        console.log(result);
        res.status(201).json({"success": `New user ${user} created!`});
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ 'message': 'Internal server error.' });
    }
};

const getUser = async (req, res) => {
    if(!req?.params?.id) return res.status(400).json({'message': 'User ID required'});
    const user = await User.findOne({_id: req.params.id}).exec(); //findOne method returns a promise, so we need to use await to get the result
    
    if(!user){
        return res.status(204).json({"message": `No user matches ID ${req.body.id}`});
    }
    res.json(user); //sends the user to the client
};




module.exports = {
    createNewUser,
    getUser
};
