export const bufferToBase64 = (buffer) => {
    const uint8Array = new Uint8Array(buffer);
    let binaryString = '';
    const chunkSize = 0x8000;

    for (let i = 0; i < uint8Array.length; i += chunkSize) {
        binaryString += String.fromCharCode.apply(
            null,
            uint8Array.subarray(i, i + chunkSize)
        );
    }

    return btoa(binaryString);
};