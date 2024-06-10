import Navbar from './_layout/Navbar';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <Navbar>{children}</Navbar>;
}
