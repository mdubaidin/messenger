import React from "react";
import "./style/default-input.css";

const DefaultInput = props => {
    const { type, value, name, changeHandler, placeholder, disabled, error, helperText, ...rest } =
        props;
    return (
        <>
            <input
                className='default-input'
                type={type}
                value={value}
                name={name}
                onChange={changeHandler}
                placeholder={placeholder}
                disabled={disabled}
                {...rest}
            />
            {error && <div className='default-error'>{helperText}</div>}
        </>
    );
};

export default DefaultInput;
