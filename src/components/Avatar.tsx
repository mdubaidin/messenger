import React, { useMemo } from 'react';
import MuiAvatar, { AvatarOwnProps } from '@mui/material/Avatar';

interface AvatarProps extends AvatarOwnProps {
    name?: string;
    cdn?: string;
    src?: string;
}

function Avatar(props: AvatarProps) {
    const { name, cdn, src, ...rest } = props;

    const SRC = useMemo(() => {
        if (name) return `${process.env.PUBLIC_URL}/images/${name}`;

        if (cdn) return process.env.REACT_APP_CDN_SERVER + '/images/' + cdn;

        return src;
    }, [src, cdn, name]);

    return <MuiAvatar src={SRC} {...rest} />;
}

export default Avatar;
