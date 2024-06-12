import Button, { ButtonProps } from '@mui/material/Button';
import Image from 'next/image';
import React from 'react';

interface Props extends ButtonProps {
    name: string;
}

const FacebookButton = (props: Props) => {
    return (
        <Button
            variant='outlined'
            startIcon={<Image alt='facebook' height='20' width='20' src='/images/facebook.png' />}
            fullWidth
            sx={{
                '&, &:hover': {
                    py: 0.8,
                    color: 'text.primary',
                    borderColor: 'gray',
                    backgroundColor: 'transparent',
                    fontWeight: 500,
                    borderRadius: '10px',
                },
            }}
            {...props}>
            {props.name}
        </Button>
    );
};

export default FacebookButton;
