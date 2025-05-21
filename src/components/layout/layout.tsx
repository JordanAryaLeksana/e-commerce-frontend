import React from 'react'
import Navbar from './navbar'
import Footer from './footer'
import Header from './header'
type LayoutProps = {
    withNavbar?: boolean;
    withFooter?: boolean;
    withHeader?: boolean;
    children: React.ReactNode;
} & React.HTMLProps<'div'>

export default function Layout({ children, withFooter = true, withNavbar = true, withHeader = false }: Readonly<LayoutProps>) {
    return (
        <div>
            <header className="fixed top-0 left-0 w-full z-50">
                {withNavbar && <Navbar />}
                {withHeader && <Header />}
            </header>
            <main className=''>
                {children}
            </main>
            {withFooter && <Footer />}
        </div>

    )
}