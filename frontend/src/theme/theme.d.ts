export interface ThemeContextProps {
    setTheme: Dispatch<SetStateAction<ThemeOptions>>;
    theme: ThemeOptions;
}

export interface ThemeContextProviderProps {
    children: React.ReactNode;
}

const availableThemes = ['light', 'dark', 'system'] as const;

export type ThemeOptions = (typeof availableThemes)[number];

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
        icons: Record<string, string>;
        hover: Record<string, Record<string, string>>;
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
    'removeAttachment',
    'addAttachment',
}

declare module '@mui/material/IconButton' {
    interface IconButtonOwnProps {
        variant?: keyof typeof IconButtonVariants;
    }
}
