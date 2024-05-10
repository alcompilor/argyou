import mongoose from "mongoose";
import ResponseData from "../classes/ResponseData.js";
import ErrorResponse from "../classes/ErrorResponse.js";

const hasPermission = (collectionName, documentField) => async (req, res, next) => {
  const decoded = req.decodedToken;

  try {
    const collection = mongoose.connection.model(collectionName);
    const query = { [documentField]: req.params[documentField] };
    const document = await collection.findOne(query);

    if (!document) {
      return res.status(404).json(new ResponseData("Resource not found", 404));
    }

    if (!decoded.isAdmin && document.owner !== decoded.username) {
      return res.status(403).json(new ResponseData("Access Denied. No sufficient permissions.", 403));
    }

    next();
  } catch (error) {
    next(new ErrorResponse(error.message, 500));
  }
};

export default hasPermission;
