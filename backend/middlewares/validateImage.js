export const validateImage = (size) => (req, res, next) => {
    try {
        if (!req.file) {
            return next();
        }
        
        const fileType = req.file.mimetype;
        const fileSize = req.file.size / (1024 * 1024); // Convert size to MB

        if ((fileType === "image/png" || fileType === "image/jpeg") && fileSize <= size) {
            return next();
        }

        res.status(400).send(`Avatar must be a .PNG or .JPEG image, and less than ${size}MB in size`);
    } catch {
        res.status(500).send('An error occurred while processing the file');
    }
};