'use client';

import { SnackbarContent } from '@mui/material';
import Alert, { AlertColor } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide, { SlideProps } from '@mui/material/Slide';
import React, { Dispatch, useReducer } from 'react';

type SnackAction = object | null;

declare module '@mui/material/Alert' {
    interface AlertPropsColorOverrides {
        response: true;
    }
}

interface SnackState {
    show: boolean;
    severity?: AlertColor | string;
    message?: string;
    action?: SnackAction;
}

interface Snack {
    SnackBar: React.JSX.Element;
    showMessage: Dispatch<SnackAction>;
}

const snackReducer = function (state: SnackState, action: SnackAction): SnackState {
    if (!action) return { show: false, severity: state.severity };
    const severity = Object.keys(action)[0];
    const message = Object.values(action)[0];
    return { show: true, severity, message, action };
};

function SlideTransition(props: SlideProps) {
    return <Slide {...props} direction='up' />;
}

export default function useSnack(): Snack {
    const [snack, showMessage] = useReducer(snackReducer, { show: false });

    return {
        SnackBar: (
            <Snackbar
                open={snack.show}
                autoHideDuration={4000}
                onClose={() => showMessage(null)}
                TransitionComponent={SlideTransition}
                sx={{
                    '& .MuiSnackbarContent-root': {
                        backgroundColor: 'custom.response',
                        color: 'custom.common',
                    },
                }}>
                {snack.severity === 'response' ? (
                    <SnackbarContent
                        message={snack.message}
                        action={
                            <React.Fragment>
                                <IconButton
                                    sx={{ p: 0.5, color: 'inherit' }}
                                    onClick={() => showMessage(null)}>
                                    <CloseIcon />
                                </IconButton>
                            </React.Fragment>
                        }
                    />
                ) : (
                    <Alert
                        color={snack.severity as AlertColor}
                        severity={snack.severity as AlertColor}>
                        {snack.message}
                    </Alert>
                )}
            </Snackbar>
        ),
        showMessage,
    };
}

export type { SnackAction, Snack, SnackState };
