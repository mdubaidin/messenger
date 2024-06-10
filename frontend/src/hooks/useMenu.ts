'use client';

import { useCallback, useState } from 'react';

export type OpenMenu = {
    (e: React.MouseEvent<HTMLElement>): void;
};

function useMenu() {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const openMenu = useCallback(function (e: React.MouseEvent<HTMLElement>) {
        setAnchorEl(e.currentTarget);
    }, []);

    const closeMenu = useCallback(function () {
        setAnchorEl(null);
    }, []);

    return { anchorEl, openMenu, closeMenu };
}

export { useMenu };
