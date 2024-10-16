import { useCallback } from 'react';
import { isEmpty, isObject, isString } from '../utils/function';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

type ErrorValue = string | object | string[] | object[];

const useErrorHandler = () => {
    const getValue = useCallback((object: object) => {
        const field = Object.keys(object)[0] as keyof typeof object;
        return object[field];
    }, []);

    const getMessage = useCallback(
        function (error: AxiosError) {
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
        },
        [getValue]
    );

    const errorHandler = useCallback(
        (error: any) => {
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

                // SERVER ERROR
                if (status === 500) return toast.error('Internal Server Error. Oops! Something went wrong on our end.');

                if (status === 501) return toast.error(`Not Implemented. The server doesn't support this functionality. Check your request first`);

                if (status === 502) return toast.error('Bad Gateway. The server received an invalid response. Please try again later');

                if (status === 503) return toast.error('Service Unavailable. The server is temporarily busy. Please try again later.');

                if (status === 504) return toast.error(`Gateway Timeout. Sorry, we're experiencing delays the server is taking too long to respond.`);

                // CLIENT ERROR
                if (status === 400) return toast.error(message || `Ensure you've entered valid information.`);

                if (status === 401) return toast.error(`Unauthorized: Access Denied. Verify your credentials and try again. `);

                if (status === 403) {
                    return toast.error(`Access to this resource is denied. You may not have the necessary permissions.`);
                }

                if (status === 404) return toast.error(message || `We can't find what you are looking for.`);

                if (status === 409) return toast.error(`It seems there's a conflict between your request and the current state of the resource.`);

                if (data.errors) {
                    toast.error(data.errors || 'Our server encountered an error, Please try again later');
                }
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
                return toast.error(error.message);
            }
        },
        [toast.error, getMessage]
    );

    return errorHandler;
};

export default useErrorHandler;
