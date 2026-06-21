const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: [true, "User with this email already exists"],
        required: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true

    }
})

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;