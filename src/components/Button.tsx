'use client';

import type { VariantProps } from 'class-variance-authority';
import type { ButtonHTMLAttributes } from 'react';
import React from 'react';
import { cva } from 'class-variance-authority';
import clsx from 'clsx';

const buttonVariants = cva(
    'flex justify-center rounded-md px-3 py-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
    {
        variants: {
            variant: {
                primary: 'bg-sky-500 hover:bg-sky-600 focus-visible:outline-sky-600 text-white',
                danger: 'bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600',
            },
            disabled: { true: 'opacity-50 cursor-default' },
            fullWidth: { true: 'w-full' },
        },
        defaultVariants: {
            variant: 'primary',
        },
    }
);

export interface ButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    disabled?: boolean;
}

const Button = (props: ButtonProps) => {
    const { type, children, onClick, disabled, variant, className, fullWidth, ...rest } = props;

    return (
        <button
            onClick={onClick}
            type={type}
            className={clsx(buttonVariants({ variant, disabled, className, fullWidth }))}
            {...rest}>
            {children}
        </button>
    );
};

export default Button;
