import convertToMultipart from "./convertToMultipart";

function encodeData(values, enctype) {
    switch (enctype) {
        case "multipart/form-data":
            return convertToMultipart(values);
        default:
            return values;
    }
}

export default encodeData;
