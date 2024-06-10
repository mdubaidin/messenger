import React from 'react';
import { usePathname } from 'next/navigation';
import Link, { LinkProps } from 'next/link';

interface NavLinkProps extends LinkProps {
    children: React.ReactNode | ((isActive: boolean) => React.ReactNode);
    className?: string | ((isActive: boolean) => string);
    style?: React.CSSProperties | ((isActive: boolean) => React.CSSProperties);
    href: string;
}

export default function NavLink(props: NavLinkProps) {
    const { children, className, href, style, ...rest } = props;
    const pathname = usePathname();

    const active = (path: string) => {
        if (pathname === path) return true;

        if (pathname !== path && pathname.startsWith(path)) return true;

        return false;
    };

    if (!href) throw new Error('href is not defined');

    const isActive = active(href);

    const getStyle = () => (typeof style === 'function' ? style(isActive) : style || '');
    const getClassName = () =>
        typeof className === 'function' ? className(isActive) : className || '';

    return (
        <Link href={href} style={{ ...getStyle() }} className={getClassName()} {...rest}>
            {typeof children === 'function' ? children(isActive) : children}
        </Link>
    );
}
