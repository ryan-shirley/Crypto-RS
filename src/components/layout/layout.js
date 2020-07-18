import React from "react"
import { Container } from "react-bootstrap"

const Layout = ({ title, subTitle, children }) => {
    return (
        <>
            <Container fluid>
                <div className="text-center">
                    <h1>{title}</h1>
                    <p className="text-uppercase">{subTitle}</p>
                </div>
            </Container>

            <main className="main">
                <Container fluid>{children}</Container>
            </main>
        </>
    )
}

export default Layout
