const logout = (req, res) => {
    try {
        res.clearCookie('access_token');

        res.status(200).json({ message: 'Successfully logged out'});
    } catch (error) {
    
        console.error("Logout Error:", error);

       
        res.status(500).json({ message: 'Failed to log out. Please try again later.' });
    }
};

export default logout;  
