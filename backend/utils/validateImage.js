export const validateImage = (image, sizeInMB) => {
    if (!image || image.length === 0) {
        return false;
    }

    const maxSizeInBytes = sizeInMB * 1024 * 1024; // Max image size
    if (image.length > maxSizeInBytes) {
        return false;
    }

    // Check if the buffer starts with the signature of a PNG, JPEG
    const supportedImageSignatures = [
        Buffer.from([0x89, 0x50, 0x4E, 0x47]), // PNG sig
        Buffer.from([0xFF, 0xD8, 0xFF])      // JPEG sig
    ];
    const signature = image.slice(0, 4);
    if (!supportedImageSignatures.some(sig => signature.equals(sig))) {
        return false;
    }

    return true;
};