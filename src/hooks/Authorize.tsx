import React, { SetStateAction, createContext, useContext, useEffect, useState } from 'react';
import Loading from '@/components/Loading';
import { env } from '@/utils/function';
import { getCookie } from 'cookies-next';
import axios from 'axios';

type AuthorizeContext = {
    authorize: (loggedIn: boolean, cb?: Function) => void;
    setUser: (user: object) => void;
    user: object;
    setContent: (content: React.ReactNode) => void;
};

const initialState = {
    authorize: () => {},
    setUser: () => {},
    user: {},
    setContent: () => {},
};

const authorizeContext = createContext<AuthorizeContext>(initialState);

const AuthorizationProvider = ({ children }: { children: React.ReactNode }) => {
    const [content, setContent] = useState<React.ReactNode>(
        <Loading message='Please wait, logging you in...' />
    );
    const [user, setUser] = useState<object>({});

    const authorize = async (loggedIn: boolean, cb?: Function) => {
        if (loggedIn) {
            setContent(children);
        } else {
        }

        if (cb) cb(setUser);
    };

    useEffect(() => {
        (async () => {
            try {
                const role = getCookie('role');
                if (!role) throw new Error('role not found');
                const response = await axios.get(`/${role}/profile`);
                const user = response.data.user;

                authorize(true, (setUser: React.Dispatch<SetStateAction<object>>) => setUser(user));
            } catch (err) {
                console.log(err);
                authorize(false);
            }
        })();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <authorizeContext.Provider value={{ authorize, setUser, user, setContent }}>
            {content}
        </authorizeContext.Provider>
    );
};

const useAuthorize = () => useContext(authorizeContext).authorize;
const useUser = () => useContext(authorizeContext)?.user;
const useSetUser = () => useContext(authorizeContext).setUser;
const useSetContent = () => useContext(authorizeContext).setContent;

export default AuthorizationProvider;
export { useAuthorize, useUser, useSetUser, useSetContent };
