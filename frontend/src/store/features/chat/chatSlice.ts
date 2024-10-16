'use client';

import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '@/store/store';
import { Chat } from '@/types/types';



interface ChatState {
    chat: Chat | null;
    contactPanel: boolean;
}

const initialState: ChatState = {
    chat: null,
    contactPanel: false,
};

export const chatSlice = createSlice({
    name: 'chat',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setChat: (state, action) => {
            state.chat = action.payload;
        },
        setContactPanel: (state, action: { payload: boolean }) => {
            state.contactPanel = action.payload;
        },
    },
});

export const { setChat, setContactPanel } = chatSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.chat.chat;

export default chatSlice.reducer;
