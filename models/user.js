
const mongoose = require("mongoose");
const {isEmail} = require('express-validator').check();

// create schema
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name can not be empty."],
        maxlength: [50, "Name is more than 50 characters."],
        trim: true
    },
    age: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: [true, "Email can not be empty."],
        unique: [true, "Email already exists"],
        validate: [isEmail, 'invalid Email']
    },
    password:{
        type: String,
        required: [true, "password can not be empty."],
    },
    token: {
        type: String,
    }
}) 



module.exports = mongoose.model('User', UserSchema);
