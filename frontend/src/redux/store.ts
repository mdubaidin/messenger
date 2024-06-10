'use client';

import { configureStore } from '@reduxjs/toolkit';
import contactReducer from './features/contact/contactSlice';

export function makeStore() {
    return configureStore({
        reducer: {
            contact: contactReducer,
        },
    });
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
