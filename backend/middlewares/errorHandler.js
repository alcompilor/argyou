export const errorHandler = (err, req, res, _) => {
    res.status(err.statusCode).json({error: err.message, statusCode: err.statusCode});
};