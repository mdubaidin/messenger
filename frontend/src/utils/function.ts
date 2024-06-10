import { DateTime } from 'luxon';

interface File {
    type: string;
}

function env(name: string) {
    const nodeENV = process.env.NODE_ENV.toUpperCase();

    return process.env[`REACT_APP_${nodeENV}_${name}`] || process.env[`REACT_APP_${name}`];
}

function parseKB(KB: number) {
    const sizes = ['Byte', 'KB', 'MB', 'GB', 'TB'];
    if (KB === 0) return '0 KB';
    const i = Math.floor(Math.log2(KB) / 10);
    return `${parseFloat((KB / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`;
}

const getSessionData = (name: string) => sessionStorage[name];
const setSessionData = (name: string, value: string) => (sessionStorage[name] = value);

const getLocalStorage = (key: string) => globalThis.localStorage?.getItem(key);
const setLocalStorage = (key: string, value: string) =>
    globalThis.localStorage?.setItem(key, value);
const removeLocalStorage = (key: string) => globalThis.localStorage?.removeItem(key);

const isDefined = (v: unknown) => typeof v !== 'undefined' && v !== null;
const isEmpty = (obj: object) => Object.keys(obj).length === 0;
const isObject = (obj: object) => typeof obj === 'object' && !Array.isArray(obj) && obj !== null;

const getFileType = (name: string) => {
    if (!name) return '';
    const matched = name.match(/.[a-zA-Z0-9]+$/);

    return Array.isArray(matched) ? matched[0].toUpperCase().slice(1) : '';
};

const isImageUrl = (file: string) => {
    const imageExt = ['gif', 'jpg', 'jpeg', 'png'];
    const matched = file.match(/.[a-zA-Z0-9]+$/);
    const extension = Array.isArray(matched) ? matched[0].slice(1) : '';
    return imageExt.includes(extension);
};

function getBase64(file: Blob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

function escapeDanger(content: string) {
    const regex = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gim;

    if (regex.test(content)) return undefined;
    return { __html: content };
}

const hasSame = <Type>(a: Type, b: Type): boolean => a === b;

const generateDate = (d: string) => {
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

function parseHTMLTags(content: string): string {
    const regex = /(<([^>]+)>)/gim;

    return content ? content.replace(regex, '') : content;
}

const parseLinks = <Type extends string>(text: Type) => {
    const urlRegex =
        /(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])/;
    return text.replace(urlRegex, url => {
        return `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`;
    });
};

const compareDate = (d1: string, d2 = '1970-01-01') => {
    const date1 = DateTime.fromISO(d1).toFormat('yyyy-MM-dd');
    const date2 = DateTime.fromISO(d2).toFormat('yyyy-MM-dd');
    return date1 === date2;
};

const isString = (value: string): boolean => typeof value === 'string';

const isImage = (file: File) => file['type'].split('/')[0] === 'image';
const isVideo = (file: File) => file['type'].split('/')[0] === 'video';

export {
    env,
    getSessionData,
    setSessionData,
    setLocalStorage,
    getLocalStorage,
    removeLocalStorage,
    isDefined,
    isEmpty,
    parseKB,
    getFileType,
    getBase64,
    escapeDanger,
    isImageUrl,
    generateDate,
    compareDate,
    isObject,
    isString,
    hasSame,
    parseHTMLTags,
    parseLinks,
    isImage,
    isVideo,
};
