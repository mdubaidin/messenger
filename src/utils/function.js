import { DateTime } from 'luxon';

function env(name) {
    const nodeENV = process.env.NODE_ENV.toUpperCase();

    return process.env[`REACT_APP_${nodeENV}_${name}`] || process.env[`REACT_APP_${name}`];
}

const getSessionData = name => sessionStorage[name];

const setSessionData = (name, value) => (sessionStorage[name] = value);

const handleAxiosError = (e, showError) => {
    console.log(e);
    const errors = e?.response?.data?.errors;
    const status = e?.response?.status;

    if (status === 500) return showError('Something went wrong');

    if (status === 400) return showError(errors || `Ensure you've entered valid information.`);

    if (status === 404) return showError(errors || `We can't find what you are looking for.`);

    if (e?.response?.data) {
        if (typeof errors === 'object' && errors !== null) showError(errors.pop().message);
        showError(errors || 'Our server encountered an error, Please try again later');
    } else {
        showError('Something went wrong');
    }
};

const isDefined = v => typeof v !== 'undefined';

const generateDate = d => {
    const date = DateTime.fromISO(d);
    const today = DateTime.now();

    const dateWeekNumber = date.weekNumber;
    const todayWeekNumber = today.weekNumber;
    const Yesterday = today.minus({ days: 1 });

    if (todayWeekNumber === dateWeekNumber) {
        if (date.hasSame(today, 'day')) return 'Today';
        else if (date.hasSame(Yesterday, 'day')) return 'Yesterday';
        return date.weekdayLong;
    } else {
        return date.toFormat('dd-MM-yyyy');
    }
};

export { env, getSessionData, setSessionData, handleAxiosError, isDefined, generateDate };
