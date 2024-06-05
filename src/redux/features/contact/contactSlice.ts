'use client';

import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '@/redux/store';

interface ContactState {
    contact: {
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        blocked: boolean;
        muted: boolean;
        avatar: string;
        message: string;
        time: string;
        unreadMessage: number;
    };
}

const initialState: ContactState = {
    contact: {
        id: 3,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        avatar: 'https://i.pravatar.cc/150?img=3',
        message: 'lorem ipsum',
        time: '2024-05-28T01:50:00',
        unreadMessage: 10,
        blocked: false,
        muted: false,
    },
};

export const contactSlice = createSlice({
    name: 'contact',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setContact: (state, action) => {
            state.contact = action.payload;
        },
    },
});

export const { setContact } = contactSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.contact.contact;

export default contactSlice.reducer;
