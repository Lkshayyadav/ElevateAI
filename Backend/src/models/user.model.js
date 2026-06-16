const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: [true, "User with this name already exists"],
        required: true
    },
    email:
    {
        type: String,
        unique: [true, "User with this email already exists"],
        required: true
    },
    password: {
        type: String,
        required: true

    }
})

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;