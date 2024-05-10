import ErrorResponse from "../classes/ErrorResponse.js";
import ResponseData from "../classes/ResponseData.js";

export const validateImage = (size) => (req, res, next) => {
    try {
        if (!req.file) {
            return next();
        }

        const fileType = req.file.mimetype;
        const fileSize = req.file.size / (1024 * 1024); // Convert size to MB

        if (
            (fileType === "image/png" || fileType === "image/jpeg") &&
            fileSize <= size
        ) {
            return next();
        }

        res.status(400).json(
            new ResponseData(
                `Avatar must be a .PNG or .JPEG image, and less than ${size}MB in size`,
                400,
            ),
        );
    } catch (error) {
        next(new ErrorResponse(error.message, 500));
    }
};
