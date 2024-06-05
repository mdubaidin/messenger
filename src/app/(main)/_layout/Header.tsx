'use client';

import React, { Dispatch, createContext, useCallback, useContext } from 'react';
import { CssBaseline } from '@mui/material';
import useSnack, { SnackAction } from '@/hooks/useSnack';
import ThemeContextProvider from '@/theme';

interface HeaderContextProps {
    showMessage: Dispatch<SnackAction>;
}

const HeaderContext = createContext<HeaderContextProps>({ showMessage: () => {} });

const Header = ({ children }: { children: React.ReactNode }) => {
    const { SnackBar, showMessage } = useSnack();

    return (
        <ThemeContextProvider>
            <CssBaseline />
            <HeaderContext.Provider value={{ showMessage }}>
                {children}
                {SnackBar}
            </HeaderContext.Provider>
        </ThemeContextProvider>
    );
};

type ShowSuccess = (msg: string) => void;
type ShowError = (msg: string | string[]) => void;
type ShowResponse = (msg: string) => void;

const useMessage = () => {
    const showMessage = useContext(HeaderContext).showMessage;

    const showSuccess: ShowSuccess = useCallback(
        function (msg) {
            showMessage({ success: msg });
        },
        [showMessage]
    );

    const showError: ShowError = useCallback(
        function (msg) {
            Array.isArray(msg)
                ? msg.forEach(msg => showMessage({ error: msg }))
                : showMessage({ error: msg });
        },
        [showMessage]
    );

    const showResponse: ShowResponse = useCallback(
        function (msg) {
            showMessage({ response: msg });
        },
        [showMessage]
    );

    return { showError, showSuccess, showResponse };
};

export default Header;

export { useMessage, HeaderContext };
