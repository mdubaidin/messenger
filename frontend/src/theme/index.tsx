'use client';

import { createTheme, PaletteMode, Theme, useMediaQuery } from '@mui/material';
import React, {
    useMemo,
    useContext,
    useState,
    createContext,
    useLayoutEffect,
    Dispatch,
    SetStateAction,
} from 'react';
import { CssBaseline, ThemeProvider as MuiThemeProvider } from '@mui/material';
import { getLocalStorage, setLocalStorage } from '@/utils/function';

interface ThemeContextProps {
    setTheme: Dispatch<SetStateAction<ThemeOptions>>;
    theme: ThemeOptions;
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
        highlight2: string;
        search: string;
        icon: string;
        sideStrip: string;
    }

    interface TypeText {
        tertiary: string;
    }

    interface Palette {
        contrastColor: string;
        icon: string;
    }
}

enum ListItemButtonVariants {
    'sidebarButton',
    'sidebarIconButton',
    'memberButton',
}

declare module '@mui/material/TextField' {
    interface BaseTextFieldProps {
        variation?: string;
    }
}

declare module '@mui/material/Select' {
    interface SelectProps {
        variation?: string;
    }
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

const availableThemes = ['light', 'dark', 'system'] as const;

export type ThemeOptions = (typeof availableThemes)[number];

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
                search: '#f5f5f5',
                icon: '#cdcdcd',
                sideStrip: '#121212',
                icons: {
                    media: '#e6f7ef',
                    link: '#fff5e5',
                    file: '#ebf6fd',
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
                    media: '#242424',
                    link: '#242424',
                    file: '#242424',
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
                                'input::-webkit-outer-spin-button,\ninput::-webkit-inner-spin-button':
                                    {
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
                },
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
