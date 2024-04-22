'use client';

import { useCallback, useState } from 'react';

function useMenu() {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const openMenu = useCallback(function (e: React.MouseEvent<HTMLButtonElement>) {
        setAnchorEl(e.currentTarget);
    }, []);

    const closeMenu = useCallback(function () {
        setAnchorEl(null);
    }, []);

    return { anchorEl, openMenu, closeMenu };
}

export { useMenu };
