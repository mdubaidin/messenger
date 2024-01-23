import React from 'react';
import { usePathname } from 'next/navigation';
import Link, { LinkProps } from 'next/link';

interface NavLinkProps extends LinkProps {
    children: React.ReactNode | ((isActive: boolean) => React.ReactNode);
    className?: string | ((isActive: boolean) => string);
    href: string;
    style?: React.CSSProperties | ((isActive: boolean) => React.CSSProperties);
}

export default function NavLink({ children, className, href, style, ...props }: NavLinkProps) {
    const pathname = usePathname();

    if (!href) throw new Error('href is not defined');

    const isActive = pathname === href;

    const getStyle = () => (typeof style === 'function' ? style(isActive) : style || '');
    const getClassName = () =>
        typeof className === 'function' ? className(isActive) : className || '';

    return (
        <Link
            href={href}
            style={{ ...getStyle(), display: 'flex', marginBottom: '5px' }}
            className={getClassName()}
            {...props}>
            {typeof children === 'function' ? children(isActive) : children}
        </Link>
    );
}
