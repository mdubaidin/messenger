'use client';

import { createTheme, PaletteMode, Theme, IconButtonProps } from '@mui/material';
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
}

declare module '@mui/material/ListItemButton' {
    interface ListItemButtonBaseProps {
        variant: 'sidebarButton';
    }
}

const ThemeContext = createContext<ThemeContextProps>({ toggleTheme: () => {}, mode: 'dark' });

const ThemeContextProvider = (props: ThemeContextProviderProps): React.JSX.Element => {
    // const preferTheme = systemPreferTheme();
    const [mode, setMode] = useState<string>('dark');

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
            },
            divider: '#e7e3e3',
        }),
        []
    );

    const dark = useMemo(
        () => ({
            background: {
                default: '#000000',
                paper: '#010101',
            },
            text: {
                secondary: '#818991',
            },
            divider: '#424242',
            dividerHover: '#42424266',
        }),
        []
    );

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode: mode as PaletteMode,
                    primary: {
                        main: '#1ba2fa',
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
                                    padding: '2px 15px',
                                    cursor: 'pointer',
                                    color: theme.palette.text.secondary,

                                    '&:hover': {
                                        backgroundColor: 'transparent',
                                    },

                                    '&.Mui-selected': {
                                        backgroundColor: 'transparent',

                                        '&:hover': {
                                            backgroundColor: 'transparent',
                                        },

                                        '.MuiListItemIcon-root': {
                                            color: theme.palette.primary.main,
                                        },
                                        '.MuiListItemText-root': {
                                            color: theme.palette.primary.main,
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
