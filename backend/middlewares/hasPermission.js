import mongoose from "mongoose";

const hasPermission = (collectionName, documentField) => async (req, res, next) => {
  const decoded = req.decodedToken;

  try {
    const collection = mongoose.connection.model(collectionName);
    const query = { [documentField]: req.params[documentField] };
    const document = await collection.findOne(query);

    if (!document) {
      return res.status(404).send("Resource not found.");
    }

    if (!decoded.isAdmin && document.owner !== decoded.username) {
      return res.status(403).send("Access denied. Insufficient permissions to perform this action.");
    }

    next();
  } catch (error) {
    res.status(500).send(`Internal server error: ${error.message}`);
  }
};

export default hasPermission;
