import {
    Card,
    FormControl,
    Grid,
    IconButton,
    InputBase,
    Popover,
    TextField,
    Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import React from 'react';
import TuneIcon from '@mui/icons-material/Tune';
import { useMenu } from '../hooks/useMenu';
import { styled } from '@mui/material/styles';

const SearchWrapper = styled('div')(({ theme }) => ({
    position: 'relative',
    marginLeft: 0,
    width: '100%',
    maxWidth: '720px',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme.palette.custom.search.main,
    border: 'none',
    borderRadius: '20px',
}));

const IconWrapperLeft = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
}));

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
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        [theme.breakpoints.up('sm')]: {
            padding: theme.spacing(1.5, 1, 1.5),
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        },
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        '&:focus': {
            backgroundColor: theme.palette.custom.search.focus,
            boxShadow: 'rgba(0, 0, 0, 0.24) 0px 1px 3px',
            borderRadius: '20px',
        },
    },
}));

const SearchBar = () => {
    const { anchorEl: anchorElFilter, openMenu: opneFilter, closeMenu: closeFilter } = useMenu();

    return (
        <React.Fragment>
            <SearchWrapper>
                <IconWrapperLeft>
                    <SearchIcon />
                </IconWrapperLeft>
                <FormControl fullWidth>
                    <StyledInputBase
                        sx={{
                            flex: 1,
                        }}
                        placeholder='Search...'
                    />
                </FormControl>
                <IconWrapperRight>
                    <IconButton
                        sx={{ display: { xs: 'none', md: 'inline-flex' } }}
                        onClick={opneFilter}>
                        <TuneIcon />
                    </IconButton>
                </IconWrapperRight>
            </SearchWrapper>

            <Popover
                open={Boolean(anchorElFilter)}
                anchorEl={anchorElFilter}
                onClose={closeFilter}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}>
                <FilterBox />
            </Popover>
        </React.Fragment>
    );
};

export default SearchBar;

const FilterBox = () => {
    return (
        <Card sx={{ p: 2.5, minWidth: '669px', backgroundColor: 'background.default' }}>
            <Grid container spacing={3} alignItems='center'>
                <Grid item xs={2}>
                    <Typography variant='subtitle2' fontWeight={600}>
                        Type
                    </Typography>
                </Grid>
                <Grid item xs={10}>
                    <TextField
                        variant='outlined'
                        placeholder='Any'
                        size='small'
                        sx={{ mb: 0, width: '50%' }}
                    />
                </Grid>
            </Grid>
        </Card>
    );
};
