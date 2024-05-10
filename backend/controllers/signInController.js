import User from '../models/usersModel.js';  
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export async function signIn(req, res) {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select("password username isAdmin");
        
        if (!user) {
            return res.status(401).json({ message: 'Authentication failed. User not found.' });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ message: 'Authentication failed. Incorrect password.' });
        }

        const token = jwt.sign(
            { username: user.username, isAdmin: user.isAdmin ? true : false }, 
            process.env.SECRET_KEY, 
            { expiresIn: '1h' }
        );

        res.cookie('access_token', token, {
            httpOnly: true,
            sameSite: 'strict',  
            secure: true,
            maxAge: 6 * 60 * 60 * 1000 // 6 hours
        });

        res.cookie('auth', user.username, {
            sameSite: 'strict',
            secure: true,
            maxAge: 6 * 60 * 60 * 1000,
        });

        res.status(200).json({ message: 'Logged in successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}