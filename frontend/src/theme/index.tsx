'use client';

import { createTheme, PaletteMode, Theme, useMediaQuery } from '@mui/material';
import React, { useMemo, useContext, useState, createContext, useLayoutEffect } from 'react';
import { CssBaseline, ThemeProvider as MuiThemeProvider } from '@mui/material';
import { getLocalStorage, setLocalStorage } from '@/utils/function';
import { ThemeContextProps, ThemeContextProviderProps, ThemeOptions } from './theme';
import components from './components';
import './theme.d.ts';

const ThemeContext = createContext<ThemeContextProps>({ setTheme: () => {}, theme: 'system' });

const ThemeProvider = (props: ThemeContextProviderProps): React.JSX.Element => {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const preferTheme = getLocalStorage('theme') as ThemeOptions;

    const [mode, setMode] = useState<PaletteMode>('dark');
    const [theme, setTheme] = useState<ThemeOptions>(preferTheme || 'system');

    useLayoutEffect(() => {
        if (theme === 'system') {
            const preferTheme = prefersDarkMode ? 'dark' : 'light';
            setLocalStorage('theme', theme);
            return setMode(preferTheme);
        }

        setLocalStorage('theme', theme);
        setMode(theme);
    }, [prefersDarkMode, theme]);

    const light = useMemo(
        () => ({
            background: {
                paper: '#FFFFFF',
                default: '#F7F9FC',
                highlight: '#1ba2fa3d',
                highlight2: '#0093ff0a',
                search: '#f3f3f5',
                icon: '#cdcdcdcc',
                sideStrip: '#121212',
                icons: {
                    attach: '#e4e6eb',
                    media: '#e6f7ef',
                    link: '#fff5e5',
                    file: '#ebf6fd',
                },
                hover: {
                    icons: {
                        attach: '#dee5f7',
                    },
                },
            },
            divider: '#f1f1f1',
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
                icons: {
                    attach: '#3a3a3a',
                    media: '#242424',
                    link: '#242424',
                    file: '#242424',
                },
                hover: {
                    icons: {
                        attach: '#323232',
                    },
                },
            },
            text: {
                secondary: '#787878',
            },

            divider: 'rgba(255, 255, 255, 0.125)',
            dividerHover: '#42424266',
            contrastColor: '#FFFFFF',
            icon: '#6a6a6a',
        }),
        []
    );

    const baseTheme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode: mode,
                    primary: {
                        // main: '#3593e2',
                        main: '#0093ff',
                    },
                    secondary: {
                        main: '#ed499b',
                    },
                    text: {
                        tertiary: '#515f79',
                    },

                    ...(mode === 'light' ? light : dark),
                },

                typography: {
                    fontFamily: 'Segoe UI, Helvetica, Arial, Lucida Grande, sans-serif',
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
                components,
            }),
        [mode, dark, light]
    );

    return (
        <ThemeContext.Provider value={{ setTheme, theme }}>
            <MuiThemeProvider theme={baseTheme}>
                <CssBaseline />
                {props.children}
            </MuiThemeProvider>
        </ThemeContext.Provider>
    );
};

const useTheme = (): ThemeContextProps => {
    const { setTheme, theme } = useContext(ThemeContext);

    return { setTheme, theme };
};

export default ThemeProvider;

export { useTheme, ThemeContext };
