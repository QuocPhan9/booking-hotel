import React from "react"
import Footer from "../components/Footer"
import Header from "../components/Header"

interface Props {
    children: React.ReactNode;
}


const Layout = ({children}: Props) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="container max-auto py-10 flex-1">
                {children}
            </div>
            <Footer />
        </div>
    )
}

export default Layout
