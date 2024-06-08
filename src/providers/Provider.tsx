'use client';

import React, { Dispatch, createContext, useCallback, useContext } from 'react';
import useSnack, { SnackAction } from '@/hooks/useSnack';
import ThemeProvider from '@/theme';
import { ThemeProvider as NextThemeProvider } from 'next-themes';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from '@/theme/createEmotionCache';

interface HeaderContextProps {
    showMessage: Dispatch<SnackAction>;
}

const HeaderContext = createContext<HeaderContextProps>({ showMessage: () => {} });

const clientSideEmotionCache = createEmotionCache();

const Provider = ({ children }: { children: React.ReactNode }) => {
    const { SnackBar, showMessage } = useSnack();

    return (
        <NextThemeProvider>
            <CacheProvider value={clientSideEmotionCache}>
                <ThemeProvider>
                    <HeaderContext.Provider value={{ showMessage }}>
                        {children}
                        {SnackBar}
                    </HeaderContext.Provider>
                </ThemeProvider>
            </CacheProvider>
        </NextThemeProvider>
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

export default Provider;

export { useMessage, HeaderContext };
