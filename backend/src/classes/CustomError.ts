class CustomError extends Error {
    statusCode: number;

    constructor(message: string, statusCode?: number) {
        super(message);
        this.name = 'CustomError';
        this.message = message;
        this.statusCode = statusCode || 400;
    }
}

export default CustomError;
