'use client';

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import contactReducer from './features/contact/contactSlice';

import { persistReducer } from 'redux-persist';
import sessionStorage from 'redux-persist/lib/storage/session';

const persistConfig = {
    key: 'root',
    storage: sessionStorage,
};

const rootReducers = combineReducers({
    contact: contactReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducers);

export function makeStore() {
    return configureStore({
        reducer: persistedReducer,
        middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }),
    });
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
