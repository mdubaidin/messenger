import { BaseTextFieldProps, TextField } from '@mui/material';
import React from 'react';
import { FieldValues, RegisterOptions, UseFormRegister, DefaultValues } from 'react-hook-form';

interface Props extends BaseTextFieldProps {
    fieldName: DefaultValues<string>;
    register: UseFormRegister<FieldValues>;
    registerOptions?: RegisterOptions;
}

const Input: React.FC<Props> = props => {
    const { fieldName, register, registerOptions, ...rest } = props;

    return <TextField size='small' fullWidth {...register(fieldName, registerOptions)} {...rest} />;
};

export default Input;
