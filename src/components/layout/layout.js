import React from "react"
import { Container } from "react-bootstrap"

const Layout = ({ title, subTitle, children }) => {
    return (
        <>
            <Container fluid>
                <section className="text-center">
                    <h1>{title}</h1>
                    <p className="text-uppercase">{subTitle}</p>
                </section>
            </Container>

            <main className="main">
                <Container fluid>{children}</Container>
            </main>
        </>
    )
}

export default Layout
