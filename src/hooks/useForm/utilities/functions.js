const isUndefined = a => typeof a === "undefined";
const isDefined = a => typeof a !== "undefined";
const convertToArray = a => (Array.isArray(a) ? a : [a]);
const getType = a => (a === null ? "null" : typeof a);

const validateType = (a, types, message) => {
    // for checking null type = 'null' and for objects should be 'objects'
    a = convertToArray(a);
    types = convertToArray(types);
    a.forEach(a => {
        if (!types.includes(getType(a))) throw new Error(message);
    });
};

export { isUndefined, isDefined, convertToArray, getType, validateType };
