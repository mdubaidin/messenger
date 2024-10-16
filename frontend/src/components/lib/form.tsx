import React, { FC, ReactNode, FormHTMLAttributes, FormEvent } from 'react';

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
    children: ReactNode;
    onSubmit?: () => void;
}

const Form: FC<FormProps> = props => {
    const { children, onSubmit, ...rest } = props;

    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (onSubmit) onSubmit();
    };

    return (
        <form onSubmit={submit} {...rest}>
            {children}
        </form>
    );
};

export default Form;
