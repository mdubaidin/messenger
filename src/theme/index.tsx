'use client';

import { createTheme, PaletteMode, Theme } from '@mui/material';
import React, { useMemo, useContext, useState, createContext, useLayoutEffect } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { getCookie, setCookie } from 'cookies-next';

interface ThemeContextProps {
    toggleTheme: () => void;
    mode: string;
}

interface ThemeContextProviderProps {
    children: React.ReactNode;
}

declare module '@mui/material/styles' {
    interface BreakpointOverrides {
        xs: true;
        sm: true;
        md: true;
        xm: true;
        lg: true;
        xl: true;
        xxl: true;
    }

    interface TypeBackground {
        highlight: string;
        search: string;
        icon: string;
        sideStrip: string;
    }

    interface Palette {
        contrastColor: string;
        icon: string;
    }
}

enum ListItemButtonVariants {
    'sidebarButton',
    'sidebarIconButton',
}

declare module '@mui/material/ListItemButton' {
    interface ListItemButtonBaseProps {
        variant?: keyof typeof ListItemButtonVariants;
    }
}

enum IconButtonVariants {
    'paper',
}

declare module '@mui/material/IconButton' {
    interface IconButtonOwnProps {
        variant?: keyof typeof IconButtonVariants;
    }
}

const ThemeContext = createContext<ThemeContextProps>({ toggleTheme: () => {}, mode: 'dark' });

const ThemeContextProvider = (props: ThemeContextProviderProps): React.JSX.Element => {
    // const preferTheme = systemPreferTheme();
    const [mode, setMode] = useState<string>(getCookie('P13N') || 'light');

    function toggleTheme(): void {
        setMode(prevMode => {
            const theme = prevMode === 'light' ? 'dark' : 'light';
            setCookie('P13N', theme);
            return theme;
        });
    }

    // function systemPreferTheme(): string {
    //     if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
    //     else if (window.matchMedia('(prefers-color-scheme: light)').matches) return 'light';
    //     else return 'dark';
    // }

    useLayoutEffect(() => {
        const theme = getCookie('P13N');
        if (theme) setMode(theme);
    }, [mode]);

    const light = useMemo(
        () => ({
            background: {
                paper: '#FFFFFF',
                default: '#F7F9FC',
                highlight: '#1ba2fa3d',
                search: '#f5f5f5',
                icon: '#cdcdcd',
                sideStrip: '#121212',
            },
            divider: '#e7e3e3',
            contrastColor: 'black',
            icon: '#6a6a6a',
        }),
        []
    );

    const dark = useMemo(
        () => ({
            background: {
                default: '#000000',
                paper: '#070707',
                highlight: '#262626',
                search: '#242424',
                icon: '#323232',
                sideStrip: '#121212',
            },
            text: {
                secondary: '#787878',
            },
            divider: '#424242',
            dividerHover: '#42424266',
            contrastColor: '#FFFFFF',
            icon: '#6a6a6a',
        }),
        []
    );

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode: mode as PaletteMode,
                    primary: {
                        main: '#0da4e8',
                    },

                    ...(mode === 'light' ? light : dark),
                },
                breakpoints: {
                    keys: ['xs', 'sm', 'md', 'xm', 'lg', 'xl', 'xxl'],
                    values: {
                        xs: 0,
                        sm: 576,
                        md: 768,
                        xm: 1024,
                        lg: 1280,
                        xl: 1516,
                        xxl: 1756,
                    },
                },
                components: {
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
                                '&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus':
                                    {
                                        backgroundColor: '#747775',
                                    },
                                '&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active':
                                    {
                                        backgroundColor: '#747775',
                                    },
                                '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover':
                                    {
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
                                props: { variant: 'sidebarIconButton' },
                                style: ({ theme }) => ({
                                    width: 54,
                                    height: 42,
                                    margin: 0,
                                    padding: 0,
                                    borderRadius: '8px',

                                    '&:hover': {
                                        backgroundColor: theme.palette.background.icon,
                                    },

                                    '.MuiListItemIcon-root': {
                                        width: '100%',
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
                        ],
                    },
                    MuiTextField: {
                        styleOverrides: {
                            root: {
                                marginBottom: '16px',
                            },
                        },
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
                },
            }),
        [mode, dark, light]
    );

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <ThemeContext.Provider value={{ toggleTheme, mode }}>
                {props.children}
            </ThemeContext.Provider>
        </ThemeProvider>
    );
};

const useTheme = (): ThemeContextProps => {
    const toggleTheme = useContext(ThemeContext).toggleTheme;
    const mode = useContext(ThemeContext).mode;
    return { toggleTheme, mode };
};

export default ThemeContextProvider;

export { useTheme, ThemeContext };
