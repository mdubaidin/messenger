import { Components, Theme } from '@mui/material';

const components: Components<Omit<Theme, 'components'>> = {
    MuiCssBaseline: {
        styleOverrides: (theme: Theme) => ({
            body: {
                '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
                    backgroundColor: 'transparent',
                    width: '6px',
                },
                '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
                    borderRadius: 8,
                    backgroundColor: theme.palette.divider,
                    // backgroundColor: 'red',
                },
                '&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus': {
                    backgroundColor: '#747775',
                },
                '&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active': {
                    backgroundColor: '#747775',
                },
                '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover': {
                    backgroundColor: '#747775',
                },
            },
        }),
    },

    MuiDivider: {
        styleOverrides: {
            light: {
                borderColor: '#424242',
                width: '100%',
            },
        },
    },

    MuiListItemButton: {
        variants: [
            {
                props: { variant: 'sidebarButton' },
                style: ({ theme }) => ({
                    borderRadius: '5px',
                    padding: '1px 8px',
                    paddingRight: '68px',
                    cursor: 'pointer',
                    color: theme.palette.text.secondary,
                    position: 'relative',

                    '&:hover': {
                        backgroundColor: theme.palette.background.highlight,
                    },

                    '&.Mui-selected': {
                        backgroundColor: theme.palette.background.highlight,
                        color: theme.palette.contrastColor,

                        '&:hover': {
                            backgroundColor: theme.palette.background.highlight,
                        },

                        '.MuiListItemIcon-root': {
                            color: theme.palette.primary.main,
                        },
                        '.MuiListItemText-root': {
                            color: theme.palette.contrastColor,
                        },
                        '.MuiDivider-root': {
                            borderColor: 'white',
                        },
                    },
                    '.MuiListItemText-root': {
                        marginTop: '1px',
                    },
                }),
            },
            {
                props: { variant: 'memberButton' },
                style: ({ theme }) => ({
                    borderRadius: '5px',
                    padding: '1px 10px',
                    paddingRight: '100px !important',
                    cursor: 'pointer',
                    color: theme.palette.text.secondary,
                    position: 'relative',
                    minHeight: 60,

                    '&.Mui-selected': {
                        color: theme.palette.contrastColor,

                        '.MuiListItemIcon-root': {
                            color: theme.palette.primary.main,
                        },
                        '.MuiListItemText-root': {
                            color: theme.palette.contrastColor,
                        },
                        '.MuiDivider-root': {
                            borderColor: 'white',
                        },
                    },
                    '.MuiListItemText-root': {
                        marginTop: '1px',
                    },
                    '.MuiListItemAvatar-root': {
                        minWidth: 50,
                    },
                }),
            },
            {
                props: { variant: 'sidebarIconButton' },
                style: ({ theme }) => ({
                    minWidth: 50,
                    height: 40,
                    margin: 0,
                    padding: 0,
                    borderRadius: '8px',

                    '&:hover': {
                        backgroundColor: theme.palette.background.icon,
                    },

                    '.MuiListItemIcon-root': {
                        minWidth: 'inherit',
                        display: 'inline-flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        fontSize: 20,
                        color: theme.palette.icon,
                    },

                    '&.Mui-selected': {
                        backgroundColor: theme.palette.background.icon,
                        color: theme.palette.contrastColor,

                        '&:hover': {
                            backgroundColor: theme.palette.background.icon,
                        },

                        '.MuiListItemIcon-root': {
                            color: theme.palette.contrastColor,
                        },
                    },
                }),
            },
        ],
    },

    MuiButton: {
        variants: [
            {
                props: { variant: 'contained' },
                style: ({ theme }) => ({ color: theme.palette.common.white }),
            },
            {
                props: { variant: 'contained', color: 'primary' },
                style: ({ theme }) => ({
                    '&.Mui-disabled': {
                        color: 'rgb(255 255 255 / 47%)',
                        backgroundColor: theme.palette.primary.light,
                    },
                }),
            },
        ],
        styleOverrides: {
            root: {
                textTransform: 'none',
            },
        },
    },

    MuiIconButton: {
        variants: [
            {
                props: { variant: 'paper' },
                style: ({ theme }) => ({
                    backgroundColor: theme.palette.background.paper,
                    '&:hover': {
                        backgroundColor: theme.palette.background.paper,
                    },
                }),
            },
            {
                props: { variant: 'removeAttachment' },
                style: ({ theme }) => ({
                    position: 'absolute',
                    top: -5,
                    right: -5,
                    width: 20,
                    height: 20,
                    backgroundColor: theme.palette.background.paper,
                    borderRadius: '100%',
                    fontSize: 24,
                    padding: 0,
                    zIndex: 100,
                    boxShadow: '0 0 0 1px rgb(0 0 0 / 10%)',
                    '&:hover': {
                        bgcolor: theme.palette.background.icon,
                    },
                }),
            },
            {
                props: { variant: 'addAttachment' },
                style: ({ theme }) => ({
                    width: 48,
                    height: 48,
                    backgroundColor: theme.palette.background.icons.attach,
                    borderRadius: 8,
                    padding: 0,
                    '&:hover': {
                        bgcolor: theme.palette.background.hover.icons.attach,
                    },
                }),
            },
        ],
    },

    MuiTextField: {
        variants: [
            {
                props: { variation: 'auth' },
                style: ({ theme }) => ({
                    background: theme.palette.background.search,
                    borderRadius: '10px',

                    '.MuiInputBase-root.MuiOutlinedInput-root': {
                        borderColor: 'transparent',

                        '&:focus-visible': {
                            outline: 'none',
                        },

                        '&.Mui-disabled .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'transparent',
                        },

                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'transparent',
                            borderWidth: '1px',
                            '&:hover': {
                                borderColor: 'transparent',
                            },
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: theme.palette.primary.main,
                            borderRadius: '10px',
                        },
                    },
                }),
            },
        ],
        styleOverrides: {
            root: {
                marginBottom: '16px',
                'input::-webkit-outer-spin-button,\ninput::-webkit-inner-spin-button': {
                    WebkitAppearance: 'none',
                    margin: '0',
                },
            },
        },
    },

    MuiSelect: {
        variants: [
            {
                props: { variation: 'auth' },
                style: ({ theme }) => ({
                    marginBottom: '16px',
                    background: theme.palette.background.search,
                    borderRadius: '10px',
                    '&, &:hover': {
                        '.MuiOutlinedInput-notchedOutline': {
                            borderColor: 'transparent',
                        },
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: theme.palette.primary.main,
                        borderRadius: '10px',
                        borderWidth: '1px',
                    },
                }),
            },
        ],
    },

    MuiMenu: {
        styleOverrides: {
            root: {
                // '.MuiPaper-root.MuiMenu-paper.MuiPopover-paper': {
                //     minWidth: '180px',
                // },
                '.MuiMenu-list': {
                    padding: '5px',
                },
                '.MuiButtonBase-root.MuiMenuItem-root': {
                    fontSize: '14px',
                },
            },
        },
    },

    MuiTab: {
        styleOverrides: {
            root: {
                textTransform: 'capitalize',
            },
        },
    },
};

export default components;
