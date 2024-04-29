const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// CRUD operations
router.post('/', userController.createUser);
router.get('/:id', userController.getUser);
router.patch('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// Minimum 8 charachters, at least 1 letter and 1 number
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
// Having a lenght of 3 to 16 charachters, may include - or _
const usernameRegex = /^[a-zA-Z0-9]+([_ -]?[a-zA-Z0-9])*$/;

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    userName: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        match: [usernameRegex, 'Please fill a valid username']
    },
    email: {
        type: String,
        required: true,
        rim: true,
        lowercase: true,
        unique: true,
        match: [emailRegex, 'Please fill a valid email address']
    },
    birthdate: {
        type: Date,
        required: true
    },
    hashed_pwd: {
        type: String,
        required: true,
        match: [passwordRegex, 'Password is not strong enough']
    },
    gender: {
        type: Boolean,
        required: true
    },
    debates: [{
    type: Schema.Types.ObjectId,
    ref: 'Debate'
    }],
    inDebate: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

model.exports = User;
