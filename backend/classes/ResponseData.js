class ResponseData {
    constructor(message, statusCode, data) {
        this.message = message;
        this.statusCode = statusCode;
        this.success = String(statusCode).startsWith("2");
        if (data) {
            this.data = data;
        }
    }
}

export default ResponseData;
