import React, { FC, ReactNode } from 'react';
import ThemeProvider from '@/theme';
import StoreProvider from './StoreProvider';
import { IoCheckmarkCircle, IoCloseCircle, IoInformationCircle, IoWarning } from 'react-icons/io5';
import { Toaster } from 'sonner';
import TanstackQueryProvider from './TanstackQueryProvider';

interface ProvidersProps {
    children: ReactNode;
}

const Provider: FC<ProvidersProps> = ({ children }) => {
    return (
        <TanstackQueryProvider>
            <StoreProvider>
                <Toaster
                    duration={5000}
                    position='top-center'
                    pauseWhenPageIsHidden
                    icons={{
                        error: <IoCloseCircle />,
                        success: <IoCheckmarkCircle />,
                        info: <IoInformationCircle />,
                        warning: <IoWarning />,
                    }}
                    toastOptions={
                        {
                            // unstyled: true,
                            // classNames: {
                            // 	icon: 'w-6 h-6',
                            // 	error: 'border-red-100 text-red-400',
                            // 	info: 'border-blue-100 text-blue-400',
                            // 	success: 'border-green-200 text-green-400',
                            // 	warning: 'border-yellow-200 text-yellow-400',
                            // 	title: 'text-black font-sans font-medium text-sm',
                            // 	toast: 'flex w-full gap-2 rounded-md border border-l-4 bg-white p-2 shadow-lg items-center',
                            // },
                        }
                    }
                />
                <ThemeProvider>{children}</ThemeProvider>
            </StoreProvider>
        </TanstackQueryProvider>
    );
};

export default Provider;
