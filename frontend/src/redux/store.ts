'use client';

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import chatReducer from './features/contact/contactSlice';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import persistStore from 'redux-persist/es/persistStore';

const persistConfig = {
    key: 'root',
    storage,
};

const rootReducers = combineReducers({
    chat: chatReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);

// Infer the type of makeStore
export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
