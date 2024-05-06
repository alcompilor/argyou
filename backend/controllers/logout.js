const logout = (req, res) => {
    try {
        res.clearCookie('access_token', {
            httpOnly: true,
            sameSite: 'strict',
            secure: true
        });

        res.status(200).json({ message: 'Successfully logged out'});
    } catch (error) {
       
        res.status(500).json({ message: 'Failed to log out. Please try again later.' });
    }
};

export default logout;  
