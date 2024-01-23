import { Error as MongooseError } from 'mongoose';

// bug fix handle mongoose server error

export default function (err, req, res, next) {
    console.log('Handling Error...');

    // if (err.name === 'Error') return res.error(err.message);

    // Any Error thrown by Error.throw()
    if (err.name === 'CustomError') {
        return res.status(err.code).error({ errors: [err.message] });
    }

    // Any Mongoose Error
    if (err instanceof MongooseError) {
        console.log('MongooseError');
        return handleMongooseError(err, req, res);
    }

    // Mongoose Server Error
    if (err.name === 'MongoServerError') {
        console.log('MongoServerError');
        console.log(err);
        const error = serverErrors[err.code];
        if (!error) {
            return res.status(500).error({
                errors: ['Database error'],
            });
        }

        error.message += Object.keys(err.keyValue).pop();
        return res.status(error.code).error({
            errors: [error.message],
        });
    }

    if (err.type === 'StripeInvalidRequestError') {
        console.log('StripeInvalidRequestError');
        return res.status(err.statusCode).error({
            message: err.message,
        });
    }

    // If no error is matched then say 500
    return error500(err, req, res);
}

function error500(err, req, res) {
    console.log(err);
    return res.status(500).error('Something went wrong');
}

const serverErrors = {
    11000: { code: 409, message: 'Duplicate entry for ' },
};

function handleMongooseError(err, req, res) {
    const { ValidationError } = MongooseError;

    if (err instanceof ValidationError) {
        const paths = Object.keys(err.errors);
        const errors = paths.map(path => {
            const { kind, message, name } = err.errors[path];

            switch (name) {
                case 'ValidatorError':
                    return message.replace('Path', 'Field');

                case 'CastError':
                    return `Field \`${path}\` should be of type \`${kind}\``;
            }
            // return { kind, message, path, name };
        });
        console.log(errors);
        return res.status(400).error({ errors });
    }

    return error500(err, req, res);
}
