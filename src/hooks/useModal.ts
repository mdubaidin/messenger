'use client';

import { useState, Dispatch, SetStateAction } from 'react';

interface ModalConfig {
    openModal?: (setState: Dispatch<SetStateAction<boolean>>) => void;
    closeModal?: (setState: Dispatch<SetStateAction<boolean>>) => void;
}

interface ModalHook {
    modalState: boolean;
    closeModal: () => void;
    openModal: () => void;
}

const useModal = (config: ModalConfig = {}): ModalHook => {
    const { openModal = null, closeModal = null } = config || {};
    const [state, setState] = useState<boolean>(false);

    const getCloseModal = () => {
        if (typeof closeModal === 'function') {
            return closeModal(setState);
        }
        return setState(false);
    };

    const getOpenModal = () => {
        if (typeof openModal === 'function') {
            return openModal(setState);
        }
        return setState(true);
    };

    return { modalState: state, closeModal: getCloseModal, openModal: getOpenModal };
};

export default useModal;
