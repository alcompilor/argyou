import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+}{":;'?/><.,])(?!.*\s).{10,}$/;
const usernameRegex = /^[a-zA-Z0-9]+([_ -]?[a-zA-Z0-9])*$/;

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
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
    birthDate: {
        type: Date,
        required: true
    },
    password: {
        type: String,
        required: true,
        match: [passwordRegex, 'Password is not strong enough']
    },
    gender: {
        type: Boolean,
        required: true
    },
    debates: [String],
    inDebate: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
    }
    next();
});

userSchema.pre('findOneAndUpdate', async function (next) {
    const data = this.getUpdate();
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);
    data.password = hashedPassword;
    next();
});

const User = mongoose.model('User', userSchema);
export default User;
