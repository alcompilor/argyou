const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); 

exports.signIn = async (req, res) => {
    try {
        const { email, password } = req.body; 
        const user = await User.findOne({ email }).exec();

        if (!user) {
            return res.status(401).json({ message: 'Authentication failed. User not found.' });
        }

        // Compare the hashed password
        const match = await bcrypt.compare(password, user.hashed_pwd);

        if (!match) {
            return res.status(401).json({ message: 'Authentication failed. Incorrect password.' });
        }

        // Generate a token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Send the token to the client
        res.json({ message: 'Authentication successful', token });
    } catch (error) {
        console.error("Authentication error:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
