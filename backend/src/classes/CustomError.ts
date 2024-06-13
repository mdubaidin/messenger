class CustomError extends Error {
    code: number = 0;

    constructor(message: string) {
        super(message);
        this.name = 'CustomError';
        this.message = message;
    }

    public static throw(msg: string, code: number = 400) {
        const error = new CustomError(msg);
        error.code = code;
        throw error;
    }
}

export default CustomError;
