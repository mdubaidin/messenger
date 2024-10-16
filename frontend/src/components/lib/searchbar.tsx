'use client';

import { InputBase, InputBaseProps } from '@mui/material';
import React from 'react';
import { styled } from '@mui/material/styles';

// Icons
import { IoSearchOutline } from 'react-icons/io5';

const SearchWrapper = styled('div')(({ theme }) => ({
    position: 'relative',
    marginLeft: 0,
    width: '100%',
    maxWidth: '720px',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme.palette.background.search,
    border: 'none',
    borderRadius: '5px',
}));

// const IconWrapperLeft = styled('div')(({ theme }) => ({
//     padding: theme.spacing(0, 2),
//     height: '100%',
//     position: 'absolute',
//     pointerEvents: 'none',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     zIndex: 10,
// }));

const IconWrapperRight = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 1),
    height: '100%',
    position: 'absolute',
    right: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    'input::placeholder': {
        color: theme.palette.contrastColor,
        fontWeight: 400,
    },
    '& .MuiInputBase-input': {
        padding: theme.spacing(1),
        [theme.breakpoints.up('sm')]: {
            paddingRight: `calc(1em + ${theme.spacing(4)})`,
        },
        transition: theme.transitions.create('width'),
        width: '100%',
        color: theme.palette.contrastColor,
    },
}));

interface Search extends InputBaseProps {
    placeholder?: string;
}

const SearchBar = (props: Search) => {
    return (
        <React.Fragment>
            <SearchWrapper>
                <StyledInputBase
                    sx={{
                        flex: 1,
                    }}
                    placeholder='Search...'
                    {...props}
                />
                <IconWrapperRight>
                    <IoSearchOutline />
                </IconWrapperRight>
            </SearchWrapper>
        </React.Fragment>
    );
};

export default SearchBar;
