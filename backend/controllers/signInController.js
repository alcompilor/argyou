import User from './models/usersModel.js';  
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptj';

export async function signIn(req, res) {
    try {
        const { email, password } = req.body;
        const user = await User.getUser({ email }).exec();

        if (!user) {
            return res.status(401).json({ message: 'Authentication failed. User not found.' });
        }

        const match = await bcrypt.compare(password, user.hashed_pwd);
        if (!match) {
            return res.status(401).json({ message: 'Authentication failed. Incorrect password.' });
        }

        const token = jwt.sign(
            { userId: user._username, role: user.isAdmin ? 'true' : 'false' }, 
            process.env.SECRET_KEY, 
            { expiresIn: '1h' }
        );

        res.cookie('access_token', token, {
            httpOnly: true,
            sameSite: 'strict',  
            maxAge: 3600000  // 1 hour
        });

        res.status(200).json({ message: 'Logged in successfully' });
    } catch (error) {
        console.error("Authentication error:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
}