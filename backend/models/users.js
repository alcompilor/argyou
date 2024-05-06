import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const { Schema, model } = mongoose;

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
const usernameRegex =/^[a-zA-Z0-9]+(?:[_-]?[a-zA-Z0-9]+)*$/;

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
        trim: true,
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
}, { timestamps: true });

userSchema.pre('save', async function(next){
    if(this.isModified('hashed_pwd')){
        const saltRounds = 8;
        this.hashed_pwd = await bcrypt.hash(this.hashed_pwd, saltRounds);
    }
    next();
});

const User = mongoose.model('User', userSchema)
export default User;
