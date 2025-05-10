const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }]
});


//pre-save hook to hash password
// This function will be called before saving the user to the database
// It checks if the password is modified or if the user is new
// If so, it hashes the password using bcrypt and saves the hash in the database
userSchema.pre("save", async function (next) {
    const user = this;
    if (user.isModified("password") || user.isNew) {
        try {
            const hash = await bcrypt.hash(user.password, 10);
            user.password = hash;
            } catch (error) {
                return next(error);
            }
    }
    next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;

