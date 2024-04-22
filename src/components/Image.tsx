import Box, { BoxProps } from '@mui/material/Box';
import React, { FC } from 'react';

interface ImageProps extends BoxProps {
    name?: string;
    cdn?: string;
    src?: string;
    alt?: string;
}

const Image: FC<ImageProps> = props => {
    const { name, cdn, src, sx, ...rest } = props;

    const getSrc = () => {
        if (name) return `/images/${name}`;

        if (cdn) return process.env.REACT_APP_CDN_SERVER + '/images/' + cdn;

        return src;
    };

    return (
        <>
            <Box
                component='img'
                src={getSrc()}
                alt='image'
                sx={{ maxWidth: '100%', ...sx }}
                {...rest}
            />
        </>
    );
};

export default Image;
export type { ImageProps };
