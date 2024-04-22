import React from "react";
import { useContext } from "react";
import { Handler } from "../useForm/";
import DefaultInput from "./../components/DefaultInput";

function Input(props) {
    const { sx, name, maxLength, minLength, placeholder, type, ...rest } = props;
    const {
        values,
        errors,
        setValues,
        onChangeHandler,
        loading,
        config = {},
    } = useContext(Handler);
    const { Input = null } = config;
    let value = values[name];

    let changeHandler = onChangeHandler;

    if (values[name] instanceof Date) {
        const date = values[name];
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");

        value = `${year}-${month}-${day}`;

        changeHandler = e => {
            setValues({
                [name]: new Date(e.target.value),
            });
        };
    }

    return React.createElement(Input || DefaultInput, {
        value: value,
        name: name,
        type: type,
        onChange: changeHandler,
        disabled: loading,
        placeholder: placeholder,
        ...(errors[name] ? { error: true, helperText: errors[name] } : {}),
        ...rest,
    });
    // <>
    //     <DefaultInput
    //         value={value}
    //         name={name}
    //         type={type}
    //         onChange={changeHandler}
    //         disabled={loading}
    //         placeholder={placeholder}
    //         {...(errors[name] ? { error: true, helperText: errors[name] } : {})}
    //         {...rest}
    //     />
    //     <TextField
    //             value={value}
    //             name={name}
    //             onChange={changeHandler}
    //             disabled={loading}
    //             sx={{
    //                 marginTop: "8px",
    //                 "& .MuiOutlinedInput-input": {
    //                     padding: "8px",
    //                 },
    //                 ...sx,
    //             }}
    //             {...(errors[name] ? { error: true, helperText: errors[name] } : {})}
    //             {...rest}
    //         />
    // </>;
}

export default Input;
