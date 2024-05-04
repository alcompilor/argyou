import mongoose from 'mongoose';


const hasPermission = (collectionName, documentField) => async (req, res, next) => {
    // Use decoded token from isAuth middleware
    const decoded = req.decodedToken;


    try {
        const collection = mongoose.connection.collection(collectionName);
        const query = {};
        query[documentField] = req.params[documentField];
        const document = await collection.findOne(query);


        if (!document) {
            return res.status(404).send('Resource attempted to access was not found.');
        }


        if (!decoded.isAdmin && document.owner !== decoded.username) {
            return res.status(403).send('Access denied. Insufficient permissions.');
        }


        next();
    } catch (error) {
        res.status(500).send(`Internal server error: ${error.message}`); // Correct error status as per suggestion
    }
};


export default hasPermission;