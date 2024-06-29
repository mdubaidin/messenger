import React, { FC } from 'react';

type LayoutProps = {
    children: React.ReactNode;
};

const layout: FC<LayoutProps> = props => {
    const { children } = props;

    return <div>{children}</div>;
};

export default layout;
