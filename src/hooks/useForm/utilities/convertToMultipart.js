function convertToMultipart(values) {
    const formData = new FormData();
    for (const name in values) {
        const value = values[name];
        if (Array.isArray(value)) {
            value.forEach(value => formData.append(name, value));
        } else {
            formData.set(name, value);
        }
    }
    return formData;
}

export default convertToMultipart;
