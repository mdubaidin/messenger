import { isEmpty, isObject, isString } from '../utils/function';
import { AxiosError } from 'axios';

type ErrorValue = string | object | string[] | object[];

function getValue(object: object) {
    const field = Object.keys(object)[0] as keyof typeof object;
    return object[field];
}

function getMessage(error: AxiosError) {
    if (isEmpty(error)) return 'Unable to encounter the error message';

    const fieldValue = getValue(error) as ErrorValue;

    if (typeof fieldValue === 'string') return fieldValue;

    if (Array.isArray(fieldValue)) {
        const innerField = fieldValue.shift();

        if (isObject(innerField) && !isEmpty(innerField)) {
            const firstField = getValue(innerField);
            if (isString(firstField)) return firstField;
        }

        if (isString(innerField)) return innerField;
        return getMessage(innerField);
    }

    if (isObject(fieldValue)) {
        const firstField = getValue(fieldValue);
        if (isString(firstField)) return firstField;

        if (isString(firstField)) return firstField;
        return getMessage(firstField);
    }
}

const errorHandler = (error: any) => {
    console.info(error);
    if (error.response) {
        const data: any = error.response.data;
        const status = error.response.status;
        const headers = error.response.headers;

        const message = data ? getMessage(data) : '';

        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(data);
        console.log(status);
        console.log(headers);
        console.log({ message });

        if (status) {
            switch (status) {
                // SERVER ERROR
                case 500:
                    return (
                        message || 'Internal Server Error. Oops! Something went wrong on our end.'
                    );

                case 501:
                    return (
                        message ||
                        `Not Implemented. The server doesn't support this functionality. Check your request first`
                    );

                case 502:
                    return (
                        message ||
                        'Bad Gateway. The server received an invalid response. Please try again later'
                    );

                case 503:
                    return (
                        message ||
                        'Service Unavailable. The server is temporarily busy. Please try again later.'
                    );

                case 504:
                    return (
                        message ||
                        `Gateway Timeout. Sorry, we're experiencing delays the server is taking too long to respond.`
                    );

                // CLIENT ERROR
                case 400:
                    return message || `Ensure you've entered valid information.`;

                case 401:
                    return (
                        message ||
                        `Unauthorized: Access Denied. Verify your credentials and try again. `
                    );

                case 403:
                    return (
                        message ||
                        `Access to this resource is denied. You may not have the necessary permissions.`
                    );

                case 404:
                    return message || `We can't find what you are looking for.`;

                case 409:
                    return (
                        message ||
                        `It seems there's a conflict between your request and the current state of the resource.`
                    );

                default:
                    return (
                        message ||
                        `Couldn't recongnized the error. but still trying to find out what's the problem is.`
                    );
            }
        }
        if (data.errors) {
            const errorMessage = Array.isArray(data.errors) ? data.errors[0] : data.errors;
            return errorMessage || 'Our server encountered an error, Please try again later';
        }
    } else if (error.request) {
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
        return 'The request was made but no response was received';
    } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
        return error.message;
    }
};

export default errorHandler;
