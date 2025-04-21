import React from 'react'
import Navbar from './navbar'
import Footer from './footer'
type LayoutProps ={
    withNavbar? : boolean;
    withFooter? : boolean;
    children: React.ReactNode;
} & React.HTMLProps<'div'>

export default function Layout({children, withFooter = true, withNavbar= true}: Readonly<LayoutProps>){
    return (
        <div>
            {withNavbar && <Navbar/>}
                {children}
            {withFooter && <Footer/>}
            
        </div>
        
    )
}