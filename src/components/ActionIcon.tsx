import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import React, { FC } from 'react';
import Image from './Image';

interface ActionIconProps extends IconButtonProps {
    icon: React.JSX.Element;
    src: string;
    href: string;
    title?: string;
    imageSx?: React.CSSProperties;
    // sx?: React.CSSProperties;
}

const ActionIcon: FC<ActionIconProps> = props => {
    const { icon, src, href, title, imageSx, sx } = props;

    return (
        <Tooltip title={title}>
            <IconButton sx={sx} LinkComponent='a' href={href} target='_blank'>
                {icon ? (
                    icon
                ) : (
                    <Image
                        src={src}
                        sx={{
                            maxHeight: '30px',
                            ...imageSx,
                        }}
                    />
                )}
            </IconButton>
        </Tooltip>
    );
};

export default ActionIcon;
export type { ActionIconProps };
